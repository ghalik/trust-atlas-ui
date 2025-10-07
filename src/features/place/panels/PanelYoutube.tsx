import { Youtube, Play } from "lucide-react";
import { PanelBase } from "./PanelBase";
import { GooglePlace } from "@/services/googlePlaces";
import { useEffect, useState } from "react";
import { searchYouTube, PlatformContent } from "@/services/platformSearch";

type PanelYoutubeProps = {
  place: GooglePlace;
};

export function PanelYoutube({ place }: PanelYoutubeProps) {
  const [content, setContent] = useState<PlatformContent | null>(null);
  
  useEffect(() => {
    searchYouTube(place).then(setContent);
  }, [place]);
  
  const searchUrl = content?.pageUrl || `https://www.youtube.com/results?search_query=${encodeURIComponent(place.displayName.text)}`;
  
  const preview = (
    <div className="space-y-3 animate-fade-in">
      {content && content.videos && content.videos.length > 0 ? (
        <>
          <div className="space-y-2">
            {content.videos.slice(0, 5).map((video, i) => (
              <a
                key={i}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2 p-2 rounded-lg bg-muted/30 hover:bg-platform-youtube/10 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="relative w-32 aspect-video rounded flex items-center justify-center flex-shrink-0 overflow-hidden border border-platform-youtube/20">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                  <Play className="absolute w-10 h-10 text-white drop-shadow-lg group-hover:scale-125 transition-transform z-10" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold line-clamp-2 mb-1 group-hover:text-platform-youtube transition-colors">
                    {video.title}
                  </p>
                  {video.author && <p className="text-xs text-muted-foreground">{video.author}</p>}
                </div>
              </a>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center p-6 bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/20">
          <Youtube className="w-12 h-12 text-muted-foreground/40 mx-auto mb-2" />
          <p className="text-sm font-medium mb-1">Searching for videos...</p>
          <p className="text-xs text-muted-foreground mb-3">
            Loading YouTube videos about {place.displayName.text}
          </p>
        </div>
      )}
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
