import React from "react";
import ServicesSection from "./components/ServicesSection";
import useUpdateTitle from "../../../hooks/useUpdateTitle";

const MyServicesPage = () => {
  useUpdateTitle("My Services");

  return (
    <>
      <ServicesSection />
    </>
  );
};

export default MyServicesPage;
