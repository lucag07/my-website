import { Phone, PhoneOff, TrendingUp } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

function MapPackCard({
  rank,
  name,
  jobs,
  active,
}: {
  rank: number;
  name: string;
  jobs: number;
  active: boolean;
}) {
  return (
    <div className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm border border-stone-200">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
          active
            ? "bg-emerald-500 text-white"
            : "bg-stone-300 text-stone-500"
        }`}
      >
        {rank}
      </div>
      <div className="flex-1 min-w-0">
        <p className={`font-semibold text-sm truncate ${active ? "text-slate-800" : "text-stone-400"}`}>
          {name}
        </p>
        <p className={`text-xs ${active ? "text-emerald-600" : "text-stone-400"}`}>
          {active ? `${jobs} jobs this month` : "No calls"}
        </p>
      </div>
      {active ? (
        <Phone className="w-4 h-4 text-emerald-500 animate-pulse" />
      ) : (
        <PhoneOff className="w-4 h-4 text-stone-300" />
      )}
    </div>
  );
}

export function RealityCheckSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="bg-stone-100 py-20 md:py-28">
      <div
        ref={ref}
        className={`${isVisible ? "reveal-visible" : "reveal-base"} max-w-6xl mx-auto px-6`}
      >
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
              <TrendingUp className="w-3.5 h-3.5" />
              Top 3 Position
            </div>
            <div className="bg-stone-50 rounded-xl p-5 border border-stone-200 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="text-xs text-stone-400 ml-2">Local Map Pack</span>
              </div>
              <MapPackCard rank={1} name="Pro Roofing Co." jobs={27} active />
              <MapPackCard rank={2} name="Top Notch Plumbing" jobs={21} active />
              <MapPackCard rank={3} name="Elite HVAC Services" jobs={18} active />
            </div>
            <div className="mt-3 flex items-center gap-2 text-emerald-600 text-sm font-medium">
              <Phone className="w-4 h-4" />
              Phone ringing off the hook
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-2 bg-stone-200 text-stone-500 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
              <PhoneOff className="w-3.5 h-3.5" />
              Position 35+
            </div>
            <div className="bg-stone-50 rounded-xl p-5 border border-stone-200 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-stone-300" />
                <div className="w-3 h-3 rounded-full bg-stone-300" />
                <div className="w-3 h-3 rounded-full bg-stone-300" />
                <span className="text-xs text-stone-400 ml-2">Scrolling past...</span>
              </div>
              <MapPackCard rank={35} name="Your Business" jobs={0} active={false} />
              <div className="h-2 bg-stone-200 rounded" />
              <div className="h-2 bg-stone-200 rounded w-3/4" />
              <div className="h-2 bg-stone-200 rounded w-1/2" />
            </div>
            <div className="mt-3 flex items-center gap-2 text-stone-400 text-sm font-medium">
              <PhoneOff className="w-4 h-4" />
              Complete silence
            </div>
          </div>
        </div>

        <div className="mt-12 max-w-3xl mx-auto text-center">
          <p className="text-lg md:text-xl text-slate-700 leading-relaxed">
            When someone searches for a local pro near them, they call one of the
            top 3. They never scroll to position 35.{" "}
            <span className="font-semibold text-slate-900">
              You already know this because you live it. Now let's fix it.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
