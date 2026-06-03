import { useState, useEffect } from "react";
import { X, Phone } from "lucide-react";
import { supabase } from "../lib/supabase";
import { BUSINESS_PHONE_DISPLAY } from "../content/contact";
import { PhoneInputField } from "./phone/PhoneInput";
import {
  toE164,
  getPhoneValidationError,
  isPhonePossible,
} from "../lib/phone/validate";

export function ExitIntentModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [shake, setShake] = useState(false);
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

    if (!isPhonePossible(phone)) {
      setPhoneError(getPhoneValidationError(phone));
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    const phoneE164 = toE164(phone);
    if (!phoneE164) {
      setPhoneError(getPhoneValidationError(phone));
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("contact_submissions").insert({
      full_name: "Exit Intent Lead",
      business_name: "Pending",
      phone_number: phoneE164,
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-intent-title"
    >
      <div
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />
      <div className="relative bg-white rounded-2xl max-w-md w-full p-6 md:p-8 shadow-2xl transform transition-all">
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
          aria-label="Close dialog"
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
              <h3
                id="exit-intent-title"
                className="text-xl font-bold text-slate-900 mb-2"
              >
                Don't Miss Out
              </h3>
              <p className="text-slate-600 text-sm">
                Leave your phone number and we'll reach out with your free local
                ranking analysis.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <PhoneInputField
                id="exit-intent-phone"
                value={phone}
                onChange={(next) => {
                  setPhone(next);
                  setPhoneError(null);
                }}
                compact
                error={!!phoneError}
                shake={shake}
                errorMessage={phoneError}
                showValidCheck={false}
                helperText="Include your mobile — country code is selected on the left."
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-400 hover:bg-amber-300 disabled:bg-amber-300 text-slate-900 font-bold py-3 rounded-lg transition-all duration-200"
              >
                {loading ? "Sending..." : "Call Me"}
              </button>
            </form>

            <p className="mt-4 text-center text-xs text-stone-400">
              Or call us directly:{" "}
              <a
                href={`tel:${BUSINESS_PHONE_DISPLAY.replace(/[^0-9+]/g, "")}`}
                className="font-semibold text-slate-600 hover:text-slate-900"
              >
                {BUSINESS_PHONE_DISPLAY}
              </a>
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
