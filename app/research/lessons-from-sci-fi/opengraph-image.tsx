import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Lessons From Sci-Fi — a century of imagined machines. AtomEons monograph. Seven epochs · 200 screen texts · five dimensions.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * /research/lessons-from-sci-fi card.
 * Cinematic deep-black gradient with a HAL-red accent (the lead image).
 * Frames the page as a research monograph, not a list of films.
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
            "radial-gradient(65% 60% at 75% 40%, rgba(220,60,60,0.42) 0%, transparent 60%), radial-gradient(45% 40% at 15% 90%, rgba(34,240,213,0.18) 0%, transparent 65%), #060808",
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
            ÆONS RESEARCH · MONOGRAPH · APR 2026
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
            ● 200 texts · 13 chapters · cc-by 4.0
          </p>
        </div>

        {/* HEADLINE */}
        <div style={{ display: "flex", flexDirection: "column", marginTop: 32 }}>
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
            LESSONS FROM SCI-FI
          </p>
          <p
            style={{
              margin: "16px 0 0",
              fontSize: 92,
              fontWeight: 500,
              lineHeight: 0.95,
              letterSpacing: -3,
              color: "#F2F4F5",
              maxWidth: 1080,
            }}
          >
            A century of
            <br />
            <span style={{ color: "#22F0D5" }}>imagined machines.</span>
          </p>
          <p
            style={{
              margin: "22px 0 0",
              fontSize: 22,
              lineHeight: 1.4,
              color: "#C8CCCE",
              maxWidth: 980,
              fontWeight: 400,
            }}
          >
            Seven chronological epochs · five-dimensional taxonomy
            (embodiment · autonomy · alignment · opacity · moral status) ·
            two hundred screen texts analyzed as a distributed
            philosophical corpus.
          </p>
        </div>

        {/* EPOCH STRIP */}
        <div
          style={{
            display: "flex",
            gap: 6,
            marginTop: 26,
          }}
        >
          {[
            { y: "1927", n: "Metropolis" },
            { y: "1968", n: "HAL 9000" },
            { y: "1982", n: "Blade Runner" },
            { y: "1999", n: "Matrix" },
            { y: "2013", n: "Her" },
            { y: "2016", n: "Westworld" },
            { y: "2024", n: "Fallout" },
          ].map((e, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                alignItems: "center",
                padding: "10px 8px",
                border: "1px solid rgba(255,255,255,0.10)",
                borderRadius: 8,
                background: "rgba(10,15,17,0.55)",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontFamily: "monospace",
                  fontSize: 11,
                  letterSpacing: 2,
                  color: "#22F0D5",
                }}
              >
                {e.y}
              </p>
              <p
                style={{
                  margin: "4px 0 0",
                  fontFamily: "monospace",
                  fontSize: 12,
                  color: "#C8CCCE",
                }}
              >
                {e.n}
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
              ::ten cinema clips · 12-still gallery · 14-service playlist
            </p>
            <p
              style={{
                margin: 0,
                fontSize: 22,
                color: "#22F0D5",
                fontFamily: "monospace",
                fontWeight: 700,
              }}
            >
              atomeons.com/research/lessons-from-sci-fi
            </p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 10,
              padding: "14px 22px",
              border: "1px solid rgba(220,60,60,0.6)",
              borderRadius: 999,
              background: "rgba(220,60,60,0.10)",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 14,
                color: "#FF6B6B",
                fontFamily: "monospace",
                letterSpacing: 3,
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              ● HAL lead · 2001
            </p>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
