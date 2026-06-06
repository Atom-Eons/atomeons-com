import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Aesthetic · V3 noir visual language · AtomEons",
  description:
    "The lab's visual language explained. Noir palette, Newsreader/Inter/JetBrains typography stack, motion principles, the living sacred-geometry canvas math. Downloadable for press use.",
  alternates: { canonical: "https://atomeons.com/aesthetic" },
};

/**
 * /aesthetic — visual language manifesto.
 *
 * Operator's working principle: visual language should be authored, not
 * defaulted. This page documents every deliberate choice so future
 * surfaces can be added in the same dialect.
 */

const PALETTE = [
  { hex: "#08090B", name: "BASE", role: "Body / page background. Almost-black, holds the SacredCanvas without crushing it." },
  { hex: "#0F1114", name: "PANEL", role: "Card / surface elevation 1. Hairline lighter than base." },
  { hex: "#0B0C0F", name: "INSET", role: "Recessed surface (e.g. answer blocks). One tone darker than panel." },
  { hex: "#F4F4F2", name: "CREAM", role: "Primary text. Off-white. Calmer than pure white." },
  { hex: "#9CA3AF", name: "GRAPHITE", role: "Secondary text. Body prose, captions, meta." },
  { hex: "#5A6068", name: "IRON", role: "Tertiary text / dividers. Annotations, ticker tape." },
  { hex: "#1F242B", name: "HAIR", role: "Borders. 1px hairlines that read at any zoom." },
  { hex: "#22F0D5", name: "CYAN", role: "Single accent. Used for active state, hover, CTAs. Never two accents." },
  { hex: "#FF4D4D", name: "PULSE-RED", role: "Live state · alert · LIVE badges. Reserved." },
  { hex: "#C9A55C", name: "GOLD", role: "Frame rules · ledger lines · premium signal. Sparingly." },
  { hex: "#B5302A", name: "OXBLOOD", role: "Book / publication marker. Reserved for I AM AI surfaces." },
];

const TYPE = [
  { face: "Newsreader Variable", role: "Editorial / headline serif. Sentence-case. opsz axis live.", url: "https://fonts.google.com/specimen/Newsreader" },
  { face: "Inter Variable", role: "UI sans / nav / labels. wght axis live for variable-weight reveal motion.", url: "https://rsms.me/inter/" },
  { face: "JetBrains Mono", role: "Receipts · counters · tabular numbers · cap tracking 0.22em.", url: "https://www.jetbrains.com/lp/mono/" },
];

const RULES = [
  "Single accent. Cyan #22F0D5. Never two competing accents on one surface.",
  "Sentence-case everywhere. Title-case is for press releases we don't write.",
  "Headlines: Newsreader serif at 44–88px, light (300) weight, tight tracking (-0.025em).",
  "Mono caps with 0.22em tracking are the ledger voice. Always 10–12px.",
  "Hairlines are 1px. Never 2px. Never 0.5px. If it needs more weight, restructure.",
  "Premium restraint over decoration. If a stroke earns its place, it stays.",
  "Cyan is functional, not ornamental. Hovers, actives, accents.",
  "Photos are reserved for products and the operator. Otherwise pure procedural visuals.",
  "Animation is informational, not entertaining. If it doesn't carry meaning, it doesn't ship.",
  "Reading width caps at 72ch for prose, 5xl (1024px) for grids.",
];

const MOTION = [
  "Variable-Weight Reveal · text gains weight on scroll-into-view via Inter's wght axis.",
  "Cursor as cyan block · 9×19px filled rect, blinks on inputs. Same cell shape every surface.",
  "Border focus state · hairline transitions from #1F242B to #22F0D5 in 150ms.",
  "Hover lift · 1px translate · 150ms ease-out. Never scale.",
  "Page entry · no slam transitions. Content arrives in document order at default speed.",
];

const CANVAS = [
  { what: "Spiral", math: "i × 137.50776° · golden angle phyllotaxis" },
  { what: "Polygons", math: "3 · 6 · 12 sides · counter-rotating at φ-scaled rates" },
  { what: "Rays", math: "12 · radius modulated by π / e / φ sin sum · never repeats" },
  { what: "Lissajous", math: "3 superimposed curves at π/e · φ/π · e/φ ratios · aperiodic" },
  { what: "Color", math: "cyan #22F0D5 · 4–18% opacity · mix-blend-mode screen" },
  { what: "Render", math: "Canvas2D · 30fps cap · ~3ms / frame · ~7 KB minified" },
];

export default function AestheticPage() {
  return (
    <main className="min-h-screen text-[#F4F4F2]">
      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9CA3AF]">§ visual language · V3 noir</p>
          <h1 className="mt-6 font-serif text-[44px] font-light leading-[1.04] tracking-[-0.025em] md:text-[64px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            Every choice is deliberate.
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-[18px] leading-[1.55] text-[#9CA3AF] md:text-[20px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            Default visual language ages badly. Authored visual language
            holds up. This page documents the lab's authoring rules so
            future surfaces ship in the same dialect.
          </p>
        </div>
      </section>

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ palette</p>
          <div className="mt-10 grid gap-3 md:grid-cols-2">
            {PALETTE.map((p) => (
              <div key={p.hex} className="flex items-stretch gap-4 border border-[#1F242B] bg-[#0F1114]">
                <div className="w-24 shrink-0" style={{ backgroundColor: p.hex }} aria-hidden />
                <div className="py-3 pr-4">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#F4F4F2]">{p.name}</p>
                    <p className="font-mono text-[11px] tabular-nums text-[#5A6068]">{p.hex}</p>
                  </div>
                  <p className="mt-2 font-serif text-[13px] leading-[1.5] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{p.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ typography stack</p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {TYPE.map((t) => (
              <a key={t.face} href={t.url} target="_blank" rel="noopener noreferrer" className="group border border-[#1F242B] bg-[#0F1114] p-5 transition-colors hover:border-[#22F0D5]">
                <p className="font-serif text-[24px] font-light text-[#F4F4F2]" style={{ fontFamily: t.face.includes("Newsreader") ? "Newsreader, Georgia, serif" : t.face.includes("JetBrains") ? "ui-monospace, monospace" : "Inter, sans-serif" }}>
                  {t.face}
                </p>
                <p className="mt-3 font-serif text-[13px] leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{t.role}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ authoring rules</p>
          <ol className="mt-8 space-y-4">
            {RULES.map((r, i) => (
              <li key={i} className="flex items-baseline gap-4 border-b border-[#1F242B] pb-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A6068]">{String(i + 1).padStart(2, "0")}</span>
                <p className="font-serif text-[17px] leading-[1.5] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{r}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ motion principles</p>
          <ul className="mt-8 space-y-3">
            {MOTION.map((m, i) => (
              <li key={i} className="flex items-baseline gap-4 border-b border-[#1F242B] pb-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A6068]">{String(i + 1).padStart(2, "0")}</span>
                <p className="font-serif text-[15px] leading-[1.55] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{m}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ the SacredCanvas · sacred geometry runtime</p>
          <p className="mt-6 max-w-2xl font-serif text-[16px] leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            Site-wide procedural background. Single Canvas2D layer running
            four nested mathematical systems. No images, no video, no
            external assets. ~7 KB minified, ~3ms / frame. Look up at any
            empty area of the page — it&apos;s already drawing.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {CANVAS.map((c) => (
              <div key={c.what} className="border border-[#1F242B] bg-[#0F1114] p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">{c.what}</p>
                <p className="mt-3 font-serif text-[16px] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{c.math}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A6068]">
            inspiration vector · GeoMusica (TouchDesigner) · Refik Anadol (data fluidity) · Raven Kwok (procedural minimalism)
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ press use</p>
          <p className="mt-4 max-w-2xl font-serif text-[16px] leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            Press kit, logo, and brand assets are at /press/assets. For
            extended reuse beyond press, the visual system is licensed
            CC-BY 4.0 alongside the rest of the lab's content.
          </p>
          <div className="mt-10 grid gap-3 md:grid-cols-3">
            {[
              { href: "/press", label: "Press kit" },
              { href: "/manifesto", label: "Operating manifesto" },
              { href: "/design-system", label: "Design system reference" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="group border border-[#1F242B] bg-[#0F1114] p-4 transition-colors hover:border-[#22F0D5]">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A6068] transition-colors group-hover:text-[#22F0D5]">
                  atomeons.com{l.href}
                </p>
                <p className="mt-2 font-serif text-[17px] font-medium" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{l.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
