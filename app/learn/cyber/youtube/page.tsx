import type { Metadata } from "next";
import Link from "next/link";
import { CyberHeroImage } from "../_components/CyberHeroImage";

/**
 * /learn/cyber/youtube — channels worth subscribing to.
 *
 * Curated catalogue of cyber-education YouTube channels that produce
 * high signal-to-noise material. Each entry: channel name, who runs
 * it, what they cover, why it earns a sub.
 */

export const metadata: Metadata = {
  title: "Cyber YouTube channels worth subscribing to · /learn/cyber/youtube · AtomEons",
  description:
    "LiveOverflow, IppSec, John Hammond, NetworkChuck, The Cyber Mentor, STOK, David Bombal, OALabs, GuidedHacking, MalwareTechBlog, SecurityNow, DEF CON, Black Hat. The cyber YouTube channels that earn a subscription.",
  alternates: { canonical: "https://atomeons.com/learn/cyber/youtube" },
  openGraph: {
    title: "Cyber YouTube channels worth subscribing to",
    description: "13 channels that produce real cyber education on YouTube.",
    url: "https://atomeons.com/learn/cyber/youtube",
    type: "article",
  },
  robots: { index: true, follow: true },
};

const ACCENT = "#22F0D5";

const CHANNELS = [
  { name: "LiveOverflow", who: "Fabian Faessler (former hackerone.com/fabs)", covers: "Binary exploitation, reverse engineering, CTF write-ups, security research education. Best technical-depth-per-video on YouTube for cyber.", why: "If you can only watch one channel, watch this. Foundational technical material that doesn't get dumbed down." },
  { name: "IppSec", who: "Ippsec (HTB co-founder)", covers: "HackTheBox machine walkthroughs. Hundreds of videos covering everything from beginner to insane-rated machines.", why: "OSCP prep gold standard. Every aspiring penetration tester uses Ippsec videos." },
  { name: "John Hammond", who: "John Hammond (former Huntress threat intel)", covers: "Malware analysis, CTF walkthroughs, real-time analysis of trending threats. Frequent uploads.", why: "Bridges current threat-intel events with practical analysis demonstration. Good current-events tracking." },
  { name: "NetworkChuck", who: "Chuck Keith", covers: "Networking + cyber fundamentals at a beginner-friendly pace. Cloud + Linux + intro security.", why: "Best on-ramp for someone with zero IT background. Production value is high; technical depth is intentionally limited." },
  { name: "The Cyber Mentor (Heath Adams)", who: "Heath Adams + TCM Security team", covers: "Penetration-testing course material, AD pentesting (his Practical Ethical Hacking course is the standard), business of security work.", why: "PEH course is the canonical 'I'm getting into pentest' video curriculum. Free on YouTube; full version on TCM Academy." },
  { name: "STOK", who: "Stök", covers: "Bug bounty methodology, recon, mindset. Cinematic production. Pairs with HackerOne ambassador work.", why: "Best 'feel of the field' content. Combines methodology with motivational framing in a way that lands." },
  { name: "David Bombal", who: "David Bombal", covers: "Networking foundations (CCNA prep, etc.) + cyber. Frequent interviews with named researchers.", why: "Interview series is the major hook — long-form conversations with Mudge, Krebs, Hammond, others. Stronger as interview channel than self-content channel." },
  { name: "OALabs", who: "Sergei Frankoff + Sean Wilson", covers: "Practical malware analysis, reverse engineering, debugging real-world samples. Deep technical content.", why: "Best malware-analysis YouTube channel. Direct technical practice on real samples." },
  { name: "GuidedHacking", who: "Various contributors", covers: "Game hacking, anti-cheat bypasses, low-level Windows internals. Niche but technically deep.", why: "Game hacking is a great gateway into Windows internals + reverse engineering. The community here produces sharp researchers." },
  { name: "MalwareTechBlog", who: "Marcus Hutchins", covers: "Reverse engineering, malware analysis, occasional career-narrative videos.", why: "Hutchins is one of the most-cited researchers of the past decade. His videos are infrequent but high signal. (See also /learn/cyber/heroes.)" },
  { name: "Steve Gibson — Security Now", who: "Steve Gibson + Leo Laporte (TWiT podcast on YouTube too)", covers: "Weekly security news + technical deep-dives. Running since 2005, ~1,000+ episodes.", why: "Long-form security education with historical context. Even where Gibson is occasionally idiosyncratic, the back catalogue is unmatched." },
  { name: "DEF CON Official", who: "DEF CON Communications", covers: "Recorded talks from every DEF CON since the late 1990s. Free + complete.", why: "Three hours a week of DEF CON talks = graduate-level cyber coursework. Pick villages you care about + binge their year." },
  { name: "Black Hat Briefings", who: "Black Hat / Informa", covers: "Selected Briefings talks from each Black Hat USA / Europe / Asia. Less of the catalogue is free than DEF CON, but the freely-available material is high signal.", why: "Black Hat selection committee is the field's most rigorous. A Black Hat talk being free is a quality signal." },
];

export default function CyberYoutubePage() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <CyberHeroImage slug="labs" alt="Overhead photograph of a dark workbench with a black keyboard, closed laptop, and coiled cable arranged on dark concrete." />
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[11px] tracking-[0.08em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn/cyber" className="hover:text-[#22F0D5]">Cyber</Link>{" "}
          <span className="text-[#1A2225]">/</span> YouTube
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            YouTube channels worth subscribing to
          </p>
          <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl md:leading-[1]">
            Three hours a week.{" "}
            <span style={{ color: ACCENT }}>That&apos;s the curriculum.</span>
          </h1>
          <p className="mt-8 max-w-[62ch] text-base leading-[1.7] text-[#C8CCCE] md:text-[17px]">
            Thirteen YouTube channels that produce real cyber education — not influencer hype, not 'here&apos;s 10 minutes of motivation,' but actual technical material that compounds. Watching 2-3 hours a week from this list is equivalent to a full graduate-level course over the year.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24 space-y-8">
          {CHANNELS.map((c, i) => (
            <article key={c.name} className="border-l-2 pl-6" style={{ borderColor: ACCENT + "30" }}>
              <div className="flex flex-wrap items-baseline gap-4">
                <p className="font-mono text-[14px] tabular-nums" style={{ color: ACCENT }}>
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="text-2xl font-medium tracking-tight text-[#F2F4F5]">{c.name}</h2>
              </div>
              <p className="mt-2 text-sm text-[#9BA5A7]"><span className="text-[#FFB87A]">Who: </span>{c.who}</p>
              <p className="mt-3 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]"><span className="text-[#22F0D5]">Covers: </span>{c.covers}</p>
              <p className="mt-2 max-w-[62ch] text-[14px] leading-[1.65] text-[#9BA5A7]"><span className="text-[#22F0D5]">Why subscribe: </span>{c.why}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-[#1A2225] bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/learn/cyber/books" className="inline-flex items-center gap-2 rounded-full border border-[#22F0D5]/40 px-5 py-2.5 text-sm font-medium text-[#22F0D5] transition-colors hover:bg-[#22F0D5]/10">
              24 books to read →
            </Link>
            <Link href="/learn/cyber/heroes" className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] px-5 py-2.5 text-sm text-[#C8CCCE] transition-colors hover:border-[#22F0D5]/40 hover:text-[#22F0D5]">
              12 researcher profiles →
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
