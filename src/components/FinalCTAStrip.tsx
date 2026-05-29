import { useScrollReveal } from "../hooks/useScrollReveal";

export function FinalCTAStrip() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="bg-slate-900 py-16 md:py-20">
      <div
        ref={ref}
        className={`${isVisible ? "reveal-visible" : "reveal-base"} max-w-3xl mx-auto px-6 text-center`}
      >
        <p className="text-xl md:text-2xl font-bold text-white mb-8 leading-snug">
          Your competitors at the top of Google Maps aren't waiting.{" "}
          <span className="text-amber-400">Neither should you.</span>
        </p>
        <a
          href="#audit-form"
          className="inline-block bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-lg px-8 py-4 rounded-lg shadow-lg shadow-amber-400/25 transition-all duration-200 hover:shadow-amber-400/40 hover:scale-105"
        >
          Get Your Free Local Ranking Audit
        </a>
      </div>
    </section>
  );
}
