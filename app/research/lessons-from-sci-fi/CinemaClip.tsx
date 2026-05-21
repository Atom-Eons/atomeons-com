"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * CinemaClip — facade-pattern YouTube embed in old-Vimeo aesthetic.
 *
 * The operator's directive (2026-05-21): "embeded youtube clips real clean
 * how vimeo used to look on a site just sharp no tools but play and sound."
 *
 * Behavior:
 *  - Default state: shows the production still (16:10) with a centered
 *    play button. No YouTube branding, no thumbnail iframe overhead.
 *  - On click: replaces the poster with a youtube-nocookie iframe carrying
 *    autoplay=1, modestbranding=1, rel=0, iv_load_policy=3, controls=1,
 *    showinfo=0, fs=1, playsinline=1. Cleanest possible YouTube playback.
 *  - When videoId is absent or marked "todo", the play button opens a
 *    YouTube search in a new tab pre-filled with the scene name + film
 *    year. This lets the page ship gracefully before every ID is
 *    hand-verified, and remains useful as a research surface.
 *
 * Privacy: youtube-nocookie.com does not drop tracking cookies until
 * the user actually plays the clip. The facade pattern means YouTube
 * sees zero traffic from anyone who just reads the page without
 * pressing play.
 *
 * Anatomy reference (old Vimeo 2010s): centered triangle play glyph,
 * cyan ring on hover, faint vignette to anchor the eye, duration chip
 * lower-right, scene title lower-left. No "Watch on YouTube" overlay.
 */

export type CinemaClipProps = {
  scene: string;
  film: string;
  year: number;
  duration: string;
  posterSrc: string;
  posterAlt: string;
  videoId?: string | null;
  searchQuery?: string;
};

export function CinemaClip({
  scene,
  film,
  year,
  duration,
  posterSrc,
  posterAlt,
  videoId,
  searchQuery,
}: CinemaClipProps) {
  const [playing, setPlaying] = useState(false);

  const youtubeSearch = `https://www.youtube.com/results?search_query=${encodeURIComponent(
    searchQuery || `${film} ${year} ${scene}`,
  )}`;

  const handleClick = () => {
    if (videoId) {
      setPlaying(true);
    } else {
      window.open(youtubeSearch, "_blank", "noopener");
    }
  };

  return (
    <figure className="group relative overflow-hidden rounded-2xl border border-[#1A2225] bg-[#0A0F11]">
      <div className="relative aspect-[16/10] w-full bg-black">
        {playing && videoId ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3&showinfo=0&fs=1&playsinline=1`}
            title={`${film} (${year}) — ${scene}`}
            className="absolute inset-0 h-full w-full"
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={handleClick}
            aria-label={`Play ${scene} from ${film} (${year})`}
            className="absolute inset-0 block h-full w-full cursor-pointer"
          >
            {/* poster */}
            <Image
              src={posterSrc}
              alt={posterAlt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
            {/* subtle vignette */}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30 transition-opacity group-hover:from-black/60"
            />
            {/* play button — old Vimeo triangle in a cyan ring */}
            <span
              aria-hidden
              className="absolute left-1/2 top-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white/80 bg-black/40 backdrop-blur-sm transition-all group-hover:size-24 group-hover:border-[#22F0D5] group-hover:bg-black/55 md:size-24 md:group-hover:size-28"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="ml-1.5 size-8 text-white transition-colors group-hover:text-[#22F0D5] md:size-10"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            {/* scene label, lower-left */}
            <span className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.32em] text-white/90 md:bottom-5 md:left-6">
              {scene}
            </span>
            {/* film + year, lower-left below scene */}
            <span className="absolute bottom-10 left-4 font-mono text-[10px] uppercase tracking-[0.22em] text-white/55 md:bottom-12 md:left-6">
              {film} · {year}
            </span>
            {/* duration chip, lower-right */}
            <span className="absolute bottom-4 right-4 rounded-md border border-white/20 bg-black/55 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-white/85 backdrop-blur-sm md:bottom-5 md:right-6">
              {duration}
            </span>
            {/* "not yet linked" hint if no videoId */}
            {!videoId && (
              <span className="absolute right-4 top-4 rounded-md border border-[#FFB87A]/40 bg-[#FFB87A]/10 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.28em] text-[#FFB87A] backdrop-blur-sm md:right-6 md:top-5">
                search on yt ↗
              </span>
            )}
          </button>
        )}
      </div>
    </figure>
  );
}
