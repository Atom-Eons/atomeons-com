"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/**
 * SilentCanvasTease — public-safe v6.3.0 "Silent Canvas" preview.
 *
 * IP boundary (drawn by mirrors round 1):
 *   PUBLIC-OK: name "Silent Canvas", the principle "model talks less,
 *              canvas shows more", lead-trio of named features
 *              (Solidify · Z-Axis Rewind · Living Canvas), "v6.3 in-build"
 *              framing, BYO/local-first/zero-markup (already public).
 *   NEVER:     Relevance Controller, 7 state sources, 5-schema validator,
 *              AE1–AE14 dept roster, trust gradient tiers, phase map with
 *              day counts, cost math, trilane structure, 17th HSMP kind,
 *              specific architecture-layer model names.
 *
 * Per orange-judge ruling: MICRO-TEASE ONLY. 3 features, not 6. Bottom
 * of /orangebox, before ClosingManifesto. "v6.3 in build" framing — no
 * date, no roadmap theater. Lab-grade.
 *
 * Per misfits: canvas-breathing background animation + IntersectionObserver
 * staggered feature reveal. Pure CSS keyframes + one IO. No animation
 * library, no new deps.
 *
 * Per architect: data-cockpit-section="silent canvas" wrapper on the
 * insertion site so the CockpitFrame HUD bottom-left bracket picks it up.
 * Per orange-judge: 3 lead features only. Solidify · Z-Axis Rewind · Living
 * Canvas. Pulse Ring / Freeze All / Hermes hold for GA release notes.
 */

type Feature = {
  name: string;
  one_liner: string;
  body: string;
  border_accent: string;
};

const FEATURES: Feature[] = [
  {
    name: "Solidify",
    one_liner: "One command. Production. Done.",
    body: "Describe the end state once. The canvas resolves it to a shippable artifact without negotiating the steps back to you.",
    border_accent: "#FF7A1A",
  },
  {
    name: "Z-Axis Rewind",
    one_liner: "Every build state, still alive.",
    body: "Any prior state of the canvas is reachable. Not a log. Not a diff. Visual time-travel, backward or forward, across the full build arc.",
    border_accent: "#22F0D5",
  },
  {
    name: "Living Canvas",
    one_liner: "The cockpit breathes when idle.",
    body: "Usage heatmap. Idle pulse. The canvas is an organism — it reflects where the work lives, where it hasn't been touched, where heat is accumulating.",
    border_accent: "#FF7A1A",
  },
];

export function SilentCanvasTease() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [revealedIdx, setRevealedIdx] = useState<Set<number>>(new Set());

  // Staggered IntersectionObserver reveal — only fires once per card.
  // Respects prefers-reduced-motion (skips animation, reveals all at once).
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setRevealedIdx(new Set([0, 1, 2]));
      return;
    }

    const cards = sectionRef.current?.querySelectorAll<HTMLElement>(
      "[data-feature-idx]",
    );
    if (!cards || cards.length === 0) return;

    const seen = new Set<number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = Number(
            (entry.target as HTMLElement).dataset.featureIdx ?? "0",
          );
          if (seen.has(idx)) return;
          seen.add(idx);
          window.setTimeout(() => {
            setRevealedIdx((prev) => {
              const next = new Set(prev);
              next.add(idx);
              return next;
            });
          }, idx * 120);
        });
      },
      { rootMargin: "0px 0px -20% 0px", threshold: 0.2 },
    );

    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-black py-32"
    >
      {/* canvas-breathing background: slow luminance pulse #000 → #0A0F11 → #000 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 50%, rgba(34,240,213,0.04) 0%, transparent 70%)",
          animation: "silentCanvasBreathe 8s ease-in-out infinite",
        }}
      />
      <style>{`
        @keyframes silentCanvasBreathe {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes silentCanvasBreathe {
            0%, 100% { opacity: 0.7; }
          }
        }
      `}</style>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        {/* eyebrow */}
        <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
          ::ORANGEBOX V6.3 · SILENT CANVAS · IN BUILD
        </p>

        {/* headline */}
        <h2 className="max-w-3xl text-balance text-4xl font-medium leading-[1.04] tracking-[-0.02em] text-[#F2F4F5] md:text-6xl">
          The cockpit stopped talking.
          <br />
          <span className="text-[#FF7A1A]">The canvas started.</span>
        </h2>

        {/* dek + opening paragraph */}
        <div className="mt-8 grid max-w-4xl gap-6 md:grid-cols-2 md:gap-12">
          <p className="text-lg leading-relaxed text-[#9BA5A7]">
            v6.3 rewires how progress reaches you. The model works. The canvas
            shows it. Less broadcast. More organism.
          </p>
          <p className="text-base leading-relaxed text-[#6B7779]">
            Every tool built in the last decade learned one trick: narrate
            itself. Step by step. Token by token. Silent Canvas cuts that
            contract. Describe the goal once. The cockpit takes it from there —
            state visible, progress legible, the build moving in front of you
            without waiting for permission to continue.
          </p>
        </div>

        {/* lead-trio feature cards — orange-judge pruned from 6 to 3 */}
        <div className="mt-16 grid gap-6 md:grid-cols-3 md:gap-8">
          {FEATURES.map((f, idx) => {
            const revealed = revealedIdx.has(idx);
            return (
              <div
                key={f.name}
                data-feature-idx={idx}
                className="group relative overflow-hidden rounded-2xl border bg-[#0A0F11] p-6 transition-all duration-700 ease-out"
                style={{
                  borderColor: revealed
                    ? `${f.border_accent}66`
                    : "rgba(26, 34, 37, 1)",
                  opacity: revealed ? 1 : 0,
                  transform: revealed ? "translateY(0)" : "translateY(16px)",
                }}
              >
                {/* corner glow on hover */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-12 -top-12 size-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-30"
                  style={{ background: f.border_accent }}
                />

                <p
                  className="font-mono text-[10px] uppercase tracking-[0.32em]"
                  style={{ color: f.border_accent }}
                >
                  {f.name}
                </p>
                <h3 className="mt-3 text-xl font-medium leading-snug text-[#F2F4F5]">
                  {f.one_liner}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#9BA5A7]">
                  {f.body}
                </p>
              </div>
            );
          })}
        </div>

        {/* closing block + tail line */}
        <div className="mt-16 max-w-3xl">
          <p className="text-base leading-relaxed text-[#9BA5A7]">
            Silent Canvas is not a UI refresh. It is a renegotiation of which
            layer carries the work. v6.3 lands when the build earns it — no
            date, no roadmap theater. For the operator class who wants the
            cockpit quieter than the thing it builds.
          </p>
          <p className="mt-6 font-mono text-base uppercase tracking-[0.18em] text-[#FF7A1A]">
            THE CANVAS SHOWS THE WORK. THE WORK IS REAL.
          </p>
        </div>

        {/* CTAs */}
        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
          <Link
            href="#buy"
            className="group inline-flex items-center gap-1.5 rounded-lg border border-[#FF7A1A] bg-[#FF7A1A] px-5 py-3 text-sm font-medium text-black transition-colors hover:bg-[#FFA45A]"
          >
            <span>buy v6.0 · $1</span>
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
          <Link
            href="/founders-view"
            className="group inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5] transition-colors hover:text-[#F2F4F5]"
          >
            read tonight&apos;s letter{" "}
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
