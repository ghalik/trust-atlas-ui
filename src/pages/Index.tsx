import { useNavigate } from "react-router-dom";
import { SearchBar } from "@/components/SearchBar";
import { Header } from "@/components/Header";
import { Badge } from "@/components/ui/badge";

const EXAMPLE_PLACES = [
  { label: "Nobu", key: "nobu" },
  { label: "Schwartz's Deli", key: "schwartz" },
  { label: "Pizza Pilgrims", key: "pizzapilgrims" },
];

const Index = () => {
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    navigate(`/p/${encodeURIComponent(query)}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Discover the{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Truth
              </span>{" "}
              About Any Place
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Aggregate reviews from multiple platforms and get a transparent trust score
              based on coverage and credibility.
            </p>
          </div>

          <SearchBar onSearch={handleSearch} />

          <div className="flex flex-col items-center gap-3">
            <p className="text-sm text-muted-foreground">Try these popular places:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {EXAMPLE_PLACES.map((place) => (
                <Badge
                  key={place.key}
                  variant="outline"
                  className="cursor-pointer px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition-all hover:scale-105"
                  onClick={() => handleSearch(place.label)}
                >
                  {place.label}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 pt-8">
            <div className="glass-card p-6 rounded-2xl space-y-2">
              <div className="text-3xl font-bold text-primary">15+</div>
              <div className="text-sm font-medium">Data Sources</div>
              <div className="text-xs text-muted-foreground">
                From Google to Michelin Guide
              </div>
            </div>
            <div className="glass-card p-6 rounded-2xl space-y-2">
              <div className="text-3xl font-bold text-primary">100%</div>
              <div className="text-sm font-medium">Transparent</div>
              <div className="text-xs text-muted-foreground">
                Clear scoring formula
              </div>
            </div>
            <div className="glass-card p-6 rounded-2xl space-y-2">
              <div className="text-3xl font-bold text-primary">0</div>
              <div className="text-sm font-medium">API Keys Needed</div>
              <div className="text-xs text-muted-foreground">
                Simple link aggregation
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
