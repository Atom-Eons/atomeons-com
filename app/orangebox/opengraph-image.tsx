import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "ORANGEBOX Command v6.3 — AE See-Suite + AE Operations · 60+ MCP tools · 200+ models · the cockpit replaces Claude Code, Cursor, and Codex. $49 once, forever. License §4A bans subscription.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * /orangebox product card.
 * Hard-features framing: v6.3 two-surface architecture +
 * $49 price chip + REPLACES claim + §4A no-saas signal.
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
            "radial-gradient(70% 55% at 75% 35%, rgba(34,240,213,0.30) 0%, transparent 60%), radial-gradient(50% 40% at 15% 95%, rgba(255,122,26,0.28) 0%, transparent 65%), #000000",
          color: "#F2F4F5",
          padding: 56,
          fontFamily:
            '"Helvetica", "Arial", -apple-system, BlinkMacSystemFont, sans-serif',
        }}
      >
        {/* TOP STRIP */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: 14,
            borderBottom: "1px solid #1A2225",
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: "monospace",
              fontSize: 12,
              letterSpacing: 5,
              textTransform: "uppercase",
              color: "#22F0D5",
            }}
          >
            ATOMEONS · MARCO ISLAND · v6.3 · LIVE
          </p>
          <p
            style={{
              margin: 0,
              fontFamily: "monospace",
              fontSize: 12,
              letterSpacing: 5,
              textTransform: "uppercase",
              color: "#FF7A1A",
            }}
          >
            ● replaces claude code · cursor · codex
          </p>
        </div>

        {/* HEADLINE */}
        <div style={{ display: "flex", flexDirection: "column", marginTop: 26 }}>
          <p
            style={{
              margin: 0,
              fontFamily: "monospace",
              fontSize: 14,
              letterSpacing: 5,
              textTransform: "uppercase",
              color: "#FF7A1A",
            }}
          >
            ORANGEBOX Command · v6.3
          </p>
          <p
            style={{
              margin: "16px 0 0",
              fontSize: 88,
              fontWeight: 500,
              lineHeight: 0.95,
              letterSpacing: -3,
              color: "#F2F4F5",
              maxWidth: 1080,
            }}
          >
            One file.
            <br />
            Double-click.
            <br />
            <span style={{ color: "#22F0D5" }}>2 seconds.</span>
          </p>
          <p
            style={{
              margin: "20px 0 0",
              fontSize: 22,
              lineHeight: 1.35,
              color: "#9BA5A7",
              maxWidth: 1020,
              fontWeight: 400,
            }}
          >
            v6.3 native binary · Rust + egui · no webview, no chromium.
            Two surfaces: AE See-Suite (command — receipts, dashboards,
            mission graphs) + AE Operations (engine — MCP tools, agent
            routing, 200+ models). Basic Install or AI Box.
          </p>
        </div>

        {/* two-surface rail · AE See-Suite + AE Operations */}
        <div
          style={{
            display: "flex",
            gap: 14,
            marginTop: 22,
          }}
        >
          {[
            { name: "AE See-Suite", role: "command · receipts · mission graphs", glyph: "◉" },
            { name: "AE Operations", role: "engine · MCP · routing · 200+ models", glyph: "⚙" },
          ].map((s) => (
            <div
              key={s.name}
              style={{
                display: "flex",
                flex: 1,
                alignItems: "center",
                gap: 16,
                padding: "16px 22px",
                border: "1px solid #1A2225",
                borderRadius: 12,
                background: "rgba(10, 15, 17, 0.7)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 50,
                  height: 50,
                  fontFamily: "monospace",
                  fontSize: 30,
                  color: "#22F0D5",
                  border: "1px solid #22F0D5",
                  borderRadius: 8,
                  background: "rgba(34,240,213,0.06)",
                }}
              >
                {s.glyph}
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <p
                  style={{
                    margin: 0,
                    fontSize: 22,
                    fontWeight: 700,
                    color: "#F2F4F5",
                    letterSpacing: -0.5,
                  }}
                >
                  {s.name}
                </p>
                <p
                  style={{
                    margin: "4px 0 0",
                    fontSize: 11,
                    color: "#9BA5A7",
                    fontFamily: "monospace",
                    textTransform: "uppercase",
                    letterSpacing: 2,
                  }}
                >
                  {s.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM STRIP */}
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
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
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
              ::byo keys · zero markup · local-first · §4A no-saas lock
            </p>
            <p
              style={{
                margin: 0,
                fontSize: 22,
                color: "#22F0D5",
                fontFamily: "monospace",
                fontWeight: 700,
              }}
            >
              atomeons.com/orangebox
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
