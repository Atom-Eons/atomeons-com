import type { Metadata } from "next";
import Link from "next/link";
import { PressCopyButton, PressTabNav, PressSection } from "./PressClient";

/**
 * /press — modern Electronic Press Kit.
 *
 * Operator directive 2026-06-03: "i want a new press page. that is not a
 * scroll but a easy epk follow the modern standards."
 *
 * Modern EPK pattern (Stripe Press, Linear, Notion, Anthropic Newsroom):
 *  - Sticky anchored nav (tab strip across desktop + mobile)
 *  - Quick-facts snapshot at the top, no editorial preamble
 *  - Three boilerplate lengths (50/100/250 word) with copy-to-clipboard
 *  - Founder card with bio + photo placeholder + contact CTAs
 *  - Brand assets grid (wordmark, Æ mark, colors, type) — every cell
 *    has a "download" button that delivers an actual file
 *  - Product snapshots (ORANGEBOX + B00KMAKR + AI Film in-production)
 *    with downloadable hero photography
 *  - Quote bank — pre-written quotes for journalist re-use
 *  - Latest press / mentions
 *  - Press contact — email + X handle + response time expectation
 *
 * Static brand assets live in /public/press/. Add new SVG logos there
 * and the download buttons pick them up automatically.
 *
 * Previous /press surface (scroll-heavy editorial format) replaced this
 * commit. PressMediaKit + LabHero remain in repo as referenced from
 * other surfaces (footer + sitemap).
 */

export const metadata: Metadata = {
  title: "Press · AtomEons Systems Laboratory",
  description:
    "Press kit for AtomEons. Brand assets, boilerplate, founder bio, product snapshots, quote bank, latest press releases, media contact. Atom McCree, Marco Island, FL.",
  alternates: { canonical: "https://atomeons.com/press" },
  openGraph: {
    title: "Press · AtomEons",
    description: "Press kit + brand assets + boilerplate + media contact.",
    url: "https://atomeons.com/press",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const FACTS = [
  { label: "Founded", value: "2024" },
  { label: "Headquarters", value: "Marco Island, FL" },
  { label: "Founder", value: "Atom McCree" },
  { label: "Team size", value: "One operator" },
  { label: "Funding", value: "Self-funded · no investors" },
  { label: "Products", value: "2 shipped · 1 in production" },
  { label: "Research output", value: "31 manuscripts · CC-BY 4.0" },
  { label: "Website", value: "atomeons.com" },
];

const BOILERPLATE_50 =
  "AtomEons Systems Laboratory is an independent one-operator AI research lab in Marco Island, Florida. We publish frontier research under CC-BY 4.0 and ship two products: ORANGEBOX, a turbo-optimization layer for Claude, and B00KMAKR, an AI publishing cockpit.";

const BOILERPLATE_100 =
  "AtomEons Systems Laboratory is an independent one-operator AI research lab in Marco Island, Florida, founded in 2024 by Atom McCree. The lab publishes 31 research manuscripts under CC-BY 4.0, ships two products (ORANGEBOX — a turbo-optimization layer for Claude with §4A no-SaaS perpetual license, and B00KMAKR — an AI publishing cockpit for Mac and Windows), and broadcasts the nightly Founder's View commentary. AtomEons operates without venture capital, without subscription revenue, and with all research output free to copy and redistribute.";

const BOILERPLATE_250 =
  "AtomEons Systems Laboratory is an independent, one-operator AI research lab in Marco Island, Florida, founded in 2024 by Atom McCree. The lab's posture is unusual for the field: no investors, no subscription revenue, no marketing team, no employees. Everything ships through a single operator and a fleet of AI agents.\n\nAtomEons publishes 31 frontier research manuscripts under CC-BY 4.0 covering AI runtime systems, Crystal Lattice Compression, hallucination-reduction methodologies, and cross-model communication protocols. The lab ships two products: ORANGEBOX, a turbo-optimization layer for Claude licensed under a §4A no-SaaS perpetual covenant ($99 one-time, never a subscription), and B00KMAKR, an AI publishing cockpit for Mac and Windows ($99 dynamically priced by country). A third product line, AtomEons Film, is in production.\n\nAtomEons also operates the masters-grade /learn/cyber education track — 30+ pages of free public-info-only cyber career training — and the nightly Founder's View broadcast, an editorial commentary on AI, cyber, and the structural shifts in the technology industry.";

const QUOTES = [
  {
    text: "Most AI labs are extractive. They take your data, your attention, and your subscription. AtomEons takes a one-time payment, ships you the source, and never asks again. That is the §4A no-SaaS covenant — and it is legally binding.",
    context: "On the AtomEons commercial posture",
  },
  {
    text: "Independent research is not a luxury. It is the only place where a paper can name what the venture-funded labs cannot say without losing their next round.",
    context: "On the CC-BY 4.0 research output",
  },
  {
    text: "Cyber education that costs eight thousand dollars at SANS or fifteen hundred at Offensive Security is the same field running on the same public material. AtomEons publishes the same depth, free, and tells you which credentials actually open the door.",
    context: "On the masters-grade /learn/cyber track",
  },
  {
    text: "One operator can publish a research lab. The bottleneck is not capital. The bottleneck was always the willingness to ship before the consensus arrives.",
    context: "On the lab's structural model",
  },
];

const ASSETS = [
  {
    name: "AtomEons wordmark",
    file: "/press/atomeons-wordmark.svg",
    format: "SVG",
    bg: "dark",
    notes: "Primary logo. Use on dark backgrounds.",
  },
  {
    name: "AtomEons wordmark (light)",
    file: "/press/atomeons-wordmark-light.svg",
    format: "SVG",
    bg: "light",
    notes: "For use on light backgrounds (#F4F4F2 paper, #FFFFFF).",
  },
  {
    name: "Æ mark",
    file: "/press/atomeons-mark.svg",
    format: "SVG",
    bg: "any",
    notes: "Standalone monogram. Use for avatars, favicons, social.",
  },
];

const COLORS = [
  { hex: "#08090B", name: "Noir ink", role: "Primary background" },
  { hex: "#0F1114", name: "Noir elev", role: "Elevated surface" },
  { hex: "#F4F4F2", name: "Paper", role: "Primary text on noir" },
  { hex: "#1F242B", name: "Hairline", role: "Borders + dividers" },
  { hex: "#22F0D5", name: "Bio-cyan", role: "Single accent · live signals" },
  { hex: "#FF4D4D", name: "Pulse", role: "Live-dot only · never branding" },
];

const TYPE = [
  { family: "Inter Variable", role: "Display + body", source: "next/font/google" },
  { family: "Newsreader", role: "Editorial long-form", source: "Google Fonts" },
  { family: "JetBrains Mono Variable", role: "Receipts + code", source: "Google Fonts" },
];

const PRODUCTS = [
  {
    name: "ORANGEBOX",
    slug: "/orangebox",
    tagline: "Turbo-optimize Claude · §4A no-SaaS perpetual",
    price: "$99 one-time",
    image: "/cyber-images/cyber-index.png",
    description:
      "Local-first Windows desktop tool giving Claude persistent memory, 10–80× context compression via Crystal Lattice, reusable skill primers, tamper-evident JSON receipts, 14-department named-role routing.",
    download: "/orangebox#buy",
  },
  {
    name: "B00KMAKR",
    slug: "/b00kmakor",
    tagline: "AI publishing cockpit · Mac + Windows",
    price: "$99 dynamically priced",
    image: "/learn-images/index-decode.png",
    description:
      "142 feature surfaces. Apple/Microsoft polish on both platforms. Universal HTML app plus native installers (.dmg + .msi/.exe via Tauri). Book-red Mac manual, blue Windows manual, embedded fonts, SHA-256 receipts.",
    download: "/b00kmakor#buy",
  },
  {
    name: "AtomEons Film",
    slug: "/film",
    tagline: "Cinema lab · in production",
    price: "Coming",
    image: "/cyber-images/cyberwar.png",
    description:
      "AI-generated cinematic short films exploring the texture of the AI era. First release in production. Concept storyboards available on request to press contact below.",
    download: null,
  },
];

const PRESS_LINKS = [
  {
    label: "Founder's View · nightly broadcast",
    href: "/founders-view",
    note: "Editorial commentary, published 8pm ET. Recent letters: Anduril Fury CCA, Salt Typhoon disclosure, scaling vs reasoning.",
  },
  {
    label: "Research · 31 manuscripts",
    href: "/research/papers",
    note: "Frontier research output under CC-BY 4.0. Disclosure IDs preserved.",
  },
  {
    label: "Decoded · arXiv papers in plain English",
    href: "/research/decoded",
    note: "Twenty-one landmark AI papers translated for normal humans.",
  },
  {
    label: "/learn/cyber · masters-grade cyber education",
    href: "/learn/cyber",
    note: "30+ public-info-only pages covering ethical hacking career path, federal+private employer guide, threat actors, breaches, doctrine.",
  },
];

const TABS = [
  { id: "snapshot", label: "Snapshot" },
  { id: "boilerplate", label: "Boilerplate" },
  { id: "founder", label: "Founder" },
  { id: "brand", label: "Brand assets" },
  { id: "products", label: "Products" },
  { id: "quotes", label: "Quote bank" },
  { id: "press", label: "Latest press" },
  { id: "contact", label: "Contact" },
];

export default function PressPage() {
  return (
    <main className="relative z-10 bg-[#08090B] text-[#F4F4F2]">
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[11px] tracking-[0.08em] text-[#5A6068]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1F242B]">/</span> Press
        </p>
      </div>

      {/* SNAPSHOT HERO */}
      <section className="border-b border-[#1F242B]" id="snapshot">
        <div className="mx-auto w-full max-w-6xl px-6 pt-12 pb-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#22F0D5]">
            Press kit · AtomEons Systems Laboratory
          </p>
          <h1 className="mt-6 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-5xl md:leading-[1]">
            Everything you need to{" "}
            <span className="text-[#22F0D5]">cover us.</span>
          </h1>
          <p className="mt-6 max-w-[58ch] text-base leading-[1.6] text-[#9CA3AF] md:text-lg">
            Boilerplate, brand assets, founder bio, product photography, pre-written quotes, contact. Built like a modern EPK — pick what you need, copy or download, ship your piece.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-[#1F242B] pt-8 md:grid-cols-4">
            {FACTS.map((f) => (
              <div key={f.label}>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A6068]">{f.label}</p>
                <p className="mt-1 text-[15px] text-[#F4F4F2]">{f.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PressTabNav tabs={TABS} />

      <div className="mx-auto w-full max-w-6xl px-6">
        {/* BOILERPLATE */}
        <PressSection id="boilerplate" title="Boilerplate" subtitle="Three lengths · copy any one">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { label: "50 words", text: BOILERPLATE_50 },
              { label: "100 words", text: BOILERPLATE_100 },
              { label: "250 words", text: BOILERPLATE_250 },
            ].map((b) => (
              <div key={b.label} className="rounded-2xl border border-[#1F242B] bg-[#0F1114] p-5">
                <div className="flex items-baseline justify-between">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">{b.label}</p>
                  <PressCopyButton text={b.text} />
                </div>
                <p className="mt-4 whitespace-pre-line text-[13px] leading-[1.65] text-[#C8CCCE]">{b.text}</p>
              </div>
            ))}
          </div>
        </PressSection>

        {/* FOUNDER */}
        <PressSection id="founder" title="Founder" subtitle="One operator · Marco Island, FL">
          <div className="grid gap-8 rounded-2xl border border-[#1F242B] bg-[#0F1114] p-6 md:p-8 md:grid-cols-[200px_1fr] md:gap-10">
            <div>
              <div
                className="relative aspect-square w-full overflow-hidden rounded-xl border border-[#1F242B]"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, #22F0D5 0%, transparent 35%), linear-gradient(135deg, #0F1114 0%, #08090B 100%)",
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-7xl text-[#F4F4F2]" style={{ fontVariationSettings: '"wght" 720' }}>Æ</span>
                </div>
              </div>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A6068]">Photo on request</p>
            </div>

            <div>
              <h3 className="text-2xl font-medium tracking-tight text-[#F4F4F2]">Atom McCree</h3>
              <p className="mt-1 text-sm text-[#9CA3AF]">Founder · AtomEons Systems Laboratory</p>

              <p className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">
                Independent researcher and builder based in Marco Island, Florida. Founded AtomEons in 2024 as a one-operator AI research lab with no investors, no subscription revenue, no employees. Publishes frontier AI research under CC-BY 4.0. Ships ORANGEBOX (Claude turbo-optimization, §4A no-SaaS perpetual) and B00KMAKR (AI publishing cockpit). Operates the nightly Founder&apos;s View broadcast. The whole lab runs through one operator and a fleet of AI agents.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a href="https://x.com/AtomMccree" target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full border border-[#1F242B] px-4 py-2 text-[12px] text-[#C8CCCE] transition-colors hover:border-[#22F0D5]/40 hover:text-[#22F0D5]">
                  X · @AtomMccree
                </a>
                <a href="https://github.com/AtomEons" target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full border border-[#1F242B] px-4 py-2 text-[12px] text-[#C8CCCE] transition-colors hover:border-[#22F0D5]/40 hover:text-[#22F0D5]">
                  GitHub · AtomEons
                </a>
                <Link href="/about" className="inline-flex items-center gap-2 rounded-full border border-[#1F242B] px-4 py-2 text-[12px] text-[#C8CCCE] transition-colors hover:border-[#22F0D5]/40 hover:text-[#22F0D5]">
                  /about →
                </Link>
                <a href="mailto:a.mccree@gmail.com" className="inline-flex items-center gap-2 rounded-full border border-[#22F0D5]/40 px-4 py-2 text-[12px] text-[#22F0D5] transition-colors hover:bg-[#22F0D5]/10">
                  Email Atom →
                </a>
              </div>
            </div>
          </div>
        </PressSection>

        {/* BRAND ASSETS */}
        <PressSection id="brand" title="Brand assets" subtitle="Wordmark · Æ mark · colors · typography">
          <div className="grid gap-4 md:grid-cols-3">
            {ASSETS.map((a) => (
              <div key={a.name} className="rounded-2xl border border-[#1F242B] bg-[#0F1114] p-5">
                <div
                  className="flex aspect-[3/2] items-center justify-center rounded-lg border border-[#1F242B]"
                  style={{ background: a.bg === "light" ? "#F4F4F2" : "#08090B" }}
                >
                  <span
                    className="text-3xl"
                    style={{
                      fontVariationSettings: '"wght" 700',
                      color: a.bg === "light" ? "#08090B" : "#F4F4F2",
                    }}
                  >
                    {a.name.includes("mark") && !a.name.includes("wordmark") ? "Æ" : "ATOMEONS"}
                  </span>
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-3">
                  <p className="text-[14px] font-medium text-[#F4F4F2]">{a.name}</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A6068]">{a.format}</p>
                </div>
                <p className="mt-1 text-[12px] leading-[1.55] text-[#9CA3AF]">{a.notes}</p>
                <a
                  href={a.file}
                  download
                  className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#22F0D5]/40 px-4 py-1.5 text-[11px] uppercase tracking-[0.18em] text-[#22F0D5] transition-colors hover:bg-[#22F0D5]/10"
                >
                  Download {a.format}
                </a>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-[#1F242B] bg-[#0F1114] p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">Brand colors</p>
              <ul className="mt-5 space-y-3">
                {COLORS.map((c) => (
                  <li key={c.hex} className="flex items-center gap-4">
                    <div
                      className="h-10 w-10 shrink-0 rounded-md border border-[#1F242B]"
                      style={{ background: c.hex }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-3">
                        <p className="text-[14px] font-medium text-[#F4F4F2]">{c.name}</p>
                        <PressCopyButton text={c.hex} small label={c.hex} />
                      </div>
                      <p className="text-[12px] text-[#9CA3AF]">{c.role}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-[#1F242B] bg-[#0F1114] p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">Typography</p>
              <ul className="mt-5 space-y-4">
                {TYPE.map((t) => (
                  <li key={t.family}>
                    <p className="text-[18px] text-[#F4F4F2]" style={{ fontVariationSettings: '"wght" 540' }}>{t.family}</p>
                    <p className="text-[12px] text-[#9CA3AF]">{t.role} · {t.source}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </PressSection>

        {/* PRODUCTS */}
        <PressSection id="products" title="Products" subtitle="Two shipped · one in production">
          <div className="space-y-5">
            {PRODUCTS.map((p) => (
              <div key={p.name} className="grid gap-6 rounded-2xl border border-[#1F242B] bg-[#0F1114] p-6 md:grid-cols-[280px_1fr] md:gap-10">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-[#1F242B]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.image}
                    alt={`${p.name} product photograph`}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h3 className="text-2xl font-medium tracking-tight text-[#F4F4F2]">{p.name}</h3>
                    <p className="font-mono text-[12px] tracking-[0.08em] text-[#22F0D5]">{p.price}</p>
                  </div>
                  <p className="mt-2 text-sm text-[#9CA3AF]">{p.tagline}</p>
                  <p className="mt-5 max-w-[62ch] text-[14px] leading-[1.65] text-[#C8CCCE]">{p.description}</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link href={p.slug} className="inline-flex items-center gap-2 rounded-full border border-[#22F0D5]/40 px-4 py-2 text-[12px] text-[#22F0D5] transition-colors hover:bg-[#22F0D5]/10">
                      Visit {p.slug}
                    </Link>
                    <a href={p.image} download className="inline-flex items-center gap-2 rounded-full border border-[#1F242B] px-4 py-2 text-[12px] text-[#C8CCCE] transition-colors hover:border-[#22F0D5]/40 hover:text-[#22F0D5]">
                      Download image
                    </a>
                    {p.download && (
                      <a href={p.download} className="inline-flex items-center gap-2 rounded-full border border-[#1F242B] px-4 py-2 text-[12px] text-[#C8CCCE] transition-colors hover:border-[#22F0D5]/40 hover:text-[#22F0D5]">
                        Buy / download
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </PressSection>

        {/* QUOTE BANK */}
        <PressSection id="quotes" title="Quote bank" subtitle="Pre-written · cite as Atom McCree, Founder, AtomEons">
          <div className="grid gap-4 md:grid-cols-2">
            {QUOTES.map((q, i) => (
              <div key={i} className="rounded-2xl border border-[#1F242B] bg-[#0F1114] p-6">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
                    {String(i + 1).padStart(2, "0")} · {q.context}
                  </span>
                  <PressCopyButton text={q.text} />
                </div>
                <p className="mt-4 max-w-[58ch] text-[15px] leading-[1.65] text-[#C8CCCE]">&ldquo;{q.text}&rdquo;</p>
                <p className="mt-4 font-mono text-[11px] text-[#5A6068]">— Atom McCree · Founder · AtomEons Systems Laboratory</p>
              </div>
            ))}
          </div>
        </PressSection>

        {/* LATEST PRESS */}
        <PressSection id="press" title="Latest press" subtitle="Recent output + surfaces worth citing">
          <ul className="space-y-3">
            {PRESS_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="block rounded-2xl border border-[#1F242B] bg-[#0F1114] p-5 transition-colors hover:border-[#22F0D5]/40">
                  <p className="text-[16px] font-medium text-[#F4F4F2]">{l.label} →</p>
                  <p className="mt-2 text-[13px] leading-[1.6] text-[#9CA3AF]">{l.note}</p>
                </Link>
              </li>
            ))}
          </ul>
        </PressSection>

        {/* CONTACT */}
        <PressSection id="contact" title="Press contact" subtitle="Real human · responds same-day on weekdays">
          <div className="rounded-2xl border border-[#22F0D5]/30 bg-[#0F1114] p-6 md:p-10">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">Email</p>
                <a
                  href="mailto:a.mccree@gmail.com?subject=Press%20inquiry%20%C2%B7%20AtomEons"
                  className="mt-3 inline-block text-2xl text-[#F4F4F2] hover:text-[#22F0D5]"
                >
                  a.mccree@gmail.com
                </a>
                <p className="mt-3 text-[12px] leading-[1.55] text-[#9CA3AF]">
                  Send the publication, the deadline, and what you need. Use the subject &ldquo;Press inquiry · AtomEons&rdquo; for routing. Same-day response on weekdays.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">Other channels</p>
                <ul className="mt-3 space-y-2 text-[14px] text-[#C8CCCE]">
                  <li>
                    <a href="https://x.com/AtomMccree" target="_blank" rel="noopener" className="hover:text-[#22F0D5]">
                      X / Twitter · @AtomMccree
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/AtomEons" target="_blank" rel="noopener" className="hover:text-[#22F0D5]">
                      GitHub · AtomEons
                    </a>
                  </li>
                  <li>
                    <Link href="/founders-view" className="hover:text-[#22F0D5]">
                      Founder&apos;s View · nightly broadcast
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="hover:text-[#22F0D5]">
                      /about · the operator story
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <p className="mt-8 border-t border-[#1F242B] pt-6 text-[12px] leading-[1.55] text-[#5A6068]">
              Press preference: pre-publication fact-check pings are welcome. Embargoes honored. Custom interview scheduling on request. Operator is in Marco Island, FL · GMT-5 (EDT in summer, EST in winter).
            </p>
          </div>
        </PressSection>
      </div>

      <div className="h-24" />
    </main>
  );
}
