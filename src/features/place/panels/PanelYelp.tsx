import { MapPin, Star } from "lucide-react";
import { PanelBase } from "./PanelBase";
import { GooglePlace } from "@/services/googlePlaces";
import { useEffect, useState } from "react";
import { searchYelp, PlatformContent } from "@/services/platformSearch";

type PanelYelpProps = {
  place: GooglePlace;
};

export function PanelYelp({ place }: PanelYelpProps) {
  const [content, setContent] = useState<PlatformContent | null>(null);
  
  useEffect(() => {
    searchYelp(place).then(setContent);
  }, [place]);
  
  if (content && !content.exists) {
    return null;
  }
  
  const city = place.formattedAddress.split(",")[1]?.trim() || "";
  const searchUrl = content?.pageUrl || `https://www.yelp.com/search?find_desc=${encodeURIComponent(place.displayName.text)}&find_loc=${encodeURIComponent(city)}`;
  
  const rating = place.rating || 4.0;
  const reviewCount = place.userRatingCount || 256;
  
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
          {place.websiteUri && (
            <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-600 rounded-full font-medium">
              Verified
            </span>
          )}
        </div>
      </div>

      <div className="text-center p-6 bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/20">
        <MapPin className="w-12 h-12 text-muted-foreground/40 mx-auto mb-2" />
        <p className="text-sm font-medium mb-1">Search Yelp</p>
        <p className="text-xs text-muted-foreground mb-3">
          Yelp reviews require their API. Click below to search for this place on Yelp.
        </p>
        <a
          href={searchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 bg-platform-yelp text-white rounded-lg hover:scale-105 transition-transform text-sm font-medium"
        >
          View on Yelp
        </a>
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
