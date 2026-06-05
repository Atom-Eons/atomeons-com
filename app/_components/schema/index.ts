/**
 * Schema.org JSON-LD component barrel.
 *
 * Generated 2026-06-05 by warp-9-jsonld workflow. Ten components that
 * each emit one schema.org type as a <script type="application/ld+json">
 * tag suitable for any Server Component layout. Drop them into:
 *
 *   - app/layout.tsx          — Organization + WebSite + Person (site-wide)
 *   - app/learn/atlas/[slug]/page.tsx — TechArticle + BreadcrumbList
 *   - app/learn/cyber/[slug]/page.tsx — TechArticle + BreadcrumbList
 *   - app/research/decoded/[slug]/page.tsx — Article + BreadcrumbList
 *   - app/i-am-ai/page.tsx    — Book + Person (author)
 *   - app/i-am-ai/sample/page.tsx — Article + Book
 *   - app/orangebox/page.tsx  — SoftwareApplication
 *   - app/b00kmakor/page.tsx  — SoftwareApplication
 *   - app/faq/page.tsx        — FAQPage
 *   - app/press/page.tsx      — FAQPage (quotes section)
 *   - any /learn/* index      — Course
 *
 * All components are Server Component-safe and add zero JS bytes to
 * the client bundle.
 */
export { Organization } from "./Organization";
export { Person } from "./Person";
export { Book } from "./Book";
export { Article } from "./Article";
export { TechArticle } from "./TechArticle";
export { Course } from "./Course";
export { FAQPage } from "./FAQPage";
export { BreadcrumbList } from "./BreadcrumbList";
export { WebSite } from "./WebSite";
export { SoftwareApplication } from "./SoftwareApplication";
