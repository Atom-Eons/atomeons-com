import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "The Founder's View — daily 8pm ET letter from AtomEons Systems Laboratory. Sealed. Slipped under your door. No punches pulled.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * /founders-view OG card.
 * Broadcast framing: sealed-letter-under-the-door + 8pm ET + RSS-only +
 * equal-opportunity-indignation. The card reads as a publication
 * banner, not a marketing landing page.
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
            "radial-gradient(60% 50% at 25% 30%, rgba(34, 240, 213,0.34) 0%, transparent 60%), radial-gradient(50% 45% at 80% 80%, rgba(34,240,213,0.20) 0%, transparent 65%), #08090B",
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
            ATOMEONS · NIGHTLY · 8PM ET · LIVE
          </p>
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
            ● sealed · slipped under your door
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: 38 }}>
          <p
            style={{
              margin: 0,
              fontFamily: "monospace",
              fontSize: 14,
              letterSpacing: 5,
              textTransform: "uppercase",
              color: "#22F0D5",
            }}
          >
            The Founder&apos;s View
          </p>
          <p
            style={{
              margin: "18px 0 0",
              fontSize: 96,
              fontWeight: 500,
              lineHeight: 0.95,
              letterSpacing: -3.4,
              color: "#F2F4F5",
              maxWidth: 1080,
            }}
          >
            No punches pulled.
            <br />
            <span style={{ color: "#22F0D5" }}>Every night.</span>
          </p>
          <p
            style={{
              margin: "24px 0 0",
              fontSize: 24,
              lineHeight: 1.4,
              color: "#C8CCCE",
              maxWidth: 1020,
              fontWeight: 400,
            }}
          >
            A fictional broadcast from the lab. Editorial framing is
            fiction; events cited are real and from the day&apos;s news.
            Equal opportunity indignation — every letter, no exceptions.
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
              ::no email list · no algorithm · rss subscribable
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
              atomeons.com/founders-view
            </p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 14,
              padding: "16px 26px",
              background: "#22F0D5",
              borderRadius: 14,
              boxShadow: "0 0 50px rgba(34, 240, 213,0.55)",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 38,
                fontWeight: 700,
                color: "#000",
                lineHeight: 1,
              }}
            >
              8pm
            </p>
            <p
              style={{
                margin: 0,
                fontSize: 14,
                color: "#000",
                textTransform: "uppercase",
                letterSpacing: 2.5,
                fontWeight: 700,
              }}
            >
              ET · daily
            </p>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
