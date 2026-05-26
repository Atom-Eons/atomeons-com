import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "ORANGEBOX v6.3 — the cockpit replaces Claude Code, Cursor, and Codex. $49 once, forever. License §4A bans subscription.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Home / atomeons.com social card.
 * Disruption framing: ONE cockpit replaces three paid tools. $49 once,
 * forever. Two surfaces (AE See-Suite + AE Operations). §4A no-saas.
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
            "radial-gradient(70% 55% at 78% 30%, rgba(34,240,213,0.28) 0%, transparent 60%), radial-gradient(50% 40% at 10% 95%, rgba(255,122,26,0.26) 0%, transparent 65%), #000000",
          color: "#F2F4F5",
          padding: 64,
          fontFamily:
            '"Helvetica", "Arial", -apple-system, BlinkMacSystemFont, sans-serif',
        }}
      >
        {/* TOP STRIP */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingBottom: 16,
            borderBottom: "1px solid #1A2225",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <svg width="48" height="48" viewBox="-50 -50 100 100">
              <ellipse cx="0" cy="0" rx="42" ry="14" fill="none" stroke="#FF7A1A" strokeWidth="2.5" opacity="0.95" />
              <ellipse cx="0" cy="0" rx="42" ry="14" fill="none" stroke="#22F0D5" strokeWidth="2" opacity="0.75" transform="rotate(60)" />
              <ellipse cx="0" cy="0" rx="42" ry="14" fill="none" stroke="#22F0D5" strokeWidth="1.5" opacity="0.5" transform="rotate(120)" />
              <circle cx="0" cy="0" r="9" fill="#FF7A1A" />
              <circle cx="0" cy="0" r="4" fill="#FFA45A" />
            </svg>
            <p style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: -0.5, color: "#F2F4F5" }}>
              ATOMEONS · ORANGEBOX
            </p>
          </div>
          <p
            style={{
              margin: 0,
              fontSize: 12,
              letterSpacing: 5,
              textTransform: "uppercase",
              color: "#FF7A1A",
              fontFamily: "monospace",
            }}
          >
            ● v6.3 NATIVE · LIVE NOW
          </p>
        </div>

        {/* HEADLINE — disruption claim */}
        <div style={{ display: "flex", flexDirection: "column", marginTop: 28 }}>
          <p
            style={{
              margin: 0,
              fontSize: 16,
              letterSpacing: 5,
              textTransform: "uppercase",
              color: "#22F0D5",
              fontFamily: "monospace",
            }}
          >
            ▲ v6.3 native · two surfaces · $49 forever · §4A no-saas
          </p>
          <p
            style={{
              margin: "18px 0 0",
              fontSize: 76,
              fontWeight: 500,
              lineHeight: 0.97,
              letterSpacing: -2.5,
              color: "#F2F4F5",
              maxWidth: 1080,
            }}
          >
            One cockpit
            <br />
            <span style={{ color: "#FF7A1A" }}>replaces three</span> tools.
          </p>
          <p
            style={{
              margin: "22px 0 0",
              fontSize: 24,
              lineHeight: 1.35,
              color: "#9BA5A7",
              maxWidth: 1020,
              fontWeight: 400,
            }}
          >
            Native binary. No webview. No chromium. Claude · GPT · Gemini ·
            Groq LPUs · Ollama. AE See-Suite + AE Operations. Local-first.
            Zero telemetry. Zero token markup.
          </p>
        </div>

        {/* lane stat bars */}
        <div style={{ display: "flex", gap: 18, marginTop: 28, width: "100%" }}>
          {[
            { k: "SURFACES", v: "2" },
            { k: "MCP TOOLS", v: "60+" },
            { k: "MODELS", v: "200+" },
            { k: "GUARDRAILS", v: "27" },
            { k: "SUBSCRIPTIONS", v: "0" },
          ].map((m) => (
            <div
              key={m.k}
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                padding: "12px 14px",
                border: "1px solid #1A2225",
                borderRadius: 8,
                background: "rgba(10, 15, 17, 0.7)",
              }}
            >
              <p style={{ margin: 0, fontSize: 28, fontWeight: 700, color: "#F2F4F5", lineHeight: 1 }}>
                {m.v}
              </p>
              <p
                style={{
                  margin: "6px 0 0",
                  fontSize: 10,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: "#6B7779",
                  fontFamily: "monospace",
                }}
              >
                {m.k}
              </p>
            </div>
          ))}
        </div>

        {/* BOTTOM STRIP — URL + price chip */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            width: "100%",
            marginTop: "auto",
            paddingTop: 22,
            borderTop: "1px solid #1A2225",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <p
              style={{
                margin: 0,
                fontSize: 11,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "#6B7779",
                fontFamily: "monospace",
              }}
            >
              ::local-first · zero telemetry · §4A no-saas lock · 30-day refund
            </p>
            <p style={{ margin: 0, fontSize: 22, color: "#22F0D5", fontFamily: "monospace", fontWeight: 700 }}>
              atomeons.com
            </p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 12,
              padding: "18px 28px",
              background: "#FF7A1A",
              borderRadius: 14,
              boxShadow: "0 0 60px rgba(255,122,26,0.55)",
            }}
          >
            <p style={{ margin: 0, fontSize: 60, fontWeight: 700, color: "#000", lineHeight: 1 }}>
              $49
            </p>
            <p
              style={{
                margin: 0,
                fontSize: 14,
                color: "#000",
                textTransform: "uppercase",
                letterSpacing: 2.5,
                fontWeight: 700,
              }}
            >
              once · forever
            </p>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
