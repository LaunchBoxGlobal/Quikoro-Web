import React from "react";

const FormErrorMessage = ({ apiError }) => {
  return (
    <div className="w-full rounded-lg bg-red-50 border border-red-200 px-3 py-2.5 mt-2">
      <p className="text-sm text-red-600 font-medium">{apiError}</p>
    </div>
  );
};

export default FormErrorMessage;
