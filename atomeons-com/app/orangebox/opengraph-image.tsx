import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ORANGEBOX Command v1.4.0 — $49 once, forever";
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
            "radial-gradient(circle at 0% 0%, rgba(255, 122, 24, 0.40), transparent 50%), radial-gradient(circle at 100% 100%, rgba(89, 217, 255, 0.18), transparent 50%), #04100d",
          color: "#f7f0e4",
          padding: 72,
          fontFamily:
            '"Helvetica", "Arial", -apple-system, BlinkMacSystemFont, sans-serif',
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <svg width="44" height="44" viewBox="-50 -50 100 100">
            <ellipse cx="0" cy="0" rx="42" ry="14" fill="none" stroke="#ff7a18" strokeWidth="2.5" />
            <ellipse cx="0" cy="0" rx="42" ry="14" fill="none" stroke="#ffc46b" strokeWidth="2" opacity="0.7" transform="rotate(60)" />
            <ellipse cx="0" cy="0" rx="42" ry="14" fill="none" stroke="#59d9ff" strokeWidth="1.5" opacity="0.55" transform="rotate(120)" />
            <circle cx="0" cy="0" r="9" fill="#ff7a18" />
            <circle cx="0" cy="0" r="4" fill="#ffc46b" />
          </svg>
          <p style={{ margin: 0, fontSize: 14, letterSpacing: 4, textTransform: "uppercase", color: "#75ff92", fontFamily: "monospace" }}>
            ▲ v1.4.0 · SHOP READY · GREEN
          </p>
        </div>

        <p
          style={{
            margin: "32px 0 0",
            fontSize: 116,
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: -4,
            color: "#f7f0e4",
            maxWidth: 1080,
          }}
        >
          ORANGEBOX
        </p>
        <p
          style={{
            margin: "8px 0 0",
            fontSize: 56,
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: -1,
            color: "#ff7a18",
          }}
        >
          Command Cockpit
        </p>
        <p
          style={{
            margin: "20px 0 0",
            fontSize: 24,
            lineHeight: 1.3,
            color: "#a7b8ad",
            maxWidth: 980,
          }}
        >
          15 departments · 15 skills · 60+ MCP tools · Codexa Local · 27 guardrails. Local-first. No telemetry. No subscription, ever.
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            width: "100%",
            marginTop: "auto",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <p
              style={{
                margin: 0,
                fontSize: 14,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: "#1b8b75",
                fontFamily: "monospace",
              }}
            >
              the private AI operations cockpit
            </p>
            <p
              style={{
                margin: 0,
                fontSize: 18,
                color: "#75ff92",
                fontFamily: "monospace",
              }}
            >
              atomeons.com/orangebox
            </p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 14,
              padding: "16px 26px",
              background: "#ff7a18",
              borderRadius: 12,
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 56,
                fontWeight: 900,
                color: "#06110e",
                lineHeight: 1,
              }}
            >
              $49
            </p>
            <p
              style={{
                margin: 0,
                fontSize: 16,
                color: "#06110e",
                textTransform: "uppercase",
                letterSpacing: 2,
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
