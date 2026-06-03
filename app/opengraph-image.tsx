import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "AtomEons Systems Laboratory — one operator shipped 31 papers and a code-signed Claude accelerator in 75 days. Marco Island, FL.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Homepage OG · NOIR-CINEMA V3 · 2026-06-03
 * Lab-grade card replacing the May 30 launch ember design. The card now
 * reflects the current lab pose: receipts, papers, guardrails, operator —
 * not "FREE this week."
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
          background: "#08090B",
          color: "#F4F4F2",
          padding: 64,
          fontFamily:
            'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          position: "relative",
        }}
      >
        {/* hairline grid backdrop — kept extremely subtle */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, transparent 0%, transparent 75%, rgba(34,240,213,0.04) 100%)",
            display: "flex",
          }}
        />

        {/* top rail */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: 18,
            borderBottom: "1px solid #1F242B",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
            <p
              style={{
                margin: 0,
                fontSize: 28,
                fontWeight: 700,
                letterSpacing: "-0.04em",
                color: "#F4F4F2",
              }}
            >
              Æ
            </p>
            <p
              style={{
                margin: 0,
                fontSize: 14,
                fontWeight: 540,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#F4F4F2",
              }}
            >
              ATOMEONS · SYSTEMS LABORATORY
            </p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: "#FF4D4D",
                boxShadow: "0 0 12px #FF4D4D88",
                display: "flex",
              }}
            />
            <p
              style={{
                margin: 0,
                fontFamily: "ui-monospace, SFMono-Regular, monospace",
                fontSize: 12,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "#9CA3AF",
              }}
            >
              LAB · LIVE · MARCO ISLAND, FL
            </p>
          </div>
        </div>

        {/* eyebrow */}
        <p
          style={{
            margin: "44px 0 0",
            fontFamily: "ui-monospace, SFMono-Regular, monospace",
            fontSize: 13,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "#22F0D5",
            display: "flex",
          }}
        >
          § Thesis · current build
        </p>

        {/* headline */}
        <p
          style={{
            margin: "22px 0 0",
            fontSize: 76,
            fontWeight: 300,
            lineHeight: 1.04,
            letterSpacing: "-0.025em",
            color: "#F4F4F2",
            maxWidth: 1060,
            display: "flex",
          }}
        >
          One operator shipped 31 papers and a code-signed Claude accelerator
          in 75 days.
        </p>

        {/* receipt grid */}
        <div
          style={{
            display: "flex",
            gap: 0,
            marginTop: 36,
            border: "1px solid #1F242B",
            width: "100%",
          }}
        >
          {[
            { k: "Papers", v: "31" },
            { k: "Lessons", v: "68" },
            { k: "Guardrails", v: "27" },
            { k: "Pages", v: "200+" },
            { k: "Operator", v: "1" },
          ].map((m, i) => (
            <div
              key={m.k}
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                padding: "18px 22px",
                borderLeft: i === 0 ? "none" : "1px solid #1F242B",
                background: "#0F1114",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontFamily: "ui-monospace, SFMono-Regular, monospace",
                  fontSize: 10,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#5A6068",
                }}
              >
                {m.k}
              </p>
              <p
                style={{
                  margin: "10px 0 0",
                  fontSize: 44,
                  fontWeight: 400,
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                  color: "#F4F4F2",
                }}
              >
                {m.v}
              </p>
            </div>
          ))}
        </div>

        {/* bottom rail */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginTop: "auto",
            paddingTop: 24,
            borderTop: "1px solid #1F242B",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <p
              style={{
                margin: 0,
                fontFamily: "ui-monospace, SFMono-Regular, monospace",
                fontSize: 11,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "#5A6068",
              }}
            >
              CC-BY 4.0 · §4A no-SaaS · source on request
            </p>
            <p
              style={{
                margin: 0,
                fontSize: 26,
                fontWeight: 600,
                letterSpacing: "-0.015em",
                color: "#22F0D5",
              }}
            >
              atomeons.com
            </p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 20px",
              border: "1px solid #22F0D5",
              background: "rgba(34,240,213,0.05)",
            }}
          >
            <p
              style={{
                margin: 0,
                fontFamily: "ui-monospace, SFMono-Regular, monospace",
                fontSize: 12,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#22F0D5",
              }}
            >
              Read the receipts → /receipts
            </p>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
