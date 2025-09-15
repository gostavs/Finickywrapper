// ~/.finicky.js  — Finicky v4
export default {
  options: { logRequests: false },
  // Use exact Edge profile: e.g. "Microsoft Edge:Default" or ":Profile 1"
  defaultBrowser: "Microsoft Edge:Default",

  handlers: [
    // Work admin profile"
    {
      match: [
        "portal.azure.com/*",
        "entra.microsoft.com/*",
        "intune.microsoft.com/*",
        "endpoint.microsoft.com/*",
	"security.microsoft.com/*"
      ],
      browser: "Microsoft Edge:Profile 3",
    },

    // Regular work profile
    {
      match: [
        "navno.*.com/*",
        "navno.*.no/*",
        "*minwintid*",
        "*.cloud.microsoft.com/*",
      ],
      browser: "Microsoft Edge:Default",
    },

    // YouTube in Brave
    { match: ["*.youtube.com/*", "youtu.be/*", "*.music.youtube.com/*"], browser: "Brave Browser" },

    // Spotify → Spotify app
    {
      match: [/^https?:\/\/(open\.spotify\.com|spotify\.link)\//i],
      url: ({ url }) => {
        const [type, id] = url.pathname.split("/").filter(Boolean);
        return type && id ? new URL(`spotify:${type}:${id}`) : new URL("spotify:");
      },
      browser: "com.spotify.client",
    },

    // Slack → Slack app
    { match: ["*.slack.com/*", "slack.com/*", "slack-redir.net/*"], browser: "com.tinyspeck.slackmacgap" },

    // Teams meetings → Teams app
    {
      match: /teams\.microsoft\.com\/(.*meetup-join|l\/)/i,
      url: ({ url }) => new URL(`msteams:${url.pathname}${url.search || ""}`),
      browser: "com.microsoft.teams2",
    },

    // Apple → Safari
    {
      match: [
        "business.apple.com/",
        "developer.apple.com/",
        "appstoreconnect.apple.com/",
        "idmsa.apple.com/",
      ],
      browser: "Safari",
    },
  ],
};

