import { Youtube, Play } from "lucide-react";
import { PanelBase } from "./PanelBase";
import { GooglePlace } from "@/services/googlePlaces";

type PanelYoutubeProps = {
  place: GooglePlace;
};

export function PanelYoutube({ place }: PanelYoutubeProps) {
  const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(place.displayName.text)}`;
  
  const preview = (
    <div className="space-y-3 animate-fade-in">
      <div className="grid grid-cols-2 gap-2">
        {place.photos?.slice(0, 4).map((photo, i) => (
          <div
            key={i}
            className="relative aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-platform-youtube/20 to-platform-youtube/5 border border-platform-youtube/20 group"
          >
            <img
              src={photo.name}
              alt={`${place.displayName.text} preview ${i + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-platform-youtube flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-5 h-5 text-white fill-white" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center p-3 bg-muted/30 rounded-lg">
        <p className="text-xs text-muted-foreground">
          Click Open to watch YouTube videos about this place
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
