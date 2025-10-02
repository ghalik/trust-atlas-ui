import { useEffect, useRef, useState } from "react";
import { createAutocomplete } from "../lib/google";
import { useNavigate } from "react-router-dom";

export default function SearchBar(){
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const nav = useNavigate();

  useEffect(()=>{
    let ac: google.maps.places.Autocomplete | null = null;
    (async ()=>{
      if (!inputRef.current) return;
      ac = await createAutocomplete(inputRef.current);
      ac.addListener("place_changed", ()=>{
        const place = ac!.getPlace();
        if (place.place_id) nav(`/place/${place.place_id}`);
      });
    })();
    return ()=>{ ac = null; };
  },[nav]);

  return (
    <div className="flex items-center gap-2">
      <input
        ref={inputRef}
        value={query}
        onChange={e=>setQuery(e.target.value)}
        placeholder="Search a place (e.g., Nobu, Schwartz)"
        className="w-full h-12 px-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        disabled={loading}
        onClick={()=>{ /* rely on autocomplete selection; manual search optional */ }}
        className="h-12 px-5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        Search
      </button>
    </div>
  );
}
