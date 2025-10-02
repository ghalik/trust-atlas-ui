import type { PlatformSummary } from "../types";
export async function fetchForPlace(_placeId: string, name: string): Promise<PlatformSummary> {
  return {
    name: "Instagram",
    url: `https://www.instagram.com/explore/search/keyword/?q=${encodeURIComponent(name)}`,
    items: [
      { title: "Recent post", text: "New seasonal menu!", date: "1d", url: "#" },
      { title: "Story mention", text: "Chef collab night", date: "4d", url: "#" },
    ]
  };
}
