import { useState } from "react";
import type { PlatformSummary } from "../types";
const tabs = ["Google","TripAdvisor","Yelp","Facebook","Instagram","Website"] as const;
type Tab = typeof tabs[number];

export default function PlatformTabs({ dataByPlatform }:{ dataByPlatform: Partial<Record<Tab, PlatformSummary>> }){
  const [active, setActive] = useState<Tab>("Google");

  return (
    <div className="card p-3">
      <div className="flex gap-2 flex-wrap border-b pb-2">
        {tabs.map(t=>(
          <button
            key={t}
            onClick={()=>setActive(t)}
            className={`px-3 py-1 rounded-lg text-sm border ${active===t ? "bg-neutral-900 text-white" : "bg-white hover:bg-neutral-100"}`}
          >{t}</button>
        ))}
      </div>

      <div className="pt-3">
        <PlatformPanel summary={dataByPlatform[active]} />
      </div>
    </div>
  );
}

function PlatformPanel({ summary }:{ summary?: PlatformSummary }){
  if (!summary) return <div className="text-sm text-neutral-500">Not available for this place.</div>;
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="font-semibold">{summary.name}</div>
        <div className="text-sm text-neutral-600">
          {typeof summary.rating === "number" ? `Rating: ${summary.rating.toFixed(1)}` : "—"}
          {typeof summary.count === "number" ? ` • ${summary.count} reviews` : ""}
        </div>
      </div>
      <ul className="space-y-2">
        {(summary.items || []).slice(0,3).map((it, i)=>(
          <li key={i} className="p-3 rounded-xl border">
            <div className="text-[13px] text-neutral-500">{it.date || ""}</div>
            {it.title ? <div className="font-medium">{it.title}</div> : null}
            <div className="text-sm">{it.text || ""}</div>
            {it.url ? <a className="text-blue-600 text-sm" href={it.url} target="_blank">Open</a> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
