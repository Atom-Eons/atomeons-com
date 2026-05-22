import Link from "next/link";
import { PressMediaKit } from "./PressMediaKit";

export const metadata = {
  title: "Press kit — AtomEons Systems Laboratory",
  description:
    "AtomEons Systems Laboratory press kit. Total-effort coverage: ÆoNs Research (12 manuscripts · Lessons From Sci-Fi 38-page monograph), ORANGEBOX Command v6.1.0 Agent Mode ($1 desktop AI cockpit), skil.ski (skill marketplace via MCP), /intel (decoded primary-source drops · current: May 2026 xAI algorithm leak), The Founder's View (nightly 8pm ET broadcast), /ai (the comprehensive AI gateway for the 44M facing displacement). Solo independent lab. Marco Island, Florida. Founder: Atom McCree. Boilerplate, founder bio, hero asset, downloadable media pack, three interview-protocol cards, honest-empty coverage feed, direct founder contact.",
  keywords: [
    "AtomEons press kit",
    "Atom McCree press",
    "indie AI lab press",
    "one-operator AI lab",
    "AI startup press kit",
    "ORANGEBOX press",
    "ÆoNs Research press",
    "AI lab Marco Island",
    "44M AI displacement",
    "AI on-ramp media kit",
    "Founder's View broadcast",
    "indie AI economics",
    "post-SaaS pricing",
    "license §4A no-subscription",
    "CC-BY 4.0 AI research",
  ],
  alternates: { canonical: "https://atomeons.com/press" },
  openGraph: {
    title: "AtomEons Press Kit — instant journalist pack",
    description:
      "One-sentence pitch · one-paragraph boilerplate · founder bio · hero asset · downloadable media pack · honest coverage feed · 2-hour reply SLA. Solo independent AI lab. Marco Island, FL.",
    url: "https://atomeons.com/press",
    type: "website",
    locale: "en_US",
    siteName: "AtomEons",
  },
  twitter: {
    card: "summary_large_image",
    title: "AtomEons Press Kit",
    description:
      "Instant media kit. Boilerplate, bio, assets, contact. Solo indie AI lab. Marco Island, FL. 2-hour reply SLA in waking ET hours.",
    creator: "@AtomMccree",
  },
  robots: { index: true, follow: true },
  authors: [{ name: "Atom McCree", url: "https://atomeons.com/about" }],
};

// ──────────────────────────────────────────────────────────────────
// THE LAB IN 2026 — total-effort framing.
// Each row is a SHIPPED surface, not a roadmap. Press leads here
// before any single-product story.
// ──────────────────────────────────────────────────────────────────

const LAB_SURFACES = [
  {
    pillar: "RESEARCH",
    name: "ÆoNs Research",
    blurb:
      "12 peer-ready manuscripts (April 2026). CC-BY 4.0. Bioelectric oncology, gut–brain mislabel, solar information transfer, topological field theory, light-code DNA version control. Each paper carries an academic abstract AND a kid/grandma plain-language summary.",
    href: "/research/papers",
    accent: "#22F0D5",
  },
  {
    pillar: "RESEARCH",
    name: "Lessons From Sci-Fi · The Monograph",
    blurb:
      "38-page comprehensive analytical survey of AI in film & television, 1927 → 2024. 13 chapters · 7 epochs · 5-dimension taxonomy · 6 alignment failure modes · 200+ screen texts indexed. Embedded scene clips at every inflection point. Prepared for Atom · Compiled by Claude (Anthropic) · April 2026.",
    href: "/research/lessons-from-sci-fi/monograph",
    accent: "#22F0D5",
  },
  {
    pillar: "USE AI",
    name: "ORANGEBOX Command v6.1.0",
    blurb:
      "Local-first desktop AI cockpit. Rust + egui. 11 lanes. Agent Mode with 9 real tools. Swap-lane routing across Claude / GPT / Gemini / Groq / Ollama / OpenRouter. JSONL receipts on disk. $1 once · FREE first 7 days. License §4A legally bans switching to monthly billing.",
    href: "/orangebox",
    accent: "#FF7A1A",
  },
  {
    pillar: "MAKE MONEY",
    name: "skil.ski",
    blurb:
      "Skill marketplace delivered via MCP. Verified-skill SKU. The standard-setter rubric for what a real, productionizable AI skill looks like. Built by an indie lab, sold to enterprise.",
    href: "/skilski",
    accent: "#F2F4F5",
  },
  {
    pillar: "KNOW THE TRUTH",
    name: "/intel — X Algorithm Alpha",
    blurb:
      "Decoded primary-source drops, not aggregated headlines. The May 15 2026 xAI leak with operator-grade extensions. The lab reads the actual code that ships and writes back what it means.",
    href: "/intel/x-algorithm",
    accent: "#F2F4F5",
  },
  {
    pillar: "KNOW THE TRUTH",
    name: "The Founder's View",
    blurb:
      "Nightly broadcast at 8pm ET. No-punches-pulled letter from the lab on real events. Editorial satire. Equal-opportunity indignation. Subscribe by bookmark.",
    href: "/founders-view",
    accent: "#FF7A1A",
  },
];

const FACTS = [
  ["Lab", "AtomEons Systems Laboratory · Independent AI research"],
  ["Product", "ORANGEBOX Command v6.0.0"],
  ["Product tagline", "Local-first AI cockpit. BYO keys. Zero markup."],
  ["Launch", "May 17, 2026 — midnight ET (04:00 UTC)"],
  ["Price", "$1 once, forever — no subscription, ever"],
  ["License", "Personal · full source included · §4A anti-SaaS lock"],
  ["Platform", "Windows 10/11 x64 (macOS/Linux on v1.6 roadmap)"],
  ["Requirements", "Node.js 20+, 4 GB RAM, 200 MB disk"],
  ["Distribution", "Direct download on payment confirmed · Stripe + HMAC tokens"],
  ["Founder", "Atom McCree, AtomEons Systems Laboratory"],
  ["Location", "Marco Island, FL, USA"],
  ["URL", "https://atomeons.com/orangebox"],
];

const QUOTES = [
  {
    line: "The model does not run your project. You do. The cockpit keeps both true.",
    by: "Atom McCree, founder",
  },
  {
    line: "Receipts, not promises. No fake green. Every meaningful action writes a receipt.",
    by: "ORANGEBOX doctrine",
  },
  {
    line: "Built in a garage in Marco Island while Anthropic raised $30B. The cockpit costs less than a tank of gas.",
    by: "Atom McCree, founder",
  },
  {
    line: "$1. forever. one dollar. one cockpit. yours.",
    by: "Launch tweet, May 17 2026",
  },
  {
    line: "The cockpit is the instrument. The model is the engine. You are the pilot. Everything else is theater.",
    by: "ORANGEBOX doctrine",
  },
];

const ANGLES = [
  {
    head: "The anti-SaaS founder",
    body: "While the AI tools market doubled subscription prices and split credit pools, one indie founder shipped a $1 one-time desktop cockpit with a license clause (§4A) that legally forbids ever switching to a subscription. If AtomEons ever tries, every existing buyer keeps their license free forever.",
    beat: "indie founders · SaaS economics · anti-establishment tech",
  },
  {
    head: "Local-first AI when the industry went cloud-only",
    body: "ORANGEBOX runs entirely on the buyer's machine. No telemetry. No phone-home. State lives in %APPDATA%. The cockpit physically cannot transmit data even if the founder wanted to. Counter-positioned against every enterprise AI deployment of 2026.",
    beat: "privacy · data sovereignty · EU/GDPR",
  },
  {
    head: "Swap-lane routing — the model wars solved",
    body: "Claude, GPT, Gemini, and Ollama all run from one cockpit. When Claude rate-limits, swap to GPT. When GPT refuses, swap to Gemini. When the bill gets ugly, swap to local Ollama. Mission graph survives every swap. The model wars become irrelevant for operators.",
    beat: "AI infrastructure · ML ops · dev tools",
  },
  {
    head: "Two months of internal use before the first sale",
    body: "AtomEons used ORANGEBOX internally for two months to build everything else they ship — including atomeons.com itself, built in one day inside the cockpit it sells. v6.0.0 is the first version sold outside the lab.",
    beat: "build-in-public · founder narrative · dev tooling",
  },
  {
    head: "$1 launch as a counter-position to $260/mo stacks",
    body: "Most devs in 2026 pay ~$260/month for the standard four-vendor AI stack (Claude Pro + ChatGPT Plus + Gemini Advanced + Cursor). ORANGEBOX is locked at $1 perpetual — a deliberate counter to the SaaS norm.",
    beat: "pricing strategy · product launches · indie business",
  },
  {
    head: "The Florida garage shipping next to a $30B AI round",
    body: "A founder in Marco Island shipped a competitive AI product the same week Anthropic raised at a $900B pre-money valuation. Smallest possible AI lab vs largest possible AI lab, same week.",
    beat: "geography of tech · alternative AI ecosystem · garage-to-launch",
  },
];

const COPY_BLOCKS = [
  {
    title: "Hacker News — Show HN",
    body: `Show HN: ORANGEBOX – $1 desktop AI cockpit (perpetual price), local-first, 60+ MCP tools

I'm Atom — solo founder out of Marco Island, FL. Just shipped v6.0.0 of ORANGEBOX Command, a desktop AI cockpit I've used internally for 2 months to build everything I ship (including atomeons.com itself, built in one day inside the cockpit).

Today is the first day I'm selling it. $1 once, forever — no subscription, ever. License §4A legally bans us from ever switching to monthly billing.

What it does: pairs with Claude Code via 60+ MCP tools, swap-lane routes between Claude/GPT/Gemini/local Ollama mid-session (mission graph survives every swap), writes JSONL receipts for every action so you have an audit trail on disk (not on a vendor server).

Stack: Tauri 2.x + Next.js 16 + Stripe checkout + HMAC-signed download tokens.

https://atomeons.com/orangebox

Happy to AMA on the architecture, the 2-month internal-use arc, or why I think the orchestration layer beats the model layer in 2026.`,
  },
  {
    title: "Product Hunt — launch description",
    body: `ORANGEBOX is the AI cockpit you actually own.

60+ MCP tools. Mission-graph memory that survives every context reset. Swap claude/gpt/gemini/ollama mid-session. Local-first. Zero telemetry.

Built in 2 months of internal use before the first sale. License §4A legally bans switching to monthly billing.

$1 once. Forever. No subscription, ever.`,
  },
  {
    title: "DEV.to — build-in-public article opening",
    body: `# I shipped ORANGEBOX v6.0.0 at midnight: the 14h pre-launch campaign that produced 0 sales and 4 followers

Yes, zero sales. Hear me out.

Two months ago I started losing the thread on multi-week projects — Claude rediscovering "what done meant" between sessions, routing decisions evaporating, no place to run a real mission graph that survives a context reset.

So I built ORANGEBOX. A desktop AI cockpit. 60+ MCP tools. Swap claude/gpt/gemini/ollama mid-session. Local-first. Zero telemetry. The cockpit I've used internally to build everything else.

Today I sold it for the first time. $1 once. Forever.

Here's what the 14 hours before launch looked like:

- 22 X posts shipped via custom poster.mjs (X API v2 OAuth 1.0a)
- 23 strategic replies to verified founders (Chamath Palihapitiya, Greg Brockman, Daniel Smidstrup, Robin Ebers, Nikunj Kothari, Dan McAteer)
- 4 followers gained (3 verified)
- 0 sales

I almost panicked. Then I read the leaked xAI ranking code...

[continues with the algorithm intel, build-in-public lessons, and the $1 launch decision]`,
  },
  {
    title: "Cold email template (universal)",
    body: `SUBJECT: [SUBJECT-ANGLE per target]

Hi [NAME],

While [RECENT NEWS THEY COVERED], I just shipped the counter-play: ORANGEBOX Command v6.0.0, a $1-once desktop AI cockpit (perpetual $1 pricing).

It runs entirely local, swap-lanes between Claude / GPT / Gemini / Ollama mid-session via 60+ MCP tools, and the license has a §4A clause that legally bans us from ever switching to monthly billing.

I used it internally for 2 months before selling the first license. atomeons.com itself was built in one day inside the cockpit it sells.

Full press kit: https://atomeons.com/press
Press release attached.
Founder-direct on this email or @AtomMccree.

— Atom McCree
AtomEons Systems Laboratory · Marco Island, FL`,
  },
];

export default function Press() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      {/* breadcrumb */}
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="transition-colors hover:text-[#22F0D5]">
            AtomEons
          </Link>{" "}
          <span className="text-[#1A2225]">/</span> press kit · EPK
        </p>
      </div>

      {/* HERO */}
      <section className="mx-auto w-full max-w-6xl px-6 py-24">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
          ::electronic press kit · the lab in 2026
        </p>
        <h1 className="text-balance text-5xl font-medium leading-[1.02] tracking-[-0.02em] md:text-7xl">
          For journalists,
          <br />
          <span className="text-[#22F0D5]">covering the lab.</span>
        </h1>
        <p className="mt-8 max-w-3xl text-lg leading-relaxed text-[#9BA5A7]">
          AtomEons Systems Laboratory is one solo independent AI lab in
          Marco Island, Florida — running across four pillars: ÆoNs
          Research, the ORANGEBOX cockpit, skil.ski, and the /intel +
          Founder&apos;s View broadcast surfaces. Press release, quotes,
          story angles, downloadable assets, copy-pastable post bodies,
          and direct founder contact below. No gatekeeping. No PR layer.
        </p>

        {/* direct contact card */}
        <div className="mt-12 rounded-2xl border border-[#22F0D5]/40 bg-gradient-to-br from-[#0A1A1C] to-[#0A0F11] p-7 shadow-[0_0_80px_-30px_rgba(34,240,213,0.5)]">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
            ::direct founder contact · sla ~2h waking hours ET
          </p>
          <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-6">
            <a
              href="mailto:a.mccree@gmail.com?subject=ORANGEBOX%20v6.0.0%20press%20enquiry"
              className="inline-flex items-center gap-2 text-base text-[#F2F4F5] hover:text-[#22F0D5]"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B7779]">
                email
              </span>
              a.mccree@gmail.com
            </a>
            <a
              href="https://x.com/AtomMccree"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 text-base text-[#F2F4F5] hover:text-[#22F0D5]"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B7779]">
                X / DM
              </span>
              @AtomMccree
            </a>
            <span className="inline-flex items-center gap-2 text-base text-[#F2F4F5]">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B7779]">
                location
              </span>
              Marco Island, FL, USA
            </span>
          </div>
          <p className="mt-5 border-t border-[#1A2225] pt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B7779]">
            embargo: none · launch is public the moment you publish
          </p>
        </div>
      </section>

      {/* MEDIA KIT — copy-pasteable boilerplate, pitch, bio, hero image,
            downloadable assets row, honest coverage feed, interview
            protocol cards. Operator directive 2026-05-21: "press page
            go real grade all." */}
      <PressMediaKit />

      {/* TOTAL EFFORT — the lab in 2026 across all four pillars.
            Press leads here before any single-product story. */}
      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <h2 className="mb-2 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
          ::the total effort · what the lab has shipped
        </h2>
        <p className="mb-10 max-w-3xl text-sm text-[#6B7779] md:text-base">
          Six live surfaces across four pillars. All shipped by one
          operator. Marco Island, FL. April–May 2026.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {LAB_SURFACES.map((s) => (
            <Link
              key={s.name}
              href={s.href}
              className="group flex flex-col rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 transition-colors hover:border-[#22F0D5]/40"
            >
              <p
                className="font-mono text-[10px] uppercase tracking-[0.28em]"
                style={{ color: s.accent }}
              >
                {s.pillar}
              </p>
              <h3 className="mt-2 text-lg font-medium text-[#F2F4F5] group-hover:text-[#22F0D5] md:text-xl">
                {s.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#9BA5A7]">
                {s.blurb}
              </p>
              <span className="mt-5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
                {s.href} →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* HEADLINE STORY */}
      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
          ::the story in one paragraph
        </p>
        <p className="text-balance text-3xl font-medium leading-[1.2] tracking-[-0.01em] text-[#F2F4F5] md:text-4xl">
          While Anthropic raised{" "}
          <span className="text-[#FF7A1A]">$30B this week</span>, a solo
          founder in a Florida garage launched the opposite play —{" "}
          <span className="text-[#22F0D5]">ORANGEBOX Command v6.0.0</span>, a{" "}
          <span className="text-[#22F0D5]">$1-once</span> desktop AI cockpit
          available for <span className="text-[#22F0D5]">$1</span> in its first
          six hours, with a license clause that{" "}
          <span className="text-[#FF7A1A]">legally bans</span> switching to
          monthly billing.
        </p>
      </section>

      {/* QUICK FACTS */}
      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <h2 className="mb-8 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
          ::quick facts
        </h2>
        <div className="overflow-hidden rounded-2xl border border-[#1A2225] bg-[#0A0F11]">
          {FACTS.map(([k, v], i) => (
            <div
              key={k}
              className={`grid grid-cols-[160px_1fr] items-baseline gap-6 px-6 py-3.5 md:grid-cols-[200px_1fr] md:px-8 ${
                i > 0 ? "border-t border-[#1A2225]" : ""
              }`}
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#6B7779]">
                {k}
              </span>
              <span className="text-sm text-[#F2F4F5] md:text-base">{v}</span>
            </div>
          ))}
        </div>
      </section>

      {/* PULL QUOTES */}
      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <h2 className="mb-8 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
          ::pull quotes · use freely
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {QUOTES.map((q, i) => (
            <figure
              key={i}
              className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-7 transition-colors hover:border-[#22F0D5]/40"
            >
              <blockquote className="text-balance text-lg leading-relaxed text-[#F2F4F5] md:text-xl">
                "{q.line}"
              </blockquote>
              <figcaption className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[#22F0D5]">
                — {q.by}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* STORY ANGLES */}
      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <h2 className="mb-2 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
          ::story angles · pick the one that fits your beat
        </h2>
        <p className="mb-10 text-sm text-[#6B7779]">
          Same cockpit. Different story. Pick the one that fits your beat.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {ANGLES.map((a) => (
            <div
              key={a.head}
              className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-7 transition-colors hover:border-[#22F0D5]/40"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#FF7A1A]">
                {a.beat}
              </p>
              <h3 className="mt-3 text-xl font-medium text-[#22F0D5]">
                {a.head}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#9BA5A7]">
                {a.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* COPY BLOCKS */}
      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <h2 className="mb-2 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
          ::copy-paste blocks
        </h2>
        <p className="mb-10 text-sm text-[#6B7779]">
          Cleared for repost. Lift verbatim or remix.
        </p>
        <div className="space-y-6">
          {COPY_BLOCKS.map((cb, i) => (
            <details
              key={i}
              className="group rounded-2xl border border-[#1A2225] bg-[#0A0F11]"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 px-7 py-5 text-base text-[#F2F4F5] marker:hidden">
                <span>{cb.title}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#22F0D5] group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <div className="border-t border-[#1A2225] px-7 py-5">
                <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-[#9BA5A7]">
                  {cb.body}
                </pre>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* ASSETS */}
      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <h2 className="mb-8 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
          ::downloadable assets
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <a
            href="/opengraph-image"
            target="_blank"
            rel="noopener"
            className="group rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 transition-colors hover:border-[#22F0D5]/40"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#22F0D5]">
              ::hero card · 1200×630 PNG
            </p>
            <p className="mt-3 text-base text-[#F2F4F5]">
              Open Graph hero image (home)
            </p>
            <p className="mt-1 text-xs text-[#6B7779]">
              right-click → save image as…
            </p>
          </a>
          <a
            href="/orangebox/opengraph-image"
            target="_blank"
            rel="noopener"
            className="group rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 transition-colors hover:border-[#22F0D5]/40"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#22F0D5]">
              ::product card · 1200×630 PNG
            </p>
            <p className="mt-3 text-base text-[#F2F4F5]">
              Faster · Smarter · Cached card
            </p>
            <p className="mt-1 text-xs text-[#6B7779]">
              right-click → save image as…
            </p>
          </a>
        </div>
      </section>

      {/* TRANSPARENCY */}
      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="rounded-2xl border border-[#FF7A1A]/30 bg-gradient-to-br from-[#1C0F08] to-[#0A0F11] p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FF7A1A]">
            ::transparency · for fact-checkers
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[#9BA5A7]">
            AtomEons publishes a public working journal at{" "}
            <Link
              href="/founders-view"
              className="text-[#22F0D5] hover:underline"
            >
              The Founder&apos;s View
            </Link>
            . Every refund, every shipped bug, every wrong call gets logged.
            Live sales counter on the home page reads from Stripe. No vanity
            metrics. The build-in-public arc is documented from "0 sales after
            14h" through whatever post-launch reality turns out to be.
          </p>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="mx-auto w-full max-w-6xl px-6 py-24 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          ::questions, custom angle, exclusive embargo?
        </p>
        <p className="mt-4 text-2xl text-[#F2F4F5]">
          DM me on X{" "}
          <a
            href="https://x.com/AtomMccree"
            target="_blank"
            rel="noopener"
            className="text-[#22F0D5] hover:underline"
          >
            @AtomMccree
          </a>{" "}
          or email{" "}
          <a
            href="mailto:a.mccree@gmail.com"
            className="text-[#22F0D5] hover:underline"
          >
            a.mccree@gmail.com
          </a>
        </p>
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-[#6B7779]">
          founder-direct · no PR layer · 2h response sla
        </p>
      </section>
    </main>
  );
}
