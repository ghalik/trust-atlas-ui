import { MapPin, Star, MessageSquare } from "lucide-react";
import { PanelBase } from "./PanelBase";
import { GooglePlace } from "@/services/googlePlaces";
import { useEffect, useState } from "react";
import { fetchTripAdvisorContent, PlatformContent } from "@/services/platformContent";
import { formatCount, formatRating } from "@/lib/format";

type PanelTripadvisorProps = {
  place: GooglePlace;
};

export function PanelTripadvisor({ place }: PanelTripadvisorProps) {
  const [content, setContent] = useState<PlatformContent | null>(null);
  const searchUrl = `https://www.tripadvisor.com/Search?q=${encodeURIComponent(place.displayName.text)}`;
  
  useEffect(() => {
    fetchTripAdvisorContent(place).then(setContent);
  }, [place]);

  const preview = (
    <div className="space-y-4 animate-fade-in">
      <div className="text-center p-8 bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/20">
        <MapPin className="w-12 h-12 text-muted-foreground/40 mx-auto mb-2" />
        <p className="text-sm font-medium mb-1">No TripAdvisor Data Available</p>
        <p className="text-xs text-muted-foreground mb-3">
          Search for {place.displayName.text} on TripAdvisor to find reviews and ratings.
        </p>
        <a
          href={searchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 bg-platform-tripadvisor text-white rounded-lg hover:scale-105 transition-transform text-sm font-medium"
        >
          Search on TripAdvisor
        </a>
      </div>
    </div>
  );

  return (
    <PanelBase
      kind="tripadvisor"
      title="TripAdvisor"
      url={searchUrl}
      preview={preview}
    />
  );
}
