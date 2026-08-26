// THE PROGRAMME DIRECTOR — web port of native Signal/ShowDirector.cs.
//
// The operator called this one: "smarter would be more show algo that is putting up great shows or
// movies when they are on and hot swapping the channels when not showing content."
//
// It is only possible because of one thing: the playlist watch sees an EXT-X-DISCONTINUITY the
// moment it enters the live window, which on this stitcher is up to twenty-five seconds BEFORE the
// decoder reaches it. An ad break announces itself while the show is still playing. That advance
// notice is the difference between two completely different products:
//
//   REACTIVE   notice the ad, then leave. The viewer sees the ad start, sees the channel change,
//              and understands that a machine just reacted for them. Every seam is visible.
//   PREDICTIVE pre-roll a replacement during the lead time and cut at the frame the break begins.
//              One programme ends, another begins. There was never an advertisement.
//
// THREE RULES, and they exist to keep this a companion rather than a machine that fidgets:
//
//   ALWAYS RETURN. A hot swap is a detour, not a decision. A director that wanders is shuffle with
//   extra steps, and shuffle is the disease this box was built to treat.
//
//   RARELY. One swap per MIN_BETWEEN_SWAPS_MS. Remove the worst moments, do not curate every
//   minute — a box that is always improving things is a box you are always aware of.
//
//   NEVER DURING A GOOD BIT. No splice coming, nothing happens. Doing nothing is the correct
//   output most of the time.

export const AD_BREAK_ESTIMATE_MS = 150_000;
export const MIN_LEAD_SECONDS = 5.0;
export const MIN_BETWEEN_SWAPS_MS = 4 * 60_000;
const NEARLY_OVER_AT = 0.9;

/**
 * How long the homecoming gets to warm up before the cut.
 *
 * The return trip used to fire onPreRoll and onCutTo back to back inside a single tick, so the
 * replacement had had no time at all — a swap onto a chain that started loading microseconds
 * earlier, i.e. a guaranteed black screen on EVERY homecoming. The detour got a full live window
 * of lead time and the trip home got nothing, purely because an ad break announces itself and the
 * end of one does not.
 */
export const HOMECOMING_WARMUP_MS = 6_000;

export class ShowDirector {
  constructor() {
    this.enabled = true;
    /**
     * Is the replacement actually decoding yet? Asked immediately before the cut, and the answer
     * is allowed to be no.
     *
     * THIS IS THE ONE DISCRETIONARY SWAP IN THE APPLICATION, which is exactly why it needs its own
     * guard. Every other caller of pair.swap() is covering a failure: the outgoing chain is
     * already dead, so cutting to a marginal replacement is strictly better than staying. The
     * director is different. It cuts on a DEADLINE — the splice lands whether or not the pre-roll
     * finished — and the programme it is leaving is perfectly healthy. Swapping onto a chain that
     * has not produced a frame would manufacture the black screen this entire application exists
     * to prevent, in order to avoid an advertisement.
     *
     * So when the replacement is not warm the detour is ABANDONED, not delayed. The viewer sees
     * the ad. That is correct: the director's whole value is that its moves are invisible, and a
     * visible move is worse than no move at all.
     */
    this.replacementReady = null;   // () => boolean
    this.abandonCount = 0;
    this._stagedIsHome = false;
    this.home = null;
    this.onAir = null;
    this.swapCount = 0;
    this.returnCount = 0;
    this._away = false;
    this._awaySince = 0;
    this._lastSwap = -1e9;
    this._staged = null;
    this._cutAt = 0;

    this.onPreRoll = null;   // (entry)
    this.onCutTo = null;     // (entry)
  }

  get away() { return this._away; }

  landed(entry) {
    this.onAir = entry;
    if (!this._away) this.home = entry;   // a user tune sets a new home; a detour does not
    this._staged = null;
    this._stagedIsHome = false;
  }

  /** An ad splice is coming in `leadSeconds`. The moment the whole design turns on. */
  spliceIncoming(leadSeconds, dial, now = new Date()) {
    if (!this.enabled || this._away || !this.onAir) return;
    if (leadSeconds < MIN_LEAD_SECONDS) return;
    const t = performance.now();
    if (t - this._lastSwap < MIN_BETWEEN_SWAPS_MS) return;

    const target = choose(dial, now, this.onAir);
    if (!target) return;

    this._staged = target;
    this._stagedIsHome = false;
    // Cut slightly BEFORE the splice lands. Arriving a beat early means the last thing seen is the
    // end of a programme rather than the first frame of an advert, and that half second is the
    // difference between "it changed" and "it was never there".
    this._cutAt = t + Math.max(0, leadSeconds - 0.6) * 1000;
    this.onPreRoll?.(target);
  }

  /** Same ~2 s tick as the pair. Performs the cut and the homecoming. */
  tick() {
    if (!this.enabled) return;
    const t = performance.now();

    if (this._staged && t >= this._cutAt) {
      // Unless there is nothing to cut TO. See replacementReady: abandoned, not delayed.
      if (this.replacementReady && !this.replacementReady()) {
        this._staged = null;
        this.abandonCount++;
        return;
      }

      const s = this._staged;
      const wasHome = this._stagedIsHome;
      this._staged = null;
      this._stagedIsHome = false;

      if (wasHome) {
        this._away = false;
        this.returnCount++;
      } else {
        this._away = true;
        this._awaySince = t;
        this._lastSwap = t;
        this.swapCount++;
      }
      this.onCutTo?.(s);
      return;
    }

    // The homecoming — staged and warmed like any other cut, then taken by the guarded path above.
    //
    // If the guard abandons it, nothing here needs to change: _staged goes back to null while
    // _away and _awaySince are untouched, so this condition is true again on the very next tick
    // and the trip home simply re-attempts until the chain is warm. The retry falls out of the
    // state rather than needing a flag to carry it.
    if (this._away && !this._staged && t - this._awaySince >= AD_BREAK_ESTIMATE_MS && this.home) {
      this._staged = this.home;
      this._stagedIsHome = true;
      this._cutAt = t + HOMECOMING_WARMUP_MS;
      this.onPreRoll?.(this.home);
    }
  }

  /** The replacement hit its OWN splice. Come home early rather than sit through an ad on a
   *  channel nobody even asked for — that would be the worst of both. */
  detourSpliced() {
    if (!this._away || !this.home) return;
    if (this._stagedIsHome) return;             // already on the way back

    // Stage it exactly like the scheduled homecoming rather than cutting on the spot. This path
    // used to swap immediately, which made an early return the ONE case guaranteed to have a cold
    // replacement — the detour's own ad break is not something the home channel's chain had any
    // warning of.
    this._staged = this.home;
    this._stagedIsHome = true;
    this._cutAt = performance.now() + HOMECOMING_WARMUP_MS;
    this.onPreRoll?.(this.home);
  }
}

/**
 * Pick somewhere worth going for two minutes.
 *
 * Ranked by what is actually ON, not by what the channel usually is: a beloved channel showing its
 * own advertisement is worse than an indifferent channel showing a film.
 */
function choose(dial, now, avoid) {
  let best = null, bestScore = -Infinity;
  for (const e of dial) {
    if (avoid && e.number === avoid.number) continue;
    const prog = nowPlaying(e, now);
    if (!prog) continue;                        // no timeline, no idea: do not gamble

    const len = prog.stop - prog.start;
    if (len <= 0) continue;
    const progress = (now - prog.start) / len;
    if (progress > NEARLY_OVER_AT) continue;
    if (prog.stop - now < 180_000) continue;

    // JUST STARTED IS BEST. Landing at the top of something is the single most valuable thing a
    // director can do, and it is exactly what a person surfing manually almost never manages.
    const freshness = 1.0 - Math.abs(progress - 0.08) * 2.2;
    // Long-form absorbs two minutes gracefully; a 22-minute sitcom loses a tenth of itself.
    const lengthBonus = Math.min(1, len / 90 / 60_000) * 0.35;

    const score = freshness + lengthBonus;
    if (score <= bestScore) continue;
    bestScore = score;
    best = e;
  }
  return best;
}

/** Pluto's guide ships `timelines`; this is the only place the web build reads them. */
export function nowPlaying(entry, now = new Date()) {
  const tl = entry?.timelines;
  if (!tl?.length) return null;
  const t = +now;
  for (const s of tl) {
    const start = +new Date(s.start), stop = +new Date(s.stop);
    if (t >= start && t < stop) {
      return { start, stop, title: s.title || s.episode?.name || '' };
    }
  }
  return null;
}
