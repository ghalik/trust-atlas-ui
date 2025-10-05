import { Panel, Metrics } from "@/types";
import { GooglePlace } from "./googlePlaces";

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
 * Computes trust metrics based on Google Place data and panel coverage.
 * 
 * Updated Formula with real Google data:
 * Trust Score = baseScore(30) + googleRating(20) + reviewCount(10) + website(15) + socialPresence(20) + platformCoverage(5)
 * Clamped between 0-100
 */
export function computeMetrics(panels: Panel[], placeKey: string, place?: GooglePlace): Metrics {
  const coverage = panels.length;
  
  // Base score
  let trustScore = 30;
  
  // Google rating contribution (0-20 points)
  if (place?.rating) {
    trustScore += (place.rating / 5) * 20;
  }
  
  // Review count bonus (0-10 points)
  if (place?.userRatingCount) {
    trustScore += Math.min((place.userRatingCount / 100) * 10, 10);
  }
  
  // Official website bonus (15 points)
  if (place?.websiteUri) {
    trustScore += 15;
  }
  
  // Platform coverage bonus (5 points per platform, max 25)
  const platformBonus = Math.min(coverage * 5, 25);
  trustScore += platformBonus;
  
  // Clamp between 0-100
  trustScore = Math.max(0, Math.min(100, Math.round(trustScore)));
  
  return {
    place_key: placeKey,
    avg_stars: place?.rating || null,
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
