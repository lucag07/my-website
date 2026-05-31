import { MapPin } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

export function HeroSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-slate-900 overflow-hidden">
      <div
        ref={ref}
        className={`${isVisible ? "reveal-visible" : "reveal-base"} max-w-5xl mx-auto px-6 py-20 text-center`}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
          Top 3 on Google Maps in Your Area
          <br />
          <span className="text-amber-400">— Or You Pay Nothing.</span>
        </h1>

        <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
          We get your local business ringing with exclusive jobs in 90 days. If
          we don't, every single penny comes back to you. No fine print.
        </p>

        <div className="mt-12 flex justify-center">
          <div className="relative animate-float">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-amber-400/20 animate-pulse-ring" />
            </div>
            <div className="relative flex flex-col items-center">
              <div className="bg-amber-400 rounded-full p-3 shadow-lg shadow-amber-400/30">
                <MapPin className="w-10 h-10 text-slate-900" strokeWidth={2.5} aria-hidden="true" />
              </div>
              <div className="mt-2 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                #1
              </div>
              <svg
                width="2"
                height="24"
                className="text-slate-600"
                viewBox="0 0 2 24"
                aria-hidden="true"
              >
                <line
                  x1="1"
                  y1="0"
                  x2="1"
                  y2="24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <a
            href="#audit-form"
            className="inline-block bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-lg px-8 py-4 rounded-lg shadow-lg shadow-amber-400/25 transition-all duration-200 hover:shadow-amber-400/40 hover:scale-105"
          >
            Get Your Free Local Ranking Audit
          </a>
          <p className="mt-3 text-sm text-slate-400">
            Takes 10 minutes. No sales pitch. Just direct answers.
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-900/80 to-transparent pointer-events-none" />
    </section>
  );
}
