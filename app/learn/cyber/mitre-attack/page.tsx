import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "MITRE ATT&CK — The Adversary Behavior Matrix | AtomEons",
  description:
    "How MITRE ATT&CK replaced the Lockheed Martin Cyber Kill Chain as the defender vocabulary: 14 tactics, hundreds of techniques, mapped to real groups and real campaigns.",
  openGraph: {
    title: "MITRE ATT&CK — The Adversary Behavior Matrix",
    description:
      "The 14 tactics, the ~200 techniques, and why ATT&CK is now the lingua franca of detection engineering.",
    type: "article",
  },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#e8e6e1]">
      <article
        className="mx-auto max-w-[760px] px-6 py-24 font-serif"
        style={{ fontFamily: '"Newsreader", "Source Serif Pro", Georgia, serif' }}
      >
        <nav className="mb-12 text-xs uppercase tracking-[0.24em] text-[#7a7670]">
          <Link href="/learn" className="hover:text-[#e8e6e1]">
            Learn
          </Link>
          <span className="mx-2 text-[#3a3833]">/</span>
          <Link href="/learn/cyber" className="hover:text-[#e8e6e1]">
            Cyber
          </Link>
          <span className="mx-2 text-[#3a3833]">/</span>
          <span className="text-[#a8a39c]">MITRE ATT&amp;CK</span>
        </nav>

        <header className="mb-16 border-b border-[#26231f] pb-12">
          <div className="mb-6 text-xs uppercase tracking-[0.32em] text-[#c47a3a]">
            Cyber / Defensive Doctrine
          </div>
          <h1 className="mb-6 text-5xl font-normal leading-[1.08] text-[#f2efe9]">
            MITRE ATT&amp;CK
            <span className="block text-3xl text-[#a8a39c] mt-3 italic">
              The Adversary Behavior Matrix
            </span>
          </h1>
          <p className="text-lg leading-relaxed text-[#a8a39c] italic">
            How the defender&rsquo;s matrix replaced the kill chain as common language.
          </p>
        </header>

        <section className="mb-12">
          <div className="mb-4 text-xs uppercase tracking-[0.28em] text-[#7a7670]">
            Summary
          </div>
          <p className="text-base leading-[1.75] text-[#d8d4cd]">
            MITRE ATT&amp;CK is a globally-accessible, curated knowledge base of
            adversary tactics and techniques drawn from observed incidents.
            Maintained by The MITRE Corporation since its 2013 internal origin and
            first public release in 2015, ATT&amp;CK organizes post-compromise
            behavior into 14 Enterprise tactics covering hundreds of techniques and
            sub-techniques across Windows, macOS, Linux, cloud, containers, network
            devices, ICS, and mobile. ATT&amp;CK displaced the linear Lockheed
            Martin Cyber Kill Chain as the dominant defender vocabulary because it
            modeled how intrusions actually unfold &mdash; branching, looping,
            persistent &mdash; rather than as a single forward arrow. It is now
            embedded in NIST, CISA, vendor SIEM rules, and detection engineering
            practice.
          </p>
        </section>

        <section className="mb-16 border-l-2 border-[#c47a3a] pl-6">
          <p className="text-lg leading-[1.7] text-[#e8e6e1]">
            The Cyber Kill Chain told defenders to break a seven-stage forward
            sequence. Real intrusions did not behave that way. MITRE ATT&amp;CK,
            first published in 2015 from an internal MITRE red-team exercise called
            FMX, modeled what adversaries actually did after they were already
            inside. Fourteen tactics. Hundreds of techniques. Mapped to real
            groups, real malware, real campaigns. It is now the lingua franca of
            detection engineering.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-normal text-[#f2efe9]">What it is</h2>
          <div className="space-y-6 text-base leading-[1.8] text-[#d8d4cd]">
            <p>
              MITRE ATT&amp;CK &mdash; Adversarial Tactics, Techniques, and Common
              Knowledge &mdash; is a curated, publicly available knowledge base of
              adversary behavior maintained by The MITRE Corporation, a U.S.
              federally funded research and development center (FFRDC) operator.
              The framework was developed beginning in 2013 inside an internal
              MITRE research project called FMX (Fort Meade Experiment), where red
              and blue teams operated against each other on a controlled enterprise
              network so that defender visibility into post-exploitation behavior
              could be empirically measured. The first public release shipped in
              May 2015.
            </p>
            <p>
              ATT&amp;CK&rsquo;s structural primitive is the tactic-technique pair.
              A <em className="text-[#f2efe9]">tactic</em> answers{" "}
              <em>why</em> an adversary performed an action &mdash; the
              adversarial objective at that moment, such as gaining initial access,
              escalating privileges, or exfiltrating data. A{" "}
              <em className="text-[#f2efe9]">technique</em> answers <em>how</em>{" "}
              &mdash; the specific method used to achieve the tactic, such as
              spearphishing attachment, valid accounts, or DLL side-loading. Each
              technique receives a stable identifier (e.g., T1566 Phishing, T1078
              Valid Accounts, T1055 Process Injection), and many techniques
              decompose into <em className="text-[#f2efe9]">sub-techniques</em>{" "}
              with extended identifiers (T1566.001 Spearphishing Attachment).
              Identifiers are intentionally stable so that detection rules, threat
              reports, and red-team exercises remain comparable across years.
            </p>
            <p>
              The Enterprise matrix as of mid-2020s contains 14 tactics in
              approximate operational order: Reconnaissance, Resource Development,
              Initial Access, Execution, Persistence, Privilege Escalation, Defense
              Evasion, Credential Access, Discovery, Lateral Movement, Collection,
              Command and Control, Exfiltration, and Impact. ATT&amp;CK explicitly
              rejects strict linearity &mdash; an adversary often performs
              Discovery before and after Lateral Movement, may re-enter via Initial
              Access mid-campaign, and frequently parallelizes Persistence with
              Defense Evasion.
            </p>
            <p>
              Separate matrices exist for non-enterprise environments: ATT&amp;CK
              for Mobile (Android, iOS), ATT&amp;CK for ICS (industrial control
              systems, released 2020), and ATT&amp;CK for Cloud (now folded into
              Enterprise as platform-specific techniques across AWS, Azure, GCP,
              SaaS, Office 365, Google Workspace, and Azure AD / Entra ID).
            </p>
            <p>
              The knowledge base also indexes{" "}
              <em className="text-[#f2efe9]">Groups</em> (named threat actors such
              as APT28, APT29, FIN7, Lazarus, Sandworm),{" "}
              <em className="text-[#f2efe9]">Software</em> (malware and dual-use
              tools such as Mimikatz, Cobalt Strike, Emotet),{" "}
              <em className="text-[#f2efe9]">Campaigns</em>,{" "}
              <em className="text-[#f2efe9]">Mitigations</em>,{" "}
              <em className="text-[#f2efe9]">Data Sources</em>, and{" "}
              <em className="text-[#f2efe9]">Detections</em> &mdash; each
              cross-linked so that a defender can pivot from &ldquo;what does FIN7
              do?&rdquo; to &ldquo;which techniques is FIN7 known to use?&rdquo; to
              &ldquo;what data source detects T1059.001 PowerShell?&rdquo; The
              cross-linkage is what makes ATT&amp;CK a usable matrix rather than a
              static taxonomy.
            </p>
            <p>
              ATT&amp;CK is published openly under the MITRE ATT&amp;CK Terms of
              Use, machine-readable via STIX 2.1 in the MITRE/CTI GitHub
              repository, and queryable through the ATT&amp;CK Navigator web tool.
            </p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-normal text-[#f2efe9]">
            How it actually works
          </h2>
          <div className="space-y-6 text-base leading-[1.8] text-[#d8d4cd]">
            <p>
              The conceptual shift ATT&amp;CK introduced is the rejection of the{" "}
              <em className="text-[#f2efe9]">
                Lockheed Martin Cyber Kill Chain
              </em>{" "}
              as the dominant intrusion model. The Kill Chain, published in the
              2011 Hutchins, Cloppert, and Amin paper{" "}
              <em>
                Intelligence-Driven Computer Network Defense Informed by Analysis
                of Adversary Campaigns and Intrusion Kill Chains
              </em>
              , modeled intrusions as a seven-stage linear sequence:
              Reconnaissance, Weaponization, Delivery, Exploitation, Installation,
              Command &amp; Control, and Actions on Objectives. The Kill
              Chain&rsquo;s defensive thesis was elegant: break any single link and
              the chain fails.
            </p>
            <p>
              The problem was that the Kill Chain front-loaded its detail on the
              pre-exploitation phases and collapsed everything after exploitation
              into &ldquo;Actions on Objectives.&rdquo; In practice, modern
              intrusions &mdash; particularly by named state-aligned groups &mdash;
              spend weeks or months in that single collapsed phase, doing internal
              reconnaissance, harvesting credentials, moving laterally, escalating
              privileges, and quietly staging data, none of which the Kill Chain
              modeled at useful resolution. ATT&amp;CK inverted this. It
              deliberately starts post-Initial-Access (Reconnaissance and Resource
              Development were added later, in 2020, as the PRE matrix was folded
              in) and devotes the bulk of its taxonomy to what happens{" "}
              <em>inside</em> the network.
            </p>
            <p>
              Each ATT&amp;CK technique entry contains a structured set of fields:
              a description, listed sub-techniques, mitigations, detection
              guidance, data sources, named procedure examples drawn from real
              reports (with citations), platforms affected, and the contributing
              analysts. For example, T1059 Command and Scripting Interpreter has
              sub-techniques covering PowerShell (T1059.001), AppleScript
              (T1059.002), Windows Command Shell (T1059.003), Unix Shell
              (T1059.004), Visual Basic (T1059.005), Python (T1059.006),
              JavaScript (T1059.007), Network Device CLI (T1059.008), Cloud API
              (T1059.009), and AutoHotKey &amp; AutoIT (T1059.010). Each
              sub-technique lists named procedure examples from public threat
              reports, with footnotes pointing back to the originating CTI source.
            </p>
            <p>
              The <em className="text-[#f2efe9]">Data Sources</em> vocabulary,
              redesigned in ATT&amp;CK v9 (April 2021) into a formal data source
              and data component model, is what makes ATT&amp;CK actionable for
              detection engineering. Rather than a technique simply listing
              &ldquo;process monitoring,&rdquo; the v9-and-later format specifies a
              data source (e.g., Process) and a data component (e.g., Process
              Creation), each mapped to ATT&amp;CK Data Source IDs (DS0009
              Process, DS0029 Network Traffic, DS0017 Command, DS0022 File, etc.).
              Detection engineers can therefore work backward:{" "}
              <em>
                which techniques does our current telemetry actually cover?
              </em>{" "}
              This gap analysis is the foundation of the practice known as{" "}
              <em className="text-[#f2efe9]">detection coverage mapping</em>.
            </p>
            <p>
              ATT&amp;CK is versioned. v17 shipped in May 2025; minor revisions are
              pushed roughly twice yearly. Each release notes added techniques,
              deprecated techniques, renamed techniques, and merged sub-techniques.
              Detection engineers maintain version pinning in their rule sets
              because a technique ID can be deprecated or restructured between
              releases.
            </p>
            <p>
              The ATT&amp;CK ecosystem includes several first-party MITRE projects
              that operationalize the matrix.{" "}
              <em className="text-[#f2efe9]">ATT&amp;CK Navigator</em> is a
              JSON-driven web app for building colored heatmaps over the matrix
              &mdash; used heavily for coverage maps, threat actor overlays, and
              red-team scope diagrams.{" "}
              <em className="text-[#f2efe9]">CAR (Cyber Analytics Repository)</em>{" "}
              publishes vendor-neutral detection analytics keyed to ATT&amp;CK
              techniques. <em className="text-[#f2efe9]">D3FEND</em>, released in
              2021 with NSA funding, is the defender-side counter-matrix that maps
              defensive countermeasure techniques (e.g., process tree analysis,
              certificate pinning, message authentication) and cross-links them to
              the ATT&amp;CK techniques they counter.{" "}
              <em className="text-[#f2efe9]">ATT&amp;CK Evaluations</em>, run by
              MITRE Engenuity since 2018, are annual public evaluations where EDR
              and XDR vendors are scored against emulated adversary behavior
              modeled on named threat groups (Round 1: APT3, Round 2: APT29,
              Round 3: Carbanak+FIN7, Round 4: Wizard Spider+Sandworm, Round 5:
              Turla, Round 6: DPRK and CL0P). The evaluations publish raw
              telemetry, detection categorizations, and methodology &mdash; not
              pass/fail scores.
            </p>
            <p>
              ATT&amp;CK has also been formally incorporated into government
              doctrine. NIST SP 800-53 Rev. 5 (September 2020) does not bind
              controls directly to ATT&amp;CK identifiers, but the companion NIST
              SP 800-150 (October 2016,{" "}
              <em>Guide to Cyber Threat Information Sharing</em>) and the NIST
              National Online Informative References (OLIR) program publish formal
              mappings between ATT&amp;CK techniques and 800-53 controls.
              CISA&rsquo;s Decider tool, released in 2023, helps analysts map
              narrative incident reports to ATT&amp;CK techniques. CISA&rsquo;s
              Best Practices for MITRE ATT&amp;CK Mapping (originally published
              2021, updated 2023) is the de facto government-aligned guide.
            </p>
          </div>
        </section>

        <section className="mb-16 border-y border-[#26231f] py-12">
          <h2 className="mb-8 text-3xl font-normal text-[#f2efe9]">Receipts</h2>
          <ul className="space-y-5 text-base leading-[1.75] text-[#d8d4cd]">
            <li className="flex gap-4">
              <span className="text-[#c47a3a] font-mono text-sm pt-1">§</span>
              <span>
                <strong className="text-[#f2efe9]">MITRE ATT&amp;CK</strong> has a
                stable, citable identifier scheme &mdash; example:{" "}
                <code className="text-[#c47a3a] text-sm">T1078</code> is the
                Enterprise technique ID for Valid Accounts, with sub-techniques
                T1078.001 (Default Accounts), T1078.002 (Domain Accounts),
                T1078.003 (Local Accounts), and T1078.004 (Cloud Accounts), as
                listed at attack.mitre.org/techniques/T1078/.
              </span>
            </li>
            <li className="flex gap-4">
              <span className="text-[#c47a3a] font-mono text-sm pt-1">§</span>
              <span>
                The framework&rsquo;s published origin is{" "}
                <strong className="text-[#f2efe9]">
                  FMX (Fort Meade Experiment)
                </strong>
                , an internal MITRE red/blue exercise begun in 2013; the first
                public ATT&amp;CK release was{" "}
                <strong className="text-[#f2efe9]">May 2015</strong>, documented
                by MITRE in <em>MITRE ATT&amp;CK: Design and Philosophy</em>{" "}
                (Strom et al., MITRE Technical Report MP180360R1, originally July
                2018, revised March 2020).
              </span>
            </li>
            <li className="flex gap-4">
              <span className="text-[#c47a3a] font-mono text-sm pt-1">§</span>
              <span>
                The model ATT&amp;CK displaced was the{" "}
                <strong className="text-[#f2efe9]">
                  Lockheed Martin Cyber Kill Chain
                </strong>
                , formalized in Hutchins, Cloppert, and Amin,{" "}
                <em>
                  Intelligence-Driven Computer Network Defense Informed by
                  Analysis of Adversary Campaigns and Intrusion Kill Chains
                </em>
                , Leading Issues in Information Warfare and Security Research,
                vol. 1, 2011.
              </span>
            </li>
            <li className="flex gap-4">
              <span className="text-[#c47a3a] font-mono text-sm pt-1">§</span>
              <span>
                <strong className="text-[#f2efe9]">NIST SP 800-150</strong>,{" "}
                <em>Guide to Cyber Threat Information Sharing</em> (Johnson,
                Badger, Waltermire, Snyder, Skorupka, October 2016), defines the
                threat-intelligence sharing vocabulary in which ATT&amp;CK is now
                commonly serialized.
              </span>
            </li>
            <li className="flex gap-4">
              <span className="text-[#c47a3a] font-mono text-sm pt-1">§</span>
              <span>
                <strong className="text-[#f2efe9]">STIX 2.1</strong>, the standard
                ATT&amp;CK ships in, is an OASIS Cyber Threat Intelligence (CTI)
                Technical Committee standard; the MITRE/CTI GitHub repository
                (github.com/mitre/cti) publishes ATT&amp;CK in STIX 2.1 JSON.
              </span>
            </li>
            <li className="flex gap-4">
              <span className="text-[#c47a3a] font-mono text-sm pt-1">§</span>
              <span>
                <strong className="text-[#f2efe9]">D3FEND</strong> was released in{" "}
                <strong className="text-[#f2efe9]">June 2021</strong> with NSA
                funding under MITRE; it is published at d3fend.mitre.org with
                mappings between defensive techniques and ATT&amp;CK offensive
                techniques.
              </span>
            </li>
            <li className="flex gap-4">
              <span className="text-[#c47a3a] font-mono text-sm pt-1">§</span>
              <span>
                <strong className="text-[#f2efe9]">CISA&rsquo;s Decider tool</strong>
                , released{" "}
                <strong className="text-[#f2efe9]">March 2023</strong>, is an
                open-source web application that walks analysts through mapping
                incident narratives to ATT&amp;CK technique IDs; source at
                github.com/cisagov/Decider.
              </span>
            </li>
            <li className="flex gap-4">
              <span className="text-[#c47a3a] font-mono text-sm pt-1">§</span>
              <span>
                <strong className="text-[#f2efe9]">
                  CISA&rsquo;s Best Practices for MITRE ATT&amp;CK Mapping
                </strong>{" "}
                guide (originally{" "}
                <strong className="text-[#f2efe9]">June 2021</strong>, updated{" "}
                <strong className="text-[#f2efe9]">February 2023</strong>, jointly
                authored by CISA and MITRE&rsquo;s Center for Threat-Informed
                Defense) is the canonical government-aligned procedural guide for
                ATT&amp;CK mapping.
              </span>
            </li>
            <li className="flex gap-4">
              <span className="text-[#c47a3a] font-mono text-sm pt-1">§</span>
              <span>
                <strong className="text-[#f2efe9]">ATT&amp;CK Evaluations</strong>{" "}
                are run by{" "}
                <strong className="text-[#f2efe9]">MITRE Engenuity</strong>, a
                nonprofit foundation founded by MITRE in 2019; the evaluations
                have publicly emulated APT3 (2018), APT29 (2019), Carbanak+FIN7
                (2020), Wizard Spider+Sandworm (2022), Turla (2023), and
                DPRK+CL0P (2024).
              </span>
            </li>
            <li className="flex gap-4">
              <span className="text-[#c47a3a] font-mono text-sm pt-1">§</span>
              <span>
                <strong className="text-[#f2efe9]">ATT&amp;CK for ICS</strong> was
                released in{" "}
                <strong className="text-[#f2efe9]">January 2020</strong>,
                modeling adversary behavior against industrial control systems and
                incorporating findings from the 2015 and 2016 Ukrainian power grid
                incidents (attributed in CISA Alert IR-ALERT-H-16-056-01 to a
                campaign using{" "}
                <strong className="text-[#f2efe9]">BlackEnergy 3</strong> and
                tools tracked as{" "}
                <strong className="text-[#f2efe9]">Sandworm</strong>, mapped in
                ATT&amp;CK Software entries S0089 and S0049).
              </span>
            </li>
          </ul>
        </section>

        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-normal text-[#f2efe9]">
            What practitioners do with it
          </h2>
          <div className="space-y-6 text-base leading-[1.8] text-[#d8d4cd]">
            <p>
              Detection engineering teams use ATT&amp;CK as the indexing key for
              their entire rule library. A typical mature SOC tags every detection
              rule &mdash; in Splunk, Microsoft Sentinel, Elastic Security, Sumo
              Logic, Chronicle, Panther, or an internal rules engine &mdash; with
              one or more ATT&amp;CK technique IDs. The aggregate of those tags is
              then visualized in{" "}
              <em className="text-[#f2efe9]">ATT&amp;CK Navigator</em> as a
              coverage heatmap. Gaps in the heatmap drive detection backlog
              grooming. This practice is widely documented; the open-source Sigma
              project (github.com/SigmaHQ/sigma) ships its detection rules with
              embedded ATT&amp;CK technique tags by convention.
            </p>
            <p>
              Threat intelligence analysts use ATT&amp;CK to convert prose threat
              reports into structured behavior profiles. When CISA, CrowdStrike,
              Mandiant, Microsoft Threat Intelligence, Recorded Future, or Cisco
              Talos publishes an actor report, the report typically concludes with
              an ATT&amp;CK mapping table. Mapping a report by hand is a
              documented skill &mdash; CISA&rsquo;s Decider tool and MITRE&rsquo;s
              free <em>ATT&amp;CK Defender</em> (MAD) training program
              (training.mitre-engenuity.org) both teach the procedure. Output from
              this work feeds{" "}
              <em className="text-[#f2efe9]">threat-informed defense</em> programs,
              in which detection priorities are explicitly weighted by adversary
              techniques relevant to the organization&rsquo;s threat model rather
              than by uniform technique coverage.
            </p>
            <p>
              Red and purple teams use ATT&amp;CK as the language of scope.
              Engagement planning documents commonly state, &ldquo;this engagement
              will exercise T1566.001, T1059.001, T1003.001, T1021.001, T1078.002,
              and T1567.002&rdquo; &mdash; meaning spearphishing attachment,
              PowerShell execution, LSASS credential dumping, RDP lateral
              movement, domain account abuse, and exfiltration to cloud storage.
              The open-source{" "}
              <em className="text-[#f2efe9]">Atomic Red Team</em> project
              (atomicredteam.io, maintained by Red Canary) publishes
              single-technique test cases keyed to ATT&amp;CK IDs so that defenders
              can validate a specific detection without engaging a full red-team
              exercise. <em className="text-[#f2efe9]">Caldera</em>{" "}
              (caldera.mitre.org), MITRE&rsquo;s own automated adversary emulation
              platform, chains atomic tests into multi-step emulation plans
              modeled on named threat groups.
            </p>
            <p>
              Compliance and audit functions use ATT&amp;CK to translate between
              technical operations and control frameworks. The NIST OLIR repository
              (csrc.nist.gov/projects/olir) publishes formal informative references
              mapping ATT&amp;CK techniques to NIST SP 800-53 Rev. 5 controls and
              to the NIST Cybersecurity Framework subcategories. Audit reports
              increasingly accept ATT&amp;CK coverage maps as evidence of
              detection program maturity, particularly under SOC 2 Type II Common
              Criteria CC7 (system monitoring).
            </p>
            <p>
              Vendors of EDR, XDR, NDR, and SIEM platforms publish their own
              ATT&amp;CK coverage matrices. Microsoft, CrowdStrike, SentinelOne,
              Palo Alto Cortex, Trellix, Sophos, Trend Micro, and Cisco all
              publish technique coverage statements. These vendor claims are then
              independently tested in MITRE Engenuity ATT&amp;CK Evaluations, the
              raw results of which are published openly &mdash; including
              detection categorization (none / telemetry / general / tactic /
              technique), so that an enterprise buyer can audit a vendor&rsquo;s
              actual instrumentation, not just its marketing.
            </p>
            <p>
              Finally, incident responders use ATT&amp;CK to communicate. A
              post-incident report that says &ldquo;the adversary used T1190
              (Exploit Public-Facing Application) for initial access, T1505.003
              (Web Shell) for persistence, T1003.001 (LSASS Memory) for credential
              access, and T1567 (Exfiltration Over Web Service) for data
              egress&rdquo; is parseable by any cybersecurity professional anywhere
              in the world without ambiguity. That common vocabulary, more than
              any single technical insight in the matrix, is ATT&amp;CK&rsquo;s
              deepest contribution.
            </p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-normal text-[#f2efe9]">
            What it is NOT
          </h2>
          <div className="space-y-6 text-base leading-[1.8] text-[#d8d4cd]">
            <p>
              MITRE ATT&amp;CK is not a maturity model. It does not score an
              organization&rsquo;s security program on a 1&ndash;5 scale. Coverage
              of more techniques is not strictly better &mdash; meaningful
              coverage of techniques relevant to the organization&rsquo;s threat
              model is what matters, which is why threat-informed defense programs
              deliberately weight coverage by adversary relevance rather than
              chasing matrix-wide heatmaps.
            </p>
            <p>
              ATT&amp;CK is not the Kill Chain renamed. The Lockheed Martin Cyber
              Kill Chain is a seven-stage linear intrusion model focused on
              disrupting the pre-exploitation pipeline. ATT&amp;CK is a non-linear
              behavioral matrix focused on post-compromise visibility. The two
              coexist &mdash; many organizations explicitly map the early Kill
              Chain stages (Reconnaissance, Weaponization, Delivery, Exploitation)
              onto ATT&amp;CK Reconnaissance, Resource Development, and Initial
              Access tactics, then use ATT&amp;CK for everything after.
            </p>
            <p>
              ATT&amp;CK is not a control framework. It does not tell an
              organization what to implement. NIST SP 800-53, ISO/IEC 27001, CIS
              Critical Security Controls v8, and the NIST Cybersecurity Framework
              are control frameworks. ATT&amp;CK is a <em>threat</em> framework.
              Mappings between the two (via the NIST OLIR program, the Center for
              Threat-Informed Defense&rsquo;s Mappings Explorer, and vendor
              crosswalks) exist precisely because the two are distinct artifacts.
            </p>
            <p>
              ATT&amp;CK is not exhaustive. It is curated. Techniques are added
              only when MITRE has multiple public reports of real-world use. Novel
              or single-occurrence techniques are tracked but may not appear in
              the public matrix until corroborated. This is a deliberate epistemic
              choice: ATT&amp;CK is meant to reflect observed adversary behavior,
              not theoretical possibilities.
            </p>
            <p>
              ATT&amp;CK is not a how-to-attack guide, despite occasional online
              claims to that effect. Each technique entry describes adversary
              objective and defender-relevant detection guidance. It does not
              publish weaponized code, exploit chains, or operator-grade
              tradecraft. Operational tooling &mdash; Cobalt Strike, Sliver,
              Mimikatz, Metasploit &mdash; exists separately in the commercial and
              open-source ecosystems and is referenced by ATT&amp;CK as Software
              entries with citations, not as runnable instructions.
            </p>
          </div>
        </section>

        <section className="mb-16 border-t border-[#26231f] pt-12">
          <h2 className="mb-8 text-3xl font-normal text-[#f2efe9]">
            Further reading
          </h2>
          <ul className="space-y-4 text-base leading-[1.7] text-[#d8d4cd]">
            <li className="border-l border-[#3a3833] pl-4">
              MITRE Corporation,{" "}
              <em className="text-[#f2efe9]">
                MITRE ATT&amp;CK: Design and Philosophy
              </em>
              , Strom, Applebaum, Miller, Nickels, Pennington, Thomas, MITRE
              Technical Report MP180360R1, revised March 2020 &mdash;{" "}
              <span className="text-[#7a7670] text-sm">
                attack.mitre.org/docs/ATTACK_Design_and_Philosophy_March_2020.pdf
              </span>
            </li>
            <li className="border-l border-[#3a3833] pl-4">
              Hutchins, Cloppert, Amin,{" "}
              <em className="text-[#f2efe9]">
                Intelligence-Driven Computer Network Defense Informed by Analysis
                of Adversary Campaigns and Intrusion Kill Chains
              </em>
              , Lockheed Martin Corporation, 2011 &mdash; the original Cyber Kill
              Chain paper.
            </li>
            <li className="border-l border-[#3a3833] pl-4">
              NIST Special Publication 800-150,{" "}
              <em className="text-[#f2efe9]">
                Guide to Cyber Threat Information Sharing
              </em>
              , October 2016, Johnson, Badger, Waltermire, Snyder, Skorupka.
            </li>
            <li className="border-l border-[#3a3833] pl-4">
              NIST Special Publication 800-53 Revision 5,{" "}
              <em className="text-[#f2efe9]">
                Security and Privacy Controls for Information Systems and
                Organizations
              </em>
              , September 2020 (updated December 2020).
            </li>
            <li className="border-l border-[#3a3833] pl-4">
              CISA and MITRE Center for Threat-Informed Defense,{" "}
              <em className="text-[#f2efe9]">
                Best Practices for MITRE ATT&amp;CK Mapping
              </em>
              , June 2021, updated February 2023.
            </li>
            <li className="border-l border-[#3a3833] pl-4">
              MITRE Engenuity Center for Threat-Informed Defense, ATT&amp;CK
              Evaluations methodology and historical results &mdash;{" "}
              <span className="text-[#7a7670] text-sm">
                attackevals.mitre-engenuity.org
              </span>
            </li>
            <li className="border-l border-[#3a3833] pl-4">
              OASIS Cyber Threat Intelligence (CTI) Technical Committee, STIX 2.1
              specification &mdash;{" "}
              <span className="text-[#7a7670] text-sm">
                docs.oasis-open.org/cti/stix/v2.1/
              </span>
            </li>
            <li className="border-l border-[#3a3833] pl-4">
              MITRE D3FEND knowledge graph, NSA-funded counterpart to ATT&amp;CK
              &mdash;{" "}
              <span className="text-[#7a7670] text-sm">d3fend.mitre.org</span>
            </li>
          </ul>
        </section>

        <footer className="mt-24 border-t border-[#26231f] pt-8 text-xs uppercase tracking-[0.24em] text-[#7a7670]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span>AtomEons / Learn / Cyber</span>
            <span>Public Information Only &mdash; Defensive Doctrine</span>
          </div>
        </footer>
      </article>
    </main>
  );
}