import React, { useEffect, useState } from "react";
import {
  LogoPlaceholder,
  SuccessIcon,
  VerifyOtpIcon,
} from "../../../../assets/export";
import Button from "../../../../components/ui/Button";
import OtpInput from "../../../../components/ui/OtpInput";
import ResendOtp from "./ResendOtp";
import Modal from "../../../../components/ui/Modal";
import { useNavigate } from "react-router-dom";
import useUpdateTitle from "../../../../hooks/useUpdateTitle";
import {
  useRegisterMutation,
  useVerifyEmailOtpMutation,
  useVerifyOtpMutation,
} from "../../../../services/authApi/authApi";
import FormErrorMessage from "../../../../components/ui/FormErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSignupData,
  setSignupData,
} from "../../../../services/authApi/authSlice";
import Cookies from "js-cookie";
import { setUser } from "../../../../services/userService/userSlice";

const VerifyOtp = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();
  const [verifyOtp, { isLoading }] = useVerifyEmailOtpMutation();
  useUpdateTitle("Verify Email");
  const signupData = useSelector((state) => state.signup);
  const dispatch = useDispatch();
  const [resendError, setResendError] = useState("");
  console.log("signupData >> ", signupData);

  const [resendOtp, { isLoading: isResending }] = useRegisterMutation();

  const handleResendOtp = async () => {
    try {
      const payload = {
        fullName: signupData?.fullName,
        email: signupData?.email,
        password: signupData?.password,
        confirmPassword: signupData?.confirmPassword,
        otp: Number(finalOtp),
        role: signupData?.role,
        action: "SIGNUP",
      };
      await resendOtp(payload).unwrap();
    } catch (error) {
      apiError(
        error?.data?.error ||
          error?.data?.message ||
          error?.message ||
          "Something went wrong. Try again.",
      );
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const finalOtp = Array.isArray(otp) ? otp.join("") : otp;

      if (!/^\d{6}$/.test(finalOtp)) {
        setError("Please enter a valid 6-digit code");
        return;
      }

      const payload = {
        fullName: signupData?.fullName,
        email: signupData?.email,
        password: signupData?.password,
        confirmPassword: signupData?.confirmPassword,
        otp: Number(finalOtp),
        role: signupData?.role,
        action: "SIGNUP",
      };

      const res = await verifyOtp(payload).unwrap();
      Cookies.set("accessToken", res?.data?.accessToken);
      // dispatch(setUser(res?.data?.user));
      // dispatch(clearSignupData());
      setError("");
      setShowModal(true);
    } catch (error) {
      console.log(error?.data);
      setApiError(
        error.data?.error ||
          error.data?.message ||
          error.message ||
          "Something went wrong. Please try again.",
      );
    }
  };

  // Clear error when user types
  const handleOtpChange = (value) => {
    setOtp(value);
    if (error) setError("");
  };

  const handleCloseModal = () => {
    setShowModal(false);
    if (signupData?.role === "CUSTOMER") {
      navigate("/buyer/complete-profile");
    } else {
      navigate("/complete-profile");
    }
  };

  // auto close + navigate
  useEffect(() => {
    if (!showModal) return;

    const timer = setTimeout(() => {
      setShowModal(false);
      if (signupData?.role === "CUSTOMER") {
        navigate("/buyer/complete-profile");
      } else {
        navigate("/complete-profile");
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [showModal, navigate]);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[350px] relative space-y-6"
      >
        <img
          src={"/verify-otp-icon.png"}
          alt="verify otp icon"
          width={72}
          height={72}
          className="mx-auto"
        />

        <div className="w-full text-center">
          <h1 className="text-[32px] font-bold leading-none">Verify OTP</h1>
          {signupData && (
            <p className="secondary-text mt-3">
              The code was sent to{" "}
              <span className="text-black font-semibold">
                {signupData?.email}
              </span>
            </p>
          )}
        </div>

        {resendError && <FormErrorMessage apiError={resendError} />}
        {apiError && <FormErrorMessage apiError={apiError} />}

        {/* OTP Input */}
        <OtpInput
          length={6}
          value={otp}
          onChange={handleOtpChange}
          hasError={!!error}
        />

        {/* Error message */}
        {error && (
          <p className="text-red-500 text-xs text-center -mt-3">{error}</p>
        )}

        <Button
          type="submit"
          text="Verify"
          isLoading={isLoading}
          loader="Verifying..."
        />

        <ResendOtp
          setResendError={setResendError}
          resendError={resendError}
          handleResendOtp={handleResendOtp}
        />
      </form>

      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        icon={"/check-icon.png"}
        alt={"Success icon"}
        width={107}
        height={107}
        title="Email Address Verified"
        description="Email address has been verified successfully"
        footer={null}
      />
    </>
  );
};

export default VerifyOtp;
