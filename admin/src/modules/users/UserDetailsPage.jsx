import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useAcceptRejectAccountMutation,
  useGetUserQuery,
} from "../../services/userApi/userApi";
import { getFullAddress } from "../../utils/getAddress";
import PageLoader from "../../components/ui/PageLoader";
import { enqueueSnackbar } from "notistack";
import ErrorPage from "../../components/ui/PageError";
import ProfileHeader from "./components/ProfileHeader";
import UserTabs from "../service-provider/components/UserTabs";
import UserDetails from "../service-provider/components/UserDetails";
import UserCardPictures from "../service-provider/components/UserCardPictures";
import ProviderServices from "../service-provider/components/ProviderServices";
import ProviderBookings from "../service-provider/components/ProviderBookings";

const UserDetailsPage = () => {
  const [activeTab, setActiveTab] = useState("basic");
  const { id } = useParams();

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
        User Details
      </h2>

      {/* Profile Card */}
      <ProfileHeader user={user} id={id} refetch={refetch} />

      {/* Tabs */}
      <UserTabs setActiveTab={setActiveTab} user={user} activeTab={activeTab} />

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
