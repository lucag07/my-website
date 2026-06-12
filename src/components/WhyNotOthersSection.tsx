import { X, Check } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const options = [
  {
    type: "bad",
    title: "Do it yourself",
    description:
      "You didn't start your plumbing business to spend evenings figuring out Google. You're already busy. DIY marketing gets dropped the moment a job comes in.",
  },
  {
    type: "bad",
    title: "Hire someone in-house",
    description:
      "Salary, National Insurance, onboarding — and there's no guarantee they know local Google Maps ranking. One wrong hire costs you thousands and months.",
  },
  {
    type: "bad",
    title: "Use a general marketing agency",
    description:
      "Most agencies take your money, send a monthly report full of numbers that mean nothing, and move on. You're one of dozens of clients. Nobody is focused on your phone ringing.",
  },
  {
    type: "good",
    title: "Work with Tasklumas",
    description:
      "We only work with plumbers. One focus: get you into the Top 3 on Google Maps so your phone rings with local jobs. No reports, no fluff. Just results you can see yourself.",
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
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-4">
          You Have Four Options
        </h2>
        <p className="text-slate-500 text-center mb-12">
          Every plumber trying to get more calls from Google faces the same choice.
        </p>

        <div className="space-y-4">
          {options.map((option) => (
            <div
              key={option.title}
              className={`flex gap-4 p-5 rounded-xl border ${
                option.type === "good"
                  ? "border-emerald-200 bg-emerald-50"
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
                <p className={`font-bold text-base mb-1 ${
                  option.type === "good" ? "text-emerald-800" : "text-slate-700"
                }`}>
                  {option.title}
                </p>
                <p className={`text-sm leading-relaxed ${
                  option.type === "good" ? "text-emerald-700" : "text-slate-500"
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
