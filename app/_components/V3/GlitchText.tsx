"use client";

/**
 * GlitchText · Wave 113 · 2026-06-18
 *
 * Cyber-tradition RGB chromatic-aberration on hover/focus. The base
 * text stays crisp; two color-shifted clones (red + cyan) offset
 * slightly to either side on hover, creating the analog-VHS shimmer.
 *
 * Use sparingly — it's a register, not decoration. Good on:
 *   - section eyebrows that promise depth
 *   - signature CTAs on cyber/security pages
 *   - the brand mark at hover
 * Bad on:
 *   - body text (illegible at small sizes)
 *   - long headlines (visually noisy)
 *   - serif text (breaks the editorial register)
 *
 * Props:
 *   text     — what to render (also fed to data-glitch for the
 *              CSS pseudo-elements to clone)
 *   as       — render tag (default "span")
 *   className — passthrough
 *
 * a11y: prefers-reduced-motion respected via the CSS animation
 * killswitch in globals.css. The text remains readable without
 * any hover state.
 */

import { createElement, type ComponentPropsWithoutRef } from "react";

type Props = {
  text: string;
  as?: "span" | "h1" | "h2" | "h3" | "strong" | "em" | "p";
  className?: string;
} & Omit<ComponentPropsWithoutRef<"span">, "children">;

export function GlitchText({ text, as = "span", className = "", ...rest }: Props) {
  return createElement(
    as,
    {
      className: `ae-glitch-text ${className}`.trim(),
      "data-glitch": text,
      ...rest,
    },
    text
  );
}
