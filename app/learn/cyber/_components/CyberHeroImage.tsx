import Image from "next/image";

/**
 * CyberHeroImage — full-bleed 16:9 press-photo hero for /learn/cyber pages.
 *
 * Images live at public/cyber-images/{slug}.png and are generated via
 * .scripts/cyber-images/generate.py against Nano Banana Pro (Gemini
 * gemini-3-pro-image GA). Operator directive 2026-06-02.
 *
 * Treatment:
 *   - Full viewport width, 16:9 aspect, capped at 56vh so it doesn't eat
 *     the whole fold on tall laptops.
 *   - Bottom gradient (transparent → black) lets the H1 underneath feel
 *     connected, not pasted-on.
 *   - priority=true since these are above-the-fold LCP candidates.
 */

export function CyberHeroImage({
  slug,
  alt,
}: {
  slug: string;
  alt: string;
}) {
  return (
    <div
      aria-hidden={false}
      className="relative w-full overflow-hidden border-b border-[#1A2225]"
      style={{ aspectRatio: "16 / 9", maxHeight: "56vh" }}
    >
      <Image
        src={`/cyber-images/${slug}.png`}
        alt={alt}
        fill
        priority
        sizes="(max-width: 768px) 100vw, 100vw"
        className="object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/30 to-black"
      />
    </div>
  );
}
