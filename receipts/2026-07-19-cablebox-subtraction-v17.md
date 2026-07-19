# Aether Version 17 — CableBox Subtraction Receipt

Date: 2026-07-19 EDT
Verdict: PASS — production release is live

## Released change

- Hid the playable online two-channel CableBox section.
- Hid Atomic Orange from the interactive hero surf.
- Hid Atomic Orange from the cabinet gallery.
- Preserved `CableboxDemo.tsx`, the demo video, and `theme-atomic-orange.webp` in source.
- No other CableBox section or site route was intentionally changed.

## Evidence

- Public source commit: `3f460894158fdc612db8330e59563b50f1e2d4cd`.
- Public branch: `aecdex/aether-live-production`.
- GitHub `main` and the production branch were verified at the public commit.
- Lightweight Sites source commit: `731ebfc750fd10d090f06f29af425d63858b54b2`.
- Public and lightweight source tree hashes matched.
- TypeScript: PASS.
- Next.js 16.2.6 optimized compilation: PASS in 64 seconds.
- Next.js internal TypeScript phase: PASS in 88 seconds.
- Static generation: 49 of 49 pages in 13 seconds.
- Generated HTML files: 48.
- Internal references: 103.
- Missing internal references: 0.
- CableBox source and build assets: 14 of 14, with zero hash mismatches.
- Built CableBox page contained none of:
  - `PLAYABLE WEB PREMIERE`;
  - `demo-univac-ad.mp4`;
  - `Atomic Orange`;
  - `theme-atomic-orange.webp`.
- Custom-domain live audit:
  - CableBox route: HTTP 200;
  - sitemap routes: 45 of 45 HTTP 200;
  - page dependencies: 25 of 25 HTTP 200;
  - static navigation payloads: 45 of 45 HTTP 200.
- Provider-domain live audit:
  - CableBox route: HTTP 200;
  - sitemap routes: 45 of 45 HTTP 200;
  - page dependencies: 25 of 25 HTTP 200.
- Positive production markers retained: `Turn it on.`, `Surfing is the interface.`, Windows security notice, locked download, and Deep Space.
- Live flow screenshot: `C:\AtomEons\atomeons\aether-v1\.deploy\aether-live\.proof\live-cablebox-v17-flow.png`.
- Live gallery screenshot: `C:\AtomEons\atomeons\aether-v1\.deploy\aether-live\.proof\live-cablebox-v17-themes.png`.

## Deployment

- Custom URL: `https://atomeons.com/cablebox`.
- Provider URL: `https://atomeons-aether.a-mccree.chatgpt.site/cablebox`.
- Active Sites version: 17.
- Version ID: `appgprj_6a59c864592c8191a8f2158cfe05af20~appgver_0256539f9168819198385478523a8c6b`.
- Deployment ID: `appgdep_6a5cfabecdd481919fcfc6e5ff2e6d77`.
- Deployment status: succeeded.
- Sites content hash: `sha256:9de48e5e6c3c92b7f7296fd08d969900d4e3212f5c6e50c2852bbfb7e6d1e864`.
- Sites artifact: 31,703,040 bytes and 482 files.
- Local archive: `C:\AtomEons\atomeons\aether-v1\.deploy\aether-live\aether-sites-v17.tar`.
- Local archive bytes: 31,767,040.
- Local archive SHA-256: `592A950D27517269754A12E454E4A96F0723387F7CAFF77468B6905A2BC2258D`.

## Blockers

- None for this website subtraction.
- The separate Windows product download remains locked pending its final archive and verification green.

## Rollback

- Previous stable version: 16.
- Version ID: `appgprj_6a59c864592c8191a8f2158cfe05af20~appgver_10c1813dc6348191a593c9c1614cadb0`.
- Deployment ID: `appgdep_6a5b2b57bb1c81918a39ba33847226bc`.
- Source commit: `8c9522c35743e8e3644bc7fe584a8ea1a5686c4c`.
- Recovery action: redeploy saved Version 16.

## Next action

- Leave the rest of the CableBox page unchanged unless the operator requests another specific subtraction or replacement.
