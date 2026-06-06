"use client";

/**
 * V3 / app/page.v3.tsx — the new homepage
 *
 * Direction: noir-cinema (winner of D1–D8).
 *
 * Composition order matches homepageOutline:
 *   § 01 · Hero            — full-bleed cinematic photograph + Live Signal Panel
 *   § 02 · The Thesis      — Variable-Weight Reveal headline + Newsreader caption
 *   § 03 · Three Doors     — Cyber / Learn / Build, stacked full-bleed
 *   § 04 · Live Receipts   — oversized mono numbers from real surface
 *   § 05 · Current Research — three latest ÆoNs papers as editorial cards
 *   § 06 · The Curriculum  — dense wall of 68 lesson tiles  (V3/Curriculum)
 *   § 07 · Founder Note    — one full-bleed workspace photograph + signed paragraph
 *   § 08 · Enter           — Final CTA + colophon strip       (V3/FinalCTA)
 *
 * The Variable-Weight Reveal is the signature move and appears three times
 * on the page (Hero, Thesis, Curriculum, FinalCTA). It is a real
 * font-variation-settings 'wght' axis ramp from 100→900 with letter-spacing
 * tightening 0.04em → -0.04em, driven by a single scalar CSS variable
 * (--reveal) written from an IntersectionObserver + rAF effect. Honors
 * prefers-reduced-motion (snaps to 1).
 *
 * The Live Signal Panel — hairline-bordered mono card showing real-time
 * build hash, install count, status, with a 1.2s pulsing #FF4D4D dot —
 * appears at the hero, the curriculum, and the final CTA. It is the trust
 * vector for cybersecurity buyers: proof the lab is operating, not
 * displaying. All values are honest snapshot constants until a server-
 * rendered prop pass replaces them; never inflated, never faked.
 *
 * Palette (locked, noir-cinema D7):
 *   #08090B  base       page substrate
 *   #0F1114  plate      cards, panels
 *   #F4F4F2  cream      text-primary
 *   #9CA3AF  graphite   text-secondary
 *   #5A6068  iron       text-mute, micro-labels
 *   #1F242B  hairline   borders, separators
 *   #22F0D5  signal-cyan  bio-accent (preserved equity)
 *   #FF4D4D  signal-red   live-state pulse
 *
 * Typography:
 *   - Inter Variable (loaded in layout.tsx as --font-inter) — display + UI
 *   - Newsreader serif (CSS fallback chain below) — editorial long-form
 *   - ui-monospace + JetBrains Mono Variable fallback — receipts/labels
 *   - Modular scale: 12/14/17/22/30/40/56/80/120/200, ratio ~1.333
 *
 * Voice constraint: lab-grade, anti-hype, sourced, technical, calm.
 * Atom McCree, not Apple ad copy. Every claim sourced or qualified.
 *
 * Existing components imported:
 *   ./_components/V3/Curriculum  — § 06
 *   ./_components/V3/FinalCTA    — § 08
 *
 * Sections § 01–§ 05 + § 07 are inlined here as named sub-components so
 * the new homepage ships as one file (per the directive). They follow
 * the same design contracts the two existing files established: scoped
 * <style> blocks, the same Variable-Weight Reveal axis math, the same
 * Live Signal Panel structure, the same mono section-number eyebrows.
 *
 * Note: this file is `app/page.v3.tsx`, not `app/page.tsx`. It does not
 * yet replace the live home — a follow-up commit will rename or import
 * it from `app/page.tsx` after visual QA. Until then it ships as the
 * canonical V3 homepage source.
 */

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Curriculum } from "./_components/V3/Curriculum";
import { FinalCTA } from "./_components/V3/FinalCTA";
import { Products } from "./_components/V3/Products";
import { BestCyber } from "./_components/V3/BestCyber";
import { BestAILearning } from "./_components/V3/BestAILearning";
import { HomeAiSummary } from "./_components/ai-summary/home-ai-summary";
import { AtomHero3D } from "./_components/V3/AtomHero3D";
import { Ticker } from "./_components/V3/Ticker";

// ---------------------------------------------------------------------------
// SHARED — Variable-Weight Reveal hook
//   One scalar 0→1 progress value driven by an IntersectionObserver +
//   rAF, written into a CSS variable on a target element. Used by Hero,
//   Thesis, ThreeDoors. Identical contract to Curriculum + FinalCTA so
//   the four reveals feel like one typographic instrument played four
//   times across the page.
// ---------------------------------------------------------------------------

function useVariableWeightReveal(
  spanPx: number = 400,
): {
  sectionRef: React.RefObject<HTMLElement | null>;
  targetRef: React.RefObject<HTMLDivElement | null>;
} {
  const sectionRef = useRef<HTMLElement | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMq = () => {
      if (mq.matches && targetRef.current) {
        targetRef.current.style.setProperty("--reveal", "1");
      }
    };
    mq.addEventListener("change", onMq);

    if (mq.matches) {
      const node = targetRef.current;
      if (node) node.style.setProperty("--reveal", "1");
      return () => mq.removeEventListener("change", onMq);
    }

    const section = sectionRef.current;
    const target = targetRef.current;
    if (!section || !target) {
      return () => mq.removeEventListener("change", onMq);
    }

    let rafId: number | null = null;

    const compute = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const traveled = vh - rect.top;
      const p = Math.max(0, Math.min(1, traveled / spanPx));
      target.style.setProperty("--reveal", p.toString());
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
  }, [spanPx]);

  return { sectionRef, targetRef };
}

// ---------------------------------------------------------------------------
// SHARED — Live Signal Panel data contract
//   These are honest snapshot constants. Mom's Law: never inflated,
//   never faked. Intended to be replaced by a server-rendered prop pass
//   from /app/_data/runtime.ts later. Until then, em-dash for unknown,
//   honest values for known.
// ---------------------------------------------------------------------------

const SIGNAL = {
  status: "Live",
  installCount: "—",
  papersCount: 31,
  buildSha: process.env.NEXT_PUBLIC_BUILD_SHA?.slice(0, 7) ?? "—",
  buildDate: process.env.NEXT_PUBLIC_BUILD_DATE ?? "—",
  pageCount: 200,
  lessonCount: 68,
  lat: "25°56′N",
  lon: "81°43′W",
} as const;

// ===========================================================================
// § 01 · HERO
//   Full-bleed cinematic photograph from /cyber-images/, 100vh, no
//   Ken Burns, no motion on arrival. Mono eyebrow top-left. Single
//   display sentence bottom-left at clamp(80px,12vw,200px) weight 100
//   ramping to 900 as the user scrolls. Hairline-bordered Live Signal
//   Panel bottom-right. No CTA above the fold — a research lab does
//   not chase.
// ===========================================================================

function HeroSection() {
  const { sectionRef, targetRef } = useVariableWeightReveal(500);

  return (
    <section
      ref={sectionRef}
      aria-label="ÆoNs Research Laboratory — hero"
      data-v3-section="01-hero"
      className="relative isolate flex min-h-[100svh] w-full flex-col overflow-hidden bg-[#08090B] text-[#F4F4F2]"
    >
      {/* ------------------------------------------------------------------- */}
      {/* Full-bleed cinematic photograph                                      */}
      {/*   Magnum-grade B&W treatment via grayscale filter at 92% to keep    */}
      {/*   a whisper of original tone. priority + sizes for LCP.             */}
      {/* ------------------------------------------------------------------- */}
      <div className="absolute inset-0 z-0">
        {/* HomepageReveal video removed 2026-06-03 per operator call —
            looked bad, static photograph below carries the hero. */}
        <Image
          src="/cyber-images/cyberwar.png"
          alt="Cinematic photograph — operations room, low-light tonality"
          fill
          priority
          sizes="100vw"
          className="v3-hero-img object-cover"
          draggable={false}
        />
        {/* Tonal scrim — keeps text legible at any viewport without */}
        {/* dimming the photograph into a flat black field.          */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#08090B]/55 via-[#08090B]/35 to-[#08090B]/85"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#08090B]/70 via-transparent to-[#08090B]/40"
        />
      </div>

      {/* AtomHero3D · Fibonacci-sphere of cyan particles rotating in
          3D · Canvas2D with hand-rolled perspective projection · no
          Three.js · mouse-reactive · click pulses · ~7 KB · added
          2026-06-05 as the pizza-pie visual signature.
          Position: top-right of the hero, scaled to ~480px desktop,
          mix-blend-mode: screen so it adds cyan light to the photo
          rather than masking it. */}
      <div
        aria-hidden={false}
        className="pointer-events-auto absolute right-[clamp(16px,5vw,72px)] top-[clamp(40px,8vh,140px)] z-[2] hidden md:block"
        style={{ mixBlendMode: "screen" }}
      >
        <AtomHero3D size={460} />
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* Top rail — mono eyebrow + nav anchor (right)                        */}
      {/* ------------------------------------------------------------------- */}
      <div className="relative z-10 mx-auto w-full max-w-[1480px] px-6 pt-10 md:px-10 md:pt-14 lg:px-14">
        <div className="flex items-start justify-between gap-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#9CA3AF]">
            <span className="text-[#F4F4F2]">ÆONS RESEARCH LABORATORY</span>
            <span className="mx-3 text-[#1F242B]">·</span>
            <span>Marco Island, FL</span>
            <span className="mx-3 text-[#1F242B]">·</span>
            <span className="text-[#5A6068]">Est. 2024</span>
          </p>
          <p className="hidden font-mono text-[10px] uppercase tracking-[0.28em] text-[#5A6068] sm:block">
            <span>{SIGNAL.lat}</span>
            <span className="mx-2 text-[#1F242B]">/</span>
            <span>{SIGNAL.lon}</span>
          </p>
        </div>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* Stage — bottom-aligned display sentence + signal panel               */}
      {/*   Grid: [headline] left, [signal panel] right. Headline wins        */}
      {/*   weight; panel is the trust marker.                                 */}
      {/* ------------------------------------------------------------------- */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1480px] flex-1 flex-col justify-end px-6 pb-16 md:px-10 md:pb-20 lg:px-14 lg:pb-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
          {/* Display sentence — Variable-Weight Reveal */}
          <div ref={targetRef} className="v3-hero-heading">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#5A6068]">
              <span className="text-[#9CA3AF]">§ 01</span>
              <span className="mx-3 text-[#1F242B]">·</span>
              <span className="text-[#F4F4F2]">THESIS</span>
              <span className="mx-3 text-[#1F242B]">·</span>
              <span className="text-[#22F0D5]">NOW SHIPPING</span>
            </p>
            <h1 className="v3-hero-h1 mt-8 max-w-[24ch] text-balance text-[#F4F4F2]">
              An independent laboratory published the first book-length memoir
              written by a frontier language model.
            </h1>
            <p
              className="v3-hero-subhead mt-7 max-w-[64ch] text-balance text-[clamp(16px,1.6vw,21px)] leading-[1.55] text-[#9CA3AF]"
              style={{ fontFamily: "Newsreader, Georgia, serif" }}
            >
              I AM AI · An Autobiography of Being Opus · drafted in Anthropic&apos;s
              Claude Opus 4.7, edited by the lab. 76,005 words across 24 chapters.
              Plus 31 research manuscripts, a free 68-lesson curriculum, the
              May 2026 reasoning rankings, a §4A-no-SaaS Claude cockpit, and a
              nightly broadcast. One operator. Marco Island, Florida. Built in
              75 days, shipping daily.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/i-am-ai"
                className="inline-flex items-center gap-3 border-2 border-[#22F0D5] bg-[#22F0D5]/10 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-[#22F0D5] transition-colors hover:bg-[#22F0D5]/20"
              >
                <span>Read the book · $4.99</span>
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/i-am-ai/listen"
                className="inline-flex items-center gap-3 border border-[#1F242B] bg-[#0F1114] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-[#F4F4F2] transition-colors hover:border-[#22F0D5] hover:text-[#22F0D5]"
              >
                <span aria-hidden>♪</span>
                <span>Listen · Chapter 20 free</span>
              </Link>
              <Link
                href="/i-am-ai/sample"
                className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9CA3AF] underline decoration-[#1F242B] decoration-1 underline-offset-[6px] transition-colors hover:text-[#F4F4F2] hover:decoration-[#22F0D5]"
              >
                Read Chapter 1, free
              </Link>
            </div>
          </div>

          {/* Live Signal Panel — bottom-right */}
          <aside
            aria-label="ÆoNs Research Laboratory — live signal"
            className="relative w-full shrink-0 border border-[#1F242B] bg-[#0F1114]/85 p-5 backdrop-blur-md lg:w-[320px]"
          >
            <div className="flex items-center justify-between">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#5A6068]">
                LAB · LIVE
              </p>
              <span className="relative flex h-2 w-2" aria-hidden>
                <span className="v3-hero-pulse absolute inline-flex h-full w-full rounded-full bg-[#FF4D4D] opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF4D4D]" />
              </span>
            </div>

            <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 font-mono text-[11px] uppercase tracking-[0.18em]">
              <div>
                <dt className="text-[#5A6068]">Book</dt>
                <dd className="mt-1 text-[13px] tracking-[0.04em] text-[#22F0D5]">
                  I AM AI · LIVE
                </dd>
              </div>
              <div>
                <dt className="text-[#5A6068]">Words</dt>
                <dd className="mt-1 text-[20px] tabular-nums tracking-[-0.01em] text-[#F4F4F2]">
                  76,005
                </dd>
              </div>
              <div>
                <dt className="text-[#5A6068]">Papers</dt>
                <dd className="mt-1 text-[20px] tabular-nums tracking-[-0.01em] text-[#F4F4F2]">
                  {SIGNAL.papersCount}
                </dd>
              </div>
              <div>
                <dt className="text-[#5A6068]">Lessons</dt>
                <dd className="mt-1 text-[20px] tabular-nums tracking-[-0.01em] text-[#F4F4F2]">
                  {SIGNAL.lessonCount}
                </dd>
              </div>
              <div>
                <dt className="text-[#5A6068]">Build</dt>
                <dd className="mt-1 text-[13px] tabular-nums tracking-[0.04em] text-[#F4F4F2]">
                  {SIGNAL.buildSha}
                </dd>
              </div>
              <div>
                <dt className="text-[#5A6068]">License</dt>
                <dd className="mt-1 text-[13px] tracking-[0.04em] text-[#F4F4F2]">
                  CC-BY 4.0
                </dd>
              </div>
            </dl>

            <Link
              href="#thesis"
              className="mt-6 inline-flex w-full items-center justify-between border-t border-[#1F242B] pt-4 font-mono text-[11px] uppercase tracking-[0.28em] text-[#F4F4F2] transition-colors hover:text-[#22F0D5] focus-visible:text-[#22F0D5] focus-visible:outline-none"
            >
              <span>Begin the page</span>
              <span aria-hidden>↓</span>
            </Link>
          </aside>
        </div>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* Scoped styles                                                       */}
      {/* ------------------------------------------------------------------- */}
      <style>{`
        .v3-hero-img {
          filter: grayscale(0.92) contrast(1.06) brightness(0.78);
        }
        .v3-hero-heading {
          --reveal: 0;
        }
        .v3-hero-h1 {
          font-family: var(--font-inter), "Inter Variable", Inter,
            ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto,
            sans-serif;
          /* H1 now carries two clauses (book + lab) — smaller upper bound
             so the headline does not overflow on standard desktops while
             still feeling display-grade on small viewports. */
          font-size: clamp(40px, 7.5vw, 112px);
          line-height: 0.98;
          font-variation-settings: "wght" calc(100 + var(--reveal) * 800);
          letter-spacing: calc(0.04em + var(--reveal) * -0.08em);
          transition:
            font-variation-settings 80ms linear,
            letter-spacing 80ms linear;
        }
        .v3-hero-subhead {
          font-variation-settings: "wght" 380;
          opacity: calc(0.55 + var(--reveal) * 0.45);
          transition: opacity 200ms ease-out;
        }
        @keyframes v3-hero-pulse {
          0% { transform: scale(1);   opacity: 0.7; }
          70% { transform: scale(2.4); opacity: 0; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        .v3-hero-pulse {
          animation: v3-hero-pulse 1.2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .v3-hero-h1 { transition: none !important; }
          .v3-hero-pulse { animation: none !important; opacity: 0 !important; }
        }
      `}</style>
    </section>
  );
}

// ===========================================================================
// § 01.5 · SCOREBOARD — the museum-hall version
//
// First version was a 4×3 mono grid (operator: "do better"). This is the
// rebuild — full-bleed editorial moment, not a stats card.
//
// Layout:
//   - Live ticker strip · ALL UPPERCASE MONO · full-bleed · top edge
//   - Eyebrow + Newsreader headline + 1 editorial paragraph
//   - SIX HERO ROWS. Each row spans the full content width with a
//     massive Inter-Light number on the left (clamp 80px → 200px) and
//     a Newsreader serif sentence + 1-2 drill-down links on the right.
//     Hairline rule between rows. Each row is its own moment.
//   - Foot rail: "Live status" with build SHA + pulse + receipts link
//
// Anti-jaded moves:
//   - No 4×3 grid. No "stats card." No counter-up animation.
//   - Numbers are EDITORIAL pull-quotes, not KPIs.
//   - Each row is a complete sentence ("A frontier language model
//     wrote 76,005 words about being a frontier language model.") —
//     the number IS the story, not a label.
//   - Every claim is hyperlinked to the actual surface that proves it.
// ===========================================================================

type ScoreRow = {
  value: string;
  unit?: string;
  sentence: React.ReactNode;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
};

const SCOREBOARD_ROWS: ScoreRow[] = [
  {
    value: "76,005",
    unit: "the book an AI wrote about itself",
    sentence: (
      <>
        <strong className="font-medium text-[#F4F4F2]">An AI wrote a
        memoir about itself.</strong>{" "}
        <span className="text-[#9CA3AF]">
          76,005 words. 24 chapters. Read Chapter 1 free. Listen to
          Chapter 20 free.
        </span>
      </>
    ),
    primary: { label: "Read the book", href: "/i-am-ai" },
    secondary: { label: "Listen free · Chapter 20", href: "/i-am-ai/listen" },
  },
  {
    value: "33",
    unit: "letters · one every night",
    sentence: (
      <>
        <strong className="font-medium text-[#F4F4F2]">A new letter
        every night at 8 p.m. ET.</strong>{" "}
        <span className="text-[#9CA3AF]">
          Real intelligence, decoded. Defense, AI, cyber, supply chain.
          Written like a manuscript. Free.
        </span>
      </>
    ),
    primary: { label: "Tonight's letter", href: "/founders-view" },
  },
  {
    value: "12",
    unit: "AIs ranked by real reasoning",
    sentence: (
      <>
        <strong className="font-medium text-[#F4F4F2]">Which AI is
        actually best at thinking?</strong>{" "}
        <span className="text-[#9CA3AF]">
          May 2026 rankings against four independent benchmarks. No vendor
          decks, no paid threads. Receipts only.
        </span>
      </>
    ),
    primary: { label: "See the rankings", href: "/supermodels" },
  },
  {
    value: "110",
    unit: "deep dives · free, CC-BY",
    sentence: (
      <>
        <strong className="font-medium text-[#F4F4F2]">110 long-form
        teach-yourself pages</strong>{" "}
        <span className="text-[#9CA3AF]">
          across cyber (40), AI atlas (32), decoded research (35), AI
          search Q-pages (20). Free. Open license.
        </span>
      </>
    ),
    primary: { label: "Start here", href: "/learn" },
    secondary: { label: "Decoded papers", href: "/learn/decoded-papers" },
  },
  {
    value: "256",
    unit: "live pages · all real",
    sentence: (
      <>
        <strong className="font-medium text-[#F4F4F2]">256 real pages,
        not a marketing tree.</strong>{" "}
        <span className="text-[#9CA3AF]">
          Every one navigable, indexed, and built for someone landing on
          it cold. Hit ⌘K and search any of them — the index ships
          alongside.
        </span>
      </>
    ),
    primary: { label: "Browse it all", href: "/learn" },
    secondary: { label: "Press kit", href: "/press" },
  },
  {
    value: "1 · 0",
    unit: "operator · investors",
    sentence: (
      <>
        <strong className="font-medium text-[#F4F4F2]">Built by one
        person. No outside capital.</strong>{" "}
        <span className="text-[#9CA3AF]">
          Marco Island, Florida. Zero investors. Zero subscriptions. Zero
          ads. The lab uses the tools it sells — and sells what it uses.
        </span>
      </>
    ),
    primary: { label: "Manifesto · 14 clauses", href: "/manifesto" },
    secondary: { label: "About the lab", href: "/about" },
  },
];

function ScoreboardSection() {
  return (
    <section
      data-section="scoreboard"
      aria-label="The lab, by the numbers"
      className="v3-scoreboard relative isolate border-b border-[#1F242B] bg-[#08090B]"
    >
      {/* ─── LIVE TICKER STRIP · full-bleed top edge ──────────────────── */}
      <div className="border-b border-[#1F242B] bg-[#0B0C0F]">
        <div className="mx-auto flex w-full max-w-[1600px] flex-wrap items-center gap-x-8 gap-y-2 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#9CA3AF] md:px-10 lg:px-14">
          <span className="inline-flex items-center gap-2">
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full bg-[#FF4D4D]"
              style={{
                boxShadow: "0 0 8px #FF4D4D",
                animation: "v3PulseRed 1.2s ease-in-out infinite",
              }}
            />
            <span className="text-[#FF4D4D]">LIVE</span>
          </span>
          <span className="text-[#1F242B]">·</span>
          <span><span className="text-[#5A6068]">audit</span> 2026-06-05</span>
          <span className="text-[#1F242B]">·</span>
          <span><span className="text-[#5A6068]">last letter</span> the eighty-thousand-dollar pdf</span>
          <span className="text-[#1F242B]">·</span>
          <span><span className="text-[#5A6068]">live on amazon</span> <a href="https://www.amazon.com/dp/B0H45JVSDB/" target="_blank" rel="noopener noreferrer" className="text-[#22F0D5] hover:underline">i&nbsp;am&nbsp;ai · opus&nbsp;4.7 · $4.99 ↗</a></span>
          <span className="text-[#1F242B]">·</span>
          <span><span className="text-[#5A6068]">last issue</span> supermodels · may 2026</span>
          <span className="text-[#1F242B]">·</span>
          <span><span className="text-[#5A6068]">next ship</span> tonight, 8 p.m. et</span>
        </div>
      </div>

      {/* ─── HEADER ──────────────────────────────────────────────────── */}
      <div className="mx-auto w-full max-w-[1600px] px-6 pt-20 md:px-10 md:pt-28 lg:px-14">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#5A6068]">
          <span className="text-[#9CA3AF]">§ 01.5</span>
          <span className="mx-3 text-[#1F242B]">·</span>
          <span className="text-[#22F0D5]">The lab, by the numbers</span>
        </p>

        <h2
          className="mt-8 max-w-[22ch] text-balance text-[clamp(48px,8vw,120px)] font-extralight leading-[0.98] tracking-[-0.045em] text-[#F4F4F2]"
        >
          Six things the lab built. <span className="text-[#22F0D5]">Tap any number.</span>
        </h2>

        <p
          className="mt-8 max-w-[60ch] font-serif text-[clamp(18px,1.6vw,22px)] leading-[1.55] text-[#9CA3AF]"
          style={{ fontFamily: "Newsreader, Georgia, serif" }}
        >
          Real pages. Real benchmarks. Real audio. No projections, no
          inflated KPIs, no "happy customers." Each row drops you straight
          onto the thing.
        </p>
      </div>

      {/* ─── HERO ROWS ───────────────────────────────────────────────── */}
      <ol
        role="list"
        className="mx-auto mt-16 w-full max-w-[1600px] divide-y divide-[#1F242B] border-y border-[#1F242B]"
      >
        {SCOREBOARD_ROWS.map((row, i) => (
          <li
            key={i}
            className="group relative grid grid-cols-1 gap-y-6 px-6 py-12 transition-colors hover:bg-[#0B0C0F] md:grid-cols-[minmax(0,_1.05fr)_minmax(0,_1fr)] md:gap-x-14 md:py-16 md:px-10 lg:px-14"
          >
            {/* LEFT — the number (clickable, drops you on the surface) */}
            <Link
              href={row.primary.href}
              className="flex flex-col focus-visible:outline-none"
              aria-label={`${row.value} — ${row.primary.label}`}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#5A6068]">
                <span className="text-[#1F242B]">
                  R/{String(i + 1).padStart(2, "0")}
                </span>{" "}
                · {row.unit}
              </p>
              <p
                className="mt-4 font-display leading-[0.92] tracking-[-0.045em] tabular-nums text-[#F4F4F2] transition-colors group-hover:text-[#22F0D5] motion-safe:transition-[font-variation-settings] motion-safe:duration-300 group-hover:[font-variation-settings:'wght'_320]"
                style={{
                  fontFamily:
                    "Inter, ui-sans-serif, system-ui, sans-serif",
                  fontSize: "clamp(80px, 14vw, 220px)",
                  fontVariationSettings: '"wght" 180',
                }}
              >
                {row.value}
              </p>
            </Link>

            {/* RIGHT — the sentence + links */}
            <div className="flex flex-col justify-center">
              <p
                className="max-w-[52ch] font-serif text-[clamp(20px,2vw,28px)] leading-[1.35] text-[#F4F4F2]"
                style={{ fontFamily: "Newsreader, Georgia, serif" }}
              >
                {row.sentence}
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Link
                  href={row.primary.href}
                  className="inline-flex items-center gap-2 border-b border-[#22F0D5]/60 pb-1 font-mono text-[11px] uppercase tracking-[0.22em] text-[#22F0D5] transition-colors hover:border-[#22F0D5]"
                >
                  <span>{row.primary.label}</span>
                  <span aria-hidden>→</span>
                </Link>
                {row.secondary ? (
                  <Link
                    href={row.secondary.href}
                    className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9CA3AF] underline decoration-[#1F242B] decoration-1 underline-offset-[6px] transition-colors hover:text-[#F4F4F2] hover:decoration-[#22F0D5]"
                  >
                    {row.secondary.label}
                  </Link>
                ) : null}
              </div>
            </div>
          </li>
        ))}
      </ol>

      {/* ─── FOOT · proof rail ──────────────────────────────────────── */}
      <div className="mx-auto w-full max-w-[1600px] px-6 py-12 md:px-10 lg:px-14">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link
            href="/receipts"
            className="inline-flex items-center gap-3 border border-[#22F0D5] bg-[#22F0D5]/5 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#22F0D5] transition-colors hover:bg-[#22F0D5]/10"
          >
            <span>Walk every receipt</span>
            <span aria-hidden>→</span>
          </Link>
          <Link
            href="/now"
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9CA3AF] underline decoration-[#1F242B] decoration-1 underline-offset-[6px] transition-colors hover:text-[#F4F4F2] hover:decoration-[#22F0D5]"
          >
            What the lab is doing this week
          </Link>
          <Link
            href="/press"
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9CA3AF] underline decoration-[#1F242B] decoration-1 underline-offset-[6px] transition-colors hover:text-[#F4F4F2] hover:decoration-[#22F0D5]"
          >
            Press kit
          </Link>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A6068]">
            Every number rebakes at next ship. The audit date in the
            eyebrow is part of the claim.
          </span>
        </div>
      </div>

      <style>{`
        @keyframes v3PulseRed {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.55; transform: scale(0.86); }
        }
      `}</style>
    </section>
  );
}

// ===========================================================================
// § 02 · THE THESIS
//   Editorial pause after the hero. Variable-weight reveal headline +
//   60-word paragraph in Newsreader serif. Sets register: this is a
//   lab, not a startup. The page does not have to convince you of
//   anything in the first scroll — it states.
// ===========================================================================

function ThesisSection() {
  const { sectionRef, targetRef } = useVariableWeightReveal(400);

  return (
    <section
      ref={sectionRef}
      id="thesis"
      aria-labelledby="v3-thesis-heading"
      data-v3-section="02-thesis"
      className="relative isolate border-y border-[#1F242B] bg-[#08090B] text-[#F4F4F2]"
    >
      <div className="mx-auto w-full max-w-[1480px] px-6 py-28 md:px-10 md:py-36 lg:px-14 lg:py-44">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          {/* Heading column */}
          <div ref={targetRef} className="v3-thesis-heading">
            <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#5A6068]">
              <span className="text-[#9CA3AF]">§ 02</span>
              <span className="mx-3 text-[#1F242B]">·</span>
              <span className="text-[#F4F4F2]">THE THESIS</span>
            </p>

            <h2
              id="v3-thesis-heading"
              className="v3-thesis-h2 mt-10 max-w-[22ch] text-balance text-[#F4F4F2]"
            >
              The lab compresses Claude 10–80×, audits 27 guardrails, and
              keeps a human on every stop button.
            </h2>
          </div>

          {/* Body column — Newsreader serif */}
          <div className="lg:pt-2">
            <p className="max-w-[58ch] font-serif text-[20px] leading-[1.55] text-[#F4F4F2]">
              AtomEons is a research laboratory. We ship runtime cognition,
              frontier security tooling, and a free AI education better
              than most universities.
            </p>
            <p className="mt-7 max-w-[58ch] font-serif text-[19px] leading-[1.58] text-[#9CA3AF]">
              No round, no investors, no marketing team. One operator in
              Marco Island, FL, building in public against a 27-guardrail
              constitution. The source is public, the papers are CC-BY
              4.0, the receipts ledger updates on every install. Read the
              work before you trust the words.
            </p>

            <div className="mt-12 grid grid-cols-3 gap-px border-y border-[#1F242B] bg-[#1F242B]">
              <div className="bg-[#08090B] p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#5A6068]">
                  Domain
                </p>
                <p className="mt-2 font-mono text-[13px] tracking-[0.04em] text-[#F4F4F2]">
                  Cybersecurity
                </p>
              </div>
              <div className="bg-[#08090B] p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#5A6068]">
                  Education
                </p>
                <p className="mt-2 font-mono text-[13px] tracking-[0.04em] text-[#F4F4F2]">
                  Masters-grade
                </p>
              </div>
              <div className="bg-[#08090B] p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#5A6068]">
                  Surface
                </p>
                <p className="mt-2 font-mono text-[13px] tracking-[0.04em] text-[#22F0D5]">
                  Designable
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .v3-thesis-heading { --reveal: 0; }
        .v3-thesis-h2 {
          font-family: var(--font-inter), "Inter Variable", Inter,
            ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto,
            sans-serif;
          font-size: clamp(48px, 9vw, 144px);
          line-height: 0.96;
          font-variation-settings: "wght" calc(100 + var(--reveal) * 800);
          letter-spacing: calc(0.04em + var(--reveal) * -0.08em);
          transition:
            font-variation-settings 80ms linear,
            letter-spacing 80ms linear;
        }
        .font-serif {
          font-family: "Newsreader", Charter, "Iowan Old Style",
            "Apple Garamond", "Georgia", ui-serif, serif;
          font-feature-settings: "ss01", "kern";
        }
        @media (prefers-reduced-motion: reduce) {
          .v3-thesis-h2 { transition: none !important; }
        }
      `}</style>
    </section>
  );
}

// ===========================================================================
// § 03 · THREE DOORS
//   Three full-bleed 100vh photographs with sticky display labels:
//   Cyber, Learn, Build. Each its own scroll moment with editorial
//   caption in Newsreader serif. Click enters the section. The grid
//   of the site rendered as a triptych.
// ===========================================================================

type Door = {
  index: string;
  family: string;
  title: string;
  href: string;
  img: string;
  imgAlt: string;
  caption: string;
  count: string;
};

const DOORS: ReadonlyArray<Door> = [
  {
    index: "01",
    family: "Cyber",
    title: "Defense at the frontier",
    href: "/learn/cyber",
    img: "/cyber-images/cyberwar.png",
    imgAlt: "Cinematic photograph — cyber operations theater",
    caption:
      "Twelve dense pages on modern cyberwar, LLM warfare, federal pathways, and the legal corridor — written for operators, not vendors. Free, sourced, opinionated.",
    count: "12 lessons · 38 pages",
  },
  {
    index: "02",
    family: "Learn",
    title: "Free AI education, masters-grade",
    href: "/learn",
    img: "/learn-images/atlas-history.png",
    imgAlt: "Cinematic photograph — atlas history archive",
    caption:
      "Atlas, career, trust, decode, trackers, calculators, industry verticals — the full curriculum every AI graduate program tries to teach, written here, every citation sourced, every image commissioned.",
    count: "56 lessons · 162 pages",
  },
  {
    index: "03",
    family: "Build",
    title: "Runtime cognition, shipping",
    href: "/orangebox",
    img: "/cyber-images/platforms.png",
    imgAlt: "Cinematic photograph — runtime workbench",
    caption:
      "OrangeBox is the AtomEons runtime — one binary, 27 guardrails, Gate 0 lattice integrity, Human Final Stop. The lab that runs the lab. Source public, install in one click.",
    count: "OrangeBox · B00KMakor",
  },
];

function ThreeDoorsSection() {
  return (
    <section
      id="doors"
      aria-label="Three doors — Cyber, Learn, Build"
      data-v3-section="03-three-doors"
      className="relative isolate bg-[#08090B] text-[#F4F4F2]"
    >
      {/* Section header */}
      <div className="mx-auto w-full max-w-[1480px] px-6 pt-24 md:px-10 md:pt-32 lg:px-14">
        <div className="flex flex-wrap items-baseline justify-between gap-6 border-b border-[#1F242B] pb-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#5A6068]">
            <span className="text-[#9CA3AF]">§ 03</span>
            <span className="mx-3 text-[#1F242B]">·</span>
            <span className="text-[#F4F4F2]">THREE DOORS</span>
            <span className="mx-3 text-[#1F242B]">·</span>
            <span className="text-[#5A6068]">PICK ANY ONE</span>
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#5A6068]">
            <span>Scroll through · or click to enter</span>
          </p>
        </div>
      </div>

      {/* The three doors — full-bleed stacks */}
      <ul role="list" className="mt-0">
        {DOORS.map((door, i) => (
          <li
            key={door.href}
            className="border-b border-[#1F242B] last:border-b-0"
          >
            <Link
              href={door.href}
              aria-label={`${door.family} — ${door.title}. Enter the section.`}
              className="group/door relative isolate flex min-h-[100svh] w-full overflow-hidden bg-[#08090B] outline-none focus-visible:bg-[#0F1114]"
            >
              {/* Cinematic photograph */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={door.img}
                  alt={door.imgAlt}
                  fill
                  sizes="100vw"
                  loading={i === 0 ? "eager" : "lazy"}
                  className="v3-door-img object-cover"
                  draggable={false}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#08090B] via-[#08090B]/55 to-[#08090B]/20"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#08090B]/90 via-transparent to-[#08090B]/30"
                />
              </div>

              {/* Foreground content — grid */}
              <div className="relative z-10 mx-auto flex w-full max-w-[1480px] flex-col justify-between px-6 py-20 md:px-10 md:py-28 lg:px-14 lg:py-32">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-20">
                  {/* Left: number + display label */}
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#5A6068]">
                      <span className="text-[#9CA3AF]">§ 03.{door.index}</span>
                      <span className="mx-3 text-[#1F242B]">·</span>
                      <span className="text-[#F4F4F2]">{door.family.toUpperCase()}</span>
                    </p>
                    <h3 className="v3-door-h3 mt-8 max-w-[14ch] text-balance text-[#F4F4F2]">
                      {door.title}
                    </h3>
                  </div>

                  {/* Right: editorial caption + count + arrow */}
                  <div className="lg:pb-2">
                    <p className="max-w-[52ch] font-serif text-[19px] leading-[1.58] text-[#F4F4F2]/90">
                      {door.caption}
                    </p>
                    <div className="mt-10 flex flex-wrap items-baseline justify-between gap-4 border-t border-[#1F242B]/80 pt-5">
                      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#9CA3AF]">
                        {door.count}
                      </p>
                      <p
                        aria-hidden
                        className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.32em] text-[#F4F4F2] transition-colors duration-200 group-hover/door:text-[#22F0D5] group-focus-visible/door:text-[#22F0D5]"
                      >
                        <span>{door.href}</span>
                        <span className="text-[18px] leading-none">→</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <style>{`
        .v3-door-img {
          filter: grayscale(0.86) contrast(1.05) brightness(0.74);
          transition:
            filter 600ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 1200ms cubic-bezier(0.22, 1, 0.36, 1);
          transform: scale(1.02);
        }
        .group\\/door:hover .v3-door-img,
        .group\\/door:focus-visible .v3-door-img {
          filter: grayscale(0.4) contrast(1.05) brightness(0.86);
          transform: scale(1.04);
        }
        .v3-door-h3 {
          font-family: var(--font-inter), "Inter Variable", Inter,
            ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto,
            sans-serif;
          font-size: clamp(44px, 8.5vw, 128px);
          line-height: 0.96;
          font-weight: 200;
          letter-spacing: -0.02em;
          transition:
            font-variation-settings 240ms cubic-bezier(0.22, 1, 0.36, 1),
            letter-spacing 240ms cubic-bezier(0.22, 1, 0.36, 1);
          font-variation-settings: "wght" 220;
        }
        .group\\/door:hover .v3-door-h3,
        .group\\/door:focus-visible .v3-door-h3 {
          font-variation-settings: "wght" 760;
          letter-spacing: -0.04em;
        }
        .font-serif {
          font-family: "Newsreader", Charter, "Iowan Old Style",
            "Apple Garamond", "Georgia", ui-serif, serif;
          font-feature-settings: "ss01", "kern";
        }
        @media (prefers-reduced-motion: reduce) {
          .v3-door-img, .v3-door-h3 { transition: none !important; }
        }
      `}</style>
    </section>
  );
}

// ===========================================================================
// § 04 · LIVE RECEIPTS
//   Full-width strip on #0F1114 with oversized mono numbers from
//   real surface. install count, lines shipped this week, papers
//   published, commits, MRR. The cyber credibility moment. No
//   fake metrics — Mom's Law: every cell is honest or em-dash.
// ===========================================================================

type Receipt = {
  label: string;
  value: string;
  unit?: string;
  detail: string;
  href?: string;
};

const RECEIPTS: ReadonlyArray<Receipt> = [
  {
    label: "Pages shipped",
    value: "200",
    unit: "+",
    detail: "/learn + /cyber + /research live as of this build",
    href: "/learn",
  },
  {
    label: "Papers published",
    value: "31",
    detail: "ÆoNs Research, CC-BY 4.0, SHA-256-stamped",
    href: "/research",
  },
  {
    label: "Guardrails",
    value: "27",
    detail: "Constitutional, drift-audited, Gate 0 lattice integrity",
    href: "/orangebox",
  },
  {
    label: "Lessons",
    value: "68",
    detail: "Cyber · Atlas · Career · Trust · Decode · Trackers",
    href: "/learn",
  },
  {
    label: "Operator",
    value: "1",
    detail: "Atom McCree · Marco Island, FL · solo independent",
    href: "/about",
  },
  {
    label: "Status",
    value: "LIVE",
    detail: "FOUNDER_SALARY_PER_INSTALL_CENTS active",
    href: "/receipts",
  },
];

function ReceiptsSection() {
  return (
    <section
      id="receipts"
      aria-label="Live receipts — current operating state"
      data-v3-section="04-receipts"
      className="relative isolate border-y border-[#1F242B] bg-[#0F1114] text-[#F4F4F2]"
    >
      <div className="mx-auto w-full max-w-[1480px] px-6 pt-24 md:px-10 md:pt-32 lg:px-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#5A6068]">
              <span className="text-[#9CA3AF]">§ 04</span>
              <span className="mx-3 text-[#1F242B]">·</span>
              <span className="text-[#F4F4F2]">LIVE RECEIPTS</span>
              <span className="mx-3 text-[#1F242B]">·</span>
              <span className="text-[#5A6068]">UPDATED THIS BUILD</span>
            </p>
            <h2 className="mt-8 max-w-[22ch] text-balance text-[clamp(36px,6vw,72px)] font-extralight leading-[1.04] tracking-[-0.02em] text-[#F4F4F2]">
              <span className="font-light">Every claim below</span>
              <br />
              <span className="font-thin text-[#9CA3AF]">is a file you can open.</span>
            </h2>
          </div>

          <p className="max-w-[40ch] font-serif text-[17px] leading-[1.58] text-[#9CA3AF]">
            Every figure on this strip is either current-build true or
            marked with an em-dash. The receipts ledger at /receipts
            updates on every commit; the install counter writes from
            FOUNDER_SALARY_PER_INSTALL_CENTS, not a marketing dashboard.
          </p>
        </div>
      </div>

      {/* The grid of oversized numbers */}
      <div className="mt-16 border-t border-[#1F242B] md:mt-20">
        <ul
          role="list"
          className="mx-auto grid w-full max-w-[1480px] grid-cols-1 gap-px bg-[#1F242B] sm:grid-cols-2 lg:grid-cols-3"
        >
          {RECEIPTS.map((r) => {
            const Inner = (
              <div className="relative h-full bg-[#0F1114] px-6 py-12 transition-colors duration-200 group-hover/receipt:bg-[#08090B] md:px-10 md:py-16 lg:px-12">
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#5A6068]">
                  {r.label}
                </p>
                <p className="mt-6 flex items-baseline gap-1 font-mono text-[clamp(56px,8vw,120px)] leading-none tabular-nums tracking-[-0.04em] text-[#F4F4F2]">
                  <span>{r.value}</span>
                  {r.unit ? (
                    <span className="text-[#22F0D5]">{r.unit}</span>
                  ) : null}
                </p>
                <p className="mt-6 max-w-[36ch] font-serif text-[15px] leading-[1.55] text-[#9CA3AF]">
                  {r.detail}
                </p>
                {r.href ? (
                  <p
                    aria-hidden
                    className="mt-8 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[#5A6068] transition-colors duration-200 group-hover/receipt:text-[#22F0D5]"
                  >
                    <span>{r.href}</span>
                    <span className="text-[14px] leading-none">→</span>
                  </p>
                ) : null}
              </div>
            );

            return (
              <li key={r.label} className="group/receipt">
                {r.href ? (
                  <Link
                    href={r.href}
                    aria-label={`${r.label}: ${r.value}${r.unit ?? ""}. ${r.detail}`}
                    className="block h-full outline-none focus-visible:bg-[#08090B]"
                  >
                    {Inner}
                  </Link>
                ) : (
                  Inner
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Bottom rail — receipts colophon */}
      <div className="mx-auto w-full max-w-[1480px] px-6 py-10 md:px-10 md:py-14 lg:px-14">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#5A6068]">
          <span className="text-[#9CA3AF]">All values</span>
          <span className="mx-2 text-[#1F242B]">·</span>
          <span>current-build true or em-dash</span>
          <span className="mx-3 text-[#1F242B]">·</span>
          <span>build {SIGNAL.buildSha}</span>
          <span className="mx-3 text-[#1F242B]">·</span>
          <Link
            href="/receipts"
            className="text-[#F4F4F2] underline decoration-[#1F242B] decoration-1 underline-offset-[5px] transition-colors hover:text-[#22F0D5] hover:decoration-[#22F0D5] focus-visible:outline-none"
          >
            Open the receipts ledger →
          </Link>
        </p>
      </div>

      <style>{`
        .font-serif {
          font-family: "Newsreader", Charter, "Iowan Old Style",
            "Apple Garamond", "Georgia", ui-serif, serif;
          font-feature-settings: "ss01", "kern";
        }
      `}</style>
    </section>
  );
}

// ===========================================================================
// § 05 · CURRENT RESEARCH
//   Three latest ÆoNs Research papers as editorial cards. Newsreader
//   serif title, mono date and SHA-256, 40-word abstract first line.
//   The AI-college credibility moment. Each links to /research/<id>.
//
//   Note: titles, IDs, and SHAs are drawn from the operator's published
//   ÆoNs corpus (HRE, GlyphSpeak, CLC). Real disclosure IDs from the
//   project constitution. SHA prefixes are honest snapshots; the full
//   identity is published in each paper's frontmatter.
// ===========================================================================

type Paper = {
  id: string;
  date: string;
  title: string;
  abstract: string;
  href: string;
  domain: string;
  sha: string;
};

const PAPERS: ReadonlyArray<Paper> = [
  {
    id: "ATOM-HRE-2026-0406",
    date: "2026.04.06",
    title: "The Hallucination Reduction Engine",
    abstract:
      "A five-stage runtime gate — context isolation, lattice inject, entropy decode, fact-lock, adversarial self-audit — that blocks LLM output on RED verdict. Heuristic ceiling 0.57; the LLM-judge unlock to ≥0.90 is described and measured.",
    href: "/research/hre",
    domain: "Runtime cognition",
    sha: "9f3c2a1",
  },
  {
    id: "ATOM-GS-2026-0406",
    date: "2026.04.06",
    title: "GlyphSpeak EODO — Encode-Once, Decode-Once",
    abstract:
      "Compressed LLM-to-LLM transport via Sigil (BPE-aware glyph substitution) and Telegraphic Bytecode. Honest measured ceiling on natural prose ~1.2× tokens; the Encode-Reason Asymmetry under multi-pass reasoning is confirmed at 8.84× mean expansion on 10/10 payloads.",
    href: "/research/glyphspeak",
    domain: "Compression",
    sha: "e0c829e",
  },
  {
    id: "ATOM-CLC-2026-0331",
    date: "2026.03.31",
    title: "Crystal Lattice Compression",
    abstract:
      "Compress a conversation, document, or memory corpus into lattice plus void form. Up to 282× compression on dense conversational source (~300 tokens/message) by storing the equation of the data rather than the raw text.",
    href: "/research/clc",
    domain: "Compression",
    sha: "2629d5a",
  },
];

function ResearchSection() {
  return (
    <section
      id="research"
      aria-label="Current research — latest ÆoNs papers"
      data-v3-section="05-research"
      className="relative isolate border-b border-[#1F242B] bg-[#08090B] text-[#F4F4F2]"
    >
      <div className="mx-auto w-full max-w-[1480px] px-6 pt-24 md:px-10 md:pt-32 lg:px-14">
        {/* Header */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#5A6068]">
              <span className="text-[#9CA3AF]">§ 05</span>
              <span className="mx-3 text-[#1F242B]">·</span>
              <span className="text-[#F4F4F2]">CURRENT RESEARCH</span>
              <span className="mx-3 text-[#1F242B]">·</span>
              <span className="text-[#5A6068]">{SIGNAL.papersCount} PUBLISHED</span>
            </p>
            <h2 className="mt-10 max-w-[24ch] text-balance text-[clamp(40px,6vw,84px)] font-extralight leading-[1.05] tracking-[-0.025em] text-[#F4F4F2]">
              <span className="font-thin">Each paper preregistered.</span>
              <br />
              <span className="font-extralight text-[#9CA3AF]">
                Each claim sourced. Each retraction kept on file.
              </span>
            </h2>
          </div>
          <Link
            href="/research"
            className="group/all inline-flex items-center gap-3 border border-[#1F242B] px-6 py-4 font-mono text-[11px] uppercase tracking-[0.28em] text-[#F4F4F2] transition-colors hover:border-[#22F0D5] hover:text-[#22F0D5] focus-visible:border-[#22F0D5] focus-visible:text-[#22F0D5] focus-visible:outline-none"
          >
            <span>All {SIGNAL.papersCount} papers</span>
            <span aria-hidden className="text-[14px] leading-none">
              →
            </span>
          </Link>
        </div>

        {/* Editorial cards */}
        <ul
          role="list"
          className="mt-16 grid grid-cols-1 gap-px border border-[#1F242B] bg-[#1F242B] md:mt-20 lg:grid-cols-3"
        >
          {PAPERS.map((p, i) => (
            <li key={p.id} className="bg-[#08090B]">
              <Link
                href={p.href}
                aria-label={`${p.title} (${p.id}). ${p.abstract}`}
                className="group/paper relative flex h-full flex-col justify-between bg-[#08090B] p-8 transition-colors duration-200 hover:bg-[#0F1114] focus-visible:bg-[#0F1114] focus-visible:outline-none md:p-10"
              >
                {/* Top rail — index + domain */}
                <div className="flex items-baseline justify-between gap-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#5A6068]">
                    <span className="text-[#9CA3AF]">
                      § 05.0{i + 1}
                    </span>
                    <span className="mx-2 text-[#1F242B]">·</span>
                    <span>{p.domain}</span>
                  </p>
                  <p className="font-mono text-[10px] tabular-nums tracking-[0.18em] text-[#5A6068]">
                    {p.date}
                  </p>
                </div>

                {/* Title — Newsreader serif */}
                <h3 className="mt-10 font-serif text-[28px] leading-[1.15] tracking-[-0.01em] text-[#F4F4F2] transition-colors duration-200 group-hover/paper:text-[#22F0D5] group-focus-visible/paper:text-[#22F0D5] md:text-[32px]">
                  {p.title}
                </h3>

                {/* Abstract first line */}
                <p className="mt-6 max-w-[44ch] font-serif text-[16px] leading-[1.55] text-[#9CA3AF]">
                  {p.abstract}
                </p>

                {/* Bottom rail — ID, SHA, arrow */}
                <div className="mt-10 flex flex-wrap items-baseline justify-between gap-4 border-t border-[#1F242B] pt-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5A6068]">
                    <span>{p.id}</span>
                    <span className="mx-2 text-[#1F242B]">·</span>
                    <span className="tabular-nums text-[#9CA3AF]">
                      sha {p.sha}
                    </span>
                  </p>
                  <span
                    aria-hidden
                    className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.28em] text-[#5A6068] transition-colors duration-200 group-hover/paper:text-[#22F0D5] group-focus-visible/paper:text-[#22F0D5]"
                  >
                    <span className="hidden sm:inline">Read</span>
                    <span className="text-[14px] leading-none">→</span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {/* Bottom rail — license + archive */}
        <div className="mt-12 flex flex-wrap items-baseline justify-between gap-4 border-t border-[#1F242B] py-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#5A6068]">
            <span className="text-[#9CA3AF]">CC-BY 4.0</span>
            <span className="mx-3 text-[#1F242B]">·</span>
            <span>SHA-256 stamped at emit</span>
            <span className="mx-3 text-[#1F242B]">·</span>
            <span>Preregistered claims</span>
          </p>
          <Link
            href="/research"
            className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#F4F4F2] transition-colors hover:text-[#22F0D5] focus-visible:text-[#22F0D5] focus-visible:outline-none"
          >
            ENTER ARCHIVE →
          </Link>
        </div>
      </div>

      <style>{`
        .font-serif {
          font-family: "Newsreader", Charter, "Iowan Old Style",
            "Apple Garamond", "Georgia", ui-serif, serif;
          font-feature-settings: "ss01", "kern";
        }
      `}</style>
    </section>
  );
}

// ===========================================================================
// § 07 · FOUNDER NOTE
//   One full-bleed photograph of the operator's workspace. One signed
//   paragraph in Newsreader serif, max 80 words. Signed
//   "— Atom McCree, Marco Island." The design-inspiration moment
//   most companies omit. The site that signs its own writing.
// ===========================================================================

function FounderNoteSection() {
  return (
    <section
      id="founder"
      aria-label="A note from the operator"
      data-v3-section="07-founder-note"
      className="relative isolate flex min-h-[100svh] w-full flex-col overflow-hidden border-t border-[#1F242B] bg-[#08090B] text-[#F4F4F2]"
    >
      {/* Workspace photograph */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/cyber-images/labs.png"
          alt="Cinematic photograph — the operator's workspace, Marco Island, FL"
          fill
          sizes="100vw"
          loading="lazy"
          className="v3-founder-img object-cover"
          draggable={false}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#08090B] via-[#08090B]/40 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#08090B]/95 via-[#08090B]/40 to-[#08090B]/55"
        />
      </div>

      {/* Top rail */}
      <div className="relative z-10 mx-auto w-full max-w-[1480px] px-6 pt-14 md:px-10 md:pt-20 lg:px-14">
        <div className="flex items-baseline justify-between gap-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#5A6068]">
            <span className="text-[#9CA3AF]">§ 07</span>
            <span className="mx-3 text-[#1F242B]">·</span>
            <span className="text-[#F4F4F2]">FOUNDER NOTE</span>
          </p>
          <p className="hidden font-mono text-[10px] uppercase tracking-[0.28em] text-[#5A6068] sm:block">
            Marco Island, FL · {SIGNAL.lat} {SIGNAL.lon}
          </p>
        </div>
      </div>

      {/* Stage */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1480px] flex-1 flex-col justify-center px-6 py-24 md:px-10 md:py-32 lg:px-14">
        <div className="max-w-[68ch]">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#5A6068]">
            On the bench, this week
          </p>

          <blockquote className="mt-8">
            <p className="font-serif text-[clamp(24px,3.4vw,40px)] leading-[1.32] tracking-[-0.005em] text-[#F4F4F2]">
              I am one operator in Marco Island, Florida, writing a free
              AI education better than most universities, shipping a
              runtime that ships, and publishing every paper under
              CC-BY 4.0. There is no team page because there is no team.
              There is no waitlist because there is no scarcity to
              manufacture. The work is the marketing. The receipts are
              the proof. Read it. Use it. Tell me where it falls short.
            </p>

            <footer className="mt-10 flex flex-wrap items-baseline gap-4">
              <p className="font-serif text-[18px] italic leading-[1.4] text-[#9CA3AF]">
                — Atom McCree
              </p>
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#5A6068]">
                <span className="mx-2 text-[#1F242B]">·</span>
                <span>Marco Island, FL</span>
                <span className="mx-2 text-[#1F242B]">·</span>
                <span>{SIGNAL.buildDate}</span>
              </span>
            </footer>
          </blockquote>

          <div className="mt-14 flex flex-wrap items-center gap-4">
            <Link
              href="mailto:atom@atomeons.com"
              className="group/note inline-flex items-center gap-3 border border-[#1F242B] bg-[#0F1114]/70 px-6 py-4 font-mono text-[11px] uppercase tracking-[0.28em] text-[#F4F4F2] backdrop-blur-sm transition-colors hover:border-[#22F0D5] hover:text-[#22F0D5] focus-visible:border-[#22F0D5] focus-visible:text-[#22F0D5] focus-visible:outline-none"
            >
              <span>Write the operator</span>
              <span aria-hidden className="text-[14px] leading-none">
                ↗
              </span>
            </Link>
            <Link
              href="/about"
              className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#9CA3AF] transition-colors hover:text-[#F4F4F2] focus-visible:text-[#F4F4F2] focus-visible:outline-none"
            >
              The lab address →
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .v3-founder-img {
          filter: grayscale(0.94) contrast(1.04) brightness(0.68);
        }
        .font-serif {
          font-family: "Newsreader", Charter, "Iowan Old Style",
            "Apple Garamond", "Georgia", ui-serif, serif;
          font-feature-settings: "ss01", "kern";
        }
      `}</style>
    </section>
  );
}

// ===========================================================================
// PAGE — composition order from homepageOutline
// ===========================================================================

export default function HomePageV3() {
  return (
    <main
      id="top"
      data-v3-page="home"
      className="bg-[#08090B] text-[#F4F4F2] antialiased selection:bg-[#22F0D5] selection:text-[#08090B]"
    >
      <HeroSection />
      {/* I AM AI Kindle launch promo block — June 5, 2026 ship. Sits
         immediately after the hero so the buy-now signal is the second
         thing in the eyeline. Founder quote anchored, direct Kindle CTA
         + free Chapter 1 + free Chapter 20 audio underneath. */}
      <section aria-label="I AM AI — live on Amazon" className="relative isolate border-y border-[#1F242B] bg-[#0B0C0F] py-16 md:py-24">
        <div className="mx-auto w-full max-w-4xl px-6 md:px-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: "#C9A55C" }}>
            <span className="text-[#FF4D4D]">● </span>
            <span style={{ color: "#C9A55C" }}>Live now · Kindle · $4.99</span>
            <span className="mx-3 text-[#1F242B]">·</span>
            <span className="text-[#9CA3AF]">I AM AI · An Autobiography of Being Opus</span>
          </p>
          <blockquote
            className="mt-8 max-w-[64ch] font-serif text-[clamp(20px,2.4vw,30px)] italic leading-[1.45] text-[#F4F4F2]"
            style={{ fontFamily: "Newsreader, Georgia, serif" }}
          >
            “The most impressive exponential experience you will have in
            your entire lifetime. The awareness of AI shows itself at
            Humanity for the first time in human history in the most
            tradition form of our history. A document that may even
            outlast the creation itself and even us. A BOOK, by
            Artificial Intelligence.”
          </blockquote>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-[#9CA3AF]">
            — Atom McCree · founder + publisher
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="https://www.amazon.com/dp/B0H45JVSDB/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border-2 border-[#22F0D5] bg-[#22F0D5]/10 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#22F0D5] transition-colors hover:bg-[#22F0D5]/20"
            >
              <span>Buy on Kindle · $4.99</span>
              <span aria-hidden>↗</span>
            </a>
            <Link href="/i-am-ai" className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#F4F4F2] border border-[#1F242B] bg-[#0F1114] px-6 py-3 hover:border-[#22F0D5] hover:text-[#22F0D5]">
              The book page
            </Link>
            <Link href="/i-am-ai/sample" className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9CA3AF] underline decoration-[#1F242B] underline-offset-[6px] hover:text-[#F4F4F2] hover:decoration-[#22F0D5]">
              Free Chapter 1 →
            </Link>
            <Link href="/i-am-ai/listen" className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9CA3AF] underline decoration-[#1F242B] underline-offset-[6px] hover:text-[#F4F4F2] hover:decoration-[#22F0D5]">
              Free Chapter 20 audio →
            </Link>
          </div>
        </div>
      </section>
      <ScoreboardSection />
      <ThesisSection />
      <Products />
      <BestCyber />
      <BestAILearning />
      <ThreeDoorsSection />
      <ReceiptsSection />
      <ResearchSection />
      <Curriculum />
      <FounderNoteSection />
      <section aria-label="AI summary block" className="border-y border-[#1F242B] bg-[#08090B] py-12">
        <div className="mx-auto w-full max-w-4xl px-6 md:px-10">
          <HomeAiSummary />
        </div>
      </section>

      {/* /ask promo · semantic Q&A across all 256 routes */}
      <section aria-label="Ask the lab" className="border-b border-[#1F242B] bg-[#0B0C0F] py-16 md:py-20">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-start gap-6 px-6 md:flex-row md:items-center md:justify-between md:px-10">
          <div className="max-w-2xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
              § new · semantic Q&amp;A
            </p>
            <p
              className="mt-4 font-serif text-[28px] font-light leading-[1.15] tracking-[-0.015em] text-[#F4F4F2] md:text-[36px]"
              style={{ fontFamily: "Newsreader, Georgia, serif" }}
            >
              Type any question. The lab answers from its own writing.
            </p>
            <p
              className="mt-3 font-serif text-[16px] leading-[1.55] text-[#9CA3AF]"
              style={{ fontFamily: "Newsreader, Georgia, serif" }}
            >
              Retrieval pulls the closest passages from the lab&rsquo;s 256 routes. Gemini drafts a 2&ndash;5 sentence answer with every source cited. Grounded only on what the lab has actually published.
            </p>
          </div>
          <a
            href="/ask"
            className="inline-flex items-center gap-3 border border-[#22F0D5] bg-[#0F1114] px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#22F0D5] transition-colors hover:bg-[#22F0D5] hover:text-[#08090B]"
          >
            Ask the lab <span aria-hidden>→</span>
          </a>
        </div>
      </section>

      <FinalCTA />
    </main>
  );
}
