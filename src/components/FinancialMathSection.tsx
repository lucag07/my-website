import { useScrollReveal } from "../hooks/useScrollReveal";

export function FinancialMathSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="bg-stone-100 py-20 md:py-28">
      <div
        ref={ref}
        className={`${isVisible ? "reveal-visible" : "reveal-base"} max-w-6xl mx-auto px-6`}
      >
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="flex items-end justify-center gap-6 md:gap-10">
            <div className="flex flex-col items-center">
              <div className="w-24 md:w-32 h-48 md:h-64 bg-emerald-500 rounded-xl flex items-end justify-center pb-4 shadow-lg shadow-emerald-500/20">
                <span className="text-white text-xs font-bold">Revenue</span>
              </div>
              <span className="mt-3 text-sm font-semibold text-slate-700">
                Jobs Coming In
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-24 md:w-32 h-14 md:h-20 bg-amber-400 rounded-xl flex items-end justify-center pb-2 shadow-lg shadow-amber-400/20">
                <span className="text-slate-900 text-xs font-bold">Cost</span>
              </div>
              <span className="mt-3 text-sm font-semibold text-slate-700">
                Our Service
              </span>
            </div>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              The Math Is Simple
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              One single job pays for this service for months. The rest is pure
              profit for your pocket.{" "}
              <span className="font-semibold text-slate-900">
                If we don't deliver the rankings, you get a 100% refund. The
                risk is entirely on us.
              </span>
            </p>
            <div className="mt-8 flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-lg px-5 py-4">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <p className="text-sm text-emerald-800 font-medium">
                Zero risk. All upside. That's the deal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
