export function formatCount(v: unknown) {
  if (v == null) return "—";
  const s = String(v).trim().toLowerCase();
  const compact = s.match(/^(\d+(?:\.\d+)?)\s*(k|m)$/i);
  if (compact) {
    const n = parseFloat(compact[1]);
    const mul = compact[2].toLowerCase() === "m" ? 1_000_000 : 1_000;
    const total = n * mul;
    if (!isFinite(total)) return "—";
    if (total >= 1_000_000) return (total/1_000_000).toFixed(1).replace(/\.0$/,"")+"M";
    if (total >= 1_000)     return (total/1_000).toFixed(1).replace(/\.0$/,"")+"K";
    return String(Math.round(total));
  }
  const n = Number(s.replace(/[^\d.]/g, ""));
  if (!isFinite(n)) return "—";
  if (n >= 1_000_000) return (n/1_000_000).toFixed(1).replace(/\.0$/,"")+"M";
  if (n >= 1_000)     return (n/1_000).toFixed(1).replace(/\.0$/,"")+"K";
  return n.toString();
}

export function formatRating(v: unknown) {
  if (v == null) return "—";
  const s = String(v).replace(",", ".").trim();
  const m = s.match(/(\d+(?:\.\d+)?)/);
  if (!m) return "—";
  const n = Number(m[1]);
  if (!isFinite(n)) return "—";
  return n.toFixed(1).replace(/\.0$/, "");
}
