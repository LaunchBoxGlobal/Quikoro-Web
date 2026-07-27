import React from "react";
import { createPortal } from "react-dom";

const AccountApprovalConfirmationModal = ({
  handleToggleProfileAcceptModal,
  isApprovingAccount,
  handleAcceptRejectAccount,
}) => {
  return createPortal(
    <div className="w-full h-screen z-50 fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center px-4">
      <div className="bg-white w-full p-6 lg:p-8 relative max-w-[471px] rounded-[18px] flex flex-col items-center justify-center text-center gap-3">
        <img
          src="/reject-request-icon.png"
          alt="icon"
          className="w-full max-w-[97px] object-contain"
        />

        <h3 className="text-[24px] font-semibold leading-none mt-2">
          Accept Request
        </h3>

        <p className="text-[#565656]">
          Are you sure you want accept this provider request
        </p>

        <div className="w-full grid grid-cols-2 gap-3 mt-3">
          <button
            type="button"
            onClick={() => handleToggleProfileAcceptModal()}
            className="bg-[#E0E0E0] text-black w-full py-3 rounded-[8px] text-center text-base font-medium"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => handleAcceptRejectAccount("ACTIVE")}
            className="gradient-bg text-white w-full py-3 rounded-[8px] text-center text-base font-medium"
          >
            {isApprovingAccount ? "Accepting..." : "Accept"}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default AccountApprovalConfirmationModal;
