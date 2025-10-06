import { Youtube, Play } from "lucide-react";
import { PanelBase } from "./PanelBase";
import { GooglePlace } from "@/services/googlePlaces";

type PanelYoutubeProps = {
  place: GooglePlace;
};

export function PanelYoutube({ place }: PanelYoutubeProps) {
  const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(place.displayName.text)}`;
  
  const videos = [
    { title: "Full Tour & Review", channel: "Food Explorer", views: "125K" },
    { title: "Must-Try Dishes", channel: "Travel Eats", views: "89K" },
    { title: "Behind the Scenes", channel: "Culinary Insights", views: "52K" }
  ];
  
  const preview = (
    <div className="space-y-3 animate-fade-in">
      <div className="space-y-2">
        {videos.map((video, i) => (
          <div
            key={i}
            className="flex gap-2 p-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all cursor-pointer group"
          >
            <div className="relative w-32 aspect-video bg-gradient-to-br from-platform-youtube/30 to-platform-youtube/10 rounded flex items-center justify-center flex-shrink-0 overflow-hidden">
              <Play className="w-8 h-8 text-platform-youtube group-hover:scale-110 transition-transform" />
              <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                {Math.floor(Math.random() * 10 + 5)}:{Math.floor(Math.random() * 60).toString().padStart(2, '0')}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium line-clamp-2 mb-1">{video.title}</p>
              <p className="text-xs text-muted-foreground">{video.channel}</p>
              <p className="text-xs text-muted-foreground">{video.views} views</p>
            </div>
          </div>
        ))}
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
