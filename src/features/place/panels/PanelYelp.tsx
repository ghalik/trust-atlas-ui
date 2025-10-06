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
    <div className="space-y-4 animate-fade-in">
      {/* Simulated business info */}
      <div className="flex items-start gap-3 p-3 bg-gradient-to-br from-platform-yelp/10 to-platform-yelp/5 rounded-lg">
        <div className="w-16 h-16 bg-platform-yelp/20 rounded-lg flex items-center justify-center">
          <MapPin className="w-8 h-8 text-platform-yelp" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-1 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < 4 ? "fill-platform-yelp text-platform-yelp" : "text-muted-foreground/30"}`}
              />
            ))}
            <span className="ml-1 text-sm font-semibold">4.0</span>
          </div>
          <p className="text-xs text-muted-foreground">256 reviews</p>
          <div className="flex gap-2 mt-2">
            <span className="text-xs px-2 py-0.5 bg-muted rounded-full">$$$</span>
            <span className="text-xs px-2 py-0.5 bg-muted rounded-full">Open Now</span>
          </div>
        </div>
      </div>

      {/* Top review snippet */}
      <div className="p-3 bg-muted/30 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 bg-platform-yelp/30 rounded-full" />
          <span className="text-xs font-medium">Sarah M.</span>
        </div>
        <div className="flex items-center gap-1 mb-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3 h-3 fill-platform-yelp text-platform-yelp" />
          ))}
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2">
          "Great atmosphere and excellent service. The food quality exceeded expectations..."
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
