# FOR IMMEDIATE RELEASE — 2026-05-17

## SOLO FLORIDA FOUNDER SHIPS 4.46 MB NATIVE AI COCKPIT WITH $1 LADDER PRICING — LEGALLY BANS SUBSCRIPTION SWITCH FOREVER

**Marco Island, FL — May 17, 2026** — AtomEons Systems Laboratory, a one-person research and software lab in Marco Island, Florida, today shipped **ORANGEBOX Command v6.0** — a 4.46 megabyte native AI cockpit written in Rust and egui that replaces three subscription tools (Claude Code, Cursor, and Codex) in a single panel users own outright. The product is priced at **$1 USD, one-time, perpetual**, with a dynamic ladder mechanism that adds $1 to the price every 100 sales — and a license clause (§4A) that legally forbids the company from ever switching to subscription billing.

The release is the first major version of ORANGEBOX shipped as a native binary. Prior versions (v1.x – v5.x) ran inside a Tauri webview shell. v6 eliminates the bundled browser entirely. The result: a single executable that launches in approximately 2 seconds, binds its internal sidecar in 541 milliseconds, and serves its full status API in 2.2 seconds end-to-end on a cold start.

### THE ARCHITECTURAL CASE

"Every other AI cockpit in 2026 ships 200 megabytes of bundled chromium to render what is functionally a chat window with autocomplete," said founder Atom McCree. "That is not engineering. That is what happens when nobody on the team has shipped a native binary in fifteen years. v6 is the answer to a single question I have been asking since I started this lab: what would this look like if I just refused?"

ORANGEBOX v6 is structured as eleven keyboard-addressable lanes:
- **Cockpit** (Ctrl+1) — home, DAG, party-line status, Now panel
- **IDE** (Ctrl+2) — Monaco-style editor with tab autocomplete via Groq LPUs, sub-100ms cached
- **Terminal** (Ctrl+3) — real PTY with Ctrl+K agent overlay
- **Trilane** (Ctrl+4) — parallel Claude + GPT + Gemini debate with user-voted reconciliation
- **Voice** (Ctrl+5) — local Whisper.cpp transcription
- **𝕏 Feed** (Ctrl+Shift+X) — live X reads via the Hermes Agent
- **Vault** (Ctrl+6) — compounding lattice memory
- **Receipts** (Ctrl+7) — every action emits a portable receipt
- **Privacy** (Ctrl+8) — per-provider cost audit, air-gap toggle
- **Skils** (Ctrl+9) — Skil.Ski marketplace via one MCP endpoint
- **Settings** (Ctrl+0) — cockpit pin, keys, language, accessibility

### THE PRICING MECHANISM

The dynamic ladder is the first publicly-shipped pricing system of its kind in indie AI tooling. The first 100 buyers pay $1. The next 100 pay $2. The next 100 pay $3. The mechanism continues indefinitely. The price a buyer pays is locked at Stripe checkout-session creation, meaning forward buyers only — no retroactive billing. The first 100 customers know they paid the lowest possible price; every future buyer knows the price will continue to rise as adoption grows.

License §4A binds the company: should AtomEons ever attempt to switch ORANGEBOX to a subscription model, every existing buyer's license becomes free in perpetuity. The clause is published on the product page and ships inside the binary as documentation.

### THE 2026 STACK

ORANGEBOX v6 ships with first-class support for:
- **Anthropic Claude** (Opus 4.7, Sonnet 4.6, Haiku 4.5)
- **OpenAI GPT-5**
- **Google Gemini**
- **Groq LPUs** (llama-3.3-70b-versatile for sub-300ms quick replies; Gemma for opt-in pre-classification)
- **Ollama local models** (LOCAL_MODE environment flag swaps all Anthropic chat + voice paths to local inference)
- **OpenRouter** (200+ models)
- **Hermes Agent** (MIT-licensed, MIT-free, drives the live 𝕏 feed lane)

The Anthropic alpha surface is fully wired: adaptive thinking with effort parameter, advisor tool (Sonnet executor + Opus advisor), Anthropic memory tool auto-attached, Files API for vault sync, citations API on vault queries, prompt caching with pre-warm-on-boot, 1-hour vault TTL, compaction for long sessions, structured outputs with JSON schema validation, multi-breakpoint cache strategy, smart model router with cost-aware fallbacks, and the new Agent Teams advisory header.

### THE RESEARCH ARM

In parallel with v6, AtomEons published twelve research manuscripts under the ÆoNs Research banner. The papers span bioelectric oncology (the topological defect theory of carcinogenesis), the gut-brain axis ("The Mislabel Hypothesis"), solar information transfer ("The Code of the Coconut"), quantum-classical unification ("The Sine Wave Beneath"), DNA version control via biophotonic gate logic ("The Light Code Validation Protocol"), and the mathematical foundation of self-modifying dynamical systems ("Bifurcation Theory of SMDS"). Each paper carries an academic abstract and a plain-language summary written so a six-year-old or a grandparent can understand the claim.

The papers are CC-BY 4.0 licensed and available at https://atomeons.com/research/papers.

### THE NIGHTLY BROADCAST

ÆoNs Research also publishes The Founder's View — a daily 8pm Eastern letter authored autonomously by Anthropic Sonnet via a Vercel Cron job, voice-specified as Hunter S. Thompson + Orwell + Howard Beale + Fawkes (V for Vendetta), with explicit instruction to hit all political sides equally and to target systems, not people. The first letter, "The Doors, The Locks, And The Rent," is available at https://atomeons.com/founders-view.

The lab does not edit before publication, only retracts after with the reason stated. There is no email list and no algorithmic distribution. Readers bookmark the page or subscribe by RSS — the open protocol the lab views as ideologically consistent with the broadcast itself.

### ABOUT ATOMEONS

AtomEons Systems Laboratory is a solo independent research and software lab founded and operated by Atom McCree from Marco Island, Florida. The lab ships software (ORANGEBOX), maintains a skill marketplace (Skil.Ski), is preparing an AI publishing house (B00KMakor), and publishes research (ÆoNs Research). There is no team, no series-A funding, and no roadmap. All software ships with full source code included. All research ships under CC-BY 4.0.

### CONTACT

- **Email:** a.mccree@gmail.com
- **X:** @AtomMccree
- **Press kit:** https://atomeons.com/press
- **Product:** https://atomeons.com/orangebox
- **Research:** https://atomeons.com/research/papers
- **Nightly broadcast:** https://atomeons.com/founders-view
- **RSS:** https://atomeons.com/founders-view/rss.xml

### TECHNICAL APPENDIX

| Artifact | Size | SHA-256 |
|---|---|---|
| `orangebox.exe` (native binary) | 4.46 MB | `f7e189d30884b74e890688b6a1407ea37c7d2a6d11eebb23a9164e3e931825d6` |
| `orangebox-v6.0.0-portable.zip` | 34.71 MB | `f605ceb7cd850ce624edee215963c2ca77901c255ba3eaed39e4e7bcfc1acb68` |
| `orangebox-v6.0.0-setup.exe` (NSIS installer · default) | 23.68 MB | `8ecc770f4fab50cedecfa3a98eca2f18e0603762fab41adb8355ffedf87eeaf9` |

EV code-signing certificate scheduled for v6.1. Until then, expect Chrome SmartScreen warning on first download (standard for new domain reputation). SHA-256 verification recommended via `Get-FileHash` or `shasum -a 256`.

---

*Disclosure ID: ATOM-OBX-V6-PRESS-RELEASE-2026-0517*
*This release is CC-BY 4.0 — quote freely, attribute "AtomEons Systems Laboratory."*

###
