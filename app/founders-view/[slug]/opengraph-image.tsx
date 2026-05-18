import { ImageResponse } from "next/og";
import { publicSupabase, type FoundersViewPost } from "@/lib/supabase";

export const runtime = "nodejs";
export const alt = "The Founder's View — a letter from the lab";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Per-letter Open Graph image. Renders the letter's title + dek + theme
 * tags + Æ glyph + date in a brand-perfect 1200×630 card so social
 * shares (X, LinkedIn, Slack, iMessage, Discord) show the actual letter
 * subject instead of the generic site OG.
 *
 * Reads the letter from Supabase server-side. Falls back gracefully to a
 * generic broadcast card if the slug isn't found.
 */
export default async function Image({
  params,
}: {
  params: { slug: string };
}) {
  let post: FoundersViewPost | null = null;
  try {
    const sb = publicSupabase();
    const { data } = await sb
      .from("founders_view_posts")
      .select("*")
      .eq("slug", params.slug)
      .eq("status", "published")
      .single();
    post = (data as FoundersViewPost) ?? null;
  } catch {
    // fall through to fallback render
  }

  const title = post?.title ?? "The Founder's View";
  const dek =
    post?.dek ??
    "Letter from the lab. 8pm Eastern. Sealed and slipped under your door.";
  const theme = post?.theme ?? "broadcast";
  const dateStr = post?.published_at
    ? new Date(post.published_at).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "8pm ET · tonight";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          background:
            "radial-gradient(70% 55% at 75% 35%, rgba(255,122,26,0.22) 0%, transparent 60%), radial-gradient(50% 40% at 10% 95%, rgba(34,240,213,0.18) 0%, transparent 65%), #000000",
          color: "#F2F4F5",
          padding: 64,
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
              The Founder&apos;s View
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
            ● {dateStr} · 8pm ET
          </p>
        </div>

        {/* TITLE */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 38,
            flex: 1,
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: "monospace",
              fontSize: 14,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#FF7A1A",
            }}
          >
            ::letter from the lab · {theme}
          </p>
          <p
            style={{
              margin: "20px 0 0",
              fontSize: title.length > 50 ? 56 : 74,
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: -2.5,
              color: "#F2F4F5",
              maxWidth: 1080,
            }}
          >
            {title}
          </p>
          <p
            style={{
              margin: "28px 0 0",
              fontSize: 22,
              lineHeight: 1.4,
              color: "#9BA5A7",
              maxWidth: 1020,
              fontWeight: 400,
            }}
          >
            {dek}
          </p>
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
              ::no email list · no algorithm · subscribe by RSS or bookmark
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
              atomeons.com/founders-view
            </p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 10,
              padding: "16px 22px",
              background: "#FF7A1A",
              borderRadius: 14,
              boxShadow: "0 0 60px rgba(255,122,26,0.55)",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 38,
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
                fontSize: 13,
                color: "#000",
                textTransform: "uppercase",
                letterSpacing: 2,
                fontWeight: 700,
              }}
            >
              ÆoNs Research
            </p>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
