import React, { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import {
  useAcceptRejectAccountMutation,
  useGetUserQuery,
} from "../../services/userApi/userApi";
import { getFullAddress } from "../../utils/getAddress";
import PageLoader from "../../components/ui/PageLoader";
import { enqueueSnackbar } from "notistack";
import ErrorPage from "../../components/ui/PageError";
import ProfileHeader from "./components/ProfileHeader";
import UserTabs from "./components/UserTabs";
import UserDetails from "./components/UserDetails";
import UserCardPictures from "./components/UserCardPictures";
import ProviderServices from "./components/ProviderServices";
import ProviderBookings from "./components/ProviderBookings";
import AccountApprovalConfirmationModal from "./components/AccountApprovalConfirmationModal";

const UserDetailsPage = () => {
  const { id } = useParams();

  const [searchParams] = useSearchParams();

  const activeTab = searchParams.get("tab") || "basic";

  const { data, isLoading, isFetching, isError, refetch } = useGetUserQuery(
    id,
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const user = data?.data;

  if (isLoading || isFetching) return <PageLoader />;
  if (isError) return <ErrorPage onRetry={refetch} />;

  return (
    <div className="w-full min-h-screen">
      <h2 className="text-[28px] font-bold text-gray-900 mb-6 tracking-tight">
        {user?.role === "CUSTOMER"
          ? "User Details"
          : "Service Provider Details"}
      </h2>

      {/* Profile Card */}
      <ProfileHeader user={user} id={id} refetch={refetch} />

      {/* Tabs */}
      <UserTabs user={user} />

      {/* Details Box */}
      {activeTab === "basic" && <UserDetails user={user} />}

      {/* provider card pictures */}
      {activeTab === "id" && <UserCardPictures user={user} />}

      {/* provider services */}
      {activeTab === "services" && <ProviderServices user={user} />}

      {/* provider bookings */}
      {activeTab === "bookings" && <ProviderBookings user={user} />}
    </div>
  );
};

export default UserDetailsPage;
