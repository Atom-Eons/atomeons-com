import type { Metadata } from "next";
import Link from "next/link";
import { BuyButton } from "../../_components/BuyButton";
import { DynamicPrice } from "../../_components/DynamicPrice";
import { SalesCounterV5 } from "../../_components/v5/SalesCounterV5";
import { AgentModeHero } from "../../_components/v6-1/AgentModeHero";
import { LaneGrid } from "../../_components/v6-1/LaneGrid";
import { TabCompleteDemo } from "../../_components/v6-1/TabCompleteDemo";
import { RepoIndexerBlock } from "../../_components/v6-1/RepoIndexerBlock";
import { BackgroundJobsBlock } from "../../_components/v6-1/BackgroundJobsBlock";
import { ProvidersBlock } from "../../_components/v6-1/ProvidersBlock";
import { IncumbentTable } from "../../_components/v6-1/IncumbentTable";
import { ReceiptsTaxonomy } from "../../_components/v6-1/ReceiptsTaxonomy";
import { WhatStillStands } from "../../_components/v6-3/WhatStillStands";
import { ExistingBuyerNote } from "../../_components/v6-3/ExistingBuyerNote";
import { NotifyMeAnchor } from "../../_components/v6-3/NotifyMeAnchor";

/**
 * /orangebox/legacy — the v6.1.0 "Agent Mode" page archive.
 *
 * Why this exists: the live /orangebox surface was rebuilt 2026-05-23
 * around the actual present product (v6.3 codenamed "AE See-Suite +
 * AE Operations," $49 once, Basic Install + optional AI Box). The
 * earlier v6.1.0 page — eleven lanes, $1 + free-7-days, 9-tool agent
 * loop, repo indexer benchmark — is preserved here so the work and
 * the historical framing don't get lost. Linked from the live
 * /orangebox page so visitors who want the older marketing can find
 * it; otherwise off-the-main-flow.
 *
 * Nothing has been deleted from the original. Pricing canon and the
 * v6.1.0 SoftwareApplication JSON-LD are preserved as-is so the
 * historical claims remain auditable.
 *
 * If you landed here looking for the current product, see /orangebox.
 */

export const metadata: Metadata = {
  title:
    "ORANGEBOX v6.1.0 Agent Mode — archived development snapshot · legacy",
  description:
    "Archived development snapshot of the ORANGEBOX Command v6.1.0 'Agent Mode' page. The current product, pricing, and roadmap live at /orangebox. This surface is preserved for historical reference: 11 lanes, multi-turn agent loop with nine tools, tab autocomplete, repo indexer (303 files / 1,533 symbols / 6.7s benchmark), background job queue, twenty receipt sources, $1 + free-7-days launch pricing. Snapshot date 2026-05-17.",
  alternates: { canonical: "https://atomeons.com/orangebox/legacy" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "ORANGEBOX v6.1.0 Agent Mode — archived snapshot",
    description:
      "Archived development snapshot. The current product lives at /orangebox. 11 lanes, 9-tool agent loop, repo indexer, $1+free-7-days framing preserved here for historical reference.",
    url: "https://atomeons.com/orangebox/legacy",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "ORANGEBOX v6.1.0 — archived snapshot",
    description:
      "Archived. Current product at /orangebox. 11 lanes, 9-tool agent loop, repo indexer, $1+free-7-days framing preserved.",
  },
};

export default function OrangeBoxLegacy() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      {/* archive banner — every visitor sees this first */}
      <div className="border-b border-[#FFB87A]/30 bg-[#FFB87A]/[0.06]">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-baseline justify-between gap-3 px-6 py-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#FFB87A]">
            ::archive · v6.1.0 development snapshot · 2026-05-17
          </p>
          <p className="text-sm text-[#C8CCCE]">
            This is the previous /orangebox page. For the current
            product see{" "}
            <Link
              href="/orangebox"
              className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-4 hover:decoration-[#22F0D5]"
            >
              /orangebox
            </Link>
            .
          </p>
        </div>
      </div>

      {/* breadcrumb */}
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">
            AtomEons
          </Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/orangebox" className="hover:text-[#22F0D5]">
            ORANGEBOX
          </Link>{" "}
          <span className="text-[#1A2225]">/</span> Legacy ·
          v6.1.0 Agent Mode
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
            ::ORANGEBOX COMMAND · v6.1.0 · AGENT MODE · ARCHIVED 2026-05-17
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
          <p className="mt-6 max-w-3xl rounded-xl border border-[#FFB87A]/30 bg-[#FFB87A]/[0.06] p-4 text-sm leading-relaxed text-[#C8CCCE]">
            <strong className="font-semibold text-[#FFB87A]">
              Archive note:
            </strong>{" "}
            this page captures the v6.1.0 framing as it shipped on
            2026-05-17. The current product (now v6.3 with the AE
            See-Suite + AE Operations surfaces, $49 once, Basic Install
            + optional AI Box) is at{" "}
            <Link
              href="/orangebox"
              className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-4 hover:decoration-[#22F0D5]"
            >
              /orangebox
            </Link>
            . Pricing, version, and feature set on this archived page
            no longer match the live product. Preserved for historical
            reference.
          </p>

          <div
            id="buy"
            className="mt-12 grid gap-8 md:grid-cols-[1fr_320px] md:items-start"
          >
            <div>
              <DynamicPrice variant="stacked" showUrgency className="" />
              <p className="mt-4 max-w-md font-mono text-[10px] uppercase tracking-[0.18em] text-[#FF7A1A]">
                Legacy pricing card — preserved for historical reference.
                Current pricing on /orangebox.
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

      {/* 7 — Providers supported */}
      <ProvidersBlock />

      {/* 8 — Honest comparison table vs Cursor / Codex / Claude Code */}
      <IncumbentTable />

      {/* 9 — Receipts taxonomy: 20 sources */}
      <ReceiptsTaxonomy />

      {/* 10 — Anti-saas posture */}
      <WhatStillStands />

      {/* 11 — Existing v6.0 buyer note */}
      <ExistingBuyerNote />

      {/* 12 — v6.3 Silent Canvas preview */}
      <NotifyMeAnchor />

      {/* footer back-link to current */}
      <section className="border-t border-[#1A2225] bg-[#0A0F11]">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#FFB87A]">
            ::end of archive · v6.1.0 snapshot
          </p>
          <p className="mt-4 text-base leading-[1.6] text-[#C8CCCE]">
            For the current product — v6.3 codename AE See-Suite + AE
            Operations, $49 once, Basic Install + optional AI Box —
            see{" "}
            <Link
              href="/orangebox"
              className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-4 hover:decoration-[#22F0D5]"
            >
              /orangebox
            </Link>
            .
          </p>
        </div>
      </section>

      {/* JSON-LD — v6.1.0 SoftwareApplication, preserved as-is */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "SoftwareApplication",
                "@id": "https://atomeons.com/orangebox/legacy#software",
                name: "ORANGEBOX Command (v6.1.0 archived snapshot)",
                alternateName: ["ORANGEBOX v6.1.0", "Agent Mode"],
                applicationCategory: [
                  "DeveloperApplication",
                  "BusinessApplication",
                  "ProductivityApplication",
                ],
                operatingSystem: "Windows 10, Windows 11",
                softwareVersion: "6.1.0",
                releaseNotes:
                  "v6.1.0 'Agent Mode' — archived development snapshot.",
                url: "https://atomeons.com/orangebox/legacy",
                description:
                  "Archived snapshot of the v6.1.0 development-state ORANGEBOX page. Current product at /orangebox.",
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
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: "Legacy (v6.1.0)",
                    item: "https://atomeons.com/orangebox/legacy",
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
