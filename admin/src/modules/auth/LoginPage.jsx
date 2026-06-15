import React, { useState } from "react";
import Input from "../../components/ui/Input";
import PasswordInput from "../../components/ui/PasswordInput";
import Button from "../../components/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { validationSchema, initialValues } from "./validation";
import FormErrorMessage from "../../components/ui/FormErrorMessage";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setUser } from "../../services/authApi/userSlice";
import { useLoginMutation } from "../../services/authApi/authApi";

const LoginPage = () => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const formik = useFormik({
    initialValues,
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const result = await login(values).unwrap();
        Cookies.set("adminToken", result?.data?.accessToken);
        Cookies.set("adminData", JSON.stringify(result?.data?.user));
        const user = result?.data?.user;
        dispatch(setUser(user));

        navigate("/");
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
    <main className="w-full min-h-screen px-6 py-20 flex flex-col items-center justify-center body-image">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-[350px] space-y-5 bg-transparent"
      >
        <div className="w-full text-center">
          <img
            src={"/quikoro-logo.png"}
            alt="logo"
            width={233}
            height={65}
            className="mx-auto"
          />
          <h1 className="text-[32px] mt-5 font-bold leading-none">
            Welcome Back
          </h1>
          <p className="secondary-text mt-3">
            Please enter details to continue
          </p>
        </div>

        {apiError && <FormErrorMessage apiError={apiError} />}

        <div className="w-full flex flex-col items-center gap-3">
          {/* Email */}
          <Input
            label="Email Address"
            placeholder="Enter your email"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email}
            bgColor="#fff"
          />

          {/* Password */}
          <div className="w-full mb-2">
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
          </div>

          <Button
            type="submit"
            text="Login"
            isLoading={isLoading}
            loader="Logging in…"
          />
        </div>
      </form>
    </main>
  );
};

export default LoginPage;
