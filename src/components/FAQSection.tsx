import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const faqs = [
  {
    question: "How long until I see results?",
    answer:
      "Most businesses start seeing movement within 30-45 days. Top 3 rankings typically hit between days 60-90. We don't promise overnight success because that's not how Google works, but we do promise results within 90 days or you get a full refund.",
  },
  {
    question: "Do you work with my trade?",
    answer:
      "We specialize in local service businesses: roofers, plumbers, landscapers, HVAC technicians, electricians, painters, and general contractors. If you serve a local geographic area and your customers search for you on Google Maps, we can help.",
  },
  {
    question: "What if I'm already ranking?",
    answer:
      "Great! We can help you dominate more areas. Most businesses rank well in their immediate city but miss out on neighboring towns where customers also search. We expand your visibility across multiple target locations.",
  },
  {
    question: "What's the catch with the guarantee?",
    answer:
      "No catch. If your business isn't in the Top 3 on Google Maps for your target keywords and locations within 90 days, you get 100% of your money back. We only work with businesses we're confident we can rank, so we're betting on our success too.",
  },
  {
    question: "Do I need to do anything on my end?",
    answer:
      "Minimal involvement. We need access to your Google Business Profile (or we help you set one up), and occasionally we'll need your input on specific details about your service area or business operations. Beyond that, we handle the heavy lifting.",
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border border-stone-200 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-stone-50 transition-colors"
      >
        <span className="font-semibold text-slate-900">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <p className="px-5 pb-4 text-slate-600 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

export function FAQSection() {
  const { ref, isVisible } = useScrollReveal();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-stone-100 py-20 md:py-28">
      <div
        ref={ref}
        className={`${isVisible ? "reveal-visible" : "reveal-base"} max-w-3xl mx-auto px-6`}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-slate-600 text-center mb-12">
          Everything you need to know before getting started.
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
