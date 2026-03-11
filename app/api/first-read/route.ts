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
      from: { email: 'larue@knwn.to', name: 'LaRue' },
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
        await fetch(`${KIT_API}/tags/${tagId}/subscribers`, {
          method: 'POST',
          headers: kitHeaders,
          body: JSON.stringify({ subscriber_id: subscriberId }),
        })
      }
    }

    // Step 4: Format and send email via SendGrid
    const emailHtml = formatFirstReadEmail(firstName, firstReadDoc)
    await sendEmail(email, `Your First Read, ${firstName}`, emailHtml)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('First Read API error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}
