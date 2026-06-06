import type { Metadata } from "next";
import { SpeakableJsonLd } from "@/app/_components/schema/SpeakableJsonLd";

export const metadata: Metadata = {
  title: "What Is MITRE ATT&CK?",
  description:
    "MITRE ATT&CK is a free knowledge base of adversary tactics, techniques, and procedures maintained by The MITRE Corporation, built from real-world cyberattack observations.",
  alternates: {
    canonical: "https://atomeons.com/q/what-is-mitre-attack",
  },
  openGraph: {
    title: "What Is MITRE ATT&CK?",
    description:
      "The de facto taxonomy for describing how cyberattacks unfold. 14 tactics, 200+ techniques, used by NIST, CISA, and every major EDR vendor.",
    url: "https://atomeons.com/q/what-is-mitre-attack",
    type: "article",
  },
};

const SHORT_ANSWER =
  "MITRE ATT&CK is a free, globally accessible knowledge base of adversary tactics, techniques, and procedures (TTPs) maintained by The MITRE Corporation, built from real-world observations of cyberattacks. It organizes attacker behavior into 14 enterprise tactics (the \"why\") and over 200 techniques with 400+ sub-techniques (the \"how\"), giving defenders, threat hunters, and red teams a shared vocabulary for describing how intrusions actually unfold.";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is MITRE ATT&CK?",
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
      name: "Q",
      item: "https://atomeons.com/q",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "What Is MITRE ATT&CK?",
      item: "https://atomeons.com/q/what-is-mitre-attack",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <SpeakableJsonLd
        url="https://atomeons.com/q/what"
        name="What is What?"
        description="Voice-readable short answer plus technical context."
        cssSelectors={[".speakable-answer"]}
      />

      <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <nav className="mb-8 text-xs uppercase tracking-[0.18em] text-[#888]">
          <a href="/" className="hover:text-[#00d4ff]">
            AtomEons
          </a>
          <span className="mx-2 text-[#444]">/</span>
          <a href="/q" className="hover:text-[#00d4ff]">
            Q
          </a>
          <span className="mx-2 text-[#444]">/</span>
          <span className="text-[#bbb]">what-is-mitre-attack</span>
        </nav>

        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white leading-tight">
          What Is MITRE ATT&CK?
        </h1>

        <p className="mt-4 text-sm uppercase tracking-[0.18em] text-[#00d4ff]">
          AtomEons Research / Cybersecurity Foundations
        </p>

        <section className="mt-12">
          <h2 className="text-xs uppercase tracking-[0.22em] text-[#888]">
            The short answer
          </h2>
          <p className="mt-3 text-lg md:text-xl text-[#e8e8e8] leading-relaxed border-l-2 border-[#ff7a1a] pl-5">
            {SHORT_ANSWER}
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold text-white">The longer answer</h2>
          <div className="mt-5 space-y-5 text-[#cfcfcf] leading-relaxed">
            <p>
              MITRE ATT&CK — short for <strong className="text-white">Adversarial Tactics, Techniques, and Common Knowledge</strong> — was first published by The MITRE Corporation in 2013 as an internal research project to model post-compromise adversary behavior on Windows enterprise networks. It was publicly released in 2015 and has since become the de facto taxonomy for describing what attackers do once they've gained a foothold.
            </p>
            <p>
              Unlike older models like the Lockheed Martin Cyber Kill Chain (which is linear and pre-compromise focused), ATT&CK is a <em>matrix</em>, not a chain. Its core structural unit is the tactic-technique pair. Tactics describe the adversary's tactical goal at a given moment — <em>Initial Access</em>, <em>Execution</em>, <em>Persistence</em>, <em>Privilege Escalation</em>, <em>Defense Evasion</em>, <em>Credential Access</em>, <em>Discovery</em>, <em>Lateral Movement</em>, <em>Collection</em>, <em>Command and Control</em>, <em>Exfiltration</em>, <em>Impact</em>, plus the later additions <em>Reconnaissance</em> and <em>Resource Development</em>. Techniques describe how — for example, T1566 (Phishing) under Initial Access, with sub-techniques T1566.001 (Spearphishing Attachment), T1566.002 (Spearphishing Link), and so on.
            </p>
            <p>
              ATT&CK splits into three platform matrices: <strong className="text-white">Enterprise</strong> (Windows, macOS, Linux, cloud platforms like AWS/Azure/GCP/Office 365/Google Workspace, network devices, and containers), <strong className="text-white">Mobile</strong> (Android and iOS), and <strong className="text-white">ICS</strong> (industrial control systems, released in 2020). Each technique entry contains a description, procedure examples from named threat groups, mitigations mapped to NIST SP 800-53 controls, and detection guidance tied to data sources like process creation logs, network traffic, and authentication events.
            </p>
            <p>
              The framework is updated roughly twice a year. As of v15 (May 2024), Enterprise ATT&CK contained 14 tactics, 202 techniques, and 435 sub-techniques. MITRE also publishes companion resources: <strong className="text-white">ATT&CK Groups</strong> (140+ tracked threat actors like APT28, Lazarus, FIN7), <strong className="text-white">ATT&CK Software</strong> (700+ pieces of malware and dual-use tools mapped to techniques), and <strong className="text-white">ATT&CK Navigator</strong> (an interactive tool for layering techniques onto the matrix to visualize coverage and detection gaps).
            </p>
            <p>
              Adoption is unusually broad. NIST cites ATT&CK directly in SP 800-53 Rev. 5 and SP 800-150. CISA maps its Known Exploited Vulnerabilities catalog and threat advisories to ATT&CK technique IDs. Every major EDR vendor (CrowdStrike Falcon, Microsoft Defender, SentinelOne, Palo Alto Cortex XDR) tags detections with technique IDs. Red team tools like Atomic Red Team (Red Canary), Caldera (MITRE's own automated adversary emulation platform), and the commercial breach-and-attack-simulation market (AttackIQ, SafeBreach, Cymulate) are organized around ATT&CK coverage.
            </p>
            <p>
              MITRE also runs the <strong className="text-white">ATT&CK Evaluations</strong> program, where vendors' EDR products are tested against scripted emulations of real threat actors (Carbanak+FIN7, Wizard Spider+Sandworm, Turla, APT29) with public per-technique results. MITRE does not assign winners — it publishes raw telemetry visibility data.
            </p>
            <p>
              Operationally, ATT&CK serves four overlapping use cases: <strong className="text-white">threat intelligence</strong> (describing adversary behavior in a structure that survives the IOC half-life problem), <strong className="text-white">detection engineering</strong> (rules tied to techniques, not hashes), <strong className="text-white">red team / purple team exercises</strong> (planning emulation scenarios), and <strong className="text-white">gap analysis</strong> (Navigator heatmaps to identify which techniques your tooling can see). It is not a maturity model and not a compliance framework — it is a vocabulary.
            </p>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold text-white">Key facts</h2>
          <ul className="mt-5 space-y-3 text-[#cfcfcf] leading-relaxed">
            <li className="border-l border-[#222] pl-4">
              ATT&CK was first publicly released by The MITRE Corporation in 2015 after starting as an internal Windows-focused research project in 2013 (MITRE Corp., &ldquo;MITRE ATT&CK: Design and Philosophy,&rdquo; MP180360R1, March 2020).
            </li>
            <li className="border-l border-[#222] pl-4">
              The framework is published under a permissive license allowing commercial reuse with attribution (ATT&CK Terms of Use, attack.mitre.org/resources/terms-of-use/).
            </li>
            <li className="border-l border-[#222] pl-4">
              Enterprise ATT&CK v15 contains 14 tactics, 202 techniques, and 435 sub-techniques across Windows, macOS, Linux, Cloud, Network, and Containers (MITRE ATT&CK v15 release notes, May 2024).
            </li>
            <li className="border-l border-[#222] pl-4">
              ATT&CK techniques are referenced directly in NIST SP 800-53 Rev. 5 as a complementary control mapping (NIST SP 800-53 Rev. 5, September 2020).
            </li>
            <li className="border-l border-[#222] pl-4">
              CISA Joint Cybersecurity Advisories explicitly map observed adversary behavior to ATT&CK technique IDs as standard practice (cisa.gov/news-events/cybersecurity-advisories).
            </li>
            <li className="border-l border-[#222] pl-4">
              MITRE Caldera is the open-source adversary emulation platform built directly on ATT&CK (caldera.mitre.org).
            </li>
            <li className="border-l border-[#222] pl-4">
              The ATT&CK Evaluations program publicly tests EDR vendors against scripted emulations of named threat actors including APT29, Carbanak+FIN7, and Wizard Spider+Sandworm (MITRE Engenuity, attackevals.mitre-engenuity.org).
            </li>
            <li className="border-l border-[#222] pl-4">
              ATT&CK for ICS was released in January 2020 to extend the framework to industrial control system environments.
            </li>
            <li className="border-l border-[#222] pl-4">
              Pre-compromise tactics (Reconnaissance and Resource Development) were added to Enterprise ATT&CK in October 2020, replacing the deprecated PRE-ATT&CK matrix (MITRE ATT&CK v8 release notes, October 2020).
            </li>
            <li className="border-l border-[#222] pl-4">
              ATT&CK Navigator is the official open-source web tool for visualizing technique coverage as layered matrix heatmaps (github.com/mitre-attack/attack-navigator).
            </li>
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold text-white">Related questions</h2>
          <ul className="mt-5 space-y-2">
            <li>
              <a href="/q/what-is-cyber-kill-chain" className="text-[#00d4ff] hover:underline">
                What is the Cyber Kill Chain?
              </a>
            </li>
            <li>
              <a href="/q/what-is-nist-csf" className="text-[#00d4ff] hover:underline">
                What is the NIST Cybersecurity Framework?
              </a>
            </li>
            <li>
              <a href="/q/what-is-threat-intelligence" className="text-[#00d4ff] hover:underline">
                What is threat intelligence?
              </a>
            </li>
            <li>
              <a href="/q/what-is-edr" className="text-[#00d4ff] hover:underline">
                What is an EDR?
              </a>
            </li>
            <li>
              <a href="/q/what-is-purple-teaming" className="text-[#00d4ff] hover:underline">
                What is purple teaming?
              </a>
            </li>
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold text-white">Sources</h2>
          <ul className="mt-5 space-y-2 text-[#cfcfcf]">
            <li>
              <a href="https://attack.mitre.org/" className="text-[#00d4ff] hover:underline" rel="noopener noreferrer">
                MITRE ATT&CK official site
              </a>
            </li>
            <li>
              <a href="https://attack.mitre.org/docs/ATTACK_Design_and_Philosophy_March_2020.pdf" className="text-[#00d4ff] hover:underline" rel="noopener noreferrer">
                MITRE ATT&CK Design and Philosophy (MP180360R1)
              </a>
            </li>
            <li>
              <a href="https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final" className="text-[#00d4ff] hover:underline" rel="noopener noreferrer">
                NIST SP 800-53 Rev. 5
              </a>
            </li>
            <li>
              <a href="https://www.cisa.gov/news-events/cybersecurity-advisories" className="text-[#00d4ff] hover:underline" rel="noopener noreferrer">
                CISA Cybersecurity Advisories
              </a>
            </li>
            <li>
              <a href="https://github.com/mitre-attack/attack-navigator" className="text-[#00d4ff] hover:underline" rel="noopener noreferrer">
                MITRE ATT&CK Navigator (GitHub)
              </a>
            </li>
            <li>
              <a href="https://caldera.mitre.org/" className="text-[#00d4ff] hover:underline" rel="noopener noreferrer">
                MITRE Caldera
              </a>
            </li>
            <li>
              <a href="https://attackevals.mitre-engenuity.org/" className="text-[#00d4ff] hover:underline" rel="noopener noreferrer">
                MITRE Engenuity ATT&CK Evaluations
              </a>
            </li>
            <li>
              <a href="https://github.com/redcanaryco/atomic-red-team" className="text-[#00d4ff] hover:underline" rel="noopener noreferrer">
                Red Canary Atomic Red Team
              </a>
            </li>
          </ul>
        </section>

        <footer className="mt-20 border-t border-[#222] pt-8 text-xs text-[#666]">
          <p>
            AtomEons Research — atomeons.com/q. This page is part of an open knowledge index. Last reviewed against MITRE ATT&CK v15.
          </p>
        </footer>
      </article>
    </main>
  );
}