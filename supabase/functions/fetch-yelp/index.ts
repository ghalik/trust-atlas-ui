import { corsHeaders } from '../_shared/cors.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { placeName, city } = await req.json();
    const searchUrl = `https://www.yelp.com/search?find_desc=${encodeURIComponent(placeName)}&find_loc=${encodeURIComponent(city || '')}`;
    
    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    const html = await response.text();
    
    // Extract Apollo state from Yelp page
    const apolloMatch = html.match(/<!--\s*({.*?})\s*-->/);
    if (!apolloMatch) {
      return new Response(JSON.stringify({}), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    const apolloState = JSON.parse(apolloMatch[1]);
    
    // Find business data in Apollo cache
    let rating = null;
    let reviewCount = null;
    let photos: string[] = [];
    
    for (const key in apolloState) {
      if (key.startsWith('Business:')) {
        const biz = apolloState[key];
        if (biz.rating) rating = biz.rating;
        if (biz.reviewCount) reviewCount = biz.reviewCount;
        if (biz.photos?.length) {
          photos = biz.photos.slice(0, 4).map((p: any) => p.src || p.photoUrl).filter(Boolean);
        }
        if (rating || reviewCount) break;
      }
    }

    return new Response(JSON.stringify({ rating, reviewCount, photos }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Yelp fetch error:', error);
    return new Response(JSON.stringify({}), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    });
  }
});
