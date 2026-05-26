import React from "react";

const DescriptionField = ({
  label,
  name,
  value,
  placeholder = "",
  onChange,
  onBlur,
  error,
  bgColor = "#F5F5F5",
}) => {
  return (
    <div className="w-full flex flex-col gap-1 space-y-1">
      {label && (
        <label htmlFor={name} className="text-sm font-semibold leading-none">
          {label}
        </label>
      )}

      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`w-full resize-none rounded-xl p-5 text-sm outline-none placeholder:text-[var(--secondary)] min-h-[160px]
        ${error ? "border border-red-500" : ""}`}
        style={{ background: bgColor }}
      />

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default DescriptionField;
