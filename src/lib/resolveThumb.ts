export async function resolveThumb(rawUrl: string): Promise<string|null> {
  if (!rawUrl) return null;
  try {
    const u = new URL(rawUrl);
    const host = u.hostname.toLowerCase();

    // 1) YouTube (most reliable: derive from video id)
    if (host.includes("youtube.com") || host.includes("youtu.be")) {
      const id = (() => {
        if (host.includes("youtu.be")) return u.pathname.split("/")[1] || "";
        if (u.searchParams.get("v")) return u.searchParams.get("v")!;
        const m = u.pathname.match(/\/embed\/([^/?]+)/); return m ? m[1] : "";
      })();
      if (id) return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
    }

    // 2) TikTok oEmbed (public)
    if (host.includes("tiktok.com")) {
      try {
        const r = await fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(rawUrl)}`);
        if (r.ok) { const j = await r.json(); if (j?.thumbnail_url) return j.thumbnail_url as string; }
      } catch {}
    }

    // 3) Instagram / Facebook / Yelp / Tripadvisor / everything else via Microlink (OpenGraph)
    //    Optional key: VITE_MICROLINK_KEY (works without key, just lower rate limit)
    const mk = (import.meta as any).env?.VITE_MICROLINK_KEY as string | undefined;
    const q = new URL("https://api.microlink.io");
    q.searchParams.set("url", rawUrl);
    q.searchParams.set("screenshot", "false");
    q.searchParams.set("video", "false");
    q.searchParams.set("audio", "false");
    if (mk) q.searchParams.set("key", mk);
    try {
      const r = await fetch(q.toString());
      if (r.ok) {
        const j = await r.json();
        const ogImg = j?.data?.image?.url || j?.data?.logo?.url;
        if (ogImg) return ogImg as string;
      }
    } catch {}

    // 4) Last-resort: site favicon (never blank unless domain invalid)
    return `https://www.google.com/s2/favicons?domain=${u.hostname}&sz=128`;
  } catch {
    return null;
  }
}
