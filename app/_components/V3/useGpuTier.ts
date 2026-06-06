"use client";

/**
 * useGpuTier — auto-detect a visitor's hardware tier without violating privacy.
 *
 * Three tiers · lite · standard · full. Default is `auto`, which runs the
 * 4-step detection synchronously after hydration and resolves to one of the
 * three concrete tiers. Result is persisted to localStorage so the visitor
 * doesn't re-pay the rAF self-measurement cost on every page load.
 *
 * Decision tree (run in order, stop when conclusive):
 *
 *   Step 1 · navigator.hardwareConcurrency
 *     ≤ 2 cores                  → force lite, skip remaining checks
 *     ≥ 8 cores                  → full candidate, continue to confirm
 *     3-7 cores                  → standard candidate, continue
 *
 *   Step 2 · navigator.deviceMemory  (low-entropy · rounded to power of 2)
 *     ≤ 2 GB                     → force lite
 *     4 GB                       → standard
 *     ≥ 8 GB                     → full candidate (continue)
 *
 *   Step 3 · rAF self-measurement  (1.8s budget · max 30 frames)
 *     mean delta > 50ms          → force lite (below 20fps)
 *     mean delta > 33ms          → downgrade one tier (below 30fps)
 *     mean delta < 17ms          → confirm full
 *
 *   Step 4 · WebGL renderer string  (OPTIONAL · bonus signal · NOT a gate)
 *     "ANGLE (Intel...HD Graphics" → soft cap at standard
 *     "Apple GPU" / "NVIDIA"        → soft confirm full
 *
 * Privacy notes:
 *   - hardwareConcurrency: low-entropy (cores · widely available)
 *   - deviceMemory: deliberately rounded to power of 2 by the spec
 *   - rAF self-measure: reads no system info · just measures what the
 *     browser is already doing
 *   - WebGL renderer: highest-entropy of the four · we read it only as
 *     soft confirmation, never as a gate, and treat absence as fine
 *
 * The visitor can always override via TierToggle in the header. Manual
 * choice wins · is persisted as `atomeons.tier` = "lite" | "standard" |
 * "full" | "auto". When "auto" the resolved tier is stored separately
 * as `atomeons.tier.resolved`.
 *
 * — Wave 30 · JUNE ROCKET · 2026-06-06
 */

import { useEffect, useState, useCallback } from "react";

export type GpuTier = "lite" | "standard" | "full";
export type GpuChoice = GpuTier | "auto";

export const STORAGE_KEY = "atomeons.tier";
export const STORAGE_KEY_RESOLVED = "atomeons.tier.resolved";

// --- Helpers --------------------------------------------------------------

function readStoredChoice(): GpuChoice {
  if (typeof window === "undefined") return "auto";
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    if (v === "lite" || v === "standard" || v === "full" || v === "auto") {
      return v;
    }
  } catch {
    // localStorage unavailable (private window, blocked) — fine, fall back
  }
  return "auto";
}

function writeChoice(c: GpuChoice): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, c);
  } catch {
    // ignore quota / blocked storage
  }
}

function writeResolved(t: GpuTier): void {
  try {
    window.localStorage.setItem(STORAGE_KEY_RESOLVED, t);
  } catch {
    // ignore
  }
}

function readCachedResolved(): GpuTier | null {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(STORAGE_KEY_RESOLVED);
    if (v === "lite" || v === "standard" || v === "full") return v;
  } catch {
    // ignore
  }
  return null;
}

// --- Step 1+2 · static signals (synchronous, cheap) ------------------------

function detectStaticTier(): GpuTier | null {
  if (typeof navigator === "undefined") return null;

  const cores = (navigator as Navigator & { hardwareConcurrency?: number })
    .hardwareConcurrency;
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;

  // Force lite floor — beats anything else.
  if (typeof cores === "number" && cores <= 2) return "lite";
  if (typeof mem === "number" && mem <= 2) return "lite";

  // High-spec candidate (both signals high) — likely full, confirm with rAF.
  if (
    typeof cores === "number" &&
    cores >= 8 &&
    typeof mem === "number" &&
    mem >= 8
  ) {
    return "full";
  }

  // Mid-spec → standard candidate.
  if (typeof cores === "number" && cores >= 4) return "standard";
  if (typeof mem === "number" && mem >= 4) return "standard";

  return null;
}

// --- Step 3 · rAF frame-rate self-measurement ----------------------------

function measureFrameRate(budgetMs = 1800, maxFrames = 30): Promise<number> {
  return new Promise<number>((resolve) => {
    if (typeof window === "undefined") {
      resolve(16); // assume 60fps if no window
      return;
    }
    const deltas: number[] = [];
    let last = performance.now();
    let frames = 0;
    const start = last;

    const tick = (t: number) => {
      const d = t - last;
      last = t;
      deltas.push(d);
      frames++;
      if (frames >= maxFrames || t - start >= budgetMs) {
        // Drop the first 2 frames (warm-up jitter).
        const stable = deltas.slice(2);
        const mean = stable.length
          ? stable.reduce((a, b) => a + b, 0) / stable.length
          : 16;
        resolve(mean);
        return;
      }
      window.requestAnimationFrame(tick);
    };
    window.requestAnimationFrame(tick);
  });
}

function adjustForFrameRate(candidate: GpuTier, meanDelta: number): GpuTier {
  if (meanDelta > 50) return "lite"; // below 20fps · force lite
  if (meanDelta > 33) {
    // below 30fps · downgrade one tier
    if (candidate === "full") return "standard";
    if (candidate === "standard") return "lite";
    return "lite";
  }
  if (meanDelta < 17 && candidate === "standard") {
    // 60fps observed on a standard-candidate · keep standard
    // (we don't auto-promote to full · cores+memory must agree)
    return "standard";
  }
  return candidate;
}

// --- Step 4 · WebGL renderer (optional · soft signal only) -----------------

function readWebGLRenderer(): string | null {
  if (typeof document === "undefined") return null;
  try {
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl2") ||
      canvas.getContext("webgl")) as WebGLRenderingContext | null;
    if (!gl) return null;
    const ext = gl.getExtension("WEBGL_debug_renderer_info");
    if (!ext) return null;
    const r = gl.getParameter(
      (ext as WebGLDebugRendererInfo).UNMASKED_RENDERER_WEBGL,
    );
    return typeof r === "string" ? r : null;
  } catch {
    return null;
  }
}

interface WebGLDebugRendererInfo {
  UNMASKED_RENDERER_WEBGL: number;
}

function softCapForRenderer(t: GpuTier, renderer: string | null): GpuTier {
  if (!renderer) return t;
  const r = renderer.toLowerCase();
  // Integrated Intel HD/UHD on weak laptops · cap at standard.
  if (r.includes("intel") && (r.includes("hd graphics") || r.includes("uhd"))) {
    return t === "full" ? "standard" : t;
  }
  // Apple Silicon / NVIDIA / AMD Radeon (modern) · no change.
  return t;
}

// --- Public hook -----------------------------------------------------------

interface UseGpuTierReturn {
  /** The currently active tier · always one of lite / standard / full */
  tier: GpuTier;
  /** What the visitor chose · "auto" means tier was detected */
  choice: GpuChoice;
  /** Set a manual override (also persists) */
  setChoice: (c: GpuChoice) => void;
  /** True until the first detection pass finishes */
  detecting: boolean;
}

export function useGpuTier(): UseGpuTierReturn {
  // SSR-safe initial state: respect cached resolved tier so the first
  // render matches what the head bootstrap script already applied.
  const [choice, setChoiceState] = useState<GpuChoice>("auto");
  const [tier, setTier] = useState<GpuTier>("lite");
  const [detecting, setDetecting] = useState(true);

  // First-paint sync read of the stored choice + cached resolved tier.
  useEffect(() => {
    const c = readStoredChoice();
    const cached = readCachedResolved();
    setChoiceState(c);
    if (c !== "auto") {
      setTier(c);
      setDetecting(false);
      return;
    }
    if (cached) {
      setTier(cached);
      setDetecting(false);
      // We still re-run detection in the background to keep the cache fresh,
      // but the UI doesn't flash.
    }

    let cancelled = false;

    (async () => {
      // Steps 1+2 — static signals
      const staticTier = detectStaticTier();
      if (cancelled) return;

      // If we already know it's lite from cores/memory, lock it in.
      if (staticTier === "lite") {
        if (!cancelled) {
          setTier("lite");
          writeResolved("lite");
          setDetecting(false);
        }
        return;
      }

      // Step 3 — rAF measurement
      const candidate: GpuTier = staticTier ?? "standard";
      const meanDelta = await measureFrameRate();
      if (cancelled) return;
      let resolved = adjustForFrameRate(candidate, meanDelta);

      // Step 4 — WebGL soft cap
      const renderer = readWebGLRenderer();
      resolved = softCapForRenderer(resolved, renderer);

      if (!cancelled) {
        setTier(resolved);
        writeResolved(resolved);
        setDetecting(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const setChoice = useCallback((c: GpuChoice) => {
    setChoiceState(c);
    writeChoice(c);
    if (c === "auto") {
      // Re-trigger detection by clearing resolved + reloading the tier.
      // For simplicity we just leave the existing tier active and let the
      // next page navigation re-run detection.
      return;
    }
    setTier(c);
    // Apply the class immediately for any heavy components reading the DOM.
    applyTierClass(c);
  }, []);

  // Sync the resolved tier to the DOM class so non-React consumers
  // (SacredSvg · LivingCursor · CSS rules) can react synchronously.
  useEffect(() => {
    applyTierClass(tier);
  }, [tier]);

  return { tier, choice, setChoice, detecting };
}

// --- DOM sync helper -------------------------------------------------------

const TIER_CLASSES = ["tier-lite", "tier-standard", "tier-full"] as const;

export function applyTierClass(t: GpuTier): void {
  if (typeof document === "undefined") return;
  const html = document.documentElement;
  TIER_CLASSES.forEach((c) => html.classList.remove(c));
  html.classList.add(`tier-${t}`);
  // Backwards compatibility · the old globals.css rules key off
  // `html.lite-mode` to disable canvases. Keep that class in sync with
  // tier-lite so existing rules don't need to be rewritten on day one.
  if (t === "lite") {
    html.classList.add("lite-mode");
  } else {
    html.classList.remove("lite-mode");
  }
}
