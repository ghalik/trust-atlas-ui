import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScoreBreakdown } from "@/lib/trust-score";
import { motion } from "framer-motion";

type ExplainerCardProps = {
  breakdown: ScoreBreakdown;
};

export function ExplainerCard({ breakdown }: ExplainerCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>How we computed the Trust Score</CardTitle>
          <CardDescription>
            Transparent formula with no paid APIs or review scraping
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-sm font-medium">Base Score</span>
              <span className="text-sm font-mono">+{breakdown.base}</span>
            </div>
            {breakdown.wikipedia > 0 && (
              <div className="flex justify-between items-center py-2 border-b border-border/50">
                <span className="text-sm font-medium">Wikipedia Summary</span>
                <span className="text-sm font-mono text-green-500">+{breakdown.wikipedia}</span>
              </div>
            )}
            {breakdown.officialSite > 0 && (
              <div className="flex justify-between items-center py-2 border-b border-border/50">
                <span className="text-sm font-medium">Official Website</span>
                <span className="text-sm font-mono text-green-500">+{breakdown.officialSite}</span>
              </div>
            )}
            {breakdown.platforms > 0 && (
              <div className="flex justify-between items-center py-2 border-b border-border/50">
                <span className="text-sm font-medium">Platform Links</span>
                <span className="text-sm font-mono text-green-500">+{breakdown.platforms}</span>
              </div>
            )}
            <div className="flex justify-between items-center py-3 bg-primary/5 px-3 rounded-lg mt-2">
              <span className="font-bold">Total Score</span>
              <span className="font-bold text-lg text-primary">{breakdown.total}</span>
            </div>
          </div>

          <div className="text-xs text-muted-foreground p-4 bg-muted/30 rounded-lg">
            <p className="font-medium mb-2">About this score:</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>No paid APIs or review scraping</li>
              <li>Based on verifiable platform presence</li>
              <li>Transparent, reproducible formula</li>
              <li>Ranges from 0-100</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
