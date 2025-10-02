import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Skeleton } from "@/components/ui/skeleton";
import { NominatimPlace } from "@/lib/nominatim";
import { calculateTrustScore, ScoreBreakdown } from "@/lib/trust-score";
import { PlaceContext } from "@/lib/providers/deep-links";
import { TrustScoreBadge } from "@/features/place/TrustScoreBadge";
import { ExplainerCard } from "@/features/place/ExplainerCard";
import { PanelGoogle } from "@/features/place/panels/PanelGoogle";
import { PanelTripadvisor } from "@/features/place/panels/PanelTripadvisor";
import { PanelYelp } from "@/features/place/panels/PanelYelp";
import { PanelInstagram } from "@/features/place/panels/PanelInstagram";
import { PanelFacebook } from "@/features/place/panels/PanelFacebook";
import { PanelWikipedia } from "@/features/place/panels/PanelWikipedia";
import { PanelWebsite } from "@/features/place/panels/PanelWebsite";
import { MiniMap } from "@/features/search/MiniMap";
import { motion } from "framer-motion";
import { MapPin, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const PlacePage = () => {
  const { placeId } = useParams<{ placeId?: string }>();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [placeData, setPlaceData] = useState<NominatimPlace | null>(null);
  const [scoreBreakdown, setScoreBreakdown] = useState<ScoreBreakdown | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Parse place data from URL params
    const name = searchParams.get("name") || placeId || "";
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");
    const displayName = searchParams.get("display") || name;
    const website = searchParams.get("website");

    if (!name) {
      setLoading(false);
      return;
    }

    // Construct place data
    const place: NominatimPlace = {
      place_id: parseInt(searchParams.get("placeId") || "0"),
      osm_id: parseInt(searchParams.get("osmId") || "0"),
      osm_type: "node",
      name,
      display_name: displayName,
      lat: lat || "0",
      lon: lon || "0",
      type: "restaurant",
      address: {
        city: searchParams.get("city") || undefined,
      },
      extratags: {
        website: website || undefined,
      },
    };

    setPlaceData(place);

    // Calculate trust score
    const hasWikipedia = true; // Will be determined by PanelWikipedia
    const hasOfficialSite = !!website;
    const platformLinks = ["google", "tripadvisor", "yelp", "instagram", "facebook"].filter(() => true);

    const breakdown = calculateTrustScore({
      hasWikipedia,
      hasOfficialSite,
      platformLinks,
    });

    setScoreBreakdown(breakdown);
    setLoading(false);
  }, [placeId, searchParams]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "Share this place with others",
    });
  };

  if (loading || !placeData || !scoreBreakdown) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container px-4 py-8 space-y-6">
          <Skeleton className="h-32 w-full rounded-2xl" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-48 rounded-2xl" />
            ))}
          </div>
        </main>
      </div>
    );
  }

  const context: PlaceContext = {
    name: placeData.name,
    lat: parseFloat(placeData.lat),
    lon: parseFloat(placeData.lon),
    city: placeData.address?.city,
    address: placeData.display_name,
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container px-4 py-8 space-y-8">
        {/* Place Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 rounded-2xl space-y-4"
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1 space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold">{placeData.name}</h1>
              <div className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm">{placeData.display_name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <TrustScoreBadge score={scoreBreakdown.total} explanation={scoreBreakdown.explanation} />
              <Button variant="outline" size="icon" onClick={handleShare} className="glass-card">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Mini Map */}
          {placeData.lat !== "0" && placeData.lon !== "0" && (
            <MiniMap
              lat={parseFloat(placeData.lat)}
              lon={parseFloat(placeData.lon)}
              zoom={14}
              height="200px"
            />
          )}
        </motion.div>

        {/* Panels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <PanelGoogle context={context} includedInScore />
            <PanelTripadvisor context={context} includedInScore />
            <PanelYelp context={context} includedInScore />
            <PanelInstagram context={context} includedInScore />
            <PanelFacebook context={context} includedInScore />
            <PanelWikipedia query={placeData.name} includedInScore />
            <PanelWebsite url={placeData.extratags?.website} includedInScore={!!placeData.extratags?.website} />
          </div>

          {/* Explainer Card */}
          <div className="lg:col-span-1">
            <ExplainerCard breakdown={scoreBreakdown} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default PlacePage;
