import { ImageResponse } from "next/og";
import { getPaper } from "../../../_data/research-papers";

export const runtime = "nodejs";
export const alt = "ÆoNs Research — paper card";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Per-paper Open Graph image. Renders the paper title + authors + kid
 * summary + keyword chips in a brand-perfect 1200×630 card so social
 * shares (X, LinkedIn, Slack, Discord, iMessage) carry the actual
 * research content instead of the generic site OG.
 *
 * Reads from the local catalog (research-papers.ts) — no Supabase round
 * trip needed since paper metadata is committed to the repo.
 */
export default async function Image({
  params,
}: {
  params: { slug: string };
}) {
  const paper = getPaper(params.slug);
  if (!paper) {
    // fallback generic ÆoNs Research card
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            background: "#000",
            color: "#22F0D5",
            fontSize: 72,
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 700,
            letterSpacing: -2,
          }}
        >
          ÆoNs Research
        </div>
      ),
      { ...size },
    );
  }

  const titleFontSize = paper.title.length > 70 ? 44 : 60;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          background:
            "radial-gradient(70% 55% at 70% 30%, rgba(34,240,213,0.22) 0%, transparent 60%), radial-gradient(50% 40% at 15% 95%, rgba(255,122,26,0.16) 0%, transparent 65%), #000000",
          color: "#F2F4F5",
          padding: 56,
          fontFamily:
            '"Helvetica", "Arial", -apple-system, BlinkMacSystemFont, sans-serif',
        }}
      >
        {/* TOP STRIP — Æ Research wordmark + date */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: 14,
            borderBottom: "1px solid #1A2225",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span
              style={{
                fontSize: 36,
                fontWeight: 700,
                color: "#22F0D5",
                letterSpacing: -2,
              }}
            >
              Æ
            </span>
            <p
              style={{
                margin: 0,
                fontFamily: "monospace",
                fontSize: 14,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "#22F0D5",
              }}
            >
              ÆoNs Research · Manuscript
            </p>
          </div>
          <p
            style={{
              margin: 0,
              fontFamily: "monospace",
              fontSize: 11,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#FF7A1A",
            }}
          >
            ● {paper.date} · CC-BY 4.0
          </p>
        </div>

        {/* TITLE BLOCK */}
        <div style={{ display: "flex", flexDirection: "column", marginTop: 28, flex: 1 }}>
          <p
            style={{
              margin: "0 0 16px",
              fontFamily: "monospace",
              fontSize: 13,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#FF7A1A",
            }}
          >
            ::{paper.status === "summarized" ? "academic + plain-language" : "manuscript indexed"}
          </p>
          <p
            style={{
              margin: 0,
              fontSize: titleFontSize,
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: -2,
              color: "#F2F4F5",
              maxWidth: 1080,
            }}
          >
            {paper.title}
          </p>
          <p
            style={{
              margin: "20px 0 0",
              fontFamily: "monospace",
              fontSize: 13,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              color: "#6B7779",
              maxWidth: 1080,
            }}
          >
            {paper.authors}
          </p>
          <p
            style={{
              margin: "24px 0 0",
              fontSize: 20,
              lineHeight: 1.4,
              color: "#9BA5A7",
              maxWidth: 1020,
              fontWeight: 400,
            }}
          >
            <span style={{ color: "#22F0D5" }}>::kid: </span>
            {paper.kid_summary.length > 240
              ? paper.kid_summary.slice(0, 238) + "…"
              : paper.kid_summary}
          </p>
        </div>

        {/* KEYWORD CHIPS */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            marginTop: 18,
          }}
        >
          {paper.keywords.slice(0, 6).map((k) => (
            <span
              key={k}
              style={{
                display: "flex",
                padding: "5px 11px",
                border: "1px solid #1A2225",
                borderRadius: 6,
                fontFamily: "monospace",
                fontSize: 11,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: "#22F0D5",
                background: "rgba(10,15,17,0.8)",
              }}
            >
              {k}
            </span>
          ))}
        </div>

        {/* BOTTOM STRIP */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginTop: 24,
            paddingTop: 18,
            borderTop: "1px solid #1A2225",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 18,
              color: "#22F0D5",
              fontFamily: "monospace",
              fontWeight: 700,
            }}
          >
            atomeons.com/research/papers/{paper.slug.slice(0, 22)}
            {paper.slug.length > 22 ? "…" : ""}
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 8,
              padding: "12px 18px",
              background: "#22F0D5",
              borderRadius: 12,
              boxShadow: "0 0 40px rgba(34,240,213,0.45)",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 32,
                fontWeight: 700,
                color: "#000",
                lineHeight: 1,
                letterSpacing: -1,
              }}
            >
              Æ
            </p>
            <p
              style={{
                margin: 0,
                fontSize: 12,
                color: "#000",
                textTransform: "uppercase",
                letterSpacing: 2,
                fontWeight: 700,
              }}
            >
              read both summaries
            </p>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
