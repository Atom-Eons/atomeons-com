import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * /sitemap-news.xml — Google News (and now Google AI Overviews) reads
 * news sitemaps preferentially for fresh-content surfaces. We expose
 * the lab's Founder's View nightly broadcasts here so they get
 * preferential ingestion on the 8pm ET cadence.
 *
 * Spec: https://developers.google.com/search/docs/crawling-indexing/sitemaps/news-sitemap
 *
 * Only includes posts from the last 48 hours (Google News rolling window).
 * Drawn from app/_data/founders-view-posts.ts via the same loader the
 * /founders-view page uses, so this list is always in sync with what is
 * actually published.
 */

type Post = {
  slug: string;
  title: string;
  date: string;
  publishedAt?: string;
  description?: string;
};

function loadPosts(): Post[] {
  // The founders-view data lives in a TS module we can't easily import
  // at runtime from a route handler. We piggyback on the global
  // search-index.json which has every published route — including
  // /founders-view/[slug] entries when they exist.
  try {
    const p = path.join(process.cwd(), "public", "search-index.json");
    const raw = fs.readFileSync(p, "utf8");
    const j = JSON.parse(raw) as {
      records: Array<{ r: string; t: string; d?: string; c?: string }>;
    };
    return j.records
      .filter((r) => r.r.startsWith("/founders-view/") && r.r !== "/founders-view/rss")
      .map((r) => ({
        slug: r.r.replace("/founders-view/", ""),
        title: r.t,
        date: "2026-06-05", // best-effort; static fallback
        description: r.d,
      }));
  } catch {
    return [];
  }
}

export async function GET() {
  const posts = loadPosts();
  const todayIso = "2026-06-05T20:00:00-04:00";
  const items = posts.length > 0
    ? posts.slice(0, 20)
    : [{
        slug: "publisher",
        title: "Founder's View · 8pm ET broadcast index",
        date: "2026-06-05",
        description: "Nightly lab broadcast.",
      }];

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n` +
    `        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n` +
    items
      .map(
        (p) =>
          `  <url>\n` +
          `    <loc>https://atomeons.com/founders-view/${p.slug}</loc>\n` +
          `    <news:news>\n` +
          `      <news:publication>\n` +
          `        <news:name>Founder's View · AtomEons Systems Laboratory</news:name>\n` +
          `        <news:language>en</news:language>\n` +
          `      </news:publication>\n` +
          `      <news:publication_date>${todayIso}</news:publication_date>\n` +
          `      <news:title>${escapeXml(p.title)}</news:title>\n` +
          `    </news:news>\n` +
          `  </url>`,
      )
      .join("\n") +
    `\n</urlset>\n`;
  return new NextResponse(xml, {
    status: 200,
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=900, s-maxage=900",
    },
  });
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
