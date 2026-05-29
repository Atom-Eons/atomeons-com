import { ImageResponse } from "next/og";
import { PATHS, getPath, type PathId } from "../_data/paths";

// NOTE: Cannot use `runtime = "edge"` with generateStaticParams (Next 16
// forbids the combination). Static build emits one OG card per path at
// build time and serves them from the CDN — no per-request runtime
// needed.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PATH_IDS: PathId[] = ["worker", "builder", "student", "operator", "curious"];

export function generateImageMetadata({
  params,
}: {
  params: { persona: string };
}) {
  const path = getPath(params.persona as PathId);
  return [
    {
      id: "default",
      alt: path
        ? `${path.label} — AtomEons /learn path · ${path.lessons.length} lessons · ${path.weeks} weeks · CC-BY 4.0. ${path.oneLine}`
        : "AtomEons /learn path",
      contentType: "image/png",
      size,
    },
  ];
}

export async function generateStaticParams() {
  return PATH_IDS.map((id) => ({ persona: id }));
}

/**
 * /learn/[persona] dynamic OG card.
 *
 * Per-path 1200×630 PNG. Different humans share different paths;
 * each path gets a card calibrated to its persona (accent color,
 * lesson count, week count, one-line pitch).
 */
export default async function OG({
  params,
}: {
  params: { persona: string };
}) {
  const path = getPath(params.persona as PathId);
  if (!path) {
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#050a0c",
            color: "#F2F4F5",
            fontFamily: '"Helvetica", "Arial", sans-serif',
            fontSize: 48,
          }}
        >
          AtomEons /learn
        </div>
      ),
      { ...size },
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          background: `radial-gradient(65% 55% at 85% 25%, ${path.accent}40 0%, transparent 60%), radial-gradient(55% 50% at 10% 90%, rgba(34,240,213,0.16) 0%, transparent 65%), #050a0c`,
          color: "#F2F4F5",
          padding: 60,
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
            ATOMEONS · /LEARN · PATH · CC-BY 4.0
          </p>
          <p
            style={{
              margin: 0,
              fontFamily: "monospace",
              fontSize: 12,
              letterSpacing: 5,
              textTransform: "uppercase",
              color: path.accent,
            }}
          >
            ● {path.lessons.length} LESSONS · {path.weeks} WEEKS
          </p>
        </div>

        {/* PERSONA TAG */}
        <div
          style={{
            display: "flex",
            marginTop: 36,
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "14px 28px",
              border: `2px solid ${path.accent}`,
              borderRadius: 999,
              background: `${path.accent}15`,
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: path.accent,
              }}
            />
            <p
              style={{
                margin: 0,
                fontFamily: "monospace",
                fontSize: 22,
                letterSpacing: 5,
                textTransform: "uppercase",
                color: path.accent,
                fontWeight: 700,
              }}
            >
              {path.id}
            </p>
          </div>
        </div>

        {/* HEADLINE */}
        <p
          style={{
            margin: "30px 0 0",
            fontSize: 64,
            fontWeight: 500,
            lineHeight: 1.04,
            letterSpacing: -1.5,
            color: "#F2F4F5",
            maxWidth: 1080,
          }}
        >
          {path.label}
        </p>

        {/* ONE LINER */}
        <p
          style={{
            margin: "24px 0 0",
            fontSize: 22,
            lineHeight: 1.4,
            color: "#C8CCCE",
            maxWidth: 1040,
          }}
        >
          {path.oneLine}
        </p>

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
              ::~{Math.round(path.totalMinutes / 60)} hours total · honest pace
            </p>
            <p
              style={{
                margin: 0,
                fontSize: 24,
                color: "#22F0D5",
                fontFamily: "monospace",
                fontWeight: 700,
              }}
            >
              atomeons.com/learn/{path.id}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 12,
              padding: "16px 24px",
              background: path.accent,
              borderRadius: 14,
              boxShadow: `0 0 60px ${path.accent}70`,
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 36,
                fontWeight: 700,
                color: "#0B1014",
                lineHeight: 1,
              }}
            >
              FREE
            </p>
            <p
              style={{
                margin: 0,
                fontSize: 12,
                color: "#0B1014",
                textTransform: "uppercase",
                letterSpacing: 2.5,
                fontWeight: 700,
              }}
            >
              cc-by 4.0
            </p>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
