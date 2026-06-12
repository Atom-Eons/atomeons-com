import Link from "next/link";
import { Route, FlaskConical, Shield, HandHeart, Bot, Scale, ArrowRight } from "lucide-react";

const tracks = [
  {
    href: "/learn/cyber/path",
    title: "Path",
    icon: Route,
    desc: "Linear 30+ track curriculum, ordered, no prereq gates, public-info only.",
  },
  {
    href: "/learn/cyber/labs",
    title: "Labs",
    icon: FlaskConical,
    desc: "Hands-on exercises against intentionally vulnerable, self-hosted targets.",
  },
  {
    href: "/learn/cyber/hackerone",
    title: "HackerOne",
    icon: Shield,
    desc: "How real bounty programs operate, in-scope discipline, disclosure ethics.",
  },
  {
    href: "/learn/cyber/serve",
    title: "Serve",
    icon: HandHeart,
    desc: "Pro-bono defense for libraries, schools, nonprofits, small clinics.",
  },
  {
    href: "/learn/cyber/ai-security",
    title: "AI Security",
    icon: Bot,
    desc: "OWASP LLM Top 10, MITRE ATLAS, prompt-injection, model-supply-chain.",
  },
  {
    href: "/learn/cyber/legal",
    title: "Legal",
    icon: Scale,
    desc: "CFAA discipline, authorized scope, safe-harbor language, written permission.",
  },
];

const comparison = [
  { name: "SANS", price: "$7,000 – $8,000 per course", highlight: false },
  { name: "Offensive Security OSCP", price: "$1,749", highlight: false },
  { name: "Coursera Cyber Specializations", price: "$399 – $499", highlight: false },
  { name: "AtomEons /learn/cyber", price: "$0", highlight: true },
];

export function BestCyber() {
  return (
    <section
      aria-labelledby="best-cyber-heading"
      className="relative w-full border-t border-[#1F242B] bg-[#08090B] px-6 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        {/* Eyebrow */}
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#22F0D5]">
          /learn/cyber &middot; 30+ tracks &middot; public-info only
        </p>

        {/* H2 — variable-weight */}
        <h2
          id="best-cyber-heading"
          className="mt-4 max-w-3xl font-serif text-4xl leading-[1.05] tracking-tight text-[#F4F4F2] sm:text-5xl md:text-6xl"
          style={{ fontFamily: "var(--font-newsreader, ui-serif)", fontVariationSettings: "'wght' 480, 'opsz' 36" }}
        >
          68 lessons. Pcaps, memory dumps, Snort rules. No vendor slides.
        </h2>

        {/* Sublede */}
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#9CA3AF] sm:text-lg">
          30+ tracks, public-info only, no paywall and no theater. OWASP LLM Top 10
          and MITRE ATLAS for AI-era attack surface. CFAA discipline on every lab so
          you learn the law alongside the exploit. Authorized scope, written
          permission, real bounty programs &mdash; the way working operators actually work.
        </p>

        {/* Track grid 3x2 */}
        <ul
          role="list"
          className="mt-14 grid grid-cols-1 gap-px overflow-hidden border border-[#1F242B] bg-[#1F242B] sm:grid-cols-2 lg:grid-cols-3"
        >
          {tracks.map(({ href, title, icon: Icon, desc }) => (
            <li key={href} className="group bg-[#08090B]">
              <Link
                href={href}
                className="flex h-full flex-col gap-4 p-6 transition-colors duration-200 hover:bg-[#0F1114] focus-visible:bg-[#0F1114] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#22F0D5]"
              >
                <div className="flex items-center justify-between">
                  <Icon aria-hidden="true" className="h-5 w-5 text-[#9CA3AF] transition-colors group-hover:text-[#22F0D5]" strokeWidth={1.5} />
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#7a818a]">
                    {href}
                  </span>
                </div>
                <h3 className="font-serif text-2xl leading-tight text-[#F4F4F2]" style={{ fontFamily: "var(--font-newsreader, ui-serif)", fontVariationSettings: "'wght' 460" }}>
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-[#9CA3AF]">{desc}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[#7a818a] transition-colors group-hover:text-[#22F0D5]">
                  Open
                  <ArrowRight aria-hidden="true" className="h-3 w-3" strokeWidth={1.75} />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Comparison panel */}
        <div className="mt-20">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#7a818a]">
            What the same curriculum costs elsewhere
          </p>
          <div className="mt-4 overflow-hidden border border-[#1F242B]">
            <table className="w-full">
              <caption className="sr-only">
                Comparison of cybersecurity training pricing across providers
              </caption>
              <thead className="sr-only">
                <tr>
                  <th scope="col">Provider</th>
                  <th scope="col">Price</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, idx) => (
                  <tr
                    key={row.name}
                    className={`${row.highlight ? "bg-[#0F1114]" : "bg-[#08090B]"} ${idx !== comparison.length - 1 ? "border-b border-[#1F242B]" : ""}`}
                  >
                    <th
                      scope="row"
                      className={`px-6 py-5 text-left text-sm font-normal sm:text-base ${row.highlight ? "text-[#F4F4F2]" : "text-[#9CA3AF]"}`}
                    >
                      {row.name}
                    </th>
                    <td
                      className={`px-6 py-5 text-right font-mono text-sm sm:text-base ${row.highlight ? "font-medium text-[#22F0D5]" : "text-[#9CA3AF]"}`}
                    >
                      {row.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Foot CTA — hairline */}
        <div className="mt-12 border-t border-[#1F242B] pt-8">
          <Link
            href="/learn/cyber"
            aria-label="Open the AtomEons cyber curriculum index"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-[#F4F4F2] transition-colors hover:text-[#22F0D5] focus-visible:text-[#22F0D5] focus-visible:outline-none"
          >
            <span>Open /learn/cyber</span>
            <ArrowRight
              aria-hidden="true"
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
              strokeWidth={1.75}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
