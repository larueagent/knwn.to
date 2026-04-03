// lib/larue/generate-report.ts
// LaRue report orchestrator.
//
// Single entry point for all report generation. Fetches athlete + portrait
// from Supabase, calls the appropriate renderer, stores the result in the
// reports table, and returns the stored report id and content.
//
// Does NOT handle delivery (email, Kit tagging) -- that is the caller's
// responsibility after receiving the returned report.

import { supabase }                from '@/lib/supabase'
import { generateAthleteReport }   from './generate-athlete-report'
import { generateParentReport }    from './generate-parent-report'
import { generateCoachReport }     from './generate-coach-report'
import { generateCmpcReport }      from './generate-cmpc-report'
import type { LaRuePortrait, AthleteProfile } from './types'

export type ReportType   = 'athlete' | 'parent' | 'coach' | 'cmpc'
export type TriggerType  = 'scheduled' | 'parent_request' | 'coach_request' | 'manual'

// Generator version tags -- bump when prompt templates change
const GENERATOR_VERSIONS: Record<ReportType, string> = {
  athlete: 'athlete-v2.1',
  parent:  'parent-v2.1',
  coach:   'coach-v2.1',
  cmpc:    'cmpc-v2.1',
}

export interface GenerateReportOptions {
  // Specific submission to use as portrait source.
  // Defaults to the athlete's most recent first_read_submission.
  submissionId?: string
  // State snapshot active at generation time (optional context).
  snapshotId?: string
}

export interface GenerateReportResult {
  id:         string
  content_md: string
  cached:     boolean
}

export async function generateReport(
  athleteId:  string,
  reportType: ReportType,
  trigger:    TriggerType,
  options:    GenerateReportOptions = {}
): Promise<GenerateReportResult> {

  // ── 1. Fetch athlete profile ──────────────────────────────────────────────
  const { data: athlete, error: athleteErr } = await supabase
    .from('athletes')
    .select('first_name, age, gender, sport, position, level')
    .eq('id', athleteId)
    .single()

  if (athleteErr || !athlete) {
    throw new Error(`Athlete not found: ${athleteErr?.message ?? 'no data'}`)
  }

  // ── 2. Fetch portrait from first_read_submissions ─────────────────────────
  let submissionId = options.submissionId

  const submissionQuery = supabase
    .from('first_read_submissions')
    .select('id, portrait_json')
    .eq('athlete_id', athleteId)

  if (submissionId) {
    submissionQuery.eq('id', submissionId)
  } else {
    submissionQuery.order('submitted_at', { ascending: false }).limit(1)
  }

  const { data: submissions, error: submissionErr } = await submissionQuery

  if (submissionErr || !submissions?.length) {
    throw new Error(`No first read submission found: ${submissionErr?.message ?? 'no data'}`)
  }

  const submission = submissions[0]
  submissionId     = submission.id
  const portrait   = submission.portrait_json as LaRuePortrait

  const profile: AthleteProfile = {
    age:      athlete.age,
    gender:   athlete.gender,
    sport:    athlete.sport,
    position: athlete.position,
    level:    athlete.level,
  }

  // ── 3. Check for recent cached report (same type + submission) ────────────
  const { data: existing } = await supabase
    .from('reports')
    .select('id, content_md')
    .eq('athlete_id', athleteId)
    .eq('report_type', reportType)
    .eq('source_submission_id', submissionId)
    .eq('generator_version', GENERATOR_VERSIONS[reportType])
    .order('generated_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (existing) {
    return { id: existing.id, content_md: existing.content_md, cached: true }
  }

  // ── 4. Generate the report ────────────────────────────────────────────────
  const firstName = athlete.first_name
  let content_md: string

  switch (reportType) {
    case 'athlete':
      content_md = await generateAthleteReport(firstName, portrait, profile)
      break
    case 'parent':
      content_md = await generateParentReport(firstName, portrait, profile)
      break
    case 'coach':
      content_md = await generateCoachReport(firstName, portrait, profile)
      break
    case 'cmpc':
      content_md = await generateCmpcReport(firstName, portrait, profile)
      break
  }

  // ── 5. Store in reports table ─────────────────────────────────────────────
  const { data: stored, error: insertErr } = await supabase
    .from('reports')
    .insert({
      athlete_id:           athleteId,
      report_type:          reportType,
      generator_version:    GENERATOR_VERSIONS[reportType],
      trigger,
      source_submission_id: submissionId,
      source_snapshot_id:   options.snapshotId ?? null,
      content_md,
    })
    .select('id')
    .single()

  if (insertErr || !stored) {
    // Non-fatal: report was generated, just not stored. Log and return anyway.
    console.error(`Failed to store ${reportType} report:`, insertErr?.message)
    return { id: '', content_md, cached: false }
  }

  return { id: stored.id, content_md, cached: false }
}
