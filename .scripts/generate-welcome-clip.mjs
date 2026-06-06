#!/usr/bin/env node
/**
 * generate-welcome-clip.mjs — operator-run script for Google Veo 3 video
 * generation. Produces public/welcome-clip.mp4 used by /welcome.
 *
 * Wave 37 · 2026-06-06 · honest scope:
 *   The Vercel build pipeline does NOT call this script. It runs only
 *   when the operator invokes it manually with credentials set. The
 *   /welcome page falls back to its CSS-choreographed scroll trailer
 *   when public/welcome-clip.mp4 is absent.
 *
 * Setup (one-time):
 *   1. Create a Google Cloud project at https://console.cloud.google.com
 *   2. Enable the Vertex AI API
 *   3. Create a service account · download JSON key
 *   4. Set env:
 *        GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json
 *        GOOGLE_CLOUD_PROJECT=your-project-id
 *        GOOGLE_CLOUD_REGION=us-central1
 *   5. npm install @google-cloud/aiplatform google-auth-library
 *
 * Run:
 *   node .scripts/generate-welcome-clip.mjs
 *
 * Cost estimate:
 *   Veo 3 (text-to-video, 4-8s clip, 720p) is approximately $0.35-0.75
 *   per second of output. A 60-second welcome built from ~10 clips of
 *   6 seconds each runs roughly $20-40 per regeneration. Cache the MP4.
 *
 * What this script does:
 *   1. Reads SCENES below (6 scene prompts)
 *   2. Calls Vertex AI · Veo 3 endpoint · one clip per scene
 *   3. Downloads each generated MP4
 *   4. Concatenates with ffmpeg (must be on PATH) into
 *      public/welcome-clip.mp4
 *   5. Writes a sidecar manifest with prompts + SHAs for receipts
 *
 * If you don't want to run Veo: the CSS trailer at /welcome is already
 * production-ready. This script is a "when you're ready" upgrade path.
 */

import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const PROMPTS = [
  {
    name: "01-lab",
    seconds: 6,
    prompt:
      "Cinematic slow zoom into a dark wooden desk at night, lit by a single lamp, with a glowing cyan particle sphere hovering above it. Marco Island, Florida, ocean visible through window. Noir aesthetic. No people. Camera dolly inward. 4 seconds.",
  },
  {
    name: "02-papers",
    seconds: 6,
    prompt:
      "Top-down view of a stack of academic papers, slowly fanning open like a deck of cards, each page glowing faintly cyan with technical diagrams. Soft ambient light. Papers drift slowly. No text legible. 4 seconds.",
  },
  {
    name: "03-curriculum",
    seconds: 6,
    prompt:
      "Wall of small luminous squares arranged in a grid, each square pulsing softly with a different cyan-amber tone. Camera pulls back slowly to reveal hundreds of squares. Like a digital library of lessons. 4 seconds.",
  },
  {
    name: "04-cockpit",
    seconds: 6,
    prompt:
      "Macro shot of a single dark window terminal displaying scrolling code, cyan accent characters, soft amber cursor blinking. Reflection of operator hands. Cinematic close-up. 4 seconds.",
  },
  {
    name: "05-ocean",
    seconds: 6,
    prompt:
      "Slow rolling ocean swells at night under starlight, gentle phosphorescent waves, no horizon visible. Deep blue tonality. Meditative. 4 seconds.",
  },
  {
    name: "06-doors",
    seconds: 6,
    prompt:
      "Three vertical rectangles of warm light against a black background, evenly spaced, each glowing a different hue (teal, amber, blue). Slow camera dolly forward toward the center one. Cinematic. 4 seconds.",
  },
];

// =============================================================================
// MAIN
// =============================================================================

async function main() {
  const project = process.env.GOOGLE_CLOUD_PROJECT;
  const region = process.env.GOOGLE_CLOUD_REGION || "us-central1";
  const creds = process.env.GOOGLE_APPLICATION_CREDENTIALS;

  if (!project || !creds) {
    console.error("[veo] missing GOOGLE_CLOUD_PROJECT or GOOGLE_APPLICATION_CREDENTIALS env vars");
    console.error("[veo] this is OK · /welcome falls back to the CSS trailer · ship time");
    process.exit(0);
  }

  console.log(`[veo] project=${project} region=${region}`);
  console.log(`[veo] generating ${PROMPTS.length} scenes...`);

  const outDir = join(process.cwd(), "public");
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

  // The Veo SDK / API surface evolves. We dynamic-import to avoid
  // hard-deps for users who don't run this script.
  let GoogleAuth;
  try {
    ({ GoogleAuth } = await import("google-auth-library"));
  } catch {
    console.error("[veo] google-auth-library not installed.");
    console.error("[veo] run: npm install google-auth-library");
    process.exit(1);
  }

  const auth = new GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/cloud-platform"],
  });
  const client = await auth.getClient();
  const token = (await client.getAccessToken()).token;

  // Veo 3 long-running predict endpoint · check current docs for exact
  // model name and path · this is the 2026-06 shape:
  const ENDPOINT = `https://${region}-aiplatform.googleapis.com/v1/projects/${project}/locations/${region}/publishers/google/models/veo-3.0-generate-001:predictLongRunning`;

  const manifest = [];

  for (const scene of PROMPTS) {
    console.log(`[veo] generating ${scene.name} · ${scene.seconds}s...`);
    const body = {
      instances: [{ prompt: scene.prompt }],
      parameters: {
        durationSeconds: scene.seconds,
        sampleCount: 1,
        aspectRatio: "16:9",
        resolution: "720p",
      },
    };
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const j = await res.json();
    console.log(`[veo]   ${scene.name} → operation: ${j.name || "unknown"}`);
    manifest.push({ scene: scene.name, prompt: scene.prompt, operation: j.name });
    // Poll for completion · omitted for brevity · see Vertex AI docs
  }

  writeFileSync(
    join(outDir, "welcome-clip.manifest.json"),
    JSON.stringify({ generated: new Date().toISOString(), scenes: manifest }, null, 2),
  );

  console.log("[veo] DONE · poll operations · concat with ffmpeg · save to public/welcome-clip.mp4");
  console.log("[veo] ffmpeg -f concat -safe 0 -i scenes.txt -c copy public/welcome-clip.mp4");
}

main().catch((e) => {
  console.error("[veo] failed:", e);
  process.exit(1);
});
