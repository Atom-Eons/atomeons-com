#!/usr/bin/env python3
"""
Nano Banana 2 (gemini-3-pro-image-preview) image generator for /learn/cyber.

Reads .scripts/cyber-images/prompts.json — a list of {slug, prompt, aspect}
records. For each, calls the Google AI Studio Gemini API with the Nano Banana 2
model and writes the resulting PNG to public/cyber-images/{slug}.png.

Authentication: GEMINI_API_KEY environment variable (or GOOGLE_AI_STUDIO_API_KEY).

Usage:
  export GEMINI_API_KEY=...        # operator sets this once
  python .scripts/cyber-images/generate.py             # all pending
  python .scripts/cyber-images/generate.py --slug labs # one page
  python .scripts/cyber-images/generate.py --force     # regen even if exists
  python .scripts/cyber-images/generate.py --model gemini-2.5-flash-image-preview

Operator directive 2026-06-02: "USE NANO PRO ONLY. MAKE ALL IMAGES USING THAT
UNLIMITED. Nano Banana 2 API."

Reference: https://ai.google.dev/gemini-api/docs/image-generation
"""

import argparse
import base64
import json
import os
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path
from typing import Optional

ROOT = Path(__file__).resolve().parents[2]
DEFAULT_PROMPTS_PATH = ROOT / ".scripts/cyber-images/prompts.json"
DEFAULT_OUT_DIR = ROOT / "public/cyber-images"
DEFAULT_MODEL = "gemini-3-pro-image"  # Nano Banana Pro GA
FALLBACK_MODEL = "nano-banana-pro-preview"  # explicit Nano Banana Pro alias
API_BASE = "https://generativelanguage.googleapis.com/v1beta/models"


def _load_env_local() -> None:
    """Best-effort .env.local loader so we don't need python-dotenv."""
    env_path = ROOT / ".env.local"
    if not env_path.exists():
        return
    for raw in env_path.read_text(encoding="utf-8").splitlines():
        line = raw.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, _, v = line.partition("=")
        k = k.strip()
        v = v.strip().strip('"').strip("'")
        os.environ.setdefault(k, v)


def get_api_key() -> str:
    _load_env_local()
    for name in (
        "GEMINI_API_KEY",
        "GOOGLE_AI_STUDIO_API_KEY",
        "GOOGLE_API_KEY",
        "google",  # operator's vercel env var name
    ):
        key = os.environ.get(name)
        if key:
            return key
    print("ERROR: set GEMINI_API_KEY (or google, GOOGLE_API_KEY) in .env.local or env.", file=sys.stderr)
    print("  Get from: https://aistudio.google.com/apikey", file=sys.stderr)
    sys.exit(2)


def call_nano_banana(api_key: str, model: str, prompt: str, aspect: str) -> Optional[bytes]:
    """Call the Gemini image-generation endpoint and return the first PNG bytes.

    Returns None on transient failure (caller may retry).
    """
    url = f"{API_BASE}/{model}:generateContent"

    body = {
        "contents": [
            {
                "role": "user",
                "parts": [{"text": prompt}],
            }
        ],
        "generationConfig": {
            "responseModalities": ["IMAGE"],
            "imageConfig": {"aspectRatio": aspect},
        },
    }
    data = json.dumps(body).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=data,
        headers={
            "Content-Type": "application/json",
            "x-goog-api-key": api_key,
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(req, timeout=180) as resp:
            payload = json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        body_text = e.read().decode("utf-8", errors="replace")
        print(f"  HTTP {e.code}: {body_text[:400]}", file=sys.stderr)
        return None
    except urllib.error.URLError as e:
        print(f"  network error: {e}", file=sys.stderr)
        return None

    # Walk the response for the first inline_data image
    candidates = payload.get("candidates", [])
    for cand in candidates:
        content = cand.get("content", {})
        for part in content.get("parts", []):
            inline = part.get("inlineData") or part.get("inline_data")
            if inline and "data" in inline:
                return base64.b64decode(inline["data"])

    # Surface useful diagnostic if no image came back
    block = payload.get("promptFeedback") or payload.get("prompt_feedback")
    if block:
        print(f"  blocked: {json.dumps(block)[:300]}", file=sys.stderr)
    else:
        print(f"  no image in response: {json.dumps(payload)[:300]}", file=sys.stderr)
    return None


def main() -> int:
    p = argparse.ArgumentParser()
    p.add_argument("--slug", help="generate only this slug")
    p.add_argument("--force", action="store_true", help="overwrite existing files")
    p.add_argument("--model", default=DEFAULT_MODEL, help="Gemini image model id")
    p.add_argument("--fallback", default=FALLBACK_MODEL, help="model used if --model errors per-request")
    p.add_argument("--rate-sec", type=float, default=1.0, help="sleep between requests")
    p.add_argument("--max-retries", type=int, default=2, help="retries per slug on transient failure")
    p.add_argument("--input", default=str(DEFAULT_PROMPTS_PATH), help="input prompts json")
    p.add_argument("--out", default=str(DEFAULT_OUT_DIR), help="output directory")
    args = p.parse_args()

    prompts_path = Path(args.input)
    out_dir = Path(args.out)

    if not prompts_path.exists():
        print(f"ERROR: {prompts_path} not found.", file=sys.stderr)
        return 2

    api_key = get_api_key()
    out_dir.mkdir(parents=True, exist_ok=True)

    with prompts_path.open(encoding="utf-8") as f:
        prompts = json.load(f)

    if args.slug:
        prompts = [p for p in prompts if p["slug"] == args.slug]
        if not prompts:
            print(f"slug not found in prompts.json: {args.slug}", file=sys.stderr)
            return 2

    print(f"generating {len(prompts)} image(s) with model={args.model}")
    print(f"output dir: {out_dir}")

    successes = []
    failures = []

    for i, entry in enumerate(prompts, 1):
        slug = entry["slug"]
        prompt = entry["prompt"]
        aspect = entry.get("aspect", "16:9")
        out_path = out_dir / f"{slug}.png"

        if out_path.exists() and not args.force:
            print(f"[{i:>2}/{len(prompts)}] {slug}  -> exists, skipping")
            successes.append(slug)
            continue

        print(f"[{i:>2}/{len(prompts)}] {slug}  -> {aspect}")

        image_bytes: Optional[bytes] = None
        last_err_model = None
        for model_try in (args.model, args.fallback):
            for attempt in range(args.max_retries + 1):
                image_bytes = call_nano_banana(api_key, model_try, prompt, aspect)
                if image_bytes:
                    break
                last_err_model = model_try
                if attempt < args.max_retries:
                    backoff = (2 ** attempt) * 2.0
                    print(f"  retry in {backoff:.0f}s (model={model_try})")
                    time.sleep(backoff)
            if image_bytes:
                break

        if image_bytes:
            out_path.write_bytes(image_bytes)
            kb = len(image_bytes) // 1024
            print(f"  -> wrote {out_path.name} ({kb} KB)")
            successes.append(slug)
        else:
            print(f"  -> FAILED on {last_err_model}; skipping {slug}")
            failures.append(slug)

        time.sleep(args.rate_sec)

    print("")
    print(f"done. {len(successes)} ok, {len(failures)} failed.")
    if failures:
        print(f"failed: {', '.join(failures)}")
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
