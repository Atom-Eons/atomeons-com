# Aether V12 — Refinement Without Expansion

Date: 2026-07-17 18:35:16 -04:00
Operator: Codex
Release: Aether Version 12
Production: https://atomeons.com

## Intent

Improve the existing site without making it larger. Version 12 adds no public
route, product, paper, claim, or navigation category. It refines the shared
visual system used by the same Version 11 content inventory.

## Source provenance

- Public repository: `https://github.com/Atom-Eons/atomeons-com`
- Branch: `aecdex/aether-live-production`
- Exact release commit: `dfb01b1a267b5954ef72ab658724b11f4d210d1b`
- Commit subject: `Refine Aether typography and interaction system`
- Sites source branch: `main`
- Sites source push: `e7a7c98..dfb01b1`
- Local archive: `aether-sites-v12.tar.gz`
- Local archive SHA-256:
  `3F965377B05AD3355AF0D66083D2A16B69848E10A3D402A45CF6B725FD084AB8`

The preserved Version 10 and Version 11 archives remained untracked and were
not included in the release commit.

## Refinement work

- Replaced undefined typography variables and generic fallback rendering with
  a real self-hosted type system.
- Added variable Geist Sans, Geist Mono, Newsreader Roman, and Newsreader
  Italic font files to the public static bundle.
- Added the Geist and Newsreader license texts beside the font assets.
- Kept fonts fully static: no Google request, runtime font service, package
  dependency, or hosting dependency.
- Corrected extreme headline tracking and line height for the new type metrics.
- Replaced the outlined homepage display line with a quieter filled editorial
  treatment.
- Added optical sizing, font-synthesis control, balanced display wrapping, and
  improved body wrapping.
- Added consistent keyboard focus visibility and reduced-motion behavior.
- Reduced generic pill and oversized-card geometry.
- Tightened the homepage contact cards without removing any contact route.
- Unified secondary-page button and card hover behavior.
- Preserved every route, resource, contact address, product state, and research
  object from Version 11.

## Font assets

Live static assets:

- `/fonts/Geist-Variable.woff2`
- `/fonts/GeistMono-Variable.woff2`
- `/fonts/Newsreader-Variable.woff2`
- `/fonts/Newsreader-VariableItalic.woff2`

All four returned HTTP 200 from `atomeons.com`. The live production stylesheet
references both the Geist and Newsreader static paths.

## Build and route verification

- Next.js production compile: passed
- TypeScript: passed
- Static generation: `49/49`
- Generated HTML files: `48`
- Local internal targets inspected: `71`
- Missing local targets: `0`
- Production sitemap URLs: `45`
- Production HTTP 200 results: `45`
- Production failures: `0`
- Public Gmail leaks: `0`

## Deployment

- Sites project: `appgprj_6a59c864592c8191a8f2158cfe05af20`
- Saved version: `12`
- Version ID:
  `appgprj_6a59c864592c8191a8f2158cfe05af20~appgver_0bdb24af95048191a0b10be181b30a7a`
- Deployment ID: `appgdep_6a5aac41cfd08191a6bd5640ada7f881`
- Deployment state: `succeeded`
- Provider URL: `https://atomeons-aether.a-mccree.chatgpt.site`
- Sites content hash:
  `sha256:540a224c625a423f60db0d7e2f3608459ca80bffa81ee8affa97e8825458b0c5`

## Recovery record

The first typography implementation used a hosted font build path. That build
stalled before packaging and never reached production. A subsequent local npm
font installation also stalled and left this projection's temporary
`node_modules` incomplete.

The temporary dependency directory was moved intact, not deleted, to:

`.proof/node-modules-font-install-stalled-v12`

The final implementation copied only the licensed font binaries and license
texts into `public/fonts`, removed the package dependency from the source, and
rebuilt successfully using the original clean parent toolchain.

## Rollback

Version 11 remains the immediate rollback target:

- Version ID:
  `appgprj_6a59c864592c8191a8f2158cfe05af20~appgver_2298f892328c81919a665a9f2989d4ee`
- Source commit: `e7a7c98e87748adb3245ecab4b7c07ef681fbc98`
- Deployment ID: `appgdep_6a5a9f69acf48191bb881bd8a99cb895`

The Cloudflare Email Routing configuration is independent of this visual
release and remains unchanged.
