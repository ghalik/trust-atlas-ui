import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronDown, ChevronUp, Globe, Star, Users, CheckCircle2 } from "lucide-react";
import { GooglePlace } from "@/services/googlePlaces";
import { Metrics } from "@/types";

type CombinedRatingCardProps = {
  place: GooglePlace;
  metrics: Metrics;
};

export function CombinedRatingCard({ place, metrics }: CombinedRatingCardProps) {
  const [expanded, setExpanded] = useState(true); // Default to expanded to show calculation

  // Real calculations with actual numbers
  const baseScore = 30;
  const googleRatingContribution = place.rating ? Math.round((place.rating / 5) * 20) : 0;
  const reviewCountBonus = place.userRatingCount ? Math.round(Math.min((place.userRatingCount / 100) * 10, 10)) : 0;
  const websiteBonus = place.websiteUri ? 15 : 0;
  const platformBonus = Math.min(metrics.total_sightings * 5, 25);

  const breakdown = [
    {
      label: "Base Trust Score",
      icon: CheckCircle2,
      value: baseScore,
      max: 30,
      color: "text-primary",
      detail: "Starting credibility baseline",
      calculation: "Fixed: 30 points",
    },
    {
      label: "Google Rating",
      icon: Star,
      value: googleRatingContribution,
      max: 20,
      color: "text-platform-google",
      detail: place.rating 
        ? `${place.rating.toFixed(1)} stars out of 5.0`
        : "No rating available",
      calculation: place.rating
        ? `(${place.rating.toFixed(1)} ÷ 5.0) × 20 = ${googleRatingContribution} points`
        : "0 points",
    },
    {
      label: "Review Volume",
      icon: Users,
      value: reviewCountBonus,
      max: 10,
      color: "text-platform-yelp",
      detail: place.userRatingCount
        ? `${place.userRatingCount.toLocaleString()} total reviews`
        : "No reviews yet",
      calculation: place.userRatingCount
        ? `min((${place.userRatingCount} ÷ 100) × 10, 10) = ${reviewCountBonus} points`
        : "0 points",
    },
    {
      label: "Official Website",
      icon: Globe,
      value: websiteBonus,
      max: 15,
      color: "text-platform-tripadvisor",
      detail: place.websiteUri ? "Verified website found" : "No website found",
      calculation: place.websiteUri ? "+15 points" : "0 points",
    },
    {
      label: "Platform Coverage",
      icon: CheckCircle2,
      value: platformBonus,
      max: 25,
      color: "text-accent",
      detail: `Found on ${metrics.total_sightings} platforms`,
      calculation: `${metrics.total_sightings} platforms × 5 = ${platformBonus} points (max 25)`,
    },
  ];

  const totalCalculated = baseScore + googleRatingContribution + reviewCountBonus + websiteBonus + platformBonus;

  return (
    <Card className="glass-card p-6 border-2 border-primary/20">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold flex items-center gap-2">
              Trust Score Calculation
              <span className="text-2xl text-primary animate-pulse">{metrics.trust_score}</span>
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Real-time calculation based on verified data
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            className="hover:scale-110 transition-transform"
          >
            {expanded ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </Button>
        </div>

        {expanded && (
          <div className="space-y-4 pt-2 animate-fade-in">
            {breakdown.map((item, index) => (
              <div 
                key={item.label} 
                className="space-y-2 p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                    <div>
                      <span className="font-semibold">{item.label}</span>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.detail}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-lg">{item.value}</span>
                    <span className="text-muted-foreground">/{item.max}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <Progress 
                    value={(item.value / item.max) * 100} 
                    className="h-2.5"
                  />
                  <p className="text-xs text-muted-foreground font-mono bg-muted/50 px-2 py-1 rounded">
                    {item.calculation}
                  </p>
                </div>
              </div>
            ))}

            <div className="pt-4 border-t-2 border-primary/20">
              <div className="flex items-center justify-between text-lg font-bold mb-2">
                <span>Final Trust Score:</span>
                <span className="text-2xl text-primary">
                  {totalCalculated} / 100
                </span>
              </div>
              <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">
                <strong>Formula:</strong> Base (30) + Google Rating (0-20) + Review Volume (0-10) + 
                Website (0-15) + Platform Coverage (0-25) = <strong className="text-primary">{totalCalculated} points</strong>
                <br />
                <span className="text-xs mt-2 block">
                  Last updated: {new Date(metrics.last_recomputed_at).toLocaleString()}
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
