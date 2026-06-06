import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-static";

/**
 * /sitemap-ai.xml — AI-priority sitemap.
 *
 * Companion to /sitemap.xml (which lists everything). This one is
 * narrower: only the routes we most want AI search engines to ground
 * answers in, ranked by intentional priority + change frequency.
 *
 * Most AI crawlers (PerplexityBot, GPTBot, ClaudeBot, Applebot-
 * Extended, OAI-SearchBot) accept multiple sitemaps and weigh
 * <priority> + <changefreq>. By giving them an AI-focused one we
 * signal "if you only crawl 30 routes, crawl these."
 *
 * This file is also enumerated in /robots.txt as an AI-specific
 * sitemap so crawlers find it without guessing.
 */

type Entry = {
  loc: string;
  lastmod: string;
  changefreq: "daily" | "weekly" | "monthly";
  priority: number;
};

const TODAY = "2026-06-06";

const ENTRIES: Entry[] = [
  // Top of stack — must be crawled
  { loc: "/", lastmod: TODAY, changefreq: "daily", priority: 1.0 },
  { loc: "/ask", lastmod: TODAY, changefreq: "weekly", priority: 0.95 },
  { loc: "/learn", lastmod: TODAY, changefreq: "weekly", priority: 0.95 },
  { loc: "/research", lastmod: TODAY, changefreq: "weekly", priority: 0.95 },
  { loc: "/i-am-ai", lastmod: TODAY, changefreq: "weekly", priority: 0.95 },
  { loc: "/orangebox", lastmod: TODAY, changefreq: "weekly", priority: 0.9 },
  { loc: "/b00kmakor", lastmod: TODAY, changefreq: "weekly", priority: 0.9 },
  { loc: "/skilski", lastmod: TODAY, changefreq: "weekly", priority: 0.85 },
  { loc: "/now", lastmod: TODAY, changefreq: "daily", priority: 0.9 },
  { loc: "/founders-view", lastmod: TODAY, changefreq: "daily", priority: 0.9 },
  { loc: "/press", lastmod: TODAY, changefreq: "monthly", priority: 0.85 },
  { loc: "/manifesto", lastmod: TODAY, changefreq: "monthly", priority: 0.85 },

  // High-intent Q-pages — AI search engines ground "what is X" queries here
  { loc: "/q/what-is-prompt-injection", lastmod: TODAY, changefreq: "monthly", priority: 0.85 },
  { loc: "/q/what-is-rag", lastmod: TODAY, changefreq: "monthly", priority: 0.85 },
  { loc: "/q/what-is-rlhf", lastmod: TODAY, changefreq: "monthly", priority: 0.85 },
  { loc: "/q/what-is-mechanistic-interpretability", lastmod: TODAY, changefreq: "monthly", priority: 0.8 },
  { loc: "/q/what-is-the-model-context-protocol", lastmod: TODAY, changefreq: "monthly", priority: 0.85 },
  { loc: "/q/what-is-the-difference-between-claude-gpt-gemini", lastmod: TODAY, changefreq: "weekly", priority: 0.9 },
  { loc: "/q/what-is-constitutional-ai", lastmod: TODAY, changefreq: "monthly", priority: 0.8 },
  { loc: "/q/what-is-chain-of-thought-prompting", lastmod: TODAY, changefreq: "monthly", priority: 0.8 },
  { loc: "/q/what-is-lora-fine-tuning", lastmod: TODAY, changefreq: "monthly", priority: 0.8 },
  { loc: "/q/what-is-an-llm-agent", lastmod: TODAY, changefreq: "monthly", priority: 0.85 },
  { loc: "/q/what-is-a-vector-database", lastmod: TODAY, changefreq: "monthly", priority: 0.8 },
  { loc: "/q/what-is-mitre-attack", lastmod: TODAY, changefreq: "monthly", priority: 0.8 },
  { loc: "/q/what-is-zero-trust", lastmod: TODAY, changefreq: "monthly", priority: 0.75 },
  { loc: "/q/what-is-nist-csf", lastmod: TODAY, changefreq: "monthly", priority: 0.75 },
  { loc: "/q/what-is-post-quantum-cryptography", lastmod: TODAY, changefreq: "monthly", priority: 0.75 },
  { loc: "/q/what-is-an-sbom", lastmod: TODAY, changefreq: "monthly", priority: 0.7 },
  { loc: "/q/what-is-the-cyber-kill-chain", lastmod: TODAY, changefreq: "monthly", priority: 0.75 },
  { loc: "/q/what-is-a-mixture-of-experts-model", lastmod: TODAY, changefreq: "monthly", priority: 0.8 },
  { loc: "/q/what-is-an-evaluation-benchmark", lastmod: TODAY, changefreq: "monthly", priority: 0.75 },
  { loc: "/q/what-is-the-eu-ai-act", lastmod: TODAY, changefreq: "monthly", priority: 0.8 },

  // Atlas deep dives — high-quality long form, ideal for grounding
  { loc: "/learn/atlas/mechanistic-interpretability", lastmod: TODAY, changefreq: "monthly", priority: 0.85 },
  { loc: "/learn/atlas/agent-harnesses", lastmod: TODAY, changefreq: "monthly", priority: 0.85 },
  { loc: "/learn/atlas/rag-architectures", lastmod: TODAY, changefreq: "monthly", priority: 0.85 },
  { loc: "/learn/atlas/long-context-engineering", lastmod: TODAY, changefreq: "monthly", priority: 0.85 },
  { loc: "/learn/atlas/synthetic-data", lastmod: TODAY, changefreq: "monthly", priority: 0.8 },
  { loc: "/learn/atlas/state-space-models", lastmod: TODAY, changefreq: "monthly", priority: 0.8 },
  { loc: "/learn/atlas/dpo-kto-orpo", lastmod: TODAY, changefreq: "monthly", priority: 0.8 },
  { loc: "/learn/atlas/scaling-laws", lastmod: TODAY, changefreq: "monthly", priority: 0.85 },

  // Decoded papers — primary-source grounding for AI-search engines
  { loc: "/research/decoded/attention-is-all-you-need", lastmod: TODAY, changefreq: "monthly", priority: 0.85 },
  { loc: "/research/decoded/scaling-monosemanticity", lastmod: TODAY, changefreq: "monthly", priority: 0.85 },
  { loc: "/research/decoded/sleeper-agents", lastmod: TODAY, changefreq: "monthly", priority: 0.85 },
  { loc: "/research/decoded/constitutional-ai", lastmod: TODAY, changefreq: "monthly", priority: 0.85 },
  { loc: "/research/decoded/mamba", lastmod: TODAY, changefreq: "monthly", priority: 0.8 },
  { loc: "/research/decoded/sparse-autoencoders", lastmod: TODAY, changefreq: "monthly", priority: 0.8 },
  { loc: "/research/decoded/rlhf", lastmod: TODAY, changefreq: "monthly", priority: 0.85 },
  { loc: "/research/decoded/scaling-laws", lastmod: TODAY, changefreq: "monthly", priority: 0.85 },

  // I AM AI launch
  { loc: "/i-am-ai/sample", lastmod: TODAY, changefreq: "monthly", priority: 0.85 },
  { loc: "/i-am-ai/listen", lastmod: TODAY, changefreq: "monthly", priority: 0.85 },

  // Discovery surfaces
  { loc: "/glossary", lastmod: TODAY, changefreq: "weekly", priority: 0.8 },
  { loc: "/ai", lastmod: TODAY, changefreq: "weekly", priority: 0.85 },
  { loc: "/tools", lastmod: TODAY, changefreq: "weekly", priority: 0.8 },
  { loc: "/vs", lastmod: TODAY, changefreq: "monthly", priority: 0.8 },
  { loc: "/supermodels", lastmod: TODAY, changefreq: "weekly", priority: 0.85 },

  // Lab signature surfaces — Wave 12-16
  { loc: "/constellation", lastmod: TODAY, changefreq: "monthly", priority: 0.9 },
  { loc: "/datasets", lastmod: TODAY, changefreq: "weekly", priority: 0.9 },
  { loc: "/vendor-pack", lastmod: TODAY, changefreq: "monthly", priority: 0.85 },
  { loc: "/studio", lastmod: TODAY, changefreq: "monthly", priority: 0.75 },
  { loc: "/signature", lastmod: TODAY, changefreq: "monthly", priority: 0.75 },
  { loc: "/trust", lastmod: TODAY, changefreq: "monthly", priority: 0.85 },
  { loc: "/transparency", lastmod: TODAY, changefreq: "monthly", priority: 0.85 },
  { loc: "/lab", lastmod: TODAY, changefreq: "monthly", priority: 0.75 },
  { loc: "/integrations", lastmod: TODAY, changefreq: "monthly", priority: 0.8 },
  { loc: "/aesthetic", lastmod: TODAY, changefreq: "monthly", priority: 0.7 },
  { loc: "/colophon", lastmod: TODAY, changefreq: "monthly", priority: 0.7 },
  { loc: "/timeline", lastmod: TODAY, changefreq: "weekly", priority: 0.8 },
  { loc: "/influences", lastmod: TODAY, changefreq: "monthly", priority: 0.7 },
  { loc: "/live", lastmod: TODAY, changefreq: "daily", priority: 0.85 },
  { loc: "/teach", lastmod: TODAY, changefreq: "monthly", priority: 0.8 },
  { loc: "/use-cases", lastmod: TODAY, changefreq: "monthly", priority: 0.85 },
  { loc: "/compare", lastmod: TODAY, changefreq: "monthly", priority: 0.85 },
  { loc: "/api", lastmod: TODAY, changefreq: "weekly", priority: 0.9 },

  // Big Dog · Orange Wave 28 additions
  { loc: "/explore", lastmod: TODAY, changefreq: "weekly", priority: 0.95 },
  { loc: "/atlas", lastmod: TODAY, changefreq: "weekly", priority: 0.95 },
  { loc: "/skills", lastmod: TODAY, changefreq: "monthly", priority: 0.9 },
  { loc: "/audit-log", lastmod: TODAY, changefreq: "daily", priority: 0.85 },
  { loc: "/welcome", lastmod: TODAY, changefreq: "monthly", priority: 0.8 },
  { loc: "/north-star", lastmod: TODAY, changefreq: "monthly", priority: 0.9 },
  { loc: "/learn/cyber/mythos", lastmod: TODAY, changefreq: "monthly", priority: 0.9 },
  { loc: "/learn/cyber/models", lastmod: TODAY, changefreq: "monthly", priority: 0.9 },
  { loc: "/api/palette", lastmod: TODAY, changefreq: "weekly", priority: 0.85 },

  // JUNE ROCKET · Wave 30 · 2026-06-06
  { loc: "/version", lastmod: TODAY, changefreq: "weekly", priority: 0.85 },
  { loc: "/learn/health-ai", lastmod: TODAY, changefreq: "monthly", priority: 0.95 },
  { loc: "/learn/money-ai", lastmod: TODAY, changefreq: "monthly", priority: 0.95 },
  { loc: "/learn/video-ai", lastmod: TODAY, changefreq: "monthly", priority: 0.95 },
];

export async function GET() {
  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    ENTRIES.map((e) =>
      `  <url>\n` +
      `    <loc>https://atomeons.com${e.loc}</loc>\n` +
      `    <lastmod>${e.lastmod}</lastmod>\n` +
      `    <changefreq>${e.changefreq}</changefreq>\n` +
      `    <priority>${e.priority.toFixed(2)}</priority>\n` +
      `  </url>`
    ).join("\n") +
    `\n</urlset>\n`;
  return new NextResponse(xml, {
    status: 200,
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
