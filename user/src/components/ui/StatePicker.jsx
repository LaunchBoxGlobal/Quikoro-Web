import React from "react";
import { StateSelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

import { selectClassName } from "../../utils/selectClassName";

const StateField = ({
  value,
  error,
  touched,
  countryId,
  setFieldValue,
  setFieldTouched,
}) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <label className="text-sm font-semibold leading-none">State</label>

      <StateSelect
        countryid={countryId || 0}
        containerClassName="w-full"
        inputClassName={selectClassName(touched && error)}
        placeHolder="Select State"
        value={value}
        onChange={(val) => {
          setFieldValue("state", val.name);
          setFieldValue("stateId", val.id);

          // reset city
          setFieldValue("city", "");

          setFieldTouched("state", true);
        }}
      />

      {touched && error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default StateField;
