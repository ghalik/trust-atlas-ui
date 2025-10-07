/// <reference types="google.maps" />
import { useEffect, useRef } from "react";
import { Map } from "lucide-react";
import { PanelBase } from "./PanelBase";
import { GooglePlace } from "@/services/googlePlaces";
import { loadGoogleMapsScript } from "@/lib/googleMaps";
import { Star } from "lucide-react";

type PanelGoogleProps = {
  place: GooglePlace;
};

export function PanelGoogle({ place }: PanelGoogleProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      try {
        await loadGoogleMapsScript();
        
        if (mapRef.current && place.location) {
          const map = new google.maps.Map(mapRef.current, {
            center: { lat: place.location.latitude, lng: place.location.longitude },
            zoom: 15,
            disableDefaultUI: true,
            zoomControl: true,
          });

          new google.maps.Marker({
            position: { lat: place.location.latitude, lng: place.location.longitude },
            map,
            title: place.displayName.text,
          });
        }
      } catch (error) {
        console.error("Failed to load map:", error);
      }
    };

    initMap();
  }, [place]);

  const preview = (
    <div className="space-y-3 animate-fade-in">
      <div ref={mapRef} className="w-full h-48 rounded-lg bg-muted" />
      
      {place.rating && (
        <div className="flex items-center gap-2 p-3 bg-gradient-to-br from-platform-google/10 to-platform-google/5 rounded-lg border border-platform-google/20">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(place.rating!)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-muted-foreground/30"
                }`}
              />
            ))}
          </div>
          <span className="font-medium">{place.rating.toFixed(1)}</span>
          {place.userRatingCount && (
            <span className="text-sm text-muted-foreground">
              ({place.userRatingCount.toLocaleString()} reviews)
            </span>
          )}
        </div>
      )}

      {place.photos && place.photos.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {place.photos.slice(0, 6).map((photo, i) => (
            <a
              key={i}
              href={`https://www.google.com/maps/place/?q=place_id:${place.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="aspect-square rounded-lg overflow-hidden hover:scale-105 transition-transform cursor-pointer"
            >
              <img
                src={photo.name}
                alt={`${place.displayName.text} - Photo ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </a>
          ))}
        </div>
      )}

      {place.reviews && place.reviews.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-semibold">Recent Reviews</p>
          {place.reviews.slice(0, 2).map((review, i) => (
            <a
              key={i}
              href={review.author_url || `https://www.google.com/maps/place/?q=place_id:${place.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 bg-muted/30 rounded-lg hover:bg-muted/50 hover:scale-[1.02] transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-2">
                {review.profile_photo_url && (
                  <img
                    src={review.profile_photo_url}
                    alt={review.author_name}
                    className="w-6 h-6 rounded-full"
                  />
                )}
                <span className="text-xs font-medium">{review.author_name}</span>
                <span className="text-xs text-muted-foreground ml-auto">{review.relative_time_description}</span>
              </div>
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    className={`w-3 h-3 ${j < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/30'}`}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">{review.text}</p>
            </a>
          ))}
        </div>
      )}
    </div>
  );

  const mapsUrl = `https://www.google.com/maps/place/?q=place_id:${place.id}`;
  const deepLink = `google.navigation:q=${place.location.latitude},${place.location.longitude}`;

  return (
    <PanelBase
      kind="google"
      title="Google Maps"
      icon={<Map className="w-6 h-6 text-platform-google" />}
      url={mapsUrl}
      deepLink={deepLink}
      preview={preview}
    />
  );
}
