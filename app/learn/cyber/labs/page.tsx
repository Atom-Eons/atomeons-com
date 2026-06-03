import type { Metadata } from "next";
import Link from "next/link";
import { CyberHeroImage } from "../_components/CyberHeroImage";

const PLATFORMS = [
  {
    name: "TryHackMe",
    url: "https://tryhackme.com",
    cost: "Free tier substantial · $14/mo Premium recommended after month one",
    level: "Absolute beginner → mid",
    body: "The single best starting platform for someone with zero background. Browser-based, no setup. Guided learning paths ('Pre-Security', 'Cyber Security 101', 'Junior Penetration Tester'). Each room walks you through a concept and then has you exploit a deliberately vulnerable machine. The 'rooms' format is gamified and that works · stage-01-to-stage-02 graduation almost always happens here.",
    order: 1,
  },
  {
    name: "HackTheBox",
    url: "https://www.hackthebox.com",
    cost: "Free + paid ($14/mo VIP, $20/mo VIP+, Academy modules ~$50-$150 each)",
    level: "Beginner → senior",
    body: "Less hand-holding than TryHackMe. The box you spin up is the entire challenge — figure out what it's running, find the path in, escalate to root, capture the flags. This is the platform that reveals whether you're going to be good at this. The 'Pro Hacker' rank or higher is a real credential on resumes. HackTheBox Academy is their paid course track; the CPTS / CBBH paths there are well-regarded.",
    order: 2,
  },
  {
    name: "PortSwigger Web Security Academy",
    url: "https://portswigger.net/web-security",
    cost: "100% FREE · forever",
    level: "Beginner → senior · web focus",
    body: "Made by the people who make Burp Suite. The single best free web-application security training in existence. Every lab is a real deliberately-vulnerable web app you exploit using the free Burp Community Edition. Apprentice / Practitioner / Expert tiers. If you want to do web pentest or bug bounty, finish this. All of it.",
    order: 3,
  },
  {
    name: "OverTheWire",
    url: "https://overthewire.org/wargames",
    cost: "100% FREE",
    level: "Linux beginner → CTF veteran",
    body: "The Bandit wargame (Level 0 → Level 34) is the canonical Linux + command-line + Unix-tooling primer for security. Each level gives you SSH access to a box; you find the password for the next level somewhere on the filesystem or in a running process. By Level 20 you've absorbed years of Linux fluency without realizing.",
    order: 4,
  },
  {
    name: "PicoCTF",
    url: "https://picoctf.org",
    cost: "100% FREE",
    level: "High school → undergrad → beginner pro",
    body: "Carnegie Mellon's CTF (capture-the-flag) platform. Originally for high-school students, now a year-round on-ramp for anyone. Challenges in cryptography, reverse engineering, web exploitation, binary exploitation, forensics. The puzzles are real, the difficulty curve is reasonable, and 'I did well on picoCTF' is a credential at the early-career stage.",
    order: 5,
  },
  {
    name: "CyberDefenders",
    url: "https://cyberdefenders.org",
    cost: "Free tier + paid labs",
    level: "Blue-team focused · beginner → senior",
    body: "If you're more interested in defending than attacking (often higher-paying and more in-demand than the marketing makes it seem), this is your TryHackMe. Forensics challenges, incident response scenarios, log analysis, threat hunting. The free tier is large enough to learn the core competencies.",
    order: 6,
  },
  {
    name: "Root-Me",
    url: "https://www.root-me.org",
    cost: "Free + paid tiers",
    level: "Beginner → expert",
    body: "French-origin platform that's been running for years and is one of the largest repositories of CTF-style challenges (cryptanalysis, network, web, programming, forensics, app-system, app-script, realist, steganography). Multilingual UI. Cheap subscription if you want VPN access to their lab network for the realist challenges.",
    order: 7,
  },
  {
    name: "VulnHub",
    url: "https://www.vulnhub.com",
    cost: "100% FREE",
    level: "Pre-OSCP practice",
    body: "Downloadable virtual machines, free. You run them in your own VM software (VirtualBox is free). The 'OSCP-like' boxes (search for 'OSCP-like' in the description filter) are vetted to prepare you for the OSCP exam. No leaderboard, no scoring · pure practice on isolated machines you control.",
    order: 8,
  },
  {
    name: "Hack The Box · Starting Point",
    url: "https://app.hackthebox.com/starting-point",
    cost: "Free with HTB account",
    level: "Bridge from TryHackMe to HTB",
    body: "Three tiers of guided machines that bridge the gap from TryHackMe's hand-holding to HackTheBox's silence. If you finish TryHackMe's Junior Penetration Tester path and feel under-prepared for HTB's main free machines, do Starting Point first.",
    order: 9,
  },
  {
    name: "OWASP WebGoat / Juice Shop",
    url: "https://owasp.org/www-project-juice-shop/",
    cost: "100% FREE · self-hosted",
    level: "Beginner web",
    body: "OWASP-maintained vulnerable applications you run locally. Juice Shop in particular is excellent — modern JavaScript SPA with every OWASP Top 10 vuln intentionally present, plus a scoreboard. Run with Docker in one command. Self-paced, self-hosted, well-documented.",
    order: 10,
  },
];

const ORDER = [
  {
    when: "Month 1",
    do: "TryHackMe Pre-Security path · OverTheWire Bandit Levels 0-15 · install Kali in VirtualBox · set up your public profile.",
  },
  {
    when: "Month 2-3",
    do: "TryHackMe Cyber Security 101 · OverTheWire Bandit through Level 34 · start PortSwigger Web Security Academy Apprentice tier.",
  },
  {
    when: "Month 4-6",
    do: "TryHackMe Junior Penetration Tester path · PortSwigger Practitioner labs · Hack The Box Starting Point Tier 1-3 · PicoCTF challenges in your weakest category.",
  },
  {
    when: "Month 6-12",
    do: "HackTheBox main machines (aim for 5-10 boxes/month) · start OSCP prep formally (PWK course + lab) · sit Security+ if going federal · start writing public write-ups.",
  },
  {
    when: "Month 12-18",
    do: "Pass OSCP. Apply to junior pentester roles or in-house security engineer roles. Sit Bugcrowd / HackerOne first paid finding. Decide specialization for stage 03.",
  },
];

export const metadata: Metadata = {
  title: "Free practice labs · /learn/cyber · AtomEons",
  description:
    "Ten vetted free + freemium platforms where you legally practice ethical hacking. TryHackMe, HackTheBox, PortSwigger Web Security Academy, OverTheWire, PicoCTF, CyberDefenders, Root-Me, VulnHub, HTB Starting Point, OWASP Juice Shop. With recommended order. Public info only. CC-BY 4.0.",
  alternates: { canonical: "https://atomeons.com/learn/cyber/labs" },
};

export default function CyberLabsPage() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <CyberHeroImage slug="labs" alt={"Overhead photograph of a dark workbench with a black keyboard, closed laptop, and coiled cable arranged on dark concrete."} />
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn/cyber" className="hover:text-[#22F0D5]">Cyber</Link>{" "}
          <span className="text-[#1A2225]">/</span> Labs
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-14 md:py-20">
          <h1 className="mt-6 text-balance text-4xl font-medium leading-[1] tracking-tight md:text-6xl">
            Where to hack{" "}
            <span className="text-[#22F0D5]">legally and for free.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-base leading-[1.75] text-[#C8CCCE] md:text-[17px]">
            Every platform below exists to be broken. The boxes are vulnerable on purpose. The
            challenges are designed for you. You are authorized to attack them. This is the
            entire universe of where a self-taught ethical hacker actually learns the craft.
          </p>
          <p className="mt-5 max-w-3xl text-base leading-[1.75] text-[#FFB87A]">
            <strong>One rule:</strong> the authorization stops at the platform&apos;s scope. The
            box on TryHackMe is fair game. Your neighbor&apos;s router is not. The fact that you
            CAN scan something does not mean you SHOULD or that you&apos;re legally allowed to.
            See{" "}
            <Link href="/learn/cyber/legal" className="underline decoration-[#FFB87A]/40 underline-offset-4 hover:decoration-[#FFB87A]">
              /learn/cyber/legal
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="border-b border-[#1A2225] bg-[#08090B]/15">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20 space-y-5">
          {PLATFORMS.map((p) => (
            <article key={p.name} className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 md:p-7">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h2 className="text-2xl font-semibold tracking-tight text-[#F2F4F5] md:text-3xl">{p.order}. {p.name}</h2>
                <a href={p.url} target="_blank" rel="noopener" className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#22F0D5] hover:text-white">
                  visit ↗
                </a>
              </div>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#9BA5A7]">
                {p.cost} · {p.level}
              </p>
              <p className="mt-4 text-base leading-[1.7] text-[#C8CCCE]">{p.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-14 md:py-20">
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            If you start tonight, here&apos;s the sequence.
          </h2>
          <div className="mt-8 space-y-4">
            {ORDER.map((o, i) => (
              <div key={i} className="rounded-xl border border-[#1A2225] bg-[#0A0F11] p-5">
                <p className="mt-2 text-base leading-[1.7] text-[#C8CCCE]">{o.do}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm leading-[1.7] text-[#9BA5A7]">
            Total cost to follow this sequence end-to-end: roughly $0-$200 of platform fees if
            you stay on free tiers + Security+ ($370 exam, optional) + OSCP ($1,749 lab + exam
            bundle, the only big spend). Possible to do this entire 18 months for under $200 if
            you skip the optional certs and stay on free platforms.
          </p>
        </div>
      </section>

      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/learn/cyber/legal" className="rounded-full border border-[#FFB87A]/40 bg-[#FFB87A]/10 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#FFB87A] hover:bg-[#FFB87A]/20">
              legal page →
            </Link>
            <Link href="/learn/cyber/hackerone" className="rounded-full border border-[#22F0D5]/40 bg-[#22F0D5]/10 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5] hover:bg-[#22F0D5]/20">
              start bug bounty →
            </Link>
            <Link href="/learn/cyber" className="rounded-full border border-[#1A2225] bg-[#0A0F11] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#C8CCCE] hover:border-[#22F0D5]/40 hover:text-[#22F0D5]">
              ← cyber index
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
