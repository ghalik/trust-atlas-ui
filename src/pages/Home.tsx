import SearchBar from "../components/SearchBar";

export default function Home(){
  return (
    <div className="space-y-6">
      <div className="max-w-3xl mx-auto text-center space-y-2">
        <h1 className="text-3xl font-bold">Find places you can actually trust</h1>
        <p className="text-neutral-600">Search once. See ratings + signals from multiple platforms. Understand the real picture.</p>
      </div>
      <div className="max-w-3xl mx-auto">
        <SearchBar />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-4">
          <div className="font-semibold">Multi-platform view</div>
          <div className="text-sm text-neutral-600">Google, TripAdvisor, Yelp, Facebook, Instagram, Website.</div>
        </div>
        <div className="card p-4">
          <div className="font-semibold">Transparent score</div>
          <div className="text-sm text-neutral-600">Weighted by source + data strength.</div>
        </div>
        <div className="card p-4">
          <div className="font-semibold">Clean design</div>
          <div className="text-sm text-neutral-600">Fast, modern, mobile-ready.</div>
        </div>
      </div>
    </div>
  );
}
