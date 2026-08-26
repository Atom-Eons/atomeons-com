// THE GUIDE, AND IT IS AN OVERLAY — web port of native Ui/GuideOverlay.cs.
//
// CBX1's guide was a CHANNEL. Channel zero. Opening it therefore RETUNED THE PLAYER, which is
// exactly why the operator remembers it as "working but then the speed was an issue": every glance
// cost a full tune out of live video and a full tune back. No amount of optimising the guide
// itself could ever have fixed that, because the cost was never in drawing the rows. It was in the
// guide being somewhere you had to GO.
//
// So this draws on the glass, over a picture that never stops. Opening it is free. Closing it is
// free. You can leave it up and keep watching.
//
// Two more things CBX1 got wrong, fixed here by construction rather than by care:
//
//   ROWS ARE BUILT ONCE. The list is composed on open and cached as DOM; scrolling moves a
//   transform. CBX1 rebuilt rows during paint, which is a second and independent source of the
//   same "speed issue".
//
//   IT NEVER OWNS THE KEYBOARD. Arrows still change channel with the guide up. A guide that traps
//   input is a menu, and this application is emphatically not a menu — the whole argument is that
//   choosing from a list is the disease. You can see what is on without being asked to pick.
//
// The top half carries the ads, per the operator's brief, which is also honest to the form: cable
// guides always sold the top half, and a guide with nothing up there reads as a spreadsheet.

const SCROLL_ROWS_PER_SECOND = 0.55;
const STALE_AFTER_MS = 2 * 60_000;
const ROW_H = 0.135;      // fraction of the guide's own height — proportional, so it reads the
                          // same on a 34-inch cabinet and a phone in landscape.

export class Guide {
  constructor(host) {
    this.host = host;
    this.visible = false;
    this._built = 0;
    this._scroll = 0;
    this._raf = 0;
    this._rows = [];
    this._node = null;
    this._track = null;
    this._adLine = null;
    this._adSub = null;
  }

  toggle(dial, onAirNumber, ads) {
    if (this.visible) this.hide(); else this.show(dial, onAirNumber, ads);
  }

  show(dial, onAirNumber, ads) {
    if (!this._node || performance.now() - this._built > STALE_AFTER_MS) {
      this.build(dial, onAirNumber);
    }
    if (ads) this.setAd(ads.line, ads.sub);
    this.visible = true;
    this._node.style.display = '';
    this._start();
  }

  hide() {
    this.visible = false;
    if (this._node) this._node.style.display = 'none';
    cancelAnimationFrame(this._raf);
    this._raf = 0;
  }

  setAd(line, sub) {
    if (this._adLine) this._adLine.textContent = line || '';
    if (this._adSub) this._adSub.textContent = sub || '';
  }

  /**
   * Compose the rows. On open, never during paint. It is a hundred-odd string formats — cheap,
   * but done ONCE, which is the entire point.
   */
  build(dial, onAirNumber) {
    if (this._node) this._node.remove();

    const root = document.createElement('div');
    root.className = 'guide';
    root.innerHTML = `
      <div class="guide-ad">
        <div class="guide-ad-line"></div>
        <div class="guide-ad-sub"></div>
        <div class="guide-clock"></div>
      </div>
      <div class="guide-list"><div class="guide-track"></div></div>`;
    this.host.appendChild(root);

    this._node = root;
    this._adLine = root.querySelector('.guide-ad-line');
    this._adSub = root.querySelector('.guide-ad-sub');
    this._clock = root.querySelector('.guide-clock');
    this._track = root.querySelector('.guide-track');

    const now = new Date();
    this._rows = dial.map(e => {
      const prog = e.nowPlaying?.(now) || e.now || null;
      const row = document.createElement('div');
      row.className = 'guide-row' + (e.number === onAirNumber ? ' guide-row-on' : '');
      // The BLURB is the only reason this beats a channel list — it says what is actually ON.
      // The first native layout gave the name 40% and the blurb the remainder, and the render
      // came back clipped mid-word: "The Dark Crystal — just star". A guide that cuts off what is
      // on has thrown away its single advantage over a numbered list. So the name gets what it
      // needs and the blurb gets the rest of the line.
      row.innerHTML =
        `<span class="guide-num">${e.number}</span>` +
        `<span class="guide-name">${esc(e.name)}</span>` +
        `<span class="guide-blurb">${esc(prog?.title || '')}</span>`;
      return row;
    });
    for (const r of this._rows) this._track.appendChild(r);

    // Start near what is on air, so opening the guide answers "what else is on" rather than
    // "here is the top of an alphabet".
    const at = dial.findIndex(e => e.number === onAirNumber);
    this._scroll = Math.max(0, at - 1);
    this._built = performance.now();
    this._last = this._built;
  }

  scroll(rows) { this._scroll = Math.max(0, this._scroll + rows); }

  _start() {
    if (this._raf) return;
    this._last = performance.now();
    const frame = () => {
      this._raf = requestAnimationFrame(frame);
      const now = performance.now();
      const dt = Math.min(0.25, (now - this._last) / 1000);
      this._last = now;
      // Wrap rather than stop. A guide that ends is a list; a guide that keeps going is cable.
      this._scroll += SCROLL_ROWS_PER_SECOND * dt;
      if (this._rows.length) this._scroll %= this._rows.length;

      const listH = this._node.querySelector('.guide-list').clientHeight;
      const rowPx = listH * ROW_H;
      this._track.style.transform = `translate3d(0, ${-this._scroll * rowPx}px, 0)`;
      this._track.style.setProperty('--row-h', rowPx + 'px');

      if (this._clock) {
        this._clock.textContent = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
      }
    };
    this._raf = requestAnimationFrame(frame);
  }
}

const esc = s => String(s ?? '').replace(/[&<>"]/g, c => (
  { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// THE HOUSE ADS — web port of native Ui/Interstitials.cs.
//
// There is no video-generation budget and there does not need to be one. A cable channel's own
// promos were always type on a colour field with a voice over the top; the form is the point, not
// the production value. These are written, not generated, which also means they can be funny.
export const HOUSE_ADS = [
  ['CABLEBOX', 'now with 100% more channels you did not choose'],
  ['UP NEXT ON CABLEBOX', 'something. we are as surprised as you are'],
  ['ATOMEONS', 'a laboratory in Marco Island, Florida'],
  ['STAY TUNED', 'the box is doing the choosing tonight'],
  ['CABLEBOX', 'if you liked everything, you liked nothing'],
  ['TECHNICAL DIFFICULTIES', 'please do not adjust your set. we already did'],
  ['ATOMEONS SYSTEMS LABORATORY', 'we build the strange durable things'],
  ['COMING UP', 'a programme, at a time, on a channel'],
];

export function houseAd(i) {
  const [line, sub] = HOUSE_ADS[((i % HOUSE_ADS.length) + HOUSE_ADS.length) % HOUSE_ADS.length];
  return { line, sub };
}
