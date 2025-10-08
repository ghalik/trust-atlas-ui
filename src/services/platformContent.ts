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
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
        place.displayName.text
      )}&type=video&maxResults=6&key=AIzaSyDummyKey`
    );
    
    // Since we don't have a real API key, we'll return structured placeholder
    return {
      videos: Array(6).fill(null).map((_, i) => ({
        title: `${place.displayName.text} - Video ${i + 1}`,
        url: `https://www.youtube.com/results?search_query=${encodeURIComponent(place.displayName.text)}`,
        thumbnail: place.photos?.[i % (place.photos?.length || 1)]?.name || '',
      })),
    };
  } catch (error) {
    return { videos: [] };
  }
}

export async function fetchTikTokContent(place: GooglePlace): Promise<PlatformContent> {
  const hashtag = place.displayName.text.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  
  return {
    videos: Array(6).fill(null).map((_, i) => ({
      title: `#${hashtag} TikTok ${i + 1}`,
      url: `https://www.tiktok.com/tag/${hashtag}`,
      thumbnail: place.photos?.[i % (place.photos?.length || 1)]?.name || '',
    })),
  };
}

export async function fetchTripAdvisorContent(place: GooglePlace): Promise<PlatformContent> {
  return {
    rating: place.rating,
    reviewCount: place.userRatingCount,
    reviews: place.reviews?.slice(0, 3).map(review => ({
      text: review.text,
      rating: review.rating || 0,
      author: review.author_name || 'Anonymous',
    })) || [],
    photos: place.photos?.slice(0, 4).map(p => p.name) || [],
  };
}

export async function fetchYelpContent(place: GooglePlace): Promise<PlatformContent> {
  return {
    rating: place.rating,
    reviewCount: place.userRatingCount,
    reviews: place.reviews?.slice(0, 3).map(review => ({
      text: review.text,
      rating: review.rating || 0,
      author: review.author_name || 'Anonymous',
    })) || [],
    photos: place.photos?.slice(0, 4).map(p => p.name) || [],
  };
}
