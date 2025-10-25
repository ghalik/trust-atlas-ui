import { Video, Play, Heart } from "lucide-react";
import { PanelBase } from "./PanelBase";
import { GooglePlace } from "@/services/googlePlaces";
import { useEffect, useState } from "react";
import { fetchTikTokContent, PlatformContent } from "@/services/platformContent";
import { formatCount } from "@/lib/format";

type PanelTiktokProps = {
  place: GooglePlace;
};

export function PanelTiktok({ place }: PanelTiktokProps) {
  const [content, setContent] = useState<PlatformContent | null>(null);
  const hashtag = place.displayName.text.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  const url = `https://www.tiktok.com/tag/${hashtag}`;
  const deepLink = `tiktok://tag?name=${hashtag}`;
  
  useEffect(() => {
    fetchTikTokContent(place).then(setContent);
  }, [place]);

  const preview = content?.videos && content.videos.length > 0 ? (
    <div className="space-y-3 animate-fade-in">
      {content.videos.map((video, idx) => (
        <a
          key={idx}
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors border border-border/50"
        >
          {video.thumbnail ? (
            <img 
              src={video.thumbnail} 
              alt={video.title}
              className="w-20 h-20 object-cover rounded flex-shrink-0"
            />
          ) : (
            <div className="w-20 h-20 bg-muted rounded flex items-center justify-center flex-shrink-0">
              <Play className="w-8 h-8 text-muted-foreground/40" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm line-clamp-2 mb-1">{video.title}</h4>
            {video.views && (
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Heart className="w-3 h-3" />
                {formatCount(video.views)}
              </p>
            )}
          </div>
        </a>
      ))}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-center px-4 py-2 bg-gradient-to-r from-cyan-500 via-pink-500 to-purple-500 text-white rounded-lg hover:scale-105 transition-transform text-sm font-medium"
      >
        View More on TikTok
      </a>
    </div>
  ) : (
    <div className="space-y-3 animate-fade-in">
      <div className="text-center p-8 bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/20">
        <Video className="w-12 h-12 text-muted-foreground/40 mx-auto mb-2" />
        <p className="text-sm font-medium mb-1">No data available</p>
        <p className="text-xs text-muted-foreground mb-3">
          No TikTok videos found for #{hashtag}.
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 bg-gradient-to-r from-cyan-500 via-pink-500 to-purple-500 text-white rounded-lg hover:scale-105 transition-transform text-sm font-medium"
        >
          Search on TikTok
        </a>
      </div>
    </div>
  );

  return (
    <PanelBase
      kind="tiktok"
      title="TikTok"
      icon={<Video className="w-6 h-6" />}
      url={url}
      deepLink={deepLink}
      preview={preview}
    />
  );
}
