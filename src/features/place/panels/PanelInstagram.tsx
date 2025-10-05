import { Instagram } from "lucide-react";
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
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="aspect-square bg-gradient-to-br from-platform-instagram/20 to-platform-instagram/10 rounded-lg"
          />
        ))}
      </div>
      <p className="text-sm text-muted-foreground">
        Explore #{hashtag} on Instagram for photos and posts
      </p>
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
