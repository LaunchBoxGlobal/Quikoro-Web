import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import { CheckIcon } from "../../assets/export";
import { useSubmitSupportRequestMutation } from "../../services/settingsApi/settingsApi";
import { useSelector } from "react-redux";
import FormErrorMessage from "../../components/ui/FormErrorMessage";

export default function ContactSupportPage() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submitRequest, { isLoading, error }] =
    useSubmitSupportRequestMutation();
  const user = useSelector((state) => state.user.user);

  const handleToggleSuccessModal = () => {
    setShowSuccessModal((prev) => !prev);
  };

  const formik = useFormik({
    initialValues: {
      subject: "",
      issue: "",
    },

    validateOnBlur: true,
    validateOnChange: false,

    validationSchema: Yup.object({
      subject: Yup.string()
        .required("Subject is required")
        .min(3, "Subject must be at least 3 characters")
        .max(100, "Subject cannot exceed 100 characters"),

      issue: Yup.string()
        .required("Please describe your issue")
        .min(10, "Description must be at least 10 characters")
        .max(1000, "Description cannot exceed 1000 characters"),
    }),

    onSubmit: async (values, { resetForm }) => {
      try {
        console.log("Support payload:", values);
        const payload = {
          name: user?.fullName,
          email: user?.email,
          subject: values.subject,
          message: values.issue,
        };

        await submitRequest(payload).unwrap();

        resetForm();
        setShowSuccessModal(true);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleChange = async (e) => {
    const { name, value } = e.target;

    formik.setFieldValue(name, value);
    formik.setFieldTouched(name, true, false);

    await formik.validateField(name);
  };

  return (
    <>
      <div>
        <h2 className="text-[22px] md:text-[28px] lg:text-[32px] font-bold text-gray-900 tracking-tight mb-5 leading-none">
          Contact Support
        </h2>

        {error && <FormErrorMessage apiError={error?.data?.error} />}

        <form onSubmit={formik.handleSubmit} className="w-full">
          <div className="mb-4">
            <label className="mb-1 block text-[16px] font-medium text-gray-900">
              Subject
            </label>

            <input
              type="text"
              name="subject"
              value={formik.values.subject}
              onChange={handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter subject"
              className={`h-[56px] w-full rounded-[12px] bg-[#f5f5f5] px-5 text-[15px] text-gray-900 outline-none placeholder:text-gray-400 border
    ${
      formik.touched.subject && formik.errors.subject
        ? "border-red-500"
        : "border-transparent"
    }`}
            />

            {formik.touched.subject && formik.errors.subject && (
              <p className="text-red-500 text-xs mt-2">
                {formik.errors.subject}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="mb-1 block text-[16px] font-medium text-gray-900">
              Describe your problem
            </label>

            <textarea
              name="issue"
              value={formik.values.issue}
              onChange={handleChange}
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
        icon={CheckIcon}
        width={106}
        height={106}
        onClose={handleToggleSuccessModal}
        title="Report Submitted"
        description="Your report has been sent successfully!"
      />
    </>
  );
}
