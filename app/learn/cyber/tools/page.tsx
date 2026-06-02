import type { Metadata } from "next";
import Link from "next/link";
import { CyberHeroImage } from "../_components/CyberHeroImage";

/**
 * /learn/cyber/tools — defensive catalogue of the tools every cyber pro knows.
 *
 * Educational stance only. We name the tools because they're in every
 * public textbook and every job description. We do NOT teach how to
 * use them against unauthorized targets — the labs page covers
 * authorized practice environments.
 *
 * Each tool: what it is, who uses it (defenders or both), what category
 * it belongs to, where to learn it legally.
 */

export const metadata: Metadata = {
  title: "Defensive tool catalogue · the tools every cyber pro knows · /learn/cyber/tools · AtomEons",
  description:
    "Burp Suite, Wireshark, Nmap, Metasploit, Ghidra, IDA Pro, Volatility, Maltego, Shodan, Splunk, ELK Stack, Sysmon, Sigma rules, YARA, Mitre Caldera, OWASP ZAP. What each is, who uses it, where to learn it legally.",
  alternates: { canonical: "https://atomeons.com/learn/cyber/tools" },
  openGraph: {
    title: "Defensive tool catalogue",
    description: "What every named cyber tool is, in plain English.",
    url: "https://atomeons.com/learn/cyber/tools",
    type: "article",
  },
  robots: { index: true, follow: true },
};

const ACCENT = "#22F0D5";

const CATEGORIES = [
  {
    name: "Network analysis",
    tools: [
      { name: "Wireshark", role: "both", desc: "Packet capture and analysis. The default network-protocol analyzer for 25+ years. Every NetOps + SOC + IR + reverse-engineer learns it.", learn: "wireshark.org · official docs + Chris Sanders' Practical Packet Analysis textbook" },
      { name: "tcpdump", role: "both", desc: "Command-line packet capture. Wireshark's CLI ancestor. Lighter weight for headless servers + production captures.", learn: "tcpdump.org · manual page is canonical" },
      { name: "Zeek (formerly Bro)", role: "blue team", desc: "Network security monitoring framework. Generates structured logs of network activity. Defensive analysis layer above raw capture.", learn: "zeek.org · official documentation" },
      { name: "Suricata", role: "blue team", desc: "Network IDS/IPS with rule-based detection. Often paired with Zeek for full detection coverage.", learn: "suricata.io · official rule sets via Emerging Threats" },
    ],
  },
  {
    name: "Vulnerability scanning + discovery",
    tools: [
      { name: "Nmap", role: "both", desc: "Network discovery and port scanning. The canonical tool taught in every intro-to-pentest course. Has its own scripting engine (NSE).", learn: "nmap.org · Nmap Network Discovery (Lyon) is the definitive book" },
      { name: "Masscan", role: "both", desc: "Faster than Nmap for internet-scale scans (millions of IPs). Used by both defenders mapping their attack surface and researchers studying internet posture.", learn: "github.com/robertdavidgraham/masscan" },
      { name: "Nuclei", role: "both", desc: "Template-driven vulnerability scanner. Community-curated YAML templates for CVEs and misconfigurations. Defenders use it for asset coverage.", learn: "github.com/projectdiscovery/nuclei · their academy is free" },
      { name: "Shodan", role: "both", desc: "Search engine for internet-connected devices. Defenders use it to find their own exposed assets before attackers do.", learn: "shodan.io · official documentation + Shodan CLI" },
    ],
  },
  {
    name: "Web application security",
    tools: [
      { name: "Burp Suite (PortSwigger)", role: "both", desc: "The dominant web-application security testing platform. Community Edition free; Pro version industry-standard for AppSec pros. Required for OSCP/OSWE prep.", learn: "portswigger.net · their Web Security Academy is free + the canonical web-security textbook" },
      { name: "OWASP ZAP", role: "both", desc: "Open-source alternative to Burp Suite. Strong CI/CD integration story. Used heavily in DAST pipelines.", learn: "zaproxy.org · official getting-started + ZAP-in-CI integration guides" },
      { name: "sqlmap", role: "both", desc: "SQL injection automation tool. Used by defenders for testing their own application's resilience. NEVER use against systems you don't own or have explicit authorization to test.", learn: "sqlmap.org · official documentation only · use in lab environments" },
      { name: "Postman / Insomnia", role: "both", desc: "Not security tools per se, but every web AppSec pro uses them to inspect and replay API calls under controlled conditions.", learn: "postman.com / insomnia.rest · official docs" },
    ],
  },
  {
    name: "Reverse engineering + malware analysis",
    tools: [
      { name: "Ghidra", role: "blue team + research", desc: "NSA-developed reverse-engineering framework. Open-source since 2019. Strong competitor to commercial IDA Pro. Required for malware-analyst roles.", learn: "ghidra-sre.org · NSA's own training material + Practical Malware Analysis textbook" },
      { name: "IDA Pro / IDA Free", role: "blue team + research", desc: "Commercial reverse-engineering standard for 25+ years. Hex-Rays decompiler is the industry-best. IDA Free has limitations but learns the workflow.", learn: "hex-rays.com · free trial + The IDA Pro Book (Eagle)" },
      { name: "Volatility", role: "blue team", desc: "Memory-forensics framework. Reads memory dumps from infected systems to extract IOCs, find injected code, recover artifacts. Required for IR roles.", learn: "volatilityfoundation.org · The Art of Memory Forensics textbook" },
      { name: "x64dbg / WinDbg", role: "blue team + research", desc: "Windows debuggers. x64dbg open-source, WinDbg from Microsoft. Used in malware analysis and exploit research.", learn: "x64dbg.com · official docs · Microsoft Learn for WinDbg" },
    ],
  },
  {
    name: "OSINT + threat intelligence",
    tools: [
      { name: "Maltego", role: "both", desc: "Open-source intelligence + link-analysis. Visualizes relationships between entities (domains, emails, IPs, people). Used in threat-intel research + investigative journalism.", learn: "maltego.com · Community Edition free + their academy" },
      { name: "SpiderFoot", role: "both", desc: "Automated OSINT collection. Aggregates many sources into a single investigation. Used by defenders to inventory their public footprint.", learn: "github.com/smicallef/spiderfoot · official docs" },
      { name: "VirusTotal", role: "both", desc: "Multi-engine malware-scanning + threat-intel platform. Defenders use it for IOC lookups + sample analysis. Free + paid tiers.", learn: "virustotal.com · official docs" },
      { name: "MISP", role: "blue team", desc: "Threat-intelligence sharing platform. Open-source. Used by SOCs + ISACs to share IOCs and TTPs.", learn: "misp-project.org · official getting-started + community sharing groups" },
    ],
  },
  {
    name: "SIEM + detection engineering",
    tools: [
      { name: "Splunk", role: "blue team", desc: "Dominant commercial SIEM. Splunk SPL (search language) is industry-standard. Heavy enterprise + DoD presence.", learn: "splunk.com · Splunk Free tier + their Boss of the SOC training" },
      { name: "Elastic / ELK Stack", role: "blue team", desc: "Open-source SIEM (Elasticsearch + Logstash + Kibana + Beats). Free for small deployments. Strong adoption in defender community.", learn: "elastic.co · their documentation + free trial" },
      { name: "Sysmon", role: "blue team", desc: "Microsoft Sysinternals tool that generates rich Windows event logs. Foundational for any Windows endpoint detection program. Free.", learn: "Microsoft Sysinternals docs + SwiftOnSecurity Sysmon config" },
      { name: "Sigma rules", role: "blue team", desc: "Open-source format for SIEM detection rules. Platform-agnostic (compiles to Splunk SPL, Elastic DSL, Sentinel KQL, etc.). The MITRE-ATT&CK-mapped detection language.", learn: "github.com/SigmaHQ/sigma · the Sigma Specification docs" },
    ],
  },
  {
    name: "Endpoint + IR + forensics",
    tools: [
      { name: "OSQuery", role: "blue team", desc: "SQL-queryable view of endpoint state. Asset inventory, file integrity, process listings — all via SQL. Open-source.", learn: "osquery.io · official documentation + their fleet of training material" },
      { name: "Velociraptor", role: "blue team", desc: "Open-source IR + threat-hunting platform. Query endpoints at scale during incidents. Built by Rapid7 and now community-maintained.", learn: "docs.velociraptor.app · official documentation" },
      { name: "Autopsy", role: "blue team + LE", desc: "Open-source digital-forensics platform built on The Sleuth Kit. Used in DFIR + law enforcement investigations.", learn: "autopsy.com · official documentation + DFIR training programs" },
      { name: "GRR Rapid Response", role: "blue team", desc: "Google's open-source remote-forensic framework. Used at scale for fleet IR + threat-hunting.", learn: "grr-doc.readthedocs.io · official documentation" },
    ],
  },
  {
    name: "Detection engineering + adversary emulation",
    tools: [
      { name: "MITRE ATT&CK", role: "blue team + research", desc: "Knowledge base of adversary tactics + techniques + procedures. Not a tool but a framework — every detection engineer uses it. Free + open.", learn: "attack.mitre.org · the framework itself · MITRE Caldera for adversary emulation" },
      { name: "MITRE Caldera", role: "blue team", desc: "Automated adversary-emulation platform from MITRE. Test your defenses against ATT&CK techniques without manual scripting.", learn: "caldera.mitre.org · official documentation" },
      { name: "Atomic Red Team", role: "blue team", desc: "Library of small, executable tests mapped to ATT&CK techniques. Defenders use them to verify their detections actually fire. From Red Canary.", learn: "atomicredteam.io · Red Canary's training material" },
      { name: "YARA", role: "blue team", desc: "Pattern-matching language for malware identification. Defenders write YARA rules to detect known malware families + variants. Foundational malware-analysis skill.", learn: "virustotal.github.io/yara · official documentation + The Yara-Forensics field guide" },
    ],
  },
];

export default function CyberToolsPage() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <CyberHeroImage slug="labs" alt="Overhead photograph of a dark workbench with a black keyboard, closed laptop, and coiled cable arranged on dark concrete." />
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[11px] tracking-[0.08em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn/cyber" className="hover:text-[#22F0D5]">Cyber</Link>{" "}
          <span className="text-[#1A2225]">/</span> Tools
        </p>
      </div>

      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>
            The defensive tool catalogue
          </p>
          <h1 className="mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl md:leading-[1]">
            32 tools every cyber pro{" "}
            <span style={{ color: ACCENT }}>needs to recognize.</span>
          </h1>
          <p className="mt-8 max-w-[62ch] text-base leading-[1.7] text-[#C8CCCE] md:text-[17px]">
            These are the tools that appear in every job description, every textbook, every conference talk. The goal of this page is recognition + categorization + where to learn each one legally — not a how-to-attack manual.
          </p>
          <p className="mt-5 max-w-[62ch] text-sm leading-[1.6] text-[#FFB87A]">
            Defensive frame throughout. Practice tools against systems you own or labs designed to be broken (TryHackMe, HackTheBox, CyberDefenders). Never against unauthorized targets — see <Link href="/learn/cyber/legal" className="underline decoration-[#FFB87A]/40 underline-offset-2 hover:decoration-[#FFB87A]">/learn/cyber/legal</Link>.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-5xl px-6 py-16 md:py-24 space-y-16">
          {CATEGORIES.map((cat, ci) => (
            <div key={cat.name}>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
                ::category {String(ci + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
                {cat.name}
              </h2>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {cat.tools.map((t) => (
                  <article key={t.name} className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-xl font-medium tracking-tight text-[#F2F4F5]">{t.name}</h3>
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#9BA5A7]">{t.role}</p>
                    </div>
                    <p className="mt-4 text-[14px] leading-[1.65] text-[#C8CCCE]">{t.desc}</p>
                    <p className="mt-4 font-mono text-[11px] text-[#9BA5A7]">
                      <span className="text-[#22F0D5]">::learn</span> {t.learn}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-[#1A2225] bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 text-center">
          <h2 className="text-balance text-2xl font-medium tracking-tight text-[#F2F4F5] md:text-3xl">
            Authorized practice only.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-[1.65] text-[#C8CCCE]">
            Every tool above is dual-use. The ones marked &ldquo;both&rdquo; can be wielded for defense or attack depending on authorization. The line between &ldquo;security researcher&rdquo; and &ldquo;federal indictment&rdquo; is whether you have written permission from the system owner. Read{" "}
            <Link href="/learn/cyber/legal" className="text-[#22F0D5] underline decoration-[#22F0D5]/40 underline-offset-2 hover:decoration-[#22F0D5]">/learn/cyber/legal</Link>{" "}
            before you touch any of them against something outside a sanctioned lab.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link href="/learn/cyber/labs" className="inline-flex items-center gap-2 rounded-full bg-[#22F0D5] px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-[#1AD4BD]">
              Open the labs page →
            </Link>
            <Link href="/learn/cyber/legal" className="inline-flex items-center gap-2 rounded-full border border-[#FFB87A]/40 px-5 py-2.5 text-sm font-medium text-[#FFB87A] transition-colors hover:bg-[#FFB87A]/10">
              Read the legal page first →
            </Link>
            <Link href="/learn/cyber" className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] px-5 py-2.5 text-sm text-[#9BA5A7] transition-colors hover:text-[#E7EBED]">
              ← cyber index
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
