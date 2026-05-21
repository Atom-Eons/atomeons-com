import { permanentRedirect } from "next/navigation";

/**
 * /ai — alias for /start.
 *
 * The operator's directive (2026-05-21) treats /start as THE AI page
 * for novices. /ai is the URL someone types when they don't know
 * where to start. Permanent (308) redirect so search engines collapse
 * the two URLs into one canonical surface.
 *
 * Not in the nav. Not in sitemap.ts. Discovery vector only.
 */
export default function AiAliasPage(): never {
  permanentRedirect("/start");
}
