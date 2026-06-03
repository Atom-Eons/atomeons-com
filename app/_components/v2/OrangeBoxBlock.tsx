import Link from "next/link";
import { OrangeBoxV63Buy } from "@/app/_components/OrangeBoxV63Buy";

/**
 * OrangeBoxBlock — condensed product block for the lab homepage.
 *
 * IMPORTANT: `<div id="buy" />` must be present. StickyBuyBar watches
 * #buy via IntersectionObserver to decide whether to show/hide the bar.
 *
 * 2026-05-23 refactor:
 * - Retired BuyButton (legacy $1 + ladder + free-7-days), DynamicPrice
 *   (ladder display), SalesCounterV5 (ladder progress).
 * - Wired OrangeBoxV63Buy (v6.3 single-price $99 flow).
 * - LIVE-branch copy rewritten to v6.3 reality: AE See-Suite +
 *   AE Operations · $99 once · §4A no-saas · two 30-day refund paths.
 * - SALES_PAUSED branch preserved for future build-windows but adjusted
 *   to reflect the v6.3-current ship state.
 *
 * SALES PAUSE: when NEXT_PUBLIC_ORANGEBOX_SALES_PAUSED=true the right
 * column hides the buy button (paused state should never appear to
 * accept money). When live, the buy button renders.
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
            "radial-gradient(50% 45% at 80% 55%, rgba(34, 240, 213,0.12) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        {/* section label */}
        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
          {SALES_PAUSED
            ? "::ORANGEBOX · v6.3 · IN MAINTENANCE WINDOW"
            : "::WHAT THE LAB SHIPS · ORANGEBOX · v6.3"}
        </p>

        <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-20">
          {/* left: pitch */}
          <div>
            {SALES_PAUSED ? (
              <>
                <h2 className="mb-6 text-balance text-4xl font-medium leading-[1.02] tracking-[-0.02em] text-[#F2F4F5] md:text-6xl">
                  The cockpit{" "}
                  <span className="text-[#22F0D5]">is between builds.</span>{" "}
                  <span className="text-[#22F0D5]">Be first</span> when it
                  reopens.
                </h2>

                <div className="space-y-3 text-[#9BA5A7]">
                  <p className="text-base leading-relaxed md:text-lg">
                    Sales paused during a v6.x maintenance window. The
                    v6.3 architecture — AE See-Suite (command surface)
                    plus AE Operations (engine surface) — ships first
                    when the window closes.
                  </p>
                  <p className="text-base leading-relaxed md:text-lg">
                    No drip. No marketing list. One notification when
                    sales reopen.
                  </p>
                  <p className="font-mono text-sm uppercase tracking-[0.14em] text-[#22F0D5]">
                    PRIOR BUYERS LOCKED IN. License §4A. Forever.
                  </p>
                </div>
              </>
            ) : (
              <>
                <h2 className="mb-6 text-balance text-4xl font-medium leading-[1.02] tracking-[-0.02em] text-[#F2F4F5] md:text-6xl">
                  The cockpit.
                  <br />
                  <span className="text-[#22F0D5]">Two surfaces.</span>{" "}
                  <span className="text-[#22F0D5]">One operator.</span>
                </h2>

                <div className="space-y-3 text-[#9BA5A7]">
                  <p className="text-base leading-relaxed md:text-lg">
                    Native Rust binary. No webview. No Chromium. No
                    subscription. v6.3 ships two surfaces:
                    <strong className="font-semibold text-[#22F0D5]">
                      {" "}
                      AE See-Suite
                    </strong>{" "}
                    (command — receipts, dashboards, mission graphs,
                    broadcast feed) plus{" "}
                    <strong className="font-semibold text-[#22F0D5]">
                      AE Operations
                    </strong>{" "}
                    (engine — MCP tools, agent routing, model selection).
                  </p>
                  <p className="text-base leading-relaxed md:text-lg">
                    Multi-model routing across Claude, GPT, Gemini, Groq
                    LPUs, Ollama, OpenRouter (200+ models). 60+ MCP tools.
                    27 constitutional guardrails. Local-first. Zero
                    telemetry. Zero markup on token cost. Receipts live
                    on your disk.
                  </p>
                  <p className="font-mono text-sm uppercase tracking-[0.14em] text-[#22F0D5]">
                    FREE THIS WEEK · PERPETUAL AFTER · §4A BANS SUBSCRIPTION.
                    30-DAY MATERIAL FAILURE GUARANTEE IF IT DOESN&apos;T FIT.
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
                ? "Read the v6.3 architecture"
                : "More about ORANGEBOX v6.3"}{" "}
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          {/* right: buy area */}
          <div className="flex flex-col gap-8">
            {/* #buy sentinel — zero-size, not absolute, never clipped */}
            <div
              id="buy"
              aria-hidden
              className="block h-0 w-0 overflow-hidden"
            />

            {/* price card */}
            {SALES_PAUSED ? (
              <div className="rounded-2xl border border-[#22F0D5]/30 bg-gradient-to-br from-[#1C0F08] to-[#0A0F11] p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FFB87A]">
                  ::sales paused · maintenance window
                </p>
                <p className="mt-3 text-2xl font-medium text-[#F2F4F5]">
                  FREE this week · perpetual after countdown
                </p>
                <p className="mt-2 text-sm text-[#9BA5A7]">
                  License §4A locks the price. No subscription, ever.
                </p>
              </div>
            ) : (
              <div className="rounded-2xl border border-[#22F0D5]/30 bg-gradient-to-br from-[#1C0F08] to-[#0A0F11] p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FFB87A]">
                  ::price · once · forever · §4A
                </p>
                <p className="mt-2 text-5xl font-medium tracking-tight text-[#F2F4F5]">
                  FREE
                </p>
                <p className="mt-2 text-sm text-[#9BA5A7]">
                  Free this week. Perpetual after the countdown. No
                  subscription, no usage meter, no freemium gate.
                  Source included. 30-day Material Failure Guarantee
                  if it doesn&apos;t fit.
                </p>
                <div className="mt-5">
                  <OrangeBoxV63Buy />
                </div>
              </div>
            )}

            {/* trust micro-copy */}
            <div className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] px-5 py-4">
              {SALES_PAUSED ? (
                <ul className="space-y-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[#6B7779]">
                  <li>· v6.3 between builds</li>
                  <li>· prior buyers locked free · license §4A</li>
                  <li>· no drip · no marketing list</li>
                  <li>· one notification when sales reopen</li>
                </ul>
              ) : (
                <ul className="space-y-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[#6B7779]">
                  <li>· instant download · stripe checkout</li>
                  <li>· 30-day material-failure refund · full</li>
                  <li>· 30-day workflow-fit refund · no questions</li>
                  <li>· license §4A · anti-SaaS · written and binding</li>
                  <li>· source included · local-first · zero telemetry</li>
                  <li>· zero markup on token cost · BYO keys</li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
