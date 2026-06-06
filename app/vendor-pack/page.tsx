import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Vendor pack · ATOMEONS for procurement · CISO-ready bundle",
  description:
    "Everything a procurement team or CISO needs in one place. License posture, security disclosure, training-data policy, transparency ledger, integrations map, no-SaaS covenant. Single click to fetch the whole bundle.",
  alternates: { canonical: "https://atomeons.com/vendor-pack" },
};

/**
 * /vendor-pack — CISO-ready document bundle.
 *
 * Operator's stated rule: enterprise buyers want one URL they can hand
 * to their procurement / legal / security teams. This page aggregates
 * every document those teams typically request into one surface +
 * provides a downloadable .txt bundle.
 */

const SECTIONS = [
  {
    section: "License posture",
    items: [
      { name: "Terms of service", url: "/legal/terms", what: "Full text · includes §4A no-SaaS covenant that legally bars subscription conversion." },
      { name: "Privacy policy", url: "/legal/privacy", what: "What data the lab collects, how long it's retained, who it's shared with (no one)." },
      { name: "Refund policy", url: "/legal/refund", what: "30-day Material Failure Guarantee · explicit refund eligibility." },
      { name: "Pricing law", url: "/legal/pricing", what: "Public pricing methodology · no dark-pattern price discrimination." },
    ],
  },
  {
    section: "Security posture",
    items: [
      { name: "Security disclosure policy (RFC 9116)", url: "/.well-known/security.txt", what: "Contact, 90-day remediation window, in-scope vulnerabilities, acknowledgments." },
      { name: "ORANGEBOX primer (CISO-focused)", url: "/orangebox-primer", what: "Vendor-security walkthrough · code-signing chain, SHA-256 manifest, BYO-key, no telemetry." },
      { name: "Code signing", url: "/orangebox-primer", what: "Azure Trusted Signing certificate · Publisher: AtomEons Systems Laboratory." },
      { name: "AI training data policy (Spawning ai.txt)", url: "/.well-known/ai.txt", what: "CC-BY 4.0 ALLOW for the lab's published content. Buyer prompts NEVER used as training data." },
    ],
  },
  {
    section: "Trust + operational transparency",
    items: [
      { name: "Trust posture", url: "/trust", what: "10 explicit WILL-NOT clauses + 7 WILL clauses · third-party verification surfaces." },
      { name: "Financial transparency", url: "/transparency", what: "Monthly cost ledger · 17 line items · revenue rules · no-VC backed by numbers." },
      { name: "Receipts ledger", url: "/receipts", what: "Audit trail of every shipped claim with ClaimReview JSON-LD on the top-line ones." },
      { name: "Operator identity", url: "/about", what: "Atom McCree · Marco Island FL · verifiable social presence." },
      { name: "Manifesto (14 clauses)", url: "/manifesto", what: "Operating doctrine · operator-owned · no-SaaS · no-VC · no-affiliate · falsifiable." },
    ],
  },
  {
    section: "Stack + dependencies",
    items: [
      { name: "Integrations (third-party services)", url: "/integrations", what: "20 services categorized · buyer-data posture per row · 10 explicit 'do NOT use' entries." },
      { name: "Colophon (open-source deps)", url: "/colophon", what: "Every npm package the lab runs in production · pinned version · reasoning per choice." },
      { name: "Lab workspace", url: "/lab", what: "Hardware · software · daily routine · standing rules of the room." },
    ],
  },
  {
    section: "Machine-readable",
    items: [
      { name: "Self-describing agent metadata", url: "/.well-known/agent.json", what: "Endpoints, resources, license, training-data policy, contact." },
      { name: "MCP server manifest", url: "/.well-known/mcp.json", what: "Model Context Protocol manifest · /api/mcp endpoint declared." },
      { name: "OpenAPI 3.1 spec", url: "/openapi.json", what: "Auto-generate clients for /api/ask · /api/search · /api/embed." },
      { name: "Datasets index", url: "/datasets", what: "Every public JSON/text the lab serves · CC-BY 4.0 · fetchable now." },
    ],
  },
];

const ASKS = [
  { q: "Do you have SOC 2?", a: "No · and intentionally so. ORANGEBOX is local-first by license §4A. SOC 2 presupposes a SaaS architecture the lab does not have. The vendor-security surface is /orangebox-primer + the binary's SHA-256 manifest." },
  { q: "Do you have a DPA (Data Processing Addendum)?", a: "Not applicable in the standard form. The lab does not process buyer data on its servers. ORANGEBOX is a local-first desktop product. Buyer prompts never leave the operator's machine. For Stripe / Loops / Vercel data processing, those vendors' DPAs apply." },
  { q: "Are you GDPR / CCPA compliant?", a: "Yes for the data the lab does collect (Stripe-customer email + buyer name from checkout, Loops mailing list opt-in). Both surfaces have export + delete on demand. See /legal/privacy." },
  { q: "Do you have a pen test report?", a: "Not on a recurring basis · the lab is small enough that the attack surface fits in one operator's working memory. Continuous security disclosure under /.well-known/security.txt with free ORANGEBOX license for confirmed high-severity reports has yielded one report to date (acknowledged on /press)." },
  { q: "What's your incident response time?", a: "P0 (active exploit) · within 4 hours, single-operator paging. P1 (vulnerability without active exploit) · 14 hours. P2 · 90 days per /.well-known/security.txt. Incidents are published within 72 hours of discovery per the WILL list at /trust." },
  { q: "Can you sign a custom MSA?", a: "Custom Master Service Agreements require operator review and add ~$500 to the order · happy to do them when there's a real reason. For most enterprise buyers, the standard EULA at /legal/terms (license §4A binding) is sufficient." },
  { q: "Do you have ISO 27001?", a: "No. See the SOC 2 answer above · the architecture is local-first by license. ISO 27001 / SOC 2 / FedRAMP all presuppose SaaS." },
  { q: "Can we get a single PDF of all this?", a: "On the way · curl https://atomeons.com/vendor-pack/bundle.txt for now (text bundle of every linked surface). PDF generation via B00KMAKR pipeline · ship Q3 2026." },
];

export default function VendorPackPage() {
  return (
    <main className="min-h-screen text-[#F4F4F2]">
      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9CA3AF]">§ vendor pack · procurement · CISO</p>
          <h1 className="mt-6 font-serif text-[44px] font-light leading-[1.04] tracking-[-0.025em] md:text-[64px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            One URL for your security team.
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-[18px] leading-[1.55] text-[#9CA3AF] md:text-[20px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            Everything a CISO, procurement officer, or legal counsel
            typically requests during a vendor security review. License
            posture, security disclosure, training-data policy,
            transparency ledger, integrations map. Hand this URL to your
            team and they have what they need.
          </p>

          <a
            href="/vendor-pack/bundle.txt"
            className="mt-8 inline-flex items-center gap-3 border border-[#22F0D5] bg-[#0F1114] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-[#22F0D5] transition-colors hover:bg-[#22F0D5] hover:text-[#08090B]"
          >
            Download full bundle (.txt) →
          </a>
        </div>
      </section>

      {SECTIONS.map((s) => (
        <section key={s.section} className="border-b border-[#1F242B]">
          <div className="mx-auto max-w-5xl px-6 py-12 md:py-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ {s.section}</p>
            <ul className="mt-8 divide-y divide-[#1F242B]">
              {s.items.map((i) => (
                <li key={i.url + i.name} className="grid gap-3 py-4 md:grid-cols-[300px_1fr_140px]">
                  <p className="font-serif text-[16px] font-medium text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{i.name}</p>
                  <p className="font-serif text-[14px] leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{i.what}</p>
                  <Link href={i.url} className="self-center justify-self-start font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5] underline decoration-[#1F242B] underline-offset-4 hover:decoration-[#22F0D5]">
                    open →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ common procurement asks · honest answers</p>
          <ol className="mt-10 space-y-6">
            {ASKS.map((a, i) => (
              <li key={i} className="border-l-2 border-[#1F242B] pl-5">
                <p className="font-serif text-[18px] font-medium text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
                  {String(i + 1).padStart(2, "0")} · {a.q}
                </p>
                <p className="mt-3 font-serif text-[15px] leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{a.a}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <div className="border-l-2 border-[#22F0D5] bg-[#0B0C0F] p-6 md:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ direct contact for procurement</p>
            <p className="mt-3 font-serif text-[16px] leading-[1.55] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
              For custom MSAs, NDAs, or escalated security questions:
              atom@atomeons.com. 5-business-day reply guarantee. The
              operator handles vendor reviews directly · there is no
              sales team to filter you through.
            </p>
          </div>

          <div className="mt-12 grid gap-3 md:grid-cols-3">
            {[
              { href: "/vendor-pack/bundle.txt", label: "Download bundle (.txt)" },
              { href: "/trust", label: "Trust posture" },
              { href: "/transparency", label: "Financial transparency" },
            ].map((l) => (
              <a key={l.href} href={l.href} className="group border border-[#1F242B] bg-[#0F1114] p-4 transition-colors hover:border-[#22F0D5]">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A6068] transition-colors group-hover:text-[#22F0D5]">atomeons.com{l.href}</p>
                <p className="mt-2 font-serif text-[17px] font-medium" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{l.label}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
