import { Instagram, Heart, MessageCircle } from "lucide-react";
import { PanelBase } from "./PanelBase";
import { GooglePlace } from "@/services/googlePlaces";
import { useEffect, useState } from "react";
import { fetchInstagramContent, PlatformContent } from "@/services/platformContent";
import SmartThumb from "@/components/SmartThumb";

type PanelInstagramProps = {
  place: GooglePlace;
};

export function PanelInstagram({ place }: PanelInstagramProps) {
  const [content, setContent] = useState<PlatformContent | null>(null);
  const hashtag = place.displayName.text.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  const url = `https://www.instagram.com/explore/tags/${hashtag}/`;
  const deepLink = `instagram://tag?name=${hashtag}`;
  
  useEffect(() => {
    fetchInstagramContent(place).then(setContent);
  }, [place]);

  const hasPhotos = content?.photos && content.photos.length > 0;
  
  const preview = hasPhotos ? (
    <div className="space-y-3 animate-fade-in">
      <div className="grid grid-cols-2 gap-2">
        {content.photos!.slice(0, 6).map((photo, idx) => (
          <div key={idx} className="relative aspect-square rounded-lg overflow-hidden group">
            <img
              src={photo}
              alt={`${place.displayName.text} on Instagram ${idx + 1}`}
              className="w-full h-full object-cover transition-transform group-hover:scale-110"
            />
          </div>
        ))}
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-center px-4 py-2 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white rounded-lg hover:scale-105 transition-transform text-sm font-medium"
      >
        View More on Instagram
      </a>
    </div>
  ) : (
    <div className="space-y-3 animate-fade-in">
      <div className="text-center p-8 bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/20">
        <Instagram className="w-12 h-12 text-muted-foreground/40 mx-auto mb-2" />
        <p className="text-sm font-medium mb-1">No Instagram Photos Found</p>
        <p className="text-xs text-muted-foreground mb-3">
          Search for #{hashtag} on Instagram to find photos and posts.
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
