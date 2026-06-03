import type { Metadata } from "next";
import Link from "next/link";
import { CyberHeroImage } from "../_components/CyberHeroImage";

export const metadata: Metadata = {
  title: "Palmer Luckey · the Anduril founding · /learn/cyber/luckey · AtomEons",
  description:
    "Palmer Luckey's arc — Oculus founder, Facebook departure, Anduril founding, product-first defense model, CCA win, public posture. Sourced from interviews + press + Anduril material.",
  alternates: { canonical: "https://atomeons.com/learn/cyber/luckey" },
  robots: { index: true, follow: true },
};

const ACCENT = "#22F0D5";

const ARC = [
  {
    chapter: "Oculus · Kickstarter to Facebook · 2012-2017",
    body: "Luckey founded Oculus in 2012 at age 19 after building Rift prototypes in his garage in Long Beach. Kickstarter raised $2.4M (originally seeking $250K). Facebook acquired Oculus for ~$2B in 2014. Luckey stayed at Facebook until 2017 when he was publicly dismissed amid controversy over his political donations. The exit became a public episode about Silicon Valley culture + speech, and is the inflection point for the rest of his arc.",
  },
  {
    chapter: "Anduril founding · 2017",
    body: "Founded Anduril Industries in June 2017 with Trae Stephens (Founders Fund), Brian Schimpf, Joe Chen, Matt Grimm. The founding thesis: US defense industrial base lost ability to ship competitive products at competitive prices because cost-plus contract model rewards delivery delays + technology stagnation. Anduril positioned to invert it — build products, sell finished hardware to DoD at fixed price, refresh on consumer-tech cycles.",
  },
  {
    chapter: "Sentry Tower + first DoD revenue · 2018-2020",
    body: "Anduril's first product was the Sentry Tower — autonomous surveillance towers for border + base perimeter. Customs and Border Protection became an early customer. Lattice OS (the AI-driven C2 platform) emerged as the software spine. Through 2020 Anduril was the underdog defense-tech story; through 2021 it became inevitable.",
  },
  {
    chapter: "Series F + Replicator + CCA · 2021-2024",
    body: "Series E (2022) $1.48B at $8.5B valuation. Series F (2024) $1.5B+ at $14B+ valuation. Named in DoD Replicator initiative (2023, ~thousands of attritable autonomous systems within 18-24 months) for ALTIUS + Bolt. Co-won the US Air Force Collaborative Combat Aircraft (CCA) program with General Atomics in 2024 — most consequential single contract win for the company.",
  },
  {
    chapter: "Public-political posture · throughout",
    body: "Luckey speaks publicly about West-vs-authoritarian frames. After the Facebook departure he became one of the most visible Silicon Valley figures explicitly aligned with defense work. He defends his political positions on extended podcasts (Lex Fridman, The Free Press, Joe Rogan) without softening them for the audience. The cultural-stance is itself part of Anduril's hiring filter — the company attracts engineers who agree with it and would not work there otherwise.",
  },
  {
    chapter: "Vertical integration as moat · 2023+",
    body: "Anduril increasingly builds the manufacturing too — purchased an Ohio manufacturing facility in 2024, opened additional production lines for the drone + maritime + ground vehicle product families. The vertical-integration argument: software-only defense competitors (Palantir) and hardware-only competitors (traditional primes) are each missing half the puzzle; Anduril controls both ends. This is the bet the next decade will validate or refute.",
  },
];

const PRODUCT_LINE = [
  { name: "Lattice OS", role: "AI-driven C2 software platform — the company's spine" },
  { name: "Ghost", role: "autonomous surveillance UAV" },
  { name: "ALTIUS family", role: "loitering munitions (ALTIUS-600, ALTIUS-700M)" },
  { name: "Bolt", role: "handheld kamikaze drone" },
  { name: "Roadrunner", role: "VTOL counter-UAS interceptor" },
  { name: "Sentry Tower", role: "autonomous surveillance tower (border + base perimeter)" },
  { name: "Dive-LD", role: "autonomous underwater vehicle (long-duration)" },
  { name: "Fury", role: "Collaborative Combat Aircraft (CCA) candidate · USAF program 2024+" },
  { name: "Pulsar", role: "EW + RF signal-detection product line" },
  { name: "Anvil + Anvil-M", role: "kinetic counter-UAS interceptors" },
];

export default function LuckeyPage() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <CyberHeroImage slug="modern" alt="Top-down photograph of a single small black drone loitering above fog at dawn." />
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[11px] tracking-[0.08em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn/cyber" className="hover:text-[#22F0D5]">Cyber</Link>{" "}
          <span className="text-[#1A2225]">/</span> Luckey
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            Palmer Luckey · Anduril founder · the arc
          </p>
          <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl md:leading-[1]">
            Build the products,{" "}
            <span style={{ color: ACCENT }}>then sell them.</span>
          </h1>
          <p className="mt-8 max-w-[62ch] text-base leading-[1.7] text-[#C8CCCE] md:text-[17px]">
            Palmer Luckey is the most visible founder in defense-tech under 35. The Anduril story is two stories: a structural argument about the defense industrial base (cost-plus is broken, product-first is the fix) and a cultural argument about Silicon Valley's defense aversion. This page synthesizes the public arc and the product line — sourced from extended-form interviews + Anduril press + DoD contract announcements.
          </p>
        </div>
      </section>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            Six chapters of the arc
          </p>
          <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            Oculus to CCA, 2012 to 2026.
          </h2>
          <div className="mt-12 space-y-12">
            {ARC.map((a, i) => (
              <article key={a.chapter} className="border-l-2 pl-6" style={{ borderColor: ACCENT + "30" }}>
                <div className="flex flex-wrap items-baseline gap-4">
                  <p className="font-mono text-[14px] tabular-nums" style={{ color: ACCENT }}>
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-xl font-medium tracking-tight text-[#F2F4F5] md:text-2xl">
                    {a.chapter}
                  </h3>
                </div>
                <p className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">{a.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#1A2225] bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            The product line
          </p>
          <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            Ten named products you should recognize on sight.
          </h2>
          <ul className="mt-10 space-y-5">
            {PRODUCT_LINE.map((p, i) => (
              <li key={p.name} className="grid grid-cols-[3rem_1fr] gap-4">
                <span className="font-mono text-[14px] tabular-nums" style={{ color: ACCENT }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="text-lg font-medium text-[#F2F4F5]">{p.name}</p>
                  <p className="mt-2 max-w-[62ch] text-[14px] leading-[1.65] text-[#9BA5A7]">{p.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-[#1A2225] bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            Read directly
          </p>
          <ul className="mt-8 space-y-4 text-[14px] leading-[1.7] text-[#C8CCCE]">
            <li>· anduril.com/mission · the stated thesis in the company's own words</li>
            <li>· Palmer Luckey on Lex Fridman Podcast #386 (2023) · 3-hour primary-source interview</li>
            <li>· Palmer Luckey on Joe Rogan #2167 (2024) · 3-hour, broader-audience version</li>
            <li>· Palmer Luckey · The Free Press (Bari Weiss) extended interview · 2024</li>
            <li>· Forbes 2017/2020/2024 Luckey profiles · arc-narrative version</li>
            <li>· Wired's 2017 'A Hardware Hacker Returns' + 2021 'Anduril at the Border' features</li>
            <li>· DoD CCA + Replicator press releases 2023-2024 · primary-source contract data</li>
          </ul>
        </div>
      </section>

      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/learn/cyber/karp" className="inline-flex items-center gap-2 rounded-full border border-[#22F0D5]/40 px-5 py-2.5 text-sm font-medium text-[#22F0D5] transition-colors hover:bg-[#22F0D5]/10">
              ← Alex Karp
            </Link>
            <Link href="/learn/cyber/doctrine" className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] px-5 py-2.5 text-sm text-[#C8CCCE] transition-colors hover:border-[#22F0D5]/40 hover:text-[#22F0D5]">
              Doctrine overview →
            </Link>
            <Link href="/learn/cyber/employers" className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] px-5 py-2.5 text-sm text-[#C8CCCE] transition-colors hover:border-[#22F0D5]/40 hover:text-[#22F0D5]">
              Where to apply →
            </Link>
            <Link href="/learn/cyber" className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] px-5 py-2.5 text-sm text-[#9BA5A7] transition-colors hover:text-[#E7EBED]">
              ← cyber index
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
