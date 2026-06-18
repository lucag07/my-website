import { MapPin, TrendingUp, Phone } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { CTA_FREE_AUDIT } from "../content/site";

const steps = [
  {
    icon: MapPin,
    number: "01",
    title: "We Map It Out Together",
    description:
      "We choose the postcodes and search terms that bring you the highest-paying locksmith jobs.",
  },
  {
    icon: TrendingUp,
    number: "02",
    title: "We Get You Ranked",
    description:
      "Our systems put your locksmith business in the Top 3 on Google Maps for those target areas.",
  },
  {
    icon: Phone,
    number: "03",
    title: "Your Phone Rings",
    description:
      "Direct, exclusive calls come straight to you. Not shared leads, not tyre-kickers. Real locksmith jobs.",
  },
];

export function HowItWorksSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="bg-slate-900 py-20 md:py-28">
      <div
        ref={ref}
        className={`${isVisible ? "reveal-visible" : "reveal-base"} max-w-6xl mx-auto px-6`}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-400/10 mb-6">
                <step.icon className="w-8 h-8 text-amber-400" />
              </div>
              <div className="text-amber-400/60 text-sm font-mono font-bold mb-2">
                Step {step.number}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {step.title}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center md:hidden">
          <a
            href="#audit-form"
            className="inline-block bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold px-6 py-3 rounded-lg transition-all duration-200"
          >
            {CTA_FREE_AUDIT}
          </a>
        </div>
      </div>
    </section>
  );
}
