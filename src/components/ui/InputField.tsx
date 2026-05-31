import { forwardRef, InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, id, ...props }, ref) => {
    const inputId = id || props.name;
    const inputClasses =
      "w-full px-4 py-3 rounded-lg border bg-white text-slate-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200";
    const borderClass = error ? "border-red-500" : "border-stone-300";

    return (
      <div>
        <label
          htmlFor={inputId}
          className="block text-sm font-semibold text-slate-700 mb-1.5"
        >
          {label}
        </label>
        <input
          id={inputId}
          ref={ref}
          className={`${inputClasses} ${borderClass}`}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-sm text-red-500 font-medium" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";
