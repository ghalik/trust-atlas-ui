import { useEffect, useRef } from "react";
import { loadGoogleMaps } from "../lib/google";

type Props = { lat: number; lng: number; name?: string };

export default function Map({ lat, lng, name }: Props){
  const ref = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    let map: google.maps.Map;
    (async ()=>{
      const g = await loadGoogleMaps();
      map = new g.maps.Map(ref.current!, { center: { lat, lng }, zoom: 15, mapTypeControl: false });
      new g.maps.Marker({ position: { lat, lng }, map, title: name || "" });
    })();
    return ()=>{ /* noop */ };
  },[lat,lng,name]);

  return <div ref={ref} className="w-full h-[380px] rounded-2xl border" />;
}
