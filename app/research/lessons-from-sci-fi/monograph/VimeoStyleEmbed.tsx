"use client";

import { useState } from "react";

/**
 * VimeoStyleEmbed — minimalist YouTube wrapper.
 *
 * Operator brief: "real clean how vimeo used to look on a site just sharp
 * no tools but play and sound etc."
 *
 * Implementation:
 *   1. Renders a click-to-load thumbnail (NEVER auto-loads the iframe).
 *      This keeps the page light and matches Vimeo's old behavior where
 *      a frame sat dormant until you clicked it.
 *   2. On click, swaps the thumbnail for a YouTube iframe with these
 *      params stripped to the bone:
 *        controls=1       → play/pause + volume only render visibly
 *        rel=0            → no "related videos" wall at end
 *        modestbranding=1 → minimum YouTube branding
 *        fs=0             → no fullscreen button
 *        iv_load_policy=3 → no annotations
 *        showinfo=0       → no title/uploader overlay
 *        disablekb=1      → no keyboard shortcuts
 *        playsinline=1    → mobile inline playback
 *        autoplay=1       → starts on click since the click IS the gesture
 *
 *   3. Black 8px bezel + slight cyan focus ring on hover. No card chrome.
 *      The video IS the surface.
 *
 *   4. Caption below the player: scene name, year, attribution.
 *      Set off as a tiny lab-ticker style mono line.
 *
 * Copyright posture:
 *   YouTube embeds are the rights-cleared path — the publisher (in this
 *   case, the channel that uploaded the clip) controls whether embedding
 *   is allowed via YouTube's embed-permission flag. We do not host, mirror,
 *   or download any video bytes. If a clip is taken down or its embed
 *   permission is revoked, the player surfaces YouTube's standard
 *   "Video unavailable" message and degrades gracefully.
 *
 *   Operator: swap the `youtubeId` on any clip if a better-licensed
 *   official channel upload becomes available.
 */
export function VimeoStyleEmbed({
  youtubeId,
  title,
  year,
  attribution,
  scene,
  aspectRatio = "16/9",
}: {
  youtubeId: string;
  title: string;
  year: number;
  attribution: string;
  scene: string;
  aspectRatio?: string;
}) {
  const [active, setActive] = useState(false);

  const params = new URLSearchParams({
    autoplay: "1",
    controls: "1",
    rel: "0",
    modestbranding: "1",
    fs: "0",
    iv_load_policy: "3",
    showinfo: "0",
    disablekb: "1",
    playsinline: "1",
  }).toString();

  const embedSrc = `https://www.youtube-nocookie.com/embed/${youtubeId}?${params}`;
  const thumbSrc = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;

  return (
    <figure className="my-12 md:my-16">
      <div
        className="group relative w-full overflow-hidden rounded-lg bg-black ring-1 ring-[#1A2225] transition-shadow duration-300 hover:ring-[#22F0D5]/40 hover:shadow-[0_0_60px_-20px_rgba(34,240,213,0.35)]"
        style={{ aspectRatio }}
      >
        {active ? (
          <iframe
            src={embedSrc}
            title={`${title} (${year}) — ${scene}`}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen={false}
            loading="lazy"
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setActive(true)}
            aria-label={`Play ${scene} from ${title} (${year})`}
            className="absolute inset-0 flex h-full w-full items-center justify-center bg-black"
          >
            {/* Thumbnail */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumbSrc}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-100"
            />
            {/* Vignette to lift the play button against busy thumbs */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"
            />
            {/* Play glyph */}
            <span className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border border-white/50 bg-black/30 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:border-[#22F0D5] group-hover:bg-[#22F0D5]/15 md:h-24 md:w-24">
              <svg
                viewBox="0 0 24 24"
                className="ml-1 h-8 w-8 fill-white transition-colors duration-300 group-hover:fill-[#22F0D5] md:h-10 md:w-10"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            {/* Scene chip — top-left */}
            <span className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.28em] text-white/80 backdrop-blur-md md:left-6 md:top-6">
              <span className="h-1.5 w-1.5 rounded-full bg-[#22F0D5] shadow-[0_0_6px_rgba(34,240,213,0.9)]" />
              ::clip · {year}
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-3 flex flex-col gap-1 md:mt-4 md:flex-row md:items-baseline md:justify-between md:gap-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
          {title} <span className="text-[#6B7779]">·</span> {year}
        </p>
        <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#6B7779]">
          {scene} · {attribution}
        </p>
      </figcaption>
    </figure>
  );
}
