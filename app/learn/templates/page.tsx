import type { Metadata } from "next";
import Link from "next/link";

const TEMPLATES = [
  {
    "slug": "novella-14-days",
    "title": "Write a 30-page novella in 14 days",
    "goal": "Finish a complete, readable 8,000-10,000 word novella with a real beginning, middle, and end. Not a masterpiece. A finished thing you'd let someone read.",
    "audience": "First-time fiction writers, hobbyists with a story stuck in their head, NaNoWriMo dropouts who never finished anything.",
    "estimatedTime": "14 days, ~90 minutes per day. Total ~21 hours.",
    "stack": [
      "Claude (long-context for scene drafting)",
      "Plain text editor or Google Docs",
      "Optional: Scrivener if you have it"
    ],
    "steps": [
      {
        "step": "Day 1 · Premise lock",
        "what": "Stop dreaming, start committing. Force the story down to one sentence and one protagonist with one desire.",
        "prompt": "I want to write a 30-page (about 9,000 word) novella in 14 days. Here's the vague idea I have: [describe in 2-3 sentences]. Force me to commit. Ask me 6 questions that will pin down: protagonist + their single core desire + the specific obstacle + the setting + tone (literary, thriller, romance, comedy, etc) + what the ending feels like. Then write the one-sentence premise in the form: '[Protagonist] wants [desire] but [obstacle], and in the end they [resolution].' Don't let me leave Day 1 with 'multiple possible angles.'"
      },
      {
        "step": "Day 2 · Beat sheet (15 beats)",
        "what": "Break the story into 15 beats. Each beat is one scene of roughly 600 words.",
        "prompt": "Using this premise: [paste premise from Day 1], create a 15-beat outline for a 9,000 word novella. Each beat = one scene of ~600 words. Use this structure: 1) Opening image / status quo, 2) Inciting incident, 3) Refusal of the call, 4) Crossing the threshold, 5) First test, 6) First ally or shift, 7) First major win, 8) Midpoint reversal, 9) Stakes raised, 10) Lowest point, 11) New plan, 12) Climax setup, 13) Climax, 14) Aftermath, 15) Final image. For each beat, give me one sentence of what happens + the emotional shift. Don't be precious. Pulpy is fine."
      },
      {
        "step": "Day 3 · Character sketches",
        "what": "Build the protagonist + 2-3 supporting characters with enough specificity that they don't blur together.",
        "prompt": "For my novella with this premise [paste] and these beats [paste], write a 200-word sketch for: 1) the protagonist, 2) the antagonist or main obstacle force, 3) one ally, 4) one wildcard. For each: a physical detail you'd remember, a verbal tic or speech pattern, what they want, what they're afraid of, and what they'd never admit out loud. No archetypes. Specifics only. If you write 'mysterious past,' I'll know you cheated."
      },
      {
        "step": "Days 4-10 · Draft 2 scenes per day",
        "what": "Write the actual book. 2 scenes per day for 7 days = 14 scenes. The 15th gets written on Day 11.",
        "prompt": "Write Scene [N] of my novella in 600-700 words. Beat: [paste the beat]. Characters in scene: [list]. Previous scene ended with: [one sentence]. Voice: third person past tense, [literary / pulpy / dry / lyrical — pick one and stick to it]. Show, don't tell. Open with action or dialogue, not weather or backstory. End on a moment that makes me want to read the next scene. Do not summarize — write the actual prose."
      },
      {
        "step": "Day 11 · Finale + last-scene polish",
        "what": "Write scene 15. Then re-read scene 14 (the climax) and tighten.",
        "prompt": "Write the final scene of my novella in 600 words. The climax happened in the previous scene [paste scene 14]. This final scene is the aftermath — what life looks like for the protagonist now. Show the change through one specific concrete moment, not through inner monologue or summary. End on the final image we set up in the outline: [paste]. Then re-read scene 14 and give me 5 specific line-level cuts or rewrites that would sharpen the climax."
      },
      {
        "step": "Day 12 · Continuity pass",
        "what": "Hunt the contradictions, forgotten details, name drift.",
        "prompt": "Here is the full draft of my 9,000 word novella: [paste in chunks if needed, or use file upload]. Find every continuity error: character names that drift, eye colors that change, times of day that don't add up, things a character couldn't know yet, foreshadowing that goes nowhere, foreshadowing that has no setup. List each one with the location and the fix. Don't comment on quality — only on continuity."
      },
      {
        "step": "Day 13 · Line edit pass",
        "what": "Tighten the prose. Cut adverbs. Kill 5% of words.",
        "prompt": "Here is my full novella draft: [paste]. Do a line edit pass. For each scene, identify: 1) the 3 weakest sentences (vague, clichéd, or telling-not-showing), 2) the 3 strongest sentences (so I know what's working), 3) at least 5 words to cut from that scene. Goal: cut total wordcount by 5%. Do not rewrite — flag and suggest. I'll make the calls."
      },
      {
        "step": "Day 14 · Read-aloud + ship",
        "what": "Read the whole thing out loud (or have a tool do it). Anything that makes you wince, fix. Then ship — meaning: send it to one person.",
        "prompt": "I'm reading my finished novella aloud. As I go, I'll paste in any paragraphs that sounded clunky. For each one I paste, give me 2 alternative phrasings — one slightly more formal, one slightly more conversational. Don't ask which I prefer; just give both. After that, draft a short message I can send with the manuscript to one reader, asking for honest gut-reaction feedback (not line edits), with a clear deadline of 7 days for their response."
      }
    ],
    "outcome": "A finished ~9,000 word novella. PDF or doc. One real human reader has it. You moved from 'I want to write a book someday' to 'I wrote one.'",
    "trap": "Trying to make Day 4 scene perfect before moving to Day 5. The novella dies in scene 1 polish. Rule: forward only until Day 12. Editing is later."
  },
  {
    "slug": "saas-landing-one-day",
    "title": "Build a simple SaaS landing page in one day",
    "goal": "Ship a real, live landing page (your domain or a free subdomain) for a SaaS idea — with a hero, value prop, three benefits, social proof placeholder, and a working email capture — in under 8 hours.",
    "audience": "Solo founders, side-project builders, people validating an idea who keep saying 'I just need a landing page' for 6 months.",
    "estimatedTime": "1 day, ~6-8 focused hours.",
    "stack": [
      "Claude (copy + code)",
      "Vercel or Netlify (free hosting)",
      "Loops.so, ConvertKit, or Mailchimp free tier (email capture)",
      "v0.dev or Tailwind UI starter (optional UI scaffold)"
    ],
    "steps": [
      {
        "step": "Hour 1 · One-sentence pitch + ICP",
        "what": "Lock the pitch and ideal customer before you write a single line of copy.",
        "prompt": "I'm building a SaaS landing page today. Here's my idea: [describe in 3 sentences]. Help me lock two things: 1) the one-sentence pitch in the form 'We help [who] [do what] without [the painful thing].' Give me 5 versions varying who/what/painful-thing, then recommend one. 2) The ideal customer profile in 80 words: title or role, company size, daily frustration, what they currently use instead, what they'd pay. Be specific — 'small business owners' is not an ICP."
      },
      {
        "step": "Hour 2 · Page structure + section copy",
        "what": "Write copy for hero, value prop, 3 benefits, FAQ, CTA — in order, no design yet.",
        "prompt": "Using pitch [paste] and ICP [paste], write copy for a landing page in this order: 1) Hero headline (under 10 words) + subhead (under 25 words) + CTA button text, 2) One-line 'this is for you if...' qualifier, 3) Three benefit blocks (each: 4-word title + 2-sentence explanation), 4) Three FAQ entries that address the real objections this ICP has, 5) Footer CTA. No marketing fluff, no 'revolutionize.' Write like a human emailing a friend who happens to be the ICP."
      },
      {
        "step": "Hour 3 · Visual + theme decisions",
        "what": "Pick palette, type, layout style. One pass, no second-guessing.",
        "prompt": "I'm shipping a landing page in 5 more hours. Help me pick a visual direction in one pass. Give me 3 distinct options, each with: primary color hex, accent color hex, background (light or dark), heading font (Google Fonts only), body font (Google Fonts only), and a one-line description of the vibe (e.g. 'serious B2B,' 'playful indie,' 'editorial minimal'). Then recommend one for my product, based on this pitch [paste] and ICP [paste]. I will not change my mind after this hour."
      },
      {
        "step": "Hour 4-5 · Build the page (code or v0)",
        "what": "Generate the HTML + Tailwind code or v0 prompt that produces the page.",
        "prompt": "Write a complete, single-file index.html for my landing page using Tailwind via CDN. Include: 1) responsive hero with [paste headline/sub/CTA], 2) 'this is for you' band, 3) three-column benefits grid (stack on mobile) with [paste benefits], 4) FAQ accordion with [paste FAQs], 5) footer CTA + email capture form pointing to action='[placeholder Loops/CK URL]'. Use these visual decisions: [paste palette + fonts]. Include proper meta tags, OG image placeholder, favicon link. Mobile-first, accessible, no JS frameworks. Just HTML + Tailwind + minimal vanilla JS for the accordion."
      },
      {
        "step": "Hour 6 · Wire up email capture",
        "what": "Connect the form to a real list provider so signups actually go somewhere.",
        "prompt": "I'm using [Loops.so / ConvertKit / Mailchimp]. Walk me through, in exact click order, how to: 1) create a new audience or list for this product, 2) get the form HTML or API endpoint, 3) replace the placeholder action in my index.html with the real endpoint, 4) test by submitting my own email, 5) confirm the signup landed. Assume I have a free account already created. No marketing speak — just clicks."
      },
      {
        "step": "Hour 7 · Deploy to live URL",
        "what": "Push to Vercel/Netlify and confirm the URL works on phone and desktop.",
        "prompt": "Walk me through deploying a single-file index.html to Vercel for free. I want a live URL today. Assume I have: 1) the index.html on my desktop, 2) a free Vercel account, 3) no existing git repo. Give me the fastest path from file-on-desktop to live URL — drag-and-drop deploy is fine. Then tell me how to add a custom domain later if I want to."
      },
      {
        "step": "Hour 8 · Smoke test + ship signal",
        "what": "Real device test. Then post the URL somewhere a stranger will see it.",
        "prompt": "I deployed to [paste URL]. Help me smoke test: list the 8 things I should manually verify in the next 15 minutes (phone load, form submit, link clicks, etc) and what 'pass' looks like for each. Then draft 3 short posts I can put up today — one for Twitter/X (under 280 chars), one for LinkedIn (3 short paragraphs), one for a relevant subreddit (rules-aware, no spam tone) — announcing the page and asking for honest first-impression feedback. No emojis unless the brand vibe requires them."
      }
    ],
    "outcome": "A live URL. Real form. Three signal-posts published. You've gone from 'idea' to 'people can sign up' in one day.",
    "trap": "Spending hour 4 trying to make the hero animation perfect. Ship plain, polish after signups. The page that doesn't exist converts at 0%."
  },
  {
    "slug": "fitness-30-day",
    "title": "Plan a 30-day fitness routine you'll actually do",
    "goal": "Build a realistic 30-day plan — workouts, schedule, nutrition guardrails, recovery — that fits your real life, not a fantasy version of it.",
    "audience": "Adults returning to fitness after a break, busy professionals, anyone who has bought 4 gym memberships and ghosted all of them.",
    "estimatedTime": "90 minutes to plan + 30 days to execute.",
    "stack": [
      "Claude (planner)",
      "A notes app or paper",
      "Optional: a basic fitness tracker (Apple Watch, Fitbit, even just your phone)"
    ],
    "steps": [
      {
        "step": "Step 1 · Honest baseline",
        "what": "Get truthful about current state and what you can actually commit.",
        "prompt": "I want a 30-day fitness plan I'll actually do. Ask me 10 questions to set the baseline. Cover: current weekly activity (honest, not aspirational), any injuries or medical limits, equipment access (gym, home, none), sleep average, weekday vs weekend availability in minutes, primary goal (strength, fat loss, endurance, mobility, general health — pick one), age, weight if comfortable sharing, eating pattern (skipped meals, takeout frequency), and how many days I've actually trained in the last 60 days. Don't sugarcoat my answers back to me — repeat them back factually."
      },
      {
        "step": "Step 2 · Reality-check the goal",
        "what": "Calibrate expectations. 30 days won't change your body composition dramatically. It will change your default behavior.",
        "prompt": "Based on my baseline [paste], tell me honestly: 1) What is realistic to expect after 30 days of consistent effort given my starting point — be specific (e.g. 'lose 3-6 lbs, improve resting HR by X, double pushup max'). 2) What is NOT realistic in 30 days no matter what. 3) The single most important habit for someone in my situation to lock in. Don't be motivational. Be a coach who's seen 1,000 30-day plans fail."
      },
      {
        "step": "Step 3 · Weekly structure",
        "what": "Lay out the week shape — which days train, which days rest, which days are flexible.",
        "prompt": "Build my weekly template. Based on baseline [paste] and goal [paste], give me a 7-day structure with: workout days (specify which days), rest days, optional/flex day, total weekly training time in minutes (must fit my real availability), training split (full body / upper-lower / push-pull-legs / activity-based — choose what fits a beginner-to-intermediate level), and one anchor habit per day that's not the workout (e.g. '10-min morning walk on rest days'). Don't give me 6 days of training if I told you I have 4 hours a week."
      },
      {
        "step": "Step 4 · Specific workouts",
        "what": "Now write the actual workouts. Movement names, sets, reps, rest, progression.",
        "prompt": "Write the specific workouts for week 1. For each training day in my template [paste], give me: warm-up (5 min, specific movements), main work (3-5 exercises with sets x reps x rest, including starting weight guidance or bodyweight progression), cool-down (5 min). Use mostly compound movements. Match to my equipment [paste] and injuries [paste]. For week 2-4, tell me the progression rule: how to add load, reps, or difficulty week by week. No 'do 3x10' generics — give me real prescriptions a beginner can follow."
      },
      {
        "step": "Step 5 · Nutrition guardrails (not a diet)",
        "what": "Three rules, not a meal plan. Meal plans don't survive contact with Tuesday.",
        "prompt": "I will not follow a meal plan. Give me 3 nutrition guardrails I can apply daily that match my goal [paste] and current eating pattern [paste]. Each guardrail must be: specific (not 'eat clean'), measurable, and survivable on a bad day. Examples of good guardrails: 'Protein at every meal, palm-sized minimum.' 'No liquid calories before 5pm.' 'One vegetable before any starch.' Tell me which one to lock first and add the others week by week. No calorie counting unless I asked for it."
      },
      {
        "step": "Step 6 · Friction-removal setup",
        "what": "Pre-decide everything that future-you will skip. Clothes, time, equipment.",
        "prompt": "Help me remove friction. Based on my plan [paste], give me a 'do this tonight' checklist with: 1) what to put where (gym bag, water bottle, clothes laid out), 2) what to schedule on my calendar this week (specific time blocks for each workout), 3) what to remove from my home (whatever sabotages me, but ask first what that is), 4) one accountability mechanism (a friend, a calendar share, a tracking app — pick ONE). The point: when day 4 motivation drops, the decision is already made."
      },
      {
        "step": "Step 7 · Weekly check-in protocol",
        "what": "Set the 10-minute Sunday review that keeps the plan alive past week 2.",
        "prompt": "Write me a Sunday check-in template (under 10 minutes). It should ask me: workouts completed vs planned, soreness/injury check, energy 1-10, sleep average, what went wrong (one thing), what to adjust next week (one thing). For each week, also give me one progression cue tied to my goal [paste] — e.g. 'add 2.5kg if you finished all sets clean.' Tell me what to do if I missed 2+ workouts (not 'do them all this week' — the realistic adjustment)."
      },
      {
        "step": "Step 8 · Day 30 outcome + restart trigger",
        "what": "Define what 'done' looks like and what triggers the next 30 days.",
        "prompt": "Define the day 30 outcome for my plan [paste]. Give me: 1) three measurable checks I'll do on day 30 (e.g. 'how many pushups in 60 sec,' 'resting HR,' 'weight if relevant'). 2) The honest 'success' threshold for each. 3) If I hit it, what does month 2 look like (one paragraph, not a new plan). 4) If I missed it, what's the ONE adjustment for month 2 — not a full rebuild, just one change."
      }
    ],
    "outcome": "A 30-day plan that fits your real calendar, real equipment, real life. Clothes laid out. Calendar blocked. Three guardrails active. A check-in scheduled for Sunday.",
    "trap": "Building the plan for an 'ideal' version of you who wakes up at 5am. The plan must fit the real you who hits snooze twice. If it doesn't, it dies in week 2."
  },
  {
    "slug": "senior-swe-interview-7-days",
    "title": "Prep for a senior software engineering interview in 7 days",
    "goal": "Walk into a senior SWE loop in 7 days with sharpened fundamentals, a clean STAR story bank, system design fluency on 3 reference designs, and a behavioral playbook.",
    "audience": "Senior engineers (5-12 YOE) with a real interview on the calendar in a week. Not a 6-month grinder track.",
    "estimatedTime": "7 days, ~2-3 hours per day. ~18 hours total.",
    "stack": [
      "Claude (drilling, mock interviews, system design review)",
      "LeetCode or NeetCode (focused list, not the whole catalog)",
      "Excalidraw or paper for system design",
      "A timer"
    ],
    "steps": [
      {
        "step": "Day 1 · Loop reconnaissance",
        "what": "Know exactly what's coming. Don't prep generically.",
        "prompt": "I have a senior SWE interview at [company / type of company — e.g. FAANG, mid-stage startup, fintech, big-tech infra] in 7 days. Help me map the loop. Based on what's typical for this kind of company at the senior level: 1) list the likely rounds (coding, system design, behavioral, hiring manager, bar raiser), 2) the typical duration of each, 3) the signal each round is measuring, 4) common failure modes at the senior level (not junior — senior). If I can name the company, I will [optional: paste company name]; otherwise use the closest archetype."
      },
      {
        "step": "Day 2 · Coding triage (30 problems, not 300)",
        "what": "Pick the right 30 problems. Senior interviews favor patterns over volume.",
        "prompt": "Give me a 30-problem list for the next 7 days, calibrated to a senior loop at [company archetype from day 1]. Group by pattern: 1) arrays/hashing, 2) two pointers / sliding window, 3) trees/graphs traversal, 4) heap/priority queue, 5) dynamic programming (only 4-5 problems — DP is rare at senior, but not zero), 6) design-adjacent (LRU cache, rate limiter). Mix difficulty: 5 easy (warm-up), 18 medium (the real target), 7 hard (stretch). Format as a table with: problem name, pattern, difficulty, why it matters. Days 2-4 I'll grind these."
      },
      {
        "step": "Day 2-4 · Drill with verbalization",
        "what": "Solve problems out loud. Senior interviews score communication as much as code.",
        "prompt": "Be my coding interview drill partner. I'll paste a problem statement and my solution attempt. For each: 1) verify correctness (run through 3 test cases including edge cases), 2) critique time/space complexity AND whether I stated them clearly, 3) flag if my variable names, function decomposition, and verbal narration are senior-level or junior-level, 4) ask me one follow-up that the interviewer would actually ask (scale it 10x, what if the input is a stream, etc), 5) score 1-5 on: correctness, complexity reasoning, clarity, communication. No participation trophies."
      },
      {
        "step": "Day 3 · System design — 3 reference designs deep",
        "what": "Don't try to learn all of system design. Learn 3 references cold.",
        "prompt": "I have 4 days until a senior system design round. Pick 3 reference designs that, if I can do them cold, cover ~70% of senior interview prompts. Likely candidates: URL shortener, news feed (Twitter/Instagram), chat (WhatsApp/Slack), rate limiter, ride-share matching, video streaming. Choose 3 that maximize coverage for [company archetype]. For each, give me: 1) functional requirements + non-functional requirements I should always state, 2) the back-of-envelope numbers (QPS, storage, bandwidth) and how to derive them in 60 seconds, 3) the canonical architecture (load balancer, app servers, DB, cache, queue, CDN — what goes where and why), 4) the 3 deepest tradeoffs an interviewer will probe, 5) the most common follow-up question. Be terse — not a textbook chapter, a cheat sheet."
      },
      {
        "step": "Day 4 · STAR story bank (8 stories)",
        "what": "Behavioral interviews are won by stories, not by reciting principles.",
        "prompt": "Help me build a STAR story bank of 8 stories from my career. Ask me to brainstorm raw moments first (don't write the stories yet). For each story I describe, you write it in STAR format: Situation (1 sentence, technical context only), Task (what I owned), Action (3-5 specific things I did — verbs, not adjectives), Result (the measurable outcome + the lesson). Tag each story with the behaviors it covers: leadership, conflict, ambiguity, failure, mentorship, technical depth, scope expansion, prioritization, cross-team. Goal: every common behavioral can be answered by mapping to one of these 8 stories."
      },
      {
        "step": "Day 5 · Mock coding round",
        "what": "Live mock with hard feedback. No notes, no Google.",
        "prompt": "Run a 45-minute mock coding interview on me, senior level. Pick one medium-hard problem I haven't seen. Format: 1) state the problem, 2) wait for me to ask clarifying questions (note which ones I missed), 3) wait for me to propose an approach (critique it before I code), 4) wait for me to code, 5) wait for me to test, 6) ask 2 follow-ups. After the round, give me a debrief: did I clarify, did I think before coding, did I narrate, did I test edge cases, did I handle the follow-up. Score: would I pass at senior level — yes/no with one-line reason. Be brutal. Companies will be."
      },
      {
        "step": "Day 6 · Mock system design + behavioral",
        "what": "Run a full design round and a behavioral round back-to-back. Real loop feels long.",
        "prompt": "Run a 45-minute mock system design round. Pick a prompt I haven't drilled — something adjacent to my 3 references [paste]. Walk through: 1) clarifying questions, 2) functional + non-functional requirements, 3) back-of-envelope math, 4) high-level diagram (I'll describe in words), 5) deep dive on the component you push me on, 6) tradeoffs and bottlenecks. After, give me brutal feedback: did I structure, did I scope, did I number, did I justify, did I handle the curveball. Then immediately run a 20-minute behavioral round with 3 questions drawn from common senior prompts (a conflict, a failure, a leadership moment). Score each: did the STAR land, did I quantify, did I show reflection."
      },
      {
        "step": "Day 7 · Taper + logistics + day-of plan",
        "what": "Don't grind the night before. Sharpen, sleep, set up for the morning.",
        "prompt": "Day 7. Interview is tomorrow. Give me a taper plan, not a cram plan. Include: 1) 90 minutes of light review (which 2-3 problems and which 1 design to glance at, not redo), 2) 30 minutes restating my STAR stories aloud, 3) what NOT to do today (no new problems, no new designs), 4) day-of logistics: what time to wake, what to eat, what to wear (remote vs onsite), tech setup check for remote, what to have on hand (water, paper, pen), 5) the one-paragraph mental frame to read before walking in or joining the call. Calm and prepared beats jittery and over-prepped."
      }
    ],
    "outcome": "You walk in (or log in) with: 30 problems drilled with feedback, 3 system designs that fit on a page, 8 STAR stories you can map any behavioral to, two full mock rounds under your belt, and a day-of plan that gets you to the table calm.",
    "trap": "Trying to grind 100 problems in 7 days. You'll cover more surface area and retain less. The plan only works if you go deep on the 30, not skim 100."
  },
  {
    "slug": "wedding-speech-tomorrow",
    "title": "Write a wedding speech (deadline: tomorrow)",
    "goal": "Deliver a 4-7 minute wedding speech that lands — warm, honest, specific, with one real laugh, one real moment, and a clean ending. Tomorrow.",
    "audience": "Best man, maid of honor, parent of the bride/groom, sibling, close friend — anyone who said yes and is now panicking.",
    "estimatedTime": "2-3 hours tonight + 30 minutes tomorrow to rehearse.",
    "stack": [
      "Claude (drafting + critique)",
      "A quiet room",
      "A timer"
    ],
    "steps": [
      {
        "step": "Step 1 · Brain dump (no editing)",
        "what": "Get every memory, story, and feeling onto the page before you try to shape anything.",
        "prompt": "I'm giving a wedding speech tomorrow for [name]'s wedding. My relationship: [best man / sister / father / friend since college]. Help me brain dump. Ask me 12 quick questions, one at a time, in this order: 1) the first memory I have of [couple member], 2) a moment that captures who they are, 3) when I first knew they were serious about their partner, 4) something the partner has done that I admire, 5) a specific funny story (not a roast — funny because it's true), 6) the trait of theirs I'd want my own kid to have, 7) what I think marriage means to them based on what I've seen, 8) one thing about their partner I want to thank them for, 9) the wish I have for their marriage, 10) the moment I cried about them this year, 11) the inside joke that would land in this room, 12) what I want everyone to feel when I sit down. Don't edit — just collect."
      },
      {
        "step": "Step 2 · Pick the spine (one story, one truth)",
        "what": "A great speech has one anchor story and one true sentiment. Pick them both now.",
        "prompt": "From the brain dump [paste], pick the ONE story to anchor my speech (3-4 minutes of actual telling) and the ONE truth to land at the end (the sentence everyone will remember). Tell me which you picked and why. Then tell me which 2-3 supporting moments from the dump to weave in around the anchor story, and which to cut entirely. Be ruthless — a wedding speech is not a highlight reel."
      },
      {
        "step": "Step 3 · Draft 1 (full speech, ~750 words)",
        "what": "Write the whole thing. Don't stop to fix lines. Just get it out.",
        "prompt": "Write a 5-minute wedding speech (about 700-800 words) for me. Anchor story: [paste]. Closing truth: [paste]. Supporting moments: [paste]. Structure: 1) Open with a tight line that establishes who I am to the couple — under 20 words, no 'for those of you who don't know me,' 2) Anchor story told vividly with specifics — names, places, exact words if I remember them, 3) Bridge to what the story reveals about them, 4) Turn to the partner — one specific thing I've noticed about how they love [name], 5) Toast — the closing truth + raise glasses. Voice: warm, specific, slightly self-aware. No clichés. No 'they say marriage is...' Read it aloud as you write it — if a line is awkward to say, fix it."
      },
      {
        "step": "Step 4 · Cut to 4.5 minutes",
        "what": "Every wedding speech is too long. Cut 20%.",
        "prompt": "Here's my draft [paste]. The speech runs about 5+ minutes. Cut 20% — that's roughly 150 words — without losing the anchor story or the closing truth. Tell me what to cut and why. Specifically: kill any sentence that explains a joke, any throat-clearing intro, any 'and I think...' wind-up, any line that's about me instead of them, any line that another speaker would also say (parent thank-yous, venue compliments). Show me the trimmed version in full."
      },
      {
        "step": "Step 5 · Risk audit",
        "what": "Is there anything in here that could land wrong? Check before delivery, not after.",
        "prompt": "Audit my speech for risk [paste]. Flag: 1) any joke or reference that excludes most of the room, 2) anything about an ex, an old job they hated, a falling-out, anything family politics adjacent, 3) anything that could be read as a backhanded compliment, 4) any reference that needs setup the audience won't have, 5) anything I'd be embarrassed if their grandmother heard, 6) anything that 5-years-from-now-them might wince at. For each flag, give me a safer alternative. I make the final call."
      },
      {
        "step": "Step 6 · Read-aloud + delivery notes",
        "what": "The speech is now words on a page. It needs to become spoken language.",
        "prompt": "Take my final speech [paste] and mark it up for delivery. Add: 1) [pause] markers where I should stop for a beat (after a punchline, before a tonal shift), 2) [slow] markers for the lines I should not rush, 3) one or two [look at couple] cues, 4) [breath] markers if a sentence is long. Then give me 5 delivery rules for tomorrow: where to stand, where to look, what to do with the paper or cards, what to do if I get emotional, what to do if a joke doesn't land. Honest, not theatrical."
      },
      {
        "step": "Step 7 · Tomorrow morning rehearsal protocol",
        "what": "One full timed run-through. Then leave it alone.",
        "prompt": "Tomorrow morning, give me a 25-minute rehearsal protocol. Include: 1) one full timed read-aloud (note any line I stumble on), 2) one pass fixing only the stumble lines, 3) one final timed read with delivery notes, 4) STOP — no more rewrites after this. Then give me a checklist for what to bring (printed cards, water, etc), what to do in the hour before (eat, don't drink yet, hit bathroom), and the one-sentence reminder to read right before I stand up. Calm, not theatrical."
      }
    ],
    "outcome": "A 4.5-minute speech, printed on cards, rehearsed once timed, risk-audited, with delivery notes. You walk up knowing exactly how it starts and how it lands.",
    "trap": "Trying to be funny. The audience didn't come for stand-up. They came to feel something true about the couple. One real moment beats five attempted jokes."
  },
  {
    "slug": "research-paper-outline-90-min",
    "title": "Draft a research paper outline in 90 minutes",
    "goal": "Walk away in 90 minutes with a defensible paper outline: claim, contribution, related work map, methods, planned experiments, predicted threats to validity. Not a paper. The skeleton your paper hangs on.",
    "audience": "Grad students, early-career researchers, independent researchers writing for arXiv, anyone who has a finding but doesn't know how to frame it.",
    "estimatedTime": "90 minutes, single sitting, timer on.",
    "stack": [
      "Claude (claim sharpening + outline structure)",
      "Google Scholar or Semantic Scholar (related work scan)",
      "A clean doc"
    ],
    "steps": [
      {
        "step": "Min 0-10 · One-sentence claim",
        "what": "Force the paper down to one falsifiable sentence. Everything follows from this.",
        "prompt": "I'm outlining a research paper in the next 90 minutes. My finding or idea is: [describe in 3-4 sentences]. Force me to write the single-sentence claim in the form: 'We show that [X causes/predicts/improves Y] under [conditions], measured by [metric].' Give me 5 candidate versions, varying scope and strength of the claim. Then push back: which version is falsifiable? Which is too vague? Which is too strong? Recommend the one to commit to. I will not move past minute 10 without picking."
      },
      {
        "step": "Min 10-20 · Contribution + novelty statement",
        "what": "State what's new. Be specific about which prior work this beats or extends.",
        "prompt": "Given my claim [paste], help me write the contribution statement. Format: 'Prior work has [done X but limited by Y]. We contribute [specifically what], differing from [closest prior work] by [the precise mechanism].' Ask me to name 3-5 prior works I know of in this space. If I can't name them, search the obvious keywords and propose candidates I should look up. The contribution must be one specific thing, not a list."
      },
      {
        "step": "Min 20-35 · Related work map",
        "what": "Sketch the landscape. Three buckets, not a bibliography.",
        "prompt": "Build a related work map for my claim [paste]. Organize into 3 buckets: 1) work that addresses the same problem with different approach (where we beat them on X), 2) work that uses similar approach for different problem (where we extend the method), 3) foundational work we build on (where we cite as basis, not competition). For each bucket, list 3-5 candidate papers I should cite — by author + year + one-line summary + how it relates to my claim. If you're not certain a paper exists, mark it [verify]. I'll check before citing. No hallucinated cites."
      },
      {
        "step": "Min 35-55 · Methods section outline",
        "what": "How will the reader replicate this? Step by step, with concrete operationalizations.",
        "prompt": "Draft the methods section outline for my paper. Claim [paste]. Cover: 1) operationalization — how each variable in my claim is concretely measured, 2) data — source, sample size, inclusion/exclusion criteria, ethical considerations if relevant, 3) procedure — step by step what was done, 4) analysis plan — statistical tests or evaluation metrics, with preregistration if applicable, 5) compute and tooling — what was used, version numbers if relevant. Each subsection: 2-4 sentences only. Methods should be reproducible by a reader, not a memoir."
      },
      {
        "step": "Min 55-70 · Predicted results + planned figures",
        "what": "What do you expect to find, and what would the figure look like?",
        "prompt": "Predict my results section. For my claim [paste] and methods [paste]: 1) state the expected primary result in numerical-ish terms (effect size direction, rough magnitude, statistical significance threshold), 2) describe the headline figure — what's on the x-axis, y-axis, what the lines or bars represent, what 'success' looks like visually, 3) describe the secondary figure that shows the ablation or robustness check, 4) list 2-3 sanity checks that would catch a bug in my pipeline. Predict honestly — if my hypothesis fails, what would that look like in the figure?"
      },
      {
        "step": "Min 70-85 · Threats to validity",
        "what": "Pre-mortem your paper. What will a reviewer attack?",
        "prompt": "Run a hostile-reviewer pre-mortem. Given my claim [paste] and methods [paste], list the 7 most likely reviewer objections in order of severity: 1) construct validity (is the metric measuring what I claim), 2) internal validity (causal vs correlational), 3) external validity (does it generalize), 4) statistical (power, multiple comparisons, p-hacking), 5) baseline strength (are the comparisons fair), 6) confounders (what else could explain the result), 7) reproducibility (could someone else run this). For each, give the one-line objection AND the one-line counter or honest acknowledgement. The strongest papers acknowledge their limits before the reviewer does."
      },
      {
        "step": "Min 85-90 · Title + abstract sketch",
        "what": "Lock the title and a 200-word abstract that someone scanning a feed would actually click.",
        "prompt": "Give me: 1) three candidate titles for my paper — one descriptive (says what the paper does), one hooky (frames the finding's implication), one technical (precise mechanism). 2) A 200-word abstract following the structure: [1 sentence context] [1 sentence problem] [1 sentence approach] [2-3 sentences results with numbers] [1 sentence implication]. Pull only from my claim [paste], methods [paste], and predicted results [paste]. Do not invent results. Mark anything speculative as [TBD]."
      }
    ],
    "outcome": "A single-page outline: claim, contribution, related work map, methods sketch, predicted results, threats to validity, three title candidates, draft abstract. The paper has a spine.",
    "trap": "Treating the outline as the paper. The outline is a contract with yourself about what the paper will defend. The writing comes after. If you can't defend the claim in 90 minutes, you can't defend it in 90 pages."
  },
  {
    "slug": "content-calendar-3-month",
    "title": "Build a 3-month content calendar",
    "goal": "Walk away with a 13-week calendar — themes, channels, post types, cadence, and the first 2 weeks fully drafted — that you can actually execute solo or with one helper.",
    "audience": "Solo founders, indie creators, small marketing teams, anyone tired of writing 'idk what to post today' at 11pm.",
    "estimatedTime": "3-4 hours to plan + 2-3 hours to draft week 1-2.",
    "stack": [
      "Claude (planning + drafting)",
      "Notion / Airtable / Google Sheets (calendar)",
      "Loops.so or your existing email tool",
      "Whatever scheduler you use (Buffer, Hypefury, native platforms)"
    ],
    "steps": [
      {
        "step": "Step 1 · Audience + offer audit",
        "what": "You can't pick topics until you know who you're talking to and what they want from you.",
        "prompt": "I'm building a 3-month content calendar for [my brand / product / personal practice — describe in 3 sentences]. Ask me 8 questions to lock the foundation: 1) the one specific person I'm writing for (job title, life stage, current frustration), 2) what they currently consume (specific accounts, newsletters, publications), 3) what I'm selling or building toward (product, list, brand, book), 4) the action I want them to take after each piece of content, 5) what makes my POV different from the 10 closest-adjacent voices, 6) my realistic posting capacity per week (hours, not aspiration), 7) my channels in priority order, 8) what I refuse to post about. Don't move forward until these are locked."
      },
      {
        "step": "Step 2 · Three content pillars + one signature format",
        "what": "Three themes you can sustainably write about. One format people will recognize as yours.",
        "prompt": "Based on my audit [paste], propose 3 content pillars I'll rotate through for 13 weeks. Each pillar: 1) a 3-5 word name, 2) the question this pillar answers for my reader, 3) 5 example post titles. Then propose 1 signature format — a structural pattern I'll repeat enough that the audience starts to recognize it (e.g. 'one-tweet teardowns,' 'weekly Friday recap,' 'before/after threads,' 'one-link emails'). Recommend the signature based on my channel priority [paste] and capacity [paste]. The pillars + signature must be sustainable for 13 weeks, not 3."
      },
      {
        "step": "Step 3 · Cadence + channel mix",
        "what": "How often, where. Match to real capacity, not fantasy.",
        "prompt": "Build my weekly cadence. Based on capacity [paste] and channels [paste], give me a table: channel × day of week × post type. Cover all 13 weeks worth of slots. Include: 1) the anchor channel (highest output), 2) the repurpose channels (where the anchor content travels), 3) one rest day or low-effort slot (a like, a comment, a curation post). Realistic rules: a Twitter user posting daily ≠ a LinkedIn user posting daily. Match output to platform norms. Output: a single 7-day grid I'll repeat 13 times with theme variation."
      },
      {
        "step": "Step 4 · 13-week theme rotation",
        "what": "Each week gets a focus. Now you know what to write Monday morning week 7.",
        "prompt": "Map the 13 weeks. Each week gets: 1) primary pillar from [paste pillars], 2) one weekly theme phrase (5-10 words, the angle within the pillar), 3) one tie-in to a real-world calendar moment if relevant (season, holiday, industry event — only if it lands naturally, not forced), 4) one piece of evergreen content for that week (something that'll still be useful in 6 months). Rotate pillars so the audience doesn't get whiplash. Cluster related themes so each month has narrative shape. Output a 13-row table."
      },
      {
        "step": "Step 5 · Week 1 + week 2, fully drafted",
        "what": "Draft the first 2 weeks now while context is hot. Future-you will thank you.",
        "prompt": "Draft every post for week 1 and week 2 of my calendar. Use my cadence [paste], the week themes [paste week 1 + week 2], and signature format [paste]. For each post: 1) the channel, 2) the day, 3) the full draft (don't outline — write the actual post, ready to schedule), 4) any image or media note. Voice: [paste from audit — terse, warm, technical, etc]. No emojis unless I said yes. No 'hot take' theater. End each post with the action I want — read, click, reply, share. Format as a copy-pasteable list I'll move into my scheduler tonight."
      },
      {
        "step": "Step 6 · Repurposing rules",
        "what": "Make every anchor piece pull double or triple duty.",
        "prompt": "Set up my repurposing rules. Based on cadence [paste], for each anchor post (highest-effort content), give me the explicit downstream cuts: 1) the long-form anchor (e.g. newsletter or LinkedIn essay) → 2) the thread or carousel cut → 3) the single-quote tweet/IG cut → 4) the comment-bait short cut. For each, the precise structural transformation rule (e.g. 'pull the strongest sentence and post as standalone Tuesday'). Goal: write once, distribute four times, no cross-platform identical posts."
      },
      {
        "step": "Step 7 · Measurement + review cadence",
        "what": "How do you know it's working? When do you cut or double down?",
        "prompt": "Set up measurement. For my calendar [paste] and channels [paste], pick 3 metrics to track weekly — no vanity metrics. Examples: replies (not likes), email subscribes (not opens), conversation starts in DMs, sales-page clicks. For each: how I'll measure it (which dashboard, which export), the baseline this month, and the trigger thresholds (under X = adjust pillar mix, over Y = double down). Schedule a 30-minute weekly review (which day, what to look at, what decisions to make). Quarterly trigger: at week 8, what would cause me to revise weeks 9-13?"
      }
    ],
    "outcome": "13-week calendar with themes locked, weeks 1-2 fully drafted and scheduled, repurposing rules set, measurement cadence on the calendar. You stop writing posts at 11pm.",
    "trap": "Planning 13 weeks of perfect posts. The plan must survive your sick days and your bad weeks. Build for week 7 you, not week 1 you."
  },
  {
    "slug": "wedding-budget-no-blowup",
    "title": "Plan a wedding budget that doesn't blow up",
    "goal": "Build a defensible total budget broken into line items with realistic ranges, a contingency, and a tracking system — and know which 3 categories you'll fight to cut if needed.",
    "audience": "Engaged couples in budget-planning phase, especially first-timers who've never priced a venue and have no idea what 'cake at $14 a slice' means.",
    "estimatedTime": "3-4 hours over one weekend.",
    "stack": [
      "Claude (planning + tradeoff modeling)",
      "Google Sheets or Notion (the tracking sheet)",
      "Real local quotes (you'll need to gather these — AI can't quote your local florist)"
    ],
    "steps": [
      {
        "step": "Step 1 · Total + non-negotiables",
        "what": "Set the ceiling and the must-haves before pricing anything.",
        "prompt": "We're planning our wedding. Help us lock the foundation. Ask us 8 questions: 1) the total budget number we will not exceed (the real one, not the 'soft' one), 2) who's contributing (us, parents, mixed — and any strings attached), 3) the rough guest count range (and the absolute cap), 4) the city or region (matters enormously for pricing), 5) the season + day of week (Saturday in June ≠ Friday in November), 6) the 3 non-negotiables (e.g. 'live band,' 'specific venue,' 'open bar,' '100+ guests'), 7) the 3 things we don't care about (where we'll cut), 8) the timeline — months until the wedding. Don't move on until we've answered all 8 with numbers, not adjectives."
      },
      {
        "step": "Step 2 · Realistic % allocation",
        "what": "Industry-standard % splits adjusted to your priorities.",
        "prompt": "Based on our inputs [paste]: build a percentage allocation across the standard wedding categories. Categories: venue + rentals, catering + bar, photo + video, attire (both), flowers + decor, music/DJ/band, ceremony (officiant + license), invitations + stationery, transportation, hair + makeup, cake + dessert, favors + gifts (wedding party gifts especially), planner/coordinator if any, contingency. Start from industry baselines then adjust UP for our non-negotiables and DOWN for our don't-cares [paste]. Show the % AND the dollar amount per category given our total [paste]. Flag any category where our preferences push the % above realistic ceilings for our region."
      },
      {
        "step": "Step 3 · Reality-check regional pricing",
        "what": "Sanity-check the numbers against your actual location. AI doesn't know your zip code.",
        "prompt": "I'm in [city / region]. For each category in our allocation [paste], give me: 1) the typical low-end vendor price range for our guest count [paste], 2) the typical mid-range, 3) the high end. If you don't have data for my exact area, give me the closest comparable metro AND tell me which way to adjust (HCOL vs LCOL). Mark any category where my allocated dollar amount is below the typical low end — those are the ones I need to either accept smaller scope, find unconventional vendors, or pull from somewhere else. No 'wedding average $33K' nationals — local-anchored ranges only."
      },
      {
        "step": "Step 4 · Hidden costs you didn't budget for",
        "what": "The line items couples forget. The things that turn $30K into $38K.",
        "prompt": "Based on our plan [paste], list the 15 most commonly-forgotten wedding costs that blow up budgets. Examples to consider: marriage license fees, vendor gratuities (real %), vendor meals at reception, alterations, undergarments + shoes, day-of beauty trials, rehearsal dinner, welcome bags, postage (not invitations — actual stamps), thank-you cards + postage, hotel block coordination, wedding party transportation, getting-ready space rental, day-after brunch, dress preservation or alterations after, photo prints/album, taxes + service fees on every quote. For each, give the typical dollar range and where to slot it in the master budget. These need real lines, not 'contingency.'"
      },
      {
        "step": "Step 5 · Contingency + cut order",
        "what": "Build the safety net AND pre-decide what dies first if things tighten.",
        "prompt": "Two things. 1) Tell me what % contingency to hold based on our total [paste] and timeline [paste] — and where the contingency lives (separate savings account, not 'spread across categories'). 2) Pre-rank the 'cut order' — the exact sequence of cuts we will make if we go over budget, ordered from least painful to most painful. Examples: 'cut welcome bags' (low pain) → 'reduce bar from open to wine+beer' → 'reduce floral budget by 20%' → ... → 'reduce guest count by 10' (high pain). We make this decision now while calm, not in month 8 panicking."
      },
      {
        "step": "Step 6 · Build the tracking sheet",
        "what": "A Google Sheet or Notion table you'll actually update.",
        "prompt": "Give me the exact column structure for a wedding budget tracking sheet. Columns: Category, Subcategory, Budgeted Amount, Quote 1 (vendor + $), Quote 2 (vendor + $), Quote 3 (vendor + $), Selected Vendor, Contract Total (incl tax/service/gratuity), Deposit Paid, Balance Due, Due Date, Notes. Plus a summary tab: Total Budgeted, Total Quoted, Total Contracted, Total Paid, Total Outstanding, Variance from Budget (color-coded). Give me the formulas for the summary tab. We'll build it tonight, populate it as we get real quotes."
      },
      {
        "step": "Step 7 · 6-month vendor booking sequence",
        "what": "What to book and when. The order matters — venue first, photographer next, etc.",
        "prompt": "Given our timeline [paste months out], build the vendor booking sequence: which category to lock first, second, third — based on what books up fastest in our market [paste]. For each: when to book by (months out), why this order, what to nail down BEFORE getting quotes (date, guest count, dietary needs, etc), and the deposit % typical for that vendor type. Output as a sequenced timeline, not a checklist."
      },
      {
        "step": "Step 8 · Monthly check-in protocol",
        "what": "Couples that check budget weekly stay on it. Couples that check once at month 8 don't.",
        "prompt": "Build me a 15-minute monthly budget check-in. Both partners present. Cover: 1) update tracking sheet with new contracts and payments, 2) compare Total Contracted vs Total Budgeted, 3) if variance is over 5% positive, when does cut order [paste] activate, 4) flag upcoming deposits in next 30 days, 5) one decision: any vendor not yet booked that should be locked this month. Schedule recurring on the 1st of each month. Both partners on the calendar invite. No solo budgeting — leads to fights at month 7."
      }
    ],
    "outcome": "A populated tracking sheet, an honest total, a contingency parked separately, a cut order both partners agreed to while calm, and a monthly check-in on the calendar.",
    "trap": "Treating the budget as something one partner manages alone. Wedding budgets blow up not from one big mistake but from 20 small unilateral 'it's only $300' decisions. Both eyes on the sheet, monthly."
  },
  {
    "slug": "sales-pitch-15-min-buyer",
    "title": "Prep a 15-minute sales pitch for a specific buyer",
    "goal": "Walk into a 15-minute pitch meeting (in person, Zoom, or recorded video) with a tight narrative, a deck that earns its slides, three rehearsed objection answers, and a clear close.",
    "audience": "Founders selling B2B, account execs preparing for a first meeting with a named buyer, consultants pitching a scope.",
    "estimatedTime": "4-5 hours over 2-3 days.",
    "stack": [
      "Claude (pitch sharpening + objection prep)",
      "LinkedIn (buyer research)",
      "Slides tool (Google Slides, Keynote, or Pitch)",
      "A timer"
    ],
    "steps": [
      {
        "step": "Step 1 · Buyer reconnaissance",
        "what": "Know who's actually in the room before you write a single slide.",
        "prompt": "I have a 15-minute pitch in [days] with [buyer name] at [company]. Their role: [title]. Help me build a buyer profile. Ask me what I already know, then tell me what to research before the meeting: 1) their company's recent news (last 90 days), 2) their team size and reporting structure, 3) what they've publicly said about the problem space (podcasts, posts, conference talks), 4) which adjacent vendors they're already using (signals what they value), 5) any mutual connections to mention, 6) their likely budget authority level (signs to look for), 7) their likely top 2 priorities this quarter. Tell me which 3 of these I MUST confirm before the meeting and which are nice-to-have."
      },
      {
        "step": "Step 2 · The one-sentence pitch (their language, not mine)",
        "what": "Reframe the pitch in their words, not your features.",
        "prompt": "I'm selling [product/service — describe in 3 sentences]. Based on the buyer profile [paste], rewrite my pitch in their language. Format: 'We help [their specific role] [achieve their specific outcome] without [the painful tradeoff they currently make].' Give me 5 versions varying which outcome and which tradeoff. Recommend one. Test: would this sentence make sense to the buyer if I removed my product name? If yes, it's about them. If no, it's still about me."
      },
      {
        "step": "Step 3 · 7-slide deck (or fewer)",
        "what": "Constraint: 7 slides max for a 15-minute meeting. Anything more, you're presenting, not conversing.",
        "prompt": "Design a 7-slide deck for my 15-minute pitch. Buyer [paste profile]. Pitch [paste one-sentence]. Slides: 1) Cover with their company logo + meeting purpose in 6 words, 2) The problem in their language (with one stat or quote they'd recognize), 3) Why this problem is harder now than 2 years ago (urgency), 4) Our approach in one diagram + one sentence, 5) Proof — one named customer outcome with a real metric (NOT a logo wall), 6) What we'd specifically do for [their company] in the first 30/60/90 days, 7) Close + ask (specific next step, not 'let's stay in touch'). Each slide: title + 3 bullet max + visual cue. No more. 15 minutes = 7 slides = 2 min average per slide WITH conversation time."
      },
      {
        "step": "Step 4 · Three killer questions",
        "what": "Great pitches end with conversation, not monologue. Prep your discovery questions.",
        "prompt": "Build my 3 killer discovery questions to ask in the meeting (after slide 3, before slide 6). Based on buyer [paste], each question should: 1) reveal their current solution and its pain (not 'what do you use today' — too generic), 2) reveal their decision criteria and who else cares (signs of urgency and budget authority), 3) reveal what success looks like for them personally in the next 6 months (their career bet). Give me the question + the follow-up if they answer briefly + what the answer pattern tells me about deal viability."
      },
      {
        "step": "Step 5 · Objection playbook (top 5)",
        "what": "Pre-rehearse the answers to the 5 objections they will raise.",
        "prompt": "Anticipate the 5 most likely objections based on buyer profile [paste] and my product [paste]. Likely candidates: 1) 'We're already evaluating [competitor],' 2) 'Budget is locked for the year,' 3) 'We tried something like this and it failed,' 4) 'Sounds great but we don't have bandwidth to implement,' 5) 'Can you do it cheaper?' or 'What's your enterprise pricing?' For each, write a 2-3 sentence response that: acknowledges (not dismisses), reframes around their outcome, ends with a question that keeps the conversation going. No 'happy to discuss further' platitudes. Real answers."
      },
      {
        "step": "Step 6 · The close",
        "what": "What specifically are you asking for at the end? 'Stay in touch' is not a close.",
        "prompt": "Design my close. Given buyer authority level [paste] and meeting context [paste], what is the highest-value commitment I can realistically ask for in this meeting? Options: 1) a paid pilot or trial scope (specific dollar amount + timeline), 2) a follow-up working session with their technical team next week, 3) intro to 2 named stakeholders in their org, 4) commitment to a written proposal by [date]. Recommend ONE. Give me the exact close language. Then give me the fallback ask if they hesitate. Then give me what I'll send within 4 hours of the meeting ending — the follow-up email template."
      },
      {
        "step": "Step 7 · Timed dry run",
        "what": "Real run-through with a timer. Anything over 14 minutes gets cut.",
        "prompt": "Run me through a timed mock pitch. I'll speak through each slide and then paste a transcript or summary. For each slide, time check: did I spend appropriate time? Did I sound like I was reading vs talking? Did I leave room for questions? After the full run, total time check — if I went over 14 minutes, tell me which slide to cut content from (not which slide to delete entirely). Then run 3 mock objections from my playbook [paste] and critique my responses. Score the run: would the buyer commit to next steps? Yes/no with reason."
      },
      {
        "step": "Step 8 · Day-of logistics",
        "what": "What to wear, what to bring, what to do in the 30 minutes before.",
        "prompt": "Day-of plan. Meeting at [time]. Cover: 1) tech check (if remote — camera angle, lighting, audio test, backup phone hotspot), 2) what to have open in tabs (deck, CRM notes on buyer, my one-sentence pitch as a sticky), 3) what to do 30 minutes before (review buyer profile, NOT new prep — anchoring on what I already know), 4) what NOT to do (no last-minute deck edits, no coffee #4), 5) the one-sentence frame to say to myself before joining ('I'm not selling — I'm finding out if this is a fit'). Calm wins."
      }
    ],
    "outcome": "A 7-slide deck, 3 discovery questions, 5 rehearsed objection answers, a specific close, a follow-up email pre-drafted, and a timed mock that came in under 14 minutes.",
    "trap": "Building a 30-slide masterclass for a 15-minute meeting. They didn't book 15 minutes to watch your product tour. They booked it to decide if you're worth a second meeting. Earn the next one."
  },
  {
    "slug": "business-plan-advisors",
    "title": "Write a business plan good enough to show advisors",
    "goal": "Produce a 10-15 page business plan that withstands real questions from advisors, investors, or a serious mentor — not a thesis-style 60-page tome, not a pitch deck.",
    "audience": "First-time founders, side-project people considering going full-time, anyone who's been told 'send me your business plan' and needs to send one this month.",
    "estimatedTime": "8-12 hours over 1-2 weeks.",
    "stack": [
      "Claude (drafting + critique)",
      "Google Docs or Notion",
      "Optional: SCORE or local SBDC advisor for free human review"
    ],
    "steps": [
      {
        "step": "Step 1 · The 5-question core",
        "what": "Before any writing, answer the 5 questions every advisor will ask.",
        "prompt": "I'm writing a business plan for advisor review (not investor pitch). Help me answer the 5 questions every advisor asks before anything else: 1) Who specifically is the customer (not 'small businesses' — a real persona), 2) What painful problem do they have today and how do they solve it badly now, 3) What's your specific solution and why now (what changed in market/tech/regulation), 4) How will you make money (specific model — subscription, transactional, etc — with one realistic price point), 5) Why are YOU the person to do this (skills, unfair advantage, scar tissue). Ask me each question and refuse to move on until each answer is concrete. 'We help small businesses with AI' fails all 5."
      },
      {
        "step": "Step 2 · Executive summary (write this last but draft now)",
        "what": "A one-pager that conveys what, who, why now, and the ask.",
        "prompt": "Draft a 1-page executive summary. Based on my core answers [paste], cover: 1) the business in one sentence (Mad Libs: 'We help [customer] [do what] [how it's different]'), 2) the problem (3 sentences with one stat I'll verify), 3) the solution (3 sentences), 4) market size (only state what I can defend — bottom-up if possible, not 'TAM is $50B'), 5) traction so far (real numbers or 'pre-launch with X validation'), 6) team in 2 sentences, 7) the ask (what I want from the reader — advice on X, intro to Y, capital of Z). Honest tone. No 'revolutionary disruptive AI-powered.'"
      },
      {
        "step": "Step 3 · Market analysis (defensible)",
        "what": "Advisors smell BS in market sizing. Build a defensible number.",
        "prompt": "Help me size my market honestly. Based on my customer [paste]: 1) Build a bottom-up market estimate: # of target customers × % I could realistically reach × annual contract value = serviceable market. Show the math. 2) Tell me where to find each number (industry reports, public data, IRS stats, LinkedIn search counts, etc) — give me search terms, not 'do research.' 3) Identify the 3 closest competitors and what they reveal: who's buying this kind of thing today, at what price, at what scale. 4) Honest assessment: if my bottom-up TAM is under $100M, is this a venture-fit business or a profitable small business? Both can be great — but advisors will ask. Tell me what I'm building."
      },
      {
        "step": "Step 4 · Competitive landscape (no logo wall)",
        "what": "Identify real competitors and explain how you win without trash-talking.",
        "prompt": "Map my competitive landscape. Based on my product [paste] and customer [paste]: 1) Direct competitors (same solution, same customer) — name 3-5 with one-line description and rough scale. 2) Indirect competitors (different solution, same job-to-be-done — including spreadsheets, manual processes, doing nothing). 3) Adjacent — companies that could enter this space. 4) For my top 3 direct competitors, write a 2-column comparison: their advantage / my advantage. Force me to be honest about their strengths. 5) The one sustainable wedge I have that's hard to copy. If I can't name it, I don't have one yet — flag that."
      },
      {
        "step": "Step 5 · Business model + unit economics",
        "what": "Show the math at unit level. One customer, one purchase, one year.",
        "prompt": "Build my unit economics page. For my model [paste]: 1) Revenue per customer per year (price × frequency or ARR), 2) Direct cost to serve one customer (hosting, fulfillment, support hours × my hourly cost, third-party fees), 3) Gross margin %, 4) Customer acquisition cost — honest estimate based on what I've spent OR comparable industry figures, 5) Payback period (CAC ÷ monthly gross profit), 6) Churn assumption + LTV calc (LTV = ARPU × gross margin ÷ churn). Mark every assumption [ASSUMPTION] vs every real number [MEASURED]. Advisors will pressure-test these. Be ready."
      },
      {
        "step": "Step 6 · Go-to-market — the first 100 customers",
        "what": "Don't write 'we'll use social media and content marketing.' Write how you'll get customers 1-100.",
        "prompt": "Draft my GTM section, focused on the path to the first 100 paying customers. Not 1,000 — 100. For each of the first 3 channels I'll use: 1) the channel specifically (e.g. 'LinkedIn outbound to founder-stage SaaS CEOs,' not 'social media'), 2) the playbook in 4 sentences, 3) realistic conversion math (X impressions → Y conversations → Z customers), 4) the cost per customer through this channel, 5) why this channel matches my customer's actual habits. Then: what triggers the second 100 (when the first channel starts to saturate, what's next). Be specific. Vague GTM is the #1 reason advisors say 'come back when you've talked to customers.'"
      },
      {
        "step": "Step 7 · Financial projections (3 years, conservative)",
        "what": "A defensible 36-month projection. Not hockey-stick fantasy.",
        "prompt": "Build a 3-year financial projection. Use my unit economics [paste] and GTM [paste]. Output a table with monthly granularity for year 1, quarterly for years 2-3, columns: New Customers, Total Customers, MRR/Revenue, Gross Margin, OpEx (salaries, tools, marketing, other), Net, Cumulative Cash. Assumptions to state explicitly: monthly customer growth %, churn %, ARPU, CAC, headcount plan, salary levels (real numbers including mine if relevant). Conservative scenario only — no upside. Then list the 5 assumptions an advisor will challenge first and how I'd defend them. If I can't defend 5/5, my projection isn't ready."
      },
      {
        "step": "Step 8 · Team + risk section",
        "what": "Real team, real risks. Don't hide what's missing.",
        "prompt": "Draft my team and risk sections. Team (1 page): for each founder/key person, a 4-sentence bio focused on relevance to THIS business (not full career), + named gaps (e.g. 'we need a technical co-founder by month 6' — say it). Risk section (1 page): list 5 specific risks. For each: 1) the risk in one sentence, 2) what would need to be true for it to actually materialize, 3) what we'd do if it did, 4) what we're doing now to reduce probability. Categories: market, execution, regulatory, team, technology. Vague risks like 'competition' fail. 'Anthropic could enter our market with a free tier within 18 months because [reason]' passes."
      },
      {
        "step": "Step 9 · The ask + appendix",
        "what": "What you want from this reader. And the data backup.",
        "prompt": "Write the final 'Ask' page. Be specific about what I want from each reader type: 1) For advisors — the 2 specific questions I want them to answer (not 'general feedback'), 2) For mentors — the 1 intro I want, 3) For investors (only if applicable) — round size, valuation expectation, milestones to next round. Then list the appendix items I should attach: customer interview notes, prototype screenshots, signed LOIs if any, founding team CVs, key contract templates. The plan is short; the appendix is where evidence lives."
      },
      {
        "step": "Step 10 · Hostile read pass",
        "what": "Have Claude attack the plan. Better here than in the meeting.",
        "prompt": "You are a skeptical advisor with 25 years of experience. You've seen 1,000 business plans. Read my full draft [paste]. List the 10 sharpest questions you'd ask in our meeting — the ones designed to find weakness. For each: the question + why an advisor would ask it + my best one-paragraph answer. Mark any question I can't answer well — those become homework before I send the plan to anyone. No softball questions. The point is to find weakness now, not on Tuesday."
      }
    ],
    "outcome": "A 10-15 page plan, defensible numbers, identified gaps, an appendix of supporting evidence, and a list of pre-anticipated tough questions with rehearsed answers.",
    "trap": "Writing a 60-page document with a hockey-stick projection no one believes. Advisors want to see thinking, not volume. If they want depth on one section, they'll ask. Make them ask."
  },
  {
    "slug": "solo-trip-2-weeks",
    "title": "Plan a 2-week solo trip · including real bookings",
    "goal": "Walk away with a 14-day itinerary, all transport and lodging booked, daily plan flexibility built in, and an emergency-info packet. A real trip, not a Pinterest board.",
    "audience": "First-time solo travelers, returning travelers post-pandemic, anyone who's been 'planning a trip' in their head for 2 years.",
    "estimatedTime": "8-12 hours over 1 week.",
    "stack": [
      "Claude (research + planning)",
      "Booking.com / Hotels.com / Airbnb",
      "Google Flights or Skyscanner",
      "Rome2Rio (ground transit)",
      "TripIt or Notion (the master itinerary)",
      "Your bank app + a travel-friendly card"
    ],
    "steps": [
      {
        "step": "Day 1 · Trip thesis + non-negotiables",
        "what": "What is this trip FOR? Pick one anchor. Don't plan a trip that tries to be everything.",
        "prompt": "I'm planning a 2-week solo trip. Help me lock the thesis. Ask me: 1) the dominant feeling I want from this trip (rest, awe, growth, adventure, reset, learning, hedonism — pick ONE), 2) the season or specific dates, 3) total budget all-in (flights + lodging + ground + food + activities + contingency), 4) physical pace tolerance (slow + few cities vs fast + many), 5) social tolerance (hostels and group activities vs hotels and solo time), 6) one experience I'd be sad to miss, 7) any hard constraints (dietary, mobility, language, visa, vaccinations needed, medications that need refrigeration), 8) places I've already been or specifically don't want to go. Don't suggest destinations yet — first lock the thesis."
      },
      {
        "step": "Day 2 · Destination shortlist (3 candidates)",
        "what": "Generate 3 strong candidates that match the thesis, then commit to one.",
        "prompt": "Based on thesis [paste], propose 3 destination candidates for a 2-week solo trip. For each: 1) the country/region + recommended cities or route, 2) why it matches my thesis specifically, 3) total trip cost estimate (low/mid/high) for my budget [paste], 4) safety for solo travelers (specific concerns, not 'generally safe'), 5) language friction level for English speakers, 6) visa/entry requirements for [my passport — ask me], 7) the one downside I'd want to know upfront. Then push me to commit to one. The other two go in a 'next trip' note."
      },
      {
        "step": "Day 3 · Route + city allocation",
        "what": "Don't try to do 7 cities in 14 days. Pick 3-4. Build the route.",
        "prompt": "Build my route. Destination [paste]. 14 days. Apply the 'no more than 4 cities' rule for a real-feeling trip. For my chosen places: 1) recommended # of nights per city (minimum 3 in each unless it's a transit stop), 2) the route order that minimizes backtracking, 3) the ground transit between each (train, bus, flight, ferry) — actual estimated time, not Google Maps best-case, 4) which city to fly INTO and which to fly OUT of (often different = cheaper), 5) one day of buffer somewhere for either rest or unexpected delay. Output as a 14-day grid with one line per day showing city + status (settle / explore / move / depart)."
      },
      {
        "step": "Day 4 · Flights — book the bones",
        "what": "Lock the inbound and outbound flights first. Everything else flexes around them.",
        "prompt": "Help me book flights. Route [paste] — flying into [city A] and out of [city B]. Dates: [paste]. My constraints: [budget for flights, max layover hours, frequent flyer program if any, preferred airline alliance if any]. Walk me through: 1) which day of week is typically cheapest for this route, 2) which booking sites to check (and whether to book direct with the airline or through OTA), 3) the price range I should accept vs hold out for, 4) seat selection strategy (long-haul especially), 5) checked vs carry-on for 2 weeks (with my non-negotiables [paste]), 6) the 2 things to verify on the e-ticket the moment it's confirmed (passport name match, layover transit visa if needed). I'll book today."
      },
      {
        "step": "Day 5 · Lodging — book all 3-4 stays",
        "what": "Book lodging in order of demand. Tourist-dense cities first.",
        "prompt": "For each city in my route [paste], help me pick and book lodging. For each: 1) neighborhood to stay in for a first-timer (specific name, not 'city center') + why, 2) neighborhood to AVOID, 3) hotel vs hostel vs apartment given my social tolerance [paste], 4) budget per night realistic for that city + neighborhood, 5) the 3 things to check before clicking book (cancellation policy, distance from main station, recent review patterns), 6) any specific properties known for being solo-traveler friendly. Order cities by how fast they book up (festivals, summer peaks). I'll book in that order. Use Booking.com or Hotels.com unless apartments make more sense — give me the link pattern, not 'Google it.'"
      },
      {
        "step": "Day 6 · Day-by-day skeleton",
        "what": "Each day gets one anchor + one option + one fallback. Not a minute-by-minute plan.",
        "prompt": "Build a 14-day skeleton itinerary. For each day, give me: 1) one anchor activity (the thing I'd be sad to miss in that city — the cathedral, the hike, the museum, the food market), 2) one optional add-on if energy is high (a nearby second thing), 3) one low-energy fallback (a café, a park, a walk) if I'm tired, 4) the meal recommendation for that day (one specific restaurant or food experience worth the booking), 5) one practical (where to buy a metro pass, where to get cash, etc). Don't over-schedule — solo trips die from optimization. Leave the afternoons unscheduled on at least 4 of the 14 days."
      },
      {
        "step": "Day 7 · Bookings that require advance reservations",
        "what": "Some things sell out. Book them this week. The rest, day-of.",
        "prompt": "From my skeleton [paste], identify which activities require advance booking (museums, popular restaurants, trains, day tours, time-slot entry to attractions). For each: 1) how far in advance to book, 2) the official booking source (not a third-party tour reseller unless explicitly better), 3) cost, 4) cancellation policy, 5) what to print or screenshot before traveling. Output as a list with deadlines. Anything not on this list is day-of decision — protect the flexibility."
      },
      {
        "step": "Day 8 · Money + tech + connectivity",
        "what": "Get the boring infrastructure right. It saves the trip in week 2.",
        "prompt": "Pre-trip logistics check. Cover: 1) which card to use for foreign transactions (no FX fees) + which to leave at home, 2) cash strategy — how much local currency to get before vs at ATM on arrival, 3) phone plan options (international roaming vs eSIM like Airalo vs local SIM) with cost ranges for 14 days, 4) which apps to download BEFORE traveling (offline maps via Google Maps or Maps.me, translation, transit, ride-share, currency converter), 5) backup of important docs (passport scan in email + cloud + with one trusted contact at home), 6) telling my bank I'm traveling so cards don't freeze."
      },
      {
        "step": "Day 9 · Safety + emergency packet",
        "what": "The packet you hope you never open.",
        "prompt": "Build my emergency packet. Solo traveler in [destinations]. Include: 1) embassy or consulate addresses + phone for my country in each city I'll be in, 2) the local equivalent of 911 in each country, 3) one trusted contact at home (their phone + email) who has my full itinerary, 4) travel insurance details + claim phone (if I don't have insurance yet, recommend 2 options for solo travel with health coverage), 5) the 3 scams most common in my destinations + how to avoid, 6) the 2 areas in each city to avoid at night, 7) protocol if I lose my passport (steps in order). Format printable, one page. I'll also leave a copy with my home contact."
      },
      {
        "step": "Day 10 · Packing list (for 2 weeks carry-on)",
        "what": "Pack light. Doing laundry once mid-trip is fine and frees you up.",
        "prompt": "Build my packing list for 14 days carry-on only. Climate [paste destinations + season]. My non-negotiables [paste]. Categories: 1) clothing (count of each item — e.g. '5 shirts, 2 bottoms, 1 jacket' — with the rule that I'll do laundry once around day 7), 2) toiletries (TSA-friendly sizes, label which to refill on arrival vs bring), 3) electronics + adapters for [destination plug type], 4) docs (passport, visa, insurance card, vaccination if needed, printed itinerary), 5) medications (any with refrigeration or controlled-substance rules for my destination), 6) the 3 items first-time solo travelers always wish they brought (and the 3 they overpack and regret). Carry-on dimensions vary by airline — use [my airline]'s limits."
      },
      {
        "step": "Day 11-13 · Pre-departure final pass",
        "what": "Three days out: confirm everything. Two days out: pack. One day out: rest.",
        "prompt": "Build the 3-day pre-departure checklist. Day -3: confirm all bookings (flights, lodging, advance-booked activities), check entry requirements one more time (rules change), download offline maps, print emergency packet. Day -2: pack carry-on, set out-of-office, share final itinerary with home contact, get foreign currency from bank. Day -1: light day, hydration, early sleep, double-check passport + cards in carry-on bag, charge all devices, confirm airport transport. Day 0: airport 3 hours before international departure."
      }
    ],
    "outcome": "Booked flights and lodging, a 14-day skeleton itinerary with anchor activities, an emergency packet, a packed carry-on, and protected flexibility for the days that want to surprise you.",
    "trap": "Over-scheduling the itinerary minute by minute. Solo trips are partly about the unscheduled afternoon when you sit at a café and the trip actually happens. Plan the anchors. Leave space around them."
  },
  {
    "slug": "draft-will-lawyer-review",
    "title": "Draft a will (then take it to a lawyer for review)",
    "goal": "Produce a clear, well-organized draft will that captures your intent — beneficiaries, executor, guardians, specific bequests, healthcare directives — that you'll take to an estate attorney for final review and execution. NOT a self-executed will.",
    "audience": "Adults who've been putting this off for years, new parents, anyone with assets, a partner, kids, or a pet to think about.",
    "estimatedTime": "3-5 hours over a weekend.",
    "stack": [
      "Claude (drafting + question prompting)",
      "A list of your accounts and assets",
      "A licensed estate attorney in your jurisdiction (REQUIRED — see step 8)"
    ],
    "steps": [
      {
        "step": "Step 0 · Read this disclaimer first",
        "what": "Set expectations honestly before starting.",
        "prompt": "Before we start, state clearly: 1) An AI-drafted will is a DRAFT for attorney review — never a self-executed legal document. Wills have state-specific requirements for witnesses, notarization, signing order, and self-proving affidavits that vary by jurisdiction and change over time. 2) I will need a licensed estate attorney in my state to review, refine, and execute the final document. 3) The cost of a basic will from an attorney is typically $300-$1,500 in the US depending on complexity and location — a fraction of what intestate succession or a contested estate costs. 4) Confirm I understand all of this before we proceed. We are organizing my intent so the attorney meeting is faster, cheaper, and more accurate — not replacing the attorney."
      },
      {
        "step": "Step 1 · Personal + family inventory",
        "what": "Get the people right first. Names, relationships, ages, addresses.",
        "prompt": "Help me build the personal inventory my will needs. Ask me, one at a time: 1) my full legal name as it appears on government ID, current address, date of birth, 2) my marriage/partnership status and spouse/partner's full legal name + DOB, 3) all children (biological, adopted, stepchildren — name them all, DOB, address), and whether any are minors, 4) any dependents who are not children (elderly parent, disabled sibling), 5) parents and siblings if I'd want any included as contingent beneficiaries, 6) any prior marriages or estranged relationships that could create disputes, 7) any minor children's other parent's status (alive, parental rights, etc — this affects guardianship). No judgment, just facts. The will needs to handle the reality, not the wish."
      },
      {
        "step": "Step 2 · Asset inventory",
        "what": "List everything you own. Not just the big things — the things that matter to specific people too.",
        "prompt": "Build my asset inventory in categories: 1) Real estate (property, address, mortgage status, sole or joint title), 2) Financial accounts (bank, brokerage, retirement — list each with rough value range and any beneficiary designations already in place because those override the will), 3) Insurance policies with named beneficiaries, 4) Vehicles, 5) Business interests (LLC stakes, partnerships, IP, royalties), 6) Digital assets (crypto, domain names, online accounts with monetary value — and login access for the executor), 7) Personal property of meaningful value (jewelry, art, collectibles), 8) Personal property of sentimental value (the watch from my grandfather, my grandmother's recipe book — these matter to families more than the dollar value suggests), 9) Debts (mortgages, loans, lines of credit). For each, note current ownership structure — sole, joint with right of survivorship, in trust. These structures often determine what actually passes through the will."
      },
      {
        "step": "Step 3 · Executor + guardians (the people decisions)",
        "what": "Who runs the estate, who raises the kids, who decides if you can't.",
        "prompt": "Walk me through the people decisions. For each, ask me the candidate and the backup, then help me think about whether they're truly the right choice: 1) Executor (the person who manages estate administration — should be organized, willing to do paperwork, geographically reasonable, ideally younger or healthier than me, not a beneficiary if possible to avoid conflict). Suggest the qualities to weigh. 2) Guardian for any minor children (separate from the trustee who'd manage their money — these can be the same person but often shouldn't be). Considerations: values alignment, age, willingness, geographic stability. 3) Trustee for any inheritance to minors or beneficiaries who need oversight. 4) Healthcare proxy and power of attorney for finances (these are separate documents but the attorney should prepare them at the same time — flag them now). For each, name one backup. People die or decline. Never leave a single point of failure."
      },
      {
        "step": "Step 4 · Distribution plan",
        "what": "Who gets what. Default residual + specific bequests + contingencies.",
        "prompt": "Build my distribution plan. Three layers: 1) Specific bequests — particular items or amounts to particular people (e.g. 'my grandmother's ring to my niece Mira,' '$10,000 to my brother John'). List as many as I want to include. 2) Residual estate — what happens to everything left after specific bequests. Common options: all to spouse, then split equally to children; or split now between spouse and children; or to a trust. Help me think through tradeoffs. 3) Contingencies — what happens if a beneficiary dies before me, or simultaneously with me (the 'simultaneous death' clause). What happens if all primary beneficiaries are gone — typically charitable or extended family. 4) Anyone explicitly disinherited (must be named to prevent later 'forgot about me' claims). Be specific. Vague will = court fight."
      },
      {
        "step": "Step 5 · Special situations",
        "what": "The things people forget that cause problems later.",
        "prompt": "Cover special situations that often get missed. For each, ask if it applies to me and what I want: 1) Pets — who takes them, and any funds set aside for their care (pet trusts exist in most US states), 2) Funeral and burial wishes — burial vs cremation, location, any specific instructions, though these go in a separate letter not the will itself, 3) Digital legacy — what should happen to social media accounts, photos in the cloud, password managers, 4) Charitable bequests — specific orgs (verify legal names + EINs before the attorney meeting), 5) Letters of intent — non-legal documents that explain WHY to beneficiaries (often more meaningful than the dollar amount), 6) Anyone I want to receive nothing — and whether I want to acknowledge them in the will or leave them out silently (state laws vary on which is safer), 7) International assets or beneficiaries (these often need separate planning in that jurisdiction)."
      },
      {
        "step": "Step 6 · Healthcare directives + power of attorney",
        "what": "These aren't part of the will, but the attorney will prepare them together. Capture intent now.",
        "prompt": "Capture intent for the companion documents the attorney will prepare alongside the will. 1) Healthcare proxy / medical power of attorney — who makes medical decisions if I can't (often spouse, with backup). 2) Living will / advance directive — my wishes on life-prolonging treatment, resuscitation, feeding tube, comfort care. Walk me through the standard questions so I have answers ready (don't just say 'I'll think about it' — write a draft answer for each, the attorney refines later). 3) Financial power of attorney — who handles bills, accounts, taxes if I'm alive but incapacitated. Often separate from executor. 4) HIPAA authorization — who can access my medical records. These four typically get drafted with the will. Listing now means the attorney bills less."
      },
      {
        "step": "Step 7 · Draft the document",
        "what": "Generate the actual draft will document with all sections.",
        "prompt": "Produce a draft will document organized as the attorney will expect to see it. Include sections: 1) Identification (my full legal name, address, declaration that this is my last will and testament, revocation of prior wills), 2) Family identification (spouse, all children including any from prior relationships), 3) Appointment of executor + alternate + bond waiver if I want, 4) Specific bequests (numbered list), 5) Residuary clause, 6) Guardianship for minors + alternate (if applicable), 7) Trust provisions if any (for minors' inheritances especially), 8) Powers granted to executor (broad standard language), 9) Tax allocation clause, 10) Survivorship clause (typically 30 days), 11) Simultaneous death clause, 12) No-contest clause if I want one, 13) Signing block + witness block + notary block (state-specific — attorney will finalize). Mark every section [DRAFT — ATTORNEY TO REVIEW] and flag any decisions I deferred. Use clear plain language; the attorney will tighten the legal phrasing."
      },
      {
        "step": "Step 8 · Find and meet with a licensed estate attorney",
        "what": "This step is non-negotiable. Take the draft to a real lawyer in your state.",
        "prompt": "Help me find the right attorney. 1) State I live in [paste]. Look up: how to find a board-certified estate planning attorney in my state (state bar referral, NAELA, ACTEC fellow lists — give me the specific resources). 2) The 5 questions to ask in the consultation (typically free) before hiring: total flat fee for will + powers of attorney + healthcare directive, experience with my specific situation (blended family, business, etc), how they handle revisions later, whether they offer trust planning if my estate suggests it, what documents I should bring to the engagement meeting. 3) Red flags: hourly billing for a simple will, no flat fee option, refusal to give clear pricing, no recent CLE in estate law. 4) After signing engagement, send the attorney my draft [paste from Step 7] and inventory [paste from Steps 1-2] before the first working meeting. This cuts attorney time and fees significantly. 5) After execution, where to store the original (NOT a bank safe deposit box without co-access), who to tell, and how often to review (every 3-5 years or after major life events)."
      }
    ],
    "outcome": "A draft will that captures your full intent, accompanying healthcare directive and power of attorney intent, a list of attorney candidates, a documented inventory of assets and people. You walk into the attorney's office 80% prepared.",
    "trap": "Treating an AI-drafted will as executable. It is not. State law requires specific witness/notary protocols, self-proving affidavits, and execution formalities that AI cannot reliably handle and that change. The draft is for clarity and attorney efficiency. The final document comes from a licensed attorney in your jurisdiction."
  },
  {
    "slug": "personal-finance-dashboard-csv",
    "title": "Build a personal finance dashboard from your CSV exports",
    "goal": "Build a private spreadsheet dashboard that ingests your monthly bank/credit/brokerage CSV exports and shows: net worth trend, spending by category, savings rate, debt payoff trajectory, and 3 monthly action triggers.",
    "audience": "People who don't want to give Mint/Rocket/etc their bank credentials, hate manual entry, and have CSV exports sitting in a Downloads folder doing nothing.",
    "estimatedTime": "4-6 hours one weekend + 30 minutes per month thereafter.",
    "stack": [
      "Claude (formula writing + category logic)",
      "Google Sheets OR Excel",
      "CSV exports from each of your accounts (checking, savings, credit cards, brokerage)"
    ],
    "steps": [
      {
        "step": "Step 1 · Account inventory + export check",
        "what": "What accounts feed the dashboard, and can you actually get CSVs from each?",
        "prompt": "I'm building a personal finance dashboard from CSV exports. Help me inventory accounts. List the accounts I should include (ask me what I have): checking, savings, money market, credit cards, brokerage taxable, brokerage retirement (401k, IRA), HSA, student loans, mortgage, auto loan, BNPL accounts. For each, ask: 1) what's the institution, 2) does it offer CSV export (most do — walk me through the export menu path for the big banks/brokerages), 3) what's the typical CSV schema (which columns it includes — date, description, amount, balance, category), 4) export frequency I'll commit to (monthly is sustainable; weekly is fantasy). Build me a 'Sources' tab outline before any data goes in."
      },
      {
        "step": "Step 2 · Spreadsheet structure",
        "what": "Design the tabs before you build any. Bad structure ruins everything later.",
        "prompt": "Design my dashboard's tab structure. Recommended tabs: 1) Sources (account inventory + last-imported date), 2) Transactions (the raw imported data from all sources stacked + a date + a source column + my category column), 3) Categories (a single editable list of my categories and rules), 4) Accounts (current balance per account, manually updated monthly), 5) Net Worth (monthly snapshot — Assets total, Liabilities total, Net Worth, computed from Accounts), 6) Monthly Spend (pivot of Transactions by category by month), 7) Dashboard (the one tab I'll actually look at — top metrics + 4 charts). For each tab, give me the column headers and the relationship to other tabs (which tab feeds which). Output as a structure spec I'll build today."
      },
      {
        "step": "Step 3 · Category schema",
        "what": "Pick 12-18 categories. Not 50. Not 5.",
        "prompt": "Design my category schema. Goal: enough granularity to surface insight, few enough categories that I'll actually maintain it. Propose 12-18 categories grouped: 1) Fixed essential (housing, utilities, insurance, debt minimums, transportation if essential), 2) Variable essential (groceries, gas, household), 3) Discretionary (dining, entertainment, shopping, subscriptions, travel, hobbies), 4) Income (salary, side income, investment, other), 5) Transfers (between my own accounts — NOT spend, must be excluded from spend reports), 6) Savings/investing contributions (these are not spending — separate category), 7) One-time + irregular (medical, gifts, taxes, big purchases). For each, give me example transactions that belong. Then propose the 5-10 keyword rules I'll use to auto-categorize incoming CSV rows in Step 5."
      },
      {
        "step": "Step 4 · Transactions tab + import workflow",
        "what": "The mechanical part: how CSVs become rows in your master Transactions tab.",
        "prompt": "Walk me through the import workflow. My Transactions tab columns: Date, Description, Amount (signed: negative = outflow, positive = inflow), Source Account, Category, Notes, MonthYearKey (formula). For each CSV export from a different bank, the columns may differ. Build me: 1) a small staging tab per institution where I paste the raw CSV (e.g. 'Import_Chase,' 'Import_Vanguard'), 2) for each, a formula to map their column order to my standardized schema and append to the master Transactions tab. 3) A 'Last Imported Date' column on the Sources tab that I'll manually update. 4) De-dupe logic — if I import overlapping date ranges, what flags duplicates. Sustainable rule: imports happen on the 1st of each month for the prior month. Walk me through the sheet formulas explicitly."
      },
      {
        "step": "Step 5 · Auto-categorization formulas",
        "what": "Most transactions can be auto-categorized by description keywords. Build the rules.",
        "prompt": "Build the auto-categorization layer. On my Transactions tab, the Category column should look up against the rules in my Categories tab. Walk me through: 1) Build a 'Rules' table on the Categories tab with columns: Keyword (text the rule looks for in Description), Category, Subcategory (optional), Note. 2) Pre-populate with 20-30 starter rules — common merchant names (Whole Foods → Groceries, Shell → Transportation/Gas, Netflix → Subscriptions, Vanguard → Investing/Contribution, etc). 3) Write the Google Sheets formula in the Category column that searches my rules table for any keyword match in the Description and returns the category, else 'UNCATEGORIZED.' 4) Build a count of UNCATEGORIZED on the Sources tab — every month I'll review those and either categorize manually or add a new rule. Iteration is the system."
      },
      {
        "step": "Step 6 · Monthly Spend pivot + Net Worth tab",
        "what": "The two engines that drive the dashboard.",
        "prompt": "Build the analysis layers. 1) Monthly Spend tab: a pivot of Transactions where rows = Category, columns = MonthYearKey (last 12 months), values = SUM of Amount (filtered to outflows only — exclude transfers, savings contributions, and income). Give me the exact pivot-table or SUMIFS formula. 2) Net Worth tab: rows = each MonthYearKey (last 24 months), columns = each account from Accounts tab, plus a total Assets column and total Liabilities column, plus a Net Worth = Assets - Liabilities column. Manual entry monthly from account balances (not from transactions). Add a sparkline column or a simple chart spec for the trend. Give me the formula structure for both tabs."
      },
      {
        "step": "Step 7 · The Dashboard tab",
        "what": "The one tab you'll actually look at monthly. Six numbers and three charts.",
        "prompt": "Build the Dashboard tab — the only tab I'll look at each month. Top section: 6 metrics with current value + change vs prior month: 1) Net Worth, 2) Total Cash (checking + savings), 3) Total Investments, 4) Total Debt (excluding mortgage if I want — give me the option), 5) Last Month's Spending (excluding transfers/savings), 6) Savings Rate = (Income - Spending) / Income for the month. Below: 3 charts: 1) Net Worth trend last 24 months (line), 2) Spending by category last month (bar), 3) Spending category trend last 6 months (stacked bar or small multiples). At the bottom: 'Action Triggers' — 3 cells with conditional logic that flag: spending in [discretionary category X] exceeded last 3-month average by 25%, savings rate dropped below my target, any account balance below my minimum buffer. Give me the formulas."
      },
      {
        "step": "Step 8 · Monthly review protocol",
        "what": "30 minutes the first of every month. The protocol that keeps it alive.",
        "prompt": "Build my monthly review protocol — 30 minutes on the 1st of every month. Steps: 1) Export CSVs from each account for the prior month (10 min), 2) Paste into the staging tabs, append to master Transactions (5 min), 3) Update Accounts tab with current balances and the Net Worth tab with the new month row (5 min), 4) Review UNCATEGORIZED rows — either categorize manually or add rule (5 min), 5) Look at the Dashboard tab. Specifically: any Action Trigger fired? Net worth direction? One category surprise this month? (5 min). End with one decision: any action this month? Calendar block the 1st of every month, recurring. The point is consistent contact, not perfection."
      }
    ],
    "outcome": "A private spreadsheet you control, populated with your real data, with auto-categorization, a dashboard tab you scan in 5 minutes, and a 30-minute monthly ritual that keeps it real.",
    "trap": "Building Mint from scratch with 50 categories and 200 formulas. You'll abandon it in month 3. The dashboard that survives is the one you can update in 30 minutes."
  },
  {
    "slug": "salary-negotiation-14-days",
    "title": "Negotiate a higher salary in 14 days",
    "goal": "Walk into a salary negotiation conversation in 14 days with: defensible market data, a quantified case for your value, a target number + walk-away number, prepared scripts for the 5 most common pushbacks, and an honest read on your BATNA.",
    "audience": "Employees considering asking for a raise, candidates with a verbal offer or written offer in hand, anyone whose company review cycle is coming up.",
    "estimatedTime": "14 days, ~30-45 minutes per day. Most days are reflection + research, not active drilling.",
    "stack": [
      "Claude (prep + role-play)",
      "Levels.fyi, Glassdoor, Levels.fyi, Payscale (market data — triangulate, never trust one source)",
      "LinkedIn (relevant comp signals from current job postings)",
      "A trusted friend who can do a real mock conversation"
    ],
    "steps": [
      {
        "step": "Day 1 · Define the ask + the context",
        "what": "Are you asking for a raise, a counter on an offer, or a promotion increase? They're different conversations.",
        "prompt": "I want to negotiate a higher salary in 14 days. Help me clarify what kind of negotiation this is. Ask me: 1) Is this — a) a raise at current employer, b) a counter on a new offer, c) a promotion adjustment, d) a market-rate correction? 2) What's the conversation trigger (review cycle, offer deadline, my initiative)? 3) Who's the counterparty (direct manager, HR, hiring manager, recruiter)? 4) What's the realistic decision authority of that person — do they decide, or do they advocate to someone else who decides? 5) What's the relationship history (good, neutral, strained)? 6) What's the timeline — when does the conversation happen and when does a decision get made? Different answers lead to different playbooks. Don't generalize."
      },
      {
        "step": "Day 2 · Market data triangulation",
        "what": "Build a defensible number range from multiple sources.",
        "prompt": "Help me triangulate market data for my role. My role: [title, level if applicable, company size and stage, location — remote or specific city, years of experience]. For each: 1) walk me through how to pull the data from Levels.fyi (filter by company tier, location adjusted), 2) Glassdoor (filter by company size and location), 3) LinkedIn job postings actively hiring my role + level today (real comp ranges from current postings tend to be more honest than self-reported averages), 4) any industry-specific sources (e.g. for tech: Triplebyte/H1B disclosure data; for sales: RepVue). 5) For each source, what the median, 75th percentile, and 90th percentile look like. 6) The triangulated range I should anchor to — and the specific # I'll cite as 'market rate for my level and location.' Cite real ranges, not made-up numbers."
      },
      {
        "step": "Day 3 · Quantify your value (the receipts)",
        "what": "What did you actually do this year? In numbers.",
        "prompt": "Help me build the receipts case. For the last 12-18 months in my role, walk me through and document: 1) projects I led or major contributions to — for each, what was the measurable outcome (revenue, cost saved, time saved, customers acquired, performance improved, team grown)? 2) responsibilities that expanded beyond my original job description (took on what scope? from whom?), 3) cross-functional work or visibility (presented to whom, partnered with which teams), 4) external recognition (clients, customers, partners, awards), 5) skills acquired or certifications earned. For each, write a 1-2 sentence accomplishment with a NUMBER attached. 'Led project to redesign onboarding' → 'Led 4-month onboarding redesign that reduced day-7 churn by 18%, retaining ~$240K ARR annually.' If I don't have numbers, help me reconstruct estimates I can defend."
      },
      {
        "step": "Day 4 · The target + walk-away numbers",
        "what": "Pick three numbers: aspirational, target, and walk-away. Know them cold.",
        "prompt": "Set my three numbers. Based on market data [paste] and receipts [paste]: 1) Aspirational — what I'd ask for if I'm bold. Typically the top of market range, especially if my receipts justify it. This is the OPENING. 2) Target — the realistic number I'd accept and feel good about. The number I genuinely expect to land on. 3) Walk-away — the floor below which the answer is no, and I either decline the offer / start looking / accept the no but adjust my next move. Walk me through: which anchor (aspirational vs target) I should open with based on the context [paste from day 1]. The rule: never open with my target — opening = aspirational, landing zone = target."
      },
      {
        "step": "Day 5 · BATNA check (the alternative)",
        "what": "Best Alternative To Negotiated Agreement. What happens if they say no?",
        "prompt": "Be honest with me about my BATNA. If this negotiation fails — they offer less than my walk-away, or say no entirely — what specifically do I do? Walk me through: 1) Do I have other offers, active interviews, or warm intros I could activate? 2) If I'm at my current job and they say no, do I stay (and at what cost to motivation), do I start looking, do I escalate to skip-level? 3) What's my financial runway if I had to leave without another lined up? (3 months? 12?) 4) What signals does each option send back to my counterparty — and which do I want to send? My BATNA strength shapes how I open and how I push back. Weak BATNA = soft open + protect relationship. Strong BATNA = firmer open + willing to walk."
      },
      {
        "step": "Day 6 · Write the opening script",
        "what": "Draft the exact words. Practice them. Then never read them — just speak them.",
        "prompt": "Write my opening script for the negotiation conversation. Context [paste day 1]. Numbers [paste day 4]. Receipts [paste day 3]. The opening should: 1) Express genuine appreciation for the conversation (not flattery — sincere), 2) State the case with 2-3 of my strongest receipts, 3) Cite market data as third-party context (not 'I deserve' but 'market rate for this scope at this stage is X'), 4) State my number (aspirational from day 4), 5) Close with an open question, not a demand ('I'd love to walk through how we can get there' not 'I need an answer today'). Length: 60-90 seconds spoken. Write it as I'd actually say it, with the small pauses. Read aloud — if a sentence sounds like a press release, rewrite."
      },
      {
        "step": "Day 7 · Pushback playbook (top 5)",
        "what": "They will push back. Pre-rehearse the 5 most likely versions and your responses.",
        "prompt": "Build my pushback playbook. The 5 most common pushbacks: 1) 'That's above our band for your level,' 2) 'We just don't have budget for that this cycle,' 3) 'Comp is locked at the company level — I can't move it,' 4) 'You're already at the top of the range,' 5) 'Let's revisit in 6 months / next cycle.' For each: a) what's really being said (the actual situation behind the line), b) the 3-sentence response that acknowledges + reframes + opens space (no surrender, no escalation), c) the follow-up question that keeps the conversation going. Plus: signs I should drop the push and accept (vs signs to hold the line). Don't write me scripts to memorize — write me principles + sample language I'll adapt in the moment."
      },
      {
        "step": "Day 8-9 · Mock conversations",
        "what": "Two full mocks. One with Claude, one with a real human. The human mock matters more.",
        "prompt": "Run me through a full mock negotiation. You play [my manager / HR / recruiter — pick based on day 1 context]. Start the conversation as they would. Pressure-test my opening [paste]. Throw 3 of the pushbacks from my playbook [paste]. After 10 minutes of back-and-forth, give me a debrief: 1) when did I sound tentative vs anchored, 2) when did I argue vs explore, 3) when did I fill silence I should have let sit, 4) which pushback caught me weakest, 5) did I close on a clear next step. Then tell me to immediately schedule a mock with a trusted human friend — Claude can rehearse, only a human can read the actual social pressure. Don't skip the human mock."
      },
      {
        "step": "Day 10-11 · Refine + rest",
        "what": "Tighten what didn't work in the mocks. Then rest. Two days off prep.",
        "prompt": "Based on my mock debriefs [paste], identify the 2-3 things to tighten in my approach. Examples: a phrase that sounded apologetic, a number I undersold, a pushback I caved on too fast. Rewrite the relevant 30-second segment. Then — and this is the important part — tell me to STOP active prep for 2 days. Days 10-11 = rest. Light review only. Over-rehearsal makes the conversation sound stilted. The pieces are in my head; let them settle."
      },
      {
        "step": "Day 12 · Logistics + tone setting",
        "what": "Set up the actual meeting. Time, place, format, anchoring email if relevant.",
        "prompt": "Lock the logistics. Conversation is [day 14]. 1) Have I confirmed the meeting time + medium (in person / Zoom / phone) — best format for negotiation is rarely email; in-person or video preferred. 2) Should I send a pre-meeting email to anchor the topic? Sometimes yes ('I'd like to discuss my compensation alignment with market'), sometimes no (depends on relationship and context [paste]). Help me decide and draft if yes. 3) If it's a verbal offer call, am I prepared to NOT accept on the call ('I really appreciate this offer — can I take 48 hours to consider?')? 4) Day-of: what to wear, what to have in front of me (one note card with my 3 numbers + 3 receipts, that's it), what to do in the 30 minutes before."
      },
      {
        "step": "Day 13 · Final mental frame",
        "what": "One sentence to read before the conversation. Calm beats clever.",
        "prompt": "Help me set my mental frame. The conversation is tomorrow. Write me a single paragraph to read before walking in (or joining the call) that: 1) names what I'm actually doing (advocating for fair compensation, not asking for a favor), 2) reminds me of my best receipt (the one number that proves my case), 3) reminds me of my BATNA — I have options, this is not life-or-death, 4) sets the relational frame — this person is not my enemy, even if they push back; we're solving an equation together. No false confidence. Calibrated calm. The conversation goes better when I'm not in a story about winning or losing."
      },
      {
        "step": "Day 14 · The conversation + 24-hour follow-up",
        "what": "Have the conversation. Then send the right follow-up email within 24 hours.",
        "prompt": "After the conversation, debrief with me. I'll tell you what happened. Help me: 1) Identify what was actually said (vs what I felt was said — these differ when adrenaline is up). 2) Categorize the outcome: full yes, partial yes, no-but-soon, no-with-reason, no-without-reason. 3) Draft the follow-up email within 24 hours — even if the outcome was a yes, the written record matters. If yes: confirm terms + thanks + clear next step. If partial: thanks + restate what was agreed + the one remaining open item. If no-with-reason: thanks + ask for the specific milestones that would change the answer + explicit timeline for revisit. If no-without-reason: thanks + record + my honest next move (which I now decide). Send the email. The negotiation isn't done until the email is sent."
      }
    ],
    "outcome": "A negotiation conversation completed with prepared scripts, real data behind your number, rehearsed pushback responses, and a documented follow-up. Whether the outcome is yes, partial, or no, you have receipts and a clear next move.",
    "trap": "Treating the conversation as a one-shot performance. The negotiation is a relationship event. How you handle a 'no' affects the next opportunity. Calm professionalism in the face of pushback wins more raises over 18 months than any one perfect script."
  },
  {
    "slug": "family-reunion-20-people-4-days",
    "title": "Plan a family reunion · 20+ people, 4 days",
    "goal": "Organize a 4-day family reunion for 20+ people without losing your mind: venue locked, budget split fairly, dietary chaos managed, activity plan that doesn't try to herd cats, and a communication system that keeps Aunt Linda from texting you 47 times.",
    "audience": "The unwitting family member who said 'I'll plan it,' adult children planning a parent's milestone, anyone trying to get cousins from 4 states together for the first time in 15 years.",
    "estimatedTime": "4-6 months of light planning + ~20 hours of focused work.",
    "stack": [
      "Claude (logistics + diplomacy)",
      "A shared Google Doc + Google Sheet",
      "WhatsApp or group text (NOT Facebook events)",
      "Splitwise or similar for cost-sharing",
      "Vrbo / Airbnb / hotel block / lake house contact (the venue)"
    ],
    "steps": [
      {
        "step": "Month -6 · The Yes-No survey",
        "what": "Before booking anything, find out who's actually coming. Don't assume.",
        "prompt": "I'm planning a family reunion for ~20-30 people, 4 days. Help me design the initial yes-no survey. Goals: 1) Get a true headcount range (people will say 'maybe' — force into yes / no / strong maybe), 2) Surface non-negotiables before I book (allergies, mobility needs, religious holidays to avoid, single parents needing kid-friendly setup), 3) Get budget tolerance per family (don't pick a venue $200/night per family if half the cousins can't swing it), 4) Get date ranges, not single dates — find the overlap. Write the actual survey questions (10 max), the tone (warm but firm), the deadline (2 weeks to respond), and the channel (probably a Google Form linked from a group text — NOT a Facebook event). Include the line about why the deadline matters."
      },
      {
        "step": "Month -5 · Date + venue lock",
        "what": "Pick the date that maximizes attendance + the venue that fits the headcount and budget.",
        "prompt": "Based on survey results [paste headcount + budget range + date overlap]: 1) Pick the dates that maximize attendance (often a Thursday-Sunday in late summer, but depends — check school calendars across states the family lives in, work calendars, religious holidays). 2) Pick the venue type that fits the headcount + budget: a) a large rental house (Vrbo/Airbnb for 12-30 — best vibe, kitchen, no restaurants every night), b) a hotel block with a common room (for groups that want privacy), c) a cabin compound at a state park or lake (mid-budget, outdoor-friendly), d) a beach or lake town with individual rentals + one big shared house for meals. For each, give pros, cons, typical cost range for our group size and dates. Recommend one. Then walk me through booking — when to book by, deposit %, what to confirm before sending the deposit (full kitchen yes/no, washer/dryer, max occupancy vs. realistic occupancy, ADA needs for [list], cancellation policy, pet policy)."
      },
      {
        "step": "Month -4 · Cost split + payment structure",
        "what": "Money is where family reunions die. Set the split fairly + transparently NOW.",
        "prompt": "Build my cost-split structure. Total venue cost [paste], plus estimated shared meal costs, plus estimated activity costs. Walk me through the fair-split options: 1) Per family unit (single, couple, family-with-kids — but kids cost less in venue use), 2) Per adult (kids free or half-rate — common and fair), 3) Per bedroom (bigger families = more bedrooms = more cost — fairest for varied family sizes), 4) Per person with a 'kids under 12 free' rule. Recommend the right model for our group. Then: how to collect — Splitwise to track everything transparently, with one person fronting deposits and getting reimbursed. Tell me how to handle the awkward case (one family can't pay full share — pre-decide quietly with parent generation if a quiet subsidy is needed, or do a sliding scale stated upfront)."
      },
      {
        "step": "Month -3 · Dietary + medical + mobility inventory",
        "what": "Get the full picture of needs before planning a single meal.",
        "prompt": "Build the dietary + needs inventory. Survey every household: 1) Allergies (real allergies — anaphylaxis-level — vs preferences, vs intolerances), 2) Diet patterns (vegetarian, vegan, kosher, halal, gluten-free for celiac vs preference, keto, etc), 3) Pediatric needs (formula, baby food, picky eaters that need basics like plain pasta), 4) Medical (anyone on a strict schedule for meds, anyone with mobility issues who needs ground-floor sleeping, anyone with sensory needs that affect group activities, anyone for whom heat/sun is medically risky), 5) Pets coming (yes/no — venue dependent). Compile into a single spreadsheet only the planner sees. Then write the family-facing summary: 'Here's how we're handling food this week' that names accommodations without singling people out."
      },
      {
        "step": "Month -2 · Activity menu, not schedule",
        "what": "20+ people will not happily do one activity together. Build a menu with options.",
        "prompt": "Design the activity menu approach. The rule: each day has 1 anchor (a thing most people will want to do together, like one family dinner, one beach afternoon, one game night), plus 2-3 optional add-ons (a morning hike for the early risers, a craft activity for the kids + a willing adult, a quiet reading porch for the introverts). Across 4 days: 1) Day 1 (arrival): low-key, settle-in, group dinner only, 2) Day 2: the BIG day — one major shared experience (boat day, hike day, theme park, depending on venue), 3) Day 3: split day — optional activities + downtime + evening reunion-style dinner with toasts/photos/storytelling, 4) Day 4 (departure): easy breakfast, photo, goodbyes by noon. Build a menu of activities specific to our venue [paste]. Mark each activity: cost range, age suitability, mobility level, weather dependency. Optionality > scheduling."
      },
      {
        "step": "Month -2 · Communication system",
        "what": "One channel for updates, no Facebook events. Cap the planner's mental load.",
        "prompt": "Set up the communication system. The constraint: I (the planner) cannot answer 47 individual texts. Build: 1) A group chat (WhatsApp or similar — works across iOS/Android, doesn't require Facebook). 2) A single shared Google Doc as the master 'Reunion Info' page that gets updated as decisions firm up — venue address, check-in instructions, daily plan menu, packing list, costs, contacts. Link the doc in the group chat description. 3) A weekly rhythm: ONE update from me every Sunday for the 8 weeks pre-trip. People know it's coming, no other updates. 4) Group chat rules: questions go in the chat, not DMs to me, so the whole group benefits from the answer. 5) Pre-decide the emergencies-only DM path (something genuinely urgent — usually parent-generation only). Draft the kickoff message that establishes all of this."
      },
      {
        "step": "Month -1 · Meal plan + assignment",
        "what": "20 people = ~36 group meals across 4 days. Don't cook them all. Don't restaurant them all.",
        "prompt": "Plan the meals. 4 days = roughly: 3 breakfasts (day 2-4), 3-4 lunches (often DIY/grab — not full sit-downs), 4 dinners (one is arrival, one is the big reunion dinner, two are casual). For each, decide: cooked at the venue / picked up from a local restaurant / delivered / out at a restaurant. Use my dietary inventory [paste]. For the cooked meals: assign by family (one family takes one dinner — fairly distributed). Build the assignment table. For each cooked-at-venue meal, the assigned family gets: a menu they pick or I propose, a shopping list, an estimated cost (reimbursed via Splitwise). For the big reunion dinner: catered or restaurant — too high stakes to assign to one family. Pre-book the restaurant or caterer by month -1."
      },
      {
        "step": "Month -1 · Logistics packet",
        "what": "One PDF or doc sent to everyone 30 days out with everything they need.",
        "prompt": "Write the 1-page logistics packet that goes to every household 30 days out. Include: 1) Dates + venue address with map link, 2) Arrival window (we want everyone in by [time] day 1 so we don't delay group dinner) + departure window, 3) The plan-at-a-glance — 4 days of anchor activities + 'add-ons available' note, 4) Packing essentials specific to this venue (swimsuits, hiking shoes, board games people are bringing, dressy outfit for big dinner if applicable, etc), 5) What's provided by the venue vs what to bring (toiletries, beach towels, etc), 6) The cost summary + Splitwise link + payment deadline, 7) The dietary handling note, 8) Emergency contact (mine + one backup), 9) Local info (nearest hospital, nearest grocery, nearest pharmacy). Concise. Scannable."
      },
      {
        "step": "Week -1 · Final confirmations + supply runs",
        "what": "Lock everything that can still flex. Stock the supplies.",
        "prompt": "One week out checklist: 1) Reconfirm venue check-in details + lockbox/key code, 2) Reconfirm any restaurant or catering bookings (call, don't email), 3) Confirm any activity bookings (boat charter, tickets, etc), 4) Final headcount confirmation in the group chat — anyone whose plans changed, 5) Pre-trip grocery + supplies plan: assign one family to do the arrival-day big grocery run (or schedule a Walmart/Instacart delivery to the venue), 6) Prep an 'arrival bin' for the venue — paper towels, basics not provided, board games, the first-aid kit, the printed copy of the daily plan to put on the fridge, 7) Print the dietary chart for whoever's cooking, 8) Confirm photographer or designated photo-day plan for the reunion photo (one specific time, everyone present)."
      },
      {
        "step": "Day 0 · Arrival day protocol",
        "what": "Set the tone. Don't over-engineer day 1.",
        "prompt": "Design the arrival day protocol. People will trickle in across 6-10 hours — accept that. 1) Set up venue: post the daily plan on the fridge, set up the welcome snack table (low effort — bread, cheese, fruit, drinks), put name cards on bedrooms (especially for kids — avoids the bedroom argument), 2) Let people arrive, settle, decompress for 2-4 hours — no scheduled activity, 3) Group dinner at [time] day 1 — keep it easy: one simple meal that doesn't require precise timing (pasta + salad + bread, or a catered drop-off, or a casual restaurant). 4) After dinner: brief welcome — 5 minutes max, walk through the daily plan menu, set expectations, then disperse. 5) Plan for the early-to-bed types and the up-late types to both have somewhere to be (porch + living room). Don't schedule games on night 1."
      },
      {
        "step": "Days 1-4 · Real-time adjustment + the photo",
        "what": "Let the reunion be the reunion. Your job is the gentle nudge, not the airline schedule.",
        "prompt": "Live-event playbook for the planner. Each morning: 1) 8am check the day's anchor activity — weather, who's still in, any last-minute swaps. 2) Post one message in the group chat: 'Anchor today: [X] at [time]. Optional: [Y]. Dinner: [Z].' Then step back. 3) The big reunion photo: pick the time the day before (e.g. 'Saturday at 6:30pm before dinner, everyone on the porch'), remind once that morning, take 2-3 takes, done. 4) Reunion-toast moment: usually night 2 dinner. Light structure (parent generation says a few words, oldest cousin says a few words, then anyone who wants), not a forced go-around-the-table. 5) Last night: keep it loose, prep for departures, hand out anything to take home. 6) The morning of departure: easy breakfast, photo if not done yet, hugs, on the road by noon."
      },
      {
        "step": "Week +1 · Closeout + the next one",
        "what": "Wrap costs, share photos, and consider whether there's a next reunion.",
        "prompt": "Week-after closeout: 1) Settle Splitwise — verify every payment, send the final balance message, give people 7 days to settle up, 2) Share the photo dump — one shared Google Photos album or Apple shared album everyone can add to (don't make people DM you for photos), 3) Send one thank-you message to the group from the planners, 4) Honest debrief with the parent generation: what worked, what didn't, do we do this again? When? 5) If yes — capture the lessons NOW (which family handles which night next time, which activity flopped, who couldn't come this time, what to fix). The reunion's institutional memory dies if not captured immediately. Write the 'Lessons for Next Time' doc and put it in the same folder."
      }
    ],
    "outcome": "Twenty-plus relatives in one place for four days, food handled, costs settled fairly, photos taken, and a documented playbook for the next one — without the planner having a nervous breakdown.",
    "trap": "Trying to schedule every minute and please everyone. You're not running a cruise. You're creating the conditions for a family to be together. The minute someone notices you're stressed, the vibe drops. Build optionality, trust adults to self-organize, protect the anchor moments only."
  }
] as const;

export const metadata: Metadata = {
  title: "AI project templates · 15 end-to-end workflows · /learn · AtomEons",
  description: "15 AI project templates · novella, SaaS landing, interview prep, wedding speech, business plan, research paper, sales pitch, family reunion. End-to-end workflows with copy-paste prompts at every step. CC-BY 4.0.",
  alternates: { canonical: "https://atomeons.com/learn/templates" },
  openGraph: {
    title: "AI project templates · /learn",
    description: "15 end-to-end AI workflows. Free. CC-BY 4.0.",
    url: "https://atomeons.com/learn/templates",
    type: "article",
  },
  twitter: { card: "summary_large_image", title: "AI project templates", description: "15 end-to-end. Free." },
  robots: { index: true, follow: true },
};

export default function TemplatesPage() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <div className="mx-auto w-full max-w-6xl px-6 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#6B7779]">
          <Link href="/" className="hover:text-[#22F0D5]">AtomEons</Link>{" "}
          <span className="text-[#1A2225]">/</span>{" "}
          <Link href="/learn" className="hover:text-[#22F0D5]">Learn</Link>{" "}
          <span className="text-[#1A2225]">/</span> Templates
        </p>
      </div>
      <section className="border-b border-[#1A2225]">
        <div className="mx-auto w-full max-w-5xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">
            ::AI project templates · 15 end-to-end workflows
          </p>
          <h1 className="mt-6 text-balance text-5xl font-medium leading-[0.98] tracking-[-0.025em] md:text-7xl">
            Pick a project.{" "}
            <span className="text-[#22F0D5]">Ship it this week.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-base leading-[1.65] text-[#C8CCCE] md:text-lg">
            15 complete end-to-end AI workflows. Each
            template is a sequence of copy-paste prompts that ship
            the project. Time-bound. Honest about what AI can and
            can&apos;t do at each step.
          </p>
          <div className="mt-10 flex flex-wrap gap-2">
            {TEMPLATES.map((t) => (
              <a key={t.slug} href={`#${t.slug}`} className="rounded-full border border-[#1A2225] bg-[#0A0F11] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#C8CCCE] hover:border-[#22F0D5]/40 hover:text-[#22F0D5]">
                {t.title.length > 40 ? t.title.slice(0, 40) + "…" : t.title}
              </a>
            ))}
          </div>
        </div>
      </section>
      <section className="border-b border-[#1A2225] bg-[#0e2520]/20">
        <div className="mx-auto w-full max-w-5xl px-6 py-20 md:py-28 space-y-16">
          {TEMPLATES.map((t) => (
            <article key={t.slug} id={t.slug} className="rounded-2xl border border-[#1A2225] bg-[#0A0F11] p-7 md:p-10 scroll-mt-20">
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#22F0D5]">::template · {t.estimatedTime}</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">{t.title}</h2>
              <p className="mt-3 text-base text-[#9BA5A7]">For: {t.audience}</p>
              <p className="mt-5 max-w-3xl text-base leading-[1.7] text-[#F2F4F5] md:text-lg">Goal: {t.goal}</p>
              <div className="mt-6 rounded-xl border border-[#1A2225] bg-[#0E1418] p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">::stack</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {t.stack.map((s, i) => (
                    <li key={i} className="rounded-full border border-[#22F0D5]/30 bg-[#22F0D5]/05 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[#22F0D5]">{s}</li>
                  ))}
                </ul>
              </div>
              <h3 className="mt-8 text-xl font-medium md:text-2xl">Steps</h3>
              <div className="mt-4 space-y-4">
                {t.steps.map((s, i) => (
                  <div key={i} className="rounded-xl border border-[#1A2225] bg-[#0E1418] p-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">::step {String(i + 1).padStart(2, "0")} · {s.step}</p>
                    <p className="mt-2 text-base font-medium text-[#F2F4F5]">{s.what}</p>
                    <pre className="mt-3 max-w-full overflow-x-auto whitespace-pre-wrap rounded-md bg-black/40 p-4 font-mono text-[12px] leading-[1.55] text-[#C8CCCE]">{s.prompt}</pre>
                  </div>
                ))}
              </div>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-[#22F0D5]/30 bg-[#0E1418] p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#22F0D5]">::outcome</p>
                  <p className="mt-2 text-sm leading-[1.65] text-[#C8CCCE]">{t.outcome}</p>
                </div>
                <div className="rounded-xl border border-[#FFB87A]/30 bg-[#1C1308]/30 p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#FFB87A]">::trap</p>
                  <p className="mt-2 text-sm leading-[1.65] text-[#C8CCCE]">{t.trap}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-black">
        <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center">
          <Link href="/learn" className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#22F0D5] hover:text-[#F2F4F5]">← back to /learn</Link>
        </div>
      </section>
    </main>
  );
}
