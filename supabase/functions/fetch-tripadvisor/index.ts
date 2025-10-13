import { corsHeaders } from '../_shared/cors.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { placeName } = await req.json();
    const searchUrl = `https://www.tripadvisor.com/Search?q=${encodeURIComponent(placeName)}`;
    
    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    const html = await response.text();
    
    // Extract structured data from TripAdvisor search results
    const pageProps = html.match(/<script id="__NEXT_DATA__"[^>]*>(.*?)<\/script>/);
    if (!pageProps) {
      return new Response(JSON.stringify({}), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    const data = JSON.parse(pageProps[1]);
    const results = data?.props?.pageProps?.urqlState;
    
    // Parse the URQL state to find location data
    let rating = null;
    let reviewCount = null;
    let photos: string[] = [];
    
    if (results) {
      for (const key in results) {
        const item = results[key];
        if (item?.data) {
          const parsed = typeof item.data === 'string' ? JSON.parse(item.data) : item.data;
          if (parsed?.locations?.[0]) {
            const loc = parsed.locations[0];
            rating = loc.rating;
            reviewCount = loc.reviewCount || loc.numReviews;
            photos = loc.photos?.slice(0, 4).map((p: any) => p.url || p.photoSizes?.[0]?.url).filter(Boolean) || [];
            break;
          }
        }
      }
    }

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
