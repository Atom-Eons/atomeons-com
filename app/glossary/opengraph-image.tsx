import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "AtomEons /glossary — plain-English AI vocabulary. 40 terms with one-sentence definitions, A-Z anchor index, no jargon. Free, no signup, CC-BY 4.0. Quote any.";
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
            "radial-gradient(60% 50% at 20% 25%, rgba(34,240,213,0.30) 0%, transparent 60%), radial-gradient(60% 55% at 85% 85%, rgba(255,184,122,0.22) 0%, transparent 65%), #050a0c",
          color: "#F2F4F5",
          padding: 60,
          fontFamily:
            '"Helvetica", "Arial", -apple-system, BlinkMacSystemFont, sans-serif',
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 14, borderBottom: "1px solid #1A2225" }}>
          <p style={{ margin: 0, fontFamily: "monospace", fontSize: 12, letterSpacing: 5, textTransform: "uppercase", color: "#22F0D5" }}>
            ATOMEONS · /GLOSSARY · CC-BY 4.0
          </p>
          <p style={{ margin: 0, fontFamily: "monospace", fontSize: 12, letterSpacing: 5, textTransform: "uppercase", color: "#FFB87A" }}>
            ● 40 terms · plain english
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: 30 }}>
          <p style={{ margin: 0, fontFamily: "monospace", fontSize: 16, letterSpacing: 5, textTransform: "uppercase", color: "#22F0D5" }}>
            ▲ PLAIN-ENGLISH AI VOCABULARY
          </p>
          <p style={{ margin: "20px 0 0", fontSize: 100, fontWeight: 500, lineHeight: 0.96, letterSpacing: -3, color: "#F2F4F5", maxWidth: 1080 }}>
            Every AI word.
            <br />
            <span style={{ color: "#22F0D5" }}>One sentence each.</span>
          </p>
        </div>

        {/* Example term row */}
        <div style={{ display: "flex", flexDirection: "column", marginTop: 28, gap: 10, maxWidth: 920 }}>
          {[
            { term: "LLM", def: "The engine behind ChatGPT, Claude, and Gemini." },
            { term: "Hallucination", def: "When the AI invents a fact that sounds correct but isn't." },
            { term: "Token", def: "Roughly a word-piece. How AI bills you and measures memory." },
          ].map((row) => (
            <div
              key={row.term}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 16,
                padding: "10px 18px",
                border: "1px solid #1A2225",
                borderLeft: "3px solid #22F0D5",
                borderRadius: 8,
                background: "rgba(0,0,0,0.4)",
              }}
            >
              <p style={{ margin: 0, fontFamily: "monospace", fontSize: 14, fontWeight: 700, color: "#22F0D5", minWidth: 130 }}>
                {row.term}
              </p>
              <p style={{ margin: 0, fontSize: 15, color: "#C8CCCE" }}>
                {row.def}
              </p>
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
            borderTop: "1px solid #1A2225",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <p style={{ margin: 0, fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#6B7779", fontFamily: "monospace" }}>
              ::A-Z anchor index · DefinedTermSet JSON-LD
            </p>
            <p style={{ margin: 0, fontSize: 24, color: "#22F0D5", fontFamily: "monospace", fontWeight: 700 }}>
              atomeons.com/glossary
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, padding: "16px 24px", background: "#22F0D5", borderRadius: 14, boxShadow: "0 0 60px rgba(34,240,213,0.45)" }}>
            <p style={{ margin: 0, fontSize: 38, fontWeight: 700, color: "#0B1014", lineHeight: 1 }}>
              FREE
            </p>
            <p style={{ margin: 0, fontSize: 12, color: "#0B1014", textTransform: "uppercase", letterSpacing: 2.5, fontWeight: 700 }}>
              quote any · cc-by 4.0
            </p>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
