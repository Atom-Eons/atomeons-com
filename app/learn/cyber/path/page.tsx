import type { Metadata } from "next";
import Link from "next/link";
import { CyberHeroImage } from "../_components/CyberHeroImage";

const STAGES = [
  {
    n: "00",
    label: "Curious gamer",
    duration: "Weeks",
    color: "#22F0D5",
    what: "You read this page and decide to try one TryHackMe room this weekend. You install a VM (VirtualBox, free), spin up Kali Linux (free), and finish the 'Introduction to Cyber Security' learning path. Zero money spent. Zero certifications. You learn that the field has a posture you can recognize.",
    skills: [
      "Linux command line basics (cd, ls, grep, ssh, cat, less, nano)",
      "TCP/IP fundamentals — what an IP address is, what a port is, what HTTP is",
      "Reading a CVE entry and understanding what it describes",
      "Hex / binary / base64 conversion in your head for short strings",
    ],
    prove: "Finished TryHackMe's 'Introduction to Cyber Security' learning path + the 'Pre-Security' path. Public profile visible.",
    salary: "None yet",
    hours: "20-40 hours total",
  },
  {
    n: "01",
    label: "Beginner",
    duration: "3-6 months",
    color: "#22F0D5",
    what: "You finish TryHackMe's 'Junior Penetration Tester' learning path. You read 'The Web Application Hacker's Handbook' (2nd ed, Stuttard + Pinto) and you do every PortSwigger Web Security Academy lab in the Apprentice tier. You understand the OWASP Top 10 in the same way you understand the rules of your favorite game.",
    skills: [
      "Burp Suite (free Community edition) for intercepting web traffic",
      "Basic Python scripting (read + modify + write small scripts)",
      "Common vuln classes: XSS, SQLi, IDOR, CSRF, SSRF — what each is and why it works",
      "Active Directory basics (if you're going corporate)",
      "Subnetting · ports · protocols at the level a junior SOC analyst knows",
    ],
    prove: "Top 5% on TryHackMe leaderboard. Five-plus rooms completed at Medium or Hard. CompTIA Security+ passed (~$370 exam fee, the federal-friendly entry cert).",
    salary: "Entry SOC analyst $50-75K · helpdesk-to-cyber pivot",
    hours: "300-500 hours total",
  },
  {
    n: "02",
    label: "Practitioner",
    duration: "6-12 months",
    color: "#FFB87A",
    what: "You pass the OSCP (Offensive Security Certified Professional) exam. This is the most respected entry-tier offensive credential in the world as of 2026. The exam is 24 hours of live hacking against five machines + a 24-hour report write-up. You can't fake it. People who pass OSCP get interviews at every penetration testing firm.",
    skills: [
      "Active Directory exploitation paths (Kerberoasting, AS-REP roast, ACL abuse) — taught in OSCP curriculum",
      "Bash / PowerShell scripting at intermediate level",
      "Privilege escalation Linux + Windows · using only LinPEAS / WinPEAS + manual enum",
      "Buffer overflow basics (still in some OSCP variants, increasingly in OSED)",
      "Report writing for a non-technical executive reader",
    ],
    prove: "OSCP passed. HackTheBox 'Pro Hacker' rank or higher. First HackerOne or Bugcrowd valid finding submitted (any severity).",
    salary: "Junior pentester $75-110K · in-house security engineer $90-140K",
    hours: "800-1500 hours total",
  },
  {
    n: "03",
    label: "Specialist",
    duration: "1-3 years post-OSCP",
    color: "#FFB87A",
    what: "You specialize. The field bifurcates into deep tracks: web application security, internal network / Active Directory pentest, red team operator, application security engineer (defending instead of attacking), reverse engineer / malware analyst, cloud security (AWS / Azure / GCP), AI security. You pick one and earn a serious credential in it. You ship your first public CVE under your name.",
    skills: [
      "Domain-deep expertise in one track (e.g., for web: HTTP/2 smuggling, SSRF deep dives, race conditions, OAuth flow attacks)",
      "Tool development · you build your own. Even if it's just glue scripts that automate triage.",
      "Conference talk submission ready (DEF CON, Black Hat, BSides, regional cons)",
      "Public footprint — Twitter/X technical posts, blog, GitHub with security tooling",
      "Mentor stage 0-1 candidates · the act of teaching is the senior-level competence check",
    ],
    prove: "OSEP, OSEE, OSED, GPEN, GWAPT, GCFR, or equivalent advanced cert. Public CVE credit. Conference talk accepted (any tier). Five-figure HackerOne / Bugcrowd career earnings.",
    salary: "Senior pentester $130-200K · staff security engineer $180-280K · red team operator $150-230K · bug bounty solo $50-400K (highly variable)",
    hours: "Cumulative 2500-4500 hours",
  },
  {
    n: "04",
    label: "Pro",
    duration: "3-7 years from start",
    color: "#FF7A1A",
    what: "You hold a senior or principal role at a real security org. Or you run a successful bug bounty solo career. Or you're a federal cyber operator with a clearance. You shape strategy, not just tickets. You hire and grow other practitioners. The work is half technical and half judgment — picking the right engagement to take on, knowing when a finding is real and when it's a false positive, knowing when to escalate to leadership vs handle quietly.",
    skills: [
      "Threat modeling at the system level (STRIDE, attack trees, kill chains, ATT&CK mapping)",
      "Pre-sales / scope-writing for engagements (consulting track) OR program management (in-house track)",
      "Mentoring junior-mid practitioners formally",
      "Speaking at industry conferences as a known voice",
      "Publishing research that the field actually reads",
    ],
    prove: "Principal / staff / senior title. Or independent contractor charging $300-650/hr. Or GS-13/14 federal / O-3 commissioned officer in cyber-coded billet. Or top-50 HackerOne hacker by lifetime earnings.",
    salary: "Principal AppSec $220-380K total comp · CISO at small-mid co $250-500K · top bounty hunter $300K-$1M+",
    hours: "Cumulative 6000-10000 hours",
  },
  {
    n: "05",
    label: "Lead",
    duration: "7+ years",
    color: "#FF7A1A",
    what: "You set direction for a security organization, a practice, or a research agenda. Director / VP of security at a real company. Federal Senior Executive Service or O-5+ in military. Boutique-firm partner. Researcher who shifts the field. This is rare, takes a decade, and is not for everyone. Not everyone wants this · being a senior IC is fine and pays well.",
    skills: [
      "Org-design for security teams",
      "Board / C-suite reporting · translating technical risk into financial risk",
      "Hiring + retention at scale",
      "Public-facing voice — interviews, congressional testimony, vendor relations",
    ],
    prove: "VP Security, CISO, SES, O-5+, full partner. Industry-shifting research published.",
    salary: "CISO $400K-$1.5M+ total comp at scale · partner equity stake in firm · SES $200K + benefits",
    hours: "10000+ hours",
  },
];

export const metadata: Metadata = {
  title: "The ethical hacking career path · 6 stages · /learn/cyber · AtomEons",
  description:
    "Six stages from curious gamer to senior cyber practitioner. Honest milestones, real durations, real salary bands, real certifications. OSCP, OSEP, HackerOne, federal clearance paths. Public-record sources only. CC-BY 4.0.",
  alternates: { canonical: "https://atomeons.com/learn/cyber/path" },
};

export default function CyberPathPage() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <CyberHeroImage slug="path" alt={"Long exposure of a single thin cyan light-trail rising along a black slate staircase that recedes into fog."} />
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn/cyber" className="hover:text-[#22F0D5]">Cyber</Link>{" "}
          <span className="text-[#1A2225]">/</span> The path
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-14 md:py-20">
          <h1 className="mt-6 text-balance text-4xl font-medium leading-[1] tracking-tight md:text-6xl">
            From curious gamer to{" "}
            <span className="text-[#22F0D5]">senior cyber operator.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-base leading-[1.75] text-[#C8CCCE] md:text-[17px]">
            Six honest stages. The duration ranges are real · faster than the slow end is rare,
            slower than the fast end is normal. Salary bands are from public 2024-2026 data
            (Levels.fyi, Pave, salary.com, federal pay tables). Certifications are real. The
            proof bar at each stage is observable — you either hit it or you didn&apos;t.
          </p>
        </div>
      </section>

      <section className="border-b border-[#1A2225] bg-[#0e2520]/15">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20 space-y-8">
          {STAGES.map((s) => (
            <article
              key={s.n}
              className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-7 md:p-10"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <p className="font-mono text-3xl font-bold tabular-nums" style={{ color: s.color }}>
                  {s.n}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#9BA5A7]">
                  duration · {s.duration}
                </p>
              </div>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl" style={{ color: s.color }}>
                {s.label}
              </h2>
              <p className="mt-5 text-base leading-[1.75] text-[#C8CCCE] md:text-[17px]">{s.what}</p>

              <div className="mt-7 grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-[#1A2225] bg-[#0E1418] p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: s.color }}>
                    ::skills at this stage
                  </p>
                  <ul className="mt-3 space-y-2 text-sm leading-[1.65] text-[#C8CCCE]">
                    {s.skills.map((sk, i) => (
                      <li key={i} className="flex gap-2">
                        <span style={{ color: s.color }}>·</span>
                        <span>{sk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-[#1A2225] bg-[#0E1418] p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: s.color }}>
                    ::proof of stage
                  </p>
                  <p className="mt-3 text-sm leading-[1.65] text-[#F2F4F5]">{s.prove}</p>
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.28em] text-[#9BA5A7]">
                    ::salary band
                  </p>
                  <p className="mt-2 text-sm leading-[1.65] text-[#C8CCCE]">{s.salary}</p>
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.28em] text-[#9BA5A7]">
                    ::cumulative hours
                  </p>
                  <p className="mt-2 text-sm text-[#C8CCCE]">{s.hours}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-14 md:py-20 space-y-6">
          <h2 className="text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            Where people quit (and how to not).
          </h2>
          <div className="space-y-4 text-base leading-[1.75] text-[#C8CCCE]">
            <p>
              <strong className="text-[#F2F4F5]">Stage 01 → 02 plateau.</strong> The OSCP wall.
              The first 30-50 HackTheBox boxes are humbling. People who quit here read about
              hacking instead of doing it. The fix: do one box per week, post your write-up
              (sanitized), iterate. The volume IS the skill.
            </p>
            <p>
              <strong className="text-[#F2F4F5]">Stage 02 → 03 plateau.</strong> The
              specialization decision feels final. It isn&apos;t. Most senior practitioners
              re-specialize once or twice over a career. Pick the track that matches what you
              actually enjoy doing on a Tuesday night, not the one that pays most on paper.
              Burnout from the wrong track will end your career faster than a market downturn.
            </p>
            <p>
              <strong className="text-[#F2F4F5]">Stage 03 → 04 plateau.</strong> The technical
              ladder has a ceiling that&apos;s lower than the management ladder, by a lot, at
              most companies. People who want to stay technical without losing salary need to
              join a frontier security org (Mandiant, CrowdStrike, Trail of Bits, Bishop Fox,
              NCC Group, Praetorian, IOActive, frontier model labs&apos; security teams) or go
              independent. Independent is harder than employed; both are real paths.
            </p>
            <p>
              <strong className="text-[#F2F4F5]">Skipping the legal page.</strong> Some otherwise
              talented people end their careers in their early 20s with a federal indictment from
              a Computer Fraud and Abuse Act violation that started as &ldquo;just looking.&rdquo;
              Read{" "}
              <Link href="/learn/cyber/legal" className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-4 hover:decoration-[#22F0D5]">
                /learn/cyber/legal
              </Link>{" "}
              before you do any technical work. Every working professional in this field can
              point to people they knew who didn&apos;t.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/learn/cyber/labs" className="rounded-full border border-[#22F0D5]/40 bg-[#22F0D5]/10 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5] hover:bg-[#22F0D5]/20">
              start the labs →
            </Link>
            <Link href="/learn/cyber/legal" className="rounded-full border border-[#FFB87A]/40 bg-[#FFB87A]/10 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#FFB87A] hover:bg-[#FFB87A]/20">
              read the legal page →
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
