import React from "react";

const Input = ({
  label,
  name,
  value,
  placeholder = "",
  onChange,
  onBlur,
  type = "text",
  error,
  disabled = false,
  bgColor = "#F5F5F5",
}) => {
  return (
    <div className="w-full relative space-y-1">
      {label && (
        <label htmlFor={name} className="text-sm font-semibold leading-none">
          {label}
        </label>
      )}

      <input
        type={type}
        name={name}
        id={name}
        disabled={disabled}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`w-full h-[48px] rounded-[12px] text-sm px-4 
        focus:border-[var(--primary)] placeholder:text-[var(--secondary)]
        ${error ? "border border-red-500" : ""}`}
        style={{
          background: bgColor,
        }}
      />

      {/* Error message */}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Input;
