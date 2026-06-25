import { useState, FormEvent } from "react";
import { CheckCircle } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { supabase } from "../lib/supabase";
import { isValidEmail, normalizeEmail, getEmailValidationError } from "../lib/email/validate";
import { FORM_EMAIL_PLACEHOLDER } from "../content/contact";

export function HeroSection() {
  const { ref, isVisible } = useScrollReveal();
  
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shakeField, setShakeField] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    goal: "",
    website: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setShakeField(null);
    if (e.target.name === "email") {
      setEmailError(null);
    }
  };

  const validateField = (name: string, value: string): boolean => {
    if (!value.trim()) return false;
    if (name === "email") {
      return isValidEmail(value);
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    for (const [key, value] of Object.entries(form)) {
      if (!validateField(key, value)) {
        setShakeField(key);
        if (key === "email") {
          setEmailError(getEmailValidationError(value));
        }
        setTimeout(() => setShakeField(null), 500);
        return;
      }
    }

    const email = normalizeEmail(form.email);
    if (!isValidEmail(email)) {
      setShakeField("email");
      setEmailError(getEmailValidationError(form.email));
      setTimeout(() => setShakeField(null), 500);
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("contact_submissions").insert({
      full_name: form.full_name,
      business_name: "Pending",
      phone_number: "Not provided",
      email,
      target_city: form.goal,
      website: form.website,
    });

    setLoading(false);

    if (!error) {
      setSubmitted(true);
    }
  };

  const inputClasses = (fieldName: string): string => {
    const base =
      "w-full px-4 py-3 rounded-lg border bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200";
    const isValid = validateField(
      fieldName,
      form[fieldName as keyof typeof form]
    );
    const shake = shakeField === fieldName ? "animate-shake" : "";

    if (shakeField === fieldName) {
      return `${base} border-red-400 ${shake}`;
    }
    if (isValid) {
      return `${base} border-emerald-400 focus:ring-emerald-400`;
    }
    return `${base} border-slate-700 focus:ring-amber-400`;
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-slate-900 overflow-hidden pt-24 pb-12">
      <div
        ref={ref}
        className={`${isVisible ? "reveal-visible" : "reveal-base"} max-w-5xl mx-auto px-6 py-12 text-center w-full`}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
          Top 3 on Google Maps for Roofers
          <br />
          <span className="text-amber-400">in Your Area.</span>
        </h1>

        <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
          You do what you do best and we handle the marketing. Together we'll scale your business to the next level.
        </p>

        <p className="mt-3 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
          We get your roofer business into the Top 3 in 90 days.
          If you're not there by then, we keep working for free until you are.
        </p>

        <div id="audit-form" className="max-w-md mx-auto text-left relative z-10 scroll-mt-24">
          {submitted ? (
            <div className="text-center py-10 bg-slate-800/50 rounded-2xl border border-slate-700">
              <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">
                You're on the list
              </h3>
              <p className="text-slate-300">
                We'll record your personal ranking video and send it to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-slate-800/50 p-6 md:p-8 rounded-2xl border border-slate-700 backdrop-blur-sm space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-1.5">Your Name</label>
                <input
                  type="text"
                  name="full_name"
                  required
                  value={form.full_name}
                  onChange={handleChange}
                  placeholder="John Smith"
                  className={inputClasses("full_name")}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-1.5">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder={FORM_EMAIL_PLACEHOLDER}
                  className={inputClasses("email")}
                />
                {emailError && <p className="mt-1 text-xs text-red-400">{emailError}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-1.5">Your Website</label>
                <input
                  type="url"
                  name="website"
                  required
                  value={form.website}
                  onChange={handleChange}
                  placeholder="https://www.example.com"
                  className={inputClasses("website")}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-1.5">What's your main goal?</label>
                <textarea
                  name="goal"
                  required
                  rows={2}
                  value={form.goal}
                  onChange={handleChange}
                  placeholder="e.g., More emergency calls, better rankings..."
                  className={`${inputClasses("goal")} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 bg-amber-400 hover:bg-amber-300 disabled:bg-amber-300 disabled:cursor-not-allowed text-slate-900 font-bold text-lg py-4 rounded-lg shadow-lg shadow-amber-400/25 transition-all duration-200"
              >
                {loading ? "Sending..." : "Get Your Free Video"}
              </button>
            </form>
          )}
        </div>

      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-900/80 to-transparent pointer-events-none" />
    </section>
  );
}
