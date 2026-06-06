import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Ask the lab · semantic Q&A over atomeons.com's 256 routes · Gemini-grounded answers with route-level citations · AtomEons Systems Laboratory";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ROW_GOLD = "#C9A55C";
const CYAN = "#22F0D5";
const PULSE_RED = "#FF4D4D";

/**
 * /ask social card — V3 noir.
 *
 * Left rail: lab mark + headline + sub + receipts. Right panel: the
 * search prompt rendered as if it's already been typed, with a faux
 * cursor + cyan answer block. No AI imagery — pure SVG/CSS, premium
 * restraint, matches the on-page surface byte-for-byte.
 */
export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          background: "#08090B",
          color: "#F4F4F2",
          fontFamily:
            'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          position: "relative",
        }}
      >
        {/* Top + bottom gold rule frame */}
        <div
          style={{
            position: "absolute", top: 40, left: 56, right: 56,
            height: 1, background: ROW_GOLD, opacity: 0.55, display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute", bottom: 40, left: 56, right: 56,
            height: 1, background: ROW_GOLD, opacity: 0.55, display: "flex",
          }}
        />

        {/* LEFT — receipts + lab */}
        <div
          style={{
            display: "flex", flexDirection: "column", justifyContent: "space-between",
            padding: "72px 56px", width: 680, borderRight: "1px solid #1F242B",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
              <p style={{ margin: 0, fontSize: 24, fontWeight: 700, letterSpacing: "-0.04em", color: "#F4F4F2" }}>Æ</p>
              <p style={{ margin: 0, fontSize: 12, fontWeight: 540, letterSpacing: "0.18em", textTransform: "uppercase", color: "#9CA3AF" }}>
                ATOMEONS · SYSTEMS LABORATORY
              </p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 14, margin: "44px 0 0" }}>
              <div style={{
                display: "flex", padding: "6px 12px",
                border: `2px solid ${PULSE_RED}`, background: "rgba(255,77,77,0.12)",
              }}>
                <p style={{
                  margin: 0, fontFamily: "ui-monospace, SFMono-Regular, monospace",
                  fontSize: 13, fontWeight: 600, letterSpacing: "0.32em",
                  textTransform: "uppercase", color: PULSE_RED, display: "flex",
                }}>
                  LIVE · /ASK
                </p>
              </div>
              <p style={{
                margin: 0, fontFamily: "ui-monospace, SFMono-Regular, monospace",
                fontSize: 12, letterSpacing: "0.28em", textTransform: "uppercase",
                color: CYAN, display: "flex",
              }}>
                § semantic Q&A · 256 routes
              </p>
            </div>

            <p style={{
              margin: "20px 0 0", fontSize: 60, fontWeight: 300, lineHeight: 1.02,
              letterSpacing: "-0.03em", color: "#F4F4F2", maxWidth: 560, display: "flex",
            }}>
              Type any question.
            </p>
            <p style={{
              margin: "8px 0 0", fontSize: 60, fontWeight: 300, lineHeight: 1.02,
              letterSpacing: "-0.03em", color: CYAN, maxWidth: 560, display: "flex",
            }}>
              The lab answers.
            </p>

            <p style={{
              margin: "26px 0 0", fontFamily: "Georgia, ui-serif, serif",
              fontSize: 19, lineHeight: 1.5, color: "#9CA3AF",
              maxWidth: 560, display: "flex",
            }}>
              Retrieval over 256 routes · gemini-2.5-flash synthesis ·
              grounded only on lab content · every source cited inline.
            </p>
          </div>

          <div style={{
            display: "flex", flexDirection: "column", gap: 8, paddingTop: 20,
            borderTop: "1px solid #1F242B",
          }}>
            <p style={{
              margin: 0, fontFamily: "ui-monospace, SFMono-Regular, monospace",
              fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase",
              color: "#5A6068",
            }}>
              POST /api/ask · 2-5 sentences · zero query logs
            </p>
            <p style={{
              margin: 0, fontSize: 22, fontWeight: 600, letterSpacing: "-0.015em",
              color: CYAN,
            }}>
              atomeons.com/ask
            </p>
          </div>
        </div>

        {/* RIGHT — terminal-style ask preview */}
        <div style={{
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: "56px 44px", width: 520, background: "#0B0C0F", position: "relative",
        }}>
          {/* "input bar" */}
          <div style={{
            display: "flex", flexDirection: "column",
            border: `1px solid ${CYAN}`, background: "#08090B", padding: "16px 18px",
          }}>
            <p style={{
              margin: 0, fontFamily: "ui-monospace, SFMono-Regular, monospace",
              fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase",
              color: CYAN, display: "flex",
            }}>
              ASK THE LAB ›
            </p>
            <p style={{
              margin: "10px 0 0", fontSize: 18, color: "#F4F4F2",
              fontWeight: 400, display: "flex",
            }}>
              what does the lab say about
            </p>
            <p style={{
              margin: "2px 0 0", fontSize: 18, color: "#F4F4F2",
              fontWeight: 400, display: "flex", alignItems: "baseline", gap: 4,
            }}>
              <span>prompt injection defenses</span>
              <span style={{ display: "flex", width: 9, height: 19, background: CYAN }} />
            </p>
          </div>

          {/* "answer block" */}
          <div style={{
            display: "flex", flexDirection: "column",
            borderLeft: `2px solid ${CYAN}`, background: "#0F1114",
            padding: "20px 22px", marginTop: 22,
          }}>
            <p style={{
              margin: 0, fontFamily: "ui-monospace, SFMono-Regular, monospace",
              fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase",
              color: CYAN, display: "flex",
            }}>
              GEMINI ANSWER · grounded · 5 sources
            </p>
            <p style={{
              margin: "12px 0 0", fontFamily: "Georgia, ui-serif, serif",
              fontSize: 17, lineHeight: 1.5, color: "#F4F4F2",
              display: "flex",
            }}>
              Prompt injection is an attack where adversarial instructions hidden in untrusted input hijack a language model into ignoring its original instructions (atomeons.com/q/what-is-prompt-injection)…
            </p>
          </div>

          {/* source chip row */}
          <div style={{ display: "flex", gap: 8, marginTop: 18, flexWrap: "wrap" }}>
            {[
              "/q/what-is-prompt-injection",
              "/learn/trust/prompt-injection",
              "/prompt-kit",
            ].map((s) => (
              <div key={s} style={{
                display: "flex",
                border: "1px solid #1F242B", background: "#08090B",
                padding: "5px 9px",
              }}>
                <p style={{
                  margin: 0, fontFamily: "ui-monospace, SFMono-Regular, monospace",
                  fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase",
                  color: "#9CA3AF", display: "flex",
                }}>
                  {s}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
