"use client";

import { useEffect, useState } from "react";

/**
 * CountdownTimer — B00KMAKR free-week countdown.
 *
 * Reads NEXT_PUBLIC_B00KMAKOR_FREE_WEEK_ENDS_AT (ISO timestamp). Three
 * phases: pre-launch (env not set) · live (counting down) · expired
 * (ended, price now active).
 *
 * Pattern mirrors app/orangebox/CountdownTimer.tsx — same look-and-feel,
 * different env var, different post-countdown framing (B00KMAKR uses
 * dynamic-world-pricing so the post-countdown line reads "Tier 1 anchor
 * $99 · your country's price varies").
 */

const ENDS_AT_STRING =
  process.env.NEXT_PUBLIC_B00KMAKOR_FREE_WEEK_ENDS_AT ?? "";

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

export function B00KMakrCountdown() {
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

  if (!mounted) {
    return (
      <div
        className="rounded-3xl border border-[#22F0D5]/30 bg-gradient-to-br from-[#1C0F08] to-[#0A0F11] p-8 md:p-10"
        aria-hidden
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]/60">
          ::launch · loading
        </p>
        <div className="mt-6 h-24 w-full rounded-2xl bg-[#1A2225]/30" />
      </div>
    );
  }

  if (phase === "pre-launch") {
    return (
      <div className="rounded-3xl border border-[#22F0D5]/30 bg-gradient-to-br from-[#1C0F08] to-[#0A0F11] p-8 md:p-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#22F0D5]/40 bg-[#22F0D5]/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
            <span className="size-1.5 animate-pulse rounded-full bg-[#22F0D5]" />
            launch · imminent
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7]">
            binaries staging now
          </span>
        </div>
        <p className="mt-6 text-balance text-3xl font-medium leading-[1.1] tracking-tight text-[#F2F4F5] md:text-4xl">
          When the binaries land, the clock starts.
        </p>
        <p className="mt-4 max-w-2xl text-base leading-[1.65] text-[#C8CCCE] md:text-lg">
          B00KMAKR v3.2.0 ships in two builds — Mac and Windows — same
          cockpit, same brain router, same 142 feature surfaces. The
          first week after launch is{" "}
          <span className="font-semibold text-[#22F0D5]">FREE</span> —
          full bundle, both platforms, both manuals. After the
          countdown closes the price is{" "}
          <span className="font-semibold text-[#22F0D5]">$99 Tier 1 anchor</span>,
          dynamically priced by country (your fair price flows through
          the World Bank tier system + the lab&apos;s two published
          doctrines).
        </p>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7]">
          ::lock in now (free) · or wait and pay your country&apos;s rate
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
            dynamic-world-pricing now live
          </span>
        </div>
        <p className="mt-6 text-balance text-3xl font-medium leading-[1.1] tracking-tight text-[#F2F4F5] md:text-4xl">
          Free week is over. Your country&apos;s price is now live.
        </p>
        <p className="mt-4 max-w-2xl text-base leading-[1.65] text-[#C8CCCE] md:text-lg">
          The price is now $99 Tier 1 anchor, $9.90 for US buyers under
          the USA Advantage Clause, $99 for China under Strategic Tier
          Lift, scaled to your country&apos;s World Bank income tier
          everywhere else. Once · forever, license §4A locked.
        </p>
      </div>
    );
  }

  const remaining = Math.max(0, endsAt - now);
  const totalSec = Math.floor(remaining / 1000);
  const d = Math.floor(totalSec / 86400);
  const h = Math.floor((totalSec % 86400) / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;

  return (
    <div className="rounded-3xl border border-[#22F0D5]/40 bg-gradient-to-br from-[#1C0F08] to-[#0A0F11] p-8 md:p-10 shadow-[0_0_80px_-20px_rgba(34, 240, 213,0.4)]">
      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#22F0D5]/50 bg-[#22F0D5]/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
          <span className="size-1.5 animate-pulse rounded-full bg-[#22F0D5]" />
          FREE · countdown · live
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FFB87A]">
          ends Saturday · June 6 · 4 PM EDT
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
            className="rounded-2xl border border-[#22F0D5]/30 bg-black/40 p-4 text-center md:p-6"
          >
            <p className="font-mono text-4xl font-bold tabular-nums leading-none text-[#22F0D5] md:text-6xl">
              {pad2(cell.value)}
            </p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[#9BA5A7] md:mt-3">
              {cell.label}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-6 text-base leading-[1.65] text-[#C8CCCE] md:text-lg">
        Full bundle (Mac + Windows · universal HTML + native installers ·
        both manuals) is{" "}
        <span className="font-semibold text-[#22F0D5]">FREE</span>{" "}
        for everyone who downloads before the countdown hits zero.
        After that the price is your country&apos;s Tier rate — Tier 1
        anchor $99 · US $9.90 · IN $9.90 · SO $1.98 — applied
        automatically by IP geolocation. Lock in now.
      </p>
    </div>
  );
}
