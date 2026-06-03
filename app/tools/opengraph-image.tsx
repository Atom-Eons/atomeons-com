import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "AtomEons /tools — 23 job-driven AI tasks with copy-paste prompts, per-task model routing (Claude / ChatGPT / Gemini / Perplexity), and one-click launch. Pick the job. Get the prompt. Free. No signup. CC-BY 4.0.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * /tools OG card. JOB-driven framing: what do you need to do right now?
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
            "radial-gradient(70% 55% at 78% 25%, rgba(34,240,213,0.30) 0%, transparent 60%), radial-gradient(55% 50% at 12% 90%, rgba(255,184,122,0.22) 0%, transparent 65%), #050a0c",
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
            borderBottom: "1px solid #1A2225",
          }}
        >
          <p style={{ margin: 0, fontFamily: "monospace", fontSize: 12, letterSpacing: 5, textTransform: "uppercase", color: "#22F0D5" }}>
            ATOMEONS · /TOOLS · CC-BY 4.0
          </p>
          <p style={{ margin: 0, fontFamily: "monospace", fontSize: 12, letterSpacing: 5, textTransform: "uppercase", color: "#FFB87A" }}>
            ● 23 tasks · 5 categories
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: 30 }}>
          <p style={{ margin: 0, fontFamily: "monospace", fontSize: 16, letterSpacing: 5, textTransform: "uppercase", color: "#22F0D5" }}>
            ▲ JOB-DRIVEN AI TASK ROUTER
          </p>
          <p style={{ margin: "20px 0 0", fontSize: 96, fontWeight: 500, lineHeight: 0.96, letterSpacing: -3, color: "#F2F4F5", maxWidth: 1080 }}>
            What do
            <br />
            you need to
            <br />
            <span style={{ color: "#22F0D5" }}>do right now?</span>
          </p>
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 24, flexWrap: "wrap" }}>
          {[
            { label: "WRITING", color: "#22F0D5" },
            { label: "DECODING", color: "#FFB87A" },
            { label: "PLANNING", color: "#22F0D5" },
            { label: "DECIDING", color: "#22F0D5" },
            { label: "LEARNING", color: "#22F0D5" },
          ].map((p) => (
            <div
              key={p.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 18px",
                border: `1px solid ${p.color}55`,
                borderRadius: 999,
                background: `${p.color}10`,
              }}
            >
              <span style={{ width: 7, height: 7, borderRadius: 999, background: p.color }} />
              <p style={{ margin: 0, fontFamily: "monospace", fontSize: 13, letterSpacing: 3, textTransform: "uppercase", color: p.color, fontWeight: 700 }}>
                {p.label}
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
              ::pick the job · get the prompt · launch the AI
            </p>
            <p style={{ margin: 0, fontSize: 24, color: "#22F0D5", fontFamily: "monospace", fontWeight: 700 }}>
              atomeons.com/tools
            </p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 12,
              padding: "16px 24px",
              background: "#22F0D5",
              borderRadius: 14,
              boxShadow: "0 0 60px rgba(34,240,213,0.45)",
            }}
          >
            <p style={{ margin: 0, fontSize: 38, fontWeight: 700, color: "#0B1014", lineHeight: 1 }}>
              FREE
            </p>
            <p style={{ margin: 0, fontSize: 12, color: "#0B1014", textTransform: "uppercase", letterSpacing: 2.5, fontWeight: 700 }}>
              no signup · cc-by 4.0
            </p>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
