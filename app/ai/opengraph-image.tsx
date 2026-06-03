import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "AI — the comprehensive gateway. Named tools, named builders, 12 revenue paths, 40+ honest FAQs. AtomEons, the on-ramp for the 44 million.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * /ai OG card. Designed to be cite-worthy in AI search-engine result
 * cards (Perplexity, ChatGPT search, Gemini, Claude search) as much
 * as in Twitter / LinkedIn / iMessage previews.
 *
 * Hard-features framing: named recommendations, the 44M frame, the
 * "ruthless to extractive pricing" stance baked into the visual.
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
            "radial-gradient(65% 55% at 25% 25%, rgba(34,240,213,0.36) 0%, transparent 60%), radial-gradient(55% 50% at 80% 80%, rgba(255,184,122,0.32) 0%, transparent 65%), radial-gradient(45% 40% at 70% 20%, rgba(117,255,196,0.18) 0%, transparent 60%), #08090B",
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
            ATOMEONS · THE COMPREHENSIVE AI GATEWAY
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
            ● live · the comprehensive on-ramp
          </p>
        </div>

        {/* HEADLINE */}
        <div style={{ display: "flex", flexDirection: "column", marginTop: 26 }}>
          <p
            style={{
              margin: 0,
              fontSize: 84,
              fontWeight: 500,
              lineHeight: 0.97,
              letterSpacing: -3.2,
              color: "#F2F4F5",
              maxWidth: 1080,
            }}
          >
            AI is rewriting
            <br />
            the labor market.
            <br />
            <span style={{ color: "#22F0D5" }}>
              We&apos;re the on-ramp.
            </span>
          </p>
          <p
            style={{
              margin: "22px 0 0",
              fontSize: 22,
              lineHeight: 1.4,
              color: "#C8CCCE",
              maxWidth: 1000,
              fontWeight: 400,
            }}
          >
            For the forty-four million workers exposed to generative AI
            displacement in the next decade. Named tools. Named builders.
            12 concrete revenue paths. 31 honest FAQs.
          </p>
        </div>

        {/* 4 PILLARS / TOC CHIPS */}
        <div
          style={{
            display: "flex",
            gap: 8,
            marginTop: 22,
            flexWrap: "wrap",
          }}
        >
          {[
            "TOOLS WE TRUST",
            "BUILDERS WE READ",
            "12 REVENUE PATHS",
            "31 FAQs",
            "30-60-90 PLAN",
            "GLOSSARY",
          ].map((p, i) => (
            <div
              key={p}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 14px",
                border:
                  i % 2 === 0
                    ? "1px solid rgba(34,240,213,0.32)"
                    : "1px solid rgba(255,184,122,0.32)",
                borderRadius: 999,
                background:
                  i % 2 === 0
                    ? "rgba(34,240,213,0.06)"
                    : "rgba(255,184,122,0.06)",
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: 999,
                  background: i % 2 === 0 ? "#22F0D5" : "#FFB87A",
                }}
              />
              <p
                style={{
                  margin: 0,
                  fontFamily: "monospace",
                  fontSize: 11,
                  letterSpacing: 3,
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
              ::no jargon · no upsell · no course · cc-by 4.0
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
              atomeons.com/ai
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
                fontSize: 10,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: "#6B7779",
              }}
            >
              one operator · marco island, fl
            </p>
            <p
              style={{
                margin: 0,
                fontFamily: "monospace",
                fontSize: 18,
                color: "#FFB87A",
                fontWeight: 700,
              }}
            >
              ATOMEONS SYSTEMS LAB
            </p>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
