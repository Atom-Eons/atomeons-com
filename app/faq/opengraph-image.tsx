import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "FAQ — ORANGEBOX v6.3 + AI 101 questions. $49 once, forever. Local-first. License §4A bans subscription. Two 30-day refund paths. AtomEons.";
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
            "radial-gradient(60% 50% at 80% 30%, rgba(255,122,26,0.34) 0%, transparent 60%), radial-gradient(50% 45% at 15% 80%, rgba(34,240,213,0.28) 0%, transparent 65%), #0a1a17",
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
            ATOMEONS · FREQUENTLY ASKED
          </p>
          <p style={{ margin: 0, fontFamily: "monospace", fontSize: 12, letterSpacing: 5, textTransform: "uppercase", color: "#FF7A1A" }}>
            ● answered honestly
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: 30 }}>
          <p style={{ margin: 0, fontFamily: "monospace", fontSize: 14, letterSpacing: 5, textTransform: "uppercase", color: "#FF7A1A" }}>
            ORANGEBOX v6.3 · AI 101 · LICENSE §4A
          </p>
          <p style={{ margin: "18px 0 0", fontSize: 88, fontWeight: 500, lineHeight: 0.97, letterSpacing: -3, color: "#F2F4F5", maxWidth: 1080 }}>
            Every question
            <br />
            <span style={{ color: "#FF7A1A" }}>before you buy.</span>
          </p>
          <p style={{ margin: "20px 0 0", fontSize: 22, lineHeight: 1.4, color: "#9BA5A7", maxWidth: 1020, fontWeight: 400 }}>
            What ORANGEBOX is, the $49 price, the §4A no-subscription
            clause, the two 30-day refund paths (MFG + Workflow-Fit),
            Chrome warnings, privacy, the source code, local model
            setup, plus nine novice AI questions for anyone new to all
            of this.
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
              ::zero telemetry · local-first · byo keys
            </p>
            <p style={{ margin: 0, fontSize: 24, color: "#22F0D5", fontFamily: "monospace", fontWeight: 700 }}>
              atomeons.com/faq
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, padding: "16px 24px", background: "#FF7A1A", borderRadius: 12, boxShadow: "0 0 40px rgba(255,122,26,0.45)" }}>
            <p style={{ margin: 0, fontSize: 48, fontWeight: 700, color: "#000", lineHeight: 1 }}>$49</p>
            <p style={{ margin: 0, fontSize: 12, color: "#000", textTransform: "uppercase", letterSpacing: 2.5, fontWeight: 700 }}>once · forever</p>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
