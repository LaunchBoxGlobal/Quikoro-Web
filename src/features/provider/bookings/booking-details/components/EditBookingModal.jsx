import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CgClose } from "react-icons/cg";
import { Star } from "lucide-react";

import { LocationIcon, LogoPlaceholder } from "../../../../../assets/export";

import Input from "../../../../../components/ui/Input";
import DescriptionInput from "../../../../../components/ui/DescriptionInput";
import Button from "../../../../../components/ui/Button";
import { useUpdateBookingMutation } from "../../../../../services/bookingApi/bookingApi";
import { enqueueSnackbar } from "notistack";
import FormErrorMessage from "../../../../../components/ui/FormErrorMessage";
import { useParams } from "react-router-dom";

const EditBookingModal = ({ onClose, service }) => {
  const [apiError, setApiError] = useState("");
  const { id } = useParams();

  const address = [
    service?.streetAddress,
    service?.country,
    service?.state,
    service?.city,
    service?.zipCode,
  ]
    .filter(Boolean)
    .join(", ");

  const [updateBooking, { isLoading }] = useUpdateBookingMutation();

  const today = new Date().toISOString().split("T")[0];

  console.log(service);

  const formik = useFormik({
    initialValues: true,

    initialValues: {
      date: service?.scheduledAt
        ? new Date(service.scheduledAt).toISOString().split("T")[0]
        : "",
      serviceAddress: service?.address || "",
      additionalNotes: service?.additionalNotes || "",
    },

    validateOnBlur: true,
    validateOnChange: true,

    validationSchema: Yup.object({
      date: Yup.date()
        .required("Date is required")
        .min(new Date(today), "Past dates are not allowed"),

      serviceAddress: Yup.string()
        .trim()
        .required("Service address is required")
        .min(10, "Address must be at least 10 characters")
        .max(250, "Address is too long"),

      additionalNotes: Yup.string()
        .trim()
        .max(1000, "Notes cannot exceed 1000 characters"),
    }),

    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const payload = {
          address: values.serviceAddress.trim(),
          scheduledAt: values.date,
          serviceId: service?.service?.id,
          additionalNotes: values.additionalNotes.trim(),
        };
        await updateBooking({
          bookingData: payload,
          id,
        }).unwrap();
        enqueueSnackbar("Booking has been updated succesfully.", {
          variant: "success",
          autoHideDuration: 3000,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });

        resetForm();
        onClose();
      } catch (error) {
        setApiError(
          error.data?.error ||
            error?.data?.message ||
            error?.message ||
            "Something went wrong. Please try again.",
        );
        console.error("BOOKING ERROR >>> ", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  console.log(service);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center py-20 px-5">
      {/* overlay */}
      {/* <div className="absolute inset-0 bg-black/50" onClick={onClose} /> */}
      <div className="absolute inset-0 bg-black/50" />

      {/* modal */}
      <div className="relative bg-white rounded-2xl w-full max-w-[465px] py-6 lg:py-7 px-5 lg:px-7 z-10 animate-scaleIn max-h-[95vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="w-[26px] h-[26px] lg:w-[36px] lg:h-[36px] custom-shadow rounded-lg flex items-center justify-center absolute top-4 right-4 z-30"
        >
          <CgClose />
        </button>

        {/* title */}
        <h2 className="text-[24px] font-bold text-start">Edit Request</h2>

        {/* description */}
        <p className="text-base text-[var(--secondary)] text-start mt-1">
          Edit the details for your service
        </p>

        {apiError && <FormErrorMessage apiError={apiError} />}

        {/* service card */}
        <div className="w-full bg-[#F3F3F3] p-3 flex items-center justify-between gap-4 mt-5 rounded-[12px]">
          <div className="flex items-center gap-2">
            <div className="min-w-[69px] max-w-[69px] h-[69px] flex items-center justify-center bg-white rounded-[12px] overflow-hidden">
              <img
                src={service?.service?.images[0]}
                alt="service"
                className="object-cover w-full h-full"
              />
            </div>

            <div>
              <p className="text-base font-semibold leading-none">
                {service?.service?.name}
              </p>
              {service?.service?.category && (
                <p className="text-[12px] font-semibold text-[#737373] my-1">
                  {service?.service?.category}
                </p>
              )}
            </div>
          </div>

          <div className="h-full flex flex-col items-end justify-between gap-y-6">
            <div className="flex items-center justify-end gap-1.5">
              <Star size={14} />
              <span className="text-sm font-semibold text-black">4.7</span>
            </div>

            <div className="w-[65px] bg-black text-white py-2 rounded-full text-[10px] font-semibold text-center">
              Boosted
            </div>
          </div>
        </div>

        {/* form */}
        <form onSubmit={formik.handleSubmit} className="w-full mt-4">
          <div className="space-y-3">
            {/* Date */}
            <Input
              type="date"
              label="Date"
              name="date"
              min={today}
              value={formik.values.date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.date}
              touched={formik.touched.date}
            />

            {/* Address */}
            <Input
              type="text"
              label="Service Address"
              name="serviceAddress"
              placeholder="Enter your service address"
              value={formik.values.serviceAddress}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.serviceAddress}
              touched={formik.touched.serviceAddress}
            />

            {/* Notes */}
            <DescriptionInput
              label="Additional Notes"
              name="additionalNotes"
              placeholder="Write any additional instructions..."
              value={formik.values.additionalNotes}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.additionalNotes}
              touched={formik.touched.additionalNotes}
            />
          </div>

          <div className="w-full mt-4">
            <Button
              type="submit"
              text="Send"
              loader="Sending..."
              isLoading={formik.isSubmitting}
              disabled={formik.isSubmitting || !formik.isValid}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBookingModal;
