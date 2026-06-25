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
              The Maths Is Simple
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              In Scotland, just one flat roof replacement or a couple of slate repairs pays for this service for months. A full slate roof replacement pays for it for years.{" "}
              <span className="font-semibold text-slate-900">
                Every job after that is pure profit. That's the deal.
              </span>
            </p>

            <div className="bg-white rounded-xl border border-stone-200 overflow-hidden mb-8 shadow-sm">
              <table className="w-full text-left text-sm md:text-base">
                <thead className="bg-stone-50 border-b border-stone-200">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-slate-700">Scottish Roofing Job</th>
                    <th className="px-4 py-3 font-semibold text-slate-700 text-right">Average Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  <tr>
                    <td className="px-4 py-3 text-slate-600">Slate Roof Repair</td>
                    <td className="px-4 py-3 text-emerald-600 font-medium text-right">£150 - £1,200</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-slate-600">Flat Roof Replacement</td>
                    <td className="px-4 py-3 text-emerald-600 font-medium text-right">£800 - £4,500</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-slate-900 font-medium">Full Slate Roof Replacement</td>
                    <td className="px-4 py-3 text-emerald-600 font-bold text-right">£7,000 - £18,000+</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-lg px-5 py-4">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <p className="text-sm text-emerald-800 font-medium">
                We don't stop until you're ranked.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
