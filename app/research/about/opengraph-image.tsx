import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "About ÆoNs Research — the research arm of AtomEons. Solo independent lab. CC-BY 4.0. Twelve manuscripts. Marco Island.";
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
            "radial-gradient(60% 55% at 70% 30%, rgba(117,255,196,0.32) 0%, transparent 60%), radial-gradient(50% 45% at 20% 80%, rgba(34,240,213,0.30) 0%, transparent 65%), #0a1a17",
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
            ÆONS RESEARCH · ABOUT THE LAB
          </p>
          <p style={{ margin: 0, fontFamily: "monospace", fontSize: 12, letterSpacing: 5, textTransform: "uppercase", color: "#FFB87A" }}>
            ● solo · cc-by 4.0 · open access
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: 30 }}>
          <p style={{ margin: 0, fontFamily: "monospace", fontSize: 14, letterSpacing: 5, textTransform: "uppercase", color: "#FFB87A" }}>
            INDEPENDENT RESEARCH ARM · ATOMEONS
          </p>
          <p style={{ margin: "18px 0 0", fontSize: 84, fontWeight: 500, lineHeight: 0.97, letterSpacing: -3, color: "#F2F4F5", maxWidth: 1080 }}>
            Cross-disciplinary
            <br />
            <span style={{ color: "#22F0D5" }}>research, opened.</span>
          </p>
          <p style={{ margin: "22px 0 0", fontSize: 22, lineHeight: 1.4, color: "#C8CCCE", maxWidth: 1020, fontWeight: 400 }}>
            One operator. Twelve manuscripts. Bioelectric oncology,
            topological field theory, AI compression protocols,
            consciousness models. All under Creative Commons. Cite
            freely. Quote with attribution.
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
              ::no peer-review gate · no paywall · no publisher
            </p>
            <p style={{ margin: 0, fontSize: 24, color: "#22F0D5", fontFamily: "monospace", fontWeight: 700 }}>
              atomeons.com/research/about
            </p>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
