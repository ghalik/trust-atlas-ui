import { Youtube, Play, Clock } from "lucide-react";
import { PanelBase } from "./PanelBase";
import { GooglePlace } from "@/services/googlePlaces";
import { useEffect, useState } from "react";
import { fetchYoutubeContent, PlatformContent } from "@/services/platformContent";
import { formatCount } from "@/lib/format";
import SmartThumb from "@/components/SmartThumb";

type PanelYoutubeProps = {
  place: GooglePlace;
};

export function PanelYoutube({ place }: PanelYoutubeProps) {
  const [content, setContent] = useState<PlatformContent | null>(null);
  const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(place.displayName.text)}`;
  
  useEffect(() => {
    fetchYoutubeContent(place).then(setContent);
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
          <SmartThumb url={video.url} alt={video.title} size={80} className="rounded" />
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm line-clamp-2 mb-1">{video.title}</h4>
            {video.views && (
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Play className="w-3 h-3" />
                {formatCount(video.views)} views
              </p>
            )}
          </div>
        </a>
      ))}
    </div>
  ) : (
    <div className="space-y-3 animate-fade-in">
      <div className="text-center p-8 bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/20">
        <Youtube className="w-12 h-12 text-muted-foreground/40 mx-auto mb-2" />
        <p className="text-sm font-medium mb-1">No YouTube Videos Found</p>
        <p className="text-xs text-muted-foreground mb-3">
          Search for {place.displayName.text} on YouTube to find videos.
        </p>
        <a
          href={searchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 bg-platform-youtube text-white rounded-lg hover:scale-105 transition-transform text-sm font-medium"
        >
          Search on YouTube
        </a>
      </div>
    </div>
  );

  return (
    <PanelBase
      kind="youtube"
      title="YouTube"
      icon={<Youtube className="w-6 h-6 text-platform-youtube" />}
      url={searchUrl}
      preview={preview}
    />
  );
}
