import type { Metadata } from "next";
import Link from "next/link";
import { EnrollForm } from "../../_components/V3/EnrollForm";
import { DiscordCTA } from "../../_components/V3/DiscordCTA";
import { AutoGlyph } from "../../_components/V3/Illustrations";

/**
 * /paths/cyber-pro · the Cyber Pro graduation track.
 * Wave 39 · 2026-06-06 · sister track to AI Pilot.
 */

export const metadata: Metadata = {
  title: "Cyber Pro Track · email-only · free",
  description:
    "The AtomEons Cyber Pro graduation track. Forty-page cyber catalog · frameworks (MITRE ATT&CK · NIST CSF · Zero Trust) · AI security · breaches · careers + certs. Email-only enrollment. Free. Finish all four legs and the lab adds you to the Cyber Pro list.",
  alternates: { canonical: "https://atomeons.com/paths/cyber-pro" },
  openGraph: {
    title: "Cyber Pro Track · AtomEons Systems Laboratory",
    description:
      "Four legs to graduate · email-only · free · alumni list curated by the operator.",
    url: "https://atomeons.com/paths/cyber-pro",
    type: "article",
  },
};

const LEGS = [
  {
    name: "Leg 1 · The 40-page Cyber Catalog",
    detail:
      "Read /learn/cyber · the world-class catalog. Frameworks, defense surfaces, breaches, threat actors, AI security, careers. About two hours of careful reading.",
    flagship_route: "/learn/cyber",
    flagship_label: "Cyber catalog",
  },
  {
    name: "Leg 2 · The 22 Industry Cyber Models",
    detail:
      "Read /learn/cyber/models · know when to apply MITRE ATT&CK vs Kill Chain · DREAD vs FAIR · STRIDE vs OWASP · which model fits which job.",
    flagship_route: "/learn/cyber/models",
    flagship_label: "Cyber models reference",
  },
  {
    name: "Leg 3 · The Defense-Tech Mythos",
    detail:
      "Read /learn/cyber/mythos · the public-information primer on Palantir, Anduril, and the modern defense-tech doctrine. Understand the landscape · don't violate any laws · public info only.",
    flagship_route: "/learn/cyber/mythos",
    flagship_label: "Defense-tech mythos",
  },
  {
    name: "Leg 4 · AI Security + Prompt Injection",
    detail:
      "Read /learn/cyber/ai-security · /learn/trust/prompt-injection · /q/what-is-prompt-injection. The AI-era cyber-warfare lane. Submit a one-paragraph reflection with your enrolled email.",
    flagship_route: "/learn/cyber/ai-security",
    flagship_label: "AI security flagship",
  },
];

export default function CyberProTrackPage() {
  return (
    <main className="mx-auto max-w-[1100px] px-6 py-20 text-[#F4F4F2] md:px-10 md:py-24">
      <header className="border-b border-[#1F242B] pb-12">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#FF4D4D]">
              GRADUATION TRACK · CYBER PRO · 2026
            </p>
            <h1
              className="mt-6 text-balance text-[clamp(48px,9vw,108px)] font-light leading-[0.92]"
              style={{ fontFamily: "Newsreader, Georgia, serif", fontWeight: 300 }}
            >
              Become a Cyber Pro.
            </h1>
            <p className="mt-6 max-w-[64ch] text-[18px] leading-[1.55] text-[#9CA3AF]">
              Four legs. Email-only enrollment. Free. The lab tracks
              progress · when you finish all four, the lab adds you to
              the Cyber Pro alumni list. The list identifies the people
              who actually finished the work.
            </p>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.28em] text-[#FF4D4D]">
              No password · no profile · public-info only · CC-BY 4.0 reading
            </p>
          </div>
          <div className="hidden md:block" style={{ opacity: 0.6 }} aria-hidden>
            <AutoGlyph slug="/paths/cyber-pro" size={160} />
          </div>
        </div>
      </header>

      <section className="mt-12">
        <EnrollForm path="cyber-pro" />
      </section>

      <section className="mt-20">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#9CA3AF]">
          § The four legs
        </h2>
        <ol className="mt-8 space-y-8 list-decimal pl-6 marker:text-[#22F0D5] marker:font-mono">
          {LEGS.map((leg) => (
            <li key={leg.name} className="pl-2">
              <h3
                className="text-[24px] font-light leading-tight text-[#F4F4F2]"
                style={{ fontFamily: "Newsreader, Georgia, serif" }}
              >
                {leg.name}
              </h3>
              <p className="mt-3 max-w-[80ch] text-[15px] leading-[1.65] text-[#9CA3AF]">
                {leg.detail}
              </p>
              <Link
                href={leg.flagship_route}
                className="mt-3 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[#22F0D5] hover:underline"
              >
                {leg.flagship_label} →
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-20 border-l-4 border-[#FF4D4D] bg-[#0F1114] p-8">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.32em] text-[#FF4D4D]">
          § What the Cyber Pro list is for
        </h2>
        <p
          className="mt-4 text-[18px] leading-[1.55] text-[#F4F4F2]"
          style={{ fontFamily: "Newsreader, Georgia, serif" }}
        >
          The lab is building the Library of Alexandria for AI cyber
          security. The graduates of this track are the people who
          actually read the catalog. The list helps the lab know who
          to call when a serious cyber question comes in · and signals
          to graduates that they are part of a small group who finished
          the work. Public-information only · no operational tradecraft.
        </p>
      </section>

      <DiscordCTA context="path-graduate" />

      <section className="mt-20 border-t border-[#1F242B] pt-12">
        <div className="grid gap-4 md:grid-cols-2">
          <Link href="/paths/ai-pilot" className="block border border-[#1F242B] p-5 transition hover:border-[#22F0D5]">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">Sister track</p>
            <p className="mt-2 text-[14px] text-[#F4F4F2]">AI Pilot · 5 levels · atlas · cheat sheets · exam.</p>
          </Link>
          <Link href="/learn/cyber/models" className="block border border-[#1F242B] p-5 transition hover:border-[#FF4D4D]">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#FF4D4D]">Industry models</p>
            <p className="mt-2 text-[14px] text-[#F4F4F2]">22 cyber models compared · MITRE · NIST · STRIDE · FAIR.</p>
          </Link>
        </div>
      </section>

      <footer className="mt-20 border-t border-[#1F242B] pt-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#7a818a]">
          /paths/cyber-pro · email-only · free · public-info only · last updated 2026-06-06
        </p>
      </footer>
    </main>
  );
}
