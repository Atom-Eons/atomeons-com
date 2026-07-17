# Aether destination graphics V3 receipt

Date: 2026-07-17
Branch: `aecdex/atomeons-aether-redesign`
Production target: AtomEons Aether Sites project
Rollback before this pass: Sites version 6 / GitHub commit `c363158b41796e0a7c08a2cfa0ae50d0b0e0b526`

## Goal

Carry the physical campaign language of the Aether homepage into the highest-value destinations without deleting or moving the archived site.

## Original image assets

Built-in image-generation mode was used for both original campaign objects. Generated PNG masters remain in the Codex generated-image directory; optimized WebP derivatives are committed with the site.

### Atom Alive broadcast object

- Source master: `C:\Users\a\.codex\generated_images\019f6df1-30b3-7d51-bba4-1aedf2ddd6be\call_zBgC6I81wV0qeezSwjzvRmd5.png`
- Site asset: `public/aether-v3/atom-alive-broadcast-object-v3.webp`
- Output: 1536 × 1024 WebP, 109,798 bytes
- Prompt direction: an original physical independent broadcast invention combining CRT, camera, waveform recorder, edit deck, tactile workshop evidence, cream metal, graphite, black cable, acid signal, and a safety-orange recording lamp; bright premium product photography; no people, brands, fake text, streamer setup, or cyberpunk clichés.

### I AM AI book + voice artifact

- Source master: `C:\Users\a\.codex\generated_images\019f6df1-30b3-7d51-bba4-1aedf2ddd6be\call_JmvgMh9Iz9Bdn1cEVMWlOXG1.png`
- Site asset: `public/aether-v3/i-am-ai-artifact-v3.webp`
- Output: 1536 × 1024 WebP, 225,920 bytes
- Prompt direction: a cream linen book connected by oxblood thread to a black-glass synthetic voice archive, communicating that the AI authored and voices the memoir; sacred, unsettling, museum-object quality; no people, robots, brains, neon, logos, readable text, or fake cover typography.

## Integrated surfaces

- Homepage Atom Alive campaign
- Homepage I AM AI campaign
- Full Atom Alive product/show page
- Full I AM AI book page
- Full Bookmaker product page
- Live fork destination campaigns for CableBox, Bookmaker, Orange5, I AM AI, Atom Alive, and About
- Shared campaign-field system with measurement rails, object plates, evidence labels, restrained hover movement, responsive crops, and reduced-motion handling

## Preservation

- The old site and its existing routes remain untouched on their original branch.
- No Skil.Ski material was surfaced.
- No Vercel or Cloudflare migration was performed.
- Existing V2 visual assets remain in place; V3 uses new versioned filenames.

## Verification

- Deployable Sites fork production build: PASS
- Next.js: 16.2.6 / Turbopack
- Compile: 30.2 seconds
- TypeScript: 37.7 seconds
- Static generation: 28 / 28 routes in 5.9 seconds
- Direct export evidence: both V3 WebPs are present in `out/aether-v3/`; generated homepage HTML references both direct `/aether-v3/*.webp` paths.
- Archive repository build emitted a fresh `.next/BUILD_ID`, but its shell command exceeded the Windows execution ceiling after ten minutes. The smaller production projection is the authoritative deployment proof.
- `git diff --check`: PASS in both the canonical and deployable repositories.

## Deployment

- Canonical GitHub source commit: `7d69683`
- Deployable source commit: `2fdda56de2cf0137ed21dbd29cf4394407404e2d`
- Sites version: 8
- Sites version ID: `appgprj_6a59c864592c8191a8f2158cfe05af20~appgver_b5626f27334081918dbf3e52b78f0aa9`
- Deployment ID: `appgdep_6a5a196b3d08819193c6af8100ed0db7`
- Production URL: `https://atomeons-aether.a-mccree.chatgpt.site`
- Deployment status: SUCCEEDED
- Live route probes: homepage, CableBox, Bookmaker, Orange5, I AM AI, Atom Alive, and About all returned HTTP 200.
- Live asset probes: both V3 WebPs returned HTTP 200 with exact expected byte counts after edge propagation.
- Rollback: redeploy saved Sites version 6.
