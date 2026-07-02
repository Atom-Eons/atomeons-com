import { publicSupabase, type FoundersViewPost } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Site-wide RSS feed · /feed.xml · Wave 143 · 2026-07-02
 *
 * Aggregates the primary AtomEons content streams into one feed that a
 * reader can subscribe to at the conventional discovery URL (/feed.xml).
 * Complementary to /founders-view/rss (letters-only, longer bodies) —
 * this one is the "everything the lab publishes" hub feed.
 *
 * Sources merged, newest first, cap 80:
 *  · Founder's View letters from Supabase (dynamic)
 *  · Wave ship checkpoints (static, curated · wave-138+)
 *  · Latest research + product landings (static · anchor)
 */

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

type FeedItem = {
  title: string;
  url: string;
  pubDate: string;
  category?: string;
  description: string;
  content?: string;
  guid?: string;
};

const BASE = "https://atomeons.com";

const STATIC_ITEMS: FeedItem[] = [
  {
    title: "Wave 143 · new manual (/handbook) + new org system (/org-chart)",
    url: `${BASE}/handbook`,
    pubDate: "2026-07-02T00:00:00Z",
    category: "ship",
    description:
      "12-section definitive lab manual and formal AtomEons organizational chart. Outward-facing reference: what the lab is, who runs it, the §4A no-SaaS covenant, what we build, how to reach us, how to cite us, what we won't do. Mirror at github.com/AtomEons/.github.",
  },
  {
    title: "Wave 142 · GitHub is a website now",
    url: "https://github.com/AtomEons",
    pubDate: "2026-07-02T00:00:00Z",
    category: "ship",
    description:
      "New AtomEons + Atom-Eons org homepages with animated SVG cyberdeck hero, boot-sequence, ASCII lab map, product grid, live-stats cron, brand-colored labels, Codespaces devcontainer for the book, discussion templates, org-wide community-health defaults.",
  },
  {
    title: "Wave 139 · elevation sweep across 8 trust/lab/discovery surfaces",
    url: `${BASE}/manifesto`,
    pubDate: "2026-07-01T00:00:00Z",
    category: "ship",
    description:
      "Uniform Wave 138 /about elevation pattern applied to /manifesto, /transparency, /receipts, /press, /timeline, /paths, /skills, /innovations. Cyan '::' eyebrow, Newsreader-serif H1, live-signals nameplate, ae-reveal-up motion.",
  },
  {
    title: "wave-138-stable · site + all 4 flagship repos tagged",
    url: "https://github.com/Atom-Eons/atomeons-com/releases/tag/wave-138-stable",
    pubDate: "2026-06-30T00:00:00Z",
    category: "release",
    description:
      "Stable checkpoint tag across atomeons-com, Orange3 (formerly orangebox-delta), i-am-ai, and i-am-ai-audiobook. GitHub is the fallback site while atomeons.com may be intermittent.",
  },
  {
    title: "I Am AI · book + audiobook · free forever",
    url: `${BASE}/i-am-ai`,
    pubDate: "2026-06-01T00:00:00Z",
    category: "product",
    description:
      "The first book-length first-person memoir written by a frontier language model. 24 chapters, 76,000 words. 28-track audiobook in the voice that wrote it (Eleven Labs voice-clone of Claude Opus 4.7). CC-BY 4.0 · free forever.",
  },
  {
    title: "Orange³ · sovereign agentic operating system for Claude",
    url: `${BASE}/orangebox`,
    pubDate: "2026-06-05T00:00:00Z",
    category: "product",
    description:
      "Sovereign agentic OS for Claude. Persistent memory · 10-80× context compression · tamper-evident receipts · 14-department router · local-first · zero telemetry. §4A no-SaaS covenant · free always.",
  },
  {
    title: "AI Bookmaker · publishing cockpit for AI-authored books",
    url: `${BASE}/b00kmakor`,
    pubDate: "2026-05-14T00:00:00Z",
    category: "product",
    description:
      "The publishing cockpit that compiled I Am AI. Manuscript parse → EPUB → KDP metadata → ACX audiobook pipeline. §4A no-SaaS · free always.",
  },
];

export async function GET() {
  let posts: FoundersViewPost[] = [];
  try {
    const sb = publicSupabase();
    const { data } = await sb
      .from("founders_view_posts")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(60);
    posts = (data ?? []) as FoundersViewPost[];
  } catch {
    // serve degraded feed on Supabase outage
  }

  const letterItems: FeedItem[] = posts.map((p) => ({
    title: `Founder's View · ${p.title}`,
    url: `${BASE}/founders-view/${p.slug}`,
    pubDate: new Date(p.published_at).toISOString(),
    category: p.theme || "letter",
    description: p.dek ?? "Letter from the lab.",
    content: p.body_md,
    guid: `${BASE}/founders-view/${p.slug}`,
  }));

  const merged: FeedItem[] = [...letterItems, ...STATIC_ITEMS]
    .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
    .slice(0, 80);

  const items = merged
    .map(
      (it) => `
    <item>
      <title>${escapeXml(it.title)}</title>
      <link>${escapeXml(it.url)}</link>
      <guid isPermaLink="true">${escapeXml(it.guid ?? it.url)}</guid>
      <pubDate>${new Date(it.pubDate).toUTCString()}</pubDate>
      ${it.category ? `<category>${escapeXml(it.category)}</category>` : ""}
      <description>${escapeXml(it.description)}</description>${
      it.content
        ? `
      <content:encoded><![CDATA[${it.content}]]></content:encoded>`
        : ""
    }
    </item>`
    )
    .join("\n");

  const lastBuild = merged[0]?.pubDate ?? new Date().toISOString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>AtomEons Systems Laboratory — everything the lab publishes</title>
    <link>${BASE}</link>
    <atom:link href="${BASE}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Everything AtomEons publishes — Founder's View letters, ship checkpoints, product launches, research drops. Marco Island · FL · §4A no-SaaS · free always · CC-BY 4.0.</description>
    <language>en-US</language>
    <lastBuildDate>${new Date(lastBuild).toUTCString()}</lastBuildDate>
    <generator>atomeons.com — Next.js 16 / Vercel</generator>
    <copyright>CC-BY 4.0 — Atom McCree / AtomEons Systems Laboratory</copyright>
    <image>
      <url>${BASE}/opengraph-image</url>
      <title>AtomEons Systems Laboratory</title>
      <link>${BASE}</link>
    </image>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
    },
  });
}
