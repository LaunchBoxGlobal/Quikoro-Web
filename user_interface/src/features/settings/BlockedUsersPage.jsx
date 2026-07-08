import React, { useState } from "react";
import {
  useGetBlockedUsersQuery,
  useUnblockUserMutation,
} from "../../services/userService/userApi";
import Loader from "../../components/ui/loader/Loader";
import Pagination from "../../components/ui/Pagination";
import { enqueueSnackbar } from "notistack";
import Button from "../../components/ui/Button";

const BlockedUsersPage = () => {
  const [page, setPage] = useState(1);
  const [unblockingUserId, setUnblockingUserId] = useState(null);

  const { data, isLoading, isError } = useGetBlockedUsersQuery(
    { page },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const users = data?.data?.data || [];
  const pagination = data?.data?.pagination;

  const [unblockUser] = useUnblockUserMutation();

  const handleUnblockUser = async (userId) => {
    if (!userId) return;

    try {
      setUnblockingUserId(userId);

      await unblockUser({ blockedId: userId }).unwrap();

      enqueueSnackbar("User has been unblocked", {
        variant: "success",
        autoHideDuration: 3000,
        anchorOrigin: {
          horizontal: "center",
          vertical: "top",
        },
      });
    } catch (error) {
      enqueueSnackbar(
        error?.data?.error ||
          error?.data?.message ||
          error?.message ||
          error?.error ||
          "Failed to unblock user",
        {
          variant: "error",
          autoHideDuration: 3000,
          anchorOrigin: {
            horizontal: "center",
            vertical: "top",
          },
        },
      );
    } finally {
      setUnblockingUserId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center pt-24">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 py-10">
        Failed to load blocked users.
      </div>
    );
  }

  return (
    <div className="w-full">
      <h2 className="text-[32px] font-bold mb-5">Blocked Users</h2>

      {users.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No blocked users found.
        </div>
      ) : (
        <ul className="w-full">
          {users.map((user, index) => (
            <li
              key={user?.id}
              className={`w-full flex items-center justify-between gap-2 py-3 ${
                index !== users.length - 1 ? "border-b border-gray-200" : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <img
                  src={user?.profilePicture || "/user-profile-placeholder.png"}
                  alt={`${user?.fullName} profile`}
                  className="w-[46px] h-[46px] rounded-full object-cover"
                />

                <span className="font-medium text-base">{user?.fullName}</span>
              </div>

              <div>
                <Button
                  text="Unblock"
                  loader="Unblocking..."
                  isLoading={unblockingUserId === user?.id}
                  onclick={() => handleUnblockUser(user?.id)}
                  disabled={unblockingUserId === user?.id}
                />
              </div>
            </li>
          ))}
        </ul>
      )}

      {pagination?.totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={pagination?.totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default BlockedUsersPage;
