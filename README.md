# FinickyWrapper

A lightweight, user‑mode wrapper around Finicky that lets you manage browser routing rules with a simple UI (SwiftDialog) and a zsh backend. The wrapper keeps a single source of truth (`rules.json`), generates `~/.finicky.js`, validates that Finicky accepts it, and rolls back safely on errors.

## Why
- Centralize rules in a structured state file per user
- Discover installed browsers and Chromium profiles automatically
- Provide practical presets (YouTube → Brave, Spotify → app, Slack → app, Microsoft admin → Edge profile, Apple → Safari)
- Ensure safe saves with atomic writes, validation, and rollback

## Architecture
- UI: SwiftDialog (UI only)
- Logic: zsh wrapper script
- State: `~/Library/Application Support/FinickyWrapper/rules.json`
- Managed defaults (optional): `/Library/Application Support/FinickyWrapper/managed.json`
- Output: `~/.finicky.js` (atomic write with backups)
- Validation: success signal in Finicky log; fallback to error parsing

## Key Behaviors
- Rewrites first, then handlers
  - Rewrites: force HTTPS, strip tracking params, deep links (Teams/Spotify/Office), optional `prompt=select_account` for Microsoft
  - Handlers: browser object `{ name, profile }` for Chromium, or native app bundle ID
- Positive success signal
  - Emit `finicky.notify("Browser Rules applied")` on config load; wait up to 3–5s for confirmation
- Safety
  - Atomic write to temp + move, timestamped backups (last 3), rollback on failure, safety mode after repeated failures
- Testing
  - Launch URLs via source app for real‑world checks: `open -a "<Source App>" "<URL>"`; show decision by reading recent logs

## Files in this repo
- `planning.md`: Detailed implementation plan and incremental subtasks
- `backlog.json`: Trackable backlog with epics, tasks, dependencies, and priorities
- `.finicky_example.js`: Working Finicky config this plan is based on
 - `rules.schema.json`: JSON Schema for `rules.json` (v1)
 - `rules.sample.json`: Sample `rules.json` reflecting the initial presets
 - `ui_options.md`: UI coverage mapping for all Finicky v4 options
 - `discovery_targets.md`: Bundle IDs and profile paths to parse

Example config reference:
- `.finicky_example.js:1`

## Roadmap (MVP)
1. Define `rules.json` schema and presets
2. Implement discovery (browsers, profiles, native apps)
3. Build generator (rewrites + handlers) with positive load signal
4. Implement save, validate, and rollback flow
5. Add manual test flow (open via source app + decision output)
6. Ship minimal UI (list/reorder, add rule wizard, test panel)
7. Package for deployment and fleet defaults seeding

## Constraints and Notes
- Safari has no profile selection; disable profile picker for Safari/STP
- Links opened inside a browser won’t hit Finicky (by design)
- Use Chromium directory labels (e.g., `Default`, `Profile 1`) for accuracy
- Office deep links require signed‑in native apps; fallback to web when absent

## Contributing
- Start with `planning.md` and `backlog.json`
- Keep changes minimal and focused; prefer incremental PRs per milestone

## License
- TBD
