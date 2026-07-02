"use client";

import Link from "next/link";
import { useEffect } from "react";

/**
 * app/error.tsx · Wave 145j · 2026-07-02
 *
 * Runtime error boundary. Next.js's file convention: if a route throws
 * at render time and no closer error.tsx catches it, this component
 * renders. Must be a client component (Next.js requirement) and must
 * expose a `reset()` prop that re-renders the segment.
 *
 * Complements not-found.tsx (which handles 404) with a 500-class
 * fallback that stays in brand voice. Without this file the operator
 * would ship a raw Next.js dev-mode error to production visitors on
 * any unhandled exception.
 */

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log for observability. Vercel captures console.error to their
    // runtime log for later inspection. No PII in the digest.
    // eslint-disable-next-line no-console
    console.error("[atomeons] runtime error", {
      digest: error.digest,
      message: error.message,
    });
  }, [error]);

  return (
    <main className="min-h-screen bg-[#0A0F12] text-[#F4F4F2]">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <nav className="text-[11px] tracking-[0.16em] uppercase text-[#8E969D]">
          <Link href="/" className="hover:text-[#22F0D5] transition-colors">
            ::atomeons
          </Link>{" "}
          · <span className="text-[#B5BBC0]">something broke</span>
        </nav>

        <p className="mt-16 text-[11px] tracking-[0.28em] uppercase text-[#FF6B6B]">
          ::runtime error · not a 404 · something we did wrong
        </p>

        <h1
          className="mt-4 max-w-[22ch] text-[clamp(40px,6vw,72px)] font-light leading-[1.05] tracking-[-0.025em] text-balance text-[#F4F4F2]"
          style={{ fontFamily: "Newsreader, Georgia, serif" }}
        >
          Something on this page threw an error.
        </h1>

        <p
          className="mt-8 max-w-[68ch] text-[19px] leading-[1.6] text-[#B5BBC0]"
          style={{ fontFamily: "Newsreader, Georgia, serif" }}
        >
          Not a page-not-found — that renders differently. This is the lab's own code failing at runtime. The failure is captured in Vercel's log and the operator will see it.
        </p>

        <p
          className="mt-4 max-w-[68ch] text-[17px] leading-[1.6] text-[#8E969D]"
          style={{ fontFamily: "Newsreader, Georgia, serif" }}
        >
          You can try again with the button below (some errors are transient — network hiccup, cold-start, race with a deploy). If it fails a second time, the fix is on our end, not yours.
        </p>

        {error?.digest && (
          <p className="mt-6 font-mono text-[12px] text-[#6B6F72]">
            digest: <span className="text-[#B5BBC0]">{error.digest}</span>{" "}
            <span className="text-[#6B6F72]">· include this if you email us</span>
          </p>
        )}

        <div className="mt-10 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 border border-[#22F0D5]/40 bg-[#22F0D5]/10 px-4 py-2 font-mono text-[13px] uppercase tracking-[0.12em] text-[#22F0D5] transition-colors hover:bg-[#22F0D5]/20"
          >
            ▶ retry
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 border border-[#22F0D5]/20 px-4 py-2 font-mono text-[13px] uppercase tracking-[0.12em] text-[#B5BBC0] transition-colors hover:border-[#22F0D5]/40 hover:text-[#F4F4F2]"
          >
            back to home
          </Link>
          <Link
            href="/handbook"
            className="inline-flex items-center gap-2 border border-[#22F0D5]/20 px-4 py-2 font-mono text-[13px] uppercase tracking-[0.12em] text-[#B5BBC0] transition-colors hover:border-[#22F0D5]/40 hover:text-[#F4F4F2]"
          >
            handbook
          </Link>
          <a
            href="mailto:a.mccree@gmail.com?subject=%5Batomeons%20error%5D"
            className="inline-flex items-center gap-2 border border-[#22F0D5]/20 px-4 py-2 font-mono text-[13px] uppercase tracking-[0.12em] text-[#B5BBC0] transition-colors hover:border-[#22F0D5]/40 hover:text-[#F4F4F2]"
          >
            email us
          </a>
        </div>

        <div className="mt-20 border-t border-[#22F0D5]/20 pt-8 text-[13px] text-[#6B6F72]">
          <p>
            While you're here — the lab publishes{" "}
            <Link href="/founders-view" className="text-[#22F0D5] hover:underline">
              a letter every evening at 8pm ET
            </Link>
            . And the{" "}
            <Link href="/i-am-ai" className="text-[#22F0D5] hover:underline">
              book
            </Link>{" "}
            is free.
          </p>
        </div>
      </div>
    </main>
  );
}
