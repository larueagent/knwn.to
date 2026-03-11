import { NextRequest, NextResponse } from 'next/server'
import { generatePortrait, generateAthleteMd, QuestionAnswer } from '@/lib/generate-first-read'
import type { LaRuePortrait } from '@/lib/generate-first-read'
import { AthleteProfile } from '@/lib/generate-first-read'

const KIT_API = 'https://api.kit.com/v4'
const SENDGRID_API = 'https://api.sendgrid.com/v3/mail/send'
const FROM_EMAIL = 'larue@knwn.to'
const FROM_NAME = 'LaRue by Mettle'
const INTERNAL_EMAIL = 'robert@mettle.coach'

interface FirstReadPayload {
  firstName: string
  email: string
  age: number
  gender: string
  sport: string
  position: string
  level: string
  answers: QuestionAnswer[]
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
    // Step 1: Add subscriber to Kit
    const subRes = await fetch(`${KIT_API}/subscribers`, {
      method: 'POST',
      headers: kitHeaders,
      body: JSON.stringify({ email_address: email, first_name: firstName, state: 'active' }),
    })

    if (!subRes.ok) {
      const error = await subRes.json()
      return NextResponse.json({ error: error.message || 'Kit API error' }, { status: 500 })
    }

    const subData = await subRes.json()
    const subscriberId = subData?.subscriber?.id

    // Step 2: Apply tag
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

    // Step 3: Store custom fields
    if (subscriberId) {
      const fields: Record<string, string> = {
        first_read_sport: sport,
        first_read_position: position,
        first_read_level: level,
        first_read_age: String(age),
        first_read_gender: gender,
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

    // Step 4: Generate athlete.md via Claude
    const profile = { age, gender, sport, position, level }
    const portrait = await generatePortrait(firstName, profile, answers)
    const athleteMdContent = await generateAthleteMd(firstName, portrait)
    const translatedPortrait = translatePortrait(portrait)

    const dateStr = new Date().toISOString().split('T')[0]
    const mdFilename = `${firstName.toLowerCase()}-athlete-${dateStr}.md`
    const mdBase64 = Buffer.from(athleteMdContent, 'utf-8').toString('base64')


    // Step 5: Email athlete with attachment
    await fetch(SENDGRID_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email, name: firstName }] }],
        from: { email: 'larue@knwn.to', name: 'LaRue' },
        subject: `Your LaRue file is ready, ${firstName}`,
        content: [{ type: 'text/html', value: buildAthleteEmail(firstName, translatedPortrait, profile) }],
        attachments: [{
          content: mdBase64,
          filename: mdFilename,
          type: 'text/plain',
          disposition: 'attachment',
        }],
      }),
    })

    // Step 6: Internal notification
    await fetch(SENDGRID_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: INTERNAL_EMAIL }] }],
        from: { email: 'larue@knwn.to', name: 'LaRue' },
        subject: `First Read: ${firstName} (${email})`,
        content: [{ type: 'text/html', value: buildNotificationEmail(firstName, email, answers, portrait, profile) }],
      }),
    })

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
// Plain-language translation
// ---------------------------------------------------------------------------
const TERM_MAP: Array<[RegExp, string]> = [
  [new RegExp('somatic carryover', 'gi'), 'carrying mistakes in your body'],
  [new RegExp('somatic', 'gi'), 'physical'],
  [new RegExp('approval-driven performance', 'gi'), 'playing for others'],
  [new RegExp('approval-driven', 'gi'), 'playing for others'],
  [new RegExp('approval-seeking', 'gi'), 'playing for someone else'],
  [new RegExp('hypervigilance', 'gi'), 'being on high alert'],
  [new RegExp('hypervigilant', 'gi'), 'on high alert'],
  [new RegExp('psychophysiological', 'gi'), 'mental and physical'],
  [new RegExp('physiological', 'gi'), 'physical'],
  [new RegExp('self-regulation', 'gi'), 'self-coaching'],
  [new RegExp('self-regulate', 'gi'), 'self-coach'],
  [new RegExp('rumination', 'gi'), 'replaying mistakes'],
  [new RegExp('metacognitive', 'gi'), 'self-aware'],
  [new RegExp('cognitive', 'gi'), 'mental'],
  [new RegExp('arousal regulation', 'gi'), 'managing your intensity'],
  [new RegExp('arousal', 'gi'), 'intensity'],
  [new RegExp('autonomic', 'gi'), 'automatic'],
  [new RegExp('parasympathetic', 'gi'), 'calm-down'],
  [new RegExp('sympathetic nervous', 'gi'), 'stress response'],
  [new RegExp('maladaptive', 'gi'), 'unhelpful'],
  [new RegExp('avoidant', 'gi'), 'avoiding'],
  [new RegExp('dysregulated', 'gi'), 'unraveling'],
  [new RegExp('dysregulation', 'gi'), 'when things start to unravel'],
  [new RegExp('schema', 'gi'), 'pattern'],
  [new RegExp('pathology', 'gi'), 'challenge'],
  [new RegExp('psychological flexibility', 'gi'), 'adaptability'],
  [new RegExp('energy optimization', 'gi'), 'managing your intensity'],
  [new RegExp('mental strength', 'gi'), 'belief and confidence'],
  [new RegExp('immersion', 'gi'), 'full engagement'],
  [new RegExp('resilience', 'gi'), 'bouncing back'],
]

function translateTerms(text: string): string {
  return TERM_MAP.reduce((str, [pattern, replacement]) => str.replace(pattern, replacement), text)
}

function translatePortrait(portrait: LaRuePortrait): LaRuePortrait {
  const t = translateTerms
  return {
    ...portrait,
    identity: portrait.identity.map(t),
    stateUnlocks: t(portrait.stateUnlocks),
    pressureState: t(portrait.pressureState),
    pressurePatterns: portrait.pressurePatterns.map(t),
    relationshipGets: t(portrait.relationshipGets),
    relationshipDoesnt: t(portrait.relationshipDoesnt),
    coachQuote: t(portrait.coachQuote),
    directionWant: t(portrait.directionWant),
    directionConsistent: t(portrait.directionConsistent),
    themes: portrait.themes.map(t),
    nextStep: {
      ...portrait.nextStep,
      primaryFocus: t(portrait.nextStep.primaryFocus),
      approachSignal: t(portrait.nextStep.approachSignal),
    },
    readinessSignals: {
      ...portrait.readinessSignals,
      dominantQuality: t(portrait.readinessSignals.dominantQuality),
      developmentEdge: t(portrait.readinessSignals.developmentEdge),
    },
  }
}

function buildAthleteEmail(firstName: string, portrait: LaRuePortrait, profile: AthleteProfile): string {
  const sections = [
    {
      label: 'HOW I COMPETE AT MY BEST',
      content: portrait.identity.map(i => `<p style="margin:0 0 8px 0;">${i}</p>`).join(''),
    },
    {
      label: 'WHAT UNLOCKS ME',
      content: `<p style="margin:0;">${portrait.stateUnlocks}</p>`,
    },
    {
      label: 'UNDER PRESSURE',
      content: `<p style="margin:0 0 12px 0;">${portrait.pressureState}</p>` +
        portrait.pressurePatterns.map(p =>
          `<p style="margin:0 0 6px 0; padding-left:16px; border-left:2px solid #b8821a; color:#1a1714;">${p}</p>`
        ).join(''),
    },
    {
      label: 'WHAT COACHES NEED TO KNOW',
      content: `<p style="margin:0 0 12px 0;">${portrait.relationshipGets}</p>` +
        `<p style="margin:0; padding:12px 16px; border-left:3px solid #b8821a; color:#8a8178; font-style:italic;">"${portrait.coachQuote}"</p>`,
    },
    {
      label: "WHAT I'M WORKING TOWARD",
      content: `<p style="margin:0 0 8px 0;">${portrait.directionWant}</p>` +
        `<p style="margin:0; color:#8a8178;">${portrait.directionConsistent}</p>`,
    },
    {
      label: 'WHERE TO START',
      content: `<p style="margin:0;">${portrait.nextStep.primaryFocus}</p>`,
    },
  ]

  const sectionsHtml = sections.map(s => `
    <tr>
      <td style="padding: 0 0 32px 0;">
        <p style="margin:0 0 8px 0; font-family:'Courier New',Courier,monospace; font-size:12px; font-weight:700; letter-spacing:1.4px; text-transform:uppercase; color:#b8821a;">${s.label}</p>
        <div style="font-family:Georgia,serif; font-size:16px; line-height:26px; color:#1a1714;">${s.content}</div>
      </td>
    </tr>`).join('')

  const themesHtml = portrait.themes
    .map(t => `<span style="display:inline-block; margin-right:12px; font-family:'Courier New',Courier,monospace; font-size:11px; letter-spacing:1.2px; text-transform:uppercase; color:#b8821a;">${t}</span>`)
    .join('')

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0; padding:0; background-color:#f5f0e8;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f0e8; padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px; width:100%;">

          <!-- Header -->
          <tr>
            <td style="padding:0 0 40px 0; border-bottom:1px solid #e0d9ce;">
              <p style="margin:0 0 16px 0; font-family:'Courier New',Courier,monospace; font-size:11px; font-weight:700; letter-spacing:1.4px; text-transform:uppercase; color:#b8821a;">LARUE · FIRST READ</p>
              <h1 style="margin:0; font-family:Georgia,serif; font-size:48px; font-weight:700; line-height:1; color:#1a1714;">${firstName}</h1>
              <p style="margin:0; font-family:'Courier New',Courier,monospace; font-size:11px; letter-spacing:1.2px; color:#8a8178; text-transform:uppercase;">${profile.sport} · ${profile.position} · ${profile.level} · Age ${profile.age}</p>
            </td>
          </tr>

          <!-- Intro -->
          <tr>
            <td style="padding:32px 0;">
              <p style="margin:0; font-family:Georgia,serif; font-size:16px; line-height:26px; color:#1a1714;">Your LaRue file is ready. Everything below is grounded in what you actually said — not a template, not a generic profile. Read the <span style="color:#b8821a;">Where to Start</span> section first if you're short on time.</p>
            </td>
          </tr>

          <!-- Divider -->
          <tr><td style="padding:0 0 32px 0; border-top:1px solid #e0d9ce;"></td></tr>

          <!-- Sections -->
          ${sectionsHtml}

          <!-- Themes -->
          <tr>
            <td style="padding:0 0 40px 0; border-top:1px solid #e0d9ce;">
              <div style="padding-top:24px;">${themesHtml}</div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td>
              <p style="margin:0; font-family:'Courier New',Courier,monospace; font-size:11px; letter-spacing:1px; color:#8a8178;">
                LaRue | <a href="https://knwn.to" style="color:#8a8178; text-decoration:none;">knwn.to</a><br />
                Powered by Mettle<br /><br />
                This is not a clinical assessment. The .md file attached can be loaded into any AI assistant as context.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim()
}

function buildNotificationEmail(
  firstName: string,
  email: string,
  answers: QuestionAnswer[],
  portrait: LaRuePortrait,
  profile: AthleteProfile
): string {
  const answersHtml = answers
    .map(({ question, answer }, i) =>
      `<p><strong>Q${i + 1}: ${question}</strong></p><p>${answer.replace(/\n/g, '<br />')}</p><br />`
    )
    .join('\n')

  return `
<div style="font-family: monospace; max-width: 700px; margin: 0 auto;">
  <h2>First Read Submission</h2>
  <p><strong>Name:</strong> ${firstName}</p>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Sport:</strong> ${profile.sport} · ${profile.position} · ${profile.level}</p>
  <p><strong>Age:</strong> ${profile.age} &nbsp;&nbsp; <strong>Gender:</strong> ${profile.gender}</p>
  <p><strong>Submitted:</strong> ${new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })}</p>
  <hr />
  <h3>Answers</h3>
  ${answersHtml}
  <hr />
  <h3>LaRue Portrait JSON</h3>
  <pre style="background:#f5f5f5;padding:16px;overflow-x:auto;">${JSON.stringify(portrait, null, 2)}</pre>
</div>`.trim()
}
