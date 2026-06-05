import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "NIST Cybersecurity Framework 2.0 — Govern, Identify, Protect, Detect, Respond, Recover | AtomEons",
  description:
    "How the 2024 revision of NIST CSF moved governance from appendix to core function. Defensive doctrine, history, and named frameworks for senior practitioners.",
  openGraph: {
    title: "NIST CSF 2.0 — Govern, Identify, Protect, Detect, Respond, Recover",
    description:
      "Lab-grade catalog page on NIST CSF 2.0, the February 2024 revision, and the new Govern function.",
    type: "article",
  },
  alternates: {
    canonical: "https://atomeons.com/learn/cyber/nist-csf",
  },
};

export default function Page() {
  return (
    <main className="bg-[#0a0a0b] text-[#e7e5e0] min-h-screen">
      <article className="mx-auto max-w-3xl px-6 py-20 font-[Newsreader,Georgia,serif]">
        <nav className="mb-12 text-xs uppercase tracking-[0.18em] text-[#8a8680]">
          <Link href="/learn" className="hover:text-[#e7e5e0] transition-colors">
            Learn
          </Link>
          <span className="mx-2 text-[#4a4641]">/</span>
          <Link href="/learn/cyber" className="hover:text-[#e7e5e0] transition-colors">
            Cyber
          </Link>
          <span className="mx-2 text-[#4a4641]">/</span>
          <span className="text-[#c5c0b8]">NIST CSF 2.0</span>
        </nav>

        <header className="mb-16 border-b border-[#2a2724] pb-12">
          <div className="mb-4 text-xs uppercase tracking-[0.2em] text-[#c97a3a]">
            Cyber / Frameworks
          </div>
          <h1 className="font-serif text-[2.75rem] leading-[1.1] tracking-tight text-[#f4f1ec]">
            NIST Cybersecurity Framework 2.0
          </h1>
          <p className="mt-4 text-xl leading-snug text-[#a8a39c]">
            Govern, Identify, Protect, Detect, Respond, Recover
          </p>
          <p className="mt-6 text-base italic text-[#8a8680]">
            How the 2024 revision moved governance from appendix to core function.
          </p>
        </header>

        <section className="mb-16">
          <p className="text-lg leading-[1.7] text-[#d4cfc7]">
            The NIST Cybersecurity Framework reached version 2.0 in February 2024,
            ten years after the original Executive Order 13636 mandate produced
            version 1.0. The headline change is the addition of a sixth function —
            Govern — sitting alongside the five operational functions Identify,
            Protect, Detect, Respond, and Recover. Govern is not a new layer of
            compliance theater. It is the formal recognition that cybersecurity
            outcomes depend on enterprise risk decisions, supply chain posture,
            role accountability, and policy enforcement that the original five
            functions assumed but never named. The 2.0 release also broadens scope
            beyond critical infrastructure, ships Implementation Examples and
            Quick-Start Guides, and reorganizes the Core into a wheel rather than
            a list.
          </p>
        </section>

        <section className="mb-16 border-l-2 border-[#c97a3a] pl-6">
          <p className="text-lg leading-[1.7] text-[#e7e5e0]">
            NIST CSF 1.0 shipped in February 2014. NIST CSF 1.1 followed in April
            2018 with supply chain updates. NIST CSF 2.0 published February 26,
            2024 under NIST CSWP 29 — adding the Govern function, expanding
            audience beyond critical infrastructure, and shipping companion
            Implementation Examples (NIST SP 1299) and Organizational Profiles
            guidance. This page covers what the framework actually is, how it
            actually works, what the Govern function changes, and what
            practitioners do with it.
          </p>
        </section>

        <section className="mb-14">
          <h2 className="mb-6 font-serif text-3xl tracking-tight text-[#f4f1ec]">
            What it is
          </h2>
          <div className="space-y-5 text-base leading-[1.75] text-[#c5c0b8]">
            <p>
              The NIST Cybersecurity Framework is a voluntary, outcome-based
              catalog of cybersecurity activities organized into Functions,
              Categories, and Subcategories. It is not a control standard like
              ISO/IEC 27001 or NIST SP 800-53. It does not tell an organization
              what to do at the technical implementation level. It tells an
              organization what cybersecurity outcomes a mature program produces,
              and provides a common vocabulary for measuring gaps between current
              state and target state.
            </p>
            <p>
              The framework originated from Executive Order 13636, &ldquo;Improving
              Critical Infrastructure Cybersecurity,&rdquo; signed February 12,
              2013. The order directed the National Institute of Standards and
              Technology to develop a framework — with industry input — that
              critical infrastructure operators could adopt voluntarily. Version
              1.0 published February 12, 2014. Version 1.1 published April 16,
              2018, adding the Identity Management and Access Control category,
              deeper Supply Chain Risk Management coverage, and an explicit
              Self-Assessment section. Version 2.0 published February 26, 2024 as
              NIST Cybersecurity White Paper (CSWP) 29.
            </p>
            <p>
              Three documents anchor CSF 2.0. CSWP 29 is the framework itself —
              the Core, the Profiles guidance, and the Tier definitions. NIST SP
              1299 ships Implementation Examples, which are concrete, illustrative
              actions that operationalize each Subcategory. NIST SP 1301 ships
              Organizational Profile guidance, which is the recipe for translating
              Core outcomes into a Current Profile, a Target Profile, and a Gap
              Analysis.
            </p>
            <p>
              The Core of CSF 2.0 contains six Functions: Govern (GV), Identify
              (ID), Protect (PR), Detect (DE), Respond (RS), and Recover (RC).
              Each Function decomposes into Categories. Each Category decomposes
              into Subcategories, which are the leaf-level outcome statements. The
              framework presents 22 Categories and 106 Subcategories in version
              2.0, down from 23 Categories and 108 Subcategories in 1.1 — the
              reduction is reorganization, not scope reduction. Supply Chain Risk
              Management moved from ID to GV. Identity Management moved its
              emphasis. Several legacy Subcategories collapsed into clearer
              outcome statements.
            </p>
            <p>
              The framework is descriptive, not prescriptive. A Subcategory such
              as PR.AA-01 (&ldquo;Identities and credentials for authorized users,
              services, and hardware are managed by the organization&rdquo;) names
              the outcome. It does not specify Active Directory versus Okta versus
              FIDO2 hardware tokens. Implementation Examples in SP 1299 give
              illustrative actions, but those are explicitly non-mandatory. The
              flexibility is the design: CSF 2.0 must apply across a community
              hospital, a regional water utility, a defense prime contractor, and
              a SaaS startup.
            </p>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="mb-6 font-serif text-3xl tracking-tight text-[#f4f1ec]">
            How it actually works
          </h2>
          <div className="space-y-5 text-base leading-[1.75] text-[#c5c0b8]">
            <p>
              CSF 2.0 has three components: the Core, Organizational Profiles, and
              Tiers.
            </p>
            <p>
              The Core is the taxonomy. Functions sit at the top. The six
              Functions in 2.0 are organized as a wheel, with Govern at the center
              and the five operational Functions arrayed around it. The visual
              change is intentional. In 1.1, Govern-adjacent activities (risk
              management strategy, supply chain) lived inside Identify. In 2.0,
              Govern is structurally separate, with six dedicated Categories:
              Organizational Context (GV.OC), Risk Management Strategy (GV.RM),
              Roles, Responsibilities, and Authorities (GV.RR), Policy (GV.PO),
              Oversight (GV.OV), and Cybersecurity Supply Chain Risk Management
              (GV.SC).
            </p>
            <p>
              GV.SC is the most consequential structural move. Supply Chain Risk
              Management was ID.SC in version 1.1. In 2.0 it is GV.SC with ten
              Subcategories — the heaviest single Category in the framework. This
              reflects the post-SolarWinds, post-Log4Shell, post-MOVEit
              understanding that third-party and software-supply-chain risk is a
              governance problem, not an asset-management problem. The Cyber
              Supply Chain Risk Management Practices for Systems and Organizations
              document, NIST SP 800-161 Revision 1 (May 2022), is the deep
              companion to GV.SC.
            </p>
            <p>
              Organizational Profiles are how an organization uses the Core. A
              Current Profile inventories which Subcategory outcomes the
              organization actually achieves today, with what evidence. A Target
              Profile names which outcomes the organization commits to achieving,
              scaled to its mission and risk tolerance. The delta between Current
              and Target is the Gap Analysis. Profiles are not audit artifacts.
              They are planning artifacts, suitable for board-level risk reporting
              and budget justification. NIST SP 1301 publishes worked examples.
            </p>
            <p>
              Implementation Tiers — Partial (Tier 1), Risk Informed (Tier 2),
              Repeatable (Tier 3), Adaptive (Tier 4) — characterize the rigor and
              integration of an organization&rsquo;s cybersecurity risk management
              practices. Tiers are not maturity grades. NIST is explicit on this
              point: an organization should choose the Tier appropriate to its
              risk environment and resources. A small municipal utility operating
              at Tier 2 is not &ldquo;worse&rdquo; than a Fortune 100 bank
              operating at Tier 4. The framing is fit-for-purpose, not
              stairway-to-heaven.
            </p>
            <p>
              The Protect Function in 2.0 reorganizes around five Categories:
              Identity Management, Authentication, and Access Control (PR.AA);
              Awareness and Training (PR.AT); Data Security (PR.DS); Platform
              Security (PR.PS); and Technology Infrastructure Resilience (PR.IR).
              PR.PS is new in 2.0 and absorbs subcategories from the old PR.IP
              (Information Protection Processes and Procedures) and PR.MA
              (Maintenance). PR.IR consolidates resilience-of-infrastructure
              outcomes that were spread across PR.AC and PR.PT in 1.1.
            </p>
            <p>
              The Detect Function tightens to two Categories in 2.0: Continuous
              Monitoring (DE.CM) and Adverse Event Analysis (DE.AE). The Anomalies
              and Events / Security Continuous Monitoring / Detection Processes
              structure from 1.1 collapsed when &ldquo;Detection Processes&rdquo;
              was recognized as a Govern-and-Respond concern rather than its own
              Detect Category.
            </p>
            <p>
              Respond in 2.0 has five Categories: Incident Management (RS.MA),
              Incident Analysis (RS.AN), Incident Response Reporting and
              Communication (RS.CO), Incident Mitigation (RS.MI), and — implicitly
              through cross-references — Recovery Planning lives in RC. The
              Respond Function aligns conceptually with NIST SP 800-61 Revision 2
              (Computer Security Incident Handling Guide, August 2012), the
              canonical IR lifecycle document. NIST SP 800-61 Revision 3 is in
              active drafting as of the 2024&ndash;2026 cycle.
            </p>
            <p>
              Recover has two Categories: Incident Recovery Plan Execution (RC.RP)
              and Incident Recovery Communication (RC.CO). The companion document
              is NIST SP 800-184 (Guide for Cybersecurity Event Recovery, December
              2016).
            </p>
            <p>
              The framework explicitly references MITRE ATT&amp;CK, the CIS
              Controls v8, ISO/IEC 27001:2022, NIST SP 800-53 Revision 5, NIST SP
              800-218 (Secure Software Development Framework), NIST SP 800-207
              (Zero Trust Architecture), and the Cybersecurity and Infrastructure
              Security Agency&rsquo;s Cross-Sector Cybersecurity Performance Goals
              (CPGs). Informative References are catalogued in the online CSF 2.0
              Reference Tool maintained at csrc.nist.gov.
            </p>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="mb-6 font-serif text-3xl tracking-tight text-[#f4f1ec]">
            Receipts
          </h2>
          <ul className="space-y-3 text-base leading-[1.7] text-[#c5c0b8]">
            <li className="border-l border-[#c97a3a] pl-4">
              CSF 2.0 was published February 26, 2024 as NIST Cybersecurity White
              Paper 29. The document identifier is NIST.CSWP.29.
            </li>
            <li className="border-l border-[#c97a3a] pl-4">
              Executive Order 13636, &ldquo;Improving Critical Infrastructure
              Cybersecurity,&rdquo; signed February 12, 2013, is the
              legal-authority origin of the framework. CSF 1.0 published one year
              later, February 12, 2014.
            </li>
            <li className="border-l border-[#c97a3a] pl-4">
              CSF 1.1 published April 16, 2018, adding Identity Management and
              Access Control (PR.AC, now PR.AA in 2.0) and Supply Chain Risk
              Management (ID.SC, now GV.SC in 2.0).
            </li>
            <li className="border-l border-[#c97a3a] pl-4">
              The Govern Function in CSF 2.0 contains six Categories: GV.OC
              (Organizational Context), GV.RM (Risk Management Strategy), GV.RR
              (Roles, Responsibilities, and Authorities), GV.PO (Policy), GV.OV
              (Oversight), and GV.SC (Cybersecurity Supply Chain Risk Management).
            </li>
            <li className="border-l border-[#c97a3a] pl-4">
              NIST SP 800-161 Revision 1, &ldquo;Cybersecurity Supply Chain Risk
              Management Practices for Systems and Organizations,&rdquo; published
              May 2022, is the deep companion for the GV.SC Category.
            </li>
            <li className="border-l border-[#c97a3a] pl-4">
              NIST SP 800-61 Revision 2, &ldquo;Computer Security Incident
              Handling Guide,&rdquo; published August 2012, aligns conceptually
              with the Respond Function. SP 800-61 Revision 3 is in draft.
            </li>
            <li className="border-l border-[#c97a3a] pl-4">
              NIST SP 800-184, &ldquo;Guide for Cybersecurity Event Recovery,&rdquo;
              published December 2016, aligns with the Recover Function.
            </li>
            <li className="border-l border-[#c97a3a] pl-4">
              NIST SP 800-207, &ldquo;Zero Trust Architecture,&rdquo; published
              August 2020, is cross-referenced extensively in PR.AA and PR.IR.
            </li>
            <li className="border-l border-[#c97a3a] pl-4">
              NIST SP 800-218, &ldquo;Secure Software Development Framework (SSDF)
              Version 1.1,&rdquo; published February 2022, aligns with GV.SC for
              software supply chain outcomes — relevant after CVE-2021-44228
              (Log4Shell, disclosed December 9, 2021) and CVE-2023-34362 (MOVEit
              Transfer SQL injection, disclosed May 31, 2023).
            </li>
            <li className="border-l border-[#c97a3a] pl-4">
              The CISA Cross-Sector Cybersecurity Performance Goals (CPGs),
              version 1.0.1 released March 2023, are mapped to CSF Subcategories
              in the CISA CPG document and the CSF 2.0 Reference Tool at
              csrc.nist.gov.
            </li>
          </ul>
        </section>

        <section className="mb-14">
          <h2 className="mb-6 font-serif text-3xl tracking-tight text-[#f4f1ec]">
            What practitioners do with it
          </h2>
          <div className="space-y-5 text-base leading-[1.75] text-[#c5c0b8]">
            <p>
              CSF 2.0 is most often used in four operational modes.
            </p>
            <p>
              First, as a board-level reporting lattice. Senior security leaders
              use Current Profiles and Target Profiles to communicate posture to a
              board of directors or audit committee. The wheel diagram and the six
              Functions are deliberately legible to non-technical executives. A
              typical artifact is a heat-map of the 22 Categories rated Current
              versus Target, with budget asks tied to specific Category gaps. The
              Govern function gives the board its own column — board-level
              oversight is no longer buried inside Identify.
            </p>
            <p>
              Second, as a control crosswalk. Subcategories cross-reference to
              NIST SP 800-53 Rev. 5 controls, ISO/IEC 27001:2022 Annex A controls,
              CIS Controls v8 safeguards, and MITRE ATT&amp;CK techniques.
              Compliance teams use the CSF 2.0 Reference Tool at csrc.nist.gov to
              map a single Subcategory (such as PR.PS-06, &ldquo;Secure software
              development practices are integrated and their performance is
              monitored throughout the software development life cycle&rdquo;) to
              specific SSDF practices, 800-53 controls, and ISO clauses. The
              crosswalk lets one piece of evidence satisfy multiple frameworks.
            </p>
            <p>
              Third, as a procurement and third-party-risk vocabulary. The
              Cybersecurity Supply Chain Risk Management Category (GV.SC) is
              heavily used by procurement teams writing security clauses into
              vendor contracts. The companion document NIST SP 800-161 Rev. 1
              contains C-SCRM control templates that flow into Master Service
              Agreement riders. Vendors who can articulate their Current Profile
              against GV.SC win procurement evaluations against vendors who
              cannot.
            </p>
            <p>
              Fourth, as an incident postmortem framework. After a security
              incident, RS.AN (Incident Analysis) and RC.RP (Recovery Plan
              Execution) outcomes are the natural skeleton for a postmortem. The
              CSF 2.0 vocabulary lets an incident report be consumed by executives
              without translation. Detection gaps surface as DE.CM and DE.AE
              shortfalls. Containment delays surface as RS.MI shortfalls. Recovery
              failures surface as RC.RP and RC.CO shortfalls.
            </p>
            <p>
              Tools that operationalize CSF 2.0 include the official NIST CSF 2.0
              Reference Tool (csrc.nist.gov), the CSET (Cyber Security Evaluation
              Tool) from CISA, the open-source FAIR-CAM ontology from the FAIR
              Institute for quantitative risk overlay, ServiceNow&rsquo;s
              Integrated Risk Management module, Archer&rsquo;s CSF templates,
              Hyperproof&rsquo;s CSF crosswalk, and the open-source NIST CSF Excel
              workbooks published by community contributors. Most modern GRC
              platforms ship a CSF 2.0 template within months of the February 2024
              release.
            </p>
            <p>
              For software-heavy organizations, CSF 2.0 dovetails with the
              Software Bill of Materials (SBOM) executive mandate (Executive Order
              14028, May 2021) through GV.SC-04 and GV.SC-06. CISA&rsquo;s
              published guidance on SBOM minimum elements (July 2021) is the
              practical floor.
            </p>
            <p>
              For federal contractors, CSF 2.0 is not the compliance instrument —
              NIST SP 800-171 Rev. 3 (May 2024) is, for handling Controlled
              Unclassified Information under DFARS 252.204-7012. But CSF 2.0 is
              widely used by federal contractors as the higher-altitude story that
              contextualizes 800-171 work for executive audiences.
            </p>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="mb-6 font-serif text-3xl tracking-tight text-[#f4f1ec]">
            What it is NOT
          </h2>
          <div className="space-y-5 text-base leading-[1.75] text-[#c5c0b8]">
            <p>
              CSF 2.0 is not a certification. There is no &ldquo;NIST CSF
              certified&rdquo; credential at the organizational level. Vendors who
              claim certification are misrepresenting the framework. Practitioners
              can be trained on CSF — the NICCS catalog at niccs.cisa.gov lists
              CSF-aligned training — but the organization-level concept of
              &ldquo;certified to CSF&rdquo; does not exist by NIST design.
            </p>
            <p>
              CSF 2.0 is not a replacement for NIST SP 800-53, NIST SP 800-171,
              ISO/IEC 27001, SOC 2, PCI DSS, HIPAA Security Rule, or any other
              control standard. It is a higher-altitude outcome catalog. It maps
              to controls, but it does not enumerate them. An organization
              satisfying CSF 2.0 outcomes still owes the underlying control
              evidence to whatever regulator, customer, or auditor governs its
              environment.
            </p>
            <p>
              CSF 2.0 is not a maturity model. The four Implementation Tiers are
              explicitly not stages of maturity, despite frequent misuse in vendor
              marketing. An organization&rsquo;s correct Tier depends on its risk
              environment, mission, threat model, and resources. A Tier 2
              organization is not &ldquo;behind&rdquo; a Tier 4 organization. NIST
              is explicit on this point in CSWP 29 Section 3.3.
            </p>
            <p>
              CSF 2.0 is not a procurement checklist. The framework explicitly
              avoids prescribing tools, products, or vendors. Implementation
              Examples in SP 1299 are illustrative, not endorsing. Any vendor
              claiming their product &ldquo;delivers CSF compliance&rdquo; is
              overstating; their product may satisfy specific Subcategory outcomes
              when configured and operated correctly, which is a meaningful but
              bounded claim.
            </p>
            <p>
              CSF 2.0 is not US-only. Although the framework originated in a US
              Executive Order, version 2.0 explicitly broadens the audience beyond
              US critical infrastructure to organizations of any size, sector, or
              jurisdiction. NIST publishes translations of the Core into multiple
              languages. International adoption — particularly in regulated
              industries cross-mapped to ISO/IEC 27001:2022 — is significant.
            </p>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="mb-6 font-serif text-3xl tracking-tight text-[#f4f1ec]">
            Further reading
          </h2>
          <ul className="space-y-4 text-base leading-[1.65] text-[#c5c0b8]">
            <li>
              NIST Cybersecurity White Paper 29, &ldquo;The NIST Cybersecurity
              Framework (CSF) 2.0,&rdquo; February 26, 2024. Available at
              csrc.nist.gov/pubs/cswp/29/final.
            </li>
            <li>
              NIST Special Publication 1299, &ldquo;NIST Cybersecurity Framework
              2.0: Implementation Examples.&rdquo; Companion to CSWP 29.
            </li>
            <li>
              NIST Special Publication 1301, &ldquo;NIST Cybersecurity Framework
              2.0: A Guide to Creating Community Profiles.&rdquo; Companion to
              CSWP 29.
            </li>
            <li>
              NIST Special Publication 800-161 Revision 1, &ldquo;Cybersecurity
              Supply Chain Risk Management Practices for Systems and
              Organizations,&rdquo; May 2022.
            </li>
            <li>
              NIST Special Publication 800-61 Revision 2, &ldquo;Computer Security
              Incident Handling Guide,&rdquo; August 2012. (Revision 3 in draft.)
            </li>
            <li>
              NIST Special Publication 800-207, &ldquo;Zero Trust
              Architecture,&rdquo; August 2020.
            </li>
            <li>
              CISA Cross-Sector Cybersecurity Performance Goals (CPGs), version
              1.0.1, March 2023. Available at cisa.gov/cpg.
            </li>
            <li>
              NIST CSF 2.0 Reference Tool, csrc.nist.gov — interactive crosswalk
              between CSF Subcategories, NIST SP 800-53 Rev. 5, ISO/IEC
              27001:2022, MITRE ATT&amp;CK, and CIS Controls v8.
            </li>
          </ul>
        </section>

        <footer className="mt-20 border-t border-[#2a2724] pt-8 text-xs uppercase tracking-[0.18em] text-[#8a8680]">
          <div className="flex items-center justify-between">
            <Link
              href="/learn/cyber"
              className="hover:text-[#e7e5e0] transition-colors"
            >
              &larr; Back to Cyber
            </Link>
            <span className="text-[#4a4641]">
              AtomEons / Learn / Cyber / NIST CSF 2.0
            </span>
          </div>
        </footer>
      </article>
    </main>
  );
}