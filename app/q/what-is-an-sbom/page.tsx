import type { Metadata } from "next";
import { SpeakableJsonLd } from "@/app/_components/schema/SpeakableJsonLd";

export const metadata: Metadata = {
  title: "What Is An SBOM (Software Bill Of Materials)?",
  description:
    "An SBOM is a machine-readable inventory of every component, library, and dependency inside a piece of software. Required by U.S. Executive Order 14028 for federal software sales; dominant formats are SPDX (ISO/IEC 5962:2021) and CycloneDX (OWASP).",
  alternates: {
    canonical: "https://atomeons.com/q/what-is-an-sbom",
  },
  openGraph: {
    title: "What Is An SBOM (Software Bill Of Materials)?",
    description:
      "Plain-English answer: an SBOM is a formal inventory of every component inside a piece of software. SPDX and CycloneDX are the two dominant formats. Required by EO 14028 and the EU Cyber Resilience Act.",
    url: "https://atomeons.com/q/what-is-an-sbom",
    type: "article",
  },
};

const QUESTION = "What is an SBOM (Software Bill of Materials)?";

const SHORT_ANSWER =
  "A Software Bill of Materials (SBOM) is a formal, machine-readable inventory of every component, library, and dependency inside a piece of software, along with their versions, suppliers, and license information. It is to software what a list of ingredients is to food, and since U.S. Executive Order 14028 (May 2021) it is a mandatory artifact for any company selling software to the federal government. The two dominant SBOM formats are SPDX (an ISO/IEC standard, 5962:2021) and CycloneDX (an OWASP project).";

export default function Page() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: QUESTION,
        acceptedAnswer: {
          "@type": "Answer",
          text: SHORT_ANSWER,
        },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-neutral-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <SpeakableJsonLd
        url="https://atomeons.com/q/what"
        name="What is What?"
        description="Voice-readable short answer plus technical context."
        cssSelectors={[".speakable-answer"]}
      />

      <article className="mx-auto max-w-3xl px-6 py-16">
        <nav className="mb-10 text-xs uppercase tracking-[0.18em] text-neutral-500">
          <a href="/" className="hover:text-[#ff7a18]">
            atomeons
          </a>
          <span className="px-2 text-neutral-700">/</span>
          <a href="/q" className="hover:text-[#ff7a18]">
            q
          </a>
          <span className="px-2 text-neutral-700">/</span>
          <span className="text-neutral-400">what-is-an-sbom</span>
        </nav>

        <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
          {QUESTION}
        </h1>

        <p className="mt-8 border-l-2 border-[#ff7a18] pl-5 text-lg leading-relaxed text-neutral-100">
          {SHORT_ANSWER}
        </p>

        <section className="mt-14">
          <h2 className="text-sm uppercase tracking-[0.2em] text-[#ff7a18]">
            The longer answer
          </h2>
          <div className="mt-5 space-y-5 text-[15.5px] leading-relaxed text-neutral-300">
            <p>
              An SBOM is a nested, signable document — usually JSON, XML, or tag-value text — that lists every &ldquo;component&rdquo; a piece of software contains, the relationships between those components (what depends on what), and metadata such as supplier, version, license, cryptographic hash, and known vulnerability identifiers. NTIA&rsquo;s 2021 <em>Minimum Elements for a Software Bill of Materials</em> defines seven required data fields (supplier, component name, version, unique identifier, dependency relationship, author, timestamp) and three required practices (automation support, practices and processes, known unknowns). It is the foundation document that downstream tools — SCA scanners, VEX advisories, license-compliance checkers, reproducible-build attestors — operate on.
            </p>
            <p>
              The push for SBOMs accelerated after a chain of supply-chain incidents that exposed how little anyone knew about what was actually inside the software they shipped. The 2020 SolarWinds Orion compromise (CVE-2020-10148) inserted the SUNBURST backdoor into roughly 18,000 downstream environments via a signed update. The December 2021 Log4Shell disclosure (CVE-2021-44228, CVSS 10.0) revealed that a single deserialization flaw in Apache Log4j 2 sat under a meaningful fraction of the entire Java ecosystem. The 2024 XZ Utils backdoor (CVE-2024-3094, CVSS 10.0) showed the same problem at the OS layer: a maintainer-level social-engineering attack against <code className="rounded bg-neutral-900 px-1.5 py-0.5 text-[13px] text-[#ff9a4d]">liblzma</code> came within weeks of landing in stable Debian and Fedora.
            </p>
            <p>
              U.S. federal policy followed. Executive Order 14028 (May 12, 2021) directed NIST to publish secure-software-development guidance and required SBOMs for federal software purchases. NIST SP 800-218 (SSDF v1.1, February 2022) operationalized that requirement. CISA published the <em>Types of SBOM Documents</em> taxonomy in April 2023, defining six SBOM types — Design, Source, Build, Analyzed, Deployed, and Runtime. The EU&rsquo;s Cyber Resilience Act (Regulation (EU) 2024/2847, in force December 2024) imposes a parallel obligation across European markets, with full applicability from December 2027.
            </p>
            <p>
              Two formats dominate. SPDX (Software Package Data Exchange) is maintained by the Linux Foundation and was ratified as ISO/IEC 5962:2021. CycloneDX is maintained by OWASP and ships richer support for VEX (Vulnerability Exploitability eXchange) statements, which let a vendor publish &ldquo;yes, we ship Log4j, but the vulnerable code path is not reachable in our product&rdquo; — a critical signal that prevents downstream SBOM consumers from drowning in false-positive alerts. CISA&rsquo;s 2023 VEX guidance and the OASIS CSAF 2.0 specification both standardize how VEX is expressed.
            </p>
            <p>
              In practice, SBOMs are generated automatically at build time by tools like Syft (Anchore), Trivy (Aqua Security), <code className="rounded bg-neutral-900 px-1.5 py-0.5 text-[13px] text-[#ff9a4d]">cdxgen</code> (CycloneDX), and Microsoft&rsquo;s <code className="rounded bg-neutral-900 px-1.5 py-0.5 text-[13px] text-[#ff9a4d]">sbom-tool</code>. They are then signed (often via Sigstore/cosign), stored as OCI artifacts alongside container images, and consumed by SCA platforms (Snyk, Dependency-Track, GitHub Dependabot) that continuously diff the SBOM against vulnerability feeds like NVD, GHSA, and OSV.dev.
            </p>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-sm uppercase tracking-[0.2em] text-[#ff7a18]">
            Key facts
          </h2>
          <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-neutral-300">
            <li className="border-l border-neutral-800 pl-4">
              NTIA&rsquo;s <em>Minimum Elements for a Software Bill of Materials</em> (July 12, 2021) defines seven required data fields including supplier name, component name, version, unique identifier, dependency relationships, SBOM author, and timestamp <span className="text-neutral-500">(NTIA, 2021)</span>.
            </li>
            <li className="border-l border-neutral-800 pl-4">
              SPDX is an international standard, formally ISO/IEC 5962:2021, maintained by the Linux Foundation <span className="text-neutral-500">(ISO/IEC 5962:2021)</span>.
            </li>
            <li className="border-l border-neutral-800 pl-4">
              CycloneDX is an OWASP flagship project with a stable specification at version 1.6, released April 2024 <span className="text-neutral-500">(CycloneDX 1.6 / OWASP)</span>.
            </li>
            <li className="border-l border-neutral-800 pl-4">
              Executive Order 14028, &ldquo;Improving the Nation&rsquo;s Cybersecurity,&rdquo; signed May 12, 2021, requires SBOMs for software sold to the U.S. federal government <span className="text-neutral-500">(EO 14028, &sect;4(e))</span>.
            </li>
            <li className="border-l border-neutral-800 pl-4">
              Log4Shell (CVE-2021-44228, December 9, 2021) carries CVSS v3.1 base score 10.0 and is the canonical incident that mainstreamed SBOM adoption <span className="text-neutral-500">(NVD CVE-2021-44228)</span>.
            </li>
            <li className="border-l border-neutral-800 pl-4">
              The XZ Utils backdoor (CVE-2024-3094, disclosed March 29, 2024) also scored CVSS 10.0 and targeted <code className="rounded bg-neutral-900 px-1 text-[13px] text-[#ff9a4d]">liblzma</code> 5.6.0 and 5.6.1 <span className="text-neutral-500">(NVD CVE-2024-3094)</span>.
            </li>
            <li className="border-l border-neutral-800 pl-4">
              CISA&rsquo;s <em>Types of SBOM Documents</em> (April 2023) defines six lifecycle-anchored SBOM types: Design, Source, Build, Analyzed, Deployed, and Runtime <span className="text-neutral-500">(CISA, 2023)</span>.
            </li>
            <li className="border-l border-neutral-800 pl-4">
              The EU Cyber Resilience Act (Regulation (EU) 2024/2847) entered into force December 10, 2024, with full applicability from December 11, 2027 <span className="text-neutral-500">(EUR-Lex 2024/2847)</span>.
            </li>
            <li className="border-l border-neutral-800 pl-4">
              NIST SP 800-218 (SSDF v1.1, February 2022) operationalizes EO 14028 and references SBOM generation under practice PS.3.2 <span className="text-neutral-500">(NIST SP 800-218)</span>.
            </li>
            <li className="border-l border-neutral-800 pl-4">
              VEX (Vulnerability Exploitability eXchange) is formalized in OASIS CSAF 2.0 and CISA&rsquo;s June 2023 <em>Minimum Requirements for VEX</em> guidance <span className="text-neutral-500">(CISA VEX, 2023)</span>.
            </li>
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="text-sm uppercase tracking-[0.2em] text-[#ff7a18]">
            Related questions
          </h2>
          <ul className="mt-5 space-y-2 text-[15px] text-neutral-300">
            <li>
              <a className="text-[#ff9a4d] hover:text-[#ff7a18]" href="/q/what-is-vex">
                What is VEX (Vulnerability Exploitability eXchange)?
              </a>
            </li>
            <li>
              <a className="text-[#ff9a4d] hover:text-[#ff7a18]" href="/q/spdx-vs-cyclonedx">
                What is the difference between SPDX and CycloneDX?
              </a>
            </li>
            <li>
              <a className="text-[#ff9a4d] hover:text-[#ff7a18]" href="/q/what-is-sigstore">
                What is Sigstore and how does it sign SBOMs?
              </a>
            </li>
            <li>
              <a className="text-[#ff9a4d] hover:text-[#ff7a18]" href="/q/what-is-nist-ssdf">
                What is NIST SSDF (SP 800-218)?
              </a>
            </li>
            <li>
              <a className="text-[#ff9a4d] hover:text-[#ff7a18]" href="/q/what-is-eu-cra">
                What is the EU Cyber Resilience Act?
              </a>
            </li>
          </ul>
        </section>

        <section className="mt-14 mb-20">
          <h2 className="text-sm uppercase tracking-[0.2em] text-[#ff7a18]">
            Sources
          </h2>
          <ul className="mt-5 space-y-2 text-[14px] leading-relaxed text-neutral-400">
            <li>
              NTIA, &ldquo;The Minimum Elements For a Software Bill of Materials (SBOM),&rdquo; July 12, 2021 —{" "}
              <a
                className="break-all text-neutral-300 hover:text-[#ff7a18]"
                href="https://www.ntia.gov/files/ntia/publications/sbom_minimum_elements_report.pdf"
              >
                ntia.gov/files/ntia/publications/sbom_minimum_elements_report.pdf
              </a>
            </li>
            <li>
              The White House, Executive Order 14028, May 12, 2021 —{" "}
              <a
                className="break-all text-neutral-300 hover:text-[#ff7a18]"
                href="https://www.whitehouse.gov/briefing-room/presidential-actions/2021/05/12/executive-order-on-improving-the-nations-cybersecurity/"
              >
                whitehouse.gov/&hellip;/executive-order-on-improving-the-nations-cybersecurity
              </a>
            </li>
            <li>
              ISO/IEC 5962:2021, SPDX Specification V2.2.1 —{" "}
              <a
                className="break-all text-neutral-300 hover:text-[#ff7a18]"
                href="https://www.iso.org/standard/81870.html"
              >
                iso.org/standard/81870.html
              </a>
            </li>
            <li>
              OWASP CycloneDX Specification —{" "}
              <a
                className="break-all text-neutral-300 hover:text-[#ff7a18]"
                href="https://cyclonedx.org/specification/overview/"
              >
                cyclonedx.org/specification/overview
              </a>
            </li>
            <li>
              CISA, &ldquo;Types of Software Bill of Material (SBOM) Documents,&rdquo; April 21, 2023 —{" "}
              <a
                className="break-all text-neutral-300 hover:text-[#ff7a18]"
                href="https://www.cisa.gov/resources-tools/resources/types-software-bill-materials-sbom"
              >
                cisa.gov/resources-tools/resources/types-software-bill-materials-sbom
              </a>
            </li>
            <li>
              NIST SP 800-218, SSDF v1.1, February 2022 —{" "}
              <a
                className="break-all text-neutral-300 hover:text-[#ff7a18]"
                href="https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-218.pdf"
              >
                nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-218.pdf
              </a>
            </li>
            <li>
              NVD, CVE-2021-44228 (Log4Shell) —{" "}
              <a
                className="break-all text-neutral-300 hover:text-[#ff7a18]"
                href="https://nvd.nist.gov/vuln/detail/CVE-2021-44228"
              >
                nvd.nist.gov/vuln/detail/CVE-2021-44228
              </a>
            </li>
            <li>
              NVD, CVE-2024-3094 (XZ Utils backdoor) —{" "}
              <a
                className="break-all text-neutral-300 hover:text-[#ff7a18]"
                href="https://nvd.nist.gov/vuln/detail/CVE-2024-3094"
              >
                nvd.nist.gov/vuln/detail/CVE-2024-3094
              </a>
            </li>
            <li>
              EUR-Lex, Regulation (EU) 2024/2847 (Cyber Resilience Act) —{" "}
              <a
                className="break-all text-neutral-300 hover:text-[#ff7a18]"
                href="https://eur-lex.europa.eu/eli/reg/2024/2847/oj"
              >
                eur-lex.europa.eu/eli/reg/2024/2847/oj
              </a>
            </li>
          </ul>
        </section>
      </article>
    </main>
  );
}