// CBX-FINAL-V1 dial algorithm — 1:1 port of MainForm.CuratedChannelOrder +
// DialChannelBuilder.Build. Same anchors, same block list, same seeded lottery.

// From MainForm.cs:27 CuratedChannelOrder.
export const CURATED = [
  20, 40, 45, 50, 60, 80, 105, 120, 140, 160, 170, 180, 190, 220, 240, 245, 250,
  2190, 4650, 4660, 4710, 2260, 2290, 2300, 2320,
  3560, 3580, 3590, 3592, 3080, 3090, 3110, 3115, 3130, 3300, 3320, 3400, 3480, 3500, 3510, 3520, 1270,
  510, 520, 530, 540, 550, 560, 570, 580, 590, 650, 660, 670, 680, 690, 780,
  293, 295, 310, 315, 335, 340, 385, 430, 440,
  995, 1020, 1069, 1150,
  3705, 3785, 3800, 3810, 3815, 3900, 3910,
  840, 842, 844, 846, 856, 858, 859, 860, 870, 875, 880,
  795, 797,
];

// House anchors (DialChannelBuilder.AnchorTerms). Each = array of alt names; first eligible match wins.
const ANCHOR_TERMS = [
  ['bob ross'],
  ['mister rogers', 'mr. rogers', 'mr rogers'],
  ['no reservations', 'bourdain'],
  ['star trek'],
  ['cheers'],
  ['vevo'],
  ['twilight zone'],
  ['gunsmoke', 'bonanza', 'pluto tv westerns'],
];

// DialChannelBuilder.IsBlockedForQuota — kept out of the dial no matter what.
const BLOCK_TERMS = [
  'español', 'espanol', 'news', 'sports', 'reality', 'cnn', 'espa',
  'love island', 'court tv', 'ryan and friends', 'ancient aliens',
];

// Operator 2026-07-26: 19 -> 30, matching native DialChannelBuilder.RandomCount.
// With 19 slots and 7 permanently held by anchors, only 12 rotated over ~86 eligible
// curated channels — any given pick reached the dial ~22% of days. 30 leaves 23 rotating.
const RANDOM_COUNT = 30;
const FAVORITE_SLOTS = 3;

const normalize = s => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
const chKey = c => `${c.source || 'pluto'}:${c.id}`.toLowerCase();
const anyOf = (name, terms) => terms.some(t => (name || '').toLowerCase().includes(t));
const isBlocked = c => {
  const text = `${c.name || ''} ${c.category || ''}`.toLowerCase();
  return BLOCK_TERMS.some(t => text.includes(t));
};
const isCinevault = c => (c.name || '').toLowerCase().includes('cinevault');
const cinevaultRank = c => {
  const n = (c.name || '').trim().toLowerCase();
  if (n === 'cinevault') return 0;
  if (n.includes('classics')) return 1;
  if (n.includes('westerns')) return 2;
  return 3;
};

function seededShuffle(arr, seed) {
  // Fixed daily seed → reproducible order (matches native's `new Random(daySeed)`).
  // Simple LCG (Numerical Recipes) — plenty for a 19-slot shuffle.
  let s = seed >>> 0 || 1;
  const rnd = () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function dedupeByName(list) {
  const seen = new Map();
  for (const c of list) {
    if (!c.name) continue;
    const k = normalize(c.name);
    if (!seen.has(k)) seen.set(k, c);
  }
  return [...seen.values()];
}

// Day counter for the 7-day cycle. Operator 2026-07-26: "use every 7 days not date and time" —
// so this must NOT be the calendar date. Native uses CableRuntimeClock.DayNumber (accumulated
// process runtime, persisted, immune to clock/timezone changes). The browser equivalent:
// elapsed 24h periods since first run, persisted in localStorage. No midnight boundary, and
// changing the system clock forward doesn't skip the cycle ahead — a stored first-run stamp in
// the future is treated as day 0.
const FIRST_RUN_KEY = 'cbx.firstRunMs';

export function dayOfEpoch() {
  try {
    let first = Number(localStorage.getItem(FIRST_RUN_KEY));
    if (!Number.isFinite(first) || first <= 0) {
      first = Date.now();
      localStorage.setItem(FIRST_RUN_KEY, String(first));
    }
    const elapsed = Date.now() - first;
    if (elapsed < 0) return 0;                       // clock moved backwards
    return Math.floor(elapsed / 86_400_000);
  } catch {
    return 0;                                        // private mode / storage blocked
  }
}

/**
 * Full port of MainForm.BuildCuratedChannelPool + DialChannelBuilder.Build.
 * @param {Array} allChannels  — every playable-live Pluto channel from the guide
 * @param {Array<number>} favoriteNumbers — up to 3 numbers the operator has starred
 * @param {number} daySeed
 * @returns {{ dial: Array, lottery: Array, movies: Array, favorites: Array }}
 */
export function buildDial(allChannels, favoriteNumbers, daySeed, tubiChannels = []) {
  // Step 0: BuildCuratedChannelPool — pick only channels whose number is in CURATED.
  const byNumber = new Map();
  for (const c of allChannels) if (!byNumber.has(c.number)) byNumber.set(c.number, c);
  const pool = CURATED.map(n => byNumber.get(n)).filter(Boolean);
  // Tubi extras join the pool AFTER curated selection (native MainForm does the same:
  // pool.AddRange(await EnsureTubiExtrasAsync(...))). They carry their own direct HLS URL
  // and are not filtered by curated NUMBER — they'd never match one. CINEVAULT lives here,
  // which is why the movie slots were rendering empty in the browser build: the web port
  // only ever loaded Pluto, and CINEVAULT is not a Pluto channel.
  pool.push(...tubiChannels);
  const dedupedPool = dedupeByName(pool);

  // Step 1: CINEVAULT top-3 (movie package).
  const movies = dedupedPool
    .filter(isCinevault)
    .sort((a, b) => cinevaultRank(a) - cinevaultRank(b) || (a.name || '').localeCompare(b.name || ''))
    .slice(0, 3);
  const movieKeys = new Set(movies.map(chKey));

  // Step 2: favorites (from the full catalog, not just curated pool — same as native).
  const favorites = favoriteNumbers
    .slice(0, FAVORITE_SLOTS)
    .map(n => allChannels.find(c => c.number === n))
    .filter(Boolean);
  const favoriteKeys = new Set(favorites.map(chKey));

  // Step 3: SEAT THE CURATED LIST, then rotate over EVERYTHING ELSE.
  //
  // THE PARITY BREAK THIS FIXES, and it was a quarter of the product. This port used to treat the
  // curated list as the lottery POOL — it drew 30 rotating channels out of the 89 curated picks and
  // called that the dial. Native does something completely different: it SEATS all 89 curated
  // channels outright, and then runs the 30-slot lottery over the ~333 playable channels the
  // curated list does NOT cover.
  //
  //     native   89 curated + 30 rotating + 3 CineVault = 122
  //     web      30 rotating (drawn from curated) + 3    =  33
  //
  // Both numbers are stable and both looked plausible in isolation, which is exactly why this
  // survived: the web dial was internally consistent, the lottery worked, the coverage guarantee
  // held over its own little pool. It was simply the wrong pool. The operator's curated picks —
  // Bob Ross, Star Trek, Mister Rogers, the Twilight Zone — are supposed to be ALWAYS THERE, not
  // entered into a raffle against each other, and the lottery exists to surface the long tail
  // beyond them.
  const isFixedLocal = c => [0, 995, 996, 997, 998].includes(c.number);
  const seatedKeys = new Set([...movieKeys, ...favoriteKeys]);

  const curatedSeats = dedupedPool.filter(c => {
    if (seatedKeys.has(chKey(c)) || isFixedLocal(c)) return false;
    seatedKeys.add(chKey(c));
    return true;
  });

  // The lottery pool is now the whole playable catalogue MINUS everything already seated, which is
  // what makes the 7-day coverage guarantee mean something: it is promising to show you the tail,
  // not reshuffling the channels you already have.
  const randomPool = allChannels.filter(c =>
    !seatedKeys.has(chKey(c)) && !isFixedLocal(c) && !isBlocked(c));

  // Step 4: seat anchors, then deal the rest across a 7-day cycle.
  const openSlots = seededShuffle([...Array(RANDOM_COUNT).keys()], daySeed);
  const randoms = new Array(RANDOM_COUNT).fill(null);
  const used = new Set();
  let cursor = 0;

  // Anchors — but ONLY the ones the curated seats did not already cover.
  //
  // Native's rule is `if (dial.Any(MatchesAnchor)) continue;`. Without that guard, now that the
  // curated list is seated outright, every anchor group would still hunt the rotating pool and
  // spend a lottery slot on a second Star Trek or a second Bob Ross — quietly shrinking the long
  // tail the lottery exists to surface, in order to duplicate something already on the dial.
  for (const terms of ANCHOR_TERMS) {
    if (curatedSeats.some(c => anyOf(c.name, terms))) continue;
    const pick = randomPool.find(c =>
      !used.has(chKey(c)) && !isBlocked(c) && anyOf(c.name, terms));
    if (!pick || cursor >= openSlots.length) continue;
    randoms[openSlots[cursor++]] = pick;
    used.add(chKey(pick));
  }

  // SEVEN-DAY DEAL (operator 2026-07-26: "i want all channels to show once a week at some
  // time. use every 7 days not date and time"). Mirrors native DialChannelBuilder exactly.
  //
  // An independent daily draw gives no coverage guarantee — a channel can sit out weeks on
  // luck. Instead shuffle the whole eligible pool ONCE PER WEEK (seed = cycle, so the order
  // holds all 7 days and changes at each boundary) and deal that permutation across the week's
  // slot-days in order. Since 7 x rotatingSlots >= pool size, the first pass finishes inside
  // the week, so EVERY eligible channel is guaranteed at least one appearance per cycle.
  // Surplus slot-days wrap the same permutation, producing a few second appearances, not gaps.
  const cycle = Math.floor(daySeed / 7);
  const dayInCycle = ((daySeed % 7) + 7) % 7;
  const weeklyPool = randomPool.filter(c => !used.has(chKey(c)) && !isBlocked(c));

  if (weeklyPool.length) {
    const permutation = seededShuffle(weeklyPool, cycle);
    const rotatingSlots = openSlots.length - cursor;   // whatever anchors left us
    for (let i = 0; cursor < openSlots.length; cursor++, i++) {
      const slot = openSlots[cursor];
      if (randoms[slot] !== null) continue;
      randoms[slot] = permutation[(dayInCycle * rotatingSlots + i) % permutation.length];
    }
  }

  const lotteryList = randoms.filter(Boolean);

  // Step 5: assemble the dial in NATIVE'S ORDER — curated, then rotating, then CineVault, then
  // favourites. Order is not cosmetic here: surfing starts at one end and most sessions never
  // reach the other, so the picks the operator chose deliberately go first and the lottery's long
  // tail sits behind them.
  const dial = [...curatedSeats, ...lotteryList, ...movies, ...favorites];

  return { dial, curated: curatedSeats, lottery: lotteryList, movies, favorites };
}
