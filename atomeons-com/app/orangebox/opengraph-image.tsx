import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ORANGEBOX Command v1.5.0 — $49 once, forever";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          background:
            "radial-gradient(70% 55% at 70% 40%, rgba(34,240,213,0.22) 0%, transparent 60%), radial-gradient(50% 40% at 10% 90%, rgba(255,122,26,0.18) 0%, transparent 65%), #000000",
          color: "#F2F4F5",
          padding: 64,
          fontFamily:
            '"Helvetica", "Arial", -apple-system, BlinkMacSystemFont, sans-serif',
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: 14,
            borderBottom: "1px solid #1A2225",
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: "monospace",
              fontSize: 12,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#22F0D5",
            }}
          >
            ATOMEONS · MARCO ISLAND · LIVE
          </p>
          <p
            style={{
              margin: 0,
              fontFamily: "monospace",
              fontSize: 12,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#FF7A1A",
            }}
          >
            ▲ v1.5.0 · LAUNCH
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: 40 }}>
          <p
            style={{
              margin: 0,
              fontFamily: "monospace",
              fontSize: 16,
              letterSpacing: 5,
              textTransform: "uppercase",
              color: "#FF7A1A",
            }}
          >
            ORANGEBOX Command · v1.5.0
          </p>
          <p
            style={{
              margin: "20px 0 0",
              fontSize: 102,
              fontWeight: 500,
              lineHeight: 0.94,
              letterSpacing: -3.5,
              color: "#F2F4F5",
              maxWidth: 1080,
            }}
          >
            Faster.
            <br />
            Smarter.
            <br />
            <span style={{ color: "#22F0D5" }}>Cached.</span>
          </p>
          <p
            style={{
              margin: "26px 0 0",
              fontSize: 26,
              lineHeight: 1.3,
              color: "#9BA5A7",
              maxWidth: 980,
              fontWeight: 400,
            }}
          >
            The AI cockpit for Claude Code · 60+ MCP tools · mission-graph memory · local-first.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginTop: "auto",
            paddingTop: 24,
            borderTop: "1px solid #1A2225",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 20,
              color: "#22F0D5",
              fontFamily: "monospace",
            }}
          >
            atomeons.com/orangebox
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 12,
              padding: "16px 24px",
              background: "#FF7A1A",
              borderRadius: 12,
              boxShadow: "0 0 40px rgba(255,122,26,0.55)",
            }}
          >
            <p style={{ margin: 0, fontSize: 48, fontWeight: 700, color: "#000", lineHeight: 1 }}>
              $49
            </p>
            <p
              style={{
                margin: 0,
                fontSize: 14,
                color: "#000",
                textTransform: "uppercase",
                letterSpacing: 2.5,
                fontWeight: 700,
              }}
            >
              once · forever
            </p>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
