import { MapPin, Star } from "lucide-react";
import { PanelBase } from "./PanelBase";
import { GooglePlace } from "@/services/googlePlaces";

type PanelYelpProps = {
  place: GooglePlace;
};

export function PanelYelp({ place }: PanelYelpProps) {
  const city = place.formattedAddress.split(",")[1]?.trim() || "";
  const searchUrl = `https://www.yelp.com/search?find_desc=${encodeURIComponent(place.displayName.text)}&find_loc=${encodeURIComponent(city)}`;
  
  const preview = (
    <div className="space-y-3">
      <div className="flex items-center justify-center p-6 bg-gradient-to-br from-platform-yelp/10 to-platform-yelp/5 rounded-lg">
        <MapPin className="w-16 h-16 text-platform-yelp opacity-50" />
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < 4 ? "fill-platform-yelp text-platform-yelp" : "text-muted-foreground"
              }`}
            />
          ))}
          <span className="ml-2 font-medium">4.0</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Discover reviews, photos, and business info for {place.displayName.text}
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
