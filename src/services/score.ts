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
 * Trust Score Formula:
 * - Base Score: 30 points (starting credibility)
 * - Google Rating: 0-20 points (rating/5 × 20)
 * - Review Volume: 0-10 points (min((reviews/100) × 10, 10))
 * - Official Website: 0-15 points (verified website = +15)
 * - Platform Coverage: 0-25 points (platforms × 5, max 25)
 * Total: 0-100 points
 */
export function computeMetrics(panels: Panel[], placeKey: string, place?: GooglePlace): Metrics {
  const coverage = panels.length;
  
  // Base score: 30 points
  const baseScore = 30;
  
  // Google rating contribution (0-20 points)
  const googleRatingContribution = place?.rating 
    ? Math.round((place.rating / 5) * 20) 
    : 0;
  
  // Review count bonus (0-10 points)
  const reviewCountBonus = place?.userRatingCount 
    ? Math.round(Math.min((place.userRatingCount / 100) * 10, 10))
    : 0;
  
  // Official website bonus (15 points)
  const websiteBonus = place?.websiteUri ? 15 : 0;
  
  // Platform coverage bonus (5 points per platform, max 25)
  const platformBonus = Math.min(coverage * 5, 25);
  
  // Calculate total (already clamped by design: max is 30+20+10+15+25 = 100)
  const trustScore = baseScore + googleRatingContribution + reviewCountBonus + websiteBonus + platformBonus;
  
  return {
    place_key: placeKey,
    avg_stars: place?.rating || null,
    total_sightings: coverage,
    trust_score: trustScore,
    last_recomputed_at: new Date().toISOString(),
    // Store real calculated breakdown
    base_score: baseScore,
    google_rating_contribution: googleRatingContribution,
    review_count_bonus: reviewCountBonus,
    website_bonus: websiteBonus,
    platform_bonus: platformBonus,
  };
}

/**
 * Get brand boost value for a specific platform
 */
export function getBrandBoost(kind: string): number {
  return BRAND_BOOST[kind] || 0;
}
