import Link from "next/link";

/**
 * HeroLabManifest — lab-identity hero for the v2 homepage.
 *
 * This is NOT the OrangeBox product hero. That lives at /orangebox
 * and in v5/Hero.tsx. This hero establishes AtomEons as a research lab
 * that ships products — not a product page that happens to mention research.
 *
 * Server component. No interactivity needed here.
 */
export function HeroLabManifest() {
  return (
    <section className="relative isolate overflow-hidden bg-[#000] py-32 md:py-40 text-[#F2F4F5]">
      {/* subtle ambient — no cockpit image, no theatrics */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 50% at 15% 60%, rgba(34,240,213,0.07) 0%, transparent 65%), radial-gradient(40% 35% at 85% 25%, rgba(255,122,26,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        {/* eyebrow chip */}
        <p className="mb-10 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
          <span
            aria-hidden
            className="inline-block size-1.5 animate-pulse rounded-full bg-[#22F0D5] shadow-[0_0_8px_#22F0D5]"
          />
          ::ATOMEONS SYSTEMS LABORATORY · MARCO ISLAND, FL
        </p>

        {/* H1 — lab-first, declarative, Atom's register */}
        <h1 className="max-w-5xl text-balance text-[2.5rem] font-medium leading-[1.02] tracking-[-0.025em] text-[#F2F4F5] sm:text-5xl md:text-7xl lg:text-8xl">
          One operator.{" "}
          <span className="text-[#22F0D5]">One lab.</span>{" "}
          <span className="text-[#FF7A1A]">Twelve papers,</span> a cockpit,
          and a nightly letter.
        </h1>

        {/* dek */}
        <p className="mt-8 max-w-2xl text-pretty text-base leading-relaxed text-[#9BA5A7] sm:text-lg md:mt-10 md:text-xl">
          AtomEons Systems Laboratory researches systems that change their own
          rules, ships the tools it builds during that research, and broadcasts
          findings every night at 8pm Eastern. Built in Marco Island, Florida.
        </p>

        {/* stat strip — naked numbers, no editorializing */}
        <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-[#1A2225] pt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <span className="text-[#F2F4F5]">12 PAPERS</span>
          <span aria-hidden className="text-[#1A2225]">·</span>
          <span className="text-[#F2F4F5]">2 SURFACES</span>
          <span aria-hidden className="text-[#1A2225]">·</span>
          <span className="text-[#F2F4F5]">NIGHTLY BROADCAST</span>
          <span aria-hidden className="text-[#1A2225]">·</span>
          <span className="text-[#F2F4F5]">CC-BY 4.0</span>
          <span aria-hidden className="text-[#1A2225]">·</span>
          <span className="text-[#FF7A1A]">FREE WEEK · §4A NO-SAAS</span>
        </div>

        {/* secondary escape CTAs — low hierarchy, mono, two actions */}
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link
            href="/founders-view"
            className="transition-colors hover:text-[#22F0D5]"
          >
            READ TONIGHT&apos;S LETTER →
          </Link>
          <span aria-hidden>·</span>
          <Link
            href="/orangebox"
            className="transition-colors hover:text-[#22F0D5]"
          >
            GET ORANGEBOX · FREE NOW →
          </Link>
        </div>
      </div>
    </section>
  );
}
