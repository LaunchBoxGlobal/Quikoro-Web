import React, { useState } from "react";
import Button from "../../../../components/ui/Button";
import { PreferencesIcon } from "../../../../assets/export";
import CurrencySelect from "../../../../components/ui/CurrencySelect";
import DateField from "../../../../components/ui/DateField";
import { useNavigate } from "react-router-dom";

const currencies = [
  { label: "PKR - Pakistani Rupee", value: "PKR" },
  { label: "USD - US Dollar", value: "USD" },
  { label: "EUR - Euro", value: "EUR" },
  { label: "GBP - British Pound", value: "GBP" },
];

const PreferencesForm = () => {
  const [currency, setCurrency] = useState(null);
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/add-account");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-[350px] relative space-y-6"
    >
      <img
        src={PreferencesIcon}
        alt="verify otp icon"
        width={146}
        height={146}
        className="mx-auto"
      />

      <div className="w-full text-center">
        <h1 className="text-[32px] font-bold leading-none">Preferences</h1>
        <p className="secondary-text mt-3">
          Set your preferences to get started
        </p>
      </div>

      <CurrencySelect
        value={currency}
        onChange={setCurrency}
        options={currencies}
      />

      <DateField value={date} onChange={setDate} />

      <Button type="submit" text="Next" />
    </form>
  );
};

export default PreferencesForm;
