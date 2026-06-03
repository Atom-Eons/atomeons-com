import Link from "next/link";
import { ArrowUpRight, BookOpen, Library, Quote, FileCheck2 } from "lucide-react";

export function BestAILearning() {
  return (
    <section
      id="best-ai-learning"
      aria-labelledby="best-ai-learning-heading"
      className="relative w-full border-t border-[#1F242B] bg-[#08090B] px-4 py-24 text-[#F4F4F2] sm:px-6 md:py-32 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* Eyebrow + Heading + Sublede */}
        <header className="mb-12 max-w-3xl md:mb-16">
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.18em] text-[#5A6068]">
            § 04 &middot; /learn &middot; 68 lessons, sourced, anti-hype.
          </p>
          <h2
            id="best-ai-learning-heading"
            className="font-serif text-4xl leading-[1.05] tracking-tight text-[#F4F4F2] sm:text-5xl md:text-6xl"
            style={{ fontVariationSettings: '"wght" 380, "opsz" 144' }}
          >
            Atlas, career, trust, decode, decoded papers — written so a peer
            could falsify it.
          </h2>
          <p className="mt-6 max-w-2xl font-serif text-lg leading-[1.55] text-[#9CA3AF] md:text-xl">
            MIT OCW recorded lectures from 2019. Coursera funnels you into a paid
            certificate. Bootcamps cost $14,500. AtomEons publishes 127 free
            pages of masters-grade AI education, sourced, anti-hype, and updated
            as the field moves.
          </p>
        </header>

        {/* Asymmetric Bento */}
        <div className="grid grid-cols-1 gap-px bg-[#1F242B] md:grid-cols-12 md:grid-rows-4">
          {/* Cell 1 — 127 pages */}
          <article className="group relative col-span-1 flex flex-col justify-between bg-[#0F1114] p-8 md:col-span-4 md:row-span-2 md:p-10">
            <div className="flex items-start justify-between">
              <BookOpen
                className="h-5 w-5 text-[#5A6068] transition-colors group-hover:text-[#22F0D5]"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5A6068]">
                01
              </span>
            </div>
            <div>
              <div
                className="font-serif text-6xl leading-none tracking-tight text-[#22F0D5] sm:text-7xl md:text-8xl"
                style={{ fontVariationSettings: '"wght" 320, "opsz" 144' }}
              >
                127
              </div>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[#9CA3AF]">
                pages &middot; lessons published
              </p>
            </div>
          </article>

          {/* Cell 2 — 27 atlas deep-dives */}
          <article className="group relative col-span-1 flex flex-col justify-between bg-[#0F1114] p-8 md:col-span-4 md:row-span-2 md:p-10">
            <div className="flex items-start justify-between">
              <Library
                className="h-5 w-5 text-[#5A6068] transition-colors group-hover:text-[#F4F4F2]"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5A6068]">
                02
              </span>
            </div>
            <div>
              <div
                className="font-serif text-6xl leading-none tracking-tight text-[#F4F4F2] sm:text-7xl md:text-8xl"
                style={{ fontVariationSettings: '"wght" 320, "opsz" 144' }}
              >
                27
              </div>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[#9CA3AF]">
                atlas deep-dives
              </p>
            </div>
          </article>

          {/* Cell 3 — Lab voice quote (tall, right column) */}
          <article className="relative col-span-1 flex flex-col justify-between bg-[#0F1114] p-8 md:col-span-4 md:row-span-4 md:p-10">
            <div className="flex items-start justify-between">
              <Quote
                className="h-5 w-5 text-[#5A6068]"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5A6068]">
                03
              </span>
            </div>
            <div className="mt-12">
              <blockquote
                className="font-serif text-2xl leading-[1.3] tracking-tight text-[#F4F4F2] sm:text-3xl md:text-[28px] lg:text-[32px]"
                style={{ fontVariationSettings: '"wght" 360, "opsz" 144' }}
              >
                Anti-hype. Sourced. Updated when the field moves.
              </blockquote>
              <footer className="mt-8 border-t border-[#1F242B] pt-5">
                <cite className="block font-mono text-[11px] uppercase not-italic tracking-[0.18em] text-[#9CA3AF]">
                  &mdash; Atom McCree
                </cite>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#5A6068]">
                  Founder &middot; AtomEons Systems Lab
                </p>
              </footer>
            </div>
          </article>

          {/* Cell 4 — 100% primary sources */}
          <article className="group relative col-span-1 flex flex-col justify-between bg-[#0F1114] p-8 md:col-span-4 md:row-span-2 md:p-10">
            <div className="flex items-start justify-between">
              <FileCheck2
                className="h-5 w-5 text-[#5A6068] transition-colors group-hover:text-[#F4F4F2]"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5A6068]">
                04
              </span>
            </div>
            <div>
              <div
                className="font-serif text-6xl leading-none tracking-tight text-[#F4F4F2] sm:text-7xl md:text-8xl"
                style={{ fontVariationSettings: '"wght" 320, "opsz" 144' }}
              >
                100%
              </div>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[#9CA3AF]">
                primary sources cited
              </p>
            </div>
          </article>

          {/* Cell 5 — Comparison table */}
          <article className="relative col-span-1 flex flex-col justify-between bg-[#0F1114] p-8 md:col-span-4 md:row-span-2 md:p-10">
            <div className="flex items-start justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5A6068]">
                Comparison
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5A6068]">
                05
              </span>
            </div>
            <dl className="mt-6 space-y-3">
              <div className="flex items-baseline justify-between border-b border-[#1F242B] pb-3">
                <dt className="font-mono text-[12px] uppercase tracking-[0.12em] text-[#9CA3AF]">
                  Coursera
                </dt>
                <dd className="font-mono text-base text-[#F4F4F2]">
                  $399
                  <span className="ml-2 text-[10px] uppercase tracking-[0.18em] text-[#5A6068]">
                    cert
                  </span>
                </dd>
              </div>
              <div className="flex items-baseline justify-between border-b border-[#1F242B] pb-3">
                <dt className="font-mono text-[12px] uppercase tracking-[0.12em] text-[#9CA3AF]">
                  MIT OCW
                </dt>
                <dd className="font-mono text-base text-[#F4F4F2]">
                  $0
                  <span className="ml-2 text-[10px] uppercase tracking-[0.18em] text-[#5A6068]">
                    2019 recorded
                  </span>
                </dd>
              </div>
              <div className="flex items-baseline justify-between pb-1">
                <dt className="font-mono text-[12px] uppercase tracking-[0.12em] text-[#22F0D5]">
                  AtomEons
                </dt>
                <dd className="font-mono text-base text-[#22F0D5]">
                  $0
                  <span className="ml-2 text-[10px] uppercase tracking-[0.18em] text-[#22F0D5]/70">
                    live
                  </span>
                </dd>
              </div>
            </dl>
          </article>

          {/* Cell 6 — CTA strip (full width) */}
          <Link
            href="/learn"
            className="group relative col-span-1 flex items-center justify-between bg-[#0F1114] p-8 transition-colors hover:bg-[#0F1114]/80 md:col-span-12 md:row-span-1 md:p-10"
            aria-label="Open Learn — 127 pages of free masters-grade AI education"
          >
            <span
              className="absolute inset-0 border border-[#22F0D5]/30 transition-colors group-hover:border-[#22F0D5]/60"
              aria-hidden="true"
            />
            <div className="relative flex items-baseline gap-5">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#22F0D5]">
                Open
              </span>
              <span
                className="font-serif text-2xl tracking-tight text-[#F4F4F2] sm:text-3xl"
                style={{ fontVariationSettings: '"wght" 380, "opsz" 144' }}
              >
                /learn
              </span>
              <span className="hidden font-mono text-[11px] uppercase tracking-[0.18em] text-[#5A6068] sm:inline">
                127 pages &middot; free &middot; updated live
              </span>
            </div>
            <ArrowUpRight
              className="relative h-6 w-6 text-[#22F0D5] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
