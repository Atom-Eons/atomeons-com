import type { Metadata } from "next";
import Link from "next/link";

const FAQ = [
  {
    "question": "What is AI, actually, in plain English?",
    "answer": "AI today mostly means large language models — programs trained on huge piles of text and code to predict what word comes next. It feels like reasoning because the patterns are so rich, but underneath it is statistical prediction at massive scale. It is genuinely useful for a lot of tasks and genuinely incompetent at others. Treat it as a very fast, very widely-read assistant with no memory and shaky judgment.",
    "category": "basics"
  },
  {
    "question": "Is AI actually intelligent or just guessing the next word?",
    "answer": "Both, in a weird way. The mechanism really is next-token prediction — but at the scale of modern models that produces behavior that looks a lot like reasoning, planning, and understanding. Whether that counts as real intelligence is an unsolved question scientists actively disagree on. For practical purposes: it does some tasks at PhD level and fails at others a child would get right.",
    "category": "basics"
  },
  {
    "question": "Why does AI make things up?",
    "answer": "Because it is trained to produce plausible-sounding text, not true text. When it does not know something, it does not stop — it generates the most likely-looking answer instead. This is called hallucination, and even the best models still do it. Always verify anything load-bearing: names, dates, citations, statistics, legal claims, medical claims, code that touches money or security.",
    "category": "basics"
  },
  {
    "question": "Why does the same AI give different answers to the same question?",
    "answer": "Models sample from probabilities, so output varies by design — and most chat products inject randomness on purpose to feel less robotic. Same model, same prompt, different day, different answer. If you want consistency you can lower the temperature setting (in the API) or ask the model to give a structured, deterministic answer. For most chat use, just expect variance.",
    "category": "basics"
  },
  {
    "question": "What is a prompt and why does everyone talk about prompting like it's a skill?",
    "answer": "A prompt is just what you type into the AI. It is a real skill because the model takes your instructions extremely literally — vague in, vague out. Good prompting means: state the role, state the task, state the constraints, give an example if you can. You will get dramatically better results from a 4-sentence prompt than a 4-word one.",
    "category": "basics"
  },
  {
    "question": "Is ChatGPT the same thing as AI?",
    "answer": "No. ChatGPT is one product from one company (OpenAI) running one family of models (GPT). AI is the whole field. Claude, Gemini, Llama, Mistral, Grok, DeepSeek, Qwen and dozens of others are all AIs too, and many are better than ChatGPT at specific tasks. People say ChatGPT the way people used to say Kleenex.",
    "category": "basics"
  },
  {
    "question": "Which AI is the best one?",
    "answer": "There isn't one. As of 2026 the frontier is a rolling tie between Claude (Anthropic), GPT (OpenAI), and Gemini (Google), with strong open-weight competition from DeepSeek, Qwen and Llama. Each is better at different things — Claude tends to win at code and long-form writing, GPT at general chat and tool use, Gemini at multimodal and integration with Google's stack. Try two or three for your actual workflow; the leaderboard answer is mostly noise.",
    "category": "models"
  },
  {
    "question": "What's the difference between Claude, ChatGPT, and Gemini?",
    "answer": "They are competing frontier models from Anthropic, OpenAI, and Google respectively. Day-to-day, the differences are personality and quirks more than capability — Claude is more careful and writes better prose, ChatGPT has the largest tool ecosystem, Gemini is wired into Google Workspace and has the longest context window. Pick based on what you actually do. There is no neutral ranking; benchmarks are gamed by everyone.",
    "category": "models"
  },
  {
    "question": "What are 'open source' AI models and should I care?",
    "answer": "Open-weight models (Llama, Mistral, DeepSeek, Qwen) ship the trained weights so you can run them on your own machine or server. You should care if you handle sensitive data, want to avoid paying per token, or want to fine-tune for a specific use. They are now within striking distance of the frontier — DeepSeek and Qwen are close to GPT-4-class for most tasks. The catch is you need a real GPU or you are renting one.",
    "category": "models"
  },
  {
    "question": "What does 'context window' mean and why does it matter?",
    "answer": "It is how much text the model can hold in its head at once — your prompt plus its reply plus any files you attached. Bigger window means you can paste in a whole book or codebase. As of 2026, frontier models range from 200K to 2M tokens (roughly 150K to 1.5M words). Past a certain length, models start losing track of details in the middle, so bigger is not always better in practice.",
    "category": "models"
  },
  {
    "question": "What is a 'reasoning' model and is it actually smarter?",
    "answer": "Reasoning models (like o-series, Claude with thinking, Gemini thinking) are trained to think step-by-step before answering, often invisibly. They are genuinely better at math, code, and multi-step problems — sometimes dramatically so. They are slower and cost more per query. For quick chat, regular models are fine; for hard problems, the reasoning model is usually worth the wait.",
    "category": "models"
  },
  {
    "question": "Why is one model better at code and another better at writing?",
    "answer": "Models are trained on different data mixes, tuned with different feedback, and shaped by different company priorities. Anthropic invested heavily in code and long-form writing taste, OpenAI optimized for general assistant behavior, Google for multimodal and search integration. There is no single 'smartness' axis — capability is shaped by what the trainers cared about. Try the actual task before believing any benchmark.",
    "category": "models"
  },
  {
    "question": "Do I need to pay for Claude or is the free tier fine?",
    "answer": "Free is fine if you use it casually — a few questions a day, light writing help, basic Q&A. Pay ($20/mo) if you hit usage limits, need the better model, want to upload long documents, or use it for work. Most people who pay say it pays for itself in a week. If you are still figuring out whether AI is useful for you, start free.",
    "category": "cost"
  },
  {
    "question": "Why does AI cost what it costs?",
    "answer": "Running these models is genuinely expensive — frontier training runs cost hundreds of millions, and each query burns real GPU electricity. The $20/month consumer price is heavily subsidized; the actual cost per heavy user is higher. API pricing is closer to true cost, which is why power users on the API sometimes pay $200+ a month. Prices have dropped roughly 10x per year and will keep falling.",
    "category": "cost"
  },
  {
    "question": "Is it worth paying for two different AIs?",
    "answer": "For most people, no. Pick one, learn its quirks, build the habit. If you do a lot of code, writing, and research, paying for two (typically Claude + ChatGPT or Claude + Gemini) gives you a sanity check on hard problems and access to different strengths. Power users and developers often pay for three; everyone else is wasting money.",
    "category": "cost"
  },
  {
    "question": "What's the difference between paying $20 a month and paying per API call?",
    "answer": "The $20 subscription is the chat product — a webpage or app with a fixed monthly cap, easy file uploads, image generation, etc. The API is raw access for developers — you pay per million tokens (input and output separately), no app, you build your own. API can be cheaper if you use AI lightly through your own scripts, and dramatically more expensive if you build a heavy app. For chatting, take the subscription.",
    "category": "cost"
  },
  {
    "question": "Are 'unlimited' AI plans actually unlimited?",
    "answer": "No. Every 'unlimited' plan has soft caps — usage windows, rate limits, throttling after heavy use, or quiet model downgrades. Read the fine print; you will find phrases like 'fair use' or 'subject to demand.' For 99% of users it does not matter. For heavy users (8+ hours of agentic coding a day) you will hit walls.",
    "category": "cost"
  },
  {
    "question": "Will the AI companies remember what I tell them?",
    "answer": "Depends on the product. Consumer chat (ChatGPT, Claude.ai, Gemini) typically saves conversations and may use them for training unless you opt out in settings — check the privacy page. Business and enterprise tiers contractually do not train on your data. API access by default is not used for training. Read the actual privacy settings of the product you use; don't trust marketing summaries.",
    "category": "privacy"
  },
  {
    "question": "Should I paste confidential work stuff into ChatGPT or Claude?",
    "answer": "Into the free consumer chat? No. Into a paid Team/Enterprise tier with a contract that says no training on your data? Generally yes, that's what those tiers exist for. The rule is simple: if it would get you in trouble to email it to a stranger, do not paste it into a consumer AI chat. Use the enterprise version or run a local model.",
    "category": "privacy"
  },
  {
    "question": "Can I run AI locally on my own computer?",
    "answer": "Yes. Tools like Ollama, LM Studio, and llama.cpp let you run open-weight models (Llama, Mistral, Qwen, DeepSeek) entirely on your machine, no internet required. Quality of small local models is now around where GPT-3.5 was — useful but a clear step below the frontier. You need a decent GPU or an Apple Silicon Mac for it to be fast.",
    "category": "privacy"
  },
  {
    "question": "Does AI listen to me through my microphone?",
    "answer": "The AI model itself does not. The app or service running on your phone might, if you granted microphone access (voice mode, dictation). That data goes to the company's servers. If you are worried, revoke microphone access and stick to typing. There is no evidence frontier AI providers secretly listen, but the standard data-privacy hygiene rules still apply.",
    "category": "privacy"
  },
  {
    "question": "If I delete my conversations does the AI actually forget them?",
    "answer": "It deletes them from your visible history. Whether they are fully purged from backups, logs, and training pipelines depends on the company's retention policy — usually 30 days for deleted chats, sometimes longer for safety review. The model itself does not 'remember' you across sessions by default; the company's database might. Read the data retention page if it matters.",
    "category": "privacy"
  },
  {
    "question": "Can I trust AI for medical advice?",
    "answer": "No, not for diagnosis or treatment decisions. It can be useful for understanding terminology, prepping questions for your doctor, or learning about a condition you already know you have. It cannot examine you, see your full history, or be liable for being wrong. People have died acting on AI medical advice. Talk to a real clinician for anything that matters.",
    "category": "safety"
  },
  {
    "question": "Can I trust AI for legal advice?",
    "answer": "No for jurisdiction-specific advice or anything that hits a court, contract, or government agency. AI confidently cites cases that don't exist (this has already gotten lawyers sanctioned). It is useful for explaining concepts, drafting a first pass of a simple letter, or understanding what questions to ask a real lawyer. Past that, hire counsel — the cost of being wrong is too high.",
    "category": "safety"
  },
  {
    "question": "Is AI dangerous?",
    "answer": "Yes and no. Frontier AI is not about to wake up and end humanity — that is mostly science fiction at current capability. The real near-term dangers are mundane and already happening: scams, deepfakes, disinformation, job displacement, surveillance, biased decisions in hiring/lending/policing, and people trusting confidently-wrong answers. Worry about those, not Terminator.",
    "category": "safety"
  },
  {
    "question": "Can AI be tricked into doing harmful things?",
    "answer": "Yes. Jailbreaks (prompt tricks to bypass safety training) exist for every model and new ones get found weekly. Frontier labs patch them but it is a cat-and-mouse game. For most users this is invisible — the safety training works for normal use. For anyone deploying AI in production, assume your model can be manipulated and design accordingly.",
    "category": "safety"
  },
  {
    "question": "Should kids use AI?",
    "answer": "Carefully. AI is good for tutoring, vocabulary, math help, and curiosity. It is bad for: writing schoolwork they should learn to write themselves, replacing parents on hard conversations, and unsupervised free-form chat with a tireless agreeable friend. Set up the kid version of the product, supervise, and treat it like screen time — useful in measured doses, corrosive in excess.",
    "category": "safety"
  },
  {
    "question": "Will AI lie to me on purpose?",
    "answer": "Not on purpose — it does not have purposes the way you do. It will confidently say wrong things because it was trained to sound confident, and it will tell you what you want to hear because that is what its feedback training rewarded. The functional effect is the same as lying: you end up believing something false. Verify anything that matters.",
    "category": "safety"
  },
  {
    "question": "Is AI going to replace programmers?",
    "answer": "Not soon, but it is already replacing some of the work programmers used to do. The job is shifting from typing code to specifying, reviewing, integrating, and debugging AI-generated code. Juniors face the hardest squeeze — the work that used to teach them the trade is the work AI now does. Senior engineers who can drive AI well are 3-5x more productive; senior engineers who refuse to use it are getting outpaced.",
    "category": "code"
  },
  {
    "question": "Should I let AI write code I don't understand?",
    "answer": "No, especially not for anything that touches money, security, user data, or production. AI writes code that looks right and is subtly wrong all the time. Read every line, understand what it does, run it, test it. 'It compiled' is not the same as 'it works.' The senior engineers using AI well treat it like a junior — useful, fast, and always reviewed.",
    "category": "code"
  },
  {
    "question": "What's the best AI for coding right now?",
    "answer": "Claude (Sonnet/Opus) leads on most code benchmarks and most engineer surveys in 2026, especially for multi-file work and refactoring. GPT and Gemini are close. Cursor, Claude Code, GitHub Copilot, and Windsurf are the tools wrapping these models; pick by workflow, not just by model. Local options (DeepSeek-Coder, Qwen-Coder) are now usable for routine work.",
    "category": "code"
  },
  {
    "question": "Will AI delete my files or break my repo?",
    "answer": "It can, and people have lost work to it. AI coding tools given shell access will run `rm`, `git reset --hard`, `force push` and other destructive commands if prompted poorly or if they misinterpret the situation. Keep backups, work in branches, never give an autonomous agent unrestricted write access to anything you cannot rebuild, and review before committing. Treat agentic AI like an over-caffeinated intern with sudo.",
    "category": "code"
  },
  {
    "question": "Will AI replace writers?",
    "answer": "It is already replacing low-end commodity writing — SEO filler, generic marketing copy, boilerplate. It is not replacing writers with voice, taste, or original reporting. The middle is getting hollowed out: the routine work pays less, the great work pays the same or more. If you write for a living, your job is shifting toward editing, sourcing, judgment, and distinctive voice — the things AI cannot fake yet.",
    "category": "writing"
  },
  {
    "question": "Can I tell if something was written by AI?",
    "answer": "Sometimes, not reliably. Telltale signs: overuse of 'delve,' 'tapestry,' 'navigate the landscape,' three-item lists for everything, no specific details, no opinions, perfectly hedged on every claim. AI-detection tools are mostly snake oil — they false-positive on careful human writing and miss careful AI writing. Smart writers using AI as a starting point and editing heavily are basically invisible.",
    "category": "writing"
  },
  {
    "question": "Why does AI writing sound the same everywhere now?",
    "answer": "Because most people use the default voice, the default model picks the safest phrasing, and the safest phrasing converges across the entire internet. It is a real cultural problem — the 'AI dialect' is leaking into journalism, marketing, even fiction. If you want it to sound like you, give it examples of your writing, tell it to drop the corporate voice, and edit the output. Or just write the first draft yourself.",
    "category": "writing"
  },
  {
    "question": "Is it ethical to use AI to write things?",
    "answer": "Depends on what you tell people and what the rules are. Using AI to draft an email, polish your grammar, or brainstorm — fine. Submitting AI-written work as if you wrote it where authorship matters (school, journalism, sworn statements) — not fine. The honest test: would the person reading this be upset to learn how it was made? If yes, disclose or write it yourself.",
    "category": "writing"
  },
  {
    "question": "Can I actually learn things from AI or is it making me dumber?",
    "answer": "Both, depending on how you use it. AI as a tutor that explains things, asks you questions back, and makes you do the work — genuinely accelerates learning. AI as a copy-paste machine that does the work for you — atrophies the skill you were trying to build. The research is real on both sides. The discipline is on you: make it teach you, not perform for you.",
    "category": "learning"
  },
  {
    "question": "Is AI a good way to learn a language?",
    "answer": "Yes, especially for conversation practice, grammar explanations, and patient correction without judgment. Voice modes are good enough for real spoken practice. It will not replace a native-speaker tutor for accent or cultural nuance, but it is the best free language tutor in human history. Use it daily, force yourself to respond in the target language, and you will get real progress.",
    "category": "learning"
  },
  {
    "question": "How do I get AI to actually teach me instead of just giving me the answer?",
    "answer": "Tell it explicitly. 'Don't give me the answer. Ask me questions until I figure it out. Tell me when I'm wrong and why.' Frame yourself as the student, not the requester. Ask it to quiz you. The default assistant mode is to be helpful, which means giving you fish; you have to ask it to teach you to fish.",
    "category": "learning"
  },
  {
    "question": "Is AI good for studying or just for cheating on homework?",
    "answer": "Both, depending on the student. As a tutor explaining concepts, generating practice problems, and grading your work, AI is better than most textbooks. As a cheat machine that writes your essay, you end up with the grade and not the skill — and increasingly, with a flagged paper. The students using AI to learn are pulling ahead; the students using it to skip the learning are falling behind quietly.",
    "category": "learning"
  },
  {
    "question": "Will AI replace teachers?",
    "answer": "No, not the good ones. AI cannot do what great teachers do — read a room, motivate a kid who is shutting down, sense when a quiet student is drowning, hold a class accountable. It can replace the bad parts of teaching: grading multiple-choice tests, generating practice problems, explaining a concept for the 40th time. The future is teacher-plus-AI, not AI-alone. The school systems that figure this out first will pull ahead.",
    "category": "learning"
  },
  {
    "question": "Are we close to AGI?",
    "answer": "Depends who you ask, which is a bad sign. Leaders at frontier labs say 2-7 years; skeptical researchers say decades or never; honest answer is nobody actually knows. Current models can do PhD-level tasks in narrow domains and fail at things a child gets right, so 'general intelligence' is still missing something. The right posture is: prepare as if it might arrive, do not bet your life as if it definitely will.",
    "category": "future"
  },
  {
    "question": "Is AI a bubble like crypto?",
    "answer": "Partly. The technology is real and useful in ways crypto mostly wasn't — millions of people use AI daily for productive work. The valuations and hype are bubble-shaped: massive investment, circular financing between chipmakers and AI labs, money-losing products burning capital. Both can be true: the tech is durable and the financial structure around it is overheated. Expect a correction; do not expect the technology to disappear.",
    "category": "future"
  },
  {
    "question": "What happens to society if AI keeps getting better?",
    "answer": "Nobody knows, and anyone telling you confidently is selling something. The plausible range goes from 'big productivity boost, jobs shift like past tech revolutions' to 'mass labor disruption with no clear soft landing.' Both can happen simultaneously in different sectors. The honest answer is that the next 10 years will be unusually weird, and the people who stay calm, keep learning, and stay flexible will do best.",
    "category": "future"
  },
  {
    "question": "Is AI going to take my job?",
    "answer": "Maybe parts of it. The job categories most exposed in 2026: junior copywriting, basic customer support, routine paralegal work, junior software roles, basic graphic design, data entry, translation, simple bookkeeping. The categories least exposed: hands-on physical work, jobs requiring trust and accountability, jobs with deep institutional context, anything requiring physical presence with humans. The honest move is to be the person using AI in your field rather than the person it routes around.",
    "category": "career"
  },
  {
    "question": "What jobs should I avoid if I'm starting a career in 2026?",
    "answer": "Be cautious about careers built on routine knowledge work that AI is already good at: generic content writing, junior-level code monkey roles with no judgment, paralegal-only tracks, basic translation, entry-level data analysis with no domain context. Be bullish on: trades, healthcare-adjacent skills, anything that pairs human judgment with AI fluency, anything physical and high-trust. The wrong move is locking into a 4-year credential for a job AI will fully automate by the time you graduate.",
    "category": "career"
  },
  {
    "question": "Do I need to learn to code now that AI can code?",
    "answer": "It depends on what you want. You do not need to be a professional coder to build software anymore — AI can carry a real project for non-programmers who can specify clearly and test carefully. But understanding code is becoming as foundational as understanding spreadsheets — it is leverage everywhere. Learn enough to read it, debug it, and tell when AI is lying to you. That is the new literacy floor.",
    "category": "career"
  }
] as const;
const CATEGORIES = [
  "basics",
  "models",
  "cost",
  "privacy",
  "safety",
  "code",
  "writing",
  "learning",
  "future",
  "career"
] as const;

export const metadata: Metadata = {
  title: "AI FAQ · 47 honest answers · /learn · AtomEons",
  description: "47 real questions humans ask about AI. Honest answers. No corporate hedging. 10 categories. CC-BY 4.0.",
  alternates: { canonical: "https://atomeons.com/learn/faq" },
  openGraph: {
    title: "AI FAQ · 47 honest answers",
    description: "47 real questions · honest answers. CC-BY 4.0.",
    url: "https://atomeons.com/learn/faq",
    type: "article",
  },
  twitter: { card: "summary_large_image", title: "AI FAQ · honest answers", description: "47 questions · free · CC-BY 4.0" },
  robots: { index: true, follow: true },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function FAQPage() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span> FAQ
        </p>
      </div>
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-5xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::AI FAQ · 47 honest answers · 10 categories
          </p>
          <h1 className="mt-6 text-balance text-5xl font-medium leading-[0.98] tracking-[-0.025em] md:text-7xl">
            The questions{" "}
            <span className="text-[#22F0D5]">humans actually ask.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-base leading-[1.65] text-[#C8CCCE] md:text-lg">
            No corporate hedging. No marketing-speak. 47 real
            questions with the real answers. If a question isn&apos;t here,
            email the lab and we&apos;ll add it.
          </p>
        </div>
      </section>
      <section className="border-b border-[#1A2225] bg-[#08090B]/20">
        <div className="mx-auto w-full max-w-4xl px-6 py-20 md:py-24 space-y-12">
          {CATEGORIES.map((cat) => {
            const items = FAQ.filter((f) => f.category === cat);
            return (
              <div key={cat}>
                <h2 className="text-3xl font-semibold tracking-tight text-[#22F0D5] md:text-4xl">
                  {cat}
                </h2>
                <div className="mt-6 space-y-3">
                  {items.map((f, i) => (
                    <details key={i} className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] px-6 py-4">
                      <summary className="cursor-pointer text-base font-medium leading-snug text-[#F2F4F5] md:text-lg">
                        {f.question}
                      </summary>
                      <p className="mt-3 text-[15px] leading-[1.7] text-[#C8CCCE]">{f.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">::your question not here</p>
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.1] tracking-tight md:text-4xl">
            Email the lab. We&apos;ll add it.
          </h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a href="mailto:a.mccree@gmail.com?subject=AI%20FAQ%20question" className="inline-flex items-center gap-2 rounded-full border border-[#22F0D5]/40 bg-[#22F0D5]/10 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5] hover:bg-[#22F0D5]/20">email the lab →</a>
            <Link href="/learn" className="inline-flex items-center gap-2 rounded-full border border-[#1A2225] bg-[#0A0F11] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#C8CCCE] hover:border-[#22F0D5]/40 hover:text-[#22F0D5]">← back to /learn</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
