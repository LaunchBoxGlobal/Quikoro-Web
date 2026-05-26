import React, { useState } from "react";
import { useSelector } from "react-redux";
import useUpdateTitle from "../../hooks/useUpdateTitle";
import BookingSection from "./components/BookingSection";
import ServiceSection from "./components/ServiceSection";
import HeroSection from "./components/HeroSections";
import {
  useGetMyServicesQuery,
  useGetServiceQuery,
  useGetServicesQuery,
} from "../../services/serviceApi/serviceApi";
import Loader from "../../components/ui/loader/Loader";
import { useGetUserProfileQuery } from "../../services/userService/userApi";
import { useSearchParams } from "react-router-dom";

const DashboardPage = () => {
  useUpdateTitle("Dashboard");
  const user = useSelector((state) => state.user?.user);
  const [searchParams] = useSearchParams();
  const location = searchParams.get("location") || "";
  const search = searchParams.get("service") || "";
  const isCustomer = user?.role === "CUSTOMER";
  const [activeTab, setActiveTab] = useState(null);

  const {
    data: myServicesData,
    isLoading: myServicesLoading,
    isError: myServicesError,
  } = useGetMyServicesQuery(
    { page: 1, search, location, category: activeTab },
    {
      skip: isCustomer,
      refetchOnFocus: true,
    },
  );

  // Public services
  const {
    data: publicServicesData,
    isLoading: publicServicesLoading,
    isError: publicServicesError,
  } = useGetServicesQuery(
    { page: 1, search, location, category: activeTab },
    {
      skip: !isCustomer,
      refetchOnFocus: true,
    },
  );

  const services = isCustomer
    ? publicServicesData?.data?.data
    : myServicesData?.data?.data;

  const isLoading = isCustomer ? publicServicesLoading : myServicesLoading;
  const isApiError = myServicesError || publicServicesError;

  return (
    <>
      {isCustomer ? <HeroSection /> : <BookingSection />}

      <ServiceSection
        services={services}
        isLoading={isLoading}
        isError={isApiError}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </>
  );
};

export default DashboardPage;
