"use client";

/**
 * ContinueCard · the "Resume where you were" launcher card.
 * Wave 51 · 2026-06-12 · launcher V2 · operator: "warp speed future
 * of a website."
 *
 * On every page navigation we stamp localStorage with:
 *   atomeons.lastPath        · pathname
 *   atomeons.lastTitle       · document.title
 *   atomeons.lastSilo        · resolved silo key (from getSiloFromPath)
 *   atomeons.lastAt          · ISO timestamp
 *
 * The launcher reads these and shows a prominent Resume card if there
 * is a last path that isn't the launcher itself. Per-session by virtue
 * of localStorage. No analytics · no tracking · pure local state.
 *
 * Mount in app/layout.tsx (silent recorder) AND on the launcher page
 * (visible card). The recorder + card are split so the layout doesn't
 * render extra DOM.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getSiloFromPath, getSilo } from "../../_lib/silos";

const PATH_KEY = "atomeons.lastPath";
const TITLE_KEY = "atomeons.lastTitle";
const SILO_KEY = "atomeons.lastSilo";
const AT_KEY = "atomeons.lastAt";

/**
 * ContinueRecorder · silent · mount once in layout.tsx · stamps state
 * on every navigation. Does not render anything visible.
 */
export function ContinueRecorder() {
  const pathname = usePathname() || "/";
  useEffect(() => {
    if (typeof window === "undefined") return;
    // Never record the launcher itself · we want to resume INTO a silo,
    // not back to home.
    if (pathname === "/" || pathname === "/launcher") return;
    try {
      localStorage.setItem(PATH_KEY, pathname);
      localStorage.setItem(TITLE_KEY, document.title || pathname);
      const silo = getSiloFromPath(pathname) ?? "";
      localStorage.setItem(SILO_KEY, silo);
      localStorage.setItem(AT_KEY, new Date().toISOString());
    } catch {
      // localStorage blocked · silently ignore
    }
  }, [pathname]);
  return null;
}

/**
 * ContinueCard · the visible card · only renders if there is a saved
 * last-path AND it is not the launcher AND it was within the last 14 days.
 */
export function ContinueCard() {
  const [state, setState] = useState<{
    path: string;
    title: string;
    silo: string | null;
    at: string;
  } | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const path = localStorage.getItem(PATH_KEY);
      const title = localStorage.getItem(TITLE_KEY);
      const at = localStorage.getItem(AT_KEY);
      const siloRaw = localStorage.getItem(SILO_KEY);
      if (!path || !title || !at) return;
      // Stale check · 14 days
      const ageMs = Date.now() - new Date(at).getTime();
      if (ageMs > 14 * 24 * 60 * 60 * 1000) return;
      setState({ path, title, silo: siloRaw || null, at });
    } catch {
      // ignore
    }
  }, []);

  if (!state) return null;

  const silo = state.silo ? getSilo(state.silo as "learn") : undefined;
  const accent = silo?.accent ?? "#22F0D5";
  const relTime = humanizeAge(state.at);

  return (
    <section
      aria-label="Continue where you left off"
      className="mt-6 border bg-[#0B0C0F] p-5 transition hover:translate-y-[-1px]"
      style={{
        borderColor: `${accent}55`,
        background: `linear-gradient(180deg, ${accent}10 0%, rgba(11, 12, 15, 0.96) 60%)`,
      }}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p
          className="font-mono text-[10px] uppercase tracking-[0.32em]"
          style={{ color: accent }}
        >
          § resume · last visit {relTime}
        </p>
        <button
          type="button"
          onClick={() => {
            try {
              localStorage.removeItem(PATH_KEY);
              localStorage.removeItem(TITLE_KEY);
              localStorage.removeItem(SILO_KEY);
              localStorage.removeItem(AT_KEY);
            } catch {
              // ignore
            }
            setState(null);
          }}
          className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a] transition hover:text-[#FF4D4D]"
          aria-label="Forget resume position"
        >
          × forget
        </button>
      </div>
      <Link
        href={state.path}
        className="mt-3 inline-block text-[22px] font-light leading-tight text-[#F4F4F2] hover:underline"
        style={{ fontFamily: "Newsreader, Georgia, serif" }}
      >
        {state.title.replace(" | AtomEons", "")} →
      </Link>
      <p className="mt-2 font-mono text-[11px] text-[#7a818a]">{state.path}</p>
    </section>
  );
}

function humanizeAge(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const min = Math.round(diff / 60_000);
  if (min < 1) return "just now";
  if (min < 60) return `${min} min ago`;
  const hr = Math.round(min / 60);
  if (hr < 24) return `${hr} hr ago`;
  const day = Math.round(hr / 24);
  if (day === 1) return "yesterday";
  return `${day} days ago`;
}
