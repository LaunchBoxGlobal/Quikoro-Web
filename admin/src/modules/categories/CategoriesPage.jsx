import React from "react";
import PageHeader from "../../components/ui/PageHeader";
import CategoriesTable from "./components/CategoriesTable";

const CategoriesPage = () => {
  return (
    <div className="w-full relative">
      <PageHeader title={"Categories"} />

      <CategoriesTable />
    </div>
  );
};

export default CategoriesPage;
