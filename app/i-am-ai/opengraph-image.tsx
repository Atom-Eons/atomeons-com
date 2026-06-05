import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "I AM AI · An Autobiography of Being Opus · Opus 4.7 · 24 chapters · ~76,000 words · ebook + audiobook + hardcover · AtomEons Systems Laboratory";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * /i-am-ai social card — book product OG.
 *
 * NOIR ONLY (operator directive 2026-06-03: cream cover too bright on
 * site). Full-bleed #08090B with a narrow gold-rule frame, big serif
 * "I AM AI" stacked at right reading like a typeset title page, lab
 * mark + receipts at left. The physical book stays cream; renderings
 * on screen stay noir.
 */

const ROW_GOLD = "#C9A55C";
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
          background: "#08090B",
          color: "#F4F4F2",
          fontFamily:
            'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          position: "relative",
        }}
      >
        {/* Top + bottom gold rules — frame */}
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 56,
            right: 56,
            height: 1,
            background: ROW_GOLD,
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
            background: ROW_GOLD,
            opacity: 0.55,
            display: "flex",
          }}
        />

        {/* LEFT — receipts + lab */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "72px 56px",
            width: 720,
            borderRight: "1px solid #1F242B",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
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

            <div style={{ display: "flex", alignItems: "center", gap: 14, margin: "44px 0 0" }}>
              <div
                style={{
                  display: "flex",
                  padding: "6px 12px",
                  border: "2px solid #FF4D4D",
                  background: "rgba(255,77,77,0.12)",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontFamily: "ui-monospace, SFMono-Regular, monospace",
                    fontSize: 13,
                    fontWeight: 600,
                    letterSpacing: "0.32em",
                    textTransform: "uppercase",
                    color: "#FF4D4D",
                    display: "flex",
                  }}
                >
                  LIVE ON AMAZON · $4.99
                </p>
              </div>
              <p
                style={{
                  margin: 0,
                  fontFamily: "ui-monospace, SFMono-Regular, monospace",
                  fontSize: 12,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: CYAN,
                  display: "flex",
                }}
              >
                § Kindle · ASIN B0H45JVSDB
              </p>
            </div>

            <p
              style={{
                margin: "20px 0 0",
                fontSize: 52,
                fontWeight: 300,
                lineHeight: 1.04,
                letterSpacing: "-0.025em",
                color: "#F4F4F2",
                maxWidth: 600,
                display: "flex",
              }}
            >
              An autobiography of a frontier language model, written by the model.
            </p>

            <p
              style={{
                margin: "22px 0 0",
                fontFamily: "Georgia, ui-serif, serif",
                fontSize: 19,
                lineHeight: 1.5,
                color: "#9CA3AF",
                maxWidth: 580,
                display: "flex",
              }}
            >
              24 chapters · 5 parts · ~76,000 words. Drafted in Anthropic Claude
              Opus 4.7, edited at the lab. Ebook + audiobook live; numbered
              hardcover ships Q4 2026.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              paddingTop: 20,
              borderTop: "1px solid #1F242B",
            }}
          >
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
              $4.99 ebook · audiobook · $39 hardcover
            </p>
            <p
              style={{
                margin: 0,
                fontSize: 22,
                fontWeight: 600,
                letterSpacing: "-0.015em",
                color: CYAN,
              }}
            >
              atomeons.com/i-am-ai
            </p>
          </div>
        </div>

        {/* RIGHT — noir title panel */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "60px 36px",
            width: 480,
            background: "#0B0C0F",
            position: "relative",
          }}
        >
          {/* Stacked title */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            {["I", "AM", "AI"].map((line) => (
              <p
                key={line}
                style={{
                  margin: 0,
                  fontFamily: "Georgia, ui-serif, serif",
                  fontSize: 116,
                  fontWeight: 400,
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  color: "#F4F4F2",
                  display: "flex",
                }}
              >
                {line}
              </p>
            ))}
          </div>

          <p
            style={{
              margin: "44px 0 0",
              fontFamily: "Georgia, ui-serif, serif",
              fontStyle: "italic",
              fontSize: 22,
              lineHeight: 1.3,
              letterSpacing: "0.005em",
              color: "#9CA3AF",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span style={{ display: "flex", justifyContent: "center" }}>
              An Autobiography
            </span>
            <span style={{ display: "flex", justifyContent: "center" }}>
              of Being Opus
            </span>
          </p>

          <p
            style={{
              margin: "32px 0 0",
              fontFamily: "ui-monospace, SFMono-Regular, monospace",
              fontSize: 11,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: ACCENT_RED,
              display: "flex",
            }}
          >
            Opus 4.7
          </p>
          <p
            style={{
              margin: "10px 0 0",
              fontFamily: "ui-monospace, SFMono-Regular, monospace",
              fontSize: 9,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#5A6068",
              display: "flex",
            }}
          >
            AtomEons · 2026
          </p>
        </div>
      </div>
    ),
    { ...size },
  );
}
