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
import { BiError } from "react-icons/bi";

const DashboardPage = () => {
  useUpdateTitle("Dashboard");
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("ALL");

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
    return (
      <div className="w-full min-h-screen flex items-center justify-center gap-2 bg-white custom-shadow rounded-3xl">
        <BiError className="text-gray-500" size={20} />
        <p className="text-gray-500">Failed to load profile.</p>
      </div>
    );
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
    isFetching: isFetchingMyServices,
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
    isFetching: isFetchingPublicServices,
  } = useGetServicesQuery(
    {
      page,
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

  const pagination = isCustomer
    ? publicServicesData?.data?.pagination
    : myServicesData?.data?.pagination;

  useEffect(() => {
    setPage(1);
  }, [activeTab, search, location]);

  return (
    <>
      {isCustomer ? <HeroSection /> : <BookingSection />}

      <ServiceSection
        services={services}
        isLoading={servicesLoading}
        isError={servicesError}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        pagination={pagination}
        pagination={pagination}
        page={page}
        setPage={setPage}
      />
    </>
  );
};

export default DashboardPage;
