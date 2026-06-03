import Link from "next/link";
import { AeMark } from "../_components/AeMark";
import { publicSupabase, type FoundersViewPost } from "@/lib/supabase";
import { PAPERS } from "../_data/research-papers";

export const revalidate = 300;

export const metadata = {
  title: "Now — what AtomEons is doing this week",
  description:
    "Live status of the lab. What's shipping, what just shipped, what broke, what's next. Following the /now page convention (Sivers). One operator, public ledger.",
  alternates: { canonical: "https://atomeons.com/now" },
  openGraph: {
    title: "Now — AtomEons lab status",
    description:
      "Live status of the lab. Shipped / shipping / broken / next. Public ledger.",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Now — AtomEons lab status",
    description:
      "Live status of the lab. Shipped / shipping / broken / next.",
  },
};

/**
 * /now page — indie-web convention (nownownow.com / Derek Sivers).
 *
 * Surfaces the operational state of the lab in one glance:
 *   - count of letters in the archive
 *   - count of summarized papers
 *   - latest letter title + date
 *   - rolling "what we shipped this week" list (hand-curated below)
 *   - open mistakes count (hand-curated below)
 *   - what's next (hand-curated below)
 *
 * Hand-curated arrays at the bottom are the operator's editorial channel —
 * update them as the week progresses.
 */

async function loadLetterStats() {
  try {
    const sb = publicSupabase();
    const { data, count } = await sb
      .from("founders_view_posts")
      .select("title, slug, published_at, theme", { count: "exact" })
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(1);
    return {
      total: count ?? 0,
      latest: (data?.[0] as FoundersViewPost) ?? null,
    };
  } catch {
    return { total: 0, latest: null as FoundersViewPost | null };
  }
}

const SHIPPED_THIS_WEEK: Array<{ date: string; what: string; href?: string }> = [
  {
    date: "2026-06-02",
    what:
      "Immersive homepage + design-system page · NEW. AtomEonsImmersiveHero rotates 12 of 67 Nano Banana Pro press-photos slowly across the viewport while massive variable-weight typography overlays. Stat strip across the bottom (200+ pages, 12 cyber tracks, 50+ atlases, CC-BY 4.0). HomeCurriculumWall is a bento of 18 cards proving the depth of /learn. /design-system is the language we build in, made public — Stripe Press / IBM Carbon / Vercel Geist tier.",
    href: "/design-system",
  },
  {
    date: "2026-06-02",
    what:
      "Nano Banana Pro photography pass · 67 hero images. 12 cyber-track heroes + 55 learn-surface heroes. Each one cinematic press-photo: one subject, no humans, no logos, no readable text. Sealed envelopes on slate, undersea fiber-optic cables, watch movements, machined heatsinks. The anti-cliché doctrine made literal across the site.",
    href: "/learn",
  },
  {
    date: "2026-06-01",
    what:
      "Readability + visual lift pass · 60% → 85%. 58-agent workflow audited 8 dimensions, prescribed 12 fixes, ship-verified. Site-wide animations deleted (bloom-drift, conic-rotate, screen-flicker — premium sites run static surfaces). Cyan accent demoted from wallpaper to signal (30+ touches/page → 3). The `::` mono eyebrow chrome stripped across 40 sections.",
    href: "/founders-view",
  },
  {
    date: "2026-06-01",
    what:
      "11-track cyber education + Hackers gate · NEW. /learn/cyber expansion: modern cyberwar (drones, Volt Typhoon, Replicator), LLM warfare (CIA Osiris, Task Force Lima, Lavender), defense platforms (Palantir, Anduril, Shield AI), hackerone path, legal (CFAA primer), federal serve paths, OSCP+OSEP+CISSP certs, AI security (OWASP LLM Top 10, MITRE ATLAS), historical cyberwar (Stuxnet through Change Healthcare). HackersGate front door — password 'hack the planet.'",
    href: "/learn/cyber",
  },
  {
    date: "2026-05-23",
    what:
      "/pricing (NEW) — standalone $99 pricing surface. Product + FAQPage + Breadcrumb JSON-LD. 6-FAQ schema. Comparison ladder vs part-time-PM hire ($52K/yr), custom consulting ($40K-$120K), Claude Pro stack ($3,120/yr), Notion+Linear+Slack ($2,400/yr).",
    href: "/pricing",
  },
  {
    date: "2026-05-23",
    what:
      "/support (NEW) — buyer-facing 8-channel help hub. Pre-filled mailto templates for replace-the-link, MFG refund, Workflow-Fit refund, install help, license recovery, source question, security disclosure, press inquiry.",
    href: "/support",
  },
  {
    date: "2026-05-23",
    what:
      "/changelog (NEW) — public version history with 13 dated entries reaching back to April 2026. Color-coded by kind. Each entry: surfaces touched + operator note.",
    href: "/changelog",
  },
  {
    date: "2026-05-23",
    what:
      "/legal/* fully rewritten — /legal/refund (dual 30-day MFG + Workflow-Fit), /legal/terms (11 clauses, §4A no-SaaS promoted to clause 2), /legal/privacy (10 sections, zero cockpit telemetry, 6 named subprocessors). All three retired the 2026-05-13 $1 ladder narrative.",
    href: "/legal/refund",
  },
  {
    date: "2026-05-23",
    what:
      "Stripe v6.3 SKU checkout — /api/checkout/v63 endpoint + <OrangeBoxV63Buy /> client. POSTs $99 Stripe Checkout Session when STRIPE_ORANGEBOX_V63_ENABLED=true; 503 + inquire fallback until then.",
    href: "/orangebox",
  },
  {
    date: "2026-05-23",
    what:
      "Footer rebuilt 5 → 6 cols. Learn column added (/ai · /start · /faq · /search). Products column adds /pricing + /support. About+Legal column adds /changelog. Lab Status badges current to v6.3 / $99 / §4A no-SaaS.",
  },
  {
    date: "2026-05-23",
    what:
      "Homepage live Founder's View teaser — FoundersViewLiveTeaser server component pulls most recent letter via 5-min ISR. /founders-view ships its own OG card + Blog/BlogPosting JSON-LD + featured-letter hero replacing the utility-grade list lead.",
    href: "/",
  },
  {
    date: "2026-05-23",
    what:
      "/research/about depth pass — Lab Inventory section with citation-as-written blocks for 12 papers, 38-page monograph, X Algorithm dossier, Founder's View. Author-identifier / location / CC-BY 4.0 sub-grid. Open Contribution block.",
    href: "/research/about",
  },
  {
    date: "2026-05-23",
    what:
      "Header + MobileNav restructure. Single pulse chip (was two competing). NEW Learn dropdown (/ai + /faq). ORANGEBOX hint v6.1.0 → v6.3 / $99. Lessons From Sci-Fi restored under Æ Research dropdown.",
  },
  {
    date: "2026-05-23",
    what:
      "ORANGEBOX page rebuilt around v6.3 — AE See-Suite + AE Operations, Basic Install + AI Box, $99 once, 30-day MFG + Workflow-Fit refund. Previous v6.1.0 / $1 framing preserved at /orangebox/legacy with an archive banner.",
    href: "/orangebox",
  },
  {
    date: "2026-05-22",
    what:
      "Founder's View letter 31 — 'DISCRETE GEOMETRY FELL. EIGHT THOUSAND DESK CHAIRS DID TOO.' 1,070-word AI news survey in banter register. Humanity-scale framing.",
    href: "/founders-view",
  },
  {
    date: "2026-05-22",
    what:
      "VideoObject × 10 + ImageObject × 10 + HowTo schema added across the AI-search surfaces. BreadcrumbList added to 12 routes including the dynamic /research/papers/[slug].",
  },
  {
    date: "2026-05-21",
    what:
      "/ai launched — comprehensive AI gateway with 51 FAQs, 20 revenue paths, 18 named builders, 28 named tools, JSON-LD FAQPage + TechArticle schemas. The 44M on-ramp.",
    href: "/ai",
  },
  {
    date: "2026-05-21",
    what:
      "Mobile viewport export added to app/layout.tsx. Pre-fix, every responsive `md:` breakpoint silently missed on mobile — page rendered at ~980px desktop width.",
  },
  {
    date: "2026-05-21",
    what:
      "/start — 11-minute AI literacy on-ramp for novices. Animated aurora hero, 6 concrete tasks with copy-paste prompts, 6 honest limits, 30-day on-ramp, 20-term plain-English glossary.",
    href: "/start",
  },
  {
    date: "2026-05-21",
    what:
      "/press media kit — one-sentence pitch + one-paragraph boilerplate + founder bio (all copy-to-clipboard), hero image block, 6 downloadable asset cards, honest empty-state coverage feed, interview-protocol cards.",
    href: "/press",
  },
  {
    date: "2026-05-21",
    what:
      "/faq — 9 novice questions added at top (LLM, prompt, first AI tool, what AI can/cannot do, what is AtomEons) before the ORANGEBOX product Q&As. Pairs with /start.",
    href: "/faq",
  },
  {
    date: "2026-05-21",
    what:
      "Site-wide color lift — body bg #08090B → #08090B (warmer base), bloom alphas raised, third green-bloom added lower-right, 40s drift animation across body. Reduced-motion guard extended. Homepage hero gets new mesh-gradient motion layer over HAL vignette.",
  },
  {
    date: "2026-05-21",
    what:
      "Lessons From Sci-Fi · The Tape — clean Vimeo-style scene player added between gallery and streaming playlist. 10 cards, facade pattern (zero YouTube traffic until user hits play), modestbranding + rel=0 + no annotations.",
    href: "/research/lessons-from-sci-fi",
  },
  {
    date: "2026-05-20",
    what:
      "Lessons From Sci-Fi · The Monograph — 38-page comprehensive analytical survey of AI in film & TV (1927→2024). 13 chapters · 7 epochs · 5-dimension taxonomy · 6 alignment failure modes · 200+ texts · embedded scene clips at every inflection point.",
    href: "/research/lessons-from-sci-fi/monograph",
  },
  {
    date: "2026-05-20",
    what:
      "Lessons From Sci-Fi · gallery — 12 cinematic stills wired into StillGallery.tsx, HAL 9000 as LEAD card spanning full grid width. Streaming playlist with 14 services, free-first sort, JustWatch routing.",
    href: "/research/lessons-from-sci-fi",
  },
  {
    date: "2026-05-20",
    what:
      "Pricing canon locked — $1 once forever + FREE first 7 days of launch. Ladder-pricing model retired. License §4A bans subscription switch.",
    href: "/faq",
  },
  {
    date: "2026-05-17",
    what:
      "ORANGEBOX v6.0.0 native binary — Rust + egui exe. One file, double-click, 2s launch.",
    href: "/orangebox",
  },
  {
    date: "2026-05-17",
    what:
      "Dynamic ladder pricing — starts at $1, +$1 per 100 sales, license §4A binds against subscription switch.",
    href: "/faq",
  },
  {
    date: "2026-05-17",
    what:
      "/research section — 12 papers, all summarized with academic + plain-language side by side.",
    href: "/research/papers",
  },
  {
    date: "2026-05-17",
    what:
      "The Founder's View — autonomous 8pm ET broadcast pipeline (Supabase + Vercel Cron + Anthropic Sonnet).",
    href: "/founders-view",
  },
  {
    date: "2026-05-17",
    what:
      "Per-letter + per-paper Open Graph image generators with brand-locked 1200×630 cards.",
  },
  {
    date: "2026-05-17",
    what:
      "/api/download SHA-256 integrity gate — refuses to ship a mismatched binary to a paying buyer.",
  },
  {
    date: "2026-05-17",
    what:
      "/faq rewritten end-to-end for v6 (19 questions, FAQPage JSON-LD).",
    href: "/faq",
  },
];

const SHIPPING_NEXT: string[] = [
  "STRIPE_ORANGEBOX_V63_ENABLED=true (optionally STRIPE_ORANGEBOX_V63_PRICE_ID) in Vercel env → /orangebox flips from inquire-only to live $99 self-serve Stripe Checkout. One env var.",
  "Cron sanity: confirm /api/cron/founders-view fires at 8pm ET (Vercel Cron + Supabase service-role write). Verify letter cadence post-letter-31.",
  "EV code-signing certificate (DigiCert / Sectigo) → eliminates Windows SmartScreen warning on first cockpit download.",
  "Real ORANGEBOX cockpit screenshots → flagged TODO in WEBSITE_HANDOFF. Capture v6.3 on a clean machine, drop into /public/orangebox/.",
  "Mac notarization + ARM64 native build → v6.x roadmap, not yet wired.",
  "skil.ski marketplace public registry → planned. Teaser surface live at /skilski.",
];

const CURRENT_REALITY: string[] = [
  "ORANGEBOX v6.3 (AE See-Suite + AE Operations) is the current cockpit. $99 once, forever. License §4A bans subscription.",
  "Public checkout is inquire-only until the STRIPE_ORANGEBOX_V63_ENABLED env var is set. The v6.1.0 / $1 archive lives at /orangebox/legacy.",
  "The Founder's View has 31+ published letters in the archive. Live teaser surfaces the latest on the homepage via 5-min ISR.",
  "Twelve research manuscripts public + summarized · 38-page Lessons From Sci-Fi monograph live · 1,851-line X Algorithm Alpha dossier live.",
  "Every major route ships JSON-LD structured data (Organization · WebSite · SearchAction · FAQPage · Blog · TechArticle · BreadcrumbList · VideoObject · ImageObject · HowTo · Product).",
  "Lab is solo. Atom McCree. Marco Island, FL. No team. No deck. No board. No venture funding ever.",
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "AtomEons", item: "https://atomeons.com" },
    { "@type": "ListItem", position: 2, name: "Now", item: "https://atomeons.com/now" },
  ],
};

export default async function NowPage() {
  const { total: letterCount, latest } = await loadLetterStats();
  const summarizedPapers = PAPERS.filter((p) => p.status === "summarized").length;

  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="mx-auto w-full max-w-4xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">
            AtomEons
          </Link>{" "}
          <span className="text-[#1A2225]">/</span> /now
        </p>
      </div>

      <section className="mx-auto w-full max-w-4xl px-6 py-20 md:py-28">
        <p className="mb-4 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
          <AeMark size={20} glow />
          ::what i&apos;m doing now · this week · this minute
        </p>
        <h1 className="text-balance text-[2.25rem] font-medium leading-[1.02] tracking-[-0.02em] text-[#F2F4F5] sm:text-5xl md:text-7xl">
          /now
        </h1>
        <p className="mt-8 max-w-3xl text-base leading-relaxed text-[#9BA5A7] md:text-lg">
          This is an{" "}
          <a
            href="https://nownownow.com/about"
            target="_blank"
            rel="noopener"
            className="text-[#22F0D5] hover:text-[#FFA45A]"
          >
            indie-web /now page
          </a>{" "}
          — the convention Derek Sivers proposed for solo operators to say
          publicly what they&apos;re working on. Updated whenever
          something changes worth saying. No theater. No roadmap. Just where
          the lab is, right now.
        </p>
        <p className="mt-3 max-w-3xl text-xs text-[#6B7779]">
          Last touch: 23 May 2026 · Marco Island, FL.
        </p>
      </section>

      {/* live-counters strip */}
      <section className="mx-auto w-full max-w-4xl px-6 pb-10">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <div className="rounded-xl border border-[#1A2225] bg-[#0A0F11] p-5">
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#22F0D5]">
              papers
            </p>
            <p className="mt-2 text-2xl font-medium text-[#F2F4F5]">
              {summarizedPapers}
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B7779]">
              summarized
            </p>
          </div>
          <div className="rounded-xl border border-[#1A2225] bg-[#0A0F11] p-5">
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#22F0D5]">
              letters
            </p>
            <p className="mt-2 text-2xl font-medium text-[#F2F4F5]">
              {letterCount}
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B7779]">
              published
            </p>
          </div>
          <div className="rounded-xl border border-[#1A2225] bg-[#0A0F11] p-5">
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#22F0D5]">
              cockpit
            </p>
            <p className="mt-2 text-2xl font-medium text-[#F2F4F5]">v6.3</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B7779]">
              $99 once · §4A
            </p>
          </div>
          <div className="rounded-xl border border-[#1A2225] bg-[#0A0F11] p-5">
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#22F0D5]">
              op count
            </p>
            <p className="mt-2 text-2xl font-medium text-[#F2F4F5]">1</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B7779]">
              founder · marco isl
            </p>
          </div>
        </div>
      </section>

      {/* CURRENT REALITY */}
      <section className="mx-auto w-full max-w-4xl px-6 py-10">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
          ::current reality
        </p>
        <h2 className="mb-6 text-2xl font-medium text-[#F2F4F5] md:text-3xl">
          What is true today.
        </h2>
        <ul className="space-y-2 text-base text-[#F2F4F5] md:text-lg">
          {CURRENT_REALITY.map((line, i) => (
            <li key={i} className="flex gap-3">
              <span className="text-[#22F0D5]">▸</span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* SHIPPED THIS WEEK */}
      <section className="mx-auto w-full max-w-4xl px-6 py-10">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
          ::shipped this week
        </p>
        <h2 className="mb-6 text-2xl font-medium text-[#F2F4F5] md:text-3xl">
          What landed.
        </h2>
        <ol className="space-y-3">
          {SHIPPED_THIS_WEEK.map((item, i) => (
            <li
              key={i}
              className="rounded-xl border border-[#1A2225] bg-[#0A0F11] p-4"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
                {item.date}
              </p>
              <p className="mt-2 text-sm text-[#F2F4F5] md:text-base">
                {item.href ? (
                  <Link
                    href={item.href}
                    className="hover:text-[#22F0D5]"
                  >
                    {item.what}
                  </Link>
                ) : (
                  item.what
                )}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* SHIPPING NEXT */}
      <section className="mx-auto w-full max-w-4xl px-6 py-10">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
          ::shipping next
        </p>
        <h2 className="mb-6 text-2xl font-medium text-[#F2F4F5] md:text-3xl">
          What&apos;s in flight.
        </h2>
        <ul className="space-y-3">
          {SHIPPING_NEXT.map((line, i) => (
            <li
              key={i}
              className="rounded-xl border border-[#1A2225] bg-[#0A0F11] p-4 text-sm leading-relaxed text-[#9BA5A7] md:text-base"
            >
              <span className="text-[#22F0D5]">→</span> {line}
            </li>
          ))}
        </ul>
      </section>

      {/* LATEST FOOTER */}
      <section className="mx-auto w-full max-w-4xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          <Link
            href="/founders-view"
            className="group rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 transition-colors hover:border-[#22F0D5]/50"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
              ::tonight&apos;s letter
            </p>
            <p className="mt-3 text-base font-medium text-[#F2F4F5] group-hover:text-[#22F0D5]">
              {latest ? latest.title : "Awaiting first 8pm broadcast →"}
            </p>
          </Link>
          <Link
            href="/research/papers"
            className="group rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 transition-colors hover:border-[#22F0D5]/50"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
              ::Æ research
            </p>
            <p className="mt-3 text-base font-medium text-[#F2F4F5] group-hover:text-[#22F0D5]">
              {summarizedPapers} of {PAPERS.length} papers summarized →
            </p>
          </Link>
          <Link
            href="/start"
            className="group rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 transition-colors hover:border-[#22F0D5]/50"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
              ::start here
            </p>
            <p className="mt-3 text-base font-medium text-[#F2F4F5] group-hover:text-[#22F0D5]">
              The novice on-ramp · 11 min →
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}
