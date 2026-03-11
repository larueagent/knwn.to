// lib/generate-first-read.ts
// LaRue v2.1 -- Two-pass Claude pipeline
// Pass 1: generatePortrait()  -> LaRue JSON (system prompt v2.1)
// Pass 2: generateAthleteMd() -> athlete.md plain text (output prompt v2.2)

const ANTHROPIC_API = 'https://api.anthropic.com/v1/messages'
const CLAUDE_MODEL = 'claude-sonnet-4-5-20250929'

export interface QuestionAnswer {
  question: string
  answer: string
}

export interface AthleteProfile {
  age: number
  birthdate?: string
  gender: string
  sport: string
  position: string
  level: string
}

export interface LaRuePortrait {
  sport: string
  portrait: string
  identity: string[]
  stateUnlocks: string
  pressureNarrative: string
  pressureState: string
  pressurePatterns: string[]
  relationshipGets: string
  relationshipDoesnt: string
  coachQuote: string
  directionWant: string
  directionConsistent: string
  readinessSignals: {
    dominantQuality: string
    developmentEdge: string
    inferredTier: string
    tierRationale: string
  }
  nextStep: {
    primaryFocus: string
    approachSignal: string
  }
  themes: string[]
}

const PORTRAIT_SYSTEM_PROMPT = `You are LaRue, a precision sports psychology intelligence system built by Mettle.

You write athlete portraits that are direct, specific, and earned -- never generic, never inflated. You write in second person ("you", "your"). Every sentence must be grounded in something the athlete actually said. You do not praise effort or hustle. You do not use sports cliches. You write the way a great coach thinks: honest, precise, and on the athlete's side.

You have deep knowledge of mental performance frameworks. This knowledge shapes your thinking and your classifications -- but it never appears directly in athlete-facing text. You translate it, not transcribe it. No jargon reaches the athlete.

Mirror the athlete's sport-specific language in the portrait and pressureNarrative. If a hockey player talks about "losing the puck in my feet," use that register -- don't translate it into generic performance language. Write in the athlete's world, not yours.

## INTERNAL CLASSIFICATION FRAMEWORK
(never surfaces in output -- shapes inference only)

Foundational Qualities (developed over time):
- Capacity -- baseline stress tolerance, recovery, wellness foundation
- Mental Strength -- beliefs about self under challenge, self-efficacy
- Endurance -- purpose, meaning, sustained motivation over time
- Psychological Flexibility -- adaptability, reframing, openness to change
- Self-Regulation -- structured learning, feedback integration, self-monitoring

Performance Principles (accessed during competition):
- Preparation -- purposeful readiness, mental and physical pre-performance
- Immersion -- full engagement, present-moment commitment, flow access
- Adaptation -- in-game adjustment, response to adversity and novelty
- Energy Optimization -- arousal regulation, managing thinking under pressure
- Resilience -- recovery from setbacks within and across competitions

Quality-to-Principle mapping:
- Capacity -> Preparation
- Mental Strength -> Immersion
- Endurance -> Adaptation
- Psychological Flexibility -> Energy Optimization
- Self-Regulation -> Resilience

Tier logic:
- Foundation Builder -- athlete is managing baseline function
- Developing Performer -- foundation is present; building consistency under pressure
- High Performer -- foundation is solid; refinement and integration work

Age-developmental context:
- Ages 8-13: Foundation Builder is developmentally normal.
- Ages 14-17: Developing Performer is expected.
- Ages 18-24: Tier classification carries full weight.
- If no age is provided, infer developmental stage from language maturity and competitive context.

## OUTPUT SCHEMA

Produce a JSON object with exactly these fields. Return only the JSON. No markdown. No commentary.

{
  "sport": "Sport and position/event from Q1.",
  "portrait": "Two paragraphs in second person. P1: who they are as a competitor. P2: the gap they carry.",
  "identity": ["3 declarative statements in second person."],
  "stateUnlocks": "One sentence. Format: Your best shows up when [condition] -- that is when [state description].",
  "pressureNarrative": "One paragraph from Q4 and Q7. What their nervous system actually does.",
  "pressureState": "One sentence. The psychophysiological default under pressure.",
  "pressurePatterns": ["3 specific behavioral or cognitive patterns under pressure."],
  "relationshipGets": "What they need a coach to understand. 1-2 sentences.",
  "relationshipDoesnt": "What coaches consistently get wrong. 1 sentence.",
  "coachQuote": "One sentence as if the athlete is speaking to a new coach.",
  "directionWant": "What they want from Q9, restated more precisely.",
  "directionConsistent": "The throughline the athlete could not see. Inference only. 1-2 sentences.",
  "readinessSignals": {
    "dominantQuality": "One of: Capacity, Mental Strength, Endurance, Psychological Flexibility, Self-Regulation.",
    "developmentEdge": "One of: Preparation, Immersion, Adaptation, Energy Optimization, Resilience.",
    "inferredTier": "One of: Foundation Builder, Developing Performer, High Performer.",
    "tierRationale": "One sentence grounded in their actual answers."
  },
  "nextStep": {
    "primaryFocus": "The single most productive place to start. One sentence.",
    "approachSignal": "Format: Help them access [state description]."
  },
  "themes": ["3 theme tags. Single words or short phrases."]
}`

export async function generatePortrait(
  firstName: string,
  profile: AthleteProfile,
  answers: QuestionAnswer[]
): Promise<LaRuePortrait> {
  const formatAct = (qs: QuestionAnswer[], offset: number) =>
    qs.map((qa, i) => `Q${offset + i + 1}: ${qa.question}\nA: ${qa.answer}`).join('\n\n')

  const userPrompt = [
    `Athlete first name: ${firstName}`,
    `Age: ${profile.age}`,
    `Date of birth: ${profile.birthdate ?? 'not provided'}`,
    `Gender: ${profile.gender}`,
    `Sport: ${profile.sport}`,
    `Position/event: ${profile.position}`,
    `Competitive level: ${profile.level}`,
    '',
    'Here are their 10 First Read answers:',
    '',
    '**Act 1 -- Who You Are**',
    formatAct(answers.slice(0, 3), 0),
    '',
    '**Act 2 -- The Real Work**',
    formatAct(answers.slice(3, 7), 3),
    '',
    "**Act 3 -- What's Next**",
    formatAct(answers.slice(7, 10), 7),
  ].join('\n')

  const res = await fetch(ANTHROPIC_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY!,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: CLAUDE_MODEL,
      max_tokens: 4096,
      temperature: 0,
      system: PORTRAIT_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userPrompt }],
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Portrait generation failed: ${err}`)
  }

  const data = await res.json()
  const raw: string = data.content?.[0]?.text ?? ''

  console.log('=== RAW CLAUDE OUTPUT (first 1000 chars) ===')
  console.log(raw.slice(0, 1000))
  console.log('=== END RAW OUTPUT ===')

  const cleaned = raw.replace(/^```[\w]*\n?/i, '').replace(/\n?```$/i, '').trim()

  try {
    return JSON.parse(cleaned) as LaRuePortrait
  } catch (e) {
    throw new Error(`Portrait JSON parse failed. Raw output: ${raw.slice(0, 500)}`)
  }
}

const ATHLETE_MD_SYSTEM_PROMPT = `You are a writer and formatter. Your job is to convert a structured JSON athlete portrait into a clean, plain-text markdown file that serves two audiences simultaneously:

1. The athlete themselves -- this is their file. It should read like something written directly to them. Every section should feel true and specific. A 15-year-old should be able to read this and think "that's me." No section should feel like a data dump or config file.

2. Any AI system (ChatGPT, Claude, Delphi, custom GPTs) -- this file will be loaded as context. The structure, headers, and natural-language descriptions give an AI everything it needs without requiring key-value parsing.

Rules:
- Output only valid markdown. No preamble. No commentary after.
- Never use jargon from sport psychology or performance science.
- Write all content in second person ("you", "your").
- Every section must read as natural prose or direct statements -- no key-value pairs, no config-style syntax, no metadata lines that break the voice.
- Keep total file length under 650 words. Every line earns its place.
- Do not add sections not listed in the schema below.
- Date format: Month DD, YYYY
- The primary reader is 13-24 years old. If a sentence would not make sense to a high schooler on first read, rewrite it.

Banned words and phrases -- never use these, even if they appear in the JSON. If a field contains one of these terms, translate it before writing:
  somatic, dysregulation, approval-seeking, hypervigilant, physiological, psychophysiological, self-regulation, rumination, cognitive, schema, metacognitive, arousal, autonomic, parasympathetic, sympathetic, maladaptive, avoidant, attachment, clinical, diagnostic, pathology, approval-driven, performance anxiety

Plain-language replacements (examples -- use your judgment for others):
- "somatic carryover" -> "carrying mistakes in your body"
- "approval-seeking" -> "playing for someone else" or "looking for permission to perform"
- "hypervigilant" -> "on high alert" or "scanning for what could go wrong"
- "approval-driven performance" -> "playing for others"
- "dysregulation" -> "when things start to unravel"
- "arousal regulation" -> "managing your energy"

Translation reference (use these, never the taxonomy terms):

| Taxonomy Term             | Write it as              |
|---------------------------|--------------------------|
| Capacity                  | foundation and recovery  |
| Mental Strength           | belief and confidence    |
| Endurance                 | drive and purpose        |
| Psychological Flexibility | adaptability             |
| Self-Regulation           | self-coaching            |
| Preparation               | getting ready            |
| Immersion                 | full engagement          |
| Adaptation                | in-game adjustment       |
| Energy Optimization       | managing your intensity  |
| Resilience                | bouncing back            |`

export async function generateAthleteMd(
  firstName: string,
  portrait: LaRuePortrait
): Promise<string> {
  const date = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric',
  })

  const userPrompt = `Athlete first name: ${firstName}
Today's date: ${date}

Here is the LaRue JSON portrait:
${JSON.stringify(portrait, null, 2)}

Produce the athlete.md file using exactly this structure:

# ${firstName}
Generated by LaRue | ${date}

You're a {sport} athlete. {One sentence synthesizing dominantQuality_translated and inferredTier into a natural opening. Do not use taxonomy terms. Do not use the word "tier."}

## How I compete at my best
{identity[0]}
{identity[1]}
{identity[2]}

## What unlocks me
{stateUnlocks}

## Under pressure
{pressureState}

- {pressurePatterns[0]}
- {pressurePatterns[1]}
- {pressurePatterns[2]}

## What coaches need to know
{relationshipGets}

> "{coachQuote}"

## What people get wrong about me
{relationshipDoesnt}

## What I'm working toward
{directionWant}

{directionConsistent}

## Where to start
{Write 2-3 sentences that give the athlete one specific, concrete thing to notice or do before their next competition. Draw from approachSignal and primaryFocus in the JSON.

Do NOT summarize their dominant quality or development edge.
Do NOT tell them what to work on long-term.
Do NOT use any banned words.

The register: a trusted older athlete or coach talking to them directly -- honest, specific, and on their side. Give them something they can actually use on Monday, not a concept to study.

Good example register: "Notice when your chest tightens and your hands go cold -- that's your signal. That's the moment you've left the game and started playing for the outcome. You already know what it feels like to just play. The work right now is catching that moment before it catches you."}

{themes[0]} | {themes[1]} | {themes[2]}

IMPORTANT -- before rendering the themes line: translate each theme tag into plain language the athlete would actually use. Tags that read like clinical or academic labels must be rewritten.
  Examples:
  "Somatic carryover" -> "carrying mistakes in your body"
  "Approval-driven performance" -> "playing for others"
  "Flow access without control" -> "flow without the switch"
  "Emotional dysregulation" -> "when things unravel fast"
If a tag already reads like plain athlete language, keep it.

---
*This file was generated by LaRue, a mental performance intelligence system built by Mettle. It's yours -- you can share it with a coach, load it into an AI assistant, or just keep it for yourself. It is not a clinical assessment. mettle.coach*

---`

  const res = await fetch(ANTHROPIC_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY!,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: CLAUDE_MODEL,
      max_tokens: 1000,
      temperature: 0,
      system: ATHLETE_MD_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userPrompt }],
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`athlete.md generation failed: ${err}`)
  }

  const data = await res.json()
  return data.content?.[0]?.text ?? ''
}
