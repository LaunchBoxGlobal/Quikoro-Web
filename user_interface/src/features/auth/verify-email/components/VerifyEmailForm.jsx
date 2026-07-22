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
import { useNavigate, useSearchParams } from "react-router-dom";
import { useVerifyOtpMutation } from "../../../../services/authApi/authApi";
import { useDispatch, useSelector } from "react-redux";
import FormErrorMessage from "../../../../components/ui/FormErrorMessage";
import { setSignupData } from "../../../../services/authApi/authSlice";

const VerifyEmailForm = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || null;
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const signupdata = useSelector((state) => state.signup);
  const dispatch = useDispatch();
  const [apiError, setApiError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      setApiError("Enter complete OTP");
      return;
    }

    try {
      const res = await verifyOtp({
        email: signupdata?.email,
        otp: Number(finalOtp),
        action: "FORGOT-PASSWORD",
      }).unwrap();
      dispatch(setSignupData({ otp: finalOtp }));
      setShowModal(true);
    } catch (error) {
      console.error("Verify OTP failed:", error);
      setApiError(
        error.data?.error?.message ||
          error.data?.error ||
          "Failed to verify email",
      );
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // auto close + navigate
  useEffect(() => {
    if (!showModal) return;

    const timer = setTimeout(() => {
      setShowModal(false);
      navigate("/reset-password");
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
          <p className="secondary-text mt-3">
            The code was sent to{" "}
            {signupdata?.email && (
              <span className="text-black font-semibold">
                {signupdata?.email}
              </span>
            )}
          </p>
        </div>

        {apiError && <FormErrorMessage apiError={apiError} />}

        <OtpInput length={6} value={otp} onChange={setOtp} />

        <Button
          type="submit"
          text="Verify"
          disabled={isLoading}
          isLoading={isLoading}
          loader="Verifying..."
        />

        <ResendOtp />
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

export default VerifyEmailForm;
