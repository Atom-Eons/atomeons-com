"use client";

import { useEffect, useState } from "react";

const PROMPTS = [
  {
    "dayIndex": 0,
    "title": "Decision after reading: 5 mental moves",
    "category": "decisions",
    "ai": "Claude Sonnet 4.5",
    "prompt": "I'm about to make this decision: [PASTE DECISION + REASONING + WHAT I'D DO]. Give me 5 specific reframings — not generic advice. For each: (1) the lens (e.g., 'inversion', '10-year horizon', 'pre-mortem'), (2) what changes about my decision when I apply it, (3) the one concrete action that follows. Don't validate. Don't hedge. If two reframings point the same direction, say which is stronger and why. End with: which reframe is the highest-leverage one and what I should actually do today.",
    "timeMinutes": 7,
    "trap": "Asking for 'pros and cons' instead of forcing specific reframings — you'll get a list that confirms what you already think."
  },
  {
    "dayIndex": 1,
    "title": "Calibrated weekly retro",
    "category": "thinking",
    "ai": "Claude Sonnet 4.5",
    "prompt": "Here's my week: [PASTE CALENDAR, COMMITS, NOTES, OR JUST A BRAIN-DUMP]. Run a calibrated retro: (1) What I actually moved (not what I felt busy doing), (2) What I avoided that I knew I should do, (3) Where I confused motion for progress, (4) One uncomfortable pattern across the week, (5) The single highest-leverage thing I could do next week that I'm currently not prioritizing. No 'great job on X'. Reality-contact only. If the week was thin, say it was thin.",
    "timeMinutes": 10,
    "trap": "Pasting only your wins — the retro is only useful if you include avoidance, friction, and what you didn't say out loud."
  },
  {
    "dayIndex": 2,
    "title": "Steelman the opposite",
    "category": "thinking",
    "ai": "Claude Opus 4",
    "prompt": "Here's my current position: [PASTE POSITION + WHY I HOLD IT]. Build the strongest possible argument against me. Constraints: (1) Steelman, not strawman — the version someone smarter than me would actually argue, (2) Cite the specific assumption of mine that's weakest, (3) Give the empirical evidence that would change my mind if I encountered it, (4) Tell me what kind of person would hold the opposite view in good faith. End with: the single sentence I'd need to honestly say to update toward the opposite.",
    "timeMinutes": 8,
    "trap": "Settling for a polite counter — push back if the steelman is weaker than what a real opponent would say."
  },
  {
    "dayIndex": 3,
    "title": "Translate to my mother",
    "category": "communication",
    "ai": "Claude Sonnet 4.5",
    "prompt": "Rewrite this for someone with zero context on [DOMAIN] — like my mom reading it over coffee: [PASTE TECHNICAL TEXT]. Rules: (1) No jargon unless you immediately define it with an everyday analogy, (2) Use sentences my mom would actually read, not text-wall paragraphs, (3) Lead with why she should care, not what the thing is, (4) Length: under 200 words. End by telling me which sentence in my original was the worst offender and why.",
    "timeMinutes": 4,
    "trap": "Letting the AI keep one or two 'safe' jargon words because they 'feel necessary' — they're not."
  },
  {
    "dayIndex": 4,
    "title": "Pre-mortem before I commit",
    "category": "decisions",
    "ai": "Claude Opus 4",
    "prompt": "I'm about to commit to: [PASTE PLAN]. Run a pre-mortem. It's 6 months from now and this failed badly. Walk me through: (1) The most likely failure path (specific, not 'execution risk'), (2) The second most likely failure path that I'm currently underrating, (3) Which assumption breaks first when reality contacts the plan, (4) The one early-warning signal I could watch for in the next 30 days that would tell me to pull the ripcord. Be ruthless. Don't soften.",
    "timeMinutes": 8,
    "trap": "Treating the pre-mortem as a checklist — the value is in the second-most-likely path, which is the one you didn't see."
  },
  {
    "dayIndex": 5,
    "title": "Code review on my own diff",
    "category": "code",
    "ai": "Claude Sonnet 4.5",
    "prompt": "Here's my diff: [PASTE DIFF OR FILE]. Pretend you're the staff engineer reviewing my PR who is mildly annoyed at sloppy work. Flag, in order of severity: (1) Correctness bugs (with the specific input that would break it), (2) Subtle bugs only visible at scale or under concurrency, (3) Tests I should have written but didn't, (4) Names that lie about what the function does, (5) Code I should delete instead of keep. Don't praise. If it's fine, say it's fine.",
    "timeMinutes": 6,
    "trap": "Pasting code without the surrounding context — the reviewer will hallucinate the call-site and miss the real bug."
  },
  {
    "dayIndex": 6,
    "title": "What am I avoiding?",
    "category": "thinking",
    "ai": "Claude Opus 4",
    "prompt": "Here's my todo list, calendar, and notes from the last week: [PASTE]. Find what I'm avoiding. Specifically: (1) The task I keep moving forward without doing, (2) The conversation I keep almost having and not having, (3) The decision I'm dressing up as 'I need more data', (4) The thing I'd do today if I had to do it before bed. Don't moralize. Just name them. End with the one I should stop avoiding this week.",
    "timeMinutes": 6,
    "trap": "Filtering out the embarrassing items before pasting — the avoidance you're most embarrassed to share is the one worth surfacing."
  },
  {
    "dayIndex": 7,
    "title": "Cut this draft in half",
    "category": "writing",
    "ai": "Claude Sonnet 4.5",
    "prompt": "Cut this in half without losing the load-bearing content: [PASTE DRAFT]. Constraints: (1) Keep every fact, claim, and number, (2) Kill throat-clearing openers and meta-commentary, (3) Replace adjective-stacks with one strong noun, (4) Merge sentences that are saying the same thing twice, (5) If a paragraph exists only to transition, delete it. Show me the cut version, then list the 3 specific lines from my original that were the worst (with why).",
    "timeMinutes": 5,
    "trap": "Letting it 'preserve voice' — half the time your voice is the bloat. Strip first, restore voice second."
  },
  {
    "dayIndex": 8,
    "title": "What would I tell a friend?",
    "category": "life",
    "ai": "Claude Sonnet 4.5",
    "prompt": "Here's a situation I'm dealing with: [PASTE]. Now imagine a friend told you the exact same thing about their life. What would you tell them — bluntly, the way you'd actually talk to a friend, not the way self-help books talk? Include: (1) The thing they're telling themselves that's not quite true, (2) The advice they don't want to hear, (3) What you'd do if you woke up in their life tomorrow, (4) The smallest move that breaks the loop. No therapy-speak. Talk like a real person.",
    "timeMinutes": 5,
    "trap": "Editing your situation to make yourself look reasonable — the asymmetry between how you frame it and how a friend would frame it is the actual insight."
  },
  {
    "dayIndex": 9,
    "title": "Find the load-bearing assumption",
    "category": "analysis",
    "ai": "Claude Opus 4",
    "prompt": "Here's an argument, plan, or analysis: [PASTE]. Find the single load-bearing assumption — the one that, if false, collapses the whole thing. Then: (1) State it in plain language as a falsifiable claim, (2) Tell me what evidence would falsify it, (3) Estimate how confident the author seems vs. how confident the evidence actually justifies, (4) Name two adjacent assumptions that are also weak but currently propped up by the first. End with: the one test or data point I should chase to stress-test this.",
    "timeMinutes": 7,
    "trap": "Letting it list 5 assumptions — force it to commit to the single most load-bearing one, that's the discipline."
  },
  {
    "dayIndex": 10,
    "title": "What is this article actually saying?",
    "category": "research",
    "ai": "Claude Sonnet 4.5",
    "prompt": "Here's an article, paper, or thread: [PASTE OR LINK]. Distill it to: (1) The single claim the author actually wants me to accept, (2) The evidence they offer (and how strong it is), (3) What they're quietly assuming I already believe, (4) What they're not saying that they should be, (5) Who benefits if I believe this. Then give me a one-sentence verdict: trustworthy / mixed / spin. Don't be diplomatic — call spin spin.",
    "timeMinutes": 6,
    "trap": "Trusting the AI to detect spin in something it has no domain knowledge about — cross-check the verdict against a second source."
  },
  {
    "dayIndex": 11,
    "title": "Explain it like I'm building it",
    "category": "learning",
    "ai": "Claude Opus 4",
    "prompt": "Teach me [CONCEPT] the way I'd actually need to know it if I were building it from scratch. Layers: (1) The mental model in one sentence — what's the system doing at the deepest level, (2) The 3 primitives the whole thing reduces to, (3) The first thing that would break if I tried to implement it naively, (4) The historical mistake people made before the modern version was figured out, (5) One question whose answer would tell you whether I actually understand it. Skip the schoolbook intro.",
    "timeMinutes": 10,
    "trap": "Accepting the textbook explanation — push back and ask for the part that's missing from textbooks (it's usually the historical mistake)."
  },
  {
    "dayIndex": 12,
    "title": "Pricing my thing honestly",
    "category": "decisions",
    "ai": "Claude Opus 4",
    "prompt": "I'm pricing: [PASTE PRODUCT/SERVICE + WHAT IT DOES + CURRENT PRICING IDEA]. Run an honest pricing analysis: (1) Who the buyer actually is (job title, what their day looks like, what they get fired for), (2) The 3 alternatives they're already paying for or doing manually, (3) The maximum price that wouldn't make them flinch, (4) The minimum price that doesn't signal 'cheap and probably broken', (5) The price point I'm currently underpricing or overpricing at and why. Don't say 'it depends'. Pick a number.",
    "timeMinutes": 8,
    "trap": "Not telling it what the buyer gets fired for — pricing is a function of fear and credit, not your effort."
  },
  {
    "dayIndex": 13,
    "title": "Subject lines for one cold email",
    "category": "writing",
    "ai": "Claude Sonnet 4.5",
    "prompt": "Here's my cold email: [PASTE EMAIL + WHO IT'S TO]. Give me 10 subject lines, in 5 categories of 2 each: (1) Direct (states the ask), (2) Curiosity (creates a gap), (3) Specific-fact ('We saved $X for Y'), (4) Question (1 honest, useful question), (5) Pattern-interrupt (breaks the recipient's inbox rhythm). Then pick the top 2 you'd send and tell me why. Each subject line under 9 words. No emojis. No 'quick question'. No 'circling back'.",
    "timeMinutes": 4,
    "trap": "Picking the cleverest one — the boring direct one usually wins because the recipient is exhausted."
  },
  {
    "dayIndex": 14,
    "title": "Spot the missing constraint",
    "category": "analysis",
    "ai": "Claude Opus 4",
    "prompt": "Here's a plan / spec / proposal: [PASTE]. Find the constraint that's missing from the analysis. Specifically: (1) The resource that will run out first (time, money, attention, regulatory window, headcount, willpower), (2) The dependency the author is assuming will hold but probably won't, (3) The downstream effect that bites in month 3-6 that nothing in this plan accounts for, (4) The constraint they're treating as fixed that's actually negotiable. End with: which missing constraint, if added, would change the plan most.",
    "timeMinutes": 8,
    "trap": "Looking only at hard constraints (money, time) — soft constraints (attention, willpower, political capital) are usually what actually fail."
  },
  {
    "dayIndex": 15,
    "title": "Write the hard email",
    "category": "communication",
    "ai": "Claude Sonnet 4.5",
    "prompt": "I need to send an email that I've been avoiding: [DESCRIBE SITUATION + RECIPIENT + WHAT THE HARD THING IS]. Draft it. Constraints: (1) Don't apologize for things I don't need to apologize for, (2) Be direct in the first 2 sentences — they should know the news by sentence 2, (3) No hedging language ('I was just thinking that maybe...'), (4) End with what happens next, not 'let me know your thoughts'. Then tell me the one line that's still too soft.",
    "timeMinutes": 6,
    "trap": "Asking for 'professional' — that's where the hedge-language slips back in. Ask for 'direct and human' instead."
  },
  {
    "dayIndex": 16,
    "title": "Stress-test my MVP scope",
    "category": "decisions",
    "ai": "Claude Opus 4",
    "prompt": "Here's my MVP scope: [PASTE FEATURE LIST + GOAL + TIMELINE]. Cut it. Hard rules: (1) Anything that doesn't directly produce or block the core user moment goes, (2) Anything I'm building because 'a real product would have it' goes, (3) Anything that costs more than 1 week and isn't load-bearing for the first 10 users goes, (4) Anything I'm building because I'm scared to ship without it goes. Show me the cut list and what's left. Then tell me what I'm hiding behind in the original scope.",
    "timeMinutes": 7,
    "trap": "Defending features in your prompt — describe them neutrally and let the cut be ruthless."
  },
  {
    "dayIndex": 17,
    "title": "Reverse the meeting",
    "category": "thinking",
    "ai": "Claude Sonnet 4.5",
    "prompt": "I just left this meeting / call / conversation: [PASTE NOTES OR PASTE THE TRANSCRIPT]. Reverse it for me: (1) What did the other person actually want, not what they said they wanted, (2) Where did I miss a signal, (3) What's the next move they're expecting from me — and is that the move I should make, or a different one, (4) What's the thing they didn't say that I should ask about in the follow-up, (5) Did I leave with the outcome I wanted? If no, what went sideways.",
    "timeMinutes": 6,
    "trap": "Pasting only your view of the meeting — include what they said verbatim, the asymmetry is where the signal is."
  },
  {
    "dayIndex": 18,
    "title": "Bug hunt: what would break this",
    "category": "code",
    "ai": "Claude Sonnet 4.5",
    "prompt": "Here's a function/component: [PASTE CODE]. Don't review style. Hunt bugs. Generate the specific inputs that would break this: (1) Empty / null / undefined at each parameter, (2) Boundary values (0, -1, max int, very large strings, unicode, emoji), (3) Concurrent calls that race, (4) The 'happy path under load' scenario that works in dev and breaks in prod, (5) The input that an attacker would craft. For each, tell me what breaks and how to fix it in one line.",
    "timeMinutes": 7,
    "trap": "Getting a list of theoretical bugs without the specific input — the input is the proof."
  },
  {
    "dayIndex": 19,
    "title": "What would 10x look like?",
    "category": "creative",
    "ai": "Claude Opus 4",
    "prompt": "Here's my current approach to [GOAL/PROJECT]: [PASTE]. Now: what would 10x look like? Not '10x as much effort' — 10x the outcome. Constraints: (1) Same person, same budget, same week — what changes, (2) What I'd have to stop doing entirely, (3) The lever I'm not pulling because I assume it's not available to me, (4) The thing I'd be embarrassed to try but would probably work, (5) Who I'd have to become to do it. End with the smallest first step that points at 10x, not at 1.1x.",
    "timeMinutes": 8,
    "trap": "Confusing '10x effort' with '10x leverage' — push for the change in approach, not the change in volume."
  },
  {
    "dayIndex": 20,
    "title": "Three reads on this person",
    "category": "communication",
    "ai": "Claude Sonnet 4.5",
    "prompt": "Here's what someone said/wrote to me: [PASTE]. Give me three reads on what they actually mean: (1) Most charitable read (they mean exactly what they say, and it's well-intentioned), (2) Most cynical read (subtext is negative, they want X they're not saying), (3) Most likely read (calibrated against typical workplace/relationship dynamics). For each, tell me what my best response would be. Then tell me which read I'm probably underweighting and why.",
    "timeMinutes": 5,
    "trap": "Defaulting to the cynical read because it feels 'smart' — most messages are exactly what they appear to be."
  },
  {
    "dayIndex": 21,
    "title": "Calibrate my confidence",
    "category": "thinking",
    "ai": "Claude Opus 4",
    "prompt": "Here's a claim I'm about to make publicly: [PASTE CLAIM + WHY I BELIEVE IT]. Calibrate me. Tell me: (1) What confidence I currently seem to have (0-100%), (2) What confidence the evidence actually supports, (3) The specific gap between (1) and (2) — am I overconfident or under, (4) What I'd need to learn to legitimately move my confidence, (5) The hedge-language I should add OR the hedge-language I should drop. If I'm undercalling it because I'm hedging out of fear, say so.",
    "timeMinutes": 6,
    "trap": "Asking for calibration without saying what you'd do differently at 70% vs 90% — calibration without consequence is theater."
  },
  {
    "dayIndex": 22,
    "title": "What does this number mean?",
    "category": "analysis",
    "ai": "Claude Opus 4",
    "prompt": "Here's a number/metric I'm looking at: [PASTE NUMBER + CONTEXT + WHERE IT CAME FROM]. Tell me what it actually means: (1) What it's measuring (precisely — not the marketing version), (2) What it isn't measuring that I might think it is, (3) The denominator question: per what, over what window, vs what comparison, (4) Whether this number is up/down/flat by any meaningful standard, (5) The action I should take based on this number that I currently am not taking. No 'depends on context'. Be concrete.",
    "timeMinutes": 5,
    "trap": "Letting the AI repeat the metric back to you in fancier language — push for the action change, that's the test."
  },
  {
    "dayIndex": 23,
    "title": "Pick the next thing",
    "category": "decisions",
    "ai": "Claude Sonnet 4.5",
    "prompt": "Here's everything on my plate: [PASTE LIST WITH EFFORT + IMPACT + DEADLINES]. Pick the next thing — just one. Method: (1) The one with the highest impact × certainty for this week, (2) Discount any item where I'm waiting on someone else, (3) Discount any item I've avoided for 2+ weeks (those are weight, not work — name them separately), (4) Discount any item that would make me feel productive but not move anything. Give me the single next task, in one sentence, with what 'done' looks like by Friday.",
    "timeMinutes": 4,
    "trap": "Listing 20 items hoping for prioritization — if you can't get the list under 10, the issue isn't prioritization, it's commitment."
  },
  {
    "dayIndex": 24,
    "title": "Rewrite this headline 10 ways",
    "category": "writing",
    "ai": "Claude Sonnet 4.5",
    "prompt": "Headline I'm working on: [PASTE]. Context: [WHO IT'S FOR + WHAT THEY GET]. Give me 10 alternatives in 5 styles, 2 each: (1) Specific-promise (number + outcome), (2) Question (one that the reader has actually asked themselves), (3) Contrarian (against the genre cliché), (4) Identity ('For people who...'), (5) Bare-claim (no setup, just the claim). Each under 12 words. Then rank the top 3 and tell me what each one signals to the reader before they click.",
    "timeMinutes": 5,
    "trap": "Picking the cleverest headline over the clearest — clarity wins more clicks than wit at low audience sizes."
  },
  {
    "dayIndex": 25,
    "title": "Two-doors framing",
    "category": "decisions",
    "ai": "Claude Opus 4",
    "prompt": "I'm choosing between: [DOOR A] and [DOOR B]. Run a two-doors analysis: (1) What kind of person walks through door A, what kind through B, (2) Which door is reversible if it goes badly, (3) Which door does Future Me want to have walked through, even if Present Me is scared of it, (4) Which door does the version of me that's avoiding hard things prefer — pick the other one, (5) The piece of information that would make this decision obvious if I had it (and whether it's gettable in 48 hours). Pick one.",
    "timeMinutes": 7,
    "trap": "Treating both doors as equal when one is reversible — bias toward reversible-fast doors when uncertain."
  },
  {
    "dayIndex": 26,
    "title": "Find the contradiction in my own writing",
    "category": "writing",
    "ai": "Claude Opus 4",
    "prompt": "Here's something I wrote: [PASTE]. Find the contradictions I missed: (1) Claim A in paragraph X vs claim B in paragraph Y — where I'm saying two things, (2) Tone shifts that contradict the message (e.g., 'we're confident' followed by hedging), (3) Promises in the intro that the body doesn't deliver on, (4) The implicit worldview in sentence X that I explicitly reject in sentence Y, (5) Where my conclusion doesn't follow from my evidence. Quote me back to myself. Don't soften.",
    "timeMinutes": 7,
    "trap": "Letting it 'note tensions' instead of contradictions — push for direct quotes that conflict."
  },
  {
    "dayIndex": 27,
    "title": "Plan the next 90 minutes",
    "category": "life",
    "ai": "Claude Sonnet 4.5",
    "prompt": "Here's what I want to get done today: [PASTE]. Here's my energy level (1-10): [X]. Time available: 90 minutes. Plan it: (1) The single task I should do first that protects the rest of the day, (2) The order — high-energy work first or admin first, given my number, (3) The two things I should NOT touch in this 90 — even if they tempt me, (4) The 5-minute warmup that gets me into the chair. End with the timer-time: 90 minutes starts at [X], ends at [Y], no checking phone.",
    "timeMinutes": 3,
    "trap": "Planning the next 8 hours when you should be planning the next 90 minutes — you don't know what you'll feel like at 3pm."
  },
  {
    "dayIndex": 28,
    "title": "Rewrite this commit message",
    "category": "code",
    "ai": "Claude Sonnet 4.5",
    "prompt": "Here's the diff: [PASTE DIFF]. Here's my draft commit message: [PASTE]. Rewrite it: (1) Subject line under 72 chars, imperative mood ('add' not 'added'), (2) Body explains WHY this change, not WHAT (the diff shows what), (3) Notes any behavior change, any breaking change, any flag/config that needs to be set, (4) Names the failure mode this fixes if it's a fix, (5) No vague verbs like 'update', 'tweak', 'misc'. If my message is already good, say it's good.",
    "timeMinutes": 3,
    "trap": "Writing commit messages for yourself instead of for the person doing git-blame in 18 months."
  },
  {
    "dayIndex": 29,
    "title": "Map the question I'm actually asking",
    "category": "thinking",
    "ai": "Claude Opus 4",
    "prompt": "Here's the question I've been chewing on: [PASTE]. Tell me what I'm actually asking. Layers: (1) The surface question (the words I wrote), (2) The decision question underneath (what action am I trying to choose), (3) The identity question underneath that (who am I trying to be / not be), (4) The fear question at the bottom (what am I scared of being wrong about), (5) The single sentence that, if answered honestly, would dissolve most of the other layers. Don't psychoanalyze. Just map.",
    "timeMinutes": 6,
    "trap": "Letting it psychoanalyze — you want a map, not a diagnosis."
  },
  {
    "dayIndex": 30,
    "title": "Spec out one feature",
    "category": "code",
    "ai": "Claude Sonnet 4.5",
    "prompt": "Feature I want to build: [DESCRIBE IN PLAIN ENGLISH]. Write the spec: (1) User story in one sentence — who, what, why, (2) Acceptance criteria as 3-5 testable bullets, (3) The 2 edge cases I'd forget if I didn't think about them now, (4) The dependency or external system this touches that could break (auth, payments, file IO, third-party API), (5) The cheapest way to ship v1 that proves the user actually wants this — even if it's ugly. End with: the question I should answer before I write a line of code.",
    "timeMinutes": 6,
    "trap": "Writing the spec for the perfect version instead of the prove-it-works version — v1 should be embarrassing."
  },
  {
    "dayIndex": 31,
    "title": "Compress this thread into 3 bullets",
    "category": "communication",
    "ai": "Claude Sonnet 4.5",
    "prompt": "Here's a long Slack / email / thread / chat history: [PASTE]. Compress it to 3 bullets for someone who has zero context: (1) What was decided (or that nothing was), (2) What's still open, (3) What I'm expected to do next. Then a one-line meta-note: was this thread necessary? Could it have been a doc, a meeting, or skipped entirely? No 'great discussion' filler. If the thread accomplished nothing, say so.",
    "timeMinutes": 4,
    "trap": "Keeping nuance that's only relevant to people who were in the thread — the test is whether someone outside it can act on the 3 bullets."
  },
  {
    "dayIndex": 32,
    "title": "Where am I lying to myself?",
    "category": "thinking",
    "ai": "Claude Opus 4",
    "prompt": "Here's how I describe my current situation: [PASTE — work, project, relationship, finances, whatever]. Find where I'm lying to myself. Categories: (1) The thing I call 'temporary' that has been the status quo for 6+ months, (2) The story I tell about why X is hard that's actually a story about why I won't try, (3) The metric I'm tracking that's flattering vs. the metric that would tell me the truth, (4) The reason I give for not doing Y that's a rationalization. Don't soften. End with the smallest move that breaks one of these lies this week.",
    "timeMinutes": 7,
    "trap": "Phrasing your situation defensively — the lies hide in the defensive framing, not in the facts."
  },
  {
    "dayIndex": 33,
    "title": "5 angles on this customer complaint",
    "category": "analysis",
    "ai": "Claude Sonnet 4.5",
    "prompt": "Customer complaint / feedback: [PASTE]. Give me 5 angles: (1) Literal — what they're directly asking for, (2) Underlying need — what they actually want, (3) Pattern — is this a one-off or a signal of a class of complaints, (4) Product — what change to the product would prevent this, (5) Comms — what change to docs / onboarding / support copy would prevent this. End with: one thing to ship this week and one thing to NOT do despite being tempted.",
    "timeMinutes": 5,
    "trap": "Defaulting to product change for every complaint — sometimes the fix is copy or expectations, not code."
  },
  {
    "dayIndex": 34,
    "title": "What is the smallest possible test?",
    "category": "decisions",
    "ai": "Claude Opus 4",
    "prompt": "Idea I want to test: [PASTE — product, theory, hypothesis, business model, message]. Design the smallest possible test: (1) The single binary question this test answers, (2) The cheapest possible way to get a real signal (not a survey, real behavior), (3) The threshold for 'yes, keep going' vs 'no, kill it', set BEFORE the test, (4) The thing I'd want to do that would inflate the test (build more, recruit friends, wait for the perfect moment) — name it so I don't do it, (5) The deadline. End with the first move I make today.",
    "timeMinutes": 6,
    "trap": "Designing a test that proves you're right instead of one that could prove you're wrong — falsifiable beats flattering."
  },
  {
    "dayIndex": 35,
    "title": "Refactor without changing behavior",
    "category": "code",
    "ai": "Claude Sonnet 4.5",
    "prompt": "Here's the code: [PASTE]. Refactor it without changing observable behavior. Rules: (1) The function's inputs, outputs, and side effects stay identical, (2) Reduce nesting where it's load-bearing, not just decorative, (3) Name variables so the code reads as English, (4) Pull out one helper if and only if it's used twice or it makes the main path obviously cleaner, (5) Don't 'modernize' for the sake of looking modern. Show diff. Then tell me what tests I should add to lock in the new shape.",
    "timeMinutes": 6,
    "trap": "Letting it 'improve' by adding abstractions — refactors that add layers usually make the code worse."
  },
  {
    "dayIndex": 36,
    "title": "Decode a job description",
    "category": "research",
    "ai": "Claude Sonnet 4.5",
    "prompt": "Job description: [PASTE]. Decode it: (1) What the job actually is day-to-day (vs the marketing in the JD), (2) What they're not telling me — what's broken / understaffed / on fire, (3) The 3 questions I should ask the hiring manager to surface that, (4) The skills they list that are real requirements vs aspirational, (5) The salary band this title typically lives in for this kind of company. End with: is this worth pursuing for someone with my profile, given [PASTE MY ROUGH PROFILE]?",
    "timeMinutes": 6,
    "trap": "Trusting bullet lists in JDs — the real job is in the gaps between the bullets."
  },
  {
    "dayIndex": 37,
    "title": "Plan my next 3 reads",
    "category": "learning",
    "ai": "Claude Opus 4",
    "prompt": "Here's what I want to get better at: [TOPIC + WHY + CURRENT LEVEL]. Recommend 3 reads, in order: (1) The one that gives me the foundational mental model — even if it's 30 years old, (2) The current best operator's take — someone who actually does the thing, not just writes about it, (3) The contrarian / minority view that I should read so I'm not just reading the consensus. For each: title, author, why this one, one question to hold in mind while reading. Skip books I should have read in school.",
    "timeMinutes": 7,
    "trap": "Asking for 'best books on X' and getting a popularity ranking — force it to pick foundational, current, and contrarian."
  },
  {
    "dayIndex": 38,
    "title": "Find the bottleneck",
    "category": "analysis",
    "ai": "Claude Opus 4",
    "prompt": "Here's a process / workflow / pipeline I'm running: [PASTE — could be a sales funnel, a build pipeline, a content workflow, my morning routine]. Find the bottleneck: (1) The single step where time/quality/throughput is lost, (2) Why it's the bottleneck (capacity, dependency, attention, queueing), (3) The cheapest intervention to widen it, (4) The intervention I'd do if I were being ambitious, (5) The 'fake bottleneck' upstream or downstream that I might mistake for the real one. End with one change to make this week.",
    "timeMinutes": 7,
    "trap": "Optimizing a non-bottleneck — speeding up a step that's already idle waiting on the real bottleneck makes things worse."
  },
  {
    "dayIndex": 39,
    "title": "Voice memo to clean draft",
    "category": "writing",
    "ai": "Claude Sonnet 4.5",
    "prompt": "Here's a transcript of me thinking out loud: [PASTE VOICE MEMO TRANSCRIPT]. Turn it into a clean draft. Rules: (1) Keep the structure I argued through, not the order I happened to speak in, (2) Keep my actual phrases — don't AI-smooth my voice into generic, (3) Cut all 'um, like, you know, anyway', (4) Promote the strongest line to the lead, (5) If I contradicted myself, surface the contradiction and tell me which version I probably mean. Output as clean prose, not bullets.",
    "timeMinutes": 5,
    "trap": "Letting it 'polish' your voice into the AI-default tone — push it to preserve the specific phrases that sound like you."
  },
  {
    "dayIndex": 40,
    "title": "Negotiate this email back",
    "category": "communication",
    "ai": "Claude Sonnet 4.5",
    "prompt": "I received this offer / proposal / request: [PASTE]. Draft my reply. Constraints: (1) Lead with appreciation only if it's sincere — no theatrical gratitude, (2) Name the specific thing I want to change and why, in one paragraph, (3) Offer one alternative that's better for me but plausible for them, (4) Hold one bigger ask in reserve if they push back, (5) End with the next step — meeting time, deadline, decision moment. No 'I look forward to hearing from you'. Be direct and warm.",
    "timeMinutes": 5,
    "trap": "Anchoring against their first number — start from what's fair to you, not from a discount on theirs."
  },
  {
    "dayIndex": 41,
    "title": "Annotate a screenshot of my UI",
    "category": "creative",
    "ai": "Claude Opus 4 (with vision)",
    "prompt": "[ATTACH SCREENSHOT]. Audit this UI. Specifically: (1) The first thing the eye lands on (and is that the right thing), (2) The element that's working hardest visually but isn't the most important, (3) Anything that looks 'designed-by-feature' (cluttered, every option visible), (4) The single visual change with the biggest payoff, (5) What the user is supposed to do next and how obvious it is on a 1-5 scale. Don't be polite. If the page is confused, say it's confused.",
    "timeMinutes": 6,
    "trap": "Asking for a redesign — what you want is a diagnosis, the redesign comes after you know what's wrong."
  },
  {
    "dayIndex": 42,
    "title": "Worst-case scenario walkthrough",
    "category": "decisions",
    "ai": "Claude Opus 4",
    "prompt": "Decision I'm sitting with: [PASTE]. Walk me through the worst realistic case: (1) What's the actual worst plausible outcome (not catastrophizing, real downside), (2) How long would it take me to recover from it, (3) What would I have learned that has standalone value, (4) Compared to the cost of NOT deciding, how bad is the worst case really, (5) The single fact that would tell me the worst case is too expensive to risk. Then: knowing all this, is the worst case acceptable? Pick.",
    "timeMinutes": 7,
    "trap": "Treating the worst case as the most likely case — it's the floor, not the median; weight it accordingly."
  },
  {
    "dayIndex": 43,
    "title": "Test names that lie",
    "category": "code",
    "ai": "Claude Sonnet 4.5",
    "prompt": "Here's a test file: [PASTE]. Find tests whose names lie about what they actually test: (1) Test name says 'returns X' but actually checks that the function was called, (2) Test name says 'when Y' but the assertion doesn't depend on Y, (3) Tests that test the implementation, not the behavior (mock-heavy, brittle), (4) Tests that pass even if I remove the code under test, (5) Tests with no assertion. For each, suggest a better name OR mark for deletion.",
    "timeMinutes": 6,
    "trap": "Trusting test count as test coverage — half of tests are usually liars."
  },
  {
    "dayIndex": 44,
    "title": "Brainstorm 20, keep 3",
    "category": "creative",
    "ai": "Claude Opus 4",
    "prompt": "I need ideas for: [DESCRIBE — name, headline, feature, gift, project, anything]. Constraints: [LIST CONSTRAINTS — audience, budget, timeline, vibe]. Generate 20. Then immediately cut to your 3 best. For each of the 3: (1) why it's strong, (2) the one risk, (3) what to do next if I picked it. Don't sandbag the 17 you cut — make them real options, then commit. No bland-safe ideas. If the first 5 are obvious, throw them out and start over.",
    "timeMinutes": 6,
    "trap": "Stopping at 20 — the gold is usually in the last 5, after the obvious ones are exhausted."
  },
  {
    "dayIndex": 45,
    "title": "Diff this against last week",
    "category": "life",
    "ai": "Claude Sonnet 4.5",
    "prompt": "Last week I was here: [PASTE — energy, work, mood, relationships, focus]. This week I'm here: [PASTE SAME DIMENSIONS]. Diff it: (1) What got better and why I think so, (2) What got worse and what's the most likely cause, (3) Where I'm telling a story about progress that the evidence doesn't support, (4) The variable that shifted that I'm not crediting (sleep, a person, a habit, a removal), (5) The one experiment for next week. Don't be a coach. Be a diagnostician.",
    "timeMinutes": 5,
    "trap": "Crediting the wrong variable for a good week — the obvious cause is often a confound."
  },
  {
    "dayIndex": 46,
    "title": "Where is the trust really?",
    "category": "research",
    "ai": "Claude Opus 4",
    "prompt": "Claim someone is making: [PASTE CLAIM + WHO SAID IT + CONTEXT]. Locate the trust: (1) Is this person's track record on THIS specific question good or just generally famous, (2) What's the chain of evidence — primary source, secondary source, just their reputation, (3) Who would be the credentialed dissenter, and what would they say, (4) What's the incentive structure — what does this person gain by being believed, (5) The one search I should do to triangulate. End with a calibrated verdict: trust / verify / discount.",
    "timeMinutes": 6,
    "trap": "Confusing general credibility with topical credibility — Nobel laureates are wrong outside their field all the time."
  },
  {
    "dayIndex": 47,
    "title": "Cold open for my post",
    "category": "writing",
    "ai": "Claude Sonnet 4.5",
    "prompt": "Here's my post: [PASTE]. Write 5 cold opens — the first 1-2 sentences that hook a reader who has zero context and is one swipe away from leaving. Styles: (1) Specific scene (concrete moment, sensory), (2) Provocative claim (sharp, defensible, surprising), (3) Question I'm actually wrestling with, (4) Number / stat / outlier fact, (5) Voice (the way I'd say this to a friend). No 'In today's world'. No 'Have you ever wondered'. Then pick your top 2 and tell me why.",
    "timeMinutes": 5,
    "trap": "Picking the cleverest open over the one that promises the most payoff — readers leave when the promise is unclear."
  },
  {
    "dayIndex": 48,
    "title": "Coach my next conversation",
    "category": "communication",
    "ai": "Claude Sonnet 4.5",
    "prompt": "I have a conversation coming up: [WHO + TOPIC + WHAT I WANT + WHAT THEY MIGHT WANT]. Coach me: (1) The one sentence I should lead with, (2) The three things I should NOT say even if I'm tempted, (3) The likely objection and the calm one-liner that defuses it, (4) The silence I should let sit instead of filling, (5) The exit ramp — what 'done' looks like for this conversation, so I know when to stop talking. End with the question I should be asking myself going in, not the one I'm asking now.",
    "timeMinutes": 6,
    "trap": "Over-scripting — you want anchors, not a script. Scripts collapse on contact with the other person."
  },
  {
    "dayIndex": 49,
    "title": "Audit my standing claims",
    "category": "thinking",
    "ai": "Claude Opus 4",
    "prompt": "Here are 5 things I currently believe and act on: [LIST THEM]. For each: (1) When did I last actually check this against reality, (2) Was it ever true, or just true once and then I forgot to update, (3) What evidence would I expect to see if it were still true today, (4) Is there a competing belief I've quietly started acting on that contradicts it, (5) Update / keep / kill. No deference. If a belief is load-bearing for my identity but actually false, say so.",
    "timeMinutes": 8,
    "trap": "Auditing the easy beliefs — the load-bearing identity beliefs are the ones worth auditing, that's where you'll resist."
  },
  {
    "dayIndex": 50,
    "title": "Hook + frame + payoff",
    "category": "writing",
    "ai": "Claude Sonnet 4.5",
    "prompt": "Here's my piece: [PASTE]. Diagnose three structural elements: (1) HOOK — does the first 30 seconds make the reader want the next 30, and if not, what's the specific failure, (2) FRAME — does the reader know what kind of piece this is by paragraph 2 (essay, instruction, story, argument), (3) PAYOFF — does the end deliver what the hook promised. For each, score 1-5 and give the single edit that would lift the lowest score. Don't praise the strengths. Fix the weakness.",
    "timeMinutes": 5,
    "trap": "Editing line-level when the structural issue is hook/frame/payoff — line edits on a broken frame don't help."
  },
  {
    "dayIndex": 51,
    "title": "What would the customer say?",
    "category": "analysis",
    "ai": "Claude Sonnet 4.5",
    "prompt": "Here's how I describe my product / service / pitch: [PASTE]. Rewrite it the way an honest customer would describe it to a friend over text. Rules: (1) Drop all marketing language — no 'leverage', 'platform', 'solution', 'unlock', (2) Lead with the moment in their day when they actually need this, (3) Mention the alternative they'd otherwise use (manual work, a competitor, doing nothing), (4) Be specific about the size of the benefit ('saved me 3 hours a week', not 'saves time'), (5) Allow them to be a little skeptical. Output as a text message.",
    "timeMinutes": 5,
    "trap": "Writing 'how I wish they'd talk about it' — make it the honest version, including their reservations."
  },
  {
    "dayIndex": 52,
    "title": "Map the system, not the symptom",
    "category": "thinking",
    "ai": "Claude Opus 4",
    "prompt": "Recurring problem: [PASTE — could be a relationship pattern, a work bottleneck, a body symptom, a money pattern]. Map the system: (1) The symptom (what shows up), (2) The proximate cause (what triggers it), (3) The structural cause (what makes the trigger possible in the first place), (4) The reinforcement loop that keeps it stable, (5) The leverage point — the single intervention that would disrupt the loop, even if it's the hardest one. Don't fix the symptom. Find the structure.",
    "timeMinutes": 8,
    "trap": "Treating recurring problems as discrete events — the recurrence is the data; map the loop."
  },
  {
    "dayIndex": 53,
    "title": "Translate this for an exec",
    "category": "communication",
    "ai": "Claude Sonnet 4.5",
    "prompt": "Here's a detailed technical / project update: [PASTE]. Rewrite it for an exec who has 60 seconds and three other meetings: (1) The headline in one sentence — outcome, not activity, (2) The number that matters and its delta vs last time, (3) The one thing blocking faster progress, (4) The one decision I need from them (or none — say none), (5) What I'd say if they asked 'so what?'. Total length: 5 sentences max. No 'we've been working on'. No 'lots of progress'.",
    "timeMinutes": 4,
    "trap": "Hiding the ask in paragraph 4 — execs only read paragraph 1; lead with the ask."
  },
  {
    "dayIndex": 54,
    "title": "Walk me through this concept",
    "category": "learning",
    "ai": "Claude Opus 4",
    "prompt": "I want to actually understand: [CONCEPT]. Teach it in 4 passes: (1) The shape of the idea — one paragraph, no jargon, the mental picture, (2) The smallest concrete example that makes it click, (3) The common misconception that beginners fall into and why it's wrong, (4) The advanced application that makes the idea earn its keep. After each pass, ask me one quick check question I should be able to answer before we proceed. If I'd fail, the pass failed.",
    "timeMinutes": 10,
    "trap": "Nodding along without testing comprehension — the check questions are the whole point."
  },
  {
    "dayIndex": 55,
    "title": "What's the one experiment?",
    "category": "decisions",
    "ai": "Claude Sonnet 4.5",
    "prompt": "Here's the area of my life / work I want to move on: [PASTE — fitness, sleep, focus, sales, code quality, content, anything]. Design ONE experiment for the next 14 days: (1) The single variable I'm changing (one — not three), (2) The measurement, with the exact instrument and frequency, (3) The baseline number I need to capture today, (4) The threshold for 'this worked' set BEFORE day 14, (5) What I'm explicitly NOT changing to keep the experiment clean. No 'and also'. Just one move.",
    "timeMinutes": 5,
    "trap": "Stacking 3 changes because they all sound good — you'll never know which one worked."
  },
  {
    "dayIndex": 56,
    "title": "Honest self-review",
    "category": "life",
    "ai": "Claude Opus 4",
    "prompt": "Here's a self-review of how I'm doing in [DOMAIN — work, parenting, partnership, health, craft]: [PASTE MY SELF-ASSESSMENT]. Pressure-test it: (1) Where I'm grading on effort instead of outcome, (2) Where I'm crediting myself for things I didn't actually do, (3) Where I'm being harder on myself than the evidence warrants, (4) The thing I left out of my self-review because it's uncomfortable — name the category I'd avoid, (5) The grade I'd actually give if I were grading someone else with my track record. End with one true sentence.",
    "timeMinutes": 8,
    "trap": "Asking for encouragement — encouragement is cheap; calibration is rare."
  },
  {
    "dayIndex": 57,
    "title": "Three plausible futures",
    "category": "research",
    "ai": "Claude Opus 4",
    "prompt": "Question I'm modeling: [PASTE — could be 'where does my industry go', 'what happens if X policy passes', 'where does this project land in 12 months']. Give me three plausible futures, equally weighted: (1) Boring base case — current trends continue, (2) Up-scenario — the optimistic but realistic path and the conditions that produce it, (3) Down-scenario — the realistic bad path, what triggers it, when I'd see it. For each: one signal in the next 60 days that would tell me which we're heading into. No 'time will tell'.",
    "timeMinutes": 8,
    "trap": "Treating the base case as 'most likely' — the world rarely cooperates with the base case; weight up and down too."
  },
  {
    "dayIndex": 58,
    "title": "Find the dead code",
    "category": "code",
    "ai": "Claude Sonnet 4.5",
    "prompt": "Here's a file/module: [PASTE]. Find dead code: (1) Functions that are exported but never called externally, (2) Branches that can't be reached given the inputs that exist, (3) Comments describing behavior that no longer matches the code, (4) Feature flags that have been on (or off) for 6+ months and should be made permanent, (5) Imports that aren't used. For each, suggest delete / consolidate / promote. Don't add features. Just identify what to remove.",
    "timeMinutes": 5,
    "trap": "Deleting dead code without checking the symbol grep at the repo level — 'unused' inside a file may be used elsewhere."
  },
  {
    "dayIndex": 59,
    "title": "What story am I telling?",
    "category": "thinking",
    "ai": "Claude Opus 4",
    "prompt": "Here's how I've been describing [PROJECT / RELATIONSHIP / DECISION / YEAR] lately: [PASTE — repost a recent journal, message, or just summarize]. Identify the story I'm telling: (1) The protagonist (am I the hero, the victim, the underdog, the wise one), (2) The antagonist (the named villain — circumstance, a person, my past self, the market), (3) The arc I'm implicitly promising (redemption, escape, transformation, vindication), (4) The fact that doesn't fit the story but I keep including anyway, (5) What story I'd be telling if I dropped the current one. Story is a tool. Pick yours on purpose.",
    "timeMinutes": 7,
    "trap": "Defending the story instead of examining it — the story isn't true or false, it's instrumental; the question is whether it's serving you."
  },
  {
    "dayIndex": 60,
    "title": "Reduce this meeting count",
    "category": "life",
    "ai": "Claude Sonnet 4.5",
    "prompt": "Here's my week's calendar: [PASTE]. Identify meetings to cut or convert: (1) Recurring meetings that could be a Slack thread or async doc — name them, (2) Status meetings where I'm reporting up, not solving — convert to written update, (3) Meetings where I'm the wrong person but I keep showing up, (4) Meetings I scheduled because I felt I 'should', not because they have a decision attached, (5) Meetings under 30 min that could be 15. End with the proposed week — same outcomes, less calendar. Be ruthless.",
    "timeMinutes": 5,
    "trap": "Cutting meetings you secretly liked because they were easy — the test is decision-or-output, not comfort."
  },
  {
    "dayIndex": 61,
    "title": "Convert the testimonial",
    "category": "writing",
    "ai": "Claude Sonnet 4.5",
    "prompt": "Here's a long, rambling testimonial / interview quote from a customer: [PASTE]. Pull out the gold: (1) The single best line, verbatim, that you'd put on a landing page, (2) The 30-word version that captures the whole sentiment, (3) The specific outcome / number / time-saved buried in the middle, (4) The objection or hesitation they admit to — quote it, this builds trust, (5) The follow-up question I should ask them to get a sharper quote next time.",
    "timeMinutes": 4,
    "trap": "Smoothing the language — customer-voice rough is more credible than marketing-voice polished."
  },
  {
    "dayIndex": 62,
    "title": "Hidden cost audit",
    "category": "analysis",
    "ai": "Claude Opus 4",
    "prompt": "Here's a project / commitment / tool / subscription I'm running: [PASTE]. Find the hidden costs: (1) Direct money (the line item), (2) Time tax (how many minutes/week of attention does this take from me), (3) Cognitive tax (the open loop in my head even when I'm not working on it), (4) Opportunity cost (the thing I'm not doing because this exists), (5) Sunk-cost fallacy weight (am I keeping this only because I already spent X). End with: full cost honestly priced — does it earn its keep?",
    "timeMinutes": 6,
    "trap": "Auditing the wrong commitment — start with one you suspect, not one you're confident about."
  },
  {
    "dayIndex": 63,
    "title": "Tighten this paragraph",
    "category": "writing",
    "ai": "Claude Sonnet 4.5",
    "prompt": "Here's one paragraph: [PASTE]. Tighten it. Constraints: (1) Same meaning, half the words, (2) Strong verbs over adverb stacks ('walked quickly' becomes 'strode'), (3) No 'in order to' — just 'to', (4) No 'it is X that' — just 'X is', (5) Concrete nouns over abstract nouns where possible. Show before/after side by side. Then tell me which weak phrase was the worst offender and the rule for never writing it again.",
    "timeMinutes": 3,
    "trap": "Tightening past the point of voice — there's a length below which it stops sounding human; stop there."
  },
  {
    "dayIndex": 64,
    "title": "Cross-examine my plan",
    "category": "decisions",
    "ai": "Claude Opus 4",
    "prompt": "Here's a plan I'm about to commit to: [PASTE]. Cross-examine me like a skeptical investor / spouse / board member. Specifically: (1) The 5 questions they'd ask first that I should be ready for, (2) For each, my current best answer in one sentence, (3) The question where my answer is weakest — flag it, (4) The thing I'm assuming I'd be able to do that the cross-examiner would push back on, (5) The fact about this plan I'd most like to hide from them — and why I should put it on the first slide instead.",
    "timeMinutes": 7,
    "trap": "Letting it ask soft questions — push it to ask the question that, if asked publicly, would actually embarrass you."
  },
  {
    "dayIndex": 65,
    "title": "Walk this error message",
    "category": "code",
    "ai": "Claude Sonnet 4.5",
    "prompt": "Error: [PASTE EXACT MESSAGE + STACK TRACE]. Context: [LANGUAGE + WHAT I WAS RUNNING + WHAT I CHANGED LAST]. Walk it: (1) What this error literally means, plain English, (2) The 3 most likely root causes ranked by probability for this stack and context, (3) The specific line / config / state I should check first, (4) The fastest diagnostic command or print statement that disambiguates which cause it is, (5) The 'looks like X, actually Y' gotcha for this class of error. No 'try restarting'.",
    "timeMinutes": 5,
    "trap": "Pasting the error without the last change you made — the 'what I just changed' is usually the answer."
  },
  {
    "dayIndex": 66,
    "title": "Compare two approaches",
    "category": "decisions",
    "ai": "Claude Opus 4",
    "prompt": "I'm choosing between two approaches: [APPROACH A] and [APPROACH B]. For context: [GOAL + CONSTRAINTS]. Compare them across 5 axes: (1) Speed to first usable result, (2) Failure mode if it goes wrong (loud vs silent), (3) Reversibility, (4) What I learn either way (does B teach me more, even if A wins this round), (5) Who I'd ask for help on each. End with a recommendation, picked — not 'depends on your priorities'. Justify it in 2 sentences.",
    "timeMinutes": 6,
    "trap": "Asking for a comparison without forcing a pick — comparison without commitment is procrastination dressed up."
  },
  {
    "dayIndex": 67,
    "title": "Onboarding doc audit",
    "category": "writing",
    "ai": "Claude Sonnet 4.5",
    "prompt": "Here's the onboarding doc / setup README / first-time-user flow: [PASTE]. Audit it through the eyes of a brand-new user with zero context: (1) The first place they'd get stuck and silently quit, (2) The step that assumes knowledge they don't have, (3) The 'obvious' detail that isn't obvious (path, command, naming), (4) The dead link / outdated reference, (5) The screenshot that's missing where words alone won't carry. Give me a punchlist of fixes ranked by frustration-prevented-per-minute-of-effort.",
    "timeMinutes": 6,
    "trap": "Auditing it yourself — you've onboarded a hundred times; the AI hasn't, that's the value."
  },
  {
    "dayIndex": 68,
    "title": "What's the cheapest signal I can buy?",
    "category": "research",
    "ai": "Claude Sonnet 4.5",
    "prompt": "Question I'm trying to answer: [PASTE]. Don't answer it. Tell me how to cheaply buy signal: (1) The one public data source that would resolve this in 10 minutes if it exists — name it, (2) The single conversation with one specific kind of person that would resolve it, (3) The $50 experiment that beats $5000 of research, (4) The 'just do it once and see' move that I'm overthinking, (5) When I'd be wasting time on signal-gathering vs. just deciding. End with the cheapest first move.",
    "timeMinutes": 5,
    "trap": "Buying expensive signal (a study, a course, a long research pass) when a 10-minute conversation would resolve it."
  },
  {
    "dayIndex": 69,
    "title": "End-of-day three-line log",
    "category": "life",
    "ai": "Claude Sonnet 4.5",
    "prompt": "Here's my day: [PASTE BRAIN-DUMP — tasks done, conversations, mood, energy, anything]. Convert to a 3-line end-of-day log: (1) WIN — the one real thing today that moved something forward (not 'I tried hard'), (2) FRICTION — the specific thing that ate disproportionate energy, named precisely, (3) TOMORROW — the single first move that's the highest-leverage given what I just learned. No more than 3 lines total. No hedging. Save these and you'll see your year.",
    "timeMinutes": 3,
    "trap": "Logging 'I was busy' as a win — busy isn't a win; movement is."
  }
] as const;

function todayIndex() {
  const epoch = new Date("2026-05-31T00:00:00Z").getTime();
  const now = Date.now();
  const days = Math.floor((now - epoch) / 86400000);
  return ((days % PROMPTS.length) + PROMPTS.length) % PROMPTS.length;
}

export default function DailyPrompt() {
  const [idx, setIdx] = useState<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setIdx(todayIndex());
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-[400px] rounded-2xl border border-[#1A2225] bg-[#0A0F11]" aria-hidden />;
  }

  const p = PROMPTS[idx];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-[#22F0D5]/40 bg-[#0A0F11] p-7 md:p-10">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::today · {p.category} · ~{p.timeMinutes} min · {p.ai}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
            day {p.dayIndex + 1} / {PROMPTS.length}
          </p>
        </div>
        <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.1] tracking-tight md:text-4xl">
          {p.title}
        </h2>
        <pre className="mt-6 max-w-full overflow-x-auto whitespace-pre-wrap rounded-md bg-black/40 p-5 font-mono text-[13px] leading-[1.6] text-[#C8CCCE]">
          {p.prompt}
        </pre>
        <p className="mt-5 text-sm leading-[1.65] text-[#FFB87A]">
          ::trap · {p.trap}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <button
            onClick={() => setIdx((idx + PROMPTS.length - 1) % PROMPTS.length)}
            className="rounded-full border border-[#1A2225] bg-[#0E1418] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#C8CCCE] hover:border-[#22F0D5]/40 hover:text-[#22F0D5]"
          >
            ← previous
          </button>
          <button
            onClick={() => setIdx(todayIndex())}
            className="rounded-full border border-[#22F0D5]/40 bg-[#22F0D5]/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5] hover:bg-[#22F0D5]/20"
          >
            today
          </button>
          <button
            onClick={() => setIdx((idx + 1) % PROMPTS.length)}
            className="rounded-full border border-[#1A2225] bg-[#0E1418] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#C8CCCE] hover:border-[#22F0D5]/40 hover:text-[#22F0D5]"
          >
            next →
          </button>
        </div>
      </div>

      <details className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-5">
        <summary className="cursor-pointer font-mono text-[11px] uppercase tracking-[0.22em] text-[#9BA5A7] hover:text-[#22F0D5]">
          ::browse all {PROMPTS.length} daily prompts
        </summary>
        <div className="mt-5 grid gap-2 md:grid-cols-2">
          {PROMPTS.map((pp, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`text-left rounded-lg border px-3 py-2.5 text-sm transition-colors ${i === idx ? "border-[#22F0D5] bg-[#22F0D5]/10 text-[#F2F4F5]" : "border-[#1A2225] bg-[#0E1418] text-[#C8CCCE] hover:border-[#22F0D5]/40"}`}
            >
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#6B7779]">day {pp.dayIndex + 1} · {pp.category}</span>
              <p className="mt-1 font-medium">{pp.title}</p>
            </button>
          ))}
        </div>
      </details>
    </div>
  );
}
