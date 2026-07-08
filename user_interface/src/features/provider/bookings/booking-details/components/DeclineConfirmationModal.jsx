import React from "react";
import Modal from "../../../../../components/ui/Modal";
import { useUpdateBookingStatusMutation } from "../../../../../services/bookingApi/bookingApi";
import { useParams } from "react-router-dom";

const DeclineConfirmationModal = ({
  declineModal,
  setDeclineModal,
  setDeclineSuccessModal,
  setApiError,
  refetch,
}) => {
  return (
    <Modal
      icon="/cancellation-icon.png"
      isOpen={declineModal}
      onClose={() => setDeclineModal(false)}
      height={106}
      width={106}
      title="Decline Request?"
      description="Are you sure you want to decline this request?"
      children={
        <DeclineForm
          refetch={refetch}
          setDeclineModal={setDeclineModal}
          setDeclineSuccessModal={setDeclineSuccessModal}
          setApiError={setApiError}
        />
      }
    />
  );
};

export default DeclineConfirmationModal;

const DeclineForm = ({
  refetch,
  setDeclineModal,
  setDeclineSuccessModal,
  setApiError,
}) => {
  const { id } = useParams();

  const [updateBookingStatus, { isLoading }] = useUpdateBookingStatusMutation();

  const handleDecline = async () => {
    try {
      await updateBookingStatus({
        id,
        data: {
          status: "CANCELLED",
        },
      }).unwrap();

      refetch?.();
      setDeclineModal(false);
      setDeclineSuccessModal(true);
    } catch (error) {
      setApiError(error?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2 mt-4">
      <button
        type="button"
        onClick={() => setDeclineModal(false)}
        className="bg-[var(--secondary-button-bg)] text-black py-3 rounded-lg font-medium"
      >
        No
      </button>

      <button
        type="button"
        disabled={isLoading}
        onClick={handleDecline}
        className="gradient-bg text-white py-3 rounded-lg font-medium disabled:opacity-50"
      >
        {isLoading ? "Loading..." : "Yes"}
      </button>
    </div>
  );
};
