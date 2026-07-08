import React, { useState } from "react";
import { useBanUnbanUserMutation } from "../../../services/userApi/userApi";
import { enqueueSnackbar } from "notistack";

const BanUserModal = ({ user, id, refetch, onClose }) => {
  const [banUnbanUser, { isLoading }] = useBanUnbanUserMutation();

  const [success, setSuccess] = useState(false);

  const isCurrentlyBanned = user?.isBanned;

  const handleAction = async () => {
    try {
      await banUnbanUser({
        id,
        data: { isBanned: !isCurrentlyBanned },
      }).unwrap();

      enqueueSnackbar(
        isCurrentlyBanned
          ? "User unbanned successfully"
          : "User banned successfully",
        { variant: "success" },
      );

      setSuccess(true);
      refetch();

      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      enqueueSnackbar(error?.data?.message || "Something went wrong", {
        variant: "error",
      });
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center fixed inset-0 z-50 bg-black/50 px-5">
      <div className="w-full max-w-[471px] bg-white p-6 lg:p-10 rounded-[18px] text-center">
        {/* ICON */}
        <img
          src={
            success
              ? "/check-icon.png"
              : isCurrentlyBanned
                ? "/check-icon.png"
                : "/reject-request-icon.png"
          }
          alt="status icon"
          className="mx-auto w-[90px]"
        />

        {/* TEXT */}
        {!success ? (
          <>
            <p className="text-[22px] font-semibold mt-4">
              {isCurrentlyBanned ? "Unban User" : "Ban User"}
            </p>

            <p className="text-[#565656] mt-2">
              {isCurrentlyBanned
                ? "Are you sure you want to unban this user?"
                : "Are you sure you want to ban this user?"}
            </p>
          </>
        ) : (
          <>
            <p className="text-[22px] font-semibold mt-4">
              {isCurrentlyBanned ? "User Unbanned" : "User Banned"}
            </p>

            <p className="text-[#565656] mt-2">Action completed successfully</p>
          </>
        )}

        {/* BUTTONS */}
        {!success && (
          <div className="grid grid-cols-2 gap-3 mt-6">
            <button
              onClick={onClose}
              className="bg-gray-200 rounded-lg py-3 font-medium"
            >
              Cancel
            </button>

            <button
              onClick={handleAction}
              disabled={isLoading}
              className={`flex items-center justify-center gap-2 text-white rounded-lg py-3 font-medium disabled:opacity-70 gradient-bg`}
            >
              {isLoading ? (
                <>Processing...</>
              ) : isCurrentlyBanned ? (
                "Unban"
              ) : (
                "Ban"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BanUserModal;
