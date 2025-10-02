import { PanelBase } from "./PanelBase";
import { deepLinks, PlaceContext } from "@/lib/providers/deep-links";

type PanelYelpProps = {
  context: PlaceContext;
  includedInScore?: boolean;
};

export function PanelYelp({ context, includedInScore }: PanelYelpProps) {
  const url = deepLinks.yelp(context);

  return (
    <PanelBase
      title="Yelp"
      icon={
        <svg viewBox="0 0 24 24" className="w-6 h-6">
          <path fill="#FF1A1A" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.88 9.38l-1.5 4.5c-.13.38-.5.62-.88.62-.13 0-.25-.03-.38-.06-.5-.13-.75-.63-.63-1.13l1.5-4.5c.13-.5.63-.75 1.13-.63.5.13.75.63.63 1.2zm-7.76 0c-.13.5-.63.75-1.13.63-.5-.13-.75-.63-.63-1.13l1.5-4.5c.13-.5.63-.75 1.13-.63.5.13.75.63.63 1.13l-1.5 4.5z"/>
        </svg>
      }
      url={url}
      includedInScore={includedInScore}
      gradient="from-red-500/10 to-red-400/5"
    >
      <div className="text-sm text-muted-foreground">
        Check local reviews and business details on Yelp
      </div>
    </PanelBase>
  );
}
