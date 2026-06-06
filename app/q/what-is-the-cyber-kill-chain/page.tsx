import type { Metadata } from "next";
import { SpeakableJsonLd } from "@/app/_components/schema/SpeakableJsonLd";

const QUESTION = "What is the Cyber Kill Chain?";
const SHORT_ANSWER =
  "The Cyber Kill Chain is a seven-stage model of cyber intrusion published by Lockheed Martin in 2011, defining the sequence an adversary must complete to achieve an objective: Reconnaissance, Weaponization, Delivery, Exploitation, Installation, Command and Control (C2), and Actions on Objectives. Breaking any link in the chain disrupts the attack, which is why it became the foundational framework for intelligence-driven defense before MITRE ATT&CK extended it with post-compromise behavior.";
const CANONICAL = "https://atomeons.com/q/what-is-the-cyber-kill-chain";

export const metadata: Metadata = {
  title: QUESTION,
  description: SHORT_ANSWER,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: QUESTION,
    description: SHORT_ANSWER,
    url: CANONICAL,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: QUESTION,
    description: SHORT_ANSWER,
  },
};

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

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "AtomEons", item: "https://atomeons.com" },
    { "@type": "ListItem", position: 2, name: "Questions", item: "https://atomeons.com/q" },
    { "@type": "ListItem", position: 3, name: QUESTION, item: CANONICAL },
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

      <article className="mx-auto max-w-3xl px-6 py-16">
        <nav className="mb-8 text-xs uppercase tracking-[0.2em] text-[#7a7a7a]">
          <a href="/" className="hover:text-[#ff6b1a]">AtomEons</a>
          <span className="mx-2 text-[#3a3a3a]">/</span>
          <a href="/q" className="hover:text-[#ff6b1a]">Questions</a>
        </nav>

        <h1 className="mb-6 font-serif text-4xl leading-tight text-white md:text-5xl">
          {QUESTION}
        </h1>

        <section className="mb-10 border-l-2 border-[#ff6b1a] bg-[#141414] p-6">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6b1a]">
            The short answer
          </h2>
          <p className="speakable-answer text-lg leading-relaxed text-[#e8e8e8]">{SHORT_ANSWER}</p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-serif text-2xl text-white">The longer answer</h2>
          <div className="space-y-5 text-[#cfcfcf] leading-relaxed">
            <p>
              The Cyber Kill Chain was introduced by Eric M. Hutchins, Michael J. Cloppert, and Rohan
              M. Amin of Lockheed Martin in the 2011 paper{" "}
              <em>"Intelligence-Driven Computer Network Defense Informed by Analysis of Adversary
              Campaigns and Intrusion Kill Chains"</em>, presented at the 6th International
              Conference on Information Warfare and Security. The authors adapted the U.S.
              military's "kill chain" doctrine — find, fix, track, target, engage, assess (F2T2EA) —
              into a defender's framework for advanced persistent threats (APTs).
            </p>
            <p>
              The seven stages are sequential and dependent.{" "}
              <strong className="text-white">Reconnaissance</strong> is target research — OSINT,
              harvesting employee emails, scanning for exposed services.{" "}
              <strong className="text-white">Weaponization</strong> pairs a remote-access trojan
              with an exploit, typically into a deliverable payload such as a malicious PDF or
              Office macro. <strong className="text-white">Delivery</strong> is transmission —
              spearphishing email, USB drop, watering-hole compromise.{" "}
              <strong className="text-white">Exploitation</strong> triggers code execution, often
              against a known CVE in a browser, document reader, or server.{" "}
              <strong className="text-white">Installation</strong> establishes persistence via a
              backdoor, scheduled task, or registry run key.{" "}
              <strong className="text-white">Command and Control</strong> opens an outbound channel —
              historically HTTPS beacons or DNS tunneling — giving the operator hands-on-keyboard
              access. <strong className="text-white">Actions on Objectives</strong> is the final
              stage: data exfiltration, lateral movement, destruction, or ransomware detonation.
            </p>
            <p>
              The model's key innovation was treating intrusion as a process with breakable
              dependencies, not a single event. Lockheed argued that <em>any</em> disruption —
              block, deny, degrade, deceive, contain — earlier in the chain costs the defender less
              and the adversary more. The defense matrix mapped the seven stages against six
              courses of action (detect, deny, disrupt, degrade, deceive, destroy), producing a
              42-cell planning grid that became standard in SOC playbooks at large enterprises and
              government agencies.
            </p>
            <p>
              The framework has well-documented limitations. It is malware-and-perimeter centric,
              assumes a linear path, underweights insider threats, and stops at the perimeter
              breach — saying little about lateral movement, privilege escalation, or
              living-off-the-land techniques. Those gaps were filled by{" "}
              <strong className="text-white">MITRE ATT&CK</strong>, first released publicly in
              2015 and now maintained as a knowledge base of 14 tactics and over 600 techniques
              mapped to real-world adversary tradecraft. ATT&CK does not replace the Kill
              Chain; the two are commonly used together, with the Kill Chain framing the campaign
              arc and ATT&CK detailing the techniques within each stage.
            </p>
            <p>
              A 2017 variant, the <strong className="text-white">Unified Kill Chain</strong> by Paul
              Pols (Fox-IT / Leiden University master's thesis), explicitly merged Lockheed's chain
              with ATT&CK into 18 phases including pivoting, privilege escalation, and
              exfiltration — addressing the linearity critique. Other extensions include the{" "}
              <strong className="text-white">Industrial Control System (ICS) Cyber Kill Chain</strong>{" "}
              by Michael J. Assante and Robert M. Lee (SANS, 2015), which adds a second stage
              covering ICS attack development, validation, and execution against operational
              technology — the model later used to dissect the December 2015 Ukraine power grid
              attack and the 2017 TRITON/TRISIS attack on a Saudi petrochemical safety system.
            </p>
            <p>
              In modern practice, the Kill Chain remains the lingua franca for executive briefings
              and threat intelligence reporting because it tells a coherent story in seven boxes.
              Tier-1 analysts work the chain; Tier-2/3 analysts pivot to ATT&CK. Detection
              engineers map alerts to both. The 2024 Verizon DBIR continues to classify breach
              patterns against kill-chain-style stages, and CISA threat advisories still reference
              the Lockheed model when narrating campaign timelines.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-serif text-2xl text-white">Key facts</h2>
          <ul className="space-y-3 text-[#cfcfcf]">
            <li className="border-l border-[#2a2a2a] pl-4">
              The Cyber Kill Chain was published in 2011 by Hutchins, Cloppert, and Amin of Lockheed
              Martin in <em>Leading Issues in Information Warfare & Security Research</em>,
              Vol. 1 (LM-White-Paper-Intel-Driven-Defense).
            </li>
            <li className="border-l border-[#2a2a2a] pl-4">
              The framework adapts the U.S. military F2T2EA targeting cycle (Joint Publication
              3-60, <em>Joint Targeting</em>).
            </li>
            <li className="border-l border-[#2a2a2a] pl-4">
              It contains exactly seven stages — Reconnaissance, Weaponization, Delivery,
              Exploitation, Installation, Command and Control, Actions on Objectives.
            </li>
            <li className="border-l border-[#2a2a2a] pl-4">
              MITRE ATT&CK, first released January 2015 and maintained by The MITRE
              Corporation, currently catalogs 14 enterprise tactics (MITRE ATT&CK v15, 2024).
            </li>
            <li className="border-l border-[#2a2a2a] pl-4">
              The Unified Kill Chain (Pols, 2017, Cyber Security Academy / Fox-IT) extends
              Lockheed's chain to 18 phases.
            </li>
            <li className="border-l border-[#2a2a2a] pl-4">
              The ICS Cyber Kill Chain was introduced by Assante and Lee in the SANS Reading Room
              paper "The Industrial Control System Cyber Kill Chain" (October 2015).
            </li>
            <li className="border-l border-[#2a2a2a] pl-4">
              NIST SP 800-150 (<em>Guide to Cyber Threat Information Sharing</em>, 2016) references
              kill-chain models as a structuring framework for indicator sharing.
            </li>
            <li className="border-l border-[#2a2a2a] pl-4">
              The 2015 Ukraine power grid attack and 2017 TRITON attack (Schneider Electric
              Triconex) are the canonical case studies for ICS Kill Chain analysis (CISA ICS-CERT
              IR-ALERT-H-16-056-01; FireEye/Mandiant TRITON report, 2017).
            </li>
            <li className="border-l border-[#2a2a2a] pl-4">
              Lockheed's 2011 paper explicitly defines the 6×7 "courses of action matrix" pairing
              detect, deny, disrupt, degrade, deceive, destroy against the seven kill chain phases.
            </li>
            <li className="border-l border-[#2a2a2a] pl-4">
              The Verizon Data Breach Investigations Report (DBIR), published annually since 2008,
              classifies breach patterns along kill-chain-aligned action varieties.
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-serif text-2xl text-white">Related questions</h2>
          <ul className="space-y-2">
            <li>
              <a href="/q/what-is-mitre-attack" className="text-[#ff6b1a] hover:underline">
                What is MITRE ATT&CK?
              </a>
            </li>
            <li>
              <a href="/q/what-is-the-unified-kill-chain" className="text-[#ff6b1a] hover:underline">
                What is the Unified Kill Chain?
              </a>
            </li>
            <li>
              <a
                href="/q/what-is-an-advanced-persistent-threat"
                className="text-[#ff6b1a] hover:underline"
              >
                What is an Advanced Persistent Threat (APT)?
              </a>
            </li>
            <li>
              <a
                href="/q/what-is-the-ics-cyber-kill-chain"
                className="text-[#ff6b1a] hover:underline"
              >
                What is the ICS Cyber Kill Chain?
              </a>
            </li>
            <li>
              <a
                href="/q/what-is-command-and-control-traffic"
                className="text-[#ff6b1a] hover:underline"
              >
                What is Command and Control (C2) traffic?
              </a>
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-serif text-2xl text-white">Sources</h2>
          <ul className="space-y-2 text-sm text-[#9a9a9a]">
            <li>
              Hutchins, Cloppert, Amin.{" "}
              <em>
                Intelligence-Driven Computer Network Defense Informed by Analysis of Adversary
                Campaigns and Intrusion Kill Chains.
              </em>{" "}
              Lockheed Martin, 2011.{" "}
              <a
                href="https://www.lockheedmartin.com/content/dam/lockheed-martin/rms/documents/cyber/LM-White-Paper-Intel-Driven-Defense.pdf"
                className="text-[#ff6b1a] hover:underline"
              >
                lockheedmartin.com
              </a>
            </li>
            <li>
              MITRE ATT&CK Enterprise Matrix.{" "}
              <a
                href="https://attack.mitre.org/matrices/enterprise/"
                className="text-[#ff6b1a] hover:underline"
              >
                attack.mitre.org
              </a>
            </li>
            <li>
              Pols, Paul. <em>The Unified Kill Chain.</em> Cyber Security Academy / Fox-IT, 2017.{" "}
              <a
                href="https://www.unifiedkillchain.com/assets/The-Unified-Kill-Chain.pdf"
                className="text-[#ff6b1a] hover:underline"
              >
                unifiedkillchain.com
              </a>
            </li>
            <li>
              Assante, M. J., and Lee, R. M.{" "}
              <em>The Industrial Control System Cyber Kill Chain.</em> SANS Institute, October 2015.{" "}
              <a
                href="https://www.sans.org/white-papers/36297/"
                className="text-[#ff6b1a] hover:underline"
              >
                sans.org
              </a>
            </li>
            <li>
              NIST Special Publication 800-150,{" "}
              <em>Guide to Cyber Threat Information Sharing.</em> October 2016.{" "}
              <a
                href="https://doi.org/10.6028/NIST.SP.800-150"
                className="text-[#ff6b1a] hover:underline"
              >
                doi.org/10.6028/NIST.SP.800-150
              </a>
            </li>
            <li>
              CISA Alert IR-ALERT-H-16-056-01,{" "}
              <em>Cyber-Attack Against Ukrainian Critical Infrastructure.</em>{" "}
              <a
                href="https://www.cisa.gov/news-events/ics-alerts/ir-alert-h-16-056-01"
                className="text-[#ff6b1a] hover:underline"
              >
                cisa.gov
              </a>
            </li>
            <li>
              Verizon. <em>2024 Data Breach Investigations Report.</em>{" "}
              <a
                href="https://www.verizon.com/business/resources/reports/dbir/"
                className="text-[#ff6b1a] hover:underline"
              >
                verizon.com
              </a>
            </li>
            <li>
              Joint Publication 3-60, <em>Joint Targeting.</em> U.S. Joint Chiefs of Staff.{" "}
              <a href="https://www.jcs.mil/Doctrine/" className="text-[#ff6b1a] hover:underline">
                jcs.mil
              </a>
            </li>
          </ul>
        </section>

        <footer className="mt-16 border-t border-[#2a2a2a] pt-8 text-xs text-[#5a5a5a]">
          <p>
            Published by{" "}
            <a href="/" className="text-[#ff6b1a] hover:underline">
              AtomEons
            </a>
            . Part of the <a href="/q" className="text-[#ff6b1a] hover:underline">/q</a> question
            index.
          </p>
        </footer>
      </article>
    </main>
  );
}