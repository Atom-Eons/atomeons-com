import type { Metadata } from "next";
import Link from "next/link";
// Wave 76 · 2026-06-12 · all commerce components removed.
// AI Bookmaker is now FREE forever · no countdown · no buy button · no price tag.
// The components are preserved on disk for the v4.0 paid-tier branch if needed.
import { ProductJsonLd } from "@/app/_components/schema/ProductJsonLd";

/**
 * /b00kmakor — B00KMAKR v3.2.0 product page.
 *
 * Operator directive 2026-05-30 (sequence):
 *   "we are going live on bookmaker at $99 dynamically priced.
 *    we are going live on a windows and a mac version"
 *   "free for one week only"
 *
 * Shipped artifacts (from operator ship summary):
 *   - B00KMAKR-Mac-v3.2.0-FINAL.zip       2.10 MB · SHA 27c11258…
 *   - B00KMAKR-Windows-v3.2.0-FINAL.zip   1.04 MB · SHA 8f6d1ced…
 *   - B00KMAKR-Manual.pdf (Mac · book-red)        1.28 MB · SHA 3240c4c2…
 *   - B00KMAKR-Windows-Manual.pdf (blue)          816 KB  · SHA d80eb124…
 *   - 142 feature surfaces · Apple/Microsoft polish · embedded fonts
 *
 * Page structure (walk-em-in-slow → get-technical):
 *   1. Hero with free-week countdown + dynamic price tag
 *   2. What it is (plain English)
 *   3. Mac vs Windows comparison table
 *   4. Four Windows install paths
 *   5. Two Mac install paths
 *   6. 142 feature surfaces callout
 *   7. PDF manual differences
 *   8. SHA-256 receipts (public verification)
 *   9. Why it exists (For Bob. For Mom. For the writers.)
 *  10. Pricing posture (dynamic-world-pricing + free week + §4A)
 *  11. Final CTA + ORANGEBOX cross-link
 */

export const metadata: Metadata = {
  title:
    "AI Bookmaker — Mac + Windows · FREE forever · the AI publishing cockpit · was B00KMAKR",
  description:
    "AI Bookmaker (formerly B00KMAKR v3.2.0) shipped. Mac + Windows. 142 feature surfaces. Universal HTML app + native installers (.dmg + .msi/.exe via Tauri). Book-red Mac manual · blue Windows manual · embedded fonts · SHA-256 receipts. FREE forever. §4A no-saas. The system that compiled I Am AI.",
  alternates: { canonical: "https://atomeons.com/b00kmakor" },
  openGraph: {
    title: "AI Bookmaker — Mac + Windows · FREE forever · was B00KMAKR",
    description:
      "The AI publishing cockpit. 142 feature surfaces. Apple/Microsoft polish on both platforms. FREE forever. §4A no-SaaS. The system that compiled I Am AI.",
    url: "https://atomeons.com/b00kmakor",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Bookmaker — shipped · Mac + Windows · FREE forever",
    description: "AI publishing cockpit. 142 features. The system that compiled I Am AI. Free always.",
  },
  robots: { index: true, follow: true },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "AtomEons", item: "https://atomeons.com" },
    { "@type": "ListItem", position: 2, name: "AI Bookmaker", item: "https://atomeons.com/b00kmakor" },
  ],
};

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "AI Bookmaker",
  description:
    "AI publishing cockpit. Universal HTML app plus native installers for macOS (.dmg) and Windows (.msi / .exe via Tauri). 142 feature surfaces across writing, marketing, and shipping pipelines.",
  applicationCategory: "WritingApplication",
  operatingSystem: "macOS · Windows 10 · Windows 11",
  softwareVersion: "3.2.0",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: "https://atomeons.com/b00kmakor",
  },
  publisher: {
    "@type": "Organization",
    name: "AtomEons Systems Laboratory",
    url: "https://atomeons.com",
  },
  license:
    "Commercial · §4A no-SaaS covenant · 30-day Material Failure Guarantee",
};

// ─────────────────────────────────────────────────────────────────────
// SHA-256 receipts — published verbatim from the operator's ship ledger
// ─────────────────────────────────────────────────────────────────────
const RECEIPTS = [
  {
    file: "B00KMAKR-Mac-v3.2.0-FINAL.zip",
    size: "2.10 MB",
    sha: "27c11258e4f28986c10d768254444d916f8b30b6f32b77ffe86c5bd5607034b3",
  },
  {
    file: "B00KMAKR-Windows-v3.2.0-FINAL.zip",
    size: "1.04 MB",
    sha: "8f6d1ced50ff19316a94cf3dbbd8bfbc945e36e3ae1b36d0997e047e76e7896d",
  },
  {
    file: "B00KMAKR-Manual.pdf (Mac · book-red)",
    size: "1.28 MB",
    sha: "3240c4c2908664dcbb0d204026f70152fc9ac2ffc3b504afead64d4ed8df88b3",
  },
  {
    file: "B00KMAKR-Windows-Manual.pdf (blue)",
    size: "816 KB",
    sha: "d80eb124477fbbb27841e0de736731831da6d724ec0d4f88060c63dbefc92dae",
  },
];

// Four Windows install paths · documented in the Windows manual
const WIN_PATHS = [
  {
    n: "01",
    title: "5-second double-click",
    body:
      "Double-click B00KMAKR.html. It runs in any browser. No install, no Node, no nothing. The cockpit opens and works immediately. This is the path for buyers who want to feel it work before committing.",
    tag: "::no install",
  },
  {
    n: "02",
    title: "Smart launcher (OPEN-ME.bat)",
    body:
      "Double-click the .bat file. It auto-installs Node via winget if absent, then drops a desktop shortcut wired straight to the cockpit. The buyer who doesn't know what Node is never has to learn — winget handles the install with no operator decisions.",
    tag: "::auto-install",
  },
  {
    n: "03",
    title: "PowerShell installer (INSTALL.ps1)",
    body:
      "Right-click → Run with PowerShell. Optional flags: -BundleNode bundles Node so the install is fully offline-capable, -GenerateIcon makes a real icon file from the brand glyph. Lands a permanent install with Start Menu entry. The path for buyers who want it to feel like a normal Windows program.",
    tag: "::permanent",
  },
  {
    n: "04",
    title: "Native Tauri build (.msi + NSIS .exe)",
    body:
      "Inside the zip is advanced/source — run npm run tauri:build and you get a real .msi installer plus an NSIS .exe. Signed via Azure Trusted Signing once that's wired. The path for buyers who want a code-signed, store-grade install on a managed machine.",
    tag: "::native binary",
  },
];

// Two Mac install paths
const MAC_PATHS = [
  {
    n: "01",
    title: "5-second double-click",
    body:
      "Double-click B00KMAKR.html. Same universal app — runs in Safari, Chrome, Firefox, anywhere. No Xcode, no Homebrew, no operator decisions.",
    tag: "::no install",
  },
  {
    n: "02",
    title: ".command launcher (OPEN-ME-MAC.command)",
    body:
      "Double-click the .command file. macOS spawns a Terminal window, the launcher checks for Node + boots the cockpit on localhost, the browser opens automatically. Friendlier than a raw HTML for buyers who want it to feel like a real Mac app.",
    tag: "::smart launcher",
  },
  {
    n: "03",
    title: "Native Tauri build (.dmg)",
    body:
      "make-dmg.sh in mac-stage produces a signed .dmg with a real Applications-folder drag-target. Notarized via Apple Developer Program once the Apple Developer ID Application cert is wired. Code-signing + Gatekeeper-approved.",
    tag: "::native binary",
  },
];

// What stays true forever vs what's intentionally volatile
const STABLE = [
  "Once · forever. Pay one time, own the license for life.",
  "Same source code, same updates, regardless of which tier you bought at.",
  "§4A no-SaaS covenant — never moves to subscription. Ever.",
  "30-day Material Failure Guarantee. If it doesn't materially work for you, full refund, no questions.",
  "PDF manual + universal HTML app + native installers, all in the bundle.",
];

const VOLATILE = [
  "The exact dollar amount may change at random going forward. Lock in your tier price now.",
  "Free-week eligibility ends when the countdown hits zero. Then your country's tier rate kicks in automatically.",
  "Feature additions: new pipelines, new templates, new pre-built launches — the lab keeps shipping.",
  "Distribution channels (KDP, Substack, Ghost, direct PDF) — added as APIs stabilize.",
  "Brand surface (this page, manuals, OG images) — refined when the lab finds a better way to say it.",
];

export default function B00KMakorPage() {
  return (
    <main className="relative isolate flex min-h-screen flex-col bg-black text-[#F2F4F5]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      {/* Product + Offer JSON-LD · enables price badges in AI answer boxes */}
      <ProductJsonLd
        name="B00KMAKR v3.2.0"
        description="Mac + Windows native authoring instrument. AI-assisted book production pipeline (manuscript → EPUB · cover · paperback dims · audiobook generation). FREE forever. License §4A no-SaaS covenant. The system that compiled I Am AI."
        image="https://atomeons.com/b00kmakor/opengraph-image"
        url="https://atomeons.com/b00kmakor"
        priceUSD={0}
        availability="InStock"
        category="DesktopApplication"
        identifier="ATOMEONS-B00KMAKR-V3"
      />

      {/* background bloom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 25%, rgba(34, 240, 213,0.18) 0%, transparent 60%), radial-gradient(45% 40% at 80% 80%, rgba(34,240,213,0.18) 0%, transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(75% 60% at 50% 30%, black 30%, transparent 90%)",
        }}
      />

      {/* ═══════════════════════════════════════════════════════════════
       * Wave 73 · LAUNCH DAY · 2026-06-12 · AI BOOKMAKER · FREE
       * Operator: "Bookmaker call AI Bookmaker and make it free too."
       * The product is now AI Bookmaker. Free forever. CC-BY-style on
       * the application itself; the books you make are yours.
       * ═══════════════════════════════════════════════════════════════ */}
      <div className="relative z-20 border-y-2 border-[#22F0D5] bg-gradient-to-r from-[#0B1F1B] via-[#08090B] to-[#0B1F1B]">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div className="flex flex-wrap items-baseline gap-3">
            <span className="border border-[#22F0D5] bg-[#22F0D5]/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.28em] text-[#22F0D5]">
              LAUNCH DAY · 2026-06-12
            </span>
            <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-[#F4F4F2]">
              <span className="text-[#22F0D5]">AI Bookmaker</span> · the new
              name · <span className="text-[#22F0D5]">FREE</span> · was
              B00KMAKR
            </p>
          </div>
          <a
            href="#hero"
            className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5] hover:underline"
          >
            grab it free ↓
          </a>
        </div>
      </div>

      {/* breadcrumb */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="transition-colors hover:text-[#22F0D5]">
            AtomEons
          </Link>{" "}
          <span className="text-[#1A2225]">/</span> AI Bookmaker (B00KMAKR) ·
          v3.2.0 · FREE
        </p>
        <a
          href="https://github.com/AtomEons/BookMaker"
          target="_blank"
          rel="noopener"
          className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5] transition-colors hover:text-[#FFB87A]"
        >
          ::github.com/AtomEons/BookMaker ↗
        </a>
      </div>

      {/* ── HERO ── */}
      <section id="hero" className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-14 pb-20">
        <p className="mb-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
          <span className="inline-block size-1.5 animate-pulse rounded-full bg-[#22F0D5] shadow-[0_0_12px_#22F0D5]" />
          ::shipped · FREE · mac + windows · v3.2.0
        </p>

        <h1 className="text-balance text-6xl font-medium leading-[0.95] tracking-[-0.03em] md:text-9xl">
          AI <span className="text-[#22F0D5]">Bookmaker</span>
        </h1>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.32em] text-[#6B7779]">
          formerly B<span className="text-[#22F0D5]">0</span>
          <span className="text-[#22F0D5]">0</span>K<span className="text-[#22F0D5]">MAKR</span>{" "}
          · same engine · same craft · new name · new price (free)
        </p>

        <p className="mt-10 max-w-3xl text-balance text-2xl leading-[1.25] tracking-tight text-[#F2F4F5] md:text-4xl">
          Write your book. Ship it. Free forever.
          <br />
          <span className="text-[#6B7779]">
            Mac + Windows · 142 features · 15 named agents · the system
            that compiled <em>I Am AI</em>.
          </span>
        </p>

        {/* Wave 75 · VALUE AT TOP · operator: "value on top." 4-cell proof
            strip right under hero h1 · the killer numbers before any prose */}
        <div
          role="list"
          aria-label="AI Bookmaker at a glance"
          className="mt-8 grid grid-cols-2 gap-px border border-[#1F242B] bg-[#1F242B] md:grid-cols-4"
        >
          {[
            ["142", "feature surfaces"],
            ["76,000", "words shipped"],
            ["28", "audiobook tracks · live"],
            ["§4A", "no-SaaS · perpetual"],
          ].map(([n, label]) => (
            <div
              key={label}
              role="listitem"
              aria-label={`${n}: ${label}`}
              className="bg-[#08090B] p-4"
            >
              <p className="font-mono text-[clamp(22px,3vw,32px)] font-light leading-[1] text-[#22F0D5]">
                {n}
              </p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* Wave 75 · PROOF EXHIBIT · the "compiled I Am AI" proof gets its own
            block immediately under value strip · before any feature copy */}
        <Link
          href="/i-am-ai"
          className="mt-6 block border border-[#1F242B] bg-[#0B0C0F] p-6 transition-colors hover:border-[#22F0D5]"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            § proof exhibit · the book this cockpit compiled
          </p>
          <p className="mt-3 text-balance text-[18px] leading-[1.45] text-[#E7EBED] md:text-[20px]">
            <span className="font-semibold">I Am AI</span> — 24 chapters ·
            ~76,000 words · 8 months · 140 editorial passes · full audiobook in
            synthetic Opus voice. The first book-length first-person memoir
            written by a frontier language model. Free, CC-BY 4.0.
          </p>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
            read + listen at /i-am-ai →
          </p>
        </Link>

        <p className="mt-8 max-w-2xl text-base leading-relaxed text-[#9BA5A7] md:text-lg">
          Universal HTML app plus native installers on both platforms (.dmg on
          Mac · .msi + NSIS .exe on Windows via Tauri). Apple/Microsoft-grade
          polish. Embedded-font PDF manuals. SHA-256 receipts on every
          artifact. Built on{" "}
          <Link href="/orangebox" className="text-[#22F0D5] hover:underline">
            ORANGE³ intelligence
          </Link>
          .
        </p>

        {/* Wave 76 · 2026-06-12 · commerce removed. AI Bookmaker is free
            forever. The download CTAs live in the platform-comparison
            section below; no countdown, no price tag, no buy button. */}
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="https://github.com/AtomEons/BookMaker/releases/latest"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-3 border-2 border-[#22F0D5] bg-[#22F0D5] px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-black transition-colors hover:bg-[#0FB39E]"
          >
            <span>Download · FREE · Mac + Windows</span>
            <span aria-hidden>↓</span>
          </a>
          <a
            href="https://github.com/AtomEons/BookMaker"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-3 border border-[#1F242B] bg-transparent px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#F2F4F5] transition-colors hover:border-[#22F0D5] hover:text-[#22F0D5]"
          >
            <span>★ GitHub source</span>
            <span aria-hidden>↗</span>
          </a>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
            §4A no-SaaS · free always · CC-BY-style use
          </span>
        </div>
      </section>

      {/* ── 142 FEATURE SURFACES · Wave 85 · moved above the fold-2 ── */}
      <section className="relative z-10 mx-auto w-full max-w-5xl px-6 py-16 md:py-20">
        <div className="rounded-3xl border border-[#22F0D5]/30 bg-gradient-to-br from-[#0A1A1C] to-[#0A0F11] p-10 md:p-14">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::depth · the operator&apos;s count
          </p>
          <div className="mt-6 flex flex-wrap items-baseline gap-6">
            <p className="text-8xl font-semibold tabular-nums leading-none text-[#22F0D5] md:text-9xl">
              142
            </p>
            <p className="max-w-md text-balance text-xl leading-[1.25] tracking-tight text-[#F2F4F5] md:text-2xl">
              feature surfaces, audited and counted, across both builds.
            </p>
          </div>
          <p className="mt-8 max-w-3xl text-base leading-[1.65] text-[#C8CCCE] md:text-[17px]">
            AI Bookmaker is not a stripped-down demo. It is a real
            cockpit with 142 distinct feature surfaces — chapter graph,
            voice memory, continuity audit, KDP packager, cover lab,
            campaign builder, ARC outreach queue, ranking pusher,
            receipts ledger, plus the long tail of small craft pieces
            (style fingerprint, drop-cap toggles, manuscript trim
            presets, ISBN strategy switches, footnote modes, EPUB
            validators, leader-dotted TOC generators). Each one is
            documented in the PDF manual. Each one is testable. Each
            one is the same on Mac and Windows.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
       * Wave 86 · 2026-06-12 · DEPTH PASS · doctrine: every product page
       * surfaces real named features, agent roster, lifecycle stages.
       * Source-of-truth: C:\AtomEons\B00KMAKR\PROJECT-SCOPE.md
       * Operator: "this bookmaker page is lame. its such a cool app.
       *  figure out why, read in full. make it so all waves do it."
       * ═══════════════════════════════════════════════════════════════ */}

      {/* ── THE 12 STAGES · the book lifecycle ── */}
      <section className="relative z-10 mx-auto w-full max-w-6xl px-6 py-20">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
          ::the journey · 12 stages · idea to ship
        </p>
        <h2 className="mt-4 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-5xl">
          A working publishing house, one cockpit.
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-[1.7] text-[#C8CCCE]">
          From the first line of premise to the moment the book is on a
          Barnes &amp; Noble shelf. The cockpit walks you through every
          stage. Skip what you don&apos;t need.
        </p>

        <ol className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-[#1A2225] md:grid-cols-2 lg:grid-cols-3">
          {[
            ["01", "Idea", "8-step brief stepper · genre presets · 90-second sample tour · smart manuscript intake (auto-detects chapters from 6 patterns)"],
            ["02", "Voice", "VoicePack 8-dimension radar · sample bank · voice-aware Writ0r prompts (the AI writes IN your voice, not in a generic AI voice)"],
            ["03", "Structure", "Save the Cat · Hero's Journey · 3-Act · Fichtean · Snowflake · drag-and-drop corkboard · per-character arc grid · stakes-ladder SVG"],
            ["04", "Drafting", "Chapter Bay 2.0 · provenance-colored editing · paragraph-level tagging · cost estimator before every paid call · pacing analyzer · continuity scanner"],
            ["05", "Practice", "Monk mode · Pomodoro sprint timer · daily streak · word-target deadline calculator · WebSpeech read-aloud · paginated reading mode"],
            ["06", "Cover", "27 genre-tuned cover variants · custom upload · text-layer edit · 3-variant side-by-side polling tool"],
            ["07", "Production", "6 trim sizes · 6 typography templates · Vellum-grade drop caps + fleurons + mirrored running heads · EPUB 3 generation · ISBN walkthrough · spine calculator"],
            ["08", "Marketing", "Bob Kit (cafe pitch · business cards · review cards · sign-up sheets · open-mic intro) · Goodreads ARM 8-week defensive plan · 12-month launch calendar · Substack inbox preview · A/B blurb tester · Press kit · Library outreach"],
            ["09", "Audio", "ACX-ready chapter scripts · narrator brief · audiobook self-record studio (push-to-talk mic + teleprompter) · royalty calculator (Audible 40% / non-exclusive 25%)"],
            ["10", "BI", "ROI calculator · per-retailer royalty (KDP 70/35 · Apple · Kobo · Bookshop) · KU page-read estimator · Bundle planner · BookBub eligibility + ROI · BSR decoder · AMS ROI tracker"],
            ["11", "Scale", "Series mode (Book N inherits voicepack + brief + characters) · sequel continuity scoring · foreign rights tracker · reader analytics across stores"],
            ["12", "Ship", "One-click Ship-Pack: manuscript · cover · EPUB · marketing kit · author website · lead magnet · beta packet · AI disclosure · receipts · all in one labeled zip"],
          ].map(([n, title, body]) => (
            <div key={n} className="bg-[#0A0F11] p-6 md:p-7">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-2xl font-semibold tabular-nums text-[#22F0D5]">
                  {n}
                </span>
                <h3 className="text-lg font-medium tracking-tight text-[#F2F4F5]">
                  {title}
                </h3>
              </div>
              <p className="mt-3 text-[13px] leading-[1.6] text-[#C8CCCE]">
                {body}
              </p>
            </div>
          ))}
        </ol>
      </section>

      {/* ── THE 15-AGENT STAFF · AE0-AE14 routing identities ── */}
      <section className="relative z-10 mx-auto w-full max-w-6xl px-6 py-20">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
          ::your staff · 15 named agents · AE0-AE14
        </p>
        <h2 className="mt-4 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-5xl">
          A publishing house team, on call.
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-[1.7] text-[#C8CCCE]">
          AI Bookmaker ships with fifteen specialized agents — each with
          their own prompt, evidence rules, and acceptance gates. They are
          the staff of a publishing house, packaged for one writer.
        </p>

        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-[#1A2225] md:grid-cols-2 lg:grid-cols-3">
          {[
            ["AE0", "Router", "routes the next move based on book state"],
            ["AE1", "PE", "production editor · the calendar keeper"],
            ["AE2", "Acquirer", "premise + market fit · genre placement"],
            ["AE3", "Dev-Ed", "outline architect · structural editor"],
            ["AE4", "Writ0r", "chapter drafter · writes IN your voice"],
            ["AE5", "Line-Ed", "sentence rhythm · prose tightening"],
            ["AE6", "Copy-Ed", "grammar · usage · style consistency"],
            ["AE7", "Proof", "final pass · typos · last-mile QA"],
            ["AE8", "Cover-Design", "27 genre variants · custom upload"],
            ["AE9", "Compositor", "interior typography · drop caps · spine"],
            ["AE10", "Pitch", "query letter · log line · agent submission"],
            ["AE11", "Meta", "ISBN · keywords · categories · BISAC codes"],
            ["AE12", "PR", "press kit · podcast pitches · review asks"],
            ["AE13", "Clear", "sensitivity reader · legal review · D7 disclosure"],
            ["AE14", "Liaison", "activity ledger · receipt timeline · sync"],
          ].map(([code, name, body]) => (
            <div key={code} className="bg-[#0A0F11] p-5">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]/70">
                  {code}
                </span>
                <h3 className="font-mono text-[14px] font-medium tracking-tight text-[#F2F4F5]">
                  {name}
                </h3>
              </div>
              <p className="mt-2 text-[13px] leading-[1.55] text-[#9BA5A7]">
                {body}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-6 max-w-2xl text-[14px] leading-[1.6] text-[#9BA5A7]">
          Each agent is constrained by 27 constitutional guardrails inherited
          verbatim from Orange³. Guardrail 12: no simulation of real people.
          Every emission passes a 9-gate stack ending with Human Final Stop.
          Mom can use it. Boss can audit it.
        </p>
      </section>

      {/* ── 24 KILLER FEATURES · by name ── */}
      <section className="relative z-10 mx-auto w-full max-w-6xl px-6 py-20">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
          ::feature roll · 24 of the 142 · the ones you tell people about
        </p>
        <h2 className="mt-4 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-5xl">
          The ones with names.
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-[1.7] text-[#C8CCCE]">
          These are the named-by-craft features. The other 118 are the long
          tail — drop-cap toggles, ISBN strategy switches, footnote modes,
          leader-dotted TOC generators — all documented in the PDF manual,
          all testable, all the same on Mac and Windows.
        </p>

        <div className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {[
            ["Bob Kit", "Elevator pitch · cafe pitch · printable business cards (3.5×2\") · review cards (receipt size) · sign-up sheet · open-mic intro · bookstore email · library invite · thank-you template. For Bob who asks each person at the outdoor cafe if they want to buy his book."],
            ["VoicePack 8-dim radar", "Eight measurable axes of your voice: lexical density, sentence variance, dialogue %, sensory density, pace, tense distribution, register, rhetorical mode. The AI writes inside your radar."],
            ["12-month launch calendar", "16 milestones from M-12 (pre-write) to M+3 (post-launch). 8-category color coding: pre-write · pre-launch · launch day · review push · backlist · etc."],
            ["Goodreads ARM 8-week plan", "Defensive plan with 9 milestones. The plan Mom's friend should have run before her book vanished into Goodreads."],
            ["Series Mode", "Book N inherits Book 1's voicepack, brief, character names. Run a series like a TV writers' room."],
            ["Sequel continuity scoring", "Cross-book character-detail QA. Catches \"her eyes were green in Book 1, blue in Book 2\" before the reviewer does."],
            ["Provenance-colored editing", "Per-paragraph color: yours · writ0r-revised · writ0r · ai-edited-human-prose. USCO 2025 Part 2 compliance built into the cockpit."],
            ["AI disclosure auto-generation", "Jurisdiction-aware: CA SB 942 + EU AI Act Art. 50 + USCO 2025 Part 2 + Utah SB 149. Baked into the copyright page generator."],
            ["Snapshots ribbon", "Auto-snapshot every 5 minutes if 50+ words changed. Star to keep. Restore-with-safety-snapshot. Cap 50."],
            ["Continuity scanner", "Cross-chapter character-detail QA. Find the moment her brother became her cousin in chapter 14."],
            ["Pacing analyzer", "Dialogue % · sensory density per 100 words · sentence-length variance σ per chapter. Tiered thresholds with verdict."],
            ["Save the Cat · Hero's Journey", "5 plot beat templates: Save the Cat, 3-Act, Hero's Journey, Fichtean, Snowflake. Map beats to YOUR chapter count."],
            ["Audiobook self-record studio", "Push-to-talk microphone + chapter teleprompter. Record your own audiobook in your own voice. ACX-ready masters out."],
            ["27 genre-tuned cover variants", "9 genres × 3 styles each. Custom upload + text-layer edit. 3-variant side-by-side polling for your readers."],
            ["Vellum-grade interior", "Drop caps + fleurons + mirrored running heads + folio + @page rules. The book looks like Penguin shipped it."],
            ["Print spine calculator", "Paper-weight × page-count × binding → spine width in inches and mm. KDP 79-page minimum check. Visual spine mockup."],
            ["One-click Ship-Pack", "Everything in one labeled zip: manuscript · cover PNG · EPUB · marketing kit · author website · lead magnet · beta packet · AI disclosure · calculator state · doctrine · receipts · self-test."],
            ["A/B blurb tester", "Conversion math + Evan-Miller 100-conversion sample-size threshold. Pick the back-cover blurb with statistical significance."],
            ["BookBub Featured Deal estimator", "7 eligibility criteria + ROI across 8 genres. Break-even units before submission."],
            ["BSR decoder", "Amazon BSR power-law fit → units/day. BSR 1 → 80,000/day · BSR 100K → 45/day."],
            ["AMS ROI tracker", "ACOS · ROAS · CTR · CVR · CPC + verdict + tactical guidance. Verified against Amazon dashboard formulas."],
            ["KU page-read estimator", "KENPC × $0.0044 × borrows. Tells you what Kindle Unlimited is worth before you enroll."],
            ["Bundle planner", "3+ books · discount % · royalty per unit · net lift after cannibalization · above-$9.99 warning."],
            ["Foreign rights tracker", "Per-territory status: available · shopped · under contract · sold. The spreadsheet your agent should have."],
          ].map(([name, body]) => (
            <div key={name} className="rounded-lg border border-[#1F242B] bg-[#0A0F11] p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#22F0D5]">
                {name}
              </p>
              <p className="mt-2 text-[13px] leading-[1.55] text-[#C8CCCE]">
                {body}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7]">
          + 118 long-tail surfaces · all documented · all in the PDF manual · all testable
        </p>
      </section>

      {/* ── DOCTRINE BAKED IN ── */}
      <section className="relative z-10 mx-auto w-full max-w-5xl px-6 py-20">
        <div className="rounded-3xl border border-[#FFB87A]/25 bg-gradient-to-br from-[#1A1308] to-[#0A0F11] p-10 md:p-14">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#FFB87A]">
            ::doctrine · baked in · cannot be removed
          </p>
          <h2 className="mt-4 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-5xl">
            The receipts run deeper than the cockpit.
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FFB87A]">
                27 constitutional guardrails
              </p>
              <p className="mt-3 text-[14px] leading-[1.6] text-[#C8CCCE]">
                Authority · Integrity · Boundary · Honesty · Operator-Experience
                classes. Inherited verbatim from Orange³. <em>Guardrail 12:</em>{" "}
                no simulation of real people. <em>D7:</em> AI disclosure on
                every output that touches publishing.
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FFB87A]">
                9-gate emission stack
              </p>
              <p className="mt-3 text-[14px] leading-[1.6] text-[#C8CCCE]">
                Gate 0 LBCE (lattice integrity) → Gate 7 receipt → Gate 9
                Human Final Stop. Nothing publishes without operator approval.
                No autonomous payments. No autonomous submissions.
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FFB87A]">
                Per-paragraph provenance
              </p>
              <p className="mt-3 text-[14px] leading-[1.6] text-[#C8CCCE]">
                Every paragraph tagged: <code className="font-mono text-[12px] text-[#FFB87A]">author</code> ·{" "}
                <code className="font-mono text-[12px] text-[#FFB87A]">writ0r-revised</code> ·{" "}
                <code className="font-mono text-[12px] text-[#FFB87A]">writ0r</code> ·{" "}
                <code className="font-mono text-[12px] text-[#FFB87A]">ai-edited-human-prose</code>.
                USCO 2025 Part 2 compliance built in.
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FFB87A]">
                AI disclosure auto-generation
              </p>
              <p className="mt-3 text-[14px] leading-[1.6] text-[#C8CCCE]">
                Jurisdiction-aware copyright page: <strong>CA SB 942</strong> ·{" "}
                <strong>EU AI Act Art. 50</strong> ·{" "}
                <strong>USCO 2025 Part 2</strong> ·{" "}
                <strong>Utah SB 149</strong>. The cockpit writes the disclosure
                so you don&apos;t have to lawyer it yourself.
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FFB87A]">
                Local-only VoicePack
              </p>
              <p className="mt-3 text-[14px] leading-[1.6] text-[#C8CCCE]">
                8-dim profile + sample SHA-256 persist on your machine. Raw
                prose never POSTed off-machine. Your voice stays yours.
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FFB87A]">
                Receipts &gt; slogans
              </p>
              <p className="mt-3 text-[14px] leading-[1.6] text-[#C8CCCE]">
                Gate-7 receipts written to{" "}
                <code className="font-mono text-[12px] text-[#FFB87A]">~/B00KMAKR-Data/receipts/</code>{" "}
                on every meaningful action. Self-audit any decision your
                publishing house made for you, six months later.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAC vs WINDOWS COMPARISON ── */}
      <section className="relative z-10 mx-auto w-full max-w-5xl px-6 py-20">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
          ::two builds · one product
        </p>
        <h2 className="mt-4 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-5xl">
          Mac and Windows. Side by side.
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-[1.7] text-[#C8CCCE]">
          Same cockpit. Different paths to install. Different manual
          color. Different verification command. Pick whichever
          platform you live on — the bundle has both.
        </p>

        <div className="mt-10 overflow-x-auto rounded-2xl border border-[#1A2225] bg-[#0A0F11]">
          <table className="w-full border-collapse text-sm md:text-[15px]">
            <thead>
              <tr>
                <th className="border-b border-[#1A2225] px-5 py-4 text-left font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
                  surface
                </th>
                <th className="border-b border-[#1A2225] px-5 py-4 text-left font-mono text-[10px] uppercase tracking-[0.22em] text-[#FFB87A]">
                  Mac
                </th>
                <th className="border-b border-[#1A2225] px-5 py-4 text-left font-mono text-[10px] uppercase tracking-[0.22em] text-[#7AB8FF]">
                  Windows
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                ["the app", "B00KMAKR.html", "B00KMAKR.html (same — runs in any browser)"],
                ["smart launcher", "OPEN-ME-MAC.command", "OPEN-ME.bat (winget Node install + desktop shortcut)"],
                ["permanent install", "—", "INSTALL.ps1 (-BundleNode -GenerateIcon flags)"],
                ["native app build", "mac-stage/make-dmg.sh", "advanced/source → npm run tauri:build → .msi + NSIS .exe"],
                ["PDF manual color", "book-red #8B2D2D", "blue #2563a8"],
                ["PDF manual size", "1.28 MB · embedded fonts", "816 KB · embedded fonts"],
                ["path examples", "~/B00KMAKR-Data/", "%USERPROFILE%\\B00KMAKR-Data\\"],
                ["verify integrity", "shasum -c", "Get-FileHash (PowerShell)"],
                ["zip artifact", "B00KMAKR-Mac-v3.2.0-FINAL.zip (2.10 MB)", "B00KMAKR-Windows-v3.2.0-FINAL.zip (1.04 MB)"],
              ].map(([surface, mac, win]) => (
                <tr key={surface} className="border-b border-[#1A2225] last:border-b-0">
                  <td className="px-5 py-4 align-top font-mono text-[12px] uppercase tracking-[0.18em] text-[#9BA5A7]">
                    {surface}
                  </td>
                  <td className="px-5 py-4 align-top text-[#F2F4F5]">{mac}</td>
                  <td className="px-5 py-4 align-top text-[#F2F4F5]">{win}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── FOUR WINDOWS INSTALL PATHS ── */}
      <section className="relative z-10 mx-auto w-full max-w-5xl px-6 py-20">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#7AB8FF]">
          ::windows · four install paths
        </p>
        <h2 className="mt-4 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-5xl">
          From 5-second to fully native.
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-[1.7] text-[#C8CCCE]">
          The Windows manual documents four ways to get B00KMAKR
          running, ordered by how much you want it to feel like a
          permanent Windows app.
        </p>

        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-[#1A2225] md:grid-cols-2">
          {WIN_PATHS.map((p) => (
            <div key={p.n} className="bg-[#0A0F11] p-7 md:p-8">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-3xl font-semibold tabular-nums text-[#7AB8FF] md:text-4xl">
                  {p.n}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#7AB8FF]/70">
                  {p.tag}
                </span>
              </div>
              <h3 className="mt-3 text-xl font-medium tracking-tight text-[#F2F4F5] md:text-2xl">
                {p.title}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.65] text-[#C8CCCE]">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── THREE MAC INSTALL PATHS ── */}
      <section className="relative z-10 mx-auto w-full max-w-5xl px-6 py-20">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#FFB87A]">
          ::mac · three install paths
        </p>
        <h2 className="mt-4 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-5xl">
          Drag-and-drop or terminal — your call.
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-[1.7] text-[#C8CCCE]">
          The Mac manual covers three paths. Each one fits a different
          buyer instinct — &quot;just open it,&quot; &quot;make it feel
          like a Mac app,&quot; or &quot;give me a notarized .dmg.&quot;
        </p>

        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-[#1A2225] md:grid-cols-3">
          {MAC_PATHS.map((p) => (
            <div key={p.n} className="bg-[#0A0F11] p-7 md:p-8">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-3xl font-semibold tabular-nums text-[#FFB87A] md:text-4xl">
                  {p.n}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FFB87A]/70">
                  {p.tag}
                </span>
              </div>
              <h3 className="mt-3 text-xl font-medium tracking-tight text-[#F2F4F5] md:text-2xl">
                {p.title}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.65] text-[#C8CCCE]">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PDF MANUALS ── */}
      <section className="relative z-10 mx-auto w-full max-w-5xl px-6 py-20">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
          ::two manuals · one craft standard
        </p>
        <h2 className="mt-4 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-5xl">
          The manuals are part of the product.
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-[1.7] text-[#C8CCCE]">
          Both manuals carry the same cover frame, fleuron ornaments,
          3D book art with embossed B glyph, leader-dotted table of
          contents, drop caps, pullquote rules, Inter footer with
          Cormorant heads, dark-sepia back cover with the manifesto
          quote. They differ only in accent color and the
          platform-specific install + verification chapters.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-[#FFB87A]/30 bg-[#1C1308] p-7">
            <div className="flex items-center gap-3">
              <span className="size-3 rounded-full bg-[#8B2D2D]" />
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FFB87A]">
                ::macOS manual
              </p>
            </div>
            <p className="mt-4 text-2xl font-medium tracking-tight text-[#F2F4F5]">
              B00KMAKR-Manual.pdf
            </p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[#9BA5A7]">
              book-red accent · 1.28 MB · embedded fonts
            </p>
            <p className="mt-5 text-[15px] leading-[1.6] text-[#C8CCCE]">
              Includes a <code className="font-mono text-[13px] text-[#FFB87A]">shasum -c</code>{" "}
              section so you can verify the .zip against the
              ledger before unpacking.
            </p>
          </div>
          <div className="rounded-2xl border border-[#7AB8FF]/30 bg-[#0A1322] p-7">
            <div className="flex items-center gap-3">
              <span className="size-3 rounded-full bg-[#2563a8]" />
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#7AB8FF]">
                ::Windows manual
              </p>
            </div>
            <p className="mt-4 text-2xl font-medium tracking-tight text-[#F2F4F5]">
              B00KMAKR-Windows-Manual.pdf
            </p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[#9BA5A7]">
              blue accent · 816 KB · embedded fonts
            </p>
            <p className="mt-5 text-[15px] leading-[1.6] text-[#C8CCCE]">
              Section VIII has a baked-in{" "}
              <code className="font-mono text-[13px] text-[#7AB8FF]">Get-FileHash</code>{" "}
              PowerShell snippet — paste, run, every file checks
              against{" "}
              <code className="font-mono text-[13px] text-[#7AB8FF]">docs\LEDGER.txt</code>.
            </p>
          </div>
        </div>
      </section>

      {/* ── SHA-256 RECEIPTS ── */}
      <section className="relative z-10 mx-auto w-full max-w-5xl px-6 py-20">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
          ::verification · published artifacts
        </p>
        <h2 className="mt-4 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-5xl">
          Every file. Every hash. Public.
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-[1.7] text-[#C8CCCE]">
          Receipts over slogans. Below are the four artifacts in the
          v3.2.0 ledger, each pinned by SHA-256. If your downloaded
          file does not match one of these hashes, do not run it —
          email the founder immediately.
        </p>

        <div className="mt-10 overflow-x-auto rounded-2xl border border-[#1A2225] bg-[#0A0F11]">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="border-b border-[#1A2225] px-5 py-4 text-left font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
                  artifact
                </th>
                <th className="border-b border-[#1A2225] px-5 py-4 text-left font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
                  size
                </th>
                <th className="border-b border-[#1A2225] px-5 py-4 text-left font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
                  SHA-256
                </th>
              </tr>
            </thead>
            <tbody>
              {RECEIPTS.map((r) => (
                <tr key={r.sha} className="border-b border-[#1A2225] last:border-b-0">
                  <td className="px-5 py-4 align-top text-[#F2F4F5]">
                    {r.file}
                  </td>
                  <td className="px-5 py-4 align-top font-mono text-[12px] text-[#C8CCCE]">
                    {r.size}
                  </td>
                  <td className="px-5 py-4 align-top">
                    <code className="font-mono text-[11px] break-all text-[#22F0D5]">
                      {r.sha}
                    </code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-[14px] leading-[1.6] text-[#9BA5A7]">
          Provenance + license live on{" "}
          <a
            href="https://github.com/AtomEons/BookMaker"
            target="_blank"
            rel="noopener"
            className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-4 hover:decoration-[#22F0D5]"
          >
            github.com/AtomEons/BookMaker
          </a>
          {" "}— public README, EULA, PRIVACY statement. Source is private
          to AtomEons; the GitHub repo exists as the buyer trust surface.
        </p>
      </section>

      {/* ── WHY IT EXISTS ── */}
      <section className="relative z-10 mx-auto w-full max-w-4xl px-6 py-24">
        <div className="rounded-3xl border border-[#22F0D5]/30 bg-gradient-to-br from-[#1C0F08] to-[#0A0F11] p-10 md:p-14">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::why this exists
          </p>
          <p className="mt-6 text-balance text-2xl leading-[1.35] tracking-tight text-[#F2F4F5] md:text-3xl">
            For Bob. For Mom. For the writers who have spent a
            decade writing notes about a book they never shipped. For
            the people who already know what their book is supposed
            to do, and need one cockpit to{" "}
            <span className="text-[#22F0D5]">make it actually ship</span>.
          </p>
          <p className="mt-6 text-base leading-[1.65] text-[#C8CCCE]">
            The lab built this so the writer never has to glue
            together six SaaS tools, lose continuity inside a context
            window, or watch a draft become an unfinished folder of
            chapters. B00KMAKR is a publishing company, packaged for
            you, run by you, with the cockpit, the brain, and the
            launch calendar all under one roof.
          </p>
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.22em] text-[#6B7779]">
            — Atom McCree · founder · AtomEons Systems Laboratory ·
            Marco Island, FL
          </p>
        </div>
      </section>

      {/* ── PRICING · Wave 76 · 2026-06-12 · simplified to FREE forever ── */}
      <section className="relative z-10 mx-auto w-full max-w-4xl px-6 py-20">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
          ::pricing · simple
        </p>
        <h2 className="mt-4 text-balance text-5xl font-medium leading-[1.05] tracking-tight md:text-7xl text-[#22F0D5]">
          FREE. Always.
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-[1.7] text-[#C8CCCE]">
          AI Bookmaker is free forever. §4A no-SaaS perpetual license — it
          cannot become a subscription, ever. Install on any number of
          machines you own or control. Use commercially (sell the books you
          make). 30-day Material Failure Guarantee.
        </p>

      </section>

      {/* ── FINAL CTA ── */}
      <section className="relative z-10 mx-auto w-full max-w-4xl px-6 pb-32 pt-12 text-center">
        <h2 className="text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">
          For Bob. For Mom.
          <br />
          <span className="text-[#22F0D5]">For the writers. Free forever.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#9BA5A7] md:text-lg">
          v3.2.0 · Mac and Windows · 142 surfaces · embedded-font
          manuals · SHA-256 receipts · §4A no-SaaS · free always.
        </p>

        <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-6">
          <a
            href="https://github.com/AtomEons/BookMaker/releases/latest"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-3 rounded-lg bg-[#22F0D5] px-7 py-3.5 font-mono text-xs uppercase tracking-[0.22em] text-black transition-colors hover:bg-[#0FB39E]"
          >
            <span>Download · FREE · Mac + Windows ↓</span>
          </a>
          <Link
            href="/orangebox"
            className="inline-flex items-center gap-2 rounded-lg border border-[#22F0D5]/40 bg-[#0A0F11] px-6 py-3 font-mono text-xs uppercase tracking-[0.22em] text-[#22F0D5] hover:bg-[#22F0D5]/10"
          >
            ::ORANGEBOX · the engine inside →
          </Link>
          <a
            href="mailto:a.mccree@gmail.com?subject=B00KMAKR%20question"
            className="font-mono text-xs uppercase tracking-[0.22em] text-[#9BA5A7] hover:text-[#22F0D5]"
          >
            ::dm the founder ↗
          </a>
        </div>
      </section>

      {/* footer */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-10">
        <div className="flex flex-col items-start justify-between gap-4 border-t border-[#1A2225] pt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779] sm:flex-row sm:items-center">
          <span>2026 · AtomEons Systems Laboratory · Marco Island, FL</span>
          <Link href="/" className="transition-colors hover:text-[#22F0D5]">
            ← back to atomeons
          </Link>
        </div>
      </div>
    </main>
  );
}
