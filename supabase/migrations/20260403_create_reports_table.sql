-- Migration: create reports table
-- Stores all LaRue-generated markdown reports across report types and audiences.
-- report_type is intentionally open text (not enum) to support new report types
-- without schema migrations.

CREATE TABLE public.reports (
  id                   uuid        NOT NULL DEFAULT uuid_generate_v4(),
  athlete_id           uuid        NOT NULL,
  report_type          text        NOT NULL, -- 'athlete' | 'parent' | 'coach' | 'cmpc' | ...
  generator_version    text,                 -- e.g. 'parent-v2.1', 'coach-v2.1'
  trigger              text        NOT NULL, -- 'scheduled' | 'parent_request' | 'coach_request' | 'manual'
  source_submission_id uuid,                 -- first_read_submissions row used as portrait source
  source_snapshot_id   uuid,                 -- state_snapshots row active at generation time (nullable)
  content_md           text        NOT NULL, -- rendered markdown output
  sent_at              timestamptz,          -- when delivered to recipient
  kit_tagged_at        timestamptz,          -- when tagged in ConvertKit
  generated_at         timestamptz NOT NULL DEFAULT now(),
  created_at           timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT reports_pkey
    PRIMARY KEY (id),

  CONSTRAINT reports_athlete_id_fkey
    FOREIGN KEY (athlete_id) REFERENCES public.athletes(id),

  CONSTRAINT reports_source_submission_id_fkey
    FOREIGN KEY (source_submission_id) REFERENCES public.first_read_submissions(id),

  CONSTRAINT reports_source_snapshot_id_fkey
    FOREIGN KEY (source_snapshot_id) REFERENCES public.state_snapshots(id),

  CONSTRAINT reports_report_type_check
    CHECK (report_type <> ''),

  CONSTRAINT reports_trigger_check
    CHECK (trigger IN ('scheduled', 'parent_request', 'coach_request', 'manual'))
);

-- Fetch all reports for an athlete
CREATE INDEX reports_athlete_id_idx
  ON public.reports (athlete_id);

-- Fetch latest report of a given type for an athlete
CREATE INDEX reports_athlete_type_generated_idx
  ON public.reports (athlete_id, report_type, generated_at DESC);

-- Find unsent reports
CREATE INDEX reports_sent_at_idx
  ON public.reports (sent_at)
  WHERE sent_at IS NULL;

COMMENT ON TABLE public.reports IS
  'LaRue-generated markdown reports. report_type is open text to allow new types without migrations.';

COMMENT ON COLUMN public.reports.report_type IS
  'Audience target: athlete | parent | coach | cmpc | team | recruiter | ...';

COMMENT ON COLUMN public.reports.generator_version IS
  'Identifies which prompt template version produced this report, e.g. parent-v2.1';

COMMENT ON COLUMN public.reports.trigger IS
  'What initiated generation: scheduled monthly run, on-demand request, or manual admin action';

COMMENT ON COLUMN public.reports.source_submission_id IS
  'The first_read_submissions row whose portrait_json was used as input';

COMMENT ON COLUMN public.reports.source_snapshot_id IS
  'The state_snapshots row active at generation time. Null if no snapshot existed yet';
