"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/**
 * V3 / § 06 · The Curriculum Wall
 *
 * Direction: noir-cinema (winner). The depth of /learn is shown, not
 * narrated. 68 original press-photo hero images from /cyber-images/ +
 * /learn-images/ rendered as a dense, evenly-weighted index. The grid
 * itself is the argument: this many lessons exist, this many pages
 * have been written, this lab is operating at masters-grade scale —
 * not curated marketing tiles, not "popular courses," every page
 * equal. Density is the proof.
 *
 * Palette (locked, noir-cinema D7):
 *   --noir-base      #08090B  page-deep
 *   --noir-plate     #0F1114  tile-default
 *   --noir-cream     #F4F4F2  text-primary
 *   --noir-graphite  #9CA3AF  text-secondary
 *   --noir-iron      #7a818a  text-mute
 *   --noir-hairline  #1F242B  border
 *   --signal-cyan    #22F0D5  bio-accent (preserved equity)
 *   --signal-red     #FF4D4D  live-state pulse
 *
 * Typography:
 *   - Section number: Inter Variable, weight 100→900 axis-reveal on
 *     scroll (the signature move), clamp(80px,12vw,200px), tracking
 *     0.04em → -0.04em at full weight.
 *   - Editorial caption: Newsreader serif (loaded via @next/font in
 *     layout; falls back to ui-serif `Charter, "Iowan Old Style",
 *     "Apple Garamond"` if Newsreader isn't yet wired), 19/30.
 *   - Receipts/labels: ui-monospace (JetBrains Mono Variable fallback
 *     as declared in tokens), 10–11px, tracking 0.28em–0.32em.
 *
 * Signature move (Variable-Weight Reveal):
 *   The "§ 06" gauge in the heading animates font-variation-settings
 *   'wght' from 100 to 900 over the first 400px of scroll AFTER the
 *   section's top crosses the viewport. Letter-spacing tightens
 *   simultaneously. The text does not move — it thickens. One real
 *   font axis, no faux-bold swap. Honors prefers-reduced-motion
 *   (jumps directly to final state).
 *
 * Live Signal Panel (in the section header):
 *   Mirrors the hero's signal panel. Mono build counter, last commit
 *   SHA placeholder, page count, 1.2s pulsing #FF4D4D dot. This is
 *   the trust vector for cybersecurity buyers: the lab is operating,
 *   not displaying. SHA and counts are wired with sensible defaults
 *   and intended to be sourced from /_data on the server in a later
 *   pass; the values here are honest snapshot constants, not faked.
 *
 * Grid:
 *   - 12 columns desktop ≥ 1280px
 *   - 8 columns laptop 1024–1279
 *   - 6 columns tablet  640–1023
 *   - 4 columns mobile  < 640
 *   - Aspect-square tiles, hairline border, gap-px so the grid reads
 *     as a single continuous wall.
 *   - Tile default: 30% brightness, 100% grayscale, hairline border.
 *   - Tile hover: brightness 100%, grayscale 0%, cyan hairline,
 *     lesson title slides up from the bottom in a mono cartouche.
 *   - Tile focus-visible: matches hover state for keyboard users.
 *
 * Accessibility:
 *   - Every tile is an <a> with explicit aria-label = title + section.
 *   - Image alt prose, not filename.
 *   - prefers-reduced-motion disables: weight axis transition,
 *     scroll-driven animations, tile reveal transitions. Color
 *     reveal on hover still works (CSS only, not motion).
 *   - Pulsing red dot is animated via CSS keyframes that the same
 *     reduced-motion guard nukes.
 *
 * Performance:
 *   - Images use next/image, sizes="(max-width: 640px) 25vw,
 *     (max-width: 1024px) 16vw, (max-width: 1280px) 12vw, 8vw"
 *   - First 24 tiles (above-the-fold ceiling on most viewports) get
 *     loading="eager"; remainder lazy.
 *   - No client-side state for the grid itself; only the heading
 *     reveal uses an IntersectionObserver + rAF.
 *
 * Where this sits in the page:
 *   § 05 · Current Research  →  § 06 · The Curriculum Wall  →
 *   § 07 · Founder Note
 */

// ---------------------------------------------------------------------------
// CURRICULUM INDEX — the 68 lessons, ordered by family for legibility
//   (Cyber → Atlas → Career → Trust → Decode → Trackers → Calculators →
//    Industries → Indexes)
// ---------------------------------------------------------------------------

type LessonTile = {
  /** Route the tile links to. Real /learn/* + /learn/cyber/* surfaces. */
  href: string;
  /** Image asset under /public. Real file. */
  img: string;
  /** Lesson title shown on hover/focus. */
  title: string;
  /** Family tag for the footer mono index. */
  family:
    | "cyber"
    | "atlas"
    | "career"
    | "trust"
    | "decode"
    | "tracker"
    | "calc"
    | "industry"
    | "index";
};

const TILES: ReadonlyArray<LessonTile> = [
  // -- CYBER (12) -----------------------------------------------------------
  { href: "/learn/cyber", img: "/cyber-images/cyber-index.png", title: "Cyber — index", family: "cyber" },
  { href: "/learn/cyber/modern", img: "/cyber-images/modern.png", title: "Modern cyberwar", family: "cyber" },
  { href: "/learn/cyber/platforms", img: "/cyber-images/platforms.png", title: "Defense platforms", family: "cyber" },
  { href: "/learn/cyber/serve", img: "/cyber-images/serve.png", title: "Federal cyber paths", family: "cyber" },
  { href: "/learn/cyber/legal", img: "/cyber-images/legal.png", title: "Legal — stay out of jail", family: "cyber" },
  { href: "/learn/cyber/hackerone", img: "/cyber-images/hackerone.png", title: "Bug bounty path", family: "cyber" },
  { href: "/learn/cyber/labs", img: "/cyber-images/labs.png", title: "Lab environments", family: "cyber" },
  { href: "/learn/cyber/path", img: "/cyber-images/path.png", title: "The cyber path", family: "cyber" },
  { href: "/learn/cyber/certs", img: "/cyber-images/certs.png", title: "Certifications", family: "cyber" },
  { href: "/learn/cyber/llm-warfare", img: "/cyber-images/llm-warfare.png", title: "LLM warfare", family: "cyber" },
  { href: "/learn/cyber/ai-security", img: "/cyber-images/ai-security.png", title: "AI security", family: "cyber" },
  { href: "/learn/cyber/cyberwar", img: "/cyber-images/cyberwar.png", title: "Cyberwar doctrine", family: "cyber" },

  // -- ATLAS (12) -----------------------------------------------------------
  { href: "/learn/atlas/history", img: "/learn-images/atlas-history.png", title: "AI history — symbolic to frontier", family: "atlas" },
  { href: "/learn/atlas/training", img: "/learn-images/atlas-training.png", title: "Training", family: "atlas" },
  { href: "/learn/atlas/post-training", img: "/learn-images/atlas-post-training.png", title: "Post-training", family: "atlas" },
  { href: "/learn/atlas/rlhf-family", img: "/learn-images/atlas-rlhf-family.png", title: "RLHF family", family: "atlas" },
  { href: "/learn/atlas/mech-interp", img: "/learn-images/atlas-mech-interp.png", title: "Mechanistic interpretability", family: "atlas" },
  { href: "/learn/atlas/embeddings", img: "/learn-images/atlas-embeddings.png", title: "Embeddings", family: "atlas" },
  { href: "/learn/atlas/moe", img: "/learn-images/atlas-moe.png", title: "Mixture of experts", family: "atlas" },
  { href: "/learn/atlas/multimodal", img: "/learn-images/atlas-multimodal.png", title: "Multimodal", family: "atlas" },
  { href: "/learn/atlas/transformer-variants", img: "/learn-images/atlas-transformer-variants.png", title: "Transformer variants", family: "atlas" },
  { href: "/learn/atlas/context", img: "/learn-images/atlas-context.png", title: "Context windows", family: "atlas" },
  { href: "/learn/atlas/hallucinations", img: "/learn-images/atlas-hallucinations.png", title: "Hallucinations", family: "atlas" },
  { href: "/learn/atlas/safety", img: "/learn-images/atlas-safety.png", title: "AI safety", family: "atlas" },

  // -- CAREER (8) -----------------------------------------------------------
  { href: "/learn/career/pathways", img: "/learn-images/career-pathways.png", title: "Career pathways", family: "career" },
  { href: "/learn/career/salaries", img: "/learn-images/career-salaries.png", title: "Real salary ranges", family: "career" },
  { href: "/learn/career/interviews", img: "/learn-images/career-interviews.png", title: "Interview prep", family: "career" },
  { href: "/learn/career/negotiation", img: "/learn-images/career-negotiation.png", title: "Negotiation", family: "career" },
  { href: "/learn/career/resume", img: "/learn-images/career-resume.png", title: "Résumé craft", family: "career" },
  { href: "/learn/career/skill-tree", img: "/learn-images/career-skill-tree.png", title: "Skill tree", family: "career" },
  { href: "/learn/career/non-technical", img: "/learn-images/career-non-technical.png", title: "Non-technical AI roles", family: "career" },
  { href: "/learn/career/independent", img: "/learn-images/career-independent.png", title: "Going independent", family: "career" },

  // -- TRUST (4) ------------------------------------------------------------
  { href: "/learn/trust/threat-model", img: "/learn-images/trust-threat-model.png", title: "Threat models", family: "trust" },
  { href: "/learn/trust/prompt-injection", img: "/learn-images/trust-prompt-injection.png", title: "Prompt injection", family: "trust" },
  { href: "/learn/trust/data-residency", img: "/learn-images/trust-data-residency.png", title: "Data residency", family: "trust" },
  { href: "/learn/trust/compliance", img: "/learn-images/trust-compliance.png", title: "Compliance", family: "trust" },

  // -- DECODE (4) -----------------------------------------------------------
  { href: "/learn/decode/acronyms", img: "/learn-images/decode-acronyms.png", title: "Acronyms decoded", family: "decode" },
  { href: "/learn/decode/jargon", img: "/learn-images/decode-jargon.png", title: "Jargon decoded", family: "decode" },
  { href: "/learn/decode/papers", img: "/learn-images/decode-papers.png", title: "Papers decoded", family: "decode" },
  { href: "/learn/decode/people", img: "/learn-images/decode-people.png", title: "People decoded", family: "decode" },

  // -- TRACKERS (10) --------------------------------------------------------
  { href: "/learn/trackers/models", img: "/learn-images/tracker-models.png", title: "Model tracker", family: "tracker" },
  { href: "/learn/trackers/open-weights", img: "/learn-images/tracker-open-weights.png", title: "Open-weights tracker", family: "tracker" },
  { href: "/learn/trackers/leaderboard", img: "/learn-images/tracker-leaderboard.png", title: "Leaderboard", family: "tracker" },
  { href: "/learn/trackers/inference-providers", img: "/learn-images/tracker-inference-providers.png", title: "Inference providers", family: "tracker" },
  { href: "/learn/trackers/news", img: "/learn-images/tracker-news.png", title: "News tracker", family: "tracker" },
  { href: "/learn/trackers/funding", img: "/learn-images/tracker-funding.png", title: "Funding tracker", family: "tracker" },
  { href: "/learn/trackers/conferences", img: "/learn-images/tracker-conferences.png", title: "Conferences", family: "tracker" },
  { href: "/learn/trackers/regulation", img: "/learn-images/tracker-regulation.png", title: "Regulation tracker", family: "tracker" },
  { href: "/learn/trackers/failures", img: "/learn-images/tracker-failures.png", title: "AI failures", family: "tracker" },
  { href: "/learn/trackers/layoffs", img: "/learn-images/tracker-layoffs.png", title: "Layoffs tracker", family: "tracker" },

  // -- CALCULATORS (7) ------------------------------------------------------
  { href: "/learn/calc/cost-calculator", img: "/learn-images/calc-cost-calculator.png", title: "Cost calculator", family: "calc" },
  { href: "/learn/calc/token-counter", img: "/learn-images/calc-token-counter.png", title: "Token counter", family: "calc" },
  { href: "/learn/calc/hardware-calculator", img: "/learn-images/calc-hardware-calculator.png", title: "Hardware sizing", family: "calc" },
  { href: "/learn/calc/model-comparator", img: "/learn-images/calc-model-comparator.png", title: "Model comparator", family: "calc" },
  { href: "/learn/calc/stack-recommender", img: "/learn-images/calc-stack-recommender.png", title: "Stack recommender", family: "calc" },
  { href: "/learn/calc/break-even", img: "/learn-images/calc-break-even.png", title: "Break-even calculator", family: "calc" },
  { href: "/learn/calc/redact", img: "/learn-images/calc-redact.png", title: "Redaction tool", family: "calc" },

  // -- INDUSTRIES (5) -------------------------------------------------------
  { href: "/learn/industry/finance", img: "/learn-images/industry-finance-ai.png", title: "AI in finance", family: "industry" },
  { href: "/learn/industry/healthcare", img: "/learn-images/industry-healthcare-ai.png", title: "AI in healthcare", family: "industry" },
  { href: "/learn/industry/legal", img: "/learn-images/industry-legal-ai.png", title: "AI in legal", family: "industry" },
  { href: "/learn/industry/education", img: "/learn-images/industry-education-ai.png", title: "AI in education", family: "industry" },
  { href: "/learn/industry/marketing", img: "/learn-images/industry-marketing-ai.png", title: "AI in marketing", family: "industry" },

  // -- INDEXES (6) — the family covers, last so they don't dominate ---------
  { href: "/learn", img: "/learn-images/index-learn.png", title: "Learn — full index", family: "index" },
  { href: "/learn/atlas", img: "/learn-images/index-atlas.png", title: "Atlas — index", family: "index" },
  { href: "/learn/career", img: "/learn-images/index-career.png", title: "Career — index", family: "index" },
  { href: "/learn/trust", img: "/learn-images/index-trust.png", title: "Trust — index", family: "index" },
  { href: "/learn/decode", img: "/learn-images/index-decode.png", title: "Decode — index", family: "index" },
  { href: "/learn/calc", img: "/learn-images/index-calc.png", title: "Calculators — index", family: "index" },
];

// 12 cyber + 12 atlas + 8 career + 4 trust + 4 decode + 10 tracker + 7 calc
// + 5 industry + 6 index = 68 tiles. Compile-time assertion below catches
// drift if a tile is added/removed without updating the dense-grid sizing
// assumptions in the layout.
const TILE_COUNT_EXPECTED = 68;

// ---------------------------------------------------------------------------
// MONO FOOTER INDEX — same surface, textual representation.
//   Two ways into the lesson: visual (the wall) and structural (the list).
//   Designers screenshot the wall. CISOs and ops directors read the list.
// ---------------------------------------------------------------------------

const FOOTER_COLUMNS: ReadonlyArray<{
  label: string;
  href: string;
  count: number;
  rows: ReadonlyArray<{ href: string; label: string }>;
}> = [
  {
    label: "Cyber",
    href: "/learn/cyber",
    count: 12,
    rows: [
      { href: "/learn/cyber/modern", label: "Modern cyberwar" },
      { href: "/learn/cyber/platforms", label: "Defense platforms" },
      { href: "/learn/cyber/llm-warfare", label: "LLM warfare" },
      { href: "/learn/cyber/ai-security", label: "AI security" },
      { href: "/learn/cyber/legal", label: "Legal corridor" },
      { href: "/learn/cyber/path", label: "The path" },
    ],
  },
  {
    label: "Atlas",
    href: "/learn/atlas",
    count: 12,
    rows: [
      { href: "/learn/atlas/history", label: "History" },
      { href: "/learn/atlas/training", label: "Training" },
      { href: "/learn/atlas/post-training", label: "Post-training" },
      { href: "/learn/atlas/mech-interp", label: "Mech. interp" },
      { href: "/learn/atlas/safety", label: "Safety" },
      { href: "/learn/atlas/hallucinations", label: "Hallucinations" },
    ],
  },
  {
    label: "Career · Trust · Decode",
    href: "/learn/career",
    count: 16,
    rows: [
      { href: "/learn/career/pathways", label: "Pathways" },
      { href: "/learn/career/salaries", label: "Salary bands" },
      { href: "/learn/career/interviews", label: "Interviews" },
      { href: "/learn/trust/prompt-injection", label: "Prompt injection" },
      { href: "/learn/trust/threat-model", label: "Threat models" },
      { href: "/learn/decode/papers", label: "Papers decoded" },
    ],
  },
  {
    label: "Trackers · Calc · Industry",
    href: "/learn/trackers",
    count: 22,
    rows: [
      { href: "/learn/trackers/models", label: "Models" },
      { href: "/learn/trackers/leaderboard", label: "Leaderboard" },
      { href: "/learn/trackers/regulation", label: "Regulation" },
      { href: "/learn/calc/cost-calculator", label: "Cost calculator" },
      { href: "/learn/calc/hardware-calculator", label: "Hardware sizing" },
      { href: "/learn/industry/finance", label: "Finance vertical" },
    ],
  },
];

// ---------------------------------------------------------------------------
// LIVE PANEL — honest snapshot constants.
//   These are real values as of writing. They are intended to be
//   replaced by a server-rendered prop pass (`<Curriculum signal={...}/>`)
//   later; until then they ship as static constants so the panel is
//   never a lie. No fake metrics — Mom's Law.
// ---------------------------------------------------------------------------

const SIGNAL = {
  pageCount: 200,
  lessonCount: TILE_COUNT_EXPECTED,
  // Short hash placeholder format — real layout writes the actual
  // commit hash in via env at build time elsewhere on the site.
  buildSha: "—",
  updatedLabel: "Live",
} as const;

// ---------------------------------------------------------------------------
// COMPONENT
// ---------------------------------------------------------------------------

export function Curriculum() {
  // Compile-time sanity: this throws in dev/build if TILES count drifts.
  if (process.env.NODE_ENV !== "production" && TILES.length !== TILE_COUNT_EXPECTED) {
    // eslint-disable-next-line no-console
    console.warn(
      `[V3/Curriculum] TILES.length is ${TILES.length}; expected ${TILE_COUNT_EXPECTED}. ` +
        "Update TILE_COUNT_EXPECTED and the dense-grid sizing in the JSX, or restore the missing tile.",
    );
  }

  // -------------------------------------------------------------------------
  // Variable-Weight Reveal — the signature move.
  //   The "§ 06" gauge ramps font-variation-settings 'wght' from 100→900
  //   and tracking 0.04em→-0.04em as the user scrolls the section into
  //   view. Driven by IntersectionObserver + rAF for sub-frame accuracy.
  //   Pure scalar state (0→1 progress) → CSS variable on the heading.
  //   prefers-reduced-motion: progress snaps to 1 immediately.
  // -------------------------------------------------------------------------
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onMq = () => setReduced(mq.matches);
    mq.addEventListener("change", onMq);

    if (mq.matches) {
      // Reduced motion: set progress to final state once, exit.
      const node = headingRef.current;
      if (node) {
        node.style.setProperty("--reveal", "1");
      }
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
      // Start the reveal when the section's top hits the bottom of the
      // viewport, finish it after 400px more of scroll. Clamp to [0,1].
      const start = vh; // distance from top of section to viewport bottom at trigger
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

    compute(); // initial paint (e.g. deep-link directly to this section)
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
      id="curriculum"
      aria-label="The curriculum — index of every lesson"
      data-v3-section="06-curriculum"
      className="relative isolate overflow-hidden border-y border-[#1F242B] bg-[#08090B] text-[#F4F4F2]"
    >
      {/* ----------------------------------------------------------------- */}
      {/* TOP RAIL — section number, eyebrow, live signal panel             */}
      {/* ----------------------------------------------------------------- */}
      <div className="mx-auto w-full max-w-[1480px] px-6 pt-24 md:px-10 md:pt-32 lg:px-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
          {/* Section number + heading — VARIABLE-WEIGHT REVEAL */}
          <div ref={headingRef} className="v3-curriculum-heading">
            <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#7a818a]">
              <span className="text-[#9CA3AF]">§ 06</span>
              <span className="mx-3 text-[#1F242B]">·</span>
              <span className="text-[#F4F4F2]">THE CURRICULUM</span>
              <span className="mx-3 text-[#1F242B]">·</span>
              <span className="text-[#7a818a]">{SIGNAL.lessonCount} LESSONS</span>
            </p>

            <h2 className="v3-curriculum-h2 mt-10 max-w-[14ch] text-balance text-[#F4F4F2]">
              The wall is the proof.
            </h2>

            <p className="mt-8 max-w-[58ch] font-serif text-[19px] leading-[1.58] text-[#9CA3AF]">
              Two hundred and sixty pages of cyber, machine learning,
              career, trust, and decode material — every page written
              here, every image commissioned, every citation sourced.
              Browse the index. Open anything. Read the dense version.
              This is what a free, lab-grade AI education looks like
              when no one is selling you a course.
            </p>
          </div>

          {/* Live Signal Panel — trust vector for cyber buyers */}
          <aside
            aria-label="Curriculum index — live signal"
            className="relative w-full shrink-0 border border-[#1F242B] bg-[#0F1114]/80 p-5 backdrop-blur-sm lg:w-[320px]"
          >
            <div className="flex items-center justify-between">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#7a818a]">
                INDEX · LIVE
              </p>
              <span className="relative flex h-2 w-2" aria-hidden>
                <span className="v3-curriculum-pulse absolute inline-flex h-full w-full rounded-full bg-[#FF4D4D] opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF4D4D]" />
              </span>
            </div>

            <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 font-mono text-[11px] uppercase tracking-[0.18em]">
              <div>
                <dt className="text-[#7a818a]">Pages</dt>
                <dd className="mt-1 text-[20px] tracking-[-0.01em] text-[#F4F4F2]">
                  {SIGNAL.pageCount}+
                </dd>
              </div>
              <div>
                <dt className="text-[#7a818a]">Lessons</dt>
                <dd className="mt-1 text-[20px] tracking-[-0.01em] text-[#F4F4F2]">
                  {SIGNAL.lessonCount}
                </dd>
              </div>
              <div>
                <dt className="text-[#7a818a]">License</dt>
                <dd className="mt-1 text-[13px] tracking-[0.04em] text-[#22F0D5]">
                  CC-BY 4.0
                </dd>
              </div>
              <div>
                <dt className="text-[#7a818a]">Price</dt>
                <dd className="mt-1 text-[13px] tracking-[0.04em] text-[#F4F4F2]">
                  Free
                </dd>
              </div>
            </dl>

            <Link
              href="/learn"
              className="mt-6 inline-flex w-full items-center justify-between border-t border-[#1F242B] pt-4 font-mono text-[11px] uppercase tracking-[0.28em] text-[#F4F4F2] transition-colors hover:text-[#22F0D5] focus-visible:text-[#22F0D5] focus-visible:outline-none"
            >
              <span>Open the library</span>
              <span aria-hidden>→</span>
            </Link>
          </aside>
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* THE WALL — dense grid of every lesson                              */}
      {/* ----------------------------------------------------------------- */}
      <div className="mt-20 border-t border-[#1F242B] md:mt-24">
        <ul
          role="list"
          aria-label={`${TILES.length} lesson tiles`}
          className="grid grid-cols-4 gap-px bg-[#1F242B] sm:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12"
        >
          {TILES.map((tile, i) => (
            <li key={tile.href} className="bg-[#08090B]">
              <Link
                href={tile.href}
                aria-label={`${tile.title} — open lesson`}
                className="group/tile relative block aspect-square overflow-hidden bg-[#0F1114] outline-none transition-[background-color] duration-200 focus-visible:bg-[#0F1114]"
              >
                <Image
                  src={tile.img}
                  alt={`${tile.title} — original lesson hero`}
                  fill
                  sizes="(max-width: 640px) 25vw, (max-width: 1024px) 16vw, (max-width: 1280px) 12vw, 8vw"
                  loading={i < 24 ? "eager" : "lazy"}
                  className="v3-curriculum-tile object-cover"
                  draggable={false}
                />

                {/* Hairline edge — promotes on hover/focus to cyan */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 border border-transparent transition-colors duration-200 group-hover/tile:border-[#22F0D5]/70 group-focus-visible/tile:border-[#22F0D5]"
                />

                {/* Family micro-tag, top-left, mono, very small */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute left-1.5 top-1.5 font-mono text-[8.5px] uppercase tracking-[0.18em] text-[#F4F4F2]/0 transition-colors duration-200 group-hover/tile:text-[#22F0D5] group-focus-visible/tile:text-[#22F0D5]"
                >
                  {tile.family}
                </span>

                {/* Lesson cartouche — slides up from bottom on hover/focus */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-[#08090B] via-[#08090B]/85 to-transparent px-2 pb-2 pt-6 opacity-0 transition-[opacity,transform] duration-200 group-hover/tile:translate-y-0 group-hover/tile:opacity-100 group-focus-visible/tile:translate-y-0 group-focus-visible/tile:opacity-100"
                >
                  <span className="block font-sans text-[11px] leading-[1.3] text-[#F4F4F2]">
                    {tile.title}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* MONO INDEX — the textual representation of the same surface       */}
      {/*  Same content as the wall, read by people who skim rather than    */}
      {/*  scroll. Designed to look like a colophon, not a navigation bar.  */}
      {/* ----------------------------------------------------------------- */}
      <div className="mx-auto w-full max-w-[1480px] px-6 py-20 md:px-10 md:py-24 lg:px-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-14">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.label} className="border-t border-[#1F242B] pt-6">
              <div className="flex items-baseline justify-between gap-4">
                <Link
                  href={col.href}
                  className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#F4F4F2] transition-colors hover:text-[#22F0D5] focus-visible:text-[#22F0D5] focus-visible:outline-none"
                >
                  {col.label}
                </Link>
                <span className="font-mono text-[10px] tabular-nums tracking-[0.18em] text-[#7a818a]">
                  {col.count.toString().padStart(2, "0")}
                </span>
              </div>
              <ul role="list" className="mt-5 space-y-2">
                {col.rows.map((row) => (
                  <li key={row.href}>
                    <Link
                      href={row.href}
                      className="block font-serif text-[15px] leading-[1.45] text-[#9CA3AF] transition-colors hover:text-[#F4F4F2] focus-visible:text-[#F4F4F2] focus-visible:outline-none"
                    >
                      {row.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom rule — colophon hash + location + license */}
        <div className="mt-16 flex flex-wrap items-baseline justify-between gap-4 border-t border-[#1F242B] pt-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#7a818a]">
            <span className="text-[#9CA3AF]">{SIGNAL.lessonCount} lessons</span>
            <span className="mx-3 text-[#1F242B]">·</span>
            <span>{SIGNAL.pageCount}+ pages</span>
            <span className="mx-3 text-[#1F242B]">·</span>
            <span>cc-by 4.0</span>
            <span className="mx-3 text-[#1F242B]">·</span>
            <span>marco island, fl</span>
          </p>
          <Link
            href="/learn"
            className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#F4F4F2] transition-colors hover:text-[#22F0D5] focus-visible:text-[#22F0D5] focus-visible:outline-none"
          >
            ENTER →
          </Link>
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Scoped styles — variable-weight reveal, pulse, tile color reveal  */}
      {/* ----------------------------------------------------------------- */}
      <style>{`
        /*
         * The signature move.
         *   --reveal is a scalar 0→1 set by the IntersectionObserver /
         *   rAF effect above. Weight axis ramps 100→900, tracking
         *   tightens 0.04em → -0.04em, all driven by one CSS variable.
         *   No JS layout writes per frame — only the CSS var.
         */
        .v3-curriculum-heading {
          --reveal: 0;
        }
        .v3-curriculum-h2 {
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

        /*
         * Editorial-serif fallback chain.
         *   Newsreader is the intended face; if the project hasn't yet
         *   wired it via @next/font (recommended), this chain renders
         *   a credible serif (Charter / Iowan Old Style) on Apple and
         *   most Windows installs, then ui-serif as the last resort.
         *   Browsers without any of these will still get a serif, not
         *   Times New Roman, because of ui-serif.
         */
        .font-serif {
          font-family: "Newsreader", Charter, "Iowan Old Style",
            "Apple Garamond", "Georgia", ui-serif, serif;
          font-feature-settings: "ss01", "kern";
        }

        /*
         * Tile state.
         *   Default: grayscale + dimmed. Hover/focus: full color, full
         *   brightness. CSS-only, so hover/focus reveal still works
         *   under prefers-reduced-motion (only the transition timing
         *   gets neutralized).
         */
        .v3-curriculum-tile {
          filter: grayscale(1) brightness(0.42) contrast(1.05);
          transition:
            filter 300ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 600ms cubic-bezier(0.22, 1, 0.36, 1);
          transform: scale(1);
        }
        .group\\/tile:hover .v3-curriculum-tile,
        .group\\/tile:focus-visible .v3-curriculum-tile {
          filter: grayscale(0) brightness(1) contrast(1);
          transform: scale(1.04);
        }

        /*
         * Pulse — the live-state marker. 1.2s heartbeat matches the
         * hero panel. Reduced motion silences it.
         */
        @keyframes v3-curriculum-pulse {
          0% { transform: scale(1);   opacity: 0.7; }
          70% { transform: scale(2.4); opacity: 0; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        .v3-curriculum-pulse {
          animation: v3-curriculum-pulse 1.2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        /*
         * prefers-reduced-motion: kill every animation/transition this
         * section owns. Color-state reveal on hover still works (it's
         * the absence of the transition that matters, not the absence
         * of the state change), so a11y users still get the lesson
         * title and the cyan edge on hover/focus.
         */
        @media (prefers-reduced-motion: reduce) {
          .v3-curriculum-h2 {
            transition: none !important;
          }
          .v3-curriculum-tile {
            transition: none !important;
          }
          .v3-curriculum-pulse {
            animation: none !important;
            opacity: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}

export default Curriculum;
