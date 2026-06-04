import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "The Hottest Supermodels of May 2026 · AtomEons reasoning rankings · real benchmarks + filtered sentiment · no marketing";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * /supermodels OG — fashion-magazine cover stamp on noir.
 *
 * Big red HOT pip top-left, big serif "HOTTEST SUPERMODELS · MAY 2026"
 * mid, receipts strip at the bottom listing the four leaderboards
 * synthesized. Lab Æ + URL pinned to corners.
 */

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#08090B",
          color: "#F4F4F2",
          fontFamily:
            'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          padding: "56px 72px",
          position: "relative",
        }}
      >
        {/* top row — lab mark + hot stamp */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
            <p
              style={{
                margin: 0,
                fontSize: 24,
                fontWeight: 700,
                letterSpacing: "-0.04em",
                color: "#F4F4F2",
              }}
            >
              Æ
            </p>
            <p
              style={{
                margin: 0,
                fontSize: 12,
                fontWeight: 540,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#9CA3AF",
              }}
            >
              ATOMEONS · SYSTEMS LABORATORY
            </p>
          </div>
          <div
            style={{
              display: "flex",
              padding: "8px 14px",
              border: "2px solid #FF4D4D",
              background: "rgba(255,77,77,0.08)",
            }}
          >
            <p
              style={{
                margin: 0,
                fontFamily: "ui-monospace, SFMono-Regular, monospace",
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "#FF4D4D",
                display: "flex",
              }}
            >
              HOT · MAY 2026
            </p>
          </div>
        </div>

        {/* headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 64,
            flex: 1,
            justifyContent: "center",
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: "ui-monospace, SFMono-Regular, monospace",
              fontSize: 14,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "#22F0D5",
              display: "flex",
            }}
          >
            § The reasoning rankings · issue 01
          </p>
          <p
            style={{
              margin: "20px 0 0",
              fontFamily: "Georgia, ui-serif, serif",
              fontSize: 96,
              fontWeight: 300,
              lineHeight: 0.98,
              letterSpacing: "-0.04em",
              color: "#F4F4F2",
              maxWidth: 1000,
              display: "flex",
            }}
          >
            The hottest supermodels of
          </p>
          <p
            style={{
              margin: "8px 0 0",
              fontFamily: "Georgia, ui-serif, serif",
              fontSize: 96,
              fontWeight: 300,
              lineHeight: 0.98,
              letterSpacing: "-0.04em",
              color: "#FF4D4D",
              display: "flex",
            }}
          >
            May 2026.
          </p>
          <p
            style={{
              margin: "28px 0 0",
              fontFamily: "Georgia, ui-serif, serif",
              fontSize: 22,
              lineHeight: 1.45,
              color: "#9CA3AF",
              maxWidth: 980,
              display: "flex",
            }}
          >
            Real benchmarks. Real user sentiment, filtered. No vendor decks,
            no paid threads, no demo videos. Twelve houses ranked against
            four independent public leaderboards.
          </p>
        </div>

        {/* receipts strip */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            paddingTop: 20,
            borderTop: "1px solid #1F242B",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <p
              style={{
                margin: 0,
                fontFamily: "ui-monospace, SFMono-Regular, monospace",
                fontSize: 11,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "#5A6068",
              }}
            >
              LMArena · HLE (Scale) · Aider Polyglot · Artificial Analysis
            </p>
            <p
              style={{
                margin: 0,
                fontSize: 22,
                fontWeight: 600,
                letterSpacing: "-0.015em",
                color: "#22F0D5",
              }}
            >
              atomeons.com/supermodels
            </p>
          </div>
          <p
            style={{
              margin: 0,
              fontFamily: "ui-monospace, SFMono-Regular, monospace",
              fontSize: 11,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#5A6068",
              display: "flex",
            }}
          >
            Cutoff · 2026-06-03
          </p>
        </div>
      </div>
    ),
    { ...size },
  );
}
