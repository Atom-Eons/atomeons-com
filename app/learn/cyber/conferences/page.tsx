import type { Metadata } from "next";
import Link from "next/link";
import { CyberHeroImage } from "../_components/CyberHeroImage";

/**
 * /learn/cyber/conferences — where the field meets.
 *
 * Every recurring cybersecurity conference a junior pro should know.
 * Concrete next-step: attend one. Most have free streams; many have
 * student rates; BSides events are free or cheap and exist in 100+ cities.
 */

export const metadata: Metadata = {
  title: "Where the cyber field meets · 12 conferences worth knowing · /learn/cyber/conferences · AtomEons",
  description:
    "DEF CON, Black Hat, RSA, BSides, ShmooCon, CCC, SAS, Insomni'hack, Hack-in-the-Box, NULLCON, FIRST, OWASP Global. What each is, when it runs, what tier it represents, how a student or junior pro gets there.",
  alternates: { canonical: "https://atomeons.com/learn/cyber/conferences" },
  openGraph: {
    title: "Where the cyber field meets · 12 conferences",
    description: "DEF CON to BSides. What each is, when it runs, how to get there.",
    url: "https://atomeons.com/learn/cyber/conferences",
    type: "article",
  },
  robots: { index: true, follow: true },
};

const ACCENT = "#22F0D5";

const CONFERENCES = [
  {
    name: "DEF CON",
    when: "August · Las Vegas (Caesars Forum + Flamingo)",
    tier: "The hacker conference",
    body: "The defining cyber conference since 1993. ~30,000 attendees. Talks + villages (Lockpick Village, Car Hacking Village, Aerospace Village, AI Village, ICS Village, etc.) + CTF + workshops. Aggressively practitioner-oriented. Cash-only at the door (~$460 in 2025), no badges in advance — operational-security tradition. Many free-to-watch recordings on YouTube weeks after.",
    student: "Student discount if you're enrolled (limited badges). Many groups offer scholarships — Hak4Kidz, Ladies of London Hacking, DC101 fund underrepresented attendees.",
  },
  {
    name: "Black Hat USA",
    when: "August · Las Vegas (Mandalay Bay) · the week before DEF CON",
    tier: "The corporate/enterprise conference",
    body: "Founded by Jeff Moss (also DEF CON founder). $2,500+ for Briefings access. Higher production value, more enterprise audience, more government attendees. Briefings selection committee is extremely rigorous — a Black Hat USA talk is a major credential. Trainings ($3,000-$7,000) sell out months early.",
    student: "Press + academic discounts exist. Most students attend DEF CON instead.",
  },
  {
    name: "RSA Conference",
    when: "April/May · San Francisco (Moscone Center)",
    tier: "The vendor + executive conference",
    body: "Largest cybersecurity conference by attendance (~40,000+). $2,500+ for full conference pass. Heavily vendor-oriented — the expo floor is the largest cyber-business surface anywhere. Less hacker-culture, more CISO + government. Innovation Sandbox Top-10 startups list is consequential industry signal.",
    student: "Student rate exists but you'll feel out of place — DEF CON is the better entry-point.",
  },
  {
    name: "BSides (anywhere)",
    when: "Year-round · 100+ cities globally",
    tier: "The free + local conference",
    body: "Community-run, mostly-free or low-cost cybersecurity events in 100+ cities. Las Vegas BSides runs concurrent with Black Hat/DEF CON. BSides DC, BSides NYC, BSides SF, BSides Charm (Baltimore), BSides Chicago, BSides Atlanta — every major US city has one. International equivalents in Europe, Australia, Asia. The single best free entry point to the field. Find your nearest at securitybsides.com.",
    student: "Most BSides have student rates of $0-$20. Often the easiest first conference.",
  },
  {
    name: "ShmooCon",
    when: "January · Washington DC",
    tier: "The mid-Atlantic federal-adjacent",
    body: "1,500-person conference run by The Shmoo Group. Highly competitive ticket sale — sells out in seconds. Federal-employee-heavy attendee mix. Talks frequently feature original research. Free recordings published after.",
    student: "Student rate exists. Tickets are the harder problem than money.",
  },
  {
    name: "Chaos Communication Congress (CCC)",
    when: "December · Hamburg, Germany",
    tier: "The European hacker conference",
    body: "Annual gathering of Chaos Computer Club, the German hacker community. Runs over Christmas week. ~17,000 attendees. Strong civil-liberties + cryptography + privacy emphasis. Streams free worldwide. Many of the best public talks on government surveillance + activist technology come from CCC.",
    student: "Ticket pricing typically €120-€140 — the conference itself is one of the most accessible. Apply early.",
  },
  {
    name: "Kaspersky Security Analyst Summit (SAS)",
    when: "Variable · usually spring · varying global locations",
    tier: "The threat-intelligence conference",
    body: "Invite-only or sponsor-purchase for ~500-700 attendees. The premier threat-intelligence + advanced-persistent-threat research conference. Major nation-state actor attribution research often debuts here. Significantly affected by 2022+ Western researcher boycotts after Kaspersky's Russia-government ties became politically untenable.",
    student: "Not student-accessible. Mentioned for completeness.",
  },
  {
    name: "Insomni'hack",
    when: "March · Lausanne, Switzerland",
    tier: "The European hacker + CTF",
    body: "Swiss conference combining briefings with one of the most respected CTFs in Europe. ~1,000-1,500 attendees. Strong European red-team + reverse-engineering presence. CTF qualifications open globally.",
    student: "Workshops accessible to skilled students. CTF is free to register.",
  },
  {
    name: "Hack-in-the-Box (HITB)",
    when: "Variable · Amsterdam, Phuket, Dubai (separate events)",
    tier: "The Asian + European technical conference",
    body: "Founded in Malaysia, now multi-region. Strong reverse-engineering + exploit-development content. Technical depth-over-breadth. Multiple events per year across regions.",
    student: "Student rates exist. Recordings often free post-conference.",
  },
  {
    name: "NULLCON",
    when: "March/September · Goa, India + Berlin",
    tier: "The South Asian hacker conference",
    body: "Founded in Goa in 2010, now also runs Berlin. Strong original-research presence — especially mobile security, ICS, automotive. India's largest cyber conference.",
    student: "Affordable for the region. International attendees pay more but still well below US conference rates.",
  },
  {
    name: "FIRST Conference",
    when: "June · varies (Washington DC, Toronto, etc.)",
    tier: "The incident-response conference",
    body: "Forum of Incident Response and Security Teams. ~600 attendees, by member-organization affiliation. The premier global IR + CSIRT operations conference. Members include national CERTs, major Fortune 500 SOCs, military cyber units.",
    student: "Membership-gated. Apply via your employer's CSIRT if any.",
  },
  {
    name: "OWASP Global AppSec",
    when: "April + October · varying global cities",
    tier: "The web AppSec conference",
    body: "OWASP Foundation's twice-yearly flagship conference. Lisbon, San Francisco, Dublin, Tel Aviv have hosted. ~600-1,000 attendees. The web-AppSec community gathering — strong DAST/SAST/threat-modeling/SDLC content. Pairs with regional OWASP chapter events that run year-round and are usually free.",
    student: "Student rates exist. Local OWASP chapter events are universally free.",
  },
];

const ATTEND_STRATEGY = [
  "Start with BSides in your nearest city. They&apos;re $0-$20, run on Saturdays, and the talks are surprisingly technical. Pair with your local OWASP chapter meetup (also usually free) for regular community contact.",
  "If you can get to one major event, DEF CON is the right one for a junior cyber pro. The villages are the actual education: pick three (Recon, Car Hacking, AI Village, Aerospace, ICS, Lockpicking) and spend a full day in each.",
  "Black Hat USA Briefings are a credential, not an education. If your employer pays, go for the badge. If you&apos;re paying yourself, save for DEF CON.",
  "Submit a talk to a BSides as soon as you have something to present. The barrier is lower than you think, and a BSides talk on your résumé matters for senior interviews.",
  "Watch DEF CON / Black Hat / CCC / OWASP talks on YouTube. Every year publishes the recordings. Three hours a week of conference talks = de facto graduate-level coursework.",
];

export default function CyberConferencesPage() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <CyberHeroImage slug="hackerone" alt="Still-life of a sealed manila envelope on dark slate with a thin cyan ribbon of light crossing the frame." />
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[11px] tracking-[0.08em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn/cyber" className="hover:text-[#22F0D5]">Cyber</Link>{" "}
          <span className="text-[#1A2225]">/</span> Conferences
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            Where the field meets
          </p>
          <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl md:leading-[1]">
            Twelve conferences{" "}
            <span style={{ color: ACCENT }}>worth knowing about.</span>
          </h1>
          <p className="mt-8 max-w-[62ch] text-base leading-[1.7] text-[#C8CCCE] md:text-[17px]">
            Cybersecurity is a small enough field that going to two or three conferences a year puts you in the conversation. Below: what each major recurring conference is, when it runs, what tier it represents, and how a student or junior pro can actually get there.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24 space-y-12">
          {CONFERENCES.map((c, i) => (
            <article key={c.name} className="border-l-2 pl-6" style={{ borderColor: ACCENT + "30" }}>
              <div className="flex flex-wrap items-baseline gap-4">
                <p className="font-mono text-[14px] tabular-nums" style={{ color: ACCENT }}>
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
                  {c.name}
                </h2>
              </div>
              <p className="mt-2 text-sm text-[#FFB87A]">{c.when}</p>
              <p className="mt-1 text-sm text-[#9BA5A7]">{c.tier}</p>
              <p className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE]">{c.body}</p>
              <p className="mt-4 max-w-[62ch] rounded-lg border border-[#22F0D5]/20 bg-[#0e2520]/30 p-4 text-[14px] leading-[1.65] text-[#C8CCCE]">
                <span className="font-medium text-[#22F0D5]">Student / junior pro: </span>{c.student}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-[#1A2225] bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <h2 className="text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            How to actually get there.
          </h2>
          <ol className="mt-10 space-y-5">
            {ATTEND_STRATEGY.map((s, i) => (
              <li key={i} className="grid grid-cols-[2.5rem_1fr] gap-4">
                <span className="font-mono text-2xl font-bold tabular-nums" style={{ color: ACCENT }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-base leading-[1.7] text-[#C8CCCE]" dangerouslySetInnerHTML={{ __html: s }} />
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/learn/cyber/heroes" className="inline-flex items-center gap-2 rounded-full border border-[#22F0D5]/40 px-5 py-2.5 text-sm font-medium text-[#22F0D5] transition-colors hover:bg-[#22F0D5]/10">
              The researchers who speak at these →
            </Link>
            <Link href="/learn/cyber/labs" className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] px-5 py-2.5 text-sm text-[#C8CCCE] transition-colors hover:border-[#22F0D5]/40 hover:text-[#22F0D5]">
              Free labs to practice →
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
