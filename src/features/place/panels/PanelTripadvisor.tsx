import { MapPin, Star } from "lucide-react";
import { PanelBase } from "./PanelBase";
import { GooglePlace } from "@/services/googlePlaces";

type PanelTripadvisorProps = {
  place: GooglePlace;
};

export function PanelTripadvisor({ place }: PanelTripadvisorProps) {
  const searchUrl = `https://www.tripadvisor.com/Search?q=${encodeURIComponent(place.displayName.text)}`;
  
  const preview = (
    <div className="space-y-4 animate-fade-in">
      {/* Simulated reviews */}
      <div className="space-y-3">
        {[
          { rating: 5, title: "Amazing experience!", snippet: "Great food and atmosphere..." },
          { rating: 4, title: "Highly recommend", snippet: "Service was excellent..." },
          { rating: 5, title: "Will come back", snippet: "Best place in the area..." }
        ].map((review, i) => (
          <div key={i} className="p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
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
          </div>
        ))}
      </div>
      
      <div className="flex items-center justify-between pt-2 border-t">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-platform-tripadvisor text-platform-tripadvisor" />
          ))}
          <span className="ml-2 font-semibold">4.5</span>
        </div>
        <span className="text-xs text-muted-foreground">324 reviews</span>
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
