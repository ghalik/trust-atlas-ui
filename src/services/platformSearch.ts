import { GooglePlace } from "./googlePlaces";

export type PlatformContent = {
  exists: boolean;
  videos?: Array<{
    title: string;
    url: string;
    thumbnail: string;
    author?: string;
    views?: string;
    duration?: string;
  }>;
  reviews?: Array<{
    author: string;
    rating: number;
    text: string;
    date?: string;
  }>;
  thumbnail?: string;
  pageUrl?: string;
};

export async function searchYelp(place: GooglePlace): Promise<PlatformContent> {
  const city = place.formattedAddress.split(",")[1]?.trim() || "";
  const searchQuery = `site:yelp.com "${place.displayName.text}" ${city}`;
  const pageUrl = `https://www.yelp.com/search?find_desc=${encodeURIComponent(place.displayName.text)}&find_loc=${encodeURIComponent(city)}`;
  
  try {
    const response = await fetch(`https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(searchQuery)}`, {
      headers: {
        'Accept': 'application/json',
      }
    });
    
    if (!response.ok) {
      return { exists: false, pageUrl };
    }
    
    const data = await response.json();
    const exists = data.web?.results?.length > 0;
    
    return { exists, pageUrl };
  } catch (error) {
    console.error('Yelp search error:', error);
    return { exists: false, pageUrl };
  }
}

export async function searchYouTube(place: GooglePlace): Promise<PlatformContent> {
  const searchQuery = `site:youtube.com "${place.displayName.text}" OR "${place.displayName.text}" tour OR "${place.displayName.text}" review`;
  const pageUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(place.displayName.text)}`;
  
  try {
    const response = await fetch(`https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(searchQuery)}`, {
      headers: {
        'Accept': 'application/json',
      }
    });
    
    if (!response.ok) {
      return { exists: false, pageUrl };
    }
    
    const data = await response.json();
    const videos = data.web?.results
      ?.filter((result: any) => result.url?.includes('youtube.com/watch'))
      .slice(0, 5)
      .map((result: any) => ({
        title: result.title || '',
        url: result.url || '',
        thumbnail: result.thumbnail?.src || `https://img.youtube.com/vi/${result.url?.split('v=')[1]?.split('&')[0]}/mqdefault.jpg`,
        author: result.extra_snippets?.[0] || '',
        views: '',
        duration: '',
      })) || [];
    
    return {
      exists: videos.length > 0,
      videos,
      pageUrl,
    };
  } catch (error) {
    console.error('YouTube search error:', error);
    return { exists: false, pageUrl };
  }
}

export async function searchTikTok(place: GooglePlace): Promise<PlatformContent> {
  const hashtag = place.displayName.text.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  const searchQuery = `site:tiktok.com "${place.displayName.text}" OR #${hashtag}`;
  const pageUrl = `https://www.tiktok.com/tag/${hashtag}`;
  
  try {
    const response = await fetch(`https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(searchQuery)}`, {
      headers: {
        'Accept': 'application/json',
      }
    });
    
    if (!response.ok) {
      return { exists: false, pageUrl };
    }
    
    const data = await response.json();
    const videos = data.web?.results
      ?.filter((result: any) => result.url?.includes('tiktok.com/@'))
      .slice(0, 6)
      .map((result: any) => ({
        title: result.title || '',
        url: result.url || '',
        thumbnail: result.thumbnail?.src || '',
        author: result.url?.split('@')[1]?.split('/')[0] || '',
      })) || [];
    
    return {
      exists: videos.length > 0,
      videos,
      pageUrl,
    };
  } catch (error) {
    console.error('TikTok search error:', error);
    return { exists: false, pageUrl };
  }
}

export async function searchTripAdvisor(place: GooglePlace): Promise<PlatformContent> {
  const searchQuery = `site:tripadvisor.com "${place.displayName.text}"`;
  const pageUrl = `https://www.tripadvisor.com/Search?q=${encodeURIComponent(place.displayName.text)}`;
  
  try {
    const response = await fetch(`https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(searchQuery)}`, {
      headers: {
        'Accept': 'application/json',
      }
    });
    
    if (!response.ok) {
      return { exists: false, pageUrl };
    }
    
    const data = await response.json();
    const result = data.web?.results?.[0];
    
    if (!result) {
      return { exists: false, pageUrl };
    }
    
    return {
      exists: true,
      thumbnail: result.thumbnail?.src || '',
      pageUrl: result.url || pageUrl,
    };
  } catch (error) {
    console.error('TripAdvisor search error:', error);
    return { exists: false, pageUrl };
  }
}
