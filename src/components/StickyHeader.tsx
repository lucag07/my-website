import { useState, useEffect } from "react";
import { Phone, Mail } from "lucide-react";
import {
  BUSINESS_PHONE_DISPLAY,
  BUSINESS_PHONE_TEL,
  BUSINESS_EMAIL,
} from "../content/contact";
import { CTA_FREE_AUDIT_SHORT } from "../content/site";

interface StickyHeaderProps {
  phoneNumber?: string;
}

export function StickyHeader({
  phoneNumber = BUSINESS_PHONE_DISPLAY,
}: StickyHeaderProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.8;
      setIsVisible(window.scrollY > heroHeight);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isVisible
          ? "translate-y-0 opacity-100 backdrop-blur-md"
          : "-translate-y-full opacity-0"
      }`}
    >
      <div className="w-full border-b border-slate-800 bg-slate-900/95" style={{ backdropFilter: "blur(12px)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-24 flex items-center justify-between">
          <div className="flex items-center">
            <img src="/logo.png" alt="Tasklumas Logo" className="h-16 w-auto object-contain bg-white p-1 rounded" />
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`mailto:${BUSINESS_EMAIL}`}
              className="hidden md:flex items-center gap-2 text-slate-300 hover:text-white transition-colors mr-2"
            >
              <Mail className="w-4 h-4" />
              <span className="text-sm font-medium hidden lg:inline">
                {BUSINESS_EMAIL}
              </span>
            </a>
            <a
              href={`tel:${BUSINESS_PHONE_TEL.replace(/[^0-9+]/g, "")}`}
              className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm font-medium hidden sm:inline">
                {phoneNumber}
              </span>
            </a>
            <a
              href="#audit-form"
              className="bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-sm px-4 py-2 rounded-lg transition-all duration-200"
            >
              {CTA_FREE_AUDIT_SHORT}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
