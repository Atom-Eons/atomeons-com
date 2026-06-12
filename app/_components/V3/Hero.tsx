"use client";

/**
 * V3/Hero — noir-cinema homepage hero.
 *
 * Direction: D7 noir-cinema. Three identities held in one composition:
 *   1. Cybersecurity gravitas    — full-bleed photographic mass, live-state panel
 *   2. AI college depth          — §-indexed register, Newsreader-ready editorial cadence
 *   3. Design-inspiration crown  — Variable-Weight Reveal as scroll signature
 *
 * Signature move — Variable-Weight Reveal:
 *   The display headline animates `font-variation-settings: 'wght' N` from
 *   100 (hairline) to 900 (black) across the first 400px of scroll, while
 *   `letter-spacing` tightens from 0.04em to -0.04em. The line does not
 *   move; it *thickens*, like a thought solidifying. One font file
 *   (Inter Variable's real weight axis), zero faux-bolding, zero layout
 *   shift. This is the screenshot vector for designer Twitter.
 *
 * Trust move — Live Signal Panel:
 *   Hairline-bordered panel bottom-right. Pulls /api/sales-count every
 *   60s for the install count; renders build hash + commit SHA from the
 *   props the layout already has access to (Vercel env). A 1.2s-pulsing
 *   #FF4D4D dot is the "lab is operating, not displaying" marker. This
 *   is the trust vector for cybersecurity buyers.
 *
 * Photographic mass:
 *   /cyber-images/llm-warfare.png is the Magnum-grade frame the homepage
 *   outline calls for. 100vh, object-cover, no Ken Burns, no motion on
 *   arrival. The image grades down through a vertical gradient from the
 *   base #08090B at 0% to transparent at 60% — copy stays legible at any
 *   viewport without overlaying a flat scrim that flattens the photo.
 *
 * No CTA above the fold — per the noir-cinema outline. The thesis is the
 * CTA; the curriculum wall and live receipts in § 03 / § 04 do the work
 * a hero button used to do.
 */

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type SalesData = {
  ok: boolean;
  ts: string;
  total_sales: number;
  refunds: number;
  net_buyers: number;
  goal: number;
  remaining: number;
  progress_pct: number;
};

/**
 * Build identity — these read from Vercel env at build time on the
 * server, fall back to dev placeholders on local. They render as static
 * monospaced strings in the Live Signal Panel; the only *live* value
 * in the panel is the install count from /api/sales-count.
 *
 * NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA is set automatically by Vercel for
 * every deploy. We slice the first 7 chars to match `git log --oneline`.
 */
const COMMIT_SHA =
  (process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ?? "0000000").slice(0, 7);
const BUILD_TAG = process.env.NEXT_PUBLIC_BUILD_TAG ?? "v3.0.0-noir";

export function Hero() {
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const [installs, setInstalls] = useState<number | null>(null);

  /**
   * Variable-Weight Reveal — the signature.
   *
   * rAF-throttled scroll handler. Maps `window.scrollY` in [0, 400] to:
   *   weight   : 100 → 900
   *   tracking : +0.04em → -0.04em
   *
   * Writes directly to the element's `style.fontVariationSettings`
   * and `style.letterSpacing` to bypass React re-render churn on every
   * scroll tick. Respects `prefers-reduced-motion`: if reduced, the
   * headline locks at the *finished* state (weight 900, tightened) on
   * mount so reduced-motion users get the destination, not the journey.
   */
  useEffect(() => {
    const el = headlineRef.current;
    if (!el) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      el.style.fontVariationSettings = `"wght" 900`;
      el.style.letterSpacing = "-0.04em";
      return;
    }

    let raf = 0;
    const range = 400; // px of scroll over which the reveal completes
    const weightFrom = 100;
    const weightTo = 900;
    const trackFrom = 0.04; // em
    const trackTo = -0.04; // em

    const apply = () => {
      const y = Math.min(Math.max(window.scrollY, 0), range);
      const t = y / range; // 0 .. 1
      const weight = Math.round(weightFrom + (weightTo - weightFrom) * t);
      const track = trackFrom + (trackTo - trackFrom) * t;
      el.style.fontVariationSettings = `"wght" ${weight}`;
      el.style.letterSpacing = `${track.toFixed(4)}em`;
      raf = 0;
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(apply);
    };

    apply(); // prime initial state at weight 100
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  /**
   * Install counter — pulls /api/sales-count every 60s. Same endpoint
   * SalesCounter.tsx uses; reusing it keeps the source of truth single.
   * On error, the panel renders without the install line; it does NOT
   * hide the panel — the dot, hash, and tag still serve as the live-
   * state marker. Build-in-public stakes are too important to fail open.
   */
  useEffect(() => {
    let cancelled = false;
    const fetchInstalls = async () => {
      try {
        const res = await fetch("/api/sales-count", { cache: "no-store" });
        if (!res.ok) return;
        const json: SalesData = await res.json();
        if (!cancelled && typeof json.net_buyers === "number") {
          setInstalls(json.net_buyers);
        }
      } catch {
        /* fail-silent — panel still renders without the install line */
      }
    };
    fetchInstalls();
    const id = setInterval(fetchInstalls, 60_000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  return (
    <section
      aria-label="ÆoNs Research Laboratory — homepage hero"
      className="relative isolate flex h-[100svh] min-h-[640px] w-full flex-col overflow-hidden bg-[#08090B] text-[#F4F4F2]"
    >
      {/* ───── Photographic mass — 100vh, full-bleed, no motion ───── */}
      <Image
        src="/cyber-images/llm-warfare.png"
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        quality={95}
        className="pointer-events-none absolute inset-0 -z-10 object-cover opacity-[0.55] [filter:grayscale(1)_contrast(1.08)_brightness(0.78)]"
      />

      {/*
       * Grade — vertical gradient from base #08090B at 0% to transparent
       * around 60% to base at 100%. Copy legibility without flat scrim.
       * Plus a horizontal grade from left so the bottom-left display
       * sentence holds against any photographic noise in that quadrant.
       */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[5]"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,9,11,0.92) 0%, rgba(8,9,11,0.35) 38%, rgba(8,9,11,0.55) 72%, rgba(8,9,11,0.96) 100%), linear-gradient(90deg, rgba(8,9,11,0.7) 0%, rgba(8,9,11,0.0) 55%)",
        }}
      />

      {/* Hairline frame — establishes the editorial register at the edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-6 top-6 h-px bg-[#7a818a]/30 md:inset-x-10 md:top-10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-6 bottom-6 h-px bg-[#7a818a]/30 md:inset-x-10 md:bottom-10"
      />

      {/* ───── Eyebrow — top-left, monospaced, location-anchored ───── */}
      <header className="relative z-10 flex items-start justify-between gap-6 px-6 pt-10 md:px-10 md:pt-14">
        <p className="font-mono text-[10px] uppercase leading-[1.6] tracking-[0.28em] text-[#9CA3AF] md:text-[11px]">
          <span className="text-[#F4F4F2]">ÆoNs Research Laboratory</span>
          <span className="mx-2 text-[#7a818a]">·</span>
          <span>Marco Island, FL</span>
          <span className="mx-2 text-[#7a818a]">·</span>
          <span>Est. 2024</span>
        </p>
        <p className="hidden font-mono text-[10px] uppercase leading-[1.6] tracking-[0.28em] text-[#7a818a] md:block md:text-[11px]">
          § 00 · Hero
        </p>
      </header>

      {/* spacer — push display sentence to the bottom quadrant */}
      <div className="flex-1" />

      {/* ───── Display sentence — bottom-left, the variable-weight subject ───── */}
      <div className="relative z-10 grid grid-cols-1 gap-10 px-6 pb-12 md:grid-cols-12 md:gap-8 md:px-10 md:pb-16">
        <div className="md:col-span-9">
          {/* Section index — sits just above the headline, mono register */}
          <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.32em] text-[#9CA3AF] md:text-[11px]">
            <span className="inline-block h-px w-8 translate-y-[-3px] bg-[#9CA3AF] align-middle" />
            <span className="ml-3">A research laboratory, not a startup</span>
          </p>

          <h1
            ref={headlineRef}
            className="font-sans text-[#F4F4F2]"
            style={{
              fontFamily:
                "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
              fontSize: "clamp(56px, 12vw, 200px)",
              lineHeight: 0.92,
              fontVariationSettings: '"wght" 100',
              letterSpacing: "0.04em",
              // Hardware-promote so font-variation tween stays buttery
              // on lower-end laptops without forcing repaints upstream.
              willChange: "font-variation-settings, letter-spacing",
              textWrap: "balance",
            }}
          >
            We ship runtime cognition,
            <br />
            frontier security,
            <br />
            and a free education
            <br />
            better than most universities
          </h1>

          {/* Sub-line — restrained, sourced, Atom McCree not Apple ad copy */}
          <p className="mt-10 max-w-[44ch] text-[15px] leading-[1.65] text-[#9CA3AF] md:text-[17px] md:leading-[1.6]">
            One operator, Marco Island. Open research papers,
            production-grade tooling, a curriculum that grades against
            the work — not the credential.
            <span className="mx-1 text-[#7a818a]">/</span>
            Scroll for the thesis.
          </p>
        </div>

        {/* ───── Live Signal Panel — bottom-right, hairline, pulsing ───── */}
        <aside
          aria-label="Live laboratory signal"
          className="md:col-span-3 md:self-end"
        >
          <div className="relative w-full border border-[#1F242B] bg-[#0F1114]/60 p-5 backdrop-blur-[6px] md:max-w-[320px] md:ml-auto">
            {/* Header row */}
            <div className="flex items-center justify-between border-b border-[#1F242B] pb-3">
              <span className="font-mono text-[9px] uppercase tracking-[0.32em] text-[#9CA3AF]">
                Live · Signal
              </span>
              <span className="relative inline-flex h-2 w-2">
                <span
                  aria-hidden
                  className="absolute inset-0 inline-flex h-full w-full animate-ping rounded-full bg-[#FF4D4D] opacity-70"
                  style={{ animationDuration: "1.2s" }}
                />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF4D4D]" />
              </span>
            </div>

            {/* Rows — monospace key/value, lab-instrument register */}
            <dl className="mt-3 space-y-2.5 font-mono text-[11px] leading-[1.4]">
              <div className="flex items-baseline justify-between gap-3">
                <dt className="uppercase tracking-[0.22em] text-[#7a818a]">
                  Build
                </dt>
                <dd className="truncate text-[#F4F4F2]">{BUILD_TAG}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <dt className="uppercase tracking-[0.22em] text-[#7a818a]">
                  Commit
                </dt>
                <dd className="text-[#F4F4F2]">
                  <span className="text-[#7a818a]">@</span>
                  {COMMIT_SHA}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <dt className="uppercase tracking-[0.22em] text-[#7a818a]">
                  Installs
                </dt>
                <dd className="text-[#22F0D5] tabular-nums">
                  {installs === null ? (
                    <span className="text-[#7a818a]">— —</span>
                  ) : (
                    installs.toLocaleString("en-US")
                  )}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <dt className="uppercase tracking-[0.22em] text-[#7a818a]">
                  Locus
                </dt>
                <dd className="text-[#F4F4F2]">25.94°N 81.72°W</dd>
              </div>
            </dl>

            {/* Footer note — sourced, lab-grade, no marketing copy */}
            <p className="mt-4 border-t border-[#1F242B] pt-3 font-mono text-[9px] uppercase leading-[1.6] tracking-[0.22em] text-[#7a818a]">
              live stripe count · 60s refresh
            </p>
          </div>
        </aside>
      </div>

      {/* ───── Scroll affordance — bottom-center, hairline, no chrome ───── */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2 md:bottom-10"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[9px] uppercase tracking-[0.32em] text-[#7a818a]">
            Scroll · § 01
          </span>
          <span className="block h-10 w-px bg-gradient-to-b from-[#7a818a] to-transparent" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
