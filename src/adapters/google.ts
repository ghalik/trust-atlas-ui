import type { PlatformSummary } from "../types";

export async function fetchForPlace(placeId: string, name: string): Promise<PlatformSummary> {
  // Mock; later: pull real details via Places Details (allowed fields)
  return {
    name: "Google Maps",
    rating: 4.4,
    count: 2100,
    url: `https://www.google.com/maps/place/?q=place_id:${placeId}`,
    items: [
      { text: "Great vibe, quick service.", date: "2d" },
      { text: "Food was average but views are nice.", date: "1w" },
      { text: "Would come back again.", date: "3w" },
    ]
  };
}
