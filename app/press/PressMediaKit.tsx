"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

/**
 * PressMediaKit — instant journalist pack.
 *
 * The piece a real news desk wants in the first 60 seconds: copy-to-clipboard
 * boilerplate, founder bio, one-sentence pitch, hero image, downloadable
 * asset row, press release PDF, and an honest "be the first" coverage card
 * until verified outlets land.
 *
 * Drop into /press above the "total effort" surface block.
 */

const ONE_SENTENCE_PITCH = `AtomEons is an independent AI systems laboratory in Marco Island, Florida — one founder, one $99-once desktop AI cockpit (ORANGEBOX Command v6.3, license §4A legally bans subscription), twelve peer-ready research papers, a 38-page sci-fi monograph, a nightly broadcast, and a 14-clause public manifesto — all shipped without venture funding while Anthropic raised $30B and OpenAI raised at $500B.`;

const BOILERPLATE_GRAF = `Founded in 2026 by Atom McCree, AtomEons Systems Laboratory is an independent AI research and product lab operating out of Marco Island, Florida. The lab ships across four pillars: USE AI (the local-first ORANGEBOX cockpit v6.3 — two surfaces, AE See-Suite plus AE Operations; $99 once, license §4A legally bans switching to subscription; two 30-day refund paths, Material Failure Guarantee plus Workflow-Fit Refund), MAKE MONEY (the skil.ski skill marketplace), KNOW THE TRUTH (the /intel decoded-primary-source surface and The Founder's View nightly broadcast at 8pm ET), and RESEARCH (ÆoNs Research — twelve manuscripts under CC-BY 4.0 plus the Lessons From Sci-Fi monograph, a comprehensive analytical survey of a century of AI in film and television). The lab takes zero markup on token costs, runs zero telemetry, takes zero affiliate revenue from any named tool, and built its own website in one day inside the cockpit it sells. The full operating doctrine is published as a fourteen-clause manifesto at https://atomeons.com/manifesto.`;

const FOUNDER_BIO = `Atom McCree is the founder of AtomEons Systems Laboratory in Marco Island, Florida. A solo independent operator running across product, research, and broadcast surfaces — he ships the ORANGEBOX cockpit, the ÆoNs Research manuscript catalog, and the nightly Founder's View letter from the same machine. Reachable directly at a.mccree@gmail.com and @AtomMccree on X. Available for press interviews on AI tooling, indie AI economics, the post-SaaS pricing model, and how a one-person lab competes against $30B-funded incumbents.`;

const ASSETS = [
  {
    name: "Hero · HAL 9000 lens (high-res)",
    src: "/research/lessons-from-sci-fi/stills/2001-hal-9000.png",
    size: "1376×864 · 1.0 MB · PNG",
    kind: "image",
  },
  {
    name: "Lab logo · Æ glyph (download from header)",
    src: "/og-root-current.png",
    size: "1200×630 · OG card · PNG",
    kind: "image",
  },
  {
    name: "Founder headshot",
    src: "/press/assets/atom-headshot.jpg",
    size: "1024×1024 · TBD · JPG",
    kind: "image-tbd",
  },
  {
    name: "ORANGEBOX product shot",
    src: "/press/assets/orangebox-product.png",
    size: "1920×1080 · TBD · PNG",
    kind: "image-tbd",
  },
  {
    name: "Press release v6 · PDF",
    src: "/press/assets/atomeons-press-release-v6.pdf",
    size: "PDF · TBD",
    kind: "doc-tbd",
  },
  {
    name: "Full media pack · ZIP",
    src: "/press/assets/atomeons-media-pack.zip",
    size: "ZIP bundle · TBD",
    kind: "zip-tbd",
  },
] as const;

const COVERAGE: { outlet: string; headline: string; date: string; href: string }[] = [
  // intentionally empty until first real verified coverage lands;
  // a "be the first" honest placeholder renders when this is empty.
];

function CopyButton({ label, payload }: { label: string; payload: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(payload);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1800);
        } catch {
          /* no-op */
        }
      }}
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.28em] transition-all ${
        copied
          ? "border-[#22F0D5] bg-[#22F0D5]/15 text-[#22F0D5]"
          : "border-[#1A2225] bg-[#0A0F11] text-[#9BA5A7] hover:border-[#22F0D5]/50 hover:text-[#22F0D5]"
      }`}
    >
      {copied ? "copied ✓" : `copy ${label}`}
    </button>
  );
}

export function PressMediaKit() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
      <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
        ::instant media kit · everything you need to file in 60 seconds
      </p>
      <h2 className="mt-4 text-balance text-4xl font-medium leading-[1.05] tracking-tight text-[#F2F4F5] md:text-6xl">
        Lift, paste,{" "}
        <span className="bg-gradient-to-r from-[#22F0D5] via-[#7DDBC8] to-[#FFB87A] bg-clip-text text-transparent">
          file the story.
        </span>
      </h2>
      <p className="mt-5 max-w-2xl text-base leading-[1.7] text-[#9BA5A7] md:text-lg">
        Every block below is press-ready. Copy any block to clipboard.
        Use directly or rephrase. Founder is reachable for follow-up at
        the address in the hero card.
      </p>

      {/* HERO IMAGE + ONE-SENTENCE PITCH */}
      <div className="mt-12 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <figure className="relative overflow-hidden rounded-2xl border border-[#1A2225] bg-black">
          <div className="relative aspect-[16/10] w-full">
            <Image
              src="/research/lessons-from-sci-fi/stills/2001-hal-9000.png"
              alt="AtomEons hero — HAL 9000 lens with astronaut in deep perspective. Used as the brand's lead image."
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              priority
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-tr from-black/85 via-black/35 to-transparent"
            />
            <div className="absolute bottom-5 left-6 right-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
                lab hero image · usable in any context
              </p>
              <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-white/60">
                credit: AtomEons / ÆoNs Research · CC-BY 4.0
              </p>
            </div>
          </div>
        </figure>

        <div className="flex flex-col justify-between rounded-2xl border border-[#22F0D5]/40 bg-gradient-to-br from-[#0E1B1F] to-[#0A0F11] p-7">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
              ::one-sentence pitch
            </p>
            <p className="mt-4 text-base leading-[1.55] text-[#F2F4F5] md:text-lg">
              {ONE_SENTENCE_PITCH}
            </p>
          </div>
          <div className="mt-6">
            <CopyButton label="pitch" payload={ONE_SENTENCE_PITCH} />
          </div>
        </div>
      </div>

      {/* BOILERPLATE + FOUNDER BIO */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-7">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#FFB87A]">
            ::one-paragraph boilerplate
          </p>
          <p className="mt-4 text-sm leading-[1.7] text-[#C8CCCE] md:text-base">
            {BOILERPLATE_GRAF}
          </p>
          <div className="mt-5">
            <CopyButton label="boilerplate" payload={BOILERPLATE_GRAF} />
          </div>
        </div>
        <div className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-7">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::founder bio · atom mccree
          </p>
          <p className="mt-4 text-sm leading-[1.7] text-[#C8CCCE] md:text-base">
            {FOUNDER_BIO}
          </p>
          <div className="mt-5">
            <CopyButton label="bio" payload={FOUNDER_BIO} />
          </div>
        </div>
      </div>

      {/* DOWNLOADABLE ASSETS */}
      <div className="mt-10 rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-7 md:p-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
          ::downloadable assets
        </p>
        <p className="mt-3 text-sm text-[#9BA5A7]">
          Right-click and Save As, or click through. Items marked{" "}
          <span className="font-mono text-[#FFB87A]">TBD</span> are
          pending operator upload to <code className="font-mono text-[#22F0D5]">/public/press/assets/</code>.
        </p>
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {ASSETS.map((a) => {
            const tbd = a.kind.endsWith("tbd");
            return (
              <a
                key={a.name}
                href={a.src}
                target="_blank"
                rel="noopener"
                className={`group flex items-center justify-between gap-4 rounded-xl border p-4 transition-all ${
                  tbd
                    ? "border-[#FFB87A]/20 bg-[#0A0F11] hover:border-[#FFB87A]/50"
                    : "border-[#1A2225] bg-[#0A0F11] hover:border-[#22F0D5]/50"
                }`}
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-[#F2F4F5] group-hover:text-[#22F0D5]">
                    {a.name}
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
                    {a.size}
                  </p>
                </div>
                <span
                  className={`shrink-0 font-mono text-[10px] uppercase tracking-[0.28em] ${
                    tbd ? "text-[#FFB87A]" : "text-[#22F0D5]"
                  }`}
                >
                  {tbd ? "tbd ↗" : "open ↗"}
                </span>
              </a>
            );
          })}
        </div>
      </div>

      {/* COVERAGE FEED — honest empty state */}
      <div className="mt-10 rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-7 md:p-8">
        <div className="flex items-baseline justify-between gap-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::coverage feed
          </p>
          <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-[#6B7779]">
            updated as outlets verify · ping the founder to add yours
          </p>
        </div>
        {COVERAGE.length === 0 ? (
          <div className="mt-5 rounded-xl border border-dashed border-[#1A2225] bg-[#0E1418] p-6 text-center md:p-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#FFB87A]">
              be the first outlet on the record
            </p>
            <p className="mt-4 text-base leading-[1.7] text-[#C8CCCE] md:text-lg">
              No verified coverage yet. The lab does not buy or trade for
              placement and does not run PR. If you publish, send the
              link to{" "}
              <a
                href="mailto:a.mccree@gmail.com?subject=press%20coverage%20live"
                className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-4 hover:decoration-[#22F0D5]"
              >
                a.mccree@gmail.com
              </a>{" "}
              with the URL and we list it here, alphabetized by outlet,
              with no edits or commentary.
            </p>
            <Link
              href="/founders-view"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#22F0D5]/40 bg-[#22F0D5]/10 px-5 py-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5] transition-all hover:border-[#22F0D5] hover:bg-[#22F0D5]/20"
            >
              read tonight&apos;s broadcast → /founders-view
            </Link>
          </div>
        ) : (
          <ul className="mt-5 space-y-2">
            {COVERAGE.map((c) => (
              <li key={c.href}>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener"
                  className="flex items-baseline justify-between gap-4 rounded-lg border border-[#1A2225] bg-[#0E1418] p-4 transition-colors hover:border-[#22F0D5]/40"
                >
                  <span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
                      {c.outlet}
                    </span>
                    <span className="ml-3 text-sm text-[#F2F4F5]">
                      {c.headline}
                    </span>
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
                    {c.date}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* INTERVIEW PROTOCOL */}
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          {
            head: "Embargo policy",
            body: "None. The launch was public on 2026-05-17. Publish whenever you're ready.",
            tone: "#22F0D5",
          },
          {
            head: "Interview format",
            body: "Email, Zoom/Meet, or X DM. ~2-hour reply SLA in waking ET hours. Recorded interviews fine.",
            tone: "#FFB87A",
          },
          {
            head: "Fact-check",
            body: "Send the paragraphs back. Founder confirms in writing within 24h. Quotes verbatim or rephrased on request.",
            tone: "#22F0D5",
          },
        ].map((b) => (
          <div
            key={b.head}
            className="rounded-xl border border-[#1A2225] bg-[#0A0F11] p-5"
          >
            <p
              className="font-mono text-[10px] uppercase tracking-[0.28em]"
              style={{ color: b.tone }}
            >
              {b.head}
            </p>
            <p className="mt-3 text-sm leading-[1.65] text-[#C8CCCE]">
              {b.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
