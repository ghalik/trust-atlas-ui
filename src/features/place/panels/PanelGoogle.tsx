import { PanelBase } from "./PanelBase";
import { deepLinks, PlaceContext } from "@/lib/providers/deep-links";

type PanelGoogleProps = {
  context: PlaceContext;
  includedInScore?: boolean;
};

export function PanelGoogle({ context, includedInScore }: PanelGoogleProps) {
  const url = deepLinks.google(context);

  return (
    <PanelBase
      title="Google Maps"
      icon={
        <svg viewBox="0 0 24 24" className="w-6 h-6">
          <path fill="#4285F4" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      }
      url={url}
      includedInScore={includedInScore}
      gradient="from-blue-500/10 to-blue-400/5"
    >
      <div className="text-sm text-muted-foreground">
        View on Google Maps for reviews, photos, and directions
      </div>
    </PanelBase>
  );
}
