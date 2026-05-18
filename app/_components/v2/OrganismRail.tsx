import Link from "next/link";

/**
 * OrganismRail — 4 cards, 4 arms of the lab.
 *
 * Server component. Each card has a distinct accent color stripe so the
 * four organisms read as distinct, not as a repeated template.
 *
 * Card accent law:
 *   RESEARCH     → cyan   (knowledge, open)
 *   ORANGEBOX    → orange (product, ship)
 *   SKIL.SKI     → white  (registry, neutral)
 *   B00KMAKOR    → muted  (coming soon)
 */

type OrgCard = {
  label: string;
  name: string;
  description: string;
  detail: string;
  href: string;
  accentColor: string;
  borderColor: string;
  comingSoon?: boolean;
};

const ORGANISMS: OrgCard[] = [
  {
    label: "RESEARCH",
    name: "ÆoNs Research",
    description: "12 manuscripts. CC-BY 4.0. Dual-format.",
    detail:
      "Academic + plain-English. Topological defects, solar information transfer, spiral reasoning. Open science from one operator.",
    href: "/research/about",
    accentColor: "#22F0D5",
    borderColor: "border-[#22F0D5]/40",
  },
  {
    label: "ORANGEBOX",
    name: "ORANGEBOX",
    description: "The cockpit. One file. Double-click. 2 seconds.",
    detail:
      "Native binary. 4.46 MB. 11 lanes. Claude + GPT + Gemini + Groq LPUs + Ollama + OpenRouter. $1 ladder. No subscription, ever.",
    href: "/orangebox",
    accentColor: "#FF7A1A",
    borderColor: "border-[#FF7A1A]/40",
  },
  {
    label: "SKIL.SKI",
    name: "skil.ski",
    description: "Operator-class skill registry. 200+ skills indexed.",
    detail:
      "Ranked, searchable, ready to drop into any cockpit. Built from real operator work, not AI demos.",
    href: "/skilski",
    accentColor: "#F2F4F5",
    borderColor: "border-[#F2F4F5]/20",
  },
  {
    label: "B00KMAKOR",
    name: "B00KMAKOR",
    description: "Books written by the cockpit. Edited by the operator. PRINTED.",
    detail: "Nothing ships until it's ready. Waitlist: write once, leave intact.",
    href: "/b00kmakor",
    accentColor: "#6B7779",
    borderColor: "border-[#1A2225]",
    comingSoon: true,
  },
];

export function OrganismRail() {
  return (
    <section className="bg-[#0A0F11] py-24 md:py-32">
      <div className="mx-auto w-full max-w-7xl px-6">
        {/* section label */}
        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
          ::FOUR ARMS OF THE LAB
        </p>
        <h2 className="mb-14 max-w-xl text-balance text-3xl font-medium leading-[1.05] tracking-[-0.015em] text-[#F2F4F5] md:text-4xl">
          ONE LAB. Four arms. Zero overlap.
        </h2>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {ORGANISMS.map((org) => (
            <Link
              key={org.label}
              href={org.href}
              className={`group relative flex flex-col rounded-2xl border ${org.borderColor} bg-[#000]/60 p-6 transition-colors hover:bg-[#0A0F11]/80`}
            >
              {/* top accent stripe */}
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px rounded-t-2xl"
                style={{
                  background: `linear-gradient(90deg, transparent, ${org.accentColor}55, transparent)`,
                }}
              />

              {/* monospace label */}
              <span
                className="mb-4 font-mono text-[10px] uppercase tracking-[0.28em]"
                style={{ color: org.accentColor }}
              >
                {org.label}
                {org.comingSoon ? (
                  <span className="ml-2 rounded border border-[#1A2225] px-1 py-0.5 text-[9px] text-[#6B7779]">
                    SOON
                  </span>
                ) : null}
              </span>

              {/* name */}
              <h3 className="mb-2 text-xl font-medium text-[#F2F4F5]">
                {org.name}
              </h3>

              {/* 1-line description */}
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-[#6B7779]">
                {org.description}
              </p>

              {/* detail copy */}
              <p className="flex-1 line-clamp-2 text-sm leading-relaxed text-[#9BA5A7] md:line-clamp-none">
                {org.detail}
              </p>

              {/* link arrow */}
              <span
                className="mt-5 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.22em] transition-colors group-hover:text-[#F2F4F5]"
                style={{ color: org.accentColor }}
              >
                Enter{" "}
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
