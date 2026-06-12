import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Email Security Stack — SPF, DKIM, DMARC, BIMI · AtomEons Cyber",
  description: "The four protocols that make email authentication work. How layered defense actually works, why most domains misconfigure DMARC, and what enforcement looks like in 2026.",
  alternates: { canonical: "https://atomeons.com/learn/cyber/email-security-stack" },
  openGraph: { title: "Email Security Stack · AtomEons", description: "SPF + DKIM + DMARC + BIMI — the layered authentication that beats spoofing.", url: "https://atomeons.com/learn/cyber/email-security-stack", type: "article" },
};

export default function Page() {
  return (
    <main className="bg-[#08090B] text-[#F4F4F2] antialiased">
      <section className="border-b border-[#1F242B]"><div className="mx-auto max-w-4xl px-6 pt-20 pb-12 md:px-10 md:pt-28 md:pb-20">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#7a818a]"><Link href="/learn/cyber" className="hover:text-[#22F0D5]">§ Cyber</Link><span className="mx-3 text-[#1F242B]">·</span><span className="text-[#22F0D5]">Email · authentication</span></p>
        <h1 className="mt-8 max-w-[26ch] text-balance text-[clamp(36px,6vw,72px)] font-extralight leading-[1.04] tracking-[-0.025em] text-[#F4F4F2]">Email security stack — SPF, DKIM, DMARC, BIMI</h1>
        <p className="mt-8 max-w-[64ch] font-serif text-[19px] leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>Four DNS-based authentication protocols layered together. SPF authenticates the sending server. DKIM cryptographically signs the message. DMARC tells receivers what to do when SPF or DKIM fails. BIMI displays a verified logo when all three pass. Most domains have one or two configured wrong.</p>
      </div></section>

      <article className="mx-auto max-w-3xl px-6 py-16 md:px-10 md:py-24 space-y-12">
        <section className="space-y-5"><h2 className="font-serif text-[28px] font-light" style={{ fontFamily: "Newsreader, Georgia, serif" }}>How each layer works</h2><p className="font-serif text-[18px] leading-[1.65] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}><em>SPF</em> (Sender Policy Framework, RFC 7208) is a DNS TXT record at example.com that lists the IP addresses authorized to send mail for example.com. A receiver checks the SMTP envelope sender against the SPF record; mismatch is a fail. Limitation: SPF doesn&apos;t survive forwarding — the forwarder&apos;s IP isn&apos;t in the original SPF record.</p><p className="font-serif text-[18px] leading-[1.65] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}><em>DKIM</em> (DomainKeys Identified Mail, RFC 6376) attaches a cryptographic signature to each outgoing message using a private key. The corresponding public key lives in a DNS TXT record at selector._domainkey.example.com. Receivers verify the signature against headers and body. DKIM does survive forwarding because the signature travels with the message.</p><p className="font-serif text-[18px] leading-[1.65] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}><em>DMARC</em> (Domain-based Message Authentication, Reporting and Conformance, RFC 7489) is the policy layer. A DMARC record at _dmarc.example.com declares what to do when SPF and/or DKIM fail: <code>p=none</code> (just report), <code>p=quarantine</code> (junk folder), <code>p=reject</code> (bounce). DMARC also requires <em>alignment</em>: the domain in the From header must match the SPF / DKIM domain. This closes the &quot;display-from spoofing&quot; gap that SPF alone leaves open.</p><p className="font-serif text-[18px] leading-[1.65] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}><em>BIMI</em> (Brand Indicators for Message Identification, AuthIndicators Working Group, deployed by Gmail / Apple Mail / Yahoo since 2021-2023) displays a verified brand logo next to authenticated messages. Requires DMARC at <code>p=quarantine</code> or stricter + a Verified Mark Certificate (VMC) issued by a Certificate Authority that confirms trademark ownership. Cosmetic but effective at building user trust.</p></section>

        <section className="space-y-5"><h2 className="font-serif text-[28px] font-light" style={{ fontFamily: "Newsreader, Georgia, serif" }}>Receipts</h2><ol className="space-y-4 font-serif text-[17px] leading-[1.6] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
          <li className="border-l-2 border-[#22F0D5]/40 pl-5">RFC 7208 — <em>Sender Policy Framework (SPF) for Authorizing Use of Domains in Email, Version 1</em>. IETF, April 2014.</li>
          <li className="border-l-2 border-[#22F0D5]/40 pl-5">RFC 6376 — <em>DomainKeys Identified Mail (DKIM) Signatures</em>. IETF, September 2011.</li>
          <li className="border-l-2 border-[#22F0D5]/40 pl-5">RFC 7489 — <em>Domain-based Message Authentication, Reporting, and Conformance (DMARC)</em>. IETF, March 2015.</li>
          <li className="border-l-2 border-[#22F0D5]/40 pl-5">Google Workspace + Yahoo bulk-sender requirements (February 2024) — domains sending 5000+ messages/day to Gmail or Yahoo must have SPF + DKIM + DMARC. Real enforcement deadline that drove industry-wide adoption.</li>
          <li className="border-l-2 border-[#22F0D5]/40 pl-5">BIMI Group, <span className="font-mono text-[12px] text-[#7a818a]">bimigroup.org</span> — the AuthIndicators consortium standards body.</li>
          <li className="border-l-2 border-[#22F0D5]/40 pl-5">M3AAWG (Messaging, Malware and Mobile Anti-Abuse Working Group) — the operator community that publishes best practices for sender configuration.</li>
          <li className="border-l-2 border-[#22F0D5]/40 pl-5">Google Postmaster Tools + Microsoft SNDS — the sender-reputation dashboards every domain operator needs.</li>
        </ol></section>

        <section className="space-y-5"><h2 className="font-serif text-[28px] font-light" style={{ fontFamily: "Newsreader, Georgia, serif" }}>What practitioners do with it</h2><p className="font-serif text-[18px] leading-[1.65] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>Deploy in order. SPF first (one DNS record, immediate). DKIM second (keypair generation + DNS record + mail-server config). DMARC at <code>p=none</code> third, with <code>rua=</code> reporting addresses pointed at a DMARC-report parser (Postmark DMARC Monitor, dmarcian, Valimail). Watch reports for 4-8 weeks to identify every legitimate sending source you forgot about. Add each one to SPF + DKIM. Then move DMARC to <code>p=quarantine</code>, then <code>p=reject</code>. Most enterprises stall between <code>p=none</code> and <code>p=quarantine</code> because someone&apos;s shadow-IT mailer breaks.</p><p className="font-serif text-[18px] leading-[1.65] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>The February 2024 Google + Yahoo bulk-sender requirements forced the industry. Domains sending more than 5,000 messages/day to those providers now MUST have SPF + DKIM + DMARC alignment, one-click unsubscribe (RFC 8058), and complaint-rate compliance. Anything else gets quarantined regardless of content. DMARC adoption past <code>p=reject</code> roughly doubled in 2024.</p></section>

        <section className="space-y-5"><h2 className="font-serif text-[28px] font-light" style={{ fontFamily: "Newsreader, Georgia, serif" }}>What it is NOT</h2><ul className="space-y-4 font-serif text-[17px] leading-[1.6] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
          <li className="border border-[#1F242B] bg-[#0F1114] p-5"><strong className="text-[#F4F4F2]">Not anti-phishing on its own.</strong> Domain authentication prevents spoofing of <em>your</em> domain. It doesn&apos;t stop look-alike domains (apple-support.com, microsoft-billing.com). User training + brand monitoring + impersonation-detection still required.</li>
          <li className="border border-[#1F242B] bg-[#0F1114] p-5"><strong className="text-[#F4F4F2]">Not optional anymore.</strong> Gmail + Yahoo + Outlook all enforce. A domain without proper auth lands in spam for legitimate users.</li>
          <li className="border border-[#1F242B] bg-[#0F1114] p-5"><strong className="text-[#F4F4F2]">Not the same as encryption.</strong> SPF/DKIM/DMARC authenticate sender identity. STARTTLS + DANE + MTA-STS encrypt in transit. Different problems, different protocols.</li>
        </ul></section>

        <div className="border-t border-[#1F242B] pt-12"><Link href="/learn/cyber" className="border border-[#1F242B] bg-[#0F1114] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#F4F4F2] hover:border-[#22F0D5] hover:text-[#22F0D5]">← Back to Cyber</Link></div>
      </article>
    </main>
  );
}
