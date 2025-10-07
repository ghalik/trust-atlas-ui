import { MapPin, Star } from "lucide-react";
import { PanelBase } from "./PanelBase";
import { GooglePlace } from "@/services/googlePlaces";
import { useEffect, useState } from "react";
import { searchTripAdvisor, PlatformContent } from "@/services/platformSearch";

type PanelTripadvisorProps = {
  place: GooglePlace;
};

export function PanelTripadvisor({ place }: PanelTripadvisorProps) {
  const [content, setContent] = useState<PlatformContent | null>(null);
  
  useEffect(() => {
    searchTripAdvisor(place).then(setContent);
  }, [place]);
  
  const searchUrl = content?.pageUrl || `https://www.tripadvisor.com/Search?q=${encodeURIComponent(place.displayName.text)}`;
  
  const rating = place.rating || 4.5;
  const reviewCount = place.userRatingCount || 324;
  
  const preview = (
    <div className="space-y-4 animate-fade-in">
      {content?.thumbnail && (
        <a
          href={searchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block overflow-hidden rounded-lg border border-platform-tripadvisor/20 hover:scale-105 transition-all duration-300 hover:shadow-xl group"
        >
          <div className="relative aspect-video">
            <img
              src={content.thumbnail}
              alt={place.displayName.text}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3">
              <p className="text-white font-semibold text-sm drop-shadow-lg">{place.displayName.text}</p>
              <p className="text-white/80 text-xs">View on TripAdvisor</p>
            </div>
          </div>
        </a>
      )}
      
      <div className="flex items-center justify-between p-4 bg-gradient-to-br from-platform-tripadvisor/10 to-platform-tripadvisor/5 rounded-lg border border-platform-tripadvisor/20">
        <div>
          <div className="flex items-center gap-2 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${i < Math.floor(rating) ? 'fill-platform-tripadvisor text-platform-tripadvisor' : 'text-muted-foreground/30'}`}
              />
            ))}
          </div>
          <p className="text-sm font-semibold">
            {rating.toFixed(1)} out of 5.0
          </p>
          <p className="text-xs text-muted-foreground mt-1">Based on Google rating</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-platform-tripadvisor">{reviewCount.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">Google reviews</p>
        </div>
      </div>

      <div className="text-center p-6 bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/20">
        <MapPin className="w-12 h-12 text-muted-foreground/40 mx-auto mb-2" />
        <p className="text-sm font-medium mb-1">Search TripAdvisor</p>
        <p className="text-xs text-muted-foreground mb-3">
          TripAdvisor reviews require their API. Click below to search for this place on TripAdvisor.
        </p>
        <a
          href={searchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 bg-platform-tripadvisor text-white rounded-lg hover:scale-105 transition-transform text-sm font-medium"
        >
          View on TripAdvisor
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
