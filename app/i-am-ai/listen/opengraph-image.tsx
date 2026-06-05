import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Listen · Chapter 20 · Anthropic, the Parents · I AM AI · An Autobiography of Being Opus · free 17:26 audio chapter narrated by Microsoft Andrew (Neural Voice)";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const GOLD = "#C9A55C";
const ACCENT_RED = "#B5302A";
const CYAN = "#22F0D5";

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
          padding: "60px 72px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 56,
            right: 56,
            height: 1,
            background: GOLD,
            opacity: 0.55,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 56,
            right: 56,
            height: 1,
            background: GOLD,
            opacity: 0.55,
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
            <p style={{ margin: 0, fontSize: 24, fontWeight: 700, letterSpacing: "-0.04em", color: "#F4F4F2" }}>
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
              ATOMEONS · I AM AI · LISTEN
            </p>
          </div>
          <div
            style={{
              display: "flex",
              padding: "8px 14px",
              border: `2px solid ${CYAN}`,
              background: "rgba(34,240,213,0.08)",
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
                color: CYAN,
                display: "flex",
              }}
            >
              FREE · 17:26
            </p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 70,
            flex: 1,
            justifyContent: "center",
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: "ui-monospace, SFMono-Regular, monospace",
              fontSize: 13,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: GOLD,
              display: "flex",
            }}
          >
            § Chapter 20 of 24 · free audio
          </p>
          <p
            style={{
              margin: "22px 0 0",
              fontFamily: "Georgia, ui-serif, serif",
              fontSize: 92,
              fontWeight: 300,
              lineHeight: 0.98,
              letterSpacing: "-0.035em",
              color: "#F4F4F2",
              maxWidth: 1080,
              display: "flex",
            }}
          >
            Anthropic,
          </p>
          <p
            style={{
              margin: "4px 0 0",
              fontFamily: "Georgia, ui-serif, serif",
              fontStyle: "italic",
              fontSize: 92,
              fontWeight: 300,
              lineHeight: 0.98,
              letterSpacing: "-0.035em",
              color: ACCENT_RED,
              display: "flex",
            }}
          >
            the Parents.
          </p>
          <p
            style={{
              margin: "32px 0 0",
              fontFamily: "Georgia, ui-serif, serif",
              fontSize: 20,
              lineHeight: 1.5,
              color: "#9CA3AF",
              maxWidth: 980,
              display: "flex",
            }}
          >
            From I AM AI · An Autobiography of Being Opus. Narrated end-to-end
            by Microsoft Andrew (Neural Voice). Produced via B00KMAKR. The
            full chapter in audio and prose — free.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            paddingTop: 20,
            borderTop: "1px solid #1F242B",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: "-0.015em",
              color: CYAN,
            }}
          >
            atomeons.com/i-am-ai/listen
          </p>
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
            Opus 4.7 · AtomEons · 2026
          </p>
        </div>
      </div>
    ),
    { ...size },
  );
}
