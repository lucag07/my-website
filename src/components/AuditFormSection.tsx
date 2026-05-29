import { useState, FormEvent } from "react";
import { CheckCircle } from "lucide-react";
import { supabase } from "../lib/supabase";
import { useScrollReveal } from "../hooks/useScrollReveal";

const trades = ["Roofer", "Plumber", "Landscaper", "HVAC", "Other"];

export function AuditFormSection() {
  const { ref, isVisible } = useScrollReveal();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
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
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("contact_submissions").insert({
      full_name: form.full_name,
      business_name: form.business_name,
      phone_number: form.phone_number,
      trade: form.trade,
      target_city: form.target_city,
    });

    setLoading(false);

    if (!error) {
      setSubmitted(true);
    }
  };

  const inputClasses =
    "w-full px-4 py-3 rounded-lg border border-stone-300 bg-white text-slate-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200";

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
              We'll review your local maps layout and call you within 24 hours.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl p-6 md:p-8 border border-stone-200 shadow-sm space-y-5"
          >
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                name="full_name"
                required
                value={form.full_name}
                onChange={handleChange}
                placeholder="John Smith"
                className={inputClasses}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Business Name
              </label>
              <input
                type="text"
                name="business_name"
                required
                value={form.business_name}
                onChange={handleChange}
                placeholder="Smith Roofing LLC"
                className={inputClasses}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone_number"
                required
                value={form.phone_number}
                onChange={handleChange}
                placeholder="(555) 123-4567"
                className={inputClasses}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Trade
              </label>
              <select
                name="trade"
                required
                value={form.trade}
                onChange={handleChange}
                className={inputClasses}
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
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Target City / Area
              </label>
              <input
                type="text"
                name="target_city"
                required
                value={form.target_city}
                onChange={handleChange}
                placeholder="Dallas, TX"
                className={inputClasses}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-400 hover:bg-amber-300 disabled:bg-amber-300 disabled:cursor-not-allowed text-slate-900 font-bold text-lg py-4 rounded-lg shadow-lg shadow-amber-400/25 transition-all duration-200 hover:shadow-amber-400/40"
            >
              {loading ? "Sending..." : "Get My Free Audit"}
            </button>

            <p className="text-center text-xs text-stone-400">
              No spam. No sales pitch. Just direct answers.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
