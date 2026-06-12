import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "AtomEons press kit — modern EPK · 50/100/250-word boilerplate · downloadable brand assets · 4-quote bank · ORANGEBOX, B00KMAKR, I AM AI. Founder-direct: a.mccree@gmail.com.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * /press OG · NOIR-CINEMA V3 · 2026-06-03
 * Modern EPK card replacing the launch-night ember version. Journalist-
 * facing: every artifact a reporter needs is on the linked page.
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
              ATOMEONS · PRESS KIT
            </p>
          </div>
          <p style={{ margin: 0, fontFamily: "ui-monospace, monospace", fontSize: 12, letterSpacing: "0.28em", textTransform: "uppercase", color: "#9CA3AF" }}>
            Founder-direct · same-day reply
          </p>
        </div>

        <p style={{ margin: "44px 0 0", fontFamily: "ui-monospace, monospace", fontSize: 13, letterSpacing: "0.32em", textTransform: "uppercase", color: "#22F0D5", display: "flex" }}>
          § Electronic press kit · /press
        </p>
        <p style={{ margin: "20px 0 0", fontSize: 70, fontWeight: 300, lineHeight: 1.03, letterSpacing: "-0.025em", color: "#F4F4F2", maxWidth: 1060, display: "flex" }}>
          Everything a reporter needs, copyable, in one anchored page.
        </p>

        <div style={{ display: "flex", gap: 10, marginTop: 32, flexWrap: "wrap" }}>
          {[
            "50/100/250-word boilerplate",
            "Founder bio",
            "Brand SVGs (3)",
            "Color palette",
            "Product snapshots (3)",
            "Quote bank (4)",
            "Press archive",
            "Contact panel",
          ].map((p) => (
            <div
              key={p}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 16px",
                border: "1px solid #1F242B",
                background: "#0F1114",
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: 999, background: "#22F0D5", display: "flex" }} />
              <p style={{ margin: 0, fontFamily: "ui-monospace, monospace", fontSize: 12, letterSpacing: "0.22em", textTransform: "uppercase", color: "#F4F4F2", fontWeight: 500 }}>{p}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "auto", paddingTop: 24, borderTop: "1px solid #1F242B" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <p style={{ margin: 0, fontFamily: "ui-monospace, monospace", fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "#7a818a" }}>
              Atom McCree · Marco Island, FL · solo independent researcher
            </p>
            <p style={{ margin: 0, fontSize: 22, fontWeight: 600, letterSpacing: "-0.015em", color: "#22F0D5" }}>
              atomeons.com/press
            </p>
          </div>
          <p style={{ margin: 0, fontFamily: "ui-monospace, monospace", fontSize: 16, letterSpacing: "0.16em", color: "#F4F4F2", fontWeight: 600 }}>
            a.mccree@gmail.com
          </p>
        </div>
      </div>
    ),
    { ...size },
  );
}
