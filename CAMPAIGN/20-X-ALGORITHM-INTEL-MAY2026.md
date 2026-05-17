# X algorithm intel — May 2026 (post xAI open-source drop)

Source: third-party analysis by someone who burned $500 of Claude
reading every line of xAI's open-sourced ranking code. Operator pasted
it into the campaign mid-tick. Treat as authoritative until contradicted
by direct experiment.

## The 6 things that changed everything for this campaign

### 1. Cadence: we've been over-firing.

The xAI ranker runs an `AuthorDiversityScorer` that multiplies each
sequential post from the same author by `decay^position`. By post 4 in
a tight window you're at the floor.

We've been shipping ~1+ post/hour via the API. **That's burning reach.**

**Change:** minimum 90 minutes between original posts. Strict.
Replies don't count (they go through a different lane).

### 2. Replies don't get amplified out of network. Originals do.

Replies and retweets **never enter the Grok quality classifier**.
That means our 23 strategic replies got value only inside each thread's
direct audience. They never had a shot at out-of-network amplification.

**Change:** originals carry the campaign. Replies sustain conversation
inside high-value threads (verified, big-follower), nothing more.
Stop reply-spamming small accounts — that triggers
`SpamEapiLowFollowerClassifier`.

### 3. First 30 minutes decide everything.

If a post doesn't get engagement fast, Grok doesn't evaluate it.
Quality score never computed. Dies in the buffer.

**Change:** on every original post, immediately:
- DM 2-3 operator contacts asking for a quick read
- like + reply from any operator-controlled account
- pin to top of profile briefly if it's a milestone post

### 4. Dwell > likes by 5×.

The scorer reads 5 dwell signals vs 1 favorite signal.
`not_dwelled` (people scroll past without stopping) is one of the 5
negative weights that get **subtracted** from your score.

**Change:** every post must earn a pause. Lists, contrast formats,
specific numbers, story arcs, screenshots that demand a second look.
Stop the punchy one-liners — they're optimizing for the wrong signal.

### 5. Embedding poisons slowly, recovers slowly.

The author embedding accumulates negative signals over weeks.
Decay only happens with new GOOD engagement entering — not on a clock.
If we've been racking up `not_dwelled` from rapid-fire low-dwell
content, the account embedding may already be drifting.

**Change:** quality > velocity for the next 7 days. Every post needs
to earn dwell. Better to fire 4 high-dwell posts/day than 12 punchy
ones.

### 6. Location is NOT a penalty. Timing + language are.

No author-country field in the ranker. Marco Island operator posting
English for US audience = zero direct penalty.

**Change:** stop worrying about VPNs etc. Post in US audience's prime
window:
- 8am–11am ET (US business waking up) ← prime
- 1pm–3pm ET (lunch scroll)
- 7pm–10pm ET (evening scroll)
Avoid 11pm–6am ET when US sleeps and post ages out.

## Other actionable findings

- **Post age caps at 80h** — first 0–12h is prime. Our cadence is fine
  for this (we ship daily).
- **Quote-tweet virals in niche** — model already knows the original
  engages, our value-add stacks on top. Underused in our campaign.
- **Video ≥ 10 sec with audio** — Grok runs ASR on every video.
  Silent or short videos lose VQV weight. ElevenLabs voiceovers are
  already set up.
- **Threads of 10+ tweets are dead** — `DedupConversationFilter`
  keeps only 1 tweet per conversation per feed. Forget megathreads.
- **Reposting same content blocked** — Bloom filters dedupe.
  Already hit this with x-q05 duplicate-content 403.
- **AI slop has its own `slop_score` field** — Banger Screen detects
  it. Operator-voice is fine; pure-template AI patterns are not.

## 4 shadowban flavors to watch for

1. **Hard drop** — post removed from everyone's feed silently.
   Test: search for your own recent post in incognito → if absent,
   hard-dropped.
2. **DO_NOT_AMPLIFY label** — ads stop showing next to your posts →
   X stops monetizing you → algo stops pushing.
   Test: Twitter Analytics impression drop with no quality change.
3. **BotMaker rules** — manual employee-applied limits. Opaque.
4. **Poisoned embedding** — slowest, worst. Past `not_dwelled` /
   block / mute / report accumulate. Takes 6–8 weeks to start improving,
   12–16 weeks to truly shift.

## What this means for the goal:100 campaign

The campaign was firing fast for trust + reach. The algorithm intel
says trust + reach come from **dwell-optimized originals on a 90-min
floor**, not from velocity.

**Reframe:**
- Velocity lane: ELIMINATED. Cap at 8 originals/day max.
- Reply lane: ONLY verified/big-follower targets, quality reasoning.
- Asset lane: video originals with audio (Runway + ElevenLabs).
- Quote-tweet lane: NEW — pick 2-3 viral Claude/Codex/AI posts per
  day, add a sharp take, quote them.
- DM lane: NEW — when an original ships, DM 3 contacts asking for
  read in first 10 min.

## Updates to poster.mjs

Adding `MIN_AUTHOR_DIVERSITY_GAP_MINUTES = 90` constant. The script
will refuse to fire an original if the last X post was less than
90 minutes ago.

Manual override: `--force` flag for milestone posts where decay risk
is acceptable.

## Stop conditions

If `/api/sales-count` is still 0 after this protocol runs for 5 days,
the issue is NOT reach — it's the offer itself or the landing page.
Pivot to user research / on-page conversion fixes.
