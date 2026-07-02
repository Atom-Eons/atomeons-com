/**
 * app/loading.tsx · Wave 145l · 2026-07-02
 *
 * Route-level loading UI. Next.js file convention: while a server
 * component fetches, this renders in the segment's slot. Prevents the
 * blank-frame gap between navigation start and page hydration.
 *
 * Minimal by design: a thin cyan progress bar at the top edge plus a
 * mono status line. No heavy assets, no font dependencies, no CSS
 * class-name churn. Renders identically even if globals.css is still
 * downloading.
 */
export default function Loading() {
  return (
    <div
      aria-live="polite"
      aria-busy="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 40,
        pointerEvents: "none",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-start",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background:
            "linear-gradient(90deg, transparent 0%, #22F0D5 50%, transparent 100%)",
          backgroundSize: "200% 100%",
          animation: "aeLoadingBar 1.2s linear infinite",
        }}
      />
      <p
        style={{
          margin: "20px 24px",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          fontSize: 11,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: "#22F0D5",
        }}
      >
        ::loading
      </p>
      <style>{`
        @keyframes aeLoadingBar {
          0%   { background-position: -100% 0; }
          100% { background-position: 200% 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          [aria-busy="true"] > div:first-child {
            animation: none !important;
            background: #22F0D5 !important;
          }
        }
      `}</style>
    </div>
  );
}
