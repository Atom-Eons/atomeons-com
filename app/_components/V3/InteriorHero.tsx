"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";

/* ===========================================================================
 * V3 / Interior Hero
 *
 * Reusable hero shell for the ~200 interior pages of atomeons.com.
 * Carries the homepage's noir-cinema language one click deeper without
 * imitating it. The homepage hero is 100vh full-bleed cinema; the
 * interior hero is 72–88vh, editorial, restrained, and works with or
 * without a press-grade photograph.
 *
 * Three identities served, simultaneously, in one composition:
 *   1. Cybersecurity gravitas — live-signal panel, hairline rules,
 *      mono receipts, the lab is operating not displaying.
 *   2. Academic depth — §-indexed eyebrow, Newsreader serif lede,
 *      breadcrumb as a structural trail, not a back-button.
 *   3. Design-inspiration vector — variable-weight reveal on the
 *      display headline (real Inter Variable wght axis, no fauxbold),
 *      and a hairline composition diagram in the no-image variant
 *      that designers will screenshot.
 *
 * Palette (locked, noir-cinema D7):
 *   #08090B  noir.base       page-deep
 *   #0F1114  noir.plate      surface
 *   #1F242B  noir.hairline   border
 *   #5A6068  noir.iron       text-mute
 *   #9CA3AF  noir.graphite   text-secondary
 *   #F4F4F2  noir.cream      text-primary
 *   #22F0D5  signal.cyan     single bio-accent (preserved equity)
 *   #FF4D4D  signal.red      live-state pulse only
 *
 * Typography (per winner spec):
 *   Eyebrow / mono receipts        — ui-monospace / JetBrains Mono, 10–11px,
 *                                    uppercase, tracking 0.28em–0.32em.
 *   Display headline               — Inter Variable, wght axis 100→900,
 *                                    clamp(40px, 7.2vw, 120px) at h1 scale
 *                                    (one rung down from the homepage's
 *                                    clamp(80px,12vw,200px)). The interior
 *                                    page is the second-loudest moment, not
 *                                    the loudest.
 *   Editorial lede                 — Newsreader serif (with fallback chain),
 *                                    19/30, balanced.
 *   Primary CTA                    — Inter, 13px, uppercase, tracking 0.24em.
 *
 * Signature move (Variable-Weight Reveal — interior variant):
 *   On mount, the headline animates wght 100 → 900 over 720ms with a
 *   cubic-bezier(0.22, 1, 0.36, 1) curve while letter-spacing tightens
 *   0.04em → -0.04em. The text does not move — it thickens, like a
 *   thought solidifying. After mount, a secondary scroll-coupled pass
 *   nudges wght by ±40 across the first 240px of scroll so the
 *   composition stays alive as the user begins reading. Honors
 *   prefers-reduced-motion (snaps directly to final state).
 *
 * Live Signal Panel (interior variant):
 *   The homepage panel is a freestanding card. The interior version is
 *   a single mono strip pinned to the bottom-right of the hero — same
 *   information density, less visual weight, so the headline reads
 *   first. Shows: route slug, build hash slot (— when absent), page
 *   index, pulsing #FF4D4D dot. Same 1.2s pulse cadence as the home
 *   panel so a user arriving from the homepage sees the same heartbeat.
 *
 * Image handling:
 *   - heroImageSlug is a leading-slash path (e.g. "/cyber-images/llm-warfare.png"
 *     or "/learn-images/atlas-training.png"). next/image fills the frame.
 *   - When absent, the no-image variant ships a hairline composition
 *     diagram — three intersecting rules + a glyph block — that reads
 *     as deliberate restraint, not "image missing." It is the design
 *     signature for routes that don't yet have commissioned photography.
 *
 * Accessibility:
 *   - <section role="banner"> with an aria-labelledby pointing at the
 *     headline so screen readers announce the page name first.
 *   - Breadcrumb is a real <nav aria-label="Breadcrumb"> with an OL.
 *   - Skip link target (id="content") expected one node below the hero.
 *     The hero exposes a "data-hero-anchor" that pages can hook.
 *   - prefers-reduced-motion: all animation neutralized; final state
 *     painted once. Color reveal on hover/focus is CSS-only and
 *     remains intact (it's state, not motion).
 *   - All decorative elements aria-hidden; live-signal pulse has a
 *     paired sr-only "Live build signal" label.
 *
 * Props contract (frozen — interior pages depend on this shape):
 *   eyebrow?         optional kicker; defaults to "§ — ATOMEONS"
 *   title            required display headline string
 *   lede             required editorial paragraph (one short paragraph)
 *   primaryCta?      { href, label } — optional; only shipped when the
 *                    page has one obvious next action. Most editorial
 *                    pages will omit and the hero will sit clean.
 *   breadcrumb       BreadcrumbItem[] — at minimum [{ label: "Home",
 *                    href: "/" }]; the page provides the rest.
 *   heroImageSlug?   leading-slash public path; when present, full-bleed
 *                    cinema variant. When absent, hairline-grid variant.
 *   heroImageAlt?    used only when heroImageSlug is present. Required
 *                    in that case for a11y — the component asserts in
 *                    dev if missing.
 *
 * Where this sits:
 *   <Header />
 *   <InteriorHero {...} />
 *   <main id="content"> … </main>
 *   <Footer />
 *
 * Disclosure: ATOM-V3-INTERIOR-HERO-2026-0602
 * ===========================================================================
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type BreadcrumbItem = {
  /** Visible label, sentence-case ok. Kept short — < 24 chars renders best. */
  label: string;
  /** Absolute internal path. Last item may omit href to render as current. */
  href?: string;
};

export type InteriorHeroCta = {
  /** Internal or external href. External opens in new tab if it starts with http. */
  href: string;
  /** Action verb + noun. < 32 chars. Uppercased visually via CSS. */
  label: string;
};

export type InteriorHeroProps = {
  /**
   * Optional mono kicker, top-left. When omitted, falls back to a
   * computed default sourced from the breadcrumb's first non-Home rung.
   * Always uppercase visually.
   */
  eyebrow?: string;

  /**
   * Required display headline. Plain string — no nested markup.
   * The variable-weight reveal animates the whole string as one.
   * Aim for 2–7 words; the typographic scale punishes long lines.
   */
  title: string;

  /**
   * Required editorial lede paragraph. One paragraph, < 320 chars.
   * Set in Newsreader serif. The voice contract is lab-grade,
   * anti-hype, sourced. Atom McCree, not Apple ad copy.
   */
  lede: string;

  /**
   * Optional single primary action. Most interior pages omit this and
   * let the page body carry the call. When shipped, it is hairline-
   * bordered and promotes to cyan on hover/focus.
   */
  primaryCta?: InteriorHeroCta;

  /**
   * Required breadcrumb trail. Minimum two rungs (Home + current).
   * The last rung is the current page and renders as #F4F4F2 cream
   * rather than #9CA3AF graphite; href is optional on the last item.
   */
  breadcrumb: ReadonlyArray<BreadcrumbItem>;

  /**
   * Optional leading-slash path to a commissioned hero image under
   * /public (typically /cyber-images/* or /learn-images/*). When
   * present, the hero ships the full-bleed cinema variant. When
   * absent, the hairline-grid variant.
   */
  heroImageSlug?: string;

  /**
   * Required when heroImageSlug is set. Prose alt — describe what is
   * in the image, not the filename. Ignored in the no-image variant.
   */
  heroImageAlt?: string;
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Derive a mono eyebrow from the breadcrumb when the caller omits one.
 * "§ — ATOMEONS · <FIRST-RUNG>" so every page has a §-indexed kicker
 * consistent with the homepage's section structure.
 */
function deriveEyebrow(breadcrumb: ReadonlyArray<BreadcrumbItem>): string {
  const firstInterior = breadcrumb.find(
    (b) => b.label && b.label.toLowerCase() !== "home",
  );
  if (firstInterior) {
    return `§ — ${firstInterior.label.toUpperCase()}`;
  }
  return "§ — ATOMEONS";
}

/**
 * Detect external links so primary CTA opens correctly. Anything that
 * starts with http:// or https:// is treated as external.
 */
function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

/**
 * Build the live-signal slug. Take the last breadcrumb rung that has
 * an href, else fall back to the title compacted to a slug-ish token.
 * Kept short — the signal panel is dense, not chatty.
 */
function buildSignalSlug(
  breadcrumb: ReadonlyArray<BreadcrumbItem>,
  title: string,
): string {
  const last = breadcrumb[breadcrumb.length - 1];
  if (last?.href) {
    return last.href.replace(/^\//, "").replace(/\/$/, "") || "root";
  }
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 32);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function InteriorHero({
  eyebrow,
  title,
  lede,
  primaryCta,
  breadcrumb,
  heroImageSlug,
  heroImageAlt,
}: InteriorHeroProps) {
  // --- dev-time invariants (Mom's Law: no silent malformed heroes) ---------
  if (process.env.NODE_ENV !== "production") {
    if (!title || title.trim().length === 0) {
      // eslint-disable-next-line no-console
      console.warn("[V3/InteriorHero] `title` is required and non-empty.");
    }
    if (!lede || lede.trim().length === 0) {
      // eslint-disable-next-line no-console
      console.warn("[V3/InteriorHero] `lede` is required and non-empty.");
    }
    if (!breadcrumb || breadcrumb.length < 1) {
      // eslint-disable-next-line no-console
      console.warn(
        "[V3/InteriorHero] `breadcrumb` should include at least one rung.",
      );
    }
    if (heroImageSlug && !heroImageAlt) {
      // eslint-disable-next-line no-console
      console.warn(
        `[V3/InteriorHero] heroImageSlug "${heroImageSlug}" supplied without heroImageAlt. ` +
          "Add a prose alt — describe what's in the image, not the filename.",
      );
    }
  }

  const resolvedEyebrow = eyebrow ?? deriveEyebrow(breadcrumb);
  const signalSlug = buildSignalSlug(breadcrumb, title);
  const headlineId = useId();

  // --- variable-weight reveal --------------------------------------------
  //   On mount, animate `--reveal` from 0 → 1 over 720ms with a
  //   cubic-bezier easing. After mount, couple a small scroll-driven
  //   nudge (`--scroll`) that keeps the composition alive as the user
  //   begins to read. Both honor prefers-reduced-motion by snapping
  //   to final state.
  // -----------------------------------------------------------------------
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [reduced, setReduced] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onMq = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onMq);
    return () => mq.removeEventListener("change", onMq);
  }, []);

  useEffect(() => {
    // Mount-driven reveal — kick on the next frame so transition fires.
    if (typeof window === "undefined") return;
    const id = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (reduced) {
      const node = headingRef.current;
      if (node) {
        node.style.setProperty("--reveal", "1");
        node.style.setProperty("--scroll", "0");
      }
      return;
    }

    const section = sectionRef.current;
    const heading = headingRef.current;
    if (!section || !heading) return;

    let rafId: number | null = null;

    const compute = () => {
      const rect = section.getBoundingClientRect();
      // Scroll-coupled nudge: 0 when section top is at viewport top,
      // ramps to 1 as you scroll the section out by ~240px. Clamped.
      const span = 240;
      const traveled = Math.max(0, -rect.top);
      const s = Math.max(0, Math.min(1, traveled / span));
      heading.style.setProperty("--scroll", s.toString());
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
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, [reduced]);

  // --- breadcrumb computed shape -----------------------------------------
  const crumbs = useMemo(() => {
    return breadcrumb.map((b, i) => ({
      ...b,
      isLast: i === breadcrumb.length - 1,
    }));
  }, [breadcrumb]);

  const hasImage = Boolean(heroImageSlug);

  return (
    <section
      ref={sectionRef}
      role="banner"
      aria-labelledby={headlineId}
      data-v3-component="interior-hero"
      data-hero-anchor=""
      data-hero-variant={hasImage ? "cinema" : "hairline"}
      className="relative isolate overflow-hidden border-b border-[#1F242B] bg-[#08090B] text-[#F4F4F2]"
    >
      {/* =============================================================== */}
      {/* BACKGROUND LAYER — cinema photo OR hairline grid composition    */}
      {/* =============================================================== */}
      {hasImage ? (
        <>
          {/* Full-bleed photograph */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <Image
              src={heroImageSlug as string}
              alt=""
              fill
              priority
              sizes="100vw"
              className="v3-hero-photo object-cover"
              draggable={false}
            />
          </div>

          {/* Tri-layer veil — preserves photo gravitas while keeping type
              readable at AAA contrast against the cream foreground.
              1. Base darken                    (top→bottom)
              2. Side fade for left-align type  (left→right)
              3. Hairline noise/grain via SVG   (kept tasteful; under 4kb) */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#08090B]/55 via-[#08090B]/65 to-[#08090B]/90"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#08090B]/85 via-[#08090B]/35 to-[#08090B]/55"
          />
          <div
            aria-hidden
            className="v3-hero-grain pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
          />

          {/* a11y-only image description (prose alt lives here so it
              reaches assistive tech without burdening visual layout) */}
          {heroImageAlt ? (
            <p className="sr-only">{heroImageAlt}</p>
          ) : null}
        </>
      ) : (
        <>
          {/* Hairline-grid composition — the no-photo design signature.
              Five vertical rules + one horizontal rule + a quadrant glyph
              read as deliberate restraint. Designers screenshot this. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[#08090B]"
          >
            <div className="absolute inset-0 grid grid-cols-12">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="border-l border-[#1F242B] first:border-l-0"
                />
              ))}
            </div>
            <div className="absolute inset-x-0 top-[58%] border-t border-[#1F242B]" />
            <div className="absolute right-[8%] top-[18%] hidden h-[64%] w-px bg-[#1F242B] md:block" />

            {/* Quadrant glyph — small Æ mark in mono, top-right.
                The single bio-cyan tick on the rule is the only color. */}
            <div className="absolute right-[6%] top-[18%] hidden translate-x-[3px] md:block">
              <span className="block h-[1px] w-12 bg-[#22F0D5]" />
              <span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.32em] text-[#5A6068]">
                ÆONS
              </span>
            </div>
          </div>
        </>
      )}

      {/* =============================================================== */}
      {/* CONTENT LAYER                                                   */}
      {/* =============================================================== */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1480px] flex-col px-6 pt-28 pb-20 md:px-10 md:pt-36 md:pb-24 lg:px-14 lg:pt-40 lg:pb-28 min-h-[68vh] md:min-h-[78vh]">
        {/* --- TOP RAIL — eyebrow + breadcrumb -------------------------- */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_auto] md:items-baseline md:gap-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#9CA3AF]">
            <span className="text-[#F4F4F2]">{resolvedEyebrow}</span>
            <span className="mx-3 text-[#1F242B]">·</span>
            <span className="text-[#5A6068]">MARCO ISLAND · EST. 2024</span>
          </p>

          <nav aria-label="Breadcrumb" className="md:justify-self-end">
            <ol
              role="list"
              className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10.5px] uppercase tracking-[0.28em]"
            >
              {crumbs.map((c, i) => (
                <li key={`${c.label}-${i}`} className="flex items-center">
                  {i > 0 ? (
                    <span aria-hidden className="mr-2 text-[#1F242B]">
                      /
                    </span>
                  ) : null}
                  {c.isLast || !c.href ? (
                    <span
                      aria-current={c.isLast ? "page" : undefined}
                      className="text-[#F4F4F2]"
                    >
                      {c.label}
                    </span>
                  ) : (
                    <Link
                      href={c.href}
                      className="text-[#9CA3AF] underline-offset-[6px] transition-colors hover:text-[#22F0D5] hover:underline focus-visible:text-[#22F0D5] focus-visible:underline focus-visible:outline-none"
                    >
                      {c.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>

        {/* --- MID RAIL — display headline + lede ---------------------- */}
        <div className="mt-16 grid grid-cols-1 gap-10 md:mt-24 lg:mt-28 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
          <h1
            ref={headingRef}
            id={headlineId}
            data-state={mounted ? "revealed" : "initial"}
            className="v3-hero-h1 max-w-[18ch] text-balance text-[#F4F4F2]"
          >
            {title}
          </h1>

          <div className="flex flex-col gap-10 lg:pt-4">
            {/* Hairline tick — anchors the lede to the headline's baseline
                without competing for attention. The lede reads after. */}
            <span
              aria-hidden
              className="block h-px w-10 bg-[#22F0D5]/70"
            />

            <p className="v3-hero-lede max-w-[42ch] text-balance text-[17px] leading-[1.6] text-[#9CA3AF] md:text-[19px] md:leading-[1.58]">
              {lede}
            </p>

            {primaryCta ? (
              <div>
                {isExternalHref(primaryCta.href) ? (
                  <a
                    href={primaryCta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="v3-hero-cta group/cta inline-flex items-center gap-3 border border-[#1F242B] bg-[#0F1114]/60 px-6 py-3.5 font-mono text-[12px] uppercase tracking-[0.24em] text-[#F4F4F2] backdrop-blur-sm transition-[color,border-color,background-color] duration-200 hover:border-[#22F0D5] hover:text-[#22F0D5] focus-visible:border-[#22F0D5] focus-visible:text-[#22F0D5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22F0D5]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08090B]"
                  >
                    <span>{primaryCta.label}</span>
                    <span
                      aria-hidden
                      className="inline-block transition-transform duration-200 group-hover/cta:translate-x-1 group-focus-visible/cta:translate-x-1"
                    >
                      →
                    </span>
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                ) : (
                  <Link
                    href={primaryCta.href}
                    className="v3-hero-cta group/cta inline-flex items-center gap-3 border border-[#1F242B] bg-[#0F1114]/60 px-6 py-3.5 font-mono text-[12px] uppercase tracking-[0.24em] text-[#F4F4F2] backdrop-blur-sm transition-[color,border-color,background-color] duration-200 hover:border-[#22F0D5] hover:text-[#22F0D5] focus-visible:border-[#22F0D5] focus-visible:text-[#22F0D5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22F0D5]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08090B]"
                  >
                    <span>{primaryCta.label}</span>
                    <span
                      aria-hidden
                      className="inline-block transition-transform duration-200 group-hover/cta:translate-x-1 group-focus-visible/cta:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                )}
              </div>
            ) : null}
          </div>
        </div>

        {/* --- BOTTOM RAIL — live signal strip ------------------------- */}
        <div className="mt-auto pt-20 md:pt-24">
          <div className="grid grid-cols-1 items-end gap-6 border-t border-[#1F242B] pt-5 md:grid-cols-[1fr_auto] md:gap-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#5A6068]">
              <span className="text-[#9CA3AF]">/{signalSlug}</span>
              <span className="mx-3 text-[#1F242B]">·</span>
              <span>build —</span>
              <span className="mx-3 text-[#1F242B]">·</span>
              <span>last commit —</span>
              <span className="mx-3 text-[#1F242B]">·</span>
              <span>cc-by 4.0</span>
            </p>

            <div
              className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[#5A6068] md:justify-self-end"
              aria-label="Live build signal"
            >
              <span className="text-[#9CA3AF]">LIVE</span>
              <span className="relative flex h-2 w-2" aria-hidden>
                <span className="v3-hero-pulse absolute inline-flex h-full w-full rounded-full bg-[#FF4D4D] opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF4D4D]" />
              </span>
              <span className="sr-only">
                The lab is operating. This page is served from a live
                build, not a static snapshot.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* =============================================================== */}
      {/* SCOPED STYLES                                                   */}
      {/* =============================================================== */}
      <style>{`
        /*
         * The signature move — variable-weight reveal.
         *   Two CSS variables drive every visual aspect of the headline:
         *     --reveal  0→1   mount-driven animation (720ms ease)
         *     --scroll  0→1   scroll-coupled nudge (small, optional)
         *   wght axis = 100 + 800*reveal + 40*scroll  (clamped 100..940)
         *   tracking  = 0.04em + -0.08em*reveal + -0.01em*scroll
         *   One font file. Real Inter Variable wght axis. No swap.
         */
        .v3-hero-h1 {
          --reveal: 0;
          --scroll: 0;
          font-family: var(--font-inter), "Inter Variable", Inter,
            ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto,
            sans-serif;
          font-size: clamp(40px, 7.2vw, 120px);
          line-height: 0.96;
          font-variation-settings:
            "wght" calc(100 + var(--reveal) * 800 + var(--scroll) * 40);
          letter-spacing: calc(
            0.04em + var(--reveal) * -0.08em + var(--scroll) * -0.01em
          );
          transition:
            font-variation-settings 720ms cubic-bezier(0.22, 1, 0.36, 1),
            letter-spacing 720ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .v3-hero-h1[data-state="revealed"] {
          --reveal: 1;
        }

        /*
         * Editorial serif fallback chain.
         *   Matches the chain established in V3/Curriculum so both
         *   surfaces render the same face. Newsreader is intended;
         *   the chain renders a credible serif on every platform
         *   while the webfont loads (or if it's not yet wired).
         */
        .v3-hero-lede {
          font-family: "Newsreader", Charter, "Iowan Old Style",
            "Apple Garamond", "Georgia", ui-serif, serif;
          font-feature-settings: "ss01", "kern";
        }

        /*
         * Photo grain — tasteful filmic noise. Single small inline SVG
         * (kept under 4kb) avoids a network request and preserves
         * lighthouse perf. Blended at 6% over the photo only.
         */
        .v3-hero-grain {
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
          background-size: 160px 160px;
        }

        /*
         * Photo motion — static on arrival, per winning rationale.
         *   No Ken Burns. No parallax. The composition is the discipline.
         *   We allow a single, almost-imperceptible scale settle on mount
         *   (1.03 → 1.0 over 1.2s) which reads as a camera locking focus,
         *   not as panning. Reduced motion kills this entirely.
         */
        .v3-hero-photo {
          transform: scale(1.03);
          transform-origin: center 45%;
          transition: transform 1200ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        [data-state="revealed"] ~ .v3-hero-photo,
        [data-hero-variant="cinema"] .v3-hero-photo {
          transform: scale(1);
        }

        /*
         * Pulse — 1.2s heartbeat. Same cadence as the homepage and the
         * curriculum panel so a user moving between surfaces sees one
         * continuous signal.
         */
        @keyframes v3-hero-pulse {
          0%   { transform: scale(1);   opacity: 0.7; }
          70%  { transform: scale(2.4); opacity: 0;   }
          100% { transform: scale(2.4); opacity: 0;   }
        }
        .v3-hero-pulse {
          animation: v3-hero-pulse 1.2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        /*
         * prefers-reduced-motion: kill every animation/transition the
         * hero owns and snap to final state. CTA color-state on hover/
         * focus is preserved because state ≠ motion.
         */
        @media (prefers-reduced-motion: reduce) {
          .v3-hero-h1 {
            transition: none !important;
            --reveal: 1;
            --scroll: 0;
          }
          .v3-hero-photo {
            transition: none !important;
            transform: scale(1) !important;
          }
          .v3-hero-pulse {
            animation: none !important;
            opacity: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}

export default InteriorHero;
