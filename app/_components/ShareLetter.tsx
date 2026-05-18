"use client";

import { useState } from "react";

type Props = {
  url: string;
  title: string;
  dek?: string | null;
};

/**
 * Share buttons for a Founder's View letter. X intent + copy-link.
 * No tracking pixels. Pure outbound + clipboard. Mobile-safe tap targets.
 */
export function ShareLetter({ url, title, dek }: Props) {
  const [copied, setCopied] = useState(false);

  const tweet = `"${title}"\n\n${dek ?? "Letter from the lab."}\n\n${url}`;
  const xIntent = `https://x.com/intent/tweet?text=${encodeURIComponent(tweet)}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard blocked — open mailto fallback
      window.location.href = `mailto:?subject=${encodeURIComponent(
        `Founder's View — ${title}`,
      )}&body=${encodeURIComponent(`${dek ?? ""}\n\n${url}`)}`;
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        href={xIntent}
        target="_blank"
        rel="noopener"
        className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-[#1A2225] bg-[#0A0F11] px-4 text-sm text-[#F2F4F5] transition-colors hover:border-[#22F0D5]/50 hover:text-[#22F0D5]"
      >
        <span className="font-mono">𝕏</span>
        <span>Post on X</span>
      </a>
      <button
        type="button"
        onClick={copy}
        className={`inline-flex h-11 items-center justify-center gap-2 rounded-md border bg-[#0A0F11] px-4 text-sm transition-colors ${
          copied
            ? "border-[#22F0D5]/60 text-[#22F0D5]"
            : "border-[#1A2225] text-[#F2F4F5] hover:border-[#22F0D5]/50 hover:text-[#22F0D5]"
        }`}
      >
        <span aria-hidden>{copied ? "✓" : "⌘"}</span>
        <span>{copied ? "Copied" : "Copy link"}</span>
      </button>
      <a
        href={`mailto:?subject=${encodeURIComponent(
          `Founder's View — ${title}`,
        )}&body=${encodeURIComponent(`${dek ?? ""}\n\n${url}`)}`}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-[#1A2225] bg-[#0A0F11] px-4 text-sm text-[#F2F4F5] transition-colors hover:border-[#22F0D5]/50 hover:text-[#22F0D5]"
      >
        <span aria-hidden>✉</span>
        <span>Email</span>
      </a>
    </div>
  );
}
