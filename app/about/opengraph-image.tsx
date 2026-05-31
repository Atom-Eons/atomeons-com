import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "About AtomEons. One operator. Marco Island, FL. Independent AI research lab. No VC money. No subscription. Two cockpits shipped (Orangebox + B00KMAKR) · §4A no-saas.";
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
            "radial-gradient(65% 60% at 70% 30%, rgba(34,240,213,0.36) 0%, transparent 60%), radial-gradient(50% 45% at 20% 80%, rgba(255,184,122,0.28) 0%, transparent 65%), #0a1a17",
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
            ATOMEONS SYSTEMS LABORATORY
          </p>
          <p style={{ margin: 0, fontFamily: "monospace", fontSize: 12, letterSpacing: 5, textTransform: "uppercase", color: "#FFB87A" }}>
            ● one operator · marco island, fl
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: 30 }}>
          <p style={{ margin: 0, fontFamily: "monospace", fontSize: 14, letterSpacing: 5, textTransform: "uppercase", color: "#FFB87A" }}>
            INDEPENDENT AI RESEARCH + BUILT TOOLS
          </p>
          <p style={{ margin: "18px 0 0", fontSize: 88, fontWeight: 500, lineHeight: 0.97, letterSpacing: -3, color: "#F2F4F5", maxWidth: 1080 }}>
            One operator.
            <br />
            <span style={{ color: "#22F0D5" }}>Built outside</span>
            <br />
            the cartel.
          </p>
          <p style={{ margin: "20px 0 0", fontSize: 22, lineHeight: 1.4, color: "#C8CCCE", maxWidth: 1020, fontWeight: 400 }}>
            Founder: Atom McCree. No VC money. No employees. No board.
            Twelve research manuscripts under CC-BY 4.0. The perpetual
            ORANGEBOX cockpit (License §4A bans subscription). The
            nightly Founder&apos;s View broadcast. The 14-clause
            manifesto. The lab built outside the cartel for the people
            the cartel isn&apos;t building for.
          </p>
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 24, flexWrap: "wrap" }}>
          {["USE AI", "MAKE MONEY", "KNOW THE TRUTH", "RESEARCH"].map((p) => (
            <div
              key={p}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 16px",
                border: "1px solid rgba(34,240,213,0.32)",
                borderRadius: 999,
                background: "rgba(34,240,213,0.06)",
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: 999, background: "#22F0D5" }} />
              <p style={{ margin: 0, fontFamily: "monospace", fontSize: 12, letterSpacing: 3.5, textTransform: "uppercase", color: "#F2F4F5", fontWeight: 600 }}>{p}</p>
            </div>
          ))}
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
              ::a.mccree@gmail.com · @AtomMccree
            </p>
            <p style={{ margin: 0, fontSize: 24, color: "#22F0D5", fontFamily: "monospace", fontWeight: 700 }}>
              atomeons.com/about
            </p>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
