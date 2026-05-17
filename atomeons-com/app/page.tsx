import { Hero } from "./_components/v5/Hero";
import { CockpitVisualization } from "./_components/v5/CockpitVisualization";
import { SwapLanes } from "./_components/v5/SwapLanes";
import { ReceiptsLive } from "./_components/v5/ReceiptsLive";
import { ComparisonGrid } from "./_components/v5/ComparisonGrid";
import { TrustGrid } from "./_components/v5/TrustGrid";
import { ClosingManifesto } from "./_components/v5/ClosingManifesto";

export default function Home() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <Hero />
      <CockpitVisualization />
      <SwapLanes />
      <ReceiptsLive />
      <ComparisonGrid />
      <TrustGrid />
      <ClosingManifesto />
    </main>
  );
}
