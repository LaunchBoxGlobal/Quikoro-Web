import React, { useState } from "react";
import {
  useAcceptRejectAccountMutation,
  useBanUnbanUserMutation,
} from "../../../services/userApi/userApi";
import { enqueueSnackbar } from "notistack";
import RejectAccountModal from "./RejectAccountModal";
import DisableConfirmation from "./DisableConfirmation";
import AccountApprovalConfirmationModal from "./AccountApprovalConfirmationModal";

const ProfileHeader = ({ user, id, refetch }) => {
  const [status, setStatus] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showDisableConfirmationModal, setShowDisableConfirmationModal] =
    useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [openAcceptProfileModal, setOpenAcceptProfileModal] = useState(false);

  const [acceptRejectAccount, { isLoading: isApprovingAccount }] =
    useAcceptRejectAccountMutation();

  const handleToggleProfileAcceptModal = () =>
    setOpenAcceptProfileModal((prev) => !prev);

  const [banUnbanUser, { isLoading: isBlocking }] = useBanUnbanUserMutation();

  const handleAcceptRejectAccount = async (accountStatus) => {
    setStatus(accountStatus);
    try {
      await acceptRejectAccount({
        id,
        data: { accountStatus, remarks: "" },
      }).unwrap();
      refetch();
      enqueueSnackbar("Account status has been updated", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar(
        error?.data?.error ||
          error?.data?.message ||
          "Something went wrong. Try again.",
        { variant: "error" },
      );
    } finally {
      setStatus("");
    }
  };

  const handleBanUnbanUser = async () => {
    try {
      await banUnbanUser({
        id,
        data: { isBanned: !user?.isBanned },
      }).unwrap();

      refetch();

      return true;
    } catch (error) {
      enqueueSnackbar(
        error?.data?.error ||
          error?.data?.message ||
          "Something went wrong. Try again.",
        {
          variant: "error",
        },
      );

      return false;
    }
  };
  return (
    <>
      <div className="bg-white rounded-[24px] p-6 lg:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] border border-gray-50 mb-6">
        <div className="flex items-center gap-6 mb-8 lg:mb-0">
          <div className="w-[100px] h-[100px] shrink-0 rounded-full border-2 border-[#016A87] p-1.5 flex items-center justify-center relative bg-white overflow-hidden">
            <img
              src={
                user?.profilePicture
                  ? user?.profilePicture
                  : "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80"
              }
              alt={`${user?.fullName} profile picture`}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <h3 className="text-[24px] font-bold text-gray-900 leading-tight">
              {user?.fullName}
            </h3>
            {user?.role === "PROVIDER" ? (
              <p className="text-gray-500 font-medium text-sm">{user?.role}</p>
            ) : (
              <p className="text-gray-500 font-medium text-sm">{user?.email}</p>
            )}
            {user?.role === "PROVIDER" && !user?.isProfileCompleted && (
              <p className="text-red-500 font-medium text-sm">
                Incomplete Profile
              </p>
            )}
          </div>
        </div>

        {user?.role === "PROVIDER" && (
          <>
            {(user?.accountStatus === "PENDING" ||
              user?.accountStatus === "SUBMITTED" ||
              user?.accountStatus === "REJECTED") && (
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                <button
                  type="button"
                  onClick={() => setShowConfirmationModal(true)}
                  className="w-full sm:w-auto px-12 py-3.5 bg-[#EE5D5D] hover:bg-[#db5252] transition-colors text-white rounded-[14px] font-medium text-base shadow-sm"
                >
                  Reject
                </button>
                <button
                  type="button"
                  disabled={isApprovingAccount}
                  onClick={() => handleToggleProfileAcceptModal()}
                  className="w-full sm:w-auto px-12 py-3.5 bg-[#016A87] hover:bg-[#01566d] transition-colors text-white rounded-[14px] font-medium text-base shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  Accept
                </button>
              </div>
            )}
          </>
        )}

        {user?.accountStatus === "ACTIVE" && (
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            <button
              type="button"
              onClick={() => {
                setShowDisableConfirmationModal(true);
              }}
              className="w-full sm:w-auto px-12 py-3.5 bg-[#EE5D5D] hover:bg-[#db5252] transition-colors text-white rounded-[14px] font-medium text-base shadow-sm"
            >
              {user?.isBanned ? "Enable" : "Disable"}
            </button>
          </div>
        )}
      </div>

      <RejectAccountModal
        showConfirmationModal={showConfirmationModal}
        setShowConfirmationModal={setShowConfirmationModal}
        id={id}
        refetch={refetch}
      />

      {showDisableConfirmationModal && (
        <DisableConfirmation
          isBanned={user?.isBanned}
          handleBanUnbanUser={handleBanUnbanUser}
          onclose={() => setShowDisableConfirmationModal(false)}
        />
      )}

      {openAcceptProfileModal && (
        <AccountApprovalConfirmationModal
          handleToggleProfileAcceptModal={handleToggleProfileAcceptModal}
          isApprovingAccount={isApprovingAccount}
          handleAcceptRejectAccount={handleAcceptRejectAccount}
        />
      )}
    </>
  );
};

export default ProfileHeader;
