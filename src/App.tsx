import { Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Place from "./pages/Place";

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-3">
          <Link to="/" className="font-semibold text-lg">Trust Atlas</Link>
          <span className="text-sm text-neutral-500">Find places you can actually trust</span>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/place/:placeId" element={<Place />} />
        </Routes>
      </main>
    </div>
  );
}

function ThemeToggle(){
  const on = typeof document !== "undefined" && document.documentElement.classList.contains("dark");
  return (
    <button
      aria-label="Toggle dark mode"
      onClick={()=>{
        document.documentElement.classList.toggle("dark");
      }}
      className="rounded-full border px-3 py-1 text-sm hover:bg-neutral-100"
    >
      {on ? "Light" : "Dark"}
    </button>
  );
}
