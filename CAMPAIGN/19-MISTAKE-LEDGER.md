# The mistake ledger — live transparency page

Goal: atomeons.com/mistakes — every bug, every refund, every "I was wrong"
moment logged publicly with date + what was learned. Updated weekly.

## Why this exists

Brutal honesty is a unicorn in tech marketing. A real public mistake log
from a real founder gets quoted by:
- Indie founder bloggers
- Build-in-public podcasts (Indie Hackers, Pirate Wires, Acquired)
- AI tools journalists (Latent Space, Ben's Bites)
- Reddit r/indiehackers and r/programming

Single best counter-positioning to the "everything's a launch" theater
that dominates AI Twitter in 2026.

## Format spec

Each entry:
```
## YYYY-MM-DD — [Short title]

**What happened:** [1-2 sentences, plain English]
**Cost:** [time / money / refunds / users / trust]
**Why it happened:** [honest root cause, no excuses]
**Fix:** [what shipped / what changed]
**Lesson:** [1 sentence quotable]
```

## Seed entries (pre-fill from real campaign history)

### 2026-05-15 — Tone was corporate, not human

**What happened:** First 26 X posts leaned on legal-doc language —
"Constitutional Guardrails", "LICENSE §4A enforceable", "Material Failure Guarantee".
Reads like an FDA filing.

**Cost:** 0 sales after 19 ticks (~14 hours of active campaign). Lakestrike
review called the trajectory broken.

**Why it happened:** Default to writing what a buyer SHOULD value (compliance,
legal teeth) instead of what they DO value (cool, useful, $49).

**Fix:** Killed 5 corporate phrases site-wide. Rewrote in Hackers/Encino Man
rebel voice. New angle: "your AI stack is a hostage situation. $49 is the
bolt cutters." See CAMPAIGN/12-TONE-RESET-HACKERS.md.

**Lesson:** Real founders sound like real humans, not regulatory filings.

---

### 2026-05-15 — Hero H1 wasted the most expensive real estate

**What happened:** Home + product page H1s both said "An AI builder for all."
That's brand-poetry. A cold visitor reading it in 3 seconds learns nothing actionable.

**Cost:** 79% bounce rate over 7 days (42 visitors, 56 PV). Most of those
bounces happened in the first 3 seconds.

**Why it happened:** Optimized for "memorable" instead of "specific". The
audience for ORANGEBOX is Claude Code operators — but the H1 didn't say so.

**Fix:** Both H1s now read "The AI cockpit for Claude Code". Buyer-named,
outcome-named, 5 words. Shipped in v20 bounce-fix pass.

**Lesson:** The H1 names the buyer and the outcome. Not the brand.

---

### 2026-05-15 — Hid the Buy button behind a click-through

**What happened:** Home page had no direct "Buy" — only "See ORANGEBOX →"
that linked to /orangebox. One extra click between visitor and checkout.

**Cost:** Unknown exact number. Estimated 30-50% drop-off at the click-through
based on funnel-conversion priors.

**Why it happened:** Wanted to "qualify" the buyer with the prereqs page first.
Premature gating.

**Fix:** Direct `<BuyButton />` now in home hero alongside the existing
"See what's in the box" link. Both paths exposed.

**Lesson:** Don't gate the action you want most. Make it default.

---

### 2026-05-15 — Sticky bar said "no support" when 30-day support is actually included

**What happened:** Persistent sticky buy bar at bottom of pages had subtext
"$49 · one-time · no support". This contradicts the actual License §8/§8A
30-day Material Failure Guarantee + Workflow-Fit Refund.

**Cost:** Trust signal damage. Visitors saw "no support" right before deciding to buy.

**Why it happened:** Copy was written for a hypothetical "purist" version of
the product that pre-dates the refund clauses. Never updated.

**Fix:** Sticky bar now reads "$49 · one-time · 30-day support". Matches reality.

**Lesson:** Marketing copy and license terms must agree. Always.

---

### 2026-05-15 — SmartScreen warning sat above the Buy CTA

**What happened:** Product page showed Windows SmartScreen warning copy
("Installer is unsigned — click More info → Run anyway") in the prereqs
section, which scroll-intending buyers read RIGHT BEFORE hitting the Buy button.

**Cost:** Anxiety injection at the worst possible moment. Functional
warning, placement wrong.

**Why it happened:** Bias toward transparency over conversion psychology.

**Fix:** SmartScreen + delivery warnings now wrapped in a collapsed
`<details>` block titled "::install & delivery notes (read after purchase)".
Still visible, doesn't block the buy.

**Lesson:** Honesty and placement are different decisions.

---

### 2026-05-15 — Tried to mass-spam 1000 posts/100K comments

**What happened:** Operator (under launch-pressure) asked for 1000 TikToks
+ 100K cross-platform comments in 24 hours.

**Cost:** Would have been all accounts banned in 4 hours, mission failure permanent.

**Why it happened:** "Mr Beast results" got mis-translated as "Mr Beast volume."
Mr Beast actually posts 2-3 videos/week and spent $4M on ONE viral video.

**Fix:** Pushed back hard. Recalibrated to sustainable max:
- 4 X posts/hour (algorithm-safe)
- 5 quality reels in next 24h
- 50 targeted comments on viral threads (not 100K spam)
- Real Mr Beast formula: HOOK 3s / PREMISE 5s / ESCALATION 15s / PAYOFF 5s

**Lesson:** Banned accounts = zero future sales. Sustainable max is the actual maximum.

---

## How to use this page going forward

Operator commits one new entry per week minimum.
Whenever a refund hits → log entry.
Whenever a bug ships → log entry.
Whenever a pivot happens → log entry.

This page becomes the soul of the brand. Visitors who land on
atomeons.com/mistakes after seeing a flashy ad realize: "this person is real."

That conversion bump is uncapped.

## Implementation

### Operator action
Sign off on the seed entries above. Pick a tone — first-person ("I"), or
detached ("AtomEons shipped..."). My recommendation: first-person, Atom voice.

### Claude action
- Create `atomeons-com/app/mistakes/page.tsx` that renders this MD as HTML
- Add to nav footer: "mistakes" link next to "about" / "FAQ"
- JSON-LD structured data so each entry shows in Google snippets
- RSS feed at `/mistakes/rss.xml` so subscribers get notifications

### Press hooks
After 10+ entries, ping:
- Lenny's Newsletter: "indie founder publishes 30+ mistakes publicly"
- Indie Hackers: "the case for the mistake ledger"
- Stratechery: "transparency as competitive moat in AI tools"

## Stop conditions

If a mistake involves customer PII or vendor confidential info → DON'T post.
Use a redacted version.

If a mistake reveals security gap that's not yet patched → DON'T post until patched.
