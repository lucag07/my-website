import { useState, useEffect } from "react";
import { X, Phone } from "lucide-react";
import { supabase } from "../lib/supabase";

const PHONE_NUMBER = "+44 7442 116785";

export function ExitIntentModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let scrollUpCount = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingUp = currentScrollY < lastScrollY;
      const scrolledPastHero = currentScrollY > window.innerHeight * 0.8;

      if (scrollingUp && scrolledPastHero && !hasShown) {
        scrollUpCount++;
        if (scrollUpCount >= 3) {
          setIsOpen(true);
          setHasShown(true);
        }
      } else {
        scrollUpCount = 0;
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasShown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;

    setLoading(true);
    const { error } = await supabase.from("contact_submissions").insert({
      full_name: "Exit Intent Lead",
      business_name: "Pending",
      phone_number: phone,
      trade: "Unknown",
      target_city: "Unknown",
    });

    setLoading(false);
    if (!error) {
      setSubmitted(true);
      setTimeout(() => setIsOpen(false), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />
      <div className="relative bg-white rounded-2xl max-w-md w-full p-6 md:p-8 shadow-2xl transform transition-all">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-3">
              <Phone className="w-6 h-6 text-emerald-600" />
            </div>
            <p className="text-slate-900 font-semibold text-lg">
              Got it! We'll call you soon.
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-3">
                <Phone className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Don't Miss Out
              </h3>
              <p className="text-slate-600 text-sm">
                Leave your phone number and we'll reach out with your free local
                ranking analysis.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="07442 116785"
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 bg-white text-slate-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-400 hover:bg-amber-300 disabled:bg-amber-300 text-slate-900 font-bold py-3 rounded-lg transition-all duration-200"
              >
                {loading ? "Sending..." : "Call Me"}
              </button>
            </form>

            <p className="mt-4 text-center text-xs text-stone-400">
              Or call us directly: <span className="font-semibold text-slate-600">{PHONE_NUMBER}</span>
            </p>
            <p className="mt-1 text-center text-xs text-stone-400">
              No spam. No pressure. Just results.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
