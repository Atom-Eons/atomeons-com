import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Rewrites — preserve historical public URLs after internal route
   * directory renames.
   *
   * /founders-view/rss.xml is the canonical, published RSS URL for the
   * Founder's View feed. It was internally implemented as
   * `app/founders-view/rss.xml/route.ts` until 2026-05-22, when
   * `@vercel/next` v54.x began failing lambda lookup on path segments
   * containing a literal dot (`rss.xml`). The directory was renamed to
   * `app/founders-view/rss/route.ts`; this rewrite preserves the
   * public URL so all existing RSS subscribers continue to receive
   * updates without re-subscribing.
   */
  async rewrites() {
    return [
      {
        source: "/founders-view/rss.xml",
        destination: "/founders-view/rss",
      },
    ];
  },
};

export default nextConfig;
