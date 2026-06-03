/**
 * /intel/rss.xml — RSS 2.0 feed for ÆoNs Intel alpha drops
 *
 * Mirrors the INTEL_DROPS array on the index page. When a new drop
 * ships, both surfaces update together (single source of truth would
 * be ideal but the index page keeps its typed array for prose
 * adjacency; an extraction can land later without breaking either).
 *
 * Cache: 30 minutes at the edge. A new drop within that window is
 * still surfaced on the index page immediately — RSS lag is OK.
 */

type IntelDrop = {
  slug: string;
  date: string;
  isoDate: string; // RFC-2822 / ISO-8601 for pubDate
  title: string;
  description: string;
};

const FEED_TITLE = "ÆoNs Intel · Alpha Drops";
const FEED_DESCRIPTION =
  "Decoded systems, open receipts. The lab's intelligence work — long-form analyses of frontier tooling, public algorithms, and adversarial systems. Every claim sourced, every drop SHA-256 stamped.";
const FEED_LINK = "https://atomeons.com/intel";
const FEED_SELF = "https://atomeons.com/intel/rss.xml";
const FEED_LANGUAGE = "en-us";

const DROPS: IntelDrop[] = [
  {
    slug: "x-algorithm",
    date: "May 15, 2026",
    isoDate: "Fri, 15 May 2026 12:00:00 +0000",
    title: "The X Algorithm — Open-Sourced",
    description:
      "X released the recommendation algorithm. The lab decoded the receipts. Ranking weights, engagement multipliers, suppression signals — all in the open. 15 key insights, 6 operator-class extensions, a 12-rule cheatsheet, and the full 1,851-line analysis doc. Every claim cites file + line in the xai-org/x-algorithm repo.",
  },
];

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildFeed(): string {
  const items = DROPS.map((d) => {
    const url = `https://atomeons.com/intel/${d.slug}`;
    return [
      "    <item>",
      `      <title>${escapeXml(d.title)}</title>`,
      `      <link>${url}</link>`,
      `      <guid isPermaLink="true">${url}</guid>`,
      `      <pubDate>${d.isoDate}</pubDate>`,
      `      <description>${escapeXml(d.description)}</description>`,
      "    </item>",
    ].join("\n");
  }).join("\n");

  // Latest pubDate on the channel = newest item pubDate.
  const channelPubDate = DROPS[0]?.isoDate ?? new Date().toUTCString();

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    `    <title>${escapeXml(FEED_TITLE)}</title>`,
    `    <link>${FEED_LINK}</link>`,
    `    <atom:link href="${FEED_SELF}" rel="self" type="application/rss+xml" />`,
    `    <description>${escapeXml(FEED_DESCRIPTION)}</description>`,
    `    <language>${FEED_LANGUAGE}</language>`,
    `    <lastBuildDate>${channelPubDate}</lastBuildDate>`,
    `    <pubDate>${channelPubDate}</pubDate>`,
    "    <generator>AtomEons Lab</generator>",
    items,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");
}

export const runtime = "nodejs";
export const dynamic = "force-static";

export async function GET() {
  const body = buildFeed();
  return new Response(body, {
    status: 200,
    headers: {
      "content-type": "application/rss+xml; charset=utf-8",
      "cache-control": "public, s-maxage=1800, stale-while-revalidate=86400",
    },
  });
}
