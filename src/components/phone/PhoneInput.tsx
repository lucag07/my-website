import { useId } from "react";
import { Check } from "lucide-react";
import PhoneInputWithCountry from "react-phone-number-input";
import en from "react-phone-number-input/locale/en.json";
import type { Country, Value } from "react-phone-number-input";
import { FORM_PHONE_PLACEHOLDER } from "../../content/contact";
import { isPhonePossible, getPhoneValidationError } from "../../lib/phone/validate";
import { COUNTRY_OPTIONS_ORDER } from "../../lib/phone/countries";
import { cn } from "../../lib/cn";
import { SearchableCountrySelect } from "./SearchableCountrySelect";
import "react-phone-number-input/style.css";
import "./phone-input.css";

export interface PhoneInputFieldProps {
  value: string;
  onChange: (value: string) => void;
  defaultCountry?: Country;
  disabled?: boolean;
  error?: boolean;
  shake?: boolean;
  showValidCheck?: boolean;
  compact?: boolean;
  id?: string;
  helperText?: string;
  errorMessage?: string | null;
  onBlur?: () => void;
}

export function PhoneInputField({
  value,
  onChange,
  defaultCountry = "GB",
  disabled,
  error,
  shake,
  showValidCheck = true,
  compact = false,
  id: idProp,
  helperText = "Your mobile number — we'll only use it to contact you about your free ranking video.",
  errorMessage,
  onBlur,
}: PhoneInputFieldProps) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const helperId = `${id}-helper`;
  const errorId = `${id}-error`;

  const isValid = isPhonePossible(value);
  const displayError =
    errorMessage ?? (error && value ? getPhoneValidationError(value) : null);

  const handleChange = (next: Value) => {
    onChange(next ?? "");
  };

  return (
    <div>
      <div
        className={cn(
          "relative phone-input-field",
          compact && "phone-input-field--compact",
          error && "phone-input-field--error",
          isValid && !error && "phone-input-field--valid",
          shake && "animate-shake"
        )}
      >
        <PhoneInputWithCountry
          id={id}
          international
          defaultCountry={defaultCountry}
          countryCallingCodeEditable={false}
          limitMaxLength
          labels={en}
          countryOptionsOrder={COUNTRY_OPTIONS_ORDER}
          countrySelectComponent={SearchableCountrySelect}
          countrySelectProps={{ unicodeFlags: true }}
          value={(value || undefined) as Value}
          onChange={handleChange}
          onBlur={onBlur}
          disabled={disabled}
          placeholder={FORM_PHONE_PLACEHOLDER}
          numberInputProps={{
            inputMode: "tel",
            autoComplete: "tel-national",
            "aria-describedby": displayError
              ? `${helperId} ${errorId}`
              : helperId,
          }}
        />
        {showValidCheck && isValid && !error && (
          <Check
            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500 pointer-events-none z-10"
            aria-hidden
          />
        )}
      </div>

      {helperText && !displayError && (
        <p id={helperId} className="mt-1.5 text-xs text-stone-500">
          {helperText}
        </p>
      )}

      {displayError && (
        <p id={errorId} className="mt-1.5 text-xs text-red-600" role="alert">
          {displayError}
        </p>
      )}
    </div>
  );
}

