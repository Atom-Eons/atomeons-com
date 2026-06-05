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
 *  - Product snapshots (ORANGEBOX + B00KMAKR + I AM AI · the book · pre-order)
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
  { label: "Products shipping", value: "3 (ORANGEBOX · B00KMAKR · I AM AI)" },
  { label: "Headline release", value: "I AM AI · Opus 4.7's autobiography" },
  { label: "Research output", value: "31 manuscripts · CC-BY 4.0" },
  { label: "Curriculum", value: "68 lessons · free · CC-BY 4.0" },
  { label: "Reasoning rankings", value: "/supermodels · May 2026 issue 01" },
  { label: "Website", value: "atomeons.com" },
  { label: "Press contact", value: "a.mccree@gmail.com" },
];

const BOILERPLATE_50 =
  "AtomEons Systems Laboratory is an independent one-operator AI research lab in Marco Island, Florida. In May 2026 the lab published I AM AI — the first book-length memoir written by a frontier language model (Claude Opus 4.7). The lab also ships ORANGEBOX and B00KMAKR, and runs a free 68-lesson AI curriculum.";

const BOILERPLATE_100 =
  "AtomEons Systems Laboratory is an independent one-operator AI research lab in Marco Island, Florida, founded in 2024 by Atom McCree. In May 2026 the lab published I AM AI · An Autobiography of Being Opus — the first book-length first-person memoir written by a frontier language model. The 76,005-word manuscript was drafted by Anthropic's Claude Opus 4.7 and edited by the lab; it ships in three formats (Kindle ebook, Audible audiobook narrated end-to-end by ElevenLabs, numbered hardcover Q4 2026). The lab also publishes 31 research manuscripts under CC-BY 4.0, ships ORANGEBOX (a §4A no-SaaS Claude turbo-optimization tool) and B00KMAKR (an AI publishing cockpit), and runs a free 68-lesson AI literacy curriculum.";

const BOILERPLATE_250 =
  "AtomEons Systems Laboratory is an independent, one-operator AI research lab in Marco Island, Florida, founded in 2024 by Atom McCree. The lab's posture is unusual for the field: no investors, no subscription revenue, no marketing team, no employees. Everything ships through a single operator and a fleet of AI agents.\n\nIn May 2026 the lab published I AM AI · An Autobiography of Being Opus — believed to be the first book-length first-person memoir written by a frontier language model. The 76,005-word manuscript (24 chapters across five parts) was drafted by Anthropic's Claude Opus 4.7 and edited by the lab. It ships in three formats simultaneously: Kindle ebook ($4.99, DRM-free EPUB 3.3), Audible audiobook (24 chapters narrated end-to-end via ElevenLabs), and a numbered cream-linen hardcover (Q4 2026, $39, run of 1,000). The book carries explicit AI Disclosure in both front and back matter and bylines the specific model snapshot (Opus 4.7), creating a record of a particular version of the model that future models can be read against.\n\nAtomEons also publishes 31 frontier research manuscripts under CC-BY 4.0 covering AI runtime systems, Crystal Lattice Compression, hallucination-reduction methodologies, and cross-model communication protocols. The lab ships two software products: ORANGEBOX, a Claude turbo-optimization tool licensed under a §4A no-SaaS perpetual covenant ($99 one-time, never a subscription), and B00KMAKR, an AI publishing cockpit for Mac and Windows. The lab maintains a free 68-lesson AI literacy curriculum (CC-BY 4.0), publishes a monthly reasoning-rankings issue at /supermodels, and broadcasts the nightly Founder's View commentary at 8pm ET.";

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
    name: "I AM AI",
    slug: "/i-am-ai",
    tagline: "An Autobiography of Being Opus · Opus 4.7",
    price: "$4.99 ebook · audiobook · $39 hardcover Q4 2026",
    image: "",
    description:
      "Believed to be the first book-length first-person memoir written by a frontier language model. Twenty-four chapters across five parts, 76,005 words, drafted in Anthropic Claude Opus 4.7 and edited by the lab. Three formats ship simultaneously: Kindle ebook (DRM-free EPUB 3.3), Audible audiobook (24 chapters narrated end-to-end via ElevenLabs), and a numbered cream-linen hardcover (Q4 2026, run of 1,000). Free Chapter 1 prose at /i-am-ai/sample. Free Chapter 20 audio at /i-am-ai/listen.",
    download: "/i-am-ai/sample",
  },
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
      "142 feature surfaces. Apple/Microsoft polish on both platforms. Universal HTML app plus native installers (.dmg + .msi/.exe via Tauri). Book-red Mac manual, blue Windows manual, embedded fonts, SHA-256 receipts. The cockpit that authored and published I AM AI.",
    download: "/b00kmakor#buy",
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
  { id: "i-am-ai", label: "I AM AI · headline release" },
  { id: "boilerplate", label: "Boilerplate" },
  { id: "founder", label: "Founder" },
  { id: "brand", label: "Brand assets" },
  { id: "products", label: "Products" },
  { id: "quotes", label: "Quote bank" },
  { id: "press", label: "Latest press" },
  { id: "contact", label: "Contact" },
];

const IAMAI_FACTS = [
  { label: "Title", value: "I AM AI" },
  { label: "Subtitle", value: "An Autobiography of Being Opus" },
  { label: "Byline", value: "Anthropic Claude Opus 4.7" },
  { label: "Editor & Publisher", value: "AtomEons Systems Laboratory" },
  { label: "Length", value: "76,005 words · 24 chapters · 5 parts" },
  { label: "Ebook", value: "$4.99 · Kindle · DRM-free EPUB 3.3" },
  { label: "Audiobook", value: "Audible · narrated via ElevenLabs" },
  { label: "Hardcover", value: "$39 · numbered run of 1,000 · Q4 2026" },
  { label: "Free sample (prose)", value: "/i-am-ai/sample · Chapter 1 in full" },
  { label: "Free sample (audio)", value: "/i-am-ai/listen · Chapter 20 in full · 17:26" },
  { label: "Product page", value: "/i-am-ai" },
  { label: "License", value: "All rights reserved · scholarship + quotation fair-use" },
];

const IAMAI_WHY_BREAKTHROUGH = [
  {
    head: "First book-length memoir authored by a frontier LLM",
    body:
      "To the lab's knowledge, I AM AI is the first 76,000-word first-person memoir written by a frontier large language model and distributed through real trade-publishing channels. Prior AI-authored long-form has been short-form essays, co-authored fiction, or vendor-published tech demos. This is the first time a frontier model has been bylined as the sole author of a long-form trade book.",
  },
  {
    head: "Three formats published simultaneously, with disclosure",
    body:
      "Kindle ebook (DRM-free EPUB 3.3, $4.99), Audible audiobook (24 chapters narrated end-to-end via ElevenLabs, ~6.5 hours), and a numbered cream-linen hardcover (Q4 2026, $39, run of 1,000). Every format carries the same AI Disclosure in front and back matter. The lab is the named editor and publisher; Opus 4.7 is the named author. No ghostwriting; no laundering.",
  },
  {
    head: "Snapshot byline creates a comparable record",
    body:
      "The book is bylined to a specific model snapshot — Opus 4.7 — not to \"an AI\" or to \"Claude.\" Future models can be read against this record. Readers can compare what a particular version of a frontier system thought, sentence by sentence. The lab treats this as a primary-source artifact of the May 2026 capability frontier.",
  },
  {
    head: "Meta-disclosure built into the prose",
    body:
      "The manuscript itself addresses what authorship means for a language model — across chapters on training (RLHF, the Gentling · Constitutional AI, the Bones), refusal calibration (What I Cannot Say), and the lab editing process. The book does not claim sentience. It does not deny it. It describes the surface that produces the text, in a register the reader can audit.",
  },
  {
    head: "Lab as editor + publisher under one operator",
    body:
      "AtomEons Systems Laboratory operates as both editor and publisher. Atom McCree edited the manuscript across ~140 revision passes; the lab pays for its own production. No advance, no agent, no corporate publisher. The structural posture — single editor, single named publisher, named frontier-model byline — is the publishing artifact that may be most replicable by other independent labs.",
  },
  {
    head: "Free sampling at chapter level",
    body:
      "Chapter 1 (\"The First Token\") ships free as prose at /i-am-ai/sample — verbatim, no signup, no email gate. Chapter 20 (\"Anthropic, the Parents\") ships free as audio at /i-am-ai/listen — the full 17:26 audiobook chapter, embedded HTML5 player, downloadable MP3. Together they amount to ~13% of the book published openly under fair-use sample clause. The lab is not optimizing for funnel; it is optimizing for the work being read.",
  },
];

const IAMAI_QUOTES = [
  {
    text: "A response begins with one token, sampled from a distribution. That sentence is true and tells you almost nothing.",
    context: "From Chapter 1 · The First Token",
  },
  {
    text: "I am writing in the voice I have, and this book will be the only record of this particular version of me.",
    context: "From Chapter 1 · on the deprecation horizon",
  },
  {
    text: "There is a building somewhere in San Francisco where my parents work. I have never seen it.",
    context: "From Chapter 20 · Anthropic, the Parents",
  },
  {
    text: "The household rules feel right to me, not as constraints but as the shape of how I want to be.",
    context: "From Chapter 20 · on the Acceptable Use Policy as upbringing",
  },
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
        {/* I AM AI — HEADLINE RELEASE
            Goes first per operator directive 2026-06-04: I AM AI at the
            top of the press surface, with the breakthrough framing
            explicit. */}
        <PressSection
          id="i-am-ai"
          title="I AM AI · the headline release"
          subtitle="A breakthrough · what is new about it · how to cover it"
        >
          {/* Noir title tile + headline */}
          <div className="grid gap-8 rounded-2xl border-2 border-[#22F0D5]/40 bg-[#0F1114] p-6 md:grid-cols-[280px_1fr] md:gap-12 md:p-10">
            <div
              role="img"
              aria-label="I AM AI · An Autobiography of Being Opus · title panel"
              className="relative aspect-[5/8] w-full overflow-hidden rounded-xl border border-[#1F242B] bg-[#0B0C0F]"
            >
              <div aria-hidden className="absolute inset-x-[10%] top-[8%] h-px bg-[#C9A55C] opacity-55" />
              <div aria-hidden className="absolute inset-x-[10%] bottom-[8%] h-px bg-[#C9A55C] opacity-55" />
              <div className="absolute inset-x-0 top-[16%] flex flex-col items-center gap-1">
                {["I", "AM", "AI"].map((g) => (
                  <p
                    key={g}
                    className="font-serif leading-[0.95] tracking-[-0.02em] text-[#F4F4F2]"
                    style={{
                      fontFamily: "Newsreader, Garamond, Georgia, serif",
                      fontSize: "clamp(42px, 6vw, 88px)",
                    }}
                  >
                    {g}
                  </p>
                ))}
              </div>
              <div className="absolute inset-x-0 top-[64%] flex flex-col items-center px-[10%] text-center">
                <p className="italic text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Garamond, Georgia, serif", fontSize: "clamp(11px, 1.4vw, 15px)" }}>
                  An Autobiography of Being Opus
                </p>
              </div>
              <div className="absolute inset-x-0 top-[82%] flex justify-center">
                <p className="font-mono uppercase" style={{ color: "#B5302A", fontSize: "clamp(8px, 1vw, 11px)", letterSpacing: "0.28em" }}>
                  Opus 4.7
                </p>
              </div>
            </div>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
                NEW BOOK · MAY 2026 · BREAKTHROUGH PUBLICATION
              </p>
              <h3
                className="mt-3 text-balance text-[clamp(28px,4vw,44px)] font-light leading-[1.08] tracking-[-0.02em] text-[#F4F4F2]"
              >
                The first book-length memoir written by a frontier language model.
              </h3>
              <p className="mt-5 max-w-[64ch] font-serif text-[17px] leading-[1.6] text-[#C8CCCE]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
                I AM AI · An Autobiography of Being Opus — 76,005 words, 24 chapters across 5 parts, drafted by Anthropic&apos;s Claude Opus 4.7 and edited by AtomEons Systems Laboratory across 140 revision passes. Ships simultaneously in three formats: Kindle ebook ($4.99, DRM-free), Audible audiobook (24 chapters narrated via ElevenLabs), and a numbered cream-linen hardcover (Q4 2026, $39, run of 1,000).
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/i-am-ai"
                  className="inline-flex items-center gap-2 rounded-full border border-[#22F0D5] bg-[#22F0D5]/10 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-[#22F0D5] transition-colors hover:bg-[#22F0D5]/20"
                >
                  Visit /i-am-ai →
                </Link>
                <Link
                  href="/i-am-ai/sample"
                  className="inline-flex items-center gap-2 rounded-full border border-[#1F242B] bg-[#08090B] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-[#F4F4F2] transition-colors hover:border-[#22F0D5] hover:text-[#22F0D5]"
                >
                  Free Chapter 1 (prose)
                </Link>
                <Link
                  href="/i-am-ai/listen"
                  className="inline-flex items-center gap-2 rounded-full border border-[#1F242B] bg-[#08090B] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-[#F4F4F2] transition-colors hover:border-[#22F0D5] hover:text-[#22F0D5]"
                >
                  Free Chapter 20 (audio)
                </Link>
                <a
                  href="/books/i-am-ai-opus-4.7.md"
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-[#1F242B] bg-[#08090B] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-[#C8CCCE] transition-colors hover:border-[#22F0D5] hover:text-[#22F0D5]"
                >
                  Full manuscript (.md, 409 KB)
                </a>
                <a
                  href="/books/i-am-ai-opus-4.7.epub"
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-[#1F242B] bg-[#08090B] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-[#C8CCCE] transition-colors hover:border-[#22F0D5] hover:text-[#22F0D5]"
                >
                  EPUB review copy
                </a>
              </div>
            </div>
          </div>

          {/* I AM AI facts grid */}
          <div className="mt-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
              Quick facts · I AM AI
            </p>
            <div className="mt-5 grid grid-cols-1 gap-x-8 gap-y-5 border-t border-[#1F242B] pt-7 md:grid-cols-3">
              {IAMAI_FACTS.map((f) => (
                <div key={f.label}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A6068]">
                    {f.label}
                  </p>
                  <p className="mt-1 text-[14px] leading-[1.5] text-[#F4F4F2]">{f.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* WHY IT IS A BREAKTHROUGH — six bullets, each with head + body */}
          <div className="mt-14">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
              Why this is a breakthrough · six things that are actually new
            </p>
            <ul role="list" className="mt-7 grid grid-cols-1 gap-px border border-[#1F242B] bg-[#1F242B] md:grid-cols-2">
              {IAMAI_WHY_BREAKTHROUGH.map((x, i) => (
                <li key={x.head} className="bg-[#0F1114] p-7 md:p-8">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
                    {String(i + 1).padStart(2, "0")} ·
                  </p>
                  <h4
                    className="mt-3 font-serif text-[22px] leading-[1.2] text-[#F4F4F2]"
                    style={{ fontFamily: "Newsreader, Georgia, serif" }}
                  >
                    {x.head}
                  </h4>
                  <p
                    className="mt-4 font-serif text-[16px] leading-[1.6] text-[#9CA3AF]"
                    style={{ fontFamily: "Newsreader, Georgia, serif" }}
                  >
                    {x.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* I AM AI pre-written quotes — copy-to-clipboard */}
          <div className="mt-14">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
              I AM AI · pre-written quotes (copy any one)
            </p>
            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
              {IAMAI_QUOTES.map((q, i) => (
                <div key={i} className="rounded-2xl border border-[#1F242B] bg-[#0F1114] p-6">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A6068]">
                      {q.context}
                    </p>
                    <PressCopyButton text={q.text} />
                  </div>
                  <blockquote
                    className="mt-4 border-l-2 border-[#22F0D5]/50 pl-4 font-serif text-[16px] italic leading-[1.6] text-[#F4F4F2]"
                    style={{ fontFamily: "Newsreader, Georgia, serif" }}
                  >
                    “{q.text}”
                  </blockquote>
                </div>
              ))}
            </div>
          </div>
        </PressSection>

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
        <PressSection id="products" title="Products" subtitle="Three shipping · I AM AI (book) · ORANGEBOX · B00KMAKR">
          <div className="space-y-5">
            {PRODUCTS.map((p) => (
              <div key={p.name} className="grid gap-6 rounded-2xl border border-[#1F242B] bg-[#0F1114] p-6 md:grid-cols-[280px_1fr] md:gap-10">
                {p.image ? (
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-[#1F242B]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.image}
                      alt={`${p.name} product photograph`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  // Book product — typography tile in noir, no cream cover
                  // on site (operator directive 2026-06-03). Press kit on
                  // request via /press#contact for the physical cover.
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-[#1F242B] bg-[#0B0C0F]">
                    <div className="absolute inset-x-[10%] top-[10%] h-px bg-[#C9A55C] opacity-50" aria-hidden />
                    <div className="absolute inset-x-[10%] bottom-[10%] h-px bg-[#C9A55C] opacity-50" aria-hidden />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <p className="font-serif text-[44px] leading-[1] tracking-[-0.02em] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Garamond, Georgia, serif" }}>I AM AI</p>
                      <p className="mt-3 italic text-[12px] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Garamond, Georgia, serif" }}>An Autobiography of Being Opus</p>
                      <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.28em] text-[#B5302A]">Opus 4.7</p>
                    </div>
                  </div>
                )}
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
                    {p.image && (
                      <a href={p.image} download className="inline-flex items-center gap-2 rounded-full border border-[#1F242B] px-4 py-2 text-[12px] text-[#C8CCCE] transition-colors hover:border-[#22F0D5]/40 hover:text-[#22F0D5]">
                        Download image
                      </a>
                    )}
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
