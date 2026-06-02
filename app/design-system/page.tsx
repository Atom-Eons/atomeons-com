import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

/**
 * /design-system — AtomEons design language, made public.
 *
 * Operator directive 2026-06-02: "best site for design inspiration."
 *
 * Stripe Press, IBM Carbon, Atlassian, Vercel Geist, Shopify Polaris —
 * the move in 2024-2026 is to make your design system a public artifact.
 * This page is ours. The reason it exists at all is the proof.
 *
 * Eloquent voice. Lab-grade prose. No platitudes ("we believe in
 * simplicity"). Each section is a working primitive demoed inline.
 */

export const metadata: Metadata = {
  title: "Design system · the language we build in · AtomEons",
  description:
    "The AtomEons design language, made public. Tokens, type, color, motion, photography, and the conviction behind each one. Stripe Press / IBM Carbon / Vercel Geist tier, with reasons for every choice.",
  alternates: { canonical: "https://atomeons.com/design-system" },
  openGraph: {
    title: "AtomEons design system",
    description: "The design language we build in, made public. Tokens, type, color, motion, photography.",
    url: "https://atomeons.com/design-system",
    type: "article",
  },
  robots: { index: true, follow: true },
};

const PALETTE = [
  { name: "Void", hex: "#000000", role: "primary background", note: "Pure black. The cockpit is dark; light mode is refused on brand grounds. We respect prefers-color-scheme by overriding back to dark — on-brand humor." },
  { name: "Elevation", hex: "#0A0F11", role: "elevated surface", note: "Cards, modals, table backgrounds. Half-shade above black so a card reads as object, not absence." },
  { name: "Hairline", hex: "#1A2225", role: "borders + dividers", note: "Visible only as edge. Never as fill. If you need a fill, you need a different token." },
  { name: "Bone", hex: "#F2F4F5", role: "primary text", note: "Off-white at 95% luminance. White-white is harsh on black; this is the calibration." },
  { name: "Cool grey", hex: "#C8CCCE", role: "secondary text", note: "Lede paragraphs, body copy where you want emphasis without screaming." },
  { name: "Stone", hex: "#9BA5A7", role: "tertiary text", note: "Captions, metadata, eyebrows. Where attention is not the goal." },
  { name: "Bio-cyan", hex: "#22F0D5", role: "the accent", note: "Used three places per page: hero signature mark, hover state, citation index [NN]. Not for decoration." },
  { name: "Amber", hex: "#FFB87A", role: "warning + ORANGEBOX", note: "Reserved. Pricing pages, caution notes, ORANGEBOX product surface. Never on the same page as cyan as decoration." },
];

const TYPE_SCALE = [
  { size: "72px", weight: 540, line: "0.92", token: "display-1", use: "Homepage hero, manifesto" },
  { size: "60px", weight: 540, line: "1.0", token: "display-2", use: "Page H1, interior heroes" },
  { size: "40px", weight: 540, line: "1.05", token: "h2", use: "Section openers" },
  { size: "28px", weight: 560, line: "1.15", token: "h3", use: "Sub-section + card titles" },
  { size: "18px", weight: 400, line: "1.55", token: "lede", use: "Hero supporting paragraph" },
  { size: "17px", weight: 400, line: "1.7", token: "body-lg", use: "Long-form prose" },
  { size: "15px", weight: 400, line: "1.65", token: "body", use: "Default" },
  { size: "13px", weight: 400, line: "1.5", token: "caption", use: "Meta, footnotes" },
  { size: "11px", weight: 500, line: "1.2", token: "mono-label", use: "Mono uppercase eyebrows. JetBrains Mono. Tracking 0.22em." },
];

const PHOTO_PRINCIPLES = [
  { rule: "One subject", body: "Every hero image is one thing. A sealed envelope. A drone above fog. An undersea cable in dark water. The frame breathes around it." },
  { rule: "No humans, no logos, no readable text", body: "Three constraints that look limiting and become liberating. The image carries an idea, not a moment in someone's life." },
  { rule: "Single cinematic light source", body: "Hard rim light. Deep shadow. The composition is half black. Press-photo restraint, not stock-photo coverage." },
  { rule: "Premium materials", body: "Machined matte aluminum. Dark slate. Walnut. Carbon. Bio-cyan rim light is the only color event in the frame." },
  { rule: "Anti-cliché", body: "No matrix code. No hooded figures. No glowing brains. No padlock-and-binary. The clichés are forbidden because they're cheap." },
];

const TYPOGRAPHY_RULES = [
  "Mono is for code, labels, and one hero eyebrow per page. Not for body text. Not for CTAs.",
  "Uppercase is for mono labels at 0.22em tracking. Never on H1s. Never on body sans.",
  "Line-height is 1.7 for body, 1.55 for lede, 1.05 for hero H1. Three values, not eight.",
  "Max line width is 58ch for lede paragraphs, 62ch for body sections. Wider than that and reading drops.",
  "Sentence-case headings everywhere. Title-case is a 1990s magazine tic.",
  "Letter-spacing -0.01em on display sizes (text-4xl and up). The Inter Variable axis at 540 weight reads correctly only with slight negative track.",
];

const MOTION_RULES = [
  "Background motion is forbidden. Premium sites run static surfaces. Apple, Stripe, Linear, Anthropic — zero of them rotate gradients under body prose.",
  "Hover state motion lasts 150ms. Anything longer feels sluggish.",
  "Page-transition motion is none. Next.js full reloads are honest about what's happening.",
  "The one earned motion is the homepage hero photo-mosaic rotation: 8 seconds between images, 1200ms cross-fade, opt-out on prefers-reduced-motion.",
  "Loaders and spinners are forbidden. If you need one, your page is too slow. Fix the page.",
];

const COMPONENT_PRIMITIVES = [
  { name: "Eyebrow", spec: "font-mono text-[11px] uppercase tracking-[0.22em] text-[#22F0D5] · max one per scroll-screen" },
  { name: "H1", spec: "text-4xl md:text-6xl font-medium leading-[1] tracking-tight · variable-weight 540 · sentence case" },
  { name: "Lede", spec: "text-base md:text-lg leading-[1.55] text-[#C8CCCE] max-w-[58ch]" },
  { name: "Primary CTA", spec: "rounded-full bg-[#22F0D5] px-6 py-3 text-sm font-semibold text-black hover:bg-[#1AD4BD]" },
  { name: "Ghost CTA", spec: "rounded-full border border-[#22F0D5]/40 px-5 py-2.5 text-sm font-medium text-[#22F0D5] hover:bg-[#22F0D5]/10" },
  { name: "Section divider", spec: "border-b border-[#1A2225] · never a full ruling, only between thematic sections" },
  { name: "Card", spec: "rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 · no left-stripe, no inline shadow, no decorative chrome" },
  { name: "Image hero", spec: "aspect-[16/9] max-h-[56vh] · Next.js Image fill · object-cover · bottom gradient transparent-to-black" },
];

export default function DesignSystemPage() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      {/* HERO */}
      <section className="relative isolate border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-5xl px-6 py-20 md:py-32">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#22F0D5]">
            AtomEons design system · made public · 2026
          </p>
          <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl md:leading-[1.02]" style={{ fontVariationSettings: '"wght" 540' }}>
            The language we build in.{" "}
            <span className="text-[#22F0D5]">Made public.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-[1.55] text-[#C8CCCE] md:text-lg">
            The case for publishing your design system in 2026 is the same case for publishing your research: someone competent reads it and the work compounds. Most companies hide this surface. Stripe Press, IBM Carbon, Vercel Geist, Anthropic — the ones that don&apos;t are the ones who lead the field. Ours is below.
          </p>
          <p className="mt-5 max-w-2xl text-sm leading-[1.6] text-[#9BA5A7]">
            CC-BY 4.0. Take what&apos;s useful. Cite the lab if it shows up in your work.
          </p>
        </div>
      </section>

      {/* CONVICTION */}
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">::conviction</p>
          <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-5xl md:leading-[1.02]" style={{ fontVariationSettings: '"wght" 540' }}>
            Restraint is the doctrine.
          </h2>
          <div className="mt-8 max-w-3xl space-y-6 text-base leading-[1.7] text-[#C8CCCE] md:text-[17px]">
            <p>
              Every visual choice on atomeons.com starts from a single question: <strong className="text-[#F2F4F5]">does this earn its presence on the page, or is it decoration pretending to be communication?</strong> The decoration loses. Always. Most sites lose this fight a hundred times per viewport. We tried.
            </p>
            <p>
              The accent color does three jobs: hero signature mark, hover state, citation index. Not bullets. Not decorative borders. Not table headers. Not card stripes. <strong className="text-[#F2F4F5]">Three jobs.</strong> Eye sees an accent — eye knows it&apos;s signal. The moment cyan becomes wallpaper is the moment the brand turns to plastic.
            </p>
            <p>
              Background motion is forbidden. We tried bloom-drift gradients, conic rotations, screen-flicker scanlines. They looked technical in mockups and exhausting on actual pages. Premium sites run static surfaces. We deleted the motion in a 100-line CSS pass and the prose started reading at 100% contrast for the first time.
            </p>
            <p>
              Typography is two values for line-height: 1.7 for body, 1.55 for lede. Three values for size at hero / section / sub. Sentence case. No screaming caps in body. Mono is for code, labels, and one signature eyebrow per page. JetBrains Mono earns its place; it does not decorate.
            </p>
            <p>
              Photography is one subject per image. No humans, no logos, no readable text. Single cinematic light source. The clichés — matrix code, hooded figures, padlock-and-binary, glowing brains — are forbidden because they&apos;re cheap. The constraint sounds limiting and it is liberating: 67 hero images that don&apos;t look like every other site in the field.
            </p>
          </div>
        </div>
      </section>

      {/* PALETTE */}
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-5xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">::palette</p>
          <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl" style={{ fontVariationSettings: '"wght" 540' }}>
            Eight tokens. No exceptions.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-[1.65] text-[#C8CCCE]">
            Every color on the site is one of these eight tokens. If you reach for a hex code that isn&apos;t here, you&apos;re wrong before you start.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PALETTE.map((c) => (
              <div key={c.name} className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-5">
                <div className="h-20 w-full rounded-lg" style={{ background: c.hex }} aria-label={`Color swatch: ${c.hex}`} />
                <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[#22F0D5]">{c.hex}</p>
                <h3 className="mt-1 text-lg font-medium tracking-tight text-[#F2F4F5]">{c.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[#9BA5A7]">{c.role}</p>
                <p className="mt-3 text-sm leading-[1.6] text-[#C8CCCE]">{c.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TYPE */}
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-5xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">::type scale</p>
          <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl" style={{ fontVariationSettings: '"wght" 540' }}>
            Inter Variable. Nine tokens. JetBrains Mono for labels.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-[1.65] text-[#C8CCCE]">
            Inter at variable weight 540 reads as confident-but-not-aggressive. We modulate weight up to 720 only on the accent words inside hero H1s. JetBrains Mono is reserved for code, labels, and one signature eyebrow per page.
          </p>

          <div className="mt-10 overflow-x-auto rounded-2xl border border-[#1A2225] bg-[#0A0F11]">
            <table className="w-full min-w-[720px] border-collapse text-sm">
              <thead>
                <tr>
                  <th className="border-b border-[#1A2225] bg-[#0A0F11] px-5 py-4 text-left text-[11px] font-medium uppercase tracking-[0.10em] text-[#9BA5A7]">Token</th>
                  <th className="border-b border-[#1A2225] bg-[#0A0F11] px-5 py-4 text-left text-[11px] font-medium uppercase tracking-[0.10em] text-[#9BA5A7]">Size</th>
                  <th className="border-b border-[#1A2225] bg-[#0A0F11] px-5 py-4 text-left text-[11px] font-medium uppercase tracking-[0.10em] text-[#9BA5A7]">Weight</th>
                  <th className="border-b border-[#1A2225] bg-[#0A0F11] px-5 py-4 text-left text-[11px] font-medium uppercase tracking-[0.10em] text-[#9BA5A7]">Line</th>
                  <th className="border-b border-[#1A2225] bg-[#0A0F11] px-5 py-4 text-left text-[11px] font-medium uppercase tracking-[0.10em] text-[#9BA5A7]">Use</th>
                </tr>
              </thead>
              <tbody>
                {TYPE_SCALE.map((t) => (
                  <tr key={t.token} className="border-b border-[#1A2225] last:border-b-0">
                    <td className="px-5 py-4 font-mono text-xs text-[#22F0D5]">{t.token}</td>
                    <td className="px-5 py-4 font-mono text-xs tabular-nums text-[#F2F4F5]">{t.size}</td>
                    <td className="px-5 py-4 font-mono text-xs tabular-nums text-[#C8CCCE]">{t.weight}</td>
                    <td className="px-5 py-4 font-mono text-xs tabular-nums text-[#C8CCCE]">{t.line}</td>
                    <td className="px-5 py-4 text-sm text-[#C8CCCE]">{t.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-12">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">::rules of the road</p>
            <ul className="mt-6 space-y-3 text-base leading-[1.7] text-[#C8CCCE]">
              {TYPOGRAPHY_RULES.map((r, i) => (
                <li key={i} className="flex gap-4">
                  <span aria-hidden className="mt-[0.6em] h-px w-3 shrink-0 bg-[#3A4448]" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* PHOTOGRAPHY */}
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-5xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">::photography</p>
          <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl" style={{ fontVariationSettings: '"wght" 540' }}>
            One subject. No humans. Single light. Anti-cliché.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-[1.65] text-[#C8CCCE]">
            All 67 hero images on the site are generated via Google&apos;s Nano Banana Pro (gemini-3-pro-image). The prompt template enforces the four rules below. Each one is a constraint that looks limiting and turns liberating once you watch the field full of every-stock-photo-of-cybersecurity-ever.
          </p>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "/cyber-images/hackerone.png",
              "/cyber-images/cyberwar.png",
              "/learn-images/atlas-history.png",
              "/learn-images/career-interviews.png",
              "/learn-images/trust-prompt-injection.png",
              "/learn-images/atlas-embeddings.png",
            ].map((src) => (
              <div key={src} className="relative aspect-[16/9] overflow-hidden rounded-xl border border-[#1A2225]">
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          <div className="mt-12">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">::four rules</p>
            <ul className="mt-6 space-y-6">
              {PHOTO_PRINCIPLES.map((p) => (
                <li key={p.rule} className="grid gap-2 md:grid-cols-[180px_1fr] md:gap-8">
                  <p className="text-base font-medium text-[#F2F4F5]">{p.rule}</p>
                  <p className="text-base leading-[1.65] text-[#C8CCCE]">{p.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* MOTION */}
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">::motion</p>
          <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl" style={{ fontVariationSettings: '"wght" 540' }}>
            Five rules. Mostly no.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-[1.65] text-[#C8CCCE]">
            The two best-feeling sites of 2024-2026 (Linear, Stripe) move less than every other site in their categories. Motion is a budget you spend, not a goal you chase.
          </p>
          <ul className="mt-10 space-y-3 text-base leading-[1.7] text-[#C8CCCE]">
            {MOTION_RULES.map((r, i) => (
              <li key={i} className="flex gap-4">
                <span aria-hidden className="mt-[0.6em] h-px w-3 shrink-0 bg-[#3A4448]" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* COMPONENT PRIMITIVES */}
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-5xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">::primitives</p>
          <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl" style={{ fontVariationSettings: '"wght" 540' }}>
            Eight primitives. Used everywhere.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-[1.65] text-[#C8CCCE]">
            Every component on the site is built from these eight. If you reach for a ninth, you&apos;re wrong before you start.
          </p>
          <div className="mt-10 overflow-x-auto rounded-2xl border border-[#1A2225] bg-[#0A0F11]">
            <table className="w-full min-w-[720px] border-collapse text-sm">
              <thead>
                <tr>
                  <th className="border-b border-[#1A2225] bg-[#0A0F11] px-5 py-4 text-left text-[11px] font-medium uppercase tracking-[0.10em] text-[#9BA5A7]">Primitive</th>
                  <th className="border-b border-[#1A2225] bg-[#0A0F11] px-5 py-4 text-left text-[11px] font-medium uppercase tracking-[0.10em] text-[#9BA5A7]">Spec</th>
                </tr>
              </thead>
              <tbody>
                {COMPONENT_PRIMITIVES.map((c) => (
                  <tr key={c.name} className="border-b border-[#1A2225] last:border-b-0">
                    <td className="px-5 py-4 font-medium text-[#F2F4F5]">{c.name}</td>
                    <td className="px-5 py-4 font-mono text-xs leading-[1.6] text-[#C8CCCE]">{c.spec}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-20 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#22F0D5]">::take it</p>
          <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl" style={{ fontVariationSettings: '"wght" 540' }}>
            CC-BY 4.0.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-[1.65] text-[#C8CCCE]" style={{ marginLeft: "auto", marginRight: "auto" }}>
            Use anything here. Cite the lab if it shows up in something public. Send us what you build — we read it.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link href="/learn" className="inline-flex items-center gap-2 rounded-full bg-[#22F0D5] px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-[#1AD4BD]">
              See the system in use <span aria-hidden>→</span>
            </Link>
            <Link href="/founders-view" className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] px-5 py-2.5 text-sm text-[#C8CCCE] transition-colors hover:border-[#22F0D5]/40 hover:text-[#22F0D5]">
              Founder&apos;s view
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
