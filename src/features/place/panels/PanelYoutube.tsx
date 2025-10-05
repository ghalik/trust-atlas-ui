import { Youtube, Play } from "lucide-react";
import { PanelBase } from "./PanelBase";
import { GooglePlace } from "@/services/googlePlaces";

type PanelYoutubeProps = {
  place: GooglePlace;
};

export function PanelYoutube({ place }: PanelYoutubeProps) {
  const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(place.displayName.text)}`;
  
  const preview = (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="aspect-video bg-gradient-to-br from-platform-youtube/20 to-platform-youtube/10 rounded flex items-center justify-center"
          >
            <Play className="w-8 h-8 text-platform-youtube opacity-50" />
          </div>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">
        Watch videos about {place.displayName.text} on YouTube
      </p>
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
