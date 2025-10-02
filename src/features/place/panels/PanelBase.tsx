import { ReactNode } from "react";
import { ExternalLink, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

type PanelBaseProps = {
  title: string;
  icon: ReactNode;
  loading?: boolean;
  url?: string;
  notFound?: boolean;
  onOpenSearch?: () => void;
  includedInScore?: boolean;
  children?: ReactNode;
  gradient?: string;
};

export function PanelBase({
  title,
  icon,
  loading,
  url,
  notFound,
  onOpenSearch,
  includedInScore,
  children,
  gradient = "from-primary/10 to-primary/5",
}: PanelBaseProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="glass-card h-full flex flex-col">
        <CardHeader className={`bg-gradient-to-br ${gradient} pb-3`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center">{icon}</div>
              <h3 className="font-semibold">{title}</h3>
            </div>
            {includedInScore && (
              <Badge variant="secondary" className="text-xs">
                Included
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col pt-4">
          {loading ? (
            <div className="flex-1 flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : notFound ? (
            <div className="flex-1 flex flex-col items-center justify-center py-8 text-center">
              <p className="text-sm text-muted-foreground mb-4">Not found yet</p>
              <Button
                size="sm"
                variant="outline"
                onClick={onOpenSearch}
                className="gap-2"
              >
                <ExternalLink className="h-3 w-3" />
                Open {title} search
              </Button>
            </div>
          ) : (
            <>
              <div className="flex-1">{children}</div>
              {url && (
                <Button
                  size="sm"
                  className="w-full mt-4 gap-2"
                  asChild
                >
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-3 w-3" />
                    Open
                  </a>
                </Button>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
