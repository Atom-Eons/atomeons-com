"use client";

import { useEffect, useRef, useState } from "react";

/**
 * CyberMontage — slot for the 12-second "What Cyberwar Looks Like" ad.
 *
 * Operator directive 2026-06-03 · Concept 2.
 *
 * Pairs:
 *  - public/video/cyber-montage.mp4 (5 cuts × 2.4s, Veo-generated)
 *  - public/audio/cyber-narration.mp3 (ElevenLabs Brian voiceover)
 *
 * Behavior:
 *  - On /learn/cyber, sits above the static CyberHeroImage and replaces it
 *    when both video + audio exist
 *  - Video autoplays muted on mount; audio plays in sync from first user
 *    gesture (browser autoplay policy)
 *  - "Play with sound" button overlay if user wants the voiceover
 *  - Loops video continuously; audio plays once per user-initiated start
 *  - Honors prefers-reduced-motion (autoplay disabled, shows static first frame
 *    plus the existing CyberHeroImage fallback)
 */

export function CyberMontage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [available, setAvailable] = useState<boolean | null>(null);
  const [withSound, setWithSound] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/video/cyber-montage.mp4", { method: "HEAD" }).then((r) => r.ok),
      fetch("/audio/cyber-narration.mp3", { method: "HEAD" }).then((r) => r.ok),
    ])
      .then(([v, a]) => setAvailable(v && a))
      .catch(() => setAvailable(false));
  }, []);

  useEffect(() => {
    if (!available) return;
    const v = videoRef.current;
    if (!v) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      v.pause();
      return;
    }
    v.muted = true;
    void v.play().catch(() => {});
  }, [available]);

  function playWithSound() {
    setWithSound(true);
    const v = videoRef.current;
    const a = audioRef.current;
    if (!v || !a) return;
    v.currentTime = 0;
    a.currentTime = 0;
    a.volume = 1.0;
    void a.play().catch(() => {});
    void v.play().catch(() => {});
  }

  if (available === null) return null;
  if (available === false) return null; // no assets → CyberHeroImage carries

  return (
    <div className="relative w-full overflow-hidden border-b border-[#1A2225]" style={{ aspectRatio: "16 / 9", maxHeight: "56vh" }}>
      <video
        ref={videoRef}
        src="/video/cyber-montage.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-label="What cyberwar looks like — a 12-second visual montage"
        className="h-full w-full object-cover"
      />
      <audio
        ref={audioRef}
        src="/audio/cyber-narration.mp3"
        preload="auto"
        aria-hidden
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/30 to-black"
      />
      {!withSound && (
        <button
          type="button"
          onClick={playWithSound}
          className="absolute bottom-5 right-5 inline-flex items-center gap-2 rounded-full border border-[#22F0D5]/40 bg-black/60 px-4 py-2 text-[12px] font-medium text-[#22F0D5] backdrop-blur-sm transition-colors hover:bg-[#22F0D5]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22F0D5]/40"
        >
          <svg aria-hidden width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <path d="M15.54 8.46a5 5 0 010 7.07" />
            <path d="M19.07 4.93a10 10 0 010 14.14" />
          </svg>
          Play with sound
        </button>
      )}
    </div>
  );
}
