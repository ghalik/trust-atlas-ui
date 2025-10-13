import { corsHeaders } from '../_shared/cors.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { placeName } = await req.json();
    const hashtag = placeName.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    const searchUrl = `https://www.tiktok.com/tag/${hashtag}`;
    
    // Try to fetch TikTok page and extract video data
    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    const html = await response.text();
    
    // Look for SIGI_STATE or __UNIVERSAL_DATA_FOR_REHYDRATION__
    const dataMatch = html.match(/<script id="__UNIVERSAL_DATA_FOR_REHYDRATION__"[^>]*>(.*?)<\/script>/);
    if (!dataMatch) {
      return new Response(JSON.stringify({ videos: [] }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    const data = JSON.parse(dataMatch[1]);
    const itemList = data?.__DEFAULT_SCOPE__?.['webapp.video-detail']?.itemList || [];
    
    const videos = itemList.slice(0, 6).map((item: any) => ({
      title: item.desc || item.video?.title || '',
      url: `https://www.tiktok.com/@${item.author?.uniqueId}/video/${item.id}`,
      thumbnail: item.video?.cover || item.video?.dynamicCover || '',
      views: item.stats?.playCount ? `${item.stats.playCount}` : ''
    })).filter((v: any) => v.title && v.thumbnail);

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
