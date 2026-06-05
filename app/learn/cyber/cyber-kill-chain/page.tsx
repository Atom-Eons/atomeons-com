import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Lockheed Martin Cyber Kill Chain | AtomEons Learn",
  description:
    "A 2011 defender's model whose stages still shape how SOCs reason today. Seven stages, structural limits, and what practitioners actually do with it.",
  openGraph: {
    title: "The Lockheed Martin Cyber Kill Chain",
    description:
      "The 7-stage intrusion model from Hutchins, Cloppert, and Amin (2011). What it captures, where it stops, and how mature SOCs use it in 2026.",
    type: "article",
  },
};

const RECEIPTS: Array<{ id: string; body: string }> = [
  {
    id: "CVE-2017-0144",
    body: "EternalBlue. SMBv1 remote code execution. Used by WannaCry and NotPetya for internal propagation. Patched in Microsoft MS17-010 (March 2017). Public NVD entry.",
  },
  {
    id: "CVE-2017-0199",
    body: "Microsoft Office and WordPad remote code execution via HTA handler. Widely used in delivery-stage weaponization through 2018. Public NVD entry.",
  },
  {
    id: "CVE-2017-11882",
    body: "Microsoft Office Equation Editor memory corruption. Exploited at scale by commodity and targeted actors. Public NVD entry.",
  },
  {
    id: "NIST SP 800-61 r2",
    body: "Computer Security Incident Handling Guide (August 2012). The foundational U.S. federal incident-response doctrine; frequently mapped to Kill Chain stages in operational documentation.",
  },
  {
    id: "NIST SP 800-150",
    body: "Guide to Cyber Threat Information Sharing (October 2016). Formalizes the intelligence-driven defense premise the 2011 paper advanced.",
  },
  {
    id: "MITRE ATT&CK",
    body: "Enterprise matrix, first public release 2015, maintained at attack.mitre.org. Most commonly cited as superseding the Kill Chain for post-compromise behavior modeling.",
  },
  {
    id: "CISA AA20-352A",
    body: "Joint advisory on the SolarWinds Orion supply-chain compromise (December 2020). Documents adversary behavior across stages the Kill Chain compresses.",
  },
  {
    id: "NIST SP 800-207",
    body: "Zero Trust Architecture (August 2020). Articulates a defensive posture explicitly responsive to the lateral-movement gap.",
  },
];

const FURTHER_READING: Array<{ label: string; href: string; note: string }> = [
  {
    label: "Hutchins, Cloppert, Amin (2011) — the source paper",
    href: "https://www.lockheedmartin.com/en-us/capabilities/cyber/cyber-kill-chain.html",
    note: "Intelligence-Driven Computer Network Defense Informed by Analysis of Adversary Campaigns and Intrusion Kill Chains.",
  },
  {
    label: "MITRE ATT&CK Enterprise Matrix",
    href: "https://attack.mitre.org/",
    note: "Behavioral taxonomy most commonly cited as the operational successor.",
  },
  {
    label: "NIST SP 800-61 Revision 2",
    href: "https://csrc.nist.gov/pubs/sp/800/61/r2/final",
    note: "Computer Security Incident Handling Guide (August 2012).",
  },
  {
    label: "NIST SP 800-150",
    href: "https://csrc.nist.gov/pubs/sp/800/150/final",
    note: "Guide to Cyber Threat Information Sharing (October 2016).",
  },
  {
    label: "NIST SP 800-207",
    href: "https://csrc.nist.gov/pubs/sp/800/207/final",
    note: "Zero Trust Architecture (August 2020).",
  },
  {
    label: "NIST Cybersecurity Framework 2.0",
    href: "https://www.nist.gov/cyberframework",
    note: "February 2024 release.",
  },
  {
    label: "CISA Alert AA20-352A",
    href: "https://www.cisa.gov/news-events/cybersecurity-advisories/aa20-352a",
    note: "Advanced Persistent Threat Compromise of Government Agencies (December 2020).",
  },
  {
    label: "CIS Critical Security Controls v8",
    href: "https://www.cisecurity.org/controls",
    note: "Operational control catalog frequently paired with Kill Chain coverage analysis.",
  },
];

const STAGES: Array<{ n: number; name: string; gloss: string }> = [
  { n: 1, name: "Reconnaissance", gloss: "Adversary research, target selection, infrastructure mapping." },
  { n: 2, name: "Weaponization", gloss: "Coupling a remote-access trojan with an exploit into a deliverable payload." },
  { n: 3, name: "Delivery", gloss: "Transmission of the weapon to the target environment (email, web, USB)." },
  { n: 4, name: "Exploitation", gloss: "Triggering the vulnerability on the target system." },
  { n: 5, name: "Installation", gloss: "Placing a persistent backdoor on the victim host." },
  { n: 6, name: "Command and Control", gloss: "Establishing a channel for adversary control." },
  { n: 7, name: "Actions on Objectives", gloss: "Adversary intent: exfiltration, destruction, manipulation." },
];

export default function CyberKillChainPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] text-[#e8e4d8]">
      <article
        className="mx-auto max-w-3xl px-6 py-16"
        style={{ fontFamily: "Newsreader, ui-serif, Georgia, serif" }}
      >
        {/* Breadcrumb */}
        <nav className="mb-10 text-xs uppercase tracking-[0.18em] text-[#8a8579]">
          <Link href="/learn" className="hover:text-[#d9b66a]">
            Learn
          </Link>
          <span className="mx-2 text-[#3a3833]">/</span>
          <Link href="/learn/cyber" className="hover:text-[#d9b66a]">
            Cyber
          </Link>
          <span className="mx-2 text-[#3a3833]">/</span>
          <span className="text-[#c8c2b3]">Cyber Kill Chain</span>
        </nav>

        {/* Category eyebrow */}
        <div className="mb-6 inline-block border border-[#3a3833] px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-[#d9b66a]">
          Cyber / Frameworks
        </div>

        {/* Title block */}
        <header className="mb-14 border-b border-[#2a2824] pb-12">
          <h1 className="mb-5 text-4xl font-normal leading-[1.15] tracking-tight text-[#f4f0e3] sm:text-5xl">
            The Lockheed Martin Cyber Kill Chain
          </h1>
          <p className="mb-8 text-lg italic text-[#a9a397]">
            A 2011 defender&apos;s model whose stages still shape how SOCs reason today.
          </p>
          <p className="text-[15px] leading-[1.75] text-[#c8c2b3]">
            Lockheed Martin&apos;s Cyber Kill Chain, published in 2011 by Hutchins,
            Cloppert, and Amin, decomposed targeted intrusions into seven sequential
            stages: reconnaissance, weaponization, delivery, exploitation,
            installation, command and control, and actions on objectives. It was the
            first widely-adopted defender&apos;s framework that treated intrusion as a
            process rather than a single event, and it remains embedded in vendor
            marketing, SIEM correlation rules, and threat-intel reporting. The
            model&apos;s primary critique, articulated since at least 2014, is
            structural: it ends at initial-host actions and offers no vocabulary for
            the internal movement, credential abuse, and persistence escalation that
            define modern ransomware and APT campaigns.
          </p>
        </header>

        {/* LEDE */}
        <section className="mb-16">
          <p className="text-xl leading-[1.7] text-[#e8e4d8]">
            In March 2011, three Lockheed Martin Computer Incident Response Team
            analysts published a paper that named what defenders had always
            intuited: a sophisticated intrusion is a chain, and chains break.
            Fifteen years later the seven-stage diagram still appears in vendor
            decks and SOC runbooks. It also still ends, conspicuously, at the
            moment the adversary&apos;s job actually begins.
          </p>
        </section>

        {/* What it is */}
        <Section title="What it is">
          <p>
            The Cyber Kill Chain is a seven-stage descriptive model of computer
            network intrusion published by Eric M. Hutchins, Michael J. Cloppert,
            and Rohan M. Amin in the paper{" "}
            <em>
              Intelligence-Driven Computer Network Defense Informed by Analysis of
              Adversary Campaigns and Intrusion Kill Chains
            </em>
            , presented at the 6th International Conference on Information Warfare
            and Security in 2011. The authors were members of the Lockheed Martin
            Computer Incident Response Team (LM-CIRT), and the framework was
            developed against a backdrop of state-aligned intrusion campaigns
            targeting the U.S. defense industrial base in the late 2000s.
          </p>
          <p>
            The model borrows its core metaphor from U.S. military doctrine,
            specifically the F2T2EA targeting cycle (Find, Fix, Track, Target,
            Engage, Assess) and the broader &ldquo;kill chain&rdquo; concept used
            in joint operations planning. Hutchins, Cloppert, and Amin&apos;s
            contribution was to adapt the chain-of-events framing to network
            defense and to argue that defenders gain asymmetric advantage by
            breaking the chain at any single link, because the attacker must
            succeed at every stage.
          </p>

          <p>The seven stages are:</p>

          <ol className="my-6 space-y-3 border-l border-[#3a3833] pl-6">
            {STAGES.map((s) => (
              <li key={s.n} className="text-[#c8c2b3]">
                <span className="mr-2 text-[#d9b66a]">{s.n}.</span>
                <span className="font-medium text-[#f4f0e3]">{s.name}</span>
                <span className="text-[#8a8579]"> &mdash; {s.gloss}</span>
              </li>
            ))}
          </ol>

          <p>
            The original paper framed the chain as a tool for intelligence-driven
            defense: by mapping observed indicators against stages, analysts could
            profile campaigns, identify adversary tradecraft patterns, and
            prioritize controls against the earliest stages where intervention is
            cheapest. The paper introduced the &ldquo;courses of action&rdquo;
            matrix, pairing each stage against six defensive actions (detect,
            deny, disrupt, degrade, deceive, destroy), producing a 7-by-6 grid
            that became a standard SOC planning artifact.
          </p>
          <p>
            The model achieved adoption velocity unusual for a defense-industry
            whitepaper. Within three years it appeared in NIST publications,
            vendor product literature from every major security firm, and the
            curricula of SANS and (ISC)&sup2; certifications. It also drew
            sustained academic and operational critique, most prominently from
            researchers documenting that the chain&apos;s terminal stage
            compressed the entire post-compromise lifecycle &mdash; lateral
            movement, privilege escalation, credential theft, internal
            reconnaissance, data staging &mdash; into a single undifferentiated
            bucket. That compression is the model&apos;s defining limitation and
            the reason it now functions primarily as a teaching aid rather than
            as the operational backbone of mature detection programs.
          </p>
        </Section>

        {/* How it actually works */}
        <Section title="How it actually works">
          <p>
            Each stage of the chain corresponds to observable telemetry and
            defensive controls. Walking the stages with named techniques and
            standards clarifies both what the model captures and where it stops.
          </p>

          <p>
            <strong className="text-[#f4f0e3]">Reconnaissance</strong> maps to
            MITRE ATT&amp;CK tactic TA0043 (&ldquo;Reconnaissance&rdquo;) and its
            sub-techniques: T1595 (Active Scanning), T1592 (Gather Victim Host
            Information), T1589 (Gather Victim Identity Information). Telemetry
            sources include external attack-surface monitoring (Shodan, Censys),
            DNS query logs, and authentication-system enumeration attempts. The
            defender&apos;s leverage at this stage is preventative rather than
            detective &mdash; attack-surface reduction, credential hygiene, and
            the removal of unnecessary external services.
          </p>

          <p>
            <strong className="text-[#f4f0e3]">Weaponization</strong> is largely
            invisible to the target. It occurs on adversary infrastructure:
            pairing a malware family (a remote-access trojan, a loader, a wiper)
            with an exploit for a known or zero-day vulnerability. The
            defender&apos;s only visibility into this stage comes through threat
            intelligence sharing &mdash; VirusTotal submissions, CTI feeds from
            vendors and ISACs, and post-incident sample analysis. Common
            exploit-document formats observed historically include weaponized
            Office documents abusing CVE-2017-0199 (HTA handler) and
            CVE-2017-11882 (Equation Editor memory corruption), and PDF documents
            abusing CVE-2018-4990 (Adobe Reader). Each of these CVEs is publicly
            documented in the National Vulnerability Database and was used at
            scale in commodity and targeted intrusions.
          </p>

          <p>
            <strong className="text-[#f4f0e3]">Delivery</strong> is where
            defender visibility becomes substantial. Email remains the dominant
            delivery vector, and protocol-level controls &mdash; SPF (RFC 7208),
            DKIM (RFC 6376), and DMARC (RFC 7489) &mdash; provide authentication
            signal. Secure email gateways perform attachment sandboxing, URL
            rewriting, and content analysis. Web delivery is observable in proxy
            and TLS-inspection logs; USB and supply-chain delivery, far rarer,
            require endpoint and procurement controls.
          </p>

          <p>
            <strong className="text-[#f4f0e3]">Exploitation</strong> corresponds
            to MITRE ATT&amp;CK tactic TA0001 (Initial Access) and TA0002
            (Execution). Specific techniques include T1566 (Phishing), T1190
            (Exploit Public-Facing Application), and T1203 (Exploitation for
            Client Execution). Endpoint detection-and-response (EDR) products
            instrument process creation, memory access, and child-process
            relationships to detect exploitation behavior &mdash; particularly
            the abuse of office applications spawning script interpreters, a
            pattern documented across many commodity loaders.
          </p>

          <p>
            <strong className="text-[#f4f0e3]">Installation</strong> is
            persistence: MITRE tactic TA0003. Registry run keys (T1547.001),
            scheduled tasks (T1053.005), WMI event subscriptions (T1546.003), and
            service installations (T1543.003) are the canonical mechanisms. NIST
            SP 800-83 Revision 1 (&ldquo;Guide to Malware Incident Prevention and
            Handling for Desktops and Laptops&rdquo;) documents the
            defender&apos;s responsibilities at this phase, and the CIS Critical
            Security Controls Version 8 covers persistence-relevant hardening
            under Controls 4 and 10.
          </p>

          <p>
            <strong className="text-[#f4f0e3]">Command and Control</strong> maps
            to MITRE tactic TA0011. Protocols observed in the wild include HTTPS
            with domain fronting (less common since major cloud providers
            restricted it), DNS tunneling (T1071.004), and increasingly the abuse
            of legitimate cloud services for C2 (T1102 &mdash; Web Service).
            Network-level defenses include TLS inspection where lawful and
            configured, DNS sinkholing, and egress filtering. CISA Alert
            AA20-352A (the SolarWinds SUNBURST advisory, December 2020)
            documented adversary C2 behavior that deliberately evaded simple
            network-indicator detection by using subdomain DGA and selective
            beaconing.
          </p>

          <p>
            <strong className="text-[#f4f0e3]">Actions on Objectives</strong>{" "}
            maps to multiple ATT&amp;CK tactics in the original paper&apos;s
            framing: TA0010 (Exfiltration), TA0040 (Impact), TA0009 (Collection).
            And here the model&apos;s compression becomes acute. The 2017
            NotPetya event (attributed by the U.S., U.K., and others to actors
            associated with the Russian GRU) demonstrated an adversary moving
            from initial compromise of a Ukrainian accounting software supply
            chain (M.E.Doc) to network-wide destruction across multinational
            enterprises in hours. The Kill Chain has no stage for the
            EternalBlue (CVE-2017-0144) lateral movement, the Mimikatz-style
            credential harvesting, or the SMB propagation that did the actual
            damage. All of it sits inside &ldquo;Actions on Objectives.&rdquo;
          </p>

          <p>
            This is the structural critique. The model captures the perimeter
            intrusion sequence faithfully but treats the interior of the network
            as a black box at the moment when modern intrusions spend most of
            their dwell time. The 2023 IBM Cost of a Data Breach Report measured
            a global mean dwell time of 204 days from compromise to
            identification &mdash; almost all of it inside the network, in
            stages the chain does not name.
          </p>
        </Section>

        {/* Receipts */}
        <Section title="Receipts">
          <p className="mb-6 text-[#8a8579]">
            Cited primary sources. Public information only.
          </p>
          <ul className="space-y-4">
            {RECEIPTS.map((r) => (
              <li
                key={r.id}
                className="border-l-2 border-[#d9b66a] bg-[#111110] p-4"
              >
                <div className="mb-1 font-mono text-xs uppercase tracking-wider text-[#d9b66a]">
                  {r.id}
                </div>
                <div className="text-[15px] leading-[1.7] text-[#c8c2b3]">
                  {r.body}
                </div>
              </li>
            ))}
          </ul>
        </Section>

        {/* What practitioners do with it */}
        <Section title="What practitioners do with it">
          <p>
            In contemporary security operations the Kill Chain functions as a
            vocabulary and a teaching scaffold rather than as the primary
            detection-engineering ontology. Three practical uses dominate.
          </p>
          <p>
            First, <strong className="text-[#f4f0e3]">executive and
            cross-functional communication</strong>. The seven-stage diagram is
            intelligible to non-specialist audiences in a way that the full
            MITRE ATT&amp;CK matrix (currently spanning 14 tactics and several
            hundred techniques across enterprise, mobile, and ICS matrices) is
            not. Security leaders presenting incident timelines to boards,
            auditors, and regulators frequently use the Kill Chain stages as a
            narrative spine, then attach ATT&amp;CK technique identifiers as
            supporting detail. This pattern appears in incident reports from
            major incident-response firms including Mandiant (now part of Google
            Cloud), CrowdStrike, and Palo Alto Networks Unit 42.
          </p>
          <p>
            Second, <strong className="text-[#f4f0e3]">defensive course-of-action
            planning</strong>. The original paper&apos;s 7-by-6 matrix (stages
            by defensive actions &mdash; detect, deny, disrupt, degrade, deceive,
            destroy) is still used in tabletop exercises and control-coverage
            audits. A typical exercise asks: for each Kill Chain stage, what
            telemetry do we collect, what controls do we have, and which courses
            of action are available? Gaps in the matrix surface investment
            priorities. Tools that participate include SIEM platforms (Splunk
            Enterprise Security, Microsoft Sentinel, Elastic Security), SOAR
            platforms (Palo Alto Cortex XSOAR, Splunk SOAR), and endpoint
            detection-and-response platforms (CrowdStrike Falcon, Microsoft
            Defender for Endpoint, SentinelOne).
          </p>
          <p>
            Third, <strong className="text-[#f4f0e3]">threat-intelligence
            reporting structure</strong>. Threat-intel teams structure adversary
            campaign write-ups along Kill Chain stages because the format
            compresses well and aids comparison across campaigns. CTI sharing
            standards including STIX 2.1 (OASIS) and the older OpenIOC format do
            not require Kill Chain mapping but commonly include it as a field.
            ISACs (Information Sharing and Analysis Centers) for sectors
            including financial services (FS-ISAC), health (H-ISAC), and
            electricity (E-ISAC) publish bulletins that reference both Kill
            Chain stages and ATT&amp;CK techniques.
          </p>
          <p>
            Tooling that explicitly references the Kill Chain includes Lockheed
            Martin&apos;s own commercial and government offerings, several
            open-source Kill Chain visualization libraries on GitHub, and the
            integrated dashboards in some commercial SIEMs. Detection
            engineering teams, however, increasingly write detection logic
            against ATT&amp;CK technique IDs rather than Kill Chain stages,
            because the granularity of ATT&amp;CK (with sub-techniques
            specifying registry paths, command-line patterns, and protocol
            behaviors) maps more directly to log-source fields and EDR
            telemetry. The Sigma rule format (github.com/SigmaHQ/sigma), the de
            facto open standard for portable SIEM detection content, uses
            ATT&amp;CK tagging as a primary classification axis. Kill Chain
            tagging is supported but secondary.
          </p>
          <p>
            A mature SOC in 2026 typically uses the Kill Chain as the outer
            narrative layer (briefings, exercise design, executive reporting)
            and ATT&amp;CK as the inner engineering layer (detection authoring,
            hunt-pack design, purple-team coverage measurement). The two are
            not in conflict; they operate at different altitudes.
          </p>
        </Section>

        {/* What it is NOT */}
        <Section title="What it is NOT">
          <p>
            The Cyber Kill Chain is not a complete model of adversary behavior,
            and it was not designed to be one. The original paper explicitly
            framed the model as a tool for analyzing campaigns against the
            defense industrial base &mdash; specifically, externally-initiated
            intrusions delivered through email and web channels against
            enterprise endpoints. It does not address insider threat, where the
            adversary begins inside the trust boundary. It does not address
            supply-chain compromise of the depth observed in SolarWinds, where
            the &ldquo;delivery&rdquo; mechanism was a signed software update.
            It does not address cloud-native attacks where there is no endpoint
            installation stage in the traditional sense &mdash; credentials,
            API tokens, and OAuth grants are the persistence mechanism.
          </p>
          <p>
            The model is also not a maturity framework, not a compliance
            standard, and not a control catalog. It does not tell an
            organization what to buy, what to log, or how to staff a SOC.
            Standards that do that work include the CIS Critical Security
            Controls, the NIST Cybersecurity Framework (CSF 2.0, released
            February 2024), ISO/IEC 27001:2022, and sector-specific regimes
            including PCI DSS v4.0 and the HIPAA Security Rule.
          </p>
          <p>
            The Kill Chain is not equivalent to the MITRE ATT&amp;CK framework.
            ATT&amp;CK is a behavioral taxonomy with hundreds of techniques
            organized under 14 tactics; the Kill Chain is a 7-stage narrative
            model. They overlap but operate at different resolutions and were
            built for different purposes (campaign analysis vs. behavioral
            cataloging).
          </p>
          <p>
            The model is not a prediction engine. It describes a generalized
            sequence; real intrusions skip stages, recurse through stages,
            parallelize stages, and reorder stages. Treating it as a strict
            pipeline produces false confidence.
          </p>
        </Section>

        {/* Further reading */}
        <Section title="Further reading">
          <ul className="space-y-4">
            {FURTHER_READING.map((r) => (
              <li key={r.href} className="border-b border-[#2a2824] pb-4">
                <a
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-[#d9b66a] underline-offset-4 hover:underline"
                >
                  {r.label}
                </a>
                <div className="mt-1 text-sm text-[#8a8579]">{r.note}</div>
              </li>
            ))}
          </ul>
        </Section>

        {/* Footer */}
        <footer className="mt-20 border-t border-[#2a2824] pt-8 text-xs uppercase tracking-[0.18em] text-[#5a564d]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span>AtomEons / Learn / Cyber</span>
            <span>Public information. No operational tradecraft.</span>
          </div>
        </footer>
      </article>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-16">
      <h2 className="mb-8 border-b border-[#2a2824] pb-3 text-2xl font-normal tracking-tight text-[#f4f0e3]">
        {title}
      </h2>
      <div className="space-y-5 text-[16px] leading-[1.8] text-[#c8c2b3]">
        {children}
      </div>
    </section>
  );
}