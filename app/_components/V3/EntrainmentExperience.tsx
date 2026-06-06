"use client";

/**
 * EntrainmentExperience — the /trip/experience client component.
 *
 * Web Audio API binaural-beat synthesis + SVG mandala + breathing
 * guide. Four brain-state modes mapped to canonical research-grounded
 * frequencies:
 *
 *   ALPHA   10 Hz   relaxed alert       (carrier 200 Hz · 200/210)
 *   THETA    6 Hz   meditative · imagery (carrier 200 Hz · 200/206)
 *   BETA    15 Hz   focused alert        (carrier 200 Hz · 200/215)
 *   DELTA    3 Hz   deep rest             (carrier 200 Hz · 200/203)
 *
 * Two pure sine oscillators panned hard L / R · the brain perceives
 * a phantom binaural beat at the frequency difference. Headphones
 * required for the effect. Audible to the ear without headphones too
 * (the L+R sum is a steady tone).
 *
 * Visual: SVG mandala (12-fold rotational symmetry · golden-ratio
 * concentric circles) rotates at the binaural-beat frequency / 60 so
 * one revolution = one cycle of the entrainment frequency at human
 * comfort. Hue cycles slowly. CSS @keyframes only · zero JS per frame.
 *
 * Breathing guide: 4-7-8 protocol (inhale 4 · hold 7 · exhale 8 ·
 * total 19s cycle). Center circle expands + contracts. Optional.
 *
 * Safety gates:
 *   - Photosensitive epilepsy modal on first start
 *   - Headphones-recommended hint
 *   - 20-minute auto-stop
 *   - Stop button always visible
 *   - prefers-reduced-motion → text-only mode by default
 *   - tier-lite hardware → text-only mode automatic
 *   - NO STROBE · all motion is slow + gradient · ramps from 0 to
 *     full opacity over 4s on start to avoid sudden visual shock
 *
 * — Wave 31a · 2026-06-06
 */

import { useState, useEffect, useRef, useCallback } from "react";

type Mode = "alpha" | "theta" | "beta" | "delta";

interface ModeConfig {
  key: Mode;
  label: string;
  freq: number; // Hz · the binaural beat frequency
  carrier: number; // Hz · the underlying tone
  hue: number; // 0-360 · the dominant color
  description: string;
}

const MODES: ModeConfig[] = [
  {
    key: "alpha",
    label: "Alpha · 10 Hz",
    freq: 10,
    carrier: 200,
    hue: 165, // cyan-teal
    description:
      "Relaxed alert · the state behind closed eyes before sleep · soft focus · creative drift.",
  },
  {
    key: "theta",
    label: "Theta · 6 Hz",
    freq: 6,
    carrier: 200,
    hue: 270, // purple
    description:
      "Meditative · hypnagogic · vivid mental imagery · deep relaxation · sometimes called the 'creative trance' state.",
  },
  {
    key: "beta",
    label: "Beta · 15 Hz",
    freq: 15,
    carrier: 200,
    hue: 35, // amber
    description:
      "Focused alertness · the working state · sharper attention · best for problem-solving sessions.",
  },
  {
    key: "delta",
    label: "Delta · 3 Hz",
    freq: 3,
    carrier: 200,
    hue: 220, // deep blue
    description:
      "Deep rest · the state of dreamless sleep · slow + still · use for unwinding before bed (don't drive after).",
  },
];

const AUTO_STOP_MS = 20 * 60 * 1000; // 20 minutes

export function EntrainmentExperience() {
  const [gateAccepted, setGateAccepted] = useState(false);
  const [textOnly, setTextOnly] = useState(false);
  const [mode, setMode] = useState<Mode>("alpha");
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0); // seconds
  const [showBreathing, setShowBreathing] = useState(true);

  // Audio refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscLeftRef = useRef<OscillatorNode | null>(null);
  const oscRightRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  // Timing refs
  const startTimeRef = useRef<number | null>(null);
  const tickIntervalRef = useRef<number | null>(null);
  const autoStopTimeoutRef = useRef<number | null>(null);

  // ---- Tier detection · respect lite hardware ----
  useEffect(() => {
    if (typeof window === "undefined") return;
    const html = document.documentElement;
    if (html.classList.contains("tier-lite") || html.classList.contains("lite-mode")) {
      setTextOnly(true);
    }
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) setTextOnly(true);
  }, []);

  // ---- Start / Stop audio ----
  const startAudio = useCallback((m: Mode) => {
    if (typeof window === "undefined") return;

    // Reuse context if it exists (Safari is strict about new contexts)
    if (!audioCtxRef.current) {
      const Ctor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      audioCtxRef.current = new Ctor();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === "suspended") {
      void ctx.resume();
    }

    const cfg = MODES.find((x) => x.key === m)!;

    // Master gain · gentle · ramps up from 0 over 4s to avoid shock
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 4);
    gain.connect(ctx.destination);
    gainRef.current = gain;

    // Left oscillator · carrier
    const oscL = ctx.createOscillator();
    oscL.type = "sine";
    oscL.frequency.value = cfg.carrier;
    const panL = ctx.createStereoPanner();
    panL.pan.value = -1;
    oscL.connect(panL).connect(gain);
    oscL.start();
    oscLeftRef.current = oscL;

    // Right oscillator · carrier + binaural offset
    const oscR = ctx.createOscillator();
    oscR.type = "sine";
    oscR.frequency.value = cfg.carrier + cfg.freq;
    const panR = ctx.createStereoPanner();
    panR.pan.value = 1;
    oscR.connect(panR).connect(gain);
    oscR.start();
    oscRightRef.current = oscR;
  }, []);

  const stopAudio = useCallback(() => {
    const gain = gainRef.current;
    const ctx = audioCtxRef.current;
    if (!gain || !ctx) return;
    // Ramp down · prevents click
    gain.gain.cancelScheduledValues(ctx.currentTime);
    gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6);
    window.setTimeout(() => {
      try {
        oscLeftRef.current?.stop();
        oscRightRef.current?.stop();
        oscLeftRef.current?.disconnect();
        oscRightRef.current?.disconnect();
        gainRef.current?.disconnect();
      } catch {
        // already stopped
      }
      oscLeftRef.current = null;
      oscRightRef.current = null;
      gainRef.current = null;
    }, 800);
  }, []);

  // ---- Start / Stop session ----
  const start = useCallback(() => {
    if (!textOnly) startAudio(mode);
    setRunning(true);
    setElapsed(0);
    startTimeRef.current = Date.now();
    tickIntervalRef.current = window.setInterval(() => {
      const start = startTimeRef.current;
      if (start) {
        setElapsed(Math.floor((Date.now() - start) / 1000));
      }
    }, 1000);
    autoStopTimeoutRef.current = window.setTimeout(() => {
      stop();
    }, AUTO_STOP_MS);
  }, [mode, startAudio, textOnly]);

  const stop = useCallback(() => {
    stopAudio();
    setRunning(false);
    if (tickIntervalRef.current !== null) {
      window.clearInterval(tickIntervalRef.current);
      tickIntervalRef.current = null;
    }
    if (autoStopTimeoutRef.current !== null) {
      window.clearTimeout(autoStopTimeoutRef.current);
      autoStopTimeoutRef.current = null;
    }
    startTimeRef.current = null;
  }, [stopAudio]);

  // ---- Cleanup ----
  useEffect(() => {
    return () => {
      stop();
      try {
        audioCtxRef.current?.close();
      } catch {
        // ignore
      }
    };
  }, [stop]);

  // ---- Mode switch · stop then restart cleanly ----
  const switchMode = useCallback(
    (m: Mode) => {
      if (running) {
        stop();
        setMode(m);
        // Restart on next tick
        window.setTimeout(() => {
          if (!textOnly) startAudio(m);
          setRunning(true);
          setElapsed(0);
          startTimeRef.current = Date.now();
          tickIntervalRef.current = window.setInterval(() => {
            const start = startTimeRef.current;
            if (start) {
              setElapsed(Math.floor((Date.now() - start) / 1000));
            }
          }, 1000);
          autoStopTimeoutRef.current = window.setTimeout(() => {
            stop();
          }, AUTO_STOP_MS);
        }, 300);
      } else {
        setMode(m);
      }
    },
    [running, stop, startAudio, textOnly],
  );

  // ---- Format elapsed mm:ss ----
  const mm = Math.floor(elapsed / 60).toString().padStart(2, "0");
  const ss = (elapsed % 60).toString().padStart(2, "0");

  const cfg = MODES.find((x) => x.key === mode)!;

  // ---- Gate · safety + headphones modal ----
  if (!gateAccepted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 px-6">
        <div className="max-w-[640px] border border-[#FF4D4D]/40 bg-[#0F1114] p-10 text-[#F4F4F2]">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#FF4D4D]">
            § Safety gate · please read
          </p>
          <h1
            className="mt-4 text-[40px] font-light leading-tight text-[#F4F4F2]"
            style={{ fontFamily: "Newsreader, Georgia, serif" }}
          >
            Audiovisual entrainment.
          </h1>
          <ul className="mt-6 space-y-3 text-[15px] leading-[1.65] text-[#9CA3AF]">
            <li className="flex gap-3">
              <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#22F0D5]" />
              <span>
                <strong className="text-[#F4F4F2]">Headphones recommended.</strong>{" "}
                The binaural-beat effect only works with stereo separation.
                Speakers will give you a steady tone, not the entrainment.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF4D4D]" />
              <span>
                <strong className="text-[#F4F4F2]">
                  Photosensitive epilepsy.
                </strong>{" "}
                The mandala rotates slowly and uses no strobe, but if you have a
                history of seizures choose <em>text-only mode</em> below.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF4D4D]" />
              <span>
                <strong className="text-[#F4F4F2]">Do not drive after.</strong>{" "}
                Theta and delta modes can leave you genuinely drowsy. Especially
                delta.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A55C]" />
              <span>
                <strong className="text-[#F4F4F2]">Not medical advice.</strong>{" "}
                Audiovisual entrainment has EEG evidence but no clinical claim
                is made on this page. See a clinician for anxiety, depression,
                PTSD, ADHD.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A55C]" />
              <span>
                <strong className="text-[#F4F4F2]">Auto-stops at 20 min.</strong>{" "}
                Stop button always visible. You can leave the page any time and
                audio + visual end cleanly.
              </span>
            </li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setGateAccepted(true)}
              className="inline-flex items-center gap-2 border-2 border-[#22F0D5] bg-[#22F0D5]/10 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-[#22F0D5] transition hover:bg-[#22F0D5]/20"
            >
              <span aria-hidden>♪</span>
              <span>Start with headphones</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setTextOnly(true);
                setGateAccepted(true);
              }}
              className="inline-flex items-center gap-2 border border-[#1F242B] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-[#9CA3AF] transition hover:border-[#9CA3AF] hover:text-[#F4F4F2]"
            >
              <span>Text-only mode</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="entrainment-root fixed inset-0 z-30 flex flex-col bg-black text-[#F4F4F2]"
      data-mode={mode}
      data-running={running ? "1" : "0"}
    >
      {/* Visual layer · disabled in text-only */}
      {!textOnly && (
        <div className="entrainment-visual pointer-events-none absolute inset-0 flex items-center justify-center">
          <Mandala mode={mode} running={running} />
        </div>
      )}

      {/* Center column · breathing + readout */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
        {/* Breathing guide */}
        {showBreathing && running && (
          <div
            className="breathing-circle mb-10"
            aria-label="4-7-8 breathing guide"
          />
        )}

        {/* Active mode label */}
        <p
          className="font-mono text-[11px] uppercase tracking-[0.32em]"
          style={{ color: `hsl(${cfg.hue} 70% 60%)` }}
        >
          {cfg.label}
        </p>

        {/* Mode description */}
        <p
          className="mt-4 max-w-[44ch] text-[18px] leading-[1.55] text-[#9CA3AF]"
          style={{ fontFamily: "Newsreader, Georgia, serif" }}
        >
          {cfg.description}
        </p>

        {/* Timer */}
        {running && (
          <p className="mt-8 font-mono text-[14px] uppercase tracking-[0.32em] text-[#5A6068]">
            {mm}:{ss} · auto-stops at 20:00
          </p>
        )}

        {/* Start / stop */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {!running ? (
            <button
              type="button"
              onClick={start}
              className="inline-flex items-center gap-2 border-2 px-6 py-3 font-mono text-[12px] uppercase tracking-[0.22em] transition"
              style={{
                borderColor: `hsl(${cfg.hue} 70% 60%)`,
                color: `hsl(${cfg.hue} 70% 60%)`,
                background: `hsla(${cfg.hue}, 70%, 60%, 0.10)`,
              }}
            >
              <span aria-hidden>▶</span>
              <span>Start session</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={stop}
              className="inline-flex items-center gap-2 border-2 border-[#FF4D4D] bg-[#FF4D4D]/10 px-6 py-3 font-mono text-[12px] uppercase tracking-[0.22em] text-[#FF4D4D] transition hover:bg-[#FF4D4D]/20"
            >
              <span aria-hidden>■</span>
              <span>Stop</span>
            </button>
          )}
          <button
            type="button"
            onClick={() => setShowBreathing((b) => !b)}
            className="inline-flex items-center gap-2 border border-[#1F242B] px-4 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#9CA3AF] transition hover:border-[#9CA3AF] hover:text-[#F4F4F2]"
          >
            {showBreathing ? "Hide breathing" : "Show breathing"}
          </button>
          <button
            type="button"
            onClick={() => setTextOnly((t) => !t)}
            className="inline-flex items-center gap-2 border border-[#1F242B] px-4 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#9CA3AF] transition hover:border-[#9CA3AF] hover:text-[#F4F4F2]"
          >
            {textOnly ? "Enable visuals" : "Text-only"}
          </button>
        </div>
      </div>

      {/* Bottom mode strip */}
      <div className="relative z-10 border-t border-[#1F242B] bg-black/60 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1000px] flex-wrap items-center justify-center gap-2 px-4 py-4">
          {MODES.map((m) => (
            <button
              key={m.key}
              type="button"
              onClick={() => switchMode(m.key)}
              className="inline-flex flex-col items-start border px-4 py-2 transition"
              style={{
                borderColor:
                  m.key === mode ? `hsl(${m.hue} 70% 60%)` : "#1F242B",
                background:
                  m.key === mode ? `hsla(${m.hue}, 70%, 60%, 0.08)` : "transparent",
              }}
            >
              <span
                className="font-mono text-[11px] uppercase tracking-[0.22em]"
                style={{
                  color: m.key === mode ? `hsl(${m.hue} 70% 60%)` : "#9CA3AF",
                }}
              >
                {m.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Component-scoped CSS */}
      <style jsx>{`
        .breathing-circle {
          width: 120px;
          height: 120px;
          border-radius: 999px;
          background: radial-gradient(
            circle,
            hsla(${cfg.hue}, 70%, 60%, 0.4) 0%,
            hsla(${cfg.hue}, 70%, 60%, 0.05) 60%,
            transparent 100%
          );
          animation: breathe 19s ease-in-out infinite;
        }
        /* 4-7-8 protocol expressed as % of 19s cycle:
           inhale 0-21%   (0-4s)    → scale 0.6 → 1.0
           hold   21-58%  (4-11s)   → scale 1.0
           exhale 58-100% (11-19s)  → scale 1.0 → 0.6 */
        @keyframes breathe {
          0% {
            transform: scale(0.6);
            opacity: 0.55;
          }
          21% {
            transform: scale(1);
            opacity: 1;
          }
          58% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(0.6);
            opacity: 0.55;
          }
        }
        /* Reduced motion · static fully-expanded circle */
        @media (prefers-reduced-motion: reduce) {
          .breathing-circle {
            animation: none;
            transform: scale(0.85);
            opacity: 0.75;
          }
        }
      `}</style>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Mandala · 12-fold rotational symmetry · pure CSS rotation · GPU composited.
// Concentric circles at golden-ratio spacing · hue derived from active mode.
// Animation speed proportional to mode frequency / 60 so one revolution feels
// natural at human comfort. Never strobes · ramps in over 4 seconds.
// ---------------------------------------------------------------------------

function Mandala({ mode, running }: { mode: Mode; running: boolean }) {
  const cfg = MODES.find((x) => x.key === mode)!;
  const revolutionSeconds = Math.max(8, 60 / cfg.freq); // 6 → 10s · 3 → 20s
  return (
    <div
      className="mandala-wrapper"
      data-running={running ? "1" : "0"}
      aria-hidden="true"
    >
      <svg
        viewBox="-200 -200 400 400"
        width="min(80vw, 80vh)"
        height="min(80vw, 80vh)"
        className="mandala-svg"
      >
        {/* Outer 12 petals */}
        <g className="ring-12">
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i / 12) * Math.PI * 2;
            const x = Math.cos(a) * 160;
            const y = Math.sin(a) * 160;
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={28}
                fill="none"
                stroke={`hsla(${cfg.hue}, 70%, 60%, 0.32)`}
                strokeWidth={1}
              />
            );
          })}
        </g>
        {/* Inner 8 petals (counter-rotates) */}
        <g className="ring-8">
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i / 8) * Math.PI * 2 + Math.PI / 16;
            const x = Math.cos(a) * 96;
            const y = Math.sin(a) * 96;
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={20}
                fill="none"
                stroke={`hsla(${(cfg.hue + 60) % 360}, 70%, 60%, 0.28)`}
                strokeWidth={1}
              />
            );
          })}
        </g>
        {/* Center radiance */}
        <circle
          cx={0}
          cy={0}
          r={40}
          fill="none"
          stroke={`hsla(${cfg.hue}, 70%, 70%, 0.5)`}
          strokeWidth={1.5}
        />
        <circle
          cx={0}
          cy={0}
          r={4}
          fill={`hsla(${cfg.hue}, 70%, 70%, 0.8)`}
        />
      </svg>
      <style jsx>{`
        .mandala-wrapper {
          opacity: 0;
          transition: opacity 4s ease-out;
        }
        .mandala-wrapper[data-running="1"] {
          opacity: 1;
        }
        .mandala-svg {
          filter: blur(0.2px);
        }
        .ring-12 {
          transform-origin: center;
          animation: rotate-cw ${revolutionSeconds}s linear infinite;
          will-change: transform;
        }
        .ring-8 {
          transform-origin: center;
          animation: rotate-ccw ${revolutionSeconds * 0.618}s linear infinite;
          will-change: transform;
        }
        @keyframes rotate-cw {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes rotate-ccw {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .ring-12,
          .ring-8 {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
