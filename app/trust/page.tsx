import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Trust · AtomEons posture · audits · security",
  description:
    "The lab's trust posture in writing. No-SaaS perpetual license law, code-signing chain, third-party audits, security disclosure policy, training-data policy, what we will and will not do.",
  alternates: { canonical: "https://atomeons.com/trust" },
};

/**
 * /trust — credibility statement.
 *
 * Operator's working principle: trust is given when a buyer can verify
 * every claim by opening a file. This page collects those files in one
 * place: license posture, security disclosure, training-data policy,
 * the no-SaaS covenant, third-party verification surfaces, and an
 * explicit "what we will not do" list.
 */

const POSTURE = [
  {
    title: "License posture · §4A no-SaaS covenant",
    body:
      "ORANGEBOX and B00KMAKR are sold under a perpetual license whose §4A clause legally bars converting the product to a subscription. If we ever try, the original buyers' licenses cannot be revoked. The full text is in /legal/terms.",
    href: "/legal/terms",
  },
  {
    title: "Security disclosure · RFC 9116 security.txt",
    body:
      "Disclosure contact, 90-day remediation window, in-scope vulnerabilities, free ORANGEBOX license for confirmed high-severity reports. Posted at /.well-known/security.txt.",
    href: "/.well-known/security.txt",
  },
  {
    title: "Training-data policy · ai.txt",
    body:
      "All AtomEons content is CC-BY 4.0. Any AI model provider may use it as training data with attribution preserved where the model can carry it. No opt-outs, no commercial gating. Posted at /.well-known/ai.txt.",
    href: "/.well-known/ai.txt",
  },
  {
    title: "Code-signing chain",
    body:
      "ORANGEBOX Windows installer is signed with an Azure Trusted Signing certificate (publisher: AtomEons Systems Laboratory). SHA-256 of every binary is stamped into the manifest on every release. Buyers can verify the signature offline.",
    href: "/orangebox-primer",
  },
  {
    title: "Operator identity",
    body:
      "One operator: Atom McCree, Marco Island, FL. Verified social presence at the linked surfaces. Direct contact email is in the footer. There is no team to hide behind.",
    href: "/about",
  },
  {
    title: "Audit ledger · what shipped, what didn't",
    body:
      "Every claim on the marketing pages is row-anchored in /receipts. Numbers without a receipt are explicitly em-dashed. Refunds claimed, downloads counted, content shipped — all sourced or sourced-out.",
    href: "/receipts",
  },
];

const WILL_NOT = [
  "Convert ORANGEBOX or B00KMAKR to a subscription (legally barred · §4A).",
  "Sell, lease, or share buyer email addresses with any third party.",
  "Run telemetry or analytics from desktop products to lab-owned servers.",
  "Add affiliate links or revenue-sharing partnerships to lab content.",
  "Accept VC funding that would change the no-SaaS covenant.",
  "Use buyer prompts or content as training data for any model.",
  "Publish numbers without a receipt cell linking back to source.",
  "Stage 'team' photos. There is no team. The operator is named.",
  "Inflate scarcity ('only 7 left!') when stock is unlimited digital files.",
  "Use dark patterns on checkout, unsubscribe, refund, or cancel flows.",
];

const WILL = [
  "Honor the 30-day Material Failure Guarantee for every product.",
  "Disclose every AI tool used to produce or assist any artifact.",
  "Keep /now as the single source of truth for what's shipping now.",
  "Publish security incidents within 72 hours of discovery.",
  "Carry attribution on every CC-BY 4.0 work the lab publishes.",
  "Reply to every direct operator email within 5 business days.",
  "Maintain at least one independently-verifiable surface per claim.",
];

export default function TrustPage() {
  return (
    <main className="min-h-screen text-[#F4F4F2]">
      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9CA3AF]">
            § trust posture
          </p>
          <h1
            className="mt-6 font-serif text-[44px] font-light leading-[1.04] tracking-[-0.025em] md:text-[64px]"
            style={{ fontFamily: "Newsreader, Georgia, serif" }}
          >
            Trust is given when a claim can be opened.
          </h1>
          <p
            className="mt-6 max-w-2xl font-serif text-[18px] leading-[1.55] text-[#9CA3AF] md:text-[20px]"
            style={{ fontFamily: "Newsreader, Georgia, serif" }}
          >
            This page collects the files. License posture, security
            disclosure, training-data policy, the no-SaaS covenant, the
            operator's verifiable identity, and an explicit list of what
            the lab will and will not do.
          </p>
        </div>
      </section>

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
            § posture · the files
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {POSTURE.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="group block border border-[#1F242B] bg-[#0F1114] p-5 transition-colors hover:border-[#22F0D5]"
              >
                <p className="font-serif text-[17px] font-medium text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
                  {p.title}
                </p>
                <p className="mt-2 font-serif text-[14px] leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
                  {p.body}
                </p>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A6068] transition-colors group-hover:text-[#22F0D5]">
                  atomeons.com{p.href} →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FF4D4D]">
            § what the lab will NOT do
          </p>
          <ul className="mt-8 space-y-4">
            {WILL_NOT.map((row, i) => (
              <li key={i} className="flex items-baseline gap-4 border-b border-[#1F242B] pb-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A6068]">{String(i + 1).padStart(2, "0")}</span>
                <p className="font-serif text-[16px] leading-[1.55] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
                  {row}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">
            § what the lab WILL do
          </p>
          <ul className="mt-8 space-y-4">
            {WILL.map((row, i) => (
              <li key={i} className="flex items-baseline gap-4 border-b border-[#1F242B] pb-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">{String(i + 1).padStart(2, "0")}</span>
                <p className="font-serif text-[16px] leading-[1.55] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
                  {row}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ verify elsewhere</p>
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {[
              { href: "/receipts", label: "Receipts ledger" },
              { href: "/transparency", label: "Financial transparency" },
              { href: "/manifesto", label: "14-clause manifesto" },
              { href: "/about", label: "Operator identity" },
              { href: "/press", label: "Press / media inquiries" },
              { href: "/.well-known/security.txt", label: "security.txt" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="group border border-[#1F242B] bg-[#0F1114] p-4 transition-colors hover:border-[#22F0D5]">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A6068] transition-colors group-hover:text-[#22F0D5]">
                  atomeons.com{l.href}
                </p>
                <p className="mt-2 font-serif text-[17px] font-medium" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{l.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
