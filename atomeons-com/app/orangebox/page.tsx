import Link from "next/link";
import { BuyButton } from "../_components/BuyButton";

export const metadata = {
  title: "ORANGEBOX — Private Command Cockpit",
  description:
    "ORANGEBOX is a private, local-first command cockpit for one operator running large projects through AI departments, worker systems, and proof gates. $49 one-time download.",
};

export default function OrangeBox() {
  return (
    <main className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-24 pt-10">
      <p className="text-xs uppercase tracking-widest text-[#a7b8ad]">
        <Link href="/">AtomEons</Link>{" "}
        <span className="text-[#204538]">/</span> ORANGEBOX
      </p>

      <section className="grid gap-10 pt-8 md:grid-cols-[1.6fr_1fr] md:items-center">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#204538] bg-[#071915] px-3 py-1 text-xs text-[#75ff92]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#75ff92]" />
            Live · v1 prototype · single ZIP
          </p>
          <h1 className="text-balance text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
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

          <div
            id="buy"
            className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center"
          >
            <BuyButton />
            <p className="text-xs text-[#a7b8ad]">
              $49 USD · one-time · no support · instant download
            </p>
          </div>
        </div>

        <aside className="rounded-xl border border-[#204538] bg-[#071915] p-5 shadow-[0_0_40px_rgba(89,217,255,0.05)]">
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

      <section className="mt-20 border-t border-[#204538] pt-10">
        <p className="text-xs uppercase tracking-widest text-[#ff7a18]">
          What it is
        </p>
        <h2 className="mt-2 max-w-3xl text-2xl font-bold tracking-tight md:text-3xl">
          The operating system layer between you and your AI workforce.
        </h2>
        <p className="mt-4 max-w-3xl text-[#a7b8ad]">
          Built for people running serious projects who want maximum leverage
          without losing control or clarity. Single-file prototype ready.
          Modular production version in progress.
        </p>
      </section>

      <section className="mt-16">
        <p className="text-xs uppercase tracking-widest text-[#ff7a18]">
          What it actually does
        </p>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-[#204538] bg-[#071915] p-5 transition-colors hover:border-[#ff7a18]/40"
            >
              <p className="text-sm font-semibold text-[#ff7a18]">{f.tag}</p>
              <h3 className="mt-1 text-base font-semibold text-[#f7f0e4]">
                {f.title}
              </h3>
              <p className="mt-2 text-sm text-[#a7b8ad]">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-[#204538] bg-[#071915] p-5">
          <p className="text-xs uppercase tracking-widest text-[#a7b8ad]">
            Requires
          </p>
          <ul className="mt-3 space-y-2 text-sm text-[#f7f0e4]">
            <li>· Node.js 18 or newer</li>
            <li>· A modern browser (Chrome, Edge, Firefox, Safari)</li>
            <li>· Windows, macOS, or Linux</li>
            <li>
              · Optional: a second machine for{" "}
              <span className="font-mono text-[#75ff92]">Codexa</span> workers
            </li>
            <li>· Optional: Tauri toolchain to build the desktop app</li>
          </ul>
        </div>
        <div className="rounded-xl border border-[#5a2222] bg-[#1a0a0c] p-5">
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
        </div>
      </section>

      <section className="mt-20 rounded-2xl border border-[#204538] bg-[#0a211b] p-8 text-center">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
          Ship with the cockpit, not without it.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-[#a7b8ad]">
          One operator. Real execution surface. Everything proof-backed.
        </p>
        <div className="mt-6 flex justify-center">
          <BuyButton />
        </div>
        <p className="mt-3 text-xs text-[#a7b8ad]">
          $49 USD · one-time · no support
        </p>
      </section>
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
    tag: "Smart Model Routing",
    title: "Triad lanes, not random agents",
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
    title: "Natural-language operator chat",
    body: "Type intent. ORANGEBOX turns it into project contracts, spine, DAG actions, and routed department work. The chat is the steering wheel.",
  },
];
