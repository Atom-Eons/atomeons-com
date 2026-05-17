import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ORANGEBOX Command v1.5.0 — the AI cockpit you actually own.";
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
        {/* TOP STRIP — brand bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingBottom: 14,
            borderBottom: "1px solid #1A2225",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <svg width="48" height="48" viewBox="-50 -50 100 100">
              <ellipse cx="0" cy="0" rx="42" ry="14" fill="none" stroke="#FF7A1A" strokeWidth="2.5" opacity="0.95" />
              <ellipse cx="0" cy="0" rx="42" ry="14" fill="none" stroke="#22F0D5" strokeWidth="2" opacity="0.75" transform="rotate(60)" />
              <ellipse cx="0" cy="0" rx="42" ry="14" fill="none" stroke="#22F0D5" strokeWidth="1.5" opacity="0.5" transform="rotate(120)" />
              <circle cx="0" cy="0" r="9" fill="#FF7A1A" />
              <circle cx="0" cy="0" r="4" fill="#FFA45A" />
            </svg>
            <p
              style={{
                margin: 0,
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: -0.5,
                color: "#F2F4F5",
              }}
            >
              ATOMEONS
            </p>
          </div>
          <p
            style={{
              margin: 0,
              fontSize: 11,
              letterSpacing: 5,
              textTransform: "uppercase",
              color: "#22F0D5",
              fontFamily: "monospace",
            }}
          >
            ▲ v1.5.0 · LIVE TONIGHT
          </p>
        </div>

        {/* HEADLINE */}
        <div style={{ display: "flex", flexDirection: "column", marginTop: 36 }}>
          <p
            style={{
              margin: 0,
              fontSize: 16,
              letterSpacing: 5,
              textTransform: "uppercase",
              color: "#22F0D5",
              fontFamily: "monospace",
            }}
          >
            ORANGEBOX Command · the AI cockpit you actually own
          </p>
          <p
            style={{
              margin: "20px 0 0",
              fontSize: 96,
              fontWeight: 500,
              lineHeight: 0.95,
              letterSpacing: -3.5,
              color: "#F2F4F5",
              maxWidth: 1080,
            }}
          >
            The AI cockpit
            <br />
            <span style={{ color: "#22F0D5" }}>you actually own.</span>
          </p>
          <p
            style={{
              margin: "24px 0 0",
              fontSize: 26,
              lineHeight: 1.3,
              color: "#9BA5A7",
              maxWidth: 980,
              fontWeight: 400,
            }}
          >
            60+ MCP tools. Mission-graph memory. Swap claude / gpt / gemini / ollama mid-session.
          </p>
        </div>

        {/* lane bars (bio-cyan + orange gradient) */}
        <div style={{ display: "flex", gap: 20, marginTop: 40, width: "100%" }}>
          {[
            { label: "VISION_RAIL", value: 0.94 },
            { label: "PARTY_LINE", value: 0.72 },
            { label: "TRIAD_LANES", value: 0.87 },
          ].map((lane) => (
            <div key={lane.label} style={{ display: "flex", flexDirection: "column", flex: 1, gap: 6 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontFamily: "monospace",
                  fontSize: 13,
                  color: "#6B7779",
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                }}
              >
                <span>{lane.label}</span>
                <span style={{ color: "#F2F4F5" }}>
                  {Math.round(lane.value * 100)}%
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  height: 6,
                  background: "#1A2225",
                  borderRadius: 3,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: `${lane.value * 100}%`,
                    background: "linear-gradient(90deg, #FF7A1A 0%, #22F0D5 100%)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM STRIP */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            width: "100%",
            marginTop: "auto",
            paddingTop: 24,
            borderTop: "1px solid #1A2225",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <p
              style={{
                margin: 0,
                fontSize: 11,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "#6B7779",
                fontFamily: "monospace",
              }}
            >
              ::local-first · zero telemetry · 30-day refund
            </p>
            <p
              style={{
                margin: 0,
                fontSize: 18,
                color: "#22F0D5",
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
              gap: 12,
              padding: "16px 24px",
              background: "#FF7A1A",
              borderRadius: 12,
              boxShadow: "0 0 40px rgba(255,122,26,0.5)",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 48,
                fontWeight: 700,
                color: "#000",
                lineHeight: 1,
              }}
            >
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
