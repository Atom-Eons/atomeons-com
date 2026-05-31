import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "AtomEons launch night 2026-05-30 — ORANGEBOX v1.0.0-beta + B00KMAKR v3.2.0 shipped. Two AI cockpits built by AI, for AI operators, in 75 days. Free for one week.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Home / atomeons.com social card · LAUNCH NIGHT 2026-05-30.
 * Two AI cockpits shipped tonight. Free for one week. The single most-shared
 * card on the site — needs to land the launch headline in <3 seconds.
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
            "radial-gradient(60% 50% at 75% 25%, rgba(255,119,51,0.32) 0%, transparent 65%), radial-gradient(45% 40% at 15% 90%, rgba(255,170,68,0.20) 0%, transparent 65%), #1A1410",
          color: "#E8D5B7",
          padding: 60,
          fontFamily:
            '"Helvetica", "Arial", -apple-system, BlinkMacSystemFont, sans-serif',
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: 14,
            borderBottom: "1px solid #3D2F22",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <svg width="44" height="44" viewBox="-50 -50 100 100">
              <ellipse cx="0" cy="0" rx="42" ry="14" fill="none" stroke="#FF7733" strokeWidth="2.5" opacity="0.95" />
              <ellipse cx="0" cy="0" rx="42" ry="14" fill="none" stroke="#FFAA66" strokeWidth="2" opacity="0.75" transform="rotate(60)" />
              <ellipse cx="0" cy="0" rx="42" ry="14" fill="none" stroke="#FFAA66" strokeWidth="1.5" opacity="0.5" transform="rotate(120)" />
              <circle cx="0" cy="0" r="9" fill="#FF7733" />
              <circle cx="0" cy="0" r="4" fill="#FFAA66" />
            </svg>
            <p style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: -0.5, color: "#E8D5B7" }}>
              ATOMEONS · MARCO ISLAND
            </p>
          </div>
          <p style={{ margin: 0, fontFamily: "monospace", fontSize: 12, letterSpacing: 5, textTransform: "uppercase", color: "#FFAA66" }}>
            ● shipped 2026-05-30 · FREE this week
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: 30 }}>
          <p style={{ margin: 0, fontFamily: "monospace", fontSize: 14, letterSpacing: 5, textTransform: "uppercase", color: "#FF7733" }}>
            ORANGEBOX v1.0.0-beta · B00KMAKR v3.2.0
          </p>
          <p style={{ margin: "18px 0 0", fontSize: 96, fontWeight: 500, lineHeight: 0.95, letterSpacing: -3.5, color: "#E8D5B7", maxWidth: 1100 }}>
            Two AI cockpits.
            <br />
            <span style={{ color: "#FF7733" }}>Free this week.</span>
          </p>
          <p style={{ margin: "22px 0 0", fontSize: 22, lineHeight: 1.4, color: "#C4AD8E", maxWidth: 1040, fontWeight: 400 }}>
            Built by AI, for AI operators, in 75 days using earlier versions of
            themselves. Multi-LLM. BYO keys. Tamper-evident receipts. Eleven
            novel features that have not lived inside one app before tonight.
          </p>
        </div>

        <div style={{ display: "flex", gap: 14, marginTop: 22, width: "100%" }}>
          {[
            { k: "PROVIDERS", v: "9" },
            { k: "DEPARTMENTS", v: "15" },
            { k: "SURFACES (B00KMAKR)", v: "142" },
            { k: "TELEMETRY", v: "0" },
            { k: "SUBSCRIPTIONS", v: "0" },
          ].map((m) => (
            <div
              key={m.k}
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                padding: "12px 14px",
                border: "1px solid #3D2F22",
                borderRadius: 8,
                background: "rgba(34,26,20,0.7)",
              }}
            >
              <p style={{ margin: 0, fontSize: 28, fontWeight: 700, color: "#E8D5B7", lineHeight: 1 }}>{m.v}</p>
              <p style={{ margin: "6px 0 0", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "#8A7560", fontFamily: "monospace" }}>{m.k}</p>
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
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <p style={{ margin: 0, fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#8A7560", fontFamily: "monospace" }}>
              ::built in 75 days · with itself · receipts on disk · §4A no-saas
            </p>
            <p style={{ margin: 0, fontSize: 22, color: "#FF7733", fontFamily: "monospace", fontWeight: 700 }}>
              atomeons.com
            </p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 12,
              padding: "18px 28px",
              background: "#FF7733",
              borderRadius: 14,
              boxShadow: "0 0 60px rgba(255,119,51,0.55)",
            }}
          >
            <p style={{ margin: 0, fontSize: 60, fontWeight: 700, color: "#1A1410", lineHeight: 1 }}>
              FREE
            </p>
            <p style={{ margin: 0, fontSize: 14, color: "#1A1410", textTransform: "uppercase", letterSpacing: 2.5, fontWeight: 700 }}>
              ends June 6 · 4 PM EDT
            </p>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
