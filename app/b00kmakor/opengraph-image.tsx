import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "AI Bookmaker — the publishing cockpit · Mac + Windows · FREE forever · 142 feature surfaces · the system that compiled I Am AI · AtomEons";
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
            "radial-gradient(60% 55% at 75% 30%, rgba(255,184,122,0.36) 0%, transparent 60%), radial-gradient(50% 45% at 20% 80%, rgba(34,240,213,0.26) 0%, transparent 65%), #08090B",
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
            ATOMEONS · AI BOOKMAKER · PUBLISHING COCKPIT
          </p>
          <p style={{ margin: 0, fontFamily: "monospace", fontSize: 12, letterSpacing: 5, textTransform: "uppercase", color: "#FFB87A" }}>
            ● shipped · v3.2.0 · mac + win
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: 30 }}>
          <p style={{ margin: 0, fontFamily: "monospace", fontSize: 14, letterSpacing: 6, textTransform: "uppercase", color: "#FFB87A", fontWeight: 700 }}>
            AI BOOKMAKER · v3.2.0 · FREE FOREVER
          </p>
          <p style={{ margin: "16px 0 0", fontSize: 84, fontWeight: 500, lineHeight: 0.97, letterSpacing: -3, color: "#F2F4F5", maxWidth: 1080 }}>
            One window.
            <br />
            Write the book.{" "}
            <span style={{ color: "#FFB87A" }}>Ship the book.</span>
          </p>
          <p style={{ margin: "22px 0 0", fontSize: 22, lineHeight: 1.4, color: "#C8CCCE", maxWidth: 1020, fontWeight: 400 }}>
            142 feature surfaces · Mac + Windows · universal HTML app
            + native installers · Apple/Microsoft-grade polish · SHA-256
            verified · §4A no-saas · once · forever.
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
              ::FREE forever · §4A no-SaaS · the system that compiled I Am AI
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
