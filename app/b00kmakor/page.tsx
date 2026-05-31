import type { Metadata } from "next";
import Link from "next/link";
import { PriceTag } from "@/app/_components/PriceTag";
import { B00KMakrCountdown } from "./CountdownTimer";
import B00KMakrBuy from "./B00KMakrBuy";

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
    "B00KMAKR v3.2.0 — Mac + Windows · FREE launch week · the AI publishing cockpit",
  description:
    "B00KMAKR v3.2.0 shipped. Mac + Windows. 142 feature surfaces. Universal HTML app + native installers (.dmg + .msi/.exe via Tauri). Book-red Mac manual · blue Windows manual · embedded fonts · SHA-256 receipts. FREE for the first week. After: $99 Tier 1 anchor, dynamically priced by country. §4A no-saas. Once · forever.",
  alternates: { canonical: "https://atomeons.com/b00kmakor" },
  openGraph: {
    title: "B00KMAKR v3.2.0 — Mac + Windows · FREE launch week",
    description:
      "The AI publishing cockpit. 142 feature surfaces. Apple/Microsoft polish on both platforms. FREE for the first week, then $99 dynamically priced.",
    url: "https://atomeons.com/b00kmakor",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "B00KMAKR v3.2.0 — shipped · Mac + Windows · FREE first week",
    description: "AI publishing cockpit. 142 features. Dynamic world pricing.",
  },
  robots: { index: true, follow: true },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "AtomEons", item: "https://atomeons.com" },
    { "@type": "ListItem", position: 2, name: "B00KMAKR", item: "https://atomeons.com/b00kmakor" },
  ],
};

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "B00KMAKR",
  description:
    "AI publishing cockpit. Universal HTML app plus native installers for macOS (.dmg) and Windows (.msi / .exe via Tauri). 142 feature surfaces across writing, marketing, and shipping pipelines.",
  applicationCategory: "WritingApplication",
  operatingSystem: "macOS · Windows 10 · Windows 11",
  softwareVersion: "3.2.0",
  offers: {
    "@type": "Offer",
    price: "99",
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

      {/* background bloom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 25%, rgba(255,122,26,0.18) 0%, transparent 60%), radial-gradient(45% 40% at 80% 80%, rgba(34,240,213,0.18) 0%, transparent 60%)",
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

      {/* breadcrumb */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="transition-colors hover:text-[#22F0D5]">
            AtomEons
          </Link>{" "}
          <span className="text-[#1A2225]">/</span> B00KMAKR · v3.2.0 · shipped
        </p>
      </div>

      {/* ── HERO ── */}
      <section className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-14 pb-20">
        <p className="mb-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.32em] text-[#FF7A1A]">
          <span className="inline-block size-1.5 animate-pulse rounded-full bg-[#FF7A1A] shadow-[0_0_12px_#FF7A1A]" />
          ::shipped · 2026-05-30 · mac + windows · v3.2.0
        </p>

        <h1 className="text-balance text-6xl font-medium leading-[0.95] tracking-[-0.03em] md:text-9xl">
          B<span className="text-[#FF7A1A]">0</span>
          <span className="text-[#FF7A1A]">0</span>K
          <span className="text-[#22F0D5]">MAKR</span>
        </h1>

        <p className="mt-10 max-w-3xl text-balance text-2xl leading-[1.25] tracking-tight text-[#F2F4F5] md:text-4xl">
          The AI publishing cockpit, shipped.
          <br />
          <span className="text-[#6B7779]">
            Mac + Windows. Same craft. Free for one week.
          </span>
        </p>

        <p className="mt-8 max-w-2xl text-base leading-relaxed text-[#9BA5A7] md:text-lg">
          142 feature surfaces. Universal HTML app plus native installers
          on both platforms (.dmg on Mac · .msi + NSIS .exe on Windows
          via Tauri). Apple/Microsoft-grade polish. Embedded-font PDF
          manuals. SHA-256 receipts on every artifact. Built on{" "}
          <Link href="/orangebox" className="text-[#22F0D5] hover:underline">
            ORANGEBOX intelligence
          </Link>
          .
        </p>

        {/* Free-week countdown */}
        <div className="mt-12">
          <B00KMakrCountdown />
        </div>

        {/* Dynamic price tag — shows what the buyer's country WILL pay after countdown */}
        <div className="mt-8 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
              ::after the countdown · your country&apos;s rate
            </p>
            <div className="mt-4">
              <PriceTag productId="b00kmakor" variant="hero" />
            </div>
          </div>
          <div className="flex flex-col items-start gap-3">
            <B00KMakrBuy variant="primary" />
            <p className="max-w-xs font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
              ::buy = free if countdown is live · your country&apos;s tier rate after
            </p>
          </div>
        </div>
      </section>

      {/* ── PLAIN-LANGUAGE INTRO ── */}
      <section className="relative z-10 mx-auto w-full max-w-3xl px-6 py-20">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
          ::what it actually is
        </p>
        <h2 className="mt-4 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-5xl">
          A publishing house that lives on your computer.
        </h2>
        <div className="mt-8 space-y-5 text-base leading-[1.7] text-[#C8CCCE] md:text-[17px]">
          <p>
            You open B00KMAKR like any other app. Inside is a cockpit —
            a single window where you write the book, market the book,
            and ship the book. Every chapter is a node on a mission
            graph the cockpit keeps for you. Your voice survives every
            session. Your continuity is audited every time you change
            something. When the manuscript is ready, the cockpit
            packages it for KDP, builds the cover, lays out the
            120-day launch calendar, and queues the daily action items.
          </p>
          <p>
            There is no cloud requirement. No subscription. No login.
            The whole publishing house runs on your machine, on your
            terms. The data goes where you tell it. The license is
            yours forever after one payment. The source is in the
            bundle.
          </p>
          <p>
            v3.2.0 ships in two builds. Mac. Windows. Same cockpit,
            same brain router, same 142 feature surfaces, same craft.
            Two manuals (book-red for Mac, blue for Windows so you can
            tell at a glance). Two packages, two installer paths each,
            both verified by SHA-256, both with embedded-font PDFs that
            look the same on every screen.
          </p>
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

      {/* ── 142 FEATURE SURFACES ── */}
      <section className="relative z-10 mx-auto w-full max-w-5xl px-6 py-20">
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
            B00KMAKR is not a stripped-down demo. It is a real cockpit
            with 142 distinct feature surfaces — chapter graph, voice
            memory, continuity audit, KDP packager, cover lab,
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
      </section>

      {/* ── WHY IT EXISTS ── */}
      <section className="relative z-10 mx-auto w-full max-w-4xl px-6 py-24">
        <div className="rounded-3xl border border-[#FF7A1A]/30 bg-gradient-to-br from-[#1C0F08] to-[#0A0F11] p-10 md:p-14">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#FF7A1A]">
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

      {/* ── PRICING (stays vs volatile) ── */}
      <section className="relative z-10 mx-auto w-full max-w-5xl px-6 py-20">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
          ::pricing · what stays · what moves
        </p>
        <h2 className="mt-4 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-5xl">
          Free first week. Then your country&apos;s rate.
        </h2>
        <p className="mt-6 max-w-3xl text-base leading-[1.7] text-[#C8CCCE]">
          For the first week after launch, B00KMAKR is FREE in every
          country, at every tier. After the countdown closes, the
          dynamic-world-pricing system kicks in — the same one that
          governs every paid lab product. Your country&apos;s tier
          decides your price; the USA Advantage Pricing Clause +
          Strategic Tier Lift doctrines apply where they apply. The
          full mechanism is{" "}
          <Link
            href="/legal/pricing"
            className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-4 hover:decoration-[#22F0D5]"
          >
            published in full at /legal/pricing
          </Link>
          {" "}and the doctrine paper lives at{" "}
          <Link
            href="/dynamic-world-pricing"
            className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-4 hover:decoration-[#22F0D5]"
          >
            /dynamic-world-pricing
          </Link>
          .
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-[#22F0D5]/30 bg-[#0A1A1C] p-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
              ::what stays true · forever
            </p>
            <ul className="mt-5 space-y-3 text-[15px] leading-[1.6] text-[#C8CCCE]">
              {STABLE.map((s) => (
                <li key={s} className="flex items-baseline gap-3">
                  <span className="font-mono text-[#22F0D5]">▲</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-[#FFB87A]/30 bg-[#1C1308] p-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FFB87A]">
              ::what is intentionally volatile
            </p>
            <ul className="mt-5 space-y-3 text-[15px] leading-[1.6] text-[#C8CCCE]">
              {VOLATILE.map((v) => (
                <li key={v} className="flex items-baseline gap-3">
                  <span className="font-mono text-[#FFB87A]">▶</span>
                  <span>{v}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="relative z-10 mx-auto w-full max-w-4xl px-6 pb-32 pt-12 text-center">
        <h2 className="text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">
          For Bob. For Mom.
          <br />
          <span className="text-[#FF7A1A]">For the writers. Shipped.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#9BA5A7] md:text-lg">
          v3.2.0 · Mac and Windows · 142 surfaces · embedded-font
          manuals · SHA-256 receipts · §4A no-saas · once · forever.
          Free for the first week. Lock in now.
        </p>

        <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-6">
          <B00KMakrBuy variant="primary" />
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
