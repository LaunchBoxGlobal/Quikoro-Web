import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  useForgotPasswordMutation,
  useRegisterMutation,
} from "../../../../services/authApi/authApi";

const ResendOtpForgotPassword = ({
  duration = 60,
  onResend,
  resendError,
  setResendError,
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const signupData = useSelector((state) => state.signup);
  // const [register, { isLoading }] = useRegisterMutation();
  const [resendOtp, { isLoading }] = useRegisterMutation();
  const [apiError, setApiError] = useState("");

  // countdown effect
  useEffect(() => {
    if (!isActive) return;

    if (timeLeft === 0) {
      setIsActive(false);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, isActive]);

  const handleResend = async () => {
    if (isActive || loading) return;

    try {
      setLoading(true);

      await resendOtp({ email: signupData?.email }).unwrap();

      setTimeLeft(duration);
      setIsActive(true);
    } catch (error) {
      setApiError(
        error.data?.error?.message ||
          error.data?.message ||
          error.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-center gap-1">
      <p className="text-[var(--secondary)]">Didn't receive the code?</p>

      {isActive ? (
        <span className="font-medium text-gray-500">Resend in {timeLeft}s</span>
      ) : (
        <button
          type="button"
          onClick={handleResend}
          disabled={isLoading}
          className="font-medium text-black disabled:opacity-50"
        >
          {isLoading ? "Sending..." : "Resend"}
        </button>
      )}
    </div>
  );
};

export default ResendOtpForgotPassword;
