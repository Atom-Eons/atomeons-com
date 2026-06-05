import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What Is NIST CSF 2.0?",
  description:
    "NIST CSF 2.0 is the National Institute of Standards and Technology Cybersecurity Framework, Version 2.0, published February 26, 2024 as NIST CSWP 29. It defines six Functions — Govern, Identify, Protect, Detect, Respond, Recover — for managing cyber risk.",
  alternates: {
    canonical: "https://atomeons.com/q/what-is-nist-csf",
  },
  openGraph: {
    title: "What Is NIST CSF 2.0?",
    description:
      "The NIST Cybersecurity Framework 2.0 (Feb 2024, CSWP 29) introduced Govern as a sixth Function and expanded scope beyond U.S. critical infrastructure.",
    url: "https://atomeons.com/q/what-is-nist-csf",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "What Is NIST CSF 2.0?",
    description:
      "Six Functions — Govern, Identify, Protect, Detect, Respond, Recover. Published Feb 26, 2024.",
  },
};

const SHORT_ANSWER =
  "NIST CSF 2.0 is the National Institute of Standards and Technology Cybersecurity Framework, Version 2.0, published February 26, 2024 as NIST CSWP 29. It is a voluntary set of cybersecurity outcomes organized into six Functions — Govern, Identify, Protect, Detect, Respond, and Recover — designed to help organizations of any size or sector manage and reduce cyber risk. CSF 2.0 expanded the original five-function model from 2014 by adding Govern as a new top-level Function covering enterprise risk strategy, oversight, and supply-chain accountability.";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is NIST CSF 2.0?",
      acceptedAnswer: {
        "@type": "Answer",
        text: SHORT_ANSWER,
      },
    },
  ],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "AtomEons",
      item: "https://atomeons.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Questions",
      item: "https://atomeons.com/q",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "What Is NIST CSF 2.0?",
      item: "https://atomeons.com/q/what-is-nist-csf",
    },
  ],
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#e6e6e6]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <article className="mx-auto max-w-3xl px-6 py-16">
        <nav className="mb-8 text-xs uppercase tracking-[0.18em] text-[#7a7a7a]">
          <a href="/" className="hover:text-[#00e0c8]">
            atomeons
          </a>
          <span className="mx-2">/</span>
          <a href="/q" className="hover:text-[#00e0c8]">
            q
          </a>
          <span className="mx-2">/</span>
          <span className="text-[#00e0c8]">what-is-nist-csf</span>
        </nav>

        <h1 className="mb-6 text-4xl font-medium leading-tight tracking-tight text-white md:text-5xl">
          What Is NIST CSF 2.0?
        </h1>

        <p className="mb-10 text-sm uppercase tracking-[0.22em] text-[#7a7a7a]">
          Question  ·  Cybersecurity Standards
        </p>

        <section className="mb-12 rounded-lg border border-[#1f1f1f] bg-[#0f0f0f] p-6">
          <h2 className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-[#00e0c8]">
            The short answer
          </h2>
          <p className="text-lg leading-relaxed text-[#e6e6e6]">
            {SHORT_ANSWER}
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-medium text-white">
            The longer answer
          </h2>
          <div className="space-y-4 text-base leading-relaxed text-[#cfcfcf]">
            <p>
              The Cybersecurity Framework was first published by NIST in
              February 2014 (Version 1.0) under Executive Order 13636, then
              revised to Version 1.1 in April 2018. Version 2.0 — released
              on February 26, 2024 — is the first major architectural change
              since the framework{"'"}s debut and the first version explicitly
              scoped beyond U.S. critical infrastructure to{" "}
              <em>
                organizations of all sizes and sectors, including industry,
                government, academia, and nonprofit
              </em>
              .
            </p>
            <p>
              The headline change is the addition of the{" "}
              <strong className="text-white">Govern (GV)</strong> Function. CSF
              1.1 had five Functions: Identify, Protect, Detect, Respond,
              Recover. CSF 2.0 has six, with Govern positioned as the
              connective tissue that informs the other five. Govern covers
              cybersecurity strategy, organizational context, supply-chain risk
              management, roles and responsibilities, policy, and oversight.
              This was a direct response to a decade of post-2014 incidents —
              SolarWinds (2020), Colonial Pipeline (2021), Log4Shell
              (CVE-2021-44228), MOVEit (CVE-2023-34362) — in which the dominant
              failure mode was governance and third-party risk, not missing
              technical controls.
            </p>
            <p>
              The framework{"'"}s Core is structured as Functions → Categories →
              Subcategories. CSF 2.0 contains 6 Functions, 22 Categories, and
              106 Subcategories (down from CSF 1.1{"'"}s 23 Categories and 108
              Subcategories, after consolidation). Each Subcategory is mapped
              to Informative References — concrete controls from sources such
              as NIST SP 800-53 Rev. 5, ISO/IEC 27001:2022, CIS Controls v8,
              and COBIT 2019. NIST maintains these mappings in the online CSF
              2.0 Reference Tool rather than baking them into the static PDF,
              which is itself a change from earlier versions.
            </p>
            <p>
              CSF 2.0 also formalizes{" "}
              <strong className="text-white">Profiles</strong> and{" "}
              <strong className="text-white">Tiers</strong>. A Profile describes
              an organization{"'"}s current or target cybersecurity posture
              across the Core; Tiers (Partial, Risk Informed, Repeatable,
              Adaptive) describe the rigor of cyber risk governance and
              management practices. NIST published Community Profiles alongside
              CSF 2.0 — including a Small Business Quick-Start Guide (NIST SP
              1300) — to reduce the framework{"'"}s notorious accessibility gap
              for non-enterprise adopters.
            </p>
            <p>
              The framework is voluntary and outcome-based. It does not
              prescribe specific tools, vendors, or technologies, and it is not
              itself a certification. Compliance against CSF is typically
              asserted via self-assessment or third-party attestation rather
              than a NIST-issued certificate. This distinguishes CSF from
              ISO/IEC 27001 (which has a formal certification scheme) and from
              regulatory regimes like HIPAA Security Rule or PCI DSS 4.0.
            </p>
            <p>
              CSF 2.0 has been formally referenced or adopted by U.S. federal
              guidance (CISA Cybersecurity Performance Goals), the Department
              of Defense Cybersecurity Maturity Model Certification (CMMC)
              program, and a growing number of state-level breach-notification
              and critical-infrastructure statutes. International adoption is
              significant: ENISA, the U.K. NCSC, and Japan{"'"}s IPA all
              maintain CSF crosswalks, and the Bank of Italy referenced CSF in
              its 2023 supervisory guidance on ICT risk.
            </p>
            <p>
              For practitioners, the practical reading of CSF 2.0 is: it is
              the lingua franca for cybersecurity program structure.
              Board-level risk discussions, regulator inquiries, cyber
              insurance underwriting questionnaires, and vendor security
              reviews increasingly assume the six-Function vocabulary. An
              organization that cannot articulate where it sits on Govern,
              Identify, Protect, Detect, Respond, and Recover is now operating
              below the implicit baseline.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-medium text-white">Key facts</h2>
          <ul className="space-y-3 text-base leading-relaxed text-[#cfcfcf]">
            <li className="border-l-2 border-[#00e0c8] pl-4">
              NIST CSF 2.0 was published February 26, 2024 as NIST CSWP 29
              (NIST Cybersecurity White Paper 29).
            </li>
            <li className="border-l-2 border-[#00e0c8] pl-4">
              CSF 2.0 has 6 Functions: Govern, Identify, Protect, Detect,
              Respond, Recover — up from 5 in CSF 1.1 (NIST CSWP 29, §2.1).
            </li>
            <li className="border-l-2 border-[#00e0c8] pl-4">
              The Govern (GV) Function is new in 2.0 and covers organizational
              context, risk strategy, roles, policy, oversight, and
              cybersecurity supply-chain risk management (NIST CSWP 29,
              §2.1.1).
            </li>
            <li className="border-l-2 border-[#00e0c8] pl-4">
              CSF 2.0{"'"}s Core contains 22 Categories and 106 Subcategories,
              mapped to Informative References including NIST SP 800-53 Rev. 5
              and ISO/IEC 27001:2022 (NIST CSF 2.0 Reference Tool).
            </li>
            <li className="border-l-2 border-[#00e0c8] pl-4">
              CSF 2.0 is explicitly scoped to{" "}
              <em>organizations of all sizes and sectors</em> — not just U.S.
              critical infrastructure as in CSF 1.0 (Executive Order 13636,
              Feb 2013).
            </li>
            <li className="border-l-2 border-[#00e0c8] pl-4">
              NIST published a Small Business Quick-Start Guide as NIST SP
              1300 to accompany CSF 2.0 (NIST SP 1300, 2024).
            </li>
            <li className="border-l-2 border-[#00e0c8] pl-4">
              CSF defines four Implementation Tiers: Tier 1 Partial, Tier 2
              Risk Informed, Tier 3 Repeatable, Tier 4 Adaptive (NIST CSWP 29,
              §3.2).
            </li>
            <li className="border-l-2 border-[#00e0c8] pl-4">
              CSF 2.0 supersedes CSF 1.1 (April 2018) but does not deprecate
              Subcategory IDs already in use — many were preserved or remapped
              for backward compatibility (NIST CSWP 29, Appendix A).
            </li>
            <li className="border-l-2 border-[#00e0c8] pl-4">
              CSF is voluntary; there is no NIST-issued certification, unlike
              ISO/IEC 27001:2022 which has a formal accredited certification
              scheme (ISO/IEC 17021-1).
            </li>
            <li className="border-l-2 border-[#00e0c8] pl-4">
              The U.S. CMMC program (32 CFR Part 170, final rule October 15,
              2024) draws its control set from NIST SP 800-171 Rev. 2, which
              itself maps to CSF Functions.
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-medium text-white">
            Related questions
          </h2>
          <ul className="space-y-2 text-base text-[#cfcfcf]">
            <li>
              <a
                href="/q/what-is-nist-sp-800-53"
                className="text-[#00e0c8] hover:underline"
              >
                What is NIST SP 800-53?
              </a>
            </li>
            <li>
              <a
                href="/q/nist-csf-vs-iso-27001"
                className="text-[#00e0c8] hover:underline"
              >
                What is the difference between NIST CSF and ISO 27001?
              </a>
            </li>
            <li>
              <a
                href="/q/what-is-cmmc"
                className="text-[#00e0c8] hover:underline"
              >
                What is CMMC 2.0?
              </a>
            </li>
            <li>
              <a
                href="/q/what-is-a-cybersecurity-profile"
                className="text-[#00e0c8] hover:underline"
              >
                What is a cybersecurity Profile?
              </a>
            </li>
            <li>
              <a
                href="/q/what-is-c-scrm"
                className="text-[#00e0c8] hover:underline"
              >
                What is supply-chain risk management (C-SCRM)?
              </a>
            </li>
          </ul>
        </section>

        <section className="mb-16">
          <h2 className="mb-4 text-2xl font-medium text-white">Sources</h2>
          <ul className="space-y-2 text-sm text-[#a8a8a8]">
            <li>
              <a
                href="https://doi.org/10.6028/NIST.CSWP.29"
                className="hover:text-[#00e0c8]"
                rel="noopener noreferrer"
                target="_blank"
              >
                NIST Cybersecurity Framework 2.0 (CSWP 29) — doi.org/10.6028/NIST.CSWP.29
              </a>
            </li>
            <li>
              <a
                href="https://www.nist.gov/cyberframework"
                className="hover:text-[#00e0c8]"
                rel="noopener noreferrer"
                target="_blank"
              >
                NIST CSF 2.0 landing page — nist.gov/cyberframework
              </a>
            </li>
            <li>
              <a
                href="https://csrc.nist.gov/Projects/cybersecurity-framework/Filters"
                className="hover:text-[#00e0c8]"
                rel="noopener noreferrer"
                target="_blank"
              >
                NIST CSF 2.0 Reference Tool — csrc.nist.gov
              </a>
            </li>
            <li>
              <a
                href="https://doi.org/10.6028/NIST.SP.1300"
                className="hover:text-[#00e0c8]"
                rel="noopener noreferrer"
                target="_blank"
              >
                NIST SP 1300, Small Business Quick-Start Guide
              </a>
            </li>
            <li>
              <a
                href="https://doi.org/10.6028/NIST.SP.800-53r5"
                className="hover:text-[#00e0c8]"
                rel="noopener noreferrer"
                target="_blank"
              >
                NIST SP 800-53 Rev. 5, Security and Privacy Controls
              </a>
            </li>
            <li>
              <a
                href="https://www.iso.org/standard/27001"
                className="hover:text-[#00e0c8]"
                rel="noopener noreferrer"
                target="_blank"
              >
                ISO/IEC 27001:2022 — iso.org/standard/27001
              </a>
            </li>
            <li>
              <a
                href="https://obamawhitehouse.archives.gov/the-press-office/2013/02/12/executive-order-improving-critical-infrastructure-cybersecurity"
                className="hover:text-[#00e0c8]"
                rel="noopener noreferrer"
                target="_blank"
              >
                Executive Order 13636 (Feb 12, 2013)
              </a>
            </li>
            <li>
              <a
                href="https://www.federalregister.gov/documents/2024/10/15/2024-22905/cybersecurity-maturity-model-certification-cmmc-program"
                className="hover:text-[#00e0c8]"
                rel="noopener noreferrer"
                target="_blank"
              >
                DoD CMMC Final Rule, 32 CFR Part 170 — federalregister.gov
              </a>
            </li>
          </ul>
        </section>

        <footer className="border-t border-[#1f1f1f] pt-6 text-xs text-[#6a6a6a]">
          <p>
            AtomEons Q  ·  Verified entities, dated standards, real
            sources.  ·{" "}
            <a href="/q" className="hover:text-[#00e0c8]">
              Browse all questions
            </a>
          </p>
        </footer>
      </article>
    </main>
  );
}