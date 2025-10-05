/// <reference types="google.maps" />
import { useState, useEffect, useRef } from "react";
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getAutocompletePredictions } from "@/services/googlePlaces";
import { cn } from "@/lib/utils";

type GooglePlacesAutocompleteProps = {
  onPlaceSelect: (placeId: string, description: string) => void;
  onTextSearch: (query: string) => void;
};

export function GooglePlacesAutocomplete({ onPlaceSelect, onTextSearch }: GooglePlacesAutocompleteProps) {
  const [value, setValue] = useState("");
  const [predictions, setPredictions] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch predictions when input changes
  useEffect(() => {
    const fetchPredictions = async () => {
      if (value.length < 3) {
        setPredictions([]);
        setShowDropdown(false);
        return;
      }

      setLoading(true);
      try {
        const results = await getAutocompletePredictions(value);
        setPredictions(results.slice(0, 5));
        setShowDropdown(results.length > 0);
      } catch (error) {
        console.error("Failed to fetch predictions:", error);
        setPredictions([]);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchPredictions, 300);
    return () => clearTimeout(debounce);
  }, [value]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, predictions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0) {
        handleSelectPrediction(predictions[selectedIndex]);
      } else {
        handleSearch();
      }
    } else if (e.key === "Escape") {
      setShowDropdown(false);
      setSelectedIndex(-1);
    }
  };

  const handleSelectPrediction = (prediction: google.maps.places.AutocompletePrediction) => {
    setValue(prediction.description);
    setShowDropdown(false);
    setSelectedIndex(-1);
    onPlaceSelect(prediction.place_id, prediction.description);
  };

  const handleSearch = () => {
    if (value.trim()) {
      setShowDropdown(false);
      onTextSearch(value.trim());
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto relative">
      <div className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search for a place (e.g., 'Nobu' or 'Eiffel Tower')"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pl-12 h-14 text-lg glass-card"
          />
        </div>
        <Button onClick={handleSearch} size="lg" className="h-14 px-8">
          Search
        </Button>
      </div>

      {/* Dropdown with predictions */}
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-16 mt-2 glass-card overflow-hidden z-50 animate-in fade-in-0 zoom-in-95"
        >
          {loading ? (
            <div className="p-4 text-center text-muted-foreground">
              <span className="text-sm">Loading suggestions...</span>
            </div>
          ) : (
            <div className="py-2">
              {predictions.map((prediction, index) => (
                <button
                  key={prediction.place_id}
                  onClick={() => handleSelectPrediction(prediction)}
                  className={cn(
                    "w-full px-4 py-3 text-left hover:bg-accent/50 transition-colors flex items-start gap-3",
                    selectedIndex === index && "bg-accent/50"
                  )}
                >
                  <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-muted-foreground" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">
                      {prediction.structured_formatting.main_text}
                    </div>
                    <div className="text-sm text-muted-foreground truncate">
                      {prediction.structured_formatting.secondary_text}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
