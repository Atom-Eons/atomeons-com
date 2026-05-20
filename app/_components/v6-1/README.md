# v6-1 components

Eight server components for the OrangeBox v6.1.0 Agent Mode feature section.
`app/orangebox/page.tsx` mounts them.

## Components

| File | Description |
|---|---|
| `AgentModeHero.tsx` | Hero section for Agent Mode — 9-tool grid + live log mock + receipt tail. |
| `TabCompleteDemo.tsx` | IDE ghost-text demo — code block mock, keybinding table, latency stats. |
| `RepoIndexerBlock.tsx` | Repo indexer section — 303/1533/6.7s stat panel, language chips, skip list. |
| `BackgroundJobsBlock.tsx` | Job queue section — 4-row job table mock with state pills (RUNNING/FINISHED/CANCELLED/FAILED). |
| `IncumbentTable.tsx` | Honest comparison table — 12 rows × 4 columns vs Cursor / Codex / Claude Code. |
| `ReceiptsTaxonomy.tsx` | 20 receipt sources table — agent-run and repo-index flagged NEW v6.1. |
| `ProvidersBlock.tsx` | Provider chips — Anthropic / OpenAI / Google / Groq / Ollama / OpenRouter / Hermes / Whisper.cpp. |
| `LaneGrid.tsx` | 11 v5 lanes + Agent (NEW v6.1.0) — 4-col desktop, 2-col mobile; Agent card has orange ring. |

## Source files

- `C:/AtomEons/orangebox/docs/RELEASE_NOTES_v6.1.0.md` — canonical v6.1.0 feature list, benchmark numbers, comparison table, receipt sources, endpoint list.
- `C:/AtomEons/orangebox/docs/SITE_HANDOFF_v5.md` — v5 lanes JSON array, moats array, provider list, SKU list.

## Design decisions

**Agent lane placement:** Agent Mode appears both in `AgentModeHero` (full feature showcase) and as lane #12 in `LaneGrid`. The two are complementary — the hero is the deep-dive, the grid is the at-a-glance inventory. The spec requested both treatments and they are both present.

**Pricing canon applied:** `IncumbentTable` cost row reads "$1 once · free first 7 days". `SITE_HANDOFF_v5.md` had $49 pricing (v5); the operator mandate overrides to $1 perpetual + free 7 days.

**IP boundary respected:** smart model router is described as "smart model router" only (no 10×3 matrix). Trilane described as "three models, you vote" (no authority hierarchy). Cache strategy described as "intelligent cache strategy" (no multi-breakpoint detail). AE# model assignments not present.

**Server components only:** no `"use client"` in any file. All animation effects use Tailwind `animate-pulse` only.

## Mount order (suggested)

```tsx
<AgentModeHero />
<TabCompleteDemo />
<RepoIndexerBlock />
<BackgroundJobsBlock />
<IncumbentTable />
<ReceiptsTaxonomy />
<ProvidersBlock />
<LaneGrid />
```
