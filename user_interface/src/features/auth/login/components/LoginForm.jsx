import React, { useState } from "react";
import Input from "../../../../components/ui/Input";
import PasswordInput from "../../../../components/ui/PasswordInput";
import Button from "../../../../components/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { LogoPlaceholder, LogoSquare } from "../../../../assets/export";
import GoogleButton from "./GoogleButton";
import AppleButton from "./AppleButton";
import { useFormik } from "formik";
import * as Yup from "yup";
import { validationSchema, initialValues } from "../validation";
import { useLoginMutation } from "../../../../services/authApi/authApi";
import FormErrorMessage from "../../../../components/ui/FormErrorMessage";
import Cookies from "js-cookie";
import { setToken } from "../../../../hooks/useSetToken";
import { useDispatch } from "react-redux";
import { setUser } from "../../../../services/userService/userSlice";
import { socket } from "../../../../socket";

const LoginForm = () => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  // Shared by both email/password login and Google login — same post-auth routing rules either way
  const handleAuthSuccess = (user, accessToken) => {
    Cookies.set("accessToken", accessToken);
    dispatch(setUser(user));

    if (!user?.isProfileCompleted) {
      navigate("/complete-profile");
      return;
    }

    // blocked provider states
    if (
      user?.role === "PROVIDER" &&
      ["PENDING", "SUBMITTED", "REJECTED"].includes(user.accountStatus)
    ) {
      navigate("/account");
      return;
    }

    // approved provider
    if (user?.role === "PROVIDER" && user?.accountStatus === "ACTIVE") {
      navigate("/");
      return;
    }

    navigate("/");
  };

  const formik = useFormik({
    initialValues,
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const result = await login(values).unwrap();
        handleAuthSuccess(result?.data?.user, result?.data?.accessToken);
      } catch (error) {
        setApiError(
          error.data?.error ||
            error?.data?.message ||
            error?.message ||
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
      className="w-full max-w-[350px] space-y-5 bg-transparent"
    >
      <div className="w-full text-center">
        <img
          src={LogoPlaceholder}
          alt="logo"
          width={233}
          height={65}
          className="mx-auto"
        />
        <h1 className="text-[32px] mt-5 font-bold leading-none">
          Welcome Back
        </h1>
        <p className="secondary-text mt-3">Please enter details to continue</p>
      </div>

      {apiError && <FormErrorMessage apiError={apiError} />}

      <div className="w-full space-y-3">
        {/* Email */}
        <Input
          label="Email Address"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formik.values.email}
          onChange={handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && formik.errors.email}
          bgColor="#fff"
        />

        {/* Password */}
        <div className="w-full">
          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && formik.errors.password}
            bgColor="#fff"
          />

          <div className="w-full text-end mt-1">
            <Link
              to={"/forgot-password"}
              className="text-xs font-semibold leading-none"
            >
              Forgot Password?
            </Link>
          </div>
        </div>

        <Button
          type="submit"
          text="Login"
          isLoading={isLoading}
          loader="Logging in…"
        />
      </div>

      <div className="w-full flex items-center justify-between gap-3">
        <div className="w-full border border-gray-300" />
        <p className="text-gray-400">OR</p>
        <div className="w-full border border-gray-300" />
      </div>

      <div className="w-full space-y-3">
        {/* <AppleButton /> */}
        <GoogleButton onSuccess={handleAuthSuccess} onError={setApiError} />
      </div>

      <div className="w-full flex items-center justify-center gap-1 text-sm font-medium pt-4">
        <p className="text-[var(--secondary)]">Don’t have an account?</p>
        <Link to={`/choose-role`} className="font-semibold">
          Create Now
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
