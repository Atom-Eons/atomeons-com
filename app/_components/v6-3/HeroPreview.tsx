import Link from "next/link";
import { NotifyMe } from "./NotifyMe";

/**
 * HeroPreview — v6.3 "Silent Canvas" coming-soon hero.
 *
 * Replaces the v6.0 Hero on /orangebox while sales are paused. No
 * countdown, no date theater, no roadmap promise. The build ships
 * when it earns it.
 *
 * IP boundary: surfaces the principle + the version + the notify-me CTA.
 * Does not surface Relevance Controller, schema families, dept roster,
 * trust tiers, cost math, phase map, or anything else from the internal
 * architecture packet.
 */

export function HeroPreview() {
  return (
    <section className="relative isolate min-h-[100vh] overflow-hidden bg-black text-[#F2F4F5]">
      {/* ambient radial — slower, more deliberate than v6.0 launch hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 55% at 60% 45%, rgba(34,240,213,0.18) 0%, transparent 60%), radial-gradient(50% 40% at 15% 85%, rgba(255,122,26,0.12) 0%, transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80"
      />

      {/* top status bar */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 pt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]/80">
        <span className="inline-flex items-center gap-2">
          <span className="inline-block size-1.5 animate-pulse rounded-full bg-[#22F0D5] shadow-[0_0_12px_#22F0D5]" />
          ATOMEONS · MARCO ISLAND · NEXT BUILD QUEUED
        </span>
        <span className="hidden md:inline">v6.3 · ALPHA.7 · IN BUILD</span>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-7xl flex-col justify-center px-6 pt-16 pb-12 md:pt-24">
        {/* eyebrow */}
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
          ::ORANGEBOX V6.3 · SILENT CANVAS · COMING
        </p>

        {/* headline — Atom-voice blended with the 10 */}
        <h1 className="max-w-5xl text-balance text-[2rem] font-medium leading-[1.05] tracking-[-0.02em] text-[#F2F4F5] sm:text-5xl sm:leading-[0.98] md:text-7xl md:leading-[0.95] lg:text-8xl">
          The cockpit stopped talking.{" "}
          <span className="text-[#FF7A1A]">The canvas started.</span>
        </h1>

        {/* dek */}
        <p className="mt-6 max-w-3xl text-pretty text-base leading-relaxed text-[#9BA5A7] sm:mt-8 sm:text-lg md:mt-10 md:text-xl">
          v6.3 rewires how progress reaches you. Describe the goal once. The
          cockpit takes it from there — state visible, progress legible, the
          build moving in front of you without waiting for permission to
          continue.
        </p>

        {/* sub: explicit pause */}
        <p className="mt-4 max-w-2xl font-mono text-sm uppercase tracking-[0.18em] text-[#FF7A1A]">
          v6.0 sales paused while the lab ships v6.3. Updates are{" "}
          <span className="underline">free for current buyers</span>{" "}
          (license §4A — forward-buyers lock).
        </p>

        {/* notify CTA + secondary link */}
        <div className="mt-12 grid max-w-3xl gap-6 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
              ::ONE EMAIL · WHEN IT SHIPS
            </p>
            <NotifyMe source="orangebox-hero" />
          </div>
        </div>
        <p className="mt-3 max-w-md font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B7779]">
          no drip · no marketing list · single ship notification
        </p>

        {/* secondary actions */}
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
          <Link
            href="/founders-view"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-[#F2F4F5]"
          >
            tonight&apos;s broadcast{" "}
            <span aria-hidden className="transition-transform">
              →
            </span>
          </Link>
          <span className="text-[#1A2225]">·</span>
          <Link
            href="/research/papers"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-[#F2F4F5]"
          >
            12 research papers{" "}
            <span aria-hidden className="transition-transform">
              →
            </span>
          </Link>
          <span className="text-[#1A2225]">·</span>
          <Link
            href="/account"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-[#F2F4F5]"
          >
            existing buyers · /account{" "}
            <span aria-hidden className="transition-transform">
              →
            </span>
          </Link>
        </div>

        {/* version stat strip */}
        <div className="mt-16 grid grid-cols-2 gap-x-4 gap-y-4 border-t border-[#1A2225] pt-6 font-mono text-[10px] uppercase tracking-[0.15em] text-[#6B7779] sm:gap-x-6 sm:gap-y-3 sm:text-[11px] sm:grid-cols-5">
          <div>
            <span className="block text-xl font-medium text-[#F2F4F5] sm:text-2xl">
              v6.3
            </span>
            <span>silent canvas</span>
          </div>
          <div>
            <span className="block text-xl font-medium text-[#F2F4F5] sm:text-2xl">
              6
            </span>
            <span>new behaviors</span>
          </div>
          <div>
            <span className="block text-xl font-medium text-[#F2F4F5] sm:text-2xl">
              §4A
            </span>
            <span>buyers locked</span>
          </div>
          <div>
            <span className="block text-xl font-medium text-[#F2F4F5] sm:text-2xl">
              0
            </span>
            <span>subscriptions</span>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <span className="block text-xl font-medium text-[#F2F4F5] sm:text-2xl">
              0
            </span>
            <span>date theater</span>
          </div>
        </div>
      </div>
    </section>
  );
}
