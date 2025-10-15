import { corsHeaders } from '../_shared/cors.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { placeName } = await req.json();
    console.log(`Fetching Instagram data for: ${placeName}`);
    
    const hashtag = placeName.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    const instagramUrl = `https://www.instagram.com/explore/tags/${hashtag}/`;

    const response = await fetch(instagramUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Cache-Control': 'max-age=0',
      },
    });

    if (!response.ok) {
      console.error(`Instagram response not OK: ${response.status}`);
      return new Response(JSON.stringify({ photos: [] }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const html = await response.text();
    const photos: string[] = [];

    // Try to extract from shared data script
    const sharedDataMatch = html.match(/window\._sharedData\s*=\s*({.+?});<\/script>/);
    if (sharedDataMatch) {
      try {
        const sharedData = JSON.parse(sharedDataMatch[1]);
        const edges = sharedData?.entry_data?.TagPage?.[0]?.graphql?.hashtag?.edge_hashtag_to_media?.edges || [];
        
        for (const edge of edges.slice(0, 6)) {
          const imageUrl = edge?.node?.thumbnail_src || edge?.node?.display_url;
          if (imageUrl) photos.push(imageUrl);
        }
      } catch (e) {
        console.error('Error parsing Instagram shared data:', e);
      }
    }

    // Fallback: extract from meta tags
    if (photos.length === 0) {
      const ogImageMatch = html.match(/<meta property="og:image" content="([^"]+)"/);
      if (ogImageMatch) {
        photos.push(ogImageMatch[1]);
      }
    }

    console.log(`Found ${photos.length} Instagram photos`);

    return new Response(JSON.stringify({ photos }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Instagram fetch error:', error);
    return new Response(JSON.stringify({ photos: [] }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
