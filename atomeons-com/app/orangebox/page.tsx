import Link from "next/link";
import { BuyButton } from "../_components/BuyButton";
import { CockpitTicker } from "../_components/CockpitTicker";
import { InstallCommand } from "../_components/InstallCommand";
import { BuildReceipts } from "../_components/BuildReceipts";
import { ScrollReveal } from "../_components/ScrollReveal";
import { StickyBuyBar } from "../_components/StickyBuyBar";

export const metadata = {
  title: "ORANGEBOX Command v1.4.0 — the AI cockpit for Claude Code",
  description:
    "Make Claude Code work better. ORANGEBOX is the project cockpit that turns Claude Code from a chat tool into an operations surface — 15 departments, 60+ MCP tools, mission-graph DAG, party-line, receipts. $49 once, forever. Local-first, no telemetry, no subscription.",
  alternates: { canonical: "https://atomeons.com/orangebox" },
  keywords: [
    "Claude Code",
    "Claude Code MCP",
    "Claude Code project manager",
    "tool to run projects with Claude Code",
    "make Claude Code work better",
    "AI operations cockpit",
    "AI project cockpit",
    "Claude Code companion",
    "Anthropic Claude Code tool",
    "MCP cockpit",
    "private AI cockpit",
    "local-first AI tool",
    "ORANGEBOX",
    "ORANGEBOX Command",
    "AtomEons",
  ],
  openGraph: {
    title: "ORANGEBOX Command v1.4.0 — the AI cockpit for Claude Code",
    description:
      "The private AI operations cockpit. Make Claude Code work better. 15 departments · 60+ MCP tools · mission-graph DAG · party-line · receipts. $49 once, forever.",
    url: "https://atomeons.com/orangebox",
    siteName: "AtomEons",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ORANGEBOX Command v1.4.0 — the AI cockpit for Claude Code",
    description:
      "Make Claude Code work better. $49 once, forever. Local-first. No subscription, ever.",
  },
};

export default function OrangeBox() {
  return (
    <main className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-24 pt-10">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#a7b8ad]">
        <Link href="/">AtomEons</Link>{" "}
        <span className="text-[#204538]">/</span> ORANGEBOX Command v1.4.0
      </p>

      {/* ─── HERO ─────────────────────────────────────────────────── */}
      <section className="grid gap-10 pt-8 md:grid-cols-[1.6fr_1fr] md:items-center">
        <div>
          <div className="mb-4 flex flex-wrap gap-2">
            <span
              className="rebel-pill"
              style={{
                color: "#75ff92",
                borderColor: "rgba(117,255,146,0.5)",
                background: "rgba(117,255,146,0.06)",
              }}
            >
              ▲ v1.4.0 · SHOP READY · GREEN
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#204538] bg-[#071915] px-3 py-1 font-mono text-[11px] text-[#a7b8ad]">
              15 depts · 15 skills · 60+ MCP tools · 92 endpoints
            </span>
          </div>
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-[#ff7a18]">
            ORANGEBOX Command · v1.4.0 — Codexa Local + Audit Roll-up
          </p>
          <h1 className="glitch-hover text-balance text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
            The AI cockpit for{" "}
            <span className="text-[#ff7a18]">Claude Code operators</span>.
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-base text-[#a7b8ad] md:text-lg">
            ORANGEBOX Command pairs with Claude Code via 60+ MCP tools to give
            your projects real memory, mission-graph routing, 15-department
            structure, and receipt-backed gates. Local-first. Zero telemetry.
            $49 once, forever.
          </p>
          <p className="mt-3 max-w-xl text-base font-semibold text-[#f7f0e4]">
            Command, not chat. Receipts, not promises. Yours, not theirs.
          </p>
          <p className="mt-2 max-w-xl text-base text-[#ffc46b]">
            You are the pilot. The cockpit does not move without your hand on it.
          </p>

          <div className="mt-6">
            <CockpitTicker />
          </div>
          <div className="mt-4">
            <InstallCommand />
          </div>
          <div
            id="buy"
            className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center"
          >
            <BuyButton />
            <p className="text-xs text-[#a7b8ad]">
              $49 USD · one-time · forever · download on payment confirmed
            </p>
          </div>
          <p className="mt-3 max-w-xl text-xs text-[#75ff92]">
            ▲ Anti-SaaS commitment locked in LICENSE §4A: ORANGEBOX will
            NEVER move to monthly billing. If we ever try, every existing
            buyer keeps their license free in perpetuity.
          </p>
        </div>

        <aside className="rounded-xl border border-[#204538] bg-[#071915] p-5 shadow-[0_0_60px_rgba(255,122,24,0.12)]">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#a7b8ad]">
            ::inside the box
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-[#f7f0e4]">
            <li><span className="text-[#ff7a18]">·</span> ORANGEBOX Command desktop app (Tauri 2.x · MSI + NSIS)</li>
            <li><span className="text-[#ff7a18]">·</span> AE0–AE14 doctrine — 15 departments + 6 review engines</li>
            <li><span className="text-[#ff7a18]">·</span> ÆoNs Skill Suite V1.4 — 15 skills · 230/230 tests pass</li>
            <li><span className="text-[#ff7a18]">·</span> 4-layer memory model + knowledge engine</li>
            <li><span className="text-[#ff7a18]">·</span> 27 Constitutional Guardrails</li>
            <li><span className="text-[#ff7a18]">·</span> 9-stage Gate Chain (Gate 0 = LBCE)</li>
            <li><span className="text-[#ff7a18]">·</span> Triad model lanes (STRATEGY · ENGINEERING · EXPERIENCE)</li>
            <li><span className="text-[#ff7a18]">·</span> 60+ MCP tools for Claude Code / Claude Desktop</li>
            <li className="text-[#75ff92]"><span className="text-[#75ff92]">+</span> NEW v1.4: <strong>Codexa Local</strong> — heavy work runs on your cockpit machine, no second computer needed</li>
            <li><span className="text-[#ff7a18]">·</span> Codexa Remote (advanced) — pilot a second machine on your LAN</li>
            <li><span className="text-[#ff7a18]">·</span> Mission-graph DAG runner + project spine</li>
            <li><span className="text-[#ff7a18]">·</span> Party-line shared status bus (JSONL)</li>
            <li><span className="text-[#ff7a18]">·</span> Receipt + proof artifact rails</li>
            <li><span className="text-[#ff7a18]">·</span> Day-0 demo project (orangebox-onboarding)</li>
            <li><span className="text-[#ff7a18]">·</span> Operator manual + Quickstart + 4 setup guides (MCP/Ollama/n8n)</li>
            <li><span className="text-[#ff7a18]">·</span> Full source code (inspection + personal modification)</li>
          </ul>
          <div className="mt-4 space-y-1.5 border-t border-[#204538] pt-4 font-mono text-[10px] uppercase tracking-widest text-[#a7b8ad]">
            <p>
              <span className="text-[#1b8b75]">file:</span>{" "}
              <span className="text-[#75ff92]">ORANGEBOX-OS-AIO-v1.4.0.zip</span>
            </p>
            <p>
              <span className="text-[#1b8b75]">size:</span>{" "}
              <span className="text-[#f7f0e4]">24.81 MB</span>
            </p>
            <p>
              <span className="text-[#1b8b75]">sha-256:</span>{" "}
              <span className="break-all text-[#f7f0e4]">
                f244b973cb61dd47c85a5ce05a01c764785c746a6d56f5a5d20745310acb4f3e
              </span>
            </p>
            <p>
              <span className="text-[#1b8b75]">disclosure:</span>{" "}
              <span className="text-[#f7f0e4]">
                ATOM-ORANGEBOX-V1-4-CODEXA-LOCAL-2026-0514
              </span>
            </p>
            <p>
              <a
                href="https://github.com/AtomEons/orangebox-os/releases/tag/v1.4.0"
                className="text-[#ff7a18] hover:underline"
                target="_blank"
                rel="noopener"
              >
                ↗ verify on github (v1.4.0 release · private)
              </a>
            </p>
          </div>
        </aside>
      </section>

      {/* ─── COMPARISON LADDER ────────────────────────────────────── */}
      <ScrollReveal>
        <section className="mt-16 rounded-xl border border-[#204538] bg-[#04100d] p-6 md:p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#ff7a18]">
            ::what $49 buys you
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
            One price. Compare it to the alternatives.
          </h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-[#204538] text-left">
                  <th className="py-2 pr-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[#a7b8ad]">Alternative</th>
                  <th className="py-2 pr-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[#a7b8ad]">Annual cost</th>
                  <th className="py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#a7b8ad]">What you get</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#204538]/40">
                  <td className="py-3 pr-4 text-[#f7f0e4]">Hire a part-time PM (10h/wk @ $100/h)</td>
                  <td className="py-3 pr-4 font-mono text-[#a7b8ad]">~$52,000</td>
                  <td className="py-3 text-[#a7b8ad]">Human time · doctrine is theirs · leaves with the operator</td>
                </tr>
                <tr className="border-b border-[#204538]/40">
                  <td className="py-3 pr-4 text-[#f7f0e4]">Notion + Linear + Slack + Loom + Cal</td>
                  <td className="py-3 pr-4 font-mono text-[#a7b8ad]">~$2,400</td>
                  <td className="py-3 text-[#a7b8ad]">Surface theater · no mission graph · no receipt law</td>
                </tr>
                <tr className="border-b border-[#204538]/40">
                  <td className="py-3 pr-4 text-[#f7f0e4]">ChatGPT Team + Claude Pro</td>
                  <td className="py-3 pr-4 font-mono text-[#a7b8ad]">~$1,000</td>
                  <td className="py-3 text-[#a7b8ad]">Chat with no project memory · no department routing</td>
                </tr>
                <tr className="border-b border-[#204538]/40">
                  <td className="py-3 pr-4 text-[#f7f0e4]">Custom AI cockpit (consulting build)</td>
                  <td className="py-3 pr-4 font-mono text-[#a7b8ad]">$40K–$120K</td>
                  <td className="py-3 text-[#a7b8ad]">6–9 months · doctrine is yours to invent</td>
                </tr>
                <tr className="bg-[#0a211b]">
                  <td className="py-3 pr-4 font-bold text-[#ff7a18]">ORANGEBOX Command</td>
                  <td className="py-3 pr-4 font-mono font-bold text-[#75ff92]">$49 once</td>
                  <td className="py-3 font-semibold text-[#f7f0e4]">Cockpit + 15 depts + 15 skills + worker pack + 27 guardrails</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 max-w-3xl text-sm text-[#a7b8ad]">
            One project where you don&apos;t re-discover what &quot;done&quot;
            meant three weeks ago pays for ORANGEBOX. Once.
          </p>
        </section>
      </ScrollReveal>

      {/* ─── PREREQS / COMPATIBILITY ──────────────────────────────── */}
      <section className="mt-16 rounded-xl border border-[#204538] bg-[#071915]/60 p-6">
        <p className="text-xs uppercase tracking-widest text-[#ff7a18]">
          ::compatibility
        </p>
        <h2 className="mt-2 text-xl font-bold tracking-tight md:text-2xl">
          Will this work on your computer?
        </h2>
        <div className="mt-5 grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#75ff92]">
              Required
            </p>
            <ul className="mt-2 space-y-1.5 text-sm text-[#f7f0e4]">
              <li>· Windows 10 or Windows 11 (x64)</li>
              <li>· Node.js 20+ (free download · linked in installer)</li>
              <li>· 4 GB RAM minimum (8 GB recommended)</li>
              <li>· 200 MB free disk space</li>
              <li>· One-time internet for Node.js download</li>
            </ul>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#a7b8ad]">
              Optional (advanced)
            </p>
            <ul className="mt-2 space-y-1.5 text-sm text-[#a7b8ad]">
              <li>
                · <span className="text-[#f7f0e4]">A Claude or GPT API key</span> — for the Command Surface to route work to a frontier model. The cockpit boots and the UI works without it; routed actions report FAILED honestly (not fake green).
              </li>
              <li>
                · <span className="text-[#f7f0e4]">Ollama</span> with quantized local models (4–40 GB each, free) for the STRATEGY / ENGINEERING / EXPERIENCE triad lanes.
              </li>
              <li>
                · <span className="text-[#f7f0e4]">Codexa Remote</span> — a second machine on your LAN if you want to offload heavy work. <span className="text-[#75ff92]">v1.4 default is Codexa Local — single machine works.</span>
              </li>
              <li>
                · <span className="text-[#f7f0e4]">n8n</span> for cross-app automation hooks.
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-5 border-t border-[#204538] pt-4 text-xs text-[#a7b8ad]">
          <strong className="text-[#f7f0e4]">macOS / Linux</strong> on the v1.5 roadmap. <strong className="text-[#f7f0e4]">ARM64</strong> not yet. <strong className="text-[#f7f0e4]">Win 7/8</strong> not supported.
        </p>
        <details className="mt-3 rounded-md border border-[#204538] bg-[#04100d] p-3 text-xs text-[#a7b8ad]">
          <summary className="cursor-pointer font-mono uppercase tracking-widest text-[#a7b8ad] hover:text-[#f7f0e4]">
            ::install &amp; delivery notes (read after purchase)
          </summary>
          <p className="mt-3 text-[#ffc46b]">
            <strong>SmartScreen:</strong> Installer is unsigned (code-signing certificate is v1.5 work). Windows SmartScreen will warn &quot;unknown publisher&quot; — click <strong>More info</strong> → <strong>Run anyway</strong>. This is normal for indie software.
          </p>
          <p className="mt-3 text-[#ffc46b]">
            <strong>Download:</strong> Your download link appears on the success page after payment. Save it before you close the tab. Email delivery is a backup, not a guarantee.
          </p>
        </details>
      </section>

      {/* ─── WHAT IT IS ───────────────────────────────────────────── */}
      <section className="mt-20 border-t border-[#204538] pt-10">
        <p className="text-xs uppercase tracking-widest text-[#ff7a18]">
          ::what it is
        </p>
        <h2 className="mt-2 max-w-3xl text-2xl font-bold tracking-tight md:text-3xl">
          One thread. The whole project. No rebuild when the model forgets.
        </h2>
        <p className="mt-4 max-w-3xl text-[#a7b8ad]">
          For operators who refuse to lose the thread. Single ZIP. Modular
          production cockpit. Two years of internal development at AtomEons.
          230/230 peer-review tests passing.
        </p>
        <p className="mt-3 max-w-3xl text-sm text-[#f7f0e4]">
          I run this cockpit every day. ORANGEBOX v1.4.0 was built inside
          the cockpit it replaced.
        </p>
      </section>

      {/* ─── FEATURE BENTO ────────────────────────────────────────── */}
      <section className="mt-12">
        <p className="text-xs uppercase tracking-widest text-[#ff7a18]">
          ::what it actually does
        </p>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <div className="rounded-xl border border-[#ff7a18]/40 bg-gradient-to-br from-[#0a211b] to-[#071915] p-6 transition-colors hover:border-[#ff7a18]/70 md:col-span-2 md:row-span-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#ff7a18]">
              {features[0].tag}
            </p>
            <h3 className="mt-2 text-2xl font-bold text-[#f7f0e4] md:text-3xl">
              {features[0].title}
            </h3>
            <p className="mt-4 text-base text-[#a7b8ad]">{features[0].body}</p>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-widest text-[#75ff92]">
              ::headline feature
            </p>
          </div>
          {features.slice(1).map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-[#204538] bg-[#071915] p-5 transition-colors hover:border-[#ff7a18]/40"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#ff7a18]">
                {f.tag}
              </p>
              <h3 className="mt-1 text-base font-semibold text-[#f7f0e4]">
                {f.title}
              </h3>
              <p className="mt-2 text-sm text-[#a7b8ad]">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── TRUST SIGNALS ────────────────────────────────────────── */}
      <section className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: "Local-first",
            body: "No telemetry, no analytics, no phone-home. Your project state lives in %APPDATA%. The cockpit cannot transmit your data even if AtomEons wanted to.",
          },
          {
            title: "Source included",
            body: "Full source tree alongside the binaries. Inspect freely. Modify for personal use.",
          },
          {
            title: "Material Failure Guarantee",
            body: "Full refund within 30 days if it doesn't install/launch on clean Windows 10/11 + Node.js 20+. License §8.",
          },
          {
            title: "Workflow-Fit Refund",
            body: "Within 30 days, full refund if it doesn't fit your workflow. No questions. License §8A.",
          },
          {
            title: "SHA-256 verified",
            body: "Every artifact stamped. Verify against the receipt before installation.",
          },
          {
            title: "Built by one operator",
            body: "Atom McCree, AtomEons Systems Laboratory, Marco Island, FL. Two years of internal use before anyone else touched it.",
          },
        ].map((t) => (
          <div
            key={t.title}
            className="rounded-xl border border-[#204538] bg-[#071915] p-5"
          >
            <p className="text-sm font-bold text-[#75ff92]">▲ {t.title}</p>
            <p className="mt-2 text-sm text-[#a7b8ad]">{t.body}</p>
          </div>
        ))}
      </section>

      {/* ─── BUILD RECEIPTS (cockpit demo) ────────────────────────── */}
      <ScrollReveal>
        <BuildReceipts />
      </ScrollReveal>

      {/* ─── QUALIFICATION ────────────────────────────────────────── */}
      <ScrollReveal>
        <section className="mt-16 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-[#75ff92]/40 bg-[#0a211b] p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#75ff92]">
              ::buy this if
            </p>
            <ul className="mt-3 space-y-1">
              {[
                ["You're a solo founder running multi-disciplinary work alone", "Multiple models, multiple machines, real artifacts moving daily."],
                ["You're a PM or tech lead who needs a private cockpit", "Not another SaaS dashboard. Not another seat to license."],
                ["You're a researcher or lab lead who wants receipt-backed work", "Every meaningful action gets a receipt. Default-on."],
                ["You're an indie consultant billing high-leverage hours", "Stop losing the thread between client sessions."],
                ["You believe receipts > vibes", "No fake green. Every claim has a path."],
              ].map(([head, body], i) => (
                <li key={i} className="rounded border border-transparent transition-colors hover:bg-[#04100d]/40">
                  <details className="group">
                    <summary className="cursor-pointer list-none px-2 py-1.5 text-sm text-[#f7f0e4] marker:hidden">
                      <span className="text-[#75ff92]">·</span> {head}
                    </summary>
                    <p className="px-5 pb-2 text-xs text-[#a7b8ad]">{body}</p>
                  </details>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-[#5a2222] bg-[#1a0a0c] p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#ff4f5e]">
              ::do not buy this if
            </p>
            <ul className="mt-3 space-y-1">
              {[
                ["You want a generic chat-app clone", "ChatGPT and Claude already do that. This is different shape."],
                ["You want a SaaS dashboard with cloud sync", "Local-first by design. Your data does not leave your machine."],
                ["You want managed support or onboarding", "30 days direct founder support. After that, the manual is the support."],
                ["You expect a magic AI button", "This is a cockpit. The operator commands. The model executes."],
                ["You're on macOS / Linux / ARM64 today", "Windows 10/11 x64 only. Other platforms on v1.5 roadmap."],
                ["You're evaluating for a buying committee", "$49 one-time. There is nothing to evaluate at scale."],
              ].map(([head, body], i) => (
                <li key={i} className="rounded border border-transparent transition-colors hover:bg-[#04100d]/40">
                  <details className="group">
                    <summary className="cursor-pointer list-none px-2 py-1.5 text-sm text-[#f7f0e4] marker:hidden">
                      <span className="text-[#ff4f5e]">·</span> {head}
                    </summary>
                    <p className="px-5 pb-2 text-xs text-[#a7b8ad]">{body}</p>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </ScrollReveal>

      {/* ─── COCKPIT CONTRACT ─────────────────────────────────────── */}
      <section className="mt-20 rounded-2xl border border-[#5a3210] bg-[#1a0f00] p-6 md:p-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#ffc46b]">
          ::the cockpit contract
        </p>
        <p className="mt-4 max-w-3xl text-pretty text-[#f7f0e4] md:text-lg">
          ORANGEBOX does not manage you. It does not nudge you, notify
          you, or protect you from a bad decision. It routes work, writes
          receipts, and keeps state. What you build in it is yours. What
          you break is yours. The cockpit is an instrument, not a
          babysitter. If you want the instrument, buy it.
        </p>
      </section>

      {/* ─── NO SUPPORT ───────────────────────────────────────────── */}
      <section className="mt-12 rounded-xl border border-[#5a2222] bg-[#1a0a0c] p-5">
        <p className="text-xs uppercase tracking-widest text-[#ff4f5e]">
          ::no support
        </p>
        <p className="mt-3 text-sm text-[#f7f0e4]">
          $49 one time, you figure it out. 30 days direct founder support
          included. The full Opus system manual is inside the box.
        </p>
        <p className="mt-3 text-sm text-[#a7b8ad]">
          Refunds within 14 days if the file fails to download. See{" "}
          <Link href="/legal/refund" className="underline">
            refund policy
          </Link>{" "}
          and the Material Failure Guarantee inside the LICENSE.
        </p>
      </section>

      {/* ─── CLOSING CTA ──────────────────────────────────────────── */}
      <section className="mt-12 rounded-2xl border border-[#204538] bg-[#0a211b] p-8 text-center">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
          The manual is inside. The rest is your problem.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-[#a7b8ad]">
          One operator. Real execution surface. Everything proof-backed.
        </p>
        <div className="mt-6 flex justify-center">
          <BuyButton />
        </div>
        <p className="mt-3 text-xs text-[#a7b8ad]">
          $49 USD · one-time · forever · no subscription, ever
        </p>
      </section>

      <StickyBuyBar />

      {/* SoftwareApplication + Offer + BreadcrumbList JSON-LD —
          ammo for Google rich results, AI search engines (Perplexity,
          Gemini, ChatGPT search, Brave, etc.) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "SoftwareApplication",
                "@id": "https://atomeons.com/orangebox#software",
                name: "ORANGEBOX Command",
                alternateName: ["ORANGEBOX", "ORANGEBOX OS", "AtomEons ORANGEBOX"],
                applicationCategory: [
                  "DeveloperApplication",
                  "BusinessApplication",
                  "ProductivityApplication",
                ],
                operatingSystem: "Windows 10, Windows 11",
                softwareVersion: "1.4.0",
                releaseNotes:
                  "v1.4.0 — Codexa Local + Audit Roll-up. NEW: Codexa Local mode lets the cockpit run heavy work on the buyer's machine — no second computer needed. Plus 13 P0 fixes from the 8-agent shop-sale audit pass.",
                url: "https://atomeons.com/orangebox",
                downloadUrl:
                  "https://github.com/AtomEons/orangebox-os/releases/tag/v1.4.0",
                fileSize: "24.81 MB",
                description:
                  "ORANGEBOX Command — the private AI operations cockpit for one operator. Pairs with Claude Code via 60+ MCP tools. Mission-graph DAG, 15 departments, 27 guardrails, party-line, receipts. Local-first. No telemetry.",
                offers: {
                  "@type": "Offer",
                  price: "49",
                  priceCurrency: "USD",
                  availability: "https://schema.org/InStock",
                  url: "https://atomeons.com/orangebox",
                  priceValidUntil: "2030-12-31",
                },
                publisher: {
                  "@type": "Organization",
                  name: "AtomEons Systems Laboratory",
                  url: "https://atomeons.com",
                  founder: { "@type": "Person", name: "Atom McCree" },
                  email: "a.mccree@gmail.com",
                  location: {
                    "@type": "Place",
                    name: "Marco Island, FL, USA",
                  },
                },
                aggregateRating: undefined, // honest: no public reviews yet
                featureList: [
                  "Pairs with Claude Code via 60+ MCP server tools",
                  "Mission-graph DAG runner with project spine",
                  "15 named departments (AE0–AE14) for routing",
                  "Triad model lanes (STRATEGY · ENGINEERING · EXPERIENCE)",
                  "27 Constitutional Guardrails",
                  "9-stage Gate Chain",
                  "Codexa Local mode (no second computer needed) — NEW v1.4",
                  "Codexa Remote mode (advanced — second machine on LAN)",
                  "Party-line shared status bus (JSONL)",
                  "Receipt + proof artifact rails",
                  "4-layer memory model with knowledge engine",
                  "ÆoNs Skill Suite V1.4 (15 skills, 230/230 tests)",
                  "Local-first (zero telemetry, no phone-home)",
                  "Full source code included",
                ],
                keywords:
                  "Claude Code, MCP, AI cockpit, project cockpit, mission graph, DAG, party-line, receipts, local-first, no subscription, $49 once, ORANGEBOX, AtomEons",
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "AtomEons",
                    item: "https://atomeons.com",
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "ORANGEBOX Command v1.4.0",
                    item: "https://atomeons.com/orangebox",
                  },
                ],
              },
            ],
          }),
        }}
      />
    </main>
  );
}

const features: { tag: string; title: string; body: string }[] = [
  {
    tag: "Codexa Local · NEW v1.4",
    title: "Heavy work runs on your machine",
    body: "v1.4 default — heavy execution stays on the cockpit machine. No second computer needed. The right answer for almost every $49 buyer. Switch to Codexa Remote later if you want a dedicated worker box on your LAN.",
  },
  {
    tag: "Vision Rail",
    title: "Live mission board",
    body: "Project spine, DAG nodes, current node, blockers, progress, next action — all in one rail. Truth lives on disk; the cockpit reads it.",
  },
  {
    tag: "Party Line",
    title: "Structured department updates",
    body: "Every department posts short status, evidence, blockers, and next action. Confidence and receipt paths included. No raw transcript dump.",
  },
  {
    tag: "Triad Routing",
    title: "Three lanes, not random agents",
    body: "STRATEGY · ENGINEERING · EXPERIENCE triad heads route work to the right brain. Frontier, local, or Codexa worker — picked deliberately.",
  },
  {
    tag: "Receipts & Proof",
    title: "Verified, not vibes",
    body: "Every meaningful action writes a receipt: result, evidence, blockers, next action, files touched, commands run, proof paths, rollback note.",
  },
  {
    tag: "Command Surface",
    title: "The chat is the steering wheel",
    body: "Type your intent. ORANGEBOX turns it into project contracts, spine, DAG actions, and routed department work. No prompt engineering.",
  },
];
