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
  // Return empty - SmartThumb will show "Nothing to show" since we can't fetch real YouTube data without API
  return { videos: [] };
}

export async function fetchTikTokContent(place: GooglePlace): Promise<PlatformContent> {
  // Return empty - SmartThumb will show "Nothing to show" since we can't fetch real TikTok data without API
  return { videos: [] };
}

export async function fetchTripAdvisorContent(place: GooglePlace): Promise<PlatformContent> {
  // Return empty - can't fetch real TripAdvisor data without scraping/API
  return {};
}

export async function fetchYelpContent(place: GooglePlace): Promise<PlatformContent> {
  // Return empty - can't fetch real Yelp data without scraping/API
  return {};
}
