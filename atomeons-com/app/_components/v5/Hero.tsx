"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BuyButton } from "../BuyButton";
import { SalesCounterV5 } from "./SalesCounterV5";

const V5_LIVE = process.env.NEXT_PUBLIC_V5_LIVE === "true";
const V5_LAUNCH_AT =
  process.env.NEXT_PUBLIC_V5_LAUNCH_AT ?? "2026-05-17T04:00:00Z";

function useCountdown(targetIso: string) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  if (now == null) return null;
  const ms = Math.max(0, new Date(targetIso).getTime() - now);
  const totalSec = Math.floor(ms / 1000);
  return {
    ms,
    h: Math.floor(totalSec / 3600),
    m: Math.floor((totalSec % 3600) / 60),
    s: totalSec % 60,
  };
}

export function Hero() {
  const c = useCountdown(V5_LAUNCH_AT);
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="relative isolate min-h-[100vh] overflow-hidden bg-black text-[#F2F4F5]">
      {/* hero visual — operator-selected cockpit render (MJ ultra-detailed dark mode mockup) */}
      <Image
        src="/v5/hero/hero-cockpit.png"
        alt="ORANGEBOX cockpit — mission graph, party-line ticker, triad lanes"
        fill
        priority
        quality={90}
        sizes="100vw"
        className="object-cover opacity-80"
      />
      {/* darken + accent overlays for text legibility */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/40"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(70% 55% at 75% 40%, rgba(34,240,213,0.15) 0%, transparent 60%), radial-gradient(50% 40% at 10% 90%, rgba(255,122,26,0.14) 0%, transparent 65%)",
        }}
      />

      {/* top status bar */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 pt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]/80">
        <span className="inline-flex items-center gap-2">
          <span className="inline-block size-1.5 animate-pulse rounded-full bg-[#22F0D5] shadow-[0_0_12px_#22F0D5]" />
          ATOMEONS · MARCO ISLAND · COCKPIT ONLINE
        </span>
        <span className="hidden md:inline">
          {V5_LIVE ? "V1.5.0 · LIVE" : "V1.5.0 · LAUNCH GATE"}
        </span>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-7xl flex-col justify-between px-6 pt-16 pb-12 md:pt-24">
        {/* HEADLINE */}
        <div className="max-w-5xl">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.32em] text-[#22F0D5]">
            ORANGEBOX · V1.5.0 · {V5_LIVE ? "LIVE TONIGHT" : "LAUNCHING TONIGHT"}
          </p>

          <h1 className="text-balance text-5xl font-medium leading-[0.95] tracking-[-0.02em] text-[#F2F4F5] sm:text-6xl md:text-8xl">
            The AI cockpit{" "}
            <span className="text-[#22F0D5]">you actually own.</span>
          </h1>

          <p className="mt-10 max-w-2xl text-pretty text-lg leading-relaxed text-[#9BA5A7] md:text-xl">
            15 departments. 60+ MCP tools. Mission-graph memory that survives
            every context reset. Local-first. Zero telemetry. Cancel the
            subscription stack.
          </p>

          <p className="mt-4 max-w-2xl font-mono text-sm uppercase tracking-[0.18em] text-[#FF7A1A]">
            $49 once · forever · 30-day workflow-fit refund
          </p>

          {/* CTA row */}
          <div className="mt-12 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <BuyButton />
            <Link
              href="/orangebox"
              className="group relative inline-flex items-center gap-2 text-base font-medium text-[#22F0D5] transition-colors hover:text-[#F2F4F5]"
            >
              <span>see what's in the box</span>
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          {/* live countdown (pre-launch) OR live sales counter (post-launch) */}
          <div className="mt-10">
            {!V5_LIVE && c && c.ms > 0 ? (
              <div className="inline-flex items-center gap-4 rounded-lg border border-[#1A2225] bg-black/60 px-5 py-3 backdrop-blur-sm">
                <span className="inline-block size-2 animate-pulse rounded-full bg-[#22F0D5] shadow-[0_0_16px_#22F0D5]" />
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#6B7779]">
                  buy gate opens in
                </span>
                <span className="font-mono text-lg font-medium tabular-nums text-[#F2F4F5]">
                  {pad(c.h)}:{pad(c.m)}:{pad(c.s)}
                </span>
              </div>
            ) : (
              <SalesCounterV5 />
            )}
          </div>
        </div>

        {/* bottom rail — micro stats */}
        <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-[#1A2225] pt-6 font-mono text-[11px] uppercase tracking-[0.15em] text-[#6B7779] sm:grid-cols-4">
          <div>
            <span className="block text-2xl font-medium text-[#F2F4F5]">60+</span>
            <span>MCP tools</span>
          </div>
          <div>
            <span className="block text-2xl font-medium text-[#F2F4F5]">15</span>
            <span>departments</span>
          </div>
          <div>
            <span className="block text-2xl font-medium text-[#F2F4F5]">27</span>
            <span>guardrails</span>
          </div>
          <div>
            <span className="block text-2xl font-medium text-[#F2F4F5]">0</span>
            <span>subscriptions</span>
          </div>
        </div>
      </div>
    </section>
  );
}
