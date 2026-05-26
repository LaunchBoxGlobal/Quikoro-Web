import React from "react";
import { AuthMockup, GreenBackgroundBlur } from "../assets/export";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <main className="w-full min-h-screen relative overflow-hidden p-6 body-image flex items-center justify-center flex-col py-10">
      <Outlet />
    </main>
  );
};

export default AuthLayout;
