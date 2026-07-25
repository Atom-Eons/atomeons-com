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

const RANDOM_COUNT = 19;
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

// dayOfEpoch — same as native CableRuntimeClock.DayNumber accumulator, roughly:
// integer number of UTC days since epoch. Used as the daily seed.
export function dayOfEpoch() {
  return Math.floor(Date.now() / (1000 * 60 * 60 * 24));
}

/**
 * Full port of MainForm.BuildCuratedChannelPool + DialChannelBuilder.Build.
 * @param {Array} allChannels  — every playable-live Pluto channel from the guide
 * @param {Array<number>} favoriteNumbers — up to 3 numbers the operator has starred
 * @param {number} daySeed
 * @returns {{ dial: Array, lottery: Array, movies: Array, favorites: Array }}
 */
export function buildDial(allChannels, favoriteNumbers, daySeed) {
  // Step 0: BuildCuratedChannelPool — pick only channels whose number is in CURATED.
  const byNumber = new Map();
  for (const c of allChannels) if (!byNumber.has(c.number)) byNumber.set(c.number, c);
  const pool = CURATED.map(n => byNumber.get(n)).filter(Boolean);
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

  // Step 3: random pool (exclude favorites, movies, locals).
  const isFixedLocal = c => [0, 995, 996, 997, 998].includes(c.number);
  const randomPool = dedupedPool.filter(c =>
    !favoriteKeys.has(chKey(c)) && !movieKeys.has(chKey(c)) && !isFixedLocal(c));

  // Step 4: seat anchors + lottery into 19 randomly-ordered slots.
  const openSlots = seededShuffle([...Array(RANDOM_COUNT).keys()], daySeed);
  const randoms = new Array(RANDOM_COUNT).fill(null);
  const used = new Set();
  let cursor = 0;

  // Anchors first.
  for (const terms of ANCHOR_TERMS) {
    const pick = randomPool.find(c =>
      !used.has(chKey(c)) && !isBlocked(c) && anyOf(c.name, terms));
    if (!pick || cursor >= openSlots.length) continue;
    randoms[openSlots[cursor++]] = pick;
    used.add(chKey(pick));
  }

  // Lottery for remaining slots.
  const lottery = seededShuffle(
    randomPool.filter(c => !used.has(chKey(c)) && !isBlocked(c)),
    daySeed ^ 0x9E3779B1,
  );
  let lottI = 0;
  for (; cursor < openSlots.length && lottI < lottery.length; cursor++) {
    const slot = openSlots[cursor];
    if (randoms[slot] !== null) continue;
    randoms[slot] = lottery[lottI++];
    used.add(chKey(lottery[lottI - 1]));
  }

  const lotteryList = randoms.filter(Boolean);

  // Step 5: assemble dial (no Ch0 Guide -- operator killed it in native + webapp).
  //   1-19 lottery | 20-22 CINEVAULT | 23-25 favorites  (no Homebrew in browser; no Cable local)
  const dial = [...lotteryList, ...movies, ...favorites];

  return { dial, lottery: lotteryList, movies, favorites };
}
