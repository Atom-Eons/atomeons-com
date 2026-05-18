/**
 * Daily news fetcher for The Founder's View autonomous broadcast.
 *
 * Pulls top stories from a curated set of public RSS feeds across the
 * lab's beats — AI, tech, cybersecurity, national-security AI, the
 * global AI race, Nvidia, the frontier labs. Returns a compact
 * markdown bundle the Sonnet writer's room consumes as raw context.
 *
 * Implementation notes:
 *   - Uses public RSS / Atom feeds only (no API keys required)
 *   - Per-feed timeout: 4 seconds
 *   - Returns whatever subset succeeded — failure-soft
 *   - Aggressive de-duplication by title-prefix similarity
 *   - Cap the bundle at ~6000 chars so it fits the Sonnet context budget
 *
 * If/when the operator wants premium / paid sources (Bloomberg, FT,
 * The Information), drop them into FEEDS with `auth: 'bearer ...'`
 * and update the fetch headers branch.
 */

type FeedSpec = {
  url: string;
  beat: string; // AI / tech / cyber / natsec / chips / labs / etc.
  cap?: number; // how many stories to take from this feed
};

const FEEDS: FeedSpec[] = [
  // AI / labs
  { url: "https://www.anthropic.com/news/rss.xml", beat: "anthropic", cap: 2 },
  { url: "https://openai.com/blog/rss.xml", beat: "openai", cap: 2 },
  { url: "https://blog.google/technology/ai/rss/", beat: "google-ai", cap: 2 },
  { url: "https://news.ycombinator.com/rss", beat: "hn", cap: 6 },
  // Industry
  { url: "https://www.theinformation.com/feed", beat: "the-information", cap: 3 },
  { url: "https://techcrunch.com/category/artificial-intelligence/feed/", beat: "techcrunch-ai", cap: 3 },
  { url: "https://www.theverge.com/rss/ai-artificial-intelligence/index.xml", beat: "verge-ai", cap: 3 },
  // Cybersecurity
  { url: "https://krebsonsecurity.com/feed/", beat: "krebs-cyber", cap: 2 },
  { url: "https://www.darkreading.com/rss.xml", beat: "darkreading", cap: 2 },
  // National security / policy / chips
  { url: "https://www.lawfaremedia.org/rss-feed.xml", beat: "lawfare-natsec", cap: 2 },
  { url: "https://semiwiki.com/feed/", beat: "semi-chips", cap: 2 },
  { url: "https://www.theregister.com/headlines.atom", beat: "the-register", cap: 3 },
  // Lab-adjacent operator class
  { url: "https://stratechery.com/feed/", beat: "stratechery", cap: 1 },
  { url: "https://simonwillison.net/atom/everything/", beat: "simon-willison", cap: 2 },
];

const PER_FEED_TIMEOUT_MS = 4000;
const TOTAL_CHAR_BUDGET = 6000;

type Story = {
  title: string;
  link?: string;
  beat: string;
  date?: string;
  summary?: string;
};

/**
 * Tiny string-distance dedup: two titles are "similar" if either is a
 * prefix of the other up to 40 chars (cheap and good enough for RSS).
 */
function isDuplicateTitle(a: string, b: string): boolean {
  const norm = (s: string) =>
    s.toLowerCase().replace(/[^a-z0-9 ]/g, "").trim().slice(0, 40);
  const na = norm(a);
  const nb = norm(b);
  if (!na || !nb) return false;
  return na === nb || na.startsWith(nb) || nb.startsWith(na);
}

/**
 * Naive RSS / Atom parser — extracts <item><title>...</title> + <link>
 * (or <entry><title>...</title> for Atom). Avoids an XML dependency
 * by using regex matchers. Good enough for the curated feed set.
 */
function parseFeed(xml: string, beat: string, cap: number): Story[] {
  const out: Story[] = [];
  const itemRe = /<(item|entry)\b[\s\S]*?<\/(item|entry)>/gi;
  let m: RegExpExecArray | null;
  while ((m = itemRe.exec(xml)) !== null) {
    const block = m[0];
    const titleMatch =
      /<title[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/i.exec(block);
    const linkMatch =
      /<link[^>]*href=["']([^"']+)["']/i.exec(block) ||
      /<link[^>]*>([\s\S]*?)<\/link>/i.exec(block);
    const dateMatch =
      /<(pubDate|published|updated)[^>]*>([\s\S]*?)<\/(pubDate|published|updated)>/i.exec(
        block,
      );
    const descMatch =
      /<(description|summary|content)[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/\1>/i.exec(
        block,
      );

    if (!titleMatch) continue;
    const title = titleMatch[1]
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim();
    if (!title) continue;
    const link = linkMatch?.[1]?.trim();
    const date = dateMatch?.[2]?.trim();
    const rawSummary =
      descMatch?.[2]
        ?.replace(/<[^>]+>/g, "")
        .replace(/\s+/g, " ")
        .trim() ?? "";
    const summary = rawSummary.slice(0, 220);

    out.push({ title, link, beat, date, summary });
    if (out.length >= cap) break;
  }
  return out;
}

async function fetchFeed(spec: FeedSpec): Promise<Story[]> {
  try {
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), PER_FEED_TIMEOUT_MS);
    const res = await fetch(spec.url, {
      signal: controller.signal,
      headers: {
        "user-agent":
          "Mozilla/5.0 (AtomEons-FoundersView/1.0; +https://atomeons.com/founders-view)",
        accept:
          "application/rss+xml, application/atom+xml, application/xml, text/xml, */*;q=0.5",
      },
      cache: "no-store",
    });
    clearTimeout(t);
    if (!res.ok) return [];
    const xml = await res.text();
    return parseFeed(xml, spec.beat, spec.cap ?? 3);
  } catch {
    return [];
  }
}

/**
 * Format the aggregated story set as a compact markdown bundle for
 * Sonnet to consume. Caps total chars at TOTAL_CHAR_BUDGET.
 */
function formatStories(stories: Story[]): string {
  const lines: string[] = [];
  const byBeat = new Map<string, Story[]>();
  for (const s of stories) {
    const arr = byBeat.get(s.beat) ?? [];
    arr.push(s);
    byBeat.set(s.beat, arr);
  }
  for (const [beat, arr] of byBeat) {
    lines.push(`### ${beat}`);
    for (const s of arr) {
      const head = `- **${s.title}**`;
      const meta = s.summary ? `\n  ${s.summary}` : "";
      const url = s.link ? `\n  ${s.link}` : "";
      lines.push(head + meta + url);
    }
    lines.push("");
  }
  const all = lines.join("\n");
  if (all.length <= TOTAL_CHAR_BUDGET) return all;
  return all.slice(0, TOTAL_CHAR_BUDGET - 30) + "\n…\n(truncated)";
}

export type NewsContext = {
  markdown: string;
  feed_count: number;
  story_count: number;
  beats: string[];
  fetched_at: string;
};

/** Fire all feeds in parallel, dedup, format, return context bundle. */
export async function fetchDailyNewsContext(): Promise<NewsContext> {
  const results = await Promise.all(FEEDS.map((f) => fetchFeed(f)));
  const flat = results.flat();

  // Dedup by similar title
  const kept: Story[] = [];
  for (const s of flat) {
    if (!kept.some((k) => isDuplicateTitle(k.title, s.title))) {
      kept.push(s);
    }
  }

  const beats = Array.from(new Set(kept.map((s) => s.beat)));
  return {
    markdown: formatStories(kept),
    feed_count: FEEDS.length,
    story_count: kept.length,
    beats,
    fetched_at: new Date().toISOString(),
  };
}
