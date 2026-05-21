"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

/**
 * HeroPillarSequence — four-pillar variable-weight H1.
 *
 * Replaces HeroLabManifest on the homepage. The old file is preserved at
 * app/_components/v2/HeroLabManifest.tsx — operator can revert by swapping
 * the import in page.tsx.
 *
 * Four clauses, each with a data-pillar attribute and accent color.
 * IntersectionObserver drives the is-active class which transitions:
 *   - font-variation-settings 'wght' 200 → 700
 *   - opacity 0.35 → 1
 *
 * Variable-font axis gracefully degrades: if Inter Variable is not loaded,
 * the weight transition falls back to whatever weight the font supplies.
 * The opacity transition is font-agnostic and always works.
 *
 * No CTAs here. Pillar sections below carry the action layer.
 */

const PILLARS = [
  {
    id: "use-ai",
    text: "Use AI.",
    style: { color: "#22F0D5" } as React.CSSProperties,
    gradient: false,
  },
  {
    id: "make-money",
    text: "Make money.",
    style: { color: "#FF7A1A" } as React.CSSProperties,
    gradient: false,
  },
  {
    id: "real-info",
    text: "Know the truth.",
    style: { color: "#F2F4F5" } as React.CSSProperties,
    gradient: false,
  },
  {
    id: "research",
    text: "Break new ground.",
    style: {} as React.CSSProperties,
    gradient: true,
  },
] as const;

const STAT_ITEMS = [
  "12 PAPERS",
  "11 LANES",
  "NIGHTLY 8pm ET",
  "60/60 SMOKE",
  "MARCO ISLAND",
];

export function HeroPillarSequence() {
  const clauseRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-active");
          }
          // No removal on exit — once activated, stays lit.
          // Keeps the hero feeling resolved, not flickering on scroll.
        }
      },
      { threshold: 0.2 }
    );

    const current = clauseRefs.current;
    for (const el of current) {
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="relative isolate overflow-hidden bg-[#000] py-32 md:py-40 text-[#F2F4F5]"
    >
      {/* Lead image — HAL 9000 lens (Æ Research's most loaded frame).
          Sits at z-0 behind everything. Heavy dark vignette so the
          variable-weight H1 retains AAA contrast. Wired to the
          Lessons From Sci-Fi monograph in the bottom-right caption. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <Image
          src="/research/lessons-from-sci-fi/stills/2001-hal-9000.png"
          alt=""
          width={1376}
          height={864}
          priority
          sizes="100vw"
          className="h-full w-full object-cover opacity-[0.18]"
        />
        {/* multi-layer vignette — strong from sides and bottom, lighter
            top so the eyebrow chip has some image behind it */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black opacity-95" />
      </div>

      {/* ambient radials — matched to HeroLabManifest palette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(55% 50% at 15% 60%, rgba(34,240,213,0.10) 0%, transparent 65%), " +
            "radial-gradient(40% 35% at 85% 25%, rgba(255,122,26,0.08) 0%, transparent 60%)",
        }}
      />
      {/* MOTION LAYER — slow 22s cyan/orange/green mesh drift over HAL's
          vignette. Operator directive 2026-05-21: "needs more middly ground
          coloration and motion of color." Honors prefers-reduced-motion
          via the global rule in globals.css. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] mesh-gradient opacity-25 mix-blend-screen"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        {/* Eyebrow */}
        <p className="mb-10 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
          <span
            aria-hidden
            className="inline-block size-1.5 animate-pulse rounded-full bg-[#22F0D5] shadow-[0_0_8px_#22F0D5]"
          />
          ::ATOMEONS · INDEPENDENT AI SYSTEMS LABORATORY · MARCO ISLAND, FL
        </p>

        {/* Variable-weight H1 */}
        <h1 className="max-w-5xl text-balance text-5xl font-medium leading-[0.98] tracking-[-0.02em] md:text-7xl lg:text-8xl">
          {PILLARS.map((pillar, i) => (
            <span key={pillar.id}>
              <span
                data-pillar={pillar.id}
                ref={(el) => {
                  clauseRefs.current[i] = el;
                }}
                className={[
                  "pillar-clause inline",
                  pillar.gradient
                    ? "bg-clip-text text-transparent"
                    : "",
                ].join(" ")}
                style={
                  pillar.gradient
                    ? {
                        backgroundImage:
                          "linear-gradient(90deg, #22F0D5, #FF7A1A)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }
                    : pillar.style
                }
              >
                {pillar.text}
              </span>
              {i < PILLARS.length - 1 ? " " : ""}
            </span>
          ))}
        </h1>

        {/* Dek */}
        <p className="mt-8 max-w-2xl text-pretty text-base leading-relaxed text-[#9BA5A7] sm:text-lg md:mt-10">
          The lab does four things: deploys AI into real work through a native
          cockpit, builds commerce tools for independent operators, publishes
          alpha intel decoded from primary sources, and ships frontier scientific
          manuscripts under CC-BY 4.0. One operator. No team. No roadmap
          theater.
        </p>

        {/* Stat strip */}
        <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          {STAT_ITEMS.map((item, i) => (
            <span key={item} className="flex items-center gap-5">
              <span>{item}</span>
              {i < STAT_ITEMS.length - 1 && (
                <span aria-hidden className="text-[#1A2225]">
                  ·
                </span>
              )}
            </span>
          ))}
        </div>

        {/* Hero footer — anchor the background image to its source.
            Points at the new monograph so the LEAD asset on the
            homepage doubles as a discovery vector for that page. */}
        <div className="mt-16 flex flex-col gap-3 border-t border-[#1A2225] pt-6 md:mt-20 md:flex-row md:items-center md:justify-between md:gap-6">
          <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-[#6B7779]">
            Lead frame ·{" "}
            <span className="text-[#22F0D5]">HAL 9000</span> ·{" "}
            2001: A Space Odyssey (1968) · scholarly criticism, 17 U.S.C. § 107
          </p>
          <Link
            href="/research/lessons-from-sci-fi/monograph"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-[#22F0D5]/40 bg-black/60 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5] backdrop-blur-sm transition-colors hover:border-[#22F0D5] hover:bg-[#22F0D5]/15"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#22F0D5] shadow-[0_0_6px_rgba(34,240,213,0.9)]" />
            Open the monograph →
          </Link>
        </div>
      </div>

      {/* Pillar clause animation — scoped styles */}
      <style>{`
        .pillar-clause {
          font-variation-settings: 'wght' 200;
          opacity: 0.35;
          transition:
            font-variation-settings 600ms cubic-bezier(0.22, 1, 0.36, 1),
            opacity 500ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .pillar-clause.is-active {
          font-variation-settings: 'wght' 700;
          opacity: 1;
        }
        @media (prefers-reduced-motion: reduce) {
          .pillar-clause {
            transition: none !important;
            font-variation-settings: 'wght' 700;
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}
