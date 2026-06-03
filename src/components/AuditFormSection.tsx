import { useState, FormEvent } from "react";
import { CheckCircle, Check } from "lucide-react";
import { supabase } from "../lib/supabase";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { PhoneInputField } from "./phone/PhoneInput";
import {
  toE164,
  isPhonePossible,
  getPhoneValidationError,
} from "../lib/phone/validate";

const trades = ["Roofer", "Plumber", "Landscaper", "HVAC", "Other"];

export function AuditFormSection() {
  const { ref, isVisible } = useScrollReveal();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shakeField, setShakeField] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [form, setForm] = useState({
    full_name: "",
    business_name: "",
    phone_number: "",
    trade: "",
    target_city: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setShakeField(null);
  };

  const validateField = (name: string, value: string): boolean => {
    if (!value.trim()) return false;
    if (name === "phone_number") {
      return isPhonePossible(value);
    }
    return true;
  };

  const getProgress = (): number => {
    const fields = Object.keys(form);
    const filled = fields.filter((field) =>
      validateField(field, form[field as keyof typeof form])
    );
    return Math.round((filled.length / fields.length) * 100);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    for (const [key, value] of Object.entries(form)) {
      if (!validateField(key, value)) {
        setShakeField(key);
        if (key === "phone_number") {
          setPhoneError(getPhoneValidationError(value));
        }
        setTimeout(() => setShakeField(null), 500);
        return;
      }
    }

    const phoneE164 = toE164(form.phone_number);
    if (!phoneE164) {
      setShakeField("phone_number");
      setPhoneError(getPhoneValidationError(form.phone_number));
      setTimeout(() => setShakeField(null), 500);
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("contact_submissions").insert({
      full_name: form.full_name,
      business_name: form.business_name,
      phone_number: phoneE164,
      trade: form.trade,
      target_city: form.target_city,
    });

    setLoading(false);

    if (!error) {
      setSubmitted(true);
    }
  };

  const inputClasses = (fieldName: string): string => {
    const base =
      "w-full px-4 py-3 rounded-lg border bg-white text-slate-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200";
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
    return `${base} border-stone-300 focus:ring-amber-400`;
  };

  return (
    <section id="audit-form" className="bg-stone-50 py-20 md:py-28">
      <div
        ref={ref}
        className={`${isVisible ? "reveal-visible" : "reveal-base"} max-w-2xl mx-auto px-6`}
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Get Your Free Local Ranking Audit
          </h2>
          <p className="text-slate-600 leading-relaxed">
            We'll manually check where your business stands right now and show
            you the exact visibility gaps. Walk away with clear answers even if
            you never work with us.
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-stone-200 shadow-sm">
            <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              We've Got It
            </h3>
            <p className="text-slate-600 max-w-sm mx-auto">
              We'll review your local maps layout and call you within 4 hours.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                <span>Form Progress</span>
                <span>{getProgress()}%</span>
              </div>
              <div className="h-1.5 bg-stone-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 transition-all duration-300 ease-out"
                  style={{ width: `${getProgress()}%` }}
                />
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-6 md:p-8 border border-stone-200 shadow-sm space-y-5"
            >
              <div className="relative">
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="full_name"
                    required
                    value={form.full_name}
                    onChange={handleChange}
                    placeholder="John Smith"
                    className={inputClasses("full_name")}
                  />
                  {validateField("full_name", form.full_name) && (
                    <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
                  )}
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Business Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="business_name"
                    required
                    value={form.business_name}
                    onChange={handleChange}
                    placeholder="Smith Roofing LLC"
                    className={inputClasses("business_name")}
                  />
                  {validateField("business_name", form.business_name) && (
                    <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
                  )}
                </div>
              </div>

              <div className="relative">
                <label
                  htmlFor="audit-phone"
                  className="block text-sm font-semibold text-slate-700 mb-1.5"
                >
                  Phone Number
                </label>
                <PhoneInputField
                  id="audit-phone"
                  value={form.phone_number}
                  onChange={(next) => {
                    setForm({ ...form, phone_number: next });
                    setShakeField(null);
                    setPhoneError(null);
                  }}
                  error={shakeField === "phone_number" || !!phoneError}
                  shake={shakeField === "phone_number"}
                  errorMessage={phoneError}
                  showValidCheck
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Trade
                </label>
                <select
                  name="trade"
                  required
                  value={form.trade}
                  onChange={handleChange}
                  className={inputClasses("trade")}
                >
                  <option value="" disabled>
                    Select your trade
                  </option>
                  {trades.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                {validateField("trade", form.trade) && (
                  <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
                )}
              </div>

              <div className="relative">
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Target City / Area
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="target_city"
                    required
                    value={form.target_city}
                    onChange={handleChange}
                    placeholder="Edinburgh"
                    className={inputClasses("target_city")}
                  />
                  {validateField("target_city", form.target_city) && (
                    <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-400 hover:bg-amber-300 disabled:bg-amber-300 disabled:cursor-not-allowed text-slate-900 font-bold text-lg py-4 rounded-lg shadow-lg shadow-amber-400/25 transition-all duration-200 hover:shadow-amber-400/40"
              >
                {loading ? "Sending..." : "Get My Free Audit"}
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-stone-400">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>We typically respond within 4 hours</span>
              </div>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
