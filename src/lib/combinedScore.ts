export type Inputs = {
  google?: { rating?: number; count?: number };
  tripadvisor?: { rating?: number; count?: number };
  yelp?: { rating?: number; count?: number };
  facebook?: { rating?: number; count?: number };
  instagram?: { followers?: number; posts?: number; engagementScore?: number };
  website?: { exists?: boolean };
};

function clamp(x:number, lo=1, hi=5){ return Math.max(lo, Math.min(hi, x)); }

export function compute(inputs: Inputs){
  const ratings: Array<{v?:number; w:number; label:string; count?:number}> = [
    { v: inputs.google?.rating,      w: 0.45, label: "Google",      count: inputs.google?.count },
    { v: inputs.tripadvisor?.rating, w: 0.25, label: "TripAdvisor", count: inputs.tripadvisor?.count },
    { v: inputs.yelp?.rating,        w: 0.25, label: "Yelp",        count: inputs.yelp?.count },
    { v: inputs.facebook?.rating,    w: 0.05, label: "Facebook",    count: inputs.facebook?.count },
  ].filter(r => typeof r.v === "number");

  const totalW = ratings.reduce((s,r)=>s+r.w,0) || 1;
  let base = ratings.reduce((s,r)=>s + (r.v! * (r.w/totalW)), 0);
  const totalCount = (inputs.google?.count||0)+(inputs.tripadvisor?.count||0)+(inputs.yelp?.count||0)+(inputs.facebook?.count||0);

  const factors: Array<{label:string; value:string}> = [];
  factors.push({label:"Ratings used", value: ratings.map(r=>`${r.label} ${r.v!.toFixed(1)}${r.count?` (${r.count})`:""}`).join(", ") || "none"});

  // Data weakness penalty
  let penalty = 0;
  if (totalCount < 50) penalty = 0.3 * (1 - Math.min(totalCount/50,1));
  if (penalty) factors.push({label:"Data weakness", value:`-${penalty.toFixed(2)} (low volume)`});

  // Instagram bump
  let bump = 0;
  const ig = inputs.instagram;
  if (ig && (ig.followers||0) > 50000 && (ig.engagementScore||0) > 0.015) {
    bump += 0.10;
    factors.push({label:"Brand legitimacy", value:"+0.10 (Instagram followers & engagement)"});
  }

  if (inputs.website?.exists) {
    bump += 0.05;
    factors.push({label:"Verified website", value:"+0.05"});
  }

  let final = clamp(base - penalty + bump);
  factors.unshift({label:"Base average", value: base.toFixed(2)});
  factors.push({label:"Total reviews", value: String(totalCount)});

  return { score: final, factors };
}
