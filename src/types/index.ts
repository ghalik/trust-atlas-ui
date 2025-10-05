export type Place = {
  place_key: string;
  name: string;
  address: string;
  lat?: number;
  lon?: number;
};

export type Panel = {
  kind: string;
  title: string;
  url?: string;
  deep?: string;
  deepLink?: string;
  icon?: string;
  preview?: string;
  countHint?: number;
};

export type Metrics = {
  place_key: string;
  avg_stars: number | null;
  total_sightings: number;
  trust_score: number;
  last_recomputed_at: string | null;
};

export type FilterGroup = {
  id: string;
  label: string;
  kinds: string[];
};
