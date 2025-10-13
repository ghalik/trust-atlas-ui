import { Video, Play, Heart } from "lucide-react";
import { PanelBase } from "./PanelBase";
import { GooglePlace } from "@/services/googlePlaces";
import { useEffect, useState } from "react";
import { fetchTikTokContent, PlatformContent } from "@/services/platformContent";
import { formatCount } from "@/lib/format";
import SmartThumb from "@/components/SmartThumb";

type PanelTiktokProps = {
  place: GooglePlace;
};

export function PanelTiktok({ place }: PanelTiktokProps) {
  const [content, setContent] = useState<PlatformContent | null>(null);
  const hashtag = place.displayName.text.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  const url = `https://www.tiktok.com/tag/${hashtag}`;
  const deepLink = `tiktok://tag?name=${hashtag}`;
  
  useEffect(() => {
    fetchTikTokContent(place).then(setContent);
  }, [place]);

  const preview = (
    <div className="space-y-3 animate-fade-in">
      <div className="text-center p-8 bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/20">
        <Video className="w-12 h-12 text-muted-foreground/40 mx-auto mb-2" />
        <p className="text-sm font-medium mb-1">No TikTok Videos Available</p>
        <p className="text-xs text-muted-foreground mb-3">
          Search for #{hashtag} on TikTok to find videos.
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 bg-gradient-to-r from-cyan-500 via-pink-500 to-purple-500 text-white rounded-lg hover:scale-105 transition-transform text-sm font-medium"
        >
          Search on TikTok
        </a>
      </div>
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
