import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Now — what AtomEons is doing this week. Live ship cadence. Last update from the lab desk.";
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
            "radial-gradient(60% 50% at 30% 30%, rgba(34,240,213,0.32) 0%, transparent 60%), radial-gradient(55% 50% at 80% 75%, rgba(117,255,196,0.22) 0%, transparent 65%), #08090B",
          color: "#F2F4F5",
          padding: 60,
          fontFamily:
            '"Helvetica", "Arial", -apple-system, BlinkMacSystemFont, sans-serif',
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: 14,
            borderBottom: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <p style={{ margin: 0, fontFamily: "monospace", fontSize: 12, letterSpacing: 5, textTransform: "uppercase", color: "#22F0D5" }}>
            ATOMEONS · NOW · LIVE CADENCE
          </p>
          <p style={{ margin: 0, fontFamily: "monospace", fontSize: 12, letterSpacing: 5, textTransform: "uppercase", color: "#FFB87A" }}>
            ● updated weekly · nilsmolin.com format
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: 30 }}>
          <p style={{ margin: 0, fontSize: 96, fontWeight: 500, lineHeight: 0.95, letterSpacing: -3.4, color: "#F2F4F5" }}>
            What the lab is
            <br />
            <span style={{ color: "#22F0D5" }}>doing this week.</span>
          </p>
          <p style={{ margin: "22px 0 0", fontSize: 22, lineHeight: 1.4, color: "#C8CCCE", maxWidth: 1020, fontWeight: 400 }}>
            The cadence page. Ship list, broadcast lineup, current
            research, in-flight commits. One scroll tells you exactly
            what AtomEons is doing right now &mdash; no spin, no
            roadmap-deck theater. Updated weekly.
          </p>
        </div>

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
            <p style={{ margin: 0, fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#6B7779", fontFamily: "monospace" }}>
              ::ship · broadcast · research · live commits
            </p>
            <p style={{ margin: 0, fontSize: 24, color: "#22F0D5", fontFamily: "monospace", fontWeight: 700 }}>
              atomeons.com/now
            </p>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
