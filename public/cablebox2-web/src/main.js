// CABLEBOX 2 — web build.
//
// Same box as the desktop app, built out of what a browser actually has. The parts that carry the
// product are all here:
//
//   UPTIME      two chains, program and protect, with the playlist watch reading discontinuities
//               and stalls out of hls.js. "SWITCH CHANNEL IS PREFERRED ALWAYS OVER BLACK SCREEN."
//   DIORAMA     four depth bands per cabinet, JPEG colour plus a mask, parallax on the GPU.
//   GUIDE       an overlay on the glass. Free to open, free to close, never steals a key.
//   DIRECTOR    an ad break announces itself up to a live window early; pre-roll and cut through it.
//
// Keys (1:1 with native):
//   Left / Right   channel down / up          G   guide
//   C  controls    X  museum                  E   tube on/off
//   T  cabinet     R  random                  F   fullscreen
//   1 / 2 / 3      opacity presets            Space  pause
//   Escape         closes the guide first, then leaves fullscreen

import { startCrt, stopCrt, resizeCrt } from './crt.js';
import { buildDial, dayOfEpoch } from './dial.js';
import { PlaybackPair } from './pair.js';
import { DepthScene } from './depth.js';
import { Guide, houseAd } from './guide.js';
import { ShowDirector, nowPlaying } from './director.js';
import { install as installSelftest } from './selftest.js';
import { Snow } from './snow.js';

const $ = id => document.getElementById(id);
const cabinet = $('cabinet'), crt = $('crt'), shell = $('shell');
const videoA = $('videoA'), videoB = $('videoB');
const depthHost = $('depth'), guideHost = $('guide'), snowCanvas = $('snow');
const hitTheme = $('hit-theme'), hitChannel = $('hit-channel');

const IMG_W = 1536, IMG_H = 1024;
const STANDARD_APERTURE = { x: 286, y: 290, w: 806, h: 526 };
// GitHub Pages cannot call the boot/guide JSON origins directly because those endpoints do not
// grant this browser origin CORS access. This narrow relay is an allowlisted two-route Worker,
// not a general-purpose proxy.
const GUIDE_RELAY = 'https://cablebox-web-relay.a-mccree.workers.dev';
const DEPTH_DIR = 'assets/depth';

const THEMES = [
  '01-Orange.png','02-Red.png','03-Space.png','04-Steel.png','05-Teal.png',
  '06-Underwater.png','07-Patchouli.png','08-Cowboy.png','09-Gatsby.png',
  '10-CableBroadcastStation.png','11-YourBedroom1999.png','12-LivingRoom1970s.png',
  '13-NYCRain.png','14-VHSShopHomage.png','15-PublicAccess.png','16-Fireplace.png',
  '17-Motel99.png','18-WinterWonderland.png','19-RetroDriveThru.png','20-RecordShop.png',
  '21-PizzaParlour.png','22-Study.png','23-HippyMagic.png','24-MyBedroom1999.png',
  '25-Cheetah.png','26-Zen.png','27-TrainCar.png','28-Treehouse.png','29-Miami.png',
  '30-JapaneseForest.png','31-Boho.png','32-Paradise.png','RetroTvShell.png',
];
const HOMEBASE_THEME_INDEX = 0;

let themeMeta = {};
let themeIdx = HOMEBASE_THEME_INDEX;
let channels = [];
let chIdx = 0;
let crtOn = true;
let bootSession = null;
let overlayOpen = null;      // 'controls' | 'exhibit' | null
let adIndex = 0;
const favorites = [];        // operator 2026-07-24: NO FAVS in the webapp
// Consecutive channels that produced a manifest but never a frame. See pair.onDeadChannel.
let deadTuneStreak = 0;
let depthError = null;   // surfaced in CBX.report() so a silent cabinet failure has a name
const DEAD_TUNE_LIMIT = 5;

const isCoarse = matchMedia('(pointer: coarse)').matches;
const scene = new DepthScene(depthHost);
const guide = new Guide(guideHost);
const director = new ShowDirector();
const snow = new Snow(snowCanvas);
let pair = null;

// Operator 2026-07-24: no text overlays. Silent UI.
function showOsd() {}

// -------- Theme / aperture placement ---------------------------------------
async function loadMeta() {
  try { themeMeta = (await (await fetch('assets/theme-screens.json')).json()).themes || {}; }
  catch { themeMeta = {}; }
}

function placeAperture(themeFile) {
  const rect = themeMeta[themeFile] || STANDARD_APERTURE;
  const infl = 0.03;   // native LayoutScreenHost 3% "always-oversized" tuck
  const cx = rect.x + rect.w / 2, cy = rect.y + rect.h / 2;
  const w2 = rect.w * (1 + infl), h2 = rect.h * (1 + infl);
  const L = ((cx - w2 / 2) / IMG_W) * 100;
  const T = ((cy - h2 / 2) / IMG_H) * 100;
  const W = (w2 / IMG_W) * 100;
  const H = (h2 / IMG_H) * 100;
  // The guide goes in the aperture too, so it sits ON the television rather than over the room.
  for (const node of [videoA, videoB, crt, guideHost, snowCanvas]) {
    node.style.left = L + '%'; node.style.top = T + '%';
    node.style.width = W + '%'; node.style.height = H + '%';
  }
  resizeCrt(crt);
  placeKnobHits(themeFile);
}

function placeKnobHits(themeFile) {
  const hs = (themeMeta[themeFile] || {}).hotspots || {};
  const themeKnob = hs.muteKnob    || [1160, 334, 108, 108];   // TOP knob
  const chanKnob  = hs.channelKnob || [1160, 516, 108, 108];   // BOTTOM knob
  for (const [node, [x, y, w, h]] of [[hitTheme, themeKnob], [hitChannel, chanKnob]]) {
    const grow = 0.40;   // finger-friendly, visual centre preserved
    const cx = x + w / 2, cy = y + h / 2;
    const w2 = w * (1 + grow), h2 = h * (1 + grow);
    node.style.left   = ((cx - w2 / 2) / IMG_W) * 100 + '%';
    node.style.top    = ((cy - h2 / 2) / IMG_H) * 100 + '%';
    node.style.width  = (w2 / IMG_W) * 100 + '%';
    node.style.height = (h2 / IMG_H) * 100 + '%';
  }
}

/**
 * Swap cabinets. The flat PNG goes up FIRST and only steps aside once the depth layers have
 * decoded — a theme change must never show an empty box, and a missing bake has to degrade to the
 * flat cabinet rather than to a blank wall.
 */
async function applyTheme(idx) {
  themeIdx = ((idx % THEMES.length) + THEMES.length) % THEMES.length;
  const file = THEMES[themeIdx];
  shell.src = `assets/themes/${file}`;
  shell.classList.remove('hidden');
  depthHost.classList.remove('on');
  shell.onload = () => placeAperture(file);
  placeAperture(file);

  const ok = await scene.load(DEPTH_DIR, file);
  if (ok && THEMES[themeIdx] === file) {
    depthHost.classList.add('on');
    shell.classList.add('hidden');
    scene.start();
  } else {
    scene.clear();
    scene.stop();
  }
}

// -------- Pluto boot + guide (same flow as native PlutoGuideClient) ---------
async function ensureBoot() {
  if (bootSession) return bootSession;
  const dev = crypto.randomUUID().replace(/-/g, '').slice(0, 32);
  const sid = crypto.randomUUID();
  const url = `${GUIDE_RELAY}/boot?appName=web&appVersion=9.22.0&deviceId=${dev}&deviceMake=chrome&deviceModel=web&deviceType=web&deviceVersion=122.0.0&clientID=${dev}&clientModelNumber=1.0.0&sid=${sid}`;
  const j = await (await fetch(url)).json();
  bootSession = { server: j.servers.stitcher, params: j.stitcherParams, jwt: j.sessionToken };
  return bootSession;
}

function buildStreamUrl(id) {
  const b = bootSession;
  return `${b.server}/v2/stitch/hls/channel/${encodeURIComponent(id)}/master.m3u8?${b.params}&jwt=${encodeURIComponent(b.jwt)}&masterJWTPassthrough=true`;
}

function relayHlsUrl(raw) {
  try {
    const url = new URL(raw, location.href);
    const host = url.hostname.toLowerCase();
    const stitcher = host.endsWith('.pluto.tv') && url.pathname.startsWith('/v2/stitch/hls/');
    const media = host.endsWith('.plutotv.net');
    if (stitcher || media) return `${GUIDE_RELAY}/stream?url=${encodeURIComponent(url.href)}`;
  } catch {}
  return raw;
}

// Same filter as native PlutoGuideClient.IsPlayableLiveChannel.
//
// The two text checks deliberately scan DIFFERENT fields, matching native exactly:
//   ContainsTestMarker  -> Name + Category only
//   IsAudioDescription  -> Name + Category + Summary
// Folding Summary into the "test" check (as this used to) is not a stricter version of the same
// rule, it is a different rule: "test" is a substring of ordinary English words that show up
// constantly in Pluto blurbs — greaTEST, laTEST, hotTEST, conTESTants. That one extra field
// silently deleted 33 live channels, 8 of them curated picks.
function isPlayableLive(c) {
  if (!c || !c._id || !c.name) return false;
  if ((c.number ?? 0) <= 0) return false;
  if (c.onDemand) return false;
  if (!c.stitched?.urls?.[0]?.url) return false;

  const nameCat = `${c.name} ${c.category || ''}`.toLowerCase();
  if (nameCat.includes('test')) return false;

  const withSummary = `${nameCat} ${c.summary || ''}`.toLowerCase();
  if (withSummary.includes('audio description')
    || withSummary.includes('audio described')
    || withSummary.includes('described video')) return false;
  if (/\bdvs\b/i.test(withSummary)) return false;
  return true;
}

// Tubi source pack — same playlist native's TubiSourcePack uses. EXTRA channels merged into the
// Pluto pool, never a replacement, and CINEVAULT lives here (not on Pluto). Entries carry a direct
// HLS URL, so playback skips the stitcher and the relay entirely.
const TUBI_PLAYLIST = 'https://raw.githubusercontent.com/BuddyChewChew/tubi-scraper/refs/heads/main/tubi_playlist.m3u';
// OPERATOR-CURATED, mirrors native TubiSourcePack.DefaultExtraChannels exactly. Do not add entries
// on a genre heuristic — this is a deliberate "best stuff to rewatch" pick, not a retro sweep.
const TUBI_WHITELIST = [
  'The Johnny Carson Show','The Carol Burnett Show','CINEVAULT','CINEVAULT: Classics',
  'CINEVAULT: Westerns','Classic Cinema','At the Movies','Baywatch',
];

function parseM3u(text) {
  const out = [], lines = text.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const L = lines[i].trim();
    if (!L.startsWith('#EXTINF')) continue;
    const name = (L.split(',').slice(1).join(',') || '').trim();
    const group = (L.match(/group-title="([^"]*)"/i) || [])[1] || '';
    let url = '';
    for (let j = i + 1; j < lines.length; j++) {
      const u = lines[j].trim();
      if (u && !u.startsWith('#')) { url = u; break; }
    }
    if (name && url) out.push({ name, group, url });
  }
  return out;
}

// Never let a source pack take the app down (native TubiSourcePack has the same rule).
async function loadTubiExtras() {
  try {
    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), 6000);
    const text = await (await fetch(TUBI_PLAYLIST, { signal: ctl.signal })).text();
    clearTimeout(timer);
    const all = parseM3u(text);
    return TUBI_WHITELIST
      .map(want => all.find(c => c.name.trim().toLowerCase() === want.toLowerCase()))
      .filter(Boolean)
      .map((c, i) => ({
        id: `tubi-${i}`, name: c.name, number: 9000 + i,
        category: c.group, summary: '', source: 'tubi',
        hlsUrl: c.url, timelines: null,
      }));
  } catch (e) {
    console.warn('tubi extras unavailable, continuing Pluto-only', e?.name || e);
    return [];
  }
}

async function loadGuide() {
  const now = Date.now();
  const start = new Date(now - 6 * 3600_000).toISOString().replace(/\.\d+Z$/, 'Z');
  const stop  = new Date(now + 8 * 3600_000).toISOString().replace(/\.\d+Z$/, 'Z');

  await ensureBoot();
  const [list, tubi] = await Promise.all([
    fetch(`${GUIDE_RELAY}/guide?start=${encodeURIComponent(start)}&stop=${encodeURIComponent(stop)}`).then(r => r.json()),
    loadTubiExtras(),
  ]);

  const all = list.filter(isPlayableLive).map(c => ({
    id: c._id, name: c.name, number: c.number, category: c.category, summary: c.summary,
    source: 'pluto',
    // KEEP THE TIMELINES. CBX1 threw them away and then had no way to answer "what is actually on
    // right now", which is what both the guide blurb and the Programme Director are built on.
    timelines: c.timelines || null,
  }));

  const { dial } = buildDial(all, favorites, dayOfEpoch(), tubi);
  return dial;
}

// -------- Playback ----------------------------------------------------------
function urlFor(ch) { return ch.hlsUrl || buildStreamUrl(ch.id); }

function makePair() {
  const HlsCtor = window.Hls && window.Hls.isSupported() ? window.Hls : null;
  const hlsConfig = {
    liveDurationInfinity: true,
    lowLatencyMode: false,
    // hls.js keeps the original context URL for relative playlist resolution; xhrSetup changes
    // only the browser transport URL to the allowlisted relay.
    xhrSetup(xhr, requestUrl) {
      const transportUrl = relayHlsUrl(requestUrl);
      if (transportUrl !== requestUrl) xhr.open('GET', transportUrl, true);
    },
  };

  const p = new PlaybackPair(videoA, videoB, {
    Hls: HlsCtor,
    hlsConfig,
    // iOS has long permitted exactly one live decoder at a time. Running the pair there would not
    // produce protection, it would produce a second chain that never starts — so say so and let
    // the failover degrade to a fast re-tune rather than pretend.
    canRunTwoDecoders: !!HlsCtor && !isIOS(),
  });

  p.onProgramChanged = (video) => {
    // A real picture is the only thing that clears the streak. Counting a TUNE as success would
    // make the ceiling meaningless -- every dead channel tunes perfectly.
    if (video.readyState >= 2) deadTuneStreak = 0;
    // The visible element and the CRT source both follow the PROGRAMME, and they are re-derived
    // from the pair rather than remembered. Anything that caches which element is on screen is a
    // lie the first time a swap happens.
    videoA.style.opacity = video === videoA ? '1' : '0';
    videoB.style.opacity = video === videoB ? '1' : '0';
    if (crtOn) startCrt(video, crt);
  };
  p.onSpliceIncoming = (lead) => {
    if (director.away) { director.detourSpliced(); return; }
    director.spliceIncoming(lead, channels);
  };
  p.onFailover = (reason) => { deadTuneStreak = 0; console.info('cablebox failover:', reason); };

  // A channel that publishes cleanly and never decodes. Move the dial rather than sit black —
  // "SWITCH CHANNEL IS PREFERRED ALWAYS OVER BLACK SCREEN" is the whole brief.
  //
  // WITH A CEILING, though. If the network is down, the relay is unreachable, or Pluto is having
  // an outage, then EVERY channel looks dead and an uncapped rule walks the entire dial every
  // twelve seconds forever — on a phone that is pure data burn with nothing on screen to show for
  // it. After DEAD_TUNE_LIMIT consecutive dead tunes the conclusion is not "this channel is bad",
  // it is "the source is gone", and the correct response to that is to stop and wait rather than
  // to keep paying for the same answer. Any successful picture clears the streak.
  p.onDeadChannel = () => {
    if (++deadTuneStreak > DEAD_TUNE_LIMIT) {
      console.warn(`dial watchdog: ${deadTuneStreak - 1} dead tunes in a row — the source looks `
        + 'down, stopping the auto-surf. A knob tap or arrow key still retries on demand.');
      return;
    }
    console.warn(`dial watchdog: no first frame, moving on (${deadTuneStreak}/${DEAD_TUNE_LIMIT})`);
    stepChannel(+1);
  };
  return p;
}

function isIOS() {
  return /iP(hone|ad|od)/.test(navigator.platform)
    || (navigator.userAgent.includes('Mac') && 'ontouchend' in document);
}

// hls.js only reports LEVEL_UPDATED per instance, so route each one to the chain that owns it.
function wireLevelEvents(p) {
  if (!window.Hls) return;
  const patch = (chainGetter) => {
    const hls = chainGetter();
    if (!hls || hls.__cbxWired) return;
    hls.__cbxWired = true;
    hls.on(window.Hls.Events.LEVEL_UPDATED, (_e, data) => p.ingestLevel(hls, data.details));
    hls.on(window.Hls.Events.ERROR, (_e, data) => {
      if (!data.fatal) return;
      if (data.type === window.Hls.ErrorTypes.NETWORK_ERROR) hls.startLoad();
      else if (data.type === window.Hls.ErrorTypes.MEDIA_ERROR) hls.recoverMediaError();
    });
  };
  // Both chains re-create their hls instance on every tune, so re-wire on the same tick everything
  // else runs on. Cheap, and immune to the ordering problems a one-shot hook would have.
  setInterval(() => {
    patch(() => p._a?.hls);
    patch(() => p._b?.hls);
  }, 1000);
}

async function play(ch) {
  chIdx = channels.indexOf(ch);
  if (chIdx < 0) chIdx = 0;
  director.landed(ch);
  await pair.tune(urlFor(ch));
}

function stepChannel(direction) {
  if (!channels.length) return;
  chIdx = ((chIdx + direction) % channels.length + channels.length) % channels.length;
  play(channels[chIdx]);
}

function randomChannel() {
  if (!channels.length) return;
  chIdx = Math.floor(Math.random() * channels.length);
  play(channels[chIdx]);
}

// -------- Overlays: Controls + Museum --------------------------------------
function ensureOverlayNode() {
  let n = document.getElementById('ovl');
  if (n) return n;
  n = document.createElement('img');
  n.id = 'ovl';
  n.draggable = false;
  cabinet.appendChild(n);
  n.addEventListener('click', enterTelevision);
  // The museum plate is large and decodes for about a second. Fetching it at boot rather than on
  // first open means X opens onto the exhibit instead of onto a black rectangle — the decode still
  // takes as long, it just no longer happens while the viewer is looking at the result.
  const warm = new Image();
  warm.src = 'assets/Exhibit.png';
  return n;
}

/** The Controls card, drawn from KEYS. See the note there: the PNG version lied. */
function ensureControlsNode() {
  let n = document.getElementById('ctl');
  if (n) return n;
  n = document.createElement('div');
  n.id = 'ctl';
  n.innerHTML =
    '<div class="ctl-card">' +
      '<div class="ctl-title">CABLEBOX</div>' +
      '<div class="ctl-sub">CONTROLS</div>' +
      '<dl class="ctl-list">' +
      KEYS.map(k => `<div class="ctl-row"><dt>${k.show}</dt><dd>${k.label}</dd></div>`).join('') +
      '</dl>' +
      '<div class="ctl-foot">CLICK THE KNOBS &middot; ANY KEY TO WATCH</div>' +
    '</div>';
  cabinet.appendChild(n);
  n.addEventListener('click', enterTelevision);
  return n;
}

function showOverlay(kind) {
  if (kind === 'controls') {
    ensureControlsNode().style.display = '';
    overlayOpen = kind;
    return;
  }
  const n = ensureOverlayNode();
  n.src = 'assets/Exhibit.png';
  n.style.display = '';
  overlayOpen = kind;
}
function hideOverlay() {
  for (const id of ['ovl', 'ctl']) {
    const n = document.getElementById(id);
    if (n) n.style.display = 'none';
  }
  overlayOpen = null;
}
function enterTelevision() {
  hideOverlay();
  if (pair && !pair.programVideo.currentSrc && channels.length) play(channels[chIdx]);
  else pair?.programVideo.play().catch(() => {});
}

function toggleGuide() {
  const onAir = channels[chIdx]?.number ?? -1;
  // Attach nowPlaying so the guide can print what is actually ON rather than only a channel name.
  const dial = channels.map(e => ({ ...e, nowPlaying: (t) => nowPlaying(e, t) }));
  guide.toggle(dial, onAir, houseAd(adIndex++));
  guideHost.classList.toggle('on', guide.visible);
}

// -------- CRT + opacity + fullscreen ---------------------------------------
function toggleCrt() {
  crtOn = !crtOn;
  crt.style.display = crtOn ? '' : 'none';
  if (crtOn) startCrt(pair ? pair.programVideo : videoA, crt); else stopCrt();
}
function setOpacity(scale) { cabinet.style.opacity = String(scale); }
function toggleFullscreen() {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
  else document.exitFullscreen();
}

// -------- Keys (1:1 to native MainForm.TryHandlePlayerKey) -----------------
/**
 * ONE TABLE. The key handler dispatches from it AND the Controls card is drawn from it, so the
 * help cannot describe a control the build does not have.
 *
 * IT COULD BEFORE, AND IT DID. The web build shipped CBX1's native Controls artwork — a PNG. It
 * advertised F as FAVORITE (the web has no favourites; F is fullscreen), L as LOCK (no always-on-
 * top in a browser; also fullscreen), S/M/B as SIZE (not implemented at all), and Q as QUIT (a tab
 * cannot quit itself). Meanwhile G, E and Space — three controls that DO work — were absent
 * entirely. Four lies and three omissions on the first screen every visitor sees.
 *
 * The honest fix is not a corrected PNG, because a corrected PNG goes stale the next time a key
 * moves and nothing anywhere would notice. Deriving the card from the dispatch table makes the
 * failure structurally impossible: a control that is not in this list cannot be pressed, and one
 * that is in it is on the card by construction.
 */
const KEYS = [
  { keys: ['ArrowLeft'],  show: '<',       label: 'CHANNEL DOWN', run: () => stepChannel(-1), eat: true },
  { keys: ['ArrowRight'], show: '>',       label: 'CHANNEL UP',   run: () => stepChannel(+1), eat: true },
  { keys: ['r'],          show: 'R',       label: 'RANDOM CHANNEL', run: () => randomChannel() },
  { keys: ['g'],          show: 'G',       label: 'GUIDE',        run: () => toggleGuide() },
  { keys: ['t'],          show: 'T',       label: 'CABINET',      run: () => applyTheme(themeIdx + 1) },
  { keys: ['e'],          show: 'E',       label: 'PICTURE TUBE', run: () => toggleCrt() },
  { keys: ['x'],          show: 'X',       label: 'CABLEBOX MUSEUM', run: () => showOverlay('exhibit') },
  { keys: ['c'],          show: 'C',       label: 'CONTROLS',     run: () => showOverlay('controls') },
  { keys: ['1', '2', '3'], show: '1 2 3',  label: 'INVISIBILITY',
    run: (k) => setOpacity(k === '1' ? 1.0 : k === '2' ? 0.60 : 0.20) },
  { keys: [' '],          show: 'SPACE',   label: 'PAUSE',
    run: () => { const v = pair?.programVideo; if (v) { v.paused ? v.play() : v.pause(); } }, eat: true },
  { keys: ['f', 'l'],     show: 'F',       label: 'FULL SCREEN',  run: () => toggleFullscreen() },
  { keys: ['Escape', 'q'], show: 'ESC',    label: 'BACK',
    // Guide first, then fullscreen. Escape should undo the most recent thing.
    run: () => {
      if (guide.visible) { guide.hide(); guideHost.classList.remove('on'); }
      else if (document.fullscreenElement) document.exitFullscreen();
    } },
];

const KEY_MAP = new Map();
for (const entry of KEYS) {
  for (const k of entry.keys) KEY_MAP.set(k.length === 1 ? k.toLowerCase() : k, entry);
}

document.addEventListener('keydown', e => {
  if (e.repeat) return;
  // Native pattern: ANY key dismisses an open Controls/Museum card and the key is consumed.
  if (overlayOpen) { hideOverlay(); e.preventDefault(); return; }

  const entry = KEY_MAP.get(e.key.length === 1 ? e.key.toLowerCase() : e.key);
  if (!entry) return;
  // Deliberately NOT consumed by the guide: arrows keep changing channel with it open. A guide
  // that traps input is a menu, and choosing from a list is the disease this box treats.
  entry.run(e.key);
  if (entry.eat) e.preventDefault();
});

// Desktop mouse: left = channel down, right = channel up. Disabled on touch so the knob taps are
// the only touch interaction.
if (!isCoarse) {
  cabinet.addEventListener('click',       () => { if (!overlayOpen) stepChannel(-1); });
  cabinet.addEventListener('contextmenu', e => { e.preventDefault(); if (!overlayOpen) stepChannel(+1); });
  // The pointer drives the diorama. This is the whole reason a desktop visitor sees depth at all.
  cabinet.addEventListener('pointermove', e => {
    const r = cabinet.getBoundingClientRect();
    scene.look((e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height);
  });
}

// Touch knobs: tap TOP knob -> cabinet, tap BOTTOM knob -> channel.
function tapTopKnob(e) {
  e.preventDefault(); e.stopPropagation();
  goLandscapeFullscreen();
  if (overlayOpen) { enterTelevision(); return; }
  applyTheme(themeIdx + 1);
}
function tapBottomKnob(e) {
  e.preventDefault(); e.stopPropagation();
  goLandscapeFullscreen();
  if (overlayOpen) { enterTelevision(); return; }
  stepChannel(+1);
}
for (const [node, fn] of [[hitTheme, tapTopKnob], [hitChannel, tapBottomKnob]]) {
  if ('PointerEvent' in window) node.addEventListener('pointerup', fn);
  else node.addEventListener('touchend', fn, { passive: false });
}

let requestedFullscreen = false;
function goLandscapeFullscreen() {
  if (!isCoarse || requestedFullscreen || document.fullscreenElement) return;
  if (typeof document.documentElement.requestFullscreen !== 'function') return;
  try {
    const request = document.documentElement.requestFullscreen({ navigationUI: 'hide' });
    requestedFullscreen = true;
    Promise.resolve(request)
      .then(() => screen.orientation?.lock?.('landscape').catch(() => {}))
      .catch(() => { requestedFullscreen = false; });
  } catch { requestedFullscreen = false; }
}
if (isCoarse) {
  const firstTapEvent = 'PointerEvent' in window ? 'pointerdown' : 'touchend';
  document.addEventListener(firstTapEvent, goLandscapeFullscreen, { capture: true, passive: true });
}

window.addEventListener('resize', () => placeAperture(THEMES[themeIdx]));

// Browser autoplay policy: hls.js needs `muted` for autoplay. Start muted so the show launches,
// then unmute on the FIRST gesture so audio comes on naturally.
function armAutoUnmute() {
  const unmute = () => {
    const v = pair?.programVideo;
    // Do not unmute an empty video: that turns a harmless muted autoplay into a policy-blocked
    // unmuted autoplay after the network request finishes.
    if (!v || v.readyState < 2) return;
    pair.muted = false;
    v.volume = 1.0;
    void v.play().then(() => {
      document.removeEventListener('pointerdown', unmute, true);
      document.removeEventListener('keydown', unmute, true);
    }).catch(() => { pair.muted = true; });
  };
  document.addEventListener('pointerdown', unmute, true);
  document.addEventListener('keydown', unmute, true);
}

// -------- Boot -------------------------------------------------------------
(async () => {
  await loadMeta();

  // THE CABINET NEVER BLOCKS THE TELEVISION.
  //
  // This used to be `await applyTheme(...)`, which put an image decode on the critical path to
  // constructing the playback pair. Depth layers are decoration; a picture is the product. Awaiting
  // decoration before starting the product is backwards even when it works, and when it did not
  // work it was fatal: a decode that never resolves — see DECODE_DEADLINE_MS — left the boot
  // sequence waiting forever, so the app came up with a cabinet, no channels, and nothing in the
  // console, because nothing had failed. It was still politely waiting.
  //
  // Fired and forgotten. The flat cabinet is already on screen; the depth layers replace it
  // whenever they are ready, or never, and either way the box is tuning by then.
  // Not awaited, but NOT silent either. A bare `void` swallows the rejection, which trades a hang
  // for an invisible failure — the same trade this project keeps refusing everywhere else.
  applyTheme(HOMEBASE_THEME_INDEX).catch(e => {
    depthError = String(e && (e.stack || e.message) || e);
    console.warn('cabinet depth failed, showing the flat cabinet:', e);
  });

  pair = makePair();
  pair.muted = true;
  wireLevelEvents(pair);
  armAutoUnmute();
  startCrt(videoA, crt);

  // The director never cuts onto a cold chain. Unlike every other swap in the app it is LEAVING
  // something healthy, so a failed cut is a pure loss — when the answer is no, the detour is
  // abandoned and the ad plays.
  director.replacementReady = () => pair?.protectHasPicture === true;

  director.onPreRoll = (entry) => pair.preroll(urlFor(entry));
  director.onCutTo = (entry) => {
    // The pre-roll is already decoding on the protect chain, so this is a cut, not a tune.
    // rearm:false leaves the outgoing chain alone — on a detour that chain is the viewer's home
    // channel, still healthy, and keeping it warm is what makes the trip back invisible too.
    chIdx = Math.max(0, channels.indexOf(entry));
    pair.swap('director', { rearm: false });
  };

  // Operator 2026-07-24: Controls up on every page load. Any click / key dismisses.
  showOverlay('controls');

  // The one heartbeat. Rotation, drift correction, capability measurement and the director all
  // run here — one timer is easier to reason about than five, and they all want the same cadence.
  setInterval(() => {
    pair.tick();
    director.tick();
    // SNOW WHENEVER THERE IS NO PICTURE. Checked on the same heartbeat as everything else rather
    // than hooked to a single event, because the states that leave the glass empty arrive by
    // several different routes -- cold start, a dead channel, a failover with no warm chain -- and
    // one poll covers all of them without needing each to remember to say so.
    const dark = !pair.anyPicture;
    if (dark && !snow.running) snow.start();
    else if (!dark && snow.running) snow.stop();
  }, 2000);

  // THE RECEIPTS WINDOW. The desktop build has --dial-report and --smoke; the web build gets this,
  // because "uptime is fixed" is a claim and a claim needs somewhere to go and look. Open the
  // console and type CBX.report(). Everything the uptime machinery counts is in here.
  window.CBX = {
    get pair() { return pair; },
    get director() { return director; },
    get channels() { return channels; },
    get scene() { return scene; },
    report() {
      const p = pair, a = p?._a, b = p?._b;
      const chain = c => c && ({
        url: c.url ? c.url.slice(0, 72) + '…' : null,
        picture: c.hasPicture, readyState: c.video.readyState,
        polls: c.watch.updateCount, splices: c.watch.spliceCount,
        sourceDead: c.watch.sourceIsDead, seeks: c.guard.recoverCount,
        drift: c.hls ? +(c.hls.liveSyncPosition - c.video.currentTime).toFixed(2) : null,
      });
      return {
        channels: channels.length,
        onAir: channels[chIdx] ? `${channels[chIdx].number} ${channels[chIdx].name}` : null,
        program: p && (p.programVideo === videoA ? 'A' : 'B'),
        standby: p?.standbyEnabled,
        swaps: p?.swapCount, recoveries: p?.recoverCount, degrades: p?.degradeCount,
        director: { swaps: director.swapCount, returns: director.returnCount, away: director.away },
        depth: { cabinet: scene.stem, layers: scene.layers.length, error: depthError },
        A: chain(a), B: chain(b),
      };
    },
  };

  // CBX.selftest() -- the browser half of the proof. The harness owns the state machine; this
  // owns the part a harness cannot reach: real decoders, real HLS, real swaps.
  installSelftest(window.CBX);

  try {
    channels = await loadGuide();
    if (!channels.length) throw new Error('no channels');
    await play(channels[0]);
  } catch (e) {
    console.warn('guide fetch failed', e);
  }
})();
