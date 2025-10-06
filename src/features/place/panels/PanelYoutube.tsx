import { Youtube, Play } from "lucide-react";
import { PanelBase } from "./PanelBase";
import { GooglePlace } from "@/services/googlePlaces";

type PanelYoutubeProps = {
  place: GooglePlace;
};

export function PanelYoutube({ place }: PanelYoutubeProps) {
  const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(place.displayName.text)}`;
  
  const videos = [
    { 
      title: `${place.displayName.text} - Complete Tour & Review`, 
      channel: "Food Explorer", 
      views: "125K",
      duration: "12:34",
      id: "video1"
    },
    { 
      title: `Best Dishes at ${place.displayName.text}`, 
      channel: "Travel Eats", 
      views: "89K",
      duration: "8:42",
      id: "video2"
    },
    { 
      title: `${place.displayName.text} - Worth the Hype?`, 
      channel: "Honest Reviews", 
      views: "52K",
      duration: "15:18",
      id: "video3"
    }
  ];
  
  const preview = (
    <div className="space-y-3 animate-fade-in">
      <div className="space-y-2">
        {videos.map((video, i) => (
          <a
            key={i}
            href={searchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-2 p-2 rounded-lg bg-muted/30 hover:bg-platform-youtube/10 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="relative w-32 aspect-video bg-gradient-to-br from-platform-youtube/40 to-platform-youtube/20 rounded flex items-center justify-center flex-shrink-0 overflow-hidden border border-platform-youtube/20">
              {/* Video thumbnail simulation */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-red-700/20" />
              <Play className="w-10 h-10 text-white drop-shadow-lg group-hover:scale-125 transition-transform z-10" />
              
              {/* Duration badge */}
              <div className="absolute bottom-1 right-1 bg-black/90 text-white text-xs px-1.5 py-0.5 rounded font-medium">
                {video.duration}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold line-clamp-2 mb-1 group-hover:text-platform-youtube transition-colors">
                {video.title}
              </p>
              <p className="text-xs text-muted-foreground">{video.channel}</p>
              <p className="text-xs text-muted-foreground">{video.views} views</p>
            </div>
          </a>
        ))}
      </div>
      <p className="text-xs text-center text-muted-foreground pt-2 border-t">
        Click any video to search on YouTube
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
