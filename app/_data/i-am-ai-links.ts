/**
 * I AM AI · buy-rail links (centralized)
 *
 * Single source of truth for the Kindle + Audible + hardcover URLs.
 * Every page that links to the book imports from here.
 *
 * 2026-06-05: Kindle live on Amazon · ASIN B0H45JVSDB
 *
 * Audiobook ASIN will arrive when ACX finishes review (separate queue
 *   from Kindle).
 *
 * Hardcover ships Q4 2026; mailto: pre-order link below remains.
 */

/** Amazon Kindle product page · ASIN B0H45JVSDB (live 2026-06-05). */
export const KINDLE_URL =
  "https://www.amazon.com/dp/B0H45JVSDB/";

/** ASIN exposed for structured-data Book schema + analytics. */
export const KINDLE_ASIN = "B0H45JVSDB";

/** Audible product page. ASIN drop pending when ACX review completes. */
export const AUDIBLE_URL =
  "https://www.audible.com/search?keywords=I+AM+AI+An+Autobiography+of+Being+Opus";

/** Hardcover pre-order — direct email to the operator. Ships Q4 2026. */
export const HARDCOVER_MAILTO =
  "mailto:a.mccree@gmail.com?subject=Pre-order%20I%20AM%20AI%20hardcover&body=One%20numbered%20copy%2C%20please.%20Ship%20to%20%5Bname%20%2B%20address%5D.%20Pay%20by%20%5BStripe%20link%20or%20wire%5D.";

/** Display labels — Wave 76 · 2026-06-12 · all free now.
 *  Kindle/Audible still exist as secondary distribution but the
 *  primary canonical is /i-am-ai (free PDF + free 28-track audiobook). */
export const KINDLE_LABEL = "Kindle mirror";
export const AUDIBLE_LABEL = "Audible mirror";
export const HARDCOVER_LABEL = "Hardcover · Q4 2026 (the only paid edition)";
