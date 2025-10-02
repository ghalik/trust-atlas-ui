/**
 * Deep link generators for various platforms
 */

export type PlaceContext = {
  name: string;
  lat?: number;
  lon?: number;
  city?: string;
  address?: string;
  placeId?: string;
};

export const deepLinks = {
  google: (context: PlaceContext) => {
    if (context.placeId) {
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(context.name)}&query_place_id=${context.placeId}`;
    }
    if (context.lat && context.lon) {
      return `https://www.google.com/maps/search/?api=1&query=${context.lat},${context.lon}`;
    }
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(context.name)}`;
  },

  tripadvisor: (context: PlaceContext) => {
    const query = context.city 
      ? `${context.name} ${context.city}`
      : context.name;
    return `https://www.tripadvisor.com/Search?q=${encodeURIComponent(query)}`;
  },

  yelp: (context: PlaceContext) => {
    const location = context.city || context.address || "";
    return `https://www.yelp.com/search?find_desc=${encodeURIComponent(context.name)}&find_loc=${encodeURIComponent(location)}`;
  },

  instagram: (context: PlaceContext, handle?: string) => {
    if (handle) {
      return `https://www.instagram.com/${handle.replace('@', '')}`;
    }
    return `https://www.instagram.com/explore/tags/${encodeURIComponent(context.name.replace(/\s+/g, ''))}`;
  },

  facebook: (context: PlaceContext) => {
    return `https://www.facebook.com/search/top?q=${encodeURIComponent(context.name)}`;
  },

  website: (url: string) => {
    if (!url.startsWith('http')) {
      return `https://${url}`;
    }
    return url;
  },
};
