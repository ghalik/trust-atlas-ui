import { MapPin, Star, MessageCircle } from "lucide-react";
import { PanelBase } from "./PanelBase";
import { GooglePlace } from "@/services/googlePlaces";
import { useEffect, useState } from "react";
import { fetchYelpContent, PlatformContent } from "@/services/platformContent";
import { formatCount, formatRating } from "@/lib/format";

type PanelYelpProps = {
  place: GooglePlace;
};

export function PanelYelp({ place }: PanelYelpProps) {
  const [content, setContent] = useState<PlatformContent | null>(null);
  const city = place.formattedAddress.split(",")[1]?.trim() || "";
  const searchUrl = `https://www.yelp.com/search?find_desc=${encodeURIComponent(place.displayName.text)}&find_loc=${encodeURIComponent(city)}`;
  
  useEffect(() => {
    fetchYelpContent(place).then(setContent);
  }, [place]);

  const preview = (
    <div className="space-y-4 animate-fade-in">
      <div className="text-center p-8 bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/20">
        <MapPin className="w-12 h-12 text-muted-foreground/40 mx-auto mb-2" />
        <p className="text-sm font-medium mb-1">No Yelp Data Available</p>
        <p className="text-xs text-muted-foreground mb-3">
          Search for {place.displayName.text} on Yelp to find reviews and ratings.
        </p>
        <a
          href={searchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 bg-platform-yelp text-white rounded-lg hover:scale-105 transition-transform text-sm font-medium"
        >
          Search on Yelp
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
