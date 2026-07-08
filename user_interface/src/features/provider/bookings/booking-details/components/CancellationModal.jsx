import React, { useState } from "react";
import Modal from "../../../../../components/ui/Modal";
import { LogoPlaceholder } from "../../../../../assets/export";
import Button from "../../../../../components/ui/Button";
import { useUpdateBookingStatusMutation } from "../../../../../services/bookingApi/bookingApi";
import { useParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import FormErrorMessage from "../../../../../components/ui/FormErrorMessage";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  cancellationReason: Yup.string()
    .trim()
    .required("Cancellation reason is required")
    .min(10, "Reason must be at least 10 characters")
    .max(500, "Reason cannot exceed 500 characters"),
});

const CancellationModal = ({
  refetch,
  cancellationModal,
  setCancellationModal,
  setApiError,
  setCancellationSuccessModal,
}) => {
  const user = useSelector((state) => state.user.user);
  const userRole = user?.role === "CUSTOMER" ? "provider" : "customer";
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
  const { id } = useParams();

  const [updateBookingStatus, { isLoading }] = useUpdateBookingStatusMutation();

  const formik = useFormik({
    initialValues: {
      cancellationReason: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await updateBookingStatus({
          id,
          data: {
            status: "CANCELLED",
            cancellationReason: values.cancellationReason,
          },
        }).unwrap();

        setCancellationSuccessModal(true);
        refetch();
      } catch (error) {
        setApiError(error?.data?.error || "Something went wrong");
      } finally {
        setAcceptBooking(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="w-full mt-4 space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">
          Cancellation Reason
        </label>

        <textarea
          name="cancellationReason"
          rows={5}
          maxLength={500}
          placeholder="Please tell us why you're cancelling this booking..."
          value={formik.values.cancellationReason}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full rounded-lg border border-gray-300 p-3 resize-none focus:outline-none"
        />

        <div className="flex justify-between mt-1">
          {/* <FormErrorMessage
            error={
              formik.touched.cancellationReason &&
              formik.errors.cancellationReason
            }
          /> */}

          <span className="text-xs text-gray-500 ml-auto">
            {formik.values.cancellationReason.length}/500
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setAcceptBooking(false)}
          className="bg-[var(--secondary-button-bg)] text-black py-3 rounded-lg font-medium"
        >
          No
        </button>

        <button
          type="submit"
          disabled={isLoading}
          className="gradient-bg text-white py-3 rounded-lg font-medium disabled:opacity-50"
        >
          {isLoading ? "Loading..." : "Yes"}
        </button>
      </div>
    </form>
  );
};
