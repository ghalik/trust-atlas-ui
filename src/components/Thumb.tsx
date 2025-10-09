import React from "react";

export default function Thumb({ url, alt, size = 64 }: { url?: string; alt?: string; size?: number }) {
  const [src, setSrc] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!url) { setSrc(null); return; }
    try {
      const u = new URL(url);
      // if you later have a real image, pass it as ?img=... on the URL
      const explicit = new URL(url).searchParams.get("img");
      const favicon = `https://www.google.com/s2/favicons?domain=${u.hostname}&sz=128`;
      setSrc(explicit || favicon);
    } catch {
      setSrc(null);
    }
  }, [url]);

  const px = `${size}px`;
  return (
    <div style={{ width: px, height: px }}
         className="shrink-0 rounded-lg border overflow-hidden bg-background flex items-center justify-center">
      {src ? (
        <img src={src} alt={alt || "thumbnail"} width={size} height={size}
             className="object-cover w-full h-full" onError={() => setSrc(null)} />
      ) : (
        <div className="text-xs text-muted-foreground">no img</div>
      )}
    </div>
  );
}
