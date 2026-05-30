"use client";

/**
 * ScrollProgress — top-of-viewport reading progress bar.
 *
 * Pure CSS using animation-timeline: scroll(root block) — no JS event
 * listeners, no scroll handlers. Browser draws the bar by stepping
 * through the keyframe based on document scroll position.
 *
 * Supported in Chrome/Edge 115+ and Safari 18+ as of 2026. Firefox is
 * still working on it — those users get nothing (graceful degradation;
 * the page works fine, just without the visual indicator).
 *
 * Mount on long-form pages — lesson pages, monograph, founder letters.
 * Tiny client cost: a single client component injecting one fixed div +
 * a small <style> block. No useEffect, no state, no event listeners.
 *
 * z-index 60 sits above the sticky lesson nav (z-50) but below modal
 * surfaces if any are added later.
 */
export function ScrollProgress({
  accent = "#22F0D5",
  accentSecondary = "#FFB87A",
}: {
  accent?: string;
  accentSecondary?: string;
}) {
  return (
    <>
      <div
        className="scroll-progress-bar pointer-events-none fixed left-0 top-0 z-[60] h-[3px] w-full origin-left"
        aria-hidden
        style={{
          background: `linear-gradient(90deg, ${accent} 0%, ${accentSecondary} 100%)`,
          transform: "scaleX(0)",
        }}
      />
      <style>{`
        @keyframes scroll-progress-fill {
          0%   { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        .scroll-progress-bar {
          animation: scroll-progress-fill linear forwards;
          animation-timeline: scroll(root block);
          animation-range: 0% 100%;
        }
        @media (prefers-reduced-motion: reduce) {
          .scroll-progress-bar { display: none !important; }
        }
      `}</style>
    </>
  );
}
