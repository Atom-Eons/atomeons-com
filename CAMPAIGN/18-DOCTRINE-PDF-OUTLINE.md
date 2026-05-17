# The Operator's Cockpit — Free 30-page PDF

A lead magnet that's actually high-quality. No signup wall. Hosted at
`atomeons.com/doctrine.pdf` (or atomeons.com/cockpit-doctrine).

## Why this exists

Most lead magnets are crap. This one is a real reading experience:
- 30 pages of operator wisdom
- No "register for our webinar" walls
- Practical, immediate value
- Sourced from the AE0–AE14 doctrine but DE-JARGONED per Lakestrike kill list
- Builds trust → drives $49 conversion → press talks about it

## Target reader

A developer or solo founder who:
- Uses Claude Code / Cursor / Aider daily
- Has felt the "every session starts cold" pain
- Has either canceled or is considering canceling Claude Pro
- Is curious about local-first AI workflows
- Doesn't want another SaaS

## Structure

### Cover
Title: **The Operator's Cockpit**
Subtitle: 14 principles for AI project memory
Byline: by Atom McCree (founder, ORANGEBOX Command)
Footer: free · 30 pages · no signup · atomeons.com/orangebox

### Page 1 — Why I wrote this
2 paragraphs. The "writing a book for a month that never exports" origin story.
End with: this PDF is the doctrine without the cockpit. Read for free. Buy
the cockpit if you want it enforced at runtime.

### Pages 2-3 — The cold-start problem
What it costs you in time, in money, in attention. The actual math:
- Average operator rebuilds context ~6 times per project per week
- Each rebuild costs 15-45 min
- That's 1.5-4.5 hours/week of pure overhead
- At indie dev rates ($100/hr), that's $150-450/week of lost time
- For 50 weeks/yr: $7,500-22,500 of lost time per project

### Pages 4-17 — The 14 Principles (1 per page or 2)

(De-jargon the Constitutional Guardrails — pick the ones that don't sound like FDA filings)

1. **Memory survives sessions or you don't have a project.**
2. **Receipts > Promises.** Every "done" must produce a proof artifact.
3. **One human can stop everything.** No autonomy without a stop button.
4. **Decisions are routed to departments, not piled on the model.**
5. **The model executes. The cockpit witnesses.**
6. **No green without proof.** Self-graded completions lie.
7. **Mission graphs > chat threads.** Threads can't survive context resets.
8. **Lane swaps are free. Subscription lock-ins are not.**
9. **Local-first by default. Cloud when explicitly chosen.**
10. **One project, one spine. Multiple models, one truth.**
11. **Audit is built-in, not bolted-on.**
12. **Cost transparency happens at the call, not the invoice.**
13. **The operator owns the stack. Not the vendor.**
14. **A cockpit costs once. A subscription costs forever.**

### Pages 18-22 — The cockpit pattern in practice
A walkthrough of how an operator uses these principles in a real project.
NOT a product demo. The principles applied to a hypothetical "ship a side
project in 30 days" workflow.

### Pages 23-26 — What I learned shipping ORANGEBOX
Founder voice. Mistakes. Refunds. Pivots. The 0/100 sales tracker. The
press-worthy honesty.

### Pages 27-28 — The free toolkit (no signup)
Links to:
- The MCP receipts schema (1 page JSON spec)
- A starter Discord with other cockpit operators
- The CAMPAIGN/07 sales tracker (public)

### Page 29 — Buy ORANGEBOX (one soft pitch)
$49 once. What's in the zip. The refund clauses.

### Page 30 — Colophon
Built in 24 hours by one operator using ORANGEBOX.
Set in Inter / IBM Plex Mono.
Marco Island, FL. May 2026.

## Production

### Operator action (~1 hour)
- Review the de-jargoned principles above; rewrite any that don't sound like Atom
- Sign off on the founder-voice sections (4-17 + 23-26)

### Claude action (~2 hours via Builder agent)
- Generate the PDF via Next.js `react-pdf` library OR simple Markdown→PDF via Pandoc
- Host at atomeons.com/doctrine.pdf
- Add a `/doctrine` route on the site that previews + offers download
- Add Open Graph metadata so when shared on X/LinkedIn, the preview card sells the PDF

### Distribution
- Tweet thread: each principle = one tweet, last tweet = link to full PDF
- LinkedIn carousel: 14 slides, one principle each, drives to PDF
- TikTok: 14 short videos, one principle each, 7-second format
- Reddit r/programming, r/ClaudeAI, r/vibecoding: paste-ready post linking to PDF
- HN Show HN angle: "I wrote a free 30-page PDF about AI operator cockpits"

## Press potential

Real free 30-page PDFs from indie founders are RARE in 2026 (most are
2-page checklists with email-gate). A high-quality, anti-SaaS, hackers-voice
doctrine published with zero signup wall = exactly the move that gets:
- Hacker News front page
- Educator amplification (Karpathy, swyx, Lex Fridman types share these)
- The Verge / Stratechery / Lenny coverage
- Reddit r/programming front page

## Metric

Track via:
- Vercel analytics for /doctrine.pdf hits
- Embed UTM in atomeons.com/orangebox link IN the PDF (e.g.,
  `?ref=doctrine-pdf`) so we measure PDF → buy conversion
