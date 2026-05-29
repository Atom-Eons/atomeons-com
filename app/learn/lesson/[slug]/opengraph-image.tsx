import { ImageResponse } from "next/og";
import { LESSONS, getLesson } from "../../_data/lessons";
import { getLevel } from "../../_data/levels";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateImageMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const lesson = getLesson(params.slug);
  return [
    {
      id: "default",
      alt: lesson
        ? `${lesson.title} — Lesson ${lesson.number} of ${LESSONS.length} in the AtomEons /learn curriculum. ${lesson.oneLiner}`
        : "AtomEons /learn lesson",
      contentType: "image/png",
      size,
    },
  ];
}

export async function generateStaticParams() {
  return LESSONS.map((l) => ({ slug: l.slug }));
}

/**
 * /learn/lesson/[slug] dynamic OG card.
 *
 * Per-lesson 1200×630 PNG generated at build time. Carries:
 *   - lesson title (truncated to ~110 chars for layout)
 *   - level chip (color-coded by level accent)
 *   - lesson number / total
 *   - time estimate
 *   - one-line concept tease
 *
 * Each lesson gets its own social-share asset so sharing
 * /learn/lesson/<slug> on X / LinkedIn / Bluesky surfaces the
 * specific lesson, not just the generic curriculum card.
 */
export default async function OG({
  params,
}: {
  params: { slug: string };
}) {
  const lesson = getLesson(params.slug);
  if (!lesson) {
    // Fallback for unmatched slugs (should never hit, since
    // generateStaticParams only emits real slugs).
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
  const level = getLevel(lesson.level);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          background: `radial-gradient(60% 50% at 80% 25%, ${level.accent}40 0%, transparent 60%), radial-gradient(55% 50% at 15% 85%, rgba(34,240,213,0.18) 0%, transparent 65%), #050a0c`,
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
            ATOMEONS · /LEARN · LESSON {lesson.number} OF {LESSONS.length}
          </p>
          <p
            style={{
              margin: 0,
              fontFamily: "monospace",
              fontSize: 12,
              letterSpacing: 5,
              textTransform: "uppercase",
              color: "#FFB87A",
            }}
          >
            ● ~{lesson.timeMinutes} MIN · CC-BY 4.0
          </p>
        </div>

        {/* LEVEL CHIP */}
        <div
          style={{
            display: "flex",
            marginTop: 32,
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 22px",
              border: `2px solid ${level.accent}`,
              borderRadius: 999,
              background: `${level.accent}15`,
            }}
          >
            <span
              style={{
                width: 9,
                height: 9,
                borderRadius: 999,
                background: level.accent,
              }}
            />
            <p
              style={{
                margin: 0,
                fontFamily: "monospace",
                fontSize: 16,
                letterSpacing: 3.5,
                textTransform: "uppercase",
                color: level.accent,
                fontWeight: 700,
              }}
            >
              L{level.number} · {level.name}
            </p>
          </div>
        </div>

        {/* HEADLINE — lesson title */}
        <p
          style={{
            margin: "26px 0 0",
            fontSize: lesson.title.length > 60 ? 56 : 68,
            fontWeight: 500,
            lineHeight: 1.05,
            letterSpacing: -1.5,
            color: "#F2F4F5",
            maxWidth: 1080,
          }}
        >
          {lesson.title}
        </p>

        {/* ONE-LINER */}
        <p
          style={{
            margin: "24px 0 0",
            fontSize: 22,
            lineHeight: 1.4,
            color: "#C8CCCE",
            maxWidth: 1000,
          }}
        >
          {lesson.oneLiner}
        </p>

        {/* TAGS */}
        <div
          style={{
            display: "flex",
            gap: 8,
            marginTop: 28,
            flexWrap: "wrap",
          }}
        >
          {lesson.tags.slice(0, 4).map((t) => (
            <p
              key={t}
              style={{
                margin: 0,
                padding: "6px 14px",
                border: "1px solid #1A2225",
                borderRadius: 999,
                background: "#0E1418",
                fontFamily: "monospace",
                fontSize: 12,
                letterSpacing: 2.5,
                textTransform: "uppercase",
                color: "#9BA5A7",
              }}
            >
              {t}
            </p>
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
              ::concept · drill · outcome · trap
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
              atomeons.com/learn/lesson/{lesson.slug}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 4,
            }}
          >
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
              free · no signup · no list
            </p>
            <p
              style={{
                margin: 0,
                fontSize: 24,
                fontWeight: 700,
                fontFamily: "monospace",
                color: level.accent,
              }}
            >
              ÆONS
            </p>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
