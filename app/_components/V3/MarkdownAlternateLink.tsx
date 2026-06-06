"use client";

import { usePathname } from "next/navigation";

/**
 * MarkdownAlternateLink — emits a `<link rel="alternate"
 * type="text/markdown">` tag in the document head pointing at the
 * markdown twin of the current page.
 *
 * Per operator brief 2026-06-06: every HTML page should declare its
 * markdown alternative so AI agents (Cursor's web tool · Claude's
 * web tool · ChatGPT browse · etc.) can fetch the .md form without
 * UA-sniffing or HTML parsing.
 *
 * The alternative URL is `/api/md?route=<pathname>` which serves
 * a clean structured-markdown extract of the page from the lab's
 * search index. Cached 15min at the edge.
 *
 * Client component because Next 16 App Router doesn't expose
 * pathname at the server layout level in a way that survives
 * intra-app navigation. usePathname() updates on every nav.
 */
export function MarkdownAlternateLink() {
  const pathname = usePathname() || "/";
  const href = `/api/md?route=${encodeURIComponent(pathname)}`;
  return (
    <>
      <link rel="alternate" type="text/markdown" href={href} title="Markdown extract of this page" />
      {/* Also emit a meta tag with the markdown route for crawlers that
          read meta tags but not link[rel=alternate]. */}
      <meta name="atomeons-markdown-twin" content={href} />
    </>
  );
}
