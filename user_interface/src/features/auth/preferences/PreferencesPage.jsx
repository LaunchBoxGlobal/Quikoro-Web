import React from "react";
import Button from "../../../components/ui/Button";
import { VerifyOtpIcon } from "../../../assets/export";
import PreferencesForm from "./components/PreferencesForm";
import useUpdateTitle from "../../../hooks/useUpdateTitle";

const PreferencesPage = () => {
  useUpdateTitle("Save Preferences");
  return <PreferencesForm />;
};

export default PreferencesPage;
