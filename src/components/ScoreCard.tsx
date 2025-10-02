import { compute, Inputs } from "../lib/combinedScore";

export default function ScoreCard({ inputs }:{ inputs: Inputs }){
  const { score, factors } = compute(inputs);
  return (
    <div className="card p-4">
      <div className="text-sm text-neutral-500">Combined Score</div>
      <div className="text-4xl font-bold">{score.toFixed(2)}</div>
      <ul className="mt-2 space-y-1 text-sm text-neutral-700">
        {factors.map((f,i)=>(<li key={i}>• <strong>{f.label}:</strong> {f.value}</li>))}
      </ul>
    </div>
  );
}
