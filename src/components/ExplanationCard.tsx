import { Panel, Metrics } from "@/types";
import { Card } from "@/components/ui/card";
import { getBrandBoost } from "@/services/score";

type ExplanationCardProps = {
  panels: Panel[];
  metrics: Metrics;
};

export function ExplanationCard({ panels, metrics }: ExplanationCardProps) {
  const baseScore = 40;
  const coverageScore = panels.length * 10;
  const totalBrandBoost = panels.reduce((sum, panel) => {
    return sum + getBrandBoost(panel.kind);
  }, 0);

  return (
    <Card className="glass-card p-6">
      <h2 className="text-2xl font-bold mb-4">Understanding the Trust Score</h2>
      
      <div className="space-y-4">
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <p className="text-muted-foreground">
            The Trust Score is a transparent metric based on platform coverage and credibility.
            It helps you quickly assess how well-documented and verified a place is across the web.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-lg">Formula Breakdown</h3>
          
          <div className="grid grid-cols-[auto,1fr,auto] gap-x-4 gap-y-2 text-sm">
            <div className="font-medium">Base Score:</div>
            <div className="text-muted-foreground">Starting point for all places</div>
            <div className="font-mono text-right">+{baseScore}</div>

            <div className="font-medium">Coverage:</div>
            <div className="text-muted-foreground">{panels.length} platforms × 10 points each</div>
            <div className="font-mono text-right">+{coverageScore}</div>

            <div className="font-medium">Brand Boost:</div>
            <div className="text-muted-foreground">Credibility weights from key platforms</div>
            <div className="font-mono text-right">+{totalBrandBoost}</div>

            <div className="font-medium">Red Flags:</div>
            <div className="text-muted-foreground">Inconsistencies or issues (none detected)</div>
            <div className="font-mono text-right">-0</div>

            <div className="col-span-3 border-t pt-2 mt-2"></div>

            <div className="font-bold">Final Score:</div>
            <div></div>
            <div className="font-mono text-right font-bold text-lg text-primary">
              {metrics.trust_score}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Platform Contributions</h3>
          <div className="space-y-1 text-sm">
            {panels.map((panel, idx) => {
              const boost = getBrandBoost(panel.kind);
              return (
                <div key={idx} className="flex justify-between items-center py-1 px-3 rounded bg-muted/50">
                  <span className="capitalize">{panel.kind}</span>
                  <span className="font-mono text-muted-foreground">
                    {boost > 0 ? `+${boost}` : '+10'} pts
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> This score reflects platform coverage and credibility, not review sentiment.
            We recommend reading actual reviews on the linked platforms for detailed opinions.
          </p>
        </div>
      </div>
    </Card>
  );
}
