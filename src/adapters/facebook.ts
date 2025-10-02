import type { PlatformSummary } from "../types";
export async function fetchForPlace(_placeId: string, name: string): Promise<PlatformSummary> {
  return {
    name: "Facebook",
    rating: 4.2,
    count: 120,
    url: `https://www.facebook.com/search/top?q=${encodeURIComponent(name)}`,
    items: [
      { text: "Live music last Friday was amazing.", date: "1w" },
    ]
  };
}
