"use client";

import { useEffect, useState } from "react";

/**
 * PressCopyButton — copy-to-clipboard with state.
 * 1.5s ack flash, then resets to "copy".
 */
export function PressCopyButton({
  text,
  small = false,
  label,
}: {
  text: string;
  small?: boolean;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API unavailable (rare) — fallback to selection
    }
  }

  if (small) {
    return (
      <button
        type="button"
        onClick={onCopy}
        aria-label={`Copy ${label ?? "value"}`}
        className="font-mono text-[11px] tracking-[0.08em] text-[#9CA3AF] underline decoration-[#1F242B] underline-offset-4 transition-colors hover:text-[#22F0D5] hover:decoration-[#22F0D5]"
      >
        {copied ? "copied ✓" : label ?? "copy"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label="Copy to clipboard"
      className="inline-flex items-center gap-1.5 rounded-full border border-[#1F242B] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#9CA3AF] transition-colors hover:border-[#22F0D5]/40 hover:text-[#22F0D5]"
    >
      {copied ? (
        <>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          copied
        </>
      ) : (
        <>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
          </svg>
          copy
        </>
      )}
    </button>
  );
}

/**
 * PressTabNav — sticky horizontal tab strip below the snapshot hero.
 * Scrolls the user to the matching anchor on click. Highlights the
 * tab whose section is currently in view via IntersectionObserver.
 *
 * Lives between hero + content so scroll behavior is predictable.
 */
export function PressTabNav({
  tabs,
}: {
  tabs: { id: string; label: string }[];
}) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 },
    );

    for (const t of tabs) {
      const el = document.getElementById(t.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [tabs]);

  function onClick(e: React.MouseEvent, id: string) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: "smooth" });
  }

  return (
    <div className="sticky top-0 z-40 border-y border-[#1F242B] bg-[#08090B]/90 backdrop-blur">
      <nav
        aria-label="Press kit sections"
        className="mx-auto flex w-full max-w-6xl items-center gap-1 overflow-x-auto px-6 py-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {tabs.map((t) => {
          const active = activeId === t.id;
          return (
            <a
              key={t.id}
              href={`#${t.id}`}
              onClick={(e) => onClick(e, t.id)}
              className={`whitespace-nowrap rounded-full border px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors ${
                active
                  ? "border-[#22F0D5] bg-[#22F0D5]/10 text-[#22F0D5]"
                  : "border-[#1F242B] text-[#9CA3AF] hover:border-[#22F0D5]/40 hover:text-[#22F0D5]"
              }`}
            >
              {t.label}
            </a>
          );
        })}
      </nav>
    </div>
  );
}

/**
 * PressSection — consistent section wrapper for the EPK content blocks.
 * Server component-friendly (no hooks here); client features live on the
 * inner copy buttons + tab nav above.
 */
export function PressSection({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-b border-[#1F242B] py-16 md:py-20">
      <header className="mb-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">{subtitle}</p>
        <h2 className="mt-3 text-balance text-3xl font-medium leading-[1.1] tracking-tight md:text-4xl">
          {title}
        </h2>
      </header>
      {children}
    </section>
  );
}
