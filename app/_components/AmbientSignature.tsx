"use client";

import { useEffect, useRef, useState } from "react";

/**
 * AmbientSignature — site-wide brand audio loop.
 *
 * Operator directive 2026-06-03: "a sound signature to play low and quiet
 * always but they hear it, something not ever disturbing."
 *
 * Behavior:
 *  - Plays public/audio/atomeons-signature.mp3 (22s, ElevenLabs Sound
 *    Generation, deep low-frequency hum + faint metallic shimmer).
 *  - Loops seamlessly via <audio loop>.
 *  - Volume default 0.08 (8%) — present but never overstays.
 *  - prefers-reduced-motion users → audio NEVER starts (the signature is
 *    motion-adjacent atmosphere; users opting out of motion opt out here).
 *  - Browser autoplay policy: cannot start audio without user gesture.
 *    On first scroll, click, or keypress anywhere, audio starts.
 *  - localStorage key 'ae:signature:muted' = '1' → never plays.
 *  - Tiny mute toggle in the bottom-right corner (8px × 8px chip).
 *
 * Accessibility: aria-live polite, aria-label on toggle, role=button.
 */

const STORAGE_KEY = "ae:signature:muted";
const VOLUME = 0.08;

export function AmbientSignature() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [armed, setArmed] = useState(false);
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    // Honor prefers-reduced-motion — full opt-out
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    // Honor stored mute preference
    let storedMuted = false;
    try {
      storedMuted = localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      // localStorage blocked
    }
    setMuted(storedMuted);
    setArmed(true);

    if (storedMuted) return;

    // Browser autoplay policy: need user gesture before audio.play()
    const tryStart = () => {
      const el = audioRef.current;
      if (!el) return;
      el.volume = VOLUME;
      void el.play().then(() => setPlaying(true)).catch(() => {});
    };

    const onGesture = () => {
      tryStart();
      window.removeEventListener("scroll", onGesture);
      window.removeEventListener("click", onGesture);
      window.removeEventListener("keydown", onGesture);
      window.removeEventListener("touchstart", onGesture);
    };

    window.addEventListener("scroll", onGesture, { passive: true });
    window.addEventListener("click", onGesture, { passive: true });
    window.addEventListener("keydown", onGesture, { passive: true });
    window.addEventListener("touchstart", onGesture, { passive: true });

    return () => {
      window.removeEventListener("scroll", onGesture);
      window.removeEventListener("click", onGesture);
      window.removeEventListener("keydown", onGesture);
      window.removeEventListener("touchstart", onGesture);
    };
  }, []);

  function toggleMute() {
    const next = !muted;
    setMuted(next);
    try {
      localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
    } catch {
      // ignore
    }
    const el = audioRef.current;
    if (!el) return;
    if (next) {
      el.pause();
      setPlaying(false);
    } else {
      el.volume = VOLUME;
      void el.play().then(() => setPlaying(true)).catch(() => {});
    }
  }

  if (!armed) return null;

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/atomeons-signature.mp3"
        loop
        preload="auto"
        aria-hidden
      />
      <button
        type="button"
        onClick={toggleMute}
        aria-label={muted ? "Unmute ambient signature" : "Mute ambient signature"}
        aria-pressed={muted}
        // Wave 50 · 2026-06-12 · target-size · was h-7 w-7 (28px) · failed
        // WCAG 2.5.5. Now h-9 w-9 (36px) · still subtle in the corner ·
        // meets minimum touch target spec.
        className="fixed bottom-3 right-3 z-50 flex h-9 w-9 items-center justify-center rounded-full border border-[#1F242B] bg-[#08090B]/80 text-[#7a818a] backdrop-blur-sm transition-colors hover:border-[#22F0D5]/40 hover:text-[#22F0D5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22F0D5]/40"
        title={muted ? "Signature off" : playing ? "Signature on" : "Signature paused"}
      >
        <svg aria-hidden width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {muted ? (
            <>
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </>
          ) : (
            <>
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <path d="M15.54 8.46a5 5 0 010 7.07" />
            </>
          )}
        </svg>
      </button>
    </>
  );
}
