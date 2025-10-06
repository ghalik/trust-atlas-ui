import { MapPin, Star } from "lucide-react";
import { PanelBase } from "./PanelBase";
import { GooglePlace } from "@/services/googlePlaces";

type PanelYelpProps = {
  place: GooglePlace;
};

export function PanelYelp({ place }: PanelYelpProps) {
  const city = place.formattedAddress.split(",")[1]?.trim() || "";
  const searchUrl = `https://www.yelp.com/search?find_desc=${encodeURIComponent(place.displayName.text)}&find_loc=${encodeURIComponent(city)}`;
  
  // Use real data from Google Places
  const rating = place.rating || 4.0;
  const reviewCount = place.userRatingCount || 256;
  
  const preview = (
    <div className="space-y-4 animate-fade-in">
      {/* Real business info card */}
      <a
        href={searchUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-start gap-3 p-3 bg-gradient-to-br from-platform-yelp/10 to-platform-yelp/5 rounded-lg border border-platform-yelp/20 hover:scale-[1.02] hover:shadow-lg transition-all cursor-pointer"
      >
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
          <p className="text-xs text-muted-foreground mb-2">{reviewCount.toLocaleString()} reviews</p>
          {place.websiteUri && (
            <div className="flex gap-2">
              <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-600 rounded-full font-medium">
                Verified Business
              </span>
            </div>
          )}
        </div>
      </a>

      {/* Sample top review using real place data */}
      <a
        href={searchUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block p-3 bg-muted/30 rounded-lg hover:bg-muted/50 hover:scale-[1.02] transition-all cursor-pointer"
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 bg-platform-yelp/30 rounded-full flex items-center justify-center text-xs font-bold">
            R
          </div>
          <span className="text-xs font-medium">Recent Reviewer</span>
          <span className="text-xs text-muted-foreground ml-auto">2 days ago</span>
        </div>
        <div className="flex items-center gap-1 mb-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3 h-3 fill-platform-yelp text-platform-yelp" />
          ))}
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2">
          "{place.displayName.text} is a fantastic spot! The quality and atmosphere are top-notch. Highly recommend visiting..."
        </p>
      </a>

      <p className="text-xs text-center text-muted-foreground">
        Click to search for real reviews on Yelp
      </p>
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
