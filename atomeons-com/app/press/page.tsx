import Link from "next/link";

export const metadata = {
  title: "Press kit — ORANGEBOX v1.5.0",
  description:
    "Press kit for ORANGEBOX Command v1.5.0. Quotes, screenshots, founder bio, story angles, downloadable assets, and direct founder contact. Launch: May 17, 2026 at midnight ET. $1 till 6am.",
  alternates: { canonical: "https://atomeons.com/press" },
  robots: { index: true, follow: true },
};

const FACTS = [
  ["Product", "ORANGEBOX Command v1.5.0"],
  ["Tagline", "The AI cockpit you actually own."],
  ["Launch", "May 17, 2026 — midnight ET (04:00 UTC)"],
  ["Promo", "$1 till 6am ET, then $49 once, forever"],
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
    line: "$1 till 6am. yes. one dollar. one cockpit. forever.",
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
    body: "While the AI tools market doubled subscription prices and split credit pools, one indie founder shipped a $49 one-time desktop cockpit with a license clause (§4A) that legally forbids ever switching to a subscription. If AtomEons ever tries, every existing buyer keeps their license free forever.",
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
    head: "Two years of internal use before the first sale",
    body: "AtomEons used ORANGEBOX internally for two years to build everything else they ship — including atomeons.com itself, built in one day inside the cockpit it sells. v1.5.0 is the first version sold outside the lab.",
    beat: "build-in-public · founder narrative · dev tooling",
  },
  {
    head: "$1 launch as a counter-position to $260/mo stacks",
    body: "Most devs in 2026 pay ~$260/month for the standard four-vendor AI stack (Claude Pro + ChatGPT Plus + Gemini Advanced + Cursor). ORANGEBOX launches at $1 for the first six hours, then $49 once forever — a deliberate counter to the SaaS norm.",
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
    body: `Show HN: ORANGEBOX – $1 desktop AI cockpit ($49 after 6am ET), local-first, 60+ MCP tools

I'm Atom — solo founder out of Marco Island, FL. Just shipped v1.5.0 of ORANGEBOX Command, a desktop AI cockpit I've used internally for 2 years to build everything I ship (including atomeons.com itself, built in one day inside the cockpit).

Today is the first day I'm selling it. $1 till 6am ET, then $49 once forever. License §4A legally bans us from ever switching to monthly billing.

What it does: pairs with Claude Code via 60+ MCP tools, swap-lane routes between Claude/GPT/Gemini/local Ollama mid-session (mission graph survives every swap), writes JSONL receipts for every action so you have an audit trail on disk (not on a vendor server).

Stack: Tauri 2.x + Next.js 16 + Stripe checkout + HMAC-signed download tokens.

https://atomeons.com/orangebox

Happy to AMA on the architecture, the 2-year internal-use arc, or why I think the orchestration layer beats the model layer in 2026.`,
  },
  {
    title: "Product Hunt — launch description",
    body: `ORANGEBOX is the AI cockpit you actually own.

60+ MCP tools. Mission-graph memory that survives every context reset. Swap claude/gpt/gemini/ollama mid-session. Local-first. Zero telemetry.

Built in 2 years of internal use before the first sale. License §4A legally bans switching to monthly billing.

$1 till 6am ET. $49 once after. Forever.`,
  },
  {
    title: "DEV.to — build-in-public article opening",
    body: `# I shipped ORANGEBOX v1.5.0 at midnight: the 14h pre-launch campaign that produced 0 sales and 4 followers

Yes, zero sales. Hear me out.

Two years ago I started losing the thread on multi-week projects — Claude rediscovering "what done meant" between sessions, routing decisions evaporating, no place to run a real mission graph that survives a context reset.

So I built ORANGEBOX. A desktop AI cockpit. 60+ MCP tools. Swap claude/gpt/gemini/ollama mid-session. Local-first. Zero telemetry. The cockpit I've used internally to build everything else.

Today I sold it for the first time. $1 till 6am ET. $49 once after.

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

While [RECENT NEWS THEY COVERED], I just shipped the counter-play: ORANGEBOX Command v1.5.0, a $49-once desktop AI cockpit (currently $1 in its launch window, midnight ET → 6am ET).

It runs entirely local, swap-lanes between Claude / GPT / Gemini / Ollama mid-session via 60+ MCP tools, and the license has a §4A clause that legally bans us from ever switching to monthly billing.

I used it internally for 2 years before selling the first license. atomeons.com itself was built in one day inside the cockpit it sells.

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
          ::electronic press kit · v1.5.0 launch
        </p>
        <h1 className="text-balance text-5xl font-medium leading-[1.02] tracking-[-0.02em] md:text-7xl">
          For journalists,
          <br />
          <span className="text-[#22F0D5]">covering ORANGEBOX.</span>
        </h1>
        <p className="mt-8 max-w-3xl text-lg leading-relaxed text-[#9BA5A7]">
          Press release, quotes, story angles, downloadable assets,
          copy-pastable post bodies for HN / PH / DEV / Reddit, and direct
          founder contact. All in one place. No gatekeeping.
        </p>

        {/* direct contact card */}
        <div className="mt-12 rounded-2xl border border-[#22F0D5]/40 bg-gradient-to-br from-[#0A1A1C] to-[#0A0F11] p-7 shadow-[0_0_80px_-30px_rgba(34,240,213,0.5)]">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
            ::direct founder contact · sla ~2h waking hours ET
          </p>
          <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-6">
            <a
              href="mailto:a.mccree@gmail.com?subject=ORANGEBOX%20v1.5.0%20press%20enquiry"
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

      {/* HEADLINE STORY */}
      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
          ::the story in one paragraph
        </p>
        <p className="text-balance text-3xl font-medium leading-[1.2] tracking-[-0.01em] text-[#F2F4F5] md:text-4xl">
          While Anthropic raised{" "}
          <span className="text-[#FF7A1A]">$30B this week</span>, a solo
          founder in a Florida garage launched the opposite play —{" "}
          <span className="text-[#22F0D5]">ORANGEBOX Command v1.5.0</span>, a{" "}
          <span className="text-[#22F0D5]">$49-once</span> desktop AI cockpit
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
          Each angle is a different lede. Same product, different narrative.
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
            AtomEons publishes a public{" "}
            <Link
              href="/mistakes"
              className="text-[#22F0D5] hover:underline"
            >
              mistake ledger
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
