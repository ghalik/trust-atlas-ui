import { Video, Play, Heart } from "lucide-react";
import { PanelBase } from "./PanelBase";
import { GooglePlace } from "@/services/googlePlaces";
import { useEffect, useState } from "react";
import { fetchTikTokContent, PlatformContent } from "@/services/platformContent";
import { formatCount } from "@/lib/format";
import SmartThumb from "@/components/SmartThumb";

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

  const videos = content?.videos || [];
  
  const preview = (
    <div className="space-y-3 animate-fade-in">
      <div className="grid grid-cols-3 gap-2">
        {videos.slice(0, 6).map((video, i) => (
          <a
            key={i}
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="aspect-[9/16] rounded-lg relative overflow-hidden group cursor-pointer hover:scale-105 hover:shadow-xl transition-all duration-300 border border-platform-tiktok/20"
          >
            <SmartThumb 
              url={video.url} 
              alt={video.title}
              size={120}
              className="w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-5 h-5 text-white drop-shadow-lg fill-white" />
              </div>
            </div>

            <div className="absolute bottom-2 left-2 right-2">
              <p className="text-white text-xs font-medium line-clamp-2 drop-shadow-lg">
                {video.title}
              </p>
            </div>

            <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-full p-1">
              <Video className="w-3 h-3 text-white" />
            </div>
          </a>
        ))}
      </div>
      <div className="flex items-center justify-center gap-2 text-sm bg-gradient-to-r from-cyan-500/10 via-pink-500/10 to-purple-500/10 p-2 rounded-lg border border-platform-tiktok/20">
        <span className="font-semibold">#{hashtag}</span>
        <span className="text-muted-foreground">•</span>
        <span className="text-muted-foreground">{formatCount(videos.length)} videos</span>
      </div>
      <div className="text-center p-2 bg-muted/30 rounded-lg">
        <p className="text-xs text-muted-foreground">
          Click videos to watch on TikTok
        </p>
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
