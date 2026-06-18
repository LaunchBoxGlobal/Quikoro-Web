import React from "react";
import { useGetBlockedUsersQuery } from "../../services/settingsApi/settingsApi";

const BlockedUsersPage = () => {
  const { data, isLoading, isError } = useGetBlockedUsersQuery(undefined);

  console.log("BLOCKED USERS >>> ", data);
  return (
    <div className="w-full">
      <h2 className="text-[32px] font-bold mb-5">Blocked Users</h2>
    </div>
  );
};

export default BlockedUsersPage;
