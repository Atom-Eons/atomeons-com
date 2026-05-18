import Link from "next/link";
import { PAPERS } from "@/app/_data/research-papers";

/**
 * ResearchSnapshot — 3 papers from the ÆoNs catalog.
 *
 * Filters to status === "summarized", takes the first 3.
 * The kid_summary is the right surface for a homepage card —
 * it's plain English, 1-2 sentences, no jargon.
 *
 * Server component. No client state needed.
 */

export function ResearchSnapshot() {
  const featured = PAPERS.filter((p) => p.status === "summarized").slice(0, 3);

  return (
    <section className="bg-[#000] py-24 md:py-32">
      <div className="mx-auto w-full max-w-7xl px-6">
        {/* section label */}
        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
          ::ÆOS RESEARCH · LATEST
        </p>

        <div className="mb-14 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="max-w-xl text-balance text-3xl font-medium leading-[1.05] tracking-[-0.015em] text-[#F2F4F5] md:text-5xl">
            Twelve papers. CC-BY 4.0.
            <br />
            One operator.
          </h2>
          <Link
            href="/research/papers"
            className="group inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5] transition-colors hover:text-[#F2F4F5]"
          >
            See all 12 papers{" "}
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* 3 paper cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {featured.map((paper, idx) => (
            <Link
              key={paper.slug}
              href={`/research/papers/${paper.slug}`}
              className="group relative flex flex-col rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 transition-colors hover:bg-[#0D1518]"
            >
              {/* subtle top line accent — alternates cyan/orange */}
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px rounded-t-2xl"
                style={{
                  background:
                    idx % 2 === 0
                      ? "linear-gradient(90deg, transparent, rgba(34,240,213,0.4), transparent)"
                      : "linear-gradient(90deg, transparent, rgba(255,122,26,0.4), transparent)",
                }}
              />

              {/* paper index */}
              <span className="mb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-[#6B7779]">
                {paper.date}
              </span>

              {/* title */}
              <h3 className="mb-4 flex-1 text-base font-medium leading-snug text-[#F2F4F5]">
                {paper.title}
              </h3>

              {/* kid summary — plain English, 2 lines max */}
              <p className="line-clamp-3 text-sm leading-relaxed text-[#9BA5A7]">
                {paper.kid_summary}
              </p>

              {/* read affordance */}
              <span className="mt-5 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5] transition-colors group-hover:text-[#F2F4F5]">
                READ{" "}
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
