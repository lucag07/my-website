import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const faqs = [
  {
    question: "How long until I see results?",
    answer:
      "Most plumbing businesses start seeing movement within 30–45 days. Top 3 Map Pack positions typically land between days 60–90. We don't promise overnight wins because that's not how Google's local algorithm works. If you're not in the Top 3 within 90 days, we keep working for free until you are.",
  },
  {
    question: "How much does this cost—and is it worth it vs Google Ads?",
    answer:
      "Pricing depends on your local competition, how many postcodes you want to dominate, and whether you're emergency, residential, or commercial. After you watch your free video, if you want to move forward we'll give you a straight number — no vague 'packages.' Most plumbers find that one extra booked job per month pays for the service; unlike PPC, you're not paying every time someone clicks. Map Pack visibility compounds: once you're in the Top 3, you keep earning calls without burning budget on ads.",
  },
  {
    question: "Am I locked into a long contract?",
    answer:
      "No. We work month-to-month after an initial onboarding period because we're judged on rankings, not paperwork. If we're not delivering movement in the first 30–45 days, we'll tell you honestly on your review call—not hide behind a 12-month tie-in.",
  },
  {
    question: 'What exactly does "Top 3" mean for my area?',
    answer:
      "It means your Google Business Profile appears in the Map Pack—the three listings with the map—when a real customer in your target area searches for a plumber (e.g. 'emergency plumber near me' or 'boiler repair [your town]'). We define the exact keywords and postcodes on the audit so there's no ambiguity: you'll know what we're aiming for before you commit.",
  },
  {
    question: "Do you work with trades other than plumbing?",
    answer:
      "No. We only work with plumbing businesses—heating engineers, bathroom fitters, drainage specialists, and general plumbers who serve a defined local area. That focus is what lets us deliver strong Map Pack results for your niche. If you're not a plumber, we're not the right fit.",
  },
  {
    question: "I've been burned by SEO agencies before—why should I trust you?",
    answer:
      "Fair question. Most agencies sell reports and backlinks; we focus only on local Map Pack rankings you can verify yourself — search 'plumber near me' on your phone in your town and see where you sit. No vanity metrics. You get a named point of contact and clear targets tied to Top 3 placement, not 'increased traffic.' If we don't think we can win in your market, we'll say so in your video.",
  },
  {
    question: "Is this black hat? Will Google suspend my profile?",
    answer:
      "Everything we do aligns with Google Business Profile guidelines: accurate categories, service areas, reviews earned properly, consistent NAP, and relevant content—not spam links or fake locations. Risky tactics get profiles suspended; we don't use them. Your reputation on Google is an asset—we treat it that way.",
  },
  {
    question: "How is this different from Checkatrade, Bark, or shared lead sites?",
    answer:
      "Shared lead platforms sell the same enquiry to several plumbers—you're racing to quote and paying per lead whether you win the job or not. Map Pack rankings send exclusive calls to your business: the customer chose you from Google and dialled your number. You're building an asset you own, not renting access to someone else's marketplace.",
  },
  {
    question: "What do I actually get when I sign up?",
    answer:
      "We record a personal video — usually 4–5 minutes — and send it straight to you. No call, no meeting. We walk through where you rank right now, show you exactly who's above you and why they're winning, and explain what's blocking your calls. You'll leave with a clear picture of what needs fixing, even if you never work with us.",
  },
  {
    question: "What if a competitor is already #1 in my town?",
    answer:
      "Someone will hold those spots—that's exactly why inaction costs you. We analyse why they're winning (reviews, categories, proximity, content) and whether the gap is closable in 90 days. Sometimes the leader is beatable quickly; sometimes we recommend a neighbouring postcode first. You'll get a realistic plan, not a promise we can't keep.",
  },
  {
    question: "What if I'm already ranking?",
    answer:
      "Good start—but most plumbers only rank in their immediate town while missing neighbouring areas where the same customers search. We expand coverage across multiple postcodes and tighten your profile so you hold Top 3 in more high-intent searches, not just one lucky keyword.",
  },
  {
    question: "Do I need hundreds of 5-star reviews first?",
    answer:
      "No. Reviews matter, but we've ranked plumbing businesses with fewer reviews than the market leader by fixing profile relevance, service-area setup, and category precision. We'll tell you if review velocity is your bottleneck and give you a simple system to earn reviews ethically—never fake or incentivised against Google's rules.",
  },
  {
    question: "Can you target multiple towns, or just one postcode?",
    answer:
      "Multiple towns are possible when competition and your operational radius support it. Each extra area adds work and may affect pricing—we scope that on the audit so you're not paying for postcodes you can't actually serve. Quality beats spraying everywhere Google won't trust.",
  },
  {
    question: "What's the deal if I don't rank in 90 days?",
    answer:
      "We keep working for free until you're in the Top 3. Simple as that. We only take clients we're confident we can rank—that's why we audit first.",
  },
  {
    question: "Do I need to do anything on my end?",
    answer:
      "Minimal. Grant access to your Google Business Profile (or we'll help you claim one), confirm your real service areas, and occasionally approve photos or answer a quick question about how you operate. No daily logins, no content calendars for you to manage—we handle the technical and optimisation work.",
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
          isOpen ? "max-h-[32rem]" : "max-h-0"
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
          Straight answers for plumbing business owners before you apply.
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
