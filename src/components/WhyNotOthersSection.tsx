import { X, Check } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const options = [
  {
    type: "bad",
    title: "1. Do It Yourself (DIY)",
    description:
      "Doing the marketing yourself is a massive headache. You're too busy running the business, so marketing is the first thing that gets dropped when an emergency job comes in.",
  },
  {
    type: "bad",
    title: "2. Hiring Full-Time Staff",
    description:
      "Putting someone on the payroll is a big risk. By the time you pay their wage, deal with taxes, and train them up, hiring the wrong person can cost you thousands.",
  },
  {
    type: "bad",
    title: "3. Hiring a Big Agency",
    description:
      "You could hire a general marketing agency, but you'll likely be handed off to a junior worker. Instead of actual phone calls, you just get confusing monthly reports full of numbers that don't mean anything.",
  },
  {
    type: "good",
    title: "4. Work with Tasklumas",
    description:
      "We do one thing: we get roofers to the top of Google. We guarantee our results, so we take on the risk. No fluff, no guesswork—just a clear focus on making your phone ring with real jobs.",
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
              But right now, you're stuck. You know that getting to the top of Google will change your business and bring in great jobs every week. 
            </p>
            <p>
              The problem is, you're already flat out. Between managing your team, pricing jobs, and putting out daily fires, you have no time to learn complex marketing tricks or figure out Google's rules. It hurts to watch other roofers—who aren't even as good as you—get all the best calls just because they rank higher.
            </p>
          </div>
        </div>

        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-4">
          You Have Four Options
        </h3>
        <p className="text-slate-500 text-center mb-12">
          Every roofer trying to get more calls from Google faces the same choice.
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
