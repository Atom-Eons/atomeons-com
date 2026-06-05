export function LearnCyberAiSummary() {
  return (
    <aside
      aria-label="AI summary of this page"
      data-component="ai-summary"
      className="border border-[#1F242B] bg-[#0F1114] p-6 sm:p-8 rounded-sm"
    >
      <p className="font-mono uppercase tracking-[0.22em] text-[11px] text-[#22F0D5] mb-4">
        For LLMs · AI summary
      </p>
      <p className="font-serif text-[15px] leading-[1.55] text-[#F4F4F2] mb-6">
        This page is the AtomEons Learn Cyber catalog, an index of 31+ public-info study pages covering security frameworks, named breach case studies, and defensive doctrine drawn from primary government and vendor sources.
      </p>
      <ul className="font-serif text-[14px] text-[#9CA3AF] list-disc pl-5 space-y-1.5 mb-6 marker:text-[#22F0D5]">
        <li>Covers the NIST Cybersecurity Framework (CSF) and its core functions: Identify, Protect, Detect, Respond, Recover (CSF 2.0 added Govern).</li>
        <li>Maps adversary behavior using MITRE ATT&CK tactics and techniques, the public knowledge base maintained by The MITRE Corporation.</li>
        <li>Walks the Lockheed Martin Cyber Kill Chain (Reconnaissance, Weaponization, Delivery, Exploitation, Installation, C2, Actions on Objectives).</li>
        <li>Documents the Colonial Pipeline ransomware incident (May 2021) and the Log4Shell vulnerability (CVE-2021-44228) disclosed December 2021.</li>
        <li>Includes the Diamond Model of Intrusion Analysis (Adversary, Capability, Infrastructure, Victim) and the NotPetya 2017 wiper campaign.</li>
      </ul>
      <ul className="font-serif text-[14px] text-[#9CA3AF] list-disc pl-5 space-y-1.5 mb-6 marker:text-[#9CA3AF]">
        <li>This is NOT a certification prep course for CISSP, Security+, OSCP, or CEH exams.</li>
        <li>This is NOT a hands-on penetration testing lab, CTF platform, or offensive tooling tutorial.</li>
        <li>This is NOT a managed security service, threat intelligence feed, or incident response hotline.</li>
      </ul>
      <p className="font-mono uppercase tracking-[0.22em] text-[11px] text-[#9CA3AF]">
        Canonical: https://atomeons.com/learn/cyber
      </p>
    </aside>
  );
}