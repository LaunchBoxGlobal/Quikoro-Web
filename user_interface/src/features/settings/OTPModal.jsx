import { useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

import Button from "../../components/ui/Button";
import ResendOtp from "./components/ResendOtp";
import removeToken from "../../utils/removeToken";
import { clearUser } from "../../services/userService/userSlice";
import { useVerifyDeleteAccountOtpMutation } from "../../services/settingsApi/settingsApi";

const OTP_LENGTH = 6;

const OTPModal = ({ setShowSuccessModal, setOtpModal, user }) => {
  const inputRefs = useRef([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [verifyOtp, { isLoading }] = useVerifyDeleteAccountOtpMutation();

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

    onSubmit: async (values, { resetForm }) => {
      const finalOtp = values.otp.join("");

      try {
        await verifyOtp({
          otp: Number(finalOtp),
        }).unwrap();

        resetForm();
        setOtpModal(false);
        setShowSuccessModal(true);

        setTimeout(() => {
          removeToken();
          dispatch(clearUser());
          navigate("/login", { replace: true });
        }, 2000);
      } catch (error) {
        enqueueSnackbar(
          error?.data?.error ||
            error?.data?.message ||
            error?.message ||
            "Something went wrong.",
          {
            variant: "error",
            autoHideDuration: 3000,
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          },
        );
      }
    },
  });

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (!/^\d?$/.test(value)) return;

    const updatedOtp = [...formik.values.otp];
    updatedOtp[index] = value;

    formik.setFieldValue("otp", updatedOtp);

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

    const updatedOtp = Array.from(
      { length: OTP_LENGTH },
      (_, index) => otpArray[index] || "",
    );

    formik.setFieldValue("otp", updatedOtp);

    const focusIndex = Math.min(otpArray.length - 1, OTP_LENGTH - 1);

    inputRefs.current[focusIndex]?.focus();
  };

  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-between gap-4">
        <h3 className="text-[24px] font-semibold leading-none tracking-tight">
          Delete Account
        </h3>
      </div>

      <p className="text-[var(--secondary)] mt-2">
        The code was sent to{" "}
        <span className="font-semibold text-black">{user?.email}</span>
      </p>

      <form onSubmit={formik.handleSubmit} className="w-full mt-5">
        <div className="grid grid-cols-6 gap-2">
          {formik.values.otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              className={`w-full h-[52px] border rounded-[10px] text-center text-[20px] font-semibold outline-none transition-all focus:border-black ${
                formik.errors.otp && formik.submitCount > 0
                  ? "border-red-500"
                  : "border-[#E5E7EB]"
              }`}
            />
          ))}
        </div>

        {formik.errors.otp && formik.submitCount > 0 && (
          <p className="text-red-500 text-sm mt-2">{formik.errors.otp}</p>
        )}

        <div className="w-full my-4 flex items-center gap-1">
          <p className="text-[var(--secondary)]">Didn’t receive code?</p>

          <ResendOtp />
        </div>

        <Button
          type="submit"
          text="Verify"
          isLoading={isLoading}
          loader="Verifying..."
        />
      </form>
    </div>
  );
};

export default OTPModal;
