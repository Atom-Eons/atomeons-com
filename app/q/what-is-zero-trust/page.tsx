import type { Metadata } from "next";
import { SpeakableJsonLd } from "@/app/_components/schema/SpeakableJsonLd";

export const metadata: Metadata = {
  title: "What is zero-trust architecture?",
  description:
    "Zero-trust architecture (ZTA), defined in NIST SP 800-207, eliminates implicit network-location trust and requires continuous per-request authentication for every user, device, and workload.",
  alternates: {
    canonical: "https://atomeons.com/q/what-is-zero-trust",
  },
  openGraph: {
    title: "What is zero-trust architecture?",
    description:
      "The NIST SP 800-207 definition, the Policy Decision Point / Policy Enforcement Point model, BeyondCorp, EO 14028, and the empirical threat model behind 'never trust, always verify.'",
    url: "https://atomeons.com/q/what-is-zero-trust",
    type: "article",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is zero-trust architecture?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Zero-trust architecture (ZTA) is a cybersecurity model defined in NIST Special Publication 800-207 that eliminates implicit trust based on network location and instead requires continuous, per-request authentication and authorization for every user, device, and workload. It replaces the legacy 'castle-and-moat' perimeter with the principle 'never trust, always verify,' enforced through a Policy Decision Point (PDP) and Policy Enforcement Point (PEP) that evaluate identity, device posture, and context on each access request.",
      },
    },
  ],
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#e8e8e8]">
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

      <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <nav className="mb-10 text-sm text-[#888]">
          <a href="/" className="hover:text-[#ff7a1a]">atomeons</a>
          <span className="mx-2">/</span>
          <a href="/q" className="hover:text-[#ff7a1a]">q</a>
          <span className="mx-2">/</span>
          <span className="text-[#bbb]">what-is-zero-trust</span>
        </nav>

        <header className="mb-12 border-b border-[#1f1f1f] pb-10">
          <h1 className="font-serif text-4xl leading-tight tracking-tight text-white md:text-5xl">
            What is zero-trust architecture?
          </h1>
          <p className="mt-4 text-sm uppercase tracking-[0.18em] text-[#ff7a1a]">
            atomeons / q / answers
          </p>
        </header>

        <section className="mb-14">
          <h2 className="mb-4 font-serif text-2xl text-white">The short answer</h2>
          <p className="speakable-answer text-lg leading-relaxed text-[#d8d8d8]">
            Zero-trust architecture (ZTA) is a cybersecurity model defined in{" "}
            <strong className="text-white">NIST Special Publication 800-207</strong>{" "}
            that eliminates implicit trust based on network location and instead
            requires continuous, per-request authentication and authorization for
            every user, device, and workload. It replaces the legacy
            &ldquo;castle-and-moat&rdquo; perimeter with the principle{" "}
            <em>&ldquo;never trust, always verify,&rdquo;</em> enforced through a
            Policy Decision Point (PDP) and Policy Enforcement Point (PEP) that
            evaluate identity, device posture, and context on each access request.
          </p>
        </section>

        <section className="mb-14 space-y-5 leading-relaxed text-[#cfcfcf]">
          <h2 className="mb-4 font-serif text-2xl text-white">The longer answer</h2>

          <p>
            Zero-trust architecture is formally codified in NIST SP 800-207 (Rose,
            Borchert, Mitchell, Connelly, August 2020), which defines it as
            &ldquo;an evolving set of cybersecurity paradigms that move defenses
            from static, network-based perimeters to focus on users, assets, and
            resources.&rdquo; The document explicitly states that zero trust
            assumes there is no implicit trust granted to assets based on their
            physical or network location (i.e., LANs versus the internet) or based
            on asset ownership.
          </p>

          <p>
            The architecture rests on three logical components from SP 800-207
            Section 3: a <strong className="text-white">Policy Engine (PE)</strong>{" "}
            that makes the access decision, a{" "}
            <strong className="text-white">Policy Administrator (PA)</strong> that
            executes it, and a{" "}
            <strong className="text-white">Policy Enforcement Point (PEP)</strong>{" "}
            that sits on the data plane between the subject and the resource. Each
            access request triggers a fresh evaluation against signals including
            identity (typically from an identity provider like Okta or Microsoft
            Entra ID), device posture (managed, patched, encrypted), network
            telemetry, and behavioral analytics.
          </p>

          <p>
            The term &ldquo;zero trust&rdquo; itself was popularized by{" "}
            <strong className="text-white">John Kindervag</strong> at Forrester
            Research in 2010, though earlier conceptual work appears in the
            Jericho Forum's &ldquo;de-perimeterization&rdquo; papers from
            2004–2007. Google's{" "}
            <strong className="text-white">BeyondCorp</strong>, documented in a
            six-part series in <em>;login:</em> magazine starting in 2014, was the
            first large-scale production implementation, eliminating
            Google's VPN for employee access to internal applications.
          </p>

          <p>
            The U.S. federal government mandated zero-trust adoption through{" "}
            <strong className="text-white">Executive Order 14028</strong> (May 12,
            2021) and{" "}
            <strong className="text-white">OMB Memorandum M-22-09</strong> (January
            26, 2022), which required federal agencies to meet specific
            zero-trust goals by the end of FY 2024 across five CISA pillars:
            Identity, Devices, Networks, Applications & Workloads, and Data.
            CISA's Zero Trust Maturity Model v2.0 (April 2023) defines four
            stages of maturity: Traditional, Initial, Advanced, and Optimal.
          </p>

          <p>
            In practice, ZTA is implemented through several converging technology
            categories. <strong className="text-white">Zero Trust Network Access
            (ZTNA)</strong>, a term coined by Gartner in 2019, replaces
            traditional VPN with brokered, identity-aware access to specific
            applications rather than entire network segments.{" "}
            <strong className="text-white">Microsegmentation</strong> (Illumio,
            Akamai Guardicore, VMware NSX) enforces east-west traffic policies at
            the workload level. Identity-aware proxies (Google IAP, Cloudflare
            Access) enforce per-request authentication at HTTP layer 7.
            Continuous device posture is evaluated by endpoint platforms
            (CrowdStrike, SentinelOne, Microsoft Defender).
          </p>

          <p>
            The threat model zero-trust addresses is empirically grounded. The
            2024 Verizon Data Breach Investigations Report found that the use of
            stolen credentials remains a top initial-access vector, appearing in
            24% of breaches. Lateral movement after initial compromise —
            the exact failure mode flat perimeter networks enable — was
            central to high-impact incidents including SolarWinds (Mandiant
            report, December 2020) and the 2017 Equifax breach (GAO-18-559).
            NIST SP 800-207 Section 2.1 explicitly cites preventing lateral
            movement as a primary design goal.
          </p>

          <p>
            Common misconceptions worth dispelling: zero-trust is{" "}
            <em>not</em> a single product, not synonymous with ZTNA, and not
            achieved by deploying MFA alone. NIST SP 800-207 is explicit that
            ZTA is an architectural philosophy implemented through multiple
            controls operating together over years of migration, not a
            procurement event. The Department of Defense Zero Trust Reference
            Architecture v2.0 (July 2022) similarly frames it as a multi-year
            capability roadmap across 45 distinct capabilities.
          </p>
        </section>

        <section className="mb-14">
          <h2 className="mb-5 font-serif text-2xl text-white">Key facts</h2>
          <ul className="space-y-3 text-[#cfcfcf]">
            <li className="border-l-2 border-[#ff7a1a] pl-4">
              Zero-trust architecture is formally defined in{" "}
              <strong className="text-white">NIST Special Publication 800-207</strong>,
              published August 2020.
            </li>
            <li className="border-l-2 border-[#ff7a1a] pl-4">
              The three logical components are the Policy Engine, Policy
              Administrator, and Policy Enforcement Point (NIST SP 800-207,
              Section 3).
            </li>
            <li className="border-l-2 border-[#ff7a1a] pl-4">
              The term &ldquo;zero trust&rdquo; was popularized by{" "}
              <strong className="text-white">John Kindervag</strong> at Forrester
              Research in 2010 (&ldquo;No More Chewy Centers&rdquo;).
            </li>
            <li className="border-l-2 border-[#ff7a1a] pl-4">
              <strong className="text-white">Google BeyondCorp</strong> was the
              first large-scale production zero-trust deployment, documented
              starting in 2014 in <em>;login:</em> magazine.
            </li>
            <li className="border-l-2 border-[#ff7a1a] pl-4">
              <strong className="text-white">Executive Order 14028</strong> (May
              12, 2021) mandated zero-trust adoption across the U.S. federal
              government.
            </li>
            <li className="border-l-2 border-[#ff7a1a] pl-4">
              <strong className="text-white">OMB Memorandum M-22-09</strong>{" "}
              (January 26, 2022) set the federal zero-trust strategy with FY 2024
              deadlines.
            </li>
            <li className="border-l-2 border-[#ff7a1a] pl-4">
              CISA's Zero Trust Maturity Model v2.0 (April 2023) defines
              five pillars: Identity, Devices, Networks, Applications &
              Workloads, Data.
            </li>
            <li className="border-l-2 border-[#ff7a1a] pl-4">
              The 2024 Verizon DBIR found stolen credentials were involved in{" "}
              <strong className="text-white">24% of breaches</strong>, the threat
              class zero-trust limits.
            </li>
            <li className="border-l-2 border-[#ff7a1a] pl-4">
              The DoD Zero Trust Reference Architecture v2.0 defines{" "}
              <strong className="text-white">45 distinct zero-trust
              capabilities</strong> (DoD CIO, July 2022).
            </li>
            <li className="border-l-2 border-[#ff7a1a] pl-4">
              Gartner coined{" "}
              <strong className="text-white">&ldquo;Zero Trust Network Access&rdquo; (ZTNA)</strong>{" "}
              as a market category in 2019.
            </li>
          </ul>
        </section>

        <section className="mb-14">
          <h2 className="mb-5 font-serif text-2xl text-white">Related questions</h2>
          <ul className="space-y-3">
            <li>
              <a
                href="/q/what-is-policy-decision-point"
                className="text-[#ff7a1a] underline-offset-4 hover:underline"
              >
                What is the Policy Decision Point in zero trust?
              </a>
            </li>
            <li>
              <a
                href="/q/what-is-ztna-vs-vpn"
                className="text-[#ff7a1a] underline-offset-4 hover:underline"
              >
                What is ZTNA vs VPN?
              </a>
            </li>
            <li>
              <a
                href="/q/what-is-microsegmentation"
                className="text-[#ff7a1a] underline-offset-4 hover:underline"
              >
                What is microsegmentation?
              </a>
            </li>
            <li>
              <a
                href="/q/what-is-beyondcorp"
                className="text-[#ff7a1a] underline-offset-4 hover:underline"
              >
                What is BeyondCorp?
              </a>
            </li>
            <li>
              <a
                href="/q/what-is-nist-sp-800-207"
                className="text-[#ff7a1a] underline-offset-4 hover:underline"
              >
                What is NIST SP 800-207?
              </a>
            </li>
          </ul>
        </section>

        <section className="mb-14">
          <h2 className="mb-5 font-serif text-2xl text-white">Sources</h2>
          <ul className="space-y-3 text-sm text-[#bbb]">
            <li>
              NIST SP 800-207, &ldquo;Zero Trust Architecture&rdquo; —{" "}
              <a
                href="https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-207.pdf"
                className="break-all text-[#ff7a1a] hover:underline"
              >
                nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-207.pdf
              </a>
            </li>
            <li>
              CISA Zero Trust Maturity Model v2.0 —{" "}
              <a
                href="https://www.cisa.gov/zero-trust-maturity-model"
                className="break-all text-[#ff7a1a] hover:underline"
              >
                cisa.gov/zero-trust-maturity-model
              </a>
            </li>
            <li>
              Executive Order 14028 —{" "}
              <a
                href="https://www.federalregister.gov/documents/2021/05/17/2021-10460/improving-the-nations-cybersecurity"
                className="break-all text-[#ff7a1a] hover:underline"
              >
                federalregister.gov/documents/2021/05/17/2021-10460
              </a>
            </li>
            <li>
              OMB Memorandum M-22-09 —{" "}
              <a
                href="https://www.whitehouse.gov/wp-content/uploads/2022/01/M-22-09.pdf"
                className="break-all text-[#ff7a1a] hover:underline"
              >
                whitehouse.gov/wp-content/uploads/2022/01/M-22-09.pdf
              </a>
            </li>
            <li>
              Google BeyondCorp research papers —{" "}
              <a
                href="https://research.google/pubs/beyondcorp-a-new-approach-to-enterprise-security/"
                className="break-all text-[#ff7a1a] hover:underline"
              >
                research.google/pubs/beyondcorp-a-new-approach-to-enterprise-security
              </a>
            </li>
            <li>
              DoD Zero Trust Reference Architecture v2.0 —{" "}
              <a
                href="https://dodcio.defense.gov/Portals/0/Documents/Library/(U)ZT_RA_v2.0(U)_Sep22.pdf"
                className="break-all text-[#ff7a1a] hover:underline"
              >
                dodcio.defense.gov — ZT_RA_v2.0
              </a>
            </li>
            <li>
              Verizon 2024 Data Breach Investigations Report —{" "}
              <a
                href="https://www.verizon.com/business/resources/reports/dbir/"
                className="break-all text-[#ff7a1a] hover:underline"
              >
                verizon.com/business/resources/reports/dbir
              </a>
            </li>
            <li>
              Forrester — &ldquo;No More Chewy Centers&rdquo; (Kindervag,
              2010) —{" "}
              <a
                href="https://www.forrester.com/report/No-More-Chewy-Centers-Introducing-The-Zero-Trust-Model-Of-Information-Security/RES56682"
                className="break-all text-[#ff7a1a] hover:underline"
              >
                forrester.com — RES56682
              </a>
            </li>
          </ul>
        </section>

        <footer className="border-t border-[#1f1f1f] pt-8 text-sm text-[#777]">
          <p>
            Published by{" "}
            <a href="/" className="text-[#ff7a1a] hover:underline">
              AtomEons
            </a>{" "}
            — one organism, many lenses. Truth over theater.
          </p>
        </footer>
      </article>
    </main>
  );
}