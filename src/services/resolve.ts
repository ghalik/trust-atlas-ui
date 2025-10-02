import { Panel } from "@/types";
import { mockPanels } from "@/mock/data";

/**
 * Resolves links for a given place.
 * Currently returns mock data with artificial delay to simulate network.
 * 
 * TODO: When VITE_FN_RESOLVE env var is set, fetch from:
 * ${VITE_FN_RESOLVE}?name=${name}&addr=${address}
 * and map response to Panel[] format.
 */
export async function resolveLinks(placeKey: string): Promise<Panel[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Normalize key to lowercase for lookup
  const normalizedKey = placeKey.toLowerCase().replace(/\s+/g, "");

  // Return mock data if available
  if (mockPanels[normalizedKey]) {
    return mockPanels[normalizedKey];
  }

  // Return empty array if no mock data
  return [];
}
