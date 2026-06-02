import type { Metadata } from "next";
import Link from "next/link";
import { CyberHeroImage } from "../_components/CyberHeroImage";

export const metadata: Metadata = {
  title: "Legal · CFAA, scope, authorization · /learn/cyber · AtomEons",
  description:
    "The Computer Fraud and Abuse Act in plain English. What 'authorization' actually means. Real cases (van Buren v US, Marcus Hutchins, Aaron Swartz). DOJ's 2022 charging policy clarification. The vulnerability disclosure policy template. Stay out of jail. Public info only. CC-BY 4.0.",
  alternates: { canonical: "https://atomeons.com/learn/cyber/legal" },
};

export default function CyberLegalPage() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <CyberHeroImage slug="legal" alt={"Symmetrical photograph of a dark brutalist courthouse facade at dusk, faint cyan reflection in tall windows."} />
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn/cyber" className="hover:text-[#22F0D5]">Cyber</Link>{" "}
          <span className="text-[#1A2225]">/</span> Legal
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-14 md:py-20">
          <h1 className="mt-6 text-balance text-4xl font-medium leading-[1] tracking-tight md:text-6xl">
            What&apos;s legal.{" "}
            <span className="text-[#FFB87A]">What is not.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-base leading-[1.75] text-[#C8CCCE] md:text-[17px]">
            The single difference between a paid security professional and someone with a federal
            indictment is <strong className="text-[#F2F4F5]">authorization</strong>. Read this
            page before you touch any computer that isn&apos;t yours.
          </p>
          <p className="mt-5 max-w-3xl text-base leading-[1.75] text-[#C8CCCE]">
            None of what follows is legal advice. It is publicly documented context. If you have
            a specific situation, talk to a lawyer · the Electronic Frontier Foundation has a
            referral list at{" "}
            <a href="https://www.eff.org" target="_blank" rel="noopener" className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-4 hover:decoration-[#22F0D5]">
              eff.org
            </a>
            .
          </p>
        </div>
      </section>

      <section className="border-b border-[#1A2225] bg-[#0e2520]/15">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20 space-y-12">
          <div>
            <h2 className="text-balance text-2xl font-medium tracking-tight md:text-3xl">
              The Computer Fraud and Abuse Act · in 60 seconds
            </h2>
            <p className="mt-5 text-base leading-[1.75] text-[#C8CCCE] md:text-[17px]">
              The CFAA (18 U.S.C. § 1030) is the main US federal anti-hacking statute, passed
              1986 and amended multiple times since. The core prohibition is accessing a
              &ldquo;protected computer&rdquo; (interpreted very broadly · almost any computer
              connected to the internet) <strong className="text-[#F2F4F5]">without
              authorization or exceeding authorized access</strong>.
            </p>
            <p className="mt-5 text-base leading-[1.7] text-[#C8CCCE]">
              Penalties range from misdemeanor up to 20 years federal prison (and life in
              limited cases involving threats to national security or causing death). The
              statute is also used to bring civil suits.
            </p>
            <p className="mt-5 text-base leading-[1.7] text-[#C8CCCE]">
              The federal courts have read the &ldquo;authorization&rdquo; concept differently
              across circuits for two decades. The 2021 Supreme Court decision in{" "}
              <em className="not-italic text-[#F2F4F5]">van Buren v United States</em> narrowed
              the &ldquo;exceeds authorized access&rdquo; reading — the Court held that you
              don&apos;t exceed authorized access just because you misuse data you were
              authorized to view (the case involved a police officer running a license-plate
              lookup for personal reasons). But the &ldquo;without authorization&rdquo; prong
              remains broad, and bypassing technical access controls — even trivially — is
              squarely covered.
            </p>
          </div>

          <div>
            <h2 className="text-balance text-2xl font-medium tracking-tight md:text-3xl">
              Three real cases · learn from them
            </h2>
            <div className="mt-6 space-y-5">
              <div className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6">
                <h3 className="text-lg font-semibold text-[#22F0D5]">van Buren v United States (2021)</h3>
                <p className="mt-3 text-sm leading-[1.65] text-[#C8CCCE]">
                  Police officer used his authorized access to a license-plate database to look
                  up a plate in exchange for money. The Supreme Court reversed his CFAA
                  conviction · ruled that misusing data you&apos;re authorized to access is not
                  &ldquo;exceeding authorized access.&rdquo; This is the most security-research-
                  friendly CFAA ruling in decades. It does NOT legalize accessing things you
                  weren&apos;t authorized to access in the first place.
                </p>
              </div>
              <div className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6">
                <h3 className="text-lg font-semibold text-[#FFB87A]">Marcus Hutchins (2017-2019)</h3>
                <p className="mt-3 text-sm leading-[1.65] text-[#C8CCCE]">
                  The security researcher who accidentally stopped the WannaCry ransomware
                  outbreak in 2017 was arrested by the FBI at DEF CON months later for the
                  pre-2015 creation of two banking malware tools. He pled guilty to two CFAA
                  counts in 2019 and received time served + supervised release. The lesson:
                  what you wrote when you were 17 follows you forever in this field. The FBI
                  archives.
                </p>
              </div>
              <div className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6">
                <h3 className="text-lg font-semibold text-[#FFB87A]">Aaron Swartz (2013)</h3>
                <p className="mt-3 text-sm leading-[1.65] text-[#C8CCCE]">
                  Programmer and activist who downloaded ~5 million academic articles from JSTOR
                  through MIT&apos;s network. Charged under CFAA (and wire fraud) with potential
                  35 years prison + $1M fine. Died by suicide before trial in 2013. His case
                  became the canonical example of CFAA overreach against activist /
                  researcher conduct and led to the 2013-2024 reform debate.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-balance text-2xl font-medium tracking-tight md:text-3xl">
              The DOJ&apos;s 2022 charging policy update
            </h2>
            <p className="mt-5 text-base leading-[1.75] text-[#C8CCCE] md:text-[17px]">
              In May 2022, the US Department of Justice announced a policy revision: federal
              prosecutors would <strong className="text-[#F2F4F5]">no longer charge
              good-faith security research</strong> under the CFAA. The policy defines
              good-faith security research as accessing a computer solely for purposes of
              good-faith testing, investigation, or correction of a security flaw or
              vulnerability, where such activity is carried out in a manner designed to avoid
              harm to individuals or the public, and where the information derived is used
              primarily to promote the security or safety of the class of devices, machines, or
              services to which the accessed computer belongs.
            </p>
            <p className="mt-5 text-base leading-[1.7] text-[#C8CCCE]">
              This is a charging-discretion policy, not a change in the statute itself. Civil
              suits and state-level prosecutions are not affected by it. State computer-crime
              statutes (like California Penal Code 502) are still in play.
            </p>
            <p className="mt-5 text-base leading-[1.7] text-[#C8CCCE]">
              Read it yourself:{" "}
              <a
                href="https://www.justice.gov/opa/pr/department-justice-announces-new-policy-charging-cases-under-computer-fraud-and-abuse-act"
                target="_blank"
                rel="noopener"
                className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-4 hover:decoration-[#22F0D5]"
              >
                DOJ press release · 2022-05-19
              </a>
              .
            </p>
          </div>

          <div className="rounded-2xl border border-[#22F0D5]/40 bg-[#0e2520]/30 p-7 md:p-10">
            <h2 className="text-balance text-2xl font-medium tracking-tight text-[#22F0D5] md:text-3xl">
              How to stay clearly inside the line
            </h2>
            <ol className="mt-6 space-y-4 text-base leading-[1.75] text-[#C8CCCE]">
              <li className="flex gap-3">
                <span className="font-mono font-bold text-[#22F0D5]">01</span>
                <span>
                  <strong className="text-[#F2F4F5]">Only attack what you&apos;re explicitly
                  authorized to attack.</strong> &ldquo;Authorized&rdquo; means: you own it, or
                  you have written permission from the owner, or the system is a designated
                  lab / CTF / bug-bounty-scope target with a published authorization document.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-mono font-bold text-[#22F0D5]">02</span>
                <span>
                  <strong className="text-[#F2F4F5]">Read the scope every single time.</strong>{" "}
                  A bug bounty program&apos;s scope is a binding document. If it says
                  &ldquo;in scope: *.example.com except for example.com/admin&rdquo; then
                  example.com/admin is not authorized. Hitting it is a CFAA violation even if
                  you reported the bug.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-mono font-bold text-[#22F0D5]">03</span>
                <span>
                  <strong className="text-[#F2F4F5]">Stay within your test plan.</strong>{" "}
                  Authorization to test for one thing is not authorization to test for
                  everything. If you find a vuln in a system you weren&apos;t supposed to be on,
                  stop, document, report through the proper channel · do not pivot.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-mono font-bold text-[#22F0D5]">04</span>
                <span>
                  <strong className="text-[#F2F4F5]">Don&apos;t exfiltrate data you don&apos;t
                  need.</strong> Proof of access is generally fine (a screenshot of the admin
                  page, the database schema). Downloading the actual customer records is not
                  fine. The closer your proof-of-concept stays to &ldquo;here&apos;s the
                  vulnerability,&rdquo; the safer you are.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-mono font-bold text-[#22F0D5]">05</span>
                <span>
                  <strong className="text-[#F2F4F5]">Document everything in real time.</strong>{" "}
                  Date · time · scope you were testing · steps you took · what you found · what
                  you did with it. If a question comes up six months later, this notebook is
                  your defense.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-mono font-bold text-[#22F0D5]">06</span>
                <span>
                  <strong className="text-[#F2F4F5]">If a company doesn&apos;t have a
                  vulnerability disclosure program, ask before you test.</strong> Email{" "}
                  <code className="font-mono text-[#22F0D5]">security@</code> the domain. Save
                  the email. If they don&apos;t respond, do not proceed.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-mono font-bold text-[#22F0D5]">07</span>
                <span>
                  <strong className="text-[#F2F4F5]">Hire a lawyer before you ever talk to
                  federal investigators.</strong> If the FBI contacts you for any reason
                  related to your security work · do not answer questions, even friendly ones.
                  Get an attorney. The Electronic Frontier Foundation maintains a list of
                  security-research-friendly lawyers.
                </span>
              </li>
            </ol>
          </div>

          <div className="rounded-2xl border border-[#FFB87A]/40 bg-[#1C1308]/30 p-7 md:p-10">
            <h2 className="text-balance text-2xl font-medium tracking-tight text-[#FFB87A] md:text-3xl">
              Things people think are legal but aren&apos;t
            </h2>
            <ul className="mt-6 space-y-3 text-base leading-[1.7] text-[#C8CCCE]">
              <li className="flex gap-3">
                <span className="text-[#FFB87A]">○</span>
                <span>Port-scanning your neighbor&apos;s router because their wifi is open. Their open wifi is not your authorization.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#FFB87A]">○</span>
                <span>Using a default password to log into something. Even if the password is &ldquo;admin/admin&rdquo; — bypassing access control is unauthorized access. You have to be authorized to use the credential.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#FFB87A]">○</span>
                <span>&ldquo;Borrowing&rdquo; your school&apos;s wifi to scan internal hosts. Schools tend to have explicit acceptable-use policies that this violates, and the state computer-crime statutes apply on top of FERPA.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#FFB87A]">○</span>
                <span>Continuing to test a bug bounty target after the company has revoked your access. Companies can withdraw authorization at any time. The moment your account is banned, your authorization is gone.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#FFB87A]">○</span>
                <span>Posting credentials or token dumps you found in a public S3 bucket. Even if the bucket was publicly readable, posting the credentials is a separate criminal exposure under federal and state law.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#FFB87A]">○</span>
                <span>&ldquo;Pen-testing&rdquo; an ex&apos;s social media account. This is unauthorized access regardless of relationship history. Don&apos;t.</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-balance text-2xl font-medium tracking-tight md:text-3xl">
              Safe harbor: the Vulnerability Disclosure Policy
            </h2>
            <p className="mt-5 text-base leading-[1.75] text-[#C8CCCE] md:text-[17px]">
              The single best tool to operate safely is a published Vulnerability Disclosure
              Policy (VDP). If a target organization publishes a VDP, they&apos;ve effectively
              pre-authorized good-faith research within the scope of the VDP.
            </p>
            <p className="mt-5 text-base leading-[1.7] text-[#C8CCCE]">
              The Cybersecurity and Infrastructure Security Agency (CISA) requires every US
              federal civilian agency to maintain a VDP (per Binding Operational Directive
              20-01). The Department of Defense maintains a VDP at{" "}
              <a href="https://hackerone.com/deptofdefense" target="_blank" rel="noopener" className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-4 hover:decoration-[#22F0D5]">
                hackerone.com/deptofdefense
              </a>
              . You can legally find and report vulnerabilities in DoD-controlled .mil systems
              within that scope. People have built careers off DoD VDP submissions.
            </p>
            <p className="mt-5 text-base leading-[1.7] text-[#C8CCCE]">
              CISA publishes a model VDP template at{" "}
              <a href="https://cisa.gov/vulnerability-disclosure-policy-template" target="_blank" rel="noopener" className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-4 hover:decoration-[#22F0D5]">
                cisa.gov
              </a>{" "}
              that companies can adopt. If you&apos;re testing a company without a published
              VDP, you have less legal cover · proceed only with explicit written permission.
            </p>
          </div>

          <div>
            <h2 className="text-balance text-2xl font-medium tracking-tight md:text-3xl">
              Resources to keep on hand
            </h2>
            <ul className="mt-6 space-y-3 text-base leading-[1.7] text-[#C8CCCE]">
              <li>· <a href="https://www.eff.org/issues/coders" target="_blank" rel="noopener" className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-4 hover:decoration-[#22F0D5]">EFF · Coders&apos; Rights Project</a> — legal resources for researchers</li>
              <li>· <a href="https://disclose.io" target="_blank" rel="noopener" className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-4 hover:decoration-[#22F0D5]">disclose.io</a> — open-source VDP templates and a directory of organizations that publish them</li>
              <li>· <a href="https://www.cisa.gov/news-events/directives/bod-20-01-develop-and-publish-vulnerability-disclosure-policy" target="_blank" rel="noopener" className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-4 hover:decoration-[#22F0D5]">CISA Binding Operational Directive 20-01</a> — what US federal agencies must publish</li>
              <li>· <a href="https://www.justice.gov/criminal-ccips" target="_blank" rel="noopener" className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-4 hover:decoration-[#22F0D5]">DOJ Computer Crime and Intellectual Property Section</a> — the federal prosecutors who would handle a CFAA case</li>
              <li>· State law varies a lot. California Penal Code 502, Texas 33.02, NY Penal Law 156, etc. Look up your state.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-7 md:p-10">
            <p className="mt-4 text-base leading-[1.75] text-[#F2F4F5] md:text-[17px]">
              The career path is real. It is well-paid. It is increasingly important to the
              country. It is also one of the few professional fields where a single bad weekend
              when you are 19 can become a federal indictment that follows you into your 40s.
              The rule is simple: stay inside authorization, keep documentation, never assume
              friendliness from federal investigators, and ask first when in doubt.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/learn/cyber/hackerone" className="rounded-full border border-[#22F0D5]/40 bg-[#22F0D5]/10 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5] hover:bg-[#22F0D5]/20">
              now: bug bounty entry →
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
