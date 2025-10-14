import { corsHeaders } from '../_shared/cors.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { placeName } = await req.json();
    console.log('Fetching TikTok videos for:', placeName);
    
    const hashtag = placeName.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    const searchUrl = `https://www.tiktok.com/tag/${hashtag}`;
    
    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9'
      }
    });
    
    if (!response.ok) {
      console.error('TikTok response not OK:', response.status);
      return new Response(JSON.stringify({ videos: [] }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    const html = await response.text();
    
    // Try multiple data extraction methods
    let videos: any[] = [];
    
    // Method 1: __UNIVERSAL_DATA_FOR_REHYDRATION__
    const universalMatch = html.match(/<script id="__UNIVERSAL_DATA_FOR_REHYDRATION__"[^>]*>(.*?)<\/script>/s);
    if (universalMatch) {
      try {
        const data = JSON.parse(universalMatch[1]);
        const itemList = data?.__DEFAULT_SCOPE__?.['webapp.video-detail']?.itemList || 
                        data?.__DEFAULT_SCOPE__?.['webapp.tag']?.videoList || [];
        videos = itemList.slice(0, 6).map((item: any) => ({
          title: item.desc || item.video?.title || item.title || '',
          url: `https://www.tiktok.com/@${item.author?.uniqueId || 'user'}/video/${item.id}`,
          thumbnail: item.video?.cover || item.video?.dynamicCover || item.cover || '',
          views: item.stats?.playCount || item.playCount || ''
        })).filter((v: any) => v.title);
      } catch (e) {
        console.error('Error parsing TikTok universal data:', e);
      }
    }
    
    // Method 2: SIGI_STATE (fallback)
    if (videos.length === 0) {
      const sigiMatch = html.match(/<script id="SIGI_STATE"[^>]*>(.*?)<\/script>/s);
      if (sigiMatch) {
        try {
          const data = JSON.parse(sigiMatch[1]);
          const itemModule = data?.ItemModule || {};
          videos = Object.values(itemModule).slice(0, 6).map((item: any) => ({
            title: item.desc || '',
            url: `https://www.tiktok.com/@${item.author}/video/${item.id}`,
            thumbnail: item.video?.cover || '',
            views: item.stats?.playCount || ''
          })).filter((v: any) => v.title);
        } catch (e) {
          console.error('Error parsing TikTok SIGI data:', e);
        }
      }
    }

    console.log(`Found ${videos.length} TikTok videos`);
    return new Response(JSON.stringify({ videos }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('TikTok fetch error:', error);
    return new Response(JSON.stringify({ videos: [] }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    });
  }
});
