/**
 * /vs comparison pages.
 *
 * Honest side-by-side comparisons calibrated by use case. No "winner"
 * theater. Each comparison page is a long-form decision aid for humans
 * deciding between two real options.
 *
 * Voice register: calm, technical, helpful — like a senior engineer
 * explaining tradeoffs over coffee. Real specifics. No hype words.
 *
 * License: CC-BY 4.0. Quote any. Adapt any.
 */

export type ComparisonRow = {
  dimension: string;
  left: string;
  right: string;
};

export type Comparison = {
  slug: string;
  title: string;
  dek: string;
  leftLabel: string;
  rightLabel: string;
  pubDate: string;
  body_md: string;
  table: ComparisonRow[];
  decision_framework: {
    pick_left_if: string[];
    pick_right_if: string[];
    pick_both_if: string[];
  };
};

export const COMPARISONS: Comparison[] = [
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "claude-vs-chatgpt",
    title: "Claude vs ChatGPT — pick by the work, not the brand",
    dek: "Honest comparison across voice, pricing, context window, refusal posture, image/audio handling, agentic mode, and privacy. No leaderboard winner — calibrated by task.",
    leftLabel: "Claude",
    rightLabel: "ChatGPT",
    pubDate: "2026-05-29",
    body_md: `Most "Claude vs ChatGPT" comparisons online in 2026 read like sponsored content. They name a winner. They paste a benchmark chart. They tell you to subscribe to one of them.

The honest version: each tool has tasks it is genuinely better at. Picking by brand is the wrong move. Picking by the work you actually need to do is the right one. This page lays out the seven axes where the two diverge — what each does well, what each does badly, and who each is for.

## Voice

Claude reads warmer and more careful. It edits for tone more conservatively. It pushes back more directly when you ask it to stress-test a plan. The writing it produces is shorter on average and uses fewer marketing words. The downside: Claude can come across as cautious to the point of refusing tasks ChatGPT will engage with.

ChatGPT is more versatile and more willing. It will draft a first version of almost anything. The writing it produces is fluent but often longer than necessary and contains more AI cliché phrases ("Let's dive into…", "It's important to note…"). The downside: ChatGPT will sometimes produce a fluent answer that is wrong with the same confidence as a fluent answer that is right.

If you write for work and the tone has to be specific, Claude. If you draft constantly across genres and you'll edit anyway, ChatGPT.

## Pricing

Both ship a free tier with daily message caps. The free tiers are genuinely useful — three years ago they would have looked like miracles. Free is where most users should start, and it is enough for many users forever.

The paid tiers are roughly $20/month each. Claude Pro and ChatGPT Plus cost the same in dollars. They differ in what they unlock. Claude Pro raises message limits and gives you Projects (persistent context). ChatGPT Plus adds DALL-E image generation, custom GPTs, advanced voice mode, and earlier access to new features. Both have higher tiers ($100-200/month) for power users; most humans should not pay those.

## Context window

This is the biggest single technical difference in 2026. Claude's context window on the API is up to 200,000 tokens — about 150,000 words. That's the full text of a long book in one paste. ChatGPT's API context window is smaller; the consumer ChatGPT app crops earlier than Claude does.

If you work with long documents — contracts, research papers, codebases, multi-chapter manuscripts — Claude's window is the deciding factor. If your typical session is short back-and-forth, the window difference is invisible.

## Refusal posture

Claude refuses more requests than ChatGPT. This is by design. Anthropic's "Constitutional AI" training emphasizes when to decline. Examples where Claude declines and ChatGPT engages: certain security research questions, certain medical-protocol-detail questions, certain creative writing prompts with edge content.

This cuts both ways. For some users, Claude's refusal posture is a feature (less risk of hallucinated medical advice). For others, it is friction (legitimate work blocked). Which side you're on depends entirely on the kind of work you do.

The honest framing: neither posture is "correct." Both are legitimate calibrations of a hard tradeoff. The lesson, taught explicitly in [the /learn lesson on refusal posture](/learn/lesson/refusal-posture-mapping), is to MAP the refusal shape of whichever tool you use before you commit to it.

## Image and audio

ChatGPT handles more input modalities at a higher quality on the consumer plan. Image input (vision), image generation (DALL-E), advanced voice mode (real-time spoken conversation), audio transcription — all packaged together.

Claude has image input (vision) on free and paid plans. It does not generate images. Voice mode is mobile-app-only and less mature than ChatGPT's. If you work multimodally — screenshots, photos, voice-to-AI, AI-to-image — ChatGPT carries the bigger toolkit.

## Agentic mode

Both tools have shipped agentic capabilities — AI that uses tools, calls APIs, navigates browsers — at consumer tier. As of 2026, neither is mature enough to recommend for high-stakes unattended work. Both are usable for low-stakes browse-and-summarize.

ChatGPT's Atlas / agentic browser feels more aggressive about taking action. Claude's computer-use and Claude in Chrome feel more conservative about asking permission. Different teams calibrating different default trust levels.

## Privacy posture

This changed in 2025 and most comparison articles haven't caught up. Anthropic's August 2025 Consumer Terms update made training default-opt-IN for Claude Free / Pro / Max — you need to actively opt out. OpenAI's consumer ChatGPT has long defaulted to training-on, with opt-out also available.

The honest read: both consumer products will train on what you type unless you opt out. Both API and enterprise tiers (Claude for Work, ChatGPT Enterprise) have zero-data-retention contracts. If privacy matters, opt out on consumer, or move to enterprise, or run a local model (see [Cloud vs Local AI](/vs/cloud-vs-local-ai)).

## Who picks what

A working framework:

If you write a lot, value tone control, work with long documents, want a more cautious refusal posture, and prefer fewer-but-better outputs — Claude.

If you need versatility across modalities (image, audio, image-gen), prefer fluent first drafts to edit later, want more features per dollar, and accept a more permissive refusal posture — ChatGPT.

If you operate AI for real work, neither alone is enough. Most operators in 2026 use both — Claude for careful writing and long-context analysis, ChatGPT for everything else. The cost is paying for one and using free tier on the other. The benefit is the right tool for the actual task.

The deeper lesson: the right answer is not "ChatGPT" and not "Claude." The right answer is to know what each is for, what each refuses, and what each costs you. The leaderboard does not measure those things. Your own week of work is the only honest benchmark.

For the actual prompt to use with each tool by job, see [/tools](/tools) — every task is mapped to the recommended AI with one-sentence routing reasoning.`,
    table: [
      { dimension: "Free tier", left: "Yes · ~daily limits", right: "Yes · ~daily limits" },
      { dimension: "Paid tier", left: "Claude Pro · ~$20/mo", right: "ChatGPT Plus · ~$20/mo" },
      { dimension: "Context window (API)", left: "~200k tokens", right: "~128k tokens (varies by model)" },
      { dimension: "Image input (vision)", left: "Yes (free + paid)", right: "Yes (paid; free has limits)" },
      { dimension: "Image generation", left: "No", right: "Yes (DALL-E)" },
      { dimension: "Voice mode", left: "Mobile-app · maturing", right: "Mature · multi-platform" },
      { dimension: "Persistent context", left: "Claude Projects", right: "Custom GPTs / Memory" },
      { dimension: "Agentic / tool-use", left: "Computer-use · Claude in Chrome · careful", right: "Atlas · more aggressive" },
      { dimension: "Refusal posture", left: "More cautious", right: "More permissive" },
      { dimension: "Consumer training-on default", left: "Default opt-in since 2025-08", right: "Default opt-in (opt-out available)" },
      { dimension: "Voice in writing", left: "Warmer · shorter · less cliché", right: "Fluent · longer · more cliché-prone" },
    ],
    decision_framework: {
      pick_left_if: [
        "You write a lot and tone control matters",
        "You work with long documents (book-length, contracts, codebases)",
        "You prefer a more conservative refusal posture",
        "You want fewer-but-better drafts to start with",
      ],
      pick_right_if: [
        "You need image generation (DALL-E)",
        "You use voice mode regularly",
        "You prefer fluent first drafts to edit",
        "You want more features per dollar on the paid tier",
      ],
      pick_both_if: [
        "You operate AI for real work daily",
        "Different jobs benefit from different refusal postures",
        "You can pay for one and free-tier the other",
      ],
    },
  },
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "cloud-vs-local-ai",
    title: "Cloud AI vs Local AI — when each one wins",
    dek: "Frontier cloud models give you the best quality. Local models give you total privacy and offline access. Knowing the exact moment to switch from one to the other is the operator skill.",
    leftLabel: "Cloud AI",
    rightLabel: "Local AI",
    pubDate: "2026-05-29",
    body_md: `The cloud-vs-local question is the single most consequential AI tooling decision an operator makes. The default answer is "use cloud" — and for most users most of the time, that is the right answer. But there are specific situations where local AI is the only honest choice, and those situations are growing.

This page lays out the actual tradeoff so you can decide deliberately rather than by default.

## What cloud AI is

Cloud AI is the API or app run by a lab: Claude (Anthropic), ChatGPT (OpenAI), Gemini (Google), Grok (xAI). You type in a chatbox or call an API endpoint; the model runs on the lab's GPUs in some data center; the response comes back. The lab sees everything you typed.

What you get: state-of-the-art quality (these are the smartest models on the planet), large context windows (200k+ tokens), regular updates (new model releases every few months), no hardware requirements (any laptop works), easy integration (chat app, API, mobile app).

What you give up: privacy (lab reads your inputs by default on consumer tiers · enterprise tiers offer zero-retention contracts but most humans don't have those), dependency (if the lab is down, your work stops · if the lab raises prices, you pay), trust (a small set of companies in California or Beijing now own the cognitive infrastructure most operators rely on).

## What local AI is

Local AI is a model that runs entirely on your own machine. The two leading consumer-grade tools are Ollama (CLI · simple model management · runs on Mac, Windows, Linux) and LM Studio (GUI · model browser · same model support). The leading open-weights model families in 2026 are Llama (Meta), Mistral, Qwen, DeepSeek, and Gemma — each shipping models in size tiers from ~1B to ~70B+ parameters.

What you get: total privacy (nothing leaves the machine · works without internet), no rate limits (you can run it all day), no subscription cost (one-time hardware investment, then free), full control (you choose the system prompt, the refusal posture is yours to set), ownership (you can run the same model in 5 years even if the lab disappears).

What you give up: quality (open-weights models in 2026 are roughly 12–18 months behind frontier on hardest benchmarks · this gap is closing fast), speed (depends on your hardware · a recent MacBook Pro runs a 14B model usably; a desktop with a real GPU runs 30–70B models smoothly), setup curve (one terminal command for the basic case, but harder if you want quantization, fine-tuning, or specific runtime), context window (smaller for most local models · 8–32k typical, vs 200k+ on cloud).

## The quality gap, calibrated

In May 2026, here is roughly the quality ladder, from best to "good enough for most tasks":

GPT-5 / Claude Opus 4.8 / Gemini Ultra 3 — frontier cloud, best at everything.
Llama 4 70B / Qwen 3 72B / DeepSeek V4 — open-weights frontier, roughly Claude 3.7 / GPT-4 era quality.
Llama 4 8B / Mistral Nemo / Phi-4 — small open-weights, surprisingly good for narrow tasks.

For writing first drafts, summarizing, code completion, brainstorming, and general chat, the open-weights 70B class is now indistinguishable in blind testing from frontier cloud for most users. For frontier reasoning, long-context analysis, agentic multi-step tasks, and the hardest benchmarks, cloud still wins by a meaningful margin.

The gap is closing about 12–18 months per generation. Open weights in 2026 = closed cloud in 2024–2025.

## Privacy posture, calibrated

This is where the tradeoff is starkest. Cloud labs in 2026, on consumer tiers, train on your inputs by default unless you opt out. (Anthropic changed this default in August 2025 — Claude Free/Pro/Max are now default-opt-in. ChatGPT Free has always been default-opt-in.) Enterprise contracts can be zero-retention, but most users don't have enterprise contracts.

Local AI is the only honest "nothing leaves your machine" option. For confidential client work, journalism with sensitive sources, medical or legal drafting, therapy-style journaling, and any prompt you wouldn't want screenshot — local is the only path that respects the boundary.

## Hardware requirements

Cloud: any laptop with a browser.

Local: a recent Mac (M1 or newer), or a Windows/Linux machine with at least 16GB RAM and ideally a discrete GPU. The smallest models (1–3B params) run on phones. 7–14B runs on most modern laptops at usable speed. 30–70B needs a real GPU or an Apple Silicon machine with 64GB+ unified memory.

If you have a 5-year-old laptop with 8GB RAM and no GPU, local AI is going to feel slow. If you have a recent machine, it feels surprisingly snappy.

## When to use each

Use cloud when:
- The task needs frontier reasoning (hard analysis, complex code, agentic multi-step)
- You're working with public information (no privacy concern)
- Speed matters more than control
- You need the largest context windows (long documents, codebases)

Use local when:
- Confidentiality is non-negotiable (medical, legal, journalism, therapy, sensitive client work)
- You want offline capability (travel, unreliable internet, air-gapped environments)
- You're running it all day every day (rate limits or per-token costs would hurt)
- You're building something you want to control end-to-end (your refusal posture, your system prompt)

Use both when:
- You're an operator running real work — frontier cloud for the hard 20% of tasks, local for the high-volume 80% where privacy and rate-limits matter

## Decision framework

If you have not yet tried local AI, install Ollama, pull \`llama3.2:3b\` (~2GB download), run one real task. Even if you never use it again, having an opinion is the operator move. The [local-AI lesson on /learn](/learn/lesson/local-ai-ollama) walks through this in detail.

If you are paying for two or more cloud subscriptions, evaluate whether local could replace one. Most operators discover that a recent Mac runs a 14B model fast enough for 60–70% of daily work, with the remaining 30–40% routed to cloud for the hard tasks.

If your work involves confidential material and you are using consumer cloud chatbots, you are leaking that material to the labs. That is the conversation worth having with yourself this week. Local is the easiest mitigation.

The cloud vs local question is not "which is better." It is "which is right for which task." The operator who runs both, calibrated by job, gets the quality of cloud and the privacy of local at the same time. That is the upgrade.

For per-task model routing, see [/tools](/tools) — every job is mapped to the recommended AI with one-sentence routing reasoning.`,
    table: [
      { dimension: "Quality (frontier vs open-weights)", left: "Best · frontier 2026", right: "Roughly 12–18 months behind" },
      { dimension: "Privacy", left: "Lab sees inputs by default", right: "Nothing leaves the machine" },
      { dimension: "Cost model", left: "Subscription or per-token", right: "One-time hardware · then free" },
      { dimension: "Internet required", left: "Yes", right: "No · works offline" },
      { dimension: "Hardware requirements", left: "Any browser", right: "16GB+ RAM · ideally a GPU" },
      { dimension: "Setup curve", left: "Sign up · type", right: "One terminal command · model download" },
      { dimension: "Context window", left: "200k+ tokens (frontier)", right: "8–32k typical" },
      { dimension: "Rate limits", left: "Yes · daily or per-tier", right: "None · only your hardware" },
      { dimension: "Refusal posture", left: "Lab-decreed", right: "Yours to configure" },
      { dimension: "Updates", left: "Automatic · new model every few months", right: "Manual · you pull when ready" },
    ],
    decision_framework: {
      pick_left_if: [
        "Task needs frontier reasoning (hardest analysis or code)",
        "You're working with public information",
        "You need the largest context windows",
        "Speed matters more than control",
      ],
      pick_right_if: [
        "Confidentiality is non-negotiable (medical, legal, journalism, therapy)",
        "You need offline capability",
        "You're running AI all day every day (rate limits would hurt)",
        "You want full control over refusal posture",
      ],
      pick_both_if: [
        "You're an operator running real work daily",
        "Frontier cloud for the hard 20% · local for the high-volume 80%",
        "You want a privacy-respecting fallback when sensitive work comes up",
      ],
    },
  },
  // ─────────────────────────────────────────────────────────────────
  {
    slug: "subscription-vs-one-time",
    title: "Subscription AI vs One-time AI — the next decade of software pricing",
    dek: "$20/month-each from labs vs one-time-license tools. The math at 1, 3, and 10 years. What each pricing model incentivizes. Why almost no one is offering the second option.",
    leftLabel: "Subscription",
    rightLabel: "One-time license",
    pubDate: "2026-05-29",
    body_md: `Most AI tools in 2026 are sold by subscription: $20/month for Claude Pro, $20/month for ChatGPT Plus, $20/month for Gemini Advanced, $20/month for Cursor, $20/month for Perplexity Pro. The bills are individually small. Stacked, they compound into something larger than most users notice until they audit their card statement.

There is an alternative pricing model — one-time license, paid once, used forever — and it is rare in AI software in 2026. This page lays out the math, the incentive structures, and what each pricing model is actually optimizing for. Then a decision framework: when subscription makes sense, when one-time makes sense, and when each one is hiding a real cost.

## The math at 1, 3, and 10 years

Take a representative operator stack: Claude Pro + ChatGPT Plus + Cursor + Perplexity Pro = $80/month = $960/year.

| Years | Subscription stack | One-time tool (e.g. $49) |
| --- | --- | --- |
| 1 | $960 | $49 |
| 3 | $2,880 | $49 |
| 5 | $4,800 | $49 |
| 10 | $9,600 | $49 |

The headline number after a decade: roughly $10,000 in subscription fees versus a one-time $49 payment.

The honest counter-argument: the subscription tools are getting better every quarter. The 2034 version of Claude Pro will be substantially more capable than the 2026 version. The one-time tool will not (unless explicitly upgraded). For frontier-grade work, the subscription model captures real ongoing value.

The honest counter-counter-argument: most users do not need frontier-grade work. They need a tool that works for the jobs they actually do. A one-time tool that works in 2026 will still work in 2034 for the jobs that did not change.

## What each model incentivizes

Subscription pricing incentivizes the seller to:
- Keep the user subscribed (retention is the metric)
- Add features that lock the user in (proprietary file formats, workflow dependencies)
- Defer hard problems (next month's bug is next month's subscription, not next year's churn)
- Build complexity (more features means more reasons to stay)

One-time pricing incentivizes the seller to:
- Ship a working product (the user does not have to come back next month)
- Deliver completeness (the v1 has to stand on its own)
- Document the work (you have to teach the user to be self-sufficient)
- Build simplicity (no ongoing engagement loop to optimize for)

These are not moral judgments. Both pricing models can produce excellent software. The point is that they incentivize different things. Most AI tools chose subscription because the math is better for the lab, not because it is better for the user.

## The lock-in question

Subscription tools have a structural feature most users do not notice until they try to leave: the longer you use them, the more your workflow depends on their proprietary state. Claude Projects, ChatGPT Custom GPTs, Cursor codebases, Gemini Workspace integrations — each of these accumulates value that lives inside the subscription. Cancelling means losing access to that state.

One-time tools, when designed well, avoid this. The data lives on your machine. The workflow is yours to copy elsewhere if you ever leave. Cancellation is not a concept — there is no monthly relationship to cancel.

Neither model is automatically better at lock-in avoidance. A poorly-designed one-time tool can lock you in just as hard. But the structural pressure runs in different directions. Subscription pricing rewards lock-in. One-time pricing rewards portability.

## The §4A example

The ORANGEBOX cockpit shipped by AtomEons is priced at $49 once, forever, with a clause in the license (§4A) that legally binds the lab to never switch to a subscription model. If the lab ever attempts the switch, every existing buyer keeps their license free in perpetuity.

This is unusual. Most software licenses reserve the right to change pricing models. §4A removes that right. The reason it exists is to make the one-time commitment legally enforceable rather than merely promised. Without a clause like §4A, "one-time pricing" is a marketing claim, not a contract.

For users evaluating one-time AI tools in 2026, the question to ask is: what stops this tool from switching to subscription next year? If the answer is "the company promises not to," that is a promise, not a contract. If the answer is "a binding clause that triggers a free-license fallback if they switch," that is a contract.

## When subscription makes sense

You should pay for a subscription when:
- You're working on frontier tasks that benefit from ongoing model improvements
- You're using the tool every day for revenue-generating work
- You're paying for ONE subscription, not three
- The lab's ongoing model updates are worth the cost compared to a static alternative

You should NOT pay for a subscription when:
- You're stacking four of them because you "might need" each one
- You're paying for a tool you used three times in the last 30 days
- The work you're doing has not changed in two years and you don't need newer models
- The lab is showing signs of pivoting to enterprise-only or raising prices on consumers

## When one-time makes sense

You should consider one-time-license tools when:
- You want to run real work without an ongoing dependency on a third-party lab
- You're building infrastructure (a cockpit, a knowledge base, a workflow) that should outlive the lab
- You operate with confidential material and need control over where data lives
- You're tired of the renewal cycle and want to make the decision once

## Decision framework

If your stack is one or two subscriptions and you use them daily for real work, stay subscribed. The math works.

If your stack is three or more subscriptions and you've never audited which ones you actually use, audit. Cancel the ones you used fewer than five times last month. Save $20–60/month.

If you're building a workflow you intend to use for a decade, look for tools with one-time pricing AND a binding clause (like §4A) that prevents a pricing-model switch. Without the clause, "one-time" is a marketing promise that can be revoked.

The deeper pattern: the AI industry in 2026 is repeating the SaaS playbook of 2010. Subscription pricing is a structural advantage for sellers and a structural cost for buyers. There is no rule that says it has to be the only model. The buyers who refuse to accept that rule have leverage. The buyers who accept it pay for the decade.

For more on AtomEons's one-time-licensing posture, see [the manifesto](/manifesto) — specifically clause 4 ($49 once · §4A no-saas).`,
    table: [
      { dimension: "1-year cost (4-tool stack at $20/mo each)", left: "$960", right: "$49 once" },
      { dimension: "5-year cost", left: "$4,800", right: "$49" },
      { dimension: "10-year cost", left: "$9,600", right: "$49" },
      { dimension: "Ongoing model updates", left: "Yes · monthly", right: "Manual upgrade if available" },
      { dimension: "Lock-in pressure", left: "Higher (state lives in service)", right: "Lower (state lives on your machine)" },
      { dimension: "Cancellation experience", left: "Lose Projects / Custom GPTs / saved state", right: "No cancellation concept" },
      { dimension: "What it incentivizes seller to do", left: "Retain user · build complexity · defer fixes", right: "Ship working product · document · build simplicity" },
      { dimension: "Pricing-change risk", left: "Lab can raise / restructure anytime", right: "Locked by license (if §4A-style clause)" },
      { dimension: "Privacy posture", left: "Lab sees inputs (consumer tier default)", right: "Depends · local-first tools keep data local" },
      { dimension: "Right for", left: "Frontier daily work · one or two tools max", right: "Long-horizon infrastructure · stable workflows" },
    ],
    decision_framework: {
      pick_left_if: [
        "You're working on frontier tasks that need ongoing model updates",
        "You use the tool daily for revenue-generating work",
        "You're paying for one or two subscriptions (not four)",
        "The lab's update cadence is worth the recurring cost",
      ],
      pick_right_if: [
        "You're building infrastructure that should outlive the lab",
        "You want to make the pricing decision once and be done",
        "You operate with confidential material and want control over data location",
        "The work you do has not changed in two years",
      ],
      pick_both_if: [
        "You can have one subscription (for frontier tasks) + one one-time tool (for the cockpit / infrastructure layer)",
        "You're an operator who routes work by tool — frontier hard tasks subscription, daily volume one-time",
      ],
    },
  },
];

export function getComparison(slug: string): Comparison | undefined {
  return COMPARISONS.find((c) => c.slug === slug);
}
