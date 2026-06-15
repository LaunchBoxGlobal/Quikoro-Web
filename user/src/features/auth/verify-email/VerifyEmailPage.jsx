import React from "react";
import VerifyEmailForm from "./components/VerifyEmailForm";
import useUpdateTitle from "../../../hooks/useUpdateTitle";

const VerifyEmailPage = () => {
  useUpdateTitle("Verify OTP");
  return <VerifyEmailForm />;
};

export default VerifyEmailPage;
