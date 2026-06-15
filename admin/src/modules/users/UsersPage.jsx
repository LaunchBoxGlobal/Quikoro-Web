import React from "react";
import PageHeader from "../../components/ui/PageHeader";
import UsersTable from "./components/UsersTable";

const UsersPage = () => {
  return (
    <div className="w-full relative">
      <PageHeader title={"Users"} />

      <UsersTable />
    </div>
  );
};

export default UsersPage;
