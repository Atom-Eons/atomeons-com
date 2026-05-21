import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Start here — AI in eleven minutes for someone who has used ChatGPT under ten times. AtomEons Systems Laboratory.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * /start card — novice entry door.
 * Soft aurora gradient, 4-section reading map, atomeons.com/start URL chip.
 * Lighter than the orangebox card per operator's "too dark" directive.
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
            "radial-gradient(60% 50% at 20% 30%, rgba(34,240,213,0.40) 0%, transparent 60%), radial-gradient(50% 45% at 80% 75%, rgba(255,184,122,0.36) 0%, transparent 65%), radial-gradient(45% 40% at 65% 25%, rgba(117,255,196,0.22) 0%, transparent 60%), #0e2520",
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
            ATOMEONS · NOVICE ON-RAMP · 11 MIN
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
            ● no jargon · no hype
          </p>
        </div>

        {/* HEADLINE */}
        <div style={{ display: "flex", flexDirection: "column", marginTop: 32 }}>
          <p
            style={{
              margin: 0,
              fontSize: 96,
              fontWeight: 500,
              lineHeight: 0.95,
              letterSpacing: -3.5,
              color: "#F2F4F5",
            }}
          >
            AI is changing
            <br />
            your life
            <br />
            <span style={{ color: "#22F0D5" }}>right now.</span>
          </p>
          <p
            style={{
              margin: "26px 0 0",
              fontSize: 24,
              lineHeight: 1.35,
              color: "#C8CCCE",
              maxWidth: 980,
              fontWeight: 400,
            }}
          >
            Eleven minutes from confused to confident. Written for someone
            who has used ChatGPT under ten times.
          </p>
        </div>

        {/* SECTION MAP */}
        <div
          style={{
            display: "flex",
            gap: 12,
            marginTop: 26,
          }}
        >
          {[
            { k: "what is it", v: "3 min" },
            { k: "this week", v: "4 min" },
            { k: "what it can't", v: "2 min" },
            { k: "how to start", v: "2 min" },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                padding: "14px 18px",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 12,
                background: "rgba(10,15,17,0.55)",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontFamily: "monospace",
                  fontSize: 10,
                  letterSpacing: 4,
                  textTransform: "uppercase",
                  color: "#22F0D5",
                }}
              >
                {s.k}
              </p>
              <p
                style={{
                  margin: "8px 0 0",
                  fontFamily: "monospace",
                  fontSize: 18,
                  color: "#F2F4F5",
                }}
              >
                {s.v}
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
                color: "#9BA5A7",
                fontFamily: "monospace",
              }}
            >
              ::glossary · use cases · honest limits · 30-day on-ramp
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
              atomeons.com/start
            </p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 22px",
              border: "1px solid #22F0D5",
              borderRadius: 999,
              background: "rgba(34,240,213,0.10)",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 14,
                color: "#22F0D5",
                fontFamily: "monospace",
                letterSpacing: 3,
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              ÆoNs · start here
            </p>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
