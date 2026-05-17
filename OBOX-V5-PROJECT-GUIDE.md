# ORANGEBOX v5 — Project Guide & Update

Updated 2026-05-17 ahead of v5 launch (<2h window).

This doc holds **what's been learned this campaign**, **what the v5 site is**, **where finals go**, and **what I need from the operator** to ship.

---

## 0. Decisions locked (operator-confirmed)

| Axis | Decision |
|---|---|
| **Theme** | Frontier black + bio-cyan glow + ORANGEBOX orange CTA retained |
| **Scope** | Full replace at `atomeons.com` root (no /v5 fallback) |
| **Hero copy** | Keep `$49 once, forever` + cockpit positioning |
| **Hero visual** | Photorealistic hardware-on-desk via Midjourney |
| **Marketing push** | **HOLD** — no rapid-fire posts. Save engagement for v5 reveal |

---

## 1. Lessons that change how this project functions

### 1a. X algorithm intel (May 2026 source — `CAMPAIGN/20`)

- **`AuthorDiversityScorer` decays each sequential same-author post by `decay^position`.** Hard floor: 90 minutes between originals. Patched into `poster.mjs` (`--force` to override for milestone posts).
- **Replies never enter the Grok quality classifier.** Only originals get out-of-network amplification. Replies = thread-only value.
- **First 30 minutes decide whether Grok evaluates a post at all.** Below threshold = post is dead-and-buried. Implication: every original needs first-10-min seed engagement (DM friends, operator like).
- **Dwell > likes 5×.** Lists, contrast formats, specific numbers, screenshots that earn a pause. Stop punchy one-liners.
- **Embedding poisons slowly, decays slowly (6-16 weeks).** Past `not_dwelled` / blocks / mutes / reports accumulate. Quality > velocity from here.
- **Location not a penalty. Timing + language are.** Post US prime: 8-11am ET / 1-3pm / 7-10pm ET.

### 1b. Browser MCP bugs + workarounds

- **Reply context loss bug** on X: clicking the reply button from a search-results feed or a 4h+ old feed item opens a **standalone composer** instead of the thread reply. Content gets posted but loses the @reply attribution.
- **Workaround:** navigate to the post's direct URL (`x.com/USER/status/POSTID`), click the inline `Post your reply` textbox at the bottom of the post page. Reply context is preserved.
- **CDP renderer freeze** on developer.x.com (and occasionally x.com post pages). Wait + retry, or refresh.
- **LinkedIn**: Save-as-draft modal can hang sessions — requires manual `Discard` click from operator to clear.

### 1c. API automation (poster.mjs)

- **X API setup proven end-to-end.** $100 Basic tier. App at developer.x.com → Settings → Read+Write + Callback URI + Website URL → save → generate OAuth 1.0a Access Token + Secret.
- **OAuth 1.0a HMAC-SHA1 signing required** for `POST /2/tweets`. Bearer alone is read-only.
- **Tokens stored in `CAMPAIGN/scripts/.env.local`** (gitignored). poster.mjs has zero-dep dotenv loader.
- **API-fired posts go live in ~1-2 seconds** vs ~30 seconds for browser-clicked. Cadence ceiling lifted but the algorithm intel above caps it anyway.
- **Duplicate-content rejection (403)** on X if text matches a previously posted tweet. Rewrite + retry.

### 1d. Engagement playbook

- **Reply to verified / big-follower targets only** — `SpamEapiLowFollowerClassifier` penalizes reply-spamming small accounts.
- **Quote-tweet viral posts in our niche** is a NEW lane the campaign hasn't exploited. Algo already knows the original engages; our take stacks on top.
- **Verified-account inbound interest is the strongest sales signal.** This campaign produced 4 followers (3 verified): Magnus, HumanAndMe, Ehsan✓ (ibuildinpublic.com creator who messaged "would love to build a connection"), Kappa Minta.

### 1e. Lanes status

| Lane | Status | Block |
|---|---|---|
| X originals | ✅ API live | — |
| X replies | ✅ browser (with workaround) | — |
| LinkedIn | ❌ blocked | Hung draft modal + missing API tokens |
| Reddit | ❌ blocked | reddit.com blocked at MCP layer + no `reddit-mcp` install |
| TikTok | 🟡 logged in, no posting flow | Need manual or platform-native scheduler |
| YouTube | 🟡 logged in, no posting flow | Same |
| IG / FB | 🟡 logged in via Meta Business | Operator boss-on-IG constraint, keep frontier-grade |
| ElevenLabs | ✅ VO ready (121K credits) | — |
| Runway | ✅ logged in (1,824 credits) | — |
| Midjourney | ✅ Personalization done | — |

---

## 2. Folder structure — where finals go

```
C:/AtomEons/.claude/worktrees/bold-leakey-4470e8/
├── atomeons-com/                          ← live Next.js site (full replace target)
│   ├── app/
│   │   ├── page.tsx                       ← v5 home (REWRITE)
│   │   ├── orangebox/page.tsx             ← v5 product page (REWRITE)
│   │   ├── mistakes/                      ← keep (transparency proof)
│   │   ├── api/sales-count/               ← keep
│   │   └── api/heartbeat/                 ← keep
│   ├── _components/
│   │   ├── SalesCounter.tsx               ← keep (build-in-public proof)
│   │   └── v5/                            ← NEW — v5 components live here
│   │       ├── Hero.tsx
│   │       ├── Cockpit.tsx
│   │       ├── BuyBlock.tsx
│   │       └── ThemeTokens.ts             ← bio-cyan + orange tokens
│   ├── public/
│   │   ├── v5/                            ← NEW — v5 finals folder
│   │   │   ├── hero/                      ← Midjourney photorealistic hardware-on-desk
│   │   │   │   ├── hero-01.png            ← primary hero image
│   │   │   │   ├── hero-02.png            ← alt
│   │   │   │   └── hero-03.png            ← alt
│   │   │   ├── video/                     ← Runway loops + hero video
│   │   │   │   └── hero-loop.mp4
│   │   │   ├── audio/                     ← ElevenLabs voiceovers if hero is video+audio
│   │   │   │   └── hero-vo.mp3
│   │   │   └── og/                        ← updated OG image for social shares
│   │   │       └── og-v5.png
│   │   └── ... (current assets stay)
│   └── styles/                            ← v5 CSS tokens injected into Tailwind config
│
├── CAMPAIGN/                              ← campaign docs + scripts
│   ├── 00 through 19                      ← existing docs (keep as history)
│   ├── 20-X-ALGORITHM-INTEL-MAY2026.md    ← critical doctrine update
│   └── scripts/
│       ├── poster.mjs                     ← API automation (patched with 90-min floor)
│       ├── queue.jsonl                    ← post queue (sales-ledger)
│       └── .env.local                     ← X API tokens (gitignored)
│
├── orangebox-installer/                   ← (if applicable) actual .msi/.exe finals
│   └── v1.4.0/
│       ├── ORANGEBOX-Setup-v1.4.0.msi
│       └── checksums.txt
│
└── OBOX-V5-PROJECT-GUIDE.md               ← this file
```

**Operator drop point for v5 finals → `atomeons-com/public/v5/`.**
Subfolders auto-routed (hero / video / audio / og).

---

## 3. What I need from operator for v5

### Hard requirements (blocks build)
1. **Confirm domain + deploy target** = atomeons.com on Vercel (existing project `project-zzk75`). No DNS changes needed.
2. **Confirm Stripe checkout link still good** — same `$49 once` SKU.

### Soft requirements (improves output, build can proceed without)
1. **A photo of your actual desk / build setup** if you want me to anchor the MJ hero generation to something real. Otherwise I freestyle the photorealistic prompt.
2. **One-line tagline** for under the hero H1, if you have a fresh one. Default fallback: "the AI cockpit for Claude Code".
3. **Any new copy** for sections you want surfaced (testimonial, refund policy reminder, /mistakes page link).
4. **Press / verified mentions** to render as social proof: Chamath thread reply, Brockman thread, Nikunj 167K-view, Robin Ebers thread, Smidstrup data sov reply. Tell me which to feature.

### Asset I'm generating (no input needed)
- 3 Midjourney hero variants (photorealistic hardware-on-desk, bio-cyan + orange palette)
- 1 Runway 16:9 hero loop (10-15 sec, audio-bearing for X dwell signal)
- Updated OG image for social shares

### Theme tokens I'll set
```ts
// _components/v5/ThemeTokens.ts
export const v5 = {
  bg:        "#000000",          // pure black
  bgElev:    "#0A0F11",          // subtle elevation
  fg:        "#F2F4F5",          // primary text
  fgMuted:   "#6B7779",          // secondary text
  cyan:      "#22F0D5",          // bio-cyan glow accent
  cyanDim:   "#0FB39E",          // hover / muted
  orange:    "#FF7A1A",          // ORANGEBOX CTA (signature retained)
  orangeHot: "#FFA45A",          // hover
  border:    "#1A2225",          // subtle border
  glow:      "rgba(34,240,213,0.35)",   // cyan glow for hover halos
};
```

---

## 4. What I'll do in the next 2 hours

1. **HOLD all autonomous marketing posts** ✅ (wakeup will fire once more in 60min and I'll suppress)
2. **Inventory existing MJ + Runway tabs** to pull anything reusable
3. **Queue 3 MJ hero variants** with the photorealistic prompt
4. **Queue 1 Runway hero video** when MJ stills are picked
5. **Stand by for v5 build coordination**

---

## 5. Post-launch (after v5 ships)

- **Wait 60 min before the first v5 announce-post on X** — algo intel says first 30 min decide reach; we need to seed engagement.
- **DM 3-5 close contacts** in first 10 min after the v5-reveal post to get dwell signals.
- **Quote-tweet 1-2 viral Claude/Codex/AI posts** with v5 angle — new lane per algo intel.
- **Keep 90-min floor** between originals. Resume cadence at sustainable pace.
- **Re-baseline `/api/sales-count`** — v5 conversion lift vs current should show in 24-48h. If still 0/100 after 5 days on v5, problem is offer not reach (per algo intel stop condition).

---

## 6. Stop conditions

- If MJ asset gen fails repeatedly (>3 attempts) — fall back to **typography-only hero** (no image, big bold H1 + buy button). Apple/Linear style. Doesn't lose the launch.
- If Runway video gen takes longer than launch window — ship without video, add post-launch.
- If theme tokens conflict with existing Tailwind config — keep current `_components/SalesCounter.tsx` intact, layer v5 components on top.
