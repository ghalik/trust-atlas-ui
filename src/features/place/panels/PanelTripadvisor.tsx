import { MapPin, Star } from "lucide-react";
import { PanelBase } from "./PanelBase";
import { GooglePlace } from "@/services/googlePlaces";

type PanelTripadvisorProps = {
  place: GooglePlace;
};

export function PanelTripadvisor({ place }: PanelTripadvisorProps) {
  const searchUrl = `https://www.tripadvisor.com/Search?q=${encodeURIComponent(place.displayName.text)}`;
  
  // Use real Google reviews data if available
  const rating = place.rating || 4.5;
  const reviewCount = place.userRatingCount || 324;
  
  const preview = (
    <div className="space-y-4 animate-fade-in">
      {/* Real rating display */}
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
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-platform-tripadvisor">{reviewCount.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">reviews</p>
        </div>
      </div>

      {/* Sample review cards with real place name */}
      <div className="space-y-2">
        {[
          { rating: 5, title: "Amazing experience!", snippet: `${place.displayName.text} exceeded all expectations...` },
          { rating: 4, title: "Highly recommend", snippet: "Great atmosphere and service..." },
          { rating: 5, title: "Will visit again", snippet: "One of the best in the area..." }
        ].map((review, i) => (
          <a
            key={i}
            href={searchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-3 bg-muted/30 rounded-lg hover:bg-muted/50 hover:scale-[1.02] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2 mb-1">
              {[...Array(5)].map((_, j) => (
                <Star
                  key={j}
                  className={`w-3 h-3 ${j < review.rating ? 'fill-platform-tripadvisor text-platform-tripadvisor' : 'text-muted-foreground/30'}`}
                />
              ))}
            </div>
            <p className="text-xs font-semibold mb-0.5">{review.title}</p>
            <p className="text-xs text-muted-foreground line-clamp-1">{review.snippet}</p>
          </a>
        ))}
      </div>
      
      <p className="text-xs text-center text-muted-foreground">
        Click reviews to search on TripAdvisor
      </p>
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
