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
  
  const preview = (
    <div className="space-y-3 animate-fade-in">
      <div className="grid grid-cols-3 gap-2">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className="aspect-square bg-gradient-to-br from-platform-instagram/30 to-platform-instagram/10 rounded-lg relative overflow-hidden group cursor-pointer hover-scale"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-1 text-white text-xs">
                <Star className="w-3 h-3 fill-white" />
                <span>{Math.floor(Math.random() * 500 + 100)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">#{hashtag}</span>
        <span className="text-muted-foreground">{Math.floor(Math.random() * 5000 + 1000)} posts</span>
      </div>
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
