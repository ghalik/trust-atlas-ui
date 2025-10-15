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

  const hasData = content && (content.rating || content.reviewCount || (content.photos && content.photos.length > 0));

  const preview = hasData ? (
    <div className="space-y-4 animate-fade-in">
      {(content.rating || content.reviewCount) && (
        <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
          {content.rating && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{formatRating(content.rating)}</span>
            </div>
          )}
          {content.reviewCount && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm">{formatCount(content.reviewCount)} reviews</span>
            </div>
          )}
        </div>
      )}
      {content.photos && content.photos.length > 0 && (
        <div className="grid grid-cols-2 gap-2">
          {content.photos.slice(0, 4).map((photo, idx) => (
            <img
              key={idx}
              src={photo}
              alt={`${place.displayName.text} photo ${idx + 1}`}
              className="w-full h-24 object-cover rounded-lg"
            />
          ))}
        </div>
      )}
      <a
        href={searchUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-center px-4 py-2 bg-platform-yelp text-white rounded-lg hover:scale-105 transition-transform text-sm font-medium mt-3"
      >
        View on Yelp
      </a>
    </div>
  ) : (
    <div className="space-y-4 animate-fade-in">
      <div className="text-center p-8 bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/20">
        <MapPin className="w-12 h-12 text-muted-foreground/40 mx-auto mb-2" />
        <p className="text-sm font-medium mb-1">No data available</p>
        <p className="text-xs text-muted-foreground mb-3">
          No Yelp data found for {place.displayName.text}.
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
