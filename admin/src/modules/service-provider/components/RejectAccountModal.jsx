import React, { useState, useEffect } from "react";
import { useAcceptRejectAccountMutation } from "../../../services/userApi/userApi";
import { enqueueSnackbar } from "notistack";
import { createPortal } from "react-dom";

const STEP = {
  CONFIRM: "CONFIRM",
  FORM: "FORM",
  SUCCESS: "SUCCESS",
};

const RejectAccountModal = ({
  showConfirmationModal,
  setShowConfirmationModal,
  id,
  refetch,
}) => {
  const [step, setStep] = useState(STEP.CONFIRM);
  const [remarks, setRemarks] = useState("");

  const [acceptRejectAccount, { isLoading: isRejecting }] =
    useAcceptRejectAccountMutation();

  useEffect(() => {
    if (showConfirmationModal) {
      setStep(STEP.CONFIRM);
      setRemarks("");
    }
  }, [showConfirmationModal]);

  const handleClose = () => {
    setShowConfirmationModal(false);
  };

  const handleConfirmYes = () => {
    setStep(STEP.FORM);
  };

  const handleSubmitRejection = async () => {
    try {
      await acceptRejectAccount({
        id,
        data: { accountStatus: "REJECTED", remarks },
      }).unwrap();
      refetch();
      setStep(STEP.SUCCESS);
      setTimeout(() => {
        handleClose();
      }, 3000);
    } catch (error) {
      enqueueSnackbar(
        error?.data?.error ||
          error?.data?.message ||
          "Something went wrong. Try again.",
        { variant: "error" },
      );
    }
  };

  if (!showConfirmationModal) return null;

  return createPortal(
    <div className="w-full min-h-screen fixed inset-0 z-[30000] flex items-center justify-center px-5 py-10 bg-[rgba(0,0,0,0.5)]">
      {step === STEP.CONFIRM && (
        <div className="w-full max-w-[471px] bg-white rounded-[18px] flex flex-col items-center justify-center p-6 lg:p-10 gap-2">
          <img
            src="/reject-request-icon.png"
            alt="reject-request-icon"
            width={107}
            height={107}
          />
          <p className="text-[24px] font-semibold mt-2">Reject Request</p>
          <p className="text-[#565656]">
            Are you sure you want to reject this request?
          </p>
          <div className="w-full grid grid-cols-2 gap-3 mt-5">
            <button
              type="button"
              onClick={handleClose}
              className="secondary-button"
            >
              No
            </button>
            <button
              type="button"
              onClick={handleConfirmYes}
              className="primary-button"
            >
              Yes
            </button>
          </div>
        </div>
      )}

      {step === STEP.FORM && (
        <div className="w-full max-w-[471px] bg-white rounded-[18px] flex flex-col items-center justify-center text-center p-6 lg:p-10 gap-2">
          <p className="text-[24px] font-semibold">Reject Request!</p>
          <p className="text-[#565656] text-sm">
            Please provide a reason for rejection.
          </p>
          <textarea
            name="remarks"
            id="remarks"
            cols="30"
            rows="5"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Enter remarks..."
            className="w-full border border-[#D9D9D9] rounded-[8px] p-3 text-sm resize-none outline-none mt-2"
          />
          <div className="w-full grid grid-cols-2 gap-3 mt-5">
            <button
              type="button"
              onClick={handleClose}
              className="secondary-button"
            >
              Not Now
            </button>
            <button
              type="button"
              onClick={handleSubmitRejection}
              disabled={isRejecting || !remarks.trim()}
              className="primary-button disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isRejecting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      )}

      {step === STEP.SUCCESS && (
        <div className="w-full max-w-[471px] bg-white rounded-[18px] flex flex-col items-center justify-center text-center p-6 lg:p-10 gap-2">
          <img
            src="/reject-request-icon.png"
            alt="reject-request-icon"
            width={107}
            height={107}
          />
          <p className="text-[24px] font-semibold mt-2">Request Rejected</p>
          <p className="text-[#565656]">
            You have rejected the member request. Thank you for taking action
            promptly!
          </p>
        </div>
      )}
    </div>,
    document.body,
  );
};

export default RejectAccountModal;
