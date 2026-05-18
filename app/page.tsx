import { Hero } from "./_components/v5/Hero";
import { LanesGrid } from "./_components/v5/LanesGrid";
import { NativeStack } from "./_components/v5/NativeStack";
import { LatestFromLab } from "./_components/LatestFromLab";
import { CockpitVisualization } from "./_components/v5/CockpitVisualization";
import { SwapLanes } from "./_components/v5/SwapLanes";
import { MoatsTable } from "./_components/v5/MoatsTable";
import { AlphaShipped } from "./_components/v5/AlphaShipped";
import { ReceiptsLive } from "./_components/v5/ReceiptsLive";
import { TrustGrid } from "./_components/v5/TrustGrid";
import { SkusTable } from "./_components/v5/SkusTable";
import { ComparisonGrid } from "./_components/v5/ComparisonGrid";
import { AntiSaasBlock } from "./_components/v5/AntiSaasBlock";
import { DownloadHashes } from "./_components/v5/DownloadHashes";
import { DoctrineStrip } from "./_components/v5/DoctrineStrip";
import { ClosingManifesto } from "./_components/v5/ClosingManifesto";

export default function Home() {
  return (
    <main className="relative z-10 bg-black text-[#F2F4F5]">
      <Hero />
      <LanesGrid />
      <NativeStack />
      <LatestFromLab />
      <CockpitVisualization />
      <SwapLanes />
      <MoatsTable />
      <AlphaShipped />
      <ReceiptsLive />
      <TrustGrid />
      <SkusTable />
      <ComparisonGrid />
      <AntiSaasBlock />
      <DownloadHashes />
      <DoctrineStrip />
      <ClosingManifesto />
    </main>
  );
}
