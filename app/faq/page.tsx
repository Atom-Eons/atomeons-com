import Link from "next/link";

export const metadata = {
  title: "FAQ — ORANGEBOX v6.1.0 Agent Mode",
  description:
    "Answers about ORANGEBOX Command v6.1.0 Agent Mode — the native AI cockpit. $1 once · FREE first 7 days of public launch · license §4A binds it. Local-first. Zero telemetry. Multi-model swap-lane routing across Claude · GPT · Gemini · Groq · Ollama · OpenRouter.",
  alternates: { canonical: "https://atomeons.com/faq" },
  openGraph: {
    title: "ORANGEBOX FAQ",
    description:
      "$1 once · FREE first 7 days · local-first · multi-model · license §4A bans subscription switch.",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "ORANGEBOX FAQ",
    description:
      "$1 once · FREE first 7 days · local-first · multi-model.",
  },
};

type QA = { q: string; a: string };

// ─── AI BASICS — novice section (operator directive 2026-05-21).
// Lives ABOVE the ORANGEBOX questions so readers who don't know what
// AI is yet land here first. Pairs with the /start onboarding page.
const FAQS: QA[] = [
  {
    q: "I'm new to AI. Where do I start?",
    a: "Read /start — an 11-minute, no-jargon on-ramp written for someone who has used ChatGPT under ten times. It explains what AI actually is in one paragraph, gives you six concrete tasks you can do tonight (rewrite an email, decode a medical report, plan a trip), names what AI cannot do, and lays out a 30-day on-ramp. After /start, this FAQ and the rest of the site will read very differently.",
  },
  {
    q: "What is AI in one paragraph?",
    a: "Imagine a calculator. Now imagine a calculator that doesn't just do math — it writes emails, reads thirty-page contracts, looks at photos and tells you what's in them. That's AI. The version that just exploded into your life is called a large language model. Mechanically, it is a very expensive autocomplete trained on most of the public internet, predicting one word at a time until it has written you an essay, a recipe, a workout plan. It feels like magic because the guesses are extraordinarily good. It is not actually magic. You should respect it, use it, and never quite trust it.",
  },
  {
    q: "Which AI tool should I pick first — ChatGPT, Claude, or Gemini?",
    a: "Any one of them. Pick whichever has a free tier you can sign into right now and commit to it for 30 days. Don't tab-jump between them — you're building muscle memory, not comparison-shopping. Claude (claude.ai) is warmer and tends to be more honest about its limits. ChatGPT (chatgpt.com) has the most features. Gemini (gemini.google.com) is best when you want it to search the live web. All three are free at the entry tier.",
  },
  {
    q: "What can I actually do with AI tonight?",
    a: "Open the chat box and try ONE of these: (1) paste a tough work email and ask for a firm, polite reply under 100 words; (2) upload a 30-page PDF and ask for a 1-page summary plus 3 bullets for a busy executive; (3) describe a 7-day trip you want to take with a budget and ask for a day-by-day plan with cost estimates; (4) paste a confusing medical or legal document and ask 'explain this in plain English'; (5) describe a hard conversation you need to have and ask for a script. Five minutes. You'll feel the shift on the first answer.",
  },
  {
    q: "What can AI NOT do? What should I never trust it for?",
    a: "Six honest limits. (1) It can confidently make things up — called a hallucination. Verify any citation, study, or quote before you use it. (2) It mostly does not remember you between conversations. (3) It does not reliably know what happened yesterday — training data has a cutoff. (4) It cannot take action in the real world by itself (agents are starting to; you should still be the one with the final yes/no). (5) It will not catch its own mistakes unless you push — ask 'what's wrong with this answer?' (6) Never paste passwords, social security numbers, or full credit card numbers into a chat box.",
  },
  {
    q: "What is an LLM? What does that stand for?",
    a: "Large Language Model. The engine behind ChatGPT, Claude, and Gemini. A program trained to predict the next word from a vast corpus of text. Everything else — agents, search, voice mode, image input — is built on top of an LLM at the center. When people say 'AI' in 2026, they usually mean an LLM and the products wrapped around one.",
  },
  {
    q: "What is a 'prompt' and how do I write a good one?",
    a: "A prompt is whatever you type to the AI. There is no magic syntax. Good prompts just have one quality: they are specific. Bad: 'help me with my resume.' Good: 'Here is my resume and the job description. Rewrite the work history section to emphasize the SaaS pricing experience, in the same tone as the original, under 200 words.' If the answer disappoints you, add more context, not more emphasis.",
  },
  {
    q: "What is AtomEons?",
    a: "AtomEons is an independent AI research laboratory in Marco Island, FL. One operator (Atom McCree). Four pillars: USE AI (the ORANGEBOX cockpit), MAKE MONEY (skil.ski), KNOW THE TRUTH (/intel + The Founder's View), and RESEARCH (ÆoNs Research, 12 manuscripts + the Lessons From Sci-Fi monograph). The mission is to build the cockpit that gives a human the right authority over the right machine at the right moment, and to separate signal from theater for everyone else.",
  },
  {
    q: "Why is the cockpit called ORANGEBOX?",
    a: "Because orange — the brand color — is the warning light in the cockpit that says 'pay attention.' Software that runs your life should make you pay attention to what it's doing, not what it's selling you. ORANGEBOX is the cockpit AtomEons uses to build everything else. v6.1.0 sells today for $1 once, free first 7 days of the launch window. The deeper answer is in /orangebox.",
  },
  {
    q: "What is ORANGEBOX v6.0.0?",
    a: "ORANGEBOX Command v6.0.0 is a 4.46 MB native AI cockpit for Windows. It is one executable file — no webview, no bundled chromium, no Node install required to run. Double-click and the window appears in about 2 seconds. Inside the cockpit: 11 lanes (Cockpit, IDE, Terminal, Trilane debate, Voice, 𝕏 Feed, Vault, Receipts, Privacy, Skils, Settings), 60+ MCP tools, 15 named departments (AE0–AE14), 27 Constitutional Guardrails, multi-model routing across Claude, GPT, Gemini, Groq LPUs, Ollama, and OpenRouter (200+ models). $1 once, forever — with a license clause (§4A) that legally bans subscription switch.",
  },
  {
    q: "How is the price really $1? Where's the catch?",
    a: "Pricing canon (2026-05-20): $1 USD once, forever. During the first 7 days of the public launch window, the price is $0 — FREE. After the 7-day window closes, it returns to $1. That's the whole price model. No catch. No ladder. No subscription. You buy it once (or claim it free during launch week), you own it, you keep the binary, you keep the source. License §4A binds AtomEons: if we ever attempt to switch to subscription billing, every existing buyer keeps their license free in perpetuity. The earlier ladder-pricing model (+$1 per 100 buyers) was retired on launch day in favor of the simpler $1 + free-first-week canon.",
  },
  {
    q: "What's inside the v6.0.0 installer?",
    a: "Three artifacts: orangebox-v6.0.0-setup.exe (NSIS installer, 23.68 MB — recommended), orangebox-v6.0.0-portable.zip (34.71 MB — unzip-and-run, ideal for USB / locked-down corporate machines), and orangebox.exe (the 4.46 MB native binary alone — for advanced users who already have the runtime configured). All three contain the same cockpit, AE0–AE14 doctrine, the full ÆoNs Skill Suite, 60+ MCP tools, mission-graph DAG runner, party-line status bus, receipts pipeline, demo project, operator manual, quickstart, and full source. SHA-256 hashes published on the product page.",
  },
  {
    q: "Is ORANGEBOX a subscription?",
    a: "No. $1 USD once, ladder-priced, perpetual. License §4A binds AtomEons: if we ever attempt to switch to subscription billing, every existing buyer keeps their license free in perpetuity. The clause is enforceable, published, and ships inside the binary as documentation.",
  },
  {
    q: "What's new in v6 versus v5?",
    a: "v6 ditched the webview. The whole cockpit is now a native Rust + egui binary (4.46 MB). No HTML chrome. No bundled chromium. The new 2026 stack adds Groq LPUs for sub-300ms quick_reply tasks, Ollama LOCAL_MODE for one-env-var air-gap operation, Groq Gemma for opt-in pre-classification (ORANGEBOX_ROUTE_TIER=gemma), and Anthropic's Agent Teams advisory header on every synthesis call. The full prior alpha (memory tool, files API, adaptive thinking, advisor tool, prompt-cache pre-warm, multi-breakpoint cache, structured outputs, compaction) is carried forward.",
  },
  {
    q: "Does ORANGEBOX work on macOS or Linux?",
    a: "Not yet. Windows 10/11 x64 only. macOS Apple Silicon and Linux x64 are on the v6.x roadmap — egui targets all three natively so the port is mechanical, not architectural. ARM64 Windows, Win 7/8, and Wine/CrossOver are not supported per the Material Failure Guarantee scope.",
  },
  {
    q: "Do I need a Claude or GPT API key to use ORANGEBOX?",
    a: "The cockpit boots, the UI works, the project DAG, party-line, MCP tools, and receipts all function without any API key. The Command Surface (the route-work-to-a-frontier-model feature) requires at least one of: Claude API key, GPT API key, Gemini API key, Groq key, OpenRouter key, or a local Ollama host. Without any key, the routed lanes report DEGRADED honestly instead of fake green. The Privacy lane shows every provider charge in real time — the cockpit takes zero markup on tokens.",
  },
  {
    q: "Do I need Ollama or local models?",
    a: "Optional but recommended. With Ollama running locally and a model loaded (llama3.3:70b, qwen2.5-coder:32b, or your choice), set ORANGEBOX_LOCAL_MODE=1 and the chat + voice-intent paths swap to local inference. Zero outbound. Zero API calls. The Privacy lane confirms egress is disabled. Without Ollama, the cockpit works fine — it just routes everything through your chosen cloud providers.",
  },
  {
    q: "Why does Chrome warn on download?",
    a: "atomeons.com is a brand-new domain — Google Safe Browsing and Windows SmartScreen have zero reputation history for it. The v6.0.0 binaries are also currently unsigned (EV code-signing certificate lands in v6.1). Chrome's warning is automatic for any first-time download from a low-reputation domain serving unsigned executables. To verify integrity: compare the file's SHA-256 against the canonical value published on the product page using Get-FileHash (PowerShell) or shasum -a 256 (bash). If the hash matches, the file is exactly what we built. Then click 'More info → Run anyway' on the SmartScreen prompt.",
  },
  {
    q: "What if it doesn't install or doesn't fit my workflow?",
    a: "Two refund paths, both 30 days. Material Failure Guarantee — full refund if ORANGEBOX fails to install or launch on a clean Windows 10/11 machine (License §8). Workflow-Fit Refund — full refund within 30 days if it doesn't fit your workflow, no questions (License §8A). Refunds via Stripe to original payment method within 5 business days.",
  },
  {
    q: "Is ORANGEBOX private? Does it phone home?",
    a: "Zero telemetry. No analytics inside the cockpit. No phone-home. Your project state lives in %APPDATA%\\com.atomeons.orangebox.command\\ on your disk and never leaves. The Privacy lane shows every provider charge before and after it happens. Set ORANGEBOX_LOCAL_MODE=1 to disable all outbound. AtomEons cannot see your work even if AtomEons wanted to. License §13.",
  },
  {
    q: "Is the source code included?",
    a: "Yes. Full source tree alongside the native binary. Inspect freely. Modify for personal or single-business use. Redistribution is not permitted (LICENSE §3). Re-uploading the binary or source to a public mirror is not permitted. Forking for personal study is fine.",
  },
  {
    q: "Why $1?",
    a: "Because anyone with an itch to operate better should be able to afford a real cockpit. Students, freelancers, indie devs, side-project builders — the people who do real work without a budget. The ladder mechanism means as adoption grows the price reflects it, but the floor for the first 100 buyers stays at $1. The price of a video game. The price you don't think twice about.",
  },
  {
    q: "How does it compare to hiring a part-time PM, or to Notion + Linear + Slack?",
    a: "Hiring a part-time PM at 10h/week and $100/h is ~$52,000/year — the doctrine leaves with the human. Notion + Linear + Slack + Loom + Cal stack is ~$2,400/year — surface theater, no mission graph, no receipt law. Claude Pro + ChatGPT Plus + Cursor + Gemini Advanced is ~$3,120/year — chat with no project memory or department routing. Custom AI cockpit consulting build is $40K–$120K and 6–9 months. ORANGEBOX is $1 once (at the current ladder rung) and includes the cockpit, doctrine, skill suite, and worker pack.",
  },
  {
    q: "Will it stop being relevant if I lock into ORANGEBOX?",
    a: "No. ORANGEBOX is provider-agnostic by design. It speaks Claude, GPT, Gemini, Groq LPUs, Ollama (local), Hermes (𝕏 Feed lane), and OpenRouter (200+ models) through one routing layer. If your model preference changes, swap a key. The cockpit doesn't care. Same workflow, same receipts, different brain.",
  },
  {
    q: "Does ORANGEBOX integrate with n8n?",
    a: "Yes. A complete n8n setup guide ships in the bundle. The cockpit can fire and receive n8n workflows, automation hooks, and external triggers.",
  },
  {
    q: "What is The Founder's View?",
    a: "A daily 8pm Eastern fictional broadcast from the lab. No edits before publication, only retracts after with the reason stated. Aims at everything that earns it. Equal opportunity indignation — every letter, no exceptions. Editorial framing and characterizations are fiction; events cited are real and from the day's news. Read at atomeons.com/founders-view or subscribe by RSS at atomeons.com/founders-view/rss.xml.",
  },
  {
    q: "What is Æ Research?",
    a: "ÆoNs Research is the publishing arm of the lab. Twelve manuscripts as of April 2026 covering bioelectric oncology, the gut-brain mislabel hypothesis, solar information transfer, the topological field theory of self-modifying collective intelligence, the Light Code validation protocol for DNA version control, and quantum-classical unification through a sinusoidal substrate. Every paper has an academic abstract AND a kid/grandma summary side by side. All CC-BY 4.0. Read at atomeons.com/research/papers.",
  },
  {
    q: "Where do I buy?",
    a: "https://atomeons.com/orangebox — Stripe Checkout in live mode. Collects name, email, billing address, phone, birthdate, and a marketing opt-in. Download link appears on the success page after payment is confirmed. Bookmark it before you close the tab. Lost your link? Email a.mccree@gmail.com from the address you used at purchase.",
  },
];

export default function FAQ() {
  return (
    <main className="relative z-10 mx-auto w-full max-w-3xl px-6 pt-12 pb-24">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#a7b8ad]">
        <Link href="/">AtomEons</Link>{" "}
        <span className="text-[#204538]">/</span> FAQ
      </p>

      <h1 className="mt-6 text-balance text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
        ORANGEBOX <span className="text-[#ff7a18]">questions</span> answered.
      </h1>
      <p className="mt-6 max-w-xl text-pretty text-base text-[#a7b8ad] md:text-lg">
        Real answers about the v6.0.0 native AI cockpit. 4.46 MB. $1
        ladder. Local-first. No subscription, ever.
      </p>

      <div className="mt-12 space-y-6">
        {FAQS.map((f, i) => (
          <section
            key={i}
            className="rounded-xl border border-[#204538] bg-[#071915] p-5 transition-colors hover:border-[#ff7a18]/40"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#1b8b75]">
              ::Q.{String(i + 1).padStart(2, "0")}
            </p>
            <h2 className="mt-2 text-lg font-bold text-[#ff7a18]">{f.q}</h2>
            <p className="mt-3 text-sm text-[#f7f0e4]">{f.a}</p>
          </section>
        ))}
      </div>

      <hr className="my-12 border-[#204538]" />

      <div className="flex flex-wrap gap-3">
        <Link
          href="/orangebox"
          className="rounded-md border border-[#ff7a18] bg-[#ff7a18] px-4 py-2 text-sm font-bold text-black transition-colors hover:bg-[#ffc46b]"
          style={{ color: "#000", WebkitTextFillColor: "#000" }}
        >
          See ORANGEBOX · $1 →
        </Link>
        <Link
          href="/research/papers"
          className="rounded-md border border-[#22F0D5] bg-[#22F0D5] px-4 py-2 text-sm font-bold text-black"
          style={{ color: "#000", WebkitTextFillColor: "#000" }}
        >
          12 papers →
        </Link>
        <Link
          href="/founders-view"
          className="rounded-md border border-[#204538] bg-[#071915] px-4 py-2 text-sm text-[#f7f0e4]"
        >
          Tonight&apos;s letter
        </Link>
        <a
          href="mailto:a.mccree@gmail.com?subject=ORANGEBOX%20question"
          className="rounded-md border border-[#204538] bg-[#071915] px-4 py-2 text-sm text-[#f7f0e4]"
        >
          Email a question
        </a>
      </div>

      {/* FAQPage JSON-LD — declares the Q&A to AI search engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: f.a,
              },
            })),
          }),
        }}
      />
    </main>
  );
}
