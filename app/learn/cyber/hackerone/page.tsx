import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bug bounty path · HackerOne · /learn/cyber · AtomEons",
  description:
    "How to start ethical bug hunting on HackerOne, Bugcrowd, Intigriti, YesWeHack, Synack Red Team. Real first-finding path. Scope reading. Recon → triage → write-up → payout. The mistakes new hunters make. Public info only. CC-BY 4.0.",
  alternates: { canonical: "https://atomeons.com/learn/cyber/hackerone" },
};

const PLATFORMS = [
  {
    name: "HackerOne",
    url: "https://www.hackerone.com",
    focus: "Largest by program count and bounty pool. Hosts the DoD VDP + many Fortune 500 + frontier model labs. Has 'Hacktivity' (publicly disclosed reports) — best place to learn what a good write-up looks like.",
    start: "Sign up free. Read 50 public reports in your favorite vuln class. Pick a program with broad scope and public engagement. Spend 4 hours reconning before you write a single payload.",
  },
  {
    name: "Bugcrowd",
    url: "https://www.bugcrowd.com",
    focus: "Second-largest. Strong on private invite programs once you build a track record. Bug Bash events (paid live-hacking competitions) for senior researchers.",
    start: "Same as HackerOne. Their educational content (Bugcrowd University, free on YouTube) is excellent on web vulnerability categories.",
  },
  {
    name: "Intigriti",
    url: "https://www.intigriti.com",
    focus: "European-headquartered. Strong roster of EU enterprise programs. Excellent CTF program ('1337up Live'). Often higher signal-to-noise than the US platforms.",
    start: "Free signup. Their public CTF challenges are a low-stakes intro to their platform mechanics.",
  },
  {
    name: "YesWeHack",
    url: "https://www.yeswehack.com",
    focus: "French-headquartered. Strong on EU government + critical-infrastructure programs that aren't on US platforms. Multilingual.",
    start: "Free signup. Read their published Dojo training material first.",
  },
  {
    name: "Synack Red Team",
    url: "https://www.synack.com",
    focus: "Vetted invitation-only researcher pool. Customers pay Synack, Synack pays the researchers. Higher pay per finding, harder to get in (technical interview + background check).",
    start: "After you have 50+ valid findings on HackerOne / Bugcrowd. Not an entry path.",
  },
  {
    name: "Department of Defense VDP",
    url: "https://hackerone.com/deptofdefense",
    focus: "US DoD's public Vulnerability Disclosure Program on HackerOne. Hosted at hackerone.com/deptofdefense. You report bugs in DoD-controlled .mil websites within scope. NO bounties — just public credit + the satisfaction of helping defend US systems.",
    start: "Read the scope. The scope is wider than people think. Submit a real finding. People have used DoD VDP submissions as resume credentials for federal cyber roles.",
  },
];

export default function CyberHackerOnePage() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn/cyber" className="hover:text-[#22F0D5]">Cyber</Link>{" "}
          <span className="text-[#1A2225]">/</span> HackerOne
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-14 md:py-20">
          <h1 className="mt-6 text-balance text-4xl font-medium leading-[1] tracking-tight md:text-6xl">
            Your first paid{" "}
            <span className="text-[#22F0D5]">finding.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-base leading-[1.75] text-[#C8CCCE] md:text-[17px]">
            Bug bounty is the most accessible legal ethical-hacking work in 2026. There&apos;s no
            employer to convince, no clearance to wait for, no degree to verify. You sign up,
            you read scope, you find something real, you write it up well, you get paid. Some
            people make a living from it · most people use it as a credentialing path into
            full-time security roles.
          </p>
          <p className="mt-5 max-w-3xl text-base leading-[1.75] text-[#FFB87A]">
            <strong>The single rule:</strong> read the scope before you touch anything. The
            scope is the authorization. Out-of-scope testing is a CFAA violation regardless of
            how friendly the platform looks. See{" "}
            <Link href="/learn/cyber/legal" className="underline decoration-[#FFB87A]/40 underline-offset-4 hover:decoration-[#FFB87A]">
              /learn/cyber/legal
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="border-b border-[#1A2225] bg-[#0e2520]/15">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20">
          <div className="mt-8 space-y-5">
            {PLATFORMS.map((p) => (
              <article key={p.name} className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 md:p-7">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h2 className="text-2xl font-semibold tracking-tight text-[#F2F4F5]">{p.name}</h2>
                  <a href={p.url} target="_blank" rel="noopener" className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#22F0D5] hover:text-white">
                    visit ↗
                  </a>
                </div>
                <p className="mt-4 text-[15px] leading-[1.7] text-[#C8CCCE]">{p.focus}</p>
                <p className="mt-4 text-[15px] leading-[1.7] text-[#9BA5A7]">
                  <span className="text-[#22F0D5]">::start →</span> {p.start}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20 space-y-10">
          <div>
            <h2 className="text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
              The first-finding playbook
            </h2>
            <ol className="mt-7 space-y-5 text-base leading-[1.75] text-[#C8CCCE]">
              <li className="flex gap-4">
                <span className="font-mono text-2xl font-bold text-[#22F0D5]">01</span>
                <span>
                  <strong className="text-[#F2F4F5]">Pick the right program.</strong> Filter for:
                  large scope (gives you surface area), public engagement (means staff are
                  reading reports), reasonable response time (median &lt; 7 days on HackerOne
                  program pages), bounty range (don&apos;t start on a $10K-only program — start
                  where $100-$500 findings are common). Examples of historically beginner-friendly
                  programs at various times: Shopify, GitLab, Wordpress.org, Mozilla, Internet
                  Bug Bounty, the DoD VDP.
                </span>
              </li>
              <li className="flex gap-4">
                <span className="font-mono text-2xl font-bold text-[#22F0D5]">02</span>
                <span>
                  <strong className="text-[#F2F4F5]">Read the scope document twice.</strong>{" "}
                  Highlight every domain that&apos;s explicitly in. Highlight every exclusion. If
                  the scope says &ldquo;*.example.com EXCEPT example.com/admin&rdquo; — that
                  carve-out is binding. The exclusions are usually the easy way to get banned.
                </span>
              </li>
              <li className="flex gap-4">
                <span className="font-mono text-2xl font-bold text-[#22F0D5]">03</span>
                <span>
                  <strong className="text-[#F2F4F5]">Recon before you exploit.</strong> Most
                  successful first-findings come from researchers who spent 4-12 hours
                  understanding the application surface before touching a single payload.
                  Subdomain enumeration. JS file inspection for endpoint discovery. Read the
                  application&apos;s legitimate API documentation (often public). Find the
                  feature that&apos;s clearly new or recently changed.
                </span>
              </li>
              <li className="flex gap-4">
                <span className="font-mono text-2xl font-bold text-[#22F0D5]">04</span>
                <span>
                  <strong className="text-[#F2F4F5]">Hunt the boring vulns first.</strong> Famous
                  beginner findings: IDORs (insecure direct object reference — changing a userID
                  parameter and seeing someone else&apos;s data), broken access control on
                  admin-flagged routes, business-logic flaws in pricing/coupon/refund flows,
                  open redirects with auth-token leakage, subdomain takeover via abandoned DNS
                  records (acquireForge wrote the canonical post on this). Stay away from
                  reflected XSS as a first finding · they&apos;re duplicates 95% of the time.
                </span>
              </li>
              <li className="flex gap-4">
                <span className="font-mono text-2xl font-bold text-[#22F0D5]">05</span>
                <span>
                  <strong className="text-[#F2F4F5]">Write the report like you&apos;re briefing
                  a tired engineer.</strong> Title states the finding in one sentence. Steps to
                  reproduce in 5-8 numbered steps. Screenshots of the proof (not 40 — three).
                  Impact in plain language. Recommended fix in two sentences. CVSS score
                  optional (most reviewers re-score anyway). The platform-published example
                  reports under &ldquo;Hacktivity&rdquo; on HackerOne are your template. Mimic them.
                </span>
              </li>
              <li className="flex gap-4">
                <span className="font-mono text-2xl font-bold text-[#22F0D5]">06</span>
                <span>
                  <strong className="text-[#F2F4F5]">Wait. Then wait more.</strong> Triage on
                  most programs takes 1-7 days. Resolution + bounty payout takes 2-12 weeks. The
                  patience is the discipline. While you wait, work on the next finding.
                </span>
              </li>
            </ol>
          </div>
        </div>
      </section>

      <section className="border-b border-[#1A2225] bg-[#0e2520]/15">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20 space-y-10">
          <div>
            <h2 className="text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
              The most-common mistakes new hunters make
            </h2>
            <ul className="mt-7 space-y-4 text-base leading-[1.7] text-[#C8CCCE]">
              <li className="flex gap-3"><span className="text-[#FFB87A]">○</span><span><strong className="text-[#F2F4F5]">Out-of-scope testing.</strong> The fastest way to get banned. Read scope, stay inside it.</span></li>
              <li className="flex gap-3"><span className="text-[#FFB87A]">○</span><span><strong className="text-[#F2F4F5]">Automated scanner output dumps.</strong> Nessus, ZAP, sqlmap output pasted into a report is closed as Not Applicable instantly. Triage staff hate it. Manual validation only.</span></li>
              <li className="flex gap-3"><span className="text-[#FFB87A]">○</span><span><strong className="text-[#F2F4F5]">Trivial findings with inflated severity.</strong> &ldquo;Missing security header&rdquo; isn&apos;t High. Open redirect without exploitation chain isn&apos;t Critical. Calibrate your severity claims to actual impact or the triage team will calibrate you down and trust will erode.</span></li>
              <li className="flex gap-3"><span className="text-[#FFB87A]">○</span><span><strong className="text-[#F2F4F5]">Duplicate-chasing.</strong> Reflected XSS in a search bar has been reported 400 times. Don&apos;t. Look at the program&apos;s recently-disclosed reports — patterns repeat. Find what they haven&apos;t found yet.</span></li>
              <li className="flex gap-3"><span className="text-[#FFB87A]">○</span><span><strong className="text-[#F2F4F5]">Disclosure violations.</strong> Most programs require you NOT to disclose the finding publicly until the program approves disclosure (or after a fixed timeline). Posting it on Twitter early is a ban + potentially CFAA exposure.</span></li>
              <li className="flex gap-3"><span className="text-[#FFB87A]">○</span><span><strong className="text-[#F2F4F5]">Argument escalation.</strong> Disagreement with triage about severity happens. Argue politely once. If they hold the line, move on. Programs ban hunters for ugly disputes, even when the hunter was technically right.</span></li>
              <li className="flex gap-3"><span className="text-[#FFB87A]">○</span><span><strong className="text-[#F2F4F5]">Volume chasing.</strong> Twenty low-quality findings beats one good one in your head but not on the platform. Reputation is built on signal-to-noise ratio, not submission count.</span></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20">
          <h2 className="text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            Realistic earning ladders
          </h2>
          <ul className="mt-7 space-y-4 text-base leading-[1.7] text-[#C8CCCE]">
            <li>· <strong className="text-[#F2F4F5]">Year 1, part-time:</strong> $0-$5K total. Mostly Low-Medium findings. Goal is rank + portfolio.</li>
            <li>· <strong className="text-[#F2F4F5]">Year 1-2, part-time:</strong> $5K-$25K/year is typical for someone serious putting in 10-15 hrs/week.</li>
            <li>· <strong className="text-[#F2F4F5]">Year 3+, full-time solo:</strong> $50K-$200K/year is realistic for full-time hunters who&apos;ve specialized. A subset hits $300K+.</li>
            <li>· <strong className="text-[#F2F4F5]">Top tier (Synack invite-only, top 50 globally, private programs):</strong> $300K-$1M+/year. Rare. Visible on HackerOne&apos;s public leaderboard.</li>
          </ul>
          <p className="mt-6 text-sm leading-[1.6] text-[#9BA5A7]">
            Source: HackerOne Hacker-Powered Security Report (annual), Bugcrowd Inside the Mind
            of a Hacker report (annual), self-reported income surveys on Twitter/X by named
            researchers. Top-of-band earnings are highly variable and dependent on specialty,
            timing, and luck. Median bounty hunter earnings remain modest — the platform skews
            heavy-tailed.
          </p>
        </div>
      </section>

      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/learn/cyber/certs" className="rounded-full border border-[#22F0D5]/40 bg-[#22F0D5]/10 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5] hover:bg-[#22F0D5]/20">
              certs page →
            </Link>
            <Link href="/learn/cyber/serve" className="rounded-full border border-[#1A2225] bg-[#0A0F11] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#C8CCCE] hover:border-[#22F0D5]/40 hover:text-[#22F0D5]">
              military + federal →
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
