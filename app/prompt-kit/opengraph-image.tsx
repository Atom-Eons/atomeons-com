import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "AtomEons /prompt-kit — every drill prompt from the 27-lesson /learn curriculum in one consolidated copy-paste vault. Grouped by 5 levels. One-click copy on each. Free, no signup, CC-BY 4.0.";
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
            "radial-gradient(60% 50% at 25% 30%, rgba(34,240,213,0.30) 0%, transparent 60%), radial-gradient(55% 50% at 85% 80%, rgba(255,184,122,0.22) 0%, transparent 65%), #050a0c",
          color: "#F2F4F5",
          padding: 60,
          fontFamily:
            '"Helvetica", "Arial", -apple-system, BlinkMacSystemFont, sans-serif',
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 14, borderBottom: "1px solid #1A2225" }}>
          <p style={{ margin: 0, fontFamily: "monospace", fontSize: 12, letterSpacing: 5, textTransform: "uppercase", color: "#22F0D5" }}>
            ATOMEONS · /PROMPT-KIT · CC-BY 4.0
          </p>
          <p style={{ margin: 0, fontFamily: "monospace", fontSize: 12, letterSpacing: 5, textTransform: "uppercase", color: "#FFB87A" }}>
            ● 27 prompts · 5 levels
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: 30 }}>
          <p style={{ margin: 0, fontFamily: "monospace", fontSize: 16, letterSpacing: 5, textTransform: "uppercase", color: "#22F0D5" }}>
            ▲ COPY-PASTE PROMPT VAULT
          </p>
          <p style={{ margin: "20px 0 0", fontSize: 110, fontWeight: 500, lineHeight: 0.94, letterSpacing: -3, color: "#F2F4F5", maxWidth: 1080 }}>
            Every
            <br />
            prompt.
            <br />
            <span style={{ color: "#22F0D5" }}>One page.</span>
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
              ::works in claude · chatgpt · gemini · today
            </p>
            <p style={{ margin: 0, fontSize: 24, color: "#22F0D5", fontFamily: "monospace", fontWeight: 700 }}>
              atomeons.com/prompt-kit
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, padding: "16px 24px", background: "#22F0D5", borderRadius: 14, boxShadow: "0 0 60px rgba(34,240,213,0.45)" }}>
            <p style={{ margin: 0, fontSize: 38, fontWeight: 700, color: "#0B1014", lineHeight: 1 }}>
              FREE
            </p>
            <p style={{ margin: 0, fontSize: 12, color: "#0B1014", textTransform: "uppercase", letterSpacing: 2.5, fontWeight: 700 }}>
              copy any · attribute · cc-by 4.0
            </p>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
