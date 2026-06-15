import React, { useState } from "react";
import ImageUpload from "./ImageUpload";
import Input from "../../../../components/ui/Input";
import PasswordInput from "../../../../components/ui/PasswordInput";
import Button from "../../../../components/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { validationSchema, initialValues } from "../validation";
import { useRegisterMutation } from "../../../../services/authApi/authApi";
import FormErrorMessage from "../../../../components/ui/FormErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { setSignupData } from "../../../../services/authApi/authSlice";
import Cookies from "js-cookie";

const SignupForm = () => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const [register, { isLoading }] = useRegisterMutation();

  const dispatch = useDispatch();
  const signupData = useSelector((state) => state.signup);

  const formik = useFormik({
    initialValues,
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema,
    onSubmit: async (values) => {
      try {
        dispatch(setSignupData(values));
        await register(values).unwrap();
        navigate("/verify-otp");
      } catch (error) {
        console.error("Signup failed:", error);
        setApiError(
          error.data?.error ||
            error.message ||
            "Something went wrong. Please try again.",
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
    <form
      onSubmit={formik.handleSubmit}
      className="w-full max-w-[350px] space-y-5 py-20 lg:py-10"
    >
      <div className="w-full text-center">
        <h1 className="text-[32px] font-bold leading-none">Sign Up</h1>
        <p className="secondary-text mt-3">Please enter details to continue</p>
      </div>

      {apiError && <FormErrorMessage apiError={apiError} />}

      <div className="w-full space-y-3">
        {/* Full Name */}
        <Input
          label="Full Name"
          name="fullName"
          placeholder="Enter your name"
          value={formik.values.fullName}
          onChange={handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.fullName && formik.errors.fullName}
          bgColor="#fff"
        />

        {/* Email */}
        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formik.values.email}
          onChange={handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && formik.errors.email}
          bgColor="#fff"
        />

        {/* Password */}
        <PasswordInput
          label="Password"
          name="password"
          placeholder="Enter your password"
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
          placeholder="Enter your password"
          value={formik.values.confirmPassword}
          onChange={handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
          bgColor="#fff"
        />

        <div className="w-full pt-2">
          <Button
            type="submit"
            text="Sign Up"
            isLoading={isLoading}
            loader="Loading..."
          />
        </div>
      </div>

      <div className="w-full flex items-center justify-between gap-3">
        <div className="w-full border border-gray-300" />
        <p className="text-gray-400">OR</p>
        <div className="w-full border border-gray-300" />
      </div>

      <div className="w-full flex items-center justify-center gap-1 text-xs font-medium">
        <p className="text-[var(--secondary)]">Already have an account?</p>
        <Link to={`/login`} className="font-semibold">
          Login Now
        </Link>
      </div>

      {/* Policies checkbox */}
      <div className="w-full flex flex-col items-start justify-center text-center gap-1 text-xs">
        <div className="w-full flex items-start justify-center gap-1">
          <input
            type="checkbox"
            name="policies"
            id="policies"
            checked={formik.values.policies}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="relative top-[2.5px]"
          />

          <label
            htmlFor="policies"
            className="text-[var(--secondary)] leading-[1.3]"
          >
            I accept{" "}
            <Link
              to={`/terms-and-conditions`}
              className="font-medium text-black"
            >
              Terms & Conditions
            </Link>{" "}
            and{" "}
            <Link to={`/privacy-policy`} className="font-medium text-black">
              Privacy Policy
            </Link>
          </label>
        </div>

        {/* Checkbox error */}
        {formik.touched.policies && formik.errors.policies && (
          <p className="text-red-500 text-xs relative left-7 md:left-10 top-2">
            {formik.errors.policies}
          </p>
        )}
      </div>
    </form>
  );
};

export default SignupForm;
