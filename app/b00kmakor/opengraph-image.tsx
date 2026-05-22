import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "B00KMakor — the AI publishing house for writers. Manuscript to launched book in 30 days. AtomEons.";
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
            "radial-gradient(60% 55% at 75% 30%, rgba(255,184,122,0.36) 0%, transparent 60%), radial-gradient(50% 45% at 20% 80%, rgba(34,240,213,0.26) 0%, transparent 65%), #0a1a17",
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
            ATOMEONS · B00KMAKOR · AI PUBLISHING HOUSE
          </p>
          <p style={{ margin: 0, fontFamily: "monospace", fontSize: 12, letterSpacing: 5, textTransform: "uppercase", color: "#FFB87A" }}>
            ● coming · 2026
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: 30 }}>
          <p style={{ margin: 0, fontFamily: "monospace", fontSize: 14, letterSpacing: 6, textTransform: "uppercase", color: "#FFB87A", fontWeight: 700 }}>
            B00KMAKOR
          </p>
          <p style={{ margin: "16px 0 0", fontSize: 84, fontWeight: 500, lineHeight: 0.97, letterSpacing: -3, color: "#F2F4F5", maxWidth: 1080 }}>
            From manuscript
            <br />
            <span style={{ color: "#FFB87A" }}>to launched book</span>
            <br />
            in 30 days.
          </p>
          <p style={{ margin: "22px 0 0", fontSize: 22, lineHeight: 1.4, color: "#C8CCCE", maxWidth: 1020, fontWeight: 400 }}>
            The AI publishing house for indie writers. AI-augmented
            editing, cover, layout, audiobook, distribution. Pay once,
            keep 100% of royalties. The lab&apos;s answer to the
            traditional publishing 12-month cycle.
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
              ::author keeps royalties · audiobook included · CC-BY mss optional
            </p>
            <p style={{ margin: 0, fontSize: 24, color: "#22F0D5", fontFamily: "monospace", fontWeight: 700 }}>
              atomeons.com/b00kmakor
            </p>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
