import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Colophon · what atomeons.com is built from · tech stack",
  description:
    "Every dependency the lab runs in production, named with version and reasoning. Next.js 16, React 19, Tailwind v4, TypeScript 5, deployed on Vercel. Honest stack inventory.",
  alternates: { canonical: "https://atomeons.com/colophon" },
};

/**
 * /colophon — the tech stack inventory.
 *
 * Sister to /integrations (third-party services) and /aesthetic
 * (visual language). This page is the open-source / dependency tree.
 * Every package the lab runs is named with the version it's pinned to
 * and the reasoning for the choice. No mystery boxes.
 *
 * Pulled from package.json at write time; if the version drifts the
 * stack reasoning still holds.
 */

const RUNTIME_DEPS = [
  { name: "next", version: "16.2.6", role: "App Router · React Server Components · Turbopack production builds · OG image generation via @vercel/og · stays current with Vercel's tightest support window.", url: "https://nextjs.org" },
  { name: "react", version: "19.2.4", role: "Latest stable. The lab uses Suspense + Server Components heavily; React 19's improved hydration and error boundaries earn the bump.", url: "https://react.dev" },
  { name: "react-dom", version: "19.2.4", role: "React 19 renderer.", url: "https://react.dev" },
  { name: "@supabase/supabase-js", version: "^2.105.4", role: "Postgres + pgvector + Storage. Server-side service role only; never imported into client bundles.", url: "https://supabase.com/docs/reference/javascript/introduction" },
  { name: "@vercel/analytics", version: "^2.0.1", role: "Cookie-free pageview analytics. Vercel-hosted, no third-party fingerprinting.", url: "https://vercel.com/docs/analytics" },
  { name: "@vercel/speed-insights", version: "^2.0.0", role: "Real-User-Monitoring for Core Web Vitals. Honest perf telemetry.", url: "https://vercel.com/docs/speed-insights" },
  { name: "stripe", version: "^22.1.1", role: "Server-side Stripe SDK. Used in /api/checkout, /api/portal, /api/webhook. PCI burden stays on Stripe.", url: "https://stripe.com/docs/api" },
  { name: "twitter-api-v2", version: "^1.29.0", role: "Posting Founder's View daily broadcast pulls to X. Operator-token, never user-credentials.", url: "https://github.com/PLhery/node-twitter-api-v2" },
  { name: "lucide-react", version: "^1.17.0", role: "Icon set. Stroke-based, sizes cleanly at hairline weight. Used sparingly — most lab surfaces have no icons.", url: "https://lucide.dev" },
];

const DEV_DEPS = [
  { name: "typescript", version: "^5", role: "Strict mode. Type safety from data layer up.", url: "https://www.typescriptlang.org" },
  { name: "tailwindcss", version: "^4", role: "Tailwind v4 alpha. Used for the entire V3 surface. No CSS-in-JS, no styled-components, no separate styles dir.", url: "https://tailwindcss.com" },
  { name: "@tailwindcss/postcss", version: "^4", role: "PostCSS plugin for Tailwind v4.", url: "https://tailwindcss.com" },
  { name: "eslint", version: "^9", role: "Lint pipeline.", url: "https://eslint.org" },
  { name: "eslint-config-next", version: "16.2.6", role: "Next.js-tuned ESLint rules.", url: "https://nextjs.org/docs/app/building-your-application/configuring/eslint" },
  { name: "@types/react @types/react-dom @types/node", version: "^19 / ^19 / ^20", role: "Type definitions.", url: "https://www.typescriptlang.org/dt" },
  { name: "vitest", version: "^3.2.4", role: "Test runner. Fast, ESM-native, runs against the live source tree.", url: "https://vitest.dev" },
];

const FONTS = [
  { name: "Inter Variable", source: "next/font/google (self-hosted)", role: "UI sans · wght axis · powers the Variable-Weight Reveal motion" },
  { name: "Newsreader Variable", source: "next/font/google (self-hosted)", role: "Editorial serif · opsz axis · all headlines + prose" },
  { name: "JetBrains Mono", source: "system fallback chain", role: "Mono receipts · tabular nums · 0.22em cap tracking" },
];

const NOT_USED_CODE = [
  "No styled-components / emotion / CSS-in-JS — pure Tailwind.",
  "No Redux / Zustand / Jotai — server-first; client state lives in component scope.",
  "No Apollo / urql — REST + Server Components are sufficient.",
  "No SWR / TanStack Query — React Server Components fetch directly.",
  "No date-fns / luxon — Intl.DateTimeFormat is enough.",
  "No lodash — vanilla JS is the same length.",
  "No Yarn / pnpm-shrinkwrap workspace tricks — single-package repo, npm.",
  "No Storybook — design system documented in code at /design-system.",
  "No bundle-size analysis dependency — Next.js prints the report by default.",
];

const HOSTING = [
  { what: "Production", value: "Vercel · automatic edge distribution · IAD1 + multiple regions" },
  { what: "CI", value: "Vercel · per-push preview deploys · main → production" },
  { what: "DNS", value: "Cloudflare for atomeons.com · Namecheap for skil.ski" },
  { what: "DB", value: "Supabase · Postgres 16 · pgvector enabled · daily snapshot retention" },
  { what: "Object storage", value: "Vercel Blob · for product installers + audiobook tracks" },
  { what: "Email outbound", value: "Loops.so" },
  { what: "Email inbound", value: "Postmark Inbound (recommended, not yet wired)" },
  { what: "Source", value: "github.com/Atom-Eons/atomeons-com" },
];

export default function ColophonPage() {
  return (
    <main className="min-h-screen text-[#F4F4F2]">
      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9CA3AF]">§ colophon · what this site is built from</p>
          <h1 className="mt-6 font-serif text-[44px] font-light leading-[1.04] tracking-[-0.025em] md:text-[64px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            No mystery boxes.
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-[18px] leading-[1.55] text-[#9CA3AF] md:text-[20px]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>
            Every dependency the lab runs in production. Every version
            pinned. Every reasoning written down so the choice can be
            audited.
          </p>
        </div>
      </section>

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ runtime dependencies</p>
          <ul className="mt-8 divide-y divide-[#1F242B]">
            {RUNTIME_DEPS.map((d) => (
              <li key={d.name} className="grid items-baseline gap-4 py-4 md:grid-cols-[220px_120px_1fr]">
                <a href={d.url} target="_blank" rel="noopener noreferrer" className="font-mono text-[13px] text-[#F4F4F2] hover:text-[#22F0D5]">
                  {d.name}
                </a>
                <p className="font-mono text-[12px] tabular-nums text-[#5A6068]">{d.version}</p>
                <p className="font-serif text-[14px] leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{d.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ build dependencies</p>
          <ul className="mt-8 divide-y divide-[#1F242B]">
            {DEV_DEPS.map((d) => (
              <li key={d.name} className="grid items-baseline gap-4 py-4 md:grid-cols-[260px_120px_1fr]">
                <a href={d.url} target="_blank" rel="noopener noreferrer" className="font-mono text-[12px] text-[#F4F4F2] hover:text-[#22F0D5]">
                  {d.name}
                </a>
                <p className="font-mono text-[12px] tabular-nums text-[#5A6068]">{d.version}</p>
                <p className="font-serif text-[14px] leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{d.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ typography</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {FONTS.map((f) => (
              <div key={f.name} className="border border-[#1F242B] bg-[#0F1114] p-5">
                <p className="font-serif text-[18px] font-medium text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{f.name}</p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[#5A6068]">{f.source}</p>
                <p className="mt-3 font-serif text-[14px] leading-[1.5] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{f.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#1F242B]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">§ hosting + infra</p>
          <ul className="mt-8 divide-y divide-[#1F242B]">
            {HOSTING.map((h, i) => (
              <li key={i} className="grid items-baseline gap-4 py-4 md:grid-cols-[180px_1fr]">
                <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-[#5A6068]">{h.what}</p>
                <p className="font-serif text-[15px] text-[#F4F4F2]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{h.value}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FF4D4D]">§ what we DO NOT use</p>
          <ul className="mt-8 space-y-3">
            {NOT_USED_CODE.map((n, i) => (
              <li key={i} className="flex items-baseline gap-4 border-b border-[#1F242B] pb-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A6068]">×</span>
                <p className="font-serif text-[15px] leading-[1.55] text-[#9CA3AF]" style={{ fontFamily: "Newsreader, Georgia, serif" }}>{n}</p>
              </li>
            ))}
          </ul>

          <div className="mt-12 grid gap-3 md:grid-cols-3">
            {[
              { href: "/integrations", label: "Third-party services" },
              { href: "/aesthetic", label: "Visual language" },
              { href: "/transparency", label: "Monthly cost ledger" },
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
