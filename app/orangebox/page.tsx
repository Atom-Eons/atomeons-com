import Link from "next/link";
import { Hero } from "../_components/v5/Hero";
import { LanesGrid } from "../_components/v5/LanesGrid";
import { NativeStack } from "../_components/v5/NativeStack";
import { MoatsTable } from "../_components/v5/MoatsTable";
import { AlphaShipped } from "../_components/v5/AlphaShipped";
import { CockpitVisualization } from "../_components/v5/CockpitVisualization";
import { SwapLanes } from "../_components/v5/SwapLanes";
import { ReceiptsLive } from "../_components/v5/ReceiptsLive";
import { TrustGrid } from "../_components/v5/TrustGrid";
import { SkusTable } from "../_components/v5/SkusTable";
import { AntiSaasBlock } from "../_components/v5/AntiSaasBlock";
import { DownloadHashes } from "../_components/v5/DownloadHashes";
import { Compatibility } from "../_components/v5/Compatibility";
import { Qualification } from "../_components/v5/Qualification";
import { ComparisonGrid } from "../_components/v5/ComparisonGrid";
import { DoctrineStrip } from "../_components/v5/DoctrineStrip";
import { SilentCanvasTease } from "../_components/v5/SilentCanvasTease";
import { ClosingManifesto } from "../_components/v5/ClosingManifesto";

export const metadata = {
  title:
    "ORANGEBOX Command v6.0.0 — the cockpit that replaces Claude Code, Cursor, and Codex",
  description:
    "ORANGEBOX v6.0.0 — 11 lanes · 60+ MCP tools · 15 departments. Claude · GPT · Gemini · OpenRouter (200+ models) · Hermes 𝕏 feed. Local-first. Zero telemetry. $1 once, forever. No subscription, ever.",
  alternates: { canonical: "https://atomeons.com/orangebox" },
  keywords: [
    "ORANGEBOX",
    "ORANGEBOX Command v5",
    "Claude Code alternative",
    "Cursor alternative",
    "Codex alternative",
    "AI cockpit",
    "local-first AI cockpit",
    "BYO keys AI tool",
    "multi-model AI cockpit",
    "MCP cockpit",
    "Hermes Agent",
    "Skil.Ski",
    "AtomEons",
    "AI OS",
    "operator OS",
  ],
  openGraph: {
    title:
      "ORANGEBOX Command v6.0.0 — replaces Claude Code, Cursor, and Codex",
    description:
      "11 lanes. 60+ MCP tools. 15 departments. Claude · GPT · Gemini · OpenRouter · Hermes 𝕏 feed. Local-first. $1 once.",
    url: "https://atomeons.com/orangebox",
    siteName: "AtomEons",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ORANGEBOX Command v6.0.0",
    description:
      "The OS, not the tool. Local-first AI cockpit. $1 once. Yours forever.",
  },
};

export default function OrangeBox() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      {/* breadcrumb (kept minimal, top-of-page) */}
      <div className="mx-auto w-full max-w-7xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="transition-colors hover:text-[#22F0D5]">
            AtomEons
          </Link>{" "}
          <span className="text-[#1A2225]">/</span> ORANGEBOX Command v6.0.0
        </p>
      </div>

      {/* 1 — Hero (H1, $1 buy gate, hero render) */}
      <Hero />

      {/* 2 — What's in the box → the 11 lanes (cockpit instrument grid) */}
      <LanesGrid />

      {/* 3 — v6.0 native stack — one file, double-click, 2 seconds */}
      <NativeStack />

      {/* 4 — Cockpit visual + swap lanes (proof the multi-model debate is real) */}
      <CockpitVisualization />
      <SwapLanes />

      {/* 5 — The 9 compound moats (incumbents structurally can't copy) */}
      <MoatsTable />

      {/* 5 — Anthropic alpha capabilities already wired */}
      <AlphaShipped />

      {/* 6 — Receipts (proof of work as portfolio) */}
      <ReceiptsLive />

      {/* 7 — Security + privacy posture */}
      <TrustGrid />

      {/* 8 — Pricing (4 SKUs, zero token markup) */}
      <SkusTable />

      {/* 9 — Compatibility + buyer qualification rails */}
      <Compatibility />
      <Qualification />

      {/* 10 — Price ladder (alternatives compared) */}
      <ComparisonGrid />

      {/* 11 — Anti-saas posture (what ORANGEBOX is NOT) */}
      <AntiSaasBlock />

      {/* 12 — Real binary integrity hashes from BUILD_v6.0.0.json */}
      <DownloadHashes />

      {/* 13 — Doctrine strip (cockpit / marketplace / orchestration) */}
      <DoctrineStrip />

      {/* 14 — Silent Canvas v6.3 tease (micro-tease only per orange-judge:
              3 lead features, "in build" framing, before ClosingManifesto).
              IP-safe: no Relevance Controller / AE roster / cost math / etc.
              Wrapped in data-cockpit-section so the CockpitFrame HUD
              bottom-left bracket picks up "SILENT CANVAS" on scroll. */}
      <div data-cockpit-section="silent canvas">
        <SilentCanvasTease />
      </div>

      {/* 15 — Closing manifesto */}
      <ClosingManifesto />

      {/* SoftwareApplication + Offer + BreadcrumbList JSON-LD */}
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
                  "ORANGEBOX Command v6",
                  "OB0X v6",
                ],
                applicationCategory: [
                  "DeveloperApplication",
                  "BusinessApplication",
                  "ProductivityApplication",
                ],
                operatingSystem: "Windows 10, Windows 11",
                softwareVersion: "6.0.0",
                releaseNotes:
                  "v6.0.0 — NATIVE BINARY. One file, double-click, 2-second launch. 4.46 MB Rust + egui executable. No webview. No chromium. The cockpit replaces Claude Code, Cursor, and Codex in 11 lanes (Cockpit, IDE, Terminal, Trilane, Voice, 𝕏 Feed, Vault, Receipts, Privacy, Skils, Settings). 60+ MCP tools. 15 departments. NEW 2026 stack: Groq LPUs sub-300ms quick_reply task, Ollama LOCAL_MODE air-gap swap, Groq Gemma route_dispatch pre-classifier, Agent Teams advisory (2026-04-01). Plus carried-forward Anthropic alpha: adaptive thinking, advisor tool, memory + files API, prompt caching with pre-warm, 1h vault TTL, compaction, structured outputs, multi-breakpoint cache. Local-first. Zero telemetry. $1 once, forever. v1.x–v6.x updates free.",
                url: "https://atomeons.com/orangebox",
                downloadUrl:
                  "https://github.com/AtomEons/orangebox-os/releases/tag/v6.0.0",
                description:
                  "ORANGEBOX Command v6.0.0 — the local-first AI cockpit you own. 11 lanes, 60+ MCP tools, 15 departments. Multi-model debate (Claude + GPT + Gemini), live 𝕏 feed via Hermes, compounding lattice memory, receipts on every action. BYO keys, zero markup on tokens.",
                offers: {
                  "@type": "Offer",
                  price: "1",
                  priceCurrency: "USD",
                  availability: "https://schema.org/InStock",
                  url: "https://atomeons.com/orangebox",
                  priceValidUntil: "2030-12-31",
                },
                publisher: {
                  "@type": "Organization",
                  name: "AtomEons Systems Laboratory",
                  url: "https://atomeons.com",
                  founder: { "@type": "Person", name: "Atom McCree" },
                  email: "a.mccree@gmail.com",
                  location: {
                    "@type": "Place",
                    name: "Marco Island, FL, USA",
                  },
                },
                aggregateRating: undefined,
                featureList: [
                  "11 lanes: Cockpit, IDE, Terminal, Trilane, Voice, 𝕏 Feed, Vault, Receipts, Privacy, Skils, Settings",
                  "Replaces Claude Code, Cursor, and Codex in one panel",
                  "Multi-model orchestration (Claude + GPT + Gemini + OpenRouter 200+ models)",
                  "Hermes Agent native 𝕏 feed (no incumbent has this)",
                  "60+ MCP server tools",
                  "15 named departments (AE0–AE14)",
                  "27 Constitutional Guardrails + 9-stage Gate Chain",
                  "Adaptive thinking + extended effort mode",
                  "Dual-brain advisor architecture",
                  "Anthropic Memory tool auto-attached",
                  "Anthropic Files API for vault sync",
                  "Citations API on vault queries",
                  "Prompt caching with pre-warm-on-boot",
                  "1-hour cache TTL on vault",
                  "Compaction for long sessions (auto at 150k tokens)",
                  "Structured outputs (JSON schema validated)",
                  "Multi-breakpoint cache strategy",
                  "Smart model router (10 task types × 3 budget modes)",
                  "Background agent queue (\"do X overnight\")",
                  "Compounding lattice memory (CLC + void + RAPTOR + RRF)",
                  "Codexa multi-machine worker rail",
                  "Skil.Ski marketplace via one MCP endpoint",
                  "Local Whisper.cpp for Voice lane (audio never leaves machine)",
                  "Air-gap mode (one-toggle disable all outbound)",
                  "BYO keys, zero markup on tokens",
                  "Local-first, zero telemetry, no phone-home",
                  "Full source code included",
                  "v1.x–v6.x updates free, no subscription",
                ],
                keywords:
                  "ORANGEBOX, ORANGEBOX v5, Claude Code alternative, Cursor alternative, Codex alternative, AI cockpit, MCP cockpit, local-first AI, BYO keys, multi-model AI, Hermes Agent, Skil.Ski, AtomEons, no subscription",
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
                    name: "ORANGEBOX Command v6.0.0",
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
