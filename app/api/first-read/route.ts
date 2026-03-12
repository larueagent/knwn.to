// app/api/first-read/route.ts
// LaRue First Read submission handler
// 1. Validates input
// 2. Adds athlete to Kit (subscriber + tag)
// 3. Generates LaRue JSON portrait via Claude (v2.1)
// 4. Renders athlete.md via Claude (v2.1.1)
// 5. Upserts athlete + inserts first_read_submission to Supabase
// 6. Sends athlete email via SendGrid with athlete.md attached
// 7. Sends internal notification to robert@mettle.coach via SendGrid

import { NextRequest, NextResponse } from 'next/server'
import { generatePortrait, generateAthleteMd, QuestionAnswer, AthleteProfile, LaRuePortrait } from '@/lib/generate-first-read'
import { supabase } from '@/lib/supabase'

const KIT_API = 'https://api.kit.com/v4'
const SENDGRID_API = 'https://api.sendgrid.com/v3/mail/send'
const FROM_EMAIL = 'larue@knwn.to'
const FROM_NAME = 'LaRue by Mettle'
const INTERNAL_EMAIL = 'robert@mettle.coach'

interface FirstReadPayload {
  firstName: string
  email: string
  dateOfBirth?: string
  age?: number
  gender?: string
  sport?: string
  position?: string
  level?: string
  answers: QuestionAnswer[]
}

export async function POST(req: NextRequest) {
  const body: FirstReadPayload = await req.json()
  const { firstName, email, dateOfBirth, age, gender, sport, position, level, answers } = body

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
    // ---------------------------------------------------------------------------
    // Step 1: Add subscriber to Kit
    // ---------------------------------------------------------------------------
    const subRes = await fetch(`${KIT_API}/subscribers`, {
      method: 'POST',
      headers: kitHeaders,
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

    // ---------------------------------------------------------------------------
    // Step 2: Apply "first-read-complete" tag
    // ---------------------------------------------------------------------------
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

    // ---------------------------------------------------------------------------
    // Step 3: Store key answers as Kit custom fields
    // ---------------------------------------------------------------------------
    if (subscriberId) {
      const fields: Record<string, string> = {
        first_read_sport: answers[0]?.answer?.slice(0, 255) || '',
        first_read_gap: answers[5]?.answer?.slice(0, 255) || '',
        first_read_chapter_title: answers[9]?.answer?.slice(0, 255) || '',
        first_read_submitted_at: new Date().toISOString(),
      }
      await fetch(`${KIT_API}/subscribers/${subscriberId}`, {
        method: 'PUT',
        headers: kitHeaders,
        body: JSON.stringify({ fields }),
      })
    }

    // ---------------------------------------------------------------------------
    // Step 4: Generate LaRue JSON portrait (Claude Pass 1)
    // ---------------------------------------------------------------------------
    const profile: AthleteProfile = {
      age: age ?? 0,
      gender: gender ?? '',
      sport: sport ?? '',
      position: position ?? '',
      level: level ?? '',
    }
    const portrait = await generatePortrait(firstName, profile, answers)

    // ---------------------------------------------------------------------------
    // Step 5: Render athlete.md (Claude Pass 2)
    // ---------------------------------------------------------------------------
    const athleteMdContent = await generateAthleteMd(firstName, portrait)

    // Build the .md filename per spec: {firstName}-athlete-{YYYY-MM-DD}.md
    const dateStr = new Date().toISOString().split('T')[0]
    const mdFilename = `${firstName.toLowerCase()}-athlete-${dateStr}.md`

    // Base64-encode the .md content for SendGrid attachment
    const mdBase64 = Buffer.from(athleteMdContent, 'utf-8').toString('base64')

    // ---------------------------------------------------------------------------
    // Step 5.5: Upsert athlete + insert first_read_submission to Supabase
    // ---------------------------------------------------------------------------

    // Upsert athlete by email — creates on first read, updates kit_subscriber_id on repeat
    const { data: athleteRow, error: athleteError } = await supabase
      .from('athletes')
      .upsert(
        {
          first_name: firstName,
          email,
          date_of_birth: dateOfBirth ?? null,
          age: age ?? null,
          gender: (() => {
            const genderMap: Record<string, string> = {
              'Male': 'male',
              'Female': 'female',
              'Non-binary': 'non_binary',
              'Prefer not to say': 'prefer_not_to_say',
            }
            return gender ? (genderMap[gender] ?? null) : null
          })(),
          sport: sport ?? '',
          position: position ?? null,
          level: level ?? null,
          kit_subscriber_id: subscriberId ? String(subscriberId) : null,
        },
        { onConflict: 'email', ignoreDuplicates: false }
      )
      .select('id')
      .single()

    if (athleteError || !athleteRow) {
      console.error('Supabase athlete upsert error:', athleteError)
      return NextResponse.json({ error: 'Supabase error', detail: athleteError }, { status: 500 })
    }

    // Insert first_read_submission linked to athlete
    if (athleteRow?.id) {
      const { error: submissionError } = await supabase
        .from('first_read_submissions')
        .insert({
          athlete_id: athleteRow.id,
          raw_answers: answers,
          portrait_json: portrait,
          athlete_md_text: athleteMdContent,
          inferred_tier: portrait.readinessSignals.inferredTier ?? null,
          dominant_quality: portrait.readinessSignals.dominantQuality ?? null,
          development_edge: portrait.readinessSignals.developmentEdge ?? null,
          themes: portrait.themes ?? [],
          kit_tagged_at: subscriberId ? new Date().toISOString() : null,
          source: 'knwn.to',
        })

      if (submissionError) {
        console.error('Supabase submission insert error:', submissionError)
        // Non-fatal: continue so athlete still gets their email
      }
    }

    // ---------------------------------------------------------------------------
    // Step 6: Send athlete confirmation email with athlete.md attached (fire-and-forget)
    // ---------------------------------------------------------------------------
    const athleteEmailBody = buildAthleteEmail(firstName, portrait, profile)

    fetch(SENDGRID_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email, name: firstName }], bcc: [{ email: 'robert@mettle.coach' }] }],
        from: { email: FROM_EMAIL, name: FROM_NAME },
        subject: `Your LaRue file is ready, ${firstName}`,
        content: [{ type: 'text/html', value: athleteEmailBody }],
        attachments: [
          {
            content: mdBase64,
            filename: mdFilename,
            type: 'text/plain',
            disposition: 'attachment',
          },
        ],
      }),
    })

    // ---------------------------------------------------------------------------
    // Step 7: Send internal notification with full answers + portrait JSON (fire-and-forget)
    // ---------------------------------------------------------------------------
    const notificationBody = buildNotificationEmail(firstName, email, answers, portrait)

    fetch(SENDGRID_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: INTERNAL_EMAIL }] }],
        from: { email: FROM_EMAIL, name: FROM_NAME },
        subject: `First Read: ${firstName} (${email})`,
        content: [{ type: 'text/html', value: notificationBody }],
      }),
    })

    // Update email_sent_at on the submission (fire-and-forget)
    if (athleteRow?.id) {
      supabase
        .from('first_read_submissions')
        .update({ email_sent_at: new Date().toISOString() })
        .eq('athlete_id', athleteRow.id)
        .order('created_at', { ascending: false })
        .limit(1)
    }

    // Return immediately — emails are already in flight
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('First Read error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Server error' },
      { status: 500 }
    )
  }
}

// ---------------------------------------------------------------------------
// Email builders
// ---------------------------------------------------------------------------

function buildAthleteEmail(firstName: string, portrait: LaRuePortrait, profile: AthleteProfile): string {
  const { sport, position, age } = profile
  const sections = [
    {
      label: 'HOW I COMPETE AT MY BEST',
      content: portrait.identity.map(i => `<p>${i}</p>`).join(''),
    },
    {
      label: 'WHAT UNLOCKS ME',
      content: `<p>${portrait.stateUnlocks}</p>`,
    },
    {
      label: 'UNDER PRESSURE',
      content: `<p>${portrait.pressureState}</p>` +
        portrait.pressurePatterns.map(p =>
          `<p>— ${p}</p>`
        ).join(''),
    },
    {
      label: 'WHAT COACHES NEED TO KNOW',
      content: `<p>${portrait.relationshipGets}</p>` +
        `<p><em>"${portrait.coachQuote}"</em></p>`,
    },
    {
      label: "WHAT I'M WORKING TOWARD",
      content: `<p>${portrait.directionWant}</p>` +
        `<p>${portrait.directionConsistent}</p>`,
    },
    {
      label: 'WHERE TO START',
      content: `<p>${portrait.nextStep.primaryFocus}</p>`,
    },
  ]

  const sectionsHtml = sections.map(s => `
    <table width="100%" cellpadding="24" cellspacing="0" style="margin-bottom:24px;border:1px solid #e5e5e5;">
      <tr><td>
        <p style="font-size:11px;letter-spacing:0.1em;color:#999;margin:0 0 8px;">${s.label}</p>
        ${s.content}
      </td></tr>
    </table>
  `).join('')

  const themesHtml = portrait.themes
    .map(t => `<span style="display:inline-block;padding:4px 10px;margin:2px;background:#f5f5f5;border-radius:4px;font-size:12px;">${t}</span>`)
    .join('')

  return `
    <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#1a1a1a;">
      <table width="100%" cellpadding="32" cellspacing="0" style="background:#1a1a1a;color:#fff;margin-bottom:24px;">
        <tr><td>
          <p style="font-size:11px;letter-spacing:0.15em;color:#999;margin:0 0 16px;">LARUE · FIRST READ</p>
          <h1 style="font-size:32px;margin:0 0 8px;">${firstName}</h1>
          <p style="color:#999;margin:0 0 16px;">${position} · ${sport} · ${age}</p>
          <p style="color:#ccc;line-height:1.6;">Your LaRue file is ready. Everything below is grounded in what you actually said — not a template, not a generic profile. Read the <strong>Where to Start</strong> section first if you're short on time.</p>
        </td></tr>
      </table>
      <div style="margin-bottom:24px;">${themesHtml}</div>
      ${sectionsHtml}
      <table width="100%" cellpadding="24" cellspacing="0" style="border-top:1px solid #e5e5e5;color:#999;">
        <tr><td>
          <p style="font-size:12px;">LaRue | <a href="https://knwn.to">knwn.to</a><br>Powered by Mettle</p>
          <p style="font-size:12px;">Your .md file is attached. Open it, read it, then follow the guide below for what to do next.<br>
          <a href="https://www.knwn.to/field-notes/how-to-use-your-athlete-md">How to use your athlete.md →</a></p>
          <p style="font-size:11px;color:#bbb;">This is not a clinical assessment.</p>
        </td></tr>
      </table>
    </div>
  `.trim()
}

function buildNotificationEmail(
  firstName: string,
  email: string,
  answers: QuestionAnswer[],
  portrait: LaRuePortrait
): string {
  const answersHtml = answers
    .map(
      ({ question, answer }, i) =>
        `<p><strong>Q${i + 1}: ${question}</strong></p><p>${answer.replace(/\n/g, '<br>')}</p>`
    )
    .join('\n')

  return `
    <div style="font-family:monospace;max-width:700px;margin:0 auto;">
      <h2>First Read Submission</h2>
      <p><strong>Name:</strong> ${firstName}<br>
      <strong>Email:</strong> ${email}<br>
      <strong>Submitted:</strong> ${new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })}</p>
      <hr>
      <h3>Answers</h3>
      ${answersHtml}
      <hr>
      <h3>LaRue Portrait JSON</h3>
      <pre style="background:#f5f5f5;padding:16px;overflow:auto;">${JSON.stringify(portrait, null, 2)}</pre>
    </div>
  `.trim()
}

// Re-export LaRuePortrait so the notification builder has the type in scope
