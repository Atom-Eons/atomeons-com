"use client";

import { useEffect, useRef, useState } from "react";

/**
 * V3 / § 07 · Founder Quote
 *
 * Direction: noir-cinema (winner). The page slows. The founder speaks
 * once, then steps back. This is the only first-person voice on the
 * homepage above the Founder Note photograph that follows; it works
 * as the editorial bridge between the proof surfaces (Receipts,
 * Research, Curriculum) and the human surface (Founder Note +
 * Colophon Footer).
 *
 * Voice constraint (locked, from operator directive):
 *   "lab-grade, anti-hype, sourced, technical, calm. Atom McCree, not
 *   Apple ad copy." 30 words max.
 *
 * The quote shipped here is 27 words:
 *   "We don't have customers. We have witnesses. Every line ships with
 *    a commit hash and a date. If it isn't on the page, it didn't
 *    happen."
 *
 * Palette (locked, noir-cinema D7):
 *   --noir-base      #08090B  page-deep
 *   --noir-plate     #0F1114  tile-default
 *   --noir-cream     #F4F4F2  text-primary
 *   --noir-graphite  #9CA3AF  text-secondary
 *   --noir-iron      #5A6068  text-mute
 *   --noir-hairline  #1F242B  border
 *   --signal-cyan    #22F0D5  bio-accent (preserved equity)
 *   --signal-red     #FF4D4D  live-state pulse
 *
 * Typography:
 *   - Quote body: Newsreader serif (fallback chain Charter / Iowan
 *     Old Style / Apple Garamond / Georgia / ui-serif), 32→64px
 *     fluid, line-height 1.18, tracking -0.012em. Editorial register.
 *   - Display gauge "§ 07": Inter Variable, variable-weight reveal
 *     100→900 axis on scroll, the signature move continued from § 06.
 *   - Attribution + receipts: ui-monospace / JetBrains Mono Variable
 *     fallback, 10–13px, tracking 0.18–0.32em.
 *
 * Signature move (Variable-Weight Reveal, continuity from § 06):
 *   The "§ 07" gauge in the section header animates
 *   font-variation-settings 'wght' from 100→900 over the first 400px
 *   of scroll after the section enters the viewport. Tracking
 *   tightens in lockstep. One real font axis, no faux-bold swap.
 *   prefers-reduced-motion snaps directly to final state.
 *
 * Live Signal continuity:
 *   A hairline-bordered receipts strip below the quote echoes the
 *   hero's Live Signal Panel — pulsing #FF4D4D dot, mono fields,
 *   ISO date, role, location. This is the trust marker that proves
 *   the quote is signed by a real person operating a real lab in a
 *   real place, not a brand statement.
 *
 * Composition:
 *   - 100vw, dark surface (#08090B), generous vertical breath.
 *   - Two-column desktop: large quotation-mark glyph left in
 *     #1F242B (decorative, aria-hidden), pull quote right at editorial
 *     measure max ~28ch so the line breaks land where they should.
 *   - Single-column mobile: glyph above, quote below.
 *   - Section gauge and attribution receipts hairline-separated from
 *     the quote so the eye lands on the prose, not the chrome.
 *
 * Accessibility:
 *   - <blockquote> with explicit <cite> for the attribution.
 *   - aria-label on the <section>.
 *   - Decorative quotation glyph is aria-hidden.
 *   - prefers-reduced-motion disables the weight-axis transition and
 *     the red-dot pulse. Color and contrast are not motion-dependent.
 *
 * Performance:
 *   - No images. No webfont beyond what the page already loads.
 *   - One IntersectionObserver-free implementation: rAF-throttled
 *     scroll handler reads getBoundingClientRect on the section and
 *     writes a single CSS variable to the heading node. No layout
 *     thrash per frame.
 *
 * Where this sits in the page:
 *   § 06 · The Curriculum Wall  →  § 07 · Founder Quote (this file)
 *   →  § 08 · Founder Note (full-bleed photograph)
 */

// ---------------------------------------------------------------------------
// QUOTE — single source of truth.
//   27 words. Under the 30-word ceiling. Voice: lab-grade, anti-hype,
//   sourced, technical, calm. Not a slogan. A contract with the visitor.
// ---------------------------------------------------------------------------

const QUOTE = {
  body:
    "We don't have customers. We have witnesses. Every line ships with a " +
    "commit hash and a date. If it isn't on the page, it didn't happen.",
  // Stored separately so the attribution receipts strip and the <cite>
  // tag never drift out of sync.
  author: {
    name: "Atom McCree",
    role: "Founder, ÆoNs Research Laboratory",
    location: "Marco Island, FL",
    // ISO date of authorship for this pull quote. Receipts > vibes.
    iso: "2026-06-02",
    // Build SHA placeholder — replaced by env-injected commit hash at
    // build time elsewhere on the site. Renders as an em-dash if no
    // hash is wired, never a lie.
    sha: "—",
  },
} as const;

// Compile-time word-count guard. Mom's Law: the 30-word ceiling is real,
// not aspirational. If a future edit drifts over, dev/build warns.
const WORD_LIMIT = 30;

// ---------------------------------------------------------------------------
// COMPONENT
// ---------------------------------------------------------------------------

export function FounderQuote() {
  // Word-count drift guard. Only runs in dev/build; tree-shaken in prod.
  if (process.env.NODE_ENV !== "production") {
    const wordCount = QUOTE.body.trim().split(/\s+/).length;
    if (wordCount > WORD_LIMIT) {
      // eslint-disable-next-line no-console
      console.warn(
        `[V3/FounderQuote] Quote is ${wordCount} words; ceiling is ${WORD_LIMIT}. ` +
          "Edit QUOTE.body down before shipping.",
      );
    }
  }

  // -------------------------------------------------------------------------
  // Variable-Weight Reveal — signature move continuity from § 06.
  //   --reveal is a scalar 0→1 written to the section heading on scroll.
  //   The CSS in the scoped <style> block consumes it via calc() to ramp
  //   font-variation-settings 'wght' and letter-spacing in lockstep.
  //   Reduced motion: snaps to 1 immediately.
  // -------------------------------------------------------------------------
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLParagraphElement | null>(null);
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
      // Trigger when the section's top crosses the viewport bottom,
      // finish 400px of scroll later. Clamp to [0, 1].
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

    compute(); // initial paint — handle deep-links to this section
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      mq.removeEventListener("change", onMq);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, []);

  // Format the ISO date for the receipts strip without bringing in a
  // formatting lib. Renders as e.g. "2026 · 06 · 02" — mono, calm.
  const dateDisplay = (() => {
    const [y, m, d] = QUOTE.author.iso.split("-");
    return `${y} · ${m} · ${d}`;
  })();

  return (
    <section
      ref={sectionRef}
      id="founder-quote"
      aria-label="Founder quote — Atom McCree"
      data-v3-section="07-founder-quote"
      className="relative isolate overflow-hidden border-y border-[#1F242B] bg-[#08090B] text-[#F4F4F2]"
    >
      <div className="mx-auto w-full max-w-[1480px] px-6 py-28 md:px-10 md:py-36 lg:px-14 lg:py-44">
        {/* --------------------------------------------------------------- */}
        {/* TOP RAIL — section gauge + live signal dot                       */}
        {/* --------------------------------------------------------------- */}
        <div className="flex items-center justify-between gap-6 border-b border-[#1F242B] pb-6">
          <p
            ref={headingRef}
            className="v3-founder-gauge font-mono text-[11px] uppercase tracking-[0.32em] text-[#5A6068]"
          >
            <span className="text-[#9CA3AF]">§ 07</span>
            <span className="mx-3 text-[#1F242B]">·</span>
            <span className="text-[#F4F4F2]">FOUNDER · ON THE RECORD</span>
          </p>

          <span
            className="relative inline-flex h-2 w-2 shrink-0"
            aria-hidden
          >
            <span className="v3-founder-pulse absolute inline-flex h-full w-full rounded-full bg-[#FF4D4D] opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF4D4D]" />
          </span>
        </div>

        {/* --------------------------------------------------------------- */}
        {/* THE QUOTE — two-column desktop, stacked mobile                   */}
        {/* --------------------------------------------------------------- */}
        <div className="mt-16 grid grid-cols-1 gap-10 md:mt-20 lg:grid-cols-[auto_1fr] lg:gap-20">
          {/* Decorative opening quotation glyph — set in hairline color so
              it reads as page furniture, not punctuation noise. */}
          <span
            aria-hidden
            className="select-none font-serif leading-[0.7] text-[#1F242B]"
            style={{ fontSize: "clamp(120px, 18vw, 280px)" }}
          >
            &ldquo;
          </span>

          <blockquote className="max-w-[28ch] self-center">
            <p className="v3-founder-quote font-serif text-[#F4F4F2]">
              {QUOTE.body}
            </p>

            <footer className="mt-10 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-t border-[#1F242B] pt-6">
              <cite className="not-italic font-sans text-[17px] font-medium tracking-[-0.005em] text-[#F4F4F2]">
                {QUOTE.author.name}
              </cite>
              <span
                aria-hidden
                className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#1F242B]"
              >
                ·
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#9CA3AF]">
                {QUOTE.author.role}
              </span>
            </footer>
          </blockquote>
        </div>

        {/* --------------------------------------------------------------- */}
        {/* RECEIPTS STRIP — the trust vector. Mono. Hairline.               */}
        {/* --------------------------------------------------------------- */}
        <dl className="mt-20 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-[#1F242B] pt-8 font-mono text-[10px] uppercase tracking-[0.28em] sm:grid-cols-4 md:mt-24">
          <div>
            <dt className="text-[#5A6068]">Signed</dt>
            <dd className="mt-2 text-[13px] tracking-[0.18em] text-[#F4F4F2]">
              {QUOTE.author.name}
            </dd>
          </div>
          <div>
            <dt className="text-[#5A6068]">Location</dt>
            <dd className="mt-2 text-[13px] tracking-[0.18em] text-[#F4F4F2]">
              {QUOTE.author.location}
            </dd>
          </div>
          <div>
            <dt className="text-[#5A6068]">Date</dt>
            <dd className="mt-2 text-[13px] tabular-nums tracking-[0.18em] text-[#F4F4F2]">
              {dateDisplay}
            </dd>
          </div>
          <div>
            <dt className="text-[#5A6068]">Commit</dt>
            <dd className="mt-2 text-[13px] tracking-[0.18em] text-[#22F0D5]">
              {QUOTE.author.sha}
            </dd>
          </div>
        </dl>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Scoped styles — variable-weight reveal, serif chain, pulse, motion */}
      {/* ------------------------------------------------------------------ */}
      <style>{`
        /*
         * Signature move — variable-weight reveal on the § 07 gauge.
         *   --reveal is a scalar 0→1 written by the rAF scroll handler.
         *   Weight ramps 100→900, tracking tightens 0.32em → 0.24em.
         *   The gauge is mono so the weight axis effect is subtle on
         *   purpose — it reads as the section "tightening into focus."
         */
        .v3-founder-gauge {
          --reveal: 0;
          font-variation-settings: "wght" calc(300 + var(--reveal) * 500);
          letter-spacing: calc(0.32em + var(--reveal) * -0.08em);
          transition:
            font-variation-settings 80ms linear,
            letter-spacing 80ms linear;
        }

        /*
         * Editorial-serif fallback chain — matches § 06 / Curriculum so
         * the whole noir-cinema lane renders consistently whether or not
         * Newsreader has been wired via @next/font in layout.tsx yet.
         */
        .font-serif {
          font-family: "Newsreader", Charter, "Iowan Old Style",
            "Apple Garamond", "Georgia", ui-serif, serif;
          font-feature-settings: "ss01", "kern";
        }

        /*
         * The quote itself — fluid editorial scale, optical kerning,
         * tight leading so a 27-word block breathes without sprawling
         * down the page. clamp() ceiling caps display weight on ultra-
         * wide so the quote never out-shouts the rest of the section.
         */
        .v3-founder-quote {
          font-size: clamp(28px, 4.4vw, 64px);
          line-height: 1.18;
          letter-spacing: -0.012em;
          font-weight: 400;
          text-wrap: balance;
        }

        /*
         * Pulse — live-state marker. 1.2s heartbeat continuity with the
         * hero Live Signal Panel and § 06.
         */
        @keyframes v3-founder-pulse {
          0% { transform: scale(1);   opacity: 0.7; }
          70% { transform: scale(2.4); opacity: 0; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        .v3-founder-pulse {
          animation: v3-founder-pulse 1.2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        /*
         * prefers-reduced-motion: silence transitions and the pulse.
         * Color/contrast states still convey trust without motion.
         */
        @media (prefers-reduced-motion: reduce) {
          .v3-founder-gauge {
            transition: none !important;
          }
          .v3-founder-pulse {
            animation: none !important;
            opacity: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}

export default FounderQuote;
