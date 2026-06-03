import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "skil.ski — the universal skill registry for AI agents. Universal registry, universal claim, MCP-native. AtomEons.";
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
            "radial-gradient(60% 50% at 25% 25%, rgba(255,184,122,0.34) 0%, transparent 60%), radial-gradient(55% 50% at 80% 75%, rgba(34,240,213,0.30) 0%, transparent 65%), #08090B",
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
            ATOMEONS · SKIL.SKI · MCP-NATIVE REGISTRY
          </p>
          <p style={{ margin: 0, fontFamily: "monospace", fontSize: 12, letterSpacing: 5, textTransform: "uppercase", color: "#FFB87A" }}>
            ● make money pillar
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: 30 }}>
          <p style={{ margin: 0, fontFamily: "monospace", fontSize: 16, letterSpacing: 7, textTransform: "lowercase", color: "#FFB87A", fontWeight: 700 }}>
            skil.ski
          </p>
          <p style={{ margin: "16px 0 0", fontSize: 84, fontWeight: 500, lineHeight: 0.97, letterSpacing: -3, color: "#F2F4F5", maxWidth: 1080 }}>
            The universal
            <br />
            <span style={{ color: "#22F0D5" }}>skill registry</span>
            <br />
            for AI agents.
          </p>
          <p style={{ margin: "22px 0 0", fontSize: 22, lineHeight: 1.4, color: "#C8CCCE", maxWidth: 1020, fontWeight: 400 }}>
            One name, one claim, one MCP server per skill. Compose AI
            agents from a public marketplace of verified, named skills.
            Operators publish, agents discover, everyone is paid for
            what they ship.
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
              ::mcp-native · verified-by-receipts · author-paid
            </p>
            <p style={{ margin: 0, fontSize: 24, color: "#22F0D5", fontFamily: "monospace", fontWeight: 700 }}>
              atomeons.com/skilski
            </p>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
