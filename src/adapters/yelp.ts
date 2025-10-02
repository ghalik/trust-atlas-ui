import type { PlatformSummary } from "../types";
export async function fetchForPlace(_placeId: string, name: string): Promise<PlatformSummary> {
  return {
    name: "Yelp",
    rating: 4.0,
    count: 580,
    url: `https://www.yelp.com/search?find_desc=${encodeURIComponent(name)}`,
    items: [
      { text: "Loved the cocktails.", date: "5d" },
      { text: "Crowded but worth it.", date: "2w" },
    ]
  };
}
