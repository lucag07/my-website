import { useState, useEffect } from "react";
import { Phone, MapPin } from "lucide-react";

interface StickyHeaderProps {
  phoneNumber?: string;
}

export function StickyHeader({ phoneNumber = "(555) 000-0000" }: StickyHeaderProps) {
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
      <div className="w-full" style={{ backdropFilter: "blur(12px)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between border-b border-slate-800 bg-slate-900/95">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-slate-900" strokeWidth={2.5} />
            </div>
            <span className="text-white font-bold text-sm hidden sm:inline">
              LocalRank
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${phoneNumber.replace(/[^0-9]/g, "")}`}
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
              Get Free Audit
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
