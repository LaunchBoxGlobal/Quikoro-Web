import React from "react";
import { CountrySelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

import { selectClassName } from "../../utils/selectClassName";

const CountryField = ({
  value,
  error,
  touched,
  setFieldValue,
  setFieldTouched,
}) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <label className="text-sm font-semibold leading-none">Country</label>

      <CountrySelect
        containerClassName="w-full"
        inputClassName={selectClassName(touched && error)}
        placeHolder="Select Country"
        value={value}
        onChange={(val) => {
          setFieldValue("country", val.name);
          setFieldValue("countryId", val.id);

          // reset dependent fields
          setFieldValue("state", "");
          setFieldValue("stateId", "");
          setFieldValue("city", "");

          setFieldTouched("country", true);
        }}
      />

      {touched && error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default CountryField;
