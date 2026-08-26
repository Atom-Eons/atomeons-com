// A LIT TUBE WITH NO SIGNAL IS NEVER STILL — web port of Interstitials.DrawSnow.
//
// Same finding as the desktop build, same reason. Every "nothing is playing" state here was an
// empty black <video> element. Flat black is what a dead panel looks like; it reads as a hang, and
// it sits at exactly the moment a visitor decides what this thing is — the first seconds after the
// page loads, while the guide fetches and the first segments arrive.
//
// A CRT with the gun running and nothing to draw shows snow, and the snow ROLLS: the vertical hold
// drifts, a band walks up the frame, the sync tears now and then. That motion is the whole
// difference between "this machine is on and waiting" and "this page is broken".
//
// CHEAP BY CONSTRUCTION, because it runs alongside two live decoders. Noise tiles are generated
// ONCE into offscreen canvases and then blitted at churning offsets — a frame is a few drawImage
// calls and one gradient. The eye cannot follow individual grains at 30 Hz; it reads density and
// movement, and both survive tiling completely.

const TILE = 128;
const TILE_COUNT = 6;

let tiles = null;

function buildTiles() {
  if (tiles) return tiles;
  tiles = [];
  for (let i = 0; i < TILE_COUNT; i++) {
    const c = document.createElement('canvas');
    c.width = c.height = TILE;
    const ctx = c.getContext('2d');
    const img = ctx.createImageData(TILE, TILE);
    const d = img.data;
    for (let p = 0; p < d.length; p += 4) {
      // Weighted toward mid-grey rather than uniform: real snow is mostly mid-level with sparse
      // hot specks, and a flat uniform distribution reads as digital dither, not analogue grain.
      let v = (Math.random() + Math.random() + Math.random()) / 3 * 255;
      if (Math.random() < 0.025) v = Math.min(255, v + 90);      // the sparkle
      // Warm phosphor bias, matching the locked CRT baseline, so the noise belongs to the same
      // tube as the picture rather than looking like a separate overlay.
      d[p] = v;
      d[p + 1] = v;
      d[p + 2] = (v * 247) / 255;
      d[p + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    tiles.push(c);
  }
  return tiles;
}

export class Snow {
  /** @param {HTMLCanvasElement} canvas sized and positioned over the aperture */
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this._raf = 0;
    this._t0 = 0;
    this.intensity = 0.85;
  }

  start() {
    if (this._raf) return;
    buildTiles();
    this._t0 = performance.now();
    // 'block', not ''. Clearing the inline style falls back to the stylesheet, and the stylesheet
    // says display:none — so the canvas stayed hidden, clientWidth stayed 0, and the whole effect
    // silently never ran while every flag said it had started. Caught by a receipt that reported
    // a 300x150 default-sized canvas with zero lit pixels.
    this.canvas.style.display = 'block';
    const frame = () => {
      this._raf = requestAnimationFrame(frame);
      this._draw((performance.now() - this._t0) / 1000);
    };
    this._raf = requestAnimationFrame(frame);
  }

  stop() {
    cancelAnimationFrame(this._raf);
    this._raf = 0;
    this.canvas.style.display = 'none';
  }

  get running() { return this._raf !== 0; }

  _draw(t) {
    const c = this.canvas, ctx = this.ctx;
    // Render at a fraction of CSS size: snow has no detail worth resolving, and a full-DPR buffer
    // would cost more than the effect is worth while looking identical.
    const w = Math.max(2, Math.round(c.clientWidth / 2));
    const h = Math.max(2, Math.round(c.clientHeight / 2));
    if (c.width !== w || c.height !== h) { c.width = w; c.height = h; }

    // Not pure black. An energised tube with no signal is a dark warm grey; pure black reads as a
    // hole in the cabinet rather than as a screen.
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#1a1816';
    ctx.fillRect(0, 0, w, h);

    const frame = Math.floor(t * 30);
    const tile = tiles[((frame % TILE_COUNT) + TILE_COUNT) % TILE_COUNT];
    const ox = ((frame * 37) % TILE) - TILE;
    const oy = ((frame * 53) % TILE) - TILE;

    ctx.globalAlpha = 0.55 * this.intensity;
    for (let y = oy; y < h; y += TILE)
      for (let x = ox; x < w; x += TILE)
        ctx.drawImage(tile, x, y);

    // THE ROLL. A band walks slowly up the frame — the vertical hold not quite locked. This one
    // moving element is what makes the whole thing read as alive rather than as a noise texture.
    const rollH = Math.max(4, h / 9);
    const rollY = h - ((t * 0.32 % 1.0) * (h + rollH));
    const grad = ctx.createLinearGradient(0, rollY - rollH, 0, rollY + rollH);
    grad.addColorStop(0, 'rgba(255,250,240,0)');
    grad.addColorStop(0.5, `rgba(255,250,240,${0.18 * this.intensity})`);
    grad.addColorStop(1, 'rgba(255,250,240,0)');
    ctx.globalAlpha = 1;
    ctx.fillStyle = grad;
    ctx.fillRect(0, rollY - rollH, w, rollH * 2);

    // The occasional sync tear. Rare on purpose — constant tearing is a broken set, not an idle one.
    if (frame % 23 === 0) {
      ctx.fillStyle = `rgba(240,238,232,${0.47 * this.intensity})`;
      ctx.fillRect(0, (frame * 7919) % h, w, Math.max(1, h / 90));
    }
  }
}
