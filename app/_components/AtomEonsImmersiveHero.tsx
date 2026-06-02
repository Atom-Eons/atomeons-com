"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/**
 * AtomEonsImmersiveHero — the homepage signature.
 *
 * Built 2026-06-02 carte-blanche redesign pass. Operator directive:
 * "fix homepage, make it all beautiful, modern, we are cybersecurity,
 *  better than a college for AI learning, best site for design inspiration."
 *
 * Signature move: a cinematic mosaic background of 12 press-photo hero
 * images (the ones we generated via Nano Banana Pro), arranged in a
 * 4×3 grid that slowly drifts. Tiles fade in on stagger. A heavy black
 * gradient mask keeps the text legible. Four-pillar copy overlaid in
 * massive variable-weight type.
 *
 * The four pillars: cybersecurity leader + AI college alternative +
 * design-inspiration leader + lab-grade research. Sentence-level brand.
 *
 * Behavior:
 *  - Mosaic auto-rotates which 12 of 67 available images are visible
 *    (every 8s, with a quick fade). Background motion is GENTLE — not
 *    a kinetic ad; it's a slow museum-display rotation.
 *  - Reduced-motion users get a static grid with no rotation.
 *  - Mobile reduces grid to 2×3, font-size scales.
 *
 * Accessibility:
 *  - All decorative images alt="" + role="presentation". The text is the
 *    semantic content. H1 is the page title; nothing else competes.
 *  - Single primary CTA + single ghost link.
 */

// 67 hero images live at /cyber-images/*.png and /learn-images/*.png.
// We rotate through them. Each tile in the grid is a slot; on every
// rotation each slot picks the next image from the pool.
const IMAGE_POOL = [
  // CYBER (12)
  "/cyber-images/cyberwar.png",
  "/cyber-images/serve.png",
  "/cyber-images/platforms.png",
  "/cyber-images/cyber-index.png",
  "/cyber-images/labs.png",
  "/cyber-images/path.png",
  "/cyber-images/hackerone.png",
  "/cyber-images/legal.png",
  "/cyber-images/certs.png",
  "/cyber-images/ai-security.png",
  "/cyber-images/modern.png",
  "/cyber-images/llm-warfare.png",
  // ATLAS (12)
  "/learn-images/atlas-history.png",
  "/learn-images/atlas-transformer-variants.png",
  "/learn-images/atlas-rlhf-family.png",
  "/learn-images/atlas-mech-interp.png",
  "/learn-images/atlas-multimodal.png",
  "/learn-images/atlas-embeddings.png",
  "/learn-images/atlas-hallucinations.png",
  "/learn-images/atlas-safety.png",
  "/learn-images/atlas-moe.png",
  "/learn-images/atlas-context.png",
  "/learn-images/atlas-training.png",
  "/learn-images/atlas-post-training.png",
  // INDICES + SUPPORTING (12)
  "/learn-images/index-learn.png",
  "/learn-images/index-atlas.png",
  "/learn-images/index-career.png",
  "/learn-images/index-trust.png",
  "/learn-images/index-decode.png",
  "/learn-images/index-calc.png",
  "/learn-images/tracker-models.png",
  "/learn-images/tracker-inference-providers.png",
  "/learn-images/tracker-news.png",
  "/learn-images/tracker-funding.png",
  "/learn-images/career-pathways.png",
  "/learn-images/career-skill-tree.png",
];

// Slot count = 4 × 3 = 12 desktop, 2 × 3 = 6 mobile (we render 12 always but CSS hides 6 on mobile).
const SLOT_COUNT = 12;

export function AtomEonsImmersiveHero() {
  const [rotation, setRotation] = useState(0);
  const [ready, setReady] = useState(false);
  const mediaQueryRef = useRef<MediaQueryList | null>(null);

  useEffect(() => {
    mediaQueryRef.current = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReady(true);

    if (mediaQueryRef.current.matches) return; // no rotation for reduced-motion users

    const interval = setInterval(() => {
      setRotation((r) => r + 1);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Compute the 12 visible image URLs for this rotation.
  const visible: string[] = [];
  for (let slot = 0; slot < SLOT_COUNT; slot++) {
    const index = (rotation * SLOT_COUNT + slot) % IMAGE_POOL.length;
    visible.push(IMAGE_POOL[index]);
  }

  return (
    <section className="relative isolate overflow-hidden bg-black" aria-labelledby="atomeons-hero-title">
      {/* MOSAIC GRID BACKGROUND */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid grid-cols-2 grid-rows-3 gap-px md:grid-cols-4 md:grid-rows-3"
      >
        {visible.map((src, i) => (
          <div
            key={`${rotation}-${i}`}
            className={`relative overflow-hidden transition-opacity duration-[1200ms] ${
              ready ? "opacity-100" : "opacity-0"
            } ${i >= 6 ? "hidden md:block" : ""}`}
            style={{
              transitionDelay: `${i * 80}ms`,
            }}
          >
            <Image
              src={src}
              alt=""
              role="presentation"
              fill
              priority={i < 4}
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* CINEMATIC MASK — bottom-heavy gradient + radial vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.75) 30%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.85) 100%), linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      {/* CONTENT */}
      <div className="relative mx-auto flex min-h-[88vh] w-full max-w-7xl flex-col justify-end px-6 pb-16 pt-32 md:min-h-[92vh] md:pb-24 md:pt-40">
        <div className="max-w-5xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#22F0D5]">
            AtomEons Systems Laboratory · Marco Island, FL · est. 2024
          </p>

          <h1
            id="atomeons-hero-title"
            className="mt-7 text-balance text-5xl font-medium leading-[0.95] tracking-tight text-[#F2F4F5] sm:text-6xl md:text-7xl lg:text-[88px] lg:leading-[0.92]"
            style={{ fontVariationSettings: '"wght" 540' }}
          >
            An independent lab building the AI{" "}
            <span
              className="bg-gradient-to-r from-[#22F0D5] via-[#7DDBC8] to-[#FFB87A] bg-clip-text text-transparent"
              style={{ fontVariationSettings: '"wght" 720' }}
            >
              the public actually needs.
            </span>
          </h1>

          <p className="mt-9 max-w-2xl text-base leading-[1.55] text-[#E7EBED] md:text-xl md:leading-[1.5]">
            Masters-grade cyber education. Realtime AI research, published free. Anti-hype tools that ship.
            Built in the open by one person and a fleet of agents — Marco Island, Florida.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-3">
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 rounded-full bg-[#22F0D5] px-6 py-3 text-[14px] font-semibold text-black transition-colors hover:bg-[#1AD4BD]"
            >
              Start learning
              <span aria-hidden className="text-[18px]">→</span>
            </Link>
            <Link
              href="/learn/cyber"
              className="inline-flex items-center gap-2 rounded-full border border-[#FFB87A]/50 px-6 py-3 text-[14px] font-medium text-[#FFB87A] transition-colors hover:bg-[#FFB87A]/10"
            >
              Cyber track →
            </Link>
            <Link
              href="/founders-view"
              className="inline-flex items-center gap-2 px-2 py-3 text-[14px] font-medium text-[#9BA5A7] underline decoration-[#1A2225] decoration-1 underline-offset-[6px] transition-colors hover:text-[#E7EBED] hover:decoration-[#FFB87A]"
            >
              Founder&apos;s view
            </Link>
          </div>

          {/* Stat strip at the bottom of the hero */}
          <div className="mt-16 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-6 border-t border-[#1A2225]/80 pt-8 md:grid-cols-4">
            <Stat number="200+" label="education pages" />
            <Stat number="12" label="cyber tracks" />
            <Stat number="50+" label="AI atlases" />
            <Stat number="CC-BY 4.0" label="all of it, free" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <p className="text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">{number}</p>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7]">{label}</p>
    </div>
  );
}
