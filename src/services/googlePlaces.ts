/// <reference types="google.maps" />
import { loadGoogleMapsScript } from "@/lib/googleMaps";

export type GooglePlace = {
  id: string;
  displayName: { text: string };
  formattedAddress: string;
  location: { latitude: number; longitude: number };
  rating?: number;
  userRatingCount?: number;
  websiteUri?: string;
  nationalPhoneNumber?: string;
  regularOpeningHours?: {
    weekdayDescriptions: string[];
  };
  photos?: Array<{
    name: string;
    widthPx: number;
    heightPx: number;
  }>;
  reviews?: Array<{
    author_name: string;
    author_url?: string;
    profile_photo_url?: string;
    rating: number;
    relative_time_description: string;
    text: string;
    time: number;
  }>;
};

/**
 * Search for places using Google Places API Text Search
 */
export async function searchPlaces(query: string): Promise<GooglePlace[]> {
  await loadGoogleMapsScript();
  
  // For now, return mock data as we'd need the Places API (new) REST API
  // The JavaScript API doesn't have text search in the new version
  return [];
}

/**
 * Get place details by place ID
 */
export async function getPlaceDetails(placeId: string): Promise<GooglePlace | null> {
  await loadGoogleMapsScript();
  
  return new Promise((resolve, reject) => {
    const service = new google.maps.places.PlacesService(document.createElement('div'));
    
    service.getDetails(
      {
        placeId,
        fields: ['place_id', 'name', 'formatted_address', 'geometry', 'rating', 'user_ratings_total', 'website', 'formatted_phone_number', 'opening_hours', 'photos', 'reviews']
      },
      (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && place) {
          const googlePlace: GooglePlace = {
            id: place.place_id || placeId,
            displayName: { text: place.name || '' },
            formattedAddress: place.formatted_address || '',
            location: {
              latitude: place.geometry?.location?.lat() || 0,
              longitude: place.geometry?.location?.lng() || 0,
            },
            rating: place.rating,
            userRatingCount: place.user_ratings_total,
            websiteUri: place.website,
            nationalPhoneNumber: place.formatted_phone_number,
            regularOpeningHours: place.opening_hours ? {
              weekdayDescriptions: place.opening_hours.weekday_text || []
            } : undefined,
            photos: place.photos?.map(photo => ({
              name: photo.getUrl(),
              widthPx: photo.width || 400,
              heightPx: photo.height || 300,
            })),
            reviews: place.reviews?.map(review => ({
              author_name: review.author_name,
              author_url: review.author_url,
              profile_photo_url: review.profile_photo_url,
              rating: review.rating,
              relative_time_description: review.relative_time_description,
              text: review.text,
              time: review.time,
            }))
          };
          resolve(googlePlace);
        } else {
          reject(new Error(`Failed to fetch place details: ${status}`));
        }
      }
    );
  });
}

/**
 * Get autocomplete predictions for a query
 */
export async function getAutocompletePredictions(input: string): Promise<google.maps.places.AutocompletePrediction[]> {
  await loadGoogleMapsScript();
  
  return new Promise((resolve, reject) => {
    const service = new google.maps.places.AutocompleteService();
    
    service.getPlacePredictions(
      {
        input,
        types: ['establishment'],
      },
      (predictions, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
          resolve(predictions);
        } else if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
          resolve([]);
        } else {
          reject(new Error(`Autocomplete failed: ${status}`));
        }
      }
    );
  });
}
