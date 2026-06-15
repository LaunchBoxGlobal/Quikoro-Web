import React, { useRef } from "react";
import { CalendarIcon } from "../../assets/export";

const formatDate = (value) => {
  const digits = value.replace(/\D/g, "").slice(0, 6);

  let formatted = "";

  if (digits.length >= 1) {
    formatted += digits.substring(0, 2);
  }
  if (digits.length >= 3) {
    formatted += "/" + digits.substring(2, 4);
  }
  if (digits.length >= 5) {
    formatted += "/" + digits.substring(4, 6);
  }

  return formatted;
};

const DateField = ({ value, onChange, placeholder = "DD/MM/YY" }) => {
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const formatted = formatDate(e.target.value);
    onChange(formatted);
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text");
    const formatted = formatDate(paste);
    onChange(formatted);
  };

  const handleIconClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        onPaste={handlePaste}
        placeholder={placeholder}
        className="w-full h-[49px] bg-white rounded-[12px] custom-shadow text-sm px-4 pr-10 focus:outline-[var(--primary)] placeholder:text-[var(--secondary)]"
      />

      <button
        type="button"
        onClick={handleIconClick}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
      >
        <img src={CalendarIcon} alt="calendar icon" width={18} height={18} />
      </button>
    </div>
  );
};

export default DateField;
