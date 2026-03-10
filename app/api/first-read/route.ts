import { NextRequest, NextResponse } from 'next/server'
import { generateFirstRead, formatFirstReadEmail } from '@/lib/generate-first-read'

const KIT_API = 'https://api.kit.com/v4'
const SENDGRID_API = 'https://api.sendgrid.com/v3/mail/send'

interface QuestionAnswer {
  question: string
  answer: string
}

interface FirstReadPayload {
  firstName: string
  email: string
  age?: number
  gender?: string
  sport?: string
  position?: string
  level?: string
  answers: QuestionAnswer[]
}

async function sendEmail(to: string, subject: string, html: string): Promise<void> {
  const res = await fetch(SENDGRID_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: 'larue@agentmail.to', name: 'LaRue' },
      subject,
      content: [{ type: 'text/html', value: html }],
    }),
  })

  if (!res.ok) {
    const error = await res.text()
    throw new Error(`SendGrid error: ${error}`)
  }
}

export async function POST(req: NextRequest) {
  const body: FirstReadPayload = await req.json()
  const { firstName, email, age, gender, sport, position, level, answers } = body

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
  }

  if (!firstName || !answers || answers.length !== 10) {
    return NextResponse.json({ error: 'Incomplete submission' }, { status: 400 })
  }

  const kitHeaders = {
    'Content-Type': 'application/json',
    'X-Kit-Api-Key': process.env.KIT_API_KEY!,
  }

  try {
    // Step 1: Generate athlete First Read document via Claude
    const firstReadDoc = await generateFirstRead(firstName, answers, { age, gender, sport, position, level })

    // Step 2: Add subscriber to Kit
    const subRes = await fetch(`${KIT_API}/subscribers`, {
      method: 'POST',
      headers: kitHeaders,
      body: JSON.stringify({
        email_address: email,
        first_name: firstName,
        state: 'active',
        fields: {
          age: age?.toString() || '',
          gender: gender || '',
          sport: sport || '',
          position: position || '',
          level: level || '',
        },
      }),
    })

    if (!subRes.ok) {
      const error = await subRes.json()
      return NextResponse.json({ error: error.message || 'Kit API error' }, { status: 500 })
    }

    const subData = await subRes.json()
    const subscriberId = subData?.subscriber?.id

    // Step 3: Apply "first-read-complete" tag
    const tagRes = await fetch(`${KIT_API}/tags`, {
      method: 'POST',
      headers: kitHeaders,
      body: JSON.stringify({ name: 'first-read-complete' }),
    })

    if (tagRes.ok) {
      const tagData = await tagRes.json()
      const tagId = tagData?.tag?.id

      if (subscriberId && tagId) {
        await fetch(`${KIT_API}/tags/${tagId}/subscribers/${subscriberId}`, {
          method: 'POST',
          headers: kitHeaders,
          body: JSON.stringify({}),
        })
      }
    }

    // Step 4: Store key fields on Kit subscriber
    if (subscriberId) {
      const fields: Record<string, string> = {
        first_read_sport: firstReadDoc.sport?.slice(0, 255) || '',
        first_read_gap: answers[5]?.answer?.slice(0, 255) || '',
        first_read_chapter_title: answers[9]?.answer?.slice(0, 255) || '',
        first_read_submitted_at: new Date().toISOString(),
        first_read_pressure_fear: firstReadDoc.pressureFear?.slice(0, 255) || '',
        first_read_themes: firstReadDoc.themes?.join(', ').slice(0, 255) || '',
      }

      await fetch(`${KIT_API}/subscribers/${subscriberId}`, {
        method: 'PUT',
        headers: kitHeaders,
        body: JSON.stringify({ fields }),
      })
    }

    // Step 5: Send formatted First Read email to the athlete
    const athleteEmailHtml = formatFirstReadEmail(firstName, firstReadDoc)

    await sendEmail(email, `${firstName}, your First Read is ready`, athleteEmailHtml)

    // Step 6: Send internal notification with full answers + generated doc
    const notificationHtml = formatNotificationEmail(firstName, email, answers, firstReadDoc)

    await sendEmail(
      process.env.NOTIFICATION_EMAIL || 'robert@mettle.coach',
      `First Read submitted: ${firstName} (${email})`,
      notificationHtml
    )

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('First Read API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

function formatNotificationEmail(
  firstName: string,
  email: string,
  answers: QuestionAnswer[],
  doc: { portrait: string; pressureFear: string; themes: string[] }
): string {
  const qaHtml = answers
    .map(
      (qa, i) => `
      <div style="margin-bottom:24px;">
        <p style="font-weight:bold;color:#8B7355;margin-bottom:4px;">Q${i + 1}: ${qa.question}</p>
        <p style="color:#1A1714;line-height:1.6;">${qa.answer}</p>
      </div>`
    )
    .join('')

  return `
  <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;padding:40px 20px;">
      <h1 style="font-size:24px;color:#1A1714;margin-bottom:8px;">First Read Submitted</h1>
      <p style="color:#8B7355;margin-bottom:8px;">${firstName} · ${email}</p>
      <p style="color:#8B7355;margin-bottom:32px;font-size:13px;">Themes: ${doc.themes?.join(', ')}</p>
      <hr style="border:none;border-top:1px solid #D4C5A9;margin-bottom:32px;" />
      <div style="background:#F5F0E8;padding:20px;margin-bottom:32px;">
        <p style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#8B7355;margin:0 0 12px;">Generated Portrait</p>
        <p style="line-height:1.8;color:#1A1714;margin:0;">${doc.portrait}</p>
      </div>
      <hr style="border:none;border-top:1px solid #D4C5A9;margin-bottom:32px;" />
      ${qaHtml}
    </div>
  `
}
