import Link from "next/link";

/**
 * LabHero — the site's canonical hero rhythm.
 *
 * Design-system primitive that enforces one visual cadence across every
 * hero section. Replaces ~8 ad-hoc hero blocks across /learn, /orangebox,
 * /manifesto, homepage strips, etc., each of which had subtly different
 * spacing, type scale, eyebrow weight, and CTA styling.
 *
 * What it gives:
 *   - One big display heading with a configurable accent word
 *   - Generous negative space — 28/40 vertical padding, large gap before
 *     the body lead, even more before CTAs
 *   - Optional eyebrow (mono caps · keeps the brand voice without
 *     putting one on every section)
 *   - Optional ambient bloom — three tones: "calm" (no bloom), "cyan"
 *     (default · subtle dual-radial), "warm" (peach-orange)
 *   - children slot for chips, extra CTAs, persona pickers, etc.
 *
 * Voice: confident emptiness. Less competing chrome. The heading carries
 * the page; everything else supports it.
 */

type CTA = { label: string; href: string };

type Tone = "calm" | "cyan" | "warm";

const TONE_BG: Record<Tone, string> = {
  calm: "bg-black",
  cyan: "bg-black",
  warm: "bg-black",
};

const TONE_BLOOM: Record<Tone, string> = {
  calm: "none",
  cyan: "radial-gradient(70% 55% at 80% 25%, rgba(34,240,213,0.18) 0%, transparent 60%), radial-gradient(50% 45% at 8% 90%, rgba(255,184,122,0.10) 0%, transparent 65%)",
  warm: "radial-gradient(70% 55% at 78% 30%, rgba(255,184,122,0.20) 0%, transparent 60%), radial-gradient(45% 40% at 12% 85%, rgba(34, 240, 213,0.10) 0%, transparent 65%)",
};

export function LabHero({
  eyebrow,
  title,
  titleAccent,
  subtitle,
  primaryCta,
  secondaryCta,
  tone = "cyan",
  children,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  titleAccent?: string;
  subtitle?: string | React.ReactNode;
  primaryCta?: CTA;
  secondaryCta?: CTA;
  tone?: Tone;
  children?: React.ReactNode;
  align?: "left" | "center";
}) {
  // If titleAccent is supplied, the title text rendered is title + " " +
  // titleAccent and we highlight only the accent. Otherwise the whole
  // title is rendered plain.
  const hasAccent = Boolean(titleAccent);

  return (
    <section
      className={`relative isolate overflow-hidden ${TONE_BG[tone]}`}
      data-lab-hero={tone}
    >
      {tone !== "calm" && (
        <>
          {/* Ambient bloom layer — slow 40s drift on a single CSS keyframe.
              Reduced-motion users get a static bloom (no animation). The
              motion is intentionally calm — gives every LabHero-using
              surface a quiet signature without distracting from content. */}
          <div
            aria-hidden
            className="lab-hero-bloom pointer-events-none absolute inset-0"
            style={{ background: TONE_BLOOM[tone] }}
          />
          <style>{`
            @keyframes lab-hero-drift {
              0%   { transform: translate(0%, 0%) scale(1); }
              50%  { transform: translate(-2%, 1.5%) scale(1.04); }
              100% { transform: translate(0%, 0%) scale(1); }
            }
            .lab-hero-bloom {
              animation: lab-hero-drift 40s ease-in-out infinite;
              will-change: transform;
            }
            @media (prefers-reduced-motion: reduce) {
              .lab-hero-bloom { animation: none !important; }
            }
          `}</style>
        </>
      )}

      <div
        className={`relative z-10 mx-auto w-full max-w-6xl px-6 py-24 md:py-36 ${
          align === "center" ? "text-center" : ""
        }`}
      >
        {eyebrow && (
          <p
            className={`font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5] ${
              align === "center" ? "mx-auto" : ""
            }`}
          >
            {eyebrow}
          </p>
        )}

        <h1
          className={`mt-7 text-balance text-5xl font-medium leading-[0.98] tracking-[-0.025em] text-[#F2F4F5] md:text-[7.5rem] md:leading-[0.94] ${
            align === "center" ? "mx-auto max-w-4xl" : "max-w-5xl"
          }`}
        >
          {hasAccent ? (
            <>
              {title}{" "}
              <span className="text-[#22F0D5]">{titleAccent}</span>
            </>
          ) : (
            title
          )}
        </h1>

        {subtitle && (
          <div
            className={`mt-9 text-lg leading-[1.55] text-[#C8CCCE] md:text-[22px] md:leading-[1.55] ${
              align === "center" ? "mx-auto max-w-2xl" : "max-w-3xl"
            }`}
          >
            {subtitle}
          </div>
        )}

        {(primaryCta || secondaryCta) && (
          <div
            className={`mt-12 flex flex-wrap items-center gap-4 ${
              align === "center" ? "justify-center" : ""
            }`}
          >
            {primaryCta && (
              <Link
                href={primaryCta.href}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#22F0D5] px-8 py-4 font-mono text-[12px] font-semibold uppercase tracking-[0.28em] text-[#0B1014] shadow-[0_0_60px_rgba(34,240,213,0.30)] transition-all hover:bg-[#7DDBC8]"
              >
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center gap-2 rounded-full border border-[#22F0D5]/30 bg-transparent px-6 py-3 font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5] transition-all hover:border-[#22F0D5] hover:bg-[#22F0D5]/10"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        )}

        {children && <div className="mt-12">{children}</div>}
      </div>
    </section>
  );
}
