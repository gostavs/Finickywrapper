# UI Options Coverage (Finicky v4)

This document maps Finicky v4 configuration capabilities to FinickyWrapper UI fields so users can configure all supported behaviors without writing code. Advanced fields are provided for function-based options.

## General
- Options
  - checkForUpdates: boolean
  - logRequests: boolean
- Default browser
  - Static: choose app (name/bundleId/path) and optional Chromium profile

## Matching URLs
- Methods (any combination)
  - Strings with wildcards: add one or more patterns (e.g., `*.example.com/*`)
  - Regular expressions: add one or more regex strings
  - Domains list: convenience input expanded to `*.domain/*` and `domain/*`
  - URL contains: one or more substrings (matches href)
  - File extensions: one or more extensions
  - Source apps filter: list of opener bundle IDs
  - Advanced function: JavaScript function body returning boolean `(url, options) => boolean`

## Selecting a Browser (Handler destination)
- Static
  - Browser by name (appName) with optional Chromium profile
  - Browser by bundleId
  - Browser by appPath
- Options
  - openInBackground: toggle
  - appType: appName | bundleId | appPath (auto-detected by selection; override advanced)
- Native app handoff
  - Choose installed app by bundleId (e.g., Slack, Spotify, Teams, Zoom)
- Dynamic (advanced)
  - Function body returning a name/bundleId/path string or `{ name, profile?, openInBackground? }`

## Rewriting URLs
- Global rewrite rules (executed before handlers)
  - Simple replacement to fixed string URL
  - Replacement to specific URL (string parsed as URL)
  - Advanced function: function body `(url, options) => URL|string`
- Per-rule curated rewrites (convenience toggles)
  - Force HTTPS
  - Strip tracking params (block list with optional allowlist)
  - Microsoft prompt=select_account (login.microsoftonline.com)
  - Spotify deep links (spotify:...)
  - Teams deep links (msteams:...)
  - Office deep links (ms-word|ms-excel|ms-powerpoint:...)

## Function Parameters (for advanced fields)
- Provided to all advanced functions as in Finicky v4
  - url: URL object
  - options.opener: { name, bundleId, path } | null

## Utility Functions surfaced
- finicky.matchHostnames([...]) helper preset in match UI
- Show modifier keys helper reference (informational)
- console.log/warn/error guidance for debugging (informational)

## Notes
- Safari profiles are not supported; profile control appears only for Chromium browsers.
- When dynamic functions are set, they take precedence over static fields for that section.
- UI validates code blocks for basic syntax but does not execute them until generation time.
