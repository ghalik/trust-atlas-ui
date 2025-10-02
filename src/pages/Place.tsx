import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Map from "../components/Map";
import PlatformTabs from "../components/PlatformTabs";
import ScoreCard from "../components/ScoreCard";
import { placeDetails } from "../lib/google";
import * as G from "../adapters/google";
import * as TA from "../adapters/tripadvisor";
import * as Y from "../adapters/yelp";
import * as FB from "../adapters/facebook";
import * as IG from "../adapters/instagram";
import * as WEB from "../adapters/website";

export default function Place(){
  const { placeId = "" } = useParams();
  const [details, setDetails] = useState<google.maps.places.PlaceResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [tabs, setTabs] = useState<any>({});

  useEffect(()=>{
    let on = true;
    (async ()=>{
      setLoading(true);
      const d = await placeDetails(placeId);
      if (!on) return;
      setDetails(d);

      const name = d?.name || "";
      const address = d?.formatted_address || "";

      const [google, tripadvisor, yelp, facebook, instagram, website] = await Promise.all([
        G.fetchForPlace(placeId, name),
        TA.fetchForPlace(placeId, name),
        Y.fetchForPlace(placeId, name),
        FB.fetchForPlace(placeId, name),
        IG.fetchForPlace(placeId, name),
        WEB.fetchForPlace(placeId, name),
      ]);

      setTabs({ Google: google, TripAdvisor: tripadvisor, Yelp: yelp, Facebook: facebook, Instagram: instagram, Website: website });
      setLoading(false);
    })();
    return ()=>{ on = false; };
  },[placeId]);

  const scoreInputs = useMemo(()=>({
    google: { rating: tabs.Google?.rating, count: tabs.Google?.count },
    tripadvisor: { rating: tabs.TripAdvisor?.rating, count: tabs.TripAdvisor?.count },
    yelp: { rating: tabs.Yelp?.rating, count: tabs.Yelp?.count },
    facebook: { rating: tabs.Facebook?.rating, count: tabs.Facebook?.count },
    instagram: { followers: 0, posts: 0, engagementScore: 0 }, // TODO later
    website: { exists: !!tabs.Website?.url },
  }),[tabs]);

  if (loading) return <div className="skel h-32 rounded-xl" />;

  const lat = details?.geometry?.location?.lat?.() ?? 0;
  const lng = details?.geometry?.location?.lng?.() ?? 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6">
      <div className="space-y-4">
        <div className="card p-4">
          <div className="text-2xl font-bold">{details?.name}</div>
          <div className="text-sm text-neutral-600">{details?.formatted_address}</div>
        </div>
        <Map lat={lat} lng={lng} name={details?.name || ""} />
      </div>

      <div className="space-y-4">
        <ScoreCard inputs={scoreInputs} />
        <PlatformTabs dataByPlatform={tabs} />
      </div>
    </div>
  );
}
