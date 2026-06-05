type BreadcrumbItem = {
  /** Display name of the breadcrumb (e.g. "Pricing", "Docs", "Skil.ski") */
  name: string;
  /** Absolute URL for the breadcrumb target. Required for all but the final item per Google's spec. */
  item: string;
};

type Props = {
  /**
   * Ordered list of breadcrumb items from root to current page.
   * Position is auto-generated 1..N in array order.
   * Google requires at least 2 items for the breadcrumb rich result to render.
   */
  items: BreadcrumbItem[];
  /**
   * Optional canonical URL for the BreadcrumbList itself.
   * Useful when multiple breadcrumb trails exist on a single page.
   */
  id?: string;
};

/**
 * Emits a schema.org BreadcrumbList JSON-LD script tag for navigation position.
 *
 * Generates itemListElement[] with auto-incremented position values per Google's
 * Rich Results spec. Each entry is a ListItem wrapping a name + URL.
 *
 * Drop into any page that has hierarchical navigation to surface breadcrumb
 * trails in Google search results instead of the raw URL path.
 *
 * @example
 *   <BreadcrumbList items={[
 *     { name: "Home", item: "https://atomeons.com" },
 *     { name: "Skil.ski", item: "https://atomeons.com/skil-ski" },
 *     { name: "Pricing", item: "https://atomeons.com/skil-ski/pricing" },
 *   ]} />
 */
export function BreadcrumbList({ items, id }: Props) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    ...(id ? { "@id": id } : {}),
    itemListElement: items.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      item: entry.item,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}