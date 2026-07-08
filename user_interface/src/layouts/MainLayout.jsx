import React from "react";
import Navbar from "../components/ui/Navbar";
import { GreenBackgroundBlur } from "../assets/export";
import Footer from "../components/ui/Footer";
import { Outlet } from "react-router-dom";
import useInternetStatus from "../hooks/useInternetStatus";
import NoInternet from "./NoInternet";

const MainLayout = () => {
  const isOnline = useInternetStatus();

  if (!isOnline) return <NoInternet />;

  return (
    <div className="min-h-screen body-image text-gray-900">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <Navbar />

        <hr className="mb-10 mt-2 border-gray-200" />

        <Outlet />

        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
