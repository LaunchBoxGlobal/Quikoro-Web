import React, { useState } from "react";
import Modal from "../../../../../components/ui/Modal";
import { LogoPlaceholder } from "../../../../../assets/export";
import Button from "../../../../../components/ui/Button";
import { useUpdateBookingStatusMutation } from "../../../../../services/bookingApi/bookingApi";
import { useParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import FormErrorMessage from "../../../../../components/ui/FormErrorMessage";

const AcceptBookingRequestModal = ({
  refetch,
  acceptBooking,
  setAcceptBooking,
  setRequestAcceptedSuccessModal,
}) => {
  return (
    <>
      <Modal
        icon={"/accept-request-icon.png"}
        isOpen={acceptBooking}
        onClose={() => setAcceptBooking(false)}
        height={106}
        width={106}
        title={`Accept Request`}
        description={`Before confirming this booking, share any important notes or final instructions related to the service request.`}
        children={
          <AdditionNotesForm
            refetch={refetch}
            acceptBooking={acceptBooking}
            setAcceptBooking={setAcceptBooking}
            setRequestAcceptedSuccessModal={setRequestAcceptedSuccessModal}
          />
        }
      />
    </>
  );
};

export default AcceptBookingRequestModal;

export const AdditionNotesForm = ({
  refetch,
  setAcceptBooking,
  setRequestAcceptedSuccessModal,
}) => {
  const [notes, setNotes] = useState("");
  const { id } = useParams();

  const [updateBookingStatus, { isLoading, error }] =
    useUpdateBookingStatusMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateBookingStatus({ status: "IN_PROGRESS", id }).unwrap();
    setAcceptBooking(false);
    setRequestAcceptedSuccessModal(true);
    // if (status === "INTERESTED") {
    //   refetch();
    //   enqueueSnackbar("Booking request accepted", {
    //     variant: "success",
    //     autoHideDuration: 3000,
    //     anchorOrigin: {
    //       vertical: "top",
    //       horizontal: "center",
    //     },
    //   });

    //   return;
    // }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mt-4">
      {error && (
        <div className="mb-4">
          <FormErrorMessage apiError={error?.data?.error} />
        </div>
      )}
      <div className="w-full">
        <label htmlFor="additionalNotes" className="font-semibold text-sm">
          Additional Notes
        </label>
        <textarea
          name="additionalNotes"
          id="additionalNotes"
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className={`bg-[#fff] w-full resize-none rounded-[16px] text-sm p-3 border-none outline-none`}
        ></textarea>
      </div>

      <div className="w-full grid grid-cols-2 gap-2 mt-3">
        <button
          type="button"
          onClick={() => setAcceptBooking(false)}
          className="bg-[#0084AA]/20 text-black py-3 rounded-lg font-medium"
        >
          No
        </button>
        <button
          type="submit"
          className="bg-[var(--primary)] text-white py-3 rounded-lg font-medium"
        >
          {isLoading ? "Loading..." : "Yes"}
        </button>
      </div>
    </form>
  );
};
