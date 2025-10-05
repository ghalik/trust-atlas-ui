import { Panel } from "@/types";
import { mockPanels } from "@/mock/data";
import { GooglePlace } from "./googlePlaces";

/**
 * Resolves platform links for a given place.
 * Generates panel data for various platforms based on place information.
 */
export async function resolveLinks(placeKey: string, place?: GooglePlace): Promise<Panel[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // If we have Google Place data, generate panels dynamically
  if (place) {
    return generatePanelsFromPlace(place);
  }

  // Normalize key to lowercase for lookup
  const normalizedKey = placeKey.toLowerCase().replace(/\s+/g, "");

  // Return mock data if available
  if (mockPanels[normalizedKey]) {
    return mockPanels[normalizedKey];
  }

  // Return empty array if no mock data
  return [];
}

/**
 * Generate platform panels from Google Place data
 */
function generatePanelsFromPlace(place: GooglePlace): Panel[] {
  const panels: Panel[] = [];
  const name = place.displayName.text;
  const city = place.formattedAddress.split(",")[1]?.trim() || "";
  const hashtag = name.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

  // Google Maps
  panels.push({
    kind: "google",
    title: "Google Maps",
    url: `https://www.google.com/maps/place/?q=place_id:${place.id}`,
    deep: `google.navigation:q=${place.location.latitude},${place.location.longitude}`,
  });

  // TripAdvisor
  panels.push({
    kind: "tripadvisor",
    title: "TripAdvisor",
    url: `https://www.tripadvisor.com/Search?q=${encodeURIComponent(name)}`,
  });

  // Yelp
  panels.push({
    kind: "yelp",
    title: "Yelp",
    url: `https://www.yelp.com/search?find_desc=${encodeURIComponent(name)}&find_loc=${encodeURIComponent(city)}`,
  });

  // Instagram
  panels.push({
    kind: "instagram",
    title: "Instagram",
    url: `https://www.instagram.com/explore/tags/${hashtag}/`,
    deep: `instagram://tag?name=${hashtag}`,
  });

  // YouTube
  panels.push({
    kind: "youtube",
    title: "YouTube",
    url: `https://www.youtube.com/results?search_query=${encodeURIComponent(name)}`,
  });

  // TikTok
  panels.push({
    kind: "tiktok",
    title: "TikTok",
    url: `https://www.tiktok.com/tag/${hashtag}`,
    deep: `tiktok://tag?name=${hashtag}`,
  });

  // Facebook
  panels.push({
    kind: "facebook",
    title: "Facebook",
    url: `https://www.facebook.com/search/pages?q=${encodeURIComponent(name)}`,
  });

  // Website (if available)
  if (place.websiteUri) {
    panels.push({
      kind: "website",
      title: "Official Website",
      url: place.websiteUri,
    });
  }

  return panels;
}
