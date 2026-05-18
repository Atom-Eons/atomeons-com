import Link from "next/link";

/**
 * IntelDrop — ÆoNs Intel alpha surface on the homepage.
 *
 * One featured card. The lab watches the systems and records what it
 * finds. This is the homepage teaser — the full drop lives at /intel.
 *
 * Server component. Static for now; operator updates FEATURED_DROP when
 * a new intel piece ships. No dynamic data fetch needed on the homepage.
 */

const FEATURED_DROP = {
  tag: "ALPHA DROP · MAY 15",
  title: "The X Algorithm — Open-Sourced",
  description:
    "X released the recommendation algorithm. The lab decoded the receipts. Ranking weights, engagement multipliers, and suppression signals — all in the open. Here's what the data says.",
  href: "/intel/x-algorithm",
  accentColor: "#22F0D5",
} as const;

export function IntelDrop() {
  return (
    <section className="bg-[#0A0F11] py-24 md:py-32">
      <div className="mx-auto w-full max-w-7xl px-6">
        {/* section label */}
        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
          ::ÆOS INTEL · ALPHA DROP
        </p>

        <div className="mb-14 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="max-w-2xl text-balance text-3xl font-medium leading-[1.05] tracking-[-0.015em] text-[#F2F4F5] md:text-5xl">
            The lab watches the systems.
            <br />
            Here&apos;s what it found.
          </h2>
        </div>

        {/* featured intel card */}
        <Link
          href={FEATURED_DROP.href}
          className="group relative mb-10 flex flex-col overflow-hidden rounded-2xl border border-[#1A2225] bg-[#000]/60 p-8 transition-colors hover:bg-[#0D1518] md:flex-row md:items-start md:gap-10"
        >
          {/* top accent line */}
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(34,240,213,0.5), transparent)",
            }}
          />

          {/* tag */}
          <div className="mb-4 shrink-0 md:mb-0 md:pt-1">
            <span className="inline-block rounded border border-[#22F0D5]/30 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-[#22F0D5]">
              {FEATURED_DROP.tag}
            </span>
          </div>

          {/* copy */}
          <div className="flex-1">
            <h3 className="mb-3 text-xl font-medium text-[#F2F4F5] md:text-2xl">
              {FEATURED_DROP.title}
            </h3>
            <p className="mb-5 max-w-2xl text-base leading-relaxed text-[#9BA5A7]">
              {FEATURED_DROP.description}
            </p>
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5] transition-colors group-hover:text-[#F2F4F5]">
              Read the intel{" "}
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </span>
          </div>
        </Link>

        {/* footer */}
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B7779]">
          More drops in the pipe. No schedule theater.{" "}
          <Link
            href="/intel"
            className="text-[#6B7779] underline-offset-4 transition-colors hover:text-[#F2F4F5] hover:underline"
          >
            All intel drops →
          </Link>
        </p>
      </div>
    </section>
  );
}
