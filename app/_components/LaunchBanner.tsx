"use client";

import { useEffect, useState } from "react";

/**
 * LaunchBanner — site-wide sticky top bar with live countdown +
 * direct download CTAs for both shipped products (Orangebox + B00KMAKR).
 *
 * Operator directive 2026-05-30: 'I WANT TOP BAR SAYING ORANGEBOX
 * AND BOOKMAKR FREE WITH A COUNTDOWN UP TOP.'
 *
 * Three phases:
 *  - pre-launch · env not set · banner hidden (nothing to count down)
 *  - live · countdown ticking · banner visible · two big direct CTAs
 *  - expired · banner collapses to a thin 'free week over' chip
 *    (or hides entirely if operator prefers — currently visible)
 *
 * Reads NEXT_PUBLIC_ORANGEBOX_FREE_WEEK_ENDS_AT — both products share
 * the same launch window (Saturday 2026-06-06 4 PM EDT).
 *
 * Mounted in app/layout.tsx ABOVE Header so it lives on every route.
 * z-50 sits above Header (which is z-30).
 */

const ENDS_AT_STRING =
  process.env.NEXT_PUBLIC_ORANGEBOX_FREE_WEEK_ENDS_AT ?? "";

const ORANGEBOX_DL =
  "https://idv0aauaxicyf09e.public.blob.vercel-storage.com/orangebox/v1.0.0-beta/OrangeboxSetup-1.0.0-win-x64.exe";
const B00KMAKR_DL = "/b00kmakor/download";

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

export function LaunchBanner() {
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

  // Pre-hydration · reserve space so the banner doesn't pop and shift layout
  if (!mounted) {
    return (
      <div
        className="sticky top-0 z-50 h-[44px] w-full border-b border-[#3D2F22] bg-[#1A1410]"
        aria-hidden
      />
    );
  }

  // pre-launch: env not set yet · hide entirely (don't claim "FREE" if no countdown is set)
  if (phase === "pre-launch") return null;

  // expired: collapsed chip, dismissible
  if (phase === "expired") {
    return (
      <div className="sticky top-0 z-50 w-full border-b border-[#3D2F22] bg-[#1A1410]">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-center gap-3 px-4 py-2.5 text-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FFAA66]">
            Free week is over · Orangebox and B00KMAKR are now priced
          </span>
          <a
            href="/orangebox"
            className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FF7733] hover:text-[#FFAA66]"
          >
            Get Orangebox →
          </a>
          <span className="text-[#3D2F22]">·</span>
          <a
            href="/b00kmakor"
            className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FF7733] hover:text-[#FFAA66]"
          >
            Get B00KMAKR →
          </a>
        </div>
      </div>
    );
  }

  // live · countdown
  const remaining = Math.max(0, endsAt - now);
  const totalSec = Math.floor(remaining / 1000);
  const d = Math.floor(totalSec / 86400);
  const h = Math.floor((totalSec % 86400) / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;

  return (
    <div className="sticky top-0 z-50 w-full border-b border-[#FF7733]/40 bg-gradient-to-r from-[#1A1410] via-[#221A14] to-[#1A1410] shadow-[0_2px_24px_-4px_rgba(255,119,51,0.35)]">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-2.5 md:flex-nowrap">
        {/* LEFT · status + countdown */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#FF7733]">
            <span className="inline-block size-1.5 animate-pulse rounded-full bg-[#FF7733] shadow-[0_0_12px_#FF7733]" />
            FREE WEEK
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#E8D5B7]">
            Orangebox + B00KMAKR
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-[#8A7560] md:inline">
            · ends Sat June 6 · 4 PM EDT
          </span>
          <span className="flex items-baseline gap-1 font-mono tabular-nums text-[#FFAA44]">
            <span className="text-[14px] font-bold">{pad2(d)}</span>
            <span className="text-[9px] uppercase text-[#8A7560]">d</span>
            <span className="text-[14px] font-bold">{pad2(h)}</span>
            <span className="text-[9px] uppercase text-[#8A7560]">h</span>
            <span className="text-[14px] font-bold">{pad2(m)}</span>
            <span className="text-[9px] uppercase text-[#8A7560]">m</span>
            <span className="text-[14px] font-bold">{pad2(s)}</span>
            <span className="text-[9px] uppercase text-[#8A7560]">s</span>
          </span>
        </div>

        {/* RIGHT · two direct CTAs */}
        <div className="flex flex-shrink-0 items-center gap-2">
          <a
            href={ORANGEBOX_DL}
            className="inline-flex items-center gap-1.5 rounded-md border border-[#FF7733] bg-[#FF7733] px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#1A1410] transition-colors hover:bg-[#FFAA66]"
          >
            ↓ Orangebox
          </a>
          <a
            href={B00KMAKR_DL}
            className="inline-flex items-center gap-1.5 rounded-md border border-[#FF7733] bg-transparent px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#FF7733] transition-colors hover:bg-[#FF7733]/15"
          >
            ↓ B00KMAKR
          </a>
        </div>
      </div>
    </div>
  );
}
