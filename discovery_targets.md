# Discovery Targets

This reference lists bundle identifiers and profile storage locations to support discovery.

## Browsers (bundle IDs)
- Microsoft Edge: `com.microsoft.edgemac`
  - Edge Beta: `com.microsoft.edgemac.Beta`
  - Edge Dev: `com.microsoft.edgemac.Dev`
  - Edge Canary: `com.microsoft.edgemac.Canary`
- Google Chrome: `com.google.Chrome`
  - Chrome Canary: `com.google.Chrome.canary`
- Brave: `com.brave.Browser`
  - Brave Beta: `com.brave.Browser.beta`
  - Brave Nightly: `com.brave.Browser.nightly`
- Safari: `com.apple.Safari`
  - Safari Technology Preview: `com.apple.SafariTechnologyPreview`
- Optional extras (no profile selection in Finicky):
  - Firefox: `org.mozilla.firefox`
  - Vivaldi: `com.vivaldi.Vivaldi`
  - Opera: `com.operasoftware.Opera`
  - Arc: `company.thebrowser.Browser`
  - Orion: `com.kagi.kagimacOS` (verify)

Scan locations:
- `/Applications`
- `~/Applications`

## Chromium profile “Local State” paths
- Chrome: `~/Library/Application Support/Google/Chrome/Local State`
- Chrome Canary: `~/Library/Application Support/Google/Chrome Canary/Local State`
- Edge: `~/Library/Application Support/Microsoft Edge/Local State`
- Edge Beta: `~/Library/Application Support/Microsoft Edge Beta/Local State`
- Edge Dev: `~/Library/Application Support/Microsoft Edge Dev/Local State`
- Edge Canary: `~/Library/Application Support/Microsoft Edge Canary/Local State`
- Brave: `~/Library/Application Support/BraveSoftware/Brave-Browser/Local State`
- Brave Beta: `~/Library/Application Support/BraveSoftware/Brave-Browser-Beta/Local State`
- Brave Nightly: `~/Library/Application Support/BraveSoftware/Brave-Browser-Nightly/Local State`

Notes:
- Profiles are listed in `profile.info_cache` mapping directory labels (e.g., `Default`, `Profile 1`) to objects with `name` (display name).
- Always write the directory label to Finicky; show display name in UI.

## Native app handoffs (bundle IDs)
- Slack: `com.tinyspeck.slackmacgap`
- Spotify: `com.spotify.client`
- Microsoft Teams (New): `com.microsoft.teams2`
- Microsoft Teams (Classic): `com.microsoft.teams`
- Zoom: `us.zoom.xos`

## Unified log (validation)
- Subsystem: `net.kampe.finicky`
- Positive signal recommended in generated config: `finicky.notify("Browser Rules applied")`
