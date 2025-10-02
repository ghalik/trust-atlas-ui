import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

function ProviderCard({
  brand,
  title,
  href,
  children,
}: {
  brand: "google" | "tripadvisor" | "yelp" | "instagram" | "facebook" | "website";
  title: string;
  href: string;
  children?: React.ReactNode;
}) {
  const brandStyles: Record<string, string> = {
    google: "border-[#4285F4]/30",
    tripadvisor: "border-[#34E0A1]/30",
    yelp: "border-[#D32323]/30",
    instagram: "border-[#C13584]/30",
    facebook: "border-[#1877F2]/30",
    website: "border-slate-300/60",
  };
  return (
    <div className={`card border ${brandStyles[brand]} flex flex-col gap-2`}>
      <div className="flex items-center justify-between">
        <div className="font-semibold">{title}</div>
        <a
          className="btn-primary px-4 py-2 text-sm"
          href={href}
          target="_blank"
          rel="noreferrer"
        >
          Open
        </a>
      </div>
      {children}
    </div>
  );
}

export default function Results() {
  const [params] = useSearchParams();
  const name = params.get("name") || params.get("q") || "Selected place";
  const q = params.get("q") || name;
  const lat = params.get("lat");
  const lon = params.get("lon");
  const city = params.get("city") || "";

  const gmEmbed = useMemo(() => {
    if (lat && lon)
      return `https://www.google.com/maps?q=${lat},${lon}&z=15&output=embed`;
    return `https://www.google.com/maps?q=${encodeURIComponent(
      name + (city ? " " + city : "")
    )}&z=15&output=embed`;
  }, [lat, lon, name, city]);

  const googleLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    name + (city ? " " + city : "")
  )}`;
  const tripLink = `https://www.tripadvisor.com/Search?q=${encodeURIComponent(
    name + (city ? " " + city : "")
  )}`;
  const yelpLink = `https://www.yelp.com/search?find_desc=${encodeURIComponent(
    name
  )}&find_loc=${encodeURIComponent(city)}`;
  const fbLink = `https://www.facebook.com/search/pages/?q=${encodeURIComponent(
    name + (city ? " " + city : "")
  )}`;
  const igLink = `https://www.google.com/search?q=${encodeURIComponent(
    name + (city ? " " + city : "") + " site:instagram.com"
  )}`;
  const webLink = `https://www.google.com/search?q=${encodeURIComponent(
    name + (city ? " " + city : "") + " official site"
  )}`;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="mb-4 text-sm">
        <a href="/" className="text-indigo-600 hover:underline">
          ← New search
        </a>
      </div>

      <h2 className="text-2xl font-bold">
        {name}
        {city ? `, ${city}` : ""}
      </h2>

      <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2 overflow-hidden rounded-3xl shadow-lg">
          <iframe
            src={gmEmbed}
            className="h-[420px] w-full border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            title="map"
          />
        </div>

        <div className="flex flex-col gap-4">
          <ProviderCard brand="google" title="Google Maps" href={googleLink}>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Open native Google card & reviews.
            </p>
          </ProviderCard>
          <ProviderCard brand="tripadvisor" title="Tripadvisor" href={tripLink}>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              See ratings & traveler photos.
            </p>
          </ProviderCard>
          <ProviderCard brand="yelp" title="Yelp" href={yelpLink}>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              See community photos and reviews.
            </p>
          </ProviderCard>
          <ProviderCard brand="instagram" title="Instagram" href={igLink}>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Search likely official/hashtag posts.
            </p>
          </ProviderCard>
          <ProviderCard brand="facebook" title="Facebook" href={fbLink}>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Find the place page.
            </p>
          </ProviderCard>
          <ProviderCard brand="website" title="Website" href={webLink}>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Open their official site (search).
            </p>
          </ProviderCard>
        </div>
      </div>

      <div className="mt-8 card">
        <div className="text-lg font-semibold">Trust Score (alpha)</div>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          We’ll combine presence & quality signals across platforms. For now,
          use the provider cards above.
        </p>
      </div>
    </div>
  );
}
