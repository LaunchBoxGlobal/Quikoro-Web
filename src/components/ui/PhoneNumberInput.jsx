import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import {
  parsePhoneNumberFromString,
  getExampleNumber,
} from "libphonenumber-js";

import examples from "libphonenumber-js/mobile/examples";

import "react-phone-number-input/style.css";

const PhoneNumberInput = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  disabled = false,
  defaultCountry = "PK",
  bgColor = "#F5F5F5",
}) => {
  const [country, setCountry] = useState(defaultCountry);

  const handlePhoneChange = (phone) => {
    if (!phone) {
      onChange("");
      return;
    }

    try {
      const parsed = parsePhoneNumberFromString(phone);

      if (!parsed) {
        onChange(phone);
        return;
      }

      const selectedCountry = parsed.country || country;

      // Example number for country
      const example = getExampleNumber(selectedCountry, examples);

      // Max national digits allowed
      const maxDigits = example?.nationalNumber?.length || 10;

      // Current entered digits
      const currentDigits = parsed.nationalNumber;

      // STOP updating if exceeded
      if (currentDigits.length > maxDigits) {
        return;
      }

      onChange(phone);
    } catch (err) {
      onChange(phone);
    }
  };

  return (
    <div className="w-full max-w-[350px] relative space-y-1">
      {label && (
        <label htmlFor={name} className="text-sm font-semibold leading-none">
          {label}
        </label>
      )}

      <div
        className={`w-full h-[48px] rounded-[12px] px-4 flex items-center ${
          error
            ? "border border-red-500"
            : "border border-transparent focus-within:border-[var(--primary)]"
        }`}
        style={{ background: bgColor }}
      >
        <PhoneInput
          international
          defaultCountry={defaultCountry}
          countryCallingCodeEditable={false}
          value={value}
          onChange={handlePhoneChange}
          onCountryChange={(value) => setCountry(value)}
          onBlur={onBlur}
          disabled={disabled}
          className="w-full flex items-center gap-2"
          numberInputProps={{
            name,
            id: name,
            className:
              "w-full bg-transparent outline-none text-sm placeholder:text-[var(--secondary)]",
            placeholder: "3001234567",
          }}
        />
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default PhoneNumberInput;
