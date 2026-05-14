import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "AtomEons — Ship real projects through AI";
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
            "radial-gradient(circle at 12% 18%, rgba(89, 217, 255, 0.18), transparent 26%), radial-gradient(circle at 88% 0%, rgba(255, 122, 24, 0.18), transparent 28%), #04100d",
          color: "#f7f0e4",
          padding: 80,
          fontFamily:
            '"Helvetica", "Arial", -apple-system, BlinkMacSystemFont, sans-serif',
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 56 }}
        >
          <svg width="64" height="64" viewBox="-50 -50 100 100">
            <ellipse
              cx="0"
              cy="0"
              rx="42"
              ry="14"
              fill="none"
              stroke="#ff7a18"
              strokeWidth="2"
              opacity="0.9"
            />
            <ellipse
              cx="0"
              cy="0"
              rx="42"
              ry="14"
              fill="none"
              stroke="#ffc46b"
              strokeWidth="1.8"
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
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p
              style={{
                margin: 0,
                fontSize: 14,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "#a7b8ad",
              }}
            >
              Software · Books · Apps · LLMs
            </p>
            <p
              style={{
                margin: 0,
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: -0.5,
              }}
            >
              AtomEons
            </p>
          </div>
        </div>

        <p
          style={{
            margin: 0,
            fontSize: 78,
            fontWeight: 900,
            lineHeight: 1.04,
            letterSpacing: -2,
            color: "#f7f0e4",
            maxWidth: 980,
          }}
        >
          Built in one day on{" "}
          <span style={{ color: "#ff7a18" }}>ORANGEBOX</span>.
        </p>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 24,
              color: "#a7b8ad",
            }}
          >
            ORANGEBOX · private command cockpit · $49 one-time
          </p>
          <p
            style={{
              margin: 0,
              fontSize: 18,
              color: "#75ff92",
              fontFamily: "monospace",
            }}
          >
            atomeons.com
          </p>
        </div>
      </div>
    ),
    { ...size },
  );
}
