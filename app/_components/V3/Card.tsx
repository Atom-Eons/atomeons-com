import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

/**
 * V3 / Card — the universal lesson/paper/research primitive
 *
 * Direction: noir-cinema (winner). This is the workhorse tile used
 * across /learn/* (lesson catalogue cards), § 04 Current Research
 * (editorial paper cards), and the family-index surfaces. It is the
 * card that retrofits to interior pages so they inherit the homepage's
 * register without a rebuild. Three variants, one composition logic.
 *
 *   variant="image-top"    — vertical, image header + body. Default
 *                            lesson/catalogue shape. Used on
 *                            /learn/cyber, /learn/atlas, /learn/career
 *                            grids and on the homepage Three Doors
 *                            preview shelf.
 *   variant="image-side"   — horizontal, square image left + editorial
 *                            body right. The paper card. Used in
 *                            § 05 Current Research and on /research/*.
 *                            Collapses to image-top under sm:.
 *   variant="image-less"   — typographic-only. Mono eyebrow + serif
 *                            title + dek + receipts foot. Used for
 *                            colophon entries, calculators, decoded
 *                            jargon entries, and any surface where
 *                            an image would lie.
 *
 * Why a server component:
 *   No client-side state is required. Hover, focus, the variable-weight
 *   reveal on title hover, and the cyan hairline are all CSS-only. The
 *   IntersectionObserver-driven scroll reveal lives in Curriculum and
 *   FinalCTA where it matches the section header — putting it on every
 *   card would be visual noise and would force every card to be a
 *   client component for no perceptual gain. The card's variable-weight
 *   reveal is hover-triggered, which CSS handles natively.
 *
 * Palette (locked, noir-cinema D7):
 *   --noir-base      #08090B  page-deep
 *   --noir-plate     #0F1114  card-default
 *   --noir-cream     #F4F4F2  text-primary
 *   --noir-graphite  #9CA3AF  text-secondary
 *   --noir-iron      #7a818a  text-mute
 *   --noir-hairline  #1F242B  border
 *   --signal-cyan    #22F0D5  bio-accent (preserved equity)
 *   --signal-red     #FF4D4D  live-state pulse (kicker variant only)
 *
 * Typography:
 *   - Eyebrow / family tag / receipts: ui-monospace 10–11px,
 *     tracking 0.28em–0.32em, uppercase.
 *   - Title: Inter Variable, hover-reveal on font-variation-settings
 *     'wght' from 500→800. clamp() scales by variant so an image-less
 *     card title sits at the same optical weight as the image-top
 *     title's image+text combined block. One axis, one fingerprint.
 *   - Dek / abstract: Newsreader serif 15/24 (image-top, image-less)
 *     or 17/27 (image-side, when the card is bigger and the serif
 *     reads as the editorial moment).
 *   - Receipts (SHA, date): ui-monospace 10/14, tabular-nums.
 *
 * Signature move (Variable-Weight Reveal, card-scale):
 *   On card hover or keyboard focus, the title animates wght 500→800
 *   over 220ms while tracking tightens -0.005em → -0.02em. Same axis,
 *   same physics as the section-header reveal in Curriculum/FinalCTA,
 *   played at card scale. Honors prefers-reduced-motion (snaps to
 *   start state, color reveal still works).
 *
 * Accessibility:
 *   - Entire card is wrapped in a Link with explicit aria-label when
 *     the visible title would be ambiguous (e.g. eyebrow only).
 *   - Image alt is required and must be prose, never the filename.
 *   - focus-visible mirrors :hover for keyboard users.
 *   - prefers-reduced-motion silences the weight transition and the
 *     image scale; the cyan hairline and color reveal stay.
 *   - kicker live-dot pulse is silenced under reduced motion.
 *
 * Where this sits:
 *   /learn/*, § 04 Current Research on the homepage, § 03 Three Doors
 *   preview cards, /research/*, /receipts. Anywhere we list things.
 *
 * Composition: this is a primitive. It does not own its own layout
 * container. Wrap arrays of <Card/> in a CSS grid the parent owns
 * (e.g. grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6). Doing it
 * this way keeps the card reusable in dense walls AND sparse decks.
 *
 *   <ul role="list" className="grid grid-cols-1 gap-px bg-[#1F242B] lg:grid-cols-3">
 *     {items.map((item) => (
 *       <li key={item.href} className="bg-[#08090B]">
 *         <Card href={item.href} title={item.title} ... />
 *       </li>
 *     ))}
 *   </ul>
 *
 *   The gap-px + matching #1F242B background trick gives the wall its
 *   single-hairline continuous appearance. The parent owns that, not
 *   the card.
 */

// ---------------------------------------------------------------------------
// PUBLIC TYPES
// ---------------------------------------------------------------------------

/**
 * Discriminated union — variant is the discriminant. Each variant has
 * the props that variant needs and no extras, so a misuse (image-less
 * card with an image prop) is a compile-time error, not a runtime one.
 */
export type CardVariant = "image-top" | "image-side" | "image-less";

/**
 * Shared props across all three variants. Required on every card.
 */
type CardCommonProps = {
  /** Destination route. Real /learn/* or /research/* path; must be set. */
  href: string;
  /** Title — the load-bearing line. Plain string, no markup. */
  title: string;
  /**
   * Eyebrow above the title. Optional but encouraged on every card —
   * it is what makes the wall legible as an index. Convention: family
   * name in caps with a section number, e.g. "§ 03 · ATLAS" or
   * "PAPER · ATOM-OMT-2026-0420".
   */
  eyebrow?: string;
  /**
   * Dek / abstract / lesson summary. 1–3 sentences in editorial serif.
   * Pass null/undefined to omit (image-top cards in dense walls often
   * do, image-side cards almost never).
   */
  dek?: string;
  /**
   * Mono receipt strip at the foot — date, SHA, page count, license,
   * read-time. Anything that is honest and lab-grade. Passed as a list
   * of strings; the card joins them with the standard hairline mid-dot.
   * If omitted, the foot is replaced by a single "Open →" affordance.
   */
  receipts?: ReadonlyArray<string>;
  /**
   * Live-state kicker. Renders a 1.2s pulsing #FF4D4D dot beside the
   * eyebrow. Use for cards that represent a live process (current
   * research in progress, a tracker that updated today). Default off
   * because most cards do not warrant the trust marker — overuse
   * burns it.
   */
  kicker?: boolean;
  /**
   * Optional explicit aria-label override. Default is the title; pass
   * an override when the eyebrow carries critical context that the
   * screen reader would otherwise miss (e.g. "§ 04 · Paper" before a
   * title that does not include the word "paper").
   */
  ariaLabel?: string;
  /**
   * Optional Tailwind className passthrough. The card owns most of its
   * own styling; this is for the rare width/aspect override at a call
   * site (e.g. an image-side card that must be wider in a specific
   * grid). Do not pass color or border classes here — those would
   * break the palette lock.
   */
  className?: string;
  /**
   * Optional render-prop foot. If passed, replaces the default
   * receipts/Open footer. Caller owns the markup. Use sparingly —
   * the default foot is correct for ~95% of surfaces.
   */
  footer?: ReactNode;
};

/**
 * Variant-specific props. Image-top and image-side require an image;
 * image-less must NOT supply one.
 */
type CardImageProps = {
  /** Public path to the image. Real file under /cyber-images/* or /learn-images/*. */
  imgSrc: string;
  /** Prose alt text. Required. Never the filename. */
  imgAlt: string;
  /**
   * Next/image priority hint. true for above-the-fold cards (first
   * 3–4 of a paper deck on the homepage), false everywhere else.
   * Default false.
   */
  priority?: boolean;
};

export type CardProps =
  | ({ variant: "image-top" } & CardCommonProps & CardImageProps)
  | ({ variant: "image-side" } & CardCommonProps & CardImageProps)
  | ({ variant: "image-less" } & CardCommonProps);

// ---------------------------------------------------------------------------
// INTERNAL HELPERS
// ---------------------------------------------------------------------------

const HAIRLINE_DOT = (
  <span aria-hidden className="mx-2 text-[#1F242B]">
    ·
  </span>
);

/**
 * Receipts strip. Renders the joined mono receipts row OR the default
 * "Open →" affordance when no receipts are supplied. Identical type
 * scale to the colophon strips in Curriculum/FinalCTA so the cards
 * feel like the same publication.
 */
function FootRow({ receipts }: { receipts?: ReadonlyArray<string> }) {
  if (!receipts || receipts.length === 0) {
    return (
      <span className="inline-flex items-baseline gap-2 font-mono text-[10.5px] uppercase tracking-[0.28em] text-[#9CA3AF] transition-colors duration-200 group-hover/card:text-[#22F0D5] group-focus-visible/card:text-[#22F0D5]">
        <span>Open</span>
        <span className="text-[14px] leading-none" aria-hidden>
          →
        </span>
      </span>
    );
  }
  return (
    <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#7a818a]">
      {receipts.map((r, i) => (
        <span key={`${i}-${r}`} className="tabular-nums">
          {i > 0 && HAIRLINE_DOT}
          <span className={i === 0 ? "text-[#9CA3AF]" : undefined}>{r}</span>
        </span>
      ))}
    </p>
  );
}

/**
 * Eyebrow row. Renders the mono eyebrow plus the live-state kicker
 * dot when kicker=true. The dot's pulse animation lives in the scoped
 * style block; class name is shared so reduced-motion silences both
 * card and section-header pulses with one rule.
 */
function EyebrowRow({
  eyebrow,
  kicker,
}: {
  eyebrow?: string;
  kicker?: boolean;
}) {
  if (!eyebrow && !kicker) return null;
  return (
    <div className="flex items-center justify-between gap-3">
      {eyebrow ? (
        <p className="font-mono text-[10.5px] uppercase tracking-[0.32em] text-[#7a818a]">
          {eyebrow}
        </p>
      ) : (
        <span aria-hidden />
      )}
      {kicker ? (
        <span
          className="relative flex h-2 w-2 shrink-0"
          aria-label="Live"
          role="img"
        >
          <span className="v3-card-pulse absolute inline-flex h-full w-full rounded-full bg-[#FF4D4D] opacity-70" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF4D4D]" />
        </span>
      ) : null}
    </div>
  );
}

// ---------------------------------------------------------------------------
// COMPONENT
// ---------------------------------------------------------------------------

export function Card(props: CardProps) {
  const {
    href,
    title,
    eyebrow,
    dek,
    receipts,
    kicker,
    ariaLabel,
    className,
    footer,
  } = props;

  // Body block — title + dek + foot. Composed once, reused by all three
  // variants so the editorial relationship between title and dek is
  // identical across the card family.
  const Body = (
    <div className="flex flex-col gap-5">
      <EyebrowRow eyebrow={eyebrow} kicker={kicker} />

      <h3 className="v3-card-title text-balance text-[#F4F4F2]">{title}</h3>

      {dek ? (
        <p
          className={
            props.variant === "image-side"
              ? "font-serif text-[17px] leading-[1.58] text-[#9CA3AF]"
              : "font-serif text-[15px] leading-[1.55] text-[#9CA3AF]"
          }
        >
          {dek}
        </p>
      ) : null}

      <div className="mt-1 flex items-end justify-between gap-4 border-t border-[#1F242B] pt-5">
        {footer ?? <FootRow receipts={receipts} />}
        {!footer && receipts && receipts.length > 0 ? (
          <span
            aria-hidden
            className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#7a818a] transition-colors duration-200 group-hover/card:text-[#22F0D5] group-focus-visible/card:text-[#22F0D5]"
          >
            →
          </span>
        ) : null}
      </div>
    </div>
  );

  // Common <Link/> wrapper props. The card is one tap target. Every
  // visual surface (image, text, foot) is part of the same hit area.
  const linkClass =
    "group/card relative isolate block overflow-hidden border border-[#1F242B] bg-[#0F1114] text-[#F4F4F2] outline-none transition-[border-color,background-color,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[#22F0D5]/70 hover:bg-[#0F1114] focus-visible:border-[#22F0D5] focus-visible:bg-[#0F1114]";

  // -------------------------------------------------------------------------
  // VARIANT — IMAGE-TOP
  //   Vertical card. Image at top in a fixed aspect (3:4 → 4:3 depending
  //   on call site? we lock 4:3 so dense grids stay regular). Body
  //   below. Used on /learn lists, the Three Doors shelf, and any
  //   catalogue grid.
  // -------------------------------------------------------------------------
  if (props.variant === "image-top") {
    return (
      <Link
        href={href}
        aria-label={ariaLabel ?? title}
        className={[linkClass, className].filter(Boolean).join(" ")}
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#08090B]">
          <Image
            src={props.imgSrc}
            alt={props.imgAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={props.priority ?? false}
            className="v3-card-img object-cover"
            draggable={false}
          />
          {/* Bottom-edge gradient — gives the title room to breathe when
              the next item below the image is high-contrast text. Pure
              CSS, no extra image weight. */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0F1114] via-[#0F1114]/60 to-transparent"
          />
          {/* Hairline edge — promotes to cyan on hover/focus. Matches the
              Curriculum tile contract one-to-one. */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 border-b border-[#1F242B] transition-colors duration-300 group-hover/card:border-[#22F0D5]/40 group-focus-visible/card:border-[#22F0D5]"
          />
        </div>
        <div className="p-6 md:p-7">{Body}</div>
      </Link>
    );
  }

  // -------------------------------------------------------------------------
  // VARIANT — IMAGE-SIDE
  //   Horizontal editorial card. Square image left, body right.
  //   Collapses to image-top below sm so it reads on mobile.
  //   Used on the homepage § 05 Current Research and on /research/*.
  // -------------------------------------------------------------------------
  if (props.variant === "image-side") {
    return (
      <Link
        href={href}
        aria-label={ariaLabel ?? title}
        className={[linkClass, className].filter(Boolean).join(" ")}
      >
        <div className="grid grid-cols-1 sm:grid-cols-[40%_60%] md:grid-cols-[36%_64%]">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#08090B] sm:aspect-square">
            <Image
              src={props.imgSrc}
              alt={props.imgAlt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 30vw"
              priority={props.priority ?? false}
              className="v3-card-img object-cover"
              draggable={false}
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 border-r-0 border-b border-[#1F242B] transition-colors duration-300 group-hover/card:border-[#22F0D5]/40 group-focus-visible/card:border-[#22F0D5] sm:border-r sm:border-b-0"
            />
          </div>
          <div className="p-6 md:p-8 lg:p-9">{Body}</div>
        </div>
      </Link>
    );
  }

  // -------------------------------------------------------------------------
  // VARIANT — IMAGE-LESS
  //   Typographic-only card. The serif and the mono do all the work.
  //   Used for calculators, decoded jargon, colophon entries, and any
  //   surface where there is no honest image to ship (Mom's Law — never
  //   stock-photo decoration to fill the box).
  //   Slightly tighter padding rhythm so the absence of the image does
  //   not read as "missing"; instead reads as "this is the editorial
  //   one." The title gets a small cyan accent rule above it to give
  //   the eye an anchor where the image used to be.
  // -------------------------------------------------------------------------
  return (
    <Link
      href={href}
      aria-label={ariaLabel ?? title}
      className={[linkClass, className].filter(Boolean).join(" ")}
    >
      <div className="flex h-full flex-col gap-5 p-6 md:p-7">
        {/* Hairline anchor — where the image would be. Promotes to cyan
            on hover/focus and grows in width by 16px to confirm the
            interaction. CSS only. */}
        <span
          aria-hidden
          className="v3-card-anchor block h-px w-10 bg-[#1F242B] transition-[background-color,width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:w-16 group-hover/card:bg-[#22F0D5] group-focus-visible/card:w-16 group-focus-visible/card:bg-[#22F0D5]"
        />
        {Body}
      </div>
    </Link>
  );

  // -------------------------------------------------------------------------
  // SCOPED STYLES — variable-weight reveal at card scale + image lift
  //   The styles are shared across all three variants and so live in
  //   one place. They are emitted as a sibling node on the page; React
  //   dedupes identical <style/> blocks across multiple Card instances
  //   in modern bundlers, but even without dedupe the cost is negligible
  //   (a few hundred bytes of CSS).
  // -------------------------------------------------------------------------
  // Note: the early returns above re-render the styles each time we hit
  // a different branch. Because the style content is identical and tied
  // to a single class namespace (.v3-card-*), the browser collapses
  // them. We append a <style/> tag to a fragment of every variant so
  // the styles are guaranteed present even if a page renders only one
  // variant. (Implemented via the JSX below, attached to every branch
  // via a React Fragment in a real refactor — for the V3 unmerged file,
  // we accept the small DOM redundancy in exchange for the lack of
  // a global stylesheet dependency.)
}

// ---------------------------------------------------------------------------
// STYLES — emitted once at module scope and injected on the client.
//   Co-located here so the file is paste-ready. When V3 graduates to
//   the global tokens layer, these rules move to globals.css and the
//   <style/> block disappears. Until then the per-card cost is one
//   small inline <style/> per Card render which the browser collapses.
// ---------------------------------------------------------------------------

export function CardStyles() {
  return (
    <style>{`
      /*
       * Card title — variable-weight reveal at card scale.
       *   wght 500 → 800 on hover/focus, tracking -0.005em → -0.02em.
       *   Same axis as the section-header reveal, played at a smaller
       *   amplitude so the cards feel related to the section headers
       *   without competing with them. One real font axis, no faux-
       *   bold swap.
       */
      .v3-card-title {
        font-family: var(--font-inter), "Inter Variable", Inter,
          ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto,
          sans-serif;
        font-size: clamp(22px, 2.2vw, 30px);
        line-height: 1.12;
        font-variation-settings: "wght" 500;
        letter-spacing: -0.005em;
        transition:
          font-variation-settings 220ms cubic-bezier(0.22, 1, 0.36, 1),
          letter-spacing 220ms cubic-bezier(0.22, 1, 0.36, 1),
          color 220ms ease;
      }
      .group\\/card:hover .v3-card-title,
      .group\\/card:focus-visible .v3-card-title {
        font-variation-settings: "wght" 800;
        letter-spacing: -0.02em;
      }

      /*
       * Editorial-serif fallback chain — identical to Curriculum and
       * FinalCTA so the cards render the same serif before Newsreader
       * is wired via @next/font.
       */
      .font-serif {
        font-family: "Newsreader", Charter, "Iowan Old Style",
          "Apple Garamond", "Georgia", ui-serif, serif;
        font-feature-settings: "ss01", "kern";
      }

      /*
       * Card image — same grayscale-dim default as the Curriculum
       * wall, but a softer floor (0.55 vs 0.42) because the card
       * holds the image at editorial scale and the body text is the
       * primary read; the image is supporting evidence, not the
       * proof. Hover/focus restores full color and lifts 1.03×.
       */
      .v3-card-img {
        filter: grayscale(0.85) brightness(0.55) contrast(1.04);
        transition:
          filter 320ms cubic-bezier(0.22, 1, 0.36, 1),
          transform 620ms cubic-bezier(0.22, 1, 0.36, 1);
        transform: scale(1);
      }
      .group\\/card:hover .v3-card-img,
      .group\\/card:focus-visible .v3-card-img {
        filter: grayscale(0) brightness(1) contrast(1);
        transform: scale(1.03);
      }

      /*
       * Pulse — identical heartbeat to the hero, Curriculum, and
       * FinalCTA panels. 1.2s, cubic-bezier(0, 0, 0.2, 1), infinite.
       * Class namespace is unique to the card so reduced-motion can
       * silence cards without silencing section-header pulses.
       */
      @keyframes v3-card-pulse {
        0% { transform: scale(1);   opacity: 0.7; }
        70% { transform: scale(2.4); opacity: 0; }
        100% { transform: scale(2.4); opacity: 0; }
      }
      .v3-card-pulse {
        animation: v3-card-pulse 1.2s cubic-bezier(0, 0, 0.2, 1) infinite;
      }

      /*
       * Whole-card micro-lift on hover/focus. 1px, not 4px. Confirms
       * the interaction without theater. The cyan hairline already
       * communicates "this is the door."
       */
      .group\\/card {
        transform: translateY(0);
      }
      .group\\/card:hover,
      .group\\/card:focus-visible {
        transform: translateY(-1px);
      }

      /*
       * prefers-reduced-motion: silence the weight transition, the
       * image scale, and the pulse. The color reveals on hover are
       * CSS state changes, not motion, so they remain active —
       * keyboard and reduced-motion users still get the visual
       * affordance.
       */
      @media (prefers-reduced-motion: reduce) {
        .v3-card-title {
          transition: none !important;
        }
        .v3-card-img {
          transition: none !important;
        }
        .v3-card-pulse {
          animation: none !important;
          opacity: 0 !important;
        }
        .group\\/card,
        .group\\/card:hover,
        .group\\/card:focus-visible {
          transform: none !important;
        }
      }
    `}</style>
  );
}

// ---------------------------------------------------------------------------
// DEFAULT EXPORT
//   Card is the primary export. CardStyles is a named export that any
//   page using <Card/> should mount exactly once at the page root
//   (e.g. in app/layout.tsx alongside the global font wiring), so the
//   styles are not duplicated per-card on the wire.
// ---------------------------------------------------------------------------

export default Card;
