import type { Metadata } from "next";
import Link from "next/link";
import { BuyButton } from "../_components/BuyButton";
import { DynamicPrice } from "../_components/DynamicPrice";
import { SalesCounterV5 } from "../_components/v5/SalesCounterV5";
import { AgentModeHero } from "../_components/v6-1/AgentModeHero";
import { LaneGrid } from "../_components/v6-1/LaneGrid";
import { TabCompleteDemo } from "../_components/v6-1/TabCompleteDemo";
import { RepoIndexerBlock } from "../_components/v6-1/RepoIndexerBlock";
import { BackgroundJobsBlock } from "../_components/v6-1/BackgroundJobsBlock";
import { ProvidersBlock } from "../_components/v6-1/ProvidersBlock";
import { IncumbentTable } from "../_components/v6-1/IncumbentTable";
import { ReceiptsTaxonomy } from "../_components/v6-1/ReceiptsTaxonomy";
import { WhatStillStands } from "../_components/v6-3/WhatStillStands";
import { ExistingBuyerNote } from "../_components/v6-3/ExistingBuyerNote";
import { NotifyMeAnchor } from "../_components/v6-3/NotifyMeAnchor";

/**
 * /orangebox — ORANGEBOX Command v6.1.0 "Agent Mode" — product page.
 *
 * The page is the full feature inventory of the live ship: native binary,
 * 11+1 lanes, Agent Mode tool loop, repo indexer, tab autocomplete,
 * background queue, multi-model providers, 20 receipt sources, honest
 * comparison table vs Cursor/Codex/Claude Code, and the v6.3 Silent
 * Canvas preview demoted to a single "what's next" section.
 *
 * Pricing canon (2026-05-20): $1 once forever. FREE first 7 days of
 * the public launch window. The $1 ladder is retired. Forward buyers
 * grandfathered under §4A.
 *
 * Voice: premium marketing-grade (peer of anthropic.com / openai.com /
 * x.ai / microsoft.com). Numbers and benchmarks carry the visual proof.
 *
 * IP boundary (mirrors round 3):
 *   PUBLISH — 9 agent tools verbatim, repo benchmark 303/1533/6.7s,
 *             20 receipt sources, 60/60 smoke pass, 4.98 MB binary +
 *             sha256 prefix, Anthropic alpha wired (adaptive thinking,
 *             advisor tool, memory tool, files API, citations API,
 *             prompt caching, 1h cache TTL, compaction, structured
 *             outputs), 11 lanes + Agent #12, 9 moats, 4 SKUs,
 *             security features, anti-saas posture.
 *   TEASE   — "11 new API endpoints" (no path list), "intelligent cache
 *             strategy" (no multi-breakpoint detail), "smart model
 *             router" (no 10x3 matrix), Trilane "three models, you
 *             vote" (NEVER name GPT > Gemini > Claude authority).
 *   NEVER   — Relevance Controller spec, AE# model assignments, trust
 *             gradient thresholds, phase map day counts, MD5 cache key
 *             construction, 17th HSMP mutation kind.
 */

export const metadata: Metadata = {
  title:
    "ORANGEBOX v6.1.0 Agent Mode — native AI cockpit · $1 once, FREE 7 days",
  description:
    "ORANGEBOX Command v6.1.0 Agent Mode. The native AI cockpit with multi-turn agent loop (9 real tools), tab autocomplete, repo indexer, background job queue, 11 lanes, 60+ MCP tools, multi-model routing (Claude + GPT + Gemini + Groq + Ollama + OpenRouter), 20 receipt sources. Rust + egui, 4.98 MB binary. $1 once, forever. FREE first 7 days of launch. License §4A legally bans subscription. Local-first. Zero telemetry. Source included.",
  keywords: [
    "ORANGEBOX",
    "ORANGEBOX Command",
    "AI cockpit",
    "Claude Code cockpit",
    "local-first AI",
    "MCP tools",
    "AI agent",
    "Rust egui",
    "Anthropic Claude desktop",
    "$1 AI tool",
    "no subscription AI",
    "indie AI tool",
    "AI for one operator",
    "Windows AI cockpit",
    "agent mode",
    "tab autocomplete AI",
    "repo indexer",
    "background job queue",
    "multi-model routing",
    "AtomEons",
  ],
  alternates: { canonical: "https://atomeons.com/orangebox" },
  openGraph: {
    title: "ORANGEBOX v6.1.0 Agent Mode — native AI cockpit",
    description:
      "Native AI cockpit. Multi-turn agent loop with 9 real tools. 11 lanes. Multi-model routing. 20 receipt sources. Rust + egui. $1 once, FREE first 7 days. License §4A bans subscription.",
    url: "https://atomeons.com/orangebox",
    siteName: "AtomEons",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ORANGEBOX v6.1.0 Agent Mode",
    description:
      "Native AI cockpit. 9-tool agent loop, tab autocomplete, repo indexer, 11 lanes, 20 receipt sources. $1 once · FREE 7 days · §4A no-saas lock.",
    creator: "@AtomMccree",
  },
  robots: { index: true, follow: true },
};

export default function OrangeBox() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      {/* breadcrumb */}
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">
            AtomEons
          </Link>{" "}
          <span className="text-[#1A2225]">/</span> ORANGEBOX · v6.1.0 Agent
          Mode · LIVE
        </p>
      </div>

      {/* 1 — Hero: v6.1.0 Agent Mode, $1 + free 7 days, sha256 */}
      <section className="relative isolate overflow-hidden bg-black py-24 md:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 40%, rgba(255,122,26,0.10) 0%, transparent 65%)",
          }}
        />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::ORANGEBOX COMMAND · v6.1.0 · AGENT MODE · LIVE 2026-05-17
          </p>
          <h1 className="text-balance text-5xl font-medium leading-[1.02] tracking-[-0.02em] text-[#F2F4F5] md:text-7xl lg:text-8xl">
            The native AI cockpit.
            <br />
            <span className="text-[#FF7A1A]">One file.</span>{" "}
            <span className="text-[#22F0D5]">Two seconds.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-[#9BA5A7] md:text-xl">
            A Rust + egui binary. 4.98 MB. Eleven lanes. A multi-turn agent
            loop with nine real tools. Tab autocomplete. Repo indexer.
            Background job queue. Multi-model routing across Claude, GPT,
            Gemini, Groq, Ollama, and OpenRouter — your keys, zero markup.
            Sixty smoke tests passed. Twenty receipt sources written to disk.
            Yours, not theirs.
          </p>

          <div
            id="buy"
            className="mt-12 grid gap-8 md:grid-cols-[1fr_320px] md:items-start"
          >
            <div>
              <DynamicPrice variant="stacked" showUrgency className="" />
              <p className="mt-4 max-w-md font-mono text-[10px] uppercase tracking-[0.18em] text-[#FF7A1A]">
                $1 once · forever. FREE first 7 days of public launch.
                Forward buyers locked under license §4A.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <BuyButton />
              <SalesCounterV5 />
              <div className="rounded-lg border border-[#1A2225] bg-[#0A0F11] px-4 py-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
                  ::v6.1.0 build receipt
                </p>
                <p className="mt-2 font-mono text-[10px] text-[#9BA5A7]">
                  binary: 4.98 MB · zip: 35 MB · smoke 60/60
                </p>
                <p className="mt-1 break-all font-mono text-[10px] text-[#22F0D5]/70">
                  sha256: 4b1c857b6c7ddf5b…0d07bf48e
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2 — Eleven lanes + Agent #12 (NEW v6.1.0) */}
      <LaneGrid />

      {/* 3 — Agent Mode hero: 9 real tools + live log mock */}
      <AgentModeHero />

      {/* 4 — Tab autocomplete (Cursor-killer) */}
      <TabCompleteDemo />

      {/* 5 — Repo indexer (Cursor's secret, made local) */}
      <RepoIndexerBlock />

      {/* 6 — Background job queue (Codex-parallel) */}
      <BackgroundJobsBlock />

      {/* 7 — Providers supported (Anthropic + OpenAI + Google + Groq +
              Ollama + OpenRouter + Hermes + Whisper.cpp local) */}
      <ProvidersBlock />

      {/* 8 — Honest comparison table vs Cursor / Codex / Claude Code */}
      <IncumbentTable />

      {/* 9 — Receipts taxonomy: 20 sources, two new in v6.1.0 */}
      <ReceiptsTaxonomy />

      {/* 10 — Anti-saas posture: what doesn't change (license §4A, BYO,
              local-first). Reused from v6-3 surface. */}
      <WhatStillStands />

      {/* 11 — Existing v6.0 buyer note: §4A free-upgrade signal */}
      <ExistingBuyerNote />

      {/* 12 — v6.3 Silent Canvas preview · what's next (single section,
              not the spine) */}
      <NotifyMeAnchor />

      {/* JSON-LD — v6.1.0 SoftwareApplication */}
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
                  "Agent Mode",
                ],
                applicationCategory: [
                  "DeveloperApplication",
                  "BusinessApplication",
                  "ProductivityApplication",
                ],
                operatingSystem: "Windows 10, Windows 11",
                softwareVersion: "6.1.0",
                releaseNotes:
                  "v6.1.0 'Agent Mode' — multi-turn tool-using agent loop with nine real tools (read_file, write_file, edit_file, grep, glob, list_dir, run_cmd, vault_search, finish). Tab autocomplete with Haiku 4.5 (30s cache). Repo indexer (303 files / 1,533 symbols / 6.7s benchmark). Background job queue (LRU 100, cancel tokens). Twenty receipt sources. 60/60 smoke pass. 4.98 MB Rust + egui native binary, 35 MB portable zip.",
                url: "https://atomeons.com/orangebox",
                description:
                  "ORANGEBOX Command v6.1.0 — native AI cockpit with multi-turn agent loop, tab autocomplete, repo indexer, background queue. 11 lanes, multi-model routing (Claude + GPT + Gemini + Groq + Ollama + OpenRouter), 20 receipt sources, BYO keys, zero token markup. $1 once, FREE first 7 days.",
                offers: {
                  "@type": "Offer",
                  availability: "https://schema.org/InStock",
                  price: "1",
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
                    name: "ORANGEBOX v6.1.0 Agent Mode",
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
