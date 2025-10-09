import { Youtube, Play, Clock } from "lucide-react";
import { PanelBase } from "./PanelBase";
import { GooglePlace } from "@/services/googlePlaces";
import { useEffect, useState } from "react";
import { fetchYoutubeContent, PlatformContent } from "@/services/platformContent";
import { formatCount } from "@/lib/format";

type PanelYoutubeProps = {
  place: GooglePlace;
};

export function PanelYoutube({ place }: PanelYoutubeProps) {
  const [content, setContent] = useState<PlatformContent | null>(null);
  const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(place.displayName.text)}`;
  
  useEffect(() => {
    fetchYoutubeContent(place).then(setContent);
  }, [place]);

  const videos = content?.videos || [];
  
  const preview = (
    <div className="space-y-3 animate-fade-in">
      <div className="grid grid-cols-2 gap-2">
        {videos.slice(0, 4).map((video, i) => (
          <a
            key={i}
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-platform-youtube/20 to-platform-youtube/5 border border-platform-youtube/20 group cursor-pointer"
          >
            {video.thumbnail ? (
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <Youtube className="w-8 h-8 text-muted-foreground" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-2">
              <p className="text-white text-xs font-medium line-clamp-2 drop-shadow-lg">
                {video.title}
              </p>
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-12 h-12 rounded-full bg-platform-youtube flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 text-white fill-white" />
              </div>
            </div>
          </a>
        ))}
      </div>
      <div className="text-center p-3 bg-muted/30 rounded-lg">
        <p className="text-xs text-muted-foreground">
          {formatCount(videos.length)} videos found - Click to watch on YouTube
        </p>
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
