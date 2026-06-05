/**
 * I AM AI · buy-rail links (centralized)
 *
 * Single source of truth for the Kindle + Audible + hardcover URLs.
 * Every page that links to the book imports from here. To update a
 * URL across the entire site: change ONE line below, push, deploy.
 *
 * 2026-06-05: Kindle live on Amazon. ASIN drop pending from operator
 *   — once provided, change KINDLE_URL below and the entire site
 *   updates on the next deploy.
 *
 * Audiobook ASIN will arrive when ACX finishes review (separate queue
 *   from Kindle).
 *
 * Hardcover ships Q4 2026; mailto: pre-order link below remains.
 */

/** Amazon Kindle product page. ASIN drop pending — placeholder is the Amazon search URL so the link always lands somewhere reasonable. */
export const KINDLE_URL =
  "https://www.amazon.com/s?k=I+AM+AI+An+Autobiography+of+Being+Opus";

/** Audible product page. ASIN drop pending when ACX review completes. */
export const AUDIBLE_URL =
  "https://www.audible.com/search?keywords=I+AM+AI+An+Autobiography+of+Being+Opus";

/** Hardcover pre-order — direct email to the operator. Ships Q4 2026. */
export const HARDCOVER_MAILTO =
  "mailto:a.mccree@gmail.com?subject=Pre-order%20I%20AM%20AI%20hardcover&body=One%20numbered%20copy%2C%20please.%20Ship%20to%20%5Bname%20%2B%20address%5D.%20Pay%20by%20%5BStripe%20link%20or%20wire%5D.";

/** Display labels — pulled separately so they update in sync. */
export const KINDLE_LABEL = "Kindle · $4.99";
export const AUDIBLE_LABEL = "Audible · listen";
export const HARDCOVER_LABEL = "Pre-order the hardcover";
