# SKILSKI Production Line — Operator Runbook

**Last updated:** 2026-04-30
**Owner:** Atom (sole operator)
**Mission:** turn 200K catalog rows + 4,500 SKIPAK.md curated entries into
**real, working, sellable agentskills.io-conformant Skilskis** delivered
through the Skilski Slope MCP server. **No guess. No speculate. Every skill researched.**

---

## The pipeline (one-line summary per stage)

```
SKIPAK.md ──┐
            ├─► ingest-skipak.mjs ─► _index/skipak-curated.jsonl (393 named, 42 phases)
catalog.json┘
            │
            ├─► generate-role-skipaks.mjs ─► _index/paks/<slug>.json   (42 role packs)
            │
            ├─► build-skipak-skillmd.mjs ─► _index/paks/_generated/<slug>/SKILL.md  (runnable)
            │
            ├─► gauntlet-functional.mjs ─► pass/fail (Node, deterministic)
            │
            ├─► generate-functional-skillmd.mjs (TODO — Claude Batch API)
            │   for individual member Skilskis (per-skill body generation)
            │
            ├─► llm-judge-eval.mjs (TODO — Claude Sonnet, batch)
            │   LLM-as-judge: triggers, format, tool order, hallucination
            │
            └─► publish.mjs (TODO) ─► writes to <tier>/<shard>/<slug>/SKILL.md
                catalog upsert with verified=true, version_hash bumped,
                pgvector embedding upsert
```

---

## Stage 1 — Ingest (DONE, runnable today)

```sh
node scripts/ingest-skipak.mjs
```

**Reads:** `C:/Users/a/Downloads/SKIPAK.md`
**Writes:**
- `_index/skipak-curated.jsonl` — 393 named skills, each with `slug`, `method`, `value`, `users_raw`, `user_count`, `phase_*`
- `_index/skipak-phases.json` — 42 phases with target / value blurb / tier label

**Determinism:** pure Node regex parse. No LLM. Re-runnable any time SKIPAK.md updates.

---

## Stage 2 — Role-based SkiPak emission (DONE, runnable today)

```sh
node scripts/generate-role-skipaks.mjs --top 12
```

**Reads:** `_index/skipak-curated.jsonl` + `_index/skipak-phases.json`
**Writes:** `_index/paks/<slug>.json` (42 files) + `_index/paks/_manifest.json`

Each Pak gets:
- Top-N highest-utility members (default 12, sorted by `user_count`)
- Tier auto-assigned (`elite` for compliance/finance/security/clinical/datasci/manufacturing; `pro` for the rest)
- Mode auto-assigned (`sequential_pipe` for finance/legal/healthcare/edtech workflow chains; `parallel` elsewhere)
- Triggers derived from each member's `value` line

**Operator can edit the JSON manually** to curate further, swap members, change mode, change tier. The next stage rebuilds the SKILL.md from whatever is in the JSON.

---

## Stage 3 — SkiPak SKILL.md auto-generation (DONE, runnable today)

```sh
node scripts/build-skipak-skillmd.mjs \
  --in  _index/paks/lifeskills.json \
  --out _index/paks/_generated/lifeskills/SKILL.md
```

Or batch (all 43 paks in <1 second):

```sh
for f in _index/paks/*.json; do
  [ "$f" = "_index/paks/_manifest.json" ] && continue
  slug=$(basename "$f" .json)
  node scripts/build-skipak-skillmd.mjs --in "$f" \
    --out "_index/paks/_generated/$slug/SKILL.md"
done
```

**Output:** an agentskills.io v1 + Gemini-perfect-template SKILL.md with:
- Frontmatter (name, description with triggers, mode, tier, members, schema, version_hash)
- 7 H2 sections: Context & Persona, Required MCP Tools & Schemas, Strict Constraints & Error Handling, Execution Steps (5 phases), Output Format, Dynamic Variables, References
- Phase 2 = Internal Scratchpad (chain-of-thought)
- Phase 3 = Fan-out per mode (parallel / sequential / sequential_pipe)
- Phase 4 = Assembly & YIELD (writes blocked behind explicit user approval)
- Phase 5 = Post-Flight Checklist (silent self-audit)
- Standardized error lines: `[SYSTEM ALERT]: ...`, `[TOOL ERROR]: ...`
- Negative constraints: DO NOT invent, DO NOT filler
- Dynamic variable hooks: `{{CURRENT_DATE}}`, `{{USER_TIER}}`, `{{USER_PAKS}}`, `{{USER_LOCATION}}`

**This is the file the buyer's LLM loads when their MCP client invokes the SkiPak's SkiRun tool.** No hand-coding. No markdown writing. The non-coder Pak Maker UI just calls this script with a JSON config.

---

## Stage 4 — Gauntlet (DONE, runnable today)

```sh
# single file
node scripts/gauntlet-functional.mjs --file _index/paks/_generated/lifeskills/SKILL.md

# whole tree, with report
node scripts/gauntlet-functional.mjs --dir _index/paks/_generated \
  --report _verify/gauntlet-$(date +%Y-%m-%d).jsonl
```

**Checks (all deterministic, all Node, ~50ms/file):**
- Frontmatter has required keys (`name`, `description`)
- `name` matches `^[a-z0-9-]+$`, ≤64 chars
- `description` ≥12 chars (with trigger keywords)
- 5 required H2 sections present in order
- 3+ Phases present (incl. Scratchpad)
- Banned syntax absent (`<thinking>`, `<instructions>`, `function_call`, TODO/FIXME, lorem ipsum)
- 5 Gemini optimization markers present (Scratchpad, Yield, SYSTEM ERROR, DO NOT, Post-Flight)
- File length 1.5K–60K bytes (sanity)

Exit 0 = pass; exit 1 = fail with structured JSON reasons.

---

## Stage 5 — Per-skill SKILL.md generation (TODO — design locked, build pending)

`generate-functional-skillmd.mjs` will batch-generate the body of each
INDIVIDUAL Skilski (member of a Pak). Operator's already-pasted system
prompt + Gemini's perfect template + Anthropic's 5 SCALE rules become
the prompt. Anthropic Claude Batch API runs ~4,500 SKIPAK seeds in 24h
for ~$300.

Inputs per call:
- Slug, method, value, user_count, phase context (from `_index/skipak-curated.jsonl`)
- The system prompt (architecture below)
- Real evidence pointers from existing `catalog.json` rows where slugs match

System prompt scaffold (frozen 2026-04-30):
1. Operator's pasted "platform-agnostic SKILL.md" rules
2. Gemini's 6 advanced optimizations (Scratchpad, Few-Shot, DO NOT, Yield, Active Voice, Post-Flight)
3. Anthropic SCALE rules (LLM-as-judge ready, fail-state, dynamic vars, semantic routing, strict tool schemas)
4. agentskills.io v1 schema declaration
5. **Hard rules:** "DO NOT invent tools not in `known-tools.json`. DO NOT cite regulations without evidence pointer. If unsure, output `## Open Questions` block listing what's missing."

---

## Stage 6 — LLM-as-Judge eval (TODO)

`llm-judge-eval.mjs` will run Claude Sonnet on each generated SKILL.md
with a structured rubric:
- Trigger correctness (will the description correctly match the user prompt?)
- Format correctness (does the body conform to spec?)
- Tool order (is the state machine logically sound?)
- Hallucination check (is every cited source / tool / regulation real?)
- Grade A/B/C/F. F = back to generator with feedback.

Pass threshold: A or B. ~70% expected pass rate first round.

---

## Stage 7 — Publish (TODO)

`publish.mjs` will:
- Move `_index/paks/_generated/<slug>/SKILL.md` to `<tier>/<shard>/<slug>/SKILL.md` (sharded by first letter)
- Append a `_index/ledger.jsonl` row (slug, tier, version_hash, gauntlet pass, judge grade, publish timestamp)
- Upsert catalog row (Postgres) with `verified: true`
- Upsert vector embedding (pgvector / Pinecone) of the `description` field for semantic routing

The MCP server (`nextapp/src/app/api/mcp`) reads from the filesystem +
catalog + vector DB to serve `tools/list` to authenticated buyers.

---

## File layout (canonical)

```
SKILSKI-SKILLS/
├── pro/                   tier corpus, sharded by first letter
│   ├── a/, b/, ...
├── elite/                 same
├── Oskis/                 193 open-source reference skills (read-only)
├── _index/                derived data, regeneratable
│   ├── skipak-curated.jsonl
│   ├── skipak-phases.json
│   ├── paks/              role-pack JSON configs (43 total + manifest)
│   │   ├── lifeskills.json
│   │   ├── admin-comm.json
│   │   ├── ...
│   │   └── _generated/    auto-built SKILL.md per pak (the runnable artifact)
│   │       └── <slug>/SKILL.md
│   ├── ledger.jsonl       (TODO) append-only gen/verify history
│   └── embeddings.faiss   (TODO) vector index for semantic routing
├── _verify/               gauntlet output (kept OUT of skill folders)
│   └── gauntlet-{date}.jsonl
└── scripts/
    ├── ingest-skipak.mjs                  Stage 1 — DONE
    ├── generate-role-skipaks.mjs          Stage 2 — DONE
    ├── build-skipak-skillmd.mjs           Stage 3 — DONE
    ├── gauntlet-functional.mjs            Stage 4 — DONE
    ├── generate-functional-skillmd.mjs    Stage 5 — TODO
    ├── llm-judge-eval.mjs                 Stage 6 — TODO
    ├── publish.mjs                        Stage 7 — TODO
    ├── known-tools.json                   tool registry (TODO)
    └── PRODUCTION-LINE.md                 this file
```

---

## What's REMARKABLE about this design

1. **Non-coder Pak Maker is real.** End user composes via UI → server-side
   runs `build-skipak-skillmd.mjs` → SKILL.md emitted → gauntlet validates → published.
   The operator never sees markdown.
2. **Every Pak passes Gemini's perfect template** by construction. The
   builder cannot emit a malformed pak. The gauntlet cannot let one
   through.
3. **Mode-aware orchestration.** Parallel / sequential / sequential_pipe
   each gets correct Phase 3 instructions. The buyer's LLM doesn't have
   to figure out fan-out semantics — the SKILL.md tells it.
4. **Dynamic variables baked in.** `{{CURRENT_DATE}}`, `{{USER_TIER}}`,
   `{{USER_PAKS}}`, `{{USER_LOCATION}}` placeholders are pre-injected by
   the MCP runtime before the LLM sees the body. No temporal hallucinations.
5. **Yield states for write actions.** Every Pak that touches money / email /
   external systems has a YIELD step requiring explicit user approval.
6. **Post-Flight checklist.** Last step before output: silent self-audit.
   Catches the LLM's own mistakes before the buyer sees them.

---

## Costs (projected for full 200K + 4,500 SKIPAK run)

| Stage | What | Cost | Wall time |
|---|---|---|---|
| 1-4 | Ingest, role-pak gen, build, gauntlet | $0 (Node) | <30s |
| 5 | Generate 4,500 SKIPAK skills via Batch API | ~$225 | 24-48h |
| 5 | Generate 200K catalog skills via Batch API | ~$10,000 | 14-21 days |
| 6 | LLM-as-judge eval | ~$200 (4,500) / ~$8,000 (200K) | 24-48h / 14-21d |
| 7 | Publish (Node + Supabase + Pinecone upserts) | $0 + DB | <1h |

**~$450 to ship 4,500 best-of-best functional Skilskis.**
**~$18,000 to ship the full 200K — but most of that is pure marginal value over the 4,500 core.**

---

## Hard rules (operator-pinned)

1. **No guess. No speculate.** Every skill grounded in catalog evidence
   (`proof_to_show`, `power_quote`, `source_file`) OR rejected.
2. **Skills are MCP-only.** Public site never exposes SKILL.md content.
3. **Skills are subscription-gated.** No individual purchase.
4. **Every Pak emits its own runnable SKILL.md** via `build-skipak-skillmd.mjs`.
5. **Every artifact must pass gauntlet** before publishing. No bypass.
6. **The non-coder Pak Maker is the truth.** If the builder can't emit
   it, the system is broken — fix the builder, not the workflow.
