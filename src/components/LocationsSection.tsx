import { Link } from "react-router-dom";
import { regions } from "../content/locations";
import { MapPin } from "lucide-react";

export function LocationsSection() {
  return (
    <section className="py-24 bg-slate-900 border-t border-slate-800">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Areas We Serve Across <span className="text-amber-400">Scotland</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            We partner with roofing businesses in these major regions to dominate local Google Maps rankings.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {regions.map((region) => (
            <Link
              key={region.slug}
              to={`/locations/${region.slug}`}
              className="group flex flex-col p-8 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-amber-400/50 hover:bg-slate-800 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <MapPin className="w-6 h-6 text-amber-400 mr-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold text-white group-hover:text-amber-400 transition-colors">
                  {region.name}
                </h3>
              </div>
              <p className="text-slate-400 leading-relaxed text-sm flex-grow">
                {region.description}
              </p>
              <div className="mt-6 text-amber-400 text-sm font-medium inline-flex items-center">
                View cities
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            to="/locations"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 rounded-lg transition-all duration-200"
          >
            View Full Coverage Map
          </Link>
        </div>
      </div>
    </section>
  );
}
