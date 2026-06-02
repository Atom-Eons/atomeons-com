import type { Metadata } from "next";
import Link from "next/link";
import HackersGate from "./_components/HackersGate";
import { CyberHeroImage } from "./_components/CyberHeroImage";

/**
 * /learn/cyber — masters-grade ethical hacking career path index.
 *
 * Operator directive 2026-05-31: "add a masters level training in ai
 * cybersecurity including how to become one fully. teach how to work
 * for hackerone and how to start ethical white hat cyber. pro helping
 * america fight cyber war. tell the truth but only public info dont
 * get me in trouble. just need an edu path for kids that want to do
 * cyber ethical hacking as a job. these gamers are ready to do this
 * they are fast. they need help understanding cyberwars"
 *
 * Audience: gamers / young adults considering ethical hacking as a
 * career. Voice: respectful, plain-spoken, anti-hype, legally honest.
 *
 * Posture: PUBLIC INFORMATION ONLY. We name real programs, real
 * certifications, real federal hiring paths — all from public-record
 * sources (.mil career pages, .gov job postings, HackerOne public
 * disclosure, university curricula). NO operational tradecraft, NO
 * tactical detail, NO classified material. Education + on-ramp only.
 */

const ACCENT = "#22F0D5";

const TRACKS = [
  {
    slug: "breaches",
    title: "15 breaches that defined cybersecurity",
    sub: "Stuxnet → Target → NotPetya → SolarWinds → Colonial → Change Healthcare → Volt + Salt Typhoon",
    body:
      "Each row is a case study taught in every serious cybersecurity program. Public sources only (SEC filings, DOJ indictments, CISA, FBI, reputable journalism). The pattern across all fifteen — supply chain dominant, patches late, ransomware blurred with geopolitics, pre-positioning the 2026 threat.",
  },
  {
    slug: "threat-actors",
    title: "Threat actor encyclopedia · 16 named groups",
    sub: "APT28 · APT29 · Sandworm · Lazarus · Volt Typhoon · LockBit · Cl0p · Scattered Spider",
    body:
      "The named groups every cyber pro knows cold. Ten state-sponsored APTs (Russia, China, North Korea, Iran, US-attributable Equation Group) + six criminal ransomware crews. Sources: DOJ indictments + CISA advisories + Mandiant + Microsoft Threat Intelligence + CrowdStrike. Public attribution only.",
  },
  {
    slug: "tools",
    title: "Defensive tool catalogue · 32 named tools",
    sub: "Wireshark · Nmap · Burp · Ghidra · Volatility · Splunk · Sigma · MITRE Caldera",
    body:
      "Every tool in every job description, in eight categories: network analysis, vulnerability scanning, web AppSec, reverse engineering, OSINT, SIEM, endpoint IR, detection engineering. What each tool is, who uses it, where to learn it legally. Recognition-first, not how-to-attack.",
  },
  {
    slug: "heroes",
    title: "Twelve researchers worth knowing",
    sub: "Krebs · Hutchins · Mudge · Moussouris · Schneier · Halvar · Tavis · Raiu · Galperin · Hyppönen · Snyder · Tabriz",
    body:
      "The named voices the field listens to. Twelve public-figure profiles sourced to books, congressional testimony, conference talks, reputable journalism. A junior cyber pro who knows zero names doesn't have the field's social context.",
  },
  {
    slug: "timeline",
    title: "Sixty years of cyber",
    sub: "1969 ARPANET → 2026 Salt Typhoon · the arc in 50 entries",
    body:
      "From Bob Thomas's Creeper worm in 1971 to nation-state pre-positioning in critical infrastructure in 2026. Six eras, fifty entries, every one sourced to public material. The pattern across 60 years is the lesson.",
  },
  {
    slug: "books",
    title: "The definitive reading list · 24 books",
    sub: "Cuckoo's Egg · Sandworm · Countdown to Zero Day · Applied Crypto · Practical Malware Analysis",
    body:
      "Seven categories — history + journalism, cryptography + systems, red team, blue team, web + AppSec, career + culture, policy + ethics. Every title is on a serious cyber program's reading list or a senior researcher's recommended shelf.",
  },
  {
    slug: "conferences",
    title: "Where the field meets · 12 conferences",
    sub: "DEF CON · Black Hat · BSides · RSA · ShmooCon · CCC · OWASP Global",
    body:
      "Cybersecurity is small enough that 2-3 conferences a year puts you in the conversation. What each is, when it runs, what tier, and how a student or junior pro actually gets there. Concrete next-step: attend one this year.",
  },
  {
    slug: "youtube",
    title: "YouTube channels worth subscribing to · 13 picks",
    sub: "LiveOverflow · IppSec · John Hammond · NetworkChuck · The Cyber Mentor · STOK · DEF CON",
    body:
      "Thirteen YouTube channels that produce real cyber education. LiveOverflow + IppSec at the technical depth end, NetworkChuck + David Bombal at the on-ramp end, DEF CON + Black Hat for the conference archive. Three hours a week from this list = graduate-level coursework.",
  },
  {
    slug: "podcasts",
    title: "Cyber podcasts worth your commute · 10 picks",
    sub: "Darknet Diaries · Risky Business · Smashing Security · Click Here · CyberWire · SANS Stormcast",
    body:
      "Ten cyber podcasts. Daily anchor (SANS Stormcast), weekly anchor (Risky Business), longform deep-dive (Darknet Diaries) — that's the right starter kit. Each picked for real recurring signal, not influencer noise.",
  },
  {
    slug: "modern",
    title: "What cyberwar looks like RIGHT NOW",
    sub: "Drones · loitering munitions · Volt + Salt Typhoon · Replicator",
    body:
      "Realtime intel, mid-2026. FPV drones replaced artillery. Anduril Bolt + Switchblade 600. EW + cyber + kinetic convergence. The actual gap between 'what textbooks say' and 'what's fielded today' is the largest it's ever been. Start here.",
  },
  {
    slug: "llm-warfare",
    title: "How LLMs actually fight",
    sub: "Microsoft+OpenAI threat-actor disclosure · CIA Osiris · Lavender",
    body:
      "What AI is doing in active operations as of mid-2026 — defensive SOC Copilot + Charlotte AI, offensive code generation, intel triage (Osiris, Task Force Lima), the controversial reporting on Lavender/Gospel. Sourced, current, no speculation.",
  },
  {
    slug: "platforms",
    title: "Palantir + Anduril + Shield AI + 7 others",
    sub: "The actual platforms running modern defense",
    body:
      "Palantir AIP + Maven Smart System. Anduril Lattice + Roadrunner + Fury. Shield AI Hivemind + V-BAT. Saronic. Helsing. Skydio X10. Scale AI Donovan. AeroVironment Switchblade. Vannevar Labs. C3.ai. Who they are, what they make, what they pay for, how to apply.",
  },
  {
    slug: "path",
    title: "The career path",
    sub: "Six stages from curious gamer to senior practitioner",
    body:
      "Honest milestones. What 'good' looks like at each stage. What you do, what you read, what you build, what you can earn. No 'one weird trick' — the path is real and it takes time.",
  },
  {
    slug: "labs",
    title: "Free practice labs",
    sub: "Where to legally hack without leaving your house",
    body:
      "TryHackMe · HackTheBox · PortSwigger Web Security Academy · OverTheWire · PicoCTF · CyberDefenders · Root-Me. Every platform vetted, free tier described, what each one teaches, the order to do them in.",
  },
  {
    slug: "hackerone",
    title: "Bug bounty · HackerOne path",
    sub: "Your first paid finding · how to actually start",
    body:
      "Real program selection. Scope reading. Recon → triage → write-up → payout. The mistakes new hunters make. The platforms (HackerOne · Bugcrowd · Intigriti · YesWeHack · Synack Red Team) and which to start with.",
  },
  {
    slug: "legal",
    title: "What's legal · what's not",
    sub: "Stay out of jail · CFAA, scope, authorization",
    body:
      "The Computer Fraud and Abuse Act in plain language. What 'authorization' actually means. Real cases (van Buren v US 2021, Aaron Swartz, Marcus Hutchins). Why 'I was just curious' is not a defense. The vulnerability-disclosure policy template the DoJ blessed.",
  },
  {
    slug: "serve",
    title: "Serving · military + federal",
    sub: "The .mil and .gov ethical-hacking on-ramps",
    body:
      "US Cyber Command structure (public). Air Force 17X · Army Cyber 17C/17A · Navy CTN · Marines 17XX · Coast Guard Cyber. CISA · NSA · FBI Cyber · DoD Vulnerability Disclosure Program. What 'fighting cyber war ethically as an American' actually looks like in 2026.",
  },
  {
    slug: "certs",
    title: "Certifications worth it",
    sub: "OSCP · OSEP · GPEN · GCIH · CISSP · what each is for",
    body:
      "What hiring managers actually look for. The cert that opens the first door (OSCP). The cert that opens federal doors (Security+). The certs that don't matter as much as the marketing claims. Pricing, time-to-pass, free study paths.",
  },
  {
    slug: "ai-security",
    title: "AI security · the new attack surface",
    sub: "Prompt injection · adversarial ML · model theft",
    body:
      "OWASP LLM Top 10. MITRE ATLAS framework. Where AI-specific vulnerabilities live. How AI-security work differs from traditional appsec. What hiring this skill set looks like in 2026.",
  },
  {
    slug: "cyberwar",
    title: "Cyber war · the public framework",
    sub: "What nation-state cybersecurity actually is",
    body:
      "Public info only. Stuxnet (declassified). SolarWinds. NotPetya. Colonial Pipeline. Volt Typhoon disclosures. The US National Cybersecurity Strategy 2023. How the 'why this matters' framing serves the white-hat career — and where the line between defense and offense is drawn publicly.",
  },
];

export const metadata: Metadata = {
  title: "Ethical hacking career path · /learn/cyber · AtomEons",
  description:
    "The masters-grade ethical hacking + AI security education path for gamers and self-taught operators. Free practice labs, HackerOne bug bounty entry, US Cyber Command + CISA + NSA service paths, OSCP/OSEP cert ladder, OWASP LLM Top 10, the CFAA + legal-scope discipline that keeps you employable and not in jail. Public info only. CC-BY 4.0.",
  keywords: [
    "ethical hacking career",
    "white hat hacker path",
    "AI cybersecurity",
    "HackerOne",
    "bug bounty",
    "OSCP certification",
    "TryHackMe",
    "HackTheBox",
    "US Cyber Command career",
    "Air Force 17X",
    "Army Cyber 17C",
    "Navy CTN",
    "CISA jobs",
    "NSA jobs",
    "OWASP LLM Top 10",
    "MITRE ATLAS",
    "cyberwar education",
    "CFAA",
    "vulnerability disclosure",
  ],
  alternates: { canonical: "https://atomeons.com/learn/cyber" },
  openGraph: {
    title: "Ethical hacking career path · /learn/cyber",
    description: "Masters-grade. Free labs · HackerOne · OSCP · military + federal · OWASP LLM Top 10. Public info only. CC-BY 4.0.",
    url: "https://atomeons.com/learn/cyber",
    type: "article",
  },
  twitter: { card: "summary_large_image", title: "Ethical hacking career path", description: "Masters-grade · public info only · CC-BY 4.0" },
  robots: { index: true, follow: true },
};

export default function CyberIndex() {
  // Track JSON-LD — must be crawlable by Google + AI search even with the gate showing.
  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Ethical hacking career path · AtomEons /learn/cyber",
    "description": "Masters-grade ethical hacking + AI security education for gamers and self-taught operators. Public information only.",
    "provider": { "@type": "Organization", "name": "AtomEons Systems Laboratory", "url": "https://atomeons.com" },
    "url": "https://atomeons.com/learn/cyber",
    "inLanguage": "en",
    "isAccessibleForFree": true,
    "license": "https://creativecommons.org/licenses/by/4.0/",
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "online",
      "courseWorkload": "PT60H",
    },
    "hasPart": [
      "modern", "llm-warfare", "platforms", "path", "labs", "hackerone",
      "legal", "serve", "certs", "ai-security", "cyberwar",
    ].map((slug) => ({
      "@type": "Course",
      "name": slug,
      "url": `https://atomeons.com/learn/cyber/${slug}`,
    })),
  };

  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <CyberHeroImage slug="cyber-index" alt={"Cinematic press-photo of a dimly lit cybersecurity operations center seen from above, single bio-cyan glow against pure black."} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }} />
      <HackersGate />
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span> Cyber
        </p>
      </div>

      {/* HERO — 1 eyebrow + 1 H1 + 1 lede + 1 CTA */}
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="text-[12px] font-medium tracking-tight" style={{ color: ACCENT }}>
            Ethical hacking · masters-grade · public-info only
          </p>
          <h1 className="mt-6 text-balance text-4xl font-medium leading-[1.05] tracking-tight sm:leading-[1.02] md:text-6xl md:leading-[1]">
            For the gamers ready to fight cyber war{" "}
            <span style={{ color: ACCENT }}>ethically.</span>
          </h1>
          <p className="mt-8 max-w-[58ch] text-[17px] leading-[1.6] text-[#C8CCCE]">
            Free labs, bug bounty, federal cyber, AI security — every legitimate on-ramp.{" "}
            <strong className="text-[#F2F4F5]">The line between ethical hacking and federal prison is authorization.</strong>{" "}
            This track teaches both.
          </p>
          <Link
            href="/learn/cyber/path"
            className="mt-10 inline-flex items-center gap-2 rounded-full border border-[#22F0D5]/40 px-5 py-2.5 text-sm font-medium text-[#22F0D5] transition-colors hover:bg-[#22F0D5]/10"
          >
            Start with the path <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      {/* 11 TRACKS */}
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-5xl px-6 py-16 md:py-24">
          <h2 className="text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            The full education map.
          </h2>
          <p className="mt-5 max-w-[62ch] text-base leading-[1.7] text-[#C8CCCE]">
            Read them in any order. The career path overview gives you the macro. The labs page
            is the most actionable starting point. The legal page is the one you read first if
            you are under 25 and you have ever &ldquo;just been curious&rdquo; about something
            online.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {TRACKS.map((t) => (
              <Link
                key={t.slug}
                href={`/learn/cyber/${t.slug}`}
                className="group block rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 transition-colors hover:border-[#22F0D5]/40"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: ACCENT }}>
                  ::{t.slug}
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[#F2F4F5] group-hover:text-[#22F0D5]">
                  {t.title}
                </h3>
                <p className="mt-1 text-sm font-medium text-[#FFB87A]">{t.sub}</p>
                <p className="mt-3 text-sm leading-[1.65] text-[#9BA5A7]">{t.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* THE PROMISE OF THE TRACK */}
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <h2 className="text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            Real, observable outcomes.
          </h2>
          <p className="mt-4 max-w-[62ch] text-base leading-[1.7] text-[#9BA5A7]">
            What you&apos;ll be able to do after this track.
          </p>
          <ul className="mt-8 space-y-4 text-base leading-[1.7] text-[#C8CCCE]">
            <li className="flex gap-3">
              <span style={{ color: ACCENT }}>▲</span>
              <span>
                <strong className="text-[#F2F4F5]">Hold your own in a TryHackMe / HackTheBox monthly leaderboard.</strong>{" "}
                The skill checks the rest of the industry uses are the same ones you do daily.
              </span>
            </li>
            <li className="flex gap-3">
              <span style={{ color: ACCENT }}>▲</span>
              <span>
                <strong className="text-[#F2F4F5]">Submit a first valid bug bounty finding to HackerOne or Bugcrowd.</strong>{" "}
                Most first-finders earn $100-$500 on a low-severity bug. The credential is what
                matters · it&apos;s your first public proof of competence.
              </span>
            </li>
            <li className="flex gap-3">
              <span style={{ color: ACCENT }}>▲</span>
              <span>
                <strong className="text-[#F2F4F5]">Pass the Offensive Security Certified Professional (OSCP) exam.</strong>{" "}
                This is the credential that opens almost every penetration testing door. The
                self-study cost is around $1,749 for the lab + exam bundle as of 2026. People
                pass it in 3-12 months from a serious starting point.
              </span>
            </li>
            <li className="flex gap-3">
              <span style={{ color: ACCENT }}>▲</span>
              <span>
                <strong className="text-[#F2F4F5]">Read a vulnerability disclosure scope and know if your finding is in-bounds.</strong>{" "}
                This is the single skill that separates &ldquo;ethical&rdquo; from &ldquo;federal
                indictment.&rdquo;
              </span>
            </li>
            <li className="flex gap-3">
              <span style={{ color: ACCENT }}>▲</span>
              <span>
                <strong className="text-[#F2F4F5]">Apply to a military or federal cyber role with a clean application.</strong>{" "}
                US Cyber Command, NSA, CISA, FBI Cyber, Air Force 17X all post jobs publicly. You
                will know which ones to apply for, which clearance level to expect, and what the
                first three years actually look like.
              </span>
            </li>
            <li className="flex gap-3">
              <span style={{ color: ACCENT }}>▲</span>
              <span>
                <strong className="text-[#F2F4F5]">Identify the AI-specific vulnerabilities in a modern application stack.</strong>{" "}
                OWASP LLM Top 10. Prompt injection variants. RAG corpus poisoning. Adversarial ML.
                This skill is undersupplied and overpaid right now.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* THE HONEST FRAMING */}
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <h2 className="text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            We do not teach you to break into things you don&apos;t own.
          </h2>
          <p className="mt-4 max-w-[62ch] text-base leading-[1.7] text-[#FFB87A]">
            What this track is NOT.
          </p>
          <ul className="mt-8 space-y-4 text-base leading-[1.7] text-[#C8CCCE]">
            <li className="flex gap-3">
              <span className="text-[#FFB87A]">○</span>
              <span>
                Zero operational tradecraft. We name TOOLS (Burp Suite, Metasploit, nmap, etc.)
                because they&apos;re in every public textbook. We don&apos;t show you how to use
                them against a target. That&apos;s what the labs are for · they&apos;re built
                exactly to be broken.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#FFB87A]">○</span>
              <span>
                Zero zero-day discussion beyond what&apos;s already in public Mitre / CVE
                databases.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#FFB87A]">○</span>
              <span>
                Zero advice on offensive techniques that have no defensive purpose. If knowing
                something only helps an attacker, it&apos;s out of scope.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#FFB87A]">○</span>
              <span>
                Zero classified material. Every nation-state cyber claim cites a declassified
                document, a public indictment, a CISA advisory, or a news report.
              </span>
            </li>
          </ul>
          <p className="mt-8 text-base leading-[1.7] text-[#C8CCCE]">
            What you&apos;ll find instead is the on-ramp · the legitimate, public, well-paid
            career path that turns &ldquo;I&apos;m fast and I see the patterns&rdquo; into
            &ldquo;I&apos;m a senior security engineer at a company that pays me to think like
            an attacker for a living.&rdquo; That career exists in 2026 in unprecedented volume.
            This track shows you how to walk into it.
          </p>
        </div>
      </section>

      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/learn/cyber/path" className="inline-flex items-center gap-2 rounded-full border border-[#22F0D5]/40 px-5 py-2.5 text-sm font-medium text-[#22F0D5] transition-colors hover:bg-[#22F0D5]/10">
              Start with the path <span aria-hidden>→</span>
            </Link>
            <Link href="/learn/cyber/legal" className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] bg-[#0A0F11] px-5 py-2.5 text-sm text-[#C8CCCE] transition-colors hover:border-[#FFB87A]/40 hover:text-[#FFB87A]">
              Read the legal page first <span aria-hidden>→</span>
            </Link>
            <Link href="/learn" className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] bg-[#0A0F11] px-5 py-2.5 text-sm text-[#9BA5A7] transition-colors hover:text-[#E7EBED]">
              <span aria-hidden>←</span> Back to learn
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
