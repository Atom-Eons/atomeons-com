import type { Metadata } from "next";
import Link from "next/link";
import { CyberHeroImage } from "../_components/CyberHeroImage";
import { CyberStartForm } from "./CyberStartForm";

export const metadata: Metadata = {
  title: "Start the AtomEons Cyber Career Track · /learn/cyber/start · AtomEons",
  description:
    "Free masters-grade cyber career training delivered to your inbox. The 6-stage path from curious gamer to senior practitioner, plus the labs, certifications, federal cyber paths, and bug bounty playbook. CC-BY 4.0. No upsell.",
  alternates: { canonical: "https://atomeons.com/learn/cyber/start" },
  openGraph: {
    title: "Start the AtomEons Cyber Career Track",
    description: "Free masters-grade cyber career training. Delivered to your inbox.",
    url: "https://atomeons.com/learn/cyber/start",
    type: "article",
  },
  robots: { index: true, follow: true },
};

const ACCENT = "#22F0D5";

const VALUE = [
  {
    title: "The 6-stage career path",
    body: "From curious gamer to senior practitioner. What each stage actually is, what to study, what to build, what to apply to, what to expect to earn. We send the path as a 6-letter series, one per week.",
  },
  {
    title: "The labs map",
    body: "Ten free hands-on practice platforms — TryHackMe, HackTheBox, PortSwigger Web Security Academy, OverTheWire, PicoCTF, CyberDefenders, Root-Me — vetted, ordered, with a 18-month sequence so you don't waste time.",
  },
  {
    title: "The federal + private pathways",
    body: "How to apply to USAF 17X, Army Cyber 17C, Navy CTN, Marines, CISA, NSA, FBI Cyber, USCYBERCOM. Plus the defense-tech employer guide: Booz Allen, Palantir, Anduril, Shield AI, and the rest of the named ones.",
  },
  {
    title: "The certifications roadmap",
    body: "OSCP, OSEP, GPEN, GCIH, CISSP, Security+, CEH, OSWE — what each is worth, in 2026 dollars, when to take it, where to study legally and free.",
  },
  {
    title: "The legal framework",
    body: "The CFAA in plain English. The 7-rule discipline that keeps you employable and not in jail. The vulnerability disclosure templates the DOJ has blessed. Read this before you touch anything.",
  },
  {
    title: "The realtime intel feed",
    body: "When new breach disclosures, threat-actor advisories, federal program announcements, or major CVEs land — you get the lab-grade analysis instead of the marketing-deck summary. Anti-hype throughout.",
  },
];

export default function CyberStartPage() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <CyberHeroImage slug="path" alt="Long exposure of a single thin cyan light-trail rising along a black slate staircase." />
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[11px] tracking-[0.08em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn/cyber" className="hover:text-[#22F0D5]">Cyber</Link>{" "}
          <span className="text-[#1A2225]">/</span> Start
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            Start the AtomEons Cyber Career Track
          </p>
          <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl md:leading-[1]">
            Free masters-grade cyber training.{" "}
            <span style={{ color: ACCENT }}>Delivered to your inbox.</span>
          </h1>
          <p className="mt-8 max-w-[62ch] text-base leading-[1.7] text-[#C8CCCE] md:text-[17px]">
            The full AtomEons cyber education track — the path, the labs, the federal + private career pathways, the certifications roadmap, the legal framework, the realtime intel feed. CC-BY 4.0, free, no upsell, no influencer affiliate links. Drop your email; we&apos;ll send the series.
          </p>

          <div className="mt-12 rounded-2xl border border-[#22F0D5]/30 bg-[#0A0F11] p-6 md:p-10">
            <CyberStartForm />
          </div>

          <p className="mt-5 max-w-[62ch] text-sm leading-[1.6] text-[#9BA5A7]">
            Your email goes to AtomEons only. No selling, no sharing, no affiliate funnels. One unsubscribe link in every email and instant removal. We are an independent lab in Marco Island, FL.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            Six things in the inbox
          </p>
          <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            What you actually get.
          </h2>
          <div className="mt-12 space-y-10">
            {VALUE.map((v, i) => (
              <article key={v.title} className="border-l-2 pl-6" style={{ borderColor: ACCENT + "30" }}>
                <p className="font-mono text-[14px] tabular-nums" style={{ color: ACCENT }}>
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
                  {v.title}
                </h3>
                <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">{v.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#1A2225] bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 text-center">
          <h2 className="text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
            Or browse the curriculum first.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-[1.65] text-[#C8CCCE]">
            Every page is free to read without an email. The email series is the curated sequence — but if you prefer to self-navigate, the full surface is open.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link href="/learn/cyber" className="inline-flex items-center gap-2 rounded-full border border-[#22F0D5]/40 px-5 py-2.5 text-sm font-medium text-[#22F0D5] transition-colors hover:bg-[#22F0D5]/10">
              Cyber index →
            </Link>
            <Link href="/learn/cyber/path" className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] px-5 py-2.5 text-sm text-[#C8CCCE] transition-colors hover:border-[#22F0D5]/40 hover:text-[#22F0D5]">
              The path →
            </Link>
            <Link href="/learn/cyber/legal" className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] px-5 py-2.5 text-sm text-[#C8CCCE] transition-colors hover:border-[#FFB87A]/40 hover:text-[#FFB87A]">
              Legal first →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
