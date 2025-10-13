import { Facebook } from "lucide-react";
import { PanelBase } from "./PanelBase";
import { GooglePlace } from "@/services/googlePlaces";
import SmartThumb from "@/components/SmartThumb";

type PanelFacebookProps = {
  place: GooglePlace;
};

export function PanelFacebook({ place }: PanelFacebookProps) {
  const searchUrl = `https://www.facebook.com/search/pages?q=${encodeURIComponent(place.displayName.text)}`;
  
  const preview = (
    <div className="space-y-3 animate-fade-in">
      <div className="text-center p-8 bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/20">
        <Facebook className="w-12 h-12 text-muted-foreground/40 mx-auto mb-2" />
        <p className="text-sm font-medium mb-1">No Facebook Data Available</p>
        <p className="text-xs text-muted-foreground mb-3">
          Search for {place.displayName.text} on Facebook to find the official page and community updates.
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
