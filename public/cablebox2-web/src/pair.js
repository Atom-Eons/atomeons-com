// PROGRAM AND PROTECT — web port of native Playback/PlaybackPair.cs.
//
// The operator's line is the whole specification: "SWITCH CHANNEL IS PREFERRED ALWAYS OVER BLACK
// SCREEN." Not "recover quickly". Not "show a nice error". Never be black.
//
// You cannot get there with one decoder, because every repair a single decoder can perform —
// reload, seek, re-attach, re-tune — costs seconds during which there is nothing on screen. The
// only way to make a repair invisible is to have the replacement ALREADY DECODING before you need
// it. So there are two chains, and the viewer is looking at exactly one of them:
//
//   PROGRAM   on screen, audible
//   PROTECT   decoding, hidden, muted, one swap away from being the programme
//
// Three depths, deliberately:
//   ROTATION   swap every few minutes even when nothing is wrong. PREVENTION. A chain that is
//              regularly retired never gets old enough to accumulate the drift that kills it.
//   GUARD      seek forward when drift crosses the line. CURE, on whichever chain needs it.
//   SWAP       the moment the programme loses its picture, the other one is already warm. COVER.
//
// THE BUG THIS DESIGN EXISTS TO PREVENT, and I wrote it before I got it right: if a chain's role
// is stored anywhere — a boolean, an index, a captured closure variable — then after the first
// swap that stored copy is a lie, and the second failure recovers into the wrong element. It
// worked once, then silently stopped, which is the worst failure mode there is. So role is not
// stored. A Chain owns its own machinery, and `isProgram(chain)` is an identity comparison
// evaluated at the moment of the event. There is nothing to go stale.

import { HlsWatch, LiveEdgeGuard } from './hlswatch.js';

const ROTATION_INTERVAL_MS = 4 * 60_000;
const PROTECT_START_DELAY_MS = 4_000;
// Frames the programme may drop, per sample, before the machine is declared unable to carry two
// decoders. Measured rather than guessed: `hardwareConcurrency` says how many cores exist, not
// whether they are busy, and a thermally-throttled laptop reports the same eight cores it had
// when it was cold.
const DROPPED_FRAME_BUDGET = 12;
const DEGRADE_PATIENCE = 4;

/**
 * How long a channel gets to produce its FIRST frame before it is written off.
 *
 * THE HOLE THIS FILLS, found by the browser self-test sitting at readyState 0 for thirty seconds
 * with no error anywhere: every other detector here watches for something GOING WRONG. The video
 * element fires `error`. The playlist watch notices the publisher stop advancing. Both assume the
 * channel worked once.
 *
 * A free dial has a failure mode neither of those sees. The stitcher hands back a perfectly valid
 * master playlist, the media playlist keeps advancing on schedule, hls.js is happy, nothing throws
 * — and no frame ever arrives. Nothing is broken in any way that announces itself, so every
 * watchdog stays silent and the viewer stares at a black rectangle indefinitely.
 *
 * Which is precisely the outcome this application exists to refuse: "SWITCH CHANNEL IS PREFERRED
 * ALWAYS OVER BLACK SCREEN." So silence is not evidence of health. A channel that has not produced
 * a picture by now is treated as dead whether or not it has the courtesy to say so.
 *
 * Twelve seconds is deliberately generous. A cold start on a slow connection legitimately takes
 * several, and abandoning a channel that was about to work is its own visible fault.
 */
const FIRST_FRAME_LIMIT_MS = 12_000;

class Chain {
  constructor(video, HlsCtor, hlsConfig) {
    this.video = video;
    this.HlsCtor = HlsCtor;
    this.hlsConfig = hlsConfig;
    this.hls = null;
    this.url = null;
    this.watch = new HlsWatch();
    this.guard = new LiveEdgeGuard();
    this.sawPicture = false;
  }

  get hasPicture() {
    return this.sawPicture && this.video.readyState >= 2 && !this.video.ended;
  }

  load(url) {
    this.stop();
    this.url = url;
    this.sawPicture = false;
    this.watch.reset();
    this.guard.reset();

    if (this.HlsCtor && this.HlsCtor.isSupported()) {
      this.hls = new this.HlsCtor(this.hlsConfig);
      this.hls.loadSource(url);
      this.hls.attachMedia(this.video);
      return this.hls;
    }
    // Native-HLS path (iOS Safari before ManagedMediaSource). No playlist instrument here, so
    // this chain runs on decoder events alone — degraded, and honestly so.
    this.video.crossOrigin = 'anonymous';
    this.video.src = url;
    return null;
  }

  stop() {
    if (this.hls) { this.hls.destroy(); this.hls = null; }
    this.video.removeAttribute('src');
    try { this.video.load(); } catch { /* teardown races are not interesting */ }
    this.url = null;
    this.sawPicture = false;
  }
}

export class PlaybackPair {
  /**
   * @param {HTMLVideoElement} videoA
   * @param {HTMLVideoElement} videoB
   * @param {object} opts { Hls, hlsConfig, buildUrl(channel), canRunTwoDecoders }
   */
  constructor(videoA, videoB, opts = {}) {
    this._a = new Chain(videoA, opts.Hls, opts.hlsConfig);
    this._b = new Chain(videoB, opts.Hls, opts.hlsConfig);
    this._program = this._a;
    this._protect = this._b;
    this._protectPending = false;
    this._lastRotate = 0;
    this._muted = true;
    this._hot = 0;
    this._lastDropped = 0;

    // Some platforms will not decode two live streams at once — iOS in particular has long
    // allowed exactly one. Rather than pretend, the pair runs single-chain there and the failover
    // degrades to a fast re-tune. A worse guarantee stated plainly beats a better one that is not
    // actually true on the device in the visitor's hand.
    this.standbyEnabled = opts.canRunTwoDecoders !== false;

    this.onProgramChanged = null;    // (videoElement) — the compositor re-points at this
    this.onSpliceIncoming = null;    // (leadSeconds) — only ever from the PROGRAM chain
    this.onFailover = null;          // (reason)
    /**
     * This channel is never going to show anything — move the dial.
     *
     * The pair cannot do that itself: it owns two decoders, not the dial, and giving it the
     * channel list so it could pick its own replacement would put the tuning policy in two places.
     * It reports the finding; the app decides where to go.
     */
    this.onDeadChannel = null;       // ()
    this.deadChannelCount = 0;
    this._programSince = 0;
    this.swapCount = 0;
    this.recoverCount = 0;
    this.degradeCount = 0;

    for (const chain of [this._a, this._b]) this._wire(chain);
  }

  // Identity, evaluated now. Never cached, never captured. See the header.
  _isProgram(chain) { return chain === this._program; }

  _wire(chain) {
    chain.video.addEventListener('playing', () => {
      if (chain.video.readyState >= 2) chain.sawPicture = true;
    });
    chain.video.addEventListener('error', () => {
      if (this._isProgram(chain)) this._failover('decoder error');
    });
    chain.watch.onSourceWentDead = () => {
      if (this._isProgram(chain)) this._failover('source stopped publishing');
    };
    chain.watch.onSpliceIncoming = (lead) => {
      if (this._isProgram(chain)) this.onSpliceIncoming?.(lead);
    };
  }

  get programVideo() { return this._program.video; }
  get protectVideo() { return this._protect.video; }

  /** True when at least one chain can put a picture on the glass. */
  get anyPicture() {
    return this._program.hasPicture || (this.standbyEnabled && this._protect.hasPicture);
  }

  /**
   * Is there a warm replacement to cut to right now?
   *
   * Read by the one DISCRETIONARY caller of swap() — the Programme Director, which leaves a
   * healthy programme on a deadline rather than covering a dead one. Every other caller is
   * repairing a failure and has already earned its swap; this is the only one that has to ask
   * permission first. See ShowDirector.replacementReady.
   */
  get protectHasPicture() {
    return this.standbyEnabled && this._protect.hasPicture;
  }

  get muted() { return this._muted; }
  set muted(v) { this._muted = v; this._applyAudio(); }

  _applyAudio() {
    // The protect chain is ALWAYS silent. It is decoding a second copy of something, and the one
    // thing worse than a black screen is two soundtracks at once.
    this._program.video.muted = this._muted;
    this._protect.video.muted = true;
  }

  /** Tune the programme. The protect chain follows onto the same feed a beat later. */
  async tune(url) {
    this._program.load(url);
    this._applyAudio();
    this._protectPending = true;
    this._lastRotate = performance.now();
    this._programSince = performance.now();
    try { await this._program.video.play(); }
    catch {
      // Autoplay policy, not a stream failure. Fall back to muted so the picture at least
      // appears; a later gesture turns the sound on.
      this._program.video.muted = true;
      try { await this._program.video.play(); } catch { /* the tick will retry */ }
    }
    this.onProgramChanged?.(this._program.video);
  }

  /** Pre-roll a specific URL on the protect chain — the Programme Director's lever. */
  preroll(url) {
    if (!this.standbyEnabled) return;
    this._protectPending = false;
    if (this._protect.url === url) return;
    this._protect.load(url);
    this._protect.video.muted = true;
    this._protect.video.play().catch(() => {});
  }

  /**
   * Cut to whatever the protect chain is showing. The point of the whole design.
   *
   * `rearm` decides what happens to the chain that just stepped off screen, and the two cases are
   * genuinely different:
   *
   *   FAILURE RECOVERY (rearm: true) — the outgoing chain is broken. Both chains should converge
   *   back onto the working feed so there is protection again as soon as possible.
   *
   *   A DIRECTOR DETOUR (rearm: false) — the outgoing chain is the viewer's HOME channel, healthy
   *   and decoding. Re-pointing it at the detour would throw away the one thing that makes the
   *   trip home invisible, and then the return would have to cold-start the very channel we were
   *   still holding warm a second earlier.
   */
  swap(reason = 'swap', { rearm = true } = {}) {
    const incoming = this._protect;
    const outgoing = this._program;
    this._program = incoming;
    this._protect = outgoing;
    this.swapCount++;
    this._applyAudio();
    this._program.video.play().catch(() => {});
    this.onProgramChanged?.(this._program.video);
    this._protectPending = rearm;
    this._lastRotate = performance.now();
    // The first-frame clock restarts on the incoming chain. It is showing something different now,
    // and judging it by how long the chain it replaced had been struggling would condemn a healthy
    // replacement for its predecessor's failure.
    this._programSince = performance.now();
    return reason;
  }

  _failover(reason) {
    this.recoverCount++;
    if (this.standbyEnabled && this._protect.hasPicture) {
      this.swap(reason);
      this.onFailover?.(reason);
      return;
    }
    // No warm chain — either standby is off or the protect side is not up yet. Reload in place.
    // Visible, and much better than staying black.
    const url = this._program.url;
    if (url) {
      this._program.load(url);
      this._program.video.play().catch(() => {});
    }
    this.onFailover?.(`${reason} (no warm chain)`);
  }

  /** Feed a LEVEL_UPDATED through to whichever chain it belongs to. */
  ingestLevel(hlsInstance, details) {
    for (const chain of [this._a, this._b]) {
      if (chain.hls === hlsInstance) {
        chain.watch.ingest(details, chain.video.currentTime, performance.now());
        return;
      }
    }
  }

  /** Call on a ~2 s timer. Rotation, drift correction, and the honest capability check. */
  tick() {
    const now = performance.now();
    const nowS = now / 1000;

    // Drift correction on BOTH chains. A protect chain that has drifted out of its window is not
    // protection, it is a second copy of the same problem waiting to become the programme.
    for (const chain of [this._a, this._b]) {
      if (!chain.hls || !chain.url) continue;
      const sync = chain.hls.liveSyncPosition;
      const drift = chain.watch.driftSeconds(sync, chain.video.currentTime);
      const target = chain.guard.evaluate(drift, sync, nowS);
      if (target !== null) chain.video.currentTime = target;
    }

    this._measureCapability();

    // NO FIRST FRAME, NO EXCUSES. See FIRST_FRAME_LIMIT_MS: a channel can publish a flawless
    // playlist forever and never decode, and nothing else in this file would ever notice.
    if (this._program.url && !this._program.hasPicture
        && now - this._programSince > FIRST_FRAME_LIMIT_MS) {
      this._programSince = now;                 // one report per window, not one per tick
      this.deadChannelCount++;
      if (this.standbyEnabled && this._protect.hasPicture) {
        // Somewhere else is already decoding. Take it — a different programme beats a black one.
        this.swap('programme never started');
        this.onFailover?.('programme never started');
      } else {
        this.onDeadChannel?.();
      }
    }

    if (!this.standbyEnabled) return;

    // Bring the protect chain up on the same feed, a beat after the programme, so the two are not
    // competing for bandwidth during the one moment the viewer is actually waiting.
    if (this._protectPending && now - this._lastRotate > PROTECT_START_DELAY_MS) {
      this._protectPending = false;
      if (this._program.url) this.preroll(this._program.url);
      this._protectPending = false;
    }

    // ROTATION. Retire the programme before it is old enough to fail. Only when the replacement
    // genuinely has a picture — a rotation onto a dead chain would manufacture the exact outage
    // the rotation exists to prevent.
    if (now - this._lastRotate > ROTATION_INTERVAL_MS
        && this._protect.hasPicture
        && this._protect.url === this._program.url) {
      this.swap('rotation');
    }
  }

  /**
   * DROPPED FRAMES, NOT CORE COUNT.
   *
   * The browser will not tell you what share of the CPU this tab is using, and the numbers it will
   * tell you — hardwareConcurrency, deviceMemory — describe the machine rather than its current
   * load. `getVideoPlaybackQuality` reports what the visitor can actually see: frames the decoder
   * was handed and could not draw. That is the symptom the whole governor exists to prevent, so
   * measure it directly instead of predicting it from a spec sheet.
   */
  _measureCapability() {
    const q = this._program.video.getVideoPlaybackQuality?.();
    if (!q) return;
    const dropped = q.droppedVideoFrames - this._lastDropped;
    this._lastDropped = q.droppedVideoFrames;

    if (this.standbyEnabled && dropped > DROPPED_FRAME_BUDGET) {
      if (++this._hot < DEGRADE_PATIENCE) return;
      this._hot = 0;
      this.standbyEnabled = false;
      this.degradeCount++;
      // Stop the second decoder for real. A flag that only stops FUTURE work while the existing
      // decoder keeps running saves nothing, which is a mistake the native build made first and
      // measured its way out of.
      this._protect.stop();
    } else if (dropped === 0) {
      this._hot = 0;
    }
  }
}
