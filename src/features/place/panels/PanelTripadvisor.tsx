import { MapPin, Star } from "lucide-react";
import { PanelBase } from "./PanelBase";
import { GooglePlace } from "@/services/googlePlaces";

type PanelTripadvisorProps = {
  place: GooglePlace;
};

export function PanelTripadvisor({ place }: PanelTripadvisorProps) {
  const searchUrl = `https://www.tripadvisor.com/Search?q=${encodeURIComponent(place.displayName.text)}`;
  
  const preview = (
    <div className="space-y-3">
      <div className="flex items-center justify-center p-6 bg-gradient-to-br from-platform-tripadvisor/10 to-platform-tripadvisor/5 rounded-lg">
        <MapPin className="w-16 h-16 text-platform-tripadvisor opacity-50" />
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="w-4 h-4 fill-platform-tripadvisor text-platform-tripadvisor"
            />
          ))}
          <span className="ml-2 font-medium">4.5</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Find reviews, ratings, and photos for {place.displayName.text} on TripAdvisor
        </p>
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
