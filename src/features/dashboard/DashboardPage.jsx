import React, { useEffect, useState } from "react";
import useUpdateTitle from "../../hooks/useUpdateTitle";
import BookingSection from "./components/BookingSection";
import ServiceSection from "./components/ServiceSection";
import HeroSection from "./components/HeroSections";
import {
  useGetMyServicesQuery,
  useGetServicesQuery,
} from "../../services/serviceApi/serviceApi";
import Loader from "../../components/ui/loader/Loader";
import { useGetUserProfileQuery } from "../../services/userService/userApi";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../services/userService/userSlice";

const DashboardPage = () => {
  useUpdateTitle("Dashboard");
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(null);

  const location = searchParams.get("location") || "";
  const search = searchParams.get("service") || "";

  // Fetch authenticated user's profile
  const {
    data: profileData,
    isLoading: profileLoading,
    isError: profileError,
  } = useGetUserProfileQuery();

  if (profileLoading) {
    return <Loader />;
  }

  if (profileError || !profileData?.data) {
    return <div>Failed to load profile.</div>;
  }

  const user = profileData.data;
  const isCustomer = user.role === "CUSTOMER";

  useEffect(() => {
    if (!user) return;
    dispatch(setUser(user));
  }, [user]);

  const {
    data: myServicesData,
    isLoading: myServicesLoading,
    isError: myServicesError,
  } = useGetMyServicesQuery(
    {
      page: 1,
      search,
      location,
      category: activeTab,
    },
    {
      skip: isCustomer,
      refetchOnFocus: true,
    },
  );

  const {
    data: publicServicesData,
    isLoading: publicServicesLoading,
    isError: publicServicesError,
  } = useGetServicesQuery(
    {
      page: 1,
      search,
      location,
      category: activeTab,
    },
    {
      skip: !isCustomer,
      refetchOnFocus: true,
    },
  );

  const services = isCustomer
    ? publicServicesData?.data?.data
    : myServicesData?.data?.data;

  const servicesLoading = isCustomer
    ? publicServicesLoading
    : myServicesLoading;

  const servicesError = isCustomer ? publicServicesError : myServicesError;

  return (
    <>
      {isCustomer ? <HeroSection /> : <BookingSection />}

      <ServiceSection
        services={services}
        isLoading={servicesLoading}
        isError={servicesError}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </>
  );
};

export default DashboardPage;
