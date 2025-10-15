import { corsHeaders } from '../_shared/cors.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { placeName } = await req.json();
    console.log(`Fetching Facebook data for: ${placeName}`);
    
    const searchUrl = `https://www.facebook.com/search/pages/?q=${encodeURIComponent(placeName)}`;

    const response = await fetch(searchUrl, {
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
      },
    });

    if (!response.ok) {
      console.error(`Facebook response not OK: ${response.status}`);
      return new Response(JSON.stringify({ photos: [] }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const html = await response.text();
    const photos: string[] = [];

    // Extract Open Graph images
    const ogImageRegex = /<meta property="og:image" content="([^"]+)"/g;
    let match;
    while ((match = ogImageRegex.exec(html)) !== null && photos.length < 4) {
      photos.push(match[1]);
    }

    // Extract from img tags as fallback
    if (photos.length === 0) {
      const imgRegex = /<img[^>]+src="([^"]+)"[^>]*>/g;
      while ((match = imgRegex.exec(html)) !== null && photos.length < 4) {
        const src = match[1];
        if (src.includes('scontent') || src.includes('fbcdn')) {
          photos.push(src);
        }
      }
    }

    console.log(`Found ${photos.length} Facebook photos`);

    return new Response(JSON.stringify({ photos }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Facebook fetch error:', error);
    return new Response(JSON.stringify({ photos: [] }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
