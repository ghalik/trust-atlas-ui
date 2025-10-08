import { MapPin, Star } from "lucide-react";
import { PanelBase } from "./PanelBase";
import { GooglePlace } from "@/services/googlePlaces";

type PanelTripadvisorProps = {
  place: GooglePlace;
};

export function PanelTripadvisor({ place }: PanelTripadvisorProps) {
  const searchUrl = `https://www.tripadvisor.com/Search?q=${encodeURIComponent(place.displayName.text)}`;
  
  const rating = place.rating || 0;
  const reviewCount = place.userRatingCount || 0;
  const thumbnail = place.photos?.[0]?.name;
  
  const preview = (
    <div className="space-y-4 animate-fade-in">
      {thumbnail && (
        <div className="overflow-hidden rounded-lg border border-platform-tripadvisor/20">
          <div className="relative aspect-video">
            <img
              src={thumbnail}
              alt={place.displayName.text}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3">
              <p className="text-white font-semibold text-sm drop-shadow-lg">{place.displayName.text}</p>
            </div>
          </div>
        </div>
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
          <p className="text-xs text-muted-foreground mt-1">Google rating</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-platform-tripadvisor">{reviewCount.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">Google reviews</p>
        </div>
      </div>

      <div className="text-center p-3 bg-muted/30 rounded-lg">
        <p className="text-xs text-muted-foreground">
          Click Open to see TripAdvisor reviews
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
