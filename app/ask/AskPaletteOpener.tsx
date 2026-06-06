"use client";

import { useEffect } from "react";

/**
 * AskPaletteOpener — mounted on the /ask route. On mount, it dispatches
 * an `atomeons:open-ask` custom event that the SearchPalette listens
 * for. The result: landing on /ask auto-opens the unified palette.
 *
 * If the URL includes ?q=… the query is pre-filled.
 */
export function AskPaletteOpener() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q") ?? "";
    // Small delay so the palette mounts first
    const t = window.setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("atomeons:open-ask", { detail: { query: q } }),
      );
    }, 100);
    return () => window.clearTimeout(t);
  }, []);
  return null;
}
