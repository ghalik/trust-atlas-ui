import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

type MiniMapProps = {
  lat?: number;
  lon?: number;
  zoom?: number;
  height?: string;
};

export function MiniMap({ lat = 40.7128, lon = -74.006, zoom = 12, height = "300px" }: MiniMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const marker = useRef<maplibregl.Marker | null>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: "raster",
            tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
            tileSize: 256,
            attribution: '© OpenStreetMap contributors',
          },
        },
        layers: [
          {
            id: "osm",
            type: "raster",
            source: "osm",
          },
        ],
      },
      center: [lon, lat],
      zoom: zoom,
    });

    map.current.addControl(new maplibregl.NavigationControl(), "top-right");

    marker.current = new maplibregl.Marker({ color: "hsl(var(--primary))" })
      .setLngLat([lon, lat])
      .addTo(map.current);

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  useEffect(() => {
    if (map.current && marker.current) {
      map.current.flyTo({ center: [lon, lat], zoom });
      marker.current.setLngLat([lon, lat]);
    }
  }, [lat, lon, zoom]);

  return (
    <div
      ref={mapContainer}
      className="w-full rounded-2xl overflow-hidden glass-card"
      style={{ height }}
    />
  );
}
