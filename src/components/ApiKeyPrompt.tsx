import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { setApiKey } from "@/config/maps";
import { toast } from "@/hooks/use-toast";

type ApiKeyPromptProps = {
  open: boolean;
  onClose: () => void;
};

export function ApiKeyPrompt({ open, onClose }: ApiKeyPromptProps) {
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!key.trim()) {
      toast({
        title: "Invalid API Key",
        description: "Please enter a valid Google Maps API key.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setApiKey(key);
    
    toast({
      title: "API Key Saved",
      description: "Your Google Maps API key has been saved successfully.",
    });
    
    setLoading(false);
    onClose();
    window.location.reload();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Google Maps API Key Required</DialogTitle>
          <DialogDescription>
            Please enter your Google Maps API key to use location features.
            Make sure to enable Places API and Maps JavaScript API in your Google Cloud Console.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <Input
            placeholder="Enter your API key..."
            value={key}
            onChange={(e) => setKey(e.target.value)}
            type="text"
          />
          
          <Button onClick={handleSave} disabled={loading} className="w-full">
            {loading ? "Saving..." : "Save API Key"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
