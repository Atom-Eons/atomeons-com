import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  /**
   * Pin the workspace root explicitly.
   *
   * Why this exists: Next 16.2.6 (and the @vercel/next 54.x adapter)
   * calls `findRootDirAndLockFiles(cwd)` during config load when
   * neither `outputFileTracingRoot` nor `turbopack.root` is set. That
   * lockfile autodetect walks up the filesystem and, in some Vercel
   * build-sandbox layouts, returns a path that downstream code then
   * trips into `path.join(undefined, ...)` and crashes with
   * "TypeError: The 'path' argument must be of type string. Received
   * undefined" during the `Applying modifyConfig from Vercel` step.
   *
   * Setting `outputFileTracingRoot` (and the parallel `turbopack.root`
   * since Next 16 reads both) short-circuits the autodetect and pins
   * the workspace root to this file's directory, which is the
   * canonical project root for atomeons-com. The remote build
   * environment resolves `__dirname` to whatever working directory
   * Vercel chose; that's exactly the path we want.
   *
   * See node_modules/next/dist/server/config.js around line 728-748
   * for the codepath that triggers when these are not set.
   */
  outputFileTracingRoot: path.resolve(__dirname),
  turbopack: {
    root: path.resolve(__dirname),
  },

  /**
   * Rewrites — preserve historical public URLs after internal route
   * directory renames.
   *
   * /founders-view/rss.xml is the canonical, published RSS URL for the
   * Founder's View feed. It was internally implemented as
   * `app/founders-view/rss.xml/route.ts` until 2026-05-22, when
   * `@vercel/next` v54.x began failing lambda lookup on path segments
   * containing a literal dot. The directory was renamed to
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
