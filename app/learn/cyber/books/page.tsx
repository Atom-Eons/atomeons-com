import type { Metadata } from "next";
import Link from "next/link";
import { CyberHeroImage } from "../_components/CyberHeroImage";

/**
 * /learn/cyber/books — the definitive cyber reading list.
 *
 * Twenty-four books across history, technical depth, blue team, red team,
 * malware analysis, cryptography, policy, journalism. Every title is
 * widely cited as canonical in cyber education syllabi + job-interview
 * prep + book recommendations from named researchers.
 */

export const metadata: Metadata = {
  title: "The definitive cyber reading list · 24 books · /learn/cyber/books · AtomEons",
  description:
    "The Cuckoo's Egg, Sandworm, Countdown to Zero Day, Cult of the Dead Cow, Applied Cryptography, Practical Malware Analysis, The Web Application Hacker's Handbook, Phoenix Project, Spam Nation, Tribe of Hackers, This Is How They Tell Me the World Ends. The cyber-education canon.",
  alternates: { canonical: "https://atomeons.com/learn/cyber/books" },
  openGraph: {
    title: "The definitive cyber reading list · 24 books",
    description: "The canon of cybersecurity. Twenty-four books worth your time.",
    url: "https://atomeons.com/learn/cyber/books",
    type: "article",
  },
  robots: { index: true, follow: true },
};

const ACCENT = "#22F0D5";

const CATEGORIES = [
  {
    name: "History + journalism",
    books: [
      { title: "The Cuckoo's Egg", author: "Cliff Stoll", year: "1989", why: "An astronomer at Lawrence Berkeley Lab tracks a hacker selling US military data to the KGB. Reads like a detective novel and is true. The book that turned a generation of researchers into cyber-detectives." },
      { title: "Sandworm", author: "Andy Greenberg", year: "2019", why: "Definitive account of Russia's GRU Sandworm unit (Ukraine power grid, NotPetya). Greenberg's reporting at Wired is the public canon for nation-state offensive cyber." },
      { title: "Countdown to Zero Day", author: "Kim Zetter", year: "2014", why: "Definitive account of Stuxnet. Zetter spent years on this; every cyber-policy person cites it." },
      { title: "Cult of the Dead Cow", author: "Joseph Menn", year: "2019", why: "History of L0pht, cDc, the 90s hacker collectives that became the policy backbone of modern security." },
      { title: "This Is How They Tell Me the World Ends", author: "Nicole Perlroth", year: "2021", why: "Former NYT cyber reporter on the zero-day vulnerability market. Best journalism on the offensive economy in print." },
      { title: "Spam Nation", author: "Brian Krebs", year: "2014", why: "Krebs documents the rise of Russian-speaking cybercrime economy. Eastern European underground 101." },
    ],
  },
  {
    name: "Technical depth · cryptography + systems",
    books: [
      { title: "Applied Cryptography", author: "Bruce Schneier", year: "1996", why: "The book that introduced a generation to crypto. Still required reading in many CS programs. Schneier's writing makes math accessible without becoming sloppy." },
      { title: "Serious Cryptography", author: "Jean-Philippe Aumasson", year: "2017", why: "Modern crypto handbook. AES, RSA, elliptic curves, post-quantum. Tighter and more current than Schneier's foundational text." },
      { title: "Security Engineering", author: "Ross Anderson", year: "2008 / 2020 (3rd ed)", why: "Cambridge professor's comprehensive textbook. Free PDF on his website. Covers everything from threat modeling to specific system case studies. Foundational." },
      { title: "Hacking: The Art of Exploitation", author: "Jon Erickson", year: "2008 (2nd ed)", why: "C, assembly, debugging, buffer overflows — Erickson teaches the underlying systems-level mechanics. Includes a live-Linux CD with the practice environment." },
    ],
  },
  {
    name: "Red team · pentesting + offensive",
    books: [
      { title: "The Web Application Hacker's Handbook", author: "Dafydd Stuttard + Marcus Pinto", year: "2011 (2nd ed)", why: "Written by the creators of Burp Suite. Required reading for OSCP, OSWE, and every AppSec interview. Slightly dated on specifics — supplement with PortSwigger Web Security Academy." },
      { title: "The Hacker Playbook 3", author: "Peter Kim", year: "2018", why: "Practical penetration-testing methodology. Closer to a working playbook than a textbook. Useful for OSCP prep + early pentest careers." },
      { title: "Red Team Field Manual", author: "Ben Clark", year: "2014", why: "Pocket-reference of commands + syntax. Quick lookups during engagement work. Companion: Blue Team Field Manual." },
      { title: "Penetration Testing: A Hands-On Introduction", author: "Georgia Weidman", year: "2014", why: "Methodical step-through for the absolute beginner. Pairs well with TryHackMe's intro paths." },
    ],
  },
  {
    name: "Blue team · IR + detection",
    books: [
      { title: "Practical Malware Analysis", author: "Michael Sikorski + Andrew Honig", year: "2012", why: "Definitive book on static + dynamic malware analysis. Used in every undergraduate reverse-engineering course. Pair with the labs that ship with the book." },
      { title: "The Art of Memory Forensics", author: "Michael Hale Ligh + Andrew Case + Jamie Levy + Aaron Walters", year: "2014", why: "The Volatility team's textbook. Memory forensics for IR, malware analysis, threat hunting. Required for the GREM cert pipeline." },
      { title: "Network Security Monitoring", author: "Richard Bejtlich", year: "2013", why: "Bejtlich's NSM doctrine remains canonical for blue-team detection engineering. Read before deploying Zeek/Suricata in production." },
      { title: "Intelligence-Driven Incident Response", author: "Scott Roberts + Rebekah Brown", year: "2017 (2nd ed 2023)", why: "The CTI + IR integration playbook. Lockheed-Martin Kill Chain + Diamond Model + ATT&CK woven into operational doctrine." },
    ],
  },
  {
    name: "Web + AppSec",
    books: [
      { title: "Real-World Bug Hunting", author: "Peter Yaworski", year: "2019", why: "Tour of disclosed HackerOne bug bounty findings categorized by vulnerability class. Real reports + how they were found." },
      { title: "Bug Bounty Bootcamp", author: "Vickie Li", year: "2021", why: "Methodology + recon + write-up advice for bug bounty hunters. Pairs with hands-on HackerOne practice." },
    ],
  },
  {
    name: "Career + culture",
    books: [
      { title: "Tribe of Hackers", author: "Marcus J. Carey + Jennifer Jin (eds.)", year: "2019 + Red Team / Blue Team / Leaders editions follow", why: "Long-form interviews with 70+ named cyber researchers. The fastest way to absorb the field's social context + career paths." },
      { title: "Sandworm", author: "Andy Greenberg", year: "2019", why: "(Listed in journalism too — also belongs here for career context: it's the book aspiring nation-state-cyber-defenders read to understand what they'd actually be defending against.)" },
      { title: "Cyber Wars", author: "Charles Arthur", year: "2018", why: "British perspective on major cyber events. Lighter than Sandworm + Countdown but useful for breadth." },
    ],
  },
  {
    name: "Policy + ethics",
    books: [
      { title: "The Perfect Weapon", author: "David E. Sanger", year: "2018", why: "Sanger is NYT national-security reporter who broke Stuxnet attribution. Definitive on US cyber strategy. Pairs with This Is How They Tell Me the World Ends." },
      { title: "Click Here to Kill Everybody", author: "Bruce Schneier", year: "2018", why: "Schneier on IoT security + policy. Anticipates the critical-infrastructure-as-cyber-target era. Reads like prophecy in 2026 retrospect." },
      { title: "A Hacker's Mind", author: "Bruce Schneier", year: "2023", why: "Schneier reframes 'hacking' as a general framework for finding system loopholes — applies cyber methodology to law, finance, politics. Brilliant + uncomfortable." },
    ],
  },
];

export default function CyberBooksPage() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <CyberHeroImage slug="certs" alt="Macro still-life of a small stack of black hardcover books edge-on with a thin cyan bookmark." />
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[11px] tracking-[0.08em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn/cyber" className="hover:text-[#22F0D5]">Cyber</Link>{" "}
          <span className="text-[#1A2225]">/</span> Books
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            The definitive reading list
          </p>
          <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl md:leading-[1]">
            Twenty-four books that{" "}
            <span style={{ color: ACCENT }}>made the field.</span>
          </h1>
          <p className="mt-8 max-w-[62ch] text-base leading-[1.7] text-[#C8CCCE] md:text-[17px]">
            Every title here is on a serious cyber program&apos;s reading list, in a senior researcher&apos;s recommended-books shelf, or both. Across seven categories: history + journalism, cryptography + systems, red team, blue team, web + AppSec, career + culture, policy + ethics. Read three. Pick the one closest to where you want to work.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24 space-y-14">
          {CATEGORIES.map((cat, ci) => (
            <div key={cat.name}>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
                ::category {String(ci + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
                {cat.name}
              </h2>
              <ol className="mt-8 space-y-6">
                {cat.books.map((b, i) => (
                  <li key={b.title} className="grid grid-cols-[2rem_1fr] gap-4">
                    <span className="font-mono text-[14px] tabular-nums" style={{ color: ACCENT }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="text-[17px] font-medium text-[#F2F4F5]">
                        {b.title}
                      </p>
                      <p className="mt-1 text-[13px] text-[#9BA5A7]">
                        <span className="text-[#22F0D5]">{b.author}</span> · {b.year}
                      </p>
                      <p className="mt-3 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">{b.why}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-[#1A2225] bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 text-center">
          <h2 className="text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
            Three books, one summer.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-[1.65] text-[#C8CCCE]">
            The honest cyber-education move at 18-22: pick three books from this list (one history, one technical, one career), read them properly, then come back and pick three more. Beats 90% of online video courses for foundational understanding, and the social-context fluency you get from these named authors makes every interview and conference conversation downstream easier.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link href="/learn/cyber/heroes" className="inline-flex items-center gap-2 rounded-full bg-[#22F0D5] px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-[#1AD4BD]">
              Twelve researcher profiles →
            </Link>
            <Link href="/learn/cyber/timeline" className="inline-flex items-center gap-2 rounded-full border border-[#22F0D5]/40 px-5 py-2.5 text-sm font-medium text-[#22F0D5] transition-colors hover:bg-[#22F0D5]/10">
              The 60-year timeline →
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
