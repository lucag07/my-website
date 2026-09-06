import { Link } from "react-router-dom";
import { regions } from "../content/locations";
import { StickyHeader } from "../components/StickyHeader";
import { Footer } from "../components/Footer";
import { FinalCTAStrip } from "../components/FinalCTAStrip";

export function AreasWeServe() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <StickyHeader />
      
      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Areas We Serve in <span className="text-amber-400">Scotland</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              We help roofer businesses dominate Google Maps rankings across major Scottish regions. Select your area below to see how we can help.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regions.map((region) => (
              <Link
                key={region.slug}
                to={`/locations/${region.slug}`}
                className="group block p-8 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-amber-400/50 hover:bg-slate-800 transition-all duration-300"
              >
                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                  {region.name}
                </h2>
                <p className="text-slate-400 leading-relaxed text-sm">
                  {region.description}
                </p>
                <div className="mt-6 flex items-center text-amber-400 text-sm font-medium">
                  View coverage
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
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
