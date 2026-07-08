import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CgClose } from "react-icons/cg";
import { Star } from "lucide-react";
import { LocationIcon, LogoPlaceholder } from "../../../../../assets/export";
import Input from "../../../../../components/ui/Input";
import DescriptionInput from "../../../../../components/ui/DescriptionInput";
import Button from "../../../../../components/ui/Button";
import { useCreateBookingMutation } from "../../../../../services/bookingApi/bookingApi";
import { enqueueSnackbar } from "notistack";
import FormErrorMessage from "../../../../../components/ui/FormErrorMessage";
import { useSelector } from "react-redux";
import { ImagePlus, X } from "lucide-react";
import BookingCalendar from "./BookingCalendar";

const MAX_IMAGES = 5;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const BookServiceModal = ({
  onClose,
  service,
  setBookingSuccess,
  setBookingDetails,
}) => {
  const [apiError, setApiError] = useState("");
  const user = useSelector((state) => state.user.user);

  const address = [
    service?.streetAddress,
    service?.country,
    service?.state,
    service?.city,
    service?.zipCode,
  ]
    .filter(Boolean)
    .join(", ");

  const [createBooking, { isLoading }] = useCreateBookingMutation();

  const today = new Date().toISOString().split("T")[0];

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    const currentImages = formik.values.images || [];

    if (currentImages.length + files.length > MAX_IMAGES) {
      enqueueSnackbar(`Maximum ${MAX_IMAGES} images allowed`, {
        variant: "error",
      });
      return;
    }

    const invalidFile = files.find((file) => file.size > MAX_FILE_SIZE);

    if (invalidFile) {
      enqueueSnackbar(`${invalidFile.name} exceeds 5MB limit`, {
        variant: "error",
      });
      return;
    }

    formik.setFieldValue("images", [...currentImages, ...files]);

    e.target.value = "";
  };

  const removeImage = (index) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);

    formik.setFieldValue("images", updatedImages);
  };

  const formik = useFormik({
    initialValues: {
      date: "",
      serviceAddress: "",
      additionalNotes: "",
      images: [],
    },
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: Yup.object({
      date: Yup.date()
        .required("Date is required")
        .min(new Date(today), "Past dates are not allowed")
        .test(
          "available-day",
          "Selected day is not available",
          function (value) {
            if (!value) return true;
            const dayName = [
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ][new Date(value).getDay()];
            return (service?.availableDays || []).includes(dayName);
          },
        ),
      serviceAddress: Yup.string()
        .trim()
        .required("Service address is required")
        .min(10, "Address must be at least 10 characters")
        .max(250, "Address is too long"),

      additionalNotes: Yup.string()
        .trim()
        .max(1000, "Notes cannot exceed 1000 characters"),

      images: Yup.array()
        .max(5, "Maximum 5 images allowed")
        .test(
          "fileSize",
          "Each image must be less than 5MB",
          (files) =>
            !files || files.every((file) => file.size <= 5 * 1024 * 1024),
        ),
    }),
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const payload = new FormData();

        payload.append("address", values.serviceAddress.trim());

        payload.append("scheduledAt", values.date);

        payload.append("serviceId", service?.id);

        payload.append("additionalNotes", values.additionalNotes.trim());

        values.images.forEach((image) => {
          payload.append("images", image);
        });

        const res = await createBooking(payload).unwrap();

        setBookingDetails(res?.data);
        setBookingSuccess(true);

        resetForm();
        onClose();
      } catch (error) {
        enqueueSnackbar(
          error.data?.error ||
            error?.data?.message ||
            error?.message ||
            "Something went wrong. Please try again.",
          {
            variant: "error",
            autoHideDuration: 4000,
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          },
        );
        console.error("BOOKING ERROR >>> ", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center py-20 px-5">
      {/* overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* modal */}
      <div className="relative body-image rounded-2xl w-full max-w-[465px] py-6 lg:py-7 px-5 lg:px-7 z-10 animate-scaleIn max-h-[95vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="w-[26px] h-[26px] lg:w-[36px] lg:h-[36px] custom-shadow bg-white rounded-lg flex items-center justify-center absolute top-4 right-4 z-30"
        >
          <CgClose />
        </button>

        {/* title */}
        <h2 className="text-[24px] font-bold text-start">Send Request</h2>

        {/* description */}
        <p className="text-base text-[var(--secondary)] text-start mt-1">
          Fill in the details for your service
        </p>

        {/* {apiError && <FormErrorMessage apiError={apiError} />} */}

        {/* service card */}
        <div className="w-full bg-[#fff] p-3 flex items-center justify-between gap-4 mt-5 rounded-[12px]">
          <div className="flex items-center gap-2">
            <div className="min-w-[69px] max-w-[69px] h-[69px] flex items-center justify-center bg-white rounded-[12px] overflow-hidden">
              {service?.images?.length > 0 ? (
                <img
                  src={service?.images[0]}
                  alt="service"
                  className="object-cover w-full h-full"
                />
              ) : (
                <img
                  src={LogoPlaceholder}
                  alt="service"
                  className="object-cover"
                />
              )}
            </div>

            <div>
              <p className="text-base font-semibold leading-none">
                {service?.name}
              </p>

              <p className="text-[12px] font-semibold text-[#737373] my-1">
                {service?.category}
              </p>

              <div className="flex gap-1.5 items-start">
                <img
                  src={LocationIcon}
                  alt="location icon"
                  width={11}
                  height={13}
                  className="relative top-1"
                />

                <p className="text-[12px] leading-[1.2] font-semibold text-[#737373]">
                  {address}
                </p>
              </div>
            </div>
          </div>

          <div className="h-full flex flex-col items-end justify-between gap-y-6">
            <div className="flex items-center justify-end gap-1.5">
              <Star size={14} />
              <span className="text-sm font-semibold text-black">4.7</span>
            </div>
          </div>
        </div>

        {/* form */}
        <form onSubmit={formik.handleSubmit} className="w-full mt-4">
          <div className="space-y-3">
            {/* Date */}
            <BookingCalendar
              availableDays={service?.availableDays || []}
              value={formik.values.date}
              onChange={(dateStr) => {
                formik.setFieldValue("date", dateStr);
                formik.setFieldTouched("date", true);
              }}
              error={formik.errors.date}
              touched={formik.touched.date}
            />
            {/* User current Address */}
            <div className="w-full mt-1">
              <p className="text-sm font-semibold leading-none">
                Your Location
              </p>
              <div
                className="w-full bg-white mt-1.5 py-2 min-h-[48px] rounded-[12px] text-sm px-4 
        focus:border-[var(--primary)]"
              >
                <p className="text-sm">{user?.location}</p>
              </div>
            </div>
            {/* Address */}
            <Input
              type="text"
              label="Detailed Address"
              name="serviceAddress"
              placeholder="Enter your service address"
              value={formik.values.serviceAddress}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.serviceAddress}
              touched={formik.touched.serviceAddress}
              bgColor="#fff"
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
              bgColor="#fff"
            />
            {/* Images Upload */}
            <div className="w-full">
              <label className="block text-sm font-semibold mb-2">
                Upload Images (Optional)
              </label>

              <input
                type="file"
                accept="image/*"
                multiple
                id="booking-images"
                className="hidden"
                onChange={handleImageUpload}
              />

              <label
                htmlFor="booking-images"
                className="w-full h-[150px] bg-white border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-[var(--primary)] transition-all"
              >
                <ImagePlus size={40} className="text-gray-400" />

                <p className="text-sm text-gray-500 mt-2">
                  Click to upload images
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  Max 5 images • 5MB each
                </p>
              </label>

              {formik.errors.images && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.images}
                </p>
              )}

              {formik?.values?.images?.length > 0 && (
                <div className="grid grid-cols-5 gap-3 mt-4">
                  {formik?.values?.images?.map((file, index) => (
                    <div
                      key={index}
                      className="relative max-h-[90px] rounded-xl overflow-hidden"
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`preview-${index}`}
                        className="w-full h-full object-cover"
                      />

                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-0 -right-0 bg-white rounded-full p-1 shadow"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <p className="text-xs text-gray-500 mt-2">
                {formik.values.images.length}/5 images selected
              </p>
            </div>
          </div>

          <div className="w-full mt-4">
            <Button
              type="submit"
              text="Send"
              loader="Sending..."
              isLoading={isLoading}
              disabled={isLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookServiceModal;
