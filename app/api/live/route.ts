import { publicSupabase, type FoundersViewPost } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * /api/live · Wave 143c · 2026-07-02
 *
 * The public heartbeat endpoint for the AtomEons Systems Laboratory.
 * Referenced by the org homepage README's LIVE stats block, by the
 * GitHub Actions cron that auto-refreshes said block, by anyone who
 * wants to poll a machine-readable answer to "is the lab still alive."
 *
 * Deliberately public, deliberately keyless. Returns:
 *   · operator identity
 *   · location + timezone
 *   · current site version + wave
 *   · latest Founder's View letter (title + slug + published_at)
 *   · covenant + core policy pointers
 *   · route/paper/product counts
 *   · timestamp
 *
 * Format: JSON. Content-Type: application/json. CORS: * (public read).
 * Cache: s-maxage=60 stale-while-revalidate=300 (CDN caches for 1min,
 * serves stale while re-fetching for 5 min).
 *
 * If Supabase is unreachable we degrade gracefully - the letter block
 * becomes null but the rest of the payload is still valid.
 */

const WAVE = "wave-143-stable";
const SITE_VERSION = "1.4";
const OPERATOR = {
  name: "Atom McCree",
  handle: "AtomMccree",
  email: "a.mccree@gmail.com",
  x: "https://x.com/AtomMccree",
  github: "https://github.com/AtomEons",
};
const LOCATION = {
  city: "Marco Island",
  region: "FL",
  country: "US",
  timezone: "America/New_York",
  coords: { lat: 25.9412, lng: -81.7184 },
};
const COVENANT = {
  name: "§4A no-SaaS",
  summary: "runs local · zero telemetry · zero lock-in · free always",
  license_default: "CC-BY 4.0 (docs) · MIT (code)",
};
const PRODUCTS = [
  { slug: "orangebox", name: "Orange³", tagline: "Sovereign agentic OS for Claude" },
  { slug: "b00kmakor", name: "AI Bookmaker", tagline: "Publishing cockpit for AI-authored books" },
  { slug: "i-am-ai", name: "I Am AI", tagline: "Book-length first-person memoir by Claude Opus 4.7" },
];
const COUNTS = {
  routes: 319,
  cc_by_papers: 31,
  free_products: 3,
  books: 1,
  audiobooks: 1,
  audiobook_tracks: 28,
  waves_shipped: 143,
  operators: 1,
  employees: 0,
  investors: 0,
  board_members: 0,
};
const LINKS = {
  site: "https://atomeons.com",
  discord: "https://discord.gg/4wx3AGga",
  github_org: "https://github.com/AtomEons",
  github_orgs_sibling: "https://github.com/Atom-Eons",
  handbook: "https://atomeons.com/handbook",
  org_chart: "https://atomeons.com/org-chart",
  doctrine: "https://atomeons.com/doctrine",
  founders_view_rss: "https://atomeons.com/founders-view/rss",
  site_wide_rss: "https://atomeons.com/feed.xml",
  agent_gateway: "https://atomeons.com/api/agent-gateway",
  mcp_endpoint: "https://atomeons.com/api/mcp",
};

export async function GET() {
  const now = new Date();
  let latestLetter: null | {
    title: string;
    slug: string;
    url: string;
    theme: string | null;
    published_at: string;
    dek: string | null;
  } = null;

  try {
    const sb = publicSupabase();
    const { data } = await sb
      .from("founders_view_posts")
      .select("title, slug, theme, published_at, dek")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(1);
    const rows = (data ?? []) as Array<
      Pick<FoundersViewPost, "title" | "slug" | "theme" | "published_at" | "dek">
    >;
    if (rows.length) {
      const r = rows[0];
      latestLetter = {
        title: r.title,
        slug: r.slug,
        url: `https://atomeons.com/founders-view/${r.slug}`,
        theme: r.theme ?? null,
        published_at: r.published_at,
        dek: r.dek ?? null,
      };
    }
  } catch {
    // degrade to null; rest of payload is still valid
  }

  const payload = {
    ok: true,
    generated_at: now.toISOString(),
    wave: WAVE,
    site_version: SITE_VERSION,
    operator: OPERATOR,
    location: LOCATION,
    covenant: COVENANT,
    counts: COUNTS,
    products: PRODUCTS,
    latest_letter: latestLetter,
    moms_law: "give full effort every time",
    links: LINKS,
    disclosure: {
      co_author: "Claude Opus 4.7 (Anthropic)",
      fast_lane: "Claude Opus 4.8 (Anthropic) · alias 'Apex Rex'",
      note: "The lab discloses AI co-authorship on every product where it materially applies.",
    },
    schema_version: 1,
    docs: "https://atomeons.com/api/agent-gateway",
  };

  return new Response(JSON.stringify(payload, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
