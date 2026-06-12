"use client";

/**
 * EntrainmentExperience — MINDREST · the /mindrest/experience client.
 *
 * Tune your brainwaves to the ocean. Two layers · binaural beats
 * (optional · headphones) + procedurally-synthesized ocean swell.
 * Visual is rolling sine waves rendered in SVG with CSS-driven
 * horizontal parallax · feels like watching the surf at night.
 *
 * Five modes:
 *
 *   ALPHA       10 Hz   relaxed alert       carrier 200/210
 *   THETA        6 Hz   meditative imagery  carrier 200/206
 *   BETA        15 Hz   focused alert       carrier 200/215
 *   DELTA        3 Hz   deep rest           carrier 200/203
 *   MEDITATION   off    ocean + breath only · no binaural
 *
 * Audio stack:
 *   1. Two sine oscillators detuned by binaural Hz · hard L/R panned
 *      (skipped in MEDITATION mode)
 *   2. Synthesized ocean swell · 2s white-noise buffer · low-pass
 *      filter at 700 Hz · LFO modulating both gain (swell-volume) and
 *      filter cutoff (high-frequency hiss of the wave crest) at 0.15
 *      Hz so one full swell takes ~6.5 seconds
 *   3. Master gain ramp-in over 4s on start · 0.8s ramp-out on stop
 *      to avoid clicks
 *
 * Visual stack:
 *   1. Deep-ocean radial gradient backdrop (mode-hue tinted)
 *   2. Five layered SVG sine curves at different periods + speeds ·
 *      parallax depth · CSS @keyframes translateX · zero JS per frame
 *   3. Mode label + description + breathing guide + timer + stop
 *
 * Safety (unchanged):
 *   - Photosensitive epilepsy gate · headphones hint · auto-stop 20m
 *   - prefers-reduced-motion → text-only · tier-lite → text-only
 *   - NO STROBE · all motion is slow gradient · 4s opacity ramp
 *
 * — Wave 31b · MINDREST · 2026-06-06
 */

import { useState, useEffect, useRef, useCallback } from "react";

type Mode =
  | "alpha"
  | "theta"
  | "beta"
  | "delta"
  | "meditation"
  | "schumann"
  | "wimhof"
  | "sleep";

interface ModeConfig {
  key: Mode;
  label: string;
  freq: number; // Hz · binaural beat frequency (0 = no binaural)
  carrier: number; // Hz · underlying tone
  hue: number; // 0-360
  swellSeconds: number; // ocean wave cycle in seconds
  description: string;
}

const MODES: ModeConfig[] = [
  {
    key: "alpha",
    label: "Alpha · 10 Hz · soft tide",
    freq: 10,
    carrier: 200,
    hue: 175, // ocean teal
    swellSeconds: 6,
    description:
      "Relaxed alertness · the state behind closed eyes before sleep · soft focus · creative drift. The brain at gentle low tide.",
  },
  {
    key: "theta",
    label: "Theta · 6 Hz · deep current",
    freq: 6,
    carrier: 200,
    hue: 250, // deep purple-blue
    swellSeconds: 8,
    description:
      "Meditative · hypnagogic · vivid mental imagery · deep relaxation. The brain in slow swell · creative trance state.",
  },
  {
    key: "beta",
    label: "Beta · 15 Hz · clear surface",
    freq: 15,
    carrier: 200,
    hue: 40, // sunrise amber
    swellSeconds: 4,
    description:
      "Focused alertness · the working state · sharper attention · best for problem-solving. The brain on a bright open sea.",
  },
  {
    key: "delta",
    label: "Delta · 3 Hz · trench dark",
    freq: 3,
    carrier: 200,
    hue: 215, // deep midnight blue
    swellSeconds: 12,
    description:
      "Deep rest · the state of dreamless sleep · slow and still. The brain in the trench. Don't drive after.",
  },
  {
    key: "meditation",
    label: "Meditation · ocean only",
    freq: 0, // no binaural
    carrier: 0,
    hue: 200, // pacific blue
    swellSeconds: 7,
    description:
      "Pure ocean. No binaural. Just synthesized swell + breath + silence. Sit with it. Eyes open or closed.",
  },
  {
    key: "schumann",
    label: "Schumann · 7.83 Hz · Earth",
    freq: 7.83, // Earth's fundamental atmospheric resonance
    carrier: 200,
    hue: 155, // sea-green
    swellSeconds: 7,
    description:
      "Schumann resonance · the 7.83 Hz electromagnetic standing wave between Earth's surface and ionosphere · measured continuously since Schumann's 1952 prediction. Subjective state: between deep alpha and light theta.",
  },
  {
    key: "wimhof",
    label: "Wim Hof · brisk breath",
    freq: 0, // no binaural · the breath is the protocol
    carrier: 0,
    hue: 15, // sunrise orange
    swellSeconds: 4, // faster swell to match brisker pace
    description:
      "Brisk-breath rhythm · 4s in, 4s out · ocean swell paces the cycle. The full Wim Hof protocol (30 breaths + hold + recovery) is your homework · this mode keeps the rhythm and lets you count. Don't do this driving. Don't do this in water.",
  },
  {
    key: "sleep",
    label: "Sleep · delta wind-down",
    freq: 3,
    carrier: 200,
    hue: 230, // deep indigo
    swellSeconds: 14,
    description:
      "20-minute wind-down to sleep · delta binaural at 3 Hz · long 14-second swell · the deepest pacing. Audio + visual fade to black over the session. Don't drive after. Put the phone away.",
  },
];

const AUTO_STOP_MS = 20 * 60 * 1000;

// ---------------------------------------------------------------------------
// White-noise buffer for the ocean swell · generated once per AudioContext.
// 2 seconds at the context sample rate · then we loop it.
// ---------------------------------------------------------------------------

function createNoiseBuffer(ctx: AudioContext): AudioBuffer {
  const seconds = 2;
  const length = ctx.sampleRate * seconds;
  const buf = ctx.createBuffer(2, length, ctx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const data = buf.getChannelData(ch);
    for (let i = 0; i < length; i++) {
      data[i] = Math.random() * 2 - 1;
    }
  }
  return buf;
}

export function EntrainmentExperience() {
  const [gateAccepted, setGateAccepted] = useState(false);
  const [textOnly, setTextOnly] = useState(false);
  const [mode, setMode] = useState<Mode>("alpha");
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [showBreathing, setShowBreathing] = useState(true);

  // Audio refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const oscLeftRef = useRef<OscillatorNode | null>(null);
  const oscRightRef = useRef<OscillatorNode | null>(null);
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const noiseGainRef = useRef<GainNode | null>(null);
  const noiseFilterRef = useRef<BiquadFilterNode | null>(null);
  const lfoGainRef = useRef<OscillatorNode | null>(null);
  const lfoFilterRef = useRef<OscillatorNode | null>(null);

  // Timing refs
  const startTimeRef = useRef<number | null>(null);
  const tickIntervalRef = useRef<number | null>(null);
  const autoStopTimeoutRef = useRef<number | null>(null);

  // ---- Tier detection ----
  useEffect(() => {
    if (typeof window === "undefined") return;
    const html = document.documentElement;
    if (
      html.classList.contains("tier-lite") ||
      html.classList.contains("lite-mode")
    ) {
      setTextOnly(true);
    }
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) setTextOnly(true);
  }, []);

  // ---- Build the audio graph for a given mode ----
  const startAudio = useCallback((m: Mode) => {
    if (typeof window === "undefined") return;

    if (!audioCtxRef.current) {
      const Ctor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      audioCtxRef.current = new Ctor();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === "suspended") void ctx.resume();

    const cfg = MODES.find((x) => x.key === m)!;

    // Master gain · ramps in over 4s
    const master = ctx.createGain();
    master.gain.setValueAtTime(0, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 4);
    master.connect(ctx.destination);
    masterGainRef.current = master;

    // Binaural lane (skipped in meditation mode)
    if (cfg.freq > 0) {
      const oscL = ctx.createOscillator();
      oscL.type = "sine";
      oscL.frequency.value = cfg.carrier;
      const panL = ctx.createStereoPanner();
      panL.pan.value = -1;
      const gainL = ctx.createGain();
      gainL.gain.value = 0.5;
      oscL.connect(panL).connect(gainL).connect(master);
      oscL.start();
      oscLeftRef.current = oscL;

      const oscR = ctx.createOscillator();
      oscR.type = "sine";
      oscR.frequency.value = cfg.carrier + cfg.freq;
      const panR = ctx.createStereoPanner();
      panR.pan.value = 1;
      const gainR = ctx.createGain();
      gainR.gain.value = 0.5;
      oscR.connect(panR).connect(gainR).connect(master);
      oscR.start();
      oscRightRef.current = oscR;
    }

    // Ocean swell lane · synthesized
    const noise = ctx.createBufferSource();
    noise.buffer = createNoiseBuffer(ctx);
    noise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 700;
    filter.Q.value = 0.5;

    const noiseGain = ctx.createGain();
    // Base gain · meditation mode pumps the ocean louder since there's no binaural
    noiseGain.gain.value = m === "meditation" ? 1.6 : 1.0;

    noise.connect(filter).connect(noiseGain).connect(master);
    noise.start();
    noiseSourceRef.current = noise;
    noiseFilterRef.current = filter;
    noiseGainRef.current = noiseGain;

    // LFO 1 · modulates noise gain to create the swell envelope
    const lfoGain = ctx.createOscillator();
    lfoGain.type = "sine";
    lfoGain.frequency.value = 1 / cfg.swellSeconds; // Hz · one swell per cycle
    const lfoGainAmp = ctx.createGain();
    lfoGainAmp.gain.value = m === "meditation" ? 0.7 : 0.5;
    lfoGain.connect(lfoGainAmp).connect(noiseGain.gain);
    lfoGain.start();
    lfoGainRef.current = lfoGain;

    // LFO 2 · modulates filter cutoff for the wave-crest hiss
    const lfoFilter = ctx.createOscillator();
    lfoFilter.type = "sine";
    lfoFilter.frequency.value = 1 / cfg.swellSeconds;
    const lfoFilterAmp = ctx.createGain();
    lfoFilterAmp.gain.value = 250;
    lfoFilter.connect(lfoFilterAmp).connect(filter.frequency);
    lfoFilter.start();
    lfoFilterRef.current = lfoFilter;
  }, []);

  // ---- Tear down all audio cleanly ----
  const stopAudio = useCallback(() => {
    const master = masterGainRef.current;
    const ctx = audioCtxRef.current;
    if (!master || !ctx) return;
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8);
    window.setTimeout(() => {
      const stop = (n: AudioScheduledSourceNode | null) => {
        if (!n) return;
        try {
          n.stop();
          n.disconnect();
        } catch {
          /* already stopped */
        }
      };
      stop(oscLeftRef.current);
      stop(oscRightRef.current);
      stop(noiseSourceRef.current);
      stop(lfoGainRef.current);
      stop(lfoFilterRef.current);
      try {
        masterGainRef.current?.disconnect();
        noiseFilterRef.current?.disconnect();
        noiseGainRef.current?.disconnect();
      } catch {
        /* already disconnected */
      }
      oscLeftRef.current = null;
      oscRightRef.current = null;
      noiseSourceRef.current = null;
      noiseFilterRef.current = null;
      noiseGainRef.current = null;
      lfoGainRef.current = null;
      lfoFilterRef.current = null;
      masterGainRef.current = null;
    }, 1000);
  }, []);

  // ---- Start / Stop session ----
  const start = useCallback(() => {
    if (!textOnly) startAudio(mode);
    setRunning(true);
    setElapsed(0);
    startTimeRef.current = Date.now();
    tickIntervalRef.current = window.setInterval(() => {
      const s = startTimeRef.current;
      if (s) setElapsed(Math.floor((Date.now() - s) / 1000));
    }, 1000);
    autoStopTimeoutRef.current = window.setTimeout(() => stop(), AUTO_STOP_MS);
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

  useEffect(() => {
    return () => {
      stop();
      try {
        audioCtxRef.current?.close();
      } catch {
        /* already closed */
      }
    };
  }, [stop]);

  // ---- Switch mode · stop + restart cleanly ----
  const switchMode = useCallback(
    (m: Mode) => {
      if (running) {
        stop();
        setMode(m);
        window.setTimeout(() => {
          if (!textOnly) startAudio(m);
          setRunning(true);
          setElapsed(0);
          startTimeRef.current = Date.now();
          tickIntervalRef.current = window.setInterval(() => {
            const s = startTimeRef.current;
            if (s) setElapsed(Math.floor((Date.now() - s) / 1000));
          }, 1000);
          autoStopTimeoutRef.current = window.setTimeout(
            () => stop(),
            AUTO_STOP_MS,
          );
        }, 400);
      } else {
        setMode(m);
      }
    },
    [running, stop, startAudio, textOnly],
  );

  const mm = Math.floor(elapsed / 60).toString().padStart(2, "0");
  const ss = (elapsed % 60).toString().padStart(2, "0");
  const cfg = MODES.find((x) => x.key === mode)!;

  // ---- Safety gate modal ----
  if (!gateAccepted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 px-6">
        <div className="max-w-[640px] border border-[#22F0D5]/30 bg-[#0F1114] p-10 text-[#F4F4F2]">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#22F0D5]">
            § MINDREST · safety + headphones
          </p>
          <h1
            className="mt-4 text-[44px] font-light leading-tight text-[#F4F4F2]"
            style={{ fontFamily: "Newsreader, Georgia, serif" }}
          >
            Tune your brainwaves to the ocean.
          </h1>
          <ul className="mt-6 space-y-3 text-[15px] leading-[1.65] text-[#9CA3AF]">
            <li className="flex gap-3">
              <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#22F0D5]" />
              <span>
                <strong className="text-[#F4F4F2]">Headphones recommended.</strong>{" "}
                The binaural-beat effect only works with stereo separation.
                Speakers will give you a steady tone + ocean swell, but no
                entrainment. Meditation mode works on any output.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF4D4D]" />
              <span>
                <strong className="text-[#F4F4F2]">
                  Photosensitive epilepsy.
                </strong>{" "}
                The ocean rolls slowly · no strobe · no flicker. If you have a
                history of seizures, choose <em>text-only mode</em> below.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF4D4D]" />
              <span>
                <strong className="text-[#F4F4F2]">Don&apos;t drive after.</strong>{" "}
                Theta, delta, and the meditation mode can leave you genuinely
                drowsy. Especially delta.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A55C]" />
              <span>
                <strong className="text-[#F4F4F2]">Not medical advice.</strong>{" "}
                Audiovisual entrainment has EEG evidence but no clinical claim
                is made here. See a clinician for anxiety, depression, PTSD.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A55C]" />
              <span>
                <strong className="text-[#F4F4F2]">Auto-stops at 20 min.</strong>{" "}
                Stop button always visible. Leaving the page ends audio cleanly.
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
              <span>Enter the ocean</span>
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
      className={`mindrest-root fixed inset-0 z-30 flex flex-col overflow-hidden text-[#F4F4F2] ${
        mode === "sleep" && running ? "mindrest-sleep-fade" : ""
      }`}
      data-mode={mode}
      data-running={running ? "1" : "0"}
      style={{
        background: `radial-gradient(ellipse at 50% 30%, hsla(${cfg.hue}, 60%, 16%, 0.9) 0%, #050810 55%, #000000 100%)`,
        transition: "background 1.6s ease-out",
      }}
    >
      {/* Ocean wave visual layer */}
      {!textOnly && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <OceanWaves mode={mode} running={running} />
        </div>
      )}

      {/* Center column */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
        {showBreathing && running && (
          <div
            className="breathing-circle mb-10"
            aria-label="4-7-8 breathing guide"
          />
        )}

        <p
          className="font-mono text-[11px] uppercase tracking-[0.32em]"
          style={{ color: `hsl(${cfg.hue} 70% 70%)` }}
        >
          {cfg.label}
        </p>

        <p
          className="mt-4 max-w-[44ch] text-[19px] leading-[1.55] text-[#E4E6E8]"
          style={{ fontFamily: "Newsreader, Georgia, serif" }}
        >
          {cfg.description}
        </p>

        {running && (
          <p className="mt-8 font-mono text-[14px] uppercase tracking-[0.32em] text-[#7a818a]">
            {mm}:{ss} · auto-stops at 20:00
          </p>
        )}

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {!running ? (
            <button
              type="button"
              onClick={start}
              className="inline-flex items-center gap-2 border-2 px-6 py-3 font-mono text-[12px] uppercase tracking-[0.22em] transition"
              style={{
                borderColor: `hsl(${cfg.hue} 70% 65%)`,
                color: `hsl(${cfg.hue} 70% 75%)`,
                background: `hsla(${cfg.hue}, 70%, 65%, 0.10)`,
              }}
            >
              <span aria-hidden>▶</span>
              <span>Begin session</span>
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
            {showBreathing ? "Hide breath" : "Show breath"}
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
        <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-center gap-2 px-4 py-4">
          {MODES.map((m) => (
            <button
              key={m.key}
              type="button"
              onClick={() => switchMode(m.key)}
              className="inline-flex flex-col items-start border px-4 py-2 transition"
              style={{
                borderColor:
                  m.key === mode ? `hsl(${m.hue} 70% 65%)` : "#1F242B",
                background:
                  m.key === mode ? `hsla(${m.hue}, 70%, 65%, 0.10)` : "transparent",
              }}
            >
              <span
                className="font-mono text-[11px] uppercase tracking-[0.22em]"
                style={{
                  color: m.key === mode ? `hsl(${m.hue} 70% 75%)` : "#9CA3AF",
                }}
              >
                {m.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Scoped CSS */}
      <style jsx>{`
        /* Sleep mode · slow visual + audio fade over 20 minutes ·
           audio fade is the auto-stop · this is the visual companion */
        .mindrest-sleep-fade {
          animation: sleep-fade 1200s linear forwards;
        }
        @keyframes sleep-fade {
          0% { opacity: 1; }
          75% { opacity: 0.5; }
          100% { opacity: 0.08; }
        }
        @media (prefers-reduced-motion: reduce) {
          .mindrest-sleep-fade { animation: none; }
        }
        .breathing-circle {
          width: 140px;
          height: 140px;
          border-radius: 999px;
          background: radial-gradient(
            circle,
            hsla(${cfg.hue}, 70%, 70%, 0.45) 0%,
            hsla(${cfg.hue}, 70%, 70%, 0.06) 60%,
            transparent 100%
          );
          animation: breathe 19s ease-in-out infinite;
        }
        @keyframes breathe {
          0% {
            transform: scale(0.55);
            opacity: 0.5;
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
            transform: scale(0.55);
            opacity: 0.5;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .breathing-circle {
            animation: none;
            transform: scale(0.8);
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
}

// ---------------------------------------------------------------------------
// OceanWaves · 5 layered SVG sine curves at different speeds + amplitudes.
// Each curve translates horizontally via CSS @keyframes · GPU composited.
// Hue locked to active mode · opacity ramps up over 4s on start.
// Built once · animated entirely in CSS · zero JS per frame.
// ---------------------------------------------------------------------------

interface WaveLayer {
  amp: number; // amplitude in svg units
  period: number; // x-period in svg units
  yOffset: number; // vertical position (0-200 in svg space)
  speed: number; // seconds per full translate cycle
  opacity: number;
  strokeWidth: number;
  direction: 1 | -1;
}

const WAVE_LAYERS: WaveLayer[] = [
  { amp: 12, period: 220, yOffset: 60, speed: 32, opacity: 0.18, strokeWidth: 1, direction: 1 },
  { amp: 18, period: 280, yOffset: 95, speed: 26, opacity: 0.32, strokeWidth: 1.2, direction: -1 },
  { amp: 24, period: 340, yOffset: 130, speed: 22, opacity: 0.45, strokeWidth: 1.4, direction: 1 },
  { amp: 32, period: 420, yOffset: 162, speed: 18, opacity: 0.62, strokeWidth: 1.6, direction: -1 },
  { amp: 40, period: 500, yOffset: 190, speed: 14, opacity: 0.85, strokeWidth: 2, direction: 1 },
];

function buildSinePath(layer: WaveLayer, repeats: number = 4): string {
  const totalWidth = layer.period * repeats;
  const step = layer.period / 24;
  let d = `M ${-layer.period} ${layer.yOffset} `;
  for (let x = -layer.period; x <= totalWidth + layer.period; x += step) {
    const y =
      layer.yOffset + Math.sin((x / layer.period) * Math.PI * 2) * layer.amp;
    d += `L ${x.toFixed(1)} ${y.toFixed(2)} `;
  }
  return d;
}

function OceanWaves({ mode, running }: { mode: Mode; running: boolean }) {
  const cfg = MODES.find((x) => x.key === mode)!;
  return (
    <div
      className="ocean-wrapper absolute inset-0"
      data-running={running ? "1" : "0"}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 220"
        preserveAspectRatio="none"
        className="ocean-svg"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "70vh",
        }}
      >
        {WAVE_LAYERS.map((layer, i) => {
          const id = `wave-${i}`;
          return (
            <g key={id} className={`wave-layer wave-layer-${i}`}>
              <path
                d={buildSinePath(layer)}
                fill="none"
                stroke={`hsla(${cfg.hue}, 70%, ${65 - i * 4}%, ${layer.opacity})`}
                strokeWidth={layer.strokeWidth}
                strokeLinecap="round"
              />
            </g>
          );
        })}
      </svg>
      {/* Top fade · keeps text legible against the wave swell */}
      <div
        className="ocean-top-fade pointer-events-none absolute inset-x-0 top-0 h-[40vh]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)",
        }}
      />
      <style jsx>{`
        .ocean-wrapper {
          opacity: 0;
          transition: opacity 4s ease-out;
        }
        .ocean-wrapper[data-running="1"] {
          opacity: 1;
        }
        .wave-layer {
          will-change: transform;
        }
        ${WAVE_LAYERS.map(
          (layer, i) => `
          .wave-layer-${i} {
            animation: wave-${i} ${layer.speed}s linear infinite;
          }
          @keyframes wave-${i} {
            from { transform: translateX(0); }
            to   { transform: translateX(${layer.direction * -layer.period}px); }
          }
        `,
        ).join("\n")}
        @media (prefers-reduced-motion: reduce) {
          ${WAVE_LAYERS.map((_, i) => `.wave-layer-${i} { animation: none; }`).join("\n")}
        }
      `}</style>
    </div>
  );
}
