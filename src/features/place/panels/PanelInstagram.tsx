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
      <div className="text-center p-8 bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/20">
        <Instagram className="w-12 h-12 text-muted-foreground/40 mx-auto mb-2" />
        <p className="text-sm font-medium mb-1">No Instagram Data Available</p>
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
