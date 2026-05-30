/**
 * LabSection — calm, confident section primitive.
 *
 * Replaces the ~30+ ad-hoc <section className="border-b border-[#1A2225] py-20 md:py-28">
 * blocks across the site with one rhythm: generous vertical padding, no
 * heavy borders, optional background tint instead of dividers.
 *
 * Why no borders by default: heavy divider lines between sections is a
 * 2007-template tell. Modern $B-grade sites use material/color shifts
 * and whitespace to delineate, not 1px borders.
 *
 * Variants:
 *   - default: pure black background, no border
 *   - tint:    subtle cyan-tinted dark for breath
 *   - raised:  one shade lighter than black, gives a "card" feel without
 *              the border
 *   - warm:    peach-tinted dark for content sections that want warmth
 */

type Variant = "default" | "tint" | "raised" | "warm";

const VARIANT_BG: Record<Variant, string> = {
  default: "bg-black",
  tint: "bg-[#06100E]",
  raised: "bg-[#0A0E10]",
  warm: "bg-[#100A06]",
};

export function LabSection({
  eyebrow,
  title,
  titleAccent,
  subtitle,
  variant = "default",
  align = "left",
  children,
  id,
  maxWidth = "6xl",
}: {
  eyebrow?: string;
  title?: string;
  titleAccent?: string;
  subtitle?: string | React.ReactNode;
  variant?: Variant;
  align?: "left" | "center";
  children: React.ReactNode;
  id?: string;
  maxWidth?: "4xl" | "5xl" | "6xl" | "7xl";
}) {
  const widthClass = {
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
    "6xl": "max-w-6xl",
    "7xl": "max-w-7xl",
  }[maxWidth];

  return (
    <section
      id={id}
      className={`scroll-mt-24 ${VARIANT_BG[variant]}`}
      data-lab-section={variant}
    >
      <div
        className={`mx-auto w-full ${widthClass} px-6 py-24 md:py-32 ${
          align === "center" ? "text-center" : ""
        }`}
      >
        {(eyebrow || title || subtitle) && (
          <header
            className={`mb-12 md:mb-16 ${
              align === "center" ? "mx-auto max-w-3xl" : "max-w-3xl"
            }`}
          >
            {eyebrow && (
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="mt-5 text-balance text-4xl font-medium leading-[1.04] tracking-[-0.015em] text-[#F2F4F5] md:text-5xl">
                {titleAccent ? (
                  <>
                    {title}{" "}
                    <span className="text-[#22F0D5]">{titleAccent}</span>
                  </>
                ) : (
                  title
                )}
              </h2>
            )}
            {subtitle && (
              <div className="mt-5 text-base leading-[1.6] text-[#9BA5A7] md:text-lg">
                {subtitle}
              </div>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
