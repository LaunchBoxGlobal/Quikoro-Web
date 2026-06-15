import React from "react";
import SignupForm from "./components/SignupForm";
import useUpdateTitle from "../../../hooks/useUpdateTitle";

const SignupPage = () => {
  useUpdateTitle("Sign up");
  return <SignupForm />;
};

export default SignupPage;
