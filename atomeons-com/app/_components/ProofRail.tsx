/**
 * Infinitely-looping horizontal marquee of terse proof facts.
 * Pure CSS scroll, duplicated content for seamless wrap.
 * Disabled by prefers-reduced-motion via globals.css.
 */
const PROOF: string[] = [
  "stripe live · cs_live_ checkout · webhook verified",
  "hmac signed download token · 30-day ttl",
  "single zip · node 18+ · runs on 127.0.0.1",
  "no team · no roadmap · no support · one operator",
  "92 endpoints · 17 lanes · 12 MCP tools",
  "shipped through orangebox · proof-tracked",
  "instrument panel · not a chatbox",
  "pre-ship checkmate gate · no fake green",
];

export function ProofRail() {
  const items = [...PROOF, ...PROOF]; // duplicated for seamless wrap
  return (
    <div
      className="proof-rail relative overflow-hidden border-y border-[#204538] bg-[#04100d]"
      role="status"
      aria-label="ORANGEBOX proof rail"
    >
      <div className="proof-rail-track flex gap-12 whitespace-nowrap py-2">
        {items.map((p, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#a7b8ad]"
          >
            <span
              aria-hidden
              className={`inline-block h-1 w-1 rounded-full ${
                i % 2 === 0 ? "bg-[#75ff92]" : "bg-[#ffc46b]"
              }`}
            />
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}
