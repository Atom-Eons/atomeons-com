'use client';

/**
 * app/_components/V3/Pillars.tsx
 * Homepage section: the three pillars that establish what AtomEons does.
 *
 * Noir-cinema direction. The three identities — cybersecurity leader, AI college
 * alternative, design-inspiration site — are not chosen between, they are stacked.
 *
 * Composition law:
 *   - § indexed editorial structure (mono eyebrow, oversized display headline)
 *   - Variable-weight reveal on the section title (font-variation-settings axis
 *     animation, not faux-bold swap)
 *   - Three full-bleed cards in a 12-column grid, hairline borders only
 *   - Newsreader serif for editorial caption, Inter Display Variable for display,
 *     mono for receipts/timestamps
 *   - Persistent live-signal accent (#22F0D5 dot, 1.2s pulse) on the active card
 *   - No drop shadows, no gradients, no rounded corners above 2px — Anduril gravitas
 *   - Real photo references from /cyber-images/ and /learn-images/
 *
 * Hover state: cursor enters card → variable-weight title bumps from 200 → 800,
 * letter-spacing tightens from 0.02em → -0.04em, image desaturates from 60% → 100%.
 * Same screenshot vector as the hero reveal, repeated at section scale.
 */

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

type Pillar = {
  index: string;
  kicker: string;
  title: string;
  display: string;
  caption: string;
  href: string;
  cta: string;
  image: string;
  imageAlt: string;
  receipt: {
    label: string;
    value: string;
  };
  signal: string;
};

const PILLARS: ReadonlyArray<Pillar> = [
  {
    index: '01',
    kicker: 'Cyber · Defense-grade',
    title: 'Frontier security tooling',
    display: 'Hold the line.',
    caption:
      'OrangeBox, the runtime, and the constitutional gate chain ship as one operating posture. Twenty-seven guardrails, lattice integrity gate at position zero, founder-salary enforcement at payout, human final-stop authority reachable from every autonomous path. Audited monthly. Sourced, not asserted.',
    href: '/cyber',
    cta: 'Enter the lab',
    image: '/cyber-images/01-runtime-cockpit.jpg',
    imageAlt:
      'Cockpit interior, low-light, single amber console glow — the runtime in operating posture.',
    receipt: { label: 'Guardrails active', value: '27 / 27' },
    signal: 'GATE 0 · LBCE · NOMINAL',
  },
  {
    index: '02',
    kicker: 'Learn · Masters-grade',
    title: 'AI education better than school',
    display: 'Read the source.',
    caption:
      'Sixty-seven lessons, twelve disciplines, zero tuition. Built from primary papers, not bootcamp slides. The curriculum wall is the proof of depth — every cell is a real lesson, every lesson cites the original work, every claim is reproducible. Compresses graduate-grade material into operator-grade time.',
    href: '/learn',
    cta: 'Open the curriculum',
    image: '/learn-images/01-curriculum-wall.jpg',
    imageAlt:
      'Twelve-column index of the curriculum wall — dense, monospaced, library-grade.',
    receipt: { label: 'Lessons published', value: '67' },
    signal: 'CITES · PRIMARY · 100%',
  },
  {
    index: '03',
    kicker: 'Build · Artifact-native',
    title: 'Runtime cognition you can ship',
    display: 'Make the thing.',
    caption:
      'OrangeBox installs in one binary on consumer hardware. B00KMakor turns a transcript into a hardback. Skil.ski packages a single skill as a sold artifact. The lab does not lecture about agents — it sells them. Real revenue, real install count, real commit hash on the colophon below.',
    href: '/build',
    cta: 'See what shipped',
    image: '/cyber-images/12-orangebox-install.jpg',
    imageAlt:
      'OrangeBox single-binary install on a consumer desktop — the artifact, not the demo.',
    receipt: { label: 'Founder installs', value: 'live' },
    signal: 'COMMIT · main · PUSH',
  },
] as const;

/**
 * IntersectionObserver hook — fires the variable-weight reveal once the section
 * crosses 40% viewport. No reverse animation. No scroll-tied scrubbing. Just one
 * decisive transition, the way a thought solidifies.
 */
function useReveal<T extends Element>(threshold = 0.4) {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || shown) return;
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            obs.disconnect();
            break;
          }
        }
      },
      { threshold, rootMargin: '0px 0px -10% 0px' },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [shown, threshold]);

  return { ref, shown };
}

export default function Pillars() {
  const { ref, shown } = useReveal<HTMLElement>(0.35);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section
      ref={ref}
      id="pillars"
      aria-labelledby="pillars-heading"
      data-section="pillars"
      className="relative w-full bg-[#08090B] text-[#F4F4F2]"
      style={{
        // Inter Display Variable + Newsreader are loaded at the layout root.
        // We bind named CSS vars on the section so utility classes can pick them up.
        ['--ink' as never]: '#F4F4F2',
        ['--ink-soft' as never]: '#9CA3AF',
        ['--ink-faint' as never]: '#7a818a',
        ['--surface' as never]: '#08090B',
        ['--surface-rise' as never]: '#0F1114',
        ['--surface-edge' as never]: '#1F242B',
        ['--signal' as never]: '#22F0D5',
        ['--alert' as never]: '#FF4D4D',
      }}
    >
      {/* ─── Section header ──────────────────────────────────────────── */}
      <header className="mx-auto w-full max-w-[1440px] px-6 pt-32 pb-20 md:px-12 lg:px-20 lg:pt-40 lg:pb-28">
        <div className="grid grid-cols-12 gap-x-6 gap-y-10">
          <div className="col-span-12 md:col-span-3">
            <p
              className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--ink-faint)]"
              style={{ fontFeatureSettings: '"tnum" 1, "zero" 1' }}
            >
              § 02 · Three doors
            </p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--ink-faint)]">
              Cyber / Learn / Build
            </p>
          </div>

          <h2
            id="pillars-heading"
            className="col-span-12 md:col-span-9"
            style={{
              fontFamily:
                'var(--font-inter), "Inter Display", "Inter", system-ui, sans-serif',
              fontSize: 'clamp(40px, 7.2vw, 120px)',
              lineHeight: 0.92,
              fontVariationSettings: shown
                ? '"wght" 820, "opsz" 144'
                : '"wght" 140, "opsz" 144',
              letterSpacing: shown ? '-0.038em' : '0.012em',
              transition:
                'font-variation-settings 1100ms cubic-bezier(0.22, 1, 0.36, 1), letter-spacing 1100ms cubic-bezier(0.22, 1, 0.36, 1)',
              willChange: 'font-variation-settings, letter-spacing',
              color: 'var(--ink)',
            }}
          >
            One organism.
            <br />
            Three operating&nbsp;surfaces.
          </h2>

          <p
            className="col-span-12 md:col-span-7 md:col-start-4"
            style={{
              fontFamily:
                '"Newsreader", "Iowan Old Style", Georgia, "Times New Roman", serif',
              fontSize: 'clamp(17px, 1.4vw, 19px)',
              lineHeight: 1.58,
              color: 'var(--ink-soft)',
              maxWidth: '54ch',
              fontFeatureSettings: '"ss01" 1, "kern" 1',
            }}
          >
            ÆoNs Research operates one lattice across three faces. The cyber face
            defends the runtime. The learning face teaches the runtime. The build
            face ships the runtime. Same primitives, different incidence angles.
            Pick a door.
          </p>
        </div>
      </header>

      {/* ─── Pillar grid ─────────────────────────────────────────────── */}
      <ol className="mx-auto w-full max-w-[1440px] list-none px-6 pb-32 md:px-12 lg:px-20 lg:pb-40">
        <div className="grid grid-cols-12 gap-x-6 gap-y-8 lg:gap-y-0">
          {PILLARS.map((pillar, i) => {
            const isActive = activeIndex === i;
            return (
              <li
                key={pillar.index}
                className="col-span-12 lg:col-span-4 group relative"
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(null)}
                onFocus={() => setActiveIndex(i)}
                onBlur={() => setActiveIndex(null)}
              >
                <Link
                  href={pillar.href}
                  aria-label={`${pillar.title}. ${pillar.cta}.`}
                  className="block h-full focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--signal)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)]"
                >
                  {/* Card frame — hairline border, no rounding above 2px */}
                  <article
                    className="relative flex h-full flex-col border-t border-[var(--surface-edge)] pt-6 transition-[border-color] duration-500 group-hover:border-[var(--ink)] lg:border-l lg:border-t-0 lg:pt-0 lg:pl-6"
                  >
                    {/* Index + signal row */}
                    <div className="flex items-baseline justify-between pb-6">
                      <span
                        className="font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--ink-faint)]"
                        style={{
                          fontFeatureSettings: '"tnum" 1, "zero" 1',
                        }}
                      >
                        § 02·{pillar.index}
                      </span>
                      <span
                        className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em]"
                        style={{
                          color: isActive
                            ? 'var(--signal)'
                            : 'var(--ink-faint)',
                          transition: 'color 320ms ease',
                        }}
                      >
                        <span
                          aria-hidden="true"
                          className="inline-block h-1.5 w-1.5 rounded-full"
                          style={{
                            backgroundColor: isActive
                              ? 'var(--signal)'
                              : 'var(--ink-faint)',
                            animation: isActive
                              ? 'pillars-pulse 1.2s ease-in-out infinite'
                              : 'none',
                            transition: 'background-color 320ms ease',
                          }}
                        />
                        {pillar.signal}
                      </span>
                    </div>

                    {/* Full-bleed photograph — desaturated until active */}
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--surface-rise)]">
                      <div
                        role="img"
                        aria-label={pillar.imageAlt}
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${pillar.image})`,
                          filter: isActive
                            ? 'grayscale(0%) contrast(1.04) brightness(0.96)'
                            : 'grayscale(60%) contrast(0.98) brightness(0.82)',
                          transform: isActive ? 'scale(1.012)' : 'scale(1)',
                          transition:
                            'filter 720ms cubic-bezier(0.22, 1, 0.36, 1), transform 1400ms cubic-bezier(0.22, 1, 0.36, 1)',
                          willChange: 'filter, transform',
                        }}
                      />
                      {/* Top-left kicker overlay */}
                      <div className="absolute left-4 top-4 right-4 flex items-start justify-between">
                        <span
                          className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--ink)]"
                          style={{
                            textShadow: '0 0 12px rgba(8,9,11,0.55)',
                          }}
                        >
                          {pillar.kicker}
                        </span>
                      </div>
                      {/* Bottom-left display headline — variable-weight on hover */}
                      <h3
                        className="absolute bottom-5 left-5 right-5"
                        style={{
                          fontFamily:
                            'var(--font-inter), "Inter Display", "Inter", system-ui, sans-serif',
                          fontSize: 'clamp(34px, 4.6vw, 56px)',
                          lineHeight: 0.96,
                          color: 'var(--ink)',
                          fontVariationSettings: isActive
                            ? '"wght" 820, "opsz" 96'
                            : '"wght" 240, "opsz" 96',
                          letterSpacing: isActive ? '-0.042em' : '0.018em',
                          transition:
                            'font-variation-settings 620ms cubic-bezier(0.22, 1, 0.36, 1), letter-spacing 620ms cubic-bezier(0.22, 1, 0.36, 1)',
                          willChange: 'font-variation-settings, letter-spacing',
                          textShadow: '0 1px 16px rgba(8,9,11,0.45)',
                        }}
                      >
                        {pillar.display}
                      </h3>
                    </div>

                    {/* Title — editorial label below the image */}
                    <h4
                      className="mt-7"
                      style={{
                        fontFamily:
                          'var(--font-inter), "Inter Display", "Inter", system-ui, sans-serif',
                        fontSize: 'clamp(22px, 1.9vw, 30px)',
                        lineHeight: 1.12,
                        color: 'var(--ink)',
                        fontVariationSettings: '"wght" 540',
                        letterSpacing: '-0.022em',
                      }}
                    >
                      {pillar.title}
                    </h4>

                    {/* Caption — Newsreader serif, the academic register */}
                    <p
                      className="mt-3"
                      style={{
                        fontFamily:
                          '"Newsreader", "Iowan Old Style", Georgia, "Times New Roman", serif',
                        fontSize: '17px',
                        lineHeight: 1.6,
                        color: 'var(--ink-soft)',
                        maxWidth: '46ch',
                        fontFeatureSettings: '"ss01" 1, "kern" 1',
                      }}
                    >
                      {pillar.caption}
                    </p>

                    {/* Footer row — receipt (left) + CTA (right) */}
                    <div className="mt-auto pt-8">
                      <div className="flex items-end justify-between gap-4 border-t border-[var(--surface-edge)] pt-5">
                        <dl className="flex flex-col">
                          <dt
                            className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink-faint)]"
                          >
                            {pillar.receipt.label}
                          </dt>
                          <dd
                            className="mt-1 font-mono text-[22px] leading-none text-[var(--ink)]"
                            style={{
                              fontFeatureSettings: '"tnum" 1, "zero" 1',
                              fontVariationSettings: '"wght" 480',
                            }}
                          >
                            {pillar.receipt.value}
                          </dd>
                        </dl>
                        <span
                          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em]"
                          style={{
                            color: isActive
                              ? 'var(--signal)'
                              : 'var(--ink)',
                            transition: 'color 320ms ease',
                          }}
                        >
                          {pillar.cta}
                          <span
                            aria-hidden="true"
                            className="inline-block"
                            style={{
                              transform: isActive
                                ? 'translateX(4px)'
                                : 'translateX(0)',
                              transition:
                                'transform 420ms cubic-bezier(0.22, 1, 0.36, 1)',
                            }}
                          >
                            →
                          </span>
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </li>
            );
          })}
        </div>

        {/* Foot annotation — the lab-grade signature */}
        <div className="mt-20 grid grid-cols-12 gap-x-6 border-t border-[var(--surface-edge)] pt-6">
          <p className="col-span-12 md:col-span-6 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink-faint)]">
            Marco Island, FL · 25°56′N 81°43′W
          </p>
          <p className="col-span-12 md:col-span-6 md:text-right font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink-faint)]">
            Three doors · One lattice · Open the one you need
          </p>
        </div>
      </ol>

      {/* Pulse keyframes — scoped to this section, no global pollution */}
      <style jsx>{`
        @keyframes pillars-pulse {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.35;
            transform: scale(0.78);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          :global([data-section='pillars']) * {
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
