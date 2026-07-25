// CBX-FINAL-V1 webapp -- 1:1 controls / channels / themes to the desktop app.
//
// Key bindings (match native MainForm.TryHandlePlayerKey):
//   Left / Right     channel down / up (native StepChannelHistory)
//   C                Controls overlay
//   E                CRT toggle (default ON)
//   X                Museum / Exhibit overlay
//   F                Toggle favorite for current channel (persisted)
//   T                Cycle theme (33 themes, wraps)
//   R                Random channel
//   L                Fullscreen (native L = lock always-on-top; browser = fullscreen)
//   S / M / B        Window size Small / Medium / Big (native modes; browser scales viewport)
//   1 / 2 / 3        Opacity presets 100% / 60% / 20% (native TryApplyOpacityPreset)
//   Q / Escape       Close (browser: exit fullscreen; Escape also dismisses overlays)
//   Space            Pause / resume playback

import { startCrt, stopCrt, resizeCrt } from './crt.js';
import { buildDial, dayOfEpoch } from './dial.js';

const $ = id => document.getElementById(id);
const cabinet = $('cabinet'), video = $('video'), crt = $('crt'), shell = $('shell');

const IMG_W = 1536, IMG_H = 1024;
const STANDARD_APERTURE = { x: 286, y: 290, w: 806, h: 526 };

// Same file order as native Assets/Themes/ + RetroTvShell.
const THEMES = [
  '01-Orange.png','02-Red.png','03-Space.png','04-Steel.png','05-Teal.png',
  '06-Underwater.png','07-Patchouli.png','08-Cowboy.png','09-Gatsby.png',
  '10-CableBroadcastStation.png','11-YourBedroom1999.png','12-LivingRoom1970s.png',
  '13-NYCRain.png','14-VHSShopHomage.png','15-PublicAccess.png','16-Fireplace.png',
  '17-Motel99.png','18-WinterWonderland.png','19-RetroDriveThru.png','20-RecordShop.png',
  '21-PizzaParlour.png','22-Study.png','23-HippyMagic.png','24-MyBedroom1999.png',
  '25-Cheetah.png','26-Zen.png','27-TrainCar.png','28-Treehouse.png','29-Miami.png',
  '30-JapaneseForest.png','31-Boho.png','32-Paradise.png','33-Studio.png',
];
const HOMEBASE_THEME_INDEX = 0;   // 01-Orange, matches native _shellThemeIndex first-run pin.

let themeMeta = {};
let themeIdx = HOMEBASE_THEME_INDEX;
let channels = [];        // sorted by number (matches native dial order for random/lottery)
let chIdx = 0;
let hls = null;
let crtOn = true;
let opacityScale = 1.0;
let bootSession = null;
// Operator 2026-07-24: NO FAVS in the webapp. Favorites always empty; F key is a no-op.
const favorites = [];
let overlayOpen = null;   // 'controls' | 'exhibit' | null

// -------- OSD + Dial --------------------------------------------------------
// Operator 2026-07-24: no text overlays. Silent UI.
function showOsd(_t, _ms) { /* disabled */ }
// Persistent dial removed 2026-07-24 per operator: OSD-only channel readout on change.
function setDial(_number, _name) {}

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
  for (const node of [video, crt]) {
    node.style.left = L + '%'; node.style.top = T + '%';
    node.style.width = W + '%'; node.style.height = H + '%';
  }
  resizeCrt(crt);
}
function applyTheme(idx) {
  themeIdx = ((idx % THEMES.length) + THEMES.length) % THEMES.length;
  const file = THEMES[themeIdx];
  shell.src = `assets/themes/${file}`;
  shell.onload = () => placeAperture(file);
  placeAperture(file);
}

// -------- Pluto boot + guide (same flow as native PlutoGuideClient) ---------
async function ensureBoot() {
  if (bootSession) return bootSession;
  const dev = crypto.randomUUID().replace(/-/g, '').slice(0, 32);
  const sid = crypto.randomUUID();
  const url = `https://boot.pluto.tv/v4/start?appName=web&appVersion=9.22.0&deviceId=${dev}&deviceMake=chrome&deviceModel=web&deviceType=web&deviceVersion=122.0.0&clientID=${dev}&clientModelNumber=1.0.0&sid=${sid}`;
  const j = await (await fetch(url)).json();
  bootSession = { server: j.servers.stitcher, params: j.stitcherParams, jwt: j.sessionToken };
  return bootSession;
}
function buildStreamUrl(id) {
  const b = bootSession;
  return `${b.server}/v2/stitch/hls/channel/${encodeURIComponent(id)}/master.m3u8?${b.params}&jwt=${encodeURIComponent(b.jwt)}&masterJWTPassthrough=true`;
}
// Same filter as native PlutoGuideClient.IsPlayableLiveChannel:
//  number > 0, not on-demand, has HLS, name/category not "test", not audio-description.
function isPlayableLive(c) {
  if (!c || !c._id || !c.name) return false;
  if ((c.number ?? 0) <= 0) return false;
  if (c.onDemand) return false;
  if (!c.stitched?.urls?.[0]?.url) return false;
  const text = `${c.name} ${c.category || ''} ${c.summary || ''}`.toLowerCase();
  if (text.includes('test')) return false;
  if (text.includes('audio description') || text.includes('audio described') || text.includes('described video')) return false;
  if (/\bdvs\b/i.test(text)) return false;
  return true;
}

async function loadGuide() {
  await ensureBoot();
  const now = Date.now();
  const start = new Date(now - 6 * 3600_000).toISOString().replace(/\.\d+Z$/, 'Z');
  const stop  = new Date(now + 8 * 3600_000).toISOString().replace(/\.\d+Z$/, 'Z');
  const list = await (await fetch(`https://api.pluto.tv/v2/channels?start=${encodeURIComponent(start)}&stop=${encodeURIComponent(stop)}`)).json();
  const all = list
    .filter(isPlayableLive)
    .map(c => ({ id: c._id, name: c.name, number: c.number, category: c.category, summary: c.summary, source: 'pluto' }));

  // Apply CBX-FINAL-V1 dial algorithm: curated pool -> anchors -> seeded lottery -> CINEVAULT + favs.
  const { dial } = buildDial(all, favorites, dayOfEpoch());
  return dial;
}

// -------- Playback ----------------------------------------------------------
async function play(ch) {
  chIdx = channels.indexOf(ch);
  if (chIdx < 0) chIdx = 0;
  setDial(ch.number, ch.name);
  showOsd(`${ch.number}  ${ch.name}`);
  if (hls) { hls.destroy(); hls = null; }
  const url = buildStreamUrl(ch.id);
  if (window.Hls && Hls.isSupported()) {
    hls = new Hls({ liveDurationInfinity: true, lowLatencyMode: false });
    hls.loadSource(url);
    hls.attachMedia(video);
  } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = url;
  }
  try { await video.play(); } catch {}
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
function toggleFavorite() { /* NO FAVS in webapp */ }

// -------- Overlays: Controls + Exhibit -------------------------------------
function ensureOverlayNode() {
  let n = document.getElementById('ovl');
  if (n) return n;
  n = document.createElement('img');
  n.id = 'ovl';
  n.draggable = false;
  n.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:contain;background:#000;z-index:5;cursor:pointer;';
  cabinet.appendChild(n);
  n.addEventListener('click', hideOverlay);
  return n;
}
function showOverlay(kind) {
  const n = ensureOverlayNode();
  n.src = kind === 'exhibit' ? 'assets/Exhibit.png' : 'assets/Controls.png';
  n.style.display = '';
  overlayOpen = kind;
  showOsd(kind === 'exhibit' ? 'MUSEUM' : 'CONTROLS');
}
function hideOverlay() {
  const n = document.getElementById('ovl');
  if (n) n.style.display = 'none';
  overlayOpen = null;
}

// -------- CRT + opacity + fullscreen ---------------------------------------
function toggleCrt() {
  crtOn = !crtOn;
  crt.style.display = crtOn ? '' : 'none';
  if (crtOn) startCrt(video, crt); else stopCrt();
  showOsd(crtOn ? 'CRT ON' : 'CRT OFF');
}
function setOpacity(scale, label) {
  opacityScale = scale;
  cabinet.style.opacity = String(scale);
  showOsd(label);
}
function toggleFullscreen() {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen();
  else document.exitFullscreen();
}
// Native S/M/B swaps native window pixel size; in the browser we approximate by
// capping viewport height (S=60vh, M=80vh, B=100vh).
function setSizeMode(mode) {
  const h = mode === 'S' ? '60vh' : mode === 'M' ? '80vh' : '100vh';
  cabinet.style.height = h;
  showOsd(`SIZE ${mode}`);
  placeAperture(THEMES[themeIdx]);
}

// -------- Key filter (1:1 to native MainForm.TryHandlePlayerKey) ----------
document.addEventListener('keydown', e => {
  if (e.repeat) return;
  const k = e.key;
  // Native pattern: ANY key dismisses an open overlay (Controls or Exhibit) and the key is
  // consumed — nothing else fires.
  if (overlayOpen) { hideOverlay(); e.preventDefault(); return; }
  switch (k) {
    case 'ArrowLeft':  stepChannel(-1); e.preventDefault(); break;
    case 'ArrowRight': stepChannel(+1); e.preventDefault(); break;
    case 'c': case 'C': showOverlay('controls'); break;
    case 'e': case 'E': toggleCrt(); break;
    case 'x': case 'X': showOverlay('exhibit'); break;
    case 'f': case 'F': toggleFavorite(); break;
    case 't': case 'T': applyTheme(themeIdx + 1); showOsd(THEMES[themeIdx].replace(/\.png$/, '')); break;
    case 'r': case 'R': randomChannel(); break;
    case 'l': case 'L': toggleFullscreen(); showOsd(document.fullscreenElement ? 'ALWAYS ON TOP' : 'WINDOW UNLOCKED'); break;
    case 's': case 'S': setSizeMode('S'); break;
    case 'm': case 'M': setSizeMode('M'); break;
    case 'b': case 'B': setSizeMode('B'); break;
    case '1': setOpacity(1.0,  'OPACITY 100%'); break;
    case '2': setOpacity(0.60, 'OPACITY 60%'); break;
    case '3': setOpacity(0.20, 'OPACITY 20%'); break;
    case 'q': case 'Q': case 'Escape':
      if (document.fullscreenElement) document.exitFullscreen();
      break;
    case ' ':
      video.paused ? video.play() : video.pause();
      e.preventDefault();
      break;
  }
});

// Left-click = channel DOWN, right-click = channel UP (matches native TvShell click).
cabinet.addEventListener('click',       e => { if (!overlayOpen) stepChannel(-1); });
cabinet.addEventListener('contextmenu', e => { e.preventDefault(); if (!overlayOpen) stepChannel(+1); });

window.addEventListener('resize', () => placeAperture(THEMES[themeIdx]));

// Browser autoplay policy: HLS.js needs `muted` for autoplay. We start muted so the show
// launches, then unmute on the FIRST click / keypress so audio comes on naturally.
function armAutoUnmute() {
  const unmute = () => {
    if (video.muted) { video.muted = false; video.volume = 1.0; showOsd('AUDIO ON'); }
    document.removeEventListener('pointerdown', unmute, true);
    document.removeEventListener('keydown', unmute, true);
  };
  document.addEventListener('pointerdown', unmute, true);
  document.addEventListener('keydown', unmute, true);
}

// -------- Boot -------------------------------------------------------------
(async () => {
  await loadMeta();
  applyTheme(HOMEBASE_THEME_INDEX);
  video.muted = true;
  armAutoUnmute();
  startCrt(video, crt);
  // Operator 2026-07-24: Controls up on every page load. Any click / key dismisses.
  showOverlay('controls');
  try {
    channels = await loadGuide();
    if (!channels.length) throw new Error('no channels');
    await play(channels[0]);
  } catch (e) {
    console.warn('guide fetch failed', e);
    setDial('--', 'guide offline');
    showOsd('GUIDE OFFLINE', 3000);
  }
})();
