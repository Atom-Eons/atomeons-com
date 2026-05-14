"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

/**
 * Wraps a section with a cursor-following radial spotlight on top of
 * the existing dark grid. Updates two CSS custom properties on
 * mousemove. On touch / no-hover devices, the spotlight defaults to
 * center. Honors prefers-reduced-motion (defaults to center, no track).
 */
export function SpotlightBg({ children, className = "" }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const noHover = window.matchMedia("(hover: none)").matches;
    if (noHover) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--mx", `${x}%`);
      el.style.setProperty("--my", `${y}%`);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={{
        // Vercel-style cursor halo over the grid background.
        backgroundImage:
          "radial-gradient(600px circle at var(--mx, 50%) var(--my, 30%), rgba(255, 122, 24, 0.10), transparent 65%)",
      }}
    >
      {children}
    </div>
  );
}
