import type { MetadataRoute } from "next";
import { DISCOVERIES } from "./_data/discoveries";
import { PAPERS } from "./_data/research-papers";
import { SITE_INDEX } from "./_data/site-index";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://atomeons.com";
  const routes = new Set([
    ...SITE_INDEX.map((entry) => entry.href),
    "/launcher",
    ...DISCOVERIES.map((entry) => `/research/discoveries/${entry.slug}`),
    ...PAPERS.map((entry) => `/research/papers/${entry.slug}`),
  ]);

  return [...routes].map((route) => ({
    url: `${base}${route === "/" ? "" : route}`,
    lastModified: new Date("2026-07-17"),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route.startsWith("/research/") ? 0.7 : 0.8,
  }));
}
