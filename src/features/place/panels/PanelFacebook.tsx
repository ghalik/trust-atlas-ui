import { Facebook, Star, MessageCircle, ThumbsUp } from "lucide-react";
import { PanelBase } from "./PanelBase";
import { GooglePlace } from "@/services/googlePlaces";
import { useEffect, useState } from "react";
import { fetchFacebookContent, PlatformContent } from "@/services/platformContent";
import { formatCount } from "@/lib/format";

type PanelFacebookProps = {
  place: GooglePlace;
};

export function PanelFacebook({ place }: PanelFacebookProps) {
  const [content, setContent] = useState<PlatformContent | null>(null);
  const searchUrl = `https://www.facebook.com/search/pages?q=${encodeURIComponent(place.displayName.text)}`;
  
  useEffect(() => {
    fetchFacebookContent(place).then(setContent);
  }, [place]);

  const hasPhotos = content?.photos && content.photos.length > 0;
  
  const preview = hasPhotos ? (
    <div className="space-y-4 animate-fade-in">
      <div className="grid grid-cols-2 gap-2">
        {content.photos!.slice(0, 4).map((photo, idx) => (
          <img
            key={idx}
            src={photo}
            alt={`${place.displayName.text} on Facebook ${idx + 1}`}
            className="w-full h-24 object-cover rounded-lg hover:scale-105 transition-transform"
          />
        ))}
      </div>
      <a
        href={searchUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-center px-4 py-2 bg-platform-facebook text-white rounded-lg hover:scale-105 transition-transform text-sm font-medium"
      >
        View on Facebook
      </a>
    </div>
  ) : (
    <div className="space-y-3 animate-fade-in">
      <div className="text-center p-8 bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/20">
        <Facebook className="w-12 h-12 text-muted-foreground/40 mx-auto mb-2" />
        <p className="text-sm font-medium mb-1">No Facebook Photos Found</p>
        <p className="text-xs text-muted-foreground mb-3">
          Search for {place.displayName.text} on Facebook to find the official page.
        </p>
        <a
          href={searchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 bg-platform-facebook text-white rounded-lg hover:scale-105 transition-transform text-sm font-medium"
        >
          Search on Facebook
        </a>
      </div>
    </div>
  );

  return (
    <PanelBase
      kind="facebook"
      title="Facebook"
      icon={<Facebook className="w-6 h-6 text-platform-facebook" />}
      url={searchUrl}
      preview={preview}
    />
  );
}
