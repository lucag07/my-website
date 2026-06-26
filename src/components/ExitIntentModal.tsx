import { useState, useEffect, useRef } from "react";
import { X, Phone, Mail } from "lucide-react";
import { supabase } from "../lib/supabase";
import {
  BUSINESS_PHONE_DISPLAY,
  BUSINESS_EMAIL,
  FORM_EMAIL_PLACEHOLDER,
} from "../content/contact";
import {
  isValidEmail,
  normalizeEmail,
  getEmailValidationError,
} from "../lib/email/validate";


export function ExitIntentModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [goal, setGoal] = useState("");
  const [website, setWebsite] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [shake, setShake] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

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

  // Handle closing with Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const normalizedEmail = normalizeEmail(email);
    if (!isValidEmail(normalizedEmail)) {
      setEmailError(getEmailValidationError(email));
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    if (!goal.trim()) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    if (!website.trim()) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("leads").insert({
      full_name: null,
      email: normalizedEmail,
      website: website,
      main_goal: goal,
      source: "popup",
    });

    setLoading(false);

    if (error) {
      console.error("Supabase insert error:", error);
      setSubmitError("Something went wrong. Please try again.");
    } else {
      setSubmitted(true);
      setTimeout(() => {
        setIsOpen(false);
        setEmail("");
        setGoal("");
        setWebsite("");
        setSubmitted(false);
      }, 2500);
    }
  };

  // Focus trapping and returning focus
  useEffect(() => {
    if (isOpen) {
      const previousActive = document.activeElement as HTMLElement;
      
      // Focus the input first
      const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable && focusable.length > 0) {
        // Focus the first email input
        const emailInput = modalRef.current?.querySelector<HTMLInputElement>('input[type="email"]');
        if (emailInput) {
          emailInput.focus();
        } else {
          focusable[0].focus();
        }
      }

      const handleFocusTrap = (e: KeyboardEvent) => {
        if (e.key !== "Tab") return;
        if (!modalRef.current) return;

        const elements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (elements.length === 0) return;

        const first = elements[0];
        const last = elements[elements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            last.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === last) {
            first.focus();
            e.preventDefault();
          }
        }
      };

      window.addEventListener("keydown", handleFocusTrap);
      return () => {
        window.removeEventListener("keydown", handleFocusTrap);
        if (previousActive) {
          previousActive.focus();
        }
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-intent-title"
      aria-describedby="exit-intent-desc"
    >
      <div
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />
      <div 
        ref={modalRef}
        className="relative bg-white rounded-2xl max-w-md w-full p-6 md:p-8 shadow-2xl transform transition-all"
      >
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
              Got it! We'll be in touch soon.
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
              <p id="exit-intent-desc" className="text-slate-600 text-sm">
                Leave your details and we'll send you a free personal video showing exactly where you rank and why.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {submitError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm font-medium" role="alert">
                  {submitError}
                </div>
              )}

              <div className="text-left">
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError(null);
                  }}
                  placeholder={FORM_EMAIL_PLACEHOLDER}
                  className={`w-full px-4 py-3 rounded-lg border bg-white text-slate-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${
                    emailError ? "border-red-400 focus:ring-red-400" : "border-stone-300 focus:ring-amber-400"
                  } ${shake && emailError ? "animate-shake" : ""}`}
                  required
                />
                {emailError && <p className="mt-1 text-xs text-red-500">{emailError}</p>}
              </div>

              <div className="text-left">
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Your Website</label>
                <input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://www.example.com"
                  required
                  className={`w-full px-4 py-3 rounded-lg border border-stone-300 bg-white text-slate-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200 ${shake && !website.trim() ? "animate-shake border-red-400 focus:ring-red-400" : ""}`}
                />
              </div>

              <div className="text-left">
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">What's your main goal?</label>
                <textarea
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="What's your main goal? (e.g. more emergency calls)"
                  required
                  rows={2}
                  className={`w-full px-4 py-3 rounded-lg border border-stone-300 bg-white text-slate-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200 resize-none ${shake && !goal.trim() ? "animate-shake border-red-400 focus:ring-red-400" : ""}`}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-400 hover:bg-amber-300 disabled:bg-amber-300 text-slate-900 font-bold py-3 rounded-lg transition-all duration-200 disabled:cursor-not-allowed mt-2"
              >
                {loading ? "Sending..." : "Send Me the Free Video"}
              </button>
            </form>

            <div className="mt-4 flex items-center gap-3">
              <div className="flex-1 h-px bg-stone-200" />
              <span className="text-xs text-stone-400">or reach out directly</span>
              <div className="flex-1 h-px bg-stone-200" />
            </div>

            <div className="mt-3 flex flex-col sm:flex-row gap-2">
              <a
                href={`tel:${BUSINESS_PHONE_DISPLAY.replace(/[^0-9+]/g, "")}`}
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border border-stone-200 text-slate-600 hover:text-slate-900 hover:border-stone-300 transition-colors text-sm font-medium"
              >
                <Phone className="w-4 h-4" />
                {BUSINESS_PHONE_DISPLAY}
              </a>
              <a
                href={`mailto:${BUSINESS_EMAIL}`}
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border border-stone-200 text-slate-600 hover:text-slate-900 hover:border-stone-300 transition-colors text-sm font-medium"
              >
                <Mail className="w-4 h-4" />
                Email us
              </a>
            </div>

            <p className="mt-3 text-center text-xs text-stone-400">
              No spam. No pressure. Just results.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

