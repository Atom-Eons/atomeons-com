import type { Metadata } from "next";
import Link from "next/link";
import { LabHero } from "../_components/v2/LabHero";

/**
 * /support — buyer-facing support hub.
 *
 * Single landing page for everything a buyer hits after the Stripe
 * charge clears: install help, license recovery, refund triage,
 * security disclosure, source-related questions. Pre-empts inbound
 * by surfacing answers operators usually have to email for.
 */

export const metadata: Metadata = {
  title: "Support — buyer help · AtomEons",
  description:
    "ORANGEBOX buyer support. Lost your download link, MFG refund claim, license recovery, install troubleshooting, source-related questions. ~2-hour reply SLA in ET waking hours. a.mccree@gmail.com.",
  alternates: { canonical: "https://atomeons.com/support" },
  openGraph: {
    title: "Support — buyer help · AtomEons",
    description:
      "Lost the link, refund claim, install help, source questions. One operator, ~2h reply, ET waking hours.",
    url: "https://atomeons.com/support",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AtomEons Support",
    description: "ORANGEBOX buyer help · ~2h reply · a.mccree@gmail.com",
  },
  robots: { index: true, follow: true },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "AtomEons", item: "https://atomeons.com" },
    { "@type": "ListItem", position: 2, name: "Support", item: "https://atomeons.com/support" },
  ],
};

type Channel = {
  tag: string;
  title: string;
  description: string;
  mailto: string;
  mailtoLabel: string;
  accent: string;
};

const CHANNELS: Channel[] = [
  {
    tag: "::lost the download link",
    title: "Replace the download link",
    description:
      "Inside the first 30 days of purchase, the lab will re-send your time-bound signed URL. Send the Stripe order ID (starts with `pi_…`) from the receipt email. After 30 days the link can still be reissued; just say so in the subject.",
    mailto:
      "mailto:a.mccree@gmail.com?subject=ORANGEBOX%20replace%20download%20link&body=Order%20ID%3A%20pi_%3F%3F%3F%0AEmail%20used%20at%20checkout%3A%20%3F%3F%3F",
    mailtoLabel: "Email replacement request →",
    accent: "#22F0D5",
  },
  {
    tag: "::it didn't install / didn't launch",
    title: "Material Failure Guarantee refund",
    description:
      "30-day full refund if ORANGEBOX fails to install or launch on a clean Windows 10/11 + Node 20+ machine. Send the order ID, the OS version, the Node version, and a 5-line repro (what command, what error). The lab confirms within 48h.",
    mailto:
      "mailto:a.mccree@gmail.com?subject=ORANGEBOX%20MFG%20refund%20claim&body=Order%20ID%3A%20pi_%3F%3F%3F%0AOS%3A%20Win%2011%20%2F%20Win%2010%0ANode%3A%20v%3F%3F%0A%0AWhat%20I%20ran%3A%0A%0AError%20I%20saw%3A",
    mailtoLabel: "File MFG claim →",
    accent: "#22F0D5",
  },
  {
    tag: "::workflow-fit doesn't work for me",
    title: "Workflow-Fit Refund",
    description:
      "30-day full refund, no questions asked, if the product doesn't fit your workflow. No repro needed, no debate. Send the order ID and a single line of explanation if you want — or not.",
    mailto:
      "mailto:a.mccree@gmail.com?subject=ORANGEBOX%20Workflow-Fit%20refund&body=Order%20ID%3A%20pi_%3F%3F%3F",
    mailtoLabel: "File Workflow-Fit refund →",
    accent: "#FFB87A",
  },
  {
    tag: "::install help",
    title: "Help me install",
    description:
      "Run through 1-INSTALL.txt and the QUICKSTART. If something stays stuck, email with: OS version, Node version, output of `node --version` and `pnpm --version` (or `npm --version`), and the exact error message. Don't paste API keys or .env contents.",
    mailto:
      "mailto:a.mccree@gmail.com?subject=ORANGEBOX%20install%20help&body=OS%3A%20%3F%3F%3F%0ANode%3A%20%3F%3F%3F%0A%0AStep%20I'm%20stuck%20on%3A%0AExact%20error%3A",
    mailtoLabel: "Email install help →",
    accent: "#22F0D5",
  },
  {
    tag: "::license recovery",
    title: "I lost my license / can't access /account",
    description:
      "The Stripe Customer Portal at /account uses the email you bought with. If that email is no longer reachable, email the lab from the address you'd like to be the new contact, with the original Stripe order ID and any proof of purchase (PayPal confirm, bank statement line showing the $99 / $1 charge).",
    mailto:
      "mailto:a.mccree@gmail.com?subject=ORANGEBOX%20license%20recovery&body=Original%20order%20ID%3A%20pi_%3F%3F%3F%0AOriginal%20email%3A%20%3F%3F%3F%0ANew%20contact%20email%3A%20%3F%3F%3F",
    mailtoLabel: "Recover license →",
    accent: "#22F0D5",
  },
  {
    tag: "::source / API / integration question",
    title: "Source-tree, MCP, integration question",
    description:
      "Source ships in the bundle. Inspect freely. Modify for personal or single-business use (no redistribution). For deeper questions about MCP tool wiring, n8n integration, model lane configuration, or the receipts pipeline, email — the operator answers source-level questions himself.",
    mailto:
      "mailto:a.mccree@gmail.com?subject=ORANGEBOX%20source%20question",
    mailtoLabel: "Email source question →",
    accent: "#22F0D5",
  },
  {
    tag: "::security disclosure",
    title: "Security disclosure (responsible)",
    description:
      "If you find a security issue in ORANGEBOX, atomeons.com, or any of the lab's public surfaces, email PRIVATELY before disclosing publicly. The lab acknowledges within 48 hours, fixes critical-severity in under 14 days, and credits the reporter in the changelog unless you ask not to be. No bug bounty program (one operator), but real recognition.",
    mailto:
      "mailto:a.mccree@gmail.com?subject=Security%20disclosure%20(private)&body=Surface%3A%20%3F%3F%3F%0AImpact%3A%20%3F%3F%3F%0AReproduction%3A",
    mailtoLabel: "Private disclosure →",
    accent: "#22F0D5",
  },
  {
    tag: "::press inquiry",
    title: "Press inquiry / interview request",
    description:
      "Press has its own surface at /press with the media kit, founder bio, and embargo policy. For interview scheduling specifically, email with publication name and rough timeline.",
    mailto:
      "mailto:a.mccree@gmail.com?subject=Press%20interview%20request&body=Publication%3A%0ABylined%20under%3A%0ATimeline%3A%0ATopic%20area%3A",
    mailtoLabel: "Email press request →",
    accent: "#FFB87A",
  },
];

export default function SupportPage() {
  return (
    <main className="relative z-10 text-[#F2F4F5]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span> Support
        </p>
      </div>

      {/* HERO — LabHero primitive */}
      <LabHero
        eyebrow="::support · one operator · ~2h reply · et waking hours"
        title="Help, in"
        titleAccent="one inbox."
        subtitle={
          <p>
            The lab is a one-operator independent business. There is no
            ticket portal, no chatbot pretending to be staff, no offshore
            tier-1. Every email below goes to Atom directly and gets a
            human reply, usually within two hours in ET waking hours.
            Pick the closest category and click; the subject line is
            already pre-filled for you.
          </p>
        }
        primaryCta={{ label: "browse all lanes ↓", href: "#channels" }}
        tone="cyan"
      >
        <div className="inline-flex items-center gap-3 rounded-full border border-[#22F0D5]/40 bg-[#22F0D5]/10 px-5 py-2.5">
          <span className="size-2 animate-pulse rounded-full bg-[#22F0D5] shadow-[0_0_10px_rgba(34,240,213,0.7)]" />
          <a
            href="mailto:a.mccree@gmail.com"
            className="font-mono text-[12px] uppercase tracking-[0.28em] text-[#22F0D5] hover:text-[#FFB87A]"
          >
            a.mccree@gmail.com
          </a>
        </div>
      </LabHero>

      {/* CHANNELS GRID */}
      <section id="channels" className="scroll-mt-24 border-b border-[#1A2225] py-24 md:py-32">
        <div className="mx-auto w-full max-w-6xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#FFB87A]">
            ::pick your lane · {CHANNELS.length} categories
          </p>
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.08] tracking-tight md:text-5xl">
            Every lane goes to the same human.
          </h2>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {CHANNELS.map((c) => (
              <div
                key={c.title}
                className="flex flex-col rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-7"
              >
                <p
                  className="font-mono text-[10px] uppercase tracking-[0.28em]"
                  style={{ color: c.accent }}
                >
                  {c.tag}
                </p>
                <h3 className="mt-3 text-xl font-semibold text-[#F2F4F5] md:text-2xl">
                  {c.title}
                </h3>
                <p className="mt-3 grow text-sm leading-[1.7] text-[#C8CCCE]">
                  {c.description}
                </p>
                <a
                  href={c.mailto}
                  className="mt-6 inline-flex items-center gap-2 self-start rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.28em] transition-all"
                  style={{
                    borderColor: c.accent + "55",
                    color: c.accent,
                  }}
                >
                  {c.mailtoLabel}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT TO INCLUDE */}
      <section className="border-b border-[#1A2225] bg-[#08090B]/30 py-24 md:py-32">
        <div className="mx-auto w-full max-w-3xl px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::write a good support email
          </p>
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.08] tracking-tight md:text-5xl">
            What to include. What never to include.
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-[#22F0D5]/30 bg-[#0A0F11] p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">
                ::do include
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-[1.6] text-[#C8CCCE]">
                <li>
                  <strong className="text-[#F2F4F5]">Stripe order ID</strong>{" "}
                  (starts with <code className="font-mono text-[#22F0D5]">pi_…</code>) from your receipt email.
                </li>
                <li>
                  <strong className="text-[#F2F4F5]">OS version</strong>{" "}
                  (Windows 10 / 11 build number) and{" "}
                  <strong className="text-[#F2F4F5]">Node version</strong>{" "}
                  (<code className="font-mono text-[#22F0D5]">node --version</code>).
                </li>
                <li>
                  <strong className="text-[#F2F4F5]">Exact error message</strong>{" "}
                  copy-pasted, not screenshotted.
                </li>
                <li>
                  <strong className="text-[#F2F4F5]">Steps to reproduce</strong>{" "}
                  in 5 lines max. What you ran, what you expected, what
                  you saw.
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-[#FFB87A]/30 bg-[#0A0F11] p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#FFB87A]">
                ::do NOT include
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-[1.6] text-[#C8CCCE]">
                <li>
                  <strong className="text-[#F2F4F5]">API keys or .env contents.</strong>{" "}
                  Redact every line that mentions a key, token, or
                  password before sending.
                </li>
                <li>
                  <strong className="text-[#F2F4F5]">Personal data of others.</strong>{" "}
                  Customer lists, employee data, source code under NDA.
                  Use a redacted repro instead.
                </li>
                <li>
                  <strong className="text-[#F2F4F5]">Credit card number.</strong>{" "}
                  Stripe handles refunds; the lab never sees your card.
                </li>
                <li>
                  <strong className="text-[#F2F4F5]">PHI / HIPAA-covered material.</strong>{" "}
                  No identifiable medical data — the lab is not a HIPAA
                  business associate.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section>
        <div className="mx-auto w-full max-w-5xl px-6 py-20 md:py-28">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#6B7779]">
            ::related surfaces
          </p>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <Link
              href="/legal/refund"
              className="group rounded-xl border border-[#1A2225] bg-[#0A0F11] p-5 transition-colors hover:border-[#22F0D5]/40"
            >
              <p className="text-base font-medium text-[#F2F4F5] group-hover:text-[#22F0D5]">
                Refund policy →
              </p>
              <p className="mt-2 text-sm text-[#9BA5A7]">
                MFG + Workflow-Fit · both 30 days · both full-refund
              </p>
            </Link>
            <Link
              href="/legal/terms"
              className="group rounded-xl border border-[#1A2225] bg-[#0A0F11] p-5 transition-colors hover:border-[#22F0D5]/40"
            >
              <p className="text-base font-medium text-[#F2F4F5] group-hover:text-[#22F0D5]">
                Terms of sale →
              </p>
              <p className="mt-2 text-sm text-[#9BA5A7]">
                §4A no-saas lock · license grant · operator
                responsibility
              </p>
            </Link>
            <Link
              href="/faq"
              className="group rounded-xl border border-[#1A2225] bg-[#0A0F11] p-5 transition-colors hover:border-[#22F0D5]/40"
            >
              <p className="text-base font-medium text-[#F2F4F5] group-hover:text-[#22F0D5]">
                FAQ →
              </p>
              <p className="mt-2 text-sm text-[#9BA5A7]">
                AI 101 + ORANGEBOX-specific questions answered
              </p>
            </Link>
            <Link
              href="/account"
              className="group rounded-xl border border-[#1A2225] bg-[#0A0F11] p-5 transition-colors hover:border-[#22F0D5]/40"
            >
              <p className="text-base font-medium text-[#F2F4F5] group-hover:text-[#22F0D5]">
                /account →
              </p>
              <p className="mt-2 text-sm text-[#9BA5A7]">
                Stripe Customer Portal · update billing / cards / opt-ins
              </p>
            </Link>
            <Link
              href="/changelog"
              className="group rounded-xl border border-[#1A2225] bg-[#0A0F11] p-5 transition-colors hover:border-[#22F0D5]/40"
            >
              <p className="text-base font-medium text-[#F2F4F5] group-hover:text-[#22F0D5]">
                Changelog →
              </p>
              <p className="mt-2 text-sm text-[#9BA5A7]">
                public version history · what shipped when
              </p>
            </Link>
            <Link
              href="/orangebox"
              className="group rounded-xl border border-[#1A2225] bg-[#0A0F11] p-5 transition-colors hover:border-[#22F0D5]/40"
            >
              <p className="text-base font-medium text-[#F2F4F5] group-hover:text-[#22F0D5]">
                /orangebox →
              </p>
              <p className="mt-2 text-sm text-[#9BA5A7]">
                product page · v6.3 · AE See-Suite + AE Ops
              </p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
