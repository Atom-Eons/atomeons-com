import { publicSupabase, type FoundersViewPost } from "@/lib/supabase";

export const runtime = "nodejs";
export const revalidate = 300; // 5 min

/**
 * RSS 2.0 feed for The Founder's View.
 * Atomic — one item per published letter, newest first, cap 60.
 *
 * Why RSS? The operator's doctrine is "no email list, no algorithm."
 * RSS lets readers subscribe via the open protocol that predates the
 * algorithm — same vibe as a sealed letter under the door.
 */

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

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
    // serve an empty but valid feed if Supabase is unreachable
  }

  const base = "https://atomeons.com";
  const lastBuild = posts[0]?.published_at ?? new Date().toISOString();

  const items = posts
    .map((p) => {
      const url = `${base}/founders-view/${p.slug}`;
      const pubDate = new Date(p.published_at).toUTCString();
      return `
    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <pubDate>${pubDate}</pubDate>
      ${p.theme ? `<category>${escapeXml(p.theme)}</category>` : ""}
      <description>${escapeXml(p.dek ?? "Letter from the lab.")}</description>
      <content:encoded><![CDATA[${p.body_md}]]></content:encoded>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>The Founder's View — ÆoNs Research</title>
    <link>${base}/founders-view</link>
    <atom:link href="${base}/founders-view/rss.xml" rel="self" type="application/rss+xml" />
    <description>Daily 8pm ET letter from the lab. No punches pulled. Hits all sides equally. Sealed and slipped under your door — by RSS, the way the open web intended.</description>
    <language>en-US</language>
    <lastBuildDate>${new Date(lastBuild).toUTCString()}</lastBuildDate>
    <generator>atomeons.com — Vercel Cron + Anthropic Sonnet</generator>
    <copyright>CC-BY 4.0 — Atom McCree / AtomEons Systems Laboratory</copyright>
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
