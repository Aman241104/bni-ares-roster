type BaseProps = {
  label: string;
  name: string;
  defaultValue?: string | null;
  required?: boolean;
  className?: string;
};

const inputClass =
  "w-full rounded-lg border border-zinc-200 px-3.5 py-2.5 text-sm outline-none ring-brand-500 focus:ring-2";

export function TextField({
  label,
  name,
  defaultValue,
  required,
  type = "text",
  className = "",
}: BaseProps & { type?: string }) {
  return (
    <div className={className}>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-ink">
        {label} {required && <span className="text-brand-500">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue ?? ""}
        className={inputClass}
      />
    </div>
  );
}

export function TextAreaField({
  label,
  name,
  defaultValue,
  required,
  rows = 4,
  className = "",
}: BaseProps & { rows?: number }) {
  return (
    <div className={className}>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-ink">
        {label} {required && <span className="text-brand-500">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        required={required}
        rows={rows}
        defaultValue={defaultValue ?? ""}
        className={inputClass}
      />
    </div>
  );
}

export function SelectField({
  label,
  name,
  defaultValue,
  required,
  options,
  className = "",
}: BaseProps & { options: { value: string; label: string }[] }) {
  return (
    <div className={className}>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-ink">
        {label} {required && <span className="text-brand-500">*</span>}
      </label>
      <select id={name} name={name} required={required} defaultValue={defaultValue ?? ""} className={inputClass}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
