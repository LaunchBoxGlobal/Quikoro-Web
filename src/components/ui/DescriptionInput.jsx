import React from "react";

const DescriptionInput = ({
  label,
  name,
  value,
  placeholder = "",
  onChange,
  onBlur,
  error,
}) => {
  return (
    <div className="w-full relative space-y-1">
      {label && (
        <label htmlFor={name} className="text-sm font-semibold leading-none">
          {label}
        </label>
      )}

      <textarea
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        rows={5}
        placeholder={placeholder}
        className={`w-full bg-[#fff] rounded-[12px] text-sm p-4 focus:outline-[var(--primary)] placeholder:text-[var(--secondary)] resize-none ${error ? "border border-red-500" : ""}`}
      />

      {/* Error message */}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default DescriptionInput;
