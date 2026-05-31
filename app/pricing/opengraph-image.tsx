import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "AtomEons pricing — Orangebox $49 perpetual + B00KMAKR dynamic-world-pricing (Tier 1 $99 · USA Advantage Clause $9.90 · Strategic Tier Lift CN $99). License §4A bans subscription on both products. Free first week from launch.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * /pricing card · matches the redirect destination (/orangebox#pricing).
 * Lands the dual-product pricing posture: Orangebox $49 perpetual after
 * free week, B00KMAKR dynamic-world-pricing with two named clauses.
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
            "radial-gradient(60% 50% at 75% 25%, rgba(255,119,51,0.30) 0%, transparent 65%), radial-gradient(50% 45% at 15% 90%, rgba(34,240,213,0.18) 0%, transparent 65%), #1A1410",
          color: "#E8D5B7",
          padding: 60,
          fontFamily:
            '"Helvetica", "Arial", -apple-system, BlinkMacSystemFont, sans-serif',
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 14, borderBottom: "1px solid #3D2F22" }}>
          <p style={{ margin: 0, fontFamily: "monospace", fontSize: 12, letterSpacing: 5, textTransform: "uppercase", color: "#FF7733" }}>
            ATOMEONS · PRICING · BOTH PRODUCTS
          </p>
          <p style={{ margin: 0, fontFamily: "monospace", fontSize: 12, letterSpacing: 5, textTransform: "uppercase", color: "#22F0D5" }}>
            ● §4A · no-saas · binding
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: 28 }}>
          <p style={{ margin: 0, fontFamily: "monospace", fontSize: 14, letterSpacing: 5, textTransform: "uppercase", color: "#FF7733" }}>
            ORANGEBOX · $49 PERPETUAL · §4A LOCKED
          </p>
          <p style={{ margin: "16px 0 0", fontSize: 84, fontWeight: 500, lineHeight: 0.95, letterSpacing: -3, color: "#E8D5B7", maxWidth: 1080 }}>
            $49 once for Orangebox.<br />
            <span style={{ color: "#FFAA66" }}>Your country&apos;s rate</span> for B00KMAKR.
          </p>
          <p style={{ margin: "22px 0 0", fontSize: 22, lineHeight: 1.4, color: "#C4AD8E", maxWidth: 1040, fontWeight: 400 }}>
            Dynamic World Pricing — Tier 1 anchor $99 · US $9.90 (USA Advantage
            Clause) · CN $99 (Strategic Tier Lift) · IN $9.90 · SO $1.98.
            Mechanism public. §4A bans subscription on both products.
          </p>
        </div>

        <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
          {[
            "FREE this week",
            "§4A no-saas",
            "30-day MFG",
            "Source included",
            "Receipts on disk",
            "BYO keys · zero markup",
          ].map((b) => (
            <span
              key={b}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "8px 14px",
                border: "1px solid #3D2F22",
                borderRadius: 999,
                background: "rgba(34,26,20,0.7)",
                fontFamily: "monospace",
                fontSize: 12,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: "#C4AD8E",
              }}
            >
              {b}
            </span>
          ))}
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
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <p style={{ margin: 0, fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#8A7560", fontFamily: "monospace" }}>
              ::full mechanism at /dynamic-world-pricing · curl /api/price/[product]
            </p>
            <p style={{ margin: 0, fontSize: 22, color: "#FF7733", fontFamily: "monospace", fontWeight: 700 }}>
              atomeons.com/orangebox#pricing
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, padding: "16px 24px", background: "#FF7733", borderRadius: 14, boxShadow: "0 0 60px rgba(255,119,51,0.45)" }}>
            <p style={{ margin: 0, fontSize: 38, fontWeight: 700, color: "#1A1410", lineHeight: 1 }}>§4A</p>
            <p style={{ margin: 0, fontSize: 12, color: "#1A1410", textTransform: "uppercase", letterSpacing: 2.5, fontWeight: 700 }}>no-saas · binding</p>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
