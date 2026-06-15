import React from "react";
import { GreenBackgroundBlur, Logo } from "../../assets/export";
import AppLogo from "./AppLogo";

const SuspenseLoader = () => {
  return (
    <main className="w-full h-screen p-6 bg-white flex items-center justify-center px-5">
      <AppLogo />
    </main>
  );
};

export default SuspenseLoader;
