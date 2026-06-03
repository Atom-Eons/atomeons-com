"use client";

import { useEffect, useRef, useState } from "react";

/**
 * HomepageReveal — slot for the "Variable-Weight Reveal" homepage ad video.
 *
 * Operator directive 2026-06-03 · Concept 3.
 *
 * Behavior:
 *  - When public/video/homepage-reveal.mp4 exists, autoplays it muted in a
 *    loop above the photo mosaic on /
 *  - When the file doesn't exist (404), falls back gracefully to the CSS
 *    Variable-Weight Reveal headline that's already there
 *  - Honors prefers-reduced-motion (autoplay disabled, shows static frame)
 *  - 16:9 aspect ratio, full-bleed, max-h-[88vh]
 *
 * Used in app/page.tsx replacing the static hero image when the file is
 * present. This component runs a HEAD probe on the video file before
 * rendering anything; if the file isn't there it returns null and the
 * existing hero pattern carries.
 */

export function HomepageReveal() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [available, setAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/video/homepage-reveal.mp4", { method: "HEAD" })
      .then((r) => setAvailable(r.ok))
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

  if (available === null) return null; // probing
  if (available === false) return null; // no video → existing hero carries

  return (
    <div className="absolute inset-0 z-[1] overflow-hidden">
      <video
        ref={videoRef}
        src="/video/homepage-reveal.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden
        className="h-full w-full object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/85"
      />
    </div>
  );
}
