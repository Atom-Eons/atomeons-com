import Link from "next/link";
import { BuyButton } from "@/app/_components/BuyButton";
import { DynamicPrice } from "@/app/_components/DynamicPrice";
import { SalesCounterV5 } from "@/app/_components/v5/SalesCounterV5";

/**
 * OrangeBoxBlock — condensed product block for the lab homepage.
 *
 * IMPORTANT: `<div id="buy" />` must be present. StickyBuyBar watches
 * #buy via IntersectionObserver to decide whether to show/hide the bar.
 *
 * Server component wrapper. BuyButton + DynamicPrice + SalesCounterV5
 * are client components; they handle their own hydration.
 *
 * SALES PAUSE: when NEXT_PUBLIC_ORANGEBOX_SALES_PAUSED=true, the right
 * column hides DynamicPrice + SalesCounterV5 (those would read "buy
 * now, $1 · 0/100 sold" which is misleading), and the headline pivots
 * to the v6.3 "in build" framing. BuyButton itself already swaps to a
 * NotifyMe inline form when paused.
 */
const SALES_PAUSED =
  process.env.NEXT_PUBLIC_ORANGEBOX_SALES_PAUSED === "true";

export function OrangeBoxBlock() {
  return (
    <section className="relative isolate overflow-hidden bg-[#000] py-24 md:py-32">
      {/* ambient orange pulse */}
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
          {SALES_PAUSED
            ? "::ORANGEBOX · v6.3 SILENT CANVAS · IN BUILD"
            : "::WHAT THE LAB SHIPS · ORANGEBOX"}
        </p>

        <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-20">
          {/* left: pitch */}
          <div>
            {SALES_PAUSED ? (
              <>
                <h2 className="mb-6 text-balance text-4xl font-medium leading-[1.02] tracking-[-0.02em] text-[#F2F4F5] md:text-6xl">
                  The cockpit{" "}
                  <span className="text-[#FF7A1A]">stopped talking.</span>{" "}
                  <span className="text-[#22F0D5]">The canvas</span> started.
                </h2>

                <div className="space-y-3 text-[#9BA5A7]">
                  <p className="text-base leading-relaxed md:text-lg">
                    v6.3 rewires how progress reaches you. Describe the goal
                    once. The cockpit takes it from there — state visible,
                    progress legible, less narration, more organism.
                  </p>
                  <p className="text-base leading-relaxed md:text-lg">
                    Six new behaviors. Solidify · Z-Axis Rewind · Pulse Ring ·
                    Living Canvas · Freeze All · Multi-Canvas Tabs.
                  </p>
                  <p className="font-mono text-sm uppercase tracking-[0.14em] text-[#FF7A1A]">
                    v6.0 BUYERS GET v6.3 FREE. License §4A. Forward buyers
                    lock their price. Forever.
                  </p>
                </div>
              </>
            ) : (
              <>
                <h2 className="mb-6 text-balance text-4xl font-medium leading-[1.02] tracking-[-0.02em] text-[#F2F4F5] md:text-6xl">
                  The cockpit.
                  <br />
                  <span className="text-[#FF7A1A]">One file.</span>{" "}
                  <span className="text-[#22F0D5]">Double-click.</span> Two
                  seconds.
                </h2>

                <div className="space-y-3 text-[#9BA5A7]">
                  <p className="text-base leading-relaxed md:text-lg">
                    Native Rust binary. 4.46 MB. No webview. No Chromium. No
                    subscription. 11 lanes — Claude, GPT, Gemini, Groq LPUs,
                    Ollama, OpenRouter (200+ models), Hermes X feed.
                  </p>
                  <p className="text-base leading-relaxed md:text-lg">
                    60+ MCP tools. 15 departments. 27 constitutional
                    guardrails. Local-first. Zero telemetry. The receipts live
                    on your disk.
                  </p>
                  <p className="font-mono text-sm uppercase tracking-[0.14em] text-[#FF7A1A]">
                    $1 once. FORWARD BUYERS LOCK THEIR PRICE. Every 100 sales,
                    up $1. Forever.
                  </p>
                </div>
              </>
            )}

            {/* tail link */}
            <Link
              href="/orangebox"
              className="group mt-8 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5] transition-colors hover:text-[#F2F4F5]"
            >
              {SALES_PAUSED
                ? "See the v6.3 preview"
                : "More about ORANGEBOX"}{" "}
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          {/* right: buy / notify area */}
          <div className="flex flex-col gap-8">
            {/* #buy sentinel — zero-size, not absolute, never clipped */}
            <div
              id="buy"
              aria-hidden
              className="block h-0 w-0 overflow-hidden"
            />

            {/* Live price + sales counter only shown when sales are LIVE.
                When paused, both would mislead — hide. */}
            {SALES_PAUSED ? null : (
              <DynamicPrice variant="stacked" showUrgency className="" />
            )}

            {/* BuyButton handles its own swap to NotifyMe when paused */}
            <BuyButton />

            {SALES_PAUSED ? null : <SalesCounterV5 />}

            {/* trust micro-copy — adapts to state */}
            <div className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] px-5 py-4">
              {SALES_PAUSED ? (
                <ul className="space-y-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[#6B7779]">
                  <li>· v6.3 silent canvas · in build</li>
                  <li>· 6 new behaviors · alpha.7 shipping first</li>
                  <li>· v6.0 buyers locked free · license §4A</li>
                  <li>· no drip · no marketing list</li>
                  <li>· one notification when v6.3 ships</li>
                </ul>
              ) : (
                <ul className="space-y-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[#6B7779]">
                  <li>· instant download · stripe checkout</li>
                  <li>· 30-day material-failure refund</li>
                  <li>· 30-day workflow-fit refund · no questions</li>
                  <li>· anti-SaaS clause license §4A · written and binding</li>
                  <li>· source included · local-first · zero telemetry</li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
