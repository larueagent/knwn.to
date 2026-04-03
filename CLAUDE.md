# Project: knwn.to

- Owner: Robert Yang
- Repo: https://github.com/larueagent/knwn.to.git
- Stack: Next.js / TypeScript, Supabase (PostgREST), first-read product, field-notes blog.

## High-level goals

- Maintain and extend knwn.to and the First Read product.
- Use Supabase as the primary data store (first_read_submissions, athlete_profiles, etc.).
- Keep production branch `main` clean and deployable.

## Branch & git rules

- Work happens on feature branches; `main` tracks `origin/main`.
- Do not commit directly to `main` unless explicitly requested.
- Before editing, propose a plan and show diffs.

## Supabase

- Uses Supabase REST API via service key on the server side.
- Key tables (read-only for now):
  - `first_read_submissions`: athlete form submissions.
  - `athlete_profiles`: athlete profile records.
- Never hard-code Supabase keys or secrets in source files.

## Claude behavior

- Always:
  - Explain your plan before large edits.
  - Show diffs or patch-style changes.
  - Prefer small, incremental changes.
- Ask for confirmation before:
  - Changing Supabase schema.
  - Deleting or renaming files.
  - Modifying auth or API keys.

## TODO for Claude

- Help design a safe Supabase MCP/tool layer instead of direct REST calls.
- Help refactor Supabase access into clear functions in `lib/supabase.ts`.
- Help document first-read and field-notes flows (routes, components, APIs).
