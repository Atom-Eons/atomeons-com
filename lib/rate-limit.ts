/**
 * In-memory token bucket rate limiter.
 *
 * Per-key (typically IP), configurable limit + window.
 * State is per-process — on Vercel each instance gets its own bucket map.
 * Worst-case: attacker gets limit * N requests across N instances. Acceptable.
 *
 * Cleanup: entries that haven't been touched in > 2× the window are evicted
 * on each call (amortized O(1) in steady state for a single key).
 */

export type RateLimitResult = {
  allowed: boolean;
  retryAfterSeconds?: number;
};

type BucketEntry = {
  tokens: number;
  lastRefill: number; // ms timestamp
};

// Global map — survives across requests in the same Node.js process.
const buckets = new Map<string, BucketEntry>();

/**
 * rateLimit — token bucket, refill-on-access.
 *
 * @param key       Unique string for this caller (e.g. IP address)
 * @param limit     Max tokens per window (= max requests per window)
 * @param windowMs  Window duration in milliseconds
 */
export function rateLimit(opts: {
  key: string;
  limit: number;
  windowMs: number;
}): RateLimitResult {
  const { key, limit, windowMs } = opts;
  const now = Date.now();

  // --- evict stale entries (2× window = safe expiry) ---
  const staleThreshold = now - windowMs * 2;
  for (const [k, v] of buckets) {
    if (v.lastRefill < staleThreshold) buckets.delete(k);
  }

  // --- get or create bucket ---
  let entry = buckets.get(key);
  if (!entry) {
    entry = { tokens: limit, lastRefill: now };
    buckets.set(key, entry);
  }

  // --- refill proportional to elapsed time ---
  const elapsed = now - entry.lastRefill;
  const refill = (elapsed / windowMs) * limit;
  if (refill >= 1) {
    entry.tokens = Math.min(limit, entry.tokens + Math.floor(refill));
    entry.lastRefill = now;
  }

  // --- consume 1 token ---
  if (entry.tokens < 1) {
    // No tokens. Compute how long until refill grants ≥ 1 token.
    const msPerToken = windowMs / limit;
    const msUntilToken = msPerToken - elapsed % msPerToken;
    const retryAfterSeconds = Math.ceil(msUntilToken / 1000);
    return { allowed: false, retryAfterSeconds };
  }

  entry.tokens -= 1;
  return { allowed: true };
}
