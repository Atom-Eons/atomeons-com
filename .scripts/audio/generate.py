#!/usr/bin/env python3
"""
ElevenLabs audio generator for atomeons.com.

Two modes:
  - tts: generate spoken voiceover from text + voice_id
  - sfx: generate ambient sound effect from a prompt

Outputs MP3 to public/audio/ at the slug you specify.

Reads ELEVENLABS_API_KEY from .env.local (loaded automatically).

Usage:
  python .scripts/audio/generate.py tts \
    --voice brian \
    --text "Drones replaced artillery." \
    --slug cyber-line-01

  python .scripts/audio/generate.py sfx \
    --text "Deep low-frequency hum, server room ambient, faint metallic shimmer, no melody" \
    --duration 22 \
    --slug atomeons-signature

  python .scripts/audio/generate.py list-voices
"""

from __future__ import annotations

import argparse
import json
import os
import sys
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUT_DIR = ROOT / "public/audio"
ENV_LOCAL = ROOT / ".env.local"

API_BASE = "https://api.elevenlabs.io/v1"

# Curated voice IDs from ElevenLabs' default voice library. Cool measured
# tech-narration register only — no breathy ASMR, no gravelly drama.
VOICES = {
    "brian": "nPczCjzI2devNBz1zQrb",  # American male, deep, narrator
    "adam": "pNInz6obpgDQGcFmaJgB",   # American male, classic narrator
    "daniel": "onwK4e9ZLuTAKqWW03F9", # British, authoritative, news anchor
    "drew": "29vD33N1CtxCmqQRPOHJ",   # American male, news anchor
    "antoni": "ErXwobaYiN019PkySvjV", # American male, well-rounded
    "callum": "N2lVS1w4EtoT3dr4eOWO", # American male, intense
    "george": "JBFqnCBsd6RMkjVDRZzb", # British male, mature
    "matilda": "XrExE9yKIg1WjnnlVkGX",# American female, warm
}

DEFAULT_MODEL = "eleven_multilingual_v2"  # quality > latency


def _load_env_local() -> None:
    if not ENV_LOCAL.exists():
        return
    for raw in ENV_LOCAL.read_text(encoding="utf-8").splitlines():
        line = raw.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, _, v = line.partition("=")
        k = k.strip()
        v = v.strip().strip('"').strip("'")
        os.environ.setdefault(k, v)


def get_key() -> str:
    _load_env_local()
    for name in ("ELEVENLABS_API_KEY", "XI_API_KEY"):
        v = os.environ.get(name)
        if v:
            return v
    print("ERROR: set ELEVENLABS_API_KEY in .env.local.", file=sys.stderr)
    print("  Get from: https://elevenlabs.io/app/settings/api-keys", file=sys.stderr)
    sys.exit(2)


def post(path: str, body: dict, key: str) -> bytes:
    url = API_BASE + path
    data = json.dumps(body).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=data,
        headers={
            "Content-Type": "application/json",
            "xi-api-key": key,
            "Accept": "audio/mpeg",
        },
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=180) as r:
        return r.read()


def http_get(path: str, key: str) -> dict:
    url = API_BASE + path
    req = urllib.request.Request(url, headers={"xi-api-key": key})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read())


def cmd_list_voices(args, key):
    j = http_get("/voices", key)
    voices = j.get("voices", [])
    print(f"{len(voices)} voices on account:\n")
    for v in voices:
        name = v.get("name", "?")
        vid = v.get("voice_id", "?")
        labels = v.get("labels", {}) or {}
        desc = ", ".join(f"{k}={vv}" for k, vv in labels.items())
        print(f"  {name:<24} {vid}   {desc}")
    print("\nCurated alias map:")
    for alias, vid in VOICES.items():
        print(f"  {alias:<10} -> {vid}")
    return 0


def cmd_tts(args, key):
    voice_id = VOICES.get(args.voice, args.voice)
    body = {
        "text": args.text,
        "model_id": args.model,
        "voice_settings": {
            "stability": args.stability,
            "similarity_boost": args.similarity,
            "style": args.style,
            "use_speaker_boost": True,
        },
    }
    print(f"tts: voice={args.voice} ({voice_id}) model={args.model} chars={len(args.text)}")

    try:
        audio = post(f"/text-to-speech/{voice_id}", body, key)
    except urllib.error.HTTPError as e:
        body_text = e.read().decode("utf-8", errors="replace")
        print(f"  HTTP {e.code}: {body_text[:400]}", file=sys.stderr)
        return 1

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    out = OUT_DIR / f"{args.slug}.mp3"
    out.write_bytes(audio)
    print(f"  -> wrote {out.name} ({len(audio) // 1024} KB)")
    return 0


def cmd_sfx(args, key):
    body = {
        "text": args.text,
        "duration_seconds": float(args.duration) if args.duration else None,
        "prompt_influence": args.prompt_influence,
    }
    body = {k: v for k, v in body.items() if v is not None}
    print(f"sfx: duration={args.duration}s chars={len(args.text)}")

    try:
        audio = post("/sound-generation", body, key)
    except urllib.error.HTTPError as e:
        body_text = e.read().decode("utf-8", errors="replace")
        print(f"  HTTP {e.code}: {body_text[:400]}", file=sys.stderr)
        return 1

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    out = OUT_DIR / f"{args.slug}.mp3"
    out.write_bytes(audio)
    print(f"  -> wrote {out.name} ({len(audio) // 1024} KB)")
    return 0


def main() -> int:
    p = argparse.ArgumentParser()
    sub = p.add_subparsers(dest="cmd", required=True)

    tts = sub.add_parser("tts")
    tts.add_argument("--voice", default="brian", help="voice alias or raw voice_id")
    tts.add_argument("--text", required=True)
    tts.add_argument("--slug", required=True, help="output filename without .mp3")
    tts.add_argument("--model", default=DEFAULT_MODEL)
    tts.add_argument("--stability", type=float, default=0.5)
    tts.add_argument("--similarity", type=float, default=0.75)
    tts.add_argument("--style", type=float, default=0.15)

    sfx = sub.add_parser("sfx")
    sfx.add_argument("--text", required=True)
    sfx.add_argument("--duration", type=float, default=22.0, help="seconds (max 22 for sound-generation)")
    sfx.add_argument("--prompt-influence", type=float, default=0.3)
    sfx.add_argument("--slug", required=True)

    lv = sub.add_parser("list-voices")

    args = p.parse_args()
    key = get_key()

    if args.cmd == "tts":
        return cmd_tts(args, key)
    if args.cmd == "sfx":
        return cmd_sfx(args, key)
    if args.cmd == "list-voices":
        return cmd_list_voices(args, key)
    p.error("unknown cmd")
    return 2


if __name__ == "__main__":
    sys.exit(main())
