import { useParams, Navigate, Link } from "react-router-dom";
import { getRegionBySlug, getCitiesByRegion } from "../content/locations";
import { StickyHeader } from "../components/StickyHeader";
import { Footer } from "../components/Footer";
import { FinalCTAStrip } from "../components/FinalCTAStrip";
import { MapPin } from "lucide-react";

export function RegionPage() {
  const { region } = useParams<{ region: string }>();
  
  const regionData = getRegionBySlug(region || "");
  if (!regionData) {
    return <Navigate to="/locations" replace />;
  }

  const cities = getCitiesByRegion(regionData.slug);

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <StickyHeader />
      
      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-12">
            <Link to="/locations" className="text-amber-400 hover:text-amber-300 text-sm font-medium mb-4 inline-flex items-center">
              &larr; Back to all regions
            </Link>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 mt-4">
              Roofing SEO in <span className="text-amber-400">{regionData.name}</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed max-w-2xl">
              {regionData.description} Select a town or city below to see how we help roofers rank #1 on Google Maps in your specific area.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {cities.map((city) => (
              <Link
                key={city.slug}
                to={`/locations/${regionData.slug}/${city.slug}`}
                className="group flex items-center p-6 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-amber-400/50 hover:bg-slate-800 transition-all duration-300"
              >
                <MapPin className="w-5 h-5 text-amber-400 mr-4 group-hover:scale-110 transition-transform" />
                <span className="text-lg font-medium text-white group-hover:text-amber-400 transition-colors">
                  {city.name}
                </span>
                <span className="ml-auto text-slate-500 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  View &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <FinalCTAStrip />
      <Footer />
    </div>
  );
}
