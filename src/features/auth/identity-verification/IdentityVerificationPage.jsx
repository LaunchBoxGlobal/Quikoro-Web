import React from "react";
import IdentityVerificationForm from "./components/IdentityVerificationForm";
import useUpdateTitle from "../../../hooks/useUpdateTitle";

const IdentityVerificationPage = () => {
  useUpdateTitle("Identity Verification");
  return <IdentityVerificationForm />;
};

export default IdentityVerificationPage;
