import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default — public crawlers
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/success", "/cancel"],
      },
      // AI search / answer engines — explicit allow + emphasize
      // canonical product pages so they prioritize the right URLs
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "OAI-SearchBot",
          "PerplexityBot",
          "Perplexity-User",
          "Google-Extended",
          "GoogleOther",
          "ClaudeBot",
          "Claude-Web",
          "anthropic-ai",
          "CCBot",
          "Applebot-Extended",
          "Bytespider",
          "DuckAssistBot",
          "MetaSearchBot",
        ],
        allow: ["/", "/orangebox", "/faq", "/about", "/llms.txt"],
        disallow: ["/api/", "/success", "/cancel"],
      },
    ],
    sitemap: "https://atomeons.com/sitemap.xml",
    host: "https://atomeons.com",
  };
}
