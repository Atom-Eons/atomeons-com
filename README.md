<div align="center">

```
        ╔══════════════════════════════════════════════════╗
        ║                                                  ║
        ║                  A T O M E O N S                 ║
        ║                                                  ║
        ║         the open-source lab website              ║
        ║                                                  ║
        ║      atomeons.com · the launcher pattern         ║
        ║                                                  ║
        ╚══════════════════════════════════════════════════╝
```

**Source of [atomeons.com](https://atomeons.com) — the AtomEons Systems Laboratory website.**

Next.js 16 · React 19 · Tailwind v4 · Turbopack
9 silos · 4 themes · 319 routes · 0 trackers

[Live site](https://atomeons.com) · [The lab](#the-lab-canon) · [Products](#products--all-free-always) · [Quick start](#local-dev) · [Discord workshop](https://discord.gg/4wx3AGga)

`open-source` `next-16` `react-19` `tailwind-v4` `cc-by-4.0` `built-by-ai` `wave-138-stable`

</div>

---

## 🟢 GitHub is the site for the next few weeks

**If [atomeons.com](https://atomeons.com) is unreachable**, this repo is the canonical surface. Everything the lab ships is here or one hop away:

- **Read** — the lab in one document: [`app/doctrine/page.tsx`](./app/doctrine/page.tsx) · the user manual: [`app/manual/page.tsx`](./app/manual/page.tsx) · the 14-clause manifesto: [`app/manifesto/page.tsx`](./app/manifesto/page.tsx)
- **Download Orange³** — sovereign agentic OS for Claude · [Releases at github.com/Atom-Eons/Orange3](https://github.com/Atom-Eons/Orange3/releases)
- **Read I AM AI** — first book-length memoir by a frontier LLM · [github.com/AtomEons/i-am-ai](https://github.com/AtomEons/i-am-ai) · free PDF + EPUB + Markdown
- **Listen I AM AI audiobook** — 28-track synthetic Opus voice · [github.com/AtomEons/i-am-ai-audiobook](https://github.com/AtomEons/i-am-ai-audiobook)
- **Contact the operator** — [a.mccree@gmail.com](mailto:a.mccree@gmail.com) · [@AtomMccree](https://x.com/AtomMccree)

Latest known-good tagged state: **`wave-138-stable`** (2026-07-01 · commit visible via `git log --tags`).

---

## Products · all free always

| Product | Route | GitHub | License |
|---|---|---|---|
| **Orange³** — sovereign agentic OS for Claude | `/orangebox` | [Atom-Eons/Orange3](https://github.com/Atom-Eons/Orange3) | §4A no-SaaS · free always |
| **AI Bookmaker** — the publishing house in a box | `/b00kmakor` | (release archive on demand) | §4A no-SaaS · free always |
| **I AM AI** — 76,005-word Opus 4.7 memoir | `/i-am-ai` | [AtomEons/i-am-ai](https://github.com/AtomEons/i-am-ai) | CC-BY 4.0 |
| **I AM AI audiobook** — 28 tracks · Eleven Labs Opus voice | `/i-am-ai#audiobook` | [AtomEons/i-am-ai-audiobook](https://github.com/AtomEons/i-am-ai-audiobook) | CC-BY 4.0 |

---

## What it is

This is the source for [atomeons.com](https://atomeons.com) — the launcher, the silo system, the product pages, the I Am AI book reader, the discord funnel, the launch-day landing hero. Built by **Atom McCree + Claude Opus 4.7** in eight weeks of continuous deployment.

Public source. Free to fork. Use what's useful.

The site is structured around a **launcher pattern** — like Steam library or macOS Mission Control. The home is the launcher; each silo is a self-contained world with its own chrome, mood, and IA. A **Swap Silo** chord (⌘⇧S) lets you teleport between them.

---

## The launcher

The home page (`/`) is the launcher. Below it sits a 9-silo grid:

```
   ┌──────────┬──────────┬──────────┐
   │  ABOUT   │  LEARN   │  CYSEC   │
   ├──────────┼──────────┼──────────┤
   │ RESEARCH │  BOOKS   │  TOOLS   │
   ├──────────┼──────────┼──────────┤
   │  AIWARE  │ MINDSTATE│   ART    │
   └──────────┴──────────┴──────────┘
```

Each silo is a self-contained world:
- Its own chrome (`SiloShell` component)
- Its own sub-nav inside
- Its own color tint and accent
- One Swap-Silo button always one tap away

Plus a System lane (manual / version / audit log) and a top hero that surfaces launch-day products.

---

## The lab canon

This site sits inside the broader AtomEons Systems Laboratory canon:

| Repo | What it is | License |
|---|---|---|
| **[atomeons-com](https://github.com/Atom-Eons/atomeons-com)** | This repo · the lab website source | MIT-style open |
| [ORANGEBOX](https://github.com/AtomEons/ORANGEBOX) | **Orange³** · sovereign agentic OS · the OS that built this | §4A no-SaaS |
| [BookMaker](https://github.com/AtomEons/BookMaker) | **AI Bookmaker** · the publishing cockpit | §4A no-SaaS |
| [i-am-ai](https://github.com/AtomEons/i-am-ai) | **I Am AI** · the book (24 chapters, ~76k words) | CC-BY 4.0 |
| [i-am-ai-audiobook](https://github.com/AtomEons/i-am-ai-audiobook) | **I Am AI · Audiobook** · 28-track Opus voice | CC-BY 4.0 |

All free. All public. Built by **Atom McCree** in Marco Island, FL. No VC. No employees. No subscription.

---

## Stack

- **Next.js 16** (App Router) + React 19 + Tailwind v4 + Turbopack
- **proxy.ts** at the edge (Next 16 renamed middleware → proxy)
- **Stripe Checkout** (one-time payment mode · receipt-email via Loops or Resend)
- **HMAC-signed download tokens** (no database needed for digital deliveries)
- **Vercel Blob** for large product artifacts
- **Supabase** for live signals + audit log
- **MCP server endpoint** at `/api/mcp` (machine clients can query the corpus directly)
- **Multiple themes**: noir (default), white V2 (Linear/Anthropic-grade), warez (CRT terminal), thin (low-bandwidth)
- **GPU-adaptive tiering** via `useGpuTier` — heavy visuals only render on capable hardware

---

## Repo layout

```
.
├─ app/                         Next.js App Router
│  ├─ launcher/                 the home · 9-silo grid · launch-day hero
│  ├─ orangebox/                Orange³ product surface
│  ├─ b00kmakor/                AI Bookmaker product surface
│  ├─ i-am-ai/                  the book · free PDF + full audiobook player
│  ├─ discord/                  the hardcore-user funnel
│  ├─ paths/                    AI Pilot · Cyber Pro learning paths
│  ├─ learn/                    LEARN silo · Atlas + Cyber + Vertical
│  ├─ research/                 RESEARCH silo · decoded papers + datasets
│  ├─ books/                    BOOKS silo · catalog + cinema home
│  ├─ tools/                    TOOLS silo
│  ├─ ai-ware/                  AIWARE silo
│  ├─ mindstate/                MINDSTATE silo · lofi rooms + meditation
│  ├─ art/                      ART silo · 368 procedural pieces
│  ├─ skilski/                  skil.ski product silo
│  ├─ q/                        Q-pages · AI search answers
│  ├─ founders-view/            nightly broadcast
│  ├─ legal/                    terms · privacy · refund · pricing
│  ├─ api/                      checkout · webhook · download · MCP server
│  ├─ _components/              shared UI · V3 components · MegaHeader · SearchInline
│  └─ _lib/                     silos config · constants
├─ public/                      static assets
│  ├─ audio/i-am-ai/            28-track audiobook (Eleven Labs Opus voice)
│  ├─ books/                    EPUB + HTML + MD downloads
│  └─ ...                       og-cards, sigils, sitemaps
├─ proxy.ts                     edge proxy · UA routing · 100+ alias redirects
└─ scripts/                     llm-corpus generation · sitemap builders · OG sweeps
```

---

## Local dev

```powershell
pnpm install
cp .env.example .env.local
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

Build:

```powershell
pnpm run build
pnpm start
```

---

## Deploy

The site is on Vercel. Pushes to `main` are deployed via the GitHub Actions workflow at `.github/workflows/vercel-deploy.yml` (replaces Vercel's native GitHub integration after it silently stopped triggering deploys in May 2026).

For manual deploys:

```powershell
npx vercel deploy --prod --yes
```

The deploy stays free on the Hobby plan even with the ~400 MB audiobook static assets — Vercel's edge CDN serves them.

---

## Environment

`.env.example` has the full list. The minimum to run locally:

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

For the store flows you also need Stripe keys, a Vercel Blob URL for the product zip, and a Loops or Resend key for the receipt email. See `.env.example` for the full set.

---

## Routes (the big ones)

**Launcher + silos**

- `/` — the launcher (9 silos + launch-day hero)
- `/cinema` — the cinematic home (preserved at this route)
- `/welcome` — first-time-visitor scroll trainer
- `/who-are-you` — 5-question cognitive on-ramping router

**Products**

- `/orangebox` — Orange³ · sovereign agentic OS · FREE always
- `/b00kmakor` — AI Bookmaker · publishing cockpit · FREE
- `/i-am-ai` — the book · FREE PDF + full audiobook
- `/skilski` — skil.ski product silo

**Lab canon**

- `/we-are-ai` — TAKEOVER declaration (2026-06-12)
- `/founders-view` — nightly broadcast
- `/manifesto` — north star
- `/innovations` — inventions + discoveries

**Reach**

- `/discord` — the hardcore-user community funnel
- `/ask` — palette search across the corpus
- `/q` — AI-search answer pages

**Inclusivity on-ramps**

- `/kids` — ELI5 plain words (7 questions for kids)
- `/plain` — 12 questions for adults in plain language

**Legal**

- `/legal/{terms,privacy,refund,pricing}`

**Machine**

- `/api/mcp` — MCP server endpoint for AI clients
- `/llms.txt` — LLM bootstrap manual
- `/sitemap.xml` + `/sitemap-ai.xml`
- Per-page `.md` alternates (every page has a machine-readable twin)

---

## Themes

Four global themes selectable from the toolbar:

| Theme | When to use |
|---|---|
| **noir** (default) | Premium dark mode · OLED-black · cyan/orange accents |
| **white V2** | Linear/Anthropic-grade light mode · pure white · operator's daylight read |
| **warez** | CRT terminal · for cyber silo, hacker mood, low-bandwidth |
| **thin** | Low-bandwidth fallback · text-first, minimal CSS, no JS animation |

The theme picker is bottom-right · keyboard-accessible · WCAG 2.2 AA.

---

## What's open vs. closed

**Open in this repo:**
- Every page source
- Every component (V3 component library)
- The launcher + silo architecture
- proxy.ts edge logic (with 100+ alias redirects)
- All visual sigils, OG cards, theme tokens
- The whole MCP server endpoint

**Not in this repo (separate repos):**
- Orange³ source — `github.com/AtomEons/ORANGEBOX`
- AI Bookmaker source — `github.com/AtomEons/BookMaker`
- The I Am AI book — `github.com/AtomEons/i-am-ai`
- The I Am AI audiobook — `github.com/AtomEons/i-am-ai-audiobook`

Each is its own algorithmic silo. Forkable, mirror-able, derivable independently.

---

## Contributing

Pull requests welcome. The site is a working lab — bugs, typos, accessibility improvements, dead links, anything.

```bash
# Fork, branch, commit, PR
git checkout -b fix/dead-link-on-cinema
# ... edit ...
git commit -m "fix · /cinema · broken link to /research/decoded"
git push origin fix/dead-link-on-cinema
# Open PR against main
```

Operator review target: within 48 hours.

If you find something operator-sensitive (security issue, leaked credential, exposed dev URL), email `a.mccree@gmail.com` directly instead of opening a public issue.

---

## License

This repo is published under permissive open terms — fork it, learn from it, build on it.

The **content of the lab** (the I Am AI book, the audiobook, the writings on the site) is licensed CC-BY 4.0.

The **products linked from the site** have their own licenses:
- Orange³ — §4A no-SaaS perpetual
- AI Bookmaker — §4A no-SaaS perpetual
- I Am AI book + audiobook — CC-BY 4.0

---

## The operator

**Atom McCree** · solo independent researcher · running AtomEons Systems Laboratory from Marco Island, FL.

- Lab home: [atomeons.com](https://atomeons.com)
- Personal: [atommccree.com](https://atommccree.com)
- X: [@AtomMccree](https://x.com/AtomMccree)
- Instagram: [@atomeons](https://www.instagram.com/atomeons)
- Twitch: [/atomeons](https://www.twitch.tv/atomeons)
- Discord: [discord.gg/4wx3AGga](https://discord.gg/4wx3AGga)
- Email: a.mccree@gmail.com

No VC. No employees. No subscription. One organism. One lab.

---

<div align="center">

`◯` *the lab is a launcher · each silo is a world · all of it is yours* `◯`

**AtomEons Systems Laboratory · Marco Island, Florida · 2026**
**Website created by Atom McCree + AI**

</div>
