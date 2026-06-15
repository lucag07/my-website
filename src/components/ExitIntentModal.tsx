import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X, Phone } from "lucide-react";
import { supabase } from "../lib/supabase";
import { InputField } from "./ui/InputField";

const modalSchema = z.object({
  phone_number: z.string().min(10, "Please enter a valid phone number"),
});

type ModalFormData = z.infer<typeof modalSchema>;

export function ExitIntentModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ModalFormData>({
    resolver: zodResolver(modalSchema),
    defaultValues: {
      phone_number: "",
    },
  });

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

  // Focus trapping and returning focus
  useEffect(() => {
    if (isOpen) {
      const previousActive = document.activeElement as HTMLElement;
      
      // Focus the input first
      const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable && focusable.length > 0) {
        // Focus the telephone input first
        const telInput = modalRef.current?.querySelector<HTMLInputElement>('input[type="tel"]');
        if (telInput) {
          telInput.focus();
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

  const onSubmit = async (data: ModalFormData) => {
    setSubmitError(null);
    const { error } = await supabase.from("contact_submissions").insert({
      full_name: "Exit Intent Lead",
      business_name: "Pending",
      phone_number: data.phone_number,
      trade: "Unknown",
      target_city: "Unknown",
    });

    if (error) {
      console.error("Supabase insert error:", error);
      setSubmitError("Something went wrong. Please try again.");
    } else {
      setSubmitted(true);
      setTimeout(() => {
        setIsOpen(false);
        reset();
      }, 2500);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
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
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
          aria-label="Close modal"
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
              <h3 id="modal-title" className="text-xl font-bold text-slate-900 mb-2">
                Don't Miss Out
              </h3>
              <p id="modal-desc" className="text-slate-600 text-sm">
                Leave your phone number and we'll reach out with your free local
                ranking analysis.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {submitError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm font-medium" role="alert">
                  {submitError}
                </div>
              )}

              <InputField
                label="Phone Number"
                type="tel"
                placeholder="07365519615"
                error={errors.phone_number?.message}
                {...register("phone_number")}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-amber-400 hover:bg-amber-300 disabled:bg-amber-300 text-slate-900 font-bold py-3 rounded-lg transition-all duration-200 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Call Me"}
              </button>
            </form>

            <p className="mt-3 text-center text-xs text-stone-400">
              No spam. No pressure. Just results.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

