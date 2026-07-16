import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { enqueueSnackbar } from "notistack";

import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";

import { LogoPlaceholder } from "../../assets/export";
import { useChangePasswordMutation } from "../../services/userService/userApi";
import EmailModal from "./components/EmailModal";
import OtpModal from "./components/OtpModal";

export default function ChangePasswordPage() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },

    validateOnChange: false,

    validationSchema: Yup.object({
      currentPassword: Yup.string().required("Current password is required"),

      newPassword: Yup.string()
        .required("New password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
          "Must contain uppercase, lowercase and number",
        ),

      confirmPassword: Yup.string()
        .required("Confirm password is required")
        .oneOf([Yup.ref("newPassword")], "Passwords do not match"),
    }),

    onSubmit: async (values, { resetForm }) => {
      try {
        await changePassword({
          oldPassword: values.currentPassword,

          newPassword: values.newPassword,
        }).unwrap();

        setShowSuccessModal(true);

        resetForm();
      } catch (error) {
        enqueueSnackbar(
          error?.data?.error ||
            error?.data?.message ||
            "Failed to update password",
          {
            variant: "error",
          },
        );
      }
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    formik.setFieldValue(name, value);
  };

  const renderPasswordField = ({ label, name, placeholder, show, setShow }) => (
    <div className="w-full space-y-1">
      <label className="text-sm font-semibold">{label}</label>
      <div
        className={`w-full flex items-center justify-between gap-2 bg-white custom-shadow rounded-[12px] h-[48px] px-4 ${
          formik.touched[name] && formik.errors[name]
            ? "border border-red-500"
            : ""
        }`}
      >
        <input
          type={show ? "text" : "password"}
          name={name}
          value={formik.values[name]}
          onChange={handleChange}
          onBlur={formik.handleBlur}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none text-sm"
        />

        <button type="button" onClick={() => setShow((prev) => !prev)}>
          {!show ? (
            <IoEyeOff className="text-xl text-gray-400" />
          ) : (
            <IoEye className="text-xl text-gray-400" />
          )}
        </button>
      </div>

      {formik.touched[name] && formik.errors[name] && (
        <p className="text-red-500 text-xs">{formik.errors[name]}</p>
      )}
    </div>
  );

  return (
    <>
      <div className="w-full">
        <h2 className="text-[24px] md:text-[28px] lg:text-[32px] font-bold mb-5">
          Change Password
        </h2>

        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderPasswordField({
              label: "Current Password",

              name: "currentPassword",

              placeholder: "Enter current password",

              show: showCurrentPass,

              setShow: setShowCurrentPass,
            })}

            {renderPasswordField({
              label: "New Password",

              name: "newPassword",

              placeholder: "Enter new password",

              show: showNewPass,

              setShow: setShowNewPass,
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div />

            {renderPasswordField({
              label: "Confirm Password",

              name: "confirmPassword",

              placeholder: "Confirm password",

              show: showConfirmPass,

              setShow: setShowConfirmPass,
            })}
          </div>

          <div className="flex flex-col items-end gap-4 justify-end mt-6">
            <button
              type="button"
              onClick={() => setShowEmailModal(true)}
              className="text-base font-medium"
            >
              Forgot Password?
            </button>
            <div className="w-[160px]">
              <Button
                type="submit"
                text="Save"
                loader="Saving..."
                isLoading={isLoading}
              />
            </div>
          </div>
        </form>
      </div>

      <Modal
        isOpen={showSuccessModal}
        icon={"/check-icon.png"}
        title="Password Updated!"
        description="Your password has been updated successfully."
        onClose={() => setShowSuccessModal(false)}
      />

      <EmailModal
        showEmailModal={showEmailModal}
        setShowEmailModal={setShowEmailModal}
        setShowOtpModal={setShowOtpModal}
      />

      <OtpModal
        showOtpModal={showOtpModal}
        setShowOtpModal={setShowOtpModal}
        setShowNewPassModal={setShowSuccessModal}
      />
    </>
  );
}
