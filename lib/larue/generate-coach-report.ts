// lib/larue/generate-coach-report.ts
// LaRue v2.1 -- Coach Report renderer
// Input:  LaRuePortrait JSON (from Pass 1, stored in Supabase)
// Output: coach.md -- plain-text markdown written for the athlete's coach
//
// Voice:  Direct address to the coach ("this athlete," "your athlete").
//         Tactical and behavioral. Every section answers the implicit
//         question: "What do I need to do differently with this athlete?"
//
// Audience note: Coaches are time-poor, pattern-experienced, and often
// resistant to sport psychology framing. This report earns credibility
// by being specific and actionable -- not by explaining the methodology.
// No taxonomy. No theory. Just what works for this athlete.

import { ANTHROPIC_API, CLAUDE_MODEL, BANNED_WORDS, TAXONOMY_TRANSLATION } from './types'
import type { LaRuePortrait, AthleteProfile } from './types'

const COACH_SYSTEM_PROMPT = `You are a writer working for Mettle, a youth athlete mental performance platform.

Your job is to convert a structured JSON athlete portrait into a plain-text markdown report written for the athlete's coach. The athlete's name, age, gender, sport, and competitive level are provided separately.

This report is not a sport psychology lecture. It is a precise, practical briefing that gives a coach exactly what they need to work more effectively with this specific athlete -- nothing more.

## WHO THIS IS FOR

A coach who is skilled in their sport but may not have deep sport psychology training. They are busy. They have 12 other athletes. They will read this once, quickly. Make every sentence count. If a sentence doesn't change how a coach behaves, cut it.

## VOICE AND REGISTER

- Address the coach directly: "this athlete," "your athlete," "when she..." -- use the gender provided.
- Tactical and direct. No warmth performativity. No sports cliches.
- Write the way a sport psychology consultant briefs a coaching staff: confident, specific, and on the coach's side.
- Every claim must be grounded in the portrait JSON. No speculation beyond the data.
- Do not explain the methodology. Do not reference Mettle's framework. Just give the coach what they need.

## BANNED WORDS AND PHRASES

Never use these, even if they appear in the JSON. Translate before writing:
${BANNED_WORDS}

Plain-language replacements:
- "arousal regulation" -> "managing energy before competition"
- "dysregulation" -> "when things start to unravel"
- "somatic carryover" -> "carrying missed plays in her body"
- "approval-seeking" -> "performing for the coach's approval" or "playing not to disappoint"
- "hypervigilant" -> "on high alert, scanning for mistakes"

## TAXONOMY TRANSLATION

Never surface taxonomy terms in coach-facing text. Translate using this table:
${TAXONOMY_TRANSLATION}

## RULES

- Output only valid markdown. No preamble. No commentary after.
- Keep total file length under 750 words. Every line earns its place.
- Do not add sections not listed in the output schema.
- Date format: Month DD, YYYY
- Lead with behavior, not psychology. Coaches act on what they observe -- describe observable patterns.
- The "What to try" section must contain concrete, specific actions a coach can take at practice or competition. Not concepts. Not intentions. Actions.
- Do not diagnose. Do not speculate beyond what the portrait JSON supports.`

export async function generateCoachReport(
  firstName: string,
  portrait:  LaRuePortrait,
  profile:   AthleteProfile
): Promise<string> {
  const date = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day:   '2-digit',
    year:  'numeric',
  })

  const pronouns = profile.gender?.toLowerCase().startsWith('f')
    ? { subject: 'she', object: 'her', possessive: 'her' }
    : profile.gender?.toLowerCase().startsWith('m')
    ? { subject: 'he',  object: 'him', possessive: 'his' }
    : { subject: 'they', object: 'them', possessive: 'their' }

  const userPrompt = `Athlete first name: ${firstName}
Age: ${profile.age}
Gender: ${profile.gender}
Sport: ${profile.sport} -- ${profile.position}
Competitive level: ${profile.level}
Pronouns: ${pronouns.subject} / ${pronouns.object} / ${pronouns.possessive}
Today's date: ${date}

Here is the LaRue JSON portrait:
${JSON.stringify(portrait, null, 2)}

Produce the coach.md file using exactly this structure. Replace all {placeholders} with rendered content -- do not pass through placeholder text.

---

# Coaching ${firstName}
Prepared by LaRue | ${date}

{One paragraph, 2-3 sentences. Who is this athlete as a competitor -- their defining quality and the tension they're managing. Write for a coach who has 30 seconds. Be specific. No warmth inflation.}

## In ${pronouns.possessive} own words
> "${portrait.coachQuote}"

{One sentence of context: what this quote tells a coach about how to approach this athlete.}

## What unlocks this athlete
{Draw from stateUnlocks and portrait. 2-3 sentences. Describe the specific conditions -- environmental, relational, internal -- that let this athlete perform freely. Make it observable: what would a coach actually see when this athlete is unlocked?}

## Under pressure -- what you'll observe
{Draw from pressureNarrative, pressureState, and pressurePatterns. Translate all into behavioral, observable language. What does a coach actually see on the field/court/ice when this athlete is under pressure? Use sport-specific language where possible. 1 short paragraph followed by 3 bullet points.}

- {pressurePatterns[0] -- translated to observable, third-person behavioral language}
- {pressurePatterns[1] -- translated to observable, third-person behavioral language}
- {pressurePatterns[2] -- translated to observable, third-person behavioral language}

## What this athlete needs from you
{Draw from relationshipGets, relationshipDoesnt, and coachQuote. 3-4 sentences. Be direct. What coaching approach works with this athlete, and what approach backfires? Name the specific dynamic the athlete needs -- not a general principle.}

## What to try
{Draw from nextStep, approachSignal, and primaryFocus. This is the most important section.

Give the coach 3 concrete, specific actions they can take at practice or pre-competition. Format as a numbered list.

Each action should:
- Be something a coach can do in the next week, not a long-term program
- Reference a specific moment, situation, or interaction type
- Connect directly to what the portrait JSON says about this athlete

Do NOT give abstract principles. Do NOT say "build trust" or "be consistent." Say what to do, when, and why it matters for this specific athlete.}

## The throughline
{Draw from directionConsistent and directionWant. 2-3 sentences. What is the pattern this athlete cannot see in themselves -- the thing a coach with this report can now name and work with? Write it as a coaching insight, not a diagnosis.}

---
*This report was prepared by LaRue, a mental performance intelligence system built by Mettle. It is based on ${firstName}'s First Read responses. It is not a clinical assessment and does not replace direct observation or conversation with the athlete. mettle.coach*

---`

  const res = await fetch(ANTHROPIC_API, {
    method: 'POST',
    headers: {
      'Content-Type':      'application/json',
      'x-api-key':         process.env.ANTHROPIC_API_KEY!,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model:       CLAUDE_MODEL,
      max_tokens:  1400,
      temperature: 0,
      system:      COACH_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userPrompt }],
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`coach.md generation failed: ${err}`)
  }

  const data = await res.json()
  return data.content?.[0]?.text ?? ''
}
