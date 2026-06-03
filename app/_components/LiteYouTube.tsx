"use client";

import { useState } from "react";

/**
 * LiteYouTube · click-to-load YouTube embed.
 * Renders a static thumbnail until the user clicks · then mounts the iframe.
 * Zero YouTube JS on initial page load · Vercel-cost-safe · respects
 * the operator's no-third-party-tracking posture (no preloading).
 */
export default function LiteYouTube({ id, title }: { id: string; title: string }) {
  const [active, setActive] = useState(false);
  if (active) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );
  }
  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      className="group relative aspect-video w-full overflow-hidden rounded-xl bg-[#0A0F11]"
      aria-label={`Play video: ${title}`}
    >
      <img
        src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
        alt={title}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-opacity group-hover:opacity-90"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-16 w-24 items-center justify-center rounded-xl bg-black/75 transition-transform group-hover:scale-110">
          <svg viewBox="0 0 24 24" className="h-8 w-8 fill-[#22F0D5]"><path d="M8 5v14l11-7z" /></svg>
        </div>
      </div>
    </button>
  );
}
