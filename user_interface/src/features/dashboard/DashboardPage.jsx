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

  const search = searchParams.get("service") || "";

  const {
    data: profileData,
    isLoading: profileLoading,
    isError: profileError,
  } = useGetUserProfileQuery();

  const user = profileData?.data;
  const isCustomer = user?.role === "CUSTOMER";

  // Services are filtered by whatever address the user has saved on their
  // profile (set via the Navbar location picker) — not by a URL param.
  // If your backend actually expects lat/lng for proximity search rather
  // than the formatted address string, swap this for user?.latitude /
  // user?.longitude and adjust the service queries accordingly.
  const location = user?.location || "";

  // All hooks run unconditionally, every render — `skip` is what gates them,
  // not an early return. (The previous version called these hooks after an
  // early return, which breaks the Rules of Hooks.)
  useEffect(() => {
    if (!user) return;
    dispatch(setUser(user));
  }, [user, dispatch]);

  useEffect(() => {
    setPage(1);
  }, [activeTab, search, location]);

  const {
    data: myServicesData,
    isLoading: myServicesLoading,
    isError: myServicesError,
  } = useGetMyServicesQuery(
    {
      page,
      search,
      location,
      category: activeTab,
    },
    {
      skip: !user || isCustomer,
      refetchOnFocus: true,
    },
  );

  const {
    data: publicServicesData,
    isLoading: publicServicesLoading,
    isError: publicServicesError,
  } = useGetServicesQuery(
    {
      page,
      search,
      location,
      category: activeTab,
    },
    {
      skip: !user || !isCustomer,
      refetchOnFocus: true,
    },
  );

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
        page={page}
        setPage={setPage}
      />
    </>
  );
};

export default DashboardPage;
