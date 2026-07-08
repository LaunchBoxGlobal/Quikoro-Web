import React, { useState } from "react";
import BookingHeader from "./components/BookingHeader";
import BookingCard from "./components/BookingCard";
import Modal from "../../../../components/ui/Modal";
import { MessageIcon } from "../../../../assets/export";
import BookingModalDetails from "./components/BookingModalDetails";
import BookingActions from "./components/BookingActions";
import useUpdateTitle from "../../../../hooks/useUpdateTitle";
import { useParams } from "react-router-dom";
import {
  useGetBookingQuery,
  useUpdateBookingStatusMutation,
} from "../../../../services/bookingApi/bookingApi";
import Loader from "../../../../components/ui/loader/Loader";
import FormErrorMessage from "../../../../components/ui/FormErrorMessage";
import { useSelector } from "react-redux";
import AcceptBookingRequestModal from "./components/AcceptBookingRequestModal";
import CancellationModal from "./components/CancellationModal";
import RequestAcceptedSuccessModal from "./components/RequestAcceptedSuccessModal";
import MarkJobCompletedConfirmationModal from "./components/MarkJobCompletedConfirmationModal";
import ReviewModal from "./components/ReviewModal";
import Reviews from "./components/Reviews";
import { BiError } from "react-icons/bi";
import DeclineConfirmationModal from "./components/DeclineConfirmationModal";
import DeclineSuccessModal from "./components/DeclineSuccessModal";

const BookingDetailsPage = () => {
  useUpdateTitle("Booking Details");
  const { id } = useParams();
  const user = useSelector((state) => state.user.user);
  const [showAcceptBookingConfirmation, setShowAcceptBookingConfirmation] =
    useState(false);
  const [requestAcceptedSuccessModal, setRequestAcceptedSuccessModal] =
    useState(false);
  const [isJobPending, setIsJobPending] = useState(false);
  const [isJobCompleted, setIsJobCompleted] = useState(false);
  const [openChat, setOpenChat] = useState(false);
  const [apiError, setApiError] = useState("");
  const [acceptBooking, setAcceptBooking] = useState(false);
  const [cancellationModal, setCancellationModal] = useState(false);
  const [cancellationSuccessModal, setCancellationSuccessModal] =
    useState(false);
  const [showCompleteJobModal, setShowCompleteJobModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [declineModal, setDeclineModal] = useState(false);
  const [declineSuccessModal, setDeclineSuccessModal] = useState(false);

  const handleToggleMarkCompleteJobModal = () =>
    setShowCompleteJobModal((prev) => !prev);

  const { data, isLoading, isError, error, refetch } = useGetBookingQuery(id, {
    refetchOnFocus: true,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
  });
  const booking = data?.data;

  const [updateBookingStatus, { isLoading: isUpdatingStatus }] =
    useUpdateBookingStatusMutation();

  const handleUpdateStatus = async (status) => {
    if (!status || !id) {
      setApiError("Something went wrong. Try again.");
      return;
    }

    try {
      await updateBookingStatus({ id, data: { status } }).unwrap();
      refetch();

      if (status === "INTERESTED") {
        setShowAcceptBookingConfirmation(false);

        // ADD THIS
        setAcceptBooking(false);

        setRequestAcceptedSuccessModal(true);

        refetch();

        return;
      }
    } catch (error) {
      setShowAcceptBookingConfirmation(false);

      // ALSO CLOSE HERE
      setAcceptBooking(false);

      setApiError(
        error?.data?.error || error?.message || "Something went wrong.",
      );
    }
  };

  return (
    <div className="w-full min-h-screen">
      <BookingHeader
        setShowAcceptBookingConfirmation={setShowAcceptBookingConfirmation}
        isJobPending={isJobPending}
        setOpenChat={setOpenChat}
        openChat={openChat}
        booking={booking}
        handleUpdateStatus={handleUpdateStatus}
        setAcceptBooking={setAcceptBooking}
        setCancellationModal={setCancellationModal}
        handleToggleMarkCompleteJobModal={handleToggleMarkCompleteJobModal}
        setShowReviewModal={setShowReviewModal}
        setDeclineModal={setDeclineModal}
      />

      {apiError && (
        <div className="w-full mb-10">
          <FormErrorMessage apiError={apiError} />
        </div>
      )}

      {isLoading ? (
        <div className="w-full h-[50vh] flex items-center justify-center bg-white pt-20 rounded-3xl">
          <Loader />
        </div>
      ) : (
        <>
          {isError ? (
            <div className="w-full h-[50vh] flex items-center justify-center gap-2 bg-white pt-5 rounded-3xl">
              <BiError size={22} className="text-gray-500" />
              <p className="text-gray-500 font-medium">
                Something went wrong. Try again.
              </p>
            </div>
          ) : (
            <BookingCard booking={booking} />
          )}
        </>
      )}

      {(booking?.status === "INTERESTED" ||
        booking?.status === "IN_PROGRESS") && (
        <button
          type="button"
          onClick={() => setOpenChat((prev) => !prev)}
          className="w-[60px] h-[60px] gradient-bg flex items-center justify-center rounded-full z-30 fixed right-10 bottom-10"
        >
          <img src={MessageIcon} alt="message icon" width={28} height={26} />
        </button>
      )}

      {/* Confirmation Modal */}
      <Modal
        icon={"/thumb-up-icon.png"}
        isOpen={showAcceptBookingConfirmation}
        onClose={() => setShowAcceptBookingConfirmation(false)}
        height={106}
        width={106}
        title={`Mark Interested`}
        description={`Are you sure you want to accept this booking? The customer will be notified and the job will be added to your schedule.`}
        children={
          <ModalActions
            setIsJobPending={setIsJobPending}
            setShowAcceptBookingConfirmation={setShowAcceptBookingConfirmation}
            setRequestAcceptedSuccessModal={setRequestAcceptedSuccessModal}
            handleUpdateStatus={handleUpdateStatus}
            isUpdatingStatus={isUpdatingStatus}
          />
        }
      />

      {/* Confirmation Success Modal */}
      {/* <Modal
        icon={GreenSuccessIcon}
        isOpen={requestAcceptedSuccessModal}
        onClose={() => setRequestAcceptedSuccessModal(false)}
        height={79}
        width={79}
        title={`Request Accepted!`}
        description={`The booking has been confirmed. The customer has been notified and you can now chat with them.`}
        children={<BookingModalDetails />}
        footer={
          <SuccessModalActions
            setRequestAcceptedSuccessModal={setRequestAcceptedSuccessModal}
            setShowAcceptBookingConfirmation={setShowAcceptBookingConfirmation}
            setIsJobPending={setIsJobPending}
          />
        }
      /> */}

      <AcceptBookingRequestModal
        refetch={refetch}
        acceptBooking={acceptBooking}
        setAcceptBooking={setAcceptBooking}
        setRequestAcceptedSuccessModal={setRequestAcceptedSuccessModal}
      />
      <RequestAcceptedSuccessModal
        isOpen={requestAcceptedSuccessModal}
        setIsOpen={setRequestAcceptedSuccessModal}
        refetch={refetch}
      />

      <CancellationModal
        refetch={refetch}
        cancellationModal={cancellationModal}
        setCancellationModal={setCancellationModal}
        setApiError={setApiError}
        setCancellationSuccessModal={setCancellationSuccessModal}
      />

      {/* Mark Job as completed confirmation modal - yes/no */}
      <MarkJobCompletedConfirmationModal
        showCompleteJobModal={showCompleteJobModal}
        onClose={handleToggleMarkCompleteJobModal}
        refetch={refetch}
        setShowReviewModal={setShowReviewModal}
        id={id}
      />

      {/* Review Modal */}
      <ReviewModal
        isOpen={showReviewModal}
        setIsOpen={setShowReviewModal}
        booking={booking}
      />

      <DeclineConfirmationModal
        declineModal={declineModal}
        setDeclineModal={setDeclineModal}
        setDeclineSuccessModal={setDeclineSuccessModal}
        setApiError={setApiError}
        refetch={refetch}
      />

      <DeclineSuccessModal
        declineSuccessModal={declineSuccessModal}
        setDeclineSuccessModal={setDeclineSuccessModal}
      />
    </div>
  );
};

export default BookingDetailsPage;

export const ModalActions = ({
  setRequestAcceptedSuccessModal,
  setShowAcceptBookingConfirmation,
  handleUpdateStatus,
  isUpdatingStatus,
}) => {
  return (
    <div className="w-full grid grid-cols-2 gap-2 mt-5">
      <button
        type="button"
        onClick={() => setShowAcceptBookingConfirmation(false)}
        className="bg-[#0084AA]/20 text-black py-3 rounded-lg font-medium"
      >
        No
      </button>
      <button
        type="button"
        onClick={() => {
          handleUpdateStatus("INTERESTED");
          // setRequestAcceptedSuccessModal(true);
          // setShowAcceptBookingConfirmation(false);
        }}
        className="gradient-bg text-white py-3 rounded-lg font-medium"
      >
        {isUpdatingStatus ? "Loading..." : "Yes"}
      </button>
    </div>
  );
};

export const SuccessModalActions = ({
  setRequestAcceptedSuccessModal,
  setShowAcceptBookingConfirmation,
  setIsJobPending,
}) => {
  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => {
          setRequestAcceptedSuccessModal(false);
          setShowAcceptBookingConfirmation(false);
          setIsJobPending(true);
        }}
        className="bg-[var(--primary)] w-full text-white py-3 rounded-lg font-medium"
      >
        Done
      </button>
    </div>
  );
};
