/**
 * NoirCard — shared OG image template for V3 noir routes.
 *
 * Used by route-specific opengraph-image.tsx files. Takes a title,
 * section tag, optional accent color, and renders a 1200x630 PNG with
 * the lab's signature V3 noir layout:
 *   - Top + bottom gold rule frame
 *   - Left rail: lab mark + section tag + accent stamp + headline + receipt line
 *   - Right rail: large numerical/symbolic anchor (route-specific)
 *
 * Each per-route opengraph-image.tsx wraps this and provides the
 * route's data. ~5 KB rendered PNG per card.
 */
import { ImageResponse } from "next/og";

type NoirCardProps = {
  section: string;          // e.g. "§ Æ12 · runtime — semantic Q&A"
  title: string;            // big headline · light weight Newsreader serif
  subtitle?: string;        // optional kicker below title
  accent?: "cyan" | "gold" | "pulse" | "graphite";  // single-accent color
  stamp?: string;           // small badge top-left, e.g. "LIVE · /ASK"
  rightPrimary?: string;    // big right-rail number / symbol
  rightLabel?: string;      // caption under right-rail
  bottomReceipt?: string;   // mono micro-text bottom-left
};

const COLORS = {
  base: "#08090B",
  panel: "#0B0C0F",
  cream: "#F4F4F2",
  graphite: "#9CA3AF",
  iron: "#5A6068",
  hair: "#1F242B",
  cyan: "#22F0D5",
  pulse: "#FF4D4D",
  gold: "#C9A55C",
};

const ACCENT_MAP: Record<NonNullable<NoirCardProps["accent"]>, string> = {
  cyan: COLORS.cyan,
  gold: COLORS.gold,
  pulse: COLORS.pulse,
  graphite: COLORS.graphite,
};

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

export function renderNoirCard({
  section,
  title,
  subtitle,
  accent = "cyan",
  stamp,
  rightPrimary,
  rightLabel,
  bottomReceipt,
}: NoirCardProps) {
  const accentColor = ACCENT_MAP[accent];
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          background: COLORS.base,
          color: COLORS.cream,
          fontFamily:
            'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          position: "relative",
        }}
      >
        {/* Top + bottom gold rules */}
        <div
          style={{
            position: "absolute", top: 40, left: 56, right: 56,
            height: 1, background: COLORS.gold, opacity: 0.55, display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute", bottom: 40, left: 56, right: 56,
            height: 1, background: COLORS.gold, opacity: 0.55, display: "flex",
          }}
        />

        {/* LEFT rail */}
        <div
          style={{
            display: "flex", flexDirection: "column", justifyContent: "space-between",
            padding: "72px 56px",
            width: rightPrimary ? 720 : "100%",
            borderRight: rightPrimary ? `1px solid ${COLORS.hair}` : undefined,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
              <p style={{ margin: 0, fontSize: 24, fontWeight: 700, letterSpacing: "-0.04em", color: COLORS.cream }}>Æ</p>
              <p style={{
                margin: 0, fontSize: 12, fontWeight: 540,
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: COLORS.graphite,
              }}>
                ATOMEONS · SYSTEMS LABORATORY
              </p>
            </div>

            {(stamp || section) && (
              <div style={{ display: "flex", alignItems: "center", gap: 14, margin: "44px 0 0" }}>
                {stamp ? (
                  <div style={{
                    display: "flex", padding: "6px 12px",
                    border: `2px solid ${accentColor}`, background: `${accentColor}1F`,
                  }}>
                    <p style={{
                      margin: 0, fontFamily: "ui-monospace, SFMono-Regular, monospace",
                      fontSize: 13, fontWeight: 600, letterSpacing: "0.32em",
                      textTransform: "uppercase", color: accentColor, display: "flex",
                    }}>{stamp}</p>
                  </div>
                ) : null}
                <p style={{
                  margin: 0, fontFamily: "ui-monospace, SFMono-Regular, monospace",
                  fontSize: 12, letterSpacing: "0.28em", textTransform: "uppercase",
                  color: accentColor, display: "flex",
                }}>{section}</p>
              </div>
            )}

            <p style={{
              margin: "24px 0 0", fontSize: 56, fontWeight: 300, lineHeight: 1.04,
              letterSpacing: "-0.03em", color: COLORS.cream,
              maxWidth: rightPrimary ? 600 : 1040,
              display: "flex",
              fontFamily: "Georgia, ui-serif, serif",
            }}>{title}</p>

            {subtitle ? (
              <p style={{
                margin: "20px 0 0", fontFamily: "Georgia, ui-serif, serif",
                fontSize: 19, lineHeight: 1.5, color: COLORS.graphite,
                maxWidth: rightPrimary ? 580 : 1000, display: "flex",
              }}>{subtitle}</p>
            ) : null}
          </div>

          {bottomReceipt ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: 20, borderTop: `1px solid ${COLORS.hair}` }}>
              <p style={{
                margin: 0, fontFamily: "ui-monospace, SFMono-Regular, monospace",
                fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase",
                color: COLORS.iron,
              }}>{bottomReceipt}</p>
              <p style={{
                margin: 0, fontSize: 22, fontWeight: 600,
                letterSpacing: "-0.015em", color: accentColor,
              }}>atomeons.com</p>
            </div>
          ) : null}
        </div>

        {/* RIGHT rail (optional numeric/symbolic anchor) */}
        {rightPrimary ? (
          <div style={{
            display: "flex", flexDirection: "column", justifyContent: "center",
            alignItems: "center", padding: "60px 36px", width: 480,
            background: COLORS.panel,
          }}>
            <p style={{
              margin: 0, fontFamily: "Georgia, ui-serif, serif",
              fontSize: 200, fontWeight: 300, lineHeight: 1,
              letterSpacing: "-0.04em", color: accentColor,
              display: "flex",
            }}>{rightPrimary}</p>
            {rightLabel ? (
              <p style={{
                margin: "32px 0 0", fontFamily: "ui-monospace, SFMono-Regular, monospace",
                fontSize: 11, letterSpacing: "0.32em", textTransform: "uppercase",
                color: COLORS.iron, textAlign: "center", maxWidth: 400, display: "flex",
              }}>{rightLabel}</p>
            ) : null}
          </div>
        ) : null}
      </div>
    ),
    { ...ogSize },
  );
}
