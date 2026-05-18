import Link from "next/link";
import { BuyButton } from "@/app/_components/BuyButton";
import { DynamicPrice } from "@/app/_components/DynamicPrice";
import { SalesCounterV5 } from "@/app/_components/v5/SalesCounterV5";

/**
 * OrangeBoxBlock — condensed product sell block for the lab homepage.
 *
 * NOT the full /orangebox product page. That has 16 sections, the cockpit
 * hero, the moats table, etc. This is the homepage surface: tight pitch,
 * live price, buy affordance.
 *
 * IMPORTANT: `<div id="buy" />` must be present. StickyBuyBar watches
 * #buy via IntersectionObserver to decide whether to show/hide the bar.
 *
 * Server component wrapper — BuyButton, DynamicPrice, and SalesCounterV5
 * are all client components and handle their own hydration.
 */
export function OrangeBoxBlock() {
  return (
    <section className="relative isolate overflow-hidden bg-[#000] py-24 md:py-32">
      {/* ambient orange pulse — product section gets more warmth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 45% at 80% 55%, rgba(255,122,26,0.12) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        {/* section label */}
        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
          ::WHAT THE LAB SHIPS · ORANGEBOX
        </p>

        <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-20">
          {/* left: pitch */}
          <div>
            <h2 className="mb-6 text-balance text-4xl font-medium leading-[1.02] tracking-[-0.02em] text-[#F2F4F5] md:text-6xl">
              The cockpit.
              <br />
              <span className="text-[#FF7A1A]">One file.</span>{" "}
              <span className="text-[#22F0D5]">Double-click.</span> Two seconds.
            </h2>

            {/* 3-line naked pitch */}
            <div className="space-y-3 text-[#9BA5A7]">
              <p className="text-base leading-relaxed md:text-lg">
                Native Rust binary. 4.46 MB. No webview. No Chromium. No
                subscription. 11 lanes — Claude, GPT, Gemini, Groq LPUs,
                Ollama, OpenRouter (200+ models), Hermes X feed.
              </p>
              <p className="text-base leading-relaxed md:text-lg">
                60+ MCP tools. 15 departments. 27 constitutional guardrails.
                Local-first. Zero telemetry. The receipts live on your disk.
              </p>
              <p className="font-mono text-sm uppercase tracking-[0.14em] text-[#FF7A1A]">
                $1 once. Every 100 sales goes up $1. Forward buyers only.
                FOREVER.
              </p>
            </div>

            {/* tail link */}
            <Link
              href="/orangebox"
              className="group mt-8 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5] transition-colors hover:text-[#F2F4F5]"
            >
              More about ORANGEBOX{" "}
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          {/* right: buy area */}
          <div className="flex flex-col gap-8">
            {/* #buy sentinel — StickyBuyBar IntersectionObserver target */}
            <div id="buy" aria-hidden className="absolute" />

            {/* live price display */}
            <DynamicPrice variant="stacked" showUrgency className="" />

            {/* buy button — client component, handles launch gate internally */}
            <BuyButton />

            {/* live sales counter */}
            <SalesCounterV5 />

            {/* trust micro-copy */}
            <div className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] px-5 py-4">
              <ul className="space-y-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[#6B7779]">
                <li>· instant download · stripe checkout</li>
                <li>· 30-day material-failure refund</li>
                <li>· 30-day workflow-fit refund · no questions</li>
                <li>· anti-SaaS clause license §4A · written and binding</li>
                <li>· source included · local-first · zero telemetry</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
