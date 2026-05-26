import React, { useRef } from "react";

const OtpInput = ({ length = 6, value, onChange }) => {
  const inputsRef = useRef([]);

  const focusInput = (index) => {
    inputsRef.current[index]?.focus();
  };

  const handleChange = (e, index) => {
    const val = e.target.value.replace(/\D/g, ""); // only digits

    if (!val) return;

    const newOtp = [...value];
    newOtp[index] = val[0]; // take only one digit

    onChange(newOtp);

    // move to next
    if (index < length - 1) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (e, index) => {
    // backspace behavior
    if (e.key === "Backspace") {
      if (value[index]) {
        const newOtp = [...value];
        newOtp[index] = "";
        onChange(newOtp);
      } else if (index > 0) {
        focusInput(index - 1);
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").replace(/\D/g, "");

    if (!paste) return;

    const newOtp = [...value];
    paste.split("").forEach((char, i) => {
      if (i < length) newOtp[i] = char;
    });

    onChange(newOtp);

    const nextIndex = Math.min(paste.length, length - 1);
    focusInput(nextIndex);
  };

  return (
    <div
      className="w-full flex items-center justify-between"
      onPaste={handlePaste}
    >
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputsRef.current[index] = el)}
          type="text"
          value={value[index] || ""}
          maxLength={1}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="w-[49px] h-[49px] bg-white rounded-[12px] text-sm text-center focus:outline-[var(--primary)]"
        />
      ))}
    </div>
  );
};

export default OtpInput;
