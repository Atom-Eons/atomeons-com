# Hacker News — Show HN

**URL:** https://news.ycombinator.com/submit
**Best timing:** Tuesday or Wednesday 09:00 EST (highest front-page rate)

## Submission

**Title (80 char max — currently 79):**
```
Show HN: ORANGEBOX Command – desktop cockpit pairing with Claude Code, $49
```

**URL:**
```
https://atomeons.com/orangebox
```

**Text (optional — strongly recommended for Show HN context):**
```
I'm a solo independent researcher (AtomEons Systems Laboratory, Marco Island FL). After two years of internal R&D running Claude Code daily across multiple projects, I shipped ORANGEBOX Command v1.4.0 last week as a $49 one-time-purchase Windows desktop app.

What it actually is: a Tauri 2.x cockpit that surfaces 60+ MCP tools to Claude Code (and Claude Desktop, ChatGPT, Gemini, local Ollama models), plus a mission-graph DAG runner, party-line shared status bus (JSONL), 4-layer memory model, receipt + proof artifact rails, and a triad model lane router.

Why $49: because anyone with the itch to operate better should be able to afford a real cockpit. Locked anti-SaaS in LICENSE §4A — if I ever try to move to monthly billing, every existing buyer keeps their license free in perpetuity.

Local-first. Zero telemetry. Project state lives in %APPDATA% and never leaves your disk. Full source included for inspection.

230/230 peer-review tests passing. 27 Constitutional Guardrails. 9-stage Gate Chain (Gate 0 = Lattice Boundary Conditions Enforcement).

NEW in v1.4.0: Codexa Local mode — heavy execution work runs on the cockpit machine by default, no second computer needed. Codexa Remote remains available for power users with a dedicated worker box on their LAN.

Refund policy: 30-day Material Failure Guarantee (refund if it fails to install/launch on a clean Windows 10/11 + Node.js 20+ machine, License §8) + 30-day Workflow-Fit Refund (no questions, License §8A).

The website itself (atomeons.com) was built in one day on the cockpit it sells. Recursive proof.

Happy to answer anything about:
- the architecture (AE0–AE14 doctrine, 15 departments, 6 review engines)
- the MCP integration (60+ tools, how they expose project state to the model)
- the Constitutional Guardrails (Human Final Stop, LBCE, No Green Without Receipts, etc.)
- the pricing bet (why $49, why one-time, why anti-SaaS clause)
- the build (atomeons.com shipped in one day)
- macOS/Linux roadmap (v1.5)
- why I refused to use any existing AI orchestration framework
```

## After submitting

1. **First 30 minutes are critical** — reply to every comment.
2. Stay technical. The HN audience smells marketing within 3 sentences.
3. If hostile comment: respond honestly, name the limitation, ask what they'd build instead.
4. If positive comment: thank, then go deeper on architecture (don't pitch).
5. **Never argue politics, never argue licensing, never argue Anthropic.**
6. If post hits front page (>50 points in first hour): screenshot, amplify on X with quote.
7. Track via Vercel referrer breakdown for `news.ycombinator.com`.

## Common HN questions — pre-drafted answers

**Q: Why Windows-only?**
A: Solo founder. v1.4 ships Windows. v1.5 adds macOS + Linux. ARM64 not yet. Wine/CrossOver not supported per Material Failure Guarantee scope.

**Q: How is this different from <Cursor / Continue / Cline / Aider / ...>?**
A: Those are IDE/agent surfaces. ORANGEBOX is the project layer underneath them. It pairs with Claude Code (or any AI tool) via MCP, and gives the project: real memory, mission-graph DAG, 15 departments, receipt-backed gates. They're complementary, not competitive — you can run Cursor + ORANGEBOX side by side.

**Q: Open source?**
A: Source code included in the bundle for inspection + personal/single-business modification. Not open source — redistribution prohibited (LICENSE §3). I'm a solo founder. $49 supports the work; OSS doesn't.

**Q: What if you go out of business?**
A: Source is on the buyer's disk forever. Project state lives locally — no cloud dependency. Anti-SaaS §4A also means any future pivot keeps existing buyers whole.

**Q: How does the MCP integration actually work?**
A: 60+ MCP server tools surface ORANGEBOX state (mission graph, party-line, receipts, dept status, proof artifacts) to Claude Code over the standard Anthropic MCP protocol. Claude Code can read/write all of them. There's also a Claude Desktop config that wires the same tools.

**Q: Have any real customers?**
A: I run it daily on my own work. Public buyer count visible on atomeons.com [TODO: add live counter]. Refund offered means real risk asymmetry on the buyer side.

**Q: Why no trial?**
A: 30-day workflow-fit refund (no questions) is functionally a 30-day trial with the buyer holding the cards. Trials encourage tire-kicking; the refund encourages real use.
