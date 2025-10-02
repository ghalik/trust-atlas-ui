/**
 * Nominatim API client for OpenStreetMap geocoding and search
 * Rate limit: 1 request per second
 * Docs: https://nominatim.org/release-docs/latest/api/Search/
 */

export type NominatimPlace = {
  place_id: number;
  osm_id: number;
  osm_type: string;
  display_name: string;
  name: string;
  lat: string;
  lon: string;
  type: string;
  address?: {
    amenity?: string;
    road?: string;
    city?: string;
    state?: string;
    country?: string;
  };
  extratags?: {
    website?: string;
    phone?: string;
  };
};

const NOMINATIM_BASE = "https://nominatim.openstreetmap.org";
const USER_AGENT = "TrustAtlas/1.0";

/**
 * Search for places with autocomplete
 */
export async function searchPlaces(
  query: string,
  options?: {
    lat?: number;
    lon?: number;
    radius?: number; // km
  }
): Promise<NominatimPlace[]> {
  if (query.length < 3) return [];

  const params = new URLSearchParams({
    q: query,
    format: "json",
    addressdetails: "1",
    extratags: "1",
    limit: "8",
  });

  // Bias results near user location
  if (options?.lat && options?.lon) {
    const radiusDeg = (options.radius || 10) / 111; // rough km to degrees
    params.set("viewbox", `${options.lon - radiusDeg},${options.lat + radiusDeg},${options.lon + radiusDeg},${options.lat - radiusDeg}`);
    params.set("bounded", "1");
  }

  const response = await fetch(`${NOMINATIM_BASE}/search?${params}`, {
    headers: {
      "User-Agent": USER_AGENT,
    },
  });

  if (!response.ok) {
    throw new Error(`Nominatim error: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Reverse geocode coordinates to place
 */
export async function reverseGeocode(lat: number, lon: number): Promise<NominatimPlace | null> {
  const params = new URLSearchParams({
    lat: lat.toString(),
    lon: lon.toString(),
    format: "json",
    addressdetails: "1",
    extratags: "1",
  });

  const response = await fetch(`${NOMINATIM_BASE}/reverse?${params}`, {
    headers: {
      "User-Agent": USER_AGENT,
    },
  });

  if (!response.ok) return null;
  return response.json();
}
