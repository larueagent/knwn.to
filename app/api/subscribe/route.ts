import { NextRequest, NextResponse } from 'next/server'

const KIT_API = 'https://api.kit.com/v4'

export async function POST(req: NextRequest) {
  const { email } = await req.json()

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
  }

  const headers = {
    'Content-Type': 'application/json',
    'X-Kit-Api-Key': process.env.KIT_API_KEY!,
  }

  try {
    // Step 1: Add subscriber
    const subRes = await fetch(`${KIT_API}/subscribers`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ email_address: email, state: 'active' }),
    })

    if (!subRes.ok) {
      const error = await subRes.json()
      return NextResponse.json({ error: error.message || 'Kit API error' }, { status: 500 })
    }

    const subData = await subRes.json()
    const subscriberId = subData?.subscriber?.id

    // Step 2: Create tag (Kit returns existing tag if name already exists)
    const tagRes = await fetch(`${KIT_API}/tags`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ name: 'knwn-waitlist' }),
    })

    if (!tagRes.ok) {
      // Subscriber was added, tag failed — still return success
      return NextResponse.json({ success: true, warning: 'Tag could not be applied' })
    }

    const tagData = await tagRes.json()
    const tagId = tagData?.tag?.id

    // Step 3: Apply tag to subscriber
    if (subscriberId && tagId) {
      await fetch(`${KIT_API}/tags/${tagId}/subscribers/${subscriberId}`, {
        method: 'POST',
        headers,
        body: JSON.stringify({}),
      })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
