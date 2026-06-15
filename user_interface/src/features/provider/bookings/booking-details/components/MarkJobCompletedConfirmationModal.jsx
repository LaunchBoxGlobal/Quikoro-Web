import React, { useState } from "react";
import Modal from "../../../../../components/ui/Modal";
import { useUpdateBookingStatusMutation } from "../../../../../services/bookingApi/bookingApi";
import { enqueueSnackbar } from "notistack";

const MarkJobCompletedConfirmationModal = ({
  showCompleteJobModal,
  onClose,
  refetch,
  setShowReviewModal,
  id,
}) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [updateBookingStatus, { isLoading: isUpdatingStatus }] =
    useUpdateBookingStatusMutation();

  const handleUpdateStatus = async () => {
    if (!id) {
      enqueueSnackbar("Something went wrong. Try again", {
        variant: "error",
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      return;
    }
    try {
      await updateBookingStatus({ id, data: { status: "COMPLETED" } }).unwrap();
      //   onClose();
      setIsCompleted(true);
      //   setShowReviewModal(true);
      refetch();
    } catch (error) {
      enqueueSnackbar(
        error?.data?.error ||
          error?.error ||
          error?.data?.message ||
          "Something went wrong. Try again",
        {
          variant: "error",
          autoHideDuration: 3000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        },
      );
    }
  };
  return (
    <>
      <Modal
        isOpen={showCompleteJobModal}
        icon={"/complete-job-icon.png"}
        onClose={onClose}
        width={106}
        height={106}
        title={isCompleted ? "Service Completed" : "Mark As Completed"}
        description={
          isCompleted
            ? "The job has been marked as completed. Customer will be asked to rate the service."
            : "Are you sure the job is completed? This action cannot be undone."
        }
        footer={
          <ModalActions
            onClose={onClose}
            isCompleted={isCompleted}
            handleUpdateStatus={handleUpdateStatus}
            setShowReviewModal={setShowReviewModal}
            isUpdatingStatus={isUpdatingStatus}
          />
        }
      />
    </>
  );
};

export default MarkJobCompletedConfirmationModal;

const ModalActions = ({
  onClose,
  isCompleted,
  handleUpdateStatus,
  setShowReviewModal,
  isUpdatingStatus,
}) => {
  return (
    <>
      {isCompleted ? (
        <div className="w-full grid grid-cols-2 gap-3">
          <button onClick={onClose} type="button" className="gray-button">
            Not Now
          </button>
          <button
            type="button"
            onClick={() => {
              setShowReviewModal(true);
              onClose();
            }}
            className="primary-button"
          >
            Write a Review
          </button>
        </div>
      ) : (
        <div className="w-full grid grid-cols-2 gap-3">
          <button onClick={onClose} type="button" className="gray-button">
            No
          </button>
          <button
            type="button"
            onClick={() => handleUpdateStatus()}
            className="primary-button disabled:cursor-not-allowed"
          >
            {isUpdatingStatus ? "Loading..." : "Yes"}
          </button>
        </div>
      )}
    </>
  );
};
