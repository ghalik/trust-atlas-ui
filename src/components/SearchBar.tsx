import React, { useEffect, useMemo, useRef, useState } from "react";
import debounce from "just-debounce-it";
import { Loader } from "@googlemaps/js-api-loader";

type Suggestion = { description: string; place_id: string };
type Props = { onSubmit?: (query: string, placeId?: string) => void };

export default function SearchBar({ onSubmit }: Props) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [items, setItems] = useState<Suggestion[]>([]);
  const [hasPlaces, setHasPlaces] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const key = import.meta.env.VITE_GOOGLE_MAPS_KEY as string | undefined;
    if (!key) return;
    const loader = new Loader({ apiKey: key, libraries: ["places"] });
    loader.load().then(() => setHasPlaces(true)).catch(() => setHasPlaces(false));
  }, []);

  const fetchPredictions = useMemo(
    () =>
      debounce((value: string) => {
        if (!hasPlaces || !value.trim()) { setItems([]); return; }
        // @ts-ignore
        const svc = new google.maps.places.AutocompleteService();
        svc.getPlacePredictions({ input: value, types: ["establishment","geocode"] },
          (preds) => {
            if (!preds) { setItems([]); return; }
            setItems(preds.slice(0,8).map(p => ({ description: p.description, place_id: p.place_id! })));
            setOpen(true); setActive(0);
          });
      }, 220),
    [hasPlaces]
  );

  useEffect(() => { if(q) fetchPredictions(q); }, [q, fetchPredictions]);

  function submit(v:string, pid?:string){
    onSubmit?.(v,pid);
    setOpen(false);
  }

  function onKeyDown(e:React.KeyboardEvent<HTMLInputElement>){
    if(!open || items.length===0) return;
    if(e.key==="ArrowDown"){e.preventDefault();setActive(a=>Math.min(a+1,items.length-1));}
    else if(e.key==="ArrowUp"){e.preventDefault();setActive(a=>Math.max(a-1,0));}
    else if(e.key==="Enter"){e.preventDefault();const sel=items[active];sel?submit(sel.description,sel.place_id):submit(q);}
    else if(e.key==="Escape"){setOpen(false);}
  }

  return (
    <div className="relative w-full max-w-3xl">
      <div className="flex gap-2">
        <input ref={inputRef} value={q} onChange={e=>setQ(e.target.value)}
          onFocus={()=>items.length && setOpen(true)} onKeyDown={onKeyDown}
          placeholder="Search places, e.g., Nobu"
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:bg-slate-900 dark:border-slate-700"/>
        <button onClick={()=>submit(q)}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-white font-medium shadow-sm hover:bg-indigo-700 active:bg-indigo-800">
          🔍 Search
        </button>
      </div>

      {open && items.length>0 &&
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg dark:bg-slate-900 dark:border-slate-700">
          {items.map((it,i)=>
            <button key={it.place_id}
              onMouseDown={e=>e.preventDefault()}
              onClick={()=>{setQ(it.description);submit(it.description,it.place_id);}}
              className={`block w-full text-left px-4 py-2 text-sm ${i===active?"bg-indigo-50 dark:bg-slate-800":""}`}>
              {it.description}
            </button>)}
        </div>}
      {!hasPlaces && <p className="mt-2 text-xs text-slate-500">Autocomplete disabled (no VITE_GOOGLE_MAPS_KEY). Typing + Search still works.</p>}
    </div>
  );
}
