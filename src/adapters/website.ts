import type { PlatformSummary } from "../types";
export async function fetchForPlace(_placeId: string, name: string): Promise<PlatformSummary> {
  return {
    name: "Official Website",
    url: `https://www.google.com/search?q=${encodeURIComponent(name + " official website")}`,
    items: [
      { title: "Website", text: "Likely official link in top results.", date: "" }
    ]
  };
}
