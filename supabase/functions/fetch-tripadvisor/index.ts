import { corsHeaders } from '../_shared/cors.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { placeName } = await req.json();
    console.log('Fetching TripAdvisor data for:', placeName);
    
    // Normalize place name for fuzzy matching
    const normalizedName = placeName.toLowerCase().trim();
    
    const searchUrl = `https://www.tripadvisor.com/Search?q=${encodeURIComponent(placeName)}`;
    
    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Sec-Ch-Ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"macOS"',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1'
      }
    });
    
    if (!response.ok) {
      console.error('TripAdvisor response not OK:', response.status);
      return new Response(JSON.stringify({}), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    const html = await response.text();
    
    let rating = null;
    let reviewCount = null;
    let photos: string[] = [];
    
    // Helper function for fuzzy name matching
    const fuzzyMatch = (str1: string, str2: string): boolean => {
      const s1 = str1.toLowerCase().replace(/[^a-z0-9]/g, '');
      const s2 = str2.toLowerCase().replace(/[^a-z0-9]/g, '');
      // Check if one contains the other or if they're very similar
      if (s1.includes(s2) || s2.includes(s1)) return true;
      // Calculate simple similarity (Dice coefficient)
      const bigrams1 = new Set<string>();
      const bigrams2 = new Set<string>();
      for (let i = 0; i < s1.length - 1; i++) bigrams1.add(s1.slice(i, i + 2));
      for (let i = 0; i < s2.length - 1; i++) bigrams2.add(s2.slice(i, i + 2));
      const intersection = [...bigrams1].filter(x => bigrams2.has(x)).length;
      const similarity = (2 * intersection) / (bigrams1.size + bigrams2.size);
      return similarity > 0.5; // 50% similarity threshold
    };
    
    // Method 1: Try __NEXT_DATA__ with fuzzy matching
    const nextDataMatch = html.match(/<script id="__NEXT_DATA__"[^>]*>(.*?)<\/script>/s);
    if (nextDataMatch) {
      try {
        const data = JSON.parse(nextDataMatch[1]);
        const urqlState = data?.props?.pageProps?.urqlState;
        
        if (urqlState) {
          for (const key in urqlState) {
            const item = urqlState[key];
            if (item?.data) {
              const parsed = typeof item.data === 'string' ? JSON.parse(item.data) : item.data;
              
              // Check locations array with fuzzy matching
              if (parsed?.locations) {
                for (const loc of parsed.locations) {
                  const locName = loc.name || loc.title || '';
                  if (fuzzyMatch(locName, normalizedName)) {
                    rating = loc.rating || loc.averageRating;
                    reviewCount = loc.reviewCount || loc.numReviews || loc.numberOfReviews;
                    photos = loc.photos?.slice(0, 4).map((p: any) => 
                      p.url || p.photoSizes?.[0]?.url || p.sizes?.large?.url
                    ).filter(Boolean) || [];
                    if (rating || reviewCount) break;
                  }
                }
                if (rating || reviewCount) break;
              }
              
              // Check direct location object
              if (parsed?.location) {
                const loc = parsed.location;
                const locName = loc.name || loc.title || '';
                if (fuzzyMatch(locName, normalizedName)) {
                  rating = loc.rating || loc.averageRating;
                  reviewCount = loc.reviewCount || loc.numReviews;
                  photos = loc.photos?.slice(0, 4).map((p: any) => 
                    p.url || p.photoSizes?.[0]?.url
                  ).filter(Boolean) || [];
                  if (rating || reviewCount) break;
                }
              }
            }
          }
        }
      } catch (e) {
        console.error('Error parsing TripAdvisor __NEXT_DATA__:', e);
      }
    }
    
    // Method 2: Try JSON-LD structured data
    if (!rating && !reviewCount) {
      const jsonLdMatches = html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs);
      for (const match of jsonLdMatches) {
        try {
          const jsonLd = JSON.parse(match[1]);
          if (jsonLd['@type'] === 'Restaurant' || jsonLd['@type'] === 'Hotel' || jsonLd['@type'] === 'TouristAttraction') {
            rating = jsonLd.aggregateRating?.ratingValue;
            reviewCount = jsonLd.aggregateRating?.reviewCount;
            if (rating || reviewCount) break;
          }
        } catch (e) {
          continue;
        }
      }
    }

    console.log(`TripAdvisor found - Rating: ${rating}, Reviews: ${reviewCount}, Photos: ${photos.length}`);
    return new Response(JSON.stringify({ rating, reviewCount, photos }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('TripAdvisor fetch error:', error);
    return new Response(JSON.stringify({}), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    });
  }
});
