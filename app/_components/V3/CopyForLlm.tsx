"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * CopyForLlm — fixed-position floating button on every content page.
 *
 * Per operator brief 2026-06-06: "Standard sites have Copy Link. You
 * need a button that copies the entire page context wrapped in
 * perfect XML tags so users can paste into Claude/ChatGPT without
 * losing structure."
 *
 * On click:
 *   1. Fetches /api/md?route=<currentPath> to get the markdown extract
 *   2. Wraps it in XML envelope (<lab_page>...</lab_page>) with
 *      provenance metadata (url, fetched-at, license)
 *   3. Copies to clipboard
 *   4. Shows "copied · 4.2 KB · ready for Claude/GPT" confirmation
 *
 * Position: bottom-left (LiteToggle is bottom-right). Small. Hidden
 * on mobile + on routes that don't have markdown twins (/api/* etc).
 *
 * Bundle cost: ~3 KB minified.
 */

const SKIP_PREFIXES = [
  "/api/",
  "/_next/",
  "/.well-known/",
];

function shouldShow(pathname: string): boolean {
  if (pathname === "/") return true;
  for (const p of SKIP_PREFIXES) if (pathname.startsWith(p)) return false;
  return true;
}

type Status = "idle" | "fetching" | "copied" | "error";

export function CopyForLlm() {
  const pathname = usePathname() || "/";
  const [status, setStatus] = useState<Status>("idle");
  const [bytes, setBytes] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState<string>("");

  // Reset status when navigation occurs
  useEffect(() => {
    setStatus("idle");
    setBytes(0);
  }, [pathname]);

  async function copy() {
    if (status === "fetching") return;
    setStatus("fetching");
    try {
      const url = `/api/md?route=${encodeURIComponent(pathname)}`;
      const res = await fetch(url);
      if (!res.ok && res.status !== 404) {
        throw new Error(`fetch ${res.status}`);
      }
      const md = await res.text();
      const wrapped =
        `<lab_page>\n` +
        `<source>https://atomeons.com${pathname}</source>\n` +
        `<fetched_at>${new Date().toISOString()}</fetched_at>\n` +
        `<license>CC-BY 4.0</license>\n` +
        `<publisher>AtomEons Systems Laboratory</publisher>\n` +
        `<author>Atom McCree</author>\n` +
        `<canonical>atomeons.com${pathname}</canonical>\n` +
        `<format>markdown</format>\n` +
        `\n` +
        md +
        `\n</lab_page>\n`;
      await navigator.clipboard.writeText(wrapped);
      setBytes(new Blob([wrapped]).size);
      setStatus("copied");
      window.setTimeout(() => setStatus("idle"), 2400);
    } catch (e) {
      setStatus("error");
      setErrorMsg(e instanceof Error ? e.message : "copy failed");
      window.setTimeout(() => setStatus("idle"), 2400);
    }
  }

  if (!shouldShow(pathname)) return null;

  const label = (() => {
    if (status === "fetching") return "fetching…";
    if (status === "copied") return `copied · ${(bytes / 1024).toFixed(1)} KB · paste into Claude/GPT`;
    if (status === "error") return `failed · ${errorMsg}`;
    return "copy for LLM · ⌥C";
  })();

  const color = (() => {
    if (status === "copied") return "#22F0D5";
    if (status === "error") return "#FF4D4D";
    return "#9CA3AF";
  })();

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy this page as XML-wrapped markdown for pasting into an AI assistant. Current path: ${pathname}`}
      title="Copies markdown extract wrapped in <lab_page>…</lab_page> for pasting into Claude / ChatGPT / Gemini"
      className="group fixed bottom-4 left-4 z-[120] hidden items-center gap-2 border bg-[#0F1114]/85 px-3 py-2 backdrop-blur-md transition-all hover:bg-[#0F1114] md:flex"
      style={{
        borderColor: color,
        boxShadow: status === "copied" ? "0 0 24px rgba(34, 240, 213, 0.3)" : "none",
      }}
    >
      <svg aria-hidden width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" style={{ color }}>
        {status === "copied" ? (
          <polyline points="4 12 10 18 20 6" />
        ) : (
          <>
            <rect x="9" y="9" width="13" height="13" rx="0" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </>
        )}
      </svg>
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] transition-colors" style={{ color }}>
        {label}
      </span>
    </button>
  );
}
