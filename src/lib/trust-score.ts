/**
 * Trust Score calculation
 * Transparent formula with no paid APIs
 */

export type ScoreFactors = {
  hasWikipedia: boolean;
  hasOfficialSite: boolean;
  platformLinks: string[]; // google, tripadvisor, yelp, instagram, facebook
};

export type ScoreBreakdown = {
  base: number;
  wikipedia: number;
  officialSite: number;
  platforms: number;
  total: number;
  explanation: string;
};

/**
 * Calculate trust score based on available signals
 * Formula:
 * - Start: 50
 * - +10 if Wikipedia exists
 * - +10 if official website found
 * - +5 per platform link (max +25)
 * - Clamped 0-100
 */
export function calculateTrustScore(factors: ScoreFactors): ScoreBreakdown {
  const base = 50;
  const wikipedia = factors.hasWikipedia ? 10 : 0;
  const officialSite = factors.hasOfficialSite ? 10 : 0;
  const platformCount = Math.min(factors.platformLinks.length, 5);
  const platforms = platformCount * 5;
  
  const total = Math.max(0, Math.min(100, base + wikipedia + officialSite + platforms));

  let explanation = `Base score (${base})`;
  if (wikipedia) explanation += ` + Wikipedia (${wikipedia})`;
  if (officialSite) explanation += ` + Official site (${officialSite})`;
  if (platforms) explanation += ` + ${platformCount} platforms (${platforms})`;
  explanation += ` = ${total}`;

  return {
    base,
    wikipedia,
    officialSite,
    platforms,
    total,
    explanation,
  };
}
