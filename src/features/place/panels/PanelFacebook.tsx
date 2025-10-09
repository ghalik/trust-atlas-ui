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
    <div className="space-y-3">
      <div className="flex items-center justify-center p-8 bg-gradient-to-br from-platform-facebook/10 to-platform-facebook/5 rounded-lg">
        <SmartThumb 
          url={searchUrl} 
          alt={`${place.displayName.text} on Facebook`} 
          size={120}
        />
      </div>
      <p className="text-sm text-muted-foreground">
        Find the official Facebook page and community updates for {place.displayName.text}
      </p>
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
