import Image from "next/image";

/**
 * LearnHeroImage — full-bleed 16:9 press-photo hero for non-cyber /learn pages,
 * sub-area indices, and brand surfaces.
 *
 * Images live at public/learn-images/{slug}.png. Each generated via
 * .scripts/cyber-images/generate.py against Nano Banana Pro (Gemini
 * gemini-3-pro-image GA).
 *
 * Treatment matches CyberHeroImage: full viewport width, 16:9 aspect, capped
 * at 56vh, bottom transparent-to-black gradient. priority=true for LCP.
 *
 * Slugs use the section-prefix convention:
 *   atlas-history, career-pathways, trust-prompt-injection, etc.
 */

export function LearnHeroImage({
  slug,
  alt,
}: {
  slug: string;
  alt: string;
}) {
  return (
    <div
      className="relative w-full overflow-hidden border-b border-[#1A2225]"
      style={{ aspectRatio: "16 / 9", maxHeight: "56vh" }}
    >
      <Image
        src={`/learn-images/${slug}.png`}
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
