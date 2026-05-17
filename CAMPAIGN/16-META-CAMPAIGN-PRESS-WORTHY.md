# Meta-campaign — the campaign IS the story

Operator goal: "opus 4.7 max ORANGEBOX-enhanced campaign that gets written about it is so good."

Translation: don't just sell a product, run a campaign so distinctive that
TechCrunch, The Verge, Ars Technica, or HN front page covers the CAMPAIGN ITSELF.

## The 7 press-worthy moves

### 1. Public Stripe counter on atomeons.com
**The move:** Embed a live counter on the homepage: "Sales so far: X / 100".
Already built `/api/sales-count` endpoint. Just need to render it.

**Why press cares:** Build-in-public is the genre. Numbers = stakes. Updates daily.

**Implementation:** Add `<SalesCounter />` component to atomeons.com hero,
pulling from `/api/sales-count`. ~30 min of code.

### 2. The "$49 forever" public commitment with skin in the game
**The move:** Public bet: "If I ever try to charge subscription, I'll refund every
buyer 10x the purchase price out of my own pocket." Stake $49,000 in an escrow
that releases to existing buyers if §4A is breached.

**Why press cares:** Founder personal-skin-in-game stories print. "Founder bets
$49K against himself" = headline.

**Implementation:** Operator action — set up escrow via simple smart contract OR
public document filed with attorney. Cost: ~$500-1500 legal fee.

### 3. 100-buyer Discord with named seats
**The move:** "First 100 ORANGEBOX buyers get founder Discord. Seat #1-100
literally named after them in the channel topic." Seats #1-10 get a 30-min
1:1 with Atom.

**Why press cares:** Creates scarcity narrative + intimate founder access angle.

**Implementation:** Operator creates Discord, makes channel, names seats.

### 4. Public mistake ledger
**The move:** Atomeons.com/mistakes — every bug, every refund, every "I was
wrong" moment logged publicly with date + what was learned. Updated weekly.

**Why press cares:** Brutal honesty is a unicorn in tech marketing. Will be
quoted in "indie founder transparency" pieces.

**Implementation:** Markdown page on the site. Atom commits weekly.

### 5. The recursive proof video — full 24-hour timelapse
**The move:** Record full 24-hour timelapse of building atomeons.com on ORANGEBOX.
Sped up to 5-minute video. Watermark every minute with "Hour N — task X".
Upload to YouTube + TikTok + IG.

**Why press cares:** "Founder ships entire website in 24h" + visual receipts =
shareable. The Mr Beast equivalent for indie SaaS.

**Implementation:** Operator's already-built site has git history — reconstruct
the timelapse from `git log` + Vercel deploy log. Add screen-record OR
slideshow of commits.

### 6. The free doctrine PDF (lead magnet that's actually good)
**The move:** Publish a real 30-page PDF: "The Operator's Cockpit: 14 Principles
for AI Project Memory" — practical, no fluff, no signup wall. Hosted at
atomeons.com/doctrine.pdf. Tweet-thread the highlights.

**Why press cares:** Free knowledge that's actually high-quality gets shared by
educators (Lex Fridman, Karpathy types).

**Implementation:** Pull from existing AE0–AE14 doctrine (de-jargoned per
Lakestrike kill list). Operator action: review + sign off.

### 7. The buyer interview series — every Friday
**The move:** Each Friday, public 30-min video interview with one ORANGEBOX
buyer about what they built that week. Posted as YT short + LinkedIn.

**Why press cares:** Social proof at scale. Stories of real builders.

**Implementation:** First buyer = ??? (operator can self-interview for week 1 if no buyers yet).

## Compounding effect

These 7 moves compound:
- Stripe counter (#1) → tweet "we just hit 50 sales" → press hook
- Escrow bet (#2) → "founder bets $49K against himself" → headline
- Discord seats (#3) → buyers post screenshots of their seat # → user-gen content
- Mistake ledger (#4) → "honest indie founder" interview piece
- 24h timelapse (#5) → YouTube viral candidate
- Doctrine PDF (#6) → educator amplification
- Buyer interview series (#7) → sustainable content engine

## What this is NOT

- NOT performative "build in public" theater
- NOT growth-hacking with fake numbers
- NOT fake AI-influencer collabs
- NOT paid press pitches

## What this IS

A real founder running a real campaign with real receipts at real scale.
The PRESS angle is the byproduct of substance, not the goal.

## Operator's call — which of these to deploy this week

Operator pick 3. I implement what I can (the technical pieces — Stripe counter,
doctrine PDF, public mistake ledger). Operator handles legal/personal pieces
(escrow, Discord, interviews).

My recommendation: **#1 (Stripe counter), #5 (24h timelapse video), #6 (doctrine PDF).**

Those three alone unlock build-in-public press coverage within 14 days.

## Press list to pitch (Tier 1)

Once 2 of the 7 moves are live:

- **TechCrunch** — Alex Wilhelm / Anthony Ha (cover indie SaaS, AI tools)
- **The Verge** — David Pierce (creator economy + AI tools)
- **Ars Technica** — Benj Edwards (AI policy + tools)
- **Hacker News** — front-page submission timed to a moment (10K+ sales? escrow filed? buyer #100?)
- **Latent Space** podcast — swyx covers AI infra
- **Lenny's Newsletter** — Lenny covers indie SaaS pricing experiments
- **Stratechery** — Ben Thompson covers business-model innovation
- **Indie Hackers podcast** — Courtland Allen covers solo founders
