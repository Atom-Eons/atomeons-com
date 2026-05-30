"use client";

import { useEffect, useState } from "react";

/**
 * CountdownTimer — live ticking countdown to the free-week deadline.
 *
 * Reads NEXT_PUBLIC_ORANGEBOX_FREE_WEEK_ENDS_AT (ISO timestamp). When
 * set and in the future, ticks down every second showing DD HH MM SS.
 *
 * Modes:
 *   - "pre-launch" — env var not set yet (operator hasn't uploaded the
 *     binary). Renders "Launch coming · price locks in after the
 *     countdown" copy. No live ticking.
 *   - "live" — env set + endsAt is in the future. Ticks down. Shows
 *     "FREE during this countdown · then $99" framing.
 *   - "expired" — endsAt has passed. Renders "Free week is over.
 *     Price is now $99. May change at random." Static.
 *
 * The component is client-only because the tick requires
 * setInterval. Pre-hydration shows a skeleton block so SSR + first
 * client paint match (no flash).
 */

const ENDS_AT_STRING =
  process.env.NEXT_PUBLIC_ORANGEBOX_FREE_WEEK_ENDS_AT ?? "";

type Phase = "pre-launch" | "live" | "expired";

function resolvePhase(endsAtIso: string): { phase: Phase; endsAt: number } {
  if (!endsAtIso) return { phase: "pre-launch", endsAt: 0 };
  const t = Date.parse(endsAtIso);
  if (Number.isNaN(t)) return { phase: "pre-launch", endsAt: 0 };
  const now = Date.now();
  if (now >= t) return { phase: "expired", endsAt: t };
  return { phase: "live", endsAt: t };
}

function pad2(n: number): string {
  return n < 10 ? `0${n}` : String(n);
}

export function CountdownTimer({
  postCountdownPrice = "$99",
}: {
  postCountdownPrice?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<Phase>("pre-launch");
  const [endsAt, setEndsAt] = useState(0);
  const [now, setNow] = useState(0);

  useEffect(() => {
    const initial = resolvePhase(ENDS_AT_STRING);
    setPhase(initial.phase);
    setEndsAt(initial.endsAt);
    setNow(Date.now());
    setMounted(true);
    if (initial.phase !== "live") return;
    const tick = window.setInterval(() => {
      const cur = Date.now();
      setNow(cur);
      if (cur >= initial.endsAt) {
        setPhase("expired");
        window.clearInterval(tick);
      }
    }, 1000);
    return () => window.clearInterval(tick);
  }, []);

  // Pre-hydration placeholder — match the live layout dimensions
  if (!mounted) {
    return (
      <div
        className="rounded-3xl border border-[#FF7A1A]/30 bg-gradient-to-br from-[#1C0F08] to-[#0A0F11] p-8 md:p-10"
        aria-hidden
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#FF7A1A]/60">
          ::launch · loading
        </p>
        <div className="mt-6 h-24 w-full rounded-2xl bg-[#1A2225]/30" />
      </div>
    );
  }

  if (phase === "pre-launch") {
    return (
      <div className="rounded-3xl border border-[#FF7A1A]/30 bg-gradient-to-br from-[#1C0F08] to-[#0A0F11] p-8 md:p-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#FF7A1A]/40 bg-[#FF7A1A]/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.28em] text-[#FF7A1A]">
            <span className="size-1.5 animate-pulse rounded-full bg-[#FF7A1A]" />
            launch · imminent
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7]">
            installer finishing now
          </span>
        </div>
        <p className="mt-6 text-balance text-3xl font-medium leading-[1.1] tracking-tight text-[#F2F4F5] md:text-4xl">
          When the upload lands, the clock starts.
        </p>
        <p className="mt-4 max-w-2xl text-base leading-[1.65] text-[#C8CCCE] md:text-lg">
          ORANGEBOX, the AE Operations layer, and the Delta visual IDE
          ship together. The first week after launch is{" "}
          <span className="font-semibold text-[#FF7A1A]">FREE</span> —
          full bundle, full source. After the countdown closes the
          price is <span className="font-semibold text-[#22F0D5]">{postCountdownPrice}</span>.
          The price may change at random after that.
        </p>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7]">
          ::lock in now (free) · or wait and pay later (price moves)
        </p>
      </div>
    );
  }

  if (phase === "expired") {
    return (
      <div className="rounded-3xl border border-[#22F0D5]/40 bg-gradient-to-br from-[#0A1A1C] to-[#0A0F11] p-8 md:p-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#22F0D5]/40 bg-[#22F0D5]/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
            <span className="size-1.5 rounded-full bg-[#22F0D5]" />
            free week · closed
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FFB87A]">
            price may change at random
          </span>
        </div>
        <div className="mt-6 flex items-baseline gap-4">
          <p className="text-7xl font-semibold leading-none text-[#22F0D5] md:text-8xl">
            {postCountdownPrice}
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5]">
            once · forever
          </p>
        </div>
        <p className="mt-4 max-w-2xl text-base leading-[1.65] text-[#C8CCCE] md:text-lg">
          The free week is over. The price is now {postCountdownPrice}
          {" "}once, forever, license §4A locked. Public messaging:
          this price may change at random going forward. Lock in now.
        </p>
      </div>
    );
  }

  // phase === "live"
  const remaining = Math.max(0, endsAt - now);
  const totalSec = Math.floor(remaining / 1000);
  const d = Math.floor(totalSec / 86400);
  const h = Math.floor((totalSec % 86400) / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;

  return (
    <div className="rounded-3xl border border-[#FF7A1A]/40 bg-gradient-to-br from-[#1C0F08] to-[#0A0F11] p-8 md:p-10 shadow-[0_0_80px_-20px_rgba(255,122,26,0.4)]">
      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#FF7A1A]/50 bg-[#FF7A1A]/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.28em] text-[#FF7A1A]">
          <span className="size-1.5 animate-pulse rounded-full bg-[#FF7A1A]" />
          FREE · countdown · live
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FFB87A]">
          price after: $99 · may change at random
        </span>
      </div>

      <div className="mt-6 grid grid-cols-4 gap-3 md:gap-4">
        {[
          { value: d, label: "days" },
          { value: h, label: "hours" },
          { value: m, label: "mins" },
          { value: s, label: "secs" },
        ].map((cell) => (
          <div
            key={cell.label}
            className="rounded-2xl border border-[#FF7A1A]/30 bg-black/40 p-4 text-center md:p-6"
          >
            <p className="font-mono text-4xl font-bold tabular-nums leading-none text-[#FF7A1A] md:text-6xl">
              {pad2(cell.value)}
            </p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[#9BA5A7] md:mt-3">
              {cell.label}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-6 text-base leading-[1.65] text-[#C8CCCE] md:text-lg">
        Full bundle is{" "}
        <span className="font-semibold text-[#FF7A1A]">FREE</span>{" "}
        for everyone who downloads before the countdown hits zero.
        After that the price is{" "}
        <span className="font-semibold text-[#22F0D5]">$99</span>{" "}
        once, forever — and may change at random going forward.
      </p>
    </div>
  );
}
