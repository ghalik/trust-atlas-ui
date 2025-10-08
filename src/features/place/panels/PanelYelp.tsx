import { MapPin, Star } from "lucide-react";
import { PanelBase } from "./PanelBase";
import { GooglePlace } from "@/services/googlePlaces";

type PanelYelpProps = {
  place: GooglePlace;
};

export function PanelYelp({ place }: PanelYelpProps) {
  const city = place.formattedAddress.split(",")[1]?.trim() || "";
  const searchUrl = `https://www.yelp.com/search?find_desc=${encodeURIComponent(place.displayName.text)}&find_loc=${encodeURIComponent(city)}`;
  
  const rating = place.rating || 0;
  const reviewCount = place.userRatingCount || 0;
  
  const preview = (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-start gap-3 p-3 bg-gradient-to-br from-platform-yelp/10 to-platform-yelp/5 rounded-lg border border-platform-yelp/20">
        <div className="w-16 h-16 bg-platform-yelp/20 rounded-lg flex items-center justify-center flex-shrink-0">
          <MapPin className="w-8 h-8 text-platform-yelp" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm mb-1 line-clamp-1">{place.displayName.text}</p>
          <div className="flex items-center gap-1 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < Math.floor(rating) ? "fill-platform-yelp text-platform-yelp" : "text-muted-foreground/30"}`}
              />
            ))}
            <span className="ml-1 text-sm font-semibold">{rating.toFixed(1)}</span>
          </div>
          <p className="text-xs text-muted-foreground mb-1">{reviewCount.toLocaleString()} Google reviews</p>
        </div>
      </div>

      <div className="text-center p-4 bg-muted/30 rounded-lg">
        <p className="text-xs text-muted-foreground">
          Click Open to see Yelp reviews and ratings
        </p>
      </div>
    </div>
  );

  return (
    <PanelBase
      kind="yelp"
      title="Yelp"
      url={searchUrl}
      preview={preview}
    />
  );
}
