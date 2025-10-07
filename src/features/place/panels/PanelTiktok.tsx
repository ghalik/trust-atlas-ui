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
  
  const preview = (
    <div className="space-y-3 animate-fade-in">
      {place.photos && place.photos.length > 0 ? (
        <>
          <div className="grid grid-cols-2 gap-2">
            {place.photos.slice(0, 4).map((photo, i) => (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="aspect-[9/16] rounded-lg relative overflow-hidden group cursor-pointer hover:scale-105 hover:shadow-xl transition-all duration-300 border border-platform-tiktok/20"
              >
                <img
                  src={photo.name}
                  alt={`${place.displayName.text} - Photo ${i + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Play button */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 text-white drop-shadow-lg fill-white" />
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
            <span className="text-muted-foreground">From Google Photos</span>
          </div>
          <p className="text-xs text-center text-muted-foreground">
            Click to explore #{hashtag} on TikTok
          </p>
        </>
      ) : (
        <div className="text-center p-6 bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/20">
          <Video className="w-12 h-12 text-muted-foreground/40 mx-auto mb-2" />
          <p className="text-sm font-medium mb-1">No Photos Available</p>
          <p className="text-xs text-muted-foreground mb-3">
            Search for #{hashtag} on TikTok to find related content.
          </p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-gradient-to-r from-cyan-500 via-pink-500 to-purple-500 text-white rounded-lg hover:scale-105 transition-transform text-sm font-medium"
          >
            Explore on TikTok
          </a>
        </div>
      )}
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
