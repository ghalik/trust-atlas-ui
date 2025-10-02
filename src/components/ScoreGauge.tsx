import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

type ScoreGaugeProps = {
  score: number;
};

export function ScoreGauge({ score }: ScoreGaugeProps) {
  const data = [
    { value: score },
    { value: 100 - score },
  ];

  // Color based on score
  const getColor = (score: number) => {
    if (score >= 80) return "hsl(var(--tripadvisor))";
    if (score >= 60) return "hsl(var(--google))";
    if (score >= 40) return "hsl(var(--opentable))";
    return "hsl(var(--yelp))";
  };

  return (
    <div className="relative w-full aspect-square max-w-[200px] mx-auto">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            startAngle={180}
            endAngle={0}
            innerRadius="70%"
            outerRadius="90%"
            dataKey="value"
            stroke="none"
          >
            <Cell fill={getColor(score)} />
            <Cell fill="hsl(var(--muted))" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center pb-4">
        <div className="text-5xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
          {score}
        </div>
        <div className="text-sm text-muted-foreground font-medium mt-1">
          Trust Score
        </div>
      </div>
    </div>
  );
}
