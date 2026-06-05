# V6 LAUNCH PLAYBOOK UPDATE — POST X-ALGORITHM LEAK

**Drop:** 2026-05-18 (algorithm reveal day +3)
**Trigger:** xAI published x-algorithm source code 2026-05-15 → independent AI builder's 1851-line analysis received 2026-05-18 → AtomEons surfaces it at `/intel/x-algorithm`
**Disclosure ID:** `ATOM-OBX-V6-XALG-PLAYBOOK-2026-0518`

Operational corrections to the v6 launch playbook (CAMPAIGN/22 + CAMPAIGN/26) based on what the leak now proves. Every rule below is **mechanically verified** in the open source — not folklore, not guessing.

---

## 0. The headline correction

The launch playbook in CAMPAIGN/22 + CAMPAIGN/26 was written before the algorithm publication. Three assumptions need updating.

| Old assumption | New mechanical truth | Where in the code |
|---|---|---|
| "Post when your audience is awake" | **The first 30 minutes are the min-traction gate. No early engagement → never enters Banger Initial Screen → permanently invisible OON.** | `grox/generators/stream_generator.py:50-180` |
| "Reply-jack big accounts works" | **Substantive replies to large accounts climb Reply Ranking (0-3). Generic 'first!' replies score 0.** | `grox/classifiers/content/reply_ranking.py` |
| "Threads multiply your reach" | **DedupConversationFilter keeps only ONE tweet per thread in any feed. Megathreads compete with themselves.** | `home-mixer/filters/dedup_conversation_filter.rs` |

These aren't refinements. These are direction changes.

---

## 1. Updated Day-0 X timing protocol

### Replaces CAMPAIGN/26 § Day 0 X row

| Time (ET) | Action | Why now (post-leak) |
|---|---|---|
| 08:55 | **Pre-warm the audience.** DM 5-10 builder friends with "I'm dropping the v6 thread at 9:00ET — like + reply in the first 5 minutes is structurally necessary." | Min-traction gate must clear in first ~5-30 minutes or post is permanently OON-invisible |
| 09:00 | **Post the original v6 thread tweet.** Long, dense, hook in line 1, claim in line 2, body of 5-8 paragraphs, reply hook at the end. Single original — NOT a thread of replies. | Banger Initial Screen evaluates only originals. Reply chains lose to DedupConversationFilter |
| 09:00-09:05 | **First DM-network engagement window.** Pre-warmed contacts deliver early like + reply. Each substantive reply pushes both `dwell_score` and `reply_score` (the two highest positive weights). | This is what crosses the Kafka `MIN_TRACTION_FOR_GROX` stream → unlocks Banger Initial Screen + quality multimodal embedding |
| 09:05-09:30 | **Reply to every comment substantively.** Self-replies skip the spam classifier. Each reply you give to a commenter on your own post inflates the conversation's `reply_count`. | Reply ranker check is explicitly bypassed when root author == replier. Keeps the conversation alive without spam-flag risk |
| 09:30 | **Check status.** If the post hasn't crossed min-traction (rough heuristic: <5 substantive engagements), accept that THIS post is dead for OON. Don't reload, don't repost. Move to the next channel. | Reposting the same text is filtered by `PreviouslySeenPostsFilter` (Bloom filter on client + served IDs). Bloom can also have false positives so the post may not even reach all who *haven't* seen it |
| 09:30-13:00 | **DO NOT publish another original post.** Author Diversity Decay applies `decay^position + floor`. Your second post in any user's feed weighs half. The third ~28%. | `home-mixer/scorers/author_diversity_scorer.rs:29-58` |
| 13:00+ | If the morning post is going well, save the **second original** for the 8pm Eastern window (US evening prime time). One banger per audience-prime-time slot. | The age feature buckets in 1h granularity, caps at 80h. By the time your audience is asleep, the post should already be in its highest-engagement bucket |

---

## 2. Reply Ranking strategy for big-account engagement

### Replaces the "reply-jack influencers" item in CAMPAIGN/22

The leak proves replies to large accounts (`in_reply_user_follower_count > THRESHOLD`) go through Grok's `ReplyScoringSystem` and get a 0-3 score deciding their visible order in the conversation.

**Score 0 (invisible):** "First!", emoji walls, "100% this", generic agreement.
**Score 1 (default):** A relevant but obvious reaction. Visible but mid-stack.
**Score 2 (climbs):** A substantive addition — counter-evidence, missing context, related data point, sharp question.
**Score 3 (top reply):** A reply that meaningfully extends the original post — useful link, new perspective, technical correction, lived experience.

**Action for the v6 launch:** when replying to verified founders / journalists / VCs in the AI-cockpit space, optimize for score 3. One score-3 reply on a viral post by a 100k-follower account = more parasitic visibility than 10 organic posts of your own.

**Anti-pattern:** Do NOT reply-spam small accounts (< follower threshold). Those replies go through `SpamEapiLowFollowerClassifier` not Reply Ranking. The spam classifier can flag you and that flag stays in your author embedding.

---

## 3. Video tactic correction

### Replaces CAMPAIGN/24 video shorts strategy

The leak makes the threshold mechanical:

```rust
fn vqv_weight_eligibility(candidate: &PostCandidate) -> f64 {
    if candidate.video_duration_ms.is_some_and(|ms| ms > p::MIN_VIDEO_DURATION_MS) {
        p::VQV_WEIGHT
    } else {
        0.0  // ← below threshold, VQV weight is ZEROED
    }
}
```

**Updated YouTube Shorts strategy:**

| Short # | Old: any length | NEW: must be ≥10s WITH audio |
|---|---|---|
| 01-10 | Various | **All re-cut to 12-30s** with continuous voice-over so Grok ASR captures the message. Even the "12-second hard cut" shorts get a voice bed. |
| Asset checklist | Adds: ASR-friendly audio (no music-only beds) + captions for sound-off viewers + minimum 10s clip length |

---

## 4. Author embedding: the slow burn

The leak confirms what we suspected: Phoenix uses `num_author_hashes = 2` — every account has a learned embedding the model uses for retrieval. **Negative signals poison it for weeks.**

**For the @AtomMccree account during the launch week:**

- Avoid ANY topic-jumping that could trigger `not_interested`. Stay laser-focused on: AI cockpit, native binary, $1 ladder, receipts, operator class, anti-saas. The model is currently building the author embedding for this account; topic drift in week 1 produces a muddy embedding for months.
- Engage with US-builder accounts to bias the embedding toward US-builder retrieval clusters (currently the Two-Tower may still cluster the account near European or "indie founder" generic clusters).
- Reply substantively under big-account posts in the same niche. Reply Ranking score 3 replies are public proof of relevance the embedding picks up.

---

## 5. The HN + PH adjustment

### Replaces CAMPAIGN/22 § HN and § PH first-comment guidance

The leak shows HN traffic going TO atomeons.com is great for the cockpit business but **does nothing for the X embedding**. The X push must happen IN PARALLEL, not after.

**Day 0 schedule rebalance:**

- 09:00 X thread (per § 1 above)
- 09:30 Pre-warmed reply window closes; check min-traction status
- 10:00 HN Show HN submission (the X push must be already running so the HN traffic also goes to a warm X account)
- 10:01 HN first comment
- 10:05 Tweet the HN link + screenshot of current HN rank (additional X engagement bait without being a "reload" of the original post)
- 13:00 PH submission
- 13:05 PH first-comment + tweet linking PH page

**Why the timing rebalance:** the X embedding bake takes longer than the HN front-page window. If the X embedding hasn't built relevance by the time HN traffic peaks, the HN audience won't find the AtomEons account organically when they search for it — they'll find the website instead and never follow the account.

---

## 6. New cold-email angle to journalists

### Adds to CAMPAIGN/22 § cold email

**Subject template:**
```
The xAI algorithm leak just made one indie founder's 1851-line analysis the most important growth doc of 2026
```

**Body template:**
```
Hi [NAME],

You probably saw xAI published the X For-You algorithm source code on
2026-05-15. What you may not have seen: an independent AI builder spent
the weekend reading the 207-file repo and produced what is — as far as
I can tell — the only complete operational analysis of the leak.

I republished it (with the original author's CC-BY 4.0 license intact)
plus my own operator-class extensions at:

https://atomeons.com/intel/x-algorithm

The 15-insight TL;DR. The 6 lab extensions. A 12-rule printable
cheatsheet. The 31-section deep-dive document is downloadable as
markdown.

The bigger story is the convergence: the same week xAI made the
algorithm auditable, I shipped a native AI cockpit (4.46 MB Rust + egui)
on a $1 ladder with a §4A license clause that legally bans subscription
switch. Both are evidence of the same vector: the era of opaque
"alignment is what we say it is" is ending.

Reach: a.mccree@gmail.com · @AtomMccree
Press kit: atomeons.com/press
Lab: atomeons.com/research/about

— Atom McCree
AtomEons Systems Laboratory · Marco Island, FL
```

This angle threads the algorithm story THROUGH the launch story. Either piece is news; together they're a thesis.

---

## 7. Things to STOP doing immediately

Three Day-0 tactics from the original CAMPAIGN files that the leak now contraindicates:

1. **❌ The 10-tweet thread.** CAMPAIGN/22's X strategy was a 10-tweet thread. `DedupConversationFilter` keeps ONLY ONE tweet per thread per feed. **Replaced with a single dense original** plus selective standalone tweets through the day.

2. **❌ "First comment" emoji on PH / HN.** Generic first comments score Reply-Ranking 0. **Replaced with substantive AMA opener** that adds technical detail.

3. **❌ "Reload + repost" if a tweet doesn't land.** `PreviouslySeenPostsFilter` Bloom filter discards re-posts even with edited text. **Replaced with "if first 30 min misses min-traction, that post is dead — write a new one tomorrow"** mindset.

---

## 8. The new headline number for the press pitch

| Old headline | New headline (post-leak) |
|---|---|
| "Solo founder ships 4.46 MB native cockpit at $1" | **"Solo founder ships 4.46 MB native cockpit at $1 the same week xAI made the algorithm auditable"** |
| "Anti-saas indie shipped while incumbents bundled 200 MB chromium" | **"Anti-saas indie shipped receipts the same week the platform's algorithm got receipts"** |
| "One operator. One cockpit. Marco Island, FL." | **"One operator built ORANGEBOX while xAI was building algorithm transparency. Both shipped the same week. Both treat the audience as customer rather than inventory."** |

The convergence is the story. Use it.

---

*Disclosure ID: ATOM-OBX-V6-XALG-PLAYBOOK-2026-0518 · CC-BY 4.0*
*Authored by AtomEons Systems Laboratory based on the open xai-org/x-algorithm repo + the 1851-line analysis by an anonymous AI builder. Use freely. Attribute where appropriate.*
