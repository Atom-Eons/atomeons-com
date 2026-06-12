import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "AtomEons FAQ — questions about ORANGEBOX, B00KMAKR, I AM AI, the AI curriculum, license terms, and how a one-operator lab actually works.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * /faq OG · NOIR-CINEMA V3 · 2026-06-03
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
          background: "#08090B",
          color: "#F4F4F2",
          padding: 64,
          fontFamily:
            'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: 18, borderBottom: "1px solid #1F242B" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
            <p style={{ margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: "-0.04em", color: "#F4F4F2" }}>Æ</p>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 540, letterSpacing: "0.18em", textTransform: "uppercase", color: "#F4F4F2" }}>
              ATOMEONS · FAQ
            </p>
          </div>
          <p style={{ margin: 0, fontFamily: "ui-monospace, monospace", fontSize: 12, letterSpacing: "0.28em", textTransform: "uppercase", color: "#9CA3AF" }}>
            Real questions · plain answers
          </p>
        </div>

        <p style={{ margin: "44px 0 0", fontFamily: "ui-monospace, monospace", fontSize: 13, letterSpacing: "0.32em", textTransform: "uppercase", color: "#22F0D5", display: "flex" }}>
          § FAQ · the things people ask first
        </p>
        <p style={{ margin: "20px 0 0", fontSize: 76, fontWeight: 300, lineHeight: 1.02, letterSpacing: "-0.03em", color: "#F4F4F2", maxWidth: 1060, display: "flex" }}>
          The questions a lab actually has to answer.
        </p>
        <p style={{ margin: "22px 0 0", fontFamily: "Georgia, ui-serif, serif", fontSize: 21, lineHeight: 1.5, color: "#9CA3AF", maxWidth: 940, display: "flex" }}>
          What is ORANGEBOX. Why no subscription. Who edits I AM AI. How a one-operator lab handles support. What §4A actually says. Where the receipts live.
        </p>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "auto", paddingTop: 24, borderTop: "1px solid #1F242B" }}>
          <p style={{ margin: 0, fontFamily: "ui-monospace, monospace", fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "#7a818a" }}>
            One operator · same-day reply on weekdays
          </p>
          <p style={{ margin: 0, fontSize: 22, fontWeight: 600, letterSpacing: "-0.015em", color: "#22F0D5" }}>
            atomeons.com/faq
          </p>
        </div>
      </div>
    ),
    { ...size },
  );
}
