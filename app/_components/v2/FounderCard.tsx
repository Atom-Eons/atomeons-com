import { AeMark } from "@/app/_components/AeMark";

/**
 * FounderCard — grounds the whole site in a real human.
 *
 * This section answers the first question a new visitor asks:
 * who built this and why should I believe them?
 *
 * The answer is: one operator, Marco Island, FL. The receipts are
 * the products, the papers, the nightly broadcast.
 *
 * Server component. No dynamic data.
 *
 * Voice law: no "passionate about", no "excited to", no theater.
 * Three sentences of bio: doctrine, what he builds, what he refuses.
 */
export function FounderCard() {
  return (
    <section className="bg-[#000] py-24 md:py-32">
      <div className="mx-auto w-full max-w-7xl px-6">
        {/* section label */}
        <p className="mb-10 font-mono text-[10px] uppercase tracking-[0.32em] text-[#6B7779]">
          ::THE OPERATOR
        </p>

        <div className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-8 md:p-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
            {/* left: AeMark glyph — large, declarative */}
            <div className="flex shrink-0 flex-col items-center gap-3 md:items-start">
              <AeMark size={72} glow />
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]/60">
                AtomEons
              </span>
            </div>

            {/* right: bio */}
            <div className="flex-1">
              {/* name + title */}
              <h2 className="mb-1 text-3xl font-medium text-[#F2F4F5] md:text-4xl">
                Atom McCree
              </h2>
              <p className="mb-1 font-mono text-sm uppercase tracking-[0.18em] text-[#22F0D5]">
                Founder · AtomEons Systems Laboratory
              </p>
              <p className="mb-8 font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
                Marco Island, Florida
              </p>

              {/* 3-sentence bio */}
              <div className="max-w-2xl space-y-3 text-base leading-relaxed text-[#9BA5A7] md:text-lg">
                <p>
                  The lab operates on one principle: build the thing, publish
                  the receipts, let the work speak. No team, no deck, no
                  roadmap theater.
                </p>
                <p>
                  Atom ships research papers under CC-BY 4.0, builds native
                  tools that run without a browser, and broadcasts a nightly
                  editorial from Marco Island, Florida.
                </p>
                <p>
                  Nothing ships that hasn&apos;t run inside the cockpit for two
                  months. MINIMUM.
                </p>
              </div>

              {/* links */}
              <div className="mt-8 flex flex-wrap items-center gap-5">
                <a
                  href="https://x.com/AtomMccree"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#F2F4F5] transition-colors hover:text-[#22F0D5]"
                >
                  @AtomMccree on X{" "}
                  <span className="text-[#6B7779] transition-transform group-hover:translate-x-0.5">
                    ↗
                  </span>
                </a>
                <a
                  href="mailto:a.mccree@gmail.com"
                  className="group inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779] transition-colors hover:text-[#F2F4F5]"
                >
                  a.mccree@gmail.com
                  <span className="transition-transform group-hover:translate-x-0.5">
                    ↗
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
