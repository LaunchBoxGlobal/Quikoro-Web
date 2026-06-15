import React from "react";

const SectionTitle = ({ children }) => {
  return (
    <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">
      {children}
    </h2>
  );
};

export default SectionTitle;
