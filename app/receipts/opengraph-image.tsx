import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Receipts · what the lab has actually shipped, measured, and published · 200+ pages · 31 papers · 27 guardrails · 68 lessons · 1 operator · AtomEons";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * /receipts social card — the audit ledger
 *
 * Big mono numbers, no marketing decoration. The aesthetic of the page
 * itself: every claim is a file you can open.
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
              ATOMEONS · SYSTEMS LABORATORY
            </p>
          </div>
          <p style={{ margin: 0, fontFamily: "ui-monospace, monospace", fontSize: 12, letterSpacing: "0.28em", textTransform: "uppercase", color: "#9CA3AF" }}>
            /receipts · audit ledger
          </p>
        </div>

        <p style={{ margin: "44px 0 0", fontFamily: "ui-monospace, monospace", fontSize: 13, letterSpacing: "0.32em", textTransform: "uppercase", color: "#22F0D5", display: "flex" }}>
          § Audit ledger · current build
        </p>
        <p style={{ margin: "20px 0 0", fontSize: 80, fontWeight: 300, lineHeight: 1.02, letterSpacing: "-0.03em", color: "#F4F4F2", maxWidth: 1060, display: "flex" }}>
          What this lab has actually shipped.
        </p>

        <div style={{ display: "flex", gap: 0, marginTop: 44, border: "1px solid #1F242B", width: "100%" }}>
          {[
            { k: "Pages live", v: "200+" },
            { k: "Papers", v: "31" },
            { k: "Lessons", v: "68" },
            { k: "Guardrails", v: "27" },
            { k: "Operator", v: "1" },
          ].map((m, i) => (
            <div key={m.k} style={{ display: "flex", flexDirection: "column", flex: 1, padding: "26px 22px", borderLeft: i === 0 ? "none" : "1px solid #1F242B", background: "#0F1114" }}>
              <p style={{ margin: 0, fontFamily: "ui-monospace, monospace", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#5A6068" }}>{m.k}</p>
              <p style={{ margin: "14px 0 0", fontFamily: "ui-monospace, monospace", fontSize: 56, fontWeight: 400, lineHeight: 1, letterSpacing: "-0.04em", color: "#F4F4F2" }}>{m.v}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "auto", paddingTop: 24, borderTop: "1px solid #1F242B" }}>
          <p style={{ margin: 0, fontFamily: "ui-monospace, monospace", fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "#5A6068" }}>
            Every cell sourced or em-dash. No projections.
          </p>
          <p style={{ margin: 0, fontSize: 22, fontWeight: 600, letterSpacing: "-0.015em", color: "#22F0D5" }}>
            atomeons.com/receipts
          </p>
        </div>
      </div>
    ),
    { ...size },
  );
}
