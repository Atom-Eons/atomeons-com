#!/usr/bin/env node
/**
 * gauntlet-functional.mjs
 *
 * Deterministic Node-only validation of a SKILL.md file against the
 * agentskills.io v1 spec + Gemini's perfect-template structure.
 *
 * No LLM calls. Pure schema + regex + completeness checks. Runs in <50ms
 * per file.
 *
 * Returns:
 *   exit 0: pass
 *   exit 1: fail (with structured reason in stdout JSON)
 *
 * Usage:
 *   node scripts/gauntlet-functional.mjs --file path/to/SKILL.md
 *   node scripts/gauntlet-functional.mjs --dir elite/ --report _verify/gauntlet-{date}.jsonl
 */

import { readFileSync, writeFileSync, mkdirSync, statSync, readdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'

function arg(name, def) {
  const i = process.argv.indexOf('--' + name)
  return i > -1 ? process.argv[i + 1] : def
}

const FILE = arg('file', null)
const DIR = arg('dir', null)
const REPORT = arg('report', null)

const REQUIRED_FRONTMATTER_KEYS = ['name', 'description']
const REQUIRED_H2_SECTIONS = [
  /^##\s*1\.\s+Context\s*&\s*Persona/im,
  /^##\s*2\.\s+Required\s+MCP\s+Tools/im,
  /^##\s*3\.\s+Strict\s+Constraints/im,
  /^##\s*4\.\s+Execution\s+Steps/im,
  /^##\s*5\.\s+(Required\s+)?Output\s+Format/im,
]
const REQUIRED_PHASES = [
  /^###\s+Phase\s+1\b/im,
  /^###\s+Phase\s+2\b/im,
  /(?:^###\s+Phase\s+(?:3|4|5)\b|🧠\s*Internal\s+Scratchpad)/im,
]
const BANNED_PATTERNS = [
  { pattern: /<thinking>/i, why: 'Claude-proprietary <thinking> tag breaks portability' },
  { pattern: /<instructions>/i, why: 'Claude-proprietary <instructions> tag breaks portability' },
  // OpenAI inline function-calling JSON schemas (we allow them in `## 2. Required MCP Tools` as args descriptions, but not as raw schemas)
  { pattern: /"function_call":\s*{/i, why: 'OpenAI-specific function-calling schema breaks portability' },
  // common hallucination markers
  { pattern: /\bTODO\b|\bFIXME\b|\bXXX\b/i, why: 'TODO/FIXME marker means the skill is incomplete' },
  { pattern: /\blorem\s+ipsum\b/i, why: 'placeholder text — skill is incomplete' },
]
const REQUIRED_OPTIMIZATION_HINTS = [
  { pattern: /Internal\s+Scratchpad/im, why: 'must include scratchpad block (chain-of-thought)' },
  { pattern: /(YIELD|Yield)/m, why: 'must include yield-state for write actions' },
  { pattern: /SYSTEM\s+(?:ALERT|ERROR)/im, why: 'must include standardized error-handling line' },
  { pattern: /DO\s+NOT/m, why: 'must include negative constraints' },
  { pattern: /Post-?Flight|silently verify/i, why: 'must include post-flight checklist' },
]

function parseFrontmatter(text) {
  if (!text.startsWith('---\n')) return null
  const end = text.indexOf('\n---', 4)
  if (end === -1) return null
  const fm = text.slice(4, end)
  const out = {}
  let key = null
  for (const line of fm.split('\n')) {
    const m = line.match(/^([a-z_][a-z0-9_-]*)\s*:\s*(.*)$/i)
    if (m) {
      key = m[1]
      out[key] = m[2].trim()
    }
  }
  return out
}

function check(filePath) {
  const text = readFileSync(filePath, 'utf-8')
  const failures = []

  // Frontmatter
  const fm = parseFrontmatter(text)
  if (!fm) {
    failures.push({ kind: 'frontmatter', why: 'no YAML frontmatter delimited by --- ... ---' })
  } else {
    for (const k of REQUIRED_FRONTMATTER_KEYS) {
      if (!fm[k]) failures.push({ kind: 'frontmatter', why: `missing key: ${k}` })
    }
    if (fm.name && !/^[a-z0-9-]+$/.test(fm.name) && !/^[a-z0-9-]+$/.test(fm.name.replace(/['"]/g, ''))) {
      failures.push({ kind: 'frontmatter', why: `name must be lowercase + hyphens, got: ${fm.name}` })
    }
    if (fm.name && fm.name.replace(/['"]/g, '').length > 64) {
      failures.push({ kind: 'frontmatter', why: 'name exceeds 64 chars' })
    }
    if (!fm.description || fm.description.length < 12) {
      failures.push({ kind: 'frontmatter', why: 'description too short — must include trigger keywords (>=12 chars)' })
    }
  }

  // H2 sections
  for (const re of REQUIRED_H2_SECTIONS) {
    if (!re.test(text)) {
      failures.push({ kind: 'structure', why: `missing required section matching ${re}` })
    }
  }
  for (const re of REQUIRED_PHASES) {
    if (!re.test(text)) {
      failures.push({ kind: 'structure', why: `missing required phase matching ${re}` })
    }
  }

  // Banned patterns
  for (const { pattern, why } of BANNED_PATTERNS) {
    if (pattern.test(text)) failures.push({ kind: 'banned', why })
  }

  // Optimization hints (Gemini's 6-pack)
  for (const { pattern, why } of REQUIRED_OPTIMIZATION_HINTS) {
    if (!pattern.test(text)) failures.push({ kind: 'optimization', why })
  }

  // Length sanity
  if (text.length < 1500) failures.push({ kind: 'completeness', why: 'file too short (<1500 chars) — skill not fleshed out' })
  if (text.length > 60_000) failures.push({ kind: 'completeness', why: 'file too long (>60k chars) — split L3 references into separate files' })

  return {
    file: filePath,
    pass: failures.length === 0,
    failures,
    bytes: text.length,
    name: fm?.name ?? null,
    schema: fm?.schema ?? null,
  }
}

function walk(dir) {
  const out = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name)
    if (entry.isDirectory()) {
      out.push(...walk(p))
    } else if (entry.name === 'SKILL.md') {
      out.push(p)
    }
  }
  return out
}

function main() {
  if (!FILE && !DIR) {
    console.error('usage: node gauntlet-functional.mjs --file path/to/SKILL.md  OR  --dir path/to/tree [--report path/to/report.jsonl]')
    process.exit(2)
  }

  const targets = FILE ? [FILE] : walk(DIR)
  const results = targets.map(check)

  let passes = 0
  let fails = 0
  for (const r of results) {
    if (r.pass) passes++
    else fails++
  }

  if (REPORT) {
    mkdirSync(dirname(REPORT), { recursive: true })
    const lines = results.map((r) => JSON.stringify(r)).join('\n') + '\n'
    writeFileSync(REPORT, lines)
    console.log(`[gauntlet-functional] report: ${REPORT}`)
  }

  if (FILE) {
    const r = results[0]
    console.log(JSON.stringify(r, null, 2))
    process.exit(r.pass ? 0 : 1)
  }

  console.log(`[gauntlet-functional] checked: ${results.length}`)
  console.log(`[gauntlet-functional] pass:    ${passes}`)
  console.log(`[gauntlet-functional] fail:    ${fails}`)
  if (fails > 0) {
    console.log('[gauntlet-functional] sample failures:')
    for (const r of results.filter((r) => !r.pass).slice(0, 5)) {
      console.log(`  ${r.file}`)
      for (const f of r.failures.slice(0, 3)) {
        console.log(`    [${f.kind}] ${f.why}`)
      }
    }
    process.exit(1)
  }
  process.exit(0)
}

main()
