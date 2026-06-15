import { useScrollReveal } from "../hooks/useScrollReveal";
import { CTA_FREE_AUDIT } from "../content/site";

const steps = [
  {
    number: "1",
    title: "Fill in the form",
    detail: "Takes 2 minutes. Just your name, business, and the area you want to rank in.",
  },
  {
    number: "2",
    title: "We send you a free personal video",
    detail: "We record a short Loom showing exactly where you rank, who's above you, and why. No fluff.",
  },
  {
    number: "3",
    title: "Book a call if you want to fix it",
    detail: "If the video makes sense and you want to move forward, book a quick call. No pressure if not.",
  },
  {
    number: "4",
    title: "We build a plan together",
    detail: "We go through what needs fixing, tell you what we'd do, and you decide if it's a fit.",
  },
];

export function ProcessSequence() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="bg-stone-100 py-20 md:py-28">
      <div
        ref={ref}
        className={`${isVisible ? "reveal-visible" : "reveal-base"} max-w-4xl mx-auto px-6`}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-16">
          Here's Exactly What Happens Next
        </h2>

        <div className="space-y-6">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="flex items-start gap-5 bg-white rounded-xl p-5 shadow-sm border border-stone-200"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center">
                <span className="text-amber-400 font-bold text-sm">
                  {step.number}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-900 text-lg">
                  {step.title}
                </h3>
                <p className="text-slate-500 text-sm mt-1">{step.detail}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute-0" />
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
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
