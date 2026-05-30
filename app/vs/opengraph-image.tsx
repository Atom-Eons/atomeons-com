import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "AtomEons /vs — honest AI comparison pages. Claude vs ChatGPT · Cloud vs Local · Subscription vs One-time. No leaderboard winner theater. Each page: at-a-glance table + 1500-word analysis + 3-column decision framework. CC-BY 4.0.";
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
            "radial-gradient(55% 50% at 80% 30%, rgba(34,240,213,0.32) 0%, transparent 60%), radial-gradient(55% 50% at 15% 80%, rgba(255,184,122,0.22) 0%, transparent 65%), #050a0c",
          color: "#F2F4F5",
          padding: 60,
          fontFamily:
            '"Helvetica", "Arial", -apple-system, BlinkMacSystemFont, sans-serif',
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 14, borderBottom: "1px solid #1A2225" }}>
          <p style={{ margin: 0, fontFamily: "monospace", fontSize: 12, letterSpacing: 5, textTransform: "uppercase", color: "#22F0D5" }}>
            ATOMEONS · /VS · CC-BY 4.0
          </p>
          <p style={{ margin: 0, fontFamily: "monospace", fontSize: 12, letterSpacing: 5, textTransform: "uppercase", color: "#FFB87A" }}>
            ● 3 head-to-heads · no winner theater
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: 30 }}>
          <p style={{ margin: 0, fontFamily: "monospace", fontSize: 16, letterSpacing: 5, textTransform: "uppercase", color: "#22F0D5" }}>
            ▲ HONEST AI COMPARISONS
          </p>
          <p style={{ margin: "20px 0 0", fontSize: 100, fontWeight: 500, lineHeight: 0.96, letterSpacing: -3, color: "#F2F4F5", maxWidth: 1080 }}>
            Calibrated
            <br />
            by{" "}
            <span style={{ color: "#22F0D5" }}>the work.</span>
          </p>
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 32, flexWrap: "wrap" }}>
          {[
            { left: "Claude", right: "ChatGPT", color: "#22F0D5" },
            { left: "Cloud", right: "Local", color: "#FFB87A" },
            { left: "Subscription", right: "One-time", color: "#FF7A1A" },
          ].map((p) => (
            <div
              key={p.left}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "12px 22px",
                border: `1px solid ${p.color}55`,
                borderRadius: 999,
                background: `${p.color}10`,
              }}
            >
              <p style={{ margin: 0, fontFamily: "monospace", fontSize: 14, letterSpacing: 3, textTransform: "uppercase", color: p.color, fontWeight: 700 }}>
                {p.left}
              </p>
              <p style={{ margin: 0, fontFamily: "monospace", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#6B7779", fontWeight: 700 }}>
                vs
              </p>
              <p style={{ margin: 0, fontFamily: "monospace", fontSize: 14, letterSpacing: 3, textTransform: "uppercase", color: p.color, fontWeight: 700 }}>
                {p.right}
              </p>
            </div>
          ))}
        </div>

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
            <p style={{ margin: 0, fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#6B7779", fontFamily: "monospace" }}>
              ::table + 1500w body + decision framework per page
            </p>
            <p style={{ margin: 0, fontSize: 24, color: "#22F0D5", fontFamily: "monospace", fontWeight: 700 }}>
              atomeons.com/vs
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, padding: "16px 24px", background: "#22F0D5", borderRadius: 14, boxShadow: "0 0 60px rgba(34,240,213,0.45)" }}>
            <p style={{ margin: 0, fontSize: 38, fontWeight: 700, color: "#0B1014", lineHeight: 1 }}>
              CC-BY
            </p>
            <p style={{ margin: 0, fontSize: 12, color: "#0B1014", textTransform: "uppercase", letterSpacing: 2.5, fontWeight: 700 }}>
              quote any · no signup
            </p>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
