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

  const userAddress = getFullAddress(user);

  return (
    <div className="w-full min-h-screen">
      <h2 className="text-[28px] font-bold text-gray-900 mb-6 tracking-tight">
        Service Provider Details
      </h2>

      {/* Profile Card */}
      <ProfileHeader user={user} id={id} />

      {/* Tabs */}
      <div className="inline-flex bg-white p-2 rounded-[16px] mb-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] border border-gray-50 border-b overflow-x-auto w-full sm:w-auto min-w-[250px]">
        <button
          onClick={() => setActiveTab("basic")}
          className={`px-8 py-3 rounded-[12px] font-medium transition-colors whitespace-nowrap flex-1 sm:flex-none text-center ${activeTab === "basic" ? "bg-[#016A87] text-white shadow-sm" : "text-gray-700 hover:bg-gray-50"}`}
        >
          Basic Info
        </button>
        <button
          onClick={() => setActiveTab("id")}
          className={`px-8 py-3 rounded-[12px] font-medium transition-colors whitespace-nowrap flex-1 sm:flex-none text-center ${activeTab === "id" ? "bg-[#016A87] text-white shadow-sm" : "text-gray-700 hover:bg-gray-50"}`}
        >
          ID Cards
        </button>
        {user?.accountStatus !== "PENDING" && (
          <button
            onClick={() => setActiveTab("services")}
            className={`px-8 py-3 rounded-[12px] font-medium transition-colors whitespace-nowrap flex-1 sm:flex-none text-center ${activeTab === "services" ? "bg-[#016A87] text-white shadow-sm" : "text-gray-700 hover:bg-gray-50"}`}
          >
            Services
          </button>
        )}
        {user?.accountStatus !== "PENDING" && (
          <button
            onClick={() => setActiveTab("bookings")}
            className={`px-8 py-3 rounded-[12px] font-medium transition-colors whitespace-nowrap flex-1 sm:flex-none text-center ${activeTab === "bookings" ? "bg-[#016A87] text-white shadow-sm" : "text-gray-700 hover:bg-gray-50"}`}
          >
            Bookings
          </button>
        )}
      </div>

      {/* Details Box */}
      {activeTab === "basic" && (
        <div className="bg-white rounded-[24px] p-6 lg:p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] border border-gray-50">
          <h4 className="text-[22px] font-bold text-gray-900 mb-6">Details</h4>

          <div className="flex flex-col">
            <div className="py-5 border-t border-gray-100/80 flex flex-col gap-1.5">
              <span className="text-[13px] font-medium text-gray-500">
                Email Address
              </span>
              <span className="text-gray-900 font-medium whitespace-pre-wrap">
                {user?.email}
              </span>
            </div>

            {user?.gender && (
              <div className="py-5 border-t border-gray-100/80 flex flex-col gap-1.5">
                <span className="text-[13px] font-medium text-gray-500">
                  Gender
                </span>
                <span className="text-gray-900 font-medium">
                  {user?.gender || "N/A"}
                </span>
              </div>
            )}

            <div className="py-5 border-t border-gray-100/80 flex flex-col gap-1.5">
              <span className="text-[13px] font-medium text-gray-500">
                Location
              </span>
              <span className="text-gray-900 font-medium">
                {userAddress || "N/A"}
              </span>
            </div>

            <div className="py-5 border-t border-gray-100/80 flex flex-col gap-2">
              <span className="text-[13px] font-medium text-gray-500">
                Description
              </span>
              <span className="text-gray-900 font-[450] leading-relaxed text-[15px]">
                {user?.description}
              </span>
            </div>
          </div>
        </div>
      )}

      {activeTab === "id" && (
        <div className="bg-white rounded-[24px] p-6 lg:p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] border border-gray-50 min-h-[50vh]">
          <h4 className="text-[22px] font-bold text-gray-900 mb-6">ID Card</h4>
          <p className="text-gray-400 font-medium">No ID cards to display.</p>
        </div>
      )}
    </div>
  );
};

export default UserDetailsPage;
