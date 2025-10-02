import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import Results from "./pages/Results";

function Home() {
  const nav = useNavigate();
  return (
    <main className="min-h-dvh">
      <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/70 backdrop-blur md:bg-white/60 dark:border-slate-800/60 dark:bg-slate-900/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-2xl bg-indigo-600" />
            <span className="text-lg font-semibold">Trust Atlas</span>
          </div>
          <div className="text-sm text-slate-500 dark:text-slate-400">beta</div>
        </div>
      </header>

      <section className="relative isolate">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:py-20">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Find places you can <span className="text-indigo-600">actually trust</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-balance text-slate-600 dark:text-slate-300">
              Unified view from Google, Tripadvisor, Yelp, Instagram, Facebook, and the web.
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-3xl">
            <SearchBar />
          </div>
        </div>
      </section>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </BrowserRouter>
  );
}
