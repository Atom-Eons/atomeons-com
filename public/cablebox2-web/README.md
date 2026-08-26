# CableBox 2 — web build

The same box in a browser. Same dial, same 33 cabinets, same two-chain uptime design,
same predictive ad avoidance. No build step: it is static files and ES modules.

```
python -m http.server 8080 --directory webapp
```

It needs a real HTTP origin, not `file://`, because it loads ES modules.

## What is in here

| file | what it is |
|---|---|
| `src/hlswatch.js` | The playlist watch and the live-edge guard. Reads discontinuities and publisher stalls out of hls.js rather than parsing the playlist by hand. |
| `src/pair.js` | Programme and protect. Two decoders, role read at event time and never stored. |
| `src/depth.js` | The diorama. Four depth bands per cabinet, composited with `mask-image` on the GPU. |
| `src/guide.js` | The guide, as an overlay on the glass. Never steals a key. |
| `src/director.js` | Predictive ad avoidance. |
| `src/dial.js` | The channel algorithm — curated pool, anchors, seeded lottery. Shared design with native. |
| `src/crt.js` | The tube pass, WebGL2, same constants as the desktop build. |
| `relay/worker.js` | A two-route Cloudflare Worker. **Not** a general proxy — see below. |

## Why there is a relay at all

Pluto's boot and guide endpoints do not grant browser origins CORS access, so a page
cannot call them directly. The relay is an allowlisted two-route Worker: `/boot`,
`/guide`, and `/stream` for the stitcher and media hosts only. Tubi entries carry a
direct HLS URL and skip it entirely, because that host does serve `Access-Control-Allow-Origin: *`.

## Receipts

Open the console and type `CBX.report()`. It returns the live uptime state — per-chain
picture, playlist polls, splices seen, source-dead flags, live-edge seeks, measured
drift, and the director's swap/return/abandon counters.

This exists for the same reason the desktop build has `--dial-report` and `--smoke`:
"uptime is fixed" is a claim, and a claim needs somewhere to go and look.

## Platform honesty

- **iOS** runs a single chain. iOS has long permitted exactly one live decoder at a
  time, so the pair would not produce protection there — it would produce a second
  chain that never starts. Failover degrades to a fast re-tune, which is worse, and
  saying so beats pretending.
- **Two decoders cost real work.** The pair drops to one chain when the programme
  starts dropping frames — measured via `getVideoPlaybackQuality`, not predicted from
  `hardwareConcurrency`, because core count says how many cores exist rather than
  whether they are busy.
- **The depth layers are 1536 wide here**, not the 3072 the desktop build uses. About a
  megabyte per cabinet, fetched one theme at a time. Regenerate with
  `tools/depth/web_layers.py`.
