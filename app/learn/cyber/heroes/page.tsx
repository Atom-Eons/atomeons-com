import type { Metadata } from "next";
import Link from "next/link";
import { CyberHeroImage } from "../_components/CyberHeroImage";

/**
 * /learn/cyber/heroes — twelve named researchers worth knowing about.
 *
 * Public-figure profiles only — each individual has a substantial public
 * record (conference talks, published books, government testimony,
 * journalism). Sourced to each person's own public work and reputable
 * reporting on it.
 *
 * Goal: humanize the field. A junior cyber pro who knows zero names
 * doesn't have the field's social context. These twelve names appear
 * in every serious cyber conference, book, and policy debate.
 */

export const metadata: Metadata = {
  title: "Twelve cyber researchers worth knowing about · /learn/cyber/heroes · AtomEons",
  description:
    "Brian Krebs, Marcus Hutchins, Mudge (Peiter Zatko), Katie Moussouris, Bruce Schneier, Halvar Flake, Tavis Ormandy, Costin Raiu, Eva Galperin, Mikko Hyppönen, Window Snyder, Parisa Tabriz. The named voices the cyber field listens to.",
  alternates: { canonical: "https://atomeons.com/learn/cyber/heroes" },
  openGraph: {
    title: "Twelve cyber researchers worth knowing about",
    description: "Named voices the field listens to. Public-figure profiles, sourced.",
    url: "https://atomeons.com/learn/cyber/heroes",
    type: "article",
  },
  robots: { index: true, follow: true },
};

const ACCENT = "#22F0D5";

const HEROES = [
  {
    name: "Brian Krebs",
    role: "Independent investigative cyber journalist · krebsonsecurity.com",
    cred: "Former Washington Post · single-most-cited individual reporter on US cybercrime for 15+ years. His reporting broke Target 2013, exposed BriansClub, identified named ransomware operators ahead of US government action.",
    voice: "Methodical, source-rich, often weeks ahead of vendor disclosure. Reads like a detective novel that happens to be true.",
    where: "krebsonsecurity.com (free) · 'Spam Nation' (2014) book",
  },
  {
    name: "Marcus Hutchins (MalwareTech)",
    role: "British security researcher · WannaCry kill-switch finder",
    cred: "Discovered and triggered the WannaCry kill switch May 12, 2017, stopping the worst ransomware outbreak in history. Later arrested by FBI for unrelated 2014-2015 malware development; pleaded guilty 2019; served time supervised release, full pardon process complete by 2021.",
    voice: "Cautionary tale + redemption. His reverse-engineering writeups on his blog remain canonical educational material for the field.",
    where: "malwaretech.com (blog) · multiple BBC + Wired profiles · his own writing on the arrest experience",
  },
  {
    name: "Peiter 'Mudge' Zatko",
    role: "Hacker turned policy figure · former DARPA + Stripe + Twitter security",
    cred: "L0pht Heavy Industries founder. Testified before Congress 1998 (the famous 'we could take down the internet in 30 minutes'). DARPA Cyber Fast Track program lead 2010-2013. Twitter whistleblower 2022 — his disclosures shaped Senate hearings on platform security.",
    voice: "Generational. Speaks both to engineers and to senators. The bridge between L0pht-era hacker culture and modern cyber-policy formation.",
    where: "Congressional testimony (1998, 2022) · DEF CON archives · multiple longform interviews",
  },
  {
    name: "Katie Moussouris",
    role: "Bug bounty pioneer · Luta Security founder",
    cred: "Designed and launched Microsoft's first bug bounty program (2013) and the Pentagon's Hack the Pentagon program (2016) — both became templates copied across industry and government. CEO of Luta Security.",
    voice: "Constructive critic of the bug-bounty industry. Has been notably honest about platform misincentives. Frequent congressional witness on coordinated vulnerability disclosure.",
    where: "lutasecurity.com · TED talks · Senate testimony",
  },
  {
    name: "Bruce Schneier",
    role: "Cryptographer + security policy public intellectual",
    cred: "Cryptographer (Twofish, Blowfish). Author of foundational security books (Applied Cryptography, Secrets and Lies, Data and Goliath, A Hacker's Mind). Harvard Berkman Klein Center fellow. The most-cited public-facing cryptography figure.",
    voice: "Calm, longform, system-level. Bridges cryptography to policy to society. His Crypto-Gram newsletter has run since 1998.",
    where: "schneier.com · multiple books · MIT/Harvard appointments",
  },
  {
    name: "Halvar Flake (Thomas Dullien)",
    role: "Reverse engineer · founder of zynamics (acquired by Google) · former Google Project Zero",
    cred: "Pioneered automated binary diffing (BinDiff). DEF CON / Black Hat keynote multiple years. His talks on the economic structure of the security industry are required watching for anyone going into the field.",
    voice: "Methodical, rigorous, willing to say uncomfortable things about the industry's incentives. The reverse-engineer's reverse-engineer.",
    where: "addxorrol.blogspot.com · DEF CON / Black Hat archives · zynamics history",
  },
  {
    name: "Tavis Ormandy",
    role: "Google Project Zero · vulnerability researcher",
    cred: "Most prolific public vulnerability discoverer of the 2010s-2020s. Discovered remote-code-execution bugs in essentially every major piece of consumer security software (Symantec, McAfee, Kaspersky, Sophos, Trend Micro, Microsoft Defender) plus password managers (LastPass, 1Password) plus core OS components.",
    voice: "Sharp, often funny, refuses to soften findings to spare vendor ego. Embodies Project Zero's '90-day or we publish' culture.",
    where: "lock.cmpxchg8b.com · Twitter/Mastodon · Google Project Zero blog",
  },
  {
    name: "Costin Raiu",
    role: "Former Kaspersky GReAT lead researcher · independent since 2023",
    cred: "Led Kaspersky's Global Research and Analysis Team. Directly involved in the discovery and analysis of Stuxnet, Flame, Equation Group, Lazarus campaigns. One of the few researchers with deep first-hand knowledge of the most consequential nation-state malware.",
    voice: "Quietly authoritative. His Twitter remains one of the highest-signal threat-intel feeds.",
    where: "Kaspersky GReAT archive · SAS conference talks · ongoing public commentary",
  },
  {
    name: "Eva Galperin",
    role: "EFF Director of Cybersecurity · stalkerware advocacy",
    cred: "Founded the Coalition Against Stalkerware (2019). Decades of work on cybersecurity for civil-society targets — journalists, activists, domestic-abuse survivors. The most consistent public voice on the human cost of unaddressed cybersecurity gaps.",
    voice: "Compassionate, urgent, unapologetic about whose security matters. Bridges technical research to advocacy.",
    where: "eff.org · multiple longform profiles · DEF CON talks",
  },
  {
    name: "Mikko Hyppönen",
    role: "Chief Research Officer · WithSecure (formerly F-Secure)",
    cred: "Tracked computer malware since 1991. Notably tracked down and helped prosecute the authors of the Brain virus (1986, the first PC virus). TED talks reach 8M+ views. Author of 'If It's Smart, It's Vulnerable' (2022).",
    voice: "Historical perspective + future warning combined. Talks about cybersecurity as if explaining it to your grandparents — and that's the strength.",
    where: "mikko.com · TED talks · F-Secure/WithSecure publications",
  },
  {
    name: "Window Snyder",
    role: "Security executive · former Apple + Mozilla + Microsoft · current ThistleTech CEO",
    cred: "Led security at Mozilla during the rise of Firefox (2007-2008). Apple security executive 2010-2017. Microsoft Trustworthy Computing initiative early lead. Founded Thistle Technologies (IoT security) 2019. Trusted voice across multiple eras of the field.",
    voice: "Practitioner-leader. Bridges engineering depth to executive decision-making. One of the most-quoted female voices in mainstream cyber coverage.",
    where: "Multiple Wired + NYT profiles · ThistleTech publications",
  },
  {
    name: "Parisa Tabriz",
    role: "Google VP / Chrome security · 'Security Princess'",
    cred: "Led Google Chrome's security team for 15+ years. Drove industry-wide TLS adoption (HTTPS Everywhere → HTTPS by default). Multiple Black Hat / RSA keynotes. One of the most influential web-security practitioners alive.",
    voice: "Practical, builder-focused, allergic to security theater. Her career is the case for 'security is product engineering, not a separate function.'",
    where: "Multiple Wired + Forbes + Fortune profiles · Black Hat keynote archives",
  },
];

export default function CyberHeroesPage() {
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
          <span className="text-[#1A2225]">/</span> Heroes
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            Twelve researchers worth knowing about
          </p>
          <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl md:leading-[1]">
            The named voices{" "}
            <span style={{ color: ACCENT }}>the field listens to.</span>
          </h1>
          <p className="mt-8 max-w-[62ch] text-base leading-[1.7] text-[#C8CCCE] md:text-[17px]">
            A junior cyber pro who knows zero names doesn&apos;t have the field&apos;s social context. These twelve appear in every serious cyber conference, every policy debate, every textbook reference list. Each profile is sourced to public material — books, congressional testimony, conference talks, reputable journalism.
          </p>
          <p className="mt-5 max-w-[62ch] text-sm leading-[1.6] text-[#9BA5A7]">
            Public-figure profiles only. Public work, public statements, public record. No private speculation. The list is not exhaustive — a hundred more names deserve their own page. These twelve are the ones a junior researcher should know on day one.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24 space-y-12">
          {HEROES.map((h, i) => (
            <article key={h.name} className="border-l-2 pl-6" style={{ borderColor: ACCENT + "30" }}>
              <p className="font-mono text-[14px] tabular-nums" style={{ color: ACCENT }}>
                {String(i + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-3 text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
                {h.name}
              </h2>
              <p className="mt-2 text-sm leading-[1.6] text-[#FFB87A]">{h.role}</p>
              <p className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">{h.cred}</p>
              <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.65] text-[#9BA5A7]">
                <span className="text-[#22F0D5]">Voice: </span>{h.voice}
              </p>
              <p className="mt-3 max-w-[62ch] font-mono text-[11px] text-[#9BA5A7]">
                Where to follow: {h.where}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-[#1A2225] bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 text-center">
          <h2 className="text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
            The field is small.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-[1.65] text-[#C8CCCE]">
            Cyber is a small enough field that following ten or twelve people on Twitter/Mastodon and reading their blogs puts you in the conversation. None of these twelve are gatekept. They&apos;ve all published openly for years. Read what they write.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link href="/learn/cyber/conferences" className="inline-flex items-center gap-2 rounded-full border border-[#22F0D5]/40 px-5 py-2.5 text-sm font-medium text-[#22F0D5] transition-colors hover:bg-[#22F0D5]/10">
              The conferences they speak at →
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
