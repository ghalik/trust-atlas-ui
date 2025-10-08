import { Video, Play } from "lucide-react";
import { PanelBase } from "./PanelBase";
import { GooglePlace } from "@/services/googlePlaces";

type PanelTiktokProps = {
  place: GooglePlace;
};

export function PanelTiktok({ place }: PanelTiktokProps) {
  const hashtag = place.displayName.text.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  const url = `https://www.tiktok.com/tag/${hashtag}`;
  const deepLink = `tiktok://tag?name=${hashtag}`;
  
  const preview = (
    <div className="space-y-3 animate-fade-in">
      <div className="grid grid-cols-3 gap-2">
        {place.photos?.slice(0, 6).map((photo, i) => (
          <div
            key={i}
            className="aspect-[9/16] rounded-lg relative overflow-hidden group cursor-pointer hover:scale-105 hover:shadow-xl transition-all duration-300 border border-platform-tiktok/20"
          >
            <img
              src={photo.name}
              alt={`${place.displayName.text} preview ${i + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-5 h-5 text-white drop-shadow-lg fill-white" />
              </div>
            </div>

            <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-full p-1">
              <Video className="w-3 h-3 text-white" />
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-2 text-sm bg-gradient-to-r from-cyan-500/10 via-pink-500/10 to-purple-500/10 p-2 rounded-lg border border-platform-tiktok/20">
        <span className="font-semibold">#{hashtag}</span>
      </div>
      <div className="text-center p-2 bg-muted/30 rounded-lg">
        <p className="text-xs text-muted-foreground">
          Click Open to see TikTok videos
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
