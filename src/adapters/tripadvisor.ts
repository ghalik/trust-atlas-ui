import type { PlatformSummary } from "../types";
export async function fetchForPlace(_placeId: string, name: string): Promise<PlatformSummary> {
  return {
    name: "TripAdvisor",
    rating: 4.1,
    count: 350,
    url: `https://www.tripadvisor.com/Search?q=${encodeURIComponent(name)}`,
    items: [
      { text: "Excellent tasting menu.", date: "3d" },
      { text: "Service can be slow on weekends.", date: "1w" },
    ]
  };
}
