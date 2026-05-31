import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CheckCircle } from "lucide-react";
import { supabase } from "../lib/supabase";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { InputField } from "./ui/InputField";
import { SelectField } from "./ui/SelectField";

const trades = [
  { value: "Roofer", label: "Roofer" },
  { value: "Plumber", label: "Plumber" },
  { value: "Landscaper", label: "Landscaper" },
  { value: "HVAC", label: "HVAC" },
  { value: "Other", label: "Other" },
];

const formSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  business_name: z.string().min(2, "Business name must be at least 2 characters"),
  phone_number: z.string().min(10, "Please enter a valid phone number"),
  trade: z.string().min(1, "Please select a trade"),
  target_city: z.string().min(2, "City must be at least 2 characters"),
});

type FormData = z.infer<typeof formSchema>;

export function AuditFormSection() {
  const { ref, isVisible } = useScrollReveal();
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      business_name: "",
      phone_number: "",
      trade: "",
      target_city: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setSubmitError(null);
    
    const { error } = await supabase.from("contact_submissions").insert({
      full_name: data.full_name,
      business_name: data.business_name,
      phone_number: data.phone_number,
      trade: data.trade,
      target_city: data.target_city,
    });

    if (error) {
      console.error("Supabase insert error:", error);
      setSubmitError("Something went wrong. Please try again or contact us directly.");
    } else {
      setSubmitted(true);
    }
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
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-2xl p-6 md:p-8 border border-stone-200 shadow-sm space-y-5"
          >
            {submitError && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm font-medium" role="alert">
                {submitError}
              </div>
            )}
            
            <InputField
              label="Full Name"
              type="text"
              placeholder="John Smith"
              error={errors.full_name?.message}
              {...register("full_name")}
            />

            <InputField
              label="Business Name"
              type="text"
              placeholder="Smith Roofing LLC"
              error={errors.business_name?.message}
              {...register("business_name")}
            />

            <InputField
              label="Phone Number"
              type="tel"
              placeholder="07365519615"
              error={errors.phone_number?.message}
              {...register("phone_number")}
            />

            <SelectField
              label="Trade"
              options={trades}
              error={errors.trade?.message}
              {...register("trade")}
            />

            <InputField
              label="Target City / Area"
              type="text"
              placeholder="Dallas, TX"
              error={errors.target_city?.message}
              {...register("target_city")}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-amber-400 hover:bg-amber-300 disabled:bg-amber-300 disabled:cursor-not-allowed text-slate-900 font-bold text-lg py-4 rounded-lg shadow-lg shadow-amber-400/25 transition-all duration-200 hover:shadow-amber-400/40"
            >
              {isSubmitting ? "Sending..." : "Get My Free Audit"}
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
