import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { PlaceResultCard } from "@/components/PlaceResultCard";
import { SkeletonGrid } from "@/components/SkeletonGrid";
import { GooglePlace } from "@/services/googlePlaces";
import { mockPlaces } from "@/mock/data";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<GooglePlace[]>([]);

  useEffect(() => {
    const searchPlaces = async () => {
      setLoading(true);
      
      // For now, filter mock data
      // TODO: Replace with actual Google Places Text Search API
      const mockResults = Object.values(mockPlaces)
        .filter(place => 
          place.name.toLowerCase().includes(query.toLowerCase()) ||
          place.address.toLowerCase().includes(query.toLowerCase())
        )
        .map(place => ({
          id: place.place_key,
          displayName: { text: place.name },
          formattedAddress: place.address,
          location: { latitude: 0, longitude: 0 },
        }));
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setResults(mockResults);
      setLoading(false);
    };

    if (query) {
      searchPlaces();
    } else {
      setLoading(false);
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-8 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Search Results</h1>
          <p className="text-muted-foreground">
            {loading ? "Searching..." : `Found ${results.length} results for "${query}"`}
          </p>
        </div>

        {loading ? (
          <SkeletonGrid />
        ) : results.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <p className="text-lg text-muted-foreground mb-4">
              No results found for "{query}"
            </p>
            <p className="text-sm text-muted-foreground">
              Try searching for a different place or check the spelling.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((place) => (
              <PlaceResultCard key={place.id} place={place} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchResults;
