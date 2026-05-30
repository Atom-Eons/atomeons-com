import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "AtomEons /pricing — $49 once, forever. License §4A bans subscription. 30-day Material Failure + 30-day Workflow-Fit refund paths. Two 30-day guarantees. Source included. ORANGEBOX Command v6.3.";
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
            "radial-gradient(60% 50% at 78% 25%, rgba(255,122,26,0.30) 0%, transparent 60%), radial-gradient(55% 50% at 15% 90%, rgba(34,240,213,0.20) 0%, transparent 65%), #050a0c",
          color: "#F2F4F5",
          padding: 60,
          fontFamily:
            '"Helvetica", "Arial", -apple-system, BlinkMacSystemFont, sans-serif',
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 14, borderBottom: "1px solid #1A2225" }}>
          <p style={{ margin: 0, fontFamily: "monospace", fontSize: 12, letterSpacing: 5, textTransform: "uppercase", color: "#FF7A1A" }}>
            ATOMEONS · /PRICING · ORANGEBOX v6.3
          </p>
          <p style={{ margin: 0, fontFamily: "monospace", fontSize: 12, letterSpacing: 5, textTransform: "uppercase", color: "#22F0D5" }}>
            ● §4A bans subscription
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: 40 }}>
          <p style={{ margin: 0, fontFamily: "monospace", fontSize: 16, letterSpacing: 5, textTransform: "uppercase", color: "#FF7A1A" }}>
            ▲ ONE PRODUCT · ONE PRICE · FOREVER
          </p>
          <p style={{ margin: "20px 0 0", fontSize: 140, fontWeight: 600, lineHeight: 0.94, letterSpacing: -5, color: "#F2F4F5", maxWidth: 1080 }}>
            <span style={{ color: "#FF7A1A" }}>$49</span> once.
            <br />
            No subscription.
            <br />
            Ever.
          </p>
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
              ::two 30-day refund paths · source included · windows 10/11
            </p>
            <p style={{ margin: 0, fontSize: 24, color: "#FF7A1A", fontFamily: "monospace", fontWeight: 700 }}>
              atomeons.com/pricing
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, padding: "16px 24px", background: "#FF7A1A", borderRadius: 14, boxShadow: "0 0 60px rgba(255,122,26,0.45)" }}>
            <p style={{ margin: 0, fontSize: 38, fontWeight: 700, color: "#0B1014", lineHeight: 1 }}>
              §4A
            </p>
            <p style={{ margin: 0, fontSize: 12, color: "#0B1014", textTransform: "uppercase", letterSpacing: 2.5, fontWeight: 700 }}>
              no-saas · binding
            </p>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
