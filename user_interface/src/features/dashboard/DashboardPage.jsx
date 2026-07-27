import React, { useEffect, useRef, useState } from "react";
import useUpdateTitle from "../../hooks/useUpdateTitle";
import BookingSection from "./components/BookingSection";
import ServiceSection from "./components/ServiceSection";
import HeroSection from "./components/HeroSections";
import {
  useGetMyServicesQuery,
  useGetServicesQuery,
} from "../../services/serviceApi/serviceApi";
import Loader from "../../components/ui/loader/Loader";
import {
  useGetUserProfileQuery,
  useUpdateLocationMutation,
} from "../../services/userService/userApi";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../services/userService/userSlice";
import { BiError } from "react-icons/bi";
import LocationButton from "../../components/ui/LocationButton";

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

  const location = user?.location || "";

  useEffect(() => {
    if (!user) return;
    dispatch(setUser(user));
  }, [user, dispatch]);

  // location states
  const [openLocationDropdown, setOpenLocationDropdown] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [hasAutoPromptedLocation, setHasAutoPromptedLocation] = useState(false);
  const locationRef = useRef(null);

  const [updateLocation, { isLoading: isSavingLocation }] =
    useUpdateLocationMutation();

  const handleToggleDropdown = () => setOpenLocationDropdown((prev) => !prev);

  const handleLocationConfirm = async (payload) => {
    try {
      await updateLocation(payload).unwrap();
      setSelectedAddress(payload.location);
      setOpenLocationDropdown(false);
    } catch (err) {
      console.error("Failed to update location:", err);
    }
  };

  useEffect(() => {
    if (user?.location) {
      setSelectedAddress(user.location);
    }
  }, [user?.location]);

  useEffect(() => {
    if (!user || hasAutoPromptedLocation) return;

    if (!user.location) {
      setOpenLocationDropdown(true);
    }

    setHasAutoPromptedLocation(true);
  }, [user, hasAutoPromptedLocation]);

  useEffect(() => {
    if (!openLocationDropdown) return;

    const handleClickOutside = (e) => {
      if (locationRef.current && !locationRef.current.contains(e.target)) {
        setOpenLocationDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openLocationDropdown]);

  //

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
      refetchOnReconnect: true,
      refetchOnMountOrArgChange: true,
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
      <LocationButton
        user={user}
        handleToggleDropdown={handleToggleDropdown}
        locationRef={locationRef}
        selectedAddress={selectedAddress}
        openLocationDropdown={openLocationDropdown}
        setOpenLocationDropdown={setOpenLocationDropdown}
        handleLocationConfirm={handleLocationConfirm}
        isSavingLocation={isSavingLocation}
      />
      {isCustomer ? (
        <HeroSection />
      ) : (
        <div className="mt-10">
          <BookingSection />
        </div>
      )}

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
