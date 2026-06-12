import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Orangebox Primer — a code-signed Windows installer that compresses Claude's context 10 to 80 times. Built by one operator in Marco Island in 75 days. AtomEons Systems Laboratory.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * /orangebox-primer social card
 *
 * Primer is a security-skeptic-grade marketing page. Card reflects
 * that: lab-grade noir, code-sign + SHA-256 receipt visible, framed
 * for a CISO scrolling LinkedIn.
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
          padding: 60,
          fontFamily:
            'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: 18, borderBottom: "1px solid #1F242B" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
            <p style={{ margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: "-0.04em", color: "#F4F4F2" }}>Æ</p>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 540, letterSpacing: "0.18em", textTransform: "uppercase", color: "#F4F4F2" }}>
              ATOMEONS · SYSTEMS LABORATORY
            </p>
          </div>
          <p style={{ margin: 0, fontFamily: "ui-monospace, monospace", fontSize: 12, letterSpacing: "0.28em", textTransform: "uppercase", color: "#22F0D5" }}>
            PRIMER · REV 06.03.2026
          </p>
        </div>

        <p style={{ margin: "44px 0 0", fontFamily: "ui-monospace, monospace", fontSize: 13, letterSpacing: "0.32em", textTransform: "uppercase", color: "#22F0D5", display: "flex" }}>
          § Vendor security review · single page
        </p>
        <p style={{ margin: "20px 0 0", fontSize: 64, fontWeight: 300, lineHeight: 1.05, letterSpacing: "-0.025em", color: "#F4F4F2", maxWidth: 1060, display: "flex" }}>
          A code-signed Windows installer that compresses Claude's context 10 to 80 times.
        </p>
        <p style={{ margin: "22px 0 0", fontFamily: "Georgia, ui-serif, serif", fontSize: 22, lineHeight: 1.4, color: "#9CA3AF", maxWidth: 980, display: "flex" }}>
          Built by one operator in Marco Island in 75 days. Every claim below carries the receipt that falsifies it.
        </p>

        <div style={{ display: "flex", gap: 0, marginTop: 32, border: "1px solid #1F242B", width: "100%" }}>
          {[
            { k: "Operator", v: "1" },
            { k: "Build days", v: "75" },
            { k: "Guardrails", v: "27" },
            { k: "Compression", v: "10–80×" },
            { k: "License", v: "§4A" },
          ].map((m, i) => (
            <div key={m.k} style={{ display: "flex", flexDirection: "column", flex: 1, padding: "20px 20px", borderLeft: i === 0 ? "none" : "1px solid #1F242B", background: "#0F1114" }}>
              <p style={{ margin: 0, fontFamily: "ui-monospace, monospace", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#7a818a" }}>{m.k}</p>
              <p style={{ margin: "10px 0 0", fontFamily: "ui-monospace, monospace", fontSize: 38, fontWeight: 400, lineHeight: 1, letterSpacing: "-0.03em", color: "#F4F4F2" }}>{m.v}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "auto", paddingTop: 24, borderTop: "1px solid #1F242B" }}>
          <p style={{ margin: 0, fontFamily: "ui-monospace, monospace", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#7a818a" }}>
            SHA-256 stamped binary · code-signed cert · BYO API key · zero markup
          </p>
          <p style={{ margin: 0, fontSize: 22, fontWeight: 600, letterSpacing: "-0.015em", color: "#22F0D5" }}>
            atomeons.com/orangebox-primer
          </p>
        </div>
      </div>
    ),
    { ...size },
  );
}
