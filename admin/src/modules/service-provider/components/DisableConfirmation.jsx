import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const DisableConfirmation = ({ onclose, handleBanUnbanUser, isBanned }) => {
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);

  // Capture the action once when the modal opens
  const action = isBanned ? "enable" : "disable";

  useEffect(() => {
    if (!isSuccessful) return;

    const timer = setTimeout(() => {
      onclose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [isSuccessful, onclose]);

  const handleConfirm = async () => {
    setLoading(true);

    const success = await handleBanUnbanUser();

    setLoading(false);

    if (success) {
      setIsSuccessful(true);
    }
  };

  return createPortal(
    <div className="w-full min-h-screen fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,.5)] px-5 py-10">
      <div className="w-full max-w-[471px] rounded-[18px] bg-white p-5 lg:p-10 text-center">
        <img
          src={isSuccessful ? "/check-icon.png" : "/reject-request-icon.png"}
          alt=""
          width={106}
          height={106}
          className="mx-auto"
        />

        <h4 className="mt-4 mb-2 text-[24px] font-bold">
          {isSuccessful
            ? `User ${action === "enable" ? "Enabled" : "Disabled"}`
            : `${action === "enable" ? "Enable" : "Disable"} User`}
        </h4>

        <p className="text-gray-500 leading-[1.35]">
          {isSuccessful
            ? `The user has been ${
                action === "enable" ? "enabled" : "disabled"
              } successfully.`
            : `Are you sure you want to ${
                action === "enable" ? "enable" : "disable"
              } this user?`}
        </p>

        {!isSuccessful && (
          <div className="mt-5 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={onclose}
              className="w-full rounded-lg bg-[#E0E0E0] py-3 font-medium"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleConfirm}
              className="w-full rounded-lg gradient-bg py-3 font-medium text-white"
            >
              Yes
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
};

export default DisableConfirmation;
