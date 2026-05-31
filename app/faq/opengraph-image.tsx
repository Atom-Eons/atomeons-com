import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "AtomEons FAQ — questions about ORANGEBOX v1.0.0-beta + B00KMAKR v3.2.0 + AI 101. Free launch week. License §4A bans subscription. 30-day Material Failure Guarantee.";
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
            "radial-gradient(60% 50% at 80% 30%, rgba(255,119,51,0.32) 0%, transparent 60%), radial-gradient(50% 45% at 15% 80%, rgba(34,240,213,0.22) 0%, transparent 65%), #1A1410",
          color: "#E8D5B7",
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
            borderBottom: "1px solid #3D2F22",
          }}
        >
          <p style={{ margin: 0, fontFamily: "monospace", fontSize: 12, letterSpacing: 5, textTransform: "uppercase", color: "#22F0D5" }}>
            ATOMEONS · FREQUENTLY ASKED
          </p>
          <p style={{ margin: 0, fontFamily: "monospace", fontSize: 12, letterSpacing: 5, textTransform: "uppercase", color: "#FF7733" }}>
            ● answered honestly
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: 30 }}>
          <p style={{ margin: 0, fontFamily: "monospace", fontSize: 14, letterSpacing: 5, textTransform: "uppercase", color: "#FF7733" }}>
            ORANGEBOX · B00KMAKR · LICENSE §4A · AI 101
          </p>
          <p style={{ margin: "18px 0 0", fontSize: 88, fontWeight: 500, lineHeight: 0.97, letterSpacing: -3, color: "#E8D5B7", maxWidth: 1080 }}>
            Every question
            <br />
            <span style={{ color: "#FF7733" }}>before you buy.</span>
          </p>
          <p style={{ margin: "20px 0 0", fontSize: 22, lineHeight: 1.4, color: "#C4AD8E", maxWidth: 1040, fontWeight: 400 }}>
            What Orangebox v1.0.0-beta and B00KMAKR v3.2.0 are. The
            free-week posture, the §4A no-subscription clause, the 30-day
            Material Failure Guarantee, SmartScreen + Gatekeeper warnings,
            privacy posture, source code policy, local model setup, plus
            novice AI questions for anyone new to all of this.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginTop: "auto",
            paddingTop: 22,
            borderTop: "1px solid #3D2F22",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <p style={{ margin: 0, fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#8A7560", fontFamily: "monospace" }}>
              ::zero telemetry · BYO keys · §4A no-saas · 30-day MFG
            </p>
            <p style={{ margin: 0, fontSize: 24, color: "#22F0D5", fontFamily: "monospace", fontWeight: 700 }}>
              atomeons.com/faq
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, padding: "16px 24px", background: "#FF7733", borderRadius: 12, boxShadow: "0 0 40px rgba(255,119,51,0.45)" }}>
            <p style={{ margin: 0, fontSize: 48, fontWeight: 700, color: "#1A1410", lineHeight: 1 }}>FREE</p>
            <p style={{ margin: 0, fontSize: 12, color: "#1A1410", textTransform: "uppercase", letterSpacing: 2.5, fontWeight: 700 }}>this week</p>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
