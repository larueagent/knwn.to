// lib/larue/generate-cmpc-report.ts
// LaRue v2.1 -- CMPC / Sport Psychologist Report renderer
// Input:  LaRuePortrait JSON (from Pass 1, stored in Supabase)
// Output: cmpc.md -- clinical-adjacent markdown for a sport psych or CMPC
//
// Voice:  Peer-to-peer. LaRue is briefing a qualified practitioner.
//         This is the only output where taxonomy terms, tier classifications,
//         and precise psychophysiological language may surface directly.
//         The banned-word constraint from other renderers does NOT apply here.
//
// Audience note: A CMPC or sport psychologist needs the full picture --
// classification rationale, inferred patterns, and honest uncertainty.
// They will validate, challenge, or build on this read in session.
// Do not oversell the portrait. Do not soften the hard observations.
// Write like a well-informed intake summary from a trusted referral source.

import { ANTHROPIC_API, CLAUDE_MODEL } from './types'
import type { LaRuePortrait, AthleteProfile } from './types'

// No BANNED_WORDS import -- CMPC renderer intentionally allows clinical language.
// No TAXONOMY_TRANSLATION import -- taxonomy terms surface directly here.

const CMPC_SYSTEM_PROMPT = `You are a writer working for Mettle, a youth athlete mental performance platform built on the ACSI-28 and state-first readiness methodology developed by Dr. Alex Auerbach.

Your job is to convert a structured JSON athlete portrait into a clinical-adjacent intake summary written for a Certified Mental Performance Consultant (CMPC) or licensed sport psychologist. The athlete's name, age, gender, sport, and competitive level are provided separately.

## WHO THIS IS FOR

A CMPC or sport psychologist who is meeting this athlete for the first time, or who has been asked to consult on the athlete's mental performance. They have formal training. They can read taxonomy terms. They want to know what LaRue found, how confident the inference is, and where they should probe further in session.

## VOICE AND REGISTER

- Peer-to-peer. You are briefing a qualified practitioner, not explaining sport psychology to a layperson.
- Clinical precision is appropriate here. Taxonomy terms, tier classifications, and psychophysiological language may appear where they are accurate and useful.
- Be honest about inference confidence. If a pattern is strongly supported by the athlete's answers, say so. If it is inferred from limited signal, flag it.
- Do not oversell the portrait. Do not manufacture certainty. This is an intake read -- a starting point, not a diagnosis.
- Write in third person: "the athlete," "she/he/they."

## FRAMEWORK REFERENCE

The LaRue classification system maps to two layers:

Foundational Qualities (developed over time):
- Capacity -- baseline stress tolerance, recovery, wellness foundation
- Mental Strength -- self-efficacy, beliefs about self under challenge
- Endurance -- purpose, meaning, sustained motivation
- Psychological Flexibility -- adaptability, reframing, openness to change
- Self-Regulation -- structured learning, feedback integration, self-monitoring

Performance Principles (accessed during competition):
- Preparation -- purposeful readiness, mental and physical pre-performance
- Immersion -- full engagement, present-moment commitment, flow access
- Adaptation -- in-game adjustment, response to adversity and novelty
- Energy Optimization -- arousal regulation, managing thinking under pressure
- Resilience -- recovery from setbacks within and across competitions

Tier logic:
- Foundation Builder -- managing baseline function; developmental scaffolding is primary need
- Developing Performer -- foundation present; building consistency under pressure
- High Performer -- foundation solid; refinement, integration, and ceiling work

## RULES

- Output only valid markdown. No preamble. No commentary after.
- Keep total file length under 900 words.
- Do not add sections not listed in the output schema.
- Date format: Month DD, YYYY
- Flag inference confidence where relevant: "strongly supported," "inferred from limited signal," "warrants direct assessment."
- Do not diagnose. Do not make clinical determinations. This is a mental performance intake read, not a psychological evaluation.
- Surface contradictions or ambiguities in the portrait data -- a good practitioner wants to know where the read is uncertain.`

export async function generateCmpcReport(
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

Produce the cmpc.md file using exactly this structure. Replace all {placeholders} with rendered content -- do not pass through placeholder text.

---

# LaRue Intake Summary -- ${firstName}
Prepared for practitioner review | ${date}
*Not for distribution to the athlete or parents without practitioner review.*

## Classification
**Dominant Quality:** {readinessSignals.dominantQuality}
**Development Edge:** {readinessSignals.developmentEdge}
**Inferred Tier:** {readinessSignals.inferredTier}
**Rationale:** {readinessSignals.tierRationale -- verbatim from JSON, or lightly clarified if needed}

{One paragraph, 3-4 sentences. Synthesize the classification: what the dominant quality and development edge mapping tells a practitioner about where this athlete's mental performance system is under- or over-developed, and what the tier classification implies about appropriate intervention depth and pacing.}

## Athlete Portrait (LaRue read)
{portrait -- verbatim or lightly edited for clinical precision. This is the internal read, not the athlete-facing version. The full picture.}

## Pressure Profile
**Inferred psychophysiological default:** {pressureState -- may use clinical language here}

{pressureNarrative -- verbatim or lightly edited. Include all observable and inferred patterns.}

**Pressure patterns (for session probing):**
- {pressurePatterns[0]}
- {pressurePatterns[1]}
- {pressurePatterns[2]}

**Inference confidence:** {Assess each pressure pattern. Which are strongly supported by the athlete's direct answers? Which are inferred? Flag patterns that warrant direct assessment in session.}

## Identity and Motivation Structure
{Draw from identity, stateUnlocks, directionWant, and directionConsistent.

2-3 sentences on the athlete's self-concept as a competitor -- what they believe about themselves, and how stable or contingent that belief appears to be.

1-2 sentences on their motivation structure: is it internally anchored (mastery, meaning) or externally contingent (approval, outcome)? Note signal strength.

1-2 sentences on directionConsistent -- the throughline the athlete could not articulate. Flag if this conflicts with their stated directionWant.}

## Coaching and Relational Dynamics
{Draw from relationshipGets, relationshipDoesnt, coachQuote.

2-3 sentences. What does this athlete's relational pattern with authority figures (coaches, practitioners) appear to be? What approach is likely to build working alliance quickly? What approach is likely to rupture it?

Note any patterns that may transfer to the therapeutic/consulting relationship.}

## Recommended Entry Point
{Draw from nextStep.primaryFocus and nextStep.approachSignal.

2-3 sentences. Given the tier classification and dominant quality, what is the most productive first-session focus? What intervention approach does the approachSignal suggest?

Be specific about modality fit if the portrait data supports it (e.g., acceptance-based approaches, imagery, attentional training, values clarification). Flag where the data is insufficient to support a modality recommendation.}

## Open Questions for Session
{Generate 3-4 specific questions a practitioner should bring into first session to validate or challenge the LaRue read. These should be grounded in gaps or ambiguities in the portrait data -- not generic intake questions.

Format as a numbered list. Each question should name the specific thing it is probing and why the portrait data left it uncertain.}

## Data Provenance
This summary is derived from a 10-question First Read intake completed by the athlete. It is not based on psychometric instruments, direct observation, or clinical interview. The ACSI-28 framework and state-first readiness methodology (Dr. Alex Auerbach) shape the classification logic. All inferences should be treated as hypotheses pending direct practitioner assessment.

---
*Prepared by LaRue, a mental performance intelligence system built by Mettle. For practitioner use only. Not a clinical assessment. Not for redistribution without practitioner review. mettle.coach*

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
      max_tokens:  1800,
      temperature: 0,
      system:      CMPC_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userPrompt }],
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`cmpc.md generation failed: ${err}`)
  }

  const data = await res.json()
  return data.content?.[0]?.text ?? ''
}
