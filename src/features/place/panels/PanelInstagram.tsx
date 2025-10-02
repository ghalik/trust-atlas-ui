import { Instagram } from "lucide-react";
import { PanelBase } from "./PanelBase";
import { deepLinks, PlaceContext } from "@/lib/providers/deep-links";

type PanelInstagramProps = {
  context: PlaceContext;
  handle?: string;
  includedInScore?: boolean;
};

export function PanelInstagram({ context, handle, includedInScore }: PanelInstagramProps) {
  const url = deepLinks.instagram(context, handle);

  return (
    <PanelBase
      title="Instagram"
      icon={<Instagram className="w-6 h-6 text-pink-500" />}
      url={url}
      includedInScore={includedInScore}
      gradient="from-pink-500/10 to-purple-400/5"
    >
      <div className="text-sm text-muted-foreground">
        {handle ? `@${handle}` : "Explore photos and posts"}
      </div>
    </PanelBase>
  );
}
