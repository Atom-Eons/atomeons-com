/**
 * The Æ wordmark — the ÆoNs symbol from text. Drawn in custom typography
 * with a faint cyan/orange orbital halo so it reads as a brand glyph,
 * not a single character of body copy.
 *
 * Operator decree 2026-05-17: Æ goes top-right of the site, in front of
 * every product name, and anywhere the lab signs its work.
 */
type Props = {
  size?: number;
  className?: string;
  glow?: boolean;
};

export function AeMark({ size = 28, className = "", glow = true }: Props) {
  return (
    <span
      aria-label="Æ — ÆoNs / AtomEons"
      title="Æ — ÆoNs / AtomEons"
      className={`inline-flex items-center justify-center ${className}`}
      style={{
        width: size,
        height: size,
        fontFamily:
          '"Helvetica Neue", "Helvetica", "Arial", sans-serif',
        fontSize: Math.round(size * 0.78),
        lineHeight: 1,
        fontWeight: 700,
        color: "#22F0D5",
        textShadow: glow
          ? "0 0 12px rgba(34, 240, 213, 0.55), 0 0 4px rgba(255, 122, 26, 0.4)"
          : "none",
        letterSpacing: "-0.04em",
      }}
    >
      Æ
    </span>
  );
}

/** Inline prefix variant — sits cleanly in front of "ORANGEBOX" / "skil.ski" etc. */
export function AePrefix({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-baseline gap-1.5 ${className}`}>
      <span
        aria-hidden
        style={{
          fontFamily:
            '"Helvetica Neue", "Helvetica", "Arial", sans-serif',
          fontWeight: 700,
          color: "#22F0D5",
          letterSpacing: "-0.04em",
          textShadow:
            "0 0 8px rgba(34, 240, 213, 0.45), 0 0 3px rgba(255, 122, 26, 0.35)",
        }}
      >
        Æ
      </span>
      <span>{children}</span>
    </span>
  );
}
