import { MapPin, Award, Shield } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { Section } from "./Section";

const pillars = [
  {
    icon: MapPin,
    title: "Based in Dundee, Scotland",
    description: "We're a local UK business, not a faceless overseas agency. We understand the market.",
  },
  {
    icon: Award,
    title: "Built for Locksmiths Only",
    description:
      "We rank locksmith businesses exclusively—emergency, residential, and commercial.",
  },
  {
    icon: Shield,
    title: "We Work Until You're in the Top 3",
    description: "If you're not ranked in 90 days, we keep working for free until you are.",
  },
];

export function TrustSignalsStrip() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <Section variant="dark" size="compact" bordered>
      <div
        ref={ref}
        className={isVisible ? "reveal-visible" : "reveal-base"}
      >
        <div className="grid md:grid-cols-3 gap-10 md:gap-12">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-surface-dark-muted mb-4">
                <pillar.icon className="w-6 h-6 text-brand" />
              </div>
              <h3 className="text-white font-bold mb-2">{pillar.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
