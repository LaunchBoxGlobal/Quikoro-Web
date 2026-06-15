import React, { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { useAcceptRejectAccountMutation } from "../../../services/userApi/userApi";

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

  useEffect(() => {
    let timer;

    if (step === STEP.SUCCESS) {
      timer = setTimeout(() => {
        setShowConfirmationModal(false);
      }, 3000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [step, setShowConfirmationModal]);

  const handleClose = () => {
    setShowConfirmationModal(false);
    setStep(STEP.CONFIRM);
    setRemarks("");
  };

  const handleConfirmYes = () => {
    setStep(STEP.FORM);
  };

  const handleSubmitRejection = async () => {
    try {
      await acceptRejectAccount({
        id,
        data: {
          accountStatus: "REJECTED",
          remarks,
        },
      }).unwrap();

      await refetch();

      enqueueSnackbar("Account rejected successfully", {
        variant: "success",
      });

      setStep(STEP.SUCCESS);
    } catch (error) {
      enqueueSnackbar(
        error?.data?.error ||
          error?.data?.message ||
          "Something went wrong. Try again.",
        {
          variant: "error",
        },
      );
    }
  };

  if (!showConfirmationModal) return null;

  return (
    <div className="fixed inset-0 z-[30000] flex items-center justify-center px-5 py-10 bg-black/50">
      {/* STEP 1 - CONFIRM */}
      {step === STEP.CONFIRM && (
        <div className="w-full max-w-[471px] bg-white rounded-[18px] p-6 lg:p-10 text-center">
          <img
            src="/reject-request-icon.png"
            alt="reject-request-icon"
            width={107}
            height={107}
            className="mx-auto"
          />

          <h3 className="text-[24px] font-semibold mt-4">Reject Provider</h3>

          <p className="text-[#565656] mt-2">
            Are you sure you want to reject this provider account?
          </p>

          <div className="grid grid-cols-2 gap-3 mt-6">
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

      {/* STEP 2 - FORM */}
      {step === STEP.FORM && (
        <div className="w-full max-w-[471px] bg-white rounded-[18px] p-6 lg:p-10">
          <h3 className="text-[24px] font-semibold text-center">
            Rejection Reason
          </h3>

          <textarea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Enter rejection remarks..."
            rows={5}
            className="w-full border border-[#D9D9D9] rounded-[8px] p-3 mt-4 resize-none outline-none"
          />

          <div className="grid grid-cols-2 gap-3 mt-6">
            <button
              type="button"
              onClick={handleClose}
              className="secondary-button"
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={!remarks.trim() || isRejecting}
              onClick={handleSubmitRejection}
              className="primary-button disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isRejecting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 - SUCCESS */}
      {step === STEP.SUCCESS && (
        <div className="w-full max-w-[471px] bg-white rounded-[18px] p-6 lg:p-10 text-center">
          <img
            src="/reject-request-icon.png"
            alt="success"
            width={107}
            height={107}
            className="mx-auto"
          />

          <h3 className="text-[24px] font-semibold mt-4">Account Rejected</h3>

          <p className="text-[#565656] mt-2">
            The provider account has been rejected successfully.
          </p>

          <p className="text-sm text-gray-400 mt-4">
            This window will close automatically...
          </p>
        </div>
      )}
    </div>
  );
};

export default RejectAccountModal;
