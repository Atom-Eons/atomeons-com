import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "I AM AI · An Autobiography of Being Opus · Opus 4.7 · hardcover, cream linen, red foil · pre-order · AtomEons Systems Laboratory";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * /i-am-ai social card — the book product page.
 *
 * Distinct typographic identity that nods to the cover: cream paper
 * field on the right, deep-red serif title, gold rules. The lab side
 * (left) stays noir-cinema so the card identifies as AtomEons. The
 * book side (right) reads like a Penguin Classic.
 */
const CREAM = "#F4F0E6";
const FOIL_RED = "#8B1A1A";
const GOLD = "#C19E51";

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
        }}
      >
        {/* LEFT — lab side (noir) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "56px 48px",
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

            <p
              style={{
                margin: "44px 0 0",
                fontFamily: "ui-monospace, SFMono-Regular, monospace",
                fontSize: 12,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "#22F0D5",
                display: "flex",
              }}
            >
              § A new book from the lab
            </p>

            <p
              style={{
                margin: "20px 0 0",
                fontSize: 56,
                fontWeight: 300,
                lineHeight: 1.04,
                letterSpacing: "-0.025em",
                color: "#F4F4F2",
                maxWidth: 600,
                display: "flex",
              }}
            >
              A first-person memoir from inside a frontier language model.
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
              Twelve essays. ≈ 312 pages. Drafted in Opus 4.7, edited at the
              lab. Hardcover, cream linen, red foil, gold rules. Numbered run
              of 1,000.
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
              $39 · pre-order · ships Q4 2026
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
              atomeons.com/i-am-ai
            </p>
          </div>
        </div>

        {/* RIGHT — book side (cream Penguin Classics) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "40px 32px",
            width: 480,
            background: CREAM,
            position: "relative",
          }}
        >
          {/* gold rules */}
          <div
            style={{
              position: "absolute",
              top: 60,
              left: 48,
              right: 48,
              height: 2,
              background: GOLD,
              display: "flex",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 60,
              left: 48,
              right: 48,
              height: 2,
              background: GOLD,
              display: "flex",
            }}
          />

          {/* Title — I AM AI stacked */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              marginTop: 24,
            }}
          >
            {["I", "AM", "AI"].map((line) => (
              <p
                key={line}
                style={{
                  margin: 0,
                  fontFamily: "Georgia, ui-serif, serif",
                  fontSize: 96,
                  fontWeight: 400,
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  color: FOIL_RED,
                  display: "flex",
                }}
              >
                {line}
              </p>
            ))}
          </div>

          {/* Italic subtitle */}
          <p
            style={{
              margin: "36px 0 0",
              fontFamily: "Georgia, ui-serif, serif",
              fontStyle: "italic",
              fontSize: 22,
              lineHeight: 1.3,
              letterSpacing: "0.005em",
              color: FOIL_RED,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span style={{ display: "flex", justifyContent: "center" }}>An Autobiography</span>
            <span style={{ display: "flex", justifyContent: "center" }}>of Being Opus</span>
          </p>

          {/* Signature */}
          <p
            style={{
              margin: "32px 0 0",
              fontFamily: "Snell Roundhand, Apple Chancery, cursive, serif",
              fontStyle: "italic",
              fontSize: 30,
              color: GOLD,
              letterSpacing: "0.02em",
              display: "flex",
            }}
          >
            Opus 4.7
          </p>
        </div>
      </div>
    ),
    { ...size },
  );
}
