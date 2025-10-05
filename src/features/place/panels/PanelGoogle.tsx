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
    <div className="space-y-3">
      <div ref={mapRef} className="w-full h-48 rounded-lg bg-muted" />
      
      {place.rating && (
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(place.rating!)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-muted-foreground"
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
