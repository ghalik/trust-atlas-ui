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
      {place.photos && place.photos.length > 0 ? (
        <>
          <div className="space-y-2">
            {place.photos.slice(0, 3).map((photo, i) => (
              <a
                key={i}
                href={searchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2 p-2 rounded-lg bg-muted/30 hover:bg-platform-youtube/10 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="relative w-32 aspect-video rounded flex items-center justify-center flex-shrink-0 overflow-hidden border border-platform-youtube/20">
                  <img
                    src={photo.name}
                    alt={`${place.displayName.text} - Photo ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                  <Play className="absolute w-10 h-10 text-white drop-shadow-lg group-hover:scale-125 transition-transform z-10" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold line-clamp-2 mb-1 group-hover:text-platform-youtube transition-colors">
                    {place.displayName.text} - Video Tour
                  </p>
                  <p className="text-xs text-muted-foreground">From Google Photos</p>
                </div>
              </a>
            ))}
          </div>
          <p className="text-xs text-center text-muted-foreground pt-2 border-t">
            Click to search for videos on YouTube
          </p>
        </>
      ) : (
        <div className="text-center p-6 bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/20">
          <Youtube className="w-12 h-12 text-muted-foreground/40 mx-auto mb-2" />
          <p className="text-sm font-medium mb-1">No Photos Available</p>
          <p className="text-xs text-muted-foreground mb-3">
            Search for videos about {place.displayName.text} on YouTube.
          </p>
          <a
            href={searchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-platform-youtube text-white rounded-lg hover:scale-105 transition-transform text-sm font-medium"
          >
            Search on YouTube
          </a>
        </div>
      )}
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
