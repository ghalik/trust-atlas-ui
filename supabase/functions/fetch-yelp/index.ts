import { corsHeaders } from '../_shared/cors.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { placeName, city } = await req.json();
    console.log('Fetching Yelp data for:', placeName, 'in', city);
    
    // Normalize place name for fuzzy matching
    const normalizedName = placeName.toLowerCase().trim();
    
    const searchUrl = `https://www.yelp.com/search?find_desc=${encodeURIComponent(placeName)}&find_loc=${encodeURIComponent(city || '')}`;
    
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
      console.error('Yelp response not OK:', response.status);
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
      if (s1.includes(s2) || s2.includes(s1)) return true;
      const bigrams1 = new Set<string>();
      const bigrams2 = new Set<string>();
      for (let i = 0; i < s1.length - 1; i++) bigrams1.add(s1.slice(i, i + 2));
      for (let i = 0; i < s2.length - 1; i++) bigrams2.add(s2.slice(i, i + 2));
      const intersection = [...bigrams1].filter(x => bigrams2.has(x)).length;
      const similarity = (2 * intersection) / (bigrams1.size + bigrams2.size);
      return similarity > 0.5;
    };
    
    // Method 1: Try Apollo state (embedded in HTML comment) with fuzzy matching
    const apolloMatch = html.match(/<!--\s*({.*?})\s*-->/s);
    if (apolloMatch) {
      try {
        const apolloState = JSON.parse(apolloMatch[1]);
        
        for (const key in apolloState) {
          if (key.startsWith('Business:')) {
            const biz = apolloState[key];
            const bizName = biz.name || '';
            if (fuzzyMatch(bizName, normalizedName)) {
              rating = biz.rating || rating;
              reviewCount = biz.reviewCount || reviewCount;
              if (biz.photos?.length) {
                photos = biz.photos.slice(0, 4).map((p: any) => 
                  p.src || p.photoUrl || p.url
                ).filter(Boolean);
              }
              if (rating && reviewCount) break;
            }
          }
        }
      } catch (e) {
        console.error('Error parsing Yelp Apollo state:', e);
      }
    }
    
    // Method 2: Try JSON-LD structured data
    if (!rating || !reviewCount) {
      const jsonLdMatches = html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs);
      for (const match of jsonLdMatches) {
        try {
          const jsonLd = JSON.parse(match[1]);
          if (jsonLd['@type'] === 'Restaurant' || jsonLd['@type'] === 'LocalBusiness') {
            rating = rating || jsonLd.aggregateRating?.ratingValue;
            reviewCount = reviewCount || jsonLd.aggregateRating?.reviewCount;
            if (rating && reviewCount) break;
          }
        } catch (e) {
          continue;
        }
      }
    }
    
    // Method 3: Try regex extraction from HTML
    if (!rating) {
      const ratingMatch = html.match(/"rating":\s*(\d+\.?\d*)/);
      if (ratingMatch) rating = parseFloat(ratingMatch[1]);
    }
    if (!reviewCount) {
      const reviewMatch = html.match(/"reviewCount":\s*(\d+)/);
      if (reviewMatch) reviewCount = parseInt(reviewMatch[1]);
    }

    console.log(`Yelp found - Rating: ${rating}, Reviews: ${reviewCount}, Photos: ${photos.length}`);
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
