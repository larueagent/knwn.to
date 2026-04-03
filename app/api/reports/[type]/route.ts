// app/api/reports/[type]/route.ts
// On-demand report generation endpoint.
//
// Usage:
//   POST /api/reports/athlete  { athleteId }
//   POST /api/reports/parent   { athleteId }
//   POST /api/reports/coach    { athleteId }
//   POST /api/reports/cmpc     { athleteId }
//
// Optional body fields:
//   submissionId  -- use a specific first_read_submission (defaults to latest)
//   snapshotId    -- attach the active state_snapshot for context
//   trigger       -- 'parent_request' | 'coach_request' | 'manual' (defaults to 'manual')
//
// Auth note: Add your own auth/role check before calling generateReport.
// A coach should only receive coach reports for athletes on their roster.
// A parent should only receive their own athlete's parent report.
// CMPC reports should require explicit practitioner verification.

import { NextResponse }    from 'next/server'
import { generateReport }  from '@/lib/larue/generate-report'
import type { ReportType, TriggerType } from '@/lib/larue/generate-report'

const VALID_TYPES   = new Set<ReportType>(['athlete', 'parent', 'coach', 'cmpc'])
const VALID_TRIGGERS = new Set<TriggerType>(['scheduled', 'parent_request', 'coach_request', 'manual'])

export async function POST(
  req: Request,
  { params }: { params: { type: string } }
) {
  try {
    // ── 1. Validate report type ───────────────────────────────────────────
    const reportType = params.type as ReportType

    if (!VALID_TYPES.has(reportType)) {
      return NextResponse.json(
        { error: `Unknown report type: "${reportType}". Valid types: athlete, parent, coach, cmpc` },
        { status: 400 }
      )
    }

    // ── 2. Parse and validate request body ───────────────────────────────
    const body = await req.json()
    const { athleteId, submissionId, snapshotId, trigger = 'manual' } = body

    if (!athleteId) {
      return NextResponse.json(
        { error: 'Missing required field: athleteId' },
        { status: 400 }
      )
    }

    if (!VALID_TRIGGERS.has(trigger)) {
      return NextResponse.json(
        { error: `Invalid trigger: "${trigger}". Valid values: scheduled, parent_request, coach_request, manual` },
        { status: 400 }
      )
    }

    // ── 3. Generate (or return cached) report ────────────────────────────
    const result = await generateReport(
      athleteId,
      reportType,
      trigger as TriggerType,
      { submissionId, snapshotId }
    )

    return NextResponse.json({
      success:    true,
      reportType,
      athleteId,
      reportId:   result.id,
      cached:     result.cached,
      report:     result.content_md,
    })

  } catch (err: unknown) {
    console.error('Report API error:', err)
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
