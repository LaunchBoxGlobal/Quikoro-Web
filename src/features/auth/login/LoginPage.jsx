import React from "react";
import LoginForm from "./components/LoginForm";
import useUpdateTitle from "../../../hooks/useUpdateTitle";

const LoginPage = () => {
  useUpdateTitle("Login");
  return <LoginForm />;
};

export default LoginPage;
