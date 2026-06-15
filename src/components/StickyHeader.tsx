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
  return (
    <header className="fixed top-0 left-0 right-0 z-50 translate-y-0 opacity-100 backdrop-blur-md transition-all duration-300">
      <div className="w-full border-b border-slate-800 bg-slate-900/95" style={{ backdropFilter: "blur(12px)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Tasklumas"
              className="h-12 w-auto object-contain rounded-lg overflow-hidden"
            />
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
