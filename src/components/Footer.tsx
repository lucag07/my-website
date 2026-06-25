import { Phone, Mail, MapPin } from "lucide-react";
import {
  BUSINESS_PHONE_DISPLAY,
  BUSINESS_PHONE_TEL,
  BUSINESS_EMAIL,
} from "../content/contact";

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-10">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          {/* Brand + description */}
          <div>
            <p className="text-white font-bold text-lg">Tasklumas</p>
            <p className="text-slate-400 text-sm mt-1 max-w-xs leading-relaxed">
              Google Maps ranking for roofer businesses across Scotland and the UK.
            </p>
            <p className="text-slate-500 text-xs mt-3">
              Founded by{" "}
              <span className="text-slate-300 font-medium">Luca Gasparini</span>
              {" "}— Local Search Specialist
            </p>
          </div>

          {/* NAP */}
          <address className="not-italic flex flex-col gap-2 text-sm text-slate-400">
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 shrink-0 text-slate-500" />
              Dundee, Scotland
            </span>
            <a
              href={`tel:${BUSINESS_PHONE_TEL}`}
              className="flex items-center gap-2 hover:text-slate-200 transition-colors"
            >
              <Phone className="w-4 h-4 shrink-0 text-slate-500" />
              {BUSINESS_PHONE_DISPLAY}
            </a>
            <a
              href={`mailto:${BUSINESS_EMAIL}`}
              className="flex items-center gap-2 hover:text-slate-200 transition-colors"
            >
              <Mail className="w-4 h-4 shrink-0 text-slate-500" />
              {BUSINESS_EMAIL}
            </a>
          </address>

        </div>

        <div className="mt-8 pt-6 border-t border-slate-800 text-xs text-slate-600 text-center">
          © {new Date().getFullYear()} Tasklumas. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
