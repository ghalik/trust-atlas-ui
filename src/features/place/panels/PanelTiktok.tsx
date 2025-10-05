import { Video } from "lucide-react";
import { PanelBase } from "./PanelBase";
import { GooglePlace } from "@/services/googlePlaces";

type PanelTiktokProps = {
  place: GooglePlace;
};

export function PanelTiktok({ place }: PanelTiktokProps) {
  const hashtag = place.displayName.text.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  const url = `https://www.tiktok.com/tag/${hashtag}`;
  const deepLink = `tiktok://tag?name=${hashtag}`;
  
  const preview = (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="aspect-[9/16] bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg"
          />
        ))}
      </div>
      <p className="text-sm text-muted-foreground">
        See #{hashtag} TikTok videos and content
      </p>
    </div>
  );

  return (
    <PanelBase
      kind="tiktok"
      title="TikTok"
      icon={<Video className="w-6 h-6" />}
      url={url}
      deepLink={deepLink}
      preview={preview}
    />
  );
}
