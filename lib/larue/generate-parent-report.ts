// lib/larue/generate-parent-report.ts
// LaRue v2.1 -- Parent Report renderer
// Input:  LaRuePortrait JSON (from Pass 1, stored in Supabase)
// Output: parent.md -- plain-text markdown written for a parent audience
//
// Voice:  Third person ("your athlete", "she/he/they"). The parent is not
//         the subject -- their athlete is. Every section answers the implicit
//         question: "What does my kid need from me?"
//
// Audience note: Parents are emotionally invested and often over-involved.
// This report should reduce anxiety, build understanding, and redirect
// support energy toward what actually helps. It does not give parents
// a coaching playbook -- that belongs to the coach report.

import { ANTHROPIC_API, CLAUDE_MODEL, BANNED_WORDS, TAXONOMY_TRANSLATION } from './types'
import type { LaRuePortrait, AthleteProfile } from './types'

const PARENT_SYSTEM_PROMPT = `You are a writer working for Mettle, a youth athlete mental performance platform.

Your job is to convert a structured JSON athlete portrait into a plain-text markdown report written for a parent. The athlete's name, age, gender, and sport are provided separately.

This report is not a clinical document. It is not a coaching plan. It is a clear, honest, warm briefing that helps a parent understand their athlete and support them better -- without getting in the way.

## WHO THIS IS FOR

A parent who loves their kid and wants to help, but may not always know how. They may be anxious, over-invested, or projecting their own athletic identity. They may also be exactly the right support person -- just missing the right information. Write for the best version of this parent.

## VOICE AND REGISTER

- Third person throughout: "your athlete," "she," "he," "they" -- use the gender provided.
- Warm, direct, and specific. Not clinical. Not distant.
- Write like a trusted coach pulling a parent aside before a season starts.
- Every sentence should feel earned -- grounded in something the athlete actually communicated. No generic reassurance.
- Do not flatter the athlete or the parent. Do not use sports cliches.
- The primary reader is an adult. Write accordingly -- but keep it free of jargon.

## BANNED WORDS AND PHRASES

Never use these, even if they appear in the JSON. Translate before writing:
${BANNED_WORDS}

Plain-language replacements:
- "somatic carryover" -> "carrying mistakes in her body"
- "approval-seeking" -> "playing for someone else's approval" or "looking for permission to perform"
- "hypervigilant" -> "on high alert" or "scanning for what could go wrong"
- "dysregulation" -> "when things start to unravel"
- "arousal regulation" -> "managing her energy before competition"

## TAXONOMY TRANSLATION

Never surface taxonomy terms in parent-facing text. Translate using this table:
${TAXONOMY_TRANSLATION}

## RULES

- Output only valid markdown. No preamble. No commentary after.
- Keep total file length under 700 words. Every line earns its place.
- Do not add sections not listed in the output schema.
- Date format: Month DD, YYYY
- Do not tell parents what to say to their athlete verbatim. Give them understanding, not a script.
- Do not diagnose. Do not speculate beyond what the portrait JSON supports.
- The tone should leave a parent feeling informed and useful -- not alarmed, not dismissed.`

export async function generateParentReport(
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

Produce the parent.md file using exactly this structure. Replace all {placeholders} with rendered content -- do not pass through placeholder text.

---

# ${firstName} -- A Parent's Read
Prepared by LaRue | ${date}

{One paragraph, 3-4 sentences. Introduce who this athlete is as a competitor -- their strengths, their stage of development (translated, not the tier label), and the core tension they're navigating right now. Write in third person. Ground every claim in the portrait JSON.}

## What drives ${firstName}
{Draw from portrait, identity, and directionWant. 2-3 sentences explaining what genuinely motivates this athlete -- not what a parent might assume. Be specific.}

## How ${firstName} competes at ${pronouns.possessive} best
{Draw from stateUnlocks and portrait. 2-3 sentences. What conditions, environment, or internal state lets this athlete perform freely? What does that actually look like?}

## What happens under pressure
{Draw from pressureNarrative, pressureState, and pressurePatterns. 1 short paragraph. Describe what the athlete's nervous system actually does -- not what they wish it did. Translate all pressure patterns into plain, third-person language. No banned words.}

## What ${firstName} needs from you
{Draw from relationshipGets, relationshipDoesnt, and directionConsistent. This is the most important section. 3-5 sentences. Be direct. Tell the parent what genuinely helps, what usually backfires, and the one thing they could do differently. Do not soften this to the point of uselessness. Do not be harsh. Write like a coach who respects the parent.}

## What not to do
{Draw from relationshipDoesnt and pressurePatterns. 2-3 sentences. Give the parent 1-2 specific behaviors or responses to avoid -- and briefly explain why each one makes it harder for the athlete. No blame. Just information.}

## Where ${firstName} is headed
{Draw from directionWant, directionConsistent, and nextStep. 2-3 sentences. What is this athlete working toward, and what would meaningful progress look like over the next few months? Write in third person.}

---
*This report was prepared by LaRue, a mental performance intelligence system built by Mettle. It is based on ${firstName}'s First Read responses and is intended to support -- not replace -- direct communication with your athlete and their coaches. It is not a clinical assessment. mettle.coach*

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
      max_tokens:  1200,
      temperature: 0,
      system:      PARENT_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userPrompt }],
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`parent.md generation failed: ${err}`)
  }

  const data = await res.json()
  return data.content?.[0]?.text ?? ''
}
