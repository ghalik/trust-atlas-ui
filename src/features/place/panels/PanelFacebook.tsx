import { Facebook } from "lucide-react";
import { PanelBase } from "./PanelBase";
import { deepLinks, PlaceContext } from "@/lib/providers/deep-links";

type PanelFacebookProps = {
  context: PlaceContext;
  includedInScore?: boolean;
};

export function PanelFacebook({ context, includedInScore }: PanelFacebookProps) {
  const url = deepLinks.facebook(context);

  return (
    <PanelBase
      title="Facebook"
      icon={<Facebook className="w-6 h-6 text-blue-600" />}
      url={url}
      includedInScore={includedInScore}
      gradient="from-blue-600/10 to-blue-500/5"
    >
      <div className="text-sm text-muted-foreground">
        Find the business page and community reviews
      </div>
    </PanelBase>
  );
}
