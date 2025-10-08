import { MapPin, Star, MessageCircle } from "lucide-react";
import { PanelBase } from "./PanelBase";
import { GooglePlace } from "@/services/googlePlaces";
import { useEffect, useState } from "react";
import { fetchYelpContent, PlatformContent } from "@/services/platformContent";

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

  const rating = content?.rating || place.rating || 0;
  const reviewCount = content?.reviewCount || place.userRatingCount || 0;
  const reviews = content?.reviews || [];
  const photos = content?.photos || place.photos?.slice(0, 4).map(p => p.name) || [];
  
  const preview = (
    <div className="space-y-4 animate-fade-in">
      {photos.length > 0 && (
        <div className="grid grid-cols-2 gap-2">
          {photos.map((photo, i) => (
            <div key={i} className="overflow-hidden rounded-lg border border-platform-yelp/20">
              <div className="relative aspect-video">
                <img
                  src={photo}
                  alt={`${place.displayName.text} ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between p-4 bg-gradient-to-br from-platform-yelp/10 to-platform-yelp/5 rounded-lg border border-platform-yelp/20">
        <div>
          <div className="flex items-center gap-2 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${i < Math.floor(rating) ? 'fill-platform-yelp text-platform-yelp' : 'text-muted-foreground/30'}`}
              />
            ))}
          </div>
          <p className="text-sm font-semibold">
            {rating.toFixed(1)} out of 5.0
          </p>
          <p className="text-xs text-muted-foreground mt-1">Based on reviews</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-platform-yelp">{reviewCount.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">reviews</p>
        </div>
      </div>

      {reviews.length > 0 && (
        <div className="space-y-2">
          {reviews.slice(0, 2).map((review, i) => (
            <div key={i} className="p-3 bg-muted/30 rounded-lg border border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      className={`w-3 h-3 ${j < review.rating ? 'fill-platform-yelp text-platform-yelp' : 'text-muted-foreground/30'}`}
                    />
                  ))}
                </div>
                <span className="text-xs font-medium">{review.author}</span>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">{review.text}</p>
            </div>
          ))}
        </div>
      )}

      <div className="text-center p-3 bg-muted/30 rounded-lg">
        <p className="text-xs text-muted-foreground">
          Click Open to see all Yelp reviews
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
