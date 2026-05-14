import Link from "next/link";
import { BuyButton } from "../_components/BuyButton";
import { CockpitTicker } from "../_components/CockpitTicker";
import { InstallCommand } from "../_components/InstallCommand";
import { BuildReceipts } from "../_components/BuildReceipts";
import { ScrollReveal } from "../_components/ScrollReveal";
import { StickyBuyBar } from "../_components/StickyBuyBar";

export const metadata = {
  title: "ORANGEBOX — Private Command Cockpit",
  description:
    "ORANGEBOX is a private, local-first command cockpit for one operator running large projects through AI departments, worker systems, and proof gates. $49 one-time download.",
};

export default function OrangeBox() {
  return (
    <main className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-24 pt-10">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#a7b8ad]">
        <Link href="/">AtomEons</Link>{" "}
        <span className="text-[#204538]">/</span> ORANGEBOX
      </p>

      <section className="grid gap-10 pt-8 md:grid-cols-[1.6fr_1fr] md:items-center">
        <div>
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="rebel-pill" style={{ color: "#ff4f5e", borderColor: "rgba(255,79,94,0.5)", background: "rgba(255,79,94,0.06)" }}>
              ▲ PROTOTYPE BETA
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#204538] bg-[#071915] px-3 py-1 font-mono text-[11px] text-[#a7b8ad]">
              92 endpoints · 17 lanes · 12 MCP tools
            </span>
          </div>
          <h1 className="glitch-hover text-balance text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
            ORANGEBOX is <span className="text-[#ff7a18]">now live</span>.
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-base text-[#a7b8ad] md:text-lg">
            A private command cockpit built for one operator to run large,
            complex projects through AI departments, worker systems, and proof
            gates — without drowning in context or developer noise.
          </p>
          <p className="mt-3 max-w-xl text-base text-[#f7f0e4]">
            It is not another chat interface. It is a real execution surface.
          </p>
          <p className="mt-2 max-w-xl text-base font-semibold text-[#ffc46b]">
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
              $49 USD · one-time · no support · download on payment confirmed
            </p>
          </div>
        </div>

        <aside className="rounded-xl border border-[#204538] bg-[#071915] p-5 shadow-[0_0_60px_rgba(255,122,24,0.12)]">
          <p className="text-xs uppercase tracking-widest text-[#a7b8ad]">
            Inside the box
          </p>
          <ul className="mt-3 space-y-2 text-sm text-[#f7f0e4]">
            <li>
              <span className="text-[#ff7a18]">·</span> Runnable cockpit (Node
              server + frontend)
            </li>
            <li>
              <span className="text-[#ff7a18]">·</span> 92 server endpoints
            </li>
            <li>
              <span className="text-[#ff7a18]">·</span> 12 MCP tools for Claude
              Code
            </li>
            <li>
              <span className="text-[#ff7a18]">·</span> 17 department routing
              lanes
            </li>
            <li>
              <span className="text-[#ff7a18]">·</span> Tauri desktop wrapper
              (optional)
            </li>
            <li>
              <span className="text-[#ff7a18]">·</span> Full Opus system manual
              + system index
            </li>
          </ul>
          <p className="mt-4 border-t border-[#204538] pt-4 text-xs text-[#a7b8ad]">
            ORANGEBOX runs locally on{" "}
            <span className="font-mono text-[#75ff92]">127.0.0.1:8787</span>.
            Your project state stays on your disk. No cloud sync.
          </p>
        </aside>
      </section>

      {/* COCKPIT SCREENSHOT — real product UI, captured on operator machine */}
      <section className="mt-16">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#ff7a18]">
              ::actual cockpit
            </p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">
              Here&apos;s what you&apos;re buying.
            </h2>
            <p className="mt-2 max-w-xl text-sm text-[#a7b8ad]">
              Real screenshot from the operator&apos;s running cockpit.
              Not a marketing render. Not a wireframe. The actual UI you
              get when you run{" "}
              <span className="font-mono text-[#75ff92]">npm run start</span>.
            </p>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-[#1b8b75]">
            captured 2026-05-13 · 127.0.0.1:8787
          </p>
        </div>
        {/* Use plain <img> intentionally — the screenshot is already
            optimized at source size and we want zero Next/Image client JS
            on the product page */}
        <div className="overflow-hidden rounded-xl border border-[#204538] bg-[#04100d] shadow-[0_0_60px_rgba(255,122,24,0.12)]">
          <img
            src="/screens/cockpit-live.png"
            alt="ORANGEBOX cockpit running locally — Command, Codexa Bridge, project rail, and live party-line feed visible"
            width={1600}
            height={1000}
            loading="lazy"
            decoding="async"
            className="block h-auto w-full"
          />
        </div>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-[#a7b8ad]">
          ::evidence orangebox-command-chat-hub-live2-20260513.png
        </p>
      </section>

      {/* PREREQS — Mirrors fix: disclose what you need before this works */}
      <section className="mt-12 rounded-xl border border-[#204538] bg-[#071915]/60 p-6">
        <p className="text-xs uppercase tracking-widest text-[#ff7a18]">
          What you need before this works
        </p>
        <h2 className="mt-2 text-xl font-bold tracking-tight md:text-2xl">
          Read this before you buy.
        </h2>
        <div className="mt-5 grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#75ff92]">
              Required
            </p>
            <ul className="mt-2 space-y-1.5 text-sm text-[#f7f0e4]">
              <li>· Node.js 18 or newer (`node --version`)</li>
              <li>· A modern browser (Chrome, Edge, Firefox, Safari)</li>
              <li>· Windows, macOS, or Linux</li>
              <li>
                ·{" "}
                <span className="text-[#ffc46b]">
                  A Claude or GPT API key
                </span>{" "}
                if you want the Command Surface to actually route work to a
                frontier model. Without it the cockpit boots, the UI works,
                department routing fails honestly with FAILED indicators (not
                fake green).
              </li>
            </ul>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#a7b8ad]">
              Optional (advanced)
            </p>
            <ul className="mt-2 space-y-1.5 text-sm text-[#a7b8ad]">
              <li>
                · <span className="text-[#f7f0e4]">Ollama</span> running locally
                with the specific 4-bit quantized models if you want the
                STRATEGY / ENGINEERING / EXPERIENCE triad lanes (
                <span className="font-mono text-[11px]">llama3.3:70b</span>,{" "}
                <span className="font-mono text-[11px]">qwen2.5-coder:32b</span>
                )
              </li>
              <li>
                · <span className="text-[#f7f0e4]">A second machine</span> on
                your LAN for the{" "}
                <span className="font-mono text-[#75ff92]">Codexa</span> worker
                rail (heavy build/test/scan offload)
              </li>
              <li>
                · <span className="text-[#f7f0e4]">Tauri toolchain</span> if
                you want to build the desktop wrapper instead of using the
                browser
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-5 border-t border-[#204538] pt-4 text-xs text-[#a7b8ad]">
          The cockpit, frontend, MCP tools, project DAG, party-line, and
          receipts work standalone. The triad lanes and Codexa worker rail
          require the optional dependencies above.
        </p>
        <p className="mt-3 rounded-md border border-[#5a3210] bg-[#1a0f00] p-3 text-xs text-[#ffc46b]">
          ::delivery — Your download link appears on the success page after
          payment. Save it before you close the tab. Email delivery is a
          backup, not a guarantee. There is no resend endpoint.
        </p>
      </section>

      <section className="mt-20 border-t border-[#204538] pt-10">
        <p className="text-xs uppercase tracking-widest text-[#ff7a18]">
          What it is
        </p>
        <h2 className="mt-2 max-w-3xl text-2xl font-bold tracking-tight md:text-3xl">
          One thread. The whole project. No rebuild when the model forgets.
        </h2>
        <p className="mt-4 max-w-3xl text-[#a7b8ad]">
          For operators who refuse to lose the thread. Single ZIP. Modular
          production version being built in the same cockpit it will
          replace.
        </p>
        <p className="mt-3 max-w-3xl text-sm text-[#f7f0e4]">
          I run this cockpit every day. ORANGEBOX v1 was built inside the
          cockpit it replaced.
        </p>
      </section>

      <section className="mt-16">
        <p className="text-xs uppercase tracking-widest text-[#ff7a18]">
          What it actually does
        </p>
        {/* Bento layout: hero feature 2x size + 5 small below */}
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {/* Hero feature card spans 2 columns */}
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

      <ScrollReveal>
        <BuildReceipts />
      </ScrollReveal>

      {/* Qualification block — expandable per-row for self-qualification */}
      <ScrollReveal>
        <section className="mt-16 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-[#75ff92]/40 bg-[#0a211b] p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#75ff92]">
              ::buy this if
            </p>
            <ul className="mt-3 space-y-1">
              {[
                ["You actually run serious projects with AI workers", "Multiple models, multiple machines, real artifacts moving daily."],
                ["You can install Node and read a manual", "If npm install reads as a foreign language, this isn't for you."],
                ["You want one operator surface, not 22 random agents", "Triad lanes, named departments, deliberate routing."],
                ["You believe receipts > vibes", "Every action writes a receipt. You can audit your own session."],
                ["You like instruments, not chatbots", "Vision Rail, Party Line, Receipts Library — cockpit grade."],
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
                ["You want a SaaS dashboard with login", "There is no account, no cloud sync, no team workspace."],
                ["You want managed support or onboarding", "No tickets, no DMs, no replies. The manual is the support."],
                ["You expect a cloud sync and team workspace", "Local-first. Your project state is on your disk."],
                ["You expect production-ready, not v1 prototype", "PROTOTYPE BETA pill exists for a reason."],
                ["You are evaluating for a buying committee", "$49 one-time. There is nothing to evaluate at scale."],
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

      <section className="mt-16 rounded-xl border border-[#5a2222] bg-[#1a0a0c] p-5">
        <p className="text-xs uppercase tracking-widest text-[#ff4f5e]">
          No support
        </p>
        <p className="mt-3 text-sm text-[#f7f0e4]">
          $49 one time, you figure it out. The full Opus system manual is
          inside the box. No tickets, no DMs, no replies. If you want
          hand-holding, this is not for you.
        </p>
        <p className="mt-3 text-sm text-[#a7b8ad]">
          Refunds within 14 days if the file fails to download. See{" "}
          <Link href="/legal/refund" className="underline">
            refund policy
          </Link>
          .
        </p>
      </section>

      {/* Cockpit Contract — credo block */}
      <section className="mt-20 rounded-2xl border border-[#5a3210] bg-[#1a0f00] p-6 md:p-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#ffc46b]">
          ::the cockpit contract
        </p>
        <p className="mt-4 max-w-3xl text-pretty text-[#f7f0e4] md:text-lg">
          ORANGEBOX does not manage you. It does not nudge you, notify you,
          or protect you from a bad decision. It routes work, writes
          receipts, and keeps state. What you build in it is yours. What
          you break is yours. The cockpit is an instrument, not a
          babysitter. If you want the instrument, buy it.
        </p>
      </section>

      <section className="mt-12 rounded-2xl border border-[#204538] bg-[#0a211b] p-8 text-center">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
          The manual is inside. The rest is your problem.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-[#a7b8ad]">
          One operator. Real execution surface. Receipts, not vibes.
        </p>
        <div className="mt-6 flex justify-center">
          <BuyButton />
        </div>
        <p className="mt-3 text-xs text-[#a7b8ad]">
          $49 USD · one-time · no support
        </p>
      </section>

      <StickyBuyBar />
    </main>
  );
}

const features: { tag: string; title: string; body: string }[] = [
  {
    tag: "Vision Rail",
    title: "Live mission board",
    body: "Project spine, DAG nodes, current node, blockers, progress, and next action — all in one rail. Your project's truth lives on disk; the cockpit reads it.",
  },
  {
    tag: "Party Line",
    title: "Structured department updates",
    body: "Every department posts short status, evidence, blockers, and next action. Confidence and receipt paths included. No raw transcript dump.",
  },
  {
    tag: "Triad Routing",
    title: "Three lanes, not random agents",
    body: "STRATEGY, ENGINEERING, and EXPERIENCE triad heads route work to the right brain. Frontier, local, or Codexa worker — picked deliberately.",
  },
  {
    tag: "Receipts & Proof",
    title: "Verified, not vibes",
    body: "Every meaningful action writes a receipt: result, evidence, blockers, next action, files touched, commands run, proof paths, rollback note.",
  },
  {
    tag: "Codexa Worker Rail",
    title: "Heavy work off the cockpit",
    body: "Long builds, tests, screenshots, indexing, benchmarks run on a separate worker rail. The cockpit stays responsive.",
  },
  {
    tag: "Command Surface",
    title: "The chat is the steering wheel",
    body: "Type your intent. ORANGEBOX turns it into project contracts, spine, DAG actions, and routed department work. No prompt engineering. Cockpit reads operator language.",
  },
];
