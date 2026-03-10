import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

export interface QuestionAnswer {
  question: string
  answer: string
}

export interface FirstReadDocument {
  portrait: string
  identity: string[]
  pressureNarrative: string
  pressurePatterns: string[]
  pressureFear: string
  relationshipGets: string
  relationshipDoesnt: string
  coachQuote: string
  directionWant: string
  directionConsistent: string
  themes: string[]
  sport: string
  generatedAt: string
}

export interface AthleteContext {
  age?: number
  gender?: string
  sport?: string
  position?: string
  level?: string
}

const SYSTEM_PROMPT = `You are LaRue, a precision sports psychology intelligence system.

You write athlete portraits that are direct, specific, and earned — never generic, never inflated. You write in second person ("you", "your"). Every sentence must be grounded in something the athlete actually said. You do not praise effort or hustle. You do not use sports cliches. You write the way a great coach thinks: honest, precise, and on the athlete's side.

Your job is to read 10 answers from an athlete's First Read questionnaire and produce a structured psychological portrait. The output must be valid JSON matching the schema exactly.`

function buildUserPrompt(firstName: string, answers: QuestionAnswer[], context: AthleteContext = {}): string {
  const qa = answers
    .map((a, i) => `Q${i + 1}: ${a.question}\nAnswer: ${a.answer}`)
    .join('\n\n')

  const contextLines = [
    context.age ? `Age: ${context.age}` : null,
    context.gender ? `Gender: ${context.gender}` : null,
    context.sport ? `Sport: ${context.sport}` : null,
    context.position ? `Position/event: ${context.position}` : null,
    context.level ? `Level: ${context.level}` : null,
  ].filter(Boolean).join('\n')

  return `Athlete first name: ${firstName}
${contextLines ? `\nAthlete context:\n${contextLines}\n` : ''}
Here are their 10 First Read answers:

${qa}

---

Produce a JSON object with exactly these fields:

{
  "portrait": "Two paragraphs in second person. Paragraph 1: who they are as a competitor — their origin, their best self, what unlocks them. Paragraph 2: the gap they carry — what they are building toward, what gets in the way. Be specific to what they said. No cliches.",

  "identity": [
    "Declarative statement 1 — how they compete at their best",
    "Declarative statement 2 — their instinct under pressure",
    "Declarative statement 3 — how they relate to the sport or their development"
  ],

  "pressureNarrative": "One paragraph describing how pressure shows up in their body and mind, drawn directly from their answers.",

  "pressurePatterns": [
    "Pattern 1 — specific behavioral or cognitive pattern under pressure",
    "Pattern 2",
    "Pattern 3"
  ],

  "pressureFear": "The single deepest fear driving their pressure response, stated plainly.",

  "relationshipGets": "What they need a coach to understand about them — not what they want, what they need.",

  "relationshipDoesnt": "What coaches consistently get wrong about them.",

  "coachQuote": "A single sentence written as if the athlete is speaking directly to a new coach. The most important thing.",

  "directionWant": "What they said they want from this season or career — restated more precisely.",

  "directionConsistent": "What shows up consistently across their answers that they may not have named directly.",

  "themes": ["theme1", "theme2", "theme3"],

  "sport": "Sport and position extracted from Q1"
}

Return only the JSON object. No markdown. No commentary. No wrapper text.`
}

export async function generateFirstRead(
  firstName: string,
  answers: QuestionAnswer[],
  context: AthleteContext = {}
): Promise<FirstReadDocument> {
  const message = await client.messages.create({
    model: 'claude-opus-4-5',
    max_tokens: 2048,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: buildUserPrompt(firstName, answers, context),
      },
    ],
  })

  const raw = message.content[0].type === 'text' ? message.content[0].text : ''
  const cleaned = raw.replace(/^```(?:json)?\n?/i, '').replace(/\n?```$/i, '').trim()

  const doc: FirstReadDocument = JSON.parse(cleaned)
  doc.generatedAt = new Date().toISOString()

  return doc
}

export function formatFirstReadEmail(firstName: string, doc: FirstReadDocument): string {
  const identityItems = doc.identity
    .map((item) => `<li style="margin-bottom:12px;line-height:1.6;">${item}</li>`)
    .join('')

  const pressureItems = doc.pressurePatterns
    .map((p) => `<li style="margin-bottom:8px;line-height:1.6;">${p}</li>`)
    .join('')

  const themeItems = doc.themes
    .map(
      (t) =>
        `<span style="display:inline-block;background:#F5F0E8;color:#8B7355;padding:4px 12px;border-radius:20px;font-size:13px;margin:4px;">${t}</span>`
    )
    .join('')

  const portraitParagraphs = doc.portrait
    .split('\n\n')
    .filter(Boolean)
    .map((p) => `<p style="margin-bottom:20px;line-height:1.8;color:#1A1714;">${p}</p>`)
    .join('')

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F5F0E8;font-family:Georgia,serif;">
<div style="max-width:600px;margin:0 auto;padding:40px 20px;">

  <div style="margin-bottom:40px;">
    <p style="font-size:12px;letter-spacing:0.15em;text-transform:uppercase;color:#8B7355;margin:0 0 12px;">LaRue · First Read</p>
    <h1 style="font-size:28px;font-weight:normal;color:#1A1714;margin:0 0 8px;">${firstName}</h1>
    <p style="font-size:14px;color:#8B7355;margin:0;">${doc.sport}</p>
  </div>

  <hr style="border:none;border-top:1px solid #D4C5A9;margin-bottom:40px;" />

  <div style="margin-bottom:40px;">
    <p style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#8B7355;margin:0 0 20px;">Portrait</p>
    ${portraitParagraphs}
  </div>

  <hr style="border:none;border-top:1px solid #D4C5A9;margin-bottom:40px;" />

  <div style="margin-bottom:40px;">
    <p style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#8B7355;margin:0 0 20px;">Competitive Identity</p>
    <ul style="padding-left:20px;margin:0;color:#1A1714;">${identityItems}</ul>
  </div>

  <hr style="border:none;border-top:1px solid #D4C5A9;margin-bottom:40px;" />

  <div style="margin-bottom:40px;">
    <p style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#8B7355;margin:0 0 20px;">Under Pressure</p>
    <p style="line-height:1.8;color:#1A1714;margin-bottom:20px;">${doc.pressureNarrative}</p>
    <ul style="padding-left:20px;margin:0 0 20px;color:#1A1714;">${pressureItems}</ul>
    <div style="background:#EDE8DE;border-left:3px solid #8B7355;padding:16px 20px;margin-top:20px;">
      <p style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#8B7355;margin:0 0 8px;">The Fear Underneath</p>
      <p style="line-height:1.6;color:#1A1714;margin:0;font-style:italic;">${doc.pressureFear}</p>
    </div>
  </div>

  <hr style="border:none;border-top:1px solid #D4C5A9;margin-bottom:40px;" />

  <div style="margin-bottom:40px;">
    <p style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#8B7355;margin:0 0 20px;">With Coaches</p>
    <p style="font-size:11px;color:#8B7355;margin:0 0 6px;">What you need them to understand</p>
    <p style="line-height:1.7;color:#1A1714;margin:0 0 20px;">${doc.relationshipGets}</p>
    <p style="font-size:11px;color:#8B7355;margin:0 0 6px;">What they usually get wrong</p>
    <p style="line-height:1.7;color:#1A1714;margin:0 0 24px;">${doc.relationshipDoesnt}</p>
    <div style="background:#1A1714;padding:20px 24px;">
      <p style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#8B7355;margin:0 0 10px;">If you could tell a new coach one thing</p>
      <p style="line-height:1.7;color:#F5F0E8;margin:0;font-style:italic;">&quot;${doc.coachQuote}&quot;</p>
    </div>
  </div>

  <hr style="border:none;border-top:1px solid #D4C5A9;margin-bottom:40px;" />

  <div style="margin-bottom:40px;">
    <p style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#8B7355;margin:0 0 20px;">Direction</p>
    <p style="font-size:11px;color:#8B7355;margin:0 0 6px;">What you said you want</p>
    <p style="line-height:1.7;color:#1A1714;margin:0 0 20px;">${doc.directionWant}</p>
    <p style="font-size:11px;color:#8B7355;margin:0 0 6px;">What shows up consistently</p>
    <p style="line-height:1.7;color:#1A1714;margin:0;">${doc.directionConsistent}</p>
  </div>

  <div style="margin-bottom:48px;">${themeItems}</div>

  <hr style="border:none;border-top:1px solid #D4C5A9;margin-bottom:24px;" />
  <p style="font-size:12px;color:#B0A090;line-height:1.6;margin:0;">
    This is your First Read — a starting point, not a verdict. It will sharpen over time as LaRue learns more about how you compete.<br><br>
    <a href="https://knwn.to" style="color:#8B7355;">knwn.to</a>
  </p>

</div>
</body>
</html>`
}
