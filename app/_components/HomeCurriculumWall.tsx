import Image from "next/image";
import Link from "next/link";

/**
 * HomeCurriculumWall — proof-by-mass that AtomEons is a real learning surface.
 *
 * Operator directive 2026-06-02: "better than a college for AI learning."
 * To prove that, surface the actual asset — 200+ pages with original
 * press-photo hero imagery — visually.
 *
 * Layout:
 *  - Section header: "The curriculum is the proof"
 *  - 18-tile bento grid: 6 large hero cards + 12 small mini-cards across
 *    Cyber / Atlas / Career / Trust / Decode / Trackers families
 *  - Each card links to its destination page
 *  - Hover: very subtle scale + accent border. No overlay text — the
 *    image carries it.
 *
 * The wall is the moment a visitor goes from "homepage" to "wait this
 * is real." It earns the right to ask them to dig in.
 */

const FEATURED = [
  // 6 LARGE (column-span-2 on desktop)
  { href: "/learn/cyber", img: "/cyber-images/cyber-index.png", title: "Cyber", tagline: "Masters-grade ethical hacking + AI security" },
  { href: "/learn/atlas/history", img: "/learn-images/atlas-history.png", title: "AI History", tagline: "Symbolic → connectionist → transformers → frontier" },
  { href: "/learn/career", img: "/learn-images/index-career.png", title: "AI careers", tagline: "Real salary bands, real interview prep" },
  { href: "/learn/cyber/platforms", img: "/cyber-images/platforms.png", title: "Defense platforms", tagline: "Palantir, Anduril, Shield AI, Helsing" },
  { href: "/learn/trust", img: "/learn-images/index-trust.png", title: "Trust + compliance", tagline: "Threat models, prompt injection, GDPR" },
  { href: "/learn/atlas/safety", img: "/learn-images/atlas-safety.png", title: "AI Safety", tagline: "Alignment, evals, red-teaming" },
];

const MINI = [
  { href: "/learn/cyber/modern", img: "/cyber-images/modern.png", title: "Modern cyberwar" },
  { href: "/learn/cyber/legal", img: "/cyber-images/legal.png", title: "Legal — stay out of jail" },
  { href: "/learn/cyber/serve", img: "/cyber-images/serve.png", title: "Federal cyber paths" },
  { href: "/learn/atlas/mech-interp", img: "/learn-images/atlas-mech-interp.png", title: "Mech. interp." },
  { href: "/learn/atlas/embeddings", img: "/learn-images/atlas-embeddings.png", title: "Embeddings" },
  { href: "/learn/atlas/moe", img: "/learn-images/atlas-moe.png", title: "Mixture of experts" },
  { href: "/learn/career/pathways", img: "/learn-images/career-pathways.png", title: "Career paths" },
  { href: "/learn/career/salaries", img: "/learn-images/career-salaries.png", title: "Real salary ranges" },
  { href: "/learn/trust/prompt-injection", img: "/learn-images/trust-prompt-injection.png", title: "Prompt injection" },
  { href: "/learn/models", img: "/learn-images/tracker-models.png", title: "Model tracker" },
  { href: "/learn/decode/people", img: "/learn-images/decode-people.png", title: "People decoder" },
  { href: "/learn/cyber/hackerone", img: "/cyber-images/hackerone.png", title: "Bug bounty path" },
];

export function HomeCurriculumWall() {
  return (
    <section
      data-cockpit-section="curriculum-wall"
      className="relative isolate border-b border-[#1A2225] bg-black"
    >
      <div className="mx-auto w-full max-w-7xl px-6 py-20 md:py-28">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#22F0D5]">
              The curriculum is the proof
            </p>
            <h2
              className="mt-6 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-5xl md:leading-[1.02]"
              style={{ fontVariationSettings: '"wght" 540' }}
            >
              Two-hundred pages of AI + cyber education,{" "}
              <span className="text-[#22F0D5]">free, sourced, all of it written here.</span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-[1.65] text-[#C8CCCE] md:text-lg">
              No video courses, no influencer hype, no upsell ladder. Just the dense, citeable, lab-grade material
              a serious 18-25 year old would need to enter this field. Browse any page.
            </p>
          </div>
          <Link
            href="/learn"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#22F0D5]/40 bg-[#22F0D5]/10 px-5 py-2.5 text-sm font-medium text-[#22F0D5] transition-colors hover:bg-[#22F0D5]/20"
          >
            Open the library →
          </Link>
        </div>

        {/* FEATURED — 6 large cards in 3x2 grid on desktop, 1-col on mobile */}
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {FEATURED.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group relative isolate aspect-[4/3] overflow-hidden rounded-2xl border border-[#1A2225] bg-[#0A0F11] transition-colors hover:border-[#22F0D5]/40"
            >
              <Image
                src={card.img}
                alt={card.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5] opacity-90">
                  Open →
                </p>
                <h3 className="mt-2 text-xl font-medium tracking-tight text-[#F2F4F5] md:text-2xl">{card.title}</h3>
                <p className="mt-1 text-[13px] text-[#C8CCCE] md:text-sm">{card.tagline}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* MINI — 12 small cards in a tight grid */}
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-6">
          {MINI.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group relative isolate aspect-square overflow-hidden rounded-xl border border-[#1A2225] bg-[#0A0F11] transition-colors hover:border-[#22F0D5]/40"
            >
              <Image
                src={card.img}
                alt={card.title}
                fill
                sizes="(max-width: 768px) 50vw, 16vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-3">
                <p className="text-xs font-medium text-[#F2F4F5] md:text-[13px]">{card.title}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer of the section — direct link to the full surface */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[#1A2225]/60 pt-8">
          <p className="text-sm text-[#9BA5A7]">
            <span className="text-[#F2F4F5]">200+ pages</span> across cyber, atlas, career, trust, decode, calculators, and more.
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <Link href="/learn/cyber" className="text-[#22F0D5] transition-colors hover:text-[#7DDBC8]">Cyber →</Link>
            <Link href="/learn/atlas" className="text-[#22F0D5] transition-colors hover:text-[#7DDBC8]">Atlas →</Link>
            <Link href="/learn/career" className="text-[#22F0D5] transition-colors hover:text-[#7DDBC8]">Career →</Link>
            <Link href="/learn/trust" className="text-[#22F0D5] transition-colors hover:text-[#7DDBC8]">Trust →</Link>
            <Link href="/learn/calc" className="text-[#22F0D5] transition-colors hover:text-[#7DDBC8]">Calculators →</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
