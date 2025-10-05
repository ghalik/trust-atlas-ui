import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { PlaceSummary } from "@/components/PlaceSummary";
import { ExplanationCard } from "@/components/ExplanationCard";
import { SkeletonGrid } from "@/components/SkeletonGrid";
import { Panel, Metrics } from "@/types";
import { resolveLinks } from "@/services/resolve";
import { computeMetrics } from "@/services/score";
import { mockPlaces } from "@/mock/data";
import { Skeleton } from "@/components/ui/skeleton";
import { getPlaceDetails, GooglePlace } from "@/services/googlePlaces";
import { PanelGoogle } from "@/features/place/panels/PanelGoogle";
import { PanelTripadvisor } from "@/features/place/panels/PanelTripadvisor";
import { PanelYelp } from "@/features/place/panels/PanelYelp";
import { PanelInstagram } from "@/features/place/panels/PanelInstagram";
import { PanelYoutube } from "@/features/place/panels/PanelYoutube";
import { PanelTiktok } from "@/features/place/panels/PanelTiktok";
import { PanelFacebook } from "@/features/place/panels/PanelFacebook";
import { CombinedRatingCard } from "@/features/place/CombinedRatingCard";
import { toast } from "@/hooks/use-toast";

const PlacePage = () => {
  const { placeKey } = useParams<{ placeKey: string }>();
  const [loading, setLoading] = useState(true);
  const [panels, setPanels] = useState<Panel[]>([]);
  const [googlePlace, setGooglePlace] = useState<GooglePlace | null>(null);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    if (!placeKey) return;

    const loadPlace = async () => {
      setLoading(true);
      
      try {
        // Try to fetch real Google Place data using place_id
        const placeData = await getPlaceDetails(placeKey);
        
        if (placeData) {
          setGooglePlace(placeData);
          
          // Resolve platform links using Google data
          const panelsData = await resolveLinks(placeKey, placeData);
          setPanels(panelsData);

          // Compute metrics with Google data
          const metricsData = computeMetrics(panelsData, placeKey, placeData);
          setMetrics(metricsData);
        }
      } catch (error) {
        console.error("Failed to load Google Place data:", error);
        
        // Fallback to mock data
        const normalizedKey = placeKey.toLowerCase().replace(/\s+/g, "");
        const mockPlace = mockPlaces[normalizedKey];
        
        if (mockPlace) {
          // Create GooglePlace from mock data
          const fallbackPlace: GooglePlace = {
            id: mockPlace.place_key,
            displayName: { text: mockPlace.name },
            formattedAddress: mockPlace.address,
            location: { latitude: 0, longitude: 0 },
          };
          
          setGooglePlace(fallbackPlace);
          
          const panelsData = await resolveLinks(placeKey);
          setPanels(panelsData);
          
          const metricsData = computeMetrics(panelsData, placeKey);
          setMetrics(metricsData);
        } else {
          toast({
            title: "Place not found",
            description: "Could not load place data. Please try searching again.",
            variant: "destructive",
          });
        }
      } finally {
        setLoading(false);
      }
    };

    loadPlace();
  }, [placeKey]);

  if (loading || !googlePlace || !metrics) {
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

  // Convert GooglePlace to Place type for PlaceSummary
  const place = {
    place_key: googlePlace.id,
    name: googlePlace.displayName.text,
    address: googlePlace.formattedAddress,
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-8 space-y-6">
        <PlaceSummary
          place={place}
          metrics={metrics}
          onExplainClick={() => setShowExplanation(!showExplanation)}
        />

        <CombinedRatingCard place={googlePlace} metrics={metrics} />

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Platform Coverage</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <PanelGoogle place={googlePlace} />
            <PanelTripadvisor place={googlePlace} />
            <PanelYelp place={googlePlace} />
            <PanelInstagram place={googlePlace} />
            <PanelYoutube place={googlePlace} />
            <PanelTiktok place={googlePlace} />
            <PanelFacebook place={googlePlace} />
          </div>
        </div>

        {showExplanation && (
          <ExplanationCard panels={panels} metrics={metrics} />
        )}
      </main>
    </div>
  );
};

export default PlacePage;
