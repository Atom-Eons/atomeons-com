"use client";

import { useEffect } from "react";

/**
 * app/global-error.tsx · Wave 145k · 2026-07-02
 *
 * Root-layout error boundary. Different from error.tsx: this catches
 * errors thrown by the root layout itself (or by segments before the
 * closer error.tsx can mount). Must include its own <html>+<body>
 * because it replaces the whole tree.
 *
 * Minimal + self-contained: no font imports, no CSS variables, no
 * Link components. Even if globals.css failed to load or fonts
 * failed to fetch, this page still renders legibly.
 */

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error("[atomeons] global (root-layout) error", {
      digest: error.digest,
      message: error.message,
    });
  }, [error]);

  return (
    <html lang="en">
      <head>
        <title>Something broke · atomeons.com</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        style={{
          margin: 0,
          padding: "48px 24px",
          minHeight: "100vh",
          backgroundColor: "#0A0F12",
          color: "#F4F4F2",
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}
      >
        <main style={{ maxWidth: 640, margin: "80px auto 0" }}>
          <p
            style={{
              margin: 0,
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: 11,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#FF6B6B",
            }}
          >
            ::root layout error · deeper than a page crash
          </p>
          <h1
            style={{
              margin: "16px 0 24px",
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "#F4F4F2",
              fontFamily: 'Georgia, "Times New Roman", serif',
            }}
          >
            The whole site rendering pipeline crashed.
          </h1>
          <p
            style={{
              maxWidth: "68ch",
              fontSize: 18,
              lineHeight: 1.6,
              color: "#B5BBC0",
            }}
          >
            This is the deepest error surface — it means even the layout
            couldn't render. The operator will see this in the Vercel log
            within a few minutes and start diagnosing.
          </p>
          {error?.digest && (
            <p
              style={{
                marginTop: 24,
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                fontSize: 12,
                color: "#6B6F72",
              }}
            >
              digest:{" "}
              <span style={{ color: "#B5BBC0" }}>{error.digest}</span> · include
              this if you email us
            </p>
          )}
          <div style={{ marginTop: 32, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={reset}
              style={{
                display: "inline-flex",
                alignItems: "center",
                border: "1px solid rgba(34,240,213,0.4)",
                background: "rgba(34,240,213,0.10)",
                padding: "8px 16px",
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                fontSize: 13,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "#22F0D5",
                cursor: "pointer",
              }}
            >
              ▶ retry
            </button>
            <a
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                border: "1px solid rgba(34,240,213,0.2)",
                padding: "8px 16px",
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                fontSize: 13,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "#B5BBC0",
                textDecoration: "none",
              }}
            >
              home
            </a>
            <a
              href="mailto:a.mccree@gmail.com?subject=%5Batomeons%20global%20error%5D"
              style={{
                display: "inline-flex",
                alignItems: "center",
                border: "1px solid rgba(34,240,213,0.2)",
                padding: "8px 16px",
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                fontSize: 13,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "#B5BBC0",
                textDecoration: "none",
              }}
            >
              email us
            </a>
          </div>
          <p
            style={{
              marginTop: 64,
              paddingTop: 24,
              borderTop: "1px solid rgba(34,240,213,0.15)",
              fontSize: 12,
              color: "#6B6F72",
            }}
          >
            AtomEons Systems Laboratory · Naples · FL · 2026
          </p>
        </main>
      </body>
    </html>
  );
}
