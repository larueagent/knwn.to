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
const FROM_NAME = 'LaRue by knwn.to'
const INTERNAL_EMAIL = 'robert@mettle.coach'

interface FirstReadPayload {
  firstName: string
  email: string
  birthdate?: string
  age?: number
  gender?: string
  sport?: string
  position?: string
  level?: string
  answers: QuestionAnswer[]
}

// ---------------------------------------------------------------------------
// SendGrid helper — awaited, throws on failure, logs details
// ---------------------------------------------------------------------------
async function sendEmail(payload: object, label: string): Promise<void> {
  const res = await fetch(SENDGRID_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const body = await res.text()
    const msg = `SendGrid [${label}] failed: ${res.status} ${res.statusText} — ${body}`
    console.error(msg)
    throw new Error(msg)
  }

  console.log(`SendGrid [${label}] sent OK (${res.status})`)
}

export async function POST(req: NextRequest) {
  const body: FirstReadPayload = await req.json()
  const { firstName, email, birthdate, gender, sport, position, level, answers } = body
  const age = birthdate
    ? (() => {
        const dob = new Date(birthdate)
        const today = new Date()
        let a = today.getFullYear() - dob.getFullYear()
        const m = today.getMonth() - dob.getMonth()
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) a--
        return a
      })()
    : undefined

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
    const athleteMdContent = await generateAthleteMd(firstName, portrait, profile)

    // Build the .md filename per spec: {firstName}-athlete-{YYYY-MM-DD}.md
    const dateStr = new Date().toISOString().split('T')[0]
    const mdFilename = `${firstName.toLowerCase()}-athlete-${dateStr}.md`

    // Base64-encode the .md content for SendGrid attachment
    const mdBase64 = Buffer.from(athleteMdContent, 'utf-8').toString('base64')

    // ---------------------------------------------------------------------------
    // Step 5.5: Upsert athlete + insert first_read_submission to Supabase
    // ---------------------------------------------------------------------------
    const { data: athleteRow, error: athleteError } = await supabase
      .from('athletes')
      .upsert(
        {
          first_name: firstName,
          email,
          date_of_birth: birthdate ?? null,
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
    let submissionId: string | null = null
    if (athleteRow?.id) {
      const { data: submissionRow, error: submissionError } = await supabase
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
        .select('id')
        .single()

      if (submissionError) {
        console.error('Supabase submission insert error:', submissionError)
        // Non-fatal: continue so athlete still gets their email
      } else {
        submissionId = submissionRow?.id ?? null
      }
    }

    // ---------------------------------------------------------------------------
    // Step 6: Send athlete confirmation email with athlete.md attached (awaited)
    // ---------------------------------------------------------------------------
    const athleteEmailBody = buildAthleteEmail(firstName, portrait, profile)
    let athleteEmailError: string | null = null

    try {
      await sendEmail({
        personalizations: [{ to: [{ email, name: firstName }], bcc: [{ email: INTERNAL_EMAIL }] }],
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
      }, `athlete:${email}`)
    } catch (err) {
      athleteEmailError = err instanceof Error ? err.message : String(err)
    }

    // ---------------------------------------------------------------------------
    // Step 7: Send internal notification with full answers + portrait JSON (awaited)
    // ---------------------------------------------------------------------------
    const notificationBody = buildNotificationEmail(firstName, email, answers, portrait)
    let notificationEmailError: string | null = null

    try {
      await sendEmail({
        personalizations: [{ to: [{ email: INTERNAL_EMAIL }] }],
        from: { email: FROM_EMAIL, name: FROM_NAME },
        subject: `First Read: ${firstName} (${email})`,
        content: [{ type: 'text/html', value: notificationBody }],
      }, `internal:${firstName}`)
    } catch (err) {
      notificationEmailError = err instanceof Error ? err.message : String(err)
    }

    // ---------------------------------------------------------------------------
    // Step 8: Update submission with email send status
    // ---------------------------------------------------------------------------
    if (submissionId) {
      const updatePayload: Record<string, unknown> = {}
      if (!athleteEmailError) {
        updatePayload.email_sent_at = new Date().toISOString()
      } else {
        updatePayload.email_error = athleteEmailError
      }
      if (notificationEmailError) {
        updatePayload.notification_error = notificationEmailError
      }
      if (Object.keys(updatePayload).length > 0) {
        const { error: updateError } = await supabase
          .from('first_read_submissions')
          .update(updatePayload)
          .eq('id', submissionId)
        if (updateError) {
          console.error('Supabase email status update error:', updateError)
        }
      }
    }

    // If athlete email failed, surface it in the response so the client knows
    if (athleteEmailError) {
      console.error('Athlete email failed — submission saved but email not delivered:', athleteEmailError)
      return NextResponse.json({
        success: true,
        warning: 'Submission saved but email delivery failed',
        email_error: athleteEmailError,
      })
    }

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
  const { position, level, age } = profile

  const themePills = portrait.themes
    .map(t => `<span style="display:inline-block;background:#f0f0f0;border-radius:4px;padding:2px 10px;margin:2px;font-size:13px;">${t}</span>`)
    .join('')

  const sections = [
    {
      label: 'HOW I COMPETE AT MY BEST',
      content: portrait.identity.map(i => `
        <p style="margin:0 0 10px;">${i}</p>
      `).join(''),
    },
    {
      label: 'WHAT UNLOCKS ME',
      content: `
        <p style="margin:0 0 10px;">${portrait.stateUnlocks}</p>
      `,
    },
    {
      label: 'UNDER PRESSURE',
      content: `
        <p style="margin:0 0 10px;">${portrait.pressureState}</p>
      ` +
        portrait.pressurePatterns.map(p =>
          `<p style="margin:0 0 6px;color:#555;">— ${p}</p>`
        ).join(''),
    },
    {
      label: 'WHAT COACHES NEED TO KNOW',
      content: `
        <p style="margin:0 0 10px;">${portrait.relationshipGets}</p>
      ` +
        `<table style="border-left:3px solid #ccc;padding-left:12px;margin:12px 0;"><tr><td>
          <p style="font-style:italic;color:#444;">"${portrait.coachQuote}"</p>
        </td></tr></table>`,
    },
    {
      label: "WHAT I'M WORKING TOWARD",
      content: `
        <p style="margin:0 0 10px;">${portrait.directionWant}</p>
      ` +
        `<p style="margin:0 0 10px;">${portrait.directionConsistent}</p>`,
    },
    {
      label: 'WHERE TO START',
      content: `
        <p style="margin:0 0 10px;">${portrait.nextStep.primaryFocus}</p>
      `,
    },
  ]

  const sectionsHtml = sections.map(s => `
    <table width="100%" style="border-top:1px solid #e8e8e8;padding:20px 0;margin-bottom:8px;">
      <tr><td>
        <p style="font-size:11px;font-weight:700;letter-spacing:0.08em;color:#999;margin:0 0 10px;">${s.label}</p>
        ${s.content}
      </td></tr>
    </table>
  `).join('')

  return `
    <!DOCTYPE html>
    <html>
    <body style="font-family:'Georgia',serif;max-width:600px;margin:0 auto;padding:24px;color:#1a1a1a;background:#fff;">
      <table width="100%" style="border-bottom:2px solid #1a1a1a;padding-bottom:20px;margin-bottom:24px;">
        <tr><td>
          <p style="font-size:11px;font-weight:700;letter-spacing:0.1em;color:#999;margin:0 0 8px;">First Read by LaRue &middot; knwn.to</p>
          <h1 style="font-size:28px;margin:0 0 4px;">${firstName}</h1>
          <p style="font-size:14px;color:#555;margin:0;">${position} &middot; ${level} &middot; Age: ${age}</p>
          <p style="font-size:13px;font-weight:600;letter-spacing:0.05em;margin:12px 0 8px;">What came through</p>
          <div>${themePills}</div>
        </td></tr>
      </table>
      <p style="font-size:14px;color:#444;margin-bottom:24px;">Your LaRue file is ready. Everything below is grounded in what you actually said — not a template, not a generic profile. Read the <strong>Where to Start</strong> section first if you're short on time.</p>
      ${sectionsHtml}
      <table width="100%" style="border-top:2px solid #1a1a1a;padding-top:20px;margin-top:24px;">
        <tr><td>
          <p style="font-size:12px;color:#999;margin:0;">LaRue | <a href="https://knwn.to" style="color:#999;">knwn.to</a></p>
          <p style="font-size:12px;color:#bbb;margin:4px 0 0;">Powered by Mettle</p>
          <p style="font-size:13px;color:#444;margin:16px 0 8px;">Your .md file is attached. Open it, read it, then follow the guide below for what to do next.</p>
          <p style="margin:0;"><a href="https://www.knwn.to/field-notes/how-to-use-your-athlete-md" style="color:#1a1a1a;font-weight:600;">How to use your athlete.md &rarr;</a></p>
          <p style="font-size:12px;color:#999;margin:16px 0 0;"><em>This is not a clinical assessment.</em></p>
        </td></tr>
      </table>
    </body>
    </html>
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
        `<div style="margin-bottom:16px;">
          <p style="font-weight:bold;margin:0 0 4px;">Q${i + 1}: ${question}</p>
          <p style="margin:0;white-space:pre-wrap;">${answer.replace(/\n/g, '<br>')}</p>
        </div>`
    )
    .join('\n')

  return `
    <!DOCTYPE html>
    <html>
    <body style="font-family:monospace;max-width:700px;margin:0 auto;padding:24px;color:#1a1a1a;">
      <table width="100%" style="border-bottom:2px solid #000;padding-bottom:16px;margin-bottom:20px;">
        <tr><td>
          <h2 style="margin:0 0 8px;">First Read Submission</h2>
          <p style="margin:0;"><strong>Name:</strong> ${firstName}</p>
          <p style="margin:0;"><strong>Email:</strong> ${email}</p>
          <p style="margin:0;"><strong>Submitted:</strong> ${new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })}</p>
          <hr>
          <h3>Answers</h3>
          ${answersHtml}
          <br>
          <hr>
          <h3>LaRue Portrait JSON</h3>
          <pre style="background:#f5f5f5;padding:16px;overflow-x:auto;">${JSON.stringify(portrait, null, 2)}</pre>
        </td></tr>
      </table>
    </body>
    </html>
  `.trim()
}
