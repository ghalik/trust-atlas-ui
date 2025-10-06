import { Instagram, Star } from "lucide-react";
import { PanelBase } from "./PanelBase";
import { GooglePlace } from "@/services/googlePlaces";

type PanelInstagramProps = {
  place: GooglePlace;
};

export function PanelInstagram({ place }: PanelInstagramProps) {
  const hashtag = place.displayName.text.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  const url = `https://www.instagram.com/explore/tags/${hashtag}/`;
  const deepLink = `instagram://tag?name=${hashtag}`;
  
  // Generate clickable image placeholders
  const postUrls = Array.from({ length: 9 }, (_, i) => 
    `https://www.instagram.com/explore/tags/${hashtag}/?img=${i}`
  );
  
  const preview = (
    <div className="space-y-3 animate-fade-in">
      <div className="grid grid-cols-3 gap-2">
        {postUrls.map((postUrl, i) => (
          <a
            key={i}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="aspect-square bg-gradient-to-br from-platform-instagram/30 to-platform-instagram/10 rounded-lg relative overflow-hidden group cursor-pointer hover:scale-105 transition-all duration-300 shadow-md hover:shadow-xl"
          >
            {/* Simulated image with gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-orange-500/20" />
            
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
              <Star className="w-4 h-4 fill-white text-white mb-1" />
              <span className="text-white text-xs font-bold">{Math.floor(Math.random() * 500 + 100)}</span>
            </div>

            {/* Instagram icon indicator */}
            <Instagram className="absolute top-1 right-1 w-3 h-3 text-white/60 group-hover:text-white transition-colors" />
          </a>
        ))}
      </div>
      <div className="flex items-center justify-between text-sm bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-orange-500/10 p-2 rounded-lg">
        <span className="font-semibold">#{hashtag}</span>
        <span className="text-muted-foreground">{Math.floor(Math.random() * 5000 + 1000).toLocaleString()} posts</span>
      </div>
      <p className="text-xs text-center text-muted-foreground">
        Click any photo to explore on Instagram
      </p>
    </div>
  );

  return (
    <PanelBase
      kind="instagram"
      title="Instagram"
      icon={<Instagram className="w-6 h-6 text-platform-instagram" />}
      url={url}
      deepLink={deepLink}
      preview={preview}
    />
  );
}
