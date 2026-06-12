"use client";

import { useEffect, useState } from "react";

/**
 * LiteToggle — floating "performance mode" switch.
 *
 * For low-end devices (mini PCs · old laptops · battery-saver mode)
 * that can't handle the heavy procedural visuals. One click disables
 * every animated client component:
 *
 *   - SacredCanvas (site-wide procedural background)
 *   - LivingCursor (custom cursor + trail)
 *   - AtomHero3D (homepage 3D atom)
 *   - ConstellationCanvas (/constellation force graph)
 *   - AmbientToggle audio (auto-disabled when lite)
 *
 * Works by adding `lite-mode` class to <html>. Animated components
 * read that class and bail early (return null OR skip their render
 * loop). Choice persists via localStorage.
 *
 * Position: fixed bottom-right corner. Small. Out of the way. Subtle
 * cyan dot indicator when ON (heavy mode), iron dot when OFF (lite
 * mode). Click toggles.
 *
 * Also respects prefers-reduced-motion: defaults to lite if user has
 * that system preference set.
 */

const STORE_KEY = "atomeons.lite";

export function LiteToggle() {
  const [lite, setLite] = useState<boolean | null>(null);

  // Hydrate from localStorage + prefers-reduced-motion
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(STORE_KEY);
    let initial = false;
    if (stored !== null) {
      initial = stored === "true";
    } else {
      // First visit · default to lite if reduced-motion is set
      initial = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    setLite(initial);
    applyLite(initial);
  }, []);

  function applyLite(on: boolean) {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("lite-mode", on);
    // Custom event so animated components can react immediately
    window.dispatchEvent(new CustomEvent("atomeons:lite-changed", { detail: { lite: on } }));
  }

  function toggle() {
    if (lite === null) return;
    const next = !lite;
    setLite(next);
    localStorage.setItem(STORE_KEY, String(next));
    applyLite(next);
  }

  if (lite === null) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={lite ? "Turn visuals ON (full mode)" : "Turn visuals OFF (lite mode for low-end devices)"}
      aria-pressed={lite}
      title={lite ? "Lite mode · click to enable full visuals" : "Full visuals · click to switch to lite mode"}
      className="group fixed bottom-4 right-4 z-[120] flex items-center gap-2 border bg-[#0F1114]/80 px-3 py-2 backdrop-blur-md transition-all hover:bg-[#0F1114]"
      style={{
        borderColor: lite ? "#7a818a" : "#22F0D5",
        boxShadow: lite ? "none" : "0 0 24px rgba(34, 240, 213, 0.25)",
      }}
    >
      {/* Status pip */}
      <span
        aria-hidden
        className="inline-block size-2 rounded-full transition-colors"
        style={{
          background: lite ? "#7a818a" : "#22F0D5",
          boxShadow: lite ? "none" : "0 0 8px #22F0D5",
        }}
      />
      {/* Label */}
      <span
        className="font-mono text-[10px] uppercase tracking-[0.22em] transition-colors"
        style={{ color: lite ? "#9CA3AF" : "#22F0D5" }}
      >
        {lite ? "lite" : "visuals · on"}
      </span>
    </button>
  );
}
