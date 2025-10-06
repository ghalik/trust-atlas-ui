import { Video, Play, Star } from "lucide-react";
import { PanelBase } from "./PanelBase";
import { GooglePlace } from "@/services/googlePlaces";

type PanelTiktokProps = {
  place: GooglePlace;
};

export function PanelTiktok({ place }: PanelTiktokProps) {
  const hashtag = place.displayName.text.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  const url = `https://www.tiktok.com/tag/${hashtag}`;
  const deepLink = `tiktok://tag?name=${hashtag}`;
  
  const videos = [
    { username: "@foodie", likes: "24.5K", caption: "Best spot in town 🔥" },
    { username: "@localguide", likes: "18.2K", caption: "Hidden gem alert! 💎" },
    { username: "@travelblogger", likes: "31.8K", caption: "You NEED to try this" },
    { username: "@cityeats", likes: "12.9K", caption: "Worth the wait!" }
  ];
  
  const preview = (
    <div className="space-y-3 animate-fade-in">
      <div className="grid grid-cols-2 gap-2">
        {videos.map((video, i) => (
          <div
            key={i}
            className="aspect-[9/16] bg-gradient-to-br from-platform-tiktok/30 to-platform-tiktok/10 rounded-lg relative overflow-hidden group cursor-pointer hover-scale"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            <div className="absolute top-2 right-2">
              <Play className="w-6 h-6 text-white drop-shadow-lg" />
            </div>
            <div className="absolute bottom-2 left-2 right-2 text-white">
              <p className="text-xs font-medium mb-1">{video.username}</p>
              <p className="text-xs opacity-90 line-clamp-1">{video.caption}</p>
              <div className="flex items-center gap-1 mt-1">
                <Star className="w-3 h-3 fill-white" />
                <span className="text-xs">{video.likes}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">#{hashtag}</span>
        <span className="text-muted-foreground">{Math.floor(Math.random() * 10 + 5)}M views</span>
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
