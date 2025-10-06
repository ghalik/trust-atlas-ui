type ScoreGaugeProps = {
  score: number;
};

export function ScoreGauge({ score }: ScoreGaugeProps) {
  // Color based on score with Google-style palette
  const getColor = (score: number) => {
    if (score >= 80) return "hsl(142, 71%, 45%)"; // Google green
    if (score >= 60) return "hsl(45, 100%, 51%)"; // Google yellow
    if (score >= 40) return "hsl(32, 100%, 50%)"; // Google orange
    return "hsl(4, 90%, 58%)"; // Google red
  };

  const getLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Limited";
  };

  const color = getColor(score);
  const label = getLabel(score);
  const circumference = 2 * Math.PI * 60;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-full aspect-square max-w-[180px] mx-auto group">
      {/* Animated glow effect */}
      <div 
        className="absolute inset-0 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"
        style={{ background: color }}
      />
      
      {/* SVG Circle */}
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
        {/* Background circle */}
        <circle
          cx="70"
          cy="70"
          r="60"
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth="8"
          opacity="0.2"
        />
        
        {/* Animated progress circle */}
        <circle
          cx="70"
          cy="70"
          r="60"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-out"
          style={{
            filter: `drop-shadow(0 0 8px ${color})`,
          }}
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div 
          className="text-5xl font-bold mb-1 transition-all duration-500"
          style={{ color }}
        >
          {score}
        </div>
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {label}
        </div>
      </div>
    </div>
  );
}
