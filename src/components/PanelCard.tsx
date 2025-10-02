import { Panel } from "@/types";
import { ExternalLink, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type PanelCardProps = {
  panel: Panel;
};

// Platform color mapping
const PLATFORM_COLORS: Record<string, string> = {
  google: "bg-platform-google",
  yelp: "bg-platform-yelp",
  tripadvisor: "bg-platform-tripadvisor",
  michelin: "bg-platform-michelin",
  opentable: "bg-platform-opentable",
  instagram: "bg-platform-instagram",
  facebook: "bg-platform-facebook",
  youtube: "bg-platform-youtube",
  wikipedia: "bg-platform-wikipedia",
  thefork: "bg-primary",
  zomato: "bg-primary",
  foursquare: "bg-primary",
  booking: "bg-primary",
  apple: "bg-foreground",
  website: "bg-foreground",
  tiktok: "bg-foreground",
};

export function PanelCard({ panel }: PanelCardProps) {
  const colorClass = PLATFORM_COLORS[panel.kind] || "bg-primary";

  return (
    <Card className="glass-card p-4 flex flex-col gap-3 h-full">
      <div className="flex items-start gap-3">
        {panel.icon && (
          <img
            src={panel.icon}
            alt={`${panel.title} icon`}
            className="w-6 h-6 rounded flex-shrink-0"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm leading-tight line-clamp-2">
            {panel.title}
          </h3>
          <div className="mt-1">
            <span className={`inline-block px-2 py-0.5 rounded-full text-xs text-white font-medium ${colorClass}`}>
              {panel.kind}
            </span>
          </div>
        </div>
      </div>

      {panel.preview && (
        <p className="text-xs text-muted-foreground line-clamp-3 flex-1">
          {panel.preview}
        </p>
      )}

      {panel.countHint && (
        <div className="text-xs text-muted-foreground">
          {panel.countHint.toLocaleString()} reviews
        </div>
      )}

      <div className="flex gap-2 mt-auto">
        {panel.url && (
          <Button
            size="sm"
            className="flex-1"
            asChild
          >
            <a href={panel.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-3 h-3 mr-1" />
              Open
            </a>
          </Button>
        )}
        {panel.deepLink && (
          <Button
            size="sm"
            variant="outline"
            className="flex-1"
            asChild
          >
            <a href={panel.deepLink}>
              <Smartphone className="w-3 h-3 mr-1" />
              App
            </a>
          </Button>
        )}
      </div>
    </Card>
  );
}
