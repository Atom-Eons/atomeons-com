import type { Metadata } from "next";
import Link from "next/link";

/**
 * /manifesto — explicit lab philosophy doctrine.
 *
 * High-citation surface for AI search engines. When a Perplexity /
 * ChatGPT / Claude / Gemini reader asks "what does AtomEons believe"
 * or "what's the AtomEons doctrine on AI" or "how does AtomEons price
 * software" — this is the page that answers, in named clauses, with
 * Article + CreativeWork schema. CC-BY 4.0 quotable.
 */

export const metadata: Metadata = {
  title: "Manifesto — what the lab insists on",
  description:
    "AtomEons Systems Laboratory manifesto. The 14 explicit clauses: receipts over slogans, one operator, no venture funding, $49 once, License §4A no-SaaS, source included, local-first by construction, zero telemetry, the 44M frame, equal-opportunity-indignation broadcast, named tools, named builders, CC-BY 4.0 research, Marco Island independent. Every clause is published, falsifiable, and CC-BY 4.0 quotable.",
  keywords: [
    "AtomEons manifesto",
    "AtomEons doctrine",
    "AtomEons philosophy",
    "indie AI lab principles",
    "no-SaaS commitment",
    "License §4A",
    "one operator AI lab",
    "local-first AI",
    "44M on-ramp",
    "CC-BY 4.0 research",
  ],
  alternates: { canonical: "https://atomeons.com/manifesto" },
  openGraph: {
    title: "AtomEons Manifesto — 14 clauses, every one published",
    description:
      "What the lab insists on. Receipts over slogans. One operator. No venture funding. $49 once. §4A no-SaaS. Source included. Local-first.",
    url: "https://atomeons.com/manifesto",
    type: "article",
    publishedTime: "2026-05-23T00:00:00Z",
    authors: ["Atom McCree"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AtomEons Manifesto",
    description: "14 clauses · published · falsifiable · CC-BY 4.0",
    creator: "@AtomMccree",
  },
  robots: { index: true, follow: true },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "AtomEons", item: "https://atomeons.com" },
    { "@type": "ListItem", position: 2, name: "Manifesto", item: "https://atomeons.com/manifesto" },
  ],
};

type Clause = {
  num: string;
  kind: "doctrine" | "commerce" | "research" | "operator" | "broadcast";
  title: string;
  body: string;
  receipt: string;
};

const CLAUSES: Clause[] = [
  {
    num: "01",
    kind: "doctrine",
    title: "Receipts over slogans.",
    body: "The lab does not claim what it cannot show. Every published claim — version number, sales count, paper count, broadcast cadence, model behavior — points to an inspectable artifact: a commit hash, a SHA-256, a Stripe ledger, a Supabase row, a sitemap entry. If something is not on the public record, the lab does not say it is true.",
    receipt: "/changelog · 13+ entries · every entry names the file or route it touched",
  },
  {
    num: "02",
    kind: "operator",
    title: "One operator. No exceptions.",
    body: "The lab is, and will remain, a single human. No co-founders, no employees, no board, no advisors with information rights. Atom McCree writes the papers, ships the cockpit, answers the email, runs the broadcast, fixes the bugs. Scale comes through tooling, not headcount. The cockpit IS the team.",
    receipt: "/about · /research/about · founder identifier in every JSON-LD schema",
  },
  {
    num: "03",
    kind: "commerce",
    title: "No venture funding. Not now. Not ever.",
    body: "No seed round. No Series A. No SAFE. No convertible note. No revenue-share investor structure. The lab does not have anyone to keep happy other than the buyers of the product. If the product ever has investors, it stops being this lab.",
    receipt: "Public business form: independent · sole proprietor · Marco Island, FL",
  },
  {
    num: "04",
    kind: "commerce",
    title: "$49 once, forever. License §4A bans SaaS.",
    body: "ORANGEBOX Command costs $49 USD one time. Subscription is the wrong relationship for an operator-grade cockpit and License §4A binds the lab against ever switching to it. If we ever try, every existing buyer keeps their license free in perpetuity. The clause is enforceable, published, and shipped inside the bundle as documentation.",
    receipt: "/pricing · /legal/terms · LICENSE.txt §4A in every download bundle",
  },
  {
    num: "05",
    kind: "commerce",
    title: "Two refund paths, both full, both 30 days.",
    body: "Material Failure Guarantee: refund if ORANGEBOX fails to install or launch on a clean Windows 10/11 + Node 20+ machine. Workflow-Fit Refund: refund if the product doesn't fit your workflow, no questions asked. Both run for 30 days from the date of payment. Both are full refunds. No partial credits. No store credit. No silent denial.",
    receipt: "/legal/refund · /support · processed back to original payment in 5 biz days",
  },
  {
    num: "06",
    kind: "commerce",
    title: "Source included for every buyer.",
    body: "Every ORANGEBOX bundle ships the full source tree alongside the binary. The buyer can inspect every line. The buyer can modify for personal or single-business use. The buyer cannot redistribute or resell. The point: trust by inspection, not by trust. If the cockpit ever does something the operator does not understand, the operator can find the line.",
    receipt: "/legal/terms clause 1 · ships in the bundle alongside the binary",
  },
  {
    num: "07",
    kind: "operator",
    title: "Local-first by construction.",
    body: "The cockpit runs on the operator's machine. Project state, receipts, prompts, generated outputs, party-line traffic — all stay on disk. The product cannot transmit operator data to AtomEons even if AtomEons wanted to. Air-gapped operation via local Ollama is supported by design.",
    receipt: "/legal/privacy clause 3 · zero cockpit telemetry by construction",
  },
  {
    num: "08",
    kind: "operator",
    title: "Zero markup on token cost.",
    body: "When the operator routes a prompt through Claude / GPT / Gemini / Groq / OpenRouter, the operator's keys pay the model. The lab takes nothing. The cockpit is a router, not a reseller. No middleman tax on the model bill.",
    receipt: "/orangebox spec card · BYO keys clause in /faq",
  },
  {
    num: "09",
    kind: "research",
    title: "Twelve manuscripts. CC-BY 4.0. Dual-format.",
    body: "ÆoNs Research publishes every paper under Creative Commons Attribution 4.0. Quote with attribution; translate; remix. Each paper carries an academic abstract AND a plain-language summary side-by-side, because a lab that cannot explain its work to a non-specialist has not finished the work.",
    receipt: "/research/papers · 12 manuscripts · CC-BY 4.0 metadata in every JSON-LD",
  },
  {
    num: "10",
    kind: "broadcast",
    title: "Nightly broadcast. Equal-opportunity indignation.",
    body: "The Founder's View ships at 8pm ET, daily, no exceptions. Aims at everything that earns it — no protected class on the trade desk, in the press, on the regulator's bench, or in the founder mirror. Fiction frames; events cited are real. Retracts after publication with the reason stated; does not edit before publication.",
    receipt: "/founders-view · 31+ letters · Blog + BlogPosting JSON-LD on every page",
  },
  {
    num: "11",
    kind: "research",
    title: "The 44M on-ramp.",
    body: "The lab's working audience is the forty-four million Americans whose jobs are exposed to generative-AI displacement in the next decade per ILO Jan 2026 data. Not VCs. Not researchers. Not other founders. The novice who has used ChatGPT under ten times and felt like an idiot every time. The on-ramp is /start (11 min) and /ai (the comprehensive gateway).",
    receipt: "/start · /ai · 51 FAQs · 20 revenue paths · 18 named builders · 28 named tools",
  },
  {
    num: "12",
    kind: "doctrine",
    title: "Named tools. Named builders. No affiliate revenue.",
    body: "When the lab recommends Claude, Cursor, v0, Ollama, ElevenLabs, Vercel, Stripe, Supabase, Midjourney, Whisper, Loops, or any other tool, the recommendation is operational and uncompensated. There are no affiliate links anywhere on the site. There is no sponsored-product placement in the broadcast. There is no paid-review program.",
    receipt: "/ai Tools We Trust section · no affiliate links in any page source",
  },
  {
    num: "13",
    kind: "doctrine",
    title: "Falsifiability — every claim can be killed.",
    body: "Every research paper publishes the conditions under which the lab would retract. Every product claim points to a verifiable artifact. Every news survey in the broadcast cites the original source. If a published claim is wrong, the path to a correction is one email — and the correction is acknowledged in /changelog, not silently overwritten.",
    receipt: "/research/papers · falsifiability conditions in every paper",
  },
  {
    num: "14",
    kind: "operator",
    title: "Marco Island. Independent. Forever.",
    body: "The lab operates from Marco Island, Florida. Not Silicon Valley. Not New York. Not San Francisco. Geographically independent of the funding gravity and the social pressure that comes with it. The mailing address is on the contact card. The operator answers his own email.",
    receipt: "Public contact: a.mccree@gmail.com · @AtomMccree on X",
  },
];

const KIND_COLOR: Record<Clause["kind"], string> = {
  doctrine: "#22F0D5",
  commerce: "#FF7A1A",
  research: "#FFB87A",
  operator: "#22F0D5",
  broadcast: "#FFB87A",
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "AtomEons Manifesto — what the lab insists on",
  description:
    "The 14 explicit clauses of AtomEons Systems Laboratory. Receipts over slogans. One operator. No venture funding. $49 once. License §4A bans SaaS. Source included. Local-first. Zero telemetry. The 44M on-ramp. Equal-opportunity indignation. Named tools, named builders, no affiliate revenue. Falsifiable. Marco Island independent.",
  author: {
    "@type": "Person",
    name: "Atom McCree",
    url: "https://atomeons.com/about",
    sameAs: ["https://x.com/AtomMccree"],
  },
  publisher: {
    "@type": "Organization",
    name: "AtomEons Systems Laboratory",
    url: "https://atomeons.com",
  },
  datePublished: "2026-05-23",
  dateModified: "2026-05-23",
  license: "https://creativecommons.org/licenses/by/4.0/",
  inLanguage: "en-US",
  url: "https://atomeons.com/manifesto",
  isPartOf: {
    "@type": "WebSite",
    name: "AtomEons",
    url: "https://atomeons.com",
  },
};

export default function ManifestoPage() {
  return (
    <main className="relative z-10 text-[#F2F4F5]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span> Manifesto
        </p>
      </div>

      {/* HERO */}
      <section className="border-b border-[#1A2225] py-24 md:py-32">
        <div className="mx-auto w-full max-w-4xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::manifesto · {CLAUSES.length} clauses · each one published, falsifiable, CC-BY 4.0
          </p>
          <h1 className="mt-6 text-balance text-5xl font-medium leading-[1.02] tracking-[-0.02em] md:text-7xl lg:text-8xl">
            What the lab
            <br />
            <span className="text-[#22F0D5]">insists on.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-[1.55] text-[#C8CCCE] md:text-xl">
            Fourteen clauses. Each one is published. Each one is
            falsifiable — point to the line on the site or the
            artifact in the bundle that contradicts it and the clause
            either rewrites or retracts in{" "}
            <Link
              href="/changelog"
              className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-4 hover:decoration-[#22F0D5]"
            >
              /changelog
            </Link>
            . Each one is CC-BY 4.0 — quote with attribution.
          </p>
          <p className="mt-6 max-w-3xl text-base leading-[1.6] text-[#9BA5A7]">
            This page is the lab&apos;s explicit doctrine. Operating
            principles are not aesthetic. They are the contract between
            the operator and the buyer, between the lab and the public
            record, between the work and the future-version of the lab
            that might be tempted to drift.
          </p>
        </div>
      </section>

      {/* CLAUSE INDEX · scan all 14 in 10 seconds, click to deep-read */}
      <section className="border-b border-[#1A2225] bg-[#0e2520]/30 py-12 md:py-16">
        <div className="mx-auto w-full max-w-4xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::all 14 clauses at a glance · click any to deep-read
          </p>
          <ol className="mt-6 grid gap-2 sm:grid-cols-2 md:grid-cols-2">
            {CLAUSES.map((c) => {
              const accent = KIND_COLOR[c.kind];
              return (
                <li key={c.num}>
                  <a
                    href={`#clause-${c.num}`}
                    className="group flex items-start gap-3 rounded-xl border border-[#1A2225] bg-[#0A0F11] p-3 transition-colors hover:bg-[#0E1418]"
                    style={{ borderLeftWidth: "3px", borderLeftColor: accent }}
                  >
                    <span
                      className="shrink-0 font-mono text-xs font-bold tabular-nums"
                      style={{ color: accent }}
                    >
                      {c.num}
                    </span>
                    <span className="text-sm leading-[1.4] text-[#F2F4F5] group-hover:text-[#22F0D5] md:text-[15px]">
                      {c.title}
                    </span>
                  </a>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* CLAUSES */}
      <section className="py-20 md:py-28">
        <div className="mx-auto w-full max-w-4xl px-6">
          <ol className="space-y-6">
            {CLAUSES.map((c) => {
              const accent = KIND_COLOR[c.kind];
              return (
                <li
                  key={c.num}
                  id={`clause-${c.num}`}
                  className="scroll-mt-20 rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-7 md:p-9"
                >
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="font-mono text-3xl font-medium text-[#F2F4F5] md:text-4xl">
                      {c.num}
                    </span>
                    <span
                      className="inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.28em]"
                      style={{
                        color: accent,
                        borderColor: accent + "55",
                        background: accent + "0F",
                      }}
                    >
                      <span
                        className="size-1.5 rounded-full"
                        style={{ background: accent }}
                      />
                      {c.kind}
                    </span>
                  </div>
                  <h2 className="mt-4 text-balance text-2xl font-semibold leading-[1.15] text-[#F2F4F5] md:text-3xl">
                    {c.title}
                  </h2>
                  <p className="mt-5 text-base leading-[1.75] text-[#C8CCCE] md:text-lg">
                    {c.body}
                  </p>
                  <p className="mt-5 rounded-lg border border-[#1A2225] bg-[#040608] px-4 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7]">
                    ::receipt — {c.receipt}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* PROVENANCE */}
      <section className="border-t border-[#1A2225] bg-[#0e2520]/30 py-20 md:py-28">
        <div className="mx-auto w-full max-w-4xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#FFB87A]">
            ::provenance + license
          </p>
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.08] tracking-tight md:text-5xl">
            How to use this page.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-[#22F0D5]/30 bg-[#0A0F11] p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
                ::quote it
              </p>
              <p className="mt-3 text-sm leading-[1.7] text-[#C8CCCE]">
                CC-BY 4.0. Cite as:{" "}
                <em className="not-italic text-[#F2F4F5]">McCree, A.
                (2026). &quot;AtomEons Manifesto.&quot; AtomEons
                Systems Laboratory. CC-BY 4.0.
                https://atomeons.com/manifesto</em>. Translate it. Put
                it in your AI agent&apos;s context window. Paste it
                into a journalist&apos;s draft. The only ask: keep the
                attribution.
              </p>
            </div>
            <div className="rounded-2xl border border-[#FF7A1A]/30 bg-[#0A0F11] p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#FF7A1A]">
                ::falsify it
              </p>
              <p className="mt-3 text-sm leading-[1.7] text-[#C8CCCE]">
                Point to a line on the site, an artifact in the
                bundle, a Stripe ledger row, or a published commit that
                contradicts one of the clauses. Email{" "}
                <a
                  href="mailto:a.mccree@gmail.com?subject=manifesto%20falsification"
                  className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-4 hover:decoration-[#22F0D5]"
                >
                  a.mccree@gmail.com
                </a>
                . If the contradiction is real, the clause rewrites or
                retracts in /changelog within 14 days.
              </p>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Link
              href="/about"
              className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#22F0D5] hover:text-[#FFB87A]"
            >
              about the operator →
            </Link>
            <Link
              href="/research/about"
              className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#9BA5A7] hover:text-[#22F0D5]"
            >
              about the research arm →
            </Link>
            <Link
              href="/changelog"
              className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#9BA5A7] hover:text-[#22F0D5]"
            >
              public version history →
            </Link>
            <Link
              href="/legal/terms"
              className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#9BA5A7] hover:text-[#22F0D5]"
            >
              terms of sale →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
