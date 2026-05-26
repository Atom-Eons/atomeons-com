import Link from "next/link";

/**
 * /search — the lab directory.
 *
 * Why this exists: the site-wide WebSite + SearchAction JSON-LD schema
 * declares atomeons.com/search?q={query} as the canonical search entry
 * point. Google's sitelinks search box and AI search engines both rely
 * on that endpoint resolving to a real page. Returning 404 would
 * silently invalidate the schema.
 *
 * What this is NOT: a full-text search engine. The lab is too small
 * (≈20 routes) to justify a Lucene/Algolia/Pagefind index right now.
 *
 * What this IS: a hand-curated directory. Visitor types something into
 * the search box, the page echoes it back, the page surfaces every
 * canonical route grouped by intent. The visitor finds their answer
 * one click away. No black box.
 *
 * When the route count crosses ~50, this page gets a real index. Not
 * before.
 */

export const metadata = {
  title: "Search — AtomEons directory",
  description:
    "The AtomEons directory. Every canonical surface — /ai (the 44M on-ramp), /start (novice 11-minute), /orangebox (the $1 cockpit), /research/papers (12 manuscripts), /research/lessons-from-sci-fi (the monograph), /press (media kit), /founders-view (nightly broadcast), /intel/x-algorithm (xAI leak) — grouped by intent. Type any term to filter.",
  alternates: { canonical: "https://atomeons.com/search" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "AtomEons — Lab Directory",
    description:
      "Every canonical lab surface, grouped by intent. Hand-curated. No black box.",
    url: "https://atomeons.com/search",
    type: "website",
  },
};

type Destination = {
  href: string;
  title: string;
  description: string;
  keywords: string[];
  badge?: string;
};

const GROUPS: { name: string; items: Destination[] }[] = [
  {
    name: "USE AI · the on-ramp",
    items: [
      {
        href: "/ai",
        title: "/ai — the comprehensive AI gateway",
        description:
          "Named tools (28), named builders (18), 20 revenue paths, 51 FAQs, the 30-60-90 day plan, glossary. For the 44 million workers facing AI displacement.",
        keywords: ["ai", "tools", "builders", "money", "faq", "plan", "claude", "chatgpt", "gemini"],
      },
      {
        href: "/start",
        title: "/start — the 11-minute novice on-ramp",
        description:
          "For someone who has used ChatGPT under ten times. No jargon. Six things to try tonight. Six honest limits.",
        keywords: ["start", "novice", "beginner", "chatgpt", "first"],
      },
      {
        href: "/orangebox",
        title: "/orangebox — the v6.3 AI cockpit",
        description:
          "ORANGEBOX Command v6.3. Two surfaces: AE See-Suite (command) + AE Operations (systems). Basic Install or AI Box path. License §4A bans subscription. 30-day MFG + Workflow-Fit refund.",
        keywords: ["orangebox", "cockpit", "claude code", "mcp", "ae see-suite", "ae operations", "buy", "v6.3"],
        badge: "$49 once · forever",
      },
      {
        href: "/pricing",
        title: "/pricing — $49 once, forever",
        description:
          "Standalone pricing page. $49 ORANGEBOX. License §4A no-saas lock. Comparison ladder vs Notion+Linear+Slack+Loom stack ($2,400/yr), Claude Pro + ChatGPT Plus + Cursor + Gemini Advanced ($3,120/yr), part-time PM ($52K/yr), custom consulting ($40K–$120K). 6-FAQ.",
        keywords: ["pricing", "cost", "price", "$49", "subscription", "license §4A", "no saas", "buy"],
      },
      {
        href: "/support",
        title: "/support — buyer help hub",
        description:
          "Eight pre-filled mailto channels: replace download link, MFG claim, Workflow-Fit refund, install help, license recovery, source / integration question, security disclosure, press inquiry. One operator. ~2h reply ET waking hours.",
        keywords: ["support", "help", "refund claim", "lost link", "license recovery", "install help", "security disclosure"],
      },
      {
        href: "/faq",
        title: "/faq — every question before you buy",
        description:
          "ORANGEBOX product Q&A plus nine novice AI questions. License §4A explained. Privacy stance. Refund paths.",
        keywords: ["faq", "questions", "refund", "license", "privacy"],
      },
    ],
  },
  {
    name: "RESEARCH · open access",
    items: [
      {
        href: "/research/papers",
        title: "/research/papers — 12 manuscripts",
        description:
          "Bioelectric oncology, mislabel hypothesis, topological field theory, GlyphSpeak compression, Spiral-of-Thought. Academic abstract + plain-language summary side-by-side. CC-BY 4.0.",
        keywords: ["research", "papers", "manuscripts", "bioelectric", "glyphspeak", "spiral", "topological"],
      },
      {
        href: "/research/lessons-from-sci-fi",
        title: "/research/lessons-from-sci-fi — the AI cinema monograph",
        description:
          "A century of imagined machines. Metropolis 1927 → Fallout 2024. 38 pages, 7 epochs, 5-dimensional taxonomy. With 10 in-page cinema clips.",
        keywords: ["sci-fi", "cinema", "metropolis", "hal", "blade runner", "matrix", "westworld", "monograph"],
      },
      {
        href: "/research/about",
        title: "/research/about — the research arm",
        description:
          "What ÆoNs Research is. The doctrine, the license, the publishing cadence.",
        keywords: ["research about", "lab", "doctrine"],
      },
    ],
  },
  {
    name: "KNOW THE TRUTH · live intel + broadcast",
    items: [
      {
        href: "/founders-view",
        title: "/founders-view — the nightly broadcast",
        description:
          "Daily 8pm ET letter from the lab. Sealed-letter-under-the-door voice. Ruthless. Hits all sides equally. RSS-subscribable.",
        keywords: ["founders view", "broadcast", "letter", "rss"],
      },
      {
        href: "/intel/x-algorithm",
        title: "/intel/x-algorithm — May 2026 xAI leak analysis",
        description:
          "1,851-line operational analysis of the open-sourced X For-You algorithm. Min-traction gate, 4 shadowban types, anatomy of the perfect post. With operator-class extensions.",
        keywords: ["x algorithm", "shadowban", "twitter", "xai", "intel", "leak", "algorithm"],
      },
    ],
  },
  {
    name: "MAKE MONEY · the commerce surfaces",
    items: [
      {
        href: "/skilski",
        title: "/skilski — the universal skill registry for AI agents",
        description:
          "One name, one claim, one MCP server per skill. Author-paid marketplace for verified AI skills.",
        keywords: ["skilski", "skil.ski", "marketplace", "mcp", "skills"],
      },
      {
        href: "/b00kmakor",
        title: "/b00kmakor — the AI publishing house",
        description:
          "Manuscript-to-launched-book in 30 days. Author keeps 100% of royalties. Coming 2026.",
        keywords: ["b00kmakor", "publishing", "books", "audiobook"],
      },
    ],
  },
  {
    name: "ABOUT THE LAB",
    items: [
      {
        href: "/about",
        title: "/about — the lab thesis",
        description:
          "One operator. Marco Island, FL. Independent. Four-pillar architecture.",
        keywords: ["about", "atomeons", "operator", "thesis"],
      },
      {
        href: "/now",
        title: "/now — what we're doing this week",
        description:
          "Weekly ship cadence, current research, in-flight commits.",
        keywords: ["now", "current", "week", "cadence"],
      },
      {
        href: "/changelog",
        title: "/changelog — public version history",
        description:
          "Every shipped change with date + surfaces touched + operator note. Site rewrites, ORANGEBOX releases, broadcast cadence, research drops, legal updates. Not a roadmap — what actually shipped.",
        keywords: ["changelog", "version history", "releases", "ship log"],
      },
      {
        href: "/press",
        title: "/press — instant media kit",
        description:
          "Boilerplate (copy-pasteable), founder bio, hero asset, downloadable media pack, honest empty-state coverage feed. 2-hour reply SLA in ET waking hours.",
        keywords: ["press", "media kit", "journalist", "bio", "interview"],
      },
    ],
  },
];

function filterDestinations(query: string): Destination[] {
  if (!query) return [];
  const q = query.toLowerCase().trim();
  if (q.length < 1) return [];
  const flat = GROUPS.flatMap((g) => g.items);
  return flat.filter((d) => {
    const haystack = [
      d.title,
      d.description,
      ...d.keywords,
      d.href,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export default function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  // Next 16 searchParams are a Promise in Server Components
  return <SearchPageInner searchParams={searchParams} />;
}

async function SearchPageInner({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const sp = await searchParams;
  const rawQ = sp?.q;
  const q = typeof rawQ === "string" ? rawQ : Array.isArray(rawQ) ? rawQ[0] : "";
  const matches = filterDestinations(q || "");
  const hasQuery = q.trim().length > 0;

  return (
    <main className="relative z-10 text-[#F2F4F5]">
      {/* HERO */}
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-20 md:py-28">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::AtomEons · directory · 20 canonical surfaces
          </p>
          <h1 className="mt-5 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">
            The lab directory.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-[1.6] text-[#C8CCCE]">
            Type any term — tool name, topic, person, route — and the
            page filters in place. Not a black-box index. A
            hand-curated map.
          </p>

          {/* SEARCH FORM (GET to /search?q=…) */}
          <form
            method="GET"
            action="/search"
            className="mt-10 flex flex-wrap items-stretch gap-3"
          >
            <input
              type="search"
              name="q"
              defaultValue={q}
              autoComplete="off"
              spellCheck="false"
              autoFocus
              placeholder="e.g. claude, mcp, broadcast, money, sci-fi…"
              className="min-w-[16rem] flex-1 rounded-full border border-[#1A2225] bg-[#0A0F11] px-6 py-3 text-base text-[#F2F4F5] outline-none transition-all placeholder:text-[#6B7779] focus:border-[#22F0D5] focus:shadow-[0_0_30px_rgba(34,240,213,0.20)]"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-[#22F0D5] px-6 py-3 font-mono text-[12px] font-semibold uppercase tracking-[0.28em] text-[#0B1014] transition-all hover:bg-[#F2F4F5]"
            >
              search →
            </button>
          </form>

          {hasQuery && (
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.28em] text-[#FFB87A]">
              {matches.length === 0
                ? `0 hits for "${q}" · scroll the full directory below`
                : `${matches.length} hit${matches.length === 1 ? "" : "s"} for "${q}"`}
            </p>
          )}
        </div>
      </section>

      {/* SEARCH RESULTS (if query) */}
      {hasQuery && matches.length > 0 && (
        <section className="border-b border-[#1A2225] bg-[#0e2520]/30">
          <div className="mx-auto w-full max-w-4xl px-6 py-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
              ::matches
            </p>
            <ul className="mt-6 space-y-3">
              {matches.map((m) => (
                <li key={m.href}>
                  <Link
                    href={m.href}
                    className="group flex flex-col gap-2 rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 transition-colors hover:border-[#22F0D5]/40"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <h3 className="text-lg font-semibold text-[#F2F4F5] group-hover:text-[#22F0D5] md:text-xl">
                        {m.title}
                      </h3>
                      {m.badge && (
                        <span className="rounded-full border border-[#FFB87A]/40 bg-[#FFB87A]/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.28em] text-[#FFB87A]">
                          {m.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-sm leading-[1.6] text-[#C8CCCE]">
                      {m.description}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* FULL DIRECTORY (always shown) */}
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#FFB87A]">
            ::full directory · grouped by intent
          </p>
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.08] tracking-tight md:text-5xl">
            Every canonical surface.
          </h2>

          <div className="mt-12 space-y-12">
            {GROUPS.map((g) => (
              <div key={g.name}>
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
                  ::{g.name}
                </p>
                <ul className="mt-4 grid gap-3 md:grid-cols-2">
                  {g.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="group flex h-full flex-col gap-2 rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-5 transition-colors hover:border-[#22F0D5]/40"
                      >
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="font-mono text-sm font-semibold text-[#F2F4F5] group-hover:text-[#22F0D5]">
                            {item.title}
                          </span>
                          {item.badge && (
                            <span className="shrink-0 rounded-full border border-[#FFB87A]/40 bg-[#FFB87A]/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.22em] text-[#FFB87A]">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-sm leading-[1.55] text-[#9BA5A7]">
                          {item.description}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HONEST FOOTER */}
      <section className="border-t border-[#1A2225] bg-[#0A0F11]">
        <div className="mx-auto w-full max-w-4xl px-6 py-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#6B7779]">
            ::what this is not
          </p>
          <p className="mt-3 text-sm leading-[1.7] text-[#9BA5A7]">
            Not a full-text search index. The lab is small enough (≈20
            routes) that a hand-curated directory beats a black-box
            index. When the surface count crosses ~50, we&apos;ll add
            Pagefind or similar. Until then this is the canonical
            entry point — and it&apos;s what the WebSite +
            SearchAction structured data tells Google + AI search
            engines to land on.
          </p>
        </div>
      </section>
    </main>
  );
}
