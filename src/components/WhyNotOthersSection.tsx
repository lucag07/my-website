import { X, Check } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const options = [
  {
    type: "bad",
    title: "1. Do It Yourself (DIY) Marketing",
    description:
      "Doing all the marketing yourself is overwhelming and time-consuming. You're already busy running the business, so marketing gets dropped the moment an emergency job comes in.",
  },
  {
    type: "bad",
    title: "2. Hiring In-House Staff",
    description:
      "Putting someone on payroll involves massive risk. Between salary, taxes, and onboarding, hiring the wrong person can be incredibly costly and time-consuming.",
  },
  {
    type: "bad",
    title: "3. Hiring a General Agency",
    description:
      "While it can work, smaller businesses often end up with less attention and lower priority, handled by junior or inexperienced staff. You get monthly reports full of vanity numbers instead of actual results.",
  },
  {
    type: "good",
    title: "4. Work with Tasklumas",
    description:
      "We offer a unique solution built just for locksmiths. We share the risk by guaranteeing our results, so we're highly motivated to deliver. No generic claims, no guesswork—just a clear focus on getting you to the top and making your phone ring.",
  },
];

export function WhyNotOthersSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="bg-white py-20 md:py-28">
      <div
        ref={ref}
        className={`${isVisible ? "reveal-visible" : "reveal-base"} max-w-4xl mx-auto px-6`}
      >
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 text-center">
            You didn't start your business to become a marketing expert.
          </h2>
          <div className="space-y-4 text-lg text-slate-600">
            <p>
              But right now, you're facing a frustrating reality: you know that climbing to the top of Google will completely transform your business and bring in consistent, high-paying jobs. 
            </p>
            <p>
              The problem is, you're already stretched thin managing your team, quoting jobs, and putting out daily fires. The last thing you have time for is figuring out complicated marketing strategies, SEO updates, or how algorithms work. It's painful to watch competitors—who might not even be as good as you—get the best calls simply because they rank higher.
            </p>
          </div>
        </div>

        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-4">
          You Have Four Options
        </h3>
        <p className="text-slate-500 text-center mb-12">
          Every locksmith trying to get more calls from Google faces the same choice.
        </p>

        <div className="space-y-4">
          {options.map((option) => (
            <div
              key={option.title}
              className={`flex gap-4 p-6 rounded-xl border ${
                option.type === "good"
                  ? "border-emerald-200 bg-emerald-50 shadow-sm"
                  : "border-stone-200 bg-stone-50"
              }`}
            >
              <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-0.5 ${
                option.type === "good"
                  ? "bg-emerald-500"
                  : "bg-stone-300"
              }`}>
                {option.type === "good" ? (
                  <Check className="w-4 h-4 text-white" strokeWidth={3} />
                ) : (
                  <X className="w-4 h-4 text-white" strokeWidth={3} />
                )}
              </div>
              <div>
                <p className={`font-bold text-lg mb-2 ${
                  option.type === "good" ? "text-emerald-800" : "text-slate-800"
                }`}>
                  {option.title}
                </p>
                <p className={`text-base leading-relaxed ${
                  option.type === "good" ? "text-emerald-700" : "text-slate-600"
                }`}>
                  {option.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
