import type { Metadata } from "next";
import Link from "next/link";
import { CyberHeroImage } from "../_components/CyberHeroImage";

/**
 * /learn/cyber/podcasts — cyber audio worth your commute.
 *
 * Curated list of cyber-focused podcasts that produce high signal.
 * Each entry: name, hosts, format, why it earns a sub.
 */

export const metadata: Metadata = {
  title: "Cyber podcasts worth your commute · /learn/cyber/podcasts · AtomEons",
  description:
    "Darknet Diaries, Risky Business, Smashing Security, Hacking Humans, Click Here, The Privacy Security and OSINT Show, SANS Internet Storm Center, CyberWire Daily, Malicious Life, Lock and Code. The cyber podcasts that earn a subscription.",
  alternates: { canonical: "https://atomeons.com/learn/cyber/podcasts" },
  openGraph: {
    title: "Cyber podcasts worth your commute",
    description: "Ten cyber podcasts. Real signal, real hosts, real recurring value.",
    url: "https://atomeons.com/learn/cyber/podcasts",
    type: "article",
  },
  robots: { index: true, follow: true },
};

const ACCENT = "#22F0D5";

const PODCASTS = [
  { name: "Darknet Diaries", hosts: "Jack Rhysider (host + producer)", format: "Long-form storytelling. 60-90 min episodes. Released bi-weekly. 150+ episodes.", body: "Narrative cybersecurity stories — Cambridge Analytica, Stuxnet, NotPetya, the rise of LulzSec, the disappearance of Mt. Gox. Rhysider's production is closer to This American Life than typical tech podcasts. If you can only listen to one cyber podcast, this is it.", why: "Single best 'feel of the field' podcast in cybersecurity. The narrative quality is unmatched in the category." },
  { name: "Risky Business", hosts: "Patrick Gray (host) + Adam Boileau (regular co-host)", format: "Weekly news + interviews. ~60-80 min. Pat is Australian.", body: "The definitive weekly cybersecurity news podcast. Pat's editorial voice on threat-intel and policy is widely respected. Adam Boileau is technical, calm, and consistently sharp. Interviews are with named researchers + policymakers.", why: "Your weekly anchor for staying current on cyber news. Most well-known cyber pros listen to this." },
  { name: "Hacking Humans", hosts: "Dave Bittner + Joe Carrigan (CyberWire team)", format: "Weekly. ~30-45 min. Caller-Q+A format with weekly story analysis.", body: "Social engineering + phishing + scam analysis. Less technical than Risky Business; more focused on the human-attacker dynamic. Useful for AppSec + security-awareness practitioners.", why: "Best podcast on social engineering specifically. Caller stories + weekly scam-of-the-week analysis." },
  { name: "Smashing Security", hosts: "Graham Cluley + Carole Theriault", format: "Weekly. ~50-65 min. British, dryly funny.", body: "Cybersecurity news with personality. Cluley is a long-standing security commentator; Carole has industry background. They explain technical events for general audience without dumbing down.", why: "Best balance of accessible-to-non-pro + interesting-to-pro. Reliable weekly listen." },
  { name: "Click Here", hosts: "Dina Temple-Raston (host) + Recorded Future team", format: "Weekly. ~25-35 min. National-security framing.", body: "Cyber + intelligence + national-security stories with NPR-quality production. Temple-Raston was NPR national-security correspondent for 13 years before this. Editorial voice tilts toward foreign-policy implications.", why: "Best podcast for the cyber-policy angle. Reads like NPR did a cyber spinoff." },
  { name: "The Privacy, Security, and OSINT Show", hosts: "Michael Bazzell (former FBI cybercrime investigator)", format: "Variable cadence. ~45-90 min. Information-security focus.", body: "Privacy + OSINT (open-source intelligence) + investigative methodology. Bazzell wrote the canonical Open Source Intelligence Techniques textbook. The show drifts into deep specific technique demonstrations.", why: "Best podcast on OSINT methodology. Niche but extremely deep." },
  { name: "SANS Internet Storm Center Daily Stormcast", hosts: "Dr. Johannes Ullrich + ISC staff", format: "Daily. 5-10 min. SANS Internet Storm Center curated.", body: "Daily 5-10 minute briefing on the day's threat-intel + new CVEs + observed attacks. Curated by SANS Internet Storm Center handlers. The morning-coffee podcast for SOC + IR teams.", why: "Daily current-events for cyber pros. Best low-time-investment way to stay on top of new CVEs." },
  { name: "CyberWire Daily", hosts: "Dave Bittner + CyberWire team", format: "Daily. 20-30 min.", body: "Daily news roundup + occasional deeper interviews. Production value is high; less editorial opinion than Risky Business. Good for those wanting straight news.", why: "Daily anchor for cyber news without strong editorial voice. Pairs well with Risky Business weekly." },
  { name: "Malicious Life", hosts: "Ran Levi (host) + Cybereason team", format: "Weekly. ~35-50 min. Narrative history.", body: "Historical cybersecurity stories — early viruses, named hackers, big breaches. Less current-events, more 'how did we get here.' Pairs well with the /learn/cyber/timeline page on this site.", why: "Best podcast for cybersecurity history specifically. Good complement to Darknet Diaries." },
  { name: "Lock and Code", hosts: "David Ruiz (Malwarebytes Labs)", format: "Bi-weekly. ~30-45 min.", body: "Consumer-cybersecurity + privacy + ransomware focus. Less corporate/enterprise-tilted than Risky Business. Strong on the lived-experience side of cybersecurity events.", why: "Consumer angle covered better than most cyber podcasts. Useful if your work touches consumer security or privacy." },
];

export default function CyberPodcastsPage() {
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
          <span className="text-[#1A2225]">/</span> Podcasts
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            Cyber podcasts worth your commute
          </p>
          <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl md:leading-[1]">
            Ten podcasts.{" "}
            <span style={{ color: ACCENT }}>Pick three.</span>
          </h1>
          <p className="mt-8 max-w-[62ch] text-base leading-[1.7] text-[#C8CCCE] md:text-[17px]">
            Cyber podcasts vary wildly in quality. These ten produce real signal — narrative deep dives, weekly news anchors, daily threat briefings, history pieces. Pick a Daily, a Weekly, and a Longform — that&apos;s the kit. Skip the rest of the field; most cyber podcasts are influencer noise.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24 space-y-8">
          {PODCASTS.map((p, i) => (
            <article key={p.name} className="border-l-2 pl-6" style={{ borderColor: ACCENT + "30" }}>
              <div className="flex flex-wrap items-baseline gap-4">
                <p className="font-mono text-[14px] tabular-nums" style={{ color: ACCENT }}>
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="text-2xl font-medium tracking-tight text-[#F2F4F5]">{p.name}</h2>
              </div>
              <p className="mt-2 text-sm text-[#FFB87A]">{p.hosts}</p>
              <p className="mt-1 text-sm text-[#9BA5A7]">{p.format}</p>
              <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">{p.body}</p>
              <p className="mt-3 max-w-[62ch] text-[14px] leading-[1.65] text-[#9BA5A7]"><span className="text-[#22F0D5]">Why subscribe: </span>{p.why}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-[#1A2225] bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <h2 className="text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
            The right starter kit.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-[1.65] text-[#C8CCCE]">
            <strong className="text-[#22F0D5]">Daily:</strong> SANS Internet Storm Center Stormcast (5-10 min — coffee). <strong className="text-[#22F0D5]">Weekly:</strong> Risky Business (60-80 min — commute or workout). <strong className="text-[#22F0D5]">Longform:</strong> Darknet Diaries (60-90 min — weekend deep dive). Three feeds covering three time-budgets. Skip the rest until you outgrow these.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link href="/learn/cyber/youtube" className="inline-flex items-center gap-2 rounded-full border border-[#22F0D5]/40 px-5 py-2.5 text-sm font-medium text-[#22F0D5] transition-colors hover:bg-[#22F0D5]/10">
              13 YouTube channels →
            </Link>
            <Link href="/learn/cyber/books" className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] px-5 py-2.5 text-sm text-[#C8CCCE] transition-colors hover:border-[#22F0D5]/40 hover:text-[#22F0D5]">
              24 books to read →
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
