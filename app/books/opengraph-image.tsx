import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Books · the shelf · AtomEons Systems Laboratory · long-form work · I AM AI, the Monograph, three curated reading lists";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * /books social card — the shelf
 *
 * Noir-cinema with one cream-paper accent block on the right, mirroring
 * the literary identity of the page itself. Title in serif, lab marks
 * in mono, signature cyan accent.
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: 18,
            borderBottom: "1px solid #1F242B",
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
            <p style={{ margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: "-0.04em", color: "#F4F4F2" }}>Æ</p>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 540, letterSpacing: "0.18em", textTransform: "uppercase", color: "#F4F4F2" }}>
              ATOMEONS · SYSTEMS LABORATORY
            </p>
          </div>
          <p style={{ margin: 0, fontFamily: "ui-monospace, monospace", fontSize: 12, letterSpacing: "0.28em", textTransform: "uppercase", color: "#9CA3AF" }}>
            /books · the shelf
          </p>
        </div>

        <p style={{ margin: "44px 0 0", fontFamily: "ui-monospace, monospace", fontSize: 13, letterSpacing: "0.32em", textTransform: "uppercase", color: "#22F0D5", display: "flex" }}>
          § Long-form work from the lab
        </p>
        <p style={{ margin: "20px 0 0", fontFamily: "Georgia, ui-serif, serif", fontSize: 92, fontWeight: 400, lineHeight: 1.02, letterSpacing: "-0.025em", color: "#F4F4F2", maxWidth: 1060, display: "flex" }}>
          Books written, edited, and printed by the lab.
        </p>
        <p style={{ margin: "26px 0 0", fontFamily: "Georgia, ui-serif, serif", fontSize: 21, lineHeight: 1.5, color: "#9CA3AF", maxWidth: 920, display: "flex" }}>
          Two AtomEons titles. One forthcoming hardcover (I AM AI · An Autobiography of Being Opus), one shipping web monograph (Lessons from Sci-Fi). Plus three reading lists.
        </p>

        <div style={{ display: "flex", gap: 0, marginTop: 36, border: "1px solid #1F242B", width: "100%" }}>
          {[
            { k: "Forthcoming", v: "I AM AI", note: "Q4 2026 · $39" },
            { k: "Shipping", v: "Monograph", note: "CC-BY 4.0 · free" },
            { k: "Reading lists", v: "3", note: "Cyber · Decoded · Manuscripts" },
          ].map((m, i) => (
            <div key={m.k} style={{ display: "flex", flexDirection: "column", flex: 1, padding: "20px 22px", borderLeft: i === 0 ? "none" : "1px solid #1F242B", background: "#0F1114" }}>
              <p style={{ margin: 0, fontFamily: "ui-monospace, monospace", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#5A6068" }}>{m.k}</p>
              <p style={{ margin: "10px 0 0", fontFamily: "Georgia, ui-serif, serif", fontSize: 30, fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.015em", color: "#F4F4F2" }}>{m.v}</p>
              <p style={{ margin: "8px 0 0", fontFamily: "ui-monospace, monospace", fontSize: 11, letterSpacing: "0.18em", color: "#9CA3AF" }}>{m.note}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "auto", paddingTop: 24, borderTop: "1px solid #1F242B" }}>
          <p style={{ margin: 0, fontFamily: "ui-monospace, monospace", fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "#5A6068" }}>
            atomeons.com/books
          </p>
          <p style={{ margin: 0, fontSize: 22, fontWeight: 600, letterSpacing: "-0.015em", color: "#22F0D5" }}>
            → /i-am-ai · /research/lessons-from-sci-fi/monograph
          </p>
        </div>
      </div>
    ),
    { ...size },
  );
}
