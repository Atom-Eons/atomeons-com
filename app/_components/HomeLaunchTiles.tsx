"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { trackDownload } from "./trackDownload";

/**
 * HomeLaunchTiles — massive download display block for the homepage.
 *
 * Operator directive 2026-05-30: 'I WANT THAT DISPLAY SHOT ON
 * HOMEPAGE WITH A DOWNLOAD ORANGEBOX AND DOWNLOAD BOOKMAKER.
 * PREPARE FOR THE MASSES.'
 *
 * Two big side-by-side product tiles. Each shows:
 *   - Product name (huge)
 *   - One-line tagline
 *   - Quick spec line
 *   - Download CTA wired direct to the artifact / picker
 *   - SHA-256 reassurance
 *
 * Above the tiles: shared countdown ticker reading the same env var
 * as LaunchBanner so the two surfaces stay in sync.
 *
 * 'Prepare for the masses' interpretation:
 *   - Orangebox button links DIRECTLY to the Vercel Blob mirror.
 *     One click → file lands. No API gate, no JS handshake.
 *   - B00KMAKR button links to /b00kmakor/download which is a static
 *     page rendering both Mac + Windows direct blob URLs (OS auto-detect).
 *   - Both blob URLs sit on Vercel's global CDN. Cached, ranged,
 *     CORS-enabled, public.
 */

const ENDS_AT_STRING =
  process.env.NEXT_PUBLIC_ORANGEBOX_FREE_WEEK_ENDS_AT ?? "";

const ORANGEBOX_DL =
  "https://idv0aauaxicyf09e.public.blob.vercel-storage.com/orangebox/v1.0.0-beta/OrangeboxSetup-1.0.0-win-x64.exe";
const ORANGEBOX_SHA =
  "D4E6153FEB19B8B8A46BCC987A2308C8D9645CDC792A1BB4246E3115B0743C83";

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

function CountdownStrip() {
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
      <div className="h-[40px] w-full rounded-full" aria-hidden />
    );
  }

  if (phase === "pre-launch") {
    return (
      <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#FFAA66]">
        ::launch · countdown loading
      </p>
    );
  }

  if (phase === "expired") {
    return (
      <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#FFAA66]">
        ::free week ended · both products now priced · lock in still available below
      </p>
    );
  }

  const remaining = Math.max(0, endsAt - now);
  const totalSec = Math.floor(remaining / 1000);
  const d = Math.floor(totalSec / 86400);
  const h = Math.floor((totalSec % 86400) / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;

  return (
    <div className="flex flex-wrap items-baseline justify-center gap-3">
      <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#FF7733]">
        ::FREE THIS WEEK · ends Sat June 6 · 4 PM EDT
      </p>
      <span className="flex items-baseline gap-1.5 font-mono tabular-nums text-[#FFAA44]">
        <span className="text-2xl font-bold md:text-3xl">{pad2(d)}</span>
        <span className="text-[10px] uppercase text-[#8A7560]">d</span>
        <span className="text-2xl font-bold md:text-3xl">{pad2(h)}</span>
        <span className="text-[10px] uppercase text-[#8A7560]">h</span>
        <span className="text-2xl font-bold md:text-3xl">{pad2(m)}</span>
        <span className="text-[10px] uppercase text-[#8A7560]">m</span>
        <span className="text-2xl font-bold md:text-3xl">{pad2(s)}</span>
        <span className="text-[10px] uppercase text-[#8A7560]">s</span>
      </span>
    </div>
  );
}

export function HomeLaunchTiles() {
  return (
    <section
      className="relative isolate border-y border-[#3D2F22]"
      data-cockpit-section="launch-week-tiles"
      style={{
        background:
          "radial-gradient(80% 50% at 50% 0%, rgba(255,119,51,0.20) 0%, transparent 70%), #1A1410",
      }}
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-16 md:py-20">
        {/* Top strip · countdown + tagline */}
        <div className="flex flex-col items-center gap-4 text-center">
          <CountdownStrip />
          <h2 className="text-balance text-4xl font-medium leading-[1.05] tracking-tight text-[#E8D5B7] md:text-6xl">
            Two AI cockpits.<br />
            <span className="text-[#FF7733]">Free for one week.</span>
          </h2>
          <p className="max-w-2xl text-base leading-[1.55] text-[#C4AD8E] md:text-lg">
            Tonight ORANGEBOX v1.0.0-beta and B00KMAKR v3.2.0 shipped.
            Built by AI, for AI operators, in 75 days using earlier versions
            of themselves. Eleven novel features that have not lived inside
            one application before tonight.
          </p>
        </div>

        {/* Two big tiles */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {/* ORANGEBOX TILE */}
          <div
            className="group relative flex flex-col rounded-3xl border border-[#FF7733]/40 bg-[#221A14] p-7 transition-shadow hover:shadow-[0_0_60px_-10px_rgba(255,119,51,0.6)] md:p-9"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#FF7733]">
              ::ORANGEBOX · v1.0.0-beta · windows
            </p>
            <h3 className="mt-4 text-5xl font-medium leading-[0.95] tracking-tight text-[#E8D5B7] md:text-6xl">
              ORANGE<span className="text-[#FF7733]">BOX</span>
            </h3>
            <p className="mt-5 text-[17px] leading-[1.5] text-[#C4AD8E]">
              Local-first AI cockpit. Multi-LLM router across 9 providers
              (Claude · GPT · Gemini · Ollama · OpenRouter · Groq · Cohere ·
              Mistral · Perplexity). 14-department architecture. AECode
              contracts. Tamper-evident JSON receipts on every action.
            </p>

            <ul className="mt-5 space-y-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[#8A7560]">
              <li>▲ Windows 10 / 11 · x64</li>
              <li>▲ BYO keys · zero markup</li>
              <li>▲ Sectigo timestamp · self-Authenticode</li>
              <li>▲ License §4A · no-saas · forever</li>
            </ul>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={ORANGEBOX_DL}
                onClick={() => trackDownload({ product: "orangebox", platform: "windows", surface: "home-tiles" })}
                className="inline-flex items-center gap-2 rounded-lg bg-[#FF7733] px-6 py-3.5 text-base font-bold text-[#1A1410] shadow-[0_0_40px_rgba(255,119,51,0.5)] transition-colors hover:bg-[#FFAA66]"
              >
                Download ORANGEBOX · 2.81 MB ↓
              </a>
              <Link
                href="/orangebox"
                className="inline-flex items-center gap-2 rounded-lg border border-[#3D2F22] px-5 py-3.5 font-mono text-[11px] uppercase tracking-[0.22em] text-[#C4AD8E] hover:border-[#FF7733] hover:text-[#FF7733]"
              >
                see the product →
              </Link>
            </div>

            <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#5C4D3D]">
              SHA-256 · {ORANGEBOX_SHA.slice(0, 32)}…
            </p>
          </div>

          {/* B00KMAKR TILE */}
          <div
            className="group relative flex flex-col rounded-3xl border border-[#FFB87A]/40 bg-[#1C1308] p-7 transition-shadow hover:shadow-[0_0_60px_-10px_rgba(255,184,122,0.5)] md:p-9"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#FFB87A]">
              ::B00KMAKR · v3.2.0 · mac + windows
            </p>
            <h3 className="mt-4 text-5xl font-medium leading-[0.95] tracking-tight text-[#E8D5B7] md:text-6xl">
              B<span className="text-[#FF7A1A]">0</span>
              <span className="text-[#FF7A1A]">0</span>K
              <span className="text-[#22F0D5]">MAKR</span>
            </h3>
            <p className="mt-5 text-[17px] leading-[1.5] text-[#C4AD8E]">
              AI publishing cockpit. 142 feature surfaces. Mission graph
              for chapters. Voice fingerprint persistence. Continuity audit
              across timeline / characters / facts. KDP packager. Cover
              lab. 120-day launch calendar with daily action queue.
            </p>

            <ul className="mt-5 space-y-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[#8A7560]">
              <li>▲ Mac (Apple Silicon + Intel) · Windows 10 / 11</li>
              <li>▲ Universal HTML app + native Tauri builds</li>
              <li>▲ Embedded-font PDF manuals (book-red Mac · blue Win)</li>
              <li>▲ Dynamic-world-pricing · §4A · forever</li>
            </ul>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/b00kmakor/download"
                onClick={() => trackDownload({ product: "b00kmakor", platform: "unknown", surface: "home-tiles" })}
                className="inline-flex items-center gap-2 rounded-lg bg-[#FFB87A] px-6 py-3.5 text-base font-bold text-[#1A1410] shadow-[0_0_40px_rgba(255,184,122,0.45)] transition-colors hover:bg-[#FFD6AC]"
              >
                Download B00KMAKR · Mac or Win ↓
              </Link>
              <Link
                href="/b00kmakor"
                className="inline-flex items-center gap-2 rounded-lg border border-[#3D2F22] px-5 py-3.5 font-mono text-[11px] uppercase tracking-[0.22em] text-[#C4AD8E] hover:border-[#FFB87A] hover:text-[#FFB87A]"
              >
                see the product →
              </Link>
            </div>

            <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#5C4D3D]">
              SHA-256s on the download page · platform auto-detected
            </p>
          </div>
        </div>

        {/* fine print */}
        <p className="mt-10 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-[#5C4D3D]">
          ::free-week buyers grandfathered for life · §4A no-saas · receipts on disk · source included
        </p>
      </div>
    </section>
  );
}
