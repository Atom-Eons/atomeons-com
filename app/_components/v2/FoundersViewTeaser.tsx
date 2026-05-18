import Link from "next/link";
import { FoundersViewCountdown } from "@/app/_components/FoundersViewCountdown";

/**
 * FoundersViewTeaser — the Founder's View surface on the homepage.
 *
 * The countdown is a client component (FoundersViewCountdown). This wrapper
 * is a server component. React's composition model handles the boundary —
 * no 'use client' needed here.
 *
 * Voice doctrine: no "in today's edition", no "newsletter", no "subscribe".
 * This is a broadcast. You come here or you miss it.
 */
export function FoundersViewTeaser() {
  return (
    <section className="bg-[#000] py-24 md:py-32">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-20">
          {/* left: doctrine copy */}
          <div>
            {/* section label */}
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.32em] text-[#FF7A1A]">
              ::THE FOUNDER&apos;S VIEW · NIGHTLY AT 8PM ET
            </p>

            <h2 className="mb-6 text-balance text-3xl font-medium leading-[1.05] tracking-[-0.015em] text-[#F2F4F5] md:text-5xl">
              A fictional broadcast.
              <br />
              Slipped under your door.
            </h2>

            {/* 3-line doctrine */}
            <div className="space-y-3 text-[#9BA5A7]">
              <p className="text-base leading-relaxed md:text-lg">
                No email list. No algorithm. No schedule theater.
              </p>
              <p className="text-base leading-relaxed md:text-lg">
                The letter lands every night at 8pm Eastern. Real events.
                Editorial is satire. CC-BY 4.0 — if a letter matters, pass it on.
              </p>
              <p className="text-base leading-relaxed md:text-lg">
                The byline is "the Founder." The voice is Atom&apos;s.
              </p>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Link
                href="/founders-view"
                className="group inline-flex items-center gap-1.5 rounded-lg border border-[#FF7A1A]/50 bg-[#FF7A1A]/10 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#FF7A1A] transition-colors hover:bg-[#FF7A1A]/20"
              >
                Read tonight&apos;s letter{" "}
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <Link
                href="/founders-view/rss.xml"
                className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779] transition-colors hover:text-[#F2F4F5]"
              >
                <span className="inline-block py-2 px-3">RSS →</span>
              </Link>
            </div>
          </div>

          {/* right: countdown — client component island */}
          <div className="flex flex-col gap-4">
            <FoundersViewCountdown />
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#6B7779]">
              Events cited are real. Editorial is satire. License: CC-BY 4.0.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
