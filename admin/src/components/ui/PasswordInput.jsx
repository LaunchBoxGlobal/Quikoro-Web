import React, { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

const PasswordInput = ({
  label,
  name,
  value,
  placeholder = "",
  onChange,
  onBlur,
  error,
  bgColor = "#F5F5F5",
}) => {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="w-full relative space-y-1">
      {label && (
        <label htmlFor={name} className="text-sm font-semibold leading-none">
          {label}
        </label>
      )}

      <div
        className={`w-full flex items-center justify-between gap-2 rounded-[12px] h-[48px] px-4 focus-within:border-2 focus-within:border-[var(--primary)]
        ${error ? "border border-red-500" : ""}`}
        style={{ background: bgColor }}
      >
        <input
          type={showPass ? "text" : "password"}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className="w-full h-full bg-transparent text-sm outline-none placeholder:text-[var(--secondary)]"
        />

        <button type="button" onClick={() => setShowPass((prev) => !prev)}>
          {!showPass ? (
            <IoEyeOff className="text-[var(--secondary)] text-xl" />
          ) : (
            <IoEye className="text-[var(--secondary)] text-xl" />
          )}
        </button>
      </div>

      {/* ✅ Error message */}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default PasswordInput;
