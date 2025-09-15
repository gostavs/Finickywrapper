# FinickyWrapper: Implementation Plan

This plan breaks the FinickyWrapper MVP into incremental, verifiable tasks. It is based on the included working Finicky config (see `.finicky_example.js`) and the agreed design: SwiftDialog UI, zsh wrapper for discovery/state/generation/validation, and Finicky for routing.

## Milestone 0 — Baseline
- Inventory example config and targets
  - Extract rules, targets, and rewrites from `.finicky_example.js`.
  - Record bundle IDs and browser names required by presets.
- Decide schema versioning and precedence
  - Define `schemaVersion`, rule `id`, `managed` flag, and ordering semantics.
  - Define precedence between managed defaults and user rules.
- Define file locations
  - State: `~/Library/Application Support/FinickyWrapper/rules.json`.
  - Managed seed (optional): `/Library/Application Support/FinickyWrapper/managed.json`.
  - Generated config: `~/.finicky.js` with atomic write and backups.

## Milestone 1 — Schema and Presets
- Define `rules.json` schema (v1)
  - Top-level: `schemaVersion`, `rules`, `options`, `metadata`.
  - Top-level global `rewrite` array to mirror Finicky v4.
  - Rule: `id`, `name`, `enabled`, `order`, `match` (type+values+source filter), `action` (browser/app, profile, rewrites), `managed`, `notes`.
  - Advanced fields: match.function, action.dynamicDestination, rewrite.urlFunction; destination.appType, destination.openInBackground.
  - Rewrites: `forceHttps`, `stripTracking` (allow/block lists), `msPromptSelectAccount`.
- Lock initial preset set
  - Microsoft admin → Edge Profile 3 + `prompt=select_account`.
  - NAV/cloud.microsoft.com → Edge Default.
  - YouTube → Brave.
  - Spotify → Spotify app.
  - Slack → Slack app.
  - Apple dev/business → Safari.
- Create schema validation checklist
  - Required fields, allowed values, id uniqueness, and ordering continuity.

Artifacts produced in this milestone:
- `rules.schema.json` — JSON Schema for `rules.json` (v1).
- `rules.sample.json` — Sample rules file reflecting presets from `.finicky_example.js`.

## Milestone 2 — Discovery Layer
- Browser/app discovery
  - Scan `/Applications` and `~/Applications` for known bundle IDs (Edge/Chrome/Brave/Safari, optional Arc/Orion/Firefox).
  - Output normalized display names and bundle identifiers.
- Chromium profile discovery
  - Parse each app’s `Local State` JSON to list directory labels (e.g., `Default`, `Profile 1`) and display names.
  - Cache and refresh on Save; always write directory labels to Finicky.
- Native app presence
  - Probe Slack, Spotify, Teams (New/Classic), Zoom bundle IDs for handoff targets.

## Milestone 3 — Generator
- Mapping and phases
  - Phase 1: apply rewrites (HTTPS, tracking params, Teams/Spotify/Office deep links).
  - Phase 2: select destination (browser object or bundle ID string).
- Output format
  - Prefer Finicky object `{ name: "<Browser>", profile: "<Profile Dir Label>" }` for Chromium.
  - Use bundle ID strings for native apps (e.g., `com.tinyspeck.slackmacgap`).
- Include positive load signal
  - Emit a `finicky.notify("Browser Rules applied")` on config load (rate-limited).

## Milestone 4 — Save, Validate, and Rollback
- Atomic write
  - Write to `~/.finicky.js.tmp`, fsync, then move to `~/.finicky.js`.
- Backups
  - Keep timestamped backups and rotate last 3 known-good.
- Trigger reload
  - `open -a Finicky` to prompt Finicky to reload configuration.
- Validate
  - Bounded wait (3–5s) on the unified log (`net.kampe.finicky`) for a success signal; fall back to parsing error lines.
  - On failure: restore previous backup; surface first meaningful error line and likely rule.
- Safety mode
  - After 2 consecutive failures, pin last known-good and block further writes until user edits rules.

## Milestone 5 — Test Flow (Manual)
- Real-world test
  - Allow testing by launching a source app: `open -a "<Source App>" "<URL>"`.
  - Show “Decision: <target>” by reading the recent Finicky log entries.

## Milestone 6 — UI (SwiftDialog)
- Home view
  - List rules with enable/disable and drag-to-reorder.
  - Add/duplicate/remove; indicate managed/locked rules.
- Add rule wizard
  - Match types: Domains, URL contains, Regex, Source app, File extension, Advanced matcher function.
  - Destination: Browser (appName/bundleId/appPath) + profile picker (Chromium only), openInBackground, or native app handoff; Advanced dynamic destination function.
  - Global rewrite rules: string/URL replacement or Advanced function.
  - Optional per-rule rewrites: HTTPS, strip tracking, Microsoft prompt, Spotify/Teams/Office deep links.
- Test panel
  - URL input + source app selector + “Open via Finicky”.

UI coverage reference: see `ui_options.md` for full mapping to Finicky v4 options.

## Milestone 7 — Packaging and Deployment
- Packaging
  - Ship SwiftDialog + zsh wrapper as a pkg; run in user context.
- Defaults and seeding
  - Drop managed seed file for fleet defaults; seed on first run.
- Uninstall
  - Restore last non-wrapper `.finicky.js` if present; remove state.

---

# Incremental Subtasks (Checklist)

1. Schema and presets
- Draft `rules.json` schema (v1) and sample.
- List bundle IDs and profile paths.
- Encode baseline presets from `.finicky_example.js`.

2. Discovery
- Implement bundle discovery for browsers.
- Implement Chromium profile discovery for Chrome/Edge/Brave.
- Implement native app presence checks.

3. Generator
- Implement rewrite phase (HTTPS, tracking, Teams/Spotify/Office).
- Implement handler phase (browser object or bundle ID).
- Output `.finicky.js` content template with `notify`.

4. Save/Validate
- Implement atomic write + backups.
- Trigger Finicky reload.
- Implement positive success signal wait; parse errors as fallback.
- Implement rollback and safety mode.

5. Test Flow
- Run test URL via chosen source app.
- Capture and display recent decision from the log.

6. UI
- Home list: load/save state, reorder, toggle enable.
- Wizard: match types, destination, rewrites.
- Test panel wired to wrapper.

7. Packaging
- Build pkg with SwiftDialog + wrapper.
- Seed managed defaults and handle first-run.
- Document uninstall/restore.

---

# References
- Working example: `.finicky_example.js`
- Finicky docs: configuration, handlers, rewriting, `notify`.
