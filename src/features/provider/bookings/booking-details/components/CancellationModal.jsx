import React, { useState } from "react";
import Modal from "../../../../../components/ui/Modal";
import { LogoPlaceholder } from "../../../../../assets/export";
import Button from "../../../../../components/ui/Button";
import { useUpdateBookingStatusMutation } from "../../../../../services/bookingApi/bookingApi";
import { useParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import FormErrorMessage from "../../../../../components/ui/FormErrorMessage";
import { useSelector } from "react-redux";

const CancellationModal = ({
  refetch,
  cancellationModal,
  setCancellationModal,
  setApiError,
  setCancellationSuccessModal,
}) => {
  const user = useSelector((state) => state.user.user);
  const userRole = user?.role === "CUSTOMER" ? "customer" : "provider";
  return (
    <>
      <Modal
        icon={`/cancellation-icon.png`}
        isOpen={cancellationModal}
        onClose={() => setAcceptBooking(false)}
        height={106}
        width={106}
        title={`Cancel This Job?`}
        description={`Are you sure you want to cancel this job? The ${userRole} will be notified and this action cannot be undone.`}
        children={
          <AdditionNotesForm
            refetch={refetch}
            acceptBooking={cancellationModal}
            setAcceptBooking={setCancellationModal}
            setApiError={setApiError}
            setCancellationSuccessModal={setCancellationSuccessModal}
          />
        }
      />
    </>
  );
};

export default CancellationModal;

export const AdditionNotesForm = ({
  refetch,
  setAcceptBooking,
  setApiError,
  setCancellationSuccessModal,
}) => {
  const [notes, setNotes] = useState("");
  const { id } = useParams();

  const [updateBookingStatus, { isLoading, error }] =
    useUpdateBookingStatusMutation();

  const handleSubmit = async () => {
    try {
      await updateBookingStatus({ status: "CANCELLED", id }).unwrap();
      setCancellationSuccessModal(true);
    } catch (error) {
      setApiError(error?.data?.error || "Something went wrong");
    } finally {
      setAcceptBooking(false);
    }
  };

  return (
    <div className="w-full grid grid-cols-2 gap-2 mt-3">
      <button
        type="button"
        onClick={() => setAcceptBooking(false)}
        className="bg-[var(--secondary-button-bg)] text-black py-3 rounded-lg font-medium"
      >
        No
      </button>
      <button
        type="button"
        onClick={() => handleSubmit()}
        className="bg-[var(--primary)] text-white py-3 rounded-lg font-medium"
      >
        {isLoading ? "Loading..." : "Yes"}
      </button>
    </div>
  );
};
