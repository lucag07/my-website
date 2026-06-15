import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import getUnicodeFlagIcon from "country-flag-icons/unicode";
import { getCountryCallingCode } from "libphonenumber-js";
import type { Country } from "react-phone-number-input";
import { cn } from "../../lib/cn";

interface CountryOption {
  value?: Country;
  label: string;
  divider?: boolean;
}

interface SearchableCountrySelectProps {
  value?: Country;
  onChange: (country?: Country) => void;
  options: CountryOption[];
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
  unicodeFlags?: boolean;
}

function normalizeSearch(text: string): string {
  return text.toLowerCase().replace(/\s+/g, "");
}

function optionMatchesQuery(option: CountryOption, query: string): boolean {
  if (!option.value || option.divider) return false;
  const q = normalizeSearch(query);
  if (!q) return true;

  const code = option.value.toLowerCase();
  const label = normalizeSearch(option.label);
  let callingCode = "";
  try {
    callingCode = getCountryCallingCode(option.value);
  } catch {
    /* unsupported */
  }

  return (
    code.includes(q) ||
    label.includes(q) ||
    callingCode.includes(q.replace(/^\+/, "")) ||
    `+${callingCode}`.includes(q)
  );
}

export function SearchableCountrySelect({
  value,
  onChange,
  options,
  disabled,
  readOnly,
  className,
  unicodeFlags = true,
}: SearchableCountrySelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const selected = useMemo(
    () => options.find((o) => !o.divider && o.value === value),
    [options, value]
  );

  const filteredOptions = useMemo(() => {
    if (!query.trim()) return options;
    return options.filter(
      (o) => o.divider || optionMatchesQuery(o, query)
    );
  }, [options, query]);

  const callingCode = value
    ? (() => {
        try {
          return `+${getCountryCallingCode(value)}`;
        } catch {
          return "";
        }
      })()
    : "";

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        close();
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, close]);

  useEffect(() => {
    if (open) {
      searchRef.current?.focus();
    }
  }, [open]);

  const handleSelect = (country?: Country) => {
    onChange(country);
    close();
  };

  const isDisabled = disabled || readOnly;

  return (
    <div ref={containerRef} className="PhoneInputCountry relative">
      <button
        type="button"
        disabled={isDisabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={
          selected
            ? `Country: ${selected.label}, ${callingCode}`
            : "Select country"
        }
        className={cn(
          "PhoneInputCountrySelect flex items-center gap-1 rounded-l-lg border-0 bg-transparent px-2 py-0 text-sm font-medium text-slate-700 hover:bg-stone-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400",
          className
        )}
        onClick={() => !isDisabled && setOpen((prev) => !prev)}
      >
        {value && unicodeFlags && (
          <span className="PhoneInputCountryIconUnicode text-lg leading-none">
            {getUnicodeFlagIcon(value)}
          </span>
        )}
        <span className="whitespace-nowrap tabular-nums">{callingCode}</span>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-stone-400 transition-transform",
            open && "rotate-180"
          )}
          aria-hidden
        />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Country code"
          className="absolute left-0 top-full z-50 mt-1 w-72 max-w-[calc(100vw-2rem)] rounded-lg border border-stone-200 bg-white shadow-lg"
        >
          <div className="border-b border-stone-100 p-2">
            <input
              ref={searchRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search country or code…"
              className="w-full rounded-md border border-stone-200 px-3 py-2 text-sm text-slate-900 placeholder-stone-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-amber-400"
              aria-label="Search countries"
            />
          </div>
          <ul className="max-h-56 overflow-y-auto py-1">
            {filteredOptions.map((option) => {
              if (option.divider) {
                return (
                  <li
                    key={`divider-${option.label}`}
                    className="my-1 border-t border-stone-100"
                    aria-hidden
                  />
                );
              }

              const code = option.value
                ? `+${getCountryCallingCode(option.value)}`
                : "";

              return (
                <li key={option.value ?? "intl"} role="option">
                  <button
                    type="button"
                    className={cn(
                      "flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-amber-50",
                      option.value === value && "bg-amber-50 font-medium"
                    )}
                    onClick={() => handleSelect(option.value)}
                  >
                    {option.value && unicodeFlags && (
                      <span className="text-lg leading-none">
                        {getUnicodeFlagIcon(option.value)}
                      </span>
                    )}
                    <span className="flex-1 truncate">{option.label}</span>
                    <span className="shrink-0 text-stone-500 tabular-nums">
                      {code}
                    </span>
                  </button>
                </li>
              );
            })}
            {!filteredOptions.some((o) => !o.divider) && (
              <li className="px-3 py-4 text-center text-sm text-stone-500">
                No countries found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
