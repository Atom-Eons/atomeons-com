import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Learn AI · the AtomEons curriculum · 27 lessons (L0 gateway + L1–L29) · 5 levels (Novice → Pilot) · 5 persona paths (Worker · Builder · Student · Operator · Curious) · level diagnostic · worked examples · free · no signup · CC-BY 4.0. Onboarding humanity to AI.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * /learn OG card.
 *
 * Mission-first framing. The big claim ("Onboarding humanity to AI.")
 * carries the page identity. The 12 / 5 / 5 numbers signal the
 * curriculum's actual scope. The bottom strip signals trust posture
 * (free, CC-BY 4.0, no signup, no list).
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
            "radial-gradient(70% 55% at 78% 25%, rgba(34,240,213,0.34) 0%, transparent 60%), radial-gradient(60% 50% at 12% 90%, rgba(255,184,122,0.26) 0%, transparent 65%), #050a0c",
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
            borderBottom: "1px solid #1A2225",
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
            ATOMEONS · /LEARN · THE CURRICULUM · CC-BY 4.0
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
            ● 27 lessons · L0 gateway · diagnostic
          </p>
        </div>

        {/* HEADLINE */}
        <div style={{ display: "flex", flexDirection: "column", marginTop: 32 }}>
          <p
            style={{
              margin: 0,
              fontFamily: "monospace",
              fontSize: 16,
              letterSpacing: 5,
              textTransform: "uppercase",
              color: "#22F0D5",
            }}
          >
            ▲ THE HUMANITY-SCALE AI ON-RAMP
          </p>
          <p
            style={{
              margin: "20px 0 0",
              fontSize: 96,
              fontWeight: 500,
              lineHeight: 0.96,
              letterSpacing: -3,
              color: "#F2F4F5",
              maxWidth: 1080,
            }}
          >
            Onboarding
            <br />
            humanity
            <br />
            <span style={{ color: "#22F0D5" }}>to AI.</span>
          </p>
        </div>

        {/* LEVEL CHIPS */}
        <div
          style={{
            display: "flex",
            gap: 10,
            marginTop: 26,
            flexWrap: "wrap",
          }}
        >
          {[
            { label: "L1 · NOVICE", color: "#9BA5A7" },
            { label: "L2 · LEARNER", color: "#22F0D5" },
            { label: "L3 · USER", color: "#22F0D5" },
            { label: "L4 · OPERATOR", color: "#22F0D5" },
            { label: "L5 · PILOT", color: "#FFB87A" },
          ].map((p) => (
            <div
              key={p.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 18px",
                border: `1px solid ${p.color}55`,
                borderRadius: 999,
                background: `${p.color}10`,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: 999,
                  background: p.color,
                }}
              />
              <p
                style={{
                  margin: 0,
                  fontFamily: "monospace",
                  fontSize: 13,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  color: p.color,
                  fontWeight: 700,
                }}
              >
                {p.label}
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
              ::5 paths · worker · builder · student · operator · curious
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
              atomeons.com/learn
            </p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 12,
              padding: "16px 24px",
              background: "#22F0D5",
              borderRadius: 14,
              boxShadow: "0 0 60px rgba(34,240,213,0.45)",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 38,
                fontWeight: 700,
                color: "#0B1014",
                lineHeight: 1,
              }}
            >
              FREE
            </p>
            <p
              style={{
                margin: 0,
                fontSize: 12,
                color: "#0B1014",
                textTransform: "uppercase",
                letterSpacing: 2.5,
                fontWeight: 700,
              }}
            >
              no signup · no list · cc-by 4.0
            </p>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
