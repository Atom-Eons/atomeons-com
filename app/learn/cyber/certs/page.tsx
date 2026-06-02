import type { Metadata } from "next";
import Link from "next/link";
import { CyberHeroImage } from "../_components/CyberHeroImage";

const CERTS = [
  { name: "CompTIA Security+", cost: "$370", time: "2-4 months", level: "Entry", body: "The federal-floor cert. DoD 8570 baseline · most federal cyber-coded billets require it or equivalent. Multiple-choice exam, 90 questions, 90 minutes. Worthwhile as the first cert · zero employers will be impressed but many gates require it. Free study material everywhere (Professor Messer YouTube is the canonical free path).", verdict: "Buy it." },
  { name: "Offensive Security Certified Professional (OSCP)", cost: "$1,749 (lab + exam bundle)", time: "3-12 months", level: "Practitioner", body: "The most respected entry-tier offensive cert in the industry. 24-hour live hacking exam against 5 machines + 24-hour report write-up. Passing it really does mean you can do penetration testing. Industry hiring managers actually look for it.", verdict: "Buy it when you're ready. Don't take the exam early." },
  { name: "OSEP / OSED / OSEE", cost: "$1,799 each", time: "6-18 months each", level: "Advanced offensive", body: "Offensive Security's advanced credentials. OSEP (Evasion + Pentesting), OSED (Exploit Development), OSEE (Exploitation Expert). Each one is significantly harder than OSCP. OSEE is widely regarded as the hardest commercial cyber cert in existence (~5% pass rate). Don't pursue until you're a working professional with 2+ years.", verdict: "Sequence-dependent. Take OSCP first." },
  { name: "GIAC Penetration Tester (GPEN)", cost: "$2,499", time: "Depends on SANS course", level: "Practitioner / federal", body: "SANS course-paired cert. Course (SEC560) is $7-8K (employer-funded usually). GIAC certs are highly respected in the federal space — DoD 8140 recognized. Less hands-on than OSCP, more theoretical. Take it if your employer pays.", verdict: "Buy if employer pays. Don't self-fund." },
  { name: "GIAC GREM (Reverse Engineering Malware)", cost: "$2,499", time: "Depends on SANS course", level: "Specialist", body: "Malware reverse engineering. Course (FOR610) is the canonical RE training. Reverse engineering is a specialized track · highly valued at federal labs and at private incident-response firms (Mandiant, CrowdStrike, etc.). Niche but extremely employable.", verdict: "Specialist play." },
  { name: "GIAC GCIH (Incident Handler)", cost: "$2,499", time: "Depends on SANS course", level: "Blue team", body: "Incident response certification. Pairs with SEC504. Standard credential for SOC analysts, incident responders, threat hunters. The blue-team analog of OSCP.", verdict: "Worth it for blue-team careers." },
  { name: "Certified Ethical Hacker (CEH) · EC-Council", cost: "$1,199", time: "1-3 months", level: "Entry (recognition-only)", body: "The most-recognized cert by HR departments and the least-respected by practitioners. Theoretical exam, mostly multiple choice. Passes you through HR keyword filters in some federal-contractor environments. Won't help you actually hack anything. People still pay for it because of the HR filter situation.", verdict: "Buy only if a specific job requires it." },
  { name: "CISSP (ISC2)", cost: "$749", time: "3-9 months", level: "Senior management track", body: "The senior security manager / architect cert. Requires 5 years experience to be 'fully certified' (otherwise 'Associate'). Heavy on policy, governance, risk. NOT a hacking cert. The right cert if you're heading to management, GRC, or security architecture.", verdict: "Right for the management track. Skip if you want to stay technical." },
  { name: "OSWE (Web Expert · OffSec)", cost: "$1,799", time: "3-12 months", level: "Web specialist", body: "Web application exploit development cert. 48-hour live exam. Practical, heavy on white-box source review and exploit chain development. The right specialty cert for web bug bounty hunters and AppSec engineers.", verdict: "Web specialty play." },
  { name: "CompTIA PenTest+", cost: "$404", time: "2-4 months", level: "Entry", body: "Federal-floor pentesting cert. Less respected than OSCP industry-wide but DoD 8570/8140 recognized. Has a useful role for federal cyber-coded billets that don't accept OSCP-only candidates. Multiple choice + performance-based questions.", verdict: "Federal-specific play. Practitioners go OSCP." },
];

const FREE_STUDY = [
  { topic: "Security+ study", source: "Professor Messer YouTube (free) + Mike Chapple's books", url: "https://www.professormesser.com" },
  { topic: "OSCP prep", source: "TryHackMe 'Offensive Pentesting' learning path + HackTheBox 'OSCP-like' machines list", url: "https://www.tjnull.net/p/oscp-like-vulnhub-vms-2.html" },
  { topic: "Web Security Academy", source: "PortSwigger free labs · the canonical OSWE prep + general web pentest learning", url: "https://portswigger.net/web-security" },
  { topic: "SANS-equivalent free curricula", source: "SANS Cyber Aces (free, basic), MIT 6.858 Computer Systems Security OCW", url: "https://ocw.mit.edu/courses/6-858-computer-systems-security-fall-2014/" },
  { topic: "Malware analysis / RE", source: "Malware Unicorn workshops (free) + Practical Malware Analysis textbook", url: "https://malwareunicorn.org/workshops/" },
];

export const metadata: Metadata = {
  title: "Cyber certifications worth it · /learn/cyber · AtomEons",
  description:
    "OSCP, OSEP, GPEN, GREM, GCIH, CISSP, Security+, CEH, PenTest+ · which certifications open which doors, real 2026 costs, real time-to-pass. Free study paths. Public info only. CC-BY 4.0.",
  alternates: { canonical: "https://atomeons.com/learn/cyber/certs" },
};

export default function CyberCertsPage() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <CyberHeroImage slug="certs" alt={"Macro still-life of a small stack of black hardcover books edge-on with a thin cyan bookmark protruding."} />
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn/cyber" className="hover:text-[#22F0D5]">Cyber</Link>{" "}
          <span className="text-[#1A2225]">/</span> Certs
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-14 md:py-20">
          <h1 className="mt-6 text-balance text-4xl font-medium leading-[1] tracking-tight md:text-6xl">
            Certifications worth{" "}
            <span className="text-[#22F0D5]">the money.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-base leading-[1.75] text-[#C8CCCE] md:text-[17px]">
            Ten certifications in this field actually matter. Most others don&apos;t. This page
            tells you which is which, what each one costs in 2026, how long it takes to pass,
            and what the honest market signal is.
          </p>
          <p className="mt-5 max-w-3xl text-base leading-[1.75] text-[#FFB87A]">
            <strong>The general rule:</strong> certifications open doors. They do not replace
            real practical skill. The cert + the public proof of skill (TryHackMe / HackTheBox
            rank · public CVE · bug bounty findings · GitHub) wins every hiring loop. The cert
            alone is necessary but not sufficient.
          </p>
        </div>
      </section>

      <section className="border-b border-[#1A2225] bg-[#0e2520]/15">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20">
          <h2 className="text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            The 10 certifications, ranked by what they actually unlock
          </h2>
          <div className="mt-8 space-y-5">
            {CERTS.map((c) => (
              <article key={c.name} className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6 md:p-7">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="text-2xl font-semibold tracking-tight text-[#F2F4F5]">{c.name}</h3>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">{c.level}</p>
                </div>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[#9BA5A7]">{c.cost} · {c.time}</p>
                <p className="mt-4 text-[15px] leading-[1.7] text-[#C8CCCE]">{c.body}</p>
                <p className="mt-4 rounded-lg border border-[#22F0D5]/30 bg-[#22F0D5]/05 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[#22F0D5]">
                  verdict: {c.verdict}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20">
          <h2 className="text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            Free study material that actually works
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-[1.7] text-[#C8CCCE]">
            For every cert above, there is a free or near-free path to mastery before you pay
            the exam fee. These resources are widely used by people who pass these certs.
          </p>
          <div className="mt-8 space-y-3">
            {FREE_STUDY.map((s, i) => (
              <a key={i} href={s.url} target="_blank" rel="noopener" className="block rounded-xl border border-[#1A2225] bg-[#0A0F11] p-5 transition-colors hover:border-[#22F0D5]/40">
                <p className="mt-2 text-base text-[#F2F4F5]">{s.source}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#1A2225] bg-[#0e2520]/15">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20">
          <h2 className="text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
            The honest sequencing recommendation
          </h2>
          <ol className="mt-7 space-y-4 text-base leading-[1.75] text-[#C8CCCE]">
            <li className="flex gap-3"><span className="font-mono font-bold text-[#22F0D5]">01</span><span><strong className="text-[#F2F4F5]">Security+ first if going federal.</strong> $370. 2-4 months. Opens federal-floor doors.</span></li>
            <li className="flex gap-3"><span className="font-mono font-bold text-[#22F0D5]">02</span><span><strong className="text-[#F2F4F5]">Skip Security+ if going pure private offensive.</strong> Go straight to OSCP after 6-12 months of TryHackMe / HackTheBox.</span></li>
            <li className="flex gap-3"><span className="font-mono font-bold text-[#22F0D5]">03</span><span><strong className="text-[#F2F4F5]">OSCP within 12-18 months of starting.</strong> The single biggest career step in the industry.</span></li>
            <li className="flex gap-3"><span className="font-mono font-bold text-[#22F0D5]">04</span><span><strong className="text-[#F2F4F5]">After OSCP, specialize.</strong> OSWE (web), OSEP (advanced offensive), GREM (malware RE), GCIH (blue team) — pick one based on what you find yourself doing on Tuesday nights.</span></li>
            <li className="flex gap-3"><span className="font-mono font-bold text-[#22F0D5]">05</span><span><strong className="text-[#F2F4F5]">CISSP if you go management.</strong> Year 5-7 of your career, not before.</span></li>
            <li className="flex gap-3"><span className="font-mono font-bold text-[#22F0D5]">06</span><span><strong className="text-[#F2F4F5]">OSEE only if you become a specialist.</strong> Year 5+. It&apos;s the hardest commercial cert in cyber and bragging-rights territory.</span></li>
          </ol>
          <p className="mt-7 text-sm leading-[1.6] text-[#9BA5A7]">
            All prices and exam formats are as of mid-2026 best-effort from public certification
            body pages. Confirm with the issuing organization before paying.
          </p>
        </div>
      </section>

      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/learn/cyber/ai-security" className="rounded-full border border-[#22F0D5]/40 bg-[#22F0D5]/10 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5] hover:bg-[#22F0D5]/20">
              AI security →
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
