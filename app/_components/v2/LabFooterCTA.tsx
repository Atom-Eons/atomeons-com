import Link from "next/link";

/**
 * LabFooterCTA — closing navigation grid.
 *
 * 5 compact link tiles. The operator's doctrine is: don't repeat
 * the pitch here, just give the reader a clear map. Compact,
 * premium, no-nonsense.
 *
 * Server component. No state, no interactivity.
 */

type FooterTile = {
  label: string;
  description: string;
  href: string;
  external?: boolean;
};

const TILES: FooterTile[] = [
  {
    label: "12 papers. CC-BY.",
    description: "12 manuscripts · CC-BY 4.0",
    href: "/research/papers",
  },
  {
    label: "Tonight's broadcast. 8pm ET.",
    description: "The Founder's View · 8pm ET",
    href: "/founders-view",
  },
  {
    label: "The intel",
    description: "Alpha drops · ÆoNs Intel",
    href: "/intel",
  },
  {
    label: "Buy ORANGEBOX",
    description: "v6.3 · $49 once · §4A no-saas",
    href: "/orangebox",
  },
  {
    label: "Public mistakes",
    description: "What broke · what changed",
    href: "/mistakes",
  },
];

export function LabFooterCTA() {
  return (
    <section className="border-t border-[#1A2225] bg-[#0A0F11] py-20 md:py-28">
      <div className="mx-auto w-full max-w-7xl px-6">
        {/* section label */}
        <p className="mb-10 font-mono text-[10px] uppercase tracking-[0.32em] text-[#6B7779]">
          ::WHAT TO DO NEXT
        </p>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[#1A2225] lg:grid-cols-5">
          {TILES.map((tile, idx) => (
            <Link
              key={tile.href}
              href={tile.href}
              className="group relative min-h-[64px] bg-[#0A0F11] px-5 py-5 transition-colors hover:bg-[#0D1518]"
            >
              {/* subtle top accent on hover — alternates palette */}
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px opacity-0 transition-opacity group-hover:opacity-100"
                style={{
                  background:
                    idx === 3
                      ? "linear-gradient(90deg, transparent, rgba(255,122,26,0.5), transparent)"
                      : "linear-gradient(90deg, transparent, rgba(34,240,213,0.35), transparent)",
                }}
              />

              <p className="mb-1.5 text-sm font-medium text-[#F2F4F5] transition-colors group-hover:text-[#22F0D5]">
                {tile.label}{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1">
                  →
                </span>
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#6B7779]">
                {tile.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
