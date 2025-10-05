import { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";

type PanelBaseProps = {
  kind: string;
  title: string;
  icon?: ReactNode;
  url?: string;
  deepLink?: string;
  preview: ReactNode;
  className?: string;
};

export function PanelBase({ kind, title, icon, url, deepLink, preview, className }: PanelBaseProps) {
  return (
    <Card className={cn("glass-card p-4 space-y-4 hover:scale-[1.01] transition-all duration-300", className)}>
      {/* Header */}
      <div className="flex items-start gap-3">
        {icon && <div className="flex-shrink-0">{icon}</div>}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg">{title}</h3>
          <div className={cn(
            "inline-block px-2 py-0.5 rounded-full text-xs font-medium mt-1",
            `bg-platform-${kind}/10 text-platform-${kind}`
          )}>
            {kind}
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="min-h-[120px]">
        {preview}
      </div>

      {/* Actions */}
      {(url || deepLink) && (
        <div className="flex gap-2">
          {url && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              asChild
            >
              <a href={url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Open
              </a>
            </Button>
          )}
          {deepLink && (
            <Button
              variant="ghost"
              size="sm"
              className="flex-1"
              asChild
            >
              <a href={deepLink}>
                <Smartphone className="w-4 h-4 mr-2" />
                App
              </a>
            </Button>
          )}
        </div>
      )}
    </Card>
  );
}
