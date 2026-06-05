#!/usr/bin/env node
/**
 * materialize-partial.mjs
 *
 * Materialize completed agents from a running workflow by reading the
 * agent-*.jsonl files directly. Bypasses the wait-for-whole-workflow
 * pattern — ships content as each agent finishes.
 *
 * For each agent with stop_reason=end_turn:
 *   1. Parse the user prompt to extract the slug + route
 *   2. Concatenate all assistant message text into a single payload
 *   3. Extract the ```tsx code block
 *   4. Validate (default export + metadata + > 1500 chars)
 *   5. Write to the correct page.tsx (or skip if exists)
 *
 * USAGE:
 *   node .scripts/materialize-partial.mjs <workflow-run-dir>
 *
 * Example:
 *   node .scripts/materialize-partial.mjs \
 *     "C:/Users/a/.claude/projects/.../subagents/workflows/wf_9f5e99ee-301"
 */
import { readFileSync, readdirSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";

const ROOT = "C:/AtomEons/github/atomeons-com";
const runDir = process.argv[2];

if (!runDir) {
  console.error("usage: node materialize-partial.mjs <workflow-run-dir>");
  process.exit(2);
}

// Extract slug + route from a user-prompt line.
// Returns null if the prompt doesn't match a known atomeons.com path.
function parsePrompt(userContent) {
  // Match patterns like:
  //   atomeons.com/research/decoded/tree-of-thoughts
  //   atomeons.com/learn/atlas/mechanistic-interpretability
  //   atomeons.com/learn/cyber/mitre-attack
  //   atomeons.com/learn/vertical/healthcare
  const m = userContent.match(
    /atomeons\.com(\/(?:research\/decoded|learn\/atlas|learn\/cyber|learn\/vertical)\/[a-z0-9-]+)/i,
  );
  if (!m) return null;
  const route = m[1];
  const slug = route.split("/").pop();
  return { route, slug };
}

// Extract the assistant's full text response from a JSONL file.
function extractAssistantText(jsonlPath) {
  const text = readFileSync(jsonlPath, "utf8");
  const lines = text.split("\n").filter((l) => l.trim());
  let prompt = "";
  let assistant = "";
  let stoppedCleanly = false;

  for (const line of lines) {
    let row;
    try {
      row = JSON.parse(line);
    } catch {
      continue;
    }

    // User prompt
    if (row.type === "user" && row.message?.role === "user" && row.message?.content) {
      prompt = typeof row.message.content === "string" ? row.message.content : "";
      continue;
    }

    // Assistant message — concatenate all text parts
    if (row.message?.role === "assistant" && row.message?.content) {
      const c = row.message.content;
      if (Array.isArray(c)) {
        for (const part of c) {
          if (part.type === "text" && typeof part.text === "string") {
            assistant += part.text;
          }
        }
      } else if (typeof c === "string") {
        assistant += c;
      }
    }

    // stop_reason marker — any line containing this means end_turn
    if (line.includes('"stop_reason":"end_turn"')) {
      stoppedCleanly = true;
    }
  }

  return { prompt, assistant, stoppedCleanly };
}

function extractTsx(content) {
  if (!content) return null;
  const m = content.match(/```(?:tsx|jsx|ts)\s*\n([\s\S]*?)```/);
  if (!m) return null;
  return m[1].replace(/^\/\/ FILE:.*\n/, "").trim();
}

function validateTsx(tsx) {
  if (!tsx) return "no tsx block";
  if (!/export\s+default\s+function/.test(tsx)) return "no default export";
  if (!/export\s+const\s+metadata/.test(tsx)) return "no metadata";
  if (tsx.length < 1500) return `too short (${tsx.length} chars)`;
  return null;
}

const agentFiles = readdirSync(runDir)
  .filter((f) => f.startsWith("agent-") && f.endsWith(".jsonl"))
  .map((f) => join(runDir, f));

console.log(`Run dir: ${runDir}`);
console.log(`Agent JSONLs found: ${agentFiles.length}\n`);

const out = { ok: [], skip: [], fail: [], pending: [] };

for (const path of agentFiles) {
  const { prompt, assistant, stoppedCleanly } = extractAssistantText(path);
  if (!stoppedCleanly) {
    out.pending.push({ path, reason: "still running" });
    continue;
  }
  const meta = parsePrompt(prompt);
  if (!meta) {
    out.fail.push({ path, reason: "could not parse route from prompt" });
    continue;
  }
  const tsx = extractTsx(assistant);
  const err = validateTsx(tsx);
  const target = join(ROOT, "app", meta.route + "/page.tsx").replace(/\\/g, "/");
  if (err) {
    out.fail.push({ slug: meta.slug, route: meta.route, target, reason: err });
    continue;
  }
  if (existsSync(target)) {
    out.skip.push({ slug: meta.slug, route: meta.route, reason: "exists" });
    continue;
  }
  try {
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, tsx, "utf8");
    out.ok.push({ slug: meta.slug, route: meta.route, bytes: tsx.length });
  } catch (e) {
    out.fail.push({ slug: meta.slug, route: meta.route, reason: String(e.message || e) });
  }
}

console.log(
  `RESULT  ok=${out.ok.length}  skip=${out.skip.length}  fail=${out.fail.length}  pending=${out.pending.length}\n`,
);
if (out.ok.length) {
  console.log("WROTE:");
  for (const o of out.ok) console.log(`  ${o.route} (${o.bytes} chars)`);
  console.log();
}
if (out.fail.length) {
  console.log("FAILED:");
  for (const f of out.fail) console.log(`  ${f.slug || f.path} — ${f.reason}`);
  console.log();
}
if (out.skip.length) {
  console.log("SKIPPED:");
  for (const s of out.skip) console.log(`  ${s.route} — ${s.reason}`);
}
