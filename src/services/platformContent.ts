import { GooglePlace } from "./googlePlaces";

export type PlatformContent = {
  videos?: Array<{
    title: string;
    url: string;
    thumbnail?: string;
    views?: string;
  }>;
  reviews?: Array<{
    text: string;
    rating: number;
    author: string;
  }>;
  rating?: number;
  reviewCount?: number;
  photos?: string[];
};

export async function fetchYoutubeContent(place: GooglePlace): Promise<PlatformContent> {
  try {
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/fetch-youtube`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`
      },
      body: JSON.stringify({ placeName: place.displayName.text })
    });
    
    if (!response.ok) return { videos: [] };
    return await response.json();
  } catch (error) {
    console.error('YouTube fetch failed:', error);
    return { videos: [] };
  }
}

export async function fetchTikTokContent(place: GooglePlace): Promise<PlatformContent> {
  try {
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/fetch-tiktok`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`
      },
      body: JSON.stringify({ placeName: place.displayName.text })
    });
    
    if (!response.ok) return { videos: [] };
    return await response.json();
  } catch (error) {
    console.error('TikTok fetch failed:', error);
    return { videos: [] };
  }
}

export async function fetchTripAdvisorContent(place: GooglePlace): Promise<PlatformContent> {
  try {
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/fetch-tripadvisor`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`
      },
      body: JSON.stringify({ placeName: place.displayName.text })
    });
    
    if (!response.ok) return {};
    return await response.json();
  } catch (error) {
    console.error('TripAdvisor fetch failed:', error);
    return {};
  }
}

export async function fetchYelpContent(place: GooglePlace): Promise<PlatformContent> {
  try {
    const city = place.formattedAddress.split(",")[1]?.trim() || "";
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/fetch-yelp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`
      },
      body: JSON.stringify({ 
        placeName: place.displayName.text,
        city 
      })
    });
    
    if (!response.ok) return {};
    return await response.json();
  } catch (error) {
    console.error('Yelp fetch failed:', error);
    return {};
  }
}

export async function fetchInstagramContent(place: GooglePlace): Promise<PlatformContent> {
  try {
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/fetch-instagram`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`
      },
      body: JSON.stringify({ placeName: place.displayName.text })
    });
    
    if (!response.ok) return {};
    return await response.json();
  } catch (error) {
    console.error('Instagram fetch failed:', error);
    return {};
  }
}

export async function fetchFacebookContent(place: GooglePlace): Promise<PlatformContent> {
  try {
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/fetch-facebook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`
      },
      body: JSON.stringify({ placeName: place.displayName.text })
    });
    
    if (!response.ok) return {};
    return await response.json();
  } catch (error) {
    console.error('Facebook fetch failed:', error);
    return {};
  }
}
