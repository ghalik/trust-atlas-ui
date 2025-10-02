import { useState, useEffect, useRef } from "react";
import { Search, MapPin, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { searchPlaces, NominatimPlace } from "@/lib/nominatim";
import { getCurrentPosition } from "@/lib/geolocation";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

type SearchBarProps = {
  initialValue?: string;
  onSelectPlace: (place: NominatimPlace) => void;
  large?: boolean;
};

export function SearchBar({ initialValue = "", onSelectPlace, large = false }: SearchBarProps) {
  const [value, setValue] = useState(initialValue);
  const [suggestions, setSuggestions] = useState<NominatimPlace[]>([]);
  const [loading, setLoading] = useState(false);
  const [locating, setLocating] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const { toast } = useToast();

  useEffect(() => {
    if (value.length < 3) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(async () => {
      try {
        const results = await searchPlaces(value, userLocation || undefined);
        setSuggestions(results);
        setShowSuggestions(true);
      } catch (error) {
        console.error("Search error:", error);
        toast({
          title: "Search failed",
          description: "Please try again or check rate limits",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }, 350);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [value, userLocation, toast]);

  const handleUseLocation = async () => {
    setLocating(true);
    try {
      const position = await getCurrentPosition();
      setUserLocation({ lat: position.lat, lon: position.lon });
      toast({
        title: "Location found",
        description: "Search results are now biased near you",
      });
    } catch (error: any) {
      toast({
        title: "Location unavailable",
        description: error.message || "Please enable location permissions",
        variant: "destructive",
      });
    } finally {
      setLocating(false);
    }
  };

  const handleSelect = (place: NominatimPlace) => {
    setValue(place.name);
    setShowSuggestions(false);
    onSelectPlace(place);
  };

  return (
    <div className="relative w-full">
      <div className={`relative flex items-center gap-2 ${large ? 'flex-col sm:flex-row' : ''}`}>
        <div className="relative flex-1 w-full">
          <Search className={`absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground ${large ? 'h-6 w-6' : 'h-5 w-5'}`} />
          <Input
            type="text"
            placeholder="Search a place"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            className={`glass-card ${large ? 'pl-14 h-16 text-lg rounded-full' : 'pl-12 h-12'}`}
          />
          {loading && (
            <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 animate-spin text-muted-foreground" />
          )}
        </div>
        
        <Button
          type="button"
          variant="outline"
          size={large ? "lg" : "default"}
          onClick={handleUseLocation}
          disabled={locating}
          className={`glass-card gap-2 ${large ? 'h-16 px-6 rounded-full' : 'h-12'}`}
        >
          {locating ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <MapPin className="h-4 w-4" />
          )}
          {large ? "Use my location" : <span className="hidden sm:inline">Location</span>}
        </Button>
      </div>

      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-2 glass-card rounded-2xl overflow-hidden shadow-lg"
          >
            {suggestions.map((place) => (
              <button
                key={place.place_id}
                onClick={() => handleSelect(place)}
                className="w-full px-4 py-3 text-left hover:bg-accent/50 transition-colors border-b border-border/50 last:border-0"
              >
                <div className="font-medium">{place.name}</div>
                <div className="text-sm text-muted-foreground line-clamp-1">
                  {place.display_name}
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside to close */}
      {showSuggestions && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowSuggestions(false)}
        />
      )}
    </div>
  );
}
