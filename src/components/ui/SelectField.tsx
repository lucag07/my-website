import { forwardRef, SelectHTMLAttributes } from "react";

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ label, error, id, options, ...props }, ref) => {
    const selectId = id || props.name;
    const selectClasses =
      "w-full px-4 py-3 rounded-lg border bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200";
    const borderClass = error ? "border-red-500" : "border-stone-300";

    return (
      <div>
        <label
          htmlFor={selectId}
          className="block text-sm font-semibold text-slate-700 mb-1.5"
        >
          {label}
        </label>
        <select
          id={selectId}
          ref={ref}
          className={`${selectClasses} ${borderClass}`}
          {...props}
        >
          <option value="" disabled>
            Select your {label.toLowerCase()}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="mt-1.5 text-sm text-red-500 font-medium" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

SelectField.displayName = "SelectField";
