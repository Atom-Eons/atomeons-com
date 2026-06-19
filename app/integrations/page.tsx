import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Integrations · what AtomEons connects to · stack map",
  description:
    "Every third-party service AtomEons uses, named with version and use case. Vercel, Supabase, Stripe, Loops, Anthropic, Gemini, ElevenLabs, Azure Trusted Signing, GitHub, MCP servers. Honest stack map.",
  alternates: { canonical: "https://atomeons.com/integrations" },
};

/**
 * /integrations — what AtomEons connects to.
 *
 * The lab's stack map. Every service named with the version it runs on,
 * what role it plays, and whether it touches buyer data. Companion to
 * /colophon (open-source deps) and /transparency (monthly cost ledger).
 *
 * For buyers: this is the answer to "where does my data live."
 * For agents: this is a structured manifest of the lab's service graph.
 */

type Integration = {
  name: string;
  version?: string;
  url: string;
  role: string;
  data: "no buyer data" | "buyer data" | "operator data only" | "public data only";
  category: "infra" | "AI" | "commerce" | "communications" | "code" | "trust";
};

const INTEGRATIONS: Integration[] = [
  // Infra
  { name: "Vercel", url: "https://vercel.com", role: "Production hosting · edge runtime · CI pipeline · OG image generation · Analytics + Speed Insights", data: "operator data only", category: "infra" },
  { name: "Cloudflare Registrar", url: "https://www.cloudflare.com/products/registrar/", role: "Domain registrar for atomeons.com (at-cost · no markup)", data: "public data only", category: "infra" },
  { name: "Namecheap", url: "https://www.namecheap.com", role: "Domain registrar for skil.ski", data: "public data only", category: "infra" },
  { name: "Supabase", url: "https://supabase.com", role: "Postgres database with pgvector · row-level security · service-role inserts from server-side handlers only", data: "buyer data", category: "infra" },
  { name: "Vercel Blob", url: "https://vercel.com/storage/blob", role: "Product binary storage (Orange³ installer · AI Bookmaker DMG · audiobook MP3 tracks)", data: "no buyer data", category: "infra" },

  // AI
  { name: "Anthropic Claude API", url: "https://www.anthropic.com/api", role: "Operator's daily build companion (Claude Code · Sonnet · Opus tiers) · Orange³ default LLM provider via BYO-key (user's key, not lab's)", data: "no buyer data", category: "AI" },
  { name: "Google Gemini API", url: "https://ai.google.dev", role: "/api/ask synthesis (gemini-2.5-flash) · /api/embed vectors (gemini-embedding-001 · 768-dim Matryoshka) · free tier", data: "no buyer data", category: "AI" },
  { name: "ElevenLabs", url: "https://elevenlabs.io", role: "Synthetic Opus voice clone for I AM AI audiobook (28 tracks · free at /i-am-ai) · Optional narration credits for AI Bookmaker audiobook pipeline · operator account · not user-facing", data: "operator data only", category: "AI" },
  { name: "Microsoft Andrew Neural Voice", url: "https://learn.microsoft.com/en-us/azure/ai-services/speech-service/", role: "Narration for the /i-am-ai/listen Chapter 20 free sample (17:26 audio · ACX-mastered output) · also a BYO option inside AI Bookmaker", data: "operator data only", category: "AI" },

  // Commerce
  { name: "Stripe", url: "https://stripe.com", role: "Payment processing for Orange³ · AI Bookmaker · skil.ski · Stripe Checkout-hosted flow (operator never sees card numbers)", data: "buyer data", category: "commerce" },
  { name: "Stripe Customer Portal", url: "https://stripe.com/customer-portal", role: "Self-serve license management · refund requests · email update", data: "buyer data", category: "commerce" },

  // Communications
  { name: "Loops.so", url: "https://loops.so", role: "Outbound rail · transactional + marketing email for AtomEons projects · 7 consumer events live", data: "buyer data", category: "communications" },
  { name: "Google Workspace", url: "https://workspace.google.com", role: "Operator email (atom@atomeons.com · a.mccree@gmail.com fallback)", data: "operator data only", category: "communications" },

  // Code
  { name: "GitHub", url: "https://github.com/Atom-Eons/atomeons-com", role: "Source control · CI triggers · public security disclosure issues route here", data: "operator data only", category: "code" },
  { name: "Anthropic MCP servers", url: "https://modelcontextprotocol.io", role: "Filesystem · GitHub · Memory · Sequential-thinking servers wired into Claude Code · operator-side only", data: "no buyer data", category: "code" },
  { name: "Context7", url: "https://context7.com", role: "Live documentation fetching for libraries (Next.js · Tailwind · React) inside Claude Code", data: "no buyer data", category: "code" },
  { name: "Next.js · React · Tailwind", url: "/colophon", role: "Open-source framework stack · full tree at /colophon", data: "no buyer data", category: "code" },

  // Trust
  { name: "Azure Trusted Signing", url: "https://azure.microsoft.com/en-us/products/trusted-signing", role: "Code-signing certificate for Orange³ Windows installer · SHA-256 manifest per release", data: "operator data only", category: "trust" },
  { name: "Cloudflare Web Analytics", url: "https://www.cloudflare.com/web-analytics/", role: "Optional cookie-free pageview analytics · disabled by default · no fingerprinting", data: "no buyer data", category: "trust" },
];

const CATEGORIES: Array<{ key: Integration["category"]; label: string; accent: string }> = [
  { key: "infra", label: "Infrastructure", accent: "#22F0D5" },
  { key: "AI", label: "AI providers", accent: "#22F0D5" },
  { key: "commerce", label: "Commerce", accent: "#C9A55C" },
  { key: "communications", label: "Communications", accent: "#9CA3AF" },
  { key: "code", label: "Code & tooling", accent: "#22F0D5" },
  { key: "trust", label: "Trust & signing", accent: "#FF4D4D" },
];

const NOT_USED = [
  "Google Analytics · we use Vercel Analytics instead (no third-party cookies)",
  "Facebook / Meta Pixel · never installed",
  "Segment / Mixpanel / Amplitude · zero behavioral tracking",
  "AWS · we are not on AWS",
  "OpenAI API · operator does not use OpenAI for lab work (Anthropic + Gemini cover the surface)",
  "Salesforce · no CRM · operator replies to email directly",
  "Intercom · no chat widget · email-first contact",
  "Calendly · no calendar booking · operator does not take meetings during build hours",
  "Mailchimp · we use Loops",
  "Substack · /founders-view is self-hosted on atomeons.com",
];

export default function IntegrationsPage() {
  const byCategory = (cat: Integration["category"]) =>
    INTEGRATIONS.filter((i) => i.category === cat);

  return (
    <main className="min-h-screen text-[#F4F4F2]">
      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9CA3AF]">§ integrations · stack map</p>
          <h1 className="mt-6 font-serif text-[44px] font-light leading-[1.04] tracking-[-0.025em] md:text-[64px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            Where the lab connects.
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-[18px] leading-[1.55] text-[#9CA3AF] md:text-[20px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            Every third-party service AtomEons uses, named with role and
            buyer-data posture. If your data passes through it, it's on
            this page.
          </p>
        </div>
      </section>

      {CATEGORIES.map((cat) => (
        <section key={cat.key} className="border-b border-[#1F242B]">
          <div className="mx-auto max-w-5xl px-6 py-12 md:py-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: cat.accent }}>
              § {cat.label}
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {byCategory(cat.key).map((i) => (
                <div key={i.name} className="border border-[#1F242B] bg-[#0F1114] p-5">
                  <div className="flex items-baseline justify-between gap-4">
                    <a href={i.url} target="_blank" rel="noopener noreferrer" className="font-serif text-[18px] font-medium text-[#F4F4F2] hover:text-[#22F0D5]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
                      {i.name}
                    </a>
                    <p
                      className={
                        i.data === "buyer data"
                          ? "font-mono text-[9px] uppercase tracking-[0.22em] text-[#FF4D4D]"
                          : i.data === "no buyer data"
                          ? "font-mono text-[9px] uppercase tracking-[0.22em] text-[#22F0D5]"
                          : "font-mono text-[9px] uppercase tracking-[0.22em] text-[#9CA3AF]"
                      }
                    >
                      {i.data}
                    </p>
                  </div>
                  <p className="mt-2 font-serif text-[14px] leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
                    {i.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section>
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FF4D4D]">§ what we DO NOT use</p>
          <p className="mt-4 max-w-2xl font-serif text-[16px] leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            The negative space matters as much as the positive. These tools
            are commonly assumed to live in a stack like ours. They don't.
          </p>
          <ul className="mt-8 space-y-3">
            {NOT_USED.map((n, i) => (
              <li key={i} className="flex items-baseline gap-4 border-b border-[#1F242B] pb-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a]">×</span>
                <p className="font-serif text-[15px] leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
                  {n}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-12 grid gap-3 md:grid-cols-4">
            {[
              { href: "/trust", label: "Trust posture" },
              { href: "/transparency", label: "What it all costs" },
              { href: "/colophon", label: "Open-source deps" },
              { href: "/legal/privacy", label: "Privacy policy" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="group border border-[#1F242B] bg-[#0F1114] p-4 transition-colors hover:border-[#22F0D5]">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#7a818a] transition-colors group-hover:text-[#22F0D5]">
                  atomeons.com{l.href}
                </p>
                <p className="mt-2 font-serif text-[16px] font-medium" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{l.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
