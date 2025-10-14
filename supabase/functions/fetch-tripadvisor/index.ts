import { corsHeaders } from '../_shared/cors.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { placeName } = await req.json();
    console.log('Fetching TripAdvisor data for:', placeName);
    
    const searchUrl = `https://www.tripadvisor.com/Search?q=${encodeURIComponent(placeName)}`;
    
    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
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
    
    // Method 1: Try __NEXT_DATA__
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
              
              // Check locations array
              if (parsed?.locations?.[0]) {
                const loc = parsed.locations[0];
                rating = loc.rating || loc.averageRating;
                reviewCount = loc.reviewCount || loc.numReviews || loc.numberOfReviews;
                photos = loc.photos?.slice(0, 4).map((p: any) => 
                  p.url || p.photoSizes?.[0]?.url || p.sizes?.large?.url
                ).filter(Boolean) || [];
                if (rating || reviewCount) break;
              }
              
              // Check direct location object
              if (parsed?.location) {
                const loc = parsed.location;
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
