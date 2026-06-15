import React from "react";
import CompleteProfileForm from "./components/CompleteProfileForm";
import useUpdateTitle from "../../../hooks/useUpdateTitle";

const CompleteProfilePage = () => {
  useUpdateTitle("Complete Profile");
  return <CompleteProfileForm />;
};

export default CompleteProfilePage;
