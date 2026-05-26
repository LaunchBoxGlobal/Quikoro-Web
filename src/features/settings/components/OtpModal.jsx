import React, { useRef } from "react";
import Modal from "../../../components/ui/Modal";
import { LogoPlaceholder } from "../../../assets/export";
import ResendOtp from "./ResendOtp";
import Button from "../../../components/ui/Button";
import { useFormik } from "formik";
import * as Yup from "yup";

const OtpModal = ({ showOtpModal, setShowOtpModal, setShowNewPassModal }) => {
  return (
    <>
      <Modal
        isOpen={showOtpModal}
        onClose={() => setShowOtpModal(false)}
        icon={LogoPlaceholder}
        width={106}
        height={106}
        title={`Verification`}
        children={
          <Form
            setShowOtpModal={setShowOtpModal}
            setShowNewPassModal={setShowNewPassModal}
          />
        }
      />
    </>
  );
};

export default OtpModal;

const Form = ({ setShowOtpModal, setShowNewPassModal }) => {
  const OTP_LENGTH = 6;
  const inputRefs = useRef([]);

  const formik = useFormik({
    initialValues: {
      otp: Array(OTP_LENGTH).fill(""),
    },

    validationSchema: Yup.object({
      otp: Yup.array().test(
        "complete-otp",
        "Please enter complete OTP",
        (value) => {
          if (!value) return false;

          const otp = value.join("");

          return otp.length === OTP_LENGTH && /^\d+$/.test(otp);
        },
      ),
    }),

    onSubmit: (values, { resetForm }) => {
      const finalOtp = values.otp.join("");
      resetForm();
      setShowOtpModal(false);
      setShowNewPassModal(true);

      console.log("OTP:", finalOtp);

      // API CALL HERE
    },
  });

  const handleChange = (e, index) => {
    const value = e.target.value;

    // allow only numbers
    if (!/^\d?$/.test(value)) return;

    const updatedOtp = [...formik.values.otp];
    updatedOtp[index] = value;

    formik.setFieldValue("otp", updatedOtp);

    // move to next input
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !formik.values.otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pastedData = e.clipboardData
      .getData("text")
      .trim()
      .slice(0, OTP_LENGTH);

    if (!/^\d+$/.test(pastedData)) return;

    const otpArray = pastedData.split("");

    const updatedOtp = [...Array(OTP_LENGTH)].map(
      (_, index) => otpArray[index] || "",
    );

    formik.setFieldValue("otp", updatedOtp);

    const focusIndex =
      otpArray.length >= OTP_LENGTH ? OTP_LENGTH - 1 : otpArray.length;

    inputRefs.current[focusIndex]?.focus();
  };
  return (
    <div className="w-full">
      <p className="text-[var(--secondary)]">
        Enter the OTP code sent to{" "}
        <span className="font-semibold text-black">john@example.com</span>
      </p>

      {/* FORM */}
      <form onSubmit={formik.handleSubmit} className="w-full mt-5">
        {/* OTP INPUTS */}
        <div className="grid grid-cols-6 gap-2">
          {formik.values.otp.map((digit, index) => {
            return (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                className={`w-full h-[52px] border rounded-[10px] text-center text-[20px] font-semibold outline-none transition-all focus:border-black ${formik.errors.otp && formik.submitCount > 0 ? "border-red-500" : "border-[#E5E7EB]"}`}
              />
            );
          })}
        </div>

        {/* ERROR */}
        {formik.errors.otp && formik.submitCount > 0 && (
          <p className="text-red-500 text-sm mt-2">{formik.errors.otp}</p>
        )}

        {/* RESEND */}
        <div className="w-full my-4 flex items-center gap-1">
          <p className="text-[var(--secondary)]">Didn’t receive code?</p>

          <ResendOtp
            onResend={() => {
              console.log("Resend OTP");

              // RESEND OTP API HERE
            }}
          />
        </div>

        {/* SUBMIT BUTTON */}
        <Button
          type="submit"
          text="Verify"
          isLoading={false}
          loader="Verifying..."
        />
      </form>
    </div>
  );
};
