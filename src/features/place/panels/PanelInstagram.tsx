import { Instagram, Star } from "lucide-react";
import { PanelBase } from "./PanelBase";
import { GooglePlace } from "@/services/googlePlaces";
import SmartThumb from "@/components/SmartThumb";

type PanelInstagramProps = {
  place: GooglePlace;
};

export function PanelInstagram({ place }: PanelInstagramProps) {
  const hashtag = place.displayName.text.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  const url = `https://www.instagram.com/explore/tags/${hashtag}/`;
  const deepLink = `instagram://tag?name=${hashtag}`;
  
  const preview = (
    <div className="space-y-3 animate-fade-in">
      {place.photos && place.photos.length > 0 ? (
        <>
          <div className="grid grid-cols-3 gap-2">
            {place.photos.slice(0, 9).map((photo, i) => (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="aspect-square rounded-lg relative overflow-hidden group cursor-pointer hover:scale-105 transition-all duration-300 shadow-md hover:shadow-xl"
              >
                <SmartThumb 
                  url={url}
                  alt={`${place.displayName.text} on Instagram`}
                  size={150}
                  className="w-full h-full"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Instagram className="w-6 h-6 text-white drop-shadow-lg" />
                </div>
              </a>
            ))}
          </div>
          <div className="flex items-center justify-between text-sm bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-orange-500/10 p-2 rounded-lg border border-platform-instagram/20">
            <span className="font-semibold">#{hashtag}</span>
            <span className="text-muted-foreground">From Google Photos</span>
          </div>
          <p className="text-xs text-center text-muted-foreground">
            Click to explore #{hashtag} on Instagram
          </p>
        </>
      ) : (
        <div className="text-center p-6 bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/20">
          <Instagram className="w-12 h-12 text-muted-foreground/40 mx-auto mb-2" />
          <p className="text-sm font-medium mb-1">No Photos Available</p>
          <p className="text-xs text-muted-foreground mb-3">
            Search for #{hashtag} on Instagram to find related content.
          </p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white rounded-lg hover:scale-105 transition-transform text-sm font-medium"
          >
            Explore on Instagram
          </a>
        </div>
      )}
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
