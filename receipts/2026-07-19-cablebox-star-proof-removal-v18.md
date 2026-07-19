# Aether Version 18 - CableBox Star-Proof Removal Receipt

Date: 2026-07-19 EDT
Verdict: PASS - production release is live

## Released change

- Removed the rendered `favorite-stars.webp` proof collage from the CableBox page because several example stars were not correctly placed on their televisions.
- Removed the collage caption `Slap a star on it.` with the collage.
- Preserved the accurate Favorites product card, including the `Press F` behavior and three persistent favorite positions.
- Preserved `favorite-stars.webp` in source and in the packaged artifact; it is no longer referenced by the public page.
- No other CableBox section or site route was intentionally changed.

## Evidence

- Public source commit: `f8e3efdda9996aabf9cdd1917a6950989c818e43`.
- Public branch: `aecdex/aether-live-production`.
- GitHub `main` and the production branch were pushed to the public commit.
- Lightweight Sites source commit: `f2c21acf5a751d7760ad17fc8d65f02d4a51bcdc`.
- Public and lightweight source tree hash: `d3451f0443711d9f1b6873a86ec84e0c2bfcac6f`.
- TypeScript: PASS.
- Next.js 16.2.6 optimized compilation: PASS in 89 seconds.
- Next.js internal TypeScript phase: PASS in 2.4 minutes.
- Static generation: 49 of 49 pages in 31.8 seconds.
- Generated HTML files: 48.
- Internal references: 102.
- Missing internal references: 0.
- CableBox source and build assets: 14 of 14, with zero asset problems.
- Built CableBox HTML:
  - contained no `favorite-stars.webp` reference;
  - contained no `Slap a star on it.` caption;
  - retained `Favorites become physical.`;
  - retained `Press F.`;
  - retained the Version 17 removal of the web demo and Atomic Orange.
- Custom-domain live audit:
  - CableBox route: HTTP 200;
  - sitemap routes: 45 of 45 HTTP 200;
  - page dependencies: 24 of 24 HTTP 200;
  - static navigation payloads: 45 of 45 HTTP 200.
- Provider-domain live audit:
  - CableBox route: HTTP 200;
  - page dependencies: 24 of 24 HTTP 200.
- Live screenshot: `C:\AtomEons\atomeons\aether-v1\.deploy\aether-live\.proof\live-cablebox-v18-stars-removed.png`.

## Deployment

- Custom URL: `https://atomeons.com/cablebox`.
- Provider URL: `https://atomeons-aether.a-mccree.chatgpt.site/cablebox`.
- Active Sites version: 18.
- Version ID: `appgprj_6a59c864592c8191a8f2158cfe05af20~appgver_9cef4b0e3f98819184d4df895419fe8b`.
- Deployment ID: `appgdep_6a5d04bc5a208191b943ec270b9fac2a`.
- Deployment status: succeeded.
- Sites content hash: `sha256:a829d7caf2d80aa793368acd6e4927719efdebe84f62f8750bb4225b8d37c5e1`.
- Sites artifact: 31,703,040 bytes and 482 files.
- Local archive: `C:\AtomEons\atomeons\aether-v1\.deploy\aether-live\aether-sites-v18.tar`.
- Local archive bytes: 31,764,480.
- Local archive SHA-256: `C466DB71AC71E16D8E8100839439323DE4188F53AF1426F901B1B9069D5CF4B7`.

## Blockers

- None for this website correction.
- The separate Windows product download remains locked pending its final archive and verification green.

## Rollback

- Previous stable version: 17.
- Version ID: `appgprj_6a59c864592c8191a8f2158cfe05af20~appgver_0256539f9168819198385478523a8c6b`.
- Deployment ID: `appgdep_6a5cfabecdd481919fcfc6e5ff2e6d77`.
- Public source commit: `3f460894158fdc612db8330e59563b50f1e2d4cd`.
- Lightweight source commit: `731ebfc750fd10d090f06f29af425d63858b54b2`.
- Recovery action: redeploy saved Version 17.

## Next action

- Replace the proof only when a new image shows verified favorite-star placement on every displayed television.
