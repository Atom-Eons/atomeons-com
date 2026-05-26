import type { Metadata } from "next";
import Link from "next/link";

/**
 * /orangebox — ORANGEBOX Command v6.3 · public-launch coming soon.
 *
 * Rebuilt 2026-05-23 from the actual present product (per README +
 * WEBSITE_HANDOFF.md in C:\AtomEons\orangebox\). The previous v6.1.0
 * "Agent Mode" page with 11 lanes + $1/free-7-days framing is archived
 * at /orangebox/legacy.
 *
 * Doctrine ship at this surface:
 *  - Honest "coming soon" — the cockpit is real, ships privately to
 *    early operators today, public launch + Stripe-direct checkout
 *    still in the funnel.
 *  - Two product surfaces: AE See-Suite (command) + AE Operations
 *    (systems / install / model lanes / AI Box). NOT the 11-lane
 *    framing the legacy page used.
 *  - Price: $49 once, forever. License §4A bans subscription.
 *  - Basic Install (one computer, default) + optional AI Box
 *    (second-machine heavy work, advanced).
 *  - Material Failure Guarantee 30 days.
 *  - Direct inquire-via-email CTA (no checkout button yet).
 *  - Link to legacy page for the prior framing.
 *  - SoftwareApplication JSON-LD reflects v6.3 + $49.
 */

export const metadata: Metadata = {
  title:
    "ORANGEBOX v6.3 — coming soon · AE See-Suite + AE Operations · $49 once",
  description:
    "ORANGEBOX Command v6.3 — the private AI operations cockpit. Two surfaces: AE See-Suite for command (project routes, party-line, proof, receipts, artifacts) and AE Operations for systems (Basic Install for one computer, optional AI Box for advanced second-machine work, model lanes, diagnostics, recovery). $49 once, forever — license §4A legally bans subscription. Material Failure Guarantee 30 days. Local-first. Source included. Built by one operator, Marco Island FL. Public launch pending — inquire to a.mccree@gmail.com for early-access ship.",
  keywords: [
    "ORANGEBOX",
    "ORANGEBOX Command",
    "AE See-Suite",
    "AE Operations",
    "private AI cockpit",
    "local-first AI",
    "Claude Code cockpit",
    "AI Box",
    "MCP cockpit",
    "operator command suite",
    "Material Failure Guarantee",
    "no subscription AI",
    "AtomEons",
  ],
  alternates: { canonical: "https://atomeons.com/orangebox" },
  openGraph: {
    title: "ORANGEBOX v6.3 — coming soon",
    description:
      "Private AI operations cockpit. Two surfaces: AE See-Suite + AE Operations. $49 once, forever. License §4A bans subscription. Public launch coming.",
    url: "https://atomeons.com/orangebox",
    siteName: "AtomEons",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ORANGEBOX v6.3 — coming soon",
    description:
      "Private AI operations cockpit. AE See-Suite + AE Operations. $49 once. §4A no-saas lock. Public launch coming.",
    creator: "@AtomMccree",
  },
  robots: { index: true, follow: true },
};

const SURFACES = [
  {
    name: "AE See-Suite",
    tagline: "The command surface.",
    body: "Project routes turn intent into a structured object — objective, macro-actions, departments, model lane, proof gates, rollback, receipt id. The party-line lets departments and workers report in structured messages, not loose transcript dumps. Silent Canvas pushes structural changes into visual state rather than burying them in chat scroll. Artifacts, receipts, and visual proof live alongside the route they belong to. Built for the operator who can't afford to lose context between sessions.",
    glyphs: ["⌖ route", "◉ party-line", "▤ receipts", "✦ canvas"],
  },
  {
    name: "AE Operations",
    tagline: "The systems surface.",
    body: "Setup, model lanes, install path, diagnostics, package health, recovery. First-run asks one question — Do you have an AI computer to set up? — default is Basic, one computer. Optional AI Box adds a second-machine heavy-work handoff, diagnosed and configured from inside Operations, never required for the cockpit to work. Ethereal AI Link module handles direct network setup when approved. The systems surface stays out of the way until something breaks; when it breaks, it tells you what and how to fix.",
    glyphs: ["⚙ setup", "◆ lanes", "▣ diagnostics", "↺ recovery"],
  },
];

const FEATURES = [
  { label: "Pricing", value: "$49 USD · once · forever" },
  { label: "License §4A", value: "legally bans subscription — locked" },
  { label: "Telemetry", value: "zero — local-first by construction" },
  { label: "Source", value: "included in the bundle" },
  { label: "Platform", value: "Windows 10/11 x64 · macOS + Linux on roadmap" },
  { label: "Install", value: "Basic (one computer) or AI Box (advanced)" },
  { label: "Departments", value: "AE0–AE14 routing model + review engines" },
  { label: "Guarantee", value: "30-day Material Failure refund" },
  { label: "Contact", value: "a.mccree@gmail.com (direct, no funnel)" },
];

const NOT_FOR = [
  "people who only want a generic chat app",
  "teams that require cloud-native multi-tenant SaaS on day one",
  "operators who want unproven 'magic AI' status claims",
  "anyone whose first question is 'does it have an iOS app'",
];

const FOR = [
  "solo founders running multi-disciplinary work alone",
  "PMs and tech leads who need a private command suite",
  "researchers and lab operators who need durable proof",
  "consultants who need receipt-backed client work",
  "builders tired of losing context to chat scroll, browser memory, tool drift",
];

const PRODUCT_LAW = [
  "AE See-Suite commands.",
  "AE Operations configures.",
  "Workers execute.",
  "Receipts prove.",
  "Review engines challenge.",
  "The operator approves protected actions.",
];

export default function OrangeBox() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      {/* breadcrumb */}
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">
            AtomEons
          </Link>{" "}
          <span className="text-[#1A2225]">/</span> ORANGEBOX · v6.3 · public
          launch coming
        </p>
      </div>

      {/* HERO */}
      <section className="relative isolate overflow-hidden border-b border-[#1A2225] py-24 md:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 30%, rgba(255,138,61,0.12) 0%, transparent 60%), radial-gradient(50% 45% at 20% 90%, rgba(34,240,213,0.10) 0%, transparent 65%)",
          }}
        />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#FF7A1A]/40 bg-[#FF7A1A]/10 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.28em] text-[#FF7A1A]">
              <span className="inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-[#FF7A1A] shadow-[0_0_8px_rgba(255,122,26,0.7)]" />
              v6.3 · ae see-suite + ae operations · ships privately today
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7]">
              public launch · coming
            </span>
          </div>

          <h1 className="mt-7 text-balance text-5xl font-medium leading-[1.02] tracking-[-0.02em] md:text-7xl lg:text-8xl">
            An AI builder
            <br />
            <span className="text-[#FF7A1A]">for all.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-[1.55] text-[#C8CCCE] md:text-xl">
            The private AI operations cockpit for operators who need
            projects to keep moving, prove what happened, and recover
            cleanly when tools stall. ORANGEBOX coordinates Claude Code,
            Cursor, Codex, local tools, optional local models, and
            optional AI Box workers — without turning the product into
            another chat scroll.
          </p>

          <p className="mt-6 max-w-3xl text-base leading-[1.6] text-[#9BA5A7]">
            Two surfaces. AE See-Suite for command. AE Operations for
            systems. Basic Install gets one computer working out of the
            box. Optional AI Box adds advanced second-machine workers
            when ready.
          </p>

          {/* primary CTA strip */}
          <div className="mt-10 grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-center">
            <div className="rounded-2xl border border-[#FF7A1A]/35 bg-gradient-to-br from-[#171012] to-[#0A0F11] p-7">
              <div className="flex items-baseline gap-4">
                <span className="text-5xl font-semibold leading-none text-[#FF7A1A] md:text-6xl">
                  $49
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#FF7A1A]">
                  once · forever
                </span>
              </div>
              <p className="mt-3 text-sm leading-[1.55] text-[#C8CCCE]">
                One install. One operator. Perpetual v1.x / v6.x core.
                License §4A legally bans switching to subscription —
                if AtomEons ever attempts, every existing buyer keeps
                their license free in perpetuity.
              </p>
              <p className="mt-3 text-sm leading-[1.55] text-[#9BA5A7]">
                30-day Material Failure Guarantee: full refund if it
                fails to install or launch on Windows 10/11 + Node
                20+.
              </p>
            </div>

            <div className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
                ::ready to ship · inquire-only
              </p>
              <p className="mt-3 text-sm leading-[1.55] text-[#C8CCCE]">
                Public checkout is not yet wired. Early operators get
                the v6.3 bundle direct from the lab. Email the founder
                with what you&apos;d use it for and what computer
                you&apos;ll run it on.
              </p>
              <a
                href="mailto:a.mccree@gmail.com?subject=ORANGEBOX%20purchase%20inquiry"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#FF7A1A] px-5 py-3 font-mono text-[12px] font-semibold uppercase tracking-[0.28em] text-black shadow-[0_0_40px_rgba(255,122,26,0.35)] transition-all hover:bg-[#FFA45A]"
              >
                inquire to ship →
              </a>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
                a.mccree@gmail.com · ~2h reply in ET waking hours
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TWO SURFACES */}
      <section className="border-b border-[#1A2225] bg-[#0e2520]/30 py-24 md:py-32">
        <div className="mx-auto w-full max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::01 · two product surfaces
          </p>
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.08] tracking-tight md:text-5xl">
            One cockpit. Two surfaces. No dashboard theater.
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-[1.6] text-[#9BA5A7] md:text-lg">
            ORANGEBOX is not a wrapper around a chat box. It&apos;s a
            command-and-systems pair. The command surface keeps the
            project moving. The systems surface keeps the install
            honest.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {SURFACES.map((s) => (
              <div
                key={s.name}
                className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-7"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#FF7A1A]">
                  ::{s.name.toLowerCase().replace(/\s/g, "-")}
                </p>
                <h3 className="mt-3 text-2xl font-medium text-[#F2F4F5] md:text-3xl">
                  {s.name}
                </h3>
                <p className="mt-1 font-mono text-sm uppercase tracking-[0.18em] text-[#22F0D5]">
                  {s.tagline}
                </p>
                <p className="mt-5 text-sm leading-[1.7] text-[#C8CCCE] md:text-base">
                  {s.body}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {s.glyphs.map((g) => (
                    <span
                      key={g}
                      className="rounded-full border border-[#1A2225] bg-[#0E1418] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7]"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSTALL STORY */}
      <section className="border-b border-[#1A2225] py-24 md:py-32">
        <div className="mx-auto w-full max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::02 · install path
          </p>
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.08] tracking-tight md:text-5xl">
            Basic first. AI Box later. The cockpit never needs both.
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-[#22F0D5]/30 bg-[#0A0F11] p-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
                ::basic install · default
              </p>
              <h3 className="mt-3 text-xl font-semibold text-[#F2F4F5] md:text-2xl">
                One computer. Three steps. Ten minutes.
              </h3>
              <p className="mt-4 text-sm leading-[1.7] text-[#C8CCCE]">
                Download the bundle. Run the installer. The cockpit
                boots. First-run asks one question — *do you have an
                AI computer to set up?* — answer **No · Basic** and
                you&apos;re working. Use your existing Claude / GPT /
                Gemini keys (or none — local Ollama works too).
                Everything stays on your machine.
              </p>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
                ✓ recommended for the first 30 days
              </p>
            </div>

            <div className="rounded-2xl border border-[#FF7A1A]/30 bg-[#0A0F11] p-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#FF7A1A]">
                ::ai box · advanced · optional
              </p>
              <h3 className="mt-3 text-xl font-semibold text-[#F2F4F5] md:text-2xl">
                Second machine for heavy work. Add anytime.
              </h3>
              <p className="mt-4 text-sm leading-[1.7] text-[#C8CCCE]">
                A second computer (often a refurbished desktop with a
                consumer GPU) becomes the worker for long-running jobs,
                local model inference, batch indexing, and parallel
                review-engine runs. Diagnosed and configured from
                inside AE Operations. The cockpit on machine one stays
                responsive while machine two does the slow part.
              </p>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[#FF7A1A]">
                ✓ when you outgrow Basic — never required
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT LAW */}
      <section className="border-b border-[#1A2225] bg-[#0e2520]/40 py-24 md:py-32">
        <div className="mx-auto w-full max-w-4xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#FFB87A]">
            ::03 · product law
          </p>
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.08] tracking-tight md:text-5xl">
            The six-line product law.
          </h2>
          <ol className="mt-10 space-y-3">
            {PRODUCT_LAW.map((line, i) => (
              <li
                key={line}
                className="flex items-baseline gap-5 rounded-xl border border-[#1A2225] bg-[#0A0F11] px-6 py-4"
              >
                <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#FF7A1A]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-base text-[#F2F4F5] md:text-lg">
                  {line}
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-sm leading-[1.7] text-[#9BA5A7] md:text-base">
            ORANGEBOX is not complete when text sounds confident. It is
            complete when the output exists, the proof is inspectable,
            and the receipt records what changed.
          </p>
        </div>
      </section>

      {/* SPEC CARD */}
      <section className="border-b border-[#1A2225] py-24 md:py-32">
        <div className="mx-auto w-full max-w-5xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::04 · the spec card
          </p>
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.08] tracking-tight md:text-5xl">
            Everything you&apos;d ask before paying.
          </h2>

          <div className="mt-12 overflow-hidden rounded-2xl border border-[#1A2225]">
            {FEATURES.map((f, i) => (
              <div
                key={f.label}
                className={`grid grid-cols-1 gap-3 bg-[#0A0F11] px-6 py-5 md:grid-cols-[200px_1fr] md:gap-8 md:px-8 ${
                  i > 0 ? "border-t border-[#1A2225]" : ""
                }`}
              >
                <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#FFB87A]">
                  {f.label}
                </span>
                <span className="text-base text-[#F2F4F5]">{f.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FIT */}
      <section className="border-b border-[#1A2225] py-24 md:py-32">
        <div className="mx-auto w-full max-w-5xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::05 · is this for you
          </p>
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.08] tracking-tight md:text-5xl">
            Honest fit. Honest non-fit.
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-[#22F0D5]/30 bg-[#0A0F11] p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
                ::built for
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-[1.6] text-[#C8CCCE]">
                {FOR.map((line) => (
                  <li key={line} className="flex gap-3">
                    <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#22F0D5]" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#FFB87A]">
                ::not built for
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-[1.6] text-[#9BA5A7]">
                {NOT_FOR.map((line) => (
                  <li key={line} className="flex gap-3">
                    <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#FFB87A]" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="border-b border-[#1A2225] bg-[#0e2520]/30 py-24 md:py-32">
        <div className="mx-auto w-full max-w-5xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#FFB87A]">
            ::06 · trust posture
          </p>
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.08] tracking-tight md:text-5xl">
            Five trust signals. None of them marketing.
          </h2>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                k: "Local-first",
                v: "Zero telemetry. No analytics. No phone-home. The cockpit cannot transmit your data even if the lab wanted to.",
              },
              {
                k: "Source included",
                v: "The bundle ships full source alongside the binary. Inspect freely. Modify for internal use.",
              },
              {
                k: "Material Failure Guarantee",
                v: "30-day full refund if ORANGEBOX fails to install or launch on a clean Windows 10/11 + Node 20+ machine.",
              },
              {
                k: "SHA-256 on every artifact",
                v: "Every zip / MSI / EXE is hash-stamped in the ledger. Verify before installation.",
              },
              {
                k: "License §4A no-saas",
                v: "Legally binds the lab to never switch ORANGEBOX to subscription. If attempted, every existing buyer keeps their license free in perpetuity.",
              },
              {
                k: "One operator",
                v: "Built by Atom McCree, AtomEons Systems Laboratory, Marco Island, FL. No VC money. No board. No employees.",
              },
            ].map((b) => (
              <div
                key={b.k}
                className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-5"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
                  {b.k}
                </p>
                <p className="mt-3 text-sm leading-[1.6] text-[#C8CCCE]">
                  {b.v}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMING-SOON CTA */}
      <section className="border-b border-[#1A2225] py-24 md:py-32">
        <div className="mx-auto w-full max-w-4xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#FF7A1A]">
            ::07 · public launch
          </p>
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-5xl">
            Public-checkout launch is coming. Inquire today; ship today.
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-[1.6] text-[#C8CCCE] md:text-lg">
            Self-serve Stripe checkout, signed-URL fulfillment, license
            keys by email — the standard buyer flow — will land at this
            URL when the v6.3 public launch ships. Until then the lab
            ships ORANGEBOX direct to early operators by email. Same
            price ($49 once), same license (§4A bans subscription), same
            guarantee (30-day MFG). The only difference is the founder
            confirms your machine works before sending the zip.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="mailto:a.mccree@gmail.com?subject=ORANGEBOX%20v6.3%20early-access%20inquiry&body=Hi%20Atom%2C%0A%0AI%20want%20to%20use%20ORANGEBOX%20for%3A%20___%0AMy%20machine%3A%20Windows%2010%2F11%20%E2%80%94%20___%0AI%20have%3A%20___%20(API%20keys%20%2F%20Ollama%20%2F%20both)%0A%0AThanks%2C%0A___"
              className="inline-flex items-center gap-2 rounded-full bg-[#FF7A1A] px-7 py-3.5 font-mono text-[12px] font-semibold uppercase tracking-[0.28em] text-black shadow-[0_0_40px_rgba(255,122,26,0.4)] transition-all hover:bg-[#FFA45A]"
            >
              email the founder to ship →
            </a>
            <Link
              href="/orangebox/legacy"
              className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#9BA5A7] transition-colors hover:text-[#22F0D5]"
            >
              see the v6.1.0 archive →
            </Link>
          </div>

          <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
            ::a.mccree@gmail.com · marco island, fl · ~2h reply window
            in et waking hours
          </p>
        </div>
      </section>

      {/* FOOTER NOTE */}
      <section className="bg-[#0A0F11] py-12">
        <div className="mx-auto w-full max-w-4xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#6B7779]">
            ::related surfaces
          </p>
          <ul className="mt-4 grid gap-2 text-sm text-[#9BA5A7] md:grid-cols-3">
            <li>
              <Link href="/orangebox/legacy" className="hover:text-[#22F0D5]">
                · v6.1.0 archive (legacy framing)
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-[#22F0D5]">
                · FAQ — license, refund, privacy, source
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-[#22F0D5]">
                · About the lab
              </Link>
            </li>
            <li>
              <Link href="/founders-view" className="hover:text-[#22F0D5]">
                · Nightly broadcast
              </Link>
            </li>
            <li>
              <Link href="/research/papers" className="hover:text-[#22F0D5]">
                · ÆoNs Research (12 papers, CC-BY 4.0)
              </Link>
            </li>
            <li>
              <Link href="/ai" className="hover:text-[#22F0D5]">
                · The /ai gateway (named tools + builders)
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* JSON-LD — v6.3 SoftwareApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "SoftwareApplication",
                "@id": "https://atomeons.com/orangebox#software",
                name: "ORANGEBOX Command",
                alternateName: [
                  "ORANGEBOX",
                  "ORANGEBOX OS",
                  "AtomEons ORANGEBOX",
                  "AE See-Suite",
                  "AE Operations",
                ],
                applicationCategory: [
                  "DeveloperApplication",
                  "BusinessApplication",
                  "ProductivityApplication",
                ],
                operatingSystem: "Windows 10, Windows 11",
                softwareVersion: "6.3",
                releaseNotes:
                  "v6.3 — AE See-Suite (command surface: project routes, party-line, proof, receipts, artifacts) and AE Operations (systems surface: Basic Install, optional AI Box for advanced second-machine workers, model lanes, diagnostics, recovery). Public checkout launch pending; direct inquire-to-ship via a.mccree@gmail.com.",
                url: "https://atomeons.com/orangebox",
                description:
                  "ORANGEBOX Command v6.3 — the private AI operations cockpit. Two product surfaces (AE See-Suite + AE Operations). Basic Install (one computer) or AI Box (advanced second machine). $49 once, forever. License §4A bans subscription. 30-day Material Failure Guarantee. Local-first. Source included.",
                offers: {
                  "@type": "Offer",
                  availability: "https://schema.org/PreOrder",
                  price: "49",
                  priceCurrency: "USD",
                  url: "https://atomeons.com/orangebox",
                  priceValidUntil: "2030-12-31",
                },
                author: {
                  "@type": "Person",
                  name: "Atom McCree",
                  url: "https://atomeons.com/about",
                },
                publisher: {
                  "@type": "Organization",
                  name: "AtomEons Systems Laboratory",
                  url: "https://atomeons.com",
                },
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "AtomEons",
                    item: "https://atomeons.com",
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "ORANGEBOX",
                    item: "https://atomeons.com/orangebox",
                  },
                ],
              },
            ],
          }),
        }}
      />
    </main>
  );
}
