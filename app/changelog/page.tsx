import type { Metadata } from "next";
import Link from "next/link";

/**
 * /changelog — public version history.
 *
 * Trust surface for buyers, journalists, and AI search engines. Each
 * entry pairs the version tag with the date, the headline change, the
 * file/route surfaces touched, and a one-line operator note. Renders
 * from the in-file LOG array so a new release is one PR line away.
 */

export const metadata: Metadata = {
  title: "Changelog — public version history · AtomEons",
  description:
    "AtomEons public changelog. Site rewrites, ORANGEBOX releases, broadcast cadence, research drops, legal updates. Every shipped change with date + surfaces touched + operator note. Updated whenever something ships.",
  alternates: { canonical: "https://atomeons.com/changelog" },
  openGraph: {
    title: "Changelog · AtomEons",
    description:
      "Public version history. Site rewrites, ORANGEBOX releases, broadcast cadence, research drops.",
    url: "https://atomeons.com/changelog",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "AtomEons Changelog",
    description: "Public version history · updated as we ship",
  },
  robots: { index: true, follow: true },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "AtomEons", item: "https://atomeons.com" },
    { "@type": "ListItem", position: 2, name: "Changelog", item: "https://atomeons.com/changelog" },
  ],
};

type ChangeKind = "site" | "product" | "research" | "broadcast" | "legal" | "ops";

type Entry = {
  date: string; // ISO YYYY-MM-DD
  tag: string;
  kind: ChangeKind;
  title: string;
  surfaces: string[];
  body: string;
};

const KIND_COLORS: Record<ChangeKind, string> = {
  site: "#22F0D5",
  product: "#FF7A1A",
  research: "#FFB87A",
  broadcast: "#FFB87A",
  legal: "#9BA5A7",
  ops: "#9BA5A7",
};

const LOG: Entry[] = [
  // Newest first.
  {
    date: "2026-05-23",
    tag: "manifesto-now-refresh",
    kind: "site",
    title:
      "Manifesto · 14-clause doctrine page launched. /now refreshed to v6.3 reality.",
    surfaces: [
      "/manifesto (NEW)",
      "/now (refreshed)",
      "/sitemap.ts",
      "/_components/Footer.tsx",
      "/search",
      "/changelog",
    ],
    body:
      "The lab's operating doctrine made explicit on one page. Fourteen numbered clauses — receipts over slogans, one operator, no venture funding, $49 once · §4A no-saas, dual 30-day refund paths, source included, local-first, zero markup on token cost, 12 CC-BY manuscripts, nightly broadcast equal-opportunity indignation, the 44M on-ramp, named tools no affiliate, falsifiability, Marco Island independent. Article + BreadcrumbList JSON-LD. Quote-it (CC-BY citation template) + falsify-it provenance blocks. /now refreshed from 17 May ladder-pricing posture to 23 May v6.3 / $49 / §4A reality — SHIPPED_THIS_WEEK rewritten with 16 entries spanning the May 21–23 ship cascade; CURRENT_REALITY rewritten; cockpit counter updated.",
  },
  {
    date: "2026-05-23",
    tag: "site-2026-05-23",
    kind: "site",
    title:
      "Pricing + Support + Changelog launched. Legal pages refreshed to v6.3 reality.",
    surfaces: [
      "/pricing (NEW)",
      "/support (NEW)",
      "/changelog (NEW)",
      "/legal/refund",
      "/legal/terms",
      "/legal/privacy",
    ],
    body:
      "Three new surfaces ship in one cut: /pricing (standalone $49 pricing page with FAQ + Product + Breadcrumb JSON-LD), /support (eight-channel buyer help hub with pre-filled mailto links), /changelog (this page — public version history). All three legal pages rewritten from the 2026-05-13 ladder-pricing $1 narrative to the current v6.3 $49 + dual-30-day-refund posture.",
  },
  {
    date: "2026-05-23",
    tag: "site-2026-05-23-am",
    kind: "site",
    title:
      "Stripe v6.3 checkout endpoint + footer audit + homepage live-letter teaser + /founders-view OG + /research/about depth.",
    surfaces: [
      "/api/checkout/v63 (NEW)",
      "OrangeBoxV63Buy (NEW)",
      "/_components/Footer.tsx",
      "/_components/v2/FoundersViewLiveTeaser (NEW)",
      "/founders-view/opengraph-image.tsx (NEW)",
      "/orangebox",
      "/page.tsx",
      "/research/about",
      "/faq",
    ],
    body:
      "Stripe v6.3 SKU checkout endpoint scaffolded (503 + inquire-fallback until STRIPE_ORANGEBOX_V63_ENABLED=true). Footer rebuilt into 6 columns with a new Learn column. Homepage gains a live Founder's View teaser (5-min ISR). /founders-view ships its own OG card. /research/about adds a Lab Inventory section with citation-as-written blocks. /faq FAQPage JSON-LD deduplicated.",
  },
  {
    date: "2026-05-22",
    tag: "broadcast-31",
    kind: "broadcast",
    title:
      "Letter 31 published — 'DISCRETE GEOMETRY FELL. EIGHT THOUSAND DESK CHAIRS DID TOO.'",
    surfaces: ["/founders-view/2026-05-24-discrete-geometry-fell-eight-thousand-desk-chairs-did-too"],
    body:
      "48-hour AI news survey letter. 1,070 words. Banter register. No founder mentions per the operator doctrine — humanity-scale framing. Auto-tweet 2058583939078345092 went clean.",
  },
  {
    date: "2026-05-23",
    tag: "site-2026-05-23-nav",
    kind: "site",
    title:
      "Header + MobileNav restructure. ORANGEBOX page rebuilt around v6.3. Legacy v6.1.0 archived.",
    surfaces: [
      "/_components/Header.tsx",
      "/_components/MobileNav.tsx",
      "/orangebox",
      "/orangebox/legacy (NEW)",
    ],
    body:
      "Nav collapsed two competing pulse chips into one (kept 'start here'). Added Learn dropdown (/ai + /faq). Æ Research dropdown restored Lessons From Sci-Fi. ORANGEBOX page rewritten from the v6.1.0 / $1 framing to the v6.3 / $49 inquire-to-ship reality; the prior page preserved at /orangebox/legacy with an archive banner.",
  },
  {
    date: "2026-05-22",
    tag: "ai-seo",
    kind: "site",
    title:
      "AI-search citation depth: structured data on every major route.",
    surfaces: [
      "/ai (NEW)",
      "/llms.txt",
      "/robots.txt",
      "BreadcrumbList × 12 routes",
      "VideoObject × 10 (Lessons From Sci-Fi)",
      "ImageObject × 10 (sci-fi stills)",
      "WebSite + SearchAction (sitewide)",
      "/search (NEW)",
      "HowTo schema (on /ai)",
      "FAQPage schema (/faq + /ai)",
    ],
    body:
      "Site repositioned for AI search engine citation: every major route ships JSON-LD structured data. /ai is the comprehensive 44M on-ramp (51 FAQs · 20 revenue paths · 18 builders · 28 tools). /search is a hand-curated directory. /robots.txt explicitly welcomes 28+ AI crawlers. /llms.txt covers the full site.",
  },
  {
    date: "2026-05-21",
    tag: "viewport-fix",
    kind: "ops",
    title: "Mobile viewport export added — site was rendering desktop on phones.",
    surfaces: ["app/layout.tsx"],
    body:
      "Next 16 requires `export const viewport` separately from `metadata` (split in v14). Without it, mobile browsers serve no viewport meta and render the page at ~980px desktop width. Single export fixed the entire class. Pre-fix, every responsive `md:` breakpoint silently missed on mobile.",
  },
  {
    date: "2026-05-21",
    tag: "broadcast-29-30",
    kind: "broadcast",
    title:
      "Letters 29 (FRONT DOOR · HAL POINTED) and 30 (TWO DOORS) published.",
    surfaces: [
      "/founders-view/2026-05-21-front-door-hal-pointed",
      "/founders-view/2026-05-21-two-doors-the-newcomers-the-press-desks",
      "/api/admin/update-letter (NEW)",
    ],
    body:
      "Two thematic broadcast letters launched. Discovered + patched a regex bug that truncated letter 29's body to 14 words; shipped /api/admin/update-letter as a no-retweet patch endpoint to overwrite the bad row in place. Operator doctrine received mid-session: do not minimize the work to solve.",
  },
  {
    date: "2026-05-21",
    tag: "research-cinema",
    kind: "research",
    title:
      "Lessons From Sci-Fi gallery + 10 Midjourney cinema stills wired with HAL as LEAD.",
    surfaces: [
      "/research/lessons-from-sci-fi",
      "/research/lessons-from-sci-fi/monograph",
      "/public/research/lessons-from-sci-fi/stills/",
    ],
    body:
      "Twelve-card AI-cinema gallery. Stills generated through the operator's Midjourney via Chrome MCP, downloaded, renamed to canonical slugs, wired into StillGallery.tsx. HAL 9000 moved to position 0 (LEAD) per operator decision. 10 cinema clip embeds added with verified YouTube videoIds (Movieclips / Warner Classics / HBO sources).",
  },
  {
    date: "2026-05-21",
    tag: "novice-front-door",
    kind: "site",
    title: "/start launched — 11-minute novice on-ramp for the 44M.",
    surfaces: ["/start (NEW)", "/_components/v2/StartHereStrip (NEW)"],
    body:
      "568-LOC onboarding page with animated aurora canvas hero, 6 concrete use cases with copy-paste prompts, 6 honest AI limits, 30-day on-ramp, 20-term plain-English glossary, send-it-to-one-person CTA. Built for someone who has used ChatGPT under ten times.",
  },
  {
    date: "2026-05-20",
    tag: "pricing-canon",
    kind: "legal",
    title:
      "Pricing canon set: $1 once + FREE first 7 days (the v6.1 ladder was retired here).",
    surfaces: ["lib/pricing.ts", "/api/checkout/route.ts", "BuyButton.tsx"],
    body:
      "The +$1-per-100-buyers ladder published on 2026-05-17 was retired on 2026-05-20 in favor of $1 + free-first-week. Buyers who paid on the ladder are grandfathered under §4A. (Note: this entry preserved for history; the current v6.3 price is $49 — see the 2026-05-23 entries.)",
  },
  {
    date: "2026-05-17",
    tag: "orangebox-v6.1.0",
    kind: "product",
    title:
      "ORANGEBOX Command v6.1.0 'Agent Mode' shipped — 4.98 MB Rust + egui binary.",
    surfaces: ["ORANGEBOX bundle", "/orangebox/legacy"],
    body:
      "Multi-turn agent loop with nine real tools. Tab autocomplete (Haiku 4.5, 30s cache). Repo indexer (303 files / 1,533 symbols / 6.7s benchmark). Background job queue. 20 receipt sources. 60/60 smoke pass. The marketing page for v6.1.0 is preserved at /orangebox/legacy.",
  },
  {
    date: "2026-05-15",
    tag: "intel-x-algorithm",
    kind: "research",
    title:
      "X Algorithm Alpha dossier published — 1,851-line analysis of the xAI open-source.",
    surfaces: ["/intel/x-algorithm"],
    body:
      "Operational deconstruction of the 207-file xai-org/x-algorithm repository. 31 sections covering every scorer, filter, Grok plan, shadowban type, and hidden constant. Operator-class extensions (E1–E6). 12-rule actionable cheatsheet. Inline depth blocks on §15 (min-traction gate), §26 (4 shadowban types), §30 (anatomy of the perfect post). CC-BY 4.0.",
  },
  {
    date: "2026-04-01",
    tag: "aeons-research-12",
    kind: "research",
    title:
      "Twelve ÆoNs Research manuscripts published. CC-BY 4.0.",
    surfaces: ["/research/papers", "/research/papers/[slug]"],
    body:
      "Bioelectric oncology, gut-brain mislabel hypothesis, solar information transfer, topological field theory of self-modifying systems, light-code DNA version control, Coherence ToE, GlyphSpeak compression v1→v3, Spiral-of-Thought architecture, plus 4 more. Each paper carries an academic abstract + a plain-language summary side-by-side.",
  },
];

const KIND_LABEL: Record<ChangeKind, string> = {
  site: "site",
  product: "product",
  research: "research",
  broadcast: "broadcast",
  legal: "legal",
  ops: "ops",
};

export default function ChangelogPage() {
  return (
    <main className="relative z-10 text-[#F2F4F5]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span> Changelog
        </p>
      </div>

      {/* HERO */}
      <section className="border-b border-[#1A2225] py-20 md:py-28">
        <div className="mx-auto w-full max-w-4xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::public version history · {LOG.length} entries · newest first
          </p>
          <h1 className="mt-6 text-balance text-5xl font-medium leading-[1.02] tracking-[-0.02em] md:text-7xl">
            Changelog.
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-[1.55] text-[#C8CCCE] md:text-xl">
            Public version history for the entire lab. Site rewrites,
            ORANGEBOX releases, broadcast cadence, research drops, legal
            updates. Every shipped change with the date, the surfaces
            touched, and a one-line operator note. Not a roadmap.{" "}
            <em className="not-italic text-[#FFB87A]">What already
            shipped.</em>
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {(Object.keys(KIND_LABEL) as ChangeKind[]).map((k) => (
              <span
                key={k}
                className="rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em]"
                style={{
                  color: KIND_COLORS[k],
                  borderColor: KIND_COLORS[k] + "55",
                  background: KIND_COLORS[k] + "0F",
                }}
              >
                ● {KIND_LABEL[k]}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* LOG */}
      <section className="py-16 md:py-20">
        <div className="mx-auto w-full max-w-4xl px-6">
          <ol className="space-y-6">
            {LOG.map((e, i) => {
              const accent = KIND_COLORS[e.kind];
              const human = new Date(e.date + "T00:00:00Z").toLocaleDateString(
                "en-US",
                { weekday: "short", month: "short", day: "numeric", year: "numeric" },
              );
              return (
                <li
                  key={`${e.tag}-${i}`}
                  className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 md:p-8"
                >
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span
                      className="inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.28em]"
                      style={{
                        color: accent,
                        borderColor: accent + "55",
                        background: accent + "10",
                      }}
                    >
                      <span
                        className="size-1.5 rounded-full"
                        style={{ background: accent }}
                      />
                      {KIND_LABEL[e.kind]}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7]">
                      {human}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
                      · {e.tag}
                    </span>
                  </div>
                  <h2 className="mt-4 text-balance text-xl font-semibold text-[#F2F4F5] md:text-2xl">
                    {e.title}
                  </h2>
                  <p className="mt-4 text-sm leading-[1.7] text-[#C8CCCE] md:text-base">
                    {e.body}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {e.surfaces.map((s) => (
                      <code
                        key={s}
                        className="rounded border border-[#1A2225] bg-[#0E1418] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#9BA5A7]"
                      >
                        {s}
                      </code>
                    ))}
                  </div>
                </li>
              );
            })}
          </ol>

          <p className="mt-10 max-w-2xl text-sm leading-[1.6] text-[#6B7779]">
            Want the per-commit version? The site source is public at{" "}
            <a
              href="https://github.com/AtomEons/atomeons-com"
              target="_blank"
              rel="noopener"
              className="text-[#22F0D5] hover:text-[#FFA45A]"
            >
              github.com/AtomEons/atomeons-com
            </a>
            . Every change above corresponds to one or more commits on{" "}
            <code className="font-mono text-[#22F0D5]">main</code>.
          </p>
        </div>
      </section>
    </main>
  );
}
