import React from "react";
import { CitySelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

import { selectClassName } from "../../utils/selectClassName";

const CityField = ({
  value,
  error,
  touched,
  countryId,
  stateId,
  setFieldValue,
  setFieldTouched,
}) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <label className="text-sm font-semibold leading-none">City</label>

      <CitySelect
        countryid={countryId || 0}
        stateid={stateId || 0}
        containerClassName="w-full"
        inputClassName={selectClassName(touched && error)}
        placeHolder="Select City"
        value={value}
        onChange={(val) => {
          setFieldValue("city", val.name);

          setFieldTouched("city", true);
        }}
      />

      {touched && error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default CityField;
