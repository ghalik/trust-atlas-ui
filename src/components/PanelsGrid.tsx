import { Panel } from "@/types";
import { PanelCard } from "./PanelCard";

type PanelsGridProps = {
  panels: Panel[];
  hiddenGroups: string[];
};

// Group definitions for filtering
export const FILTER_GROUPS = [
  {
    id: "ratings",
    label: "Ratings",
    kinds: ["google", "yelp", "tripadvisor", "zomato", "foursquare"],
  },
  {
    id: "guides",
    label: "Guides",
    kinds: ["michelin"],
  },
  {
    id: "social",
    label: "Social",
    kinds: ["instagram", "facebook", "tiktok", "youtube"],
  },
  {
    id: "reference",
    label: "Reference",
    kinds: ["wikipedia"],
  },
  {
    id: "maps",
    label: "Maps",
    kinds: ["google", "apple"],
  },
  {
    id: "booking",
    label: "Booking",
    kinds: ["opentable", "thefork", "booking"],
  },
  {
    id: "official",
    label: "Official",
    kinds: ["website"],
  },
];

export function PanelsGrid({ panels, hiddenGroups }: PanelsGridProps) {
  // Filter panels based on hidden groups
  const visiblePanels = panels.filter((panel) => {
    // Check if panel's kind is in any hidden group
    const isHidden = hiddenGroups.some((groupId) => {
      const group = FILTER_GROUPS.find((g) => g.id === groupId);
      return group?.kinds.includes(panel.kind);
    });
    return !isHidden;
  });

  if (visiblePanels.length === 0) {
    return (
      <div className="glass-card p-8 text-center">
        <p className="text-muted-foreground">
          No panels to display. Try adjusting your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {visiblePanels.map((panel, idx) => (
        <PanelCard key={`${panel.kind}-${idx}`} panel={panel} />
      ))}
    </div>
  );
}
