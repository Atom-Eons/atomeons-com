import type { MetadataRoute } from "next";
import { PAPERS } from "./_data/research-papers";
import { LESSONS } from "./learn/_data/lessons";
import { PATHS } from "./learn/_data/paths";

const BASE = "https://atomeons.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paperEntries: MetadataRoute.Sitemap = PAPERS.map((p) => ({
    url: `${BASE}/research/papers/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: p.status === "summarized" ? 0.7 : 0.5,
  }));

  const lessonEntries: MetadataRoute.Sitemap = LESSONS.map((l) => ({
    url: `${BASE}/learn/lesson/${l.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const pathEntries: MetadataRoute.Sitemap = PATHS.map((p) => ({
    url: `${BASE}/learn/${p.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/learn`, lastModified: now, changeFrequency: "weekly", priority: 0.99 },
    { url: `${BASE}/learn/where-am-i`, lastModified: now, changeFrequency: "monthly", priority: 0.92 },
    { url: `${BASE}/learn/library`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    ...pathEntries,
    ...lessonEntries,
    { url: `${BASE}/ai`, lastModified: now, changeFrequency: "weekly", priority: 0.97 },
    { url: `${BASE}/search`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE}/start`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${BASE}/orangebox`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${BASE}/skilski`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/b00kmakor`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/press`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${BASE}/account`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/founders-view`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/research/about`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/research/papers`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${BASE}/research/lessons-from-sci-fi`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/research/lessons-from-sci-fi/monograph`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/intel/x-algorithm`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    ...paperEntries,
    { url: `${BASE}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/support`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/changelog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/now`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/faq`, lastModified: now, changeFrequency: "weekly", priority: 0.75 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/manifesto`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/legal/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/legal/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/legal/refund`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
