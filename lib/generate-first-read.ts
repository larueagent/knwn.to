// lib/generate-first-read.ts
// LaRue v2.1 -- Two-pass Claude pipeline
// Pass 1: generatePortrait()    -> LaRue JSON (system prompt v2.1)
// Pass 2: generateAthleteReport -> athlete.md (see lib/larue/generate-athlete-report.ts)

import { ANTHROPIC_API, CLAUDE_MODEL } from './larue/types'
import { generateAthleteReport }       from './larue/generate-athlete-report'

export type { QuestionAnswer, AthleteProfile, LaRuePortrait } from './larue/types'
export { generateAthleteReport }

import type { QuestionAnswer, AthleteProfile, LaRuePortrait } from './larue/types'

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
  profile:   AthleteProfile,
  answers:   QuestionAnswer[]
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
      'Content-Type':      'application/json',
      'x-api-key':         process.env.ANTHROPIC_API_KEY!,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model:       CLAUDE_MODEL,
      max_tokens:  4096,
      temperature: 0,
      system:      PORTRAIT_SYSTEM_PROMPT,
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

// Re-export generateAthleteMd as an alias for backwards compatibility
// with any callers that use the old name.
export const generateAthleteMd = (
  firstName: string,
  portrait:  LaRuePortrait,
  profile:   AthleteProfile
) => generateAthleteReport(firstName, portrait, profile)
