import { getApiKey } from "@/config/maps";

let loadingPromise: Promise<void> | null = null;

/**
 * Dynamically loads the Google Maps JavaScript API
 * Returns a promise that resolves when the script is ready
 */
export async function loadGoogleMapsScript(): Promise<void> {
  // Return existing promise if already loading
  if (loadingPromise) return loadingPromise;

  // Check if already loaded
  if (window.google?.maps) {
    return Promise.resolve();
  }

  loadingPromise = new Promise((resolve, reject) => {
    const apiKey = getApiKey();
    
    if (!apiKey) {
      reject(new Error("Google Maps API key not found"));
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,marker&loading=async`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Google Maps script"));
    
    document.head.appendChild(script);
  });

  return loadingPromise;
}

