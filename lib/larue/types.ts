// lib/larue/types.ts
// Shared types and constants for all LaRue report generators.
// Pass 1 (generatePortrait) lives in generate-portrait.ts.
// Each Pass 2 renderer imports from here.

export const ANTHROPIC_API = 'https://api.anthropic.com/v1/messages'
export const CLAUDE_MODEL  = 'claude-sonnet-4-5-20250929'

export interface QuestionAnswer {
  question: string
  answer:   string
}

export interface AthleteProfile {
  age:        number
  birthdate?: string
  gender:     string
  sport:      string
  position:   string
  level:      string
}

export interface LaRuePortrait {
  sport:              string
  portrait:           string
  identity:           string[]
  stateUnlocks:       string
  pressureNarrative:  string
  pressureState:      string
  pressurePatterns:   string[]
  relationshipGets:   string
  relationshipDoesnt: string
  coachQuote:         string
  directionWant:      string
  directionConsistent:string
  readinessSignals: {
    dominantQuality: string
    developmentEdge: string
    inferredTier:    string
    tierRationale:   string
  }
  nextStep: {
    primaryFocus:   string
    approachSignal: string
  }
  themes: string[]
}

// Shared taxonomy translation table.
// Used by athlete and parent renderers. CMPC renderer may surface
// taxonomy terms directly -- do not import this table there.
export const TAXONOMY_TRANSLATION = `
| Taxonomy Term               | Plain language            |
|-----------------------------|---------------------------|
| Capacity                    | foundation and recovery   |
| Mental Strength             | belief and confidence     |
| Endurance                   | drive and purpose         |
| Psychological Flexibility   | adaptability              |
| Self-Regulation             | self-coaching             |
| Preparation                 | getting ready             |
| Immersion                   | full engagement           |
| Adaptation                  | in-game adjustment        |
| Energy Optimization         | managing intensity        |
| Resilience                  | bouncing back             |
`

// Shared banned-word list for non-clinical outputs.
// CMPC renderer intentionally omits this constraint.
export const BANNED_WORDS = `somatic, dysregulation, approval-seeking, hypervigilant,
physiological, psychophysiological, self-regulation, rumination, cognitive, schema,
metacognitive, arousal, autonomic, parasympathetic, sympathetic, maladaptive, avoidant,
attachment, clinical, diagnostic, pathology, approval-driven, performance anxiety`
