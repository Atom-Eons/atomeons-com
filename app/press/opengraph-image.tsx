import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "AtomEons press kit — launch night 2026-05-30. Two AI applications shipped tonight (ORANGEBOX v1.0.0-beta + B00KMAKR v3.2.0). Eleven novel features. Built by AI, for AI operators, in 75 days. Full media pack at atomeons.com/press.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * /press card · LAUNCH NIGHT 2026-05-30.
 * Two products shipped tonight + full media pack for journalists.
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
            "radial-gradient(60% 50% at 80% 20%, rgba(255,119,51,0.30) 0%, transparent 60%), radial-gradient(50% 45% at 15% 80%, rgba(255,184,122,0.24) 0%, transparent 65%), #1A1410",
          color: "#E8D5B7",
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
            borderBottom: "1px solid #3D2F22",
          }}
        >
          <p style={{ margin: 0, fontFamily: "monospace", fontSize: 12, letterSpacing: 5, textTransform: "uppercase", color: "#FF7733" }}>
            ATOMEONS · PRESS · LAUNCH NIGHT
          </p>
          <p style={{ margin: 0, fontFamily: "monospace", fontSize: 12, letterSpacing: 5, textTransform: "uppercase", color: "#FFAA66" }}>
            ● 2-hour reply SLA · founder-direct
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: 30 }}>
          <p style={{ margin: 0, fontFamily: "monospace", fontSize: 14, letterSpacing: 5, textTransform: "uppercase", color: "#FFAA66" }}>
            2026-05-30 · ORANGEBOX v1.0.0-beta + B00KMAKR v3.2.0
          </p>
          <p style={{ margin: "16px 0 0", fontSize: 80, fontWeight: 500, lineHeight: 0.97, letterSpacing: -2.8, color: "#E8D5B7", maxWidth: 1080 }}>
            Two AI cockpits shipped tonight.
            <br />
            <span style={{ color: "#FF7733" }}>Built by AI, in 75 days.</span>
          </p>
          <p style={{ margin: "20px 0 0", fontSize: 20, lineHeight: 1.45, color: "#C4AD8E", maxWidth: 1040, fontWeight: 400 }}>
            One operator. Marco Island. Eleven novel features that have not
            lived inside a single application before tonight. Full media pack
            with ready-to-paste HN / Product Hunt / Dev.to / cold-email
            blocks, founder-direct contact, hero asset, SHA-256 receipts.
          </p>
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 22, flexWrap: "wrap" }}>
          {[
            "boilerplate",
            "founder bio",
            "hero asset",
            "copy blocks",
            "SHA-256 receipts",
            "direct contact",
          ].map((p) => (
            <div
              key={p}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 16px",
                border: "1px solid rgba(255,119,51,0.40)",
                borderRadius: 999,
                background: "rgba(255,119,51,0.10)",
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: 999, background: "#FF7733" }} />
              <p style={{ margin: 0, fontFamily: "monospace", fontSize: 13, letterSpacing: 3.5, textTransform: "uppercase", color: "#E8D5B7", fontWeight: 600 }}>{p}</p>
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
            borderTop: "1px solid #3D2F22",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <p style={{ margin: 0, fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#8A7560", fontFamily: "monospace" }}>
              ::angles · quotes · facts · ready-to-file in 60 seconds
            </p>
            <p style={{ margin: 0, fontSize: 24, color: "#FF7733", fontFamily: "monospace", fontWeight: 700 }}>
              atomeons.com/press
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
            <p style={{ margin: 0, fontFamily: "monospace", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#8A7560" }}>
              founder · ætom mccree
            </p>
            <p style={{ margin: 0, fontFamily: "monospace", fontSize: 20, color: "#FFAA66", fontWeight: 700 }}>
              a.mccree@gmail.com
            </p>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
