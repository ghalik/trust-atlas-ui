import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { PlaceSummary } from "@/components/PlaceSummary";
import { PanelsGrid, FILTER_GROUPS } from "@/components/PanelsGrid";
import { Filters } from "@/components/Filters";
import { ExplanationCard } from "@/components/ExplanationCard";
import { SkeletonGrid } from "@/components/SkeletonGrid";
import { Panel, Place, Metrics } from "@/types";
import { resolveLinks } from "@/services/resolve";
import { computeMetrics } from "@/services/score";
import { mockPlaces } from "@/mock/data";
import { Skeleton } from "@/components/ui/skeleton";

const PlacePage = () => {
  const { placeKey } = useParams<{ placeKey: string }>();
  const [loading, setLoading] = useState(true);
  const [panels, setPanels] = useState<Panel[]>([]);
  const [place, setPlace] = useState<Place | null>(null);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [hiddenGroups, setHiddenGroups] = useState<string[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    if (!placeKey) return;

    const loadPlace = async () => {
      setLoading(true);
      
      // Normalize key for lookup
      const normalizedKey = placeKey.toLowerCase().replace(/\s+/g, "");
      
      // Get place data (mock or construct from query)
      const placeData = mockPlaces[normalizedKey] || {
        place_key: placeKey,
        name: placeKey,
        address: "Address not available",
      };
      
      setPlace(placeData);

      // Resolve links
      const panelsData = await resolveLinks(placeKey);
      setPanels(panelsData);

      // Compute metrics
      const metricsData = computeMetrics(panelsData, placeKey);
      setMetrics(metricsData);

      setLoading(false);
    };

    loadPlace();
  }, [placeKey]);

  if (loading || !place || !metrics) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container px-4 py-8 space-y-6">
          <div className="glass-card p-6 rounded-2xl">
            <Skeleton className="h-10 w-64 mb-4" />
            <Skeleton className="h-4 w-96 mb-6" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24" />
            </div>
          </div>
          <SkeletonGrid />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-8 space-y-6">
        <PlaceSummary
          place={place}
          metrics={metrics}
          onExplainClick={() => setShowExplanation(!showExplanation)}
        />

        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h2 className="text-2xl font-bold">Platform Coverage</h2>
            <Filters
              groups={FILTER_GROUPS}
              value={hiddenGroups}
              onChange={setHiddenGroups}
            />
          </div>

          <PanelsGrid panels={panels} hiddenGroups={hiddenGroups} />
        </div>

        {showExplanation && (
          <ExplanationCard panels={panels} metrics={metrics} />
        )}
      </main>
    </div>
  );
};

export default PlacePage;
