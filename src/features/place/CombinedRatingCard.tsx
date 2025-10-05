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
  const [expanded, setExpanded] = useState(false);

  // Calculate breakdown
  const googleRatingContribution = place.rating ? (place.rating / 5) * 20 : 0;
  const reviewCountBonus = place.userRatingCount ? Math.min((place.userRatingCount / 100) * 10, 10) : 0;
  const websiteBonus = place.websiteUri ? 15 : 0;
  const socialBonus = 10; // Placeholder - would check Instagram/Facebook
  const platformBonus = metrics.total_sightings * 5;

  const breakdown = [
    {
      label: "Google Rating",
      icon: Star,
      value: googleRatingContribution,
      max: 20,
      color: "text-platform-google",
    },
    {
      label: "Review Count",
      icon: Users,
      value: reviewCountBonus,
      max: 10,
      color: "text-platform-yelp",
    },
    {
      label: "Official Website",
      icon: Globe,
      value: websiteBonus,
      max: 15,
      color: "text-platform-tripadvisor",
    },
    {
      label: "Platform Coverage",
      icon: CheckCircle2,
      value: platformBonus,
      max: 35,
      color: "text-primary",
    },
  ];

  return (
    <Card className="glass-card p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold">Trust Score Breakdown</h3>
            <p className="text-sm text-muted-foreground">
              How we calculated this score
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </Button>
        </div>

        {expanded && (
          <div className="space-y-4 pt-2">
            {breakdown.map((item) => (
              <div key={item.label} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <item.icon className={`w-4 h-4 ${item.color}`} />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <span className="text-muted-foreground">
                    {item.value.toFixed(0)} / {item.max}
                  </span>
                </div>
                <Progress value={(item.value / item.max) * 100} className="h-2" />
              </div>
            ))}

            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                The trust score combines multiple factors including Google ratings, 
                number of reviews, presence across platforms, and verified information 
                to give you a comprehensive view of this place's credibility.
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
