/**
 * Google Maps API Configuration
 * Manages API key storage and retrieval
 */

const GOOGLE_MAPS_API_KEY = "AIzaSyCj7cQdVu7n9mRlMWJQQt0jWJBKD6v98Ds";
const STORAGE_KEY = "tm_google_maps_api_key";

export function getApiKey(): string {
  // Try localStorage first
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return stored;
  
  // Fall back to constant
  return GOOGLE_MAPS_API_KEY;
}

export function setApiKey(key: string): void {
  localStorage.setItem(STORAGE_KEY, key);
}

export function hasValidApiKey(): boolean {
  const key = getApiKey();
  return key && key.length > 0;
}
