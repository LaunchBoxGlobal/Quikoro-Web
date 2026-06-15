import React from "react";
import SetNewPasswordForm from "./components/SetNewPasswordForm";
import useUpdateTitle from "../../../hooks/useUpdateTitle";

const SetNewPasswordPage = () => {
  useUpdateTitle("Reset Password");
  return <SetNewPasswordForm />;
};

export default SetNewPasswordPage;
