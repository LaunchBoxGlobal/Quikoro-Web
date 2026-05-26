import React, { useEffect, useState } from "react";
import {
  ForgotPasswordIcon,
  LogoPlaceholder,
  SuccessIcon,
} from "../../../../assets/export";
import PasswordInput from "../../../../components/ui/PasswordInput";
import Button from "../../../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import Modal from "../../../../components/ui/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { validationSchema, initialValues } from "../validation";
import { useResetPasswordMutation } from "../../../../services/authApi/authApi";
import FormErrorMessage from "../../../../components/ui/FormErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { clearSignupData } from "../../../../services/authApi/authSlice";

const SetNewPasswordForm = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [apiError, setApiError] = useState("");
  const signupdata = useSelector((state) => state.signup);
  const dispatch = useDispatch();

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleToggleModal = () => setShowModal((prev) => !prev);

  const formik = useFormik({
    initialValues,
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const payload = {
          email: signupdata?.email,
          otp: Number(signupdata?.otp),
          newPassword: values.password,
        };
        await resetPassword(payload).unwrap();
        dispatch(clearSignupData());
        setShowModal(true);
      } catch (error) {
        console.error("Reset password failed:", error);
        setApiError(
          error.data?.error ||
            error.message ||
            "Something went wrong. Please try again.",
        );
      }
    },
  });

  useEffect(() => {
    if (!showModal) return;

    const timer = setTimeout(() => {
      setShowModal(false);
      navigate("/login");
    }, 2000);

    return () => clearTimeout(timer);
  }, [showModal, navigate]);

  const handleChange = async (e) => {
    if (apiError) {
      setApiError("");
    }
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
    formik.setFieldTouched(name, true, false);
    await formik.validateField(name);
  };

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-[350px] relative space-y-7"
      >
        <img
          src={LogoPlaceholder}
          alt="forgot password icon"
          width={146}
          height={146}
          className="mx-auto"
        />

        <div className="w-full text-center pt-3">
          <h1 className="text-[32px] font-bold leading-none">
            Set New Password
          </h1>
          <p className="secondary-text mt-3">Enter new password to Continue</p>
        </div>

        {apiError && <FormErrorMessage apiError={apiError} />}

        {/* New Password */}
        <PasswordInput
          label="New Password"
          name="password"
          placeholder="Enter your new password"
          value={formik.values.password}
          onChange={handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && formik.errors.password}
          bgColor="#fff"
        />

        {/* Confirm Password */}
        <PasswordInput
          label="Confirm Password"
          name="confirmPassword"
          placeholder="Enter your new password"
          value={formik.values.confirmPassword}
          onChange={handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
          bgColor="#fff"
        />

        <Button
          type="submit"
          text="Save"
          loader="Saving..."
          isLoading={isLoading}
          disabled={isLoading || !(formik.isValid && formik.dirty)}
        />
      </form>

      <Modal
        isOpen={showModal}
        onClose={handleToggleModal}
        icon={SuccessIcon}
        alt="Success icon"
        width={107}
        height={107}
        title="Password Updated!"
        description="Your password has been reset successfully"
        footer={null}
      />
    </>
  );
};

export default SetNewPasswordForm;
