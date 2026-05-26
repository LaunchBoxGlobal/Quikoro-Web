import React, { useState } from "react";
import {
  ArrowLeft,
  ForgotPasswordIcon,
  LogoPlaceholder,
} from "../../../../assets/export";
import Input from "../../../../components/ui/Input";
import Button from "../../../../components/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { validationSchema, initialValues } from "../validation";
import { useForgotPasswordMutation } from "../../../../services/authApi/authApi";
import FormErrorMessage from "../../../../components/ui/FormErrorMessage";
import { useDispatch } from "react-redux";
import { setSignupData } from "../../../../services/authApi/authSlice";

const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const [forgotPassword, { isLoading, isError, error }] =
    useForgotPasswordMutation();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues,
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema,
    onSubmit: async (values) => {
      try {
        await forgotPassword(values).unwrap();
        dispatch(setSignupData(values));
        navigate("/verify-email");
      } catch (error) {
        console.error("Forgot password failed:", error);
        setApiError(
          error.data?.message ||
            error.data?.error ||
            "Failed to send reset email",
        );
      }
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
    <div className="w-full min-h-screen lg:h-full flex flex-col items-center justify-center relative">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-[350px] relative space-y-7"
      >
        <img
          src={LogoPlaceholder}
          alt="forgot password icon"
          width={106}
          height={106}
          className="mx-auto"
        />

        <div className="w-full text-center pt-3">
          <h1 className="text-[32px] font-bold leading-none">
            Forgot Password
          </h1>
          <p className="secondary-text mt-3">
            Enter your registered email address below
          </p>
        </div>

        {apiError && <FormErrorMessage apiError={apiError} />}

        <Input
          type="email"
          label="Email Address"
          placeholder="Enter your email address"
          name="email"
          value={formik.values.email}
          onChange={handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && formik.errors.email}
          bgColor="#fff"
        />

        <Button
          type="submit"
          text="Send"
          isLoading={isLoading}
          loader="Sending..."
          disabled={isLoading}
        />
      </form>

      <div className="w-full flex justify-center mt-10">
        <Link to={"/login"} className="flex items-center gap-1">
          <img src={ArrowLeft} alt="arrow left icon" width={18} height={18} />
          <span className="uppercase text-xs font-semibold">back</span>
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
