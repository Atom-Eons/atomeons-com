import Link from "next/link";

/**
 * SkilSkiBlock — skil.ski surface on the lab homepage.
 *
 * Intentionally less ornate than OrangeBoxBlock. This is supporting
 * evidence that the lab ships more than one product — not a second
 * headliner competing for the same attention slot.
 *
 * Server component. No fabricated stats. The registry is genuinely
 * mid-build; we show what it IS instead of what we wish it counted.
 */

export function SkilSkiBlock() {
  return (
    <section className="bg-[#0A0F11] py-24 md:py-32">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-start lg:gap-20">
          {/* left: copy */}
          <div>
            {/* section label */}
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
              ::WHAT ELSE THE LAB SHIPS · SKIL.SKI
            </p>

            <h2 className="mb-6 text-balance text-3xl font-medium leading-[1.05] tracking-[-0.015em] text-[#F2F4F5] md:text-5xl">
              The operator-class
              <br />
              <span className="text-[#22F0D5]">skill registry.</span>
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
              Enter the registry{" "}
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          {/* right: what skill.ski IS — declarative, not numeric.
              No fabricated counts. Three structural facts the operator
              can vouch for today. */}
          <div className="space-y-3 rounded-2xl border border-[#1A2225] bg-[#000]/60 p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
              what it is
            </p>
            <ul className="space-y-2 text-sm leading-relaxed text-[#9BA5A7]">
              <li className="flex gap-3">
                <span className="text-[#22F0D5]">·</span>
                <span>
                  <span className="text-[#F2F4F5]">Skills as files.</span>{" "}
                  YAML + Markdown + scoring rubric. No platform lock-in.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#22F0D5]">·</span>
                <span>
                  <span className="text-[#F2F4F5]">Indexed by sector.</span>{" "}
                  Legal, biotech, finance, sales, ops, more as the catalog
                  grows.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#22F0D5]">·</span>
                <span>
                  <span className="text-[#F2F4F5]">Verified before listed.</span>{" "}
                  40-point Skilski Verify rubric runs against every skill.
                  Fakes don&apos;t ship.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#22F0D5]">·</span>
                <span>
                  <span className="text-[#F2F4F5]">Drops into ORANGEBOX.</span>{" "}
                  Or any cockpit that reads the skil.ski format.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
