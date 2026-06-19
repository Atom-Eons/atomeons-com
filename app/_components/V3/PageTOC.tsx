"use client";

/**
 * PageTOC · Wave 124 · 2026-06-18
 *
 * Sticky right-rail mini-TOC for long-form pages. IA Architect Wave
 * 109 grand move applied automatically — no per-page wiring needed.
 *
 * Behavior:
 *  - Mounts globally via layout.tsx
 *  - On mount, scans the nearest <article> (falls back to <main>) for
 *    <h2> elements
 *  - If fewer than 3 h2s found, renders nothing — short pages stay clean
 *  - Auto-assigns slugified `id` attributes to h2s that don't have one
 *    so anchor links work
 *  - Renders a fixed sidebar (lg+ only · 1280px+) at top: 156px right
 *  - IntersectionObserver tracks which h2 is currently in view
 *  - Active item gets bio-cyan border-left + brighter text
 *  - Clicking an item smooth-scrolls to its section
 *
 * Coexists peacefully with:
 *  - Wave 118 ReadingTime pill (top:96px right · pill above TOC)
 *  - Wave 111 ScrollProgress hairline (top:80px · between nav and TOC)
 *  - Wave 113 RevealOnScroll (doesn't overlap)
 *
 * a11y: nav landmark with aria-label, aria-current="location" on the
 * active item, semantic ol/li.
 */

import { useEffect, useState } from "react";

type Heading = { id: string; text: string };

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "section";
}

export function PageTOC() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const root = document.querySelector("article") ?? document.querySelector("main");
    if (!root) return;

    const h2s = Array.from(root.querySelectorAll<HTMLHeadingElement>("h2"));
    if (h2s.length < 3) return;

    const out: Heading[] = [];
    const seen = new Set<string>();
    for (const h of h2s) {
      const text = (h.textContent ?? "").trim();
      if (!text) continue;
      let id = h.id;
      if (!id) {
        id = slugify(text);
        let dedupe = id;
        let n = 2;
        while (seen.has(dedupe)) {
          dedupe = `${id}-${n++}`;
        }
        id = dedupe;
        h.id = id;
      }
      seen.add(id);
      out.push({ id, text });
    }

    if (out.length < 3) return;
    setHeadings(out);

    const observer = new IntersectionObserver(
      (entries) => {
        // Use the topmost intersecting heading as active
        const intersecting = entries
          .filter((e) => e.isIntersecting)
          .map((e) => e.target as HTMLElement);
        if (intersecting.length > 0) {
          intersecting.sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);
          setActiveId(intersecting[0].id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    for (const h of h2s) observer.observe(h);
    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="On this page"
      className="fixed right-6 z-20 hidden w-[200px] xl:block"
      style={{
        top: "calc(156px + var(--ae-safe-top, 0px))",
        maxHeight: "min(60vh, 600px)",
        overflowY: "auto",
      }}
    >
      <p
        className="mb-3 font-mono uppercase"
        style={{
          color: "#22F0D5",
          fontSize: 9,
          letterSpacing: "0.22em",
          opacity: 0.7,
        }}
      >
        On this page
      </p>
      <ol role="list" className="space-y-1.5">
        {headings.map((h) => {
          const active = h.id === activeId;
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                aria-current={active ? "location" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(h.id);
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                    history.replaceState(null, "", `#${h.id}`);
                  }
                }}
                className="block border-l-2 py-1 pl-3 transition-colors"
                style={{
                  borderLeftColor: active ? "#22F0D5" : "rgba(255,255,255,0.08)",
                  color: active ? "#F4F4F2" : "#8E969D",
                  fontFamily: "ui-monospace, SFMono-Regular, monospace",
                  fontSize: 11,
                  lineHeight: 1.4,
                  letterSpacing: "0.02em",
                }}
              >
                {h.text.length > 36 ? h.text.slice(0, 34) + "…" : h.text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
