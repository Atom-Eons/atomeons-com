# YouTube Shorts scripts (5 reels in Hackers/Encino rebel voice)

Spec for every Short:
- Vertical 9:16
- 28-58 seconds max (YT Shorts cutoff)
- Voiceover via ElevenLabs (diverse voice rotation)
- B-roll: Runway video gen + cockpit screen recordings + atomeons.com
- Caption: hashtags + atomeons.com/orangebox CTA
- Music: lo-fi 90s synth or trap-lo-fi instrumental

---

## YS1 — "Cancel my $200 Claude sub on camera" (Mr Beast formula)

**Voice:** Blackwood — Sinister, Posh British
**Duration:** 30s
**Visual track:**
- 0-3s: Atom face cam holding phone, screen showing Stripe Claude Pro $200 subscription page
- 3-8s: Cut to ORANGEBOX cockpit demo, mission graph spinning
- 8-15s: Lane router visual swapping Claude → Ollama → Gemini
- 15-23s: Stripe refund email animation, $200 hitting
- 23-30s: ORANGEBOX OG card with $49 ONCE FOREVER pill, atomeons.com/orangebox

**Voiceover script:**
```
[smug] He's about to cancel his two-hundred-dollar Claude subscription on camera.
[pause] To prove a forty-nine dollar desktop cockpit beats it.
[pause] He opens ORANGEBOX. Claude rate-limits him.
The cockpit swaps to local Ollama mid-task.
Mission graph survives. Receipts ticking on screen.
His Stripe refund hits in seventeen seconds.
[whispered] The zip is forty-nine dollars. Once. Forever.
[confident] Atomeons dot com slash orangebox. First hundred buyers get Atom's private Discord.
```

**Title:** I canceled my $200 Claude sub on camera #ClaudeCode #AICockpit
**Description:**
```
I tested a $49 desktop cockpit against my $200/mo Claude subscription. Here's what happened.

ORANGEBOX Command turns Claude Code from a chat tool into a real project surface.
60+ MCP tools, mission-graph memory, triad lane router (Claude/GPT/Gemini/Ollama).

$49 once. Forever. First 100 buyers get founder Discord.
→ atomeons.com/orangebox

#ClaudeCode #AICockpit #VibeCoding #Anthropic #IndieDev
```

---

## YS2 — "7 days, $49 cockpit, no subscriptions"

**Voice:** Latino male charismatic (search "Latino" in 11Labs library — try "Diego" or similar)
**Duration:** 35s

**Voiceover script:**
```
[confident] For seven days, I ran every project through a forty-nine dollar AI cockpit.
[pause] No ChatGPT. No Claude Pro. No Copilot. Just ORANGEBOX.
[pause] Day three. Shipped a working Stripe checkout.
Day five. Full landing page.
Day seven. This video script.
[whispered] I kept the receipts.
[confident] Forty-nine dollars. Once. Atomeons dot com slash orangebox.
```

**Visual:** Day-counter timelapse, cockpit dashboard, deploy logs

---

## YS3 — "The $49 vs $52K math"

**Voice:** Indian female calm wisdom (search "Indian" in 11Labs)
**Duration:** 28s

**Voiceover script:**
```
[slow] Hiring a part-time project manager: fifty-two thousand dollars a year.
[pause] Notion plus Linear plus Slack stack: twenty-four hundred dollars a year.
[pause] Claude Pro plus ChatGPT Team: one thousand dollars a year.
[confident] ORANGEBOX Command. Forty-nine dollars. Once. Forever.
[whispered] The only line item that doesn't compound.
[confident] Atomeons dot com slash orangebox.
```

**Visual:** Comparison ladder slides, big $49 reveal, Stripe receipt

---

## YS4 — "Local AI lab under his desk" (riff on @leopardracer viral)

**Voice:** Japanese-accented English (technical authority)
**Duration:** 32s

**Voiceover script:**
```
[confident] He hasn't paid an API bill in three months.
[pause] His agents ran ten thousand times for free.
[pause] But the cockpit gap is where most local-AI setups die.
ORANGEBOX gives a local lab a project spine.
[pause] Mission graph DAG. Four-layer memory. Receipts.
Agent-agnostic. Works with Claude, GPT, local Ollama.
[confident] Forty-nine dollars. Atomeons dot com slash orangebox.
```

**Visual:** Two GPUs glowing, cockpit screen overlaid, mission graph drawing itself

---

## YS5 — "The suits charge $200/mo, I built $49 once"

**Voice:** Australian male (mate-cool)
**Duration:** 25s

**Voiceover script:**
```
[smug] The suits want you renting your AI stack at two hundred dollars a month.
[pause] I built it for forty-nine dollars. Once.
[pause] Claude. GPT. Gemini. Ollama. One cockpit. You own it.
[confident] Hack the AI stack.
[whispered] Atomeons dot com slash orangebox.
```

**Visual:** Suit silhouette getting cut by bolt cutters animation, cockpit reveal, $49 logo

---

## Asset pipeline per Short

1. **Voiceover:** ElevenLabs (use voice rotation above)
2. **B-roll #1 (cockpit demo):** Runway prompt "dark hacker workspace, cockpit dashboard with mission graph, glowing orange node graph, cinematic close-up zoom"
3. **B-roll #2 (atomeons.com scroll):** screen recording (operator captures OR Runway gen)
4. **B-roll #3 (Stripe success):** Runway prompt "stripe checkout success page, green confirmation animation, $49 charge cleared, cinematic"
5. **Music:** TikTok Commercial Music Library (royalty-free, in CapCut)
6. **Captions:** auto-gen via CapCut or YouTube Studio

## Posting cadence

- 1 YS / day to YouTube Shorts
- Same asset cross-posted to TikTok @atomraps + IG Reels @atommccree (with handle-tier caption adjustments)
- Schedule via YT Studio Calendar (7 days in advance OK)

## Tracking per Short

After 24h, log to `CAMPAIGN/receipts/yt-shorts-perf-YYYY-MM-DD.json`:
```json
{
  "ys_id": "YS1",
  "uploaded_at": "...",
  "views_24h": null,
  "likes_24h": null,
  "comments_24h": null,
  "link_clicks_24h": null,
  "subs_gained_24h": null
}
```
