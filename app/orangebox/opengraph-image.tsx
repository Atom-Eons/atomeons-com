import { ImageResponse } from "next/og";

export const runtime = "edge";
// Force dynamic generation · do not serve the year-long-immutable
// cache that ImageResponse defaults to. This matters because X /
// Twitter / Facebook cache OG cards aggressively — when they
// re-scrape the URL (hours-to-days after first share), we want them
// to get the CURRENT PNG, not whatever Vercel's edge cached at the
// time of first deploy. Operator-corrected 2026-05-31: 'orangebox x
// card is old still'.
export const dynamic = "force-dynamic";
export const revalidate = 0;

export const alt =
  "Orangebox v1.0.0-beta — turbo-optimize Claude · 10-80× context compression · persistent memory · skill primers · tamper-evident receipts · FREE launch week · perpetual after · §4A no-saas · AtomEons";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * /orangebox product card · v1.0.0-beta · TURBO-OPTIMIZE CLAUDE.
 * Warm ember palette mirroring the in-app cockpit (NOT cool tech blue).
 * Headers force-dynamic so X/Twitter scrapes get the current PNG.
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
            "radial-gradient(60% 50% at 75% 25%, rgba(255,119,51,0.32) 0%, transparent 65%), radial-gradient(45% 40% at 15% 95%, rgba(255,170,68,0.18) 0%, transparent 65%), #1A1410",
          color: "#E8D5B7",
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
            borderBottom: "1px solid #3D2F22",
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: "monospace",
              fontSize: 12,
              letterSpacing: 5,
              textTransform: "uppercase",
              color: "#FF7733",
            }}
          >
            ATOMEONS · ORANGEBOX · v1.0.0-beta · SHIPPED
          </p>
          <p
            style={{
              margin: 0,
              fontFamily: "monospace",
              fontSize: 12,
              letterSpacing: 5,
              textTransform: "uppercase",
              color: "#FFAA66",
            }}
          >
            ● FREE launch week · ends June 6
          </p>
        </div>

        {/* HEADLINE */}
        <div style={{ display: "flex", flexDirection: "column", marginTop: 30 }}>
          <p
            style={{
              margin: 0,
              fontFamily: "monospace",
              fontSize: 14,
              letterSpacing: 5,
              textTransform: "uppercase",
              color: "#FF7733",
            }}
          >
            ORANGEBOX · v1.0.0-beta · SHIPPED 2026-05-30
          </p>
          <p
            style={{
              margin: "16px 0 0",
              fontSize: 96,
              fontWeight: 500,
              lineHeight: 0.95,
              letterSpacing: -3,
              color: "#E8D5B7",
              maxWidth: 1080,
            }}
          >
            Turbo-optimize
            <br />
            <span style={{ color: "#FF7733" }}>Claude.</span>
          </p>
          <p
            style={{
              margin: "22px 0 0",
              fontSize: 22,
              lineHeight: 1.4,
              color: "#C4AD8E",
              maxWidth: 1040,
              fontWeight: 400,
            }}
          >
            Persistent memory across sessions. 10-80× context compression.
            Reusable skill primers. Tamper-evident JSON receipts on every
            action. 14-department named-role router. Built in 75 days,
            with itself.
          </p>
        </div>

        {/* trust rail */}
        <div
          style={{
            display: "flex",
            gap: 12,
            marginTop: 22,
            flexWrap: "wrap",
          }}
        >
          {[
            "🟧 Optimized for Claude",
            "🔒 Local-first",
            "🔑 BYO key · zero markup",
            "🧾 Receipt-backed",
            "♾ Perpetual · §4A",
          ].map((b) => (
            <span
              key={b}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "8px 14px",
                border: "1px solid #3D2F22",
                borderRadius: 999,
                background: "rgba(34,26,20,0.7)",
                fontFamily: "monospace",
                fontSize: 12,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: "#C4AD8E",
              }}
            >
              {b}
            </span>
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
            borderTop: "1px solid #3D2F22",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <p
              style={{
                margin: 0,
                fontSize: 11,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "#8A7560",
                fontFamily: "monospace",
              }}
            >
              ::built in 75 days · with itself · §4A no-saas lock
            </p>
            <p
              style={{
                margin: 0,
                fontSize: 22,
                color: "#FF7733",
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
              background: "#FF7733",
              borderRadius: 14,
              boxShadow: "0 0 60px rgba(255,119,51,0.55)",
            }}
          >
            <p style={{ margin: 0, fontSize: 52, fontWeight: 700, color: "#1A1410", lineHeight: 1 }}>
              FREE
            </p>
            <p
              style={{
                margin: 0,
                fontSize: 14,
                color: "#1A1410",
                textTransform: "uppercase",
                letterSpacing: 2.5,
                fontWeight: 700,
              }}
            >
              this week · grandfathered
            </p>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
