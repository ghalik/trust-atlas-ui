import { PanelBase } from "./PanelBase";
import { deepLinks, PlaceContext } from "@/lib/providers/deep-links";

type PanelTripadvisorProps = {
  context: PlaceContext;
  includedInScore?: boolean;
};

export function PanelTripadvisor({ context, includedInScore }: PanelTripadvisorProps) {
  const url = deepLinks.tripadvisor(context);

  return (
    <PanelBase
      title="Tripadvisor"
      icon={
        <svg viewBox="0 0 24 24" className="w-6 h-6">
          <path fill="#00AF87" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zm4 0c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      }
      url={url}
      includedInScore={includedInScore}
      gradient="from-green-500/10 to-green-400/5"
    >
      <div className="text-sm text-muted-foreground">
        Find traveler reviews and ratings on Tripadvisor
      </div>
    </PanelBase>
  );
}
