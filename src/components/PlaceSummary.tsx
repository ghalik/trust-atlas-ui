import { Place, Metrics } from "@/types";
import { MapPin, Bookmark, Share2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScoreGauge } from "./ScoreGauge";
import { toast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

type PlaceSummaryProps = {
  place: Place;
  metrics: Metrics;
  onExplainClick: () => void;
};

export function PlaceSummary({ place, metrics, onExplainClick }: PlaceSummaryProps) {
  const [isSaved, setIsSaved] = useState(false);

  // Check if place is saved on mount
  useEffect(() => {
    const saved = localStorage.getItem("tm_saved_places");
    if (saved) {
      const places = JSON.parse(saved);
      setIsSaved(places.includes(place.place_key));
    }
  }, [place.place_key]);

  const handleSave = () => {
    const saved = localStorage.getItem("tm_saved_places");
    let places: string[] = saved ? JSON.parse(saved) : [];
    
    if (isSaved) {
      places = places.filter((key) => key !== place.place_key);
      toast({
        title: "Removed from saved places",
        description: `${place.name} has been removed from your saved places.`,
      });
    } else {
      places.push(place.place_key);
      toast({
        title: "Saved!",
        description: `${place.name} has been added to your saved places.`,
      });
    }
    
    localStorage.setItem("tm_saved_places", JSON.stringify(places));
    setIsSaved(!isSaved);
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast({
      title: "Link copied!",
      description: "Place link has been copied to clipboard.",
    });
  };

  const getCoverageLevel = (count: number) => {
    if (count >= 10) return "Excellent";
    if (count >= 6) return "Good";
    if (count >= 3) return "Fair";
    return "Limited";
  };

  return (
    <Card className="glass-card p-6">
      <div className="grid md:grid-cols-[1fr,auto] gap-6">
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{place.name}</h1>
            <div className="flex items-start gap-2 text-muted-foreground">
              <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <span className="text-sm">{place.address}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="px-3 py-1">
              Coverage: {getCoverageLevel(metrics.total_sightings)}
            </Badge>
            {metrics.total_sightings > 0 && (
              <Badge variant="outline" className="px-3 py-1">
                {metrics.total_sightings} sources
              </Badge>
            )}
            {metrics.last_recomputed_at && (
              <Badge variant="outline" className="px-3 py-1">
                Updated: {new Date(metrics.last_recomputed_at).toLocaleDateString()}
              </Badge>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant={isSaved ? "default" : "outline"}
              size="sm"
              onClick={handleSave}
            >
              <Bookmark className={`w-4 h-4 mr-2 ${isSaved ? "fill-current" : ""}`} />
              {isSaved ? "Saved" : "Save"}
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="ghost" size="sm" onClick={onExplainClick}>
              <Info className="w-4 h-4 mr-2" />
              Why this score?
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <ScoreGauge score={metrics.trust_score} />
        </div>
      </div>
    </Card>
  );
}
