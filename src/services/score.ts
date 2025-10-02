import { Panel, Metrics } from "@/types";

// Brand boost mapping (weights for specific platforms)
const BRAND_BOOST: Record<string, number> = {
  michelin: 20,
  tripadvisor: 5,
  yelp: 5,
  google: 5,
  opentable: 3,
  thefork: 3,
  zomato: 2,
};

/**
 * Computes trust metrics based on panel coverage.
 * 
 * Formula:
 * Trust Score = base(40) + (coverage * 10) + brandBoost - redFlags
 * Clamped between 0-100
 * 
 * - coverage: number of distinct provider panels present
 * - brandBoost: sum of weights from BRAND_BOOST mapping
 * - redFlags: (placeholder, currently 0)
 */
export function computeMetrics(panels: Panel[], placeKey: string): Metrics {
  const coverage = panels.length;
  
  // Calculate brand boost from present panels
  const brandBoost = panels.reduce((sum, panel) => {
    return sum + (BRAND_BOOST[panel.kind] || 0);
  }, 0);
  
  // Red flags placeholder (currently none)
  const redFlags = 0;
  
  // Calculate trust score
  const baseScore = 40;
  const coverageScore = coverage * 10;
  const rawScore = baseScore + coverageScore + brandBoost - redFlags;
  const trustScore = Math.max(0, Math.min(100, rawScore));
  
  // Calculate average stars (mock - would come from actual review data)
  const avgStars = panels.length > 0 ? null : null;
  
  return {
    place_key: placeKey,
    avg_stars: avgStars,
    total_sightings: coverage,
    trust_score: trustScore,
    last_recomputed_at: new Date().toISOString(),
  };
}

/**
 * Get brand boost value for a specific platform
 */
export function getBrandBoost(kind: string): number {
  return BRAND_BOOST[kind] || 0;
}
