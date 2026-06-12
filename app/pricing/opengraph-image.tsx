import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "AtomEons pricing — ORANGEBOX $99 one-time perpetual · B00KMAKR $99 dynamic · I AM AI $39 hardcover pre-order. §4A no-SaaS license bans subscription on every product.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * /pricing OG · NOIR-CINEMA V3 · 2026-06-03
 * Three-product price card. Perpetual license posture, no subscription,
 * §4A clause visible.
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
              ATOMEONS · PRICING
            </p>
          </div>
          <p style={{ margin: 0, fontFamily: "ui-monospace, monospace", fontSize: 12, letterSpacing: "0.28em", textTransform: "uppercase", color: "#22F0D5" }}>
            §4A · no-SaaS · binding on every product
          </p>
        </div>

        <p style={{ margin: "44px 0 0", fontFamily: "ui-monospace, monospace", fontSize: 13, letterSpacing: "0.32em", textTransform: "uppercase", color: "#22F0D5", display: "flex" }}>
          § Three products · one perpetual license clause
        </p>
        <p style={{ margin: "20px 0 0", fontSize: 72, fontWeight: 300, lineHeight: 1.03, letterSpacing: "-0.025em", color: "#F4F4F2", maxWidth: 1060, display: "flex" }}>
          One purchase. Forever. No subscription, ever.
        </p>

        <div style={{ display: "flex", gap: 0, marginTop: 38, border: "1px solid #1F242B", width: "100%" }}>
          {[
            { k: "ORANGEBOX", v: "$99", note: "one-time · perpetual" },
            { k: "B00KMAKR", v: "$99", note: "dynamic · Mac + Win" },
            { k: "I AM AI", v: "$39", note: "pre-order · hardcover" },
          ].map((m, i) => (
            <div key={m.k} style={{ display: "flex", flexDirection: "column", flex: 1, padding: "24px 26px", borderLeft: i === 0 ? "none" : "1px solid #1F242B", background: "#0F1114" }}>
              <p style={{ margin: 0, fontFamily: "ui-monospace, monospace", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#22F0D5" }}>{m.k}</p>
              <p style={{ margin: "12px 0 0", fontSize: 56, fontWeight: 400, lineHeight: 1, letterSpacing: "-0.03em", color: "#F4F4F2" }}>{m.v}</p>
              <p style={{ margin: "12px 0 0", fontFamily: "ui-monospace, monospace", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#9CA3AF" }}>{m.note}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "auto", paddingTop: 24, borderTop: "1px solid #1F242B" }}>
          <p style={{ margin: 0, fontFamily: "ui-monospace, monospace", fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "#7a818a" }}>
            BYO API key · zero markup · Material-Failure guarantee
          </p>
          <p style={{ margin: 0, fontSize: 22, fontWeight: 600, letterSpacing: "-0.015em", color: "#22F0D5" }}>
            atomeons.com/pricing
          </p>
        </div>
      </div>
    ),
    { ...size },
  );
}
