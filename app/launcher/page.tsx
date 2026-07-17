import type { Metadata } from "next";
import {
  RouteFinal,
  RouteNote,
  RoutePage,
  RouteSection,
} from "../_components/aether/RoutePage";

export const metadata: Metadata = {
  title: "Original launcher",
  description: "The preserved handoff point for the pre-Aether AtomEons archive.",
  robots: { index: false, follow: true },
};

export default function LauncherPage() {
  return (
    <RoutePage
      eyebrow="ARCHIVE / ORIGINAL LAUNCHER"
      title="The old site"
      accentTitle="sleeps here."
      lede="Aether is the live front door. The larger pre-Aether site remains preserved in source history instead of being deleted."
      asideTitle="Preserved does not mean advertised as live."
      asideBody="The former site included hundreds of experiments, useful resources, redundant routes, and claims that needed a cleaner frame. The source remains available for recovery while the best work is rebuilt into Aether."
      accent="#66645f"
    >
      <RouteSection index="ARCHIVE / STATUS" title="Nothing was burned down.">
        <RouteNote title="Recovery path.">
          The complete pre-Aether implementation remains in the Git history of the
          canonical repository. This static production deployment intentionally serves
          the focused Aether route set. High-value material will return only with accurate
          context, working links, and a clear place in the new system.
        </RouteNote>
      </RouteSection>
      <RouteFinal
        eyebrow="PHOENIX, NOT LANDFILL"
        title="The strongest work comes forward."
        actions={[
          { href: "/explore", label: "Explore Aether" },
          { href: "https://github.com/Atom-Eons/atomeons-com", label: "Inspect source history" },
        ]}
      />
    </RoutePage>
  );
}
