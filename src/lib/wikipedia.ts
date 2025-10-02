/**
 * Wikipedia REST API client
 * Docs: https://en.wikipedia.org/api/rest_v1/
 */

export type WikipediaSummary = {
  title: string;
  extract: string;
  extract_html?: string;
  thumbnail?: {
    source: string;
    width: number;
    height: number;
  };
  content_urls: {
    desktop: {
      page: string;
    };
  };
};

/**
 * Search Wikipedia and get best match summary
 */
export async function searchWikipedia(query: string): Promise<WikipediaSummary | null> {
  try {
    // First, search for the page
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(query)}&limit=1&format=json&origin=*`;
    const searchRes = await fetch(searchUrl);
    const searchData = await searchRes.json();
    
    if (!searchData[1] || searchData[1].length === 0) {
      return null;
    }

    const pageTitle = searchData[1][0];
    
    // Get page summary
    const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(pageTitle)}`;
    const summaryRes = await fetch(summaryUrl);
    
    if (!summaryRes.ok) return null;
    
    return summaryRes.json();
  } catch (error) {
    console.error("Wikipedia API error:", error);
    return null;
  }
}
