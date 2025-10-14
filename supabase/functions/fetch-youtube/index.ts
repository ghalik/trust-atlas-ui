import { corsHeaders } from '../_shared/cors.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { placeName } = await req.json();
    console.log('Fetching YouTube videos for:', placeName);
    
    const searchQuery = encodeURIComponent(placeName);
    const searchUrl = `https://www.youtube.com/results?search_query=${searchQuery}`;
    
    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Cache-Control': 'no-cache',
        'Sec-Ch-Ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"macOS"',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Upgrade-Insecure-Requests': '1'
      }
    });
    
    if (!response.ok) {
      console.error('YouTube response not OK:', response.status);
      return new Response(JSON.stringify({ videos: [] }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    const html = await response.text();
    
    // Extract video data from ytInitialData
    const dataMatch = html.match(/var ytInitialData = ({.+?});/s);
    if (!dataMatch) {
      console.error('Could not find ytInitialData in YouTube response');
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

    console.log(`Found ${videos.length} YouTube videos`);
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
