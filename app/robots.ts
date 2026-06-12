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
      // AI search / answer engines — explicit allow.
      // The 4-pillar strategy is to BE the canonical answer source
      // for AI-search queries about "what AI tool should I use," "how
      // to make money with AI," "AI for beginners," etc. Every major
      // AI crawler is welcome on every surface except billing webhooks.
      {
        userAgent: [
          // OpenAI
          "GPTBot",
          "ChatGPT-User",
          "OAI-SearchBot",
          // Perplexity
          "PerplexityBot",
          "Perplexity-User",
          // Google AI surfaces
          "Google-Extended",
          "GoogleOther",
          "Googlebot-Extended",
          // Anthropic
          "ClaudeBot",
          "Claude-Web",
          "anthropic-ai",
          "Claude-SearchBot",
          // Common Crawl (feeds many AI training corpora)
          "CCBot",
          // Apple
          "Applebot",
          "Applebot-Extended",
          // ByteDance (TikTok / Doubao)
          "Bytespider",
          // DuckDuckGo AI
          "DuckAssistBot",
          // Meta
          "MetaSearchBot",
          "Meta-ExternalAgent",
          // Microsoft Copilot
          "BingPreview",
          "Microsoft-Edge-Crawler",
          // You.com
          "YouBot",
          // Brave Search / Leo
          "BraveBot",
          // Mistral AI
          "MistralAI-User",
          // Cohere
          "cohere-ai",
          // Kagi
          "Kagibot",
          // Andi search
          "Andibot",
          // Diffbot (feeds enterprise AI knowledge graphs)
          "Diffbot",
          // Generic AI agent identifiers
          "AI2Bot",
          "FacebookBot",
          "Timpibot",
          "ImagesiftBot",
        ],
        allow: ["/"],
        disallow: ["/api/", "/success", "/cancel"],
      },
    ],
    sitemap: [
      "https://atomeons.com/sitemap.xml",
      "https://atomeons.com/sitemap-ai.xml",
    ],
    // Wave 50 · 2026-06-12 · removed `host:` directive · it's deprecated
    // since 2019 (only honored by old Yandex) · Lighthouse flagged it
    // as making robots.txt invalid. The Sitemap: line above is the
    // canonical way to advertise the host now.
  };
}
