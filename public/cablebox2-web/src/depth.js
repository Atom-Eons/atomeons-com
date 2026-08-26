// THE DIORAMA — web port of native Render/DepthScene.cs.
//
// A cabinet is a photograph, and a photograph is flat. The bake splits it into four depth bands so
// it stops being flat: near objects displace more than far ones as the viewpoint moves, the tube
// sits INSIDE the room rather than pasted onto it, and the whole thing reads as a box you could
// reach into. "ITS MR TOAD. OR ALICE RIDE." — a diorama you ride past, not a spaceship.
//
// The compositing model is inherited from the native build and it is worth stating plainly,
// because it is the one thing that makes the effect free:
//
//   THE SCREEN APERTURE IS A REAL HOLE IN THE ALPHA. Every layer carries it. So the video sits
//   BEHIND the whole stack and shows through, which means near-field objects — a lamp, a plant,
//   the edge of a shelf — occlude the picture correctly with no per-object work at all. That
//   occlusion is the entire reason this reads as depth rather than as a wobbling poster.
//
// Layers ship as JPEG colour plus a separate greyscale PNG alpha, because RGBA PNG at bake
// resolution came to 1.1 GB across the set and that is not a thing you ask someone to download to
// watch television. The browser recombines them for free with `mask-image`, which is a GPU path —
// cheaper than the canvas compositing the native build has to do by hand.
//
// NO SCALE INFLATION. The obvious way to stop a displaced layer pulling its own edge into frame is
// to scale every layer up a percent or two. The native build did exactly that and it silently
// broke every hand-measured rect in the app — the aperture, the knob hotspots, the channel LED —
// because they are all measured against the UNSCALED artwork. Clip instead. The geometry is then
// the same geometry everywhere, which is the only way hand-measurement stays valid.

const AUTHOR_W = 1536, AUTHOR_H = 1024;

export class DepthScene {
  constructor(host) {
    this.host = host;          // positioned container, same box as the flat cabinet image
    this.layers = [];
    this.parallaxPx = 18;
    this.stem = null;
    this._raf = 0;
    this._px = 0.5; this._py = 0.5;      // desired viewpoint, 0..1
    this._cx = 0.5; this._cy = 0.5;      // current, eased
    this._t0 = performance.now();
    this._pointerSeen = false;
  }

  /**
   * Swap in a cabinet. Resolves once the layers have decoded, so the caller can hold the old
   * artwork up until the new one is ready rather than flashing an empty box between themes.
   * Returns false when there is no bake for this cabinet, and the caller draws it flat — a
   * missing bake must degrade to "the app you already had", never to a blank wall.
   */
  async load(depthDir, themeFile) {
    const stem = themeFile.replace(/\.png$/i, '');
    if (this.stem === stem) return true;

    let manifest;
    try {
      const r = await fetch(`${depthDir}/${stem}.json`);
      if (!r.ok) return false;
      manifest = await r.json();
    } catch { return false; }
    if (!manifest.layers?.length) return false;

    const built = [];
    await Promise.all(manifest.layers.map(async (l, i) => {
      const rgb = `${depthDir}/${l.file}`;
      const alpha = l.alpha ? `${depthDir}/${l.alpha}` : null;
      // Decode BEFORE attaching. Attaching an undecoded background paints a blank layer for a
      // frame or two, and four layers popping in one at a time looks like a fault.
      await Promise.all([decode(rgb), alpha ? decode(alpha) : null].filter(Boolean));

      const node = document.createElement('div');
      node.className = 'depth-layer';
      node.style.cssText =
        'position:absolute;inset:0;background-size:100% 100%;background-repeat:no-repeat;' +
        'will-change:transform;pointer-events:none;';
      node.style.backgroundImage = `url("${rgb}")`;
      if (alpha) {
        // The alpha ships as a greyscale plate, so key on LUMINANCE. Keying on alpha instead
        // would read the PNG's own (fully opaque) alpha channel and mask nothing at all — the
        // stack would render as four opaque copies and the aperture would vanish.
        node.style.maskImage = `url("${alpha}")`;
        node.style.webkitMaskImage = `url("${alpha}")`;
        node.style.maskMode = 'luminance';
        node.style.webkitMaskMode = 'luminance';
        node.style.maskSize = '100% 100%';
        node.style.webkitMaskSize = '100% 100%';
        node.style.maskRepeat = 'no-repeat';
        node.style.webkitMaskRepeat = 'no-repeat';
      }
      built[i] = { node, depth: l.meanDepth ?? 0, band: l.band ?? i };
    }));

    this.clear();
    // Far first. Painter's order: band 0 is the backdrop, the last band is whatever is nearest
    // the viewer and therefore in front of everything including the picture.
    built.sort((a, b) => a.band - b.band);
    for (const l of built) this.host.appendChild(l.node);
    this.layers = built;
    this.parallaxPx = manifest.parallaxPx ?? 18;
    this.stem = stem;
    return true;
  }

  clear() {
    for (const l of this.layers) l.node.remove();
    this.layers = [];
    this.stem = null;
  }

  /** Desired viewpoint in 0..1 across the cabinet. */
  look(nx, ny) {
    this._px = clamp01(nx);
    this._py = clamp01(ny);
    this._pointerSeen = true;
  }

  start() {
    if (this._raf) return;
    const frame = () => {
      this._raf = requestAnimationFrame(frame);
      this._step();
    };
    this._raf = requestAnimationFrame(frame);
  }

  stop() {
    cancelAnimationFrame(this._raf);
    this._raf = 0;
  }

  _step() {
    if (!this.layers.length) return;

    // WITHOUT A POINTER, BREATHE. On a phone there is no cursor and the diorama would sit dead
    // still, which is worse than flat — a still 3-D scene reads as a rendering mistake. A slow
    // lissajous at a couple of cycles per minute is under the threshold of "something is moving"
    // and over the threshold of "this is alive". It also never repeats exactly, because the two
    // periods are not commensurate.
    if (!this._pointerSeen) {
      const t = (performance.now() - this._t0) / 1000;
      this._px = 0.5 + Math.sin(t * 0.083) * 0.5;
      this._py = 0.5 + Math.sin(t * 0.061) * 0.32;
    }

    // Ease rather than track. A layer stack that snaps to the cursor feels like a mouse-over
    // gimmick; one that arrives a few frames late feels like mass.
    const k = 0.08;
    this._cx += (this._px - this._cx) * k;
    this._cy += (this._py - this._cy) * k;

    const scale = this.host.clientWidth / AUTHOR_W || 1;
    const ox = (this._cx - 0.5) * -2 * this.parallaxPx * scale;
    const oy = (this._cy - 0.5) * -2 * this.parallaxPx * 0.45 * scale;

    for (const l of this.layers) {
      // Displacement is proportional to NEARNESS. The backdrop sits at depth ~0.04 and therefore
      // barely moves, which is both correct (infinite distance has no parallax) and the reason no
      // edge seam appears at the frame boundary without any scale inflation.
      const d = l.depth;
      l.node.style.transform = `translate3d(${(ox * d).toFixed(2)}px, ${(oy * d).toFixed(2)}px, 0)`;
    }
  }
}

/**
 * Fetch and decode a plate — and NEVER hang, whatever the browser decides to do.
 *
 * `img.decode()` resolves when the image is ready for PRESENTATION, and a page that is not
 * compositing — a background tab, a hidden window, a minimised browser — may never present
 * anything. The promise then simply never settles.
 *
 * That is not a theoretical problem here, it was a dead application: the boot sequence awaits
 * `scene.load()`, so a decode that never resolves stalls the whole IIFE before the playback pair
 * is ever constructed. Open CableBox in a background tab and come back to it and you would find a
 * cabinet, no picture, no channels, and nothing in the console — because nothing had failed, it
 * was still politely waiting.
 *
 * So the decode is a nicety with a deadline. Its only job is to avoid a one-frame pop as layers
 * attach; if it has not delivered by then, attaching a not-yet-decoded plate is strictly better
 * than never attaching anything. `onload` alone already guarantees the bytes are there.
 */
const DECODE_DEADLINE_MS = 3000;

function decode(url) {
  return new Promise(res => {
    let done = false;
    const finish = () => { if (!done) { done = true; res(); } };
    // The deadline covers BOTH the network and the decode, so a stalled fetch cannot hang the
    // theme change either.
    setTimeout(finish, DECODE_DEADLINE_MS);
    const img = new Image();
    img.onload = () => (img.decode ? img.decode().then(finish, finish) : finish());
    img.onerror = finish;   // a missing plate must not hang the theme change
    img.src = url;
  });
}

const clamp01 = v => (v < 0 ? 0 : v > 1 ? 1 : v);
