import React, { useState } from "react";
import Modal from "../../../../../components/ui/Modal";
import { LogoPlaceholder } from "../../../../../assets/export";
import Button from "../../../../../components/ui/Button";
import { useUpdateBookingStatusMutation } from "../../../../../services/bookingApi/bookingApi";
import { useParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import FormErrorMessage from "../../../../../components/ui/FormErrorMessage";
import { useSelector } from "react-redux";

const MarkCompleteModal = ({
  refetch,
  cancellationModal,
  setCancellationModal,
  setApiError,
}) => {
  const user = useSelector((state) => state.user.user);
  return (
    <>
      <Modal
        icon={LogoPlaceholder}
        isOpen={cancellationModal}
        onClose={() => setAcceptBooking(false)}
        height={106}
        width={106}
        title={`Complete Job`}
        description={`Are you sure the job is completed? The action cannot be undone.`}
        children={
          <AdditionNotesForm
            refetch={refetch}
            acceptBooking={cancellationModal}
            setAcceptBooking={setCancellationModal}
            setApiError={setApiError}
          />
        }
      />
    </>
  );
};

export default MarkCompleteModal;

export const AdditionNotesForm = ({
  refetch,
  setAcceptBooking,
  setApiError,
}) => {
  const [notes, setNotes] = useState("");
  const { id } = useParams();

  const [updateBookingStatus, { isLoading, error }] =
    useUpdateBookingStatusMutation();

  const handleSubmit = async () => {
    try {
      await updateBookingStatus({ id, data: { status: "CANCELLED" } }).unwrap();
      if (status === "INTERESTED") {
        refetch();
        enqueueSnackbar("Booking has been cancelled.", {
          variant: "success",
          autoHideDuration: 3000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
        setAcceptBooking(false);
        return;
      }
    } catch (error) {
      //   console.log(error);
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
