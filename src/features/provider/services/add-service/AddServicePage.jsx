import React from "react";
import ServiceLayout from "./components/ServiceLayout";
import useUpdateTitle from "../../../../hooks/useUpdateTitle";

const AddServicePage = () => {
  useUpdateTitle("Add Service");
  return (
    <div className="min-h-screen text-gray-900">
      <div className="py-10">
        <ServiceLayout />
      </div>
    </div>
  );
};

export default AddServicePage;
