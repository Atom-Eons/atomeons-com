# Aether Version 16 — CableBox Premiere Release Receipt

Date: 2026-07-18 EDT  
Result: PASS — production release is live  
Verdict: CableBox now has a dedicated cinematic release page, a playable two-channel web television, real product artwork, a truthful locked release gate, an unsigned-Windows security notice, working static navigation payloads, a live favicon, verified contact routing, and a tested rollback path.

## Target and constraints

- Give CableBox a film-premiere first impression in the existing Aether visual language.
- Use real CableBox cabinet art and proof rather than invented product renders.
- Provide a sealed web demo with exactly Guide, one vintage-commercial channel, Mute, Controls, Left, and Right.
- Do not publish a generated trailer.
- Do not mention channel providers, paid accounts, unsupported DVR or on-demand features, hidden actions, secrets, scraping, or unverified signing claims.
- Explain the Windows unsigned-app warning before the eventual download.
- Keep the product download closed until the final archive, checksum, and public verification URLs receive the operator's green.
- Preserve the former site history, mirror source to GitHub, deploy through Sites, and keep a tested rollback.

## Released experience

- Full-screen CableBox hero built from a real active cabinet frame.
- Positioning: `Turn it on. Surf.`
- Interactive hero surf with physical-looking tuning controls and analog transition treatment.
- Playable web premiere:
  - Channel 00: living CableBox guide.
  - Channel 01: real `UNIVAC-AD-2.mp4` asset from the curated starter library.
  - Starts muted.
  - Mute, Controls, Left, and Right only.
  - Real click proof captured for Channel 01 and the Controls overlay.
- Product story sections for the dial, Random Surf, guide, favorites, cabinet worlds, CRT rendering, native reliability, Museum mode, and controls.
- Release gate states:
  - Native application: green.
  - Starter library and final product archive: assembling.
  - SHA-256 and public verification: awaiting green.
  - Download: disabled.
- Security notice explains that CableBox is currently unsigned, Windows SmartScreen may appear, and visitors should use only the official AtomEons release and compare the published SHA-256.
- No trailer language appears in source, build output, or production HTML.

## Real product asset evidence

- Published CableBox media assets: 14.
- Source directory: `C:\AtomEons\atomeons\aether-v1\.deploy\aether-live\public\cablebox-premiere`.
- Real cabinet and proof images include the active hero, Atomic Orange, Deep Space, Underwater, Patchouli, Cowboy, Gatsby, Museum, controls, CRT before/after, and favorite-star proof.
- Demo source: `C:\AtomEons\CABLEBOX\native\CableBox\StarterContent\ads\UNIVAC-AD-2.mp4`.
- Demo bytes: 2,023,733.
- Demo source SHA-256: `070DCA14EA6EB77C7BDE18674D0764F5711FA4A226308AD41DE52D3BD45E1BD6`.
- Published source-tree SHA-256: `070DCA14EA6EB77C7BDE18674D0764F5711FA4A226308AD41DE52D3BD45E1BD6`.
- Live production SHA-256: `070DCA14EA6EB77C7BDE18674D0764F5711FA4A226308AD41DE52D3BD45E1BD6`.
- Live response: HTTP 200, `video/mp4`, 2,023,733 bytes.
- Verdict: the web demo video is byte-for-byte identical to the curated starter-library source.

## Source and GitHub evidence

- Production worktree: `C:\AtomEons\atomeons\aether-v1\.deploy\aether-live`.
- Public GitHub: `https://github.com/Atom-Eons/atomeons-com`.
- Public branch: `aecdex/aether-live-production`.
- Public `main` and production branch commit: `2366c1211485c7a037c9a17359898946227f1b91`.
- CableBox page commit: `75a18a0380ff5b58aa991c2aed3fff274e33a808`.
- Legacy-preservation merge: `39193b9fd435ca8f41ae742ef765fbf20dff04e0`.
- The preservation merge has two parents: the Aether line and former 147-wave site line.
- The merge tree exactly matched the Aether tree; the old history was retained without a force push.
- Lightweight Sites source branch: `aecdex/sites-source-v16`.
- Lightweight Sites commit: `8c9522c35743e8e3644bc7fe584a8ea1a5686c4c`.
- The public and lightweight source commits have the same tree hash: `5c56f68bbf5e0ef45b94702499d54c7989798538`.
- Both public source branches and the lightweight Sites branch were verified on GitHub.

## Build and static evidence

- Framework: Next.js 16.2.6.
- Optimized compilation: PASS in 51 seconds.
- Internal TypeScript phase: PASS in 53 seconds.
- Static generation: 49 of 49 pages in 17.4 seconds.
- Generated HTML files: 48.
- Live sitemap URLs: 45.
- Local internal references audited: 105.
- Missing internal references: 0.
- CableBox source assets: 14.
- CableBox built assets: 14.
- CableBox asset hash mismatches: 0.
- Prohibited-claim scan: 0 matches.
- Website deployment archive: `C:\AtomEons\atomeons\aether-v1\.deploy\aether-live\aether-sites-v16.tar`.
- Website archive bytes: 31,812,608.
- Website archive SHA-256: `69652D3CBF17BAE95BAB538D48ABE524BAB86BC11BFACE9DCD5A673DDE47CFCA`.
- Website archive entries: 626.
- The website archive is not the CableBox Windows product archive; the product download remains intentionally closed.

## Static-host reliability correction

- Browser proof exposed 404 responses for Next segment-prefetch URLs such as `/press/__next.press.__PAGE__.txt`.
- The static export stores the real file at `/press/__next.press/__PAGE__.txt`.
- Version 16 maps the flattened browser request to the nested exported payload in the Sites worker.
- Worker unit proof:
  - `/press/__next.press.__PAGE__.txt` maps to `/press/__next.press/__PAGE__.txt`.
  - `/cablebox` remains `/cablebox`.
- Nested page payloads present: 45.
- Exhaustive custom-domain prefetch audit: 45 of 45 returned HTTP 200 with the expected source byte length.
- Exhaustive provider-domain prefetch audit: 45 of 45 returned HTTP 200 with the expected source byte length.
- `/favicon.ico`: HTTP 200, `image/vnd.microsoft.icon`, 12,918 bytes.

## Production evidence

- Custom page URL: `https://atomeons.com/cablebox`.
- Provider page URL: `https://atomeons-aether.a-mccree.chatgpt.site/cablebox`.
- Sites project: `appgprj_6a59c864592c8191a8f2158cfe05af20`.
- Active version: 16.
- Version ID: `appgprj_6a59c864592c8191a8f2158cfe05af20~appgver_10c1813dc6348191a593c9c1614cadb0`.
- Deployment ID: `appgdep_6a5b2b57bb1c81918a39ba33847226bc`.
- Provider deployment ID: `a-mccree--atomeons-aether`.
- Deployment status: succeeded.
- Sites content hash: `sha256:374b79cf984438cf93cc23f9eac10b02db2590bfabd7b356567c6576938e1ac7`.
- Sites artifact: 31,754,240 bytes, 483 files.
- Custom CableBox route: HTTP 200.
- Provider CableBox route: HTTP 200.
- Live route audit: 45 of 45 sitemap routes returned HTTP 200.
- Live CableBox dependency audit: 27 of 27 returned HTTP 200.
- Production markers confirmed: interactive promise, unsigned security notice, 601.6 MB starter-library state, locked download, demo video, and no trailer language.

## Browser and visual evidence

- The in-app browser bootstrap failed with `Cannot redefine property: process`.
- Visual proof therefore used an isolated installed Chromium headless shell against the production URL.
- Desktop hero: `C:\AtomEons\atomeons\aether-v1\.deploy\aether-live\.proof\live-cablebox-hero.png`.
- Mobile hero, 390 by 844: `C:\AtomEons\atomeons\aether-v1\.deploy\aether-live\.proof\live-cablebox-mobile.png`.
- Real Channel 01 click: `C:\AtomEons\atomeons\aether-v1\.deploy\aether-live\.proof\live-cablebox-channel-01.png`.
- Controls overlay: `C:\AtomEons\atomeons\aether-v1\.deploy\aether-live\.proof\live-cablebox-controls.png`.
- Chromium page title: `CableBox · Turn it on. Surf. · AtomEons`.
- Desktop verdict: hero hierarchy, cabinet image, title, positioning, and controls render correctly.
- Mobile verdict: title fits without bleed, the television remains legible, and the control surface stays reachable.

## Contact and email evidence

- Cloudflare Email Routing status: enabled, synced, and `ready`.
- Verified destination: `a.mccree@gmail.com`.
- Enabled named forwards: `hello`, `support`, `press`, `research`, `contact`, `atom`, `privacy`, and `legal`.
- Catch-all forwarding: enabled.
- MX, SPF, and DKIM records: present.
- Test subject: `[AE ROUTING PROOF] hello@atomeons.com 2026-07-18`.
- Gmail message/thread ID: `19f73f28774618e1`.
- Gmail returned the test record with both `SENT` and `INBOX` labels.
- Limitation: sender and forwarding destination are the same Gmail account, so this does not replace an independent external-sender delivery test.

## Rollback and recovery

- Previous stable version: 14.
- Previous commit: `fd936e02146a81b8775ebbef24df0c0b7c5b5732`.
- Previous version ID: `appgprj_6a59c864592c8191a8f2158cfe05af20~appgver_b8245a4bd1b08191892e6802dc946b68`.
- Previous deployment ID: `appgdep_6a5af50e329c8191ab478a957e9b2bb2`.
- Previous archive: `aether-sites-v14.tar.gz`.
- Previous archive SHA-256: `C7283B73DD72855BEDFD98E4C974A4DA596006C163B1268609A3F6D7C3A7BBF7`.
- Previous Sites content hash: `sha256:b43951dc332679ca7db960a8c55ca8a7d138a831bdf436d35754d7568cadd79e`.
- Recovery action: redeploy saved Version 14 or restore its source commit.

## Remaining release gate

- CableBox's Windows download is not published.
- Required operator green:
  - rebuild and seal the final product archive with the 601.6 MB starter library;
  - confirm the complete release remains under 1 GB;
  - publish the exact product SHA-256;
  - publish the public GitHub verification links;
  - then replace the disabled website control with the verified download.

