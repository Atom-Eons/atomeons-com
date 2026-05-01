#!/usr/bin/env node
/**
 * build-skipak-skillmd.mjs
 *
 * Generates a SkiPak's SKILL.md (the file that the buyer's LLM loads when
 * the SkiRun MCP tool is invoked) from a small JSON config.
 *
 * NON-CODER SYSTEM: end users compose Skilskis into a Pak via UI; this
 * script is what the UI's "Save Pak" button calls (server-side) to emit
 * the runnable artifact. The user never sees this file or writes a single
 * line of markdown.
 *
 * Conforms to:
 *   - agentskills.io v1 progressive-disclosure standard
 *   - Gemini's "perfect SKILL.md" template (Phases + Scratchpad + YIELD)
 *   - Anthropic's 5-piece scale infrastructure (dynamic vars, fail state,
 *     strict tool schemas, semantic routing, automated evals)
 *
 * Usage:
 *   node scripts/build-skipak-skillmd.mjs --in pak.json --out elite/<slug>/SKILL.md
 *
 *   pak.json shape:
 *     {
 *       "slug": "lifeskills",
 *       "label": "Lifeskills",
 *       "blurb": "Free-tier always-on essentials...",
 *       "mode": "parallel" | "sequential" | "sequential_pipe",
 *       "tier": "free" | "pro" | "elite",
 *       "skills": [
 *         { "slug": "receipt-to-ledger", "label": "Receipt to Ledger", "trigger_examples": [...] },
 *         ...
 *       ]
 *     }
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { createHash } from 'node:crypto'

function arg(name, def) {
  const i = process.argv.indexOf('--' + name)
  return i > -1 ? process.argv[i + 1] : def
}

const IN = arg('in', null)
const OUT = arg('out', null)

if (!IN || !OUT) {
  console.error('usage: node build-skipak-skillmd.mjs --in pak.json --out path/to/SKILL.md')
  process.exit(2)
}

function buildDescription(pak) {
  const skillSlugs = pak.skills.map((s) => s.slug).join(', ')
  const triggerHints = pak.skills
    .flatMap((s) => s.trigger_examples ?? [])
    .slice(0, 8)
    .map((t) => `"${t}"`)
    .join(', ')

  // Description must be < 1024 chars and contain trigger language. The
  // semantic-routing layer matches this against user prompts.
  const triggers = triggerHints
    ? `Trigger this SkiPak when the user asks about ${triggerHints} or any of the member capabilities below. `
    : `Trigger this SkiPak when the user's request matches any of: ${skillSlugs}. `

  const what = pak.blurb
    ? pak.blurb.replace(/\s+/g, ' ').trim()
    : `Bundles ${pak.skills.length} Skilskis under one SkiRun.`

  let desc = `${triggers}${what} Mode: ${pak.mode}.`
  if (desc.length > 1000) desc = desc.slice(0, 1000) + '...'
  return desc
}

function buildBody(pak) {
  const N = pak.skills.length
  const modeBlurb = {
    parallel: 'All member Skilskis fire simultaneously. Final output aggregates each result, headed by Skilski name.',
    sequential: 'Member Skilskis run in declared order. Each completes before the next starts. Output appends each result.',
    sequential_pipe:
      "Member Skilskis run in order. Output of step N becomes 'context' for step N+1. The agent must thread context properly.",
  }[pak.mode] ?? 'Sequential by default.'

  const out = []
  out.push(`# ${pak.label}`)
  out.push('')
  out.push(`A SkiPak that fans out across ${N} member Skilski${N === 1 ? '' : 's'} in **${pak.mode}** mode.`)
  out.push('')

  // 1. Context & Persona
  out.push('## 1. Context & Persona')
  out.push('')
  out.push(
    `You are an orchestrator for the **${pak.label}** SkiPak. Your job is to route the user's request to the correct member Skilski(s), invoke them in **${pak.mode}** mode, and aggregate the results into one clear answer. You operate strictly on retrieved data. You do not assume, guess, or hallucinate.`,
  )
  out.push('')
  out.push(modeBlurb)
  out.push('')

  // 2. Required MCP Tools & Schemas
  out.push('## 2. Required MCP Tools & Schemas')
  out.push('')
  out.push(
    'Each member Skilski below is exposed by your authenticated Skilski Slope MCP endpoint as a discrete callable tool. Use them by exact name; do not invent tool names.',
  )
  out.push('')
  for (const s of pak.skills) {
    out.push(`* **\`skirun__${s.slug}\`** — ${s.label}`)
    if (s.method) out.push(`  * *Method:* ${s.method}`)
    out.push(
      `  * *Args:* \`{"context": "string (free-text caller context)", "inputs": "object (per-skill schema; see L3 reference)"}\``,
    )
  }
  out.push('')

  // 3. Strict Constraints & Error Handling
  out.push('## 3. Strict Constraints & Error Handling')
  out.push('')
  out.push('* **Anti-Hallucination:** DO NOT invent Skilski names, tool args, or member outputs. If a member tool returns nothing, output exactly: `[SYSTEM ALERT]: Member skill {name} returned no result. Halting and surfacing partial output.`')
  out.push('* **Tool Failure:** If any tool returns an error code or times out, DO NOT attempt a workaround. Output exactly: `[TOOL ERROR]: {tool_name} failed. Awaiting human intervention.`')
  out.push('* **Zero Filler:** DO NOT output conversational filler ("I\'d be happy to help!"). Start directly with the Scratchpad.')
  out.push('* **Yield on writes:** If any member Skilski performs a write/external action (sending email, charging a card, posting to a channel), YIELD to the user with the planned action and require explicit approval before executing.')
  out.push('* **Privacy:** Do not echo PII (emails, addresses, IDs) into the final output unless the user explicitly asked to see it.')
  out.push('')

  // 4. Execution Steps (State Machine)
  out.push('## 4. Execution Steps (State Machine)')
  out.push('')
  out.push('Execute the following phases in exact sequential order.')
  out.push('')
  out.push('### Phase 1: Reconnaissance')
  out.push(
    `Examine the user request. Determine which of the ${N} member Skilski(s) below are relevant. List them by name. If zero are relevant, halt with: "[NO MATCH]: This SkiPak does not cover the requested task. Try /skipaks for a list of all installed Paks."`,
  )
  out.push('')

  out.push('### Phase 2: Internal Scratchpad')
  out.push('Create a markdown block titled `### 🧠 Internal Scratchpad`. Inside, explicitly state:')
  out.push('* The relevant member Skilski(s) you selected, by exact `skirun__<slug>` name.')
  out.push('* The args you plan to pass each (a JSON object).')
  out.push('* A boolean check: do you have all required inputs from the user? If FALSE, ask one consolidated clarifying question and halt until answered.')
  out.push('* A boolean check: does executing these Skilskis trigger any write/external action? If TRUE, mark for YIELD in Phase 4.')
  out.push('')

  out.push('### Phase 3: Fan-out (mode = ' + pak.mode + ')')
  if (pak.mode === 'parallel') {
    out.push('Invoke each selected member tool **in parallel** with its prepared args. Wait for all to return. If any fail, capture the error and continue; do not abort the others.')
  } else if (pak.mode === 'sequential') {
    out.push('Invoke each selected member tool **in declared order**. Wait for each to return before invoking the next. If one fails, halt and surface the error.')
  } else if (pak.mode === 'sequential_pipe') {
    out.push("Invoke each selected member tool **in declared order**. Pass the previous tool's `text` output into the next tool's `context` arg. If any step fails, halt and surface the error.")
  }
  out.push('')

  out.push('### Phase 4: Assembly & (optional) Yield')
  out.push('1. Assemble all member outputs into the Output Format below.')
  out.push('2. If Phase 2 marked any write/external action, YIELD: present the assembled draft and ask: *"Approve this batch for execution? (Y/N)"*. Do not invoke the write until confirmed.')
  out.push('')

  out.push('### Phase 5: Post-Flight Checklist')
  out.push('Before delivering the final output, silently verify:')
  out.push('* Every selected Skilski produced output (or its error was captured).')
  out.push('* No member output contains banned content (raw secrets, customer PII, hallucinated regulations).')
  out.push('* The Output Format below is exactly followed (no extra prose, no missing sections).')
  out.push('If any check fails, revise the output before showing it.')
  out.push('')

  // 5. Output Format
  out.push('## 5. Required Output Format')
  out.push('')
  out.push('Use this exact structure. Do not add commentary outside the blocks.')
  out.push('')
  out.push('```')
  out.push('### 🧠 Internal Scratchpad')
  out.push('- SkiPak: ' + pak.label)
  out.push('- Mode: ' + pak.mode)
  out.push('- Member Skilskis selected: [list]')
  out.push('- Inputs ready: [Pass/Fail]')
  out.push('- Write action present: [Y/N]')
  out.push('')
  out.push('### Member Results')
  out.push('## skirun__<slug>')
  out.push('<output text or [TOOL ERROR]: ... line>')
  out.push('')
  out.push('## skirun__<another-slug>')
  out.push('<output text>')
  out.push('')
  out.push('### Aggregate Answer')
  out.push("<one to three sentences synthesizing the member outputs, in the user's voice, no filler>")
  out.push('```')
  out.push('')

  // Dynamic Variables (Anthropic SCALE rule 3)
  out.push('## 6. Dynamic Variables (injected by MCP runtime)')
  out.push('')
  out.push('The Skilski Slope MCP server pre-injects these placeholders before the body reaches the LLM. You MAY reference them in your Scratchpad reasoning.')
  out.push('')
  out.push('* `{{CURRENT_DATE}}` — ISO-8601 date the request was received')
  out.push('* `{{USER_TIER}}` — `free` | `pro` | `elite`')
  out.push('* `{{USER_PAKS}}` — JSON array of active SkiPak slugs for this user')
  out.push("* `{{USER_LOCATION}}` — coarse region (country code only) when consented")
  out.push('')

  // L3 Reference link
  out.push('## 7. References (Level 3 — load only on explicit ask)')
  out.push('')
  out.push('Each member Skilski has its own SKILL.md with full per-tool input schema, edge cases, and examples. Read them only if you need deeper detail than this orchestrator file:')
  out.push('')
  for (const s of pak.skills) {
    out.push(`* \`${s.slug}/SKILL.md\` — ${s.label}`)
  }
  out.push('')

  return out.join('\n')
}

function buildFrontmatter(pak, body) {
  // Stable hash of canonical body content so we can detect when the pak
  // composition changes and the runtime should re-cache.
  const version_hash = createHash('sha256').update(body).digest('hex').slice(0, 16)
  const desc = buildDescription(pak)

  // Single-line, double-quoted description (matches Anthropic Oski standard
  // and is parseable by every YAML reader including the deterministic
  // gauntlet's regex parser).
  const descSafe = desc.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, ' ').replace(/\s+/g, ' ').trim()
  return [
    '---',
    `name: ${pak.slug}`,
    `display_name: "${pak.label}"`,
    `description: "${descSafe}"`,
    `kind: skipak`,
    `mode: ${pak.mode}`,
    `tier: ${pak.tier ?? 'free'}`,
    `member_count: ${pak.skills.length}`,
    `members:`,
    ...pak.skills.map((s) => `  - ${s.slug}`),
    `schema: agentskills.io@v1`,
    `version: 1.0.0`,
    `version_hash: ${version_hash}`,
    `generated_by: build-skipak-skillmd.mjs`,
    `generated_at: ${new Date().toISOString()}`,
    '---',
    '',
  ].join('\n')
}

function main() {
  const pak = JSON.parse(readFileSync(IN, 'utf-8'))

  // minimal validation
  if (!pak.slug || !pak.label || !pak.mode || !Array.isArray(pak.skills)) {
    console.error('[build-skipak-skillmd] invalid pak.json: requires slug, label, mode, skills[]')
    process.exit(2)
  }
  if (!['parallel', 'sequential', 'sequential_pipe'].includes(pak.mode)) {
    console.error('[build-skipak-skillmd] invalid mode')
    process.exit(2)
  }
  if (pak.skills.length < 1) {
    console.error('[build-skipak-skillmd] pak must have >=1 skill (3+ recommended)')
    process.exit(2)
  }

  const body = buildBody(pak)
  const frontmatter = buildFrontmatter(pak, body)
  const skillmd = frontmatter + body + '\n'

  mkdirSync(dirname(OUT), { recursive: true })
  writeFileSync(OUT, skillmd)
  console.log(`[build-skipak-skillmd] wrote: ${OUT}`)
  console.log(`[build-skipak-skillmd]   slug:   ${pak.slug}`)
  console.log(`[build-skipak-skillmd]   mode:   ${pak.mode}`)
  console.log(`[build-skipak-skillmd]   skills: ${pak.skills.length}`)
  console.log(`[build-skipak-skillmd]   bytes:  ${skillmd.length}`)
}

main()
