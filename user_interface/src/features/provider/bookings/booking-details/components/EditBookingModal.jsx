import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CgClose } from "react-icons/cg";
import { LocationIcon, LogoPlaceholder } from "../../../../../assets/export";
import Input from "../../../../../components/ui/Input";
import DescriptionInput from "../../../../../components/ui/DescriptionInput";
import Button from "../../../../../components/ui/Button";
import { useUpdateBookingMutation } from "../../../../../services/bookingApi/bookingApi";
import { enqueueSnackbar } from "notistack";
import FormErrorMessage from "../../../../../components/ui/FormErrorMessage";
import { useParams } from "react-router-dom";
import { Star, ImagePlus, X } from "lucide-react";
import BookingCalendar from "../../../services/service-details/components/BookingCalendar";
// import BookingCalendar from "./BookingCalendar"; // adjust path as needed

const MAX_IMAGES = 5;
const MAX_FILE_SIZE = 5 * 1024 * 1024;

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

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      date: service?.scheduledAt
        ? new Date(service.scheduledAt).toISOString().split("T")[0]
        : "",
      serviceAddress: service?.address || "",
      additionalNotes: service?.additionalNotes || "",
      existingImages: service?.images || [],
      newImages: [],
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
            const DAY_NAMES = [
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ];
            const dayName = DAY_NAMES[new Date(value).getDay()];
            const availableDays = service?.service?.availableDays || [];
            return (
              availableDays.length === 0 || availableDays.includes(dayName)
            );
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

      newImages: Yup.array()
        .test("max-images", "Maximum 5 images allowed", function (value) {
          const totalImages =
            this.parent.existingImages.length + (value?.length || 0);
          return totalImages <= 5;
        })
        .test(
          "file-size",
          "Each image must be less than 5MB",
          (files) =>
            !files || files.every((file) => file.size <= MAX_FILE_SIZE),
        ),
    }),

    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const payload = new FormData();
        payload.append("address", values.serviceAddress.trim());
        payload.append("scheduledAt", values.date);
        payload.append("serviceId", service?.service?.id);
        payload.append("additionalNotes", values.additionalNotes.trim());
        payload.append("existingImages", JSON.stringify(values.existingImages));
        values.newImages.forEach((file) => {
          payload.append("newImages", file);
        });

        await updateBooking({ bookingData: payload, id }).unwrap();

        enqueueSnackbar("Booking has been updated successfully.", {
          variant: "success",
          autoHideDuration: 3000,
          anchorOrigin: { vertical: "bottom", horizontal: "right" },
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
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const totalImages =
      formik.values.existingImages.length +
      formik.values.newImages.length +
      files.length;

    if (totalImages > MAX_IMAGES) {
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

    formik.setFieldValue("newImages", [...formik.values.newImages, ...files]);
    e.target.value = "";
  };

  const removeExistingImage = (index) => {
    const updated = [...formik.values.existingImages];
    updated.splice(index, 1);
    formik.setFieldValue("existingImages", updated);
  };

  const removeNewImage = (index) => {
    const updated = [...formik.values.newImages];
    updated.splice(index, 1);
    formik.setFieldValue("newImages", updated);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center py-20 px-5">
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative body-image rounded-2xl w-full max-w-[465px] py-6 lg:py-7 px-5 lg:px-7 z-10 animate-scaleIn max-h-[95vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="w-[26px] h-[26px] lg:w-[36px] lg:h-[36px] custom-shadow rounded-lg flex items-center justify-center absolute top-4 right-4 z-30"
        >
          <CgClose />
        </button>

        <h2 className="text-[24px] font-bold text-start">Edit Request</h2>

        {apiError && <FormErrorMessage apiError={apiError} />}

        {/* Service card */}
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
          </div>
        </div>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="w-full mt-4">
          <div className="space-y-3">
            {/* Date — BookingCalendar */}
            <BookingCalendar
              availableDays={service?.service?.availableDays || []}
              value={formik.values.date}
              onChange={(dateStr) => {
                formik.setFieldValue("date", dateStr);
                formik.setFieldTouched("date", true);
              }}
              error={formik.errors.date}
              touched={formik.touched.date}
            />

            {/* Address */}
            <Input
              type="text"
              label="Service Address"
              name="serviceAddress"
              disabled={false}
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
          </div>

          {/* Images */}
          <div className="w-full mt-3">
            <label className="block text-sm font-semibold mb-2">
              Images (Optional)
            </label>

            <input
              id="edit-booking-images"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageUpload}
            />

            <label
              htmlFor="edit-booking-images"
              className="w-full h-[150px] bg-[#fff] border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-[var(--primary)] transition-all"
            >
              <ImagePlus size={40} className="text-gray-400" />
              <p className="text-sm text-gray-500 mt-2">Upload Images</p>
              <p className="text-xs text-gray-400">Max 5 images • 5MB each</p>
            </label>

            {formik.errors.newImages && (
              <p className="text-red-500 text-xs mt-2">
                {formik.errors.newImages}
              </p>
            )}

            {(formik.values.existingImages.length > 0 ||
              formik.values.newImages.length > 0) && (
              <div className="grid grid-cols-5 gap-3 mt-4">
                {formik.values.existingImages.map((image, index) => (
                  <div
                    key={`existing-${index}`}
                    className="relative max-h-[90px] rounded-xl overflow-hidden border"
                  >
                    <img
                      src={image}
                      alt="existing"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeExistingImage(index)}
                      className="absolute top-0 right-0 bg-white rounded-full p-1 shadow"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}

                {formik.values.newImages.map((file, index) => (
                  <div
                    key={`new-${index}`}
                    className="relative h-[90px] rounded-xl overflow-hidden border"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeNewImage(index)}
                      className="absolute top-1 right-1 bg-white rounded-full p-1 shadow"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <p className="text-xs text-gray-500 mt-2">
              {formik.values.existingImages.length +
                formik.values.newImages.length}
              /5 images selected
            </p>
          </div>

          <div className="w-full mt-4">
            <Button
              type="submit"
              text="Save Changes"
              loader="Saving..."
              isLoading={isLoading}
              disabled={isLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBookingModal;
