import type { MetadataRoute } from "next";
import { PAPERS } from "./_data/research-papers";

const BASE = "https://atomeons.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paperEntries: MetadataRoute.Sitemap = PAPERS.map((p) => ({
    url: `${BASE}/research/papers/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: p.status === "summarized" ? 0.7 : 0.5,
  }));

  return [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/ai`, lastModified: now, changeFrequency: "weekly", priority: 0.97 },
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
    { url: `${BASE}/now`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/faq`, lastModified: now, changeFrequency: "weekly", priority: 0.75 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/legal/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/legal/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/legal/refund`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
