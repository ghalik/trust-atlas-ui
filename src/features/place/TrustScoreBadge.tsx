import { motion } from "framer-motion";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type TrustScoreBadgeProps = {
  score: number;
  explanation?: string;
};

export function TrustScoreBadge({ score, explanation }: TrustScoreBadgeProps) {
  const color = score >= 80 ? "text-green-500" : score >= 60 ? "text-yellow-500" : "text-orange-500";
  const strokeColor = score >= 80 ? "#22c55e" : score >= 60 ? "#eab308" : "#f97316";

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative inline-flex items-center gap-3 glass-card px-6 py-4 rounded-2xl"
          >
            <div className="relative w-20 h-20">
              <svg className="transform -rotate-90 w-20 h-20">
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-muted/20"
                />
                <motion.circle
                  cx="40"
                  cy="40"
                  r="36"
                  stroke={strokeColor}
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={226}
                  initial={{ strokeDashoffset: 226 }}
                  animate={{ strokeDashoffset: 226 - (226 * score) / 100 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-2xl font-bold ${color}`}>{score}</span>
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">Trust Score</div>
              <div className="text-xs text-muted-foreground/70 flex items-center gap-1 mt-1">
                <Info className="h-3 w-3" />
                Demo calculation
              </div>
            </div>
          </motion.div>
        </TooltipTrigger>
        {explanation && (
          <TooltipContent className="max-w-xs">
            <p className="text-sm">{explanation}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}
