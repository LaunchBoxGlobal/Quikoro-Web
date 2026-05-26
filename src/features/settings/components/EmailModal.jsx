import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import Modal from "../../../components/ui/Modal";
import { LogoPlaceholder } from "../../../assets/export";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import FormErrorMessage from "../../../components/ui/FormErrorMessage";

const EmailModal = ({ showEmailModal, setShowEmailModal, setShowOtpModal }) => {
  return (
    <Modal
      isOpen={showEmailModal}
      onClose={() => setShowEmailModal(false)}
      icon={LogoPlaceholder}
      width={106}
      height={106}
      title="Forgot Password"
      description="Enter your email address below. An OTP will be sent to your email."
      children={
        <Form
          setShowEmailModal={setShowEmailModal}
          setShowOtpModal={setShowOtpModal}
        />
      }
    />
  );
};

export default EmailModal;

const Form = ({ setShowEmailModal, setShowOtpModal }) => {
  const [apiError, setApiError] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Enter a valid email address")
        .required("Email is required"),
    }),

    onSubmit: (values) => {
      console.log(values);

      // API CALL HERE

      setShowEmailModal(false);
      setShowOtpModal(true);
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
    <form onSubmit={formik.handleSubmit} className="w-full space-y-4">
      {apiError && <FormErrorMessage apiError={apiError} />}
      <Input
        label="Email Address"
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formik.values.email}
        onChange={handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && formik.errors.email}
      />

      <div className="w-full mt-5">
        <Button
          type="submit"
          text="Send"
          loader="Sending..."
          isLoading={false}
        />
      </div>
    </form>
  );
};
