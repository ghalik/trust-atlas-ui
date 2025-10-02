let mapsPromise: Promise<typeof google> | null = null;

export function loadGoogleMaps(apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string): Promise<typeof google> {
  if (mapsPromise) return mapsPromise;
  mapsPromise = new Promise((resolve, reject) => {
    if ((window as any).google?.maps) return resolve((window as any).google);
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.onload = () => resolve((window as any).google);
    script.onerror = reject;
    document.head.appendChild(script);
  });
  return mapsPromise;
}

export async function createAutocomplete(input: HTMLInputElement) {
  const g = await loadGoogleMaps();
  return new g.maps.places.Autocomplete(input, { types: ["establishment"] });
}

export async function placeDetails(placeId: string): Promise<google.maps.places.PlaceResult | null> {
  const g = await loadGoogleMaps();
  const div = document.createElement("div");
  const svc = new g.maps.places.PlacesService(div);
  return new Promise((resolve) => {
    svc.getDetails(
      { placeId, fields: ["place_id","name","formatted_address","geometry","rating","user_ratings_total","url","website"] },
      (res, status) => resolve(status === g.maps.places.PlacesServiceStatus.OK ? res! : null)
    );
  });
}
