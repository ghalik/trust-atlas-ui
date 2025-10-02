import { Globe } from "lucide-react";
import { PanelBase } from "./PanelBase";
import { deepLinks } from "@/lib/providers/deep-links";

type PanelWebsiteProps = {
  url?: string;
  includedInScore?: boolean;
};

export function PanelWebsite({ url, includedInScore }: PanelWebsiteProps) {
  if (!url) {
    return (
      <PanelBase
        title="Official Website"
        icon={<Globe className="w-6 h-6 text-purple-600" />}
        notFound={true}
        onOpenSearch={() => {}}
        gradient="from-purple-500/10 to-purple-400/5"
      />
    );
  }

  const normalizedUrl = deepLinks.website(url);
  const domain = url.replace(/^https?:\/\//, "").replace(/\/.*$/, "");

  return (
    <PanelBase
      title="Official Website"
      icon={<Globe className="w-6 h-6 text-purple-600" />}
      url={normalizedUrl}
      includedInScore={includedInScore}
      gradient="from-purple-500/10 to-purple-400/5"
    >
      <div className="space-y-2">
        <div className="text-sm font-mono text-muted-foreground">{domain}</div>
        <p className="text-sm text-muted-foreground">
          Visit the official website for menus, hours, and reservations
        </p>
      </div>
    </PanelBase>
  );
}
