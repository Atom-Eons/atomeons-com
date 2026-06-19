import type { Metadata } from "next";
import Link from "next/link";
import { RouteSigil } from "../_components/V3/RouteSigil";

export const metadata: Metadata = {
  title: "Signature · the operator's mark · AtomEons",
  description:
    "The mark Atom McCree signs lab artifacts with. A heraldic procedural sigil derived from the lab's name plus a hand statement. Every page on atomeons.com carries a unique variant of this mark.",
  alternates: { canonical: "https://atomeons.com/signature" },
};

/**
 * /signature — the operator's mark.
 *
 * A quiet single-page surface explaining the procedural sigil system
 * and the operator's signing posture. Displays the master sigil
 * (atomeons-com root), the route's own sigil, and a hand statement
 * about what signing means in this lab.
 */

const ROOT = "/";
const THIS = "/signature";

const STATEMENT = [
  "Every published artifact from this lab carries a procedural mark.",
  "The mark for the lab root is one heraldic sigil. Each route carries a variant of it derived from the route's slug. Same slug · same mark. Different slug · different mark.",
  "The mark is mathematics not aesthetics. It's the SHA of the route's identity painted as a polygon-and-star pair. Anyone with the slug can reproduce the mark; nobody can produce the wrong mark for the right slug.",
  "The mark functions as a signature in the same way a person's signature does: it claims authorship, it commits to consequences, and it is recognizable even when the signer is absent.",
  "When a lab artifact carries its mark, it's the operator standing behind it. When it doesn't, it isn't.",
];

const SIGNED = [
  { what: "Every published page on atomeons.com", how: "Carries its route's sigil in the Header. The pathname IS the signature." },
  { what: "Every JSON receipt emitted by Orange³", how: "Embeds the operator's identity SHA in the receipt envelope." },
  { what: "Every Windows installer binary for Orange³", how: "Azure Trusted Signing certificate · Publisher: AtomEons Systems Laboratory · SHA-256 manifest per release." },
  { what: "Every audiobook produced via AI Bookmaker pipeline", how: "ai_disclosure_ledger embedded as ID3 metadata · contains operator hash + per-track provenance." },
  { what: "Every Founder's View nightly broadcast", how: "Operator-signed via the publish endpoint · CRON_SECRET-gated · publication time stamped." },
  { what: "Every Press quote attributed to Atom McCree", how: "Listed verbatim on /press · sourced to date + medium." },
];

export default function SignaturePage() {
  return (
    <main className="min-h-screen text-[#F4F4F2]">
      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9CA3AF]">§ signature · the operator's mark</p>
          <h1 className="mt-6 font-serif text-[44px] font-light leading-[1.04] tracking-[-0.025em] md:text-[64px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            The mark behind every artifact.
          </h1>
        </div>
      </section>

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="flex flex-col items-center justify-center border border-[#1F242B] bg-[#0B0C0F] p-8">
              <RouteSigil slug={ROOT} size={180} accent="#22F0D5" />
              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
                root sigil · derived from "/"
              </p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#7a818a]">
                the lab itself
              </p>
            </div>
            <div className="flex flex-col items-center justify-center border border-[#1F242B] bg-[#0B0C0F] p-8">
              <RouteSigil slug={THIS} size={180} accent="#22F0D5" />
              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
                this page's sigil · derived from "/signature"
              </p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#7a818a]">
                no two pages share this mark
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ statement</p>
          <ol className="mt-10 space-y-6">
            {STATEMENT.map((s, i) => (
              <li key={i} className="border-l-2 border-[#1F242B] pl-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a]">{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-2 font-serif text-[18px] leading-[1.6] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{s}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ what the mark signs</p>
          <ul className="mt-10 divide-y divide-[#1F242B]">
            {SIGNED.map((s, i) => (
              <li key={i} className="grid gap-4 py-4 md:grid-cols-2">
                <p className="font-serif text-[17px] font-medium text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{s.what}</p>
                <p className="font-serif text-[14px] leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{s.how}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
          <div className="border-l-2 border-[#C9A55C] bg-[#0B0C0F] p-6 md:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#C9A55C]">§ the algorithm</p>
            <pre className="mt-4 overflow-x-auto font-mono text-[12px] leading-[1.6] text-[#9CA3AF]">{`// Stable djb2-style hash → ints used to seed the sigil
const h = hash32(slug);
const sides       = 3 + (h % 10);              // outer polygon · 3..12
const starPoints  = 3 + ((h >> 4)  % 5);       // inner star · 3..7
const rotOffset   = ((h >> 8)  % 360) * π/180;
const hasRing     = (h >> 12) % 3 !== 0;       // 2/3 of the time
const hasCenterDot= (h >> 14) % 2 === 0;
const innerScale  = 0.42 + ((h >> 16) % 100)/100 * 0.22;`}</pre>
            <p className="mt-5 font-serif text-[15px] leading-[1.55] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
              The full implementation is at /app/_components/V3/RouteSigil.tsx.
              ~600 bytes of inline SVG per sigil. Zero network cost. Same
              slug always renders the same mark. Anyone with the slug can
              verify the mark independently.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ continue</p>
          <div className="mt-8 grid gap-3 md:grid-cols-4">
            {[
              { href: "/", label: "Lab root" },
              { href: "/about", label: "Operator identity" },
              { href: "/studio", label: "The atelier" },
              { href: "/aesthetic", label: "Visual language" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="group border border-[#1F242B] bg-[#0F1114] p-4 transition-colors hover:border-[#22F0D5]">
                <span className="flex items-baseline gap-2.5">
                  <RouteSigil slug={l.href} size={16} accent="#22F0D5" />
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a] transition-colors group-hover:text-[#22F0D5]">{l.href}</p>
                </span>
                <p className="mt-2 font-serif text-[15px] font-medium" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{l.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
