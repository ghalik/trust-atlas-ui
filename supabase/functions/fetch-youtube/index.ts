import { corsHeaders } from '../_shared/cors.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { placeName } = await req.json();
    
    // Use YouTube's RSS feed (no API key required) + scrape search results
    const searchQuery = encodeURIComponent(placeName);
    const searchUrl = `https://www.youtube.com/results?search_query=${searchQuery}`;
    
    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    const html = await response.text();
    
    // Extract video data from ytInitialData
    const dataMatch = html.match(/var ytInitialData = ({.*?});/);
    if (!dataMatch) {
      return new Response(JSON.stringify({ videos: [] }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    const data = JSON.parse(dataMatch[1]);
    const contents = data?.contents?.twoColumnSearchResultsRenderer?.primaryContents?.sectionListRenderer?.contents?.[0]?.itemSectionRenderer?.contents || [];
    
    const videos = contents
      .filter((item: any) => item.videoRenderer)
      .slice(0, 6)
      .map((item: any) => {
        const video = item.videoRenderer;
        return {
          title: video.title?.runs?.[0]?.text || '',
          url: `https://www.youtube.com/watch?v=${video.videoId}`,
          thumbnail: `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`,
          views: video.viewCountText?.simpleText || video.shortViewCountText?.simpleText || ''
        };
      })
      .filter((v: any) => v.title);

    return new Response(JSON.stringify({ videos }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('YouTube fetch error:', error);
    return new Response(JSON.stringify({ videos: [] }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    });
  }
});
