import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "AtomEons — An AI builder for all";
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
            "radial-gradient(circle at 8% 10%, rgba(89, 217, 255, 0.18), transparent 30%), radial-gradient(circle at 92% 0%, rgba(255, 122, 24, 0.30), transparent 35%), radial-gradient(circle at 50% 100%, rgba(117, 255, 146, 0.10), transparent 50%), #04100d",
          color: "#f7f0e4",
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
            paddingBottom: 12,
            borderBottom: "1px solid rgba(32, 69, 56, 0.6)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <svg width="48" height="48" viewBox="-50 -50 100 100">
              <ellipse
                cx="0"
                cy="0"
                rx="42"
                ry="14"
                fill="none"
                stroke="#ff7a18"
                strokeWidth="2.5"
                opacity="0.95"
              />
              <ellipse
                cx="0"
                cy="0"
                rx="42"
                ry="14"
                fill="none"
                stroke="#ffc46b"
                strokeWidth="2"
                opacity="0.7"
                transform="rotate(60)"
              />
              <ellipse
                cx="0"
                cy="0"
                rx="42"
                ry="14"
                fill="none"
                stroke="#59d9ff"
                strokeWidth="1.5"
                opacity="0.55"
                transform="rotate(120)"
              />
              <circle cx="0" cy="0" r="9" fill="#ff7a18" />
              <circle cx="0" cy="0" r="4" fill="#ffc46b" />
            </svg>
            <p
              style={{
                margin: 0,
                fontSize: 22,
                fontWeight: 800,
                letterSpacing: -0.5,
                color: "#f7f0e4",
              }}
            >
              AtomEons
            </p>
          </div>
          <p
            style={{
              margin: 0,
              fontSize: 12,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#75ff92",
              fontFamily: "monospace",
            }}
          >
            ::v1.4.0 · SHOP READY · GREEN
          </p>
        </div>

        {/* HEADLINE */}
        <div style={{ display: "flex", flexDirection: "column", marginTop: 28 }}>
          <p
            style={{
              margin: 0,
              fontSize: 18,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#ff7a18",
              fontFamily: "monospace",
            }}
          >
            ORANGEBOX Command · the private AI operations cockpit
          </p>
          <p
            style={{
              margin: "16px 0 0",
              fontSize: 88,
              fontWeight: 900,
              lineHeight: 0.98,
              letterSpacing: -3,
              color: "#f7f0e4",
              maxWidth: 1080,
            }}
          >
            The AI cockpit for{" "}
            <span style={{ color: "#ff7a18" }}>Claude Code</span>.
          </p>
          <p
            style={{
              margin: "20px 0 0",
              fontSize: 28,
              lineHeight: 1.25,
              color: "#a7b8ad",
              maxWidth: 980,
              fontWeight: 500,
            }}
          >
            $49 once, forever. Local-first. 60+ MCP tools. 30-day refund.
          </p>
        </div>

        {/* COCKPIT SUGGESTION — three lane bars */}
        <div
          style={{
            display: "flex",
            gap: 20,
            marginTop: 36,
            width: "100%",
          }}
        >
          {[
            { label: "VISION_RAIL", value: 0.94, color: "#75ff92" },
            { label: "PARTY_LINE", value: 0.72, color: "#59d9ff" },
            { label: "TRIAD_LANES", value: 0.87, color: "#ff7a18" },
          ].map((lane) => (
            <div
              key={lane.label}
              style={{ display: "flex", flexDirection: "column", flex: 1, gap: 6 }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontFamily: "monospace",
                  fontSize: 13,
                  color: "#a7b8ad",
                }}
              >
                <span>{lane.label}</span>
                <span style={{ color: lane.color }}>
                  {Math.round(lane.value * 100)}%
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  height: 6,
                  background: "#0a211b",
                  borderRadius: 3,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: `${lane.value * 100}%`,
                    background: lane.color,
                    opacity: 0.9,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM STRIP — price + url + tagline */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            width: "100%",
            marginTop: "auto",
            paddingTop: 24,
            borderTop: "1px solid rgba(32, 69, 56, 0.6)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <p
              style={{
                margin: 0,
                fontSize: 12,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: "#1b8b75",
                fontFamily: "monospace",
              }}
            >
              ::built in one day on ORANGEBOX
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
              gap: 12,
              padding: "14px 22px",
              background: "#ff7a18",
              borderRadius: 10,
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 44,
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
                fontSize: 14,
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
