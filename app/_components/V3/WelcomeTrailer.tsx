"use client";

/**
 * WelcomeTrailer.tsx — the Apple-grade scroll-driven introduction.
 *
 * Wave 37 · 2026-06-06 · operator brief: "site is noisy for humans ·
 * they need a first-time welcome video on the hero · look at how
 * Apple/Google handled humans · use Google API to make clips · innovate."
 *
 * HONEST FRAMING
 *
 * Apple's homepage isn't a video. It's CSS scroll-choreography over
 * static imagery + minimal text. Google's homepage isn't a video. It's
 * a single input field. The principle: defer complexity until the
 * user has chosen to want it. The welcome is the choreography itself,
 * not a clip to watch.
 *
 * This trailer:
 *   - 6 scenes · each ~80vh tall · single typographic statement +
 *     single visual per scene
 *   - IntersectionObserver fades the active scene in · others stay dim
 *   - CSS transforms only · GPU-composited · zero JS per frame
 *   - Honors prefers-reduced-motion · falls back to static
 *   - Auto-skip button always visible top-right
 *   - localStorage marks "trained" so returning visitors aren't routed
 *     here again
 *
 * Optional Veo-generated MP4 fallback:
 *   - If /public/welcome-clip.mp4 exists, the hero scene plays it
 *   - Operator runs scripts/generate-welcome-clip.mjs when Veo
 *     credentials are wired (Vertex AI project + GOOGLE_AI_KEY env)
 *   - Until then, the CSS choreography IS the experience
 *
 * Web-psychology principles applied:
 *   - Hick's Law            one choice per fold (single CTA)
 *   - Miller's Law           7±2 chunks → we use 6 scenes max
 *   - Fitts's Law            primary CTA large + center-aligned
 *   - F-pattern reading      text left-aligned · visual right
 *   - Cognitive offloading   the scroll reveals · user doesn't search
 *   - Negative space          ~60% of each viewport is empty
 *   - Progressive disclosure  detailed routes hidden until the final scene
 */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  AbstractGlyph,
  OrbitGlyph,
  NetworkGlyph,
  MandalaGlyph,
  SpiralGlyph,
} from "./Illustrations";

const SKIP_KEY = "atomeons.trained";

interface Scene {
  eyebrow: string;
  headline: string;
  body: string;
  visual: "atom" | "orbit" | "network" | "mandala" | "spiral" | "abstract";
  hue: number;
}

const SCENES: Scene[] = [
  {
    eyebrow: "§ 01 · WHERE YOU ARE",
    headline: "This is a research laboratory.",
    body: "ÆoNs Research Laboratory · one operator · Marco Island, Florida · since 2024. Most labs hide the workshop. This one doesn't.",
    visual: "atom",
    hue: 175,
  },
  {
    eyebrow: "§ 02 · WHAT IT MAKES",
    headline: "Research. Products. Curriculum.",
    body: "Thirty-one published papers under CC-BY 4.0. Three shipped products. A free sixty-eight-lesson curriculum. Nightly broadcasts. One operator, shipping daily.",
    visual: "orbit",
    hue: 220,
  },
  {
    eyebrow: "§ 03 · THE PROMISE",
    headline: "Free for all.",
    body: "No paywalls. No subscriptions. Almost everything the lab makes is yours to read, copy, cite, remix. The one paid product is a one-time license you own forever.",
    visual: "mandala",
    hue: 165,
  },
  {
    eyebrow: "§ 04 · HOW TO USE THE LAB",
    headline: "Ask. Read. Build.",
    body: "Press ⌘K from anywhere to search every page. Press ⌘↵ to ask a natural question · the lab answers grounded in its own writing. Press ↵ on any cheat sheet to learn a tool in five minutes.",
    visual: "network",
    hue: 200,
  },
  {
    eyebrow: "§ 05 · WHAT YOU'LL FIND",
    headline: "Three hundred and forty surfaces.",
    body: "Six domain hubs. Seven AI-tool cheat sheets. A live audiovisual entrainment session. Decoded primary-source papers. A real-time audit log of every commit. Everything indexed. Everything searchable.",
    visual: "spiral",
    hue: 285,
  },
  {
    eyebrow: "§ 06 · WHERE TO GO",
    headline: "Begin anywhere.",
    body: "Three doors. Pick the one that fits you tonight. You can always come back to the others.",
    visual: "abstract",
    hue: 35,
  },
];

interface WelcomeTrailerProps {
  /** Show the optional Veo MP4 if /public/welcome-clip.mp4 exists */
  videoSrc?: string;
}

export function WelcomeTrailer({ videoSrc }: WelcomeTrailerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [videoAvailable, setVideoAvailable] = useState(false);
  const refs = useRef<(HTMLElement | null)[]>([]);

  // Mark visitor as trained on mount · so future visits skip this
  useEffect(() => {
    try {
      localStorage.setItem(SKIP_KEY, "true");
    } catch {
      // ignore
    }
  }, []);

  // Check if Veo MP4 exists · HEAD request to /welcome-clip.mp4
  useEffect(() => {
    if (!videoSrc) return;
    fetch(videoSrc, { method: "HEAD" })
      .then((r) => setVideoAvailable(r.ok))
      .catch(() => setVideoAvailable(false));
  }, [videoSrc]);

  // IntersectionObserver · sets active scene as user scrolls
  useEffect(() => {
    if (typeof window === "undefined") return;
    const observers: IntersectionObserver[] = [];
    refs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
            setActiveIndex(i);
          }
        },
        { threshold: [0.4, 0.6, 0.8] },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <main className="welcome-root relative bg-black text-[#F4F4F2]">
      {/* Fixed skip button · always reachable · Fitts target */}
      <div className="fixed right-6 top-6 z-50">
        <Link
          href="/?welcome=skipped"
          className="inline-flex items-center gap-2 border border-[#1F242B] bg-[#0F1114]/85 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#9CA3AF] backdrop-blur-sm transition hover:border-[#22F0D5] hover:text-[#22F0D5]"
        >
          Skip · go to the lab →
        </Link>
      </div>

      {/* Scene 0 · the welcome video / fallback choreography */}
      {videoAvailable && videoSrc ? (
        <section className="relative isolate flex min-h-screen items-center justify-center px-6">
          <video
            src={videoSrc}
            autoPlay
            muted
            playsInline
            loop
            className="absolute inset-0 h-full w-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
          <div className="relative z-10 max-w-3xl text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
              § Welcome to AtomEons
            </p>
            <h1
              className="mt-6 text-balance text-[clamp(48px,9vw,120px)] font-light leading-[0.92]"
              style={{ fontFamily: "Newsreader, Georgia, serif", fontWeight: 300 }}
            >
              The lab in one minute.
            </h1>
          </div>
        </section>
      ) : (
        <section className="relative isolate flex min-h-screen items-center justify-center px-6 text-center">
          <div className="welcome-cosmos pointer-events-none absolute inset-0" aria-hidden />
          <div className="relative z-10 max-w-3xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
              § Welcome to AtomEons · take ninety seconds
            </p>
            <h1
              className="mt-6 text-balance text-[clamp(48px,9vw,120px)] font-light leading-[0.92]"
              style={{ fontFamily: "Newsreader, Georgia, serif", fontWeight: 300 }}
            >
              The lab in six scrolls.
            </h1>
            <p className="mt-8 max-w-[44ch] mx-auto text-[18px] leading-[1.55] text-[#9CA3AF]">
              Scroll down. Each scene is one idea. At the end, three
              doors. Pick one.
            </p>
            <div className="mt-10 flex justify-center">
              <div className="welcome-scroll-cue" aria-hidden>↓</div>
            </div>
          </div>
        </section>
      )}

      {/* The 6 scroll scenes */}
      {SCENES.map((s, i) => {
        const isActive = activeIndex === i;
        return (
          <section
            key={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className="welcome-scene relative flex min-h-[88vh] items-center px-6 md:px-12"
            data-active={isActive ? "1" : "0"}
            data-index={i}
          >
            <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-12 md:grid-cols-[1.1fr_1fr]">
              {/* Text · left lane · F-pattern reading */}
              <div className="welcome-text-lane">
                <p
                  className="font-mono text-[11px] uppercase tracking-[0.32em]"
                  style={{ color: `hsl(${s.hue} 70% 65%)` }}
                >
                  {s.eyebrow}
                </p>
                <h2
                  className="mt-6 text-balance text-[clamp(36px,6vw,72px)] font-light leading-[0.95] text-[#F4F4F2]"
                  style={{ fontFamily: "Newsreader, Georgia, serif", fontWeight: 300 }}
                >
                  {s.headline}
                </h2>
                <p className="mt-6 max-w-[48ch] text-[17px] leading-[1.6] text-[#9CA3AF]">
                  {s.body}
                </p>
              </div>

              {/* Visual · right lane */}
              <div className="welcome-visual-lane flex items-center justify-center">
                <SceneVisual variant={s.visual} hue={s.hue} />
              </div>
            </div>
          </section>
        );
      })}

      {/* Final · the three doors · Hick's Law (3 options ≤ 5 = clean) */}
      <section className="relative isolate flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
          § now · pick one
        </p>
        <h2
          className="mt-6 text-balance text-[clamp(40px,7vw,84px)] font-light leading-[0.95]"
          style={{ fontFamily: "Newsreader, Georgia, serif", fontWeight: 300 }}
        >
          Three doors.
        </h2>
        <div className="mt-16 grid w-full max-w-[1100px] gap-6 md:grid-cols-3">
          <DoorCard
            href="/learn"
            title="Learn AI"
            body="Sixty-eight lessons · five levels · free forever. Start at /start if you've never touched ChatGPT."
            cta="Open the curriculum →"
            hue={165}
          />
          <DoorCard
            href="/orangebox"
            title="Buy the cockpit"
            body="ORANGEBOX v6 · 4.46 MB native · turbo-optimize Claude · one-time license · §4A no-SaaS perpetual."
            cta="See ORANGEBOX →"
            hue={35}
          />
          <DoorCard
            href="/research"
            title="Read the research"
            body="Thirty-one ÆoNs papers · thirty-five decoded primary sources · open-license. The proof the lab does work."
            cta="Open research →"
            hue={220}
          />
        </div>

        <p className="mt-16 font-mono text-[11px] uppercase tracking-[0.22em] text-[#5A6068]">
          Or press ⌘K to search · ⌘↵ to ask the lab
        </p>
      </section>

      {/* Component-scoped CSS */}
      <style jsx>{`
        .welcome-scene {
          opacity: 0.35;
          transition: opacity 0.9s cubic-bezier(0.22, 0.61, 0.36, 1);
        }
        .welcome-scene[data-active="1"] {
          opacity: 1;
        }
        .welcome-scene[data-active="1"] .welcome-text-lane h2,
        .welcome-scene[data-active="1"] .welcome-text-lane p {
          transform: translateY(0);
          opacity: 1;
        }
        .welcome-text-lane h2,
        .welcome-text-lane p {
          transform: translateY(12px);
          opacity: 0.5;
          transition:
            transform 0.9s cubic-bezier(0.22, 0.61, 0.36, 1),
            opacity 0.9s cubic-bezier(0.22, 0.61, 0.36, 1);
        }
        .welcome-cosmos {
          background:
            radial-gradient(
              ellipse at 30% 30%,
              hsla(175, 70%, 30%, 0.18) 0%,
              transparent 55%
            ),
            radial-gradient(
              ellipse at 70% 70%,
              hsla(285, 70%, 30%, 0.18) 0%,
              transparent 55%
            );
        }
        .welcome-scroll-cue {
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 28px;
          color: #22f0d5;
          animation: bounce-down 1.8s ease-in-out infinite;
        }
        @keyframes bounce-down {
          0%, 100% {
            transform: translateY(0);
            opacity: 0.4;
          }
          50% {
            transform: translateY(8px);
            opacity: 1;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .welcome-scene {
            opacity: 1;
          }
          .welcome-scene .welcome-text-lane h2,
          .welcome-scene .welcome-text-lane p {
            transform: none;
            opacity: 1;
            transition: none;
          }
          .welcome-scroll-cue {
            animation: none;
          }
        }
      `}</style>
    </main>
  );
}

// ---------------------------------------------------------------------------
// SceneVisual · picks the right illustration per scene
// ---------------------------------------------------------------------------

function SceneVisual({ variant, hue }: { variant: Scene["visual"]; hue: number }) {
  const props = { hue, size: 320, seed: 3 };
  switch (variant) {
    case "atom":
      return <OrbitGlyph {...props} seed={1} />;
    case "orbit":
      return <NetworkGlyph {...props} seed={4} />;
    case "mandala":
      return <MandalaGlyph {...props} seed={2} />;
    case "network":
      return <NetworkGlyph {...props} seed={7} />;
    case "spiral":
      return <SpiralGlyph {...props} seed={5} />;
    case "abstract":
      return <AbstractGlyph {...props} seed={9} />;
    default:
      return <AbstractGlyph {...props} />;
  }
}

// ---------------------------------------------------------------------------
// DoorCard · final-scene CTAs · Fitts-compliant tap targets
// ---------------------------------------------------------------------------

function DoorCard({
  href,
  title,
  body,
  cta,
  hue,
}: {
  href: string;
  title: string;
  body: string;
  cta: string;
  hue: number;
}) {
  return (
    <Link
      href={href}
      className="group block border p-8 text-left transition"
      style={{ borderColor: "#1F242B" }}
    >
      <p
        className="font-mono text-[10px] uppercase tracking-[0.32em]"
        style={{ color: `hsl(${hue} 70% 65%)` }}
      >
        {title}
      </p>
      <p
        className="mt-4 text-[20px] leading-[1.4] text-[#F4F4F2]"
        style={{ fontFamily: "Newsreader, Georgia, serif" }}
      >
        {body}
      </p>
      <p
        className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors"
        style={{ color: `hsl(${hue} 70% 65%)` }}
      >
        {cta}
      </p>
      <style jsx>{`
        a {
          transition: border-color 0.3s ease, background 0.3s ease;
        }
        a:hover {
          border-color: hsl(${hue} 70% 65%) !important;
          background: hsla(${hue}, 70%, 65%, 0.04);
        }
      `}</style>
    </Link>
  );
}
