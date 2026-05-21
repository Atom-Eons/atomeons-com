import Link from "next/link";

/**
 * StartHereStrip — homepage novice banner.
 *
 * Operator directive 2026-05-21: the site is half-built for novices and
 * half-built for the press desk. The /start page was shipped, but the
 * door to it is only a tiny header chip. This strip is the FRONT-DOOR
 * BANNER for someone who landed on atomeons.com from a press article,
 * a tweet, or a search result and has no idea what to do next.
 *
 * Lives between the four-pillar Hero and the OrganismRail. Cyan +
 * peach gradient ring + pulse dot signal "this is the easy way in."
 * No glyphs. No jargon. Three concrete promises.
 */
export function StartHereStrip() {
  return (
    <section
      data-cockpit-section="start-here-strip"
      className="relative isolate overflow-hidden border-y border-[#1A2225] bg-[#0A1417] py-12 md:py-16"
    >
      {/* ambient color sweep */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(55% 100% at 20% 50%, rgba(34, 240, 213, 0.16), transparent 65%), " +
            "radial-gradient(45% 100% at 85% 50%, rgba(255, 184, 122, 0.14), transparent 65%)",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-6 md:flex-row md:items-center md:justify-between md:gap-10">
        <div className="flex-1">
          <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            <span className="size-1.5 animate-pulse rounded-full bg-[#22F0D5] shadow-[0_0_8px_#22F0D5]" />
            new to ai? · the actual on-ramp · 11 min
          </p>

          <h2 className="mt-3 text-balance text-2xl font-medium leading-[1.1] tracking-tight text-[#F2F4F5] md:text-4xl lg:text-5xl">
            If you&apos;ve used ChatGPT under ten times,
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-[#22F0D5] via-[#7DDBC8] to-[#FFB87A] bg-clip-text text-transparent">
              start here.
            </span>
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-[1.7] text-[#9BA5A7] md:text-base">
            Eleven minutes. No jargon. One paragraph explaining what AI
            actually is. Six concrete tasks for tonight. Six honest
            limits. A 30-day on-ramp. Then the rest of this site reads
            different.
          </p>

          <div className="mt-6 grid max-w-3xl grid-cols-3 gap-3 md:gap-5">
            {[
              { k: "What it is", v: "3 min" },
              { k: "What it can do", v: "4 min" },
              { k: "What it can't", v: "2 min" },
            ].map((r) => (
              <div
                key={r.k}
                className="rounded-lg border border-[#1A2225] bg-black/40 px-3 py-2.5 backdrop-blur-sm"
              >
                <p className="font-mono text-[9px] uppercase tracking-[0.32em] text-[#22F0D5]">
                  {r.k}
                </p>
                <p className="mt-1 font-mono text-xs text-[#C8CCCE]">
                  {r.v}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex w-full shrink-0 flex-col items-stretch gap-3 md:w-auto md:min-w-[260px]">
          <Link
            href="/start"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#22F0D5] px-7 py-3.5 font-mono text-[12px] font-semibold uppercase tracking-[0.28em] text-[#0B1014] transition-all hover:bg-[#F2F4F5] hover:shadow-[0_0_40px_rgba(34,240,213,0.4)]"
          >
            start here
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
          <Link
            href="/research/lessons-from-sci-fi"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#1A2225] bg-black/30 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#9BA5A7] transition-colors hover:border-[#22F0D5]/40 hover:text-[#22F0D5]"
          >
            or read the monograph →
          </Link>
        </div>
      </div>
    </section>
  );
}
