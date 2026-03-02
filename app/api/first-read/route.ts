import { NextRequest, NextResponse } from 'next/server'

const KIT_API = 'https://api.kit.com/v4'

interface QuestionAnswer {
  question: string
  answer: string
}

interface FirstReadPayload {
  firstName: string
  email: string
  answers: QuestionAnswer[]
}

export async function POST(req: NextRequest) {
  const body: FirstReadPayload = await req.json()
  const { firstName, email, answers } = body

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
  }

  if (!firstName || !answers || answers.length !== 10) {
    return NextResponse.json({ error: 'Incomplete submission' }, { status: 400 })
  }

  const headers = {
    'Content-Type': 'application/json',
    'X-Kit-Api-Key': process.env.KIT_API_KEY!,
  }

  try {
    // Step 1: Add subscriber to Kit
    const subRes = await fetch(`${KIT_API}/subscribers`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        email_address: email,
        first_name: firstName,
        state: 'active',
      }),
    })

    if (!subRes.ok) {
      const error = await subRes.json()
      return NextResponse.json({ error: error.message || 'Kit API error' }, { status: 500 })
    }

    const subData = await subRes.json()
    const subscriberId = subData?.subscriber?.id

    // Step 2: Apply "first-read-complete" tag
    const tagRes = await fetch(`${KIT_API}/tags`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ name: 'first-read-complete' }),
    })

    if (tagRes.ok) {
      const tagData = await tagRes.json()
      const tagId = tagData?.tag?.id

      if (subscriberId && tagId) {
        await fetch(`${KIT_API}/tags/${tagId}/subscribers/${subscriberId}`, {
          method: 'POST',
          headers,
          body: JSON.stringify({}),
        })
      }
    }

    // Step 3: Store key answers as subscriber custom fields
    if (subscriberId) {
      const fields: Record<string, string> = {
        first_read_sport: answers[0]?.answer?.slice(0, 255) || '',
        first_read_gap: answers[5]?.answer?.slice(0, 255) || '',
        first_read_chapter_title: answers[9]?.answer?.slice(0, 255) || '',
        first_read_submitted_at: new Date().toISOString(),
      }

      await fetch(`${KIT_API}/subscribers/${subscriberId}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ fields }),
      })
    }

    // Step 4: Send internal notification email with full answers
    const notificationBody = formatNotificationEmail(firstName, email, answers)

    await fetch(`${KIT_API}/broadcasts`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        subject: `First Read: ${firstName} (${email})`,
        content: notificationBody,
        email_address: process.env.NOTIFICATION_EMAIL || 'robert@mettle.coach',
        public: false,
      }),
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

function formatNotificationEmail(
  firstName: string,
  email: string,
  answers: QuestionAnswer[]
): string {
  const lines = [
    `<h2>First Read Submission</h2>`,
    `<p><strong>Name:</strong> ${firstName}</p>`,
    `<p><strong>Email:</strong> ${email}</p>`,
    `<p><strong>Submitted:</strong> ${new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })}</p>`,
    `<hr />`,
    ...answers.map(
      ({ question, answer }, i) =>
        `<p><strong>Q${i + 1}: ${question}</strong></p><p>${answer.replace(/\n/g, '<br />')}</p><br />`
    ),
  ]
  return lines.join('\n')
}
