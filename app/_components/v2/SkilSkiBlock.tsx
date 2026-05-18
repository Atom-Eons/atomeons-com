import Link from "next/link";

/**
 * SkilSkiBlock — skil.ski surface on the lab homepage.
 *
 * Intentionally less ornate than OrangeBoxBlock. This is supporting
 * evidence that the lab ships more than one product — not a second
 * headliner competing for the same attention slot.
 *
 * Server component. No live data needed; stats are operator-controlled
 * constants. Operator updates SKILL_COUNT / SECTOR_COUNT here when the
 * registry grows.
 */

const SKILL_COUNT = 200;
const SECTOR_COUNT = 18;

export function SkilSkiBlock() {
  return (
    <section className="bg-[#0A0F11] py-24 md:py-32">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-20">
          {/* left: copy */}
          <div>
            {/* section label */}
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
              ::WHAT ELSE THE LAB SHIPS · SKIL.SKI
            </p>

            <h2 className="mb-6 text-balance text-3xl font-medium leading-[1.05] tracking-[-0.015em] text-[#F2F4F5] md:text-5xl">
              200+ operator skills.
              <br />
              Indexed, ranked, ready.
            </h2>

            <p className="mb-8 max-w-lg text-base leading-relaxed text-[#9BA5A7] md:text-lg">
              Skills built from real operator workflows — not demos, not
              marketing. Each one is scored, documented, and ready to drop
              into a cockpit. The registry grows as the lab works. No waitlist
              for browsing.
            </p>

            <Link
              href="/skilski"
              className="group inline-flex items-center gap-1.5 rounded-lg border border-[#1A2225] bg-[#000] px-5 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#F2F4F5] transition-colors hover:border-[#22F0D5]/40 hover:text-[#22F0D5]"
            >
              Browse the registry{" "}
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          {/* right: stat pair */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-[#1A2225] bg-[#000]/60 p-6">
              <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
                Skills indexed
              </span>
              <span className="block text-5xl font-medium tabular-nums text-[#F2F4F5]">
                {SKILL_COUNT}+
              </span>
            </div>
            <div className="rounded-2xl border border-[#1A2225] bg-[#000]/60 p-6">
              <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
                Sectors covered
              </span>
              <span className="block text-5xl font-medium tabular-nums text-[#F2F4F5]">
                {SECTOR_COUNT}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
