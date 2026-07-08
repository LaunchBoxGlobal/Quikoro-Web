import React from "react";
import PageHeader from "../../components/ui/PageHeader";
import ReportsTable from "./components/ReportsTable";

const ReportsPage = () => {
  return (
    <div className="w-full relative">
      <PageHeader title={"Reports"} />

      <ReportsTable />
    </div>
  );
};

export default ReportsPage;
