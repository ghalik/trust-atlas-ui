import { Link } from "react-router-dom";
import { MapPin, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GooglePlace } from "@/services/googlePlaces";

type PlaceResultCardProps = {
  place: GooglePlace;
};

export function PlaceResultCard({ place }: PlaceResultCardProps) {
  return (
    <Link to={`/p/${place.id}`}>
      <Card className="glass-card p-4 hover:scale-[1.02] transition-all duration-300 cursor-pointer h-full">
        <div className="space-y-3">
          {/* Place photo placeholder */}
          <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
            <MapPin className="w-12 h-12 text-muted-foreground opacity-50" />
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-lg line-clamp-1">
              {place.displayName.text}
            </h3>
            
            <p className="text-sm text-muted-foreground line-clamp-2">
              {place.formattedAddress}
            </p>

            {place.rating && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{place.rating.toFixed(1)}</span>
                </div>
                {place.userRatingCount && (
                  <span className="text-sm text-muted-foreground">
                    ({place.userRatingCount} reviews)
                  </span>
                )}
              </div>
            )}
          </div>

          <Button variant="outline" size="sm" className="w-full">
            View Details
          </Button>
        </div>
      </Card>
    </Link>
  );
}
