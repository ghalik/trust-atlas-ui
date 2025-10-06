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
    <Card className={cn("glass-card overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-2 border-transparent hover:border-primary/20", className)}>
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 group-hover:scale-110 transition-transform">
              {icon}
            </div>
            <h3 className="font-semibold group-hover:text-primary transition-colors">{title}</h3>
          </div>
          <div className={cn(
            "px-2 py-0.5 rounded-full text-xs font-medium group-hover:scale-105 transition-transform",
            `bg-platform-${kind}/10 text-platform-${kind} border border-platform-${kind}/20`
          )}>
            {kind}
          </div>
        </div>

        {/* Preview content */}
        {preview && <div className="pt-2">{preview}</div>}

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          {url && (
            <Button
              variant="default"
              size="sm"
              className="flex-1 group-hover:scale-105 transition-transform"
              onClick={() => window.open(url, "_blank")}
            >
              Open
            </Button>
          )}
          {deepLink && (
            <Button
              variant="outline"
              size="sm"
              className="group-hover:scale-105 transition-transform"
              onClick={() => window.open(deepLink, "_blank")}
            >
              App
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
