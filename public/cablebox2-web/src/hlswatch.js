// THE PLAYLIST WATCH — web port of native Playback/HlsWatch.cs.
//
// CBX1 died of a five-minute wall, and the reason it was so hard to find is that its watchdog
// inspected the DECODER. During the exact failure the decoder looks healthy: it is playing, it has
// a buffer, it reports no error. What has actually happened is upstream — the publisher stopped
// advancing, and the player is quietly eating the last twenty-five seconds of a window that will
// never refill. By the time the decoder notices, the viewer has been staring at a frozen frame for
// half a minute.
//
// So watch the SOURCE, not the sink.
//
// The native build parses the media playlist by hand because LibVLC will not surface it. In the
// browser that work is already done: hls.js parses every playlist reload and hands over the whole
// LevelDetails. So this is the same design reading a better instrument —
//
//   SPLICE      a fragment arrives carrying a new continuity counter. That IS the
//               EXT-X-DISCONTINUITY, and it lands in the playlist up to a full live window before
//               the decoder reaches it. Advance notice of an ad break, for free.
//   DEAD        endSN stops advancing for SOURCE_STALL_LIMIT. The publisher is gone. Nothing about
//               the video element will tell you this for another twenty seconds.
//   DRIFT       how far behind the live edge we have fallen. Cumulative, so it is fatal on a
//               25 s window and invisible on a 60 s one — which is exactly why this bug reads as
//               "random" until you measure it.
//
// One subtlety carried over from the native build, and it cost real time there: the raw drift
// reading carries a sawtooth of roughly +/- one target duration, because the edge is quantised to
// segment boundaries. Acting on a raw reading means re-seeking on a phantom. Median over seven
// readings kills the sawtooth without adding the lag an average would.

export const SOURCE_STALL_LIMIT_MS = 18_000;
export const DRIFT_WINDOW = 7;

export class HlsWatch {
  constructor() {
    this._driftRing = new Array(DRIFT_WINDOW).fill(0);
    this._driftCount = 0;
    this._maxCc = -1;
    this._endSn = -1;
    this._endSnAt = 0;
    this._dead = false;
    this.updateCount = 0;
    this.spliceCount = 0;
    this.targetDuration = 0;

    // Listeners rather than an event emitter: three call sites, no unsubscribe, and a Map of
    // arrays would be more machinery than the thing it manages.
    this.onSpliceIncoming = null;   // (leadSeconds)
    this.onSourceWentDead = null;   // ()
  }

  reset() {
    this._driftCount = 0;
    this._maxCc = -1;
    this._endSn = -1;
    this._endSnAt = 0;
    this._dead = false;
    this.updateCount = 0;
    this.spliceCount = 0;
  }

  /**
   * Called on every hls.js LEVEL_UPDATED. `details` is the parsed media playlist; `currentTime` is
   * where the decoder actually is, which is the only way a lead time means anything.
   */
  ingest(details, currentTime, nowMs) {
    if (!details || !details.fragments || !details.fragments.length) return;
    this.updateCount++;
    this.targetDuration = details.targetduration || this.targetDuration;

    // ---- source liveness ----------------------------------------------------
    const endSn = details.endSN ?? details.fragments[details.fragments.length - 1].sn;
    if (endSn !== this._endSn) {
      this._endSn = endSn;
      this._endSnAt = nowMs;
      this._dead = false;
    } else if (this._endSnAt && !this._dead && nowMs - this._endSnAt > SOURCE_STALL_LIMIT_MS) {
      // The publisher has stopped. Say so ONCE — a watchdog that fires every poll turns a single
      // upstream problem into a channel-surfing storm.
      this._dead = true;
      this.onSourceWentDead?.();
    }

    // ---- splice detection ---------------------------------------------------
    // hls.js increments a fragment's continuity counter across an EXT-X-DISCONTINUITY, so a new
    // max cc appearing in the window is an ad pod arriving. Report the lead in SECONDS OF
    // PLAYBACK, not wall clock: what matters is how long the viewer still has of the programme.
    let maxCc = this._maxCc;
    let firstOfNewCc = null;
    for (const f of details.fragments) {
      if (f.cc > maxCc) { maxCc = f.cc; firstOfNewCc = f; }
    }
    if (firstOfNewCc && this._maxCc >= 0) {
      const lead = firstOfNewCc.start - currentTime;
      if (lead > 0) {
        this.spliceCount++;
        this.onSpliceIncoming?.(lead);
      }
    }
    this._maxCc = maxCc;
  }

  get sourceIsDead() { return this._dead; }

  /**
   * Median-filtered distance behind the live edge, or null until there are enough readings to
   * mean anything. `liveSyncPosition` is hls.js's own idea of the edge, which already accounts for
   * the back-off it applies; comparing against it rather than against the raw playlist end keeps
   * this honest about where the player is SUPPOSED to be.
   */
  driftSeconds(liveSyncPosition, currentTime) {
    if (!Number.isFinite(liveSyncPosition) || !Number.isFinite(currentTime)) return null;
    const raw = liveSyncPosition - currentTime;
    this._driftRing[this._driftCount % DRIFT_WINDOW] = raw;
    this._driftCount++;
    const n = Math.min(this._driftCount, DRIFT_WINDOW);
    if (n < 3) return raw;
    const sorted = this._driftRing.slice(0, n).sort((a, b) => a - b);
    return sorted[n >> 1];
  }
}

// THE LIVE-EDGE GUARD — web port of native Playback/LiveEdgeGuard.cs.
//
// Drift is cumulative and one-directional: every stall, every rebuffer, every decode hiccup
// spends buffer that is never repaid. On a 60-second window you can bleed for ten minutes before
// anything shows. On Pluto's 25-second window you get about five. That is the whole five-minute
// wall, and it is why the failure looked like a timer.
//
// The cure is unglamorous: notice you are falling behind and seek forward before the window
// closes. A seek costs a visible hitch of a few hundred milliseconds. A closed window costs the
// picture. Take the hitch.
export const DRIFT_WARN_SECONDS = 8;
export const DRIFT_ACT_SECONDS = 14;
export const MIN_SECONDS_BETWEEN_SEEKS = 20;

export class LiveEdgeGuard {
  constructor() {
    this.recoverCount = 0;
    this._lastSeekAt = -1e9;
  }

  reset() { this._lastSeekAt = -1e9; }

  /**
   * Returns the position to seek to, or null for "leave it alone" — which is the correct answer
   * almost always. Doing nothing has to be cheap and silent or the cure becomes the disease.
   */
  evaluate(drift, liveSyncPosition, nowSeconds) {
    if (drift === null || !Number.isFinite(liveSyncPosition)) return null;
    if (drift < DRIFT_ACT_SECONDS) return null;
    if (nowSeconds - this._lastSeekAt < MIN_SECONDS_BETWEEN_SEEKS) return null;
    this._lastSeekAt = nowSeconds;
    this.recoverCount++;
    // Land a beat BEHIND the edge, not on it. Seeking exactly to the edge means the next
    // segment boundary immediately re-stalls, and the guard starts fighting itself.
    return Math.max(0, liveSyncPosition - 2);
  }
}
