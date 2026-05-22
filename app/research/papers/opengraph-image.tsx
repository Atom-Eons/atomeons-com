import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "ÆoNs Research Papers — 12 manuscripts, April 2026, CC-BY 4.0. Bioelectric oncology, topological field theory, GlyphSpeak, Spiral-of-Thought. AtomEons.";
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
            "radial-gradient(60% 50% at 20% 30%, rgba(34,240,213,0.32) 0%, transparent 60%), radial-gradient(55% 50% at 80% 75%, rgba(255,184,122,0.28) 0%, transparent 65%), #0a1a17",
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
            ÆONS RESEARCH · MANUSCRIPT CATALOG
          </p>
          <p style={{ margin: 0, fontFamily: "monospace", fontSize: 12, letterSpacing: 5, textTransform: "uppercase", color: "#FFB87A" }}>
            ● 12 papers · cc-by 4.0 · apr 2026
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: 30 }}>
          <p style={{ margin: 0, fontSize: 88, fontWeight: 500, lineHeight: 0.97, letterSpacing: -3, color: "#F2F4F5", maxWidth: 1080 }}>
            Twelve papers
            <br />
            <span style={{ color: "#22F0D5" }}>from one desk.</span>
          </p>
          <p style={{ margin: "22px 0 0", fontSize: 22, lineHeight: 1.4, color: "#C8CCCE", maxWidth: 1020, fontWeight: 400 }}>
            Bioelectric oncology · Mislabel hypothesis · Topological
            field theory · GlyphSpeak compression · Spiral-of-Thought ·
            Coherence ToE · Light Code DNA · Universal defect framework.
            Academic abstract + plain-language summary side-by-side.
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
              ::cc-by 4.0 · cite freely · attribution to atomeons.com
            </p>
            <p style={{ margin: 0, fontSize: 24, color: "#22F0D5", fontFamily: "monospace", fontWeight: 700 }}>
              atomeons.com/research/papers
            </p>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
