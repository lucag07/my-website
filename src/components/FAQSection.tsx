import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const faqs = [
  {
    question: "How long until I see results?",
    answer:
      "Google Maps rankings typically start moving within 30–45 days. Businesses following our process typically hit the Top 3 between day 60 and day 90. We don't promise overnight wins because that's not how Google's local algorithm works. If you're not in the Top 3 within 90 days, we keep working for free until you are.",
  },
  {
    question: "How much does this cost—and is it worth it vs Google Ads?",
    answer:
      "Pricing depends on your local competition and how many areas you want to rank in. After you watch your free video, if you want to move forward we'll give you a straight number — no vague 'packages.' One extra booked job a month pays for this service; unlike Google Ads, you're not paying for every visitor who lands on your profile. Once you're in the Top 3 on Google Maps, the calls keep coming — no ad budget needed.",
  },
  {
    question: "Am I locked into a long contract?",
    answer:
      "We start with a 3-month contract — that's the time needed to get you into the Top 3. After that it's month-to-month and you can leave anytime. If by days 30–45 we can see it's not working or won't work in your area, we'll tell you straight — we'd rather say that early than drag it out.",
  },
  {
    question: 'What exactly does "Top 3" mean for my area?',
    answer:
      "When someone searches 'locksmith near me' or 'emergency locksmith [town]' on Google, they see a map with three businesses listed underneath it. Those are the Top 3 — and they get almost all the calls. We get your business into those three spots for the searches that matter in your area. Before you commit, we'll tell you exactly which searches we're targeting so you know precisely what you're paying for.",
  },
  {
    question: "Do you work with trades other than locksmiths?",
    answer:
      "No. We only work with locksmith businesses—auto locksmiths, emergency locksmiths, safe engineers, and general locksmiths who serve a defined local area. That focus is what lets us deliver strong Map Pack results for your niche. If you're not a locksmith, we're not the right fit.",
  },
  {
    question: "I've been burned by SEO agencies before—why should I trust you?",
    answer:
      "Fair question. Most agencies send you monthly reports full of numbers that don't mean anything — impressions, clicks, traffic. We only care about one thing: are you in the Top 3 on Google Maps? You can check that yourself right now by searching 'locksmith near me' on your phone. You either are or you aren't. You'll have one person to contact, clear targets, and if we don't think we can win in your area, we'll say so in your free video before you spend a penny.",
  },
  {
    question: "Is this black hat? Will Google suspend my profile?",
    answer:
      "Everything we do aligns with Google Business Profile guidelines: accurate categories, service areas, reviews earned properly, consistent NAP, and relevant content—not spam links or fake locations. Risky tactics get profiles suspended; we don't use them. Your reputation on Google is an asset—we treat it that way.",
  },
  {
    question: "How is this different from Checkatrade, Bark, or shared lead sites?",
    answer:
      "Shared lead platforms sell the same enquiry to several locksmiths—you're racing to quote and paying per lead whether you win the job or not. Map Pack rankings send exclusive calls to your business: the customer chose you from Google and dialled your number. You're building an asset you own, not renting access to someone else's marketplace.",
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
      "Good start—but most locksmiths only rank in their immediate town while missing neighbouring areas where the same customers search. We expand coverage across multiple postcodes and tighten your profile so you hold Top 3 in more high-intent searches, not just one lucky keyword.",
  },
  {
    question: "Do I need hundreds of 5-star reviews first?",
    answer:
      "No. Reviews help, but Google ranks profiles based on a lot more than just review count — how complete your profile is, how relevant your categories are, and how well your service areas are set up all play a big part. A well-optimised profile can outrank a competitor with more reviews. If getting more reviews is what's holding you back, we'll tell you and give you a straightforward way to get them from real customers.",
  },
  {
    question: "Can you target multiple towns, or just one postcode?",
    answer:
      "Yes. Most locksmiths want to rank in more than one town and that's completely doable. The more areas you want to rank in, the more work involved, which may affect pricing — we'll go through that with you after your free video. One thing we won't do is target areas you don't actually cover. Google can tell, and it works against you.",
  },
  {
    question: "What's the deal if I don't rank in 90 days?",
    answer:
      "We keep working for free until you're in the Top 3. Simple as that. We only take clients we're confident we can rank — that's why we do a free video check first.",
  },
  {
    question: "Will you work with other locksmiths in my area?",
    answer:
      "No. Once we take you on, we won't work with any competing locksmith in your area. That would be pointless — we'd just be fighting against ourselves. You get exclusivity for your area for as long as we're working together.",
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
          Straight answers for locksmith business owners before you apply.
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
