import { useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import { CheckIcon } from "../../assets/export";
import { useReportBugMutation } from "../../services/settingsApi/settingsApi";
import { useSelector } from "react-redux";
import FormErrorMessage from "../../components/ui/FormErrorMessage";

export default function ReportBugPage() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submitRequest, { isLoading, error }] = useReportBugMutation();
  const user = useSelector((state) => state.user.user);
  const fileInputRef = useRef(null);

  const handleToggleSuccessModal = () => {
    setShowSuccessModal((prev) => !prev);
  };

  const formik = useFormik({
    initialValues: {
      issue: "",
      image: null,
    },

    validateOnBlur: true,
    validateOnChange: true, // ← enables real-time clearing

    validationSchema: Yup.object({
      issue: Yup.string()
        .required("Please describe your issue")
        .min(10, "Description must be at least 10 characters")
        .max(1000, "Description cannot exceed 1000 characters"),

      image: Yup.mixed()
        .required("Please upload a screenshot")
        .test(
          "fileSize",
          "Image size must be less than 5MB",
          (value) => !value || value.size <= 5 * 1024 * 1024,
        )
        .test(
          "fileType",
          "Only JPG, JPEG, PNG and WEBP files are allowed",
          (value) =>
            !value ||
            ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
              value.type,
            ),
        ),
    }),

    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = new FormData();

        formData.append("name", user?.fullName);
        formData.append("email", user?.email);
        formData.append("description", values.issue);
        formData.append("image", values.image);

        await submitRequest(formData).unwrap();

        resetForm();
        setShowSuccessModal(true);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleImageChange = (e) => {
    const file = e.currentTarget.files[0];
    formik.setFieldValue("image", file);
    formik.setFieldTouched("image", true, false);
  };

  return (
    <>
      <div>
        <h2 className="text-[22px] md:text-[28px] lg:text-[32px] font-bold text-gray-900 tracking-tight mb-5 leading-none">
          Report A Bug
        </h2>

        {error && <FormErrorMessage apiError={error?.data?.error} />}

        <form onSubmit={formik.handleSubmit} className="w-full">
          <div className="mb-4">
            <label className="mb-1 block text-[16px] font-medium text-gray-900">
              Describe your problem
            </label>

            <textarea
              name="issue"
              value={formik.values.issue}
              onChange={formik.handleChange} // ← use formik's native handler
              onBlur={formik.handleBlur}
              placeholder="Describe your issue here..."
              className={`min-h-[220px] w-full resize-none rounded-[12px] bg-[#f5f5f5] p-5 text-[15px] text-gray-900 outline-none placeholder:text-gray-400 border
              ${
                formik.touched.issue && formik.errors.issue
                  ? "border-red-500"
                  : "border-transparent"
              }`}
            />

            {formik.touched.issue && formik.errors.issue && (
              <p className="text-red-500 text-xs mt-2">{formik.errors.issue}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="mb-1 block text-[16px] font-medium text-gray-900">
              Upload Screenshot
            </label>

            <input
              type="file"
              name="image"
              ref={fileInputRef}
              accept="image/png,image/jpeg,image/jpg,image/webp"
              onChange={handleImageChange}
              className="w-full rounded-[12px] bg-[#f5f5f5] p-4 border border-transparent"
            />

            {formik.values.image && (
              <p className="mt-2 text-sm text-gray-500">
                Selected: {formik.values.image.name}
              </p>
            )}

            {formik.touched.image && formik.errors.image && (
              <p className="text-red-500 text-xs mt-2">{formik.errors.image}</p>
            )}
          </div>

          <div className="flex justify-end">
            <div className="w-full max-w-[152px]">
              <Button
                type="submit"
                text="Send"
                isLoading={formik.isSubmitting}
                loader="Sending..."
              />
            </div>
          </div>
        </form>
      </div>

      <Modal
        isOpen={showSuccessModal}
        icon={"/check-icon.png"}
        width={106}
        height={106}
        onClose={handleToggleSuccessModal}
        title="Bug Report Submitted"
        description="Your report has been sent successfully!"
      />
    </>
  );
}
