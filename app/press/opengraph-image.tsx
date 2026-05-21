import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "AtomEons Press Kit — instant journalist pack. Boilerplate, founder bio, assets, contact. One operator. One desk.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * /press card — press-desk grade.
 * Asserts the lab is press-ready: copy-pasteable boilerplate, founder bio,
 * one-paragraph pitch, hero asset, direct contact. Lab-grade gradient.
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
          background:
            "radial-gradient(60% 50% at 80% 20%, rgba(34,240,213,0.32) 0%, transparent 60%), radial-gradient(50% 45% at 15% 80%, rgba(255,184,122,0.28) 0%, transparent 65%), #0a1a17",
          color: "#F2F4F5",
          padding: 60,
          fontFamily:
            '"Helvetica", "Arial", -apple-system, BlinkMacSystemFont, sans-serif',
        }}
      >
        {/* TOP STRIP */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: 14,
            borderBottom: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: "monospace",
              fontSize: 12,
              letterSpacing: 5,
              textTransform: "uppercase",
              color: "#22F0D5",
            }}
          >
            ATOMEONS · PRESS · MARCO ISLAND
          </p>
          <p
            style={{
              margin: 0,
              fontFamily: "monospace",
              fontSize: 12,
              letterSpacing: 5,
              textTransform: "uppercase",
              color: "#FFB87A",
            }}
          >
            ● 2-hour reply sla · ET waking hours
          </p>
        </div>

        {/* HEADLINE */}
        <div style={{ display: "flex", flexDirection: "column", marginTop: 30 }}>
          <p
            style={{
              margin: 0,
              fontFamily: "monospace",
              fontSize: 14,
              letterSpacing: 5,
              textTransform: "uppercase",
              color: "#FFB87A",
            }}
          >
            INSTANT MEDIA KIT · FILE IN 60 SECONDS
          </p>
          <p
            style={{
              margin: "18px 0 0",
              fontSize: 88,
              fontWeight: 500,
              lineHeight: 0.95,
              letterSpacing: -3,
              color: "#F2F4F5",
              maxWidth: 1080,
            }}
          >
            Lift. Paste.
            <br />
            <span style={{ color: "#22F0D5" }}>File the story.</span>
          </p>
          <p
            style={{
              margin: "20px 0 0",
              fontSize: 22,
              lineHeight: 1.4,
              color: "#9BA5A7",
              maxWidth: 1020,
              fontWeight: 400,
            }}
          >
            One-sentence pitch · one-paragraph boilerplate · founder bio · hero
            image · downloadable asset pack · honest empty-state coverage feed.
          </p>
        </div>

        {/* PILLARS */}
        <div
          style={{
            display: "flex",
            gap: 10,
            marginTop: 24,
          }}
        >
          {[
            "use ai",
            "make money",
            "know the truth",
            "research",
          ].map((p, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 16px",
                border: "1px solid rgba(34,240,213,0.30)",
                borderRadius: 999,
                background: "rgba(34,240,213,0.06)",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 999,
                  background: "#22F0D5",
                }}
              />
              <p
                style={{
                  margin: 0,
                  fontFamily: "monospace",
                  fontSize: 13,
                  letterSpacing: 3.5,
                  textTransform: "uppercase",
                  color: "#F2F4F5",
                  fontWeight: 600,
                }}
              >
                {p}
              </p>
            </div>
          ))}
        </div>

        {/* BOTTOM STRIP */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginTop: "auto",
            paddingTop: 22,
            borderTop: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
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
              ::interview · direct contact · embargo policy
            </p>
            <p
              style={{
                margin: 0,
                fontSize: 24,
                color: "#22F0D5",
                fontFamily: "monospace",
                fontWeight: 700,
              }}
            >
              atomeons.com/press
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 4,
            }}
          >
            <p
              style={{
                margin: 0,
                fontFamily: "monospace",
                fontSize: 11,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: "#6B7779",
              }}
            >
              founder · ætom mccree
            </p>
            <p
              style={{
                margin: 0,
                fontFamily: "monospace",
                fontSize: 20,
                color: "#FFB87A",
                fontWeight: 700,
              }}
            >
              a.mccree@gmail.com
            </p>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
