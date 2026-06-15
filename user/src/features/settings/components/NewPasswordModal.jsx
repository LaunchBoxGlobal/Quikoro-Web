import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import Modal from "../../../components/ui/Modal";
import { LogoPlaceholder } from "../../../assets/export";
import PasswordInput from "../../../components/ui/PasswordInput";
import Button from "../../../components/ui/Button";
import FormErrorMessage from "../../../components/ui/FormErrorMessage";

const NewPasswordModal = ({
  showNewPassModal,
  setShowNewPassModal,
  setShowSuccessModal,
}) => {
  return (
    <Modal
      isOpen={showNewPassModal}
      icon={LogoPlaceholder}
      onClose={() => setShowNewPassModal(false)}
      title="Set New Password"
      description="Enter your new password to reset your password"
      children={
        <Form
          setShowNewPassModal={setShowNewPassModal}
          setShowSuccessModal={setShowSuccessModal}
        />
      }
    />
  );
};

export default NewPasswordModal;

const Form = ({ setShowNewPassModal, setShowSuccessModal }) => {
  const [apiError, setApiError] = useState("");

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },

    validationSchema: Yup.object({
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
          "Must contain uppercase, lowercase and number",
        ),

      confirmPassword: Yup.string()
        .required("Confirm password is required")
        .oneOf([Yup.ref("password")], "Passwords do not match"),
    }),

    onSubmit: (values, { resetForm }) => {
      console.log(values);
      resetForm();
      setShowNewPassModal(false);
      setShowSuccessModal(true);
    },
  });

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
    <form onSubmit={formik.handleSubmit} className="w-full mt-4 space-y-3">
      {apiError && <FormErrorMessage apiError={apiError} />}
      <PasswordInput
        label="New Password"
        name="password"
        value={formik.values.password}
        onChange={handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && formik.errors.password}
      />

      <PasswordInput
        label="Confirm Password"
        name="confirmPassword"
        value={formik.values.confirmPassword}
        onChange={handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.confirmPassword && formik.errors.confirmPassword}
      />

      <div className="w-full pt-2">
        <Button
          type="submit"
          text="Save"
          isLoading={false}
          loader="Saving..."
        />
      </div>
    </form>
  );
};
