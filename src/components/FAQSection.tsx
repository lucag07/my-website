import { useState } from "react";
import { ChevronDown, Phone, Mail } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const faqs = [
  {
    question: "I've been burned by SEO agencies before. How is Tasklumas different?",
    answer:
      "Most agencies focus on vanity metrics like 'traffic' or 'impressions' while locking you into 12-month contracts. We don't care about traffic; we care about the phone ringing. We focus exclusively on the Google Maps 3-Pack because it drives the highest intent leads. And unlike them, we put our money where our mouth is: if you don't hit the Top 3 in 90 days, you get a full refund. No long-term contracts, no excuses.",
  },
  {
    question: "Are these leads shared with my competitors? (Like HomeAdvisor or Angi)",
    answer:
      "Absolutely not. When someone searches for your service in your area and calls the number on your Google Maps listing, that lead goes directly to you and ONLY you. You own the profile, you own the leads. We don't sell leads to the highest bidder.",
  },
  {
    question: "Are we just paying for Google Ads (PPC)?",
    answer:
      "No. While Google Ads can be effective, they disappear the second you stop paying. We focus on organic Google Maps (Local SEO) ranking. Once you secure a spot in the Top 3, you get consistent, high-quality calls without having to pay Google for every single click.",
  },
  {
    question: "What happens after the 90 days? Do I still need you?",
    answer:
      "Once you hit the Top 3, competitors will naturally try to outrank you. Most of our clients choose to stay with us to defend their #1 spot, expand their ranking radius into neighboring towns, and continue growing their lead volume. However, you are never locked into a contract—you stay because it's profitable.",
  },
  {
    question: "How long until I see results?",
    answer:
      "Most businesses start seeing movement within 30-45 days. Top 3 rankings typically hit between days 60-90. We don't promise overnight success because that's not how Google works, but we do promise results within 90 days or you get a full refund.",
  },
  {
    question: "What's the catch with the 100% money-back guarantee?",
    answer:
      "There is no catch. If your business isn't in the Top 3 on Google Maps for your primary keywords in your target location within 90 days, you get 100% of your money back. We only take on clients we know we can win for. If we don't think we can rank you, we won't take your money in the first place.",
  },
  {
    question: "Do I need to write content, build links, or do anything technical?",
    answer:
      "Zero technical work on your end. We handle the heavy lifting. We just need initial access to your Google Business Profile (or we'll help you set one up) and a quick onboarding chat to understand your best services. You focus on running your business; we focus on making the phone ring.",
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
    <div className="border border-stone-200 rounded-lg overflow-hidden bg-white">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-stone-50 transition-colors"
      >
        <span className="font-semibold text-slate-900">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ml-4 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="px-5 pb-4 text-slate-600 leading-relaxed border-t border-stone-100 mt-2 pt-4">{answer}</p>
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

        {/* Contact Block */}
        <div className="mt-12 bg-white rounded-xl p-8 border border-stone-200 text-center shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-2">Still have questions?</h3>
          <p className="text-slate-600 mb-6 max-w-lg mx-auto">
            Not sure if we're a fit for your specific trade? Give us a call or shoot us an email. No sales pressure, just honest answers.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="tel:07365519615"
              className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold px-6 py-3 rounded-lg transition-colors w-full sm:w-auto justify-center"
            >
              <Phone className="w-4 h-4" />
              07365519615
            </a>
            <a 
              href="mailto:luca@tasklumas.com" 
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold px-6 py-3 rounded-lg transition-colors w-full sm:w-auto justify-center"
            >
              <Mail className="w-4 h-4" />
              luca@tasklumas.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
