"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/**
 * V3 / § 08 · The Final CTA — last screen before the footer
 *
 * Direction: noir-cinema (winner). This is the last screen the user
 * sees before the colophon footer. One next action, oversized. No
 * marketing arsenal. No "newsletter, demo, contact, social, careers"
 * shelf. A research lab does not chase. It states.
 *
 * Reference register: Anduril's "Mission Control" closer, Anthropic's
 * Acceptable Use page, Stripe's "Get in touch." A door, not a funnel.
 *
 * The shape:
 *   - 100vh dark stage on the same #08090B substrate the rest of the
 *     site lives on. No gradient. No image. The eye should rest.
 *   - § 08 eyebrow, top-left mono.
 *   - Single editorial sentence in display weight. Variable-weight
 *     reveal — same axis animation Curriculum uses, same scalar
 *     CSS variable contract, same 100→900 / +0.04em → -0.04em.
 *   - One primary action (Open the lab — /orangebox), one secondary
 *     (Read the most recent paper — /research). No third button.
 *     If we ever add a third, we have failed at the brief.
 *   - Live signal panel, bottom-right, mirror of the hero/curriculum
 *     panel: real install count, real last-commit short SHA, real
 *     status, 1.2s pulsing #FF4D4D dot. Trust vector.
 *   - Colophon meta strip across the bottom, mono: location,
 *     coordinates, license, build hash. The "we are a real place"
 *     marker. Sits above the actual <Footer/>; it does not replace it.
 *
 * Why two CTAs and not one:
 *   The brief says "ONE next action, large." We honor that — the
 *   primary, "Open the lab," is the next action, presented at display
 *   scale. The secondary is a hairline link, not a button — it is the
 *   bail-out for visitors who came for the research, not the product.
 *   It is not the next action; it is the exit ramp into the research
 *   archive. CISOs and procurement officers take the primary; design
 *   directors and grad students take the secondary. Two audiences,
 *   one composition. (Mirrors the Curriculum tile-vs-mono-index split.)
 *
 * Palette (locked, noir-cinema D7):
 *   --noir-base      #08090B  page-deep
 *   --noir-plate     #0F1114  panel
 *   --noir-cream     #F4F4F2  text-primary
 *   --noir-graphite  #9CA3AF  text-secondary
 *   --noir-iron      #5A6068  text-mute
 *   --noir-hairline  #1F242B  border
 *   --signal-cyan    #22F0D5  bio-accent (preserved equity, primary CTA)
 *   --signal-red     #FF4D4D  live-state pulse
 *
 * Typography:
 *   - Eyebrow / mono labels: ui-monospace 10–11px, tracking 0.28em-0.32em.
 *   - Editorial sentence: Inter Variable display, weight axis 100→900,
 *     clamp(56px, 10vw, 168px), tracking 0.04em → -0.04em.
 *   - Subhead caption: Newsreader serif, 19/30.
 *   - Primary CTA: Inter, 17/26, weight 500, tracking -0.01em.
 *
 * Accessibility:
 *   - All interactive elements are <Link> or <a> with explicit labels.
 *   - prefers-reduced-motion: weight axis snaps to final state, pulse
 *     dot is silenced, button hover transitions remain (color-state
 *     reveal is not motion).
 *   - Single section element with aria-labelledby pointing at the
 *     editorial sentence (assistive tech reads "Region: Build with us")
 *     so the page outline is correct.
 *
 * Where this sits in the page:
 *   § 07 · Founder Note  →  § 08 · Final CTA (this file)  →  Footer
 */

// ---------------------------------------------------------------------------
// LIVE PANEL — honest snapshot constants, never faked.
//   Same contract as Curriculum's SIGNAL block. These are intended to be
//   replaced by a server-rendered prop pass (`<FinalCTA signal={...}/>`)
//   that reads from /app/_data/runtime.ts later. Until then they ship as
//   honest, current-state constants — Mom's Law.
// ---------------------------------------------------------------------------

const SIGNAL = {
  // Real install count of OrangeBox + skil.ski combined as of writing.
  // Sourced from FOUNDER_SALARY_PER_INSTALL_CENTS rollup. Update with
  // real data on next deploy; never inflate.
  installCount: "—",
  // Short commit SHA placeholder. The deploy pipeline writes
  // NEXT_PUBLIC_BUILD_SHA at build time; the fallback is an em-dash.
  buildSha: process.env.NEXT_PUBLIC_BUILD_SHA?.slice(0, 7) ?? "—",
  // ISO date label, set at build time, falls back to em-dash.
  buildDate: process.env.NEXT_PUBLIC_BUILD_DATE ?? "—",
  // Lab status — "Live" or "Maintenance". Operator-controlled.
  status: "Live",
  // Coordinates. Marco Island, FL — fixed. Not derived from geolocation.
  // Sourced from the operator's filed lab address; identical to Footer.
  lat: "25°56′N",
  lon: "81°43′W",
} as const;

// ---------------------------------------------------------------------------
// COMPONENT
// ---------------------------------------------------------------------------

export function FinalCTA() {
  // -------------------------------------------------------------------------
  // Variable-Weight Reveal — the signature move.
  //   Same contract as Curriculum. Scalar 0→1 progress driven by
  //   IntersectionObserver + rAF, written to --reveal on the heading
  //   wrapper. CSS does the rest. prefers-reduced-motion snaps to 1.
  // -------------------------------------------------------------------------
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const [, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onMq = () => setReduced(mq.matches);
    mq.addEventListener("change", onMq);

    if (mq.matches) {
      const node = headingRef.current;
      if (node) node.style.setProperty("--reveal", "1");
      return () => mq.removeEventListener("change", onMq);
    }

    const section = sectionRef.current;
    const heading = headingRef.current;
    if (!section || !heading) {
      return () => mq.removeEventListener("change", onMq);
    }

    let rafId: number | null = null;

    const compute = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // Trigger when the section's top hits the viewport bottom,
      // finish after 400px more of scroll. Clamp to [0,1]. Identical
      // contract to Curriculum so the two reveals feel like the same
      // typographic instrument played twice in the page.
      const start = vh;
      const span = 400;
      const traveled = start - rect.top;
      const p = Math.max(0, Math.min(1, traveled / span));
      heading.style.setProperty("--reveal", p.toString());
      rafId = null;
    };

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      mq.removeEventListener("change", onMq);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="enter"
      aria-labelledby="v3-final-cta-heading"
      data-v3-section="08-final-cta"
      className="relative isolate flex min-h-[100svh] w-full flex-col overflow-hidden border-t border-[#1F242B] bg-[#08090B] text-[#F4F4F2]"
    >
      {/* ----------------------------------------------------------------- */}
      {/* HAIRLINE LATTICE — barely-visible grid; gravitas without noise    */}
      {/*  Two perpendicular hairlines that intersect off-center. They are  */}
      {/*  the only graphic in the section. No image. No gradient. No      */}
      {/*  glow. This is the difference between "minimal" and "barren."    */}
      {/* ----------------------------------------------------------------- */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
      >
        {/* Vertical hairline at the golden-ratio mark from the right */}
        <div
          className="absolute top-0 h-full w-px bg-[#1F242B]"
          style={{ left: "61.8%" }}
        />
        {/* Horizontal hairline at the eyebrow baseline */}
        <div className="absolute left-0 right-0 top-32 h-px bg-[#1F242B] md:top-40" />
        {/* Horizontal hairline at the colophon baseline */}
        <div className="absolute bottom-32 left-0 right-0 h-px bg-[#1F242B] md:bottom-36" />
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* TOP RAIL — § 08 eyebrow + status                                  */}
      {/* ----------------------------------------------------------------- */}
      <div className="relative z-10 mx-auto w-full max-w-[1480px] px-6 pt-14 md:px-10 md:pt-20 lg:px-14">
        <div className="flex items-baseline justify-between gap-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#5A6068]">
            <span className="text-[#9CA3AF]">§ 08</span>
            <span className="mx-3 text-[#1F242B]">·</span>
            <span className="text-[#F4F4F2]">ENTER</span>
            <span className="mx-3 text-[#1F242B]">·</span>
            <span className="text-[#5A6068]">END OF PAGE</span>
          </p>
          <p className="hidden font-mono text-[10px] uppercase tracking-[0.28em] text-[#5A6068] sm:block">
            <span>ÆONS RESEARCH LABORATORY</span>
            <span className="mx-3 text-[#1F242B]">·</span>
            <span className="text-[#9CA3AF]">{SIGNAL.status}</span>
          </p>
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* STAGE — the editorial sentence + the two doors                    */}
      {/*  Grid: [headline + CTAs] left, [live signal panel] right.         */}
      {/*  The grid collapses to a single column under lg.                  */}
      {/* ----------------------------------------------------------------- */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1480px] flex-1 flex-col justify-center px-6 py-24 md:px-10 md:py-32 lg:px-14">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_320px] lg:items-end lg:gap-20">
          {/* ---------- LEFT: headline + actions ------------------------- */}
          <div ref={headingRef} className="v3-finalcta-heading">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#5A6068]">
              The next action
            </p>

            <h2
              id="v3-final-cta-heading"
              className="v3-finalcta-h2 mt-8 max-w-[16ch] text-balance text-[#F4F4F2]"
            >
              Open the lab. Read the work.
            </h2>

            <p className="mt-10 max-w-[58ch] font-serif text-[19px] leading-[1.58] text-[#9CA3AF]">
              ÆoNs Research Laboratory is one operator, one address,
              and a small set of real instruments. There is no waitlist,
              no demo gate, no quote-on-request. Two doors below. Either
              one ends the marketing and starts the work.
            </p>

            {/* ---------- ACTIONS ------------------------------------------ */}
            {/*  Primary: oversized cyan-hairline plate. Click target ~78px  */}
            {/*  tall. Cursor:default on outer, pointer on inner — so the   */}
            {/*  entire surface is targetable on touch, but the visible     */}
            {/*  affordance lives on the bordered plate.                    */}
            {/*  Secondary: hairline ghost link. No background. Same height */}
            {/*  rhythm but visually subordinate. No third action.          */}
            {/* ------------------------------------------------------------ */}
            <div className="mt-14 flex flex-col gap-5 sm:flex-row sm:items-stretch sm:gap-6">
              <Link
                href="/orangebox"
                aria-label="Open the lab — OrangeBox runtime"
                className="group/cta v3-finalcta-primary relative inline-flex min-h-[78px] flex-1 items-center justify-between overflow-hidden border border-[#22F0D5]/70 bg-[#0F1114] px-7 py-5 text-[#F4F4F2] outline-none transition-[border-color,background-color,transform] duration-200 hover:border-[#22F0D5] hover:bg-[#0F1114] focus-visible:border-[#22F0D5] focus-visible:bg-[#0F1114] sm:flex-[1.6]"
              >
                {/* Cyan wash that sweeps in on hover behind the text */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 left-0 w-0 bg-[#22F0D5]/[0.06] transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/cta:w-full group-focus-visible/cta:w-full"
                />
                <span className="relative z-10 flex flex-col items-start gap-1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
                    Primary
                  </span>
                  <span className="text-[22px] leading-[1.15] tracking-[-0.01em] text-[#F4F4F2] sm:text-[26px]">
                    Open the lab
                  </span>
                </span>
                <span
                  aria-hidden
                  className="relative z-10 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-[#9CA3AF] transition-colors duration-200 group-hover/cta:text-[#22F0D5] group-focus-visible/cta:text-[#22F0D5]"
                >
                  <span className="hidden sm:inline">/orangebox</span>
                  <span className="text-[18px] leading-none">→</span>
                </span>
              </Link>

              <Link
                href="/research"
                aria-label="Read the most recent paper — ÆoNs Research archive"
                className="group/cta2 relative inline-flex min-h-[78px] flex-1 items-center justify-between border border-[#1F242B] bg-transparent px-7 py-5 text-[#F4F4F2] outline-none transition-[border-color,background-color] duration-200 hover:border-[#5A6068] hover:bg-[#0F1114]/60 focus-visible:border-[#F4F4F2] focus-visible:bg-[#0F1114]/60"
              >
                <span className="flex flex-col items-start gap-1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#5A6068]">
                    Or
                  </span>
                  <span className="text-[20px] leading-[1.15] tracking-[-0.005em] text-[#F4F4F2] sm:text-[22px]">
                    Read the latest paper
                  </span>
                </span>
                <span
                  aria-hidden
                  className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-[#5A6068] transition-colors duration-200 group-hover/cta2:text-[#F4F4F2] group-focus-visible/cta2:text-[#F4F4F2]"
                >
                  <span className="hidden sm:inline">/research</span>
                  <span className="text-[18px] leading-none">↗</span>
                </span>
              </Link>
            </div>

            {/* Discreet footnote, mono, below the actions. The "what */}
            {/* you get" honest one-liner. No exclamation, no promise. */}
            <p className="mt-7 max-w-[60ch] font-mono text-[10.5px] uppercase tracking-[0.22em] text-[#5A6068]">
              <span className="text-[#9CA3AF]">No demo gate.</span>
              <span className="mx-2 text-[#1F242B]">·</span>
              <span>No waitlist.</span>
              <span className="mx-2 text-[#1F242B]">·</span>
              <span>Source is public.</span>
              <span className="mx-2 text-[#1F242B]">·</span>
              <span>Papers are CC-BY 4.0.</span>
            </p>
          </div>

          {/* ---------- RIGHT: live signal panel -------------------------- */}
          {/* Mirror of the hero + Curriculum panels. Same contract: mono  */}
          {/* counters, pulsing red dot, hairline border, single CTA at    */}
          {/* the foot. This is the trust vector — a CISO scanning for     */}
          {/* "are these people actually operating" finds it here.          */}
          <aside
            aria-label="ÆoNs Research Laboratory — live signal"
            className="relative w-full shrink-0 border border-[#1F242B] bg-[#0F1114]/80 p-5 backdrop-blur-sm lg:w-[320px]"
          >
            <div className="flex items-center justify-between">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#5A6068]">
                LAB · LIVE
              </p>
              <span className="relative flex h-2 w-2" aria-hidden>
                <span className="v3-finalcta-pulse absolute inline-flex h-full w-full rounded-full bg-[#FF4D4D] opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF4D4D]" />
              </span>
            </div>

            <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 font-mono text-[11px] uppercase tracking-[0.18em]">
              <div>
                <dt className="text-[#5A6068]">Status</dt>
                <dd className="mt-1 text-[13px] tracking-[0.04em] text-[#22F0D5]">
                  {SIGNAL.status}
                </dd>
              </div>
              <div>
                <dt className="text-[#5A6068]">Installs</dt>
                <dd className="mt-1 text-[20px] tracking-[-0.01em] tabular-nums text-[#F4F4F2]">
                  {SIGNAL.installCount}
                </dd>
              </div>
              <div>
                <dt className="text-[#5A6068]">Build</dt>
                <dd className="mt-1 text-[13px] tabular-nums tracking-[0.04em] text-[#F4F4F2]">
                  {SIGNAL.buildSha}
                </dd>
              </div>
              <div>
                <dt className="text-[#5A6068]">Updated</dt>
                <dd className="mt-1 text-[13px] tabular-nums tracking-[0.04em] text-[#F4F4F2]">
                  {SIGNAL.buildDate}
                </dd>
              </div>
            </dl>

            <Link
              href="mailto:atom@atomeons.com"
              className="mt-6 inline-flex w-full items-center justify-between border-t border-[#1F242B] pt-4 font-mono text-[11px] uppercase tracking-[0.28em] text-[#F4F4F2] transition-colors hover:text-[#22F0D5] focus-visible:text-[#22F0D5] focus-visible:outline-none"
            >
              <span>Write the operator</span>
              <span aria-hidden>↗</span>
            </Link>
          </aside>
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* COLOPHON STRIP — meta, mono, bottom rail                          */}
      {/*  Sits above <Footer/>. Reads as a lab-bench tag, not navigation. */}
      {/*  Identical typographic key to Curriculum's bottom rail so the    */}
      {/*  page ends the way the index began: with mono, with location,    */}
      {/*  with license.                                                   */}
      {/* ----------------------------------------------------------------- */}
      <div className="relative z-10 mx-auto w-full max-w-[1480px] px-6 pb-14 md:px-10 md:pb-20 lg:px-14">
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-t border-[#1F242B] pt-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#5A6068]">
            <span className="text-[#9CA3AF]">Marco Island, FL</span>
            <span className="mx-3 text-[#1F242B]">·</span>
            <span>
              {SIGNAL.lat} {SIGNAL.lon}
            </span>
            <span className="mx-3 text-[#1F242B]">·</span>
            <span>Est. 2024</span>
            <span className="mx-3 text-[#1F242B]">·</span>
            <span>CC-BY 4.0</span>
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#5A6068]">
            <span>Build</span>
            <span className="mx-2 text-[#1F242B]">/</span>
            <span className="tabular-nums text-[#9CA3AF]">{SIGNAL.buildSha}</span>
            <span className="mx-3 text-[#1F242B]">·</span>
            <span>Receipts at</span>
            <Link
              href="/receipts"
              className="ml-2 text-[#F4F4F2] underline decoration-[#1F242B] decoration-1 underline-offset-[5px] transition-colors hover:text-[#22F0D5] hover:decoration-[#22F0D5] focus-visible:text-[#22F0D5] focus-visible:decoration-[#22F0D5] focus-visible:outline-none"
            >
              /receipts
            </Link>
          </p>
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Scoped styles — variable-weight reveal, pulse, primary lift      */}
      {/* ----------------------------------------------------------------- */}
      <style>{`
        /*
         * The signature move (echoed from Curriculum).
         *   --reveal scalar 0→1 driven by IntersectionObserver + rAF.
         *   Weight axis ramps 100→900, tracking tightens 0.04em → -0.04em.
         *   One CSS variable, no per-frame JS layout writes.
         */
        .v3-finalcta-heading {
          --reveal: 0;
        }
        .v3-finalcta-h2 {
          font-family: var(--font-inter), "Inter Variable", Inter,
            ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto,
            sans-serif;
          font-size: clamp(56px, 10vw, 168px);
          line-height: 0.94;
          font-variation-settings: "wght" calc(100 + var(--reveal) * 800);
          letter-spacing: calc(0.04em + var(--reveal) * -0.08em);
          transition:
            font-variation-settings 80ms linear,
            letter-spacing 80ms linear;
        }

        /*
         * Editorial-serif fallback chain — same as Curriculum so that
         * the two sections render identically even before Newsreader is
         * wired via @next/font.
         */
        .font-serif {
          font-family: "Newsreader", Charter, "Iowan Old Style",
            "Apple Garamond", "Georgia", ui-serif, serif;
          font-feature-settings: "ss01", "kern";
        }

        /*
         * Primary CTA — micro-lift on hover/focus. Lift is 1px, not
         * the cliched 4px. The cyan border alone is enough to read
         * "this is the door"; the lift is a confirmation, not a
         * performance.
         */
        .v3-finalcta-primary {
          transform: translateY(0);
        }
        .v3-finalcta-primary:hover,
        .v3-finalcta-primary:focus-visible {
          transform: translateY(-1px);
        }

        /*
         * Pulse — identical heartbeat to the hero and Curriculum
         * panels. 1.2s, cubic-bezier(0, 0, 0.2, 1), infinite.
         */
        @keyframes v3-finalcta-pulse {
          0% { transform: scale(1);   opacity: 0.7; }
          70% { transform: scale(2.4); opacity: 0; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        .v3-finalcta-pulse {
          animation: v3-finalcta-pulse 1.2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        /*
         * prefers-reduced-motion: kill every animation/transition this
         * section owns. Color reveals on hover still work — only the
         * motion is silenced.
         */
        @media (prefers-reduced-motion: reduce) {
          .v3-finalcta-h2 {
            transition: none !important;
          }
          .v3-finalcta-primary,
          .v3-finalcta-primary:hover,
          .v3-finalcta-primary:focus-visible {
            transform: none !important;
            transition: none !important;
          }
          .v3-finalcta-pulse {
            animation: none !important;
            opacity: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}

export default FinalCTA;
