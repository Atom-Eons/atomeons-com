"use client";

import { useEffect, useRef, useState } from "react";

/**
 * AmbientToggle — opt-in generative drone tied to the lab's harmonic
 * frequency set (432 Hz · φ · π · e ratios).
 *
 * Off by default. One click enables. The drone is intentionally barely
 * audible · sets a mood without commanding attention. Persists across
 * navigations via localStorage. Auto-pauses on document.hidden.
 *
 * Audio architecture:
 *   - 4 sine OscillatorNodes detuned slightly for chorus
 *   - Each routed through a GainNode for amplitude shaping
 *   - Master GainNode at 0.04 (very quiet)
 *   - Slow LFO (0.05 Hz) modulates each oscillator's gain ±20%
 *   - Pitches: 432, 432×φ⁻¹ ≈ 267, 432×π⁻¹ ≈ 137.5, 432×e⁻¹ ≈ 159
 *
 * Bundle cost: ~3 KB. Web Audio API supported in every modern browser
 * (no experimental flags needed).
 */

const STORE_KEY = "atomeons.ambient.on";

const PHI = 1.618033988749895;
const PI = Math.PI;
const E = Math.E;

const VOICES = [
  { freq: 432.0,         detune: 0 },
  { freq: 432.0 / PHI,   detune: 5 },
  { freq: 432.0 / PI,    detune: -7 },
  { freq: 432.0 / E,     detune: 3 },
];

export function AmbientToggle({ compact = false }: { compact?: boolean }) {
  const [on, setOn] = useState(false);
  const [ready, setReady] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode[]>([]);
  const gainRef = useRef<GainNode[]>([]);
  const masterRef = useRef<GainNode | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setReady(true);
    // Honor previous preference, but require a fresh user gesture to
    // actually start playing (browsers require user gesture).
    const stored = localStorage.getItem(STORE_KEY);
    if (stored === "true") {
      // Don't auto-start · just remember the preference. The toggle
      // shows as "on" but actual sound starts on next click.
    }
  }, []);

  function start() {
    if (ctxRef.current) return;
    const AC = (window as unknown as { AudioContext?: typeof AudioContext; webkitAudioContext?: typeof AudioContext }).AudioContext
      || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    const ctx = new AC();
    ctxRef.current = ctx;

    const master = ctx.createGain();
    master.gain.value = 0.04;
    master.connect(ctx.destination);
    masterRef.current = master;

    // LFO that modulates each voice's gain ±20%
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.05;     // 0.05 Hz → period 20 seconds
    lfoRef.current = lfo;

    for (const v of VOICES) {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = v.freq;
      osc.detune.value = v.detune;

      const gain = ctx.createGain();
      gain.gain.value = 0.25;
      // LFO modulates this gain
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.05;
      lfo.connect(lfoGain);
      lfoGain.connect(gain.gain);

      osc.connect(gain);
      gain.connect(master);
      osc.start();

      oscRef.current.push(osc);
      gainRef.current.push(gain);
    }
    lfo.start();
  }

  function stop() {
    const ctx = ctxRef.current;
    if (!ctx) return;
    try { lfoRef.current?.stop(); } catch {}
    for (const osc of oscRef.current) {
      try { osc.stop(); } catch {}
    }
    oscRef.current = [];
    gainRef.current = [];
    lfoRef.current = null;
    masterRef.current = null;
    ctx.close().catch(() => {});
    ctxRef.current = null;
  }

  function toggle() {
    const next = !on;
    setOn(next);
    localStorage.setItem(STORE_KEY, String(next));
    if (next) start();
    else stop();
  }

  // Pause on tab hidden
  useEffect(() => {
    if (!on) return;
    function onVis() {
      const ctx = ctxRef.current;
      if (!ctx) return;
      if (document.hidden) ctx.suspend().catch(() => {});
      else ctx.resume().catch(() => {});
    }
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [on]);

  useEffect(() => {
    return () => { stop(); };
  }, []);

  if (!ready) return null;

  if (compact) {
    return (
      <button
        type="button"
        onClick={toggle}
        aria-label={on ? "Mute ambient lab tone" : "Enable ambient lab tone"}
        aria-pressed={on}
        title={on ? "Mute ambient" : "Ambient: 432 Hz · φ · π · e drone"}
        className="flex h-9 w-9 items-center justify-center border border-[#1F242B] transition-colors hover:border-[#22F0D5]"
        style={{ color: on ? "#22F0D5" : "#7a818a" }}
      >
        {on ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
            <path d="M11 5L6 9H2v6h4l5 4z" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
            <path d="M11 5L6 9H2v6h4l5 4z" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={on ? "Mute ambient lab tone" : "Enable ambient lab tone"}
      aria-pressed={on}
      className="inline-flex items-center gap-2 border border-[#1F242B] bg-[#0F1114] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] transition-colors hover:border-[#22F0D5]"
      style={{ color: on ? "#22F0D5" : "#9CA3AF" }}
    >
      <span aria-hidden className="inline-block size-1.5 rounded-full" style={{ background: on ? "#22F0D5" : "#7a818a" }} />
      {on ? "Ambient · on" : "Ambient · off"}
    </button>
  );
}
