'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

/**
 * § 03 · Products — Orangebox and B00KMakor
 *
 * Noir-cinema register. Two products, given the gravity they earn.
 * Restrained luxury. Editorial photography. Variable-weight reveal on title.
 * Live mono receipts, hairline borders, single bio-cyan thread as live-signal.
 *
 * Pattern: full-bleed editorial spread. Title slab at top using the signature
 * variable-weight reveal. Two product panels below — first sticky-tall (Orangebox,
 * the revenue product), second editorial-still (B00KMakor, the artifact).
 * Each panel: full-bleed photograph, hairline-bordered meta strip, Newsreader
 * serif description, mono SKU/price/status, single quiet enter-link.
 *
 * No CTAs in marketing register. No badges, no "as seen on", no testimonials.
 * If the work is real, the page reads like the lab built it. Not like the lab
 * is selling it.
 */

type Receipt = {
  sku: string;
  price: string;
  status: 'SHIPPING' | 'IN PRESS' | 'BETA';
  unit: string;
  build: string;
};

const PRODUCTS: Array<{
  index: string;
  name: string;
  kicker: string;
  lede: string;
  body: string;
  href: string;
  enterLabel: string;
  image: { src: string; alt: string };
  receipt: Receipt;
  spec: Array<{ k: string; v: string }>;
}> = [
  {
    index: '03.1',
    name: 'Orangebox',
    kicker: 'Runtime cockpit · Workstation',
    lede: 'A local-first command surface for Claude Code, Codex, and the AtomEons agent fleet — operated from one keyboard, not seventeen tabs.',
    body:
      'Orangebox runs on your machine. It treats the agents you already pay for as a fleet: prime sessions cold, route work between Opus and Sonnet, pull receipts, ship to Vercel, never wait on a hosted dashboard. One install. One price. Forever update.',
    href: '/orangebox',
    enterLabel: 'Enter Orangebox',
    image: {
      src: '/cyber-images/orangebox-hero.jpg',
      alt: 'Orangebox terminal cockpit photographed at 35mm on a maple workbench, Marco Island morning light.',
    },
    receipt: {
      sku: 'ATOM-OBX-2026',
      price: 'USD $49',
      status: 'SHIPPING',
      unit: 'one-time · forever',
      build: 'v1.4.0',
    },
    spec: [
      { k: 'Runs on', v: 'Win 11 · macOS 14+ · Ubuntu 22+' },
      { k: 'License', v: 'Single seat, lifetime' },
      { k: 'Ships with', v: 'Codexa · 27 guardrails · Æ skill suite' },
      { k: 'Refund', v: '30-day, no questions' },
    ],
  },
  {
    index: '03.2',
    name: 'B00KMakor',
    kicker: 'Long-form authoring engine · Print artifact',
    lede: 'A writing engine for people who finish books. Strata intake, durable canon, integrity pass, print-ready typography — the loop a manuscript needs to survive itself.',
    body:
      'B00KMakor compiles your notes, transcripts, drafts, and source material into a single durable manuscript with a real integrity pass. Outputs a clean EPUB, a typeset PDF, and a print-ready interior. It does not write the book for you. It refuses to let the book die in the third draft.',
    href: '/b00kmakor',
    enterLabel: 'Enter B00KMakor',
    image: {
      src: '/cyber-images/b00kmakor-hero.jpg',
      alt: 'B00KMakor typeset proof sheet on cold-pressed paper, single tungsten lamp overhead, no other props.',
    },
    receipt: {
      sku: 'ATOM-BKM-2026',
      price: 'USD $79',
      status: 'IN PRESS',
      unit: 'one-time · lifetime updates',
      build: 'v0.9.2',
    },
    spec: [
      { k: 'Outputs', v: 'EPUB · PDF · InDesign IDML · plain TeX' },
      { k: 'Pipeline', v: 'Strata · canon · integrity · typeset' },
      { k: 'Co-authoring', v: 'Claude · GPT · Gemini trilane' },
      { k: 'Sample run', v: '180-page draft in 6 minutes' },
    ],
  },
];

export default function Products() {
  // Variable-weight reveal: as the title block enters the viewport, the H2 thickens
  // from font-weight 100 to 900 over the first 400px of scroll past the section top,
  // while letter-spacing tightens from 0.04em to -0.04em. The headline does not move.
  // Single rAF-driven CSS variable. Reduced-motion users get the final state immediately.
  const sectionRef = useRef<HTMLElement | null>(null);
  const [reveal, setReveal] = useState<number>(0); // 0 → 1

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setReveal(1);
      return;
    }

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const el = sectionRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        // Begin reveal when the section top hits ~85% of viewport, complete by 400px past that.
        const start = window.innerHeight * 0.85;
        const distance = 400;
        const progress = (start - rect.top) / distance;
        setReveal(Math.max(0, Math.min(1, progress)));
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const weight = Math.round(100 + reveal * 800); // 100 → 900
  const tracking = (0.04 - reveal * 0.08).toFixed(4); // 0.04em → -0.04em

  return (
    <section
      ref={sectionRef}
      aria-labelledby="products-heading"
      className="relative w-full bg-[#08090B] text-[#F4F4F2]"
    >
      {/* Section index strip — mono, single hairline, Anduril-press register */}
      <div className="border-t border-b border-[#1F242B]">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-12">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#5A6068]">
            § 03 · Products
          </span>
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.22em] text-[#5A6068] md:inline">
            Two artifacts · shipping from Marco Island
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#5A6068]">
            <span
              className="mr-2 inline-block h-[6px] w-[6px] -translate-y-[1px] animate-pulse rounded-full bg-[#FF4D4D] align-middle"
              aria-hidden
            />
            Live
          </span>
        </div>
      </div>

      {/* Title slab — the signature variable-weight reveal */}
      <div className="mx-auto max-w-[1600px] px-6 pt-24 pb-16 md:px-12 md:pt-40 md:pb-24">
        <p className="mb-10 font-mono text-[11px] uppercase tracking-[0.22em] text-[#9CA3AF]">
          The work, not the pitch
        </p>
        <h2
          id="products-heading"
          className="text-[#F4F4F2] leading-[0.92] will-change-[font-variation-settings]"
          style={{
            fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
            fontSize: 'clamp(56px, 11vw, 200px)',
            fontVariationSettings: `"wght" ${weight}`,
            letterSpacing: `${tracking}em`,
            transition: 'font-variation-settings 120ms linear, letter-spacing 120ms linear',
          }}
        >
          What the
          <br />
          lab ships
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-12 md:mt-16 md:grid-cols-12">
          <p
            className="md:col-span-7 md:col-start-1 text-[#9CA3AF]"
            style={{
              fontFamily: 'Newsreader, Georgia, "Times New Roman", serif',
              fontSize: 'clamp(19px, 1.4vw, 22px)',
              lineHeight: 1.58,
              letterSpacing: '-0.005em',
            }}
          >
            Two products. Both built in this lab. Both priced once. Both with the
            source of the receipts behind them. Orangebox is the runtime cockpit
            we use every day. B00KMakor is the authoring engine we built because
            no existing tool would finish the book.
          </p>
          <div className="md:col-span-4 md:col-start-9 self-end">
            <dl className="grid grid-cols-2 gap-x-8 gap-y-4 border-t border-[#1F242B] pt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-[#5A6068]">
              <div>
                <dt className="text-[#5A6068]">Shipping</dt>
                <dd className="mt-1 text-[#F4F4F2]">2 of 2</dd>
              </div>
              <div>
                <dt className="text-[#5A6068]">Origin</dt>
                <dd className="mt-1 text-[#F4F4F2]">Marco Island, FL</dd>
              </div>
              <div>
                <dt className="text-[#5A6068]">License</dt>
                <dd className="mt-1 text-[#F4F4F2]">One-time, lifetime</dd>
              </div>
              <div>
                <dt className="text-[#5A6068]">Refund</dt>
                <dd className="mt-1 text-[#F4F4F2]">30 days</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Product panels — full-bleed, one per fold */}
      <div className="border-t border-[#1F242B]">
        {PRODUCTS.map((p, i) => (
          <ProductPanel key={p.name} product={p} flipped={i % 2 === 1} />
        ))}
      </div>

      {/* Colophon strip — closes the section the way an editorial spread does */}
      <div className="border-t border-[#1F242B]">
        <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-4 px-6 py-8 font-mono text-[11px] uppercase tracking-[0.22em] text-[#5A6068] md:flex-row md:items-center md:px-12">
          <span>End of § 03</span>
          <span className="hidden md:inline">
            All prices in USD · billed once · no subscriptions
          </span>
          <span>
            <span
              className="mr-2 inline-block h-[6px] w-[6px] -translate-y-[1px] animate-pulse rounded-full bg-[#FF4D4D] align-middle"
              aria-hidden
            />
            Receipts at /receipts
          </span>
        </div>
      </div>
    </section>
  );
}

function ProductPanel({
  product,
  flipped,
}: {
  product: (typeof PRODUCTS)[number];
  flipped: boolean;
}) {
  const [hover, setHover] = useState(false);

  return (
    <article
      className="group relative border-b border-[#1F242B]"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 md:grid-cols-12">
        {/* Photograph column — subtle product photography, full bleed, no Ken Burns */}
        <div
          className={[
            'relative md:col-span-7',
            flipped ? 'md:order-2 md:col-start-6' : 'md:order-1 md:col-start-1',
          ].join(' ')}
        >
          <div className="relative aspect-[5/6] w-full overflow-hidden bg-[#0F1114] md:aspect-[4/5] md:min-h-[760px]">
            <Image
              src={product.image.src}
              alt={product.image.alt}
              fill
              sizes="(min-width: 768px) 58vw, 100vw"
              priority={false}
              className={[
                'object-cover transition-transform duration-[1400ms] ease-out',
                hover ? 'scale-[1.015]' : 'scale-100',
              ].join(' ')}
            />
            {/* Filmic vignette — keeps it Magnum, not stock */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(120% 80% at 50% 40%, rgba(8,9,11,0) 0%, rgba(8,9,11,0) 55%, rgba(8,9,11,0.45) 100%)',
              }}
            />
            {/* Hairline frame */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 border border-[#1F242B] mix-blend-normal"
            />
            {/* Top-left index in mono — gallery-print register */}
            <div className="absolute left-5 top-5 font-mono text-[10px] uppercase tracking-[0.24em] text-[#9CA3AF] md:left-8 md:top-8">
              § {product.index}
            </div>
            {/* Bottom-left photo caption — single line, Newsreader italic */}
            <div
              className="absolute bottom-5 left-5 max-w-[80%] text-[#9CA3AF] md:bottom-8 md:left-8"
              style={{
                fontFamily: 'Newsreader, Georgia, "Times New Roman", serif',
                fontStyle: 'italic',
                fontSize: '13px',
                lineHeight: 1.5,
              }}
            >
              {product.image.alt}
            </div>
          </div>
        </div>

        {/* Copy column */}
        <div
          className={[
            'relative md:col-span-5 flex flex-col',
            flipped ? 'md:order-1 md:col-start-1' : 'md:order-2 md:col-start-8',
          ].join(' ')}
        >
          <div className="flex h-full flex-col justify-between px-6 py-14 md:px-12 md:py-20">
            <header>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#5A6068]">
                {product.kicker}
              </p>
              <h3
                className="mt-6 text-[#F4F4F2]"
                style={{
                  fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                  fontSize: 'clamp(40px, 5.6vw, 80px)',
                  fontVariationSettings: '"wght" 700',
                  letterSpacing: '-0.025em',
                  lineHeight: 0.98,
                }}
              >
                {product.name}
              </h3>
              <p
                className="mt-8 max-w-[44ch] text-[#F4F4F2]"
                style={{
                  fontFamily: 'Newsreader, Georgia, "Times New Roman", serif',
                  fontSize: 'clamp(19px, 1.35vw, 22px)',
                  lineHeight: 1.5,
                  letterSpacing: '-0.005em',
                }}
              >
                {product.lede}
              </p>
              <p
                className="mt-6 max-w-[48ch] text-[#9CA3AF]"
                style={{
                  fontFamily: 'Newsreader, Georgia, "Times New Roman", serif',
                  fontSize: '17px',
                  lineHeight: 1.65,
                }}
              >
                {product.body}
              </p>
            </header>

            {/* Spec list — academic register, no marketing bullets */}
            <dl className="mt-12 grid grid-cols-1 gap-x-6 gap-y-3 border-t border-[#1F242B] pt-8 font-mono text-[12px] uppercase tracking-[0.16em] md:grid-cols-2">
              {product.spec.map((s) => (
                <div key={s.k} className="flex flex-col">
                  <dt className="text-[11px] tracking-[0.22em] text-[#5A6068]">{s.k}</dt>
                  <dd className="mt-1 text-[#F4F4F2] normal-case tracking-[0.04em]">{s.v}</dd>
                </div>
              ))}
            </dl>

            {/* Receipt panel — hairline-bordered, live-signal accent, the trust vector */}
            <div
              className="mt-10 border border-[#1F242B] bg-[#0F1114]/60 p-5 md:p-6"
              style={{ backdropFilter: 'blur(2px)' }}
            >
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.24em] text-[#5A6068]">
                <span>Receipt</span>
                <span className="flex items-center gap-2">
                  <span
                    className="inline-block h-[6px] w-[6px] animate-pulse rounded-full bg-[#22F0D5]"
                    aria-hidden
                  />
                  {product.receipt.status}
                </span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 font-mono text-[13px] text-[#F4F4F2]">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-[#5A6068]">SKU</div>
                  <div className="mt-1 tabular-nums">{product.receipt.sku}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-[#5A6068]">Build</div>
                  <div className="mt-1 tabular-nums">{product.receipt.build}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-[#5A6068]">Price</div>
                  <div
                    className="mt-1 tabular-nums text-[#F4F4F2]"
                    style={{ fontVariationSettings: '"wght" 600' }}
                  >
                    {product.receipt.price}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-[#5A6068]">Terms</div>
                  <div className="mt-1 text-[#9CA3AF]">{product.receipt.unit}</div>
                </div>
              </div>
            </div>

            {/* Enter link — single quiet CTA, no button shape, no shadow, no gradient */}
            <div className="mt-10 flex items-center justify-between border-t border-[#1F242B] pt-6">
              <Link
                href={product.href}
                aria-label={`${product.enterLabel} — ${product.name}`}
                className="group/link inline-flex items-baseline gap-3 text-[#F4F4F2]"
                style={{
                  fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
                  fontSize: '17px',
                  letterSpacing: '-0.005em',
                  fontVariationSettings: '"wght" 500',
                }}
              >
                <span className="relative">
                  {product.enterLabel}
                  <span
                    aria-hidden
                    className="absolute -bottom-[2px] left-0 h-px w-full origin-left scale-x-100 bg-[#F4F4F2] transition-transform duration-500 ease-out group-hover/link:scale-x-0"
                  />
                  <span
                    aria-hidden
                    className="absolute -bottom-[2px] left-0 h-px w-full origin-right scale-x-0 bg-[#22F0D5] transition-transform duration-500 ease-out group-hover/link:scale-x-100"
                  />
                </span>
                <span
                  aria-hidden
                  className="font-mono text-[14px] text-[#5A6068] transition-transform duration-500 ease-out group-hover/link:translate-x-1 group-hover/link:text-[#22F0D5]"
                >
                  &rarr;
                </span>
              </Link>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A6068]">
                /{product.name.toLowerCase()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
