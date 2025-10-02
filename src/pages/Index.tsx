import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { SearchBar } from "@/features/search/SearchBar";
import { NominatimPlace } from "@/lib/nominatim";
import { motion } from "framer-motion";
import { Sparkles, Shield, Zap } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const handleSelectPlace = (place: NominatimPlace) => {
    const params = new URLSearchParams({
      name: place.name,
      lat: place.lat,
      lon: place.lon,
      display: place.display_name,
      placeId: place.place_id.toString(),
      osmId: place.osm_id.toString(),
    });

    if (place.address?.city) {
      params.set("city", place.address.city);
    }

    if (place.extratags?.website) {
      params.set("website", place.extratags.website);
    }

    navigate(`/p/${place.osm_id}?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6 mb-12"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Discover places with{" "}
              <span className="bg-gradient-to-r from-primary via-purple-500 to-accent bg-clip-text text-transparent">
                confidence
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Cross-platform signals, transparent trust scores, no review spam
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <SearchBar onSelectPlace={handleSelectPlace} large />
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid sm:grid-cols-3 gap-6"
          >
            <div className="glass-card p-6 rounded-2xl space-y-3 hover:scale-105 transition-transform">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Multi-Platform</h3>
              <p className="text-sm text-muted-foreground">
                Aggregate signals from Google, Yelp, Tripadvisor, Wikipedia, and more
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl space-y-3 hover:scale-105 transition-transform">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Transparent</h3>
              <p className="text-sm text-muted-foreground">
                Clear formula, no paid APIs, no hidden algorithms or biases
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl space-y-3 hover:scale-105 transition-transform">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Privacy First</h3>
              <p className="text-sm text-muted-foreground">
                No tracking, no personal data collection, just pure discovery
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Index;
