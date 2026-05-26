import React from "react";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import useUpdateTitle from "../../../hooks/useUpdateTitle";

const ForgotPassword = () => {
  useUpdateTitle("Verify Email");
  return <ForgotPasswordForm />;
};

export default ForgotPassword;
