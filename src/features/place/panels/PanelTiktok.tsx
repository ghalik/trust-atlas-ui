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
    { username: "@foodie_adventures", likes: "24.5K", caption: `Best experience at ${place.displayName.text} 🔥` },
    { username: "@localguide", likes: "18.2K", caption: "Hidden gem alert! 💎" },
    { username: "@travelblogger", likes: "31.8K", caption: "You NEED to try this place 😍" },
    { username: "@cityeats", likes: "12.9K", caption: "Worth every minute of the wait! ⭐" }
  ];
  
  const preview = (
    <div className="space-y-3 animate-fade-in">
      <div className="grid grid-cols-2 gap-2">
        {videos.map((video, i) => (
          <a
            key={i}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="aspect-[9/16] bg-gradient-to-br from-platform-tiktok/30 to-platform-tiktok/10 rounded-lg relative overflow-hidden group cursor-pointer hover:scale-105 hover:shadow-xl transition-all duration-300 border border-platform-tiktok/20"
          >
            {/* Simulated video background */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-pink-500/20 to-purple-500/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
            
            {/* Play button */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 text-white drop-shadow-lg fill-white" />
              </div>
            </div>
            
            {/* Video info overlay */}
            <div className="absolute bottom-2 left-2 right-2 text-white">
              <p className="text-xs font-semibold mb-1 drop-shadow-lg">{video.username}</p>
              <p className="text-xs opacity-90 line-clamp-2 drop-shadow-md mb-1">{video.caption}</p>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-white drop-shadow-lg" />
                <span className="text-xs font-bold drop-shadow-lg">{video.likes}</span>
              </div>
            </div>

            {/* TikTok watermark */}
            <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-full p-1">
              <Video className="w-3 h-3 text-white" />
            </div>
          </a>
        ))}
      </div>
      <div className="flex items-center justify-between text-sm bg-gradient-to-r from-cyan-500/10 via-pink-500/10 to-purple-500/10 p-2 rounded-lg border border-platform-tiktok/20">
        <span className="font-semibold">#{hashtag}</span>
        <span className="text-muted-foreground">{Math.floor(Math.random() * 10 + 5)}M views</span>
      </div>
      <p className="text-xs text-center text-muted-foreground">
        Click any video to explore on TikTok
      </p>
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
