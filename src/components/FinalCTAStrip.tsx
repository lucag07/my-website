import { Phone, Mail } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

interface FinalCTAStripProps {
  phoneNumber?: string;
}

export function FinalCTAStrip({ phoneNumber = "07365519615" }: FinalCTAStripProps) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="bg-slate-900 py-16 md:py-20">
      <div
        ref={ref}
        className={`${isVisible ? "reveal-visible" : "reveal-base"} max-w-5xl mx-auto px-6 text-center`}
      >
        <p className="text-xl md:text-2xl font-bold text-white mb-8 leading-snug">
          Your competitors at the top of Google Maps aren't waiting.{" "}
          <span className="text-amber-400">Neither should you.</span>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
          <a
            href="#audit-form"
            className="flex items-center justify-center text-center bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-base md:text-lg px-4 py-4 rounded-lg shadow-lg shadow-amber-400/25 transition-all duration-200 hover:shadow-amber-400/40 hover:scale-105 min-h-[4.5rem] w-full"
          >
            Get Your Free Local Ranking Audit
          </a>
          <a
            href={`tel:${phoneNumber.replace(/[^0-9+]/g, "")}`}
            className="flex items-center justify-center text-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-base md:text-lg px-4 py-4 rounded-lg border border-slate-700 transition-all duration-200 min-h-[4.5rem] w-full"
          >
            <Phone className="w-5 h-5 shrink-0" />
            {phoneNumber}
          </a>
          <a
            href="mailto:luca@tasklumas.com"
            className="flex items-center justify-center text-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-base md:text-lg px-4 py-4 rounded-lg border border-slate-700 transition-all duration-200 min-h-[4.5rem] w-full"
          >
            <Mail className="w-5 h-5 shrink-0" />
            <span className="break-all sm:break-normal">luca@tasklumas.com</span>
          </a>
        </div>
      </div>
    </section>
  );
}
