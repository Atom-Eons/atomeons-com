import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Zero Trust Architecture — NIST SP 800-207 · AtomEons Cyber",
  description:
    "Zero Trust is an architectural posture, not a product. NIST SP 800-207 defines the seven tenets. Identity becomes the new perimeter; every request is authenticated, authorized, and continually verified. Forrester ZTX, BeyondCorp, and what actually ships.",
  alternates: { canonical: "https://atomeons.com/learn/cyber/zero-trust" },
  openGraph: {
    title: "Zero Trust Architecture · AtomEons",
    description: "NIST SP 800-207, the seven tenets, and what actually ships behind the slogan.",
    url: "https://atomeons.com/learn/cyber/zero-trust",
    type: "article",
  },
};

export default function ZeroTrustPage() {
  return (
    <main className="bg-[#08090B] text-[#F4F4F2] antialiased">
      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-4xl px-6 pt-20 pb-12 md:px-10 md:pt-28 md:pb-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#5A6068]">
            <Link href="/learn/cyber" className="hover:text-[#22F0D5] transition-colors">§ Cyber</Link>
            <span className="mx-3 text-[#1F242B]">·</span>
            <span className="text-[#22F0D5]">Architecture · defensive doctrine</span>
          </p>
          <h1 className="mt-8 max-w-[26ch] text-balance text-[clamp(36px,6vw,72px)] font-extralight leading-[1.04] tracking-[-0.025em] text-[#F4F4F2]">
            Zero Trust — never trust, always verify
          </h1>
          <p className="mt-8 max-w-[64ch] font-serif text-[19px] leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            Zero Trust is the architectural rejection of the network
            perimeter as a security boundary. Every access decision becomes
            a per-request judgment about identity, device, and context —
            not about which network segment the request came from.
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-6 py-16 md:px-10 md:py-24">
        <section className="space-y-6">
          <h2 className="font-serif text-[28px] font-light text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>What it is</h2>
          <p className="font-serif text-[18px] leading-[1.65] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            Zero Trust Architecture (ZTA) is the formal doctrine that
            "trust" should not be granted based on network location — not
            even to traffic inside the corporate LAN. Every request to a
            resource gets explicitly authenticated, authorized, and
            continuously evaluated against current context (device posture,
            identity assurance, time, sensitivity of the resource). The
            term traces to John Kindervag's 2010 Forrester report; it
            became US federal doctrine when NIST published SP 800-207 in
            August 2020 and Executive Order 14028 (May 2021) mandated
            agency migration.
          </p>
          <p className="font-serif text-[18px] leading-[1.65] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            The architectural premise: in a world of cloud SaaS, remote
            work, BYO devices, and lateral-movement intrusions, the
            castle-and-moat model — strong perimeter, soft interior —
            failed. The 2013 Target breach (HVAC vendor pivots to POS),
            the 2014 OPM breach (lateral movement to SF-86 archives), and
            countless ransomware events all proved that once an attacker
            crosses the perimeter, the interior collapses. Zero Trust says:
            assume the attacker is already inside, design every interaction
            accordingly.
          </p>
        </section>

        <section className="mt-16 space-y-6">
          <h2 className="font-serif text-[28px] font-light text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>How it actually works</h2>
          <p className="font-serif text-[18px] leading-[1.65] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            NIST SP 800-207 defines <em>seven tenets</em>. (1) All data
            sources and computing services are resources. (2) All
            communication is secured regardless of network location.
            (3) Access to individual resources is granted per-session.
            (4) Access is determined by a dynamic policy including
            observable client identity, application, requesting asset,
            and may include other behavioral and environmental attributes.
            (5) The enterprise monitors and measures the integrity and
            security posture of all owned and associated assets. (6) All
            resource authentication and authorization are dynamic and
            strictly enforced before access is allowed. (7) The enterprise
            collects as much information as possible about the current
            state of assets, network infrastructure, and communications and
            uses it to improve its security posture.
          </p>
          <p className="font-serif text-[18px] leading-[1.65] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            Two reference architectures dominate. <em>NIST's PEP/PDP
            model</em> places a <em>Policy Enforcement Point</em> (PEP) in
            front of every resource. Every request hits the PEP, which
            consults a <em>Policy Decision Point</em> (PDP) — typically a
            cloud identity service fed by signals from MDM, EDR, SIEM,
            CASB, threat intelligence. The PDP says yes/no based on the
            full context; the PEP enforces. <em>Forrester's ZTX</em>{" "}
            (Zero Trust eXtended) is a vendor-categorization framework:
            data, networks, people, workloads, devices, visibility,
            automation. Most enterprise ZTA deployments combine elements
            of both.
          </p>
          <p className="font-serif text-[18px] leading-[1.65] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            The canonical production example is{" "}
            <em>Google BeyondCorp</em>. Google rebuilt its entire access
            model after Operation Aurora (the 2009 nation-state intrusion).
            By 2014, BeyondCorp replaced the corporate VPN entirely:
            employees access internal applications via an identity-aware
            proxy that checks user identity, device certificate, and device
            posture on every request. Google published the architecture in
            a series of <em>;login:</em> magazine papers starting 2014.
            BeyondCorp is now productized as Google Cloud's BeyondCorp
            Enterprise; the same pattern ships as Cloudflare Access,
            Zscaler Private Access, Tailscale, and several others.
          </p>
          <p className="font-serif text-[18px] leading-[1.65] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            <em>Microsegmentation</em> is the network-layer move that
            often gets called "zero trust networking." Instead of one flat
            VLAN, each workload gets its own micro-perimeter; east-west
            traffic between workloads requires the same identity-and-policy
            check as north-south traffic from outside. VMware NSX, Illumio,
            Cisco Secure Workload, and the major cloud providers' native
            firewall stacks (AWS Security Groups, Azure NSGs, GCP VPC
            firewall rules) are the implementation surface.
          </p>
          <p className="font-serif text-[18px] leading-[1.65] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            <em>Phishing-resistant authentication</em> — FIDO2 / WebAuthn /
            passkeys, sometimes paired with device certificates — is the
            identity layer that makes ZTA real. A "zero-trust" deployment
            built on push-MFA that can be social-engineered is just zero-
            trust theater. CISA, NIST SP 800-63B Rev. 4, and OMB
            Memorandum M-22-09 all explicitly require phishing-resistant
            MFA for federal-systems ZTA migrations.
          </p>
        </section>

        <section className="mt-16 space-y-6">
          <h2 className="font-serif text-[28px] font-light text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>Receipts</h2>
          <ol className="space-y-4 font-serif text-[17px] leading-[1.6] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            <li className="border-l-2 border-[#22F0D5]/40 pl-5">
              NIST Special Publication 800-207, <em>Zero Trust Architecture</em>, August 2020. <span className="font-mono text-[12px] text-[#5A6068]">doi.org/10.6028/NIST.SP.800-207</span>
            </li>
            <li className="border-l-2 border-[#22F0D5]/40 pl-5">
              Executive Order 14028, <em>Improving the Nation's Cybersecurity</em>, May 12, 2021 — mandates federal ZTA migration.
            </li>
            <li className="border-l-2 border-[#22F0D5]/40 pl-5">
              OMB Memorandum M-22-09, <em>Moving the U.S. Government Toward Zero Trust Cybersecurity Principles</em>, January 26, 2022 — required phishing-resistant MFA + EDR + log retention by FY2024 deadlines.
            </li>
            <li className="border-l-2 border-[#22F0D5]/40 pl-5">
              CISA Zero Trust Maturity Model v2.0, April 2023 — operationalizes NIST 800-207 across five pillars (identity, devices, networks, applications, data).
            </li>
            <li className="border-l-2 border-[#22F0D5]/40 pl-5">
              Kindervag, John. <em>No More Chewy Centers: Introducing the Zero Trust Model of Information Security</em>, Forrester Research, 2010 — the original "zero trust" coining.
            </li>
            <li className="border-l-2 border-[#22F0D5]/40 pl-5">
              Ward, Beyer, et al. <em>BeyondCorp: A New Approach to Enterprise Security</em>, <em>;login:</em> magazine Vol. 39 No. 6, USENIX, December 2014. (Followed by five additional BeyondCorp papers through 2018.)
            </li>
            <li className="border-l-2 border-[#22F0D5]/40 pl-5">
              NIST SP 800-63B Rev. 4 (Draft), <em>Digital Identity Guidelines — Authentication and Authenticator Management</em> — formal requirement structure for phishing-resistant MFA.
            </li>
            <li className="border-l-2 border-[#22F0D5]/40 pl-5">
              FIDO Alliance Passkeys specification — <span className="font-mono text-[12px] text-[#5A6068]">fidoalliance.org/passkeys</span> — the WebAuthn-based phishing-resistant authentication standard.
            </li>
            <li className="border-l-2 border-[#22F0D5]/40 pl-5">
              CISA Cybersecurity Advisory on Salt Typhoon, AA24-290A (October 2024) — public attribution detailing why classical perimeter+VPN telecom architectures failed catastrophically against Chinese MSS access.
            </li>
            <li className="border-l-2 border-[#22F0D5]/40 pl-5">
              National Security Memorandum NSM-22 (April 2024) — extends zero-trust principles to critical infrastructure sectors beyond federal civilian.
            </li>
          </ol>
        </section>

        <section className="mt-16 space-y-6">
          <h2 className="font-serif text-[28px] font-light text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>What practitioners do with it</h2>
          <p className="font-serif text-[18px] leading-[1.65] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            Real ZTA programs are migration programs, not greenfield builds.
            A typical sequence: first inventory all applications and
            classify them by sensitivity. Then deploy a strong identity
            layer (IdP consolidation, MFA enforcement, conditional access
            policies). Then put an identity-aware proxy or SSE/SASE
            platform (Zscaler, Netskope, Cloudflare One, Palo Alto Prisma)
            in front of high-value applications; retire the VPN for those.
            Then push device-posture signals from MDM/EDR into the access
            decision (Microsoft Intune + Defender, Jamf + Crowdstrike,
            etc.). Then microsegment workloads in cloud and data-center.
            The federal M-22-09 deadlines drove this sequence across
            agencies between 2022 and 2024.
          </p>
          <p className="font-serif text-[18px] leading-[1.65] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            For non-federal organizations the same pattern applies, scaled
            to budget. The minimum-viable ZTA for a 200-person company is:
            phishing-resistant MFA (passkeys) on every account, conditional
            access policies that check device posture before granting
            sensitive-app access, IdP-fronted SSO for everything, and an
            identity-aware proxy for the few legacy apps that don't speak
            OIDC. Microsegmentation typically waits until the org is in the
            500+ range.
          </p>
          <p className="font-serif text-[18px] leading-[1.65] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            For a SOC analyst, ZTA changes the threat-hunting surface. With
            VPNs retired, the "internal network" is a thinner layer; most
            telemetry shifts to identity provider logs (sign-ins, MFA
            challenges, conditional-access decisions), proxy access logs,
            and per-workload microsegmentation flow logs. Detection
            engineering rewrites for this shape: a Sigma rule about
            "unusual lateral SMB traffic" is less useful in a ZTA than a
            rule about "successful sign-in from impossible-travel pattern
            with non-compliant device."
          </p>
        </section>

        <section className="mt-16 space-y-6">
          <h2 className="font-serif text-[28px] font-light text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>What it is NOT</h2>
          <ul className="space-y-4 font-serif text-[17px] leading-[1.6] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            <li className="border border-[#1F242B] bg-[#0F1114] p-5">
              <strong className="text-[#F4F4F2]">Not a product you can
              buy.</strong> No vendor sells "Zero Trust." They sell
              components — IdP, EDR, SSE, microsegmentation, passkeys.
              An RFP that says "we need Zero Trust" gets a different
              response than "we need to implement the NIST 800-207
              architecture for these 47 applications."
            </li>
            <li className="border border-[#1F242B] bg-[#0F1114] p-5">
              <strong className="text-[#F4F4F2]">Not "no trust."</strong>
              Trust still exists — it's just per-session, contextual, and
              revocable, not based on a network membership token. The
              control plane still has to be trusted; the question is
              whether the control plane itself is built defensibly.
            </li>
            <li className="border border-[#1F242B] bg-[#0F1114] p-5">
              <strong className="text-[#F4F4F2]">Not a replacement for
              defense-in-depth.</strong> ZTA is one layer. Endpoint
              detection, network telemetry, vulnerability management, and
              incident response still matter. A ZTA-mature org with no
              SIEM is still blind to lateral compromise.
            </li>
            <li className="border border-[#1F242B] bg-[#0F1114] p-5">
              <strong className="text-[#F4F4F2]">Not VPN replacement
              alone.</strong> Replacing the corporate VPN with an
              identity-aware proxy is a useful step but is not the full
              architecture. Without device posture, conditional access,
              and per-resource authorization, you've just moved the
              perimeter, not eliminated it.
            </li>
          </ul>
        </section>

        <section className="mt-16 space-y-6">
          <h2 className="font-serif text-[28px] font-light text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>Further reading</h2>
          <ul className="space-y-3 font-serif text-[16px] leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            <li><a href="https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-207.pdf" target="_blank" rel="noopener noreferrer" className="text-[#22F0D5] underline decoration-[#1F242B] underline-offset-4 hover:decoration-[#22F0D5]">NIST SP 800-207 (PDF)</a> — the canonical reference document.</li>
            <li><a href="https://www.cisa.gov/zero-trust-maturity-model" target="_blank" rel="noopener noreferrer" className="text-[#22F0D5] underline decoration-[#1F242B] underline-offset-4 hover:decoration-[#22F0D5]">CISA Zero Trust Maturity Model v2.0</a> — the federal-civilian implementation playbook.</li>
            <li><a href="https://research.google/pubs/beyondcorp-a-new-approach-to-enterprise-security/" target="_blank" rel="noopener noreferrer" className="text-[#22F0D5] underline decoration-[#1F242B] underline-offset-4 hover:decoration-[#22F0D5]">Google BeyondCorp papers (USENIX ;login:)</a> — the real-world reference architecture.</li>
            <li><a href="https://csrc.nist.gov/pubs/sp/800/63/b/4/ipd" target="_blank" rel="noopener noreferrer" className="text-[#22F0D5] underline decoration-[#1F242B] underline-offset-4 hover:decoration-[#22F0D5]">NIST SP 800-63B Rev. 4</a> — phishing-resistant authentication requirements.</li>
            <li><a href="https://fidoalliance.org/passkeys/" target="_blank" rel="noopener noreferrer" className="text-[#22F0D5] underline decoration-[#1F242B] underline-offset-4 hover:decoration-[#22F0D5]">FIDO Alliance — Passkeys</a> — the WebAuthn standard underlying modern ZTA identity layers.</li>
            <li><Link href="/q/what-is-zero-trust" className="text-[#22F0D5] underline decoration-[#1F242B] underline-offset-4 hover:decoration-[#22F0D5]">AtomEons Q-page · What is zero-trust architecture?</Link></li>
            <li><Link href="/learn/cyber/salt-typhoon-2024" className="text-[#22F0D5] underline decoration-[#1F242B] underline-offset-4 hover:decoration-[#22F0D5]">AtomEons · Salt Typhoon 2024 breach postmortem</Link> — the live example of what perimeter-only architectures cost.</li>
          </ul>
        </section>

        <section className="mt-20 border-t border-[#1F242B] pt-12">
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/learn/cyber" className="inline-flex items-center gap-2 border border-[#1F242B] bg-[#0F1114] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#F4F4F2] hover:border-[#22F0D5] hover:text-[#22F0D5]">
              <span aria-hidden>←</span><span>Back to Cyber catalog</span>
            </Link>
            <Link href="/learn/cyber/nist-csf" className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9CA3AF] hover:text-[#22F0D5]">NIST CSF 2.0 →</Link>
            <Link href="/learn/cyber/mitre-attack" className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9CA3AF] hover:text-[#22F0D5]">MITRE ATT&amp;CK →</Link>
          </div>
        </section>
      </article>
    </main>
  );
}
