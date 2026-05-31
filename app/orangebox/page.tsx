import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CountdownTimer } from "./CountdownTimer";

/**
 * /orangebox — public landing page · GREEN-LIT REBUILD 2026-05-30
 *
 * Built from the canonical spec:
 *   C:\AtomEons\orangebox\finals\WEB_PROJECT_FINAL_PACKAGE_2026-05-30.md
 *
 * Single product. $49 perpetual. Free preview week (v1.0.0-beta from
 * GitHub Release). No subscription, no email capture, no third-party
 * tracking. Warm ember palette mirroring the in-app cockpit
 * (NOT cool tech blue like the rest of the site).
 *
 * Section structure follows §7 IA verbatim:
 *   Hero · Compression Kicker · Problem · What Orangebox Is · Pillars ·
 *   Cockpit · Under the Hood · Privacy · Pricing · Buyers · Use Cases ·
 *   System Requirements · Not in the Box · Roadmap · FAQ · Final CTA · Footer
 *
 * Copy is lifted verbatim from §8 + WEBSITE_PASSOVER §21 FAQ.
 * Palette is lifted verbatim from §11 + native.rs constants.
 *
 * Day 0 CTA wiring per §18 / §10.1:
 *   Primary "Download free this week" → GitHub Release (when operator
 *     creates the org/repo per §19 Day 0). Until then it 404s — and the
 *     direct-mirror Vercel Blob fallback right below it works tonight.
 *   Secondary "Buy ($49 from next week)" → disabled / coming-soon until
 *     Stripe link is configured (Day 3-4).
 */

const EMBER = {
  bg: "#1A1410",
  panel: "#221A14",
  elevated: "#2A2018",
  hover: "#322618",
  border: "#3D2F22",
  separator: "#2E241A",
  textPrimary: "#E8D5B7",
  textSoft: "#C4AD8E",
  textMuted: "#8A7560",
  textDim: "#5C4D3D",
  accent: "#FF7733",
  accentSoft: "#FFAA66",
  success: "#88CC66",
  warning: "#D4B056",
  error: "#CC6644",
  amber: "#FFAA44",
  glow: "#FF8844",
} as const;

const ASSETS = {
  logo:
    "https://idv0aauaxicyf09e.public.blob.vercel-storage.com/orangebox/brand/theorangebox.png",
  exe: "https://idv0aauaxicyf09e.public.blob.vercel-storage.com/orangebox/v1.0.0-beta/OrangeboxSetup-1.0.0-win-x64.exe",
  cert: "https://idv0aauaxicyf09e.public.blob.vercel-storage.com/orangebox/v1.0.0-beta/AtomEons-CodeSigning.cer",
  github: "https://github.com/AtomEons/orangebox",
  ghRelease: "https://github.com/AtomEons/orangebox/releases/latest",
} as const;

const SHA256 =
  "D4E6153FEB19B8B8A46BCC987A2308C8D9645CDC792A1BB4246E3115B0743C83";

export const metadata: Metadata = {
  title: "Orangebox — Local-first AI cockpit for builders · $49",
  description:
    "Local-first AI cockpit. Multi-LLM. Bring your own keys. Tamper-evident receipts. $49 perpetual — no subscription. Your code never leaves your machine.",
  keywords: [
    "Orangebox",
    "local-first AI",
    "AI cockpit",
    "BYOK AI",
    "AI without subscription",
    "multi-LLM",
    "AECode",
    "receipt-backed AI",
    "Cursor alternative local",
    "Claude Code alternative",
    "privacy AI coding",
    "AI desktop tool Windows",
  ],
  alternates: { canonical: "https://atomeons.com/orangebox" },
  openGraph: {
    title: "Orangebox — Local-first AI cockpit for builders · $49",
    description:
      "Built in 75 days. With itself. Multi-LLM. BYOK. Receipt-backed. $49 perpetual.",
    url: "https://atomeons.com/orangebox",
    type: "website",
    // images: omitted · fall through to app/orangebox/opengraph-image.tsx route convention
  },
  twitter: {
    card: "summary_large_image",
    title: "Orangebox — $49 perpetual · local-first AI cockpit",
    description:
      "Multi-LLM. BYOK. Receipt-backed. No subscription. Your code never leaves your machine.",
  },
  robots: { index: true, follow: true },
};

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Orangebox",
  description:
    "Local-first desktop AI cockpit for builders. Multi-LLM routing through Claude, GPT, Gemini, local Ollama, OpenRouter. Tamper-evident JSON receipts on every action. BYOK — no AI markup. $49 perpetual, no subscription.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Windows 10 · Windows 11",
  softwareVersion: "1.0.0-beta",
  offers: {
    "@type": "Offer",
    price: "49.00",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: "https://atomeons.com/orangebox",
  },
  publisher: {
    "@type": "Organization",
    name: "AtomEons Systems Laboratory",
    url: "https://atomeons.com",
  },
  license:
    "Perpetual · Anti-SaaS Commitment · License §4A no-SaaS covenant",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "AtomEons", item: "https://atomeons.com" },
    { "@type": "ListItem", position: 2, name: "Orangebox", item: "https://atomeons.com/orangebox" },
  ],
};

// ─────────────────────────────────────────────────────────────────────
// CONTENT BLOCKS (lifted from §8 + WEBSITE_PASSOVER §21)
// ─────────────────────────────────────────────────────────────────────

const TRUST_BADGES = [
  { icon: "🔒", label: "Local-first" },
  { icon: "🔑", label: "BYOK" },
  { icon: "🧾", label: "Receipt-backed" },
  { icon: "✍️", label: "Signed Authenticode" },
  { icon: "🪪", label: "Sectigo timestamped" },
  { icon: "🚫", label: "No telemetry" },
  { icon: "♾", label: "Perpetual" },
];

const COMING_BADGES = [
  "🪪 Microsoft-signed via Azure Trusted Signing",
  "✓ GitHub Verified Publisher",
];

const PROBLEM = [
  {
    head: "Subscription bleed",
    body:
      "Cursor + Copilot + Claude Pro + ChatGPT + Linear + Notion = $1,000–$1,400/year. Every subscription disappears the moment you stop paying.",
  },
  {
    head: "The privacy gap",
    body:
      "Your code uploads to Cursor's servers. To Copilot's. To Claude Code. To Codex. Sits there. Subject to subpoena. Exposed in any breach.",
  },
  {
    head: "The audit gap",
    body:
      "What did the AI just do? Most tools give you nothing — no trail, no proof, no replay. Three weeks later you can't answer.",
  },
];

const PILLARS = [
  {
    title: "LOCAL-FIRST",
    head: "Your code stays.",
    body:
      "Runs on your computer. Works offline for local-model and local-skill workflows. The only network traffic is the AI provider calls you explicitly send.",
  },
  {
    title: "BRING YOUR OWN KEYS",
    head: "No markup. No lock-in.",
    body:
      "Orangebox ships zero API keys. You provide them. You pay providers directly at their published rates. Orangebox takes nothing from your model spend.",
  },
  {
    title: "RECEIPT-BACKED",
    head: "Audit-grade by default.",
    body:
      "Every install step, every command, every model call writes a tamper-evident JSON receipt to your local audit trail. Grep your own history. Replay what worked. Prove what happened.",
  },
];

const PROVIDERS = [
  { p: "Anthropic Claude", env: "ANTHROPIC_API_KEY", use: "Default for code reasoning, long context" },
  { p: "OpenAI GPT", env: "OPENAI_API_KEY", use: "Embeddings, image gen, specialties" },
  { p: "Google Gemini", env: "GOOGLE_API_KEY", use: "Long context, multimodal" },
  { p: "OpenRouter", env: "OPENROUTER_API_KEY", use: "Universal cheap fallback (100+ models)" },
  { p: "Local Ollama", env: "(none)", use: "Offline, batch, free-marginal work" },
  { p: "Perplexity", env: "PERPLEXITY_API_KEY", use: "Web-grounded research" },
  { p: "Groq", env: "GROQ_API_KEY", use: "Ultra-low-latency" },
  { p: "Cohere", env: "COHERE_API_KEY", use: "Embeddings, reranking" },
  { p: "Mistral", env: "MISTRAL_API_KEY", use: "EU-resident inference" },
];

const COMPARISON = [
  { alt: "Cursor Pro", cost: "$240/yr", get: "SaaS · uploads your code · single vendor · monthly forever" },
  { alt: "GitHub Copilot Pro", cost: "$120/yr", get: "SaaS · uploads your code · GitHub-locked" },
  { alt: "Claude Pro", cost: "$240/yr", get: "Chat only · no project memory · vendor-locked" },
  { alt: "ChatGPT Plus", cost: "$240/yr", get: "Chat only · no integration · vendor-locked" },
  { alt: "Cursor + Copilot + Claude Pro + Notion + Linear", cost: "$1,500+/yr", get: "Patchwork of subscriptions · no unified spine" },
  { alt: "Custom internal cockpit", cost: "$40K–$120K", get: "Months of build time before first real loop" },
  { alt: "Orangebox", cost: "$49 once", get: "All of the above · local-first · BYOK · perpetual", highlight: true },
];

const BUYERS = [
  { who: "The Solo Founder", quote: "Stop asking 'where was I' every time you open your laptop." },
  { who: "The Indie Developer", quote: "Your AI tools should outlive your free time, not your free time outlive your AI tools." },
  { who: "The Privacy-Conscious Engineer", quote: "Your code never leaves your machine. That's the whole point." },
  { who: "The Consultant / Freelancer", quote: "Every change documented. Every receipt your invoice." },
  { who: "The Lab Operator / PM", quote: "A definition of done that survives the next sprint." },
  { who: "The Student / Learner", quote: "One purchase. No expiration. Forever yours." },
  { who: "The Anti-SaaS Power User", quote: "Software you actually own." },
];

const USE_CASES = [
  { n: "01", head: "Solo founder building a SaaS landing page", body: "AE1 Product + AE3 Design + AE4 Marketing in parallel · brand-aware drafts · AE7 Review gates before promotion." },
  { n: "02", head: "Indie dev shipping a CLI tool", body: "AE6 Code drafts the implementation · AE14 Bench writes the test · AE11 Security audits the args · gauntlet pass before merge." },
  { n: "03", head: "Consultant on NDA client codebase", body: "Local-only flow · local Ollama for the high-sensitivity slices · receipts as the billable trail." },
  { n: "04", head: "PM tracking a sprint", body: "Vision Rail shows every dev's WIP through the same receipt lens. One source of truth for 'where are we.'" },
  { n: "05", head: "Student learning AI-assisted coding", body: "No subscription · receipts as the learning trail · reusable skill primers keep what you learned." },
];

const FAQ = [
  {
    q: "Do I need to know how to code?",
    a: "Orangebox is a developer's cockpit. If you don't already write or read code at least casually, this is not the product for you. If you do, even a little, Orangebox amplifies you.",
  },
  {
    q: "Does Orangebox include AI model API keys?",
    a: "No. Orangebox is BYOK — Bring Your Own Keys. You supply keys for Anthropic, OpenAI, Google, OpenRouter, or any other provider you want to use. The keys live on your machine and only authenticate calls to the provider you set them for.",
  },
  {
    q: "What if I don't have any API keys yet?",
    a: "Orangebox also routes to local models via Ollama, which is free and runs entirely offline. You can use Orangebox without any cloud AI provider at all. Or you can sign up for a free Anthropic, OpenAI, or Google API account — most have generous free tiers.",
  },
  {
    q: "Will Orangebox work on Mac or Linux?",
    a: "Not in v1.0.0. Mac and Linux installers are on the roadmap if there's demand.",
  },
  {
    q: "Does Orangebox phone home?",
    a: "No. Read PRIVACY.md in the install. No telemetry, no analytics, no crash reports. The only network traffic Orangebox generates is the AI provider calls you initiate yourself.",
  },
  {
    q: "How do updates work?",
    a: "v1.x point releases are free to existing buyers. Major version upgrades (v2, v3) will be separate purchase events at the time they ship. Your v1 license never expires.",
  },
  {
    q: "Can I install on multiple computers?",
    a: "Yes. The license is per-person, not per-machine. Install on any number of computers you own or control.",
  },
  {
    q: "Can I share my license with my team?",
    a: "No. The license covers you as an individual or your internal business use. For team distribution, contact us — team license ships in v2.x.",
  },
  {
    q: "Is there a refund policy?",
    a: "Yes. If Orangebox doesn't work on your supported system within 14 days of purchase, we'll issue a full refund. Email support@atomeons.com.",
  },
  {
    q: "Will my purchase still work if AtomEons goes away?",
    a: "Yes. Orangebox is a perpetual license. The application runs entirely on your local machine. There is no online activation, no license-server check, no kill-switch.",
  },
  {
    q: "What models does Orangebox support?",
    a: "Anthropic Claude (3.5+ Sonnet, Haiku, Opus), OpenAI GPT (4o, 4-Turbo, 5 when available), Google Gemini (1.5 Pro, 2.5 Pro), local Ollama models (Llama 3.1, Mistral, Qwen, etc.), OpenRouter (100+ models). New providers add via the connector registry without a new Orangebox release.",
  },
  {
    q: "How is Orangebox different from Cursor / Copilot / Claude Code?",
    a: "Cursor and Copilot are SaaS — your code uploads to their servers and you pay monthly forever. Claude Code is single-vendor and subscription-locked. Orangebox is local-first (your code stays on your disk), multi-vendor (any model you have a key for), and one-time $49 perpetual.",
  },
  {
    q: "Is the source code available?",
    a: "The source for Orangebox v1.0.0 is private to AtomEons. The installer is provenance-attested via Sigstore + GitHub Artifact Attestations — you can cryptographically verify it came from our official build pipeline. Open-source roadmap is not committed at this time.",
  },
  {
    q: "How do I report a bug?",
    a: "Open an issue on the public GitHub repo at github.com/AtomEons/orangebox, or email support@atomeons.com.",
  },
  {
    q: "Where do I buy?",
    a: "FREE this week — download direct from the GitHub Release. Starting next week the price is $49 once, perpetual license, via Stripe checkout. Either way you keep the software forever.",
  },
];

// ─────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────

export default function OrangeboxPage() {
  return (
    <main
      className="relative isolate min-h-screen"
      style={{ background: EMBER.bg, color: EMBER.textPrimary }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* warm radial bloom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 40% at 50% 18%, rgba(255,119,51,0.22) 0%, transparent 70%), radial-gradient(40% 35% at 85% 75%, rgba(255,170,68,0.10) 0%, transparent 70%)",
        }}
      />

      {/* STICKY NAV */}
      <nav
        className="sticky top-0 z-30 border-b backdrop-blur-md"
        style={{ borderColor: EMBER.border, background: `${EMBER.bg}cc` }}
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-3">
          <Link href="/orangebox" className="flex items-center gap-3">
            <Image
              src={ASSETS.logo}
              alt="Orangebox"
              width={28}
              height={28}
              className="rounded-md"
              unoptimized
            />
            <span
              className="font-mono text-[11px] uppercase tracking-[0.28em]"
              style={{ color: EMBER.accent }}
            >
              Orangebox
            </span>
          </Link>
          <div className="hidden items-center gap-7 md:flex">
            <a href="#download" className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: EMBER.textSoft }}>Download</a>
            <a href="#pricing" className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: EMBER.textSoft }}>Pricing</a>
            <a href="#how-it-works" className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: EMBER.textSoft }}>How it works</a>
            <a href="#faq" className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: EMBER.textSoft }}>FAQ</a>
            <a href={ASSETS.github} target="_blank" rel="noopener" className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: EMBER.accent }}>GitHub ↗</a>
          </div>
        </div>
      </nav>

      {/* breadcrumb */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: EMBER.textDim }}>
          <Link href="/" style={{ color: EMBER.textDim }}>AtomEons</Link>{" "}
          <span style={{ color: EMBER.border }}>/</span> Orangebox · v1.0.0-beta · GREEN-LIT
        </p>
      </div>

      {/* ── HERO ── */}
      <section className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-16 pb-12">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            <p className="mb-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.32em]" style={{ color: EMBER.accent }}>
              <span className="inline-block size-1.5 animate-pulse rounded-full" style={{ background: EMBER.accent, boxShadow: `0 0 16px ${EMBER.glow}` }} />
              ::shipped · v1.0.0-beta · FREE this week
            </p>

            <h1 className="text-balance text-5xl font-medium leading-[0.98] tracking-[-0.025em] md:text-7xl" style={{ color: EMBER.textPrimary }}>
              Your AI cockpit.<br />
              <span style={{ color: EMBER.accent }}>Local. Perpetual. Yours.</span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-[1.55] md:text-xl" style={{ color: EMBER.textSoft }}>
              Orangebox is a Windows desktop tool that turns Claude, GPT,
              Gemini, and local models into a single project-aware command
              surface — with tamper-evident receipts on every action,
              complete privacy, and zero subscription.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={ASSETS.exe}
                className="inline-flex items-center gap-2 rounded-lg px-6 py-3.5 text-base font-semibold transition-colors"
                style={{
                  background: EMBER.accent,
                  color: EMBER.bg,
                  boxShadow: `0 0 40px ${EMBER.accent}44`,
                }}
              >
                Download free now · 2.81 MB ↓
              </a>
              <a
                href={ASSETS.ghRelease}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 rounded-lg border px-6 py-3.5 text-base font-medium transition-colors"
                style={{ borderColor: EMBER.accent, color: EMBER.accent }}
              >
                GitHub Release →
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 rounded-lg border px-6 py-3.5 text-base font-medium transition-colors"
                style={{ borderColor: EMBER.border, color: EMBER.textPrimary }}
              >
                See how it works ↓
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {TRUST_BADGES.map((b) => (
                <span
                  key={b.label}
                  className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em]"
                  style={{ borderColor: EMBER.border, background: EMBER.panel, color: EMBER.textSoft }}
                >
                  <span>{b.icon}</span>
                  <span>{b.label}</span>
                </span>
              ))}
              {COMING_BADGES.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em]"
                  style={{ borderColor: EMBER.separator, background: "transparent", color: EMBER.textDim }}
                >
                  {c} · coming v1.0.1
                </span>
              ))}
            </div>
          </div>

          {/* Logo / hero panel */}
          <div
            className="relative rounded-3xl border p-4 md:p-6"
            style={{ borderColor: EMBER.border, background: EMBER.panel }}
          >
            <div
              className="relative aspect-square w-full overflow-hidden rounded-2xl"
              style={{ background: EMBER.elevated }}
            >
              <Image
                src={ASSETS.logo}
                alt="Orangebox cockpit logo"
                fill
                className="object-contain p-4"
                unoptimized
                priority
              />
            </div>
            <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: EMBER.textMuted }}>
              ::OrangeboxSetup-1.0.0-win-x64.exe · 2.81 MB · Authenticode-signed
            </p>
          </div>
        </div>

        {/* Countdown · same component as bundle page */}
        <div className="mt-14">
          <CountdownTimer postCountdownPrice="$49" />
        </div>
      </section>

      {/* ── COMPRESSION KICKER ── */}
      <section
        className="relative z-10 border-y"
        style={{ borderColor: EMBER.border, background: `linear-gradient(180deg, ${EMBER.panel} 0%, ${EMBER.elevated} 100%)` }}
      >
        <div className="mx-auto w-full max-w-4xl px-6 py-20 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em]" style={{ color: EMBER.accentSoft }}>
            ::compression
          </p>
          <h2 className="mt-5 text-balance text-5xl font-medium leading-[1] tracking-tight md:text-7xl" style={{ color: EMBER.textPrimary }}>
            Built in 75 days.<br />
            <span style={{ color: EMBER.accent }}>With itself.</span>
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-[1.55]" style={{ color: EMBER.textSoft }}>
            Orangebox is the cockpit that compressed two years of solo-founder
            work into eleven weeks. You&apos;re getting the same cockpit.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-[1.6]" style={{ color: EMBER.textMuted }}>
            The v1.0.0-beta .exe was built using earlier versions of itself.
            Compression ratio: ~10× vs solo-founder pace, ~10× vs the
            &quot;custom command suite&quot; alternative. The receipts in
            the install prove the build path.
          </p>
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section id="problem" className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em]" style={{ color: EMBER.accent }}>
          ::why this exists
        </p>
        <h2 className="mt-4 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-5xl" style={{ color: EMBER.textPrimary }}>
          Three pains converge in 2026 software.
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PROBLEM.map((p) => (
            <div
              key={p.head}
              className="rounded-2xl border p-7"
              style={{ borderColor: EMBER.border, background: EMBER.panel }}
            >
              <h3 className="text-2xl font-medium tracking-tight" style={{ color: EMBER.accent }}>
                {p.head}
              </h3>
              <p className="mt-4 text-[15px] leading-[1.65]" style={{ color: EMBER.textSoft }}>
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHAT IT IS ── */}
      <section id="how-it-works" className="relative z-10 mx-auto w-full max-w-4xl px-6 py-20">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em]" style={{ color: EMBER.accent }}>
          ::what orangebox is
        </p>
        <h2 className="mt-4 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-5xl" style={{ color: EMBER.textPrimary }}>
          One Windows app. Five jobs.
        </h2>
        <p className="mt-8 max-w-3xl text-[17px] leading-[1.65]" style={{ color: EMBER.textSoft }}>
          Orangebox is a single Windows desktop application that does five
          things.
        </p>

        <ol className="mt-10 space-y-5">
          {[
            ["Owns the cockpit.", "Every AI-assisted action — chat, code change, deploy, doc edit, terminal run — flows through one local command surface."],
            ["Routes to multiple AI models without lock-in.", "Claude, GPT, Gemini, local Ollama, OpenRouter — all addressable from the same cockpit. Bring your own keys; no markup."],
            ["Produces a receipt for every meaningful action.", "Tamper-evident JSON receipts to your local audit trail. Answer 'what changed, when, by which model' three months from now without reading old logs."],
            ["Lives entirely on your machine.", "No phone-home. No telemetry. No analytics. Your code, prompts, conversations, receipts — all of it stays on disk."],
            ["Costs $49 once. Forever.", "No subscription. Future v1.x updates free. Your license never expires."],
          ].map(([head, body], i) => (
            <li
              key={head}
              className="grid gap-3 rounded-2xl border p-6 md:grid-cols-[60px_1fr] md:items-baseline md:gap-6 md:p-7"
              style={{ borderColor: EMBER.border, background: EMBER.panel }}
            >
              <span className="font-mono text-2xl font-semibold tabular-nums" style={{ color: EMBER.accent }}>
                0{i + 1}
              </span>
              <div>
                <h3 className="text-lg font-medium" style={{ color: EMBER.textPrimary }}>{head}</h3>
                <p className="mt-2 text-[15px] leading-[1.65]" style={{ color: EMBER.textSoft }}>{body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ── THREE PILLARS ── */}
      <section id="pillars" className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em]" style={{ color: EMBER.accent }}>
          ::the three pillars
        </p>
        <h2 className="mt-4 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-5xl" style={{ color: EMBER.textPrimary }}>
          Three promises. Each verifiable.
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PILLARS.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border p-7"
              style={{ borderColor: EMBER.border, background: EMBER.panel }}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.32em]" style={{ color: EMBER.accent }}>
                {p.title}
              </p>
              <h3 className="mt-4 text-2xl font-medium tracking-tight" style={{ color: EMBER.textPrimary }}>
                {p.head}
              </h3>
              <p className="mt-4 text-[15px] leading-[1.65]" style={{ color: EMBER.textSoft }}>
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── UNDER THE HOOD ── */}
      <section id="under-the-hood" className="relative z-10 mx-auto w-full max-w-5xl px-6 py-24">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em]" style={{ color: EMBER.accent }}>
          ::under the hood
        </p>
        <h2 className="mt-4 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-5xl" style={{ color: EMBER.textPrimary }}>
          For the hackers and pros.
        </h2>
        <p className="mt-6 max-w-3xl text-[17px] leading-[1.65]" style={{ color: EMBER.textSoft }}>
          The cockpit ships with the architecture below. Each piece is
          documented in the install at <code style={{ color: EMBER.accent }}>%USERPROFILE%\OrangeBox-Data\docs\</code>.
        </p>

        {/* 14 departments */}
        <div className="mt-10 rounded-2xl border p-7" style={{ borderColor: EMBER.border, background: EMBER.panel }}>
          <h3 className="text-xl font-medium" style={{ color: EMBER.textPrimary }}>
            AE0–AE14 · 15-department architecture
          </h3>
          <p className="mt-3 text-[15px] leading-[1.65]" style={{ color: EMBER.textSoft }}>
            AE0 is the brain root; AE1-AE14 are named roles with charter
            constraints. AI work routes through them so every action has a
            known author. Plus a review-pressure overlay: LIPS (copy/UX),
            MIRRORS (anti-theater), CHECKMATE (security), ORANGE (focus),
            MISFITS (frontier).
          </p>
          <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-5">
            {[
              "AE0 Brain", "AE1 Product", "AE2 Research", "AE3 Design", "AE4 Marketing",
              "AE5 Sales", "AE6 Code", "AE7 Review", "AE8 Launch", "AE9 Legal",
              "AE10 Ops", "AE11 Security", "AE12 Data", "AE13 Automation", "AE14 Bench",
            ].map((d) => (
              <span
                key={d}
                className="rounded-md border px-2.5 py-1.5 text-center font-mono text-[10px] uppercase tracking-[0.18em]"
                style={{ borderColor: EMBER.separator, color: EMBER.textMuted }}
              >
                {d}
              </span>
            ))}
          </div>
        </div>

        {/* AECode contracts */}
        <div className="mt-6 rounded-2xl border p-7" style={{ borderColor: EMBER.border, background: EMBER.panel }}>
          <h3 className="text-xl font-medium" style={{ color: EMBER.textPrimary }}>
            AECode contracts · structured AI work
          </h3>
          <p className="mt-3 text-[15px] leading-[1.65]" style={{ color: EMBER.textSoft }}>
            Contract language for AI changes:
          </p>
          <code
            className="mt-4 block break-all rounded-md p-3 font-mono text-[12px]"
            style={{ background: EMBER.elevated, color: EMBER.accentSoft, border: `1px solid ${EMBER.separator}` }}
          >
            intent → AECode source → mission contract → target plan → isolated patch → gauntlet → receipt → approval
          </code>
          <p className="mt-3 text-[15px] leading-[1.6]" style={{ color: EMBER.textMuted }}>
            Every promotion runs the gauntlet. Every approval generates a
            replay-able audit receipt. You can reconstruct any change from
            disk three months later.
          </p>
        </div>

        {/* AtomSmasher + ChatBackup + Skills */}
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {[
            {
              h: "AtomSmasher",
              body: "Crystal Lattice Compression · 10–80× context compression on typical codebases · preserves intent, code shape, dependencies · bundled, no add-on fee.",
            },
            {
              h: "ChatBackup + Restore Primers",
              body: "Saves every meaningful AI exchange to local data root. Restore primers rebuild context on a new session. Survives crashes, app updates, vendor changes.",
            },
            {
              h: "Skill Primers",
              body: "Reusable workflows under skills/. Built-in orangebox-primer teaches new AI sessions to operate inside Orangebox in <30s. Operator-writable, survives upgrades.",
            },
          ].map((c) => (
            <div key={c.h} className="rounded-2xl border p-6" style={{ borderColor: EMBER.border, background: EMBER.panel }}>
              <h3 className="text-lg font-medium" style={{ color: EMBER.textPrimary }}>{c.h}</h3>
              <p className="mt-3 text-[14px] leading-[1.6]" style={{ color: EMBER.textSoft }}>{c.body}</p>
            </div>
          ))}
        </div>

        {/* Multi-LLM table */}
        <div className="mt-10 overflow-x-auto rounded-2xl border" style={{ borderColor: EMBER.border, background: EMBER.panel }}>
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="border-b px-5 py-3 text-left font-mono text-[10px] uppercase tracking-[0.22em]" style={{ borderColor: EMBER.separator, color: EMBER.accent }}>Provider</th>
                <th className="border-b px-5 py-3 text-left font-mono text-[10px] uppercase tracking-[0.22em]" style={{ borderColor: EMBER.separator, color: EMBER.accent }}>Env var</th>
                <th className="border-b px-5 py-3 text-left font-mono text-[10px] uppercase tracking-[0.22em]" style={{ borderColor: EMBER.separator, color: EMBER.accent }}>Use case</th>
              </tr>
            </thead>
            <tbody>
              {PROVIDERS.map((row) => (
                <tr key={row.p} className="border-b last:border-b-0" style={{ borderColor: EMBER.separator }}>
                  <td className="px-5 py-3" style={{ color: EMBER.textPrimary }}>{row.p}</td>
                  <td className="px-5 py-3 font-mono text-[12px]" style={{ color: EMBER.accentSoft }}>{row.env}</td>
                  <td className="px-5 py-3" style={{ color: EMBER.textSoft }}>{row.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-[14px]" style={{ color: EMBER.textMuted }}>
          Routing picks the cheapest fit by default. Falls back to next provider on rate-limit. Logs which provider served each call in the receipt. Pin a specific model per task whenever you want control.
        </p>

        {/* Optional AI Box */}
        <div className="mt-6 rounded-2xl border p-7" style={{ borderColor: EMBER.border, background: EMBER.panel }}>
          <h3 className="text-xl font-medium" style={{ color: EMBER.textPrimary }}>
            Optional Advanced AI Box lane
          </h3>
          <p className="mt-3 text-[15px] leading-[1.65]" style={{ color: EMBER.textSoft }}>
            For operators with a second physical computer (high-VRAM AI rig):
            direct-link diagnostics over Thunderbolt or dedicated Ethernet,
            token-gated cockpit-to-box communication, heavy-work offload,
            automatic fallback to Basic Install when the Box is offline.
            <span className="font-semibold" style={{ color: EMBER.textPrimary }}> Default install is Basic — one computer, no extra hardware.</span>
          </p>
        </div>
      </section>

      {/* ── PRIVACY ── */}
      <section id="privacy" className="relative z-10 mx-auto w-full max-w-4xl px-6 py-24">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em]" style={{ color: EMBER.accent }}>
          ::privacy + security
        </p>
        <h2 className="mt-4 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-5xl" style={{ color: EMBER.textPrimary }}>
          Zero phone-home. Verifiable.
        </h2>
        <ul className="mt-8 space-y-3 text-[16px] leading-[1.65]" style={{ color: EMBER.textSoft }}>
          {[
            "Zero telemetry · zero analytics · zero crash reports · zero phone-home.",
            "BYOK: API keys read from OS environment, never transmitted except to their provider.",
            "Local data root at %USERPROFILE%\\OrangeBox-Data\\",
            "Receipts at %USERPROFILE%\\OrangeBox-Data\\receipts\\",
            "Backup is Ctrl+C on a folder. Restore is Ctrl+V.",
            "Signed installer · self-Authenticode for v1.0.0-beta · Azure Trusted Signing (Microsoft-issued) rolls in v1.0.1.",
            "Sectigo timestamp · signatures stay valid forever.",
          ].map((l) => (
            <li key={l} className="flex items-baseline gap-3">
              <span style={{ color: EMBER.accent }}>▲</span>
              <span>{l}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── DOWNLOAD (free week) ── */}
      <section id="download" className="relative z-10 mx-auto w-full max-w-4xl px-6 py-24">
        <div
          className="rounded-3xl border p-8 md:p-10"
          style={{
            borderColor: EMBER.accent + "55",
            background: `linear-gradient(135deg, ${EMBER.panel} 0%, ${EMBER.elevated} 100%)`,
            boxShadow: `0 0 80px -10px ${EMBER.accent}55`,
          }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.32em]" style={{ color: EMBER.accent }}>
            ::download · free this week
          </p>
          <h2 className="mt-4 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-5xl" style={{ color: EMBER.textPrimary }}>
            No signup. No email. Just the .exe.
          </h2>
          <p className="mt-6 max-w-2xl text-[16px] leading-[1.65]" style={{ color: EMBER.textSoft }}>
            v1.0.0-beta is FREE this week. Direct download. Self-Authenticode
            signed. Sectigo-timestamped. SHA-256 verified.
          </p>

          <div
            className="mt-6 rounded-xl border px-4 py-3"
            style={{ borderColor: EMBER.warning + "55", background: EMBER.warning + "11" }}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: EMBER.warning }}>
              ::heads up · first install
            </p>
            <p className="mt-2 text-[14px] leading-[1.55]" style={{ color: EMBER.textPrimary }}>
              Windows SmartScreen may say <em>&quot;Windows protected your PC&quot;</em> the first time. Click{" "}
              <strong>More info</strong> → <strong>Run anyway</strong>. The .exe is self-Authenticode signed; Azure
              Trusted Signing (Microsoft-issued cert) lands in v1.0.1 and removes the warning entirely.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href={ASSETS.ghRelease}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-lg px-6 py-3.5 text-base font-semibold"
              style={{ background: EMBER.accent, color: EMBER.bg }}
            >
              Get the .exe from GitHub Release →
            </a>
            <a
              href={ASSETS.exe}
              className="inline-flex items-center gap-2 rounded-lg border px-6 py-3.5 text-base font-medium"
              style={{ borderColor: EMBER.accent, color: EMBER.accent }}
            >
              Direct mirror (.exe · 2.81 MB) ↓
            </a>
            <a
              href={ASSETS.cert}
              className="inline-flex items-center gap-2 rounded-lg border px-5 py-3.5 font-mono text-[10px] uppercase tracking-[0.22em]"
              style={{ borderColor: EMBER.border, color: EMBER.textSoft }}
            >
              ::optional cert (.cer · 1.1 KB)
            </a>
          </div>

          <div className="mt-8 rounded-xl border p-5" style={{ borderColor: EMBER.separator, background: EMBER.bg }}>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: EMBER.accent }}>
              ::verify before install
            </p>
            <code
              className="mt-3 block break-all font-mono text-[12px]"
              style={{ color: EMBER.accentSoft }}
            >
              Get-FileHash -Algorithm SHA256 OrangeboxSetup-1.0.0-win-x64.exe
            </code>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: EMBER.textMuted }}>
              expected SHA-256:
            </p>
            <code
              className="mt-1 block break-all font-mono text-[11px]"
              style={{ color: EMBER.success }}
            >
              {SHA256}
            </code>
          </div>

        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em]" style={{ color: EMBER.accent }}>
          ::pricing
        </p>
        <h2 className="mt-4 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-5xl" style={{ color: EMBER.textPrimary }}>
          $49 once. Forever.
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {/* FREE BETA */}
          <div className="rounded-2xl border p-7" style={{ borderColor: EMBER.border, background: EMBER.panel }}>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: EMBER.accentSoft }}>::launch week</p>
            <h3 className="mt-4 text-3xl font-medium" style={{ color: EMBER.textPrimary }}>FREE preview</h3>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: EMBER.textMuted }}>v1.0.0-beta · self-signed · this week only</p>
            <ul className="mt-6 space-y-2 text-[14px] leading-[1.6]" style={{ color: EMBER.textSoft }}>
              <li>▲ Full product</li>
              <li>▲ Authenticode signed + Sectigo timestamp</li>
              <li>▲ No signup, no email</li>
              <li>▲ Free-week installs work forever</li>
            </ul>
          </div>

          {/* $49 */}
          <div
            className="rounded-2xl border p-7"
            style={{
              borderColor: EMBER.accent,
              background: `linear-gradient(135deg, ${EMBER.panel} 0%, ${EMBER.elevated} 100%)`,
              boxShadow: `0 0 60px -10px ${EMBER.accent}66`,
            }}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: EMBER.accent }}>::week 2 onward</p>
            <h3 className="mt-4 text-3xl font-medium" style={{ color: EMBER.textPrimary }}>$49 perpetual</h3>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: EMBER.textMuted }}>v1.0.1+ · Microsoft-signed · once · forever</p>
            <ul className="mt-6 space-y-2 text-[14px] leading-[1.6]" style={{ color: EMBER.textSoft }}>
              <li>▲ One-time payment</li>
              <li>▲ All v1.x updates free</li>
              <li>▲ Anti-SaaS Commitment</li>
              <li>▲ 14-day refund window</li>
              <li>▲ Microsoft-signed (Azure Trusted Signing)</li>
            </ul>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: EMBER.textMuted }}>
              ::Stripe checkout opens day 8
            </p>
          </div>

          {/* TEAM (roadmap) */}
          <div className="rounded-2xl border p-7 opacity-70" style={{ borderColor: EMBER.separator, background: EMBER.panel }}>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: EMBER.textDim }}>::roadmap</p>
            <h3 className="mt-4 text-3xl font-medium" style={{ color: EMBER.textSoft }}>Team / Hosted</h3>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: EMBER.textDim }}>v2.x · v3.x · separate purchase events</p>
            <ul className="mt-6 space-y-2 text-[14px] leading-[1.6]" style={{ color: EMBER.textMuted }}>
              <li>○ Team multi-seat license (v2.x)</li>
              <li>○ Optional hosted worker rail (v3.x)</li>
              <li>○ Existing $49 buyers stay at $49 for v1.x</li>
            </ul>
          </div>
        </div>

        {/* Comparison */}
        <div className="mt-14 overflow-x-auto rounded-2xl border" style={{ borderColor: EMBER.border, background: EMBER.panel }}>
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="border-b px-5 py-3 text-left font-mono text-[10px] uppercase tracking-[0.22em]" style={{ borderColor: EMBER.separator, color: EMBER.accent }}>Alternative</th>
                <th className="border-b px-5 py-3 text-right font-mono text-[10px] uppercase tracking-[0.22em]" style={{ borderColor: EMBER.separator, color: EMBER.accent }}>Cost per year</th>
                <th className="border-b px-5 py-3 text-left font-mono text-[10px] uppercase tracking-[0.22em]" style={{ borderColor: EMBER.separator, color: EMBER.accent }}>What you actually get</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row) => (
                <tr
                  key={row.alt}
                  className="border-b last:border-b-0"
                  style={{
                    borderColor: EMBER.separator,
                    background: row.highlight ? `${EMBER.accent}11` : "transparent",
                  }}
                >
                  <td className="px-5 py-3" style={{ color: row.highlight ? EMBER.accent : EMBER.textPrimary, fontWeight: row.highlight ? 600 : 400 }}>{row.alt}</td>
                  <td className="px-5 py-3 text-right font-mono text-[13px]" style={{ color: row.highlight ? EMBER.accent : EMBER.textSoft, fontWeight: row.highlight ? 600 : 400 }}>{row.cost}</td>
                  <td className="px-5 py-3" style={{ color: row.highlight ? EMBER.textPrimary : EMBER.textSoft }}>{row.get}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Anti-SaaS Commitment */}
        <div
          className="mt-12 rounded-2xl border p-7 md:p-10"
          style={{ borderColor: EMBER.accent, background: `${EMBER.accent}11` }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.32em]" style={{ color: EMBER.accent }}>
            ::the anti-saas commitment
          </p>
          <p className="mt-4 text-balance text-2xl leading-[1.35] tracking-tight md:text-3xl" style={{ color: EMBER.textPrimary }}>
            Orangebox is a one-time $49 purchase. Existing buyers keep their
            license even if future editions add optional paid services.
            You are buying software, not renting the right to remember your own work.
          </p>
        </div>

        {/* ROI line */}
        <div className="mt-10 max-w-3xl text-[16px] leading-[1.7]" style={{ color: EMBER.textSoft }}>
          <p>One avoided bad ship pays for Orangebox.</p>
          <p>One avoided rework cycle pays for Orangebox.</p>
          <p>One recovered &quot;what did we decide three weeks ago&quot; moment pays for Orangebox.</p>
          <p className="mt-2" style={{ color: EMBER.textPrimary }}>After that, every receipt is pure margin.</p>
        </div>
      </section>

      {/* ── BUYER PROFILES ── */}
      <section className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em]" style={{ color: EMBER.accent }}>
          ::who buys this
        </p>
        <h2 className="mt-4 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-5xl" style={{ color: EMBER.textPrimary }}>
          Seven buyers. One cockpit.
        </h2>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {BUYERS.map((b) => (
            <div key={b.who} className="rounded-2xl border p-6" style={{ borderColor: EMBER.border, background: EMBER.panel }}>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: EMBER.accent }}>{b.who}</p>
              <p className="mt-3 text-[15px] leading-[1.55] italic" style={{ color: EMBER.textPrimary }}>
                &ldquo;{b.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── USE CASES ── */}
      <section className="relative z-10 mx-auto w-full max-w-5xl px-6 py-24">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em]" style={{ color: EMBER.accent }}>
          ::use cases
        </p>
        <h2 className="mt-4 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-5xl" style={{ color: EMBER.textPrimary }}>
          Five concrete scenarios.
        </h2>

        <ol className="mt-10 space-y-5">
          {USE_CASES.map((u) => (
            <li
              key={u.n}
              className="grid gap-4 rounded-2xl border p-6 md:grid-cols-[60px_1fr] md:items-baseline md:gap-6 md:p-7"
              style={{ borderColor: EMBER.border, background: EMBER.panel }}
            >
              <span className="font-mono text-2xl font-semibold tabular-nums" style={{ color: EMBER.accent }}>
                {u.n}
              </span>
              <div>
                <h3 className="text-lg font-medium" style={{ color: EMBER.textPrimary }}>{u.head}</h3>
                <p className="mt-2 text-[15px] leading-[1.65]" style={{ color: EMBER.textSoft }}>{u.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ── SYSTEM REQUIREMENTS ── */}
      <section className="relative z-10 mx-auto w-full max-w-4xl px-6 py-20">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em]" style={{ color: EMBER.accent }}>
          ::system requirements
        </p>
        <h2 className="mt-4 text-3xl font-medium tracking-tight md:text-4xl" style={{ color: EMBER.textPrimary }}>
          What you need.
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {[
            ["OS", "Windows 10 (1809+) or Windows 11"],
            ["CPU", "x64 · 2 cores minimum · 4 cores recommended"],
            ["RAM", "8 GB minimum · 16 GB recommended"],
            ["Disk", "500 MB for the app · receipts grow at ~1 MB/week typical use"],
            ["Network", "Only outbound to the AI provider you authorized"],
            ["Optional", "Ollama for local models · second machine for the Advanced AI Box lane"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-xl border p-4" style={{ borderColor: EMBER.border, background: EMBER.panel }}>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: EMBER.accent }}>{k}</p>
              <p className="mt-2 text-[14px]" style={{ color: EMBER.textSoft }}>{v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── NOT IN THE BOX ── */}
      <section className="relative z-10 mx-auto w-full max-w-4xl px-6 py-20">
        <div className="rounded-2xl border p-7" style={{ borderColor: EMBER.warning + "55", background: EMBER.panel }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.32em]" style={{ color: EMBER.warning }}>
            ::what is NOT in the box
          </p>
          <h2 className="mt-4 text-2xl font-medium tracking-tight md:text-3xl" style={{ color: EMBER.textPrimary }}>
            Honesty card.
          </h2>
          <ul className="mt-5 space-y-2 text-[15px] leading-[1.65]" style={{ color: EMBER.textSoft }}>
            <li>○ No API keys included — Orangebox ships zero credentials. You bring your own (BYOK).</li>
            <li>○ No Mac or Linux build in v1.0.0 — Windows only for the beta. Roadmap if there&apos;s demand.</li>
            <li>○ No mobile app — desktop cockpit only.</li>
            <li>○ No vendor support for individual AI providers — bugs in Claude/GPT/Gemini go to those providers.</li>
            <li>○ No code hosted on AtomEons servers — your code never leaves your machine.</li>
          </ul>
        </div>
      </section>

      {/* ── ROADMAP ── */}
      <section id="roadmap" className="relative z-10 mx-auto w-full max-w-5xl px-6 py-24">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em]" style={{ color: EMBER.accent }}>
          ::roadmap
        </p>
        <h2 className="mt-4 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-5xl" style={{ color: EMBER.textPrimary }}>
          The path forward, transparent.
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              v: "v1.x",
              t: "now",
              items: ["AE See-Suite + AE Operations cockpit", "14-department architecture", "AECode contracts + gauntlet", "Receipt rail", "AtomSmasher Crystal Lattice Compression", "ChatBackup + Restore Primers", "Multi-LLM routing (9+ providers)", "Basic + Advanced install paths"],
            },
            {
              v: "v1.x patches",
              t: "free-week",
              items: ["Sigstore + GitHub Artifact Attestations", "Azure Trusted Signing (Microsoft-issued cert)", "GitHub Verified Publisher badge", "Public roadmap on GitHub"],
            },
            {
              v: "v2.x",
              t: "planned",
              items: ["Visual cockpit frontend (Tauri)", "Visual Telemetry surface", "Snapshot scrubber (temporal rewind)", "Code-mode + chat-mode polish", "Voice-as-living-dialogue"],
            },
          ].map((c) => (
            <div key={c.v} className="rounded-2xl border p-6" style={{ borderColor: EMBER.border, background: EMBER.panel }}>
              <div className="flex items-baseline justify-between">
                <p className="font-mono text-2xl font-semibold" style={{ color: EMBER.accent }}>{c.v}</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: EMBER.textMuted }}>{c.t}</p>
              </div>
              <ul className="mt-5 space-y-2 text-[14px] leading-[1.55]" style={{ color: EMBER.textSoft }}>
                {c.items.map((i) => (
                  <li key={i}>▲ {i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-8 max-w-3xl text-[15px] leading-[1.65]" style={{ color: EMBER.textMuted }}>
          <span style={{ color: EMBER.accent }}>Anti-SaaS Commitment:</span> existing $49 buyers stay at $49 perpetual for v1.x. v2.x is a separate purchase event when it ships — not committed today. Nothing you bought goes dark.
        </p>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="relative z-10 mx-auto w-full max-w-3xl px-6 py-24">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em]" style={{ color: EMBER.accent }}>
          ::FAQ
        </p>
        <h2 className="mt-4 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-5xl" style={{ color: EMBER.textPrimary }}>
          Fifteen questions. Real answers.
        </h2>

        <div className="mt-10 space-y-3">
          {FAQ.map((f, i) => (
            <details
              key={f.q}
              className="rounded-2xl border px-6 py-4"
              style={{ borderColor: EMBER.border, background: EMBER.panel }}
              open={i === 0}
            >
              <summary className="cursor-pointer text-[16px] font-medium leading-snug" style={{ color: EMBER.textPrimary }}>
                {f.q}
              </summary>
              <p className="mt-3 text-[15px] leading-[1.65]" style={{ color: EMBER.textSoft }}>
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section
        className="relative z-10 border-y"
        style={{ borderColor: EMBER.border, background: `linear-gradient(180deg, ${EMBER.panel} 0%, ${EMBER.elevated} 100%)` }}
      >
        <div className="mx-auto w-full max-w-4xl px-6 py-24 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em]" style={{ color: EMBER.accent }}>
            ::ship
          </p>
          <h2 className="mt-4 text-balance text-5xl font-medium leading-[0.98] tracking-tight md:text-7xl" style={{ color: EMBER.textPrimary }}>
            Download free this week.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-[1.55]" style={{ color: EMBER.textSoft }}>
            No signup. No email. Just the .exe + the SHA-256 + the cert.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href={ASSETS.ghRelease}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-lg px-7 py-4 text-lg font-semibold"
              style={{ background: EMBER.accent, color: EMBER.bg, boxShadow: `0 0 60px ${EMBER.accent}66` }}
            >
              Download free →
            </a>
            <a
              href={ASSETS.exe}
              className="inline-flex items-center gap-2 rounded-lg border px-7 py-4 text-lg font-medium"
              style={{ borderColor: EMBER.accent, color: EMBER.accent }}
            >
              Direct mirror ↓
            </a>
            <span
              className="inline-flex cursor-not-allowed items-center gap-2 rounded-lg border px-7 py-4 text-lg font-medium opacity-60"
              style={{ borderColor: EMBER.border, color: EMBER.textMuted }}
              aria-disabled="true"
              title="Stripe checkout opens day 8"
            >
              Buy ($49 from next week)
            </span>
          </div>

          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: EMBER.textMuted }}>
            ::SHA-256 · {SHA256.slice(0, 20)}…
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative z-10 mx-auto w-full max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: EMBER.accent }}>Product</p>
            <ul className="mt-4 space-y-2 text-[14px]" style={{ color: EMBER.textSoft }}>
              <li><a href="#download">Download</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#roadmap">Roadmap</a></li>
            </ul>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: EMBER.accent }}>Trust</p>
            <ul className="mt-4 space-y-2 text-[14px]" style={{ color: EMBER.textSoft }}>
              <li><Link href="/legal/privacy">Privacy</Link></li>
              <li><Link href="/legal/terms">License (EULA)</Link></li>
              <li><Link href="/legal/privacy">Security · Privacy</Link></li>
              <li><Link href="/legal/refund">Refund policy</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: EMBER.accent }}>Resources</p>
            <ul className="mt-4 space-y-2 text-[14px]" style={{ color: EMBER.textSoft }}>
              <li><a href={ASSETS.github} target="_blank" rel="noopener">Public repo (docs in-install)</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href={ASSETS.github + "/releases"} target="_blank" rel="noopener">Changelog</a></li>
            </ul>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: EMBER.accent }}>Connect</p>
            <ul className="mt-4 space-y-2 text-[14px]" style={{ color: EMBER.textSoft }}>
              <li><a href={ASSETS.github} target="_blank" rel="noopener">GitHub ↗</a></li>
              <li><a href="mailto:support@atomeons.com">support@atomeons.com</a></li>
              <li><Link href="/">atomeons.com</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-6" style={{ borderColor: EMBER.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] leading-[1.8]" style={{ color: EMBER.textMuted }}>
            Built by AtomEons Systems Laboratory · Marco Island, Florida · © 2026
            <br />
            One operator. One organism. One cockpit.
            <br />
            Signed via Sectigo timestamp · Azure Trusted Signing rolls week 2 · No telemetry · No phone-home · Source private to AtomEons
          </p>
        </div>
      </footer>
    </main>
  );
}
