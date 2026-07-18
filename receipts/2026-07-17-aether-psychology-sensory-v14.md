# Aether Version 14 — Psychology + Sensory Release Receipt

Date: 2026-07-17 EDT  
Result: PASS — production release is live  
Verdict: Version 14 is the active Atom Eons website. The source mirror, static build, production deployment, live routes, live assets, audio artifact, contact routing configuration, and rollback path were verified. One non-blocking external proof remains: send a fresh email from an address other than the Gmail destination to avoid Gmail's same-account deduplication.

## Target and constraints

- Improve the site through sensory quality rather than additional page scale.
- Give major route families psychologically intentional color systems.
- Add quiet, attention-supporting motion and reactive detail without forced autoplay.
- Put the I Am AI Chapter 12 audio directly beneath the book on the homepage.
- Give each featured product a truthful shock line.
- Preserve every existing route and the sleeping original launcher.
- Mirror source to GitHub and deploy the static build through the connected Sites project.
- Preserve a tested Version 13 rollback.

## Released experience

- Route psychology:
  - Trust: blue.
  - Forge: orange.
  - Evidence: green.
  - Signal: red.
  - Story: oxblood and cream.
  - Connection: warm orange.
  - Radiance: blood red.
- Sensory system:
  - Sound is off by default and only starts after an explicit visitor action.
  - Motion can be switched off.
  - `prefers-reduced-motion` disables the ambient layer.
  - Pointer movement is bounded to three pixels.
  - Sparse 19s, 27s, and 31s ambient cycles replace constant spectacle.
  - Session-only `quiet`, `curious`, and `awake` states progressively reveal details.
  - Interactive clicks produce a brief visual touch receipt.
- Homepage:
  - Custom playable I Am AI Chapter 12 unit: `The Stranger Who Wanted to Die`.
  - No autoplay; play/pause, scrubber, current time, duration, and content note.
  - CableBox: `THE INTERNET BECOMES TELEVISION.`
  - Bookmaker: `A THOUGHT BECOMES A FINISHED BOOK.`
  - Orange5: `AI STOPS LIVING ON SOMEBODY ELSE'S MACHINE.`

## Source and build evidence

- Production worktree: `C:\AtomEons\atomeons\aether-v1\.deploy\aether-live`
- Branch: `aecdex/aether-live-production`
- GitHub: `https://github.com/Atom-Eons/atomeons-com`
- Commit: `fd936e02146a81b8775ebbef24df0c0b7c5b5732`
- Source mirror `main` was verified at the same commit.
- Build: `npm run build` — PASS.
- Framework: Next.js 16.2.6.
- Static generation: 49 of 49 pages — PASS.
- TypeScript: `npx tsc --noEmit` — PASS.
- Generated HTML files: 48.
- Sitemap URLs: 45.
- Internal link targets checked: 84.
- Missing internal targets: 0.
- Public Gmail-address leaks: 0.
- Local archive: `aether-sites-v14.tar.gz`.
- Archive bytes: 21,557,272.
- Archive SHA-256: `C7283B73DD72855BEDFD98E4C974A4DA596006C163B1268609A3F6D7C3A7BBF7`.

## Audio evidence

- Source: `C:\Users\a\Downloads\I-AM-AI-Audiobook\13 - Chapter 12 - The Stranger Who Wanted to Die.mp3`
- Published path: `/audio/i-am-ai-chapter-12-the-stranger-who-wanted-to-die.mp3`
- Bytes: 17,025,367.
- Source SHA-256: `078C666752F1B58338E00864111A6A413EA58592FAAB49E0AE291AE35447EEBD`.
- Live response: HTTP 200, `audio/mpeg`.
- Live SHA-256: `078C666752F1B58338E00864111A6A413EA58592FAAB49E0AE291AE35447EEBD`.
- Verdict: live audio is byte-for-byte identical to the supplied master.

## Production evidence

- Custom domain: `https://atomeons.com`
- Provider URL: `https://atomeons-aether.a-mccree.chatgpt.site`
- Sites project: `appgprj_6a59c864592c8191a8f2158cfe05af20`
- Version: 14.
- Version ID: `appgprj_6a59c864592c8191a8f2158cfe05af20~appgver_b8245a4bd1b08191892e6802dc946b68`
- Deployment ID: `appgdep_6a5af50e329c8191ab478a957e9b2bb2`
- Provider deployment ID: `a-mccree--atomeons-aether`
- Deployment status: succeeded.
- Sites content hash: `sha256:b43951dc332679ca7db960a8c55ca8a7d138a831bdf436d35754d7568cadd79e`.
- Sites artifact: 27,494,400 bytes, 464 files.
- Custom-domain homepage: HTTP 200.
- Provider homepage: HTTP 200.
- Live sitemap: 45 URLs.
- Live route audit: 45 of 45 returned HTTP 200.
- Live homepage dependencies: 13 of 13 real stylesheet, script, image, and canonical-link targets returned HTTP 200.
- V14 markers found live: state-change audio, Chapter 12 title, all three product shock plates, route psychology, touch receipt, reduced-motion handling, and sensory controls.
- Scanner note: a broad string scan reported `/openapi.js`; narrow DOM inspection proved the page says `/openapi.json` and does not load `/openapi.js`. This was a false positive, not a broken asset.

## Contact and email evidence

- Cloudflare zone: `3643e50196d47a552963e9726be1641a`.
- Email Routing: enabled, synced, and `ready`.
- Destination: `a.mccree@gmail.com`.
- Destination verified: 2026-07-17 21:11:45 UTC.
- Enabled named forwards: `hello`, `support`, `press`, `research`, `contact`, `atom`, `privacy`, and `legal`.
- Catch-all: enabled.
- DNS: three Email Routing MX records, SPF, and DKIM present.
- Test `AE-2026-07-17-01` was sent 21 seconds after routing sync and received a transient 550 before propagation completed.
- Test `AE-2026-07-17-02` was accepted by Cloudflare. Because its sender and destination were the same Gmail mailbox, Gmail deduplicated the forwarded copy; Cloudflare separately confirmed this same-account testing behavior.
- Verdict: forwarding configuration is operational and ready. A true inbox delivery receipt still requires one test from a different sender account. This is not a website release blocker.

## Blockers and limitations

- External-sender inbox delivery is not yet independently proven. The available test sender was the destination Gmail account, which triggers Gmail deduplication.
- No browser screenshot was captured in this pass. The release was instead verified through static generation, exact source and artifact hashes, DOM marker checks, exhaustive sitemap status checks, and live dependency probes.
- The static host returns the audio as a complete HTTP 200 response rather than a byte-range response. Playback is available; seeking may wait for more of the 17 MB file to buffer.

## Rollback and recovery

- Previous commit: `b38584313706e9a11a8b67c69b08a564fef36c37`.
- Previous version ID: `appgprj_6a59c864592c8191a8f2158cfe05af20~appgver_c587f8ff7220819181e06af53ccaf46a`.
- Previous deployment ID: `appgdep_6a5acbb850fc8191be01d9678370d5dc`.
- Previous archive: `aether-sites-v13.tar.gz`.
- Previous archive SHA-256: `63DB19F3B579673E2650CFEDFD0CE497F66CD917C4710C22AC6225FC0A95429A`.
- Previous Sites content hash: `sha256:89c344892b2c4fa60a354cd8cad48e52286d7b027480ffee5e8086b101db0c67`.
- Recovery action: redeploy the saved Version 13 artifact or restore the previous commit.

## Next action

Send one message from a non-`a.mccree@gmail.com` mailbox to `hello@atomeons.com` with a unique subject, then preserve the received Gmail headers as the final external-delivery receipt. After that, continue a visual-only refinement pass without expanding page count.
