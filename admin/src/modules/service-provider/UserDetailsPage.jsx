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

const UserDetailsPage = () => {
  const [activeTab, setActiveTab] = useState("basic");
  const { id } = useParams();
  const [status, setStatus] = useState("");
  const [acceptRejectAccount, { isLoading: isApprovingAccount }] =
    useAcceptRejectAccountMutation();

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

  const handleAcceptRejectAccount = async (accountStatus) => {
    setStatus(accountStatus);
    try {
      await acceptRejectAccount({ id, data: { accountStatus } }).unwrap();
      refetch();
      enqueueSnackbar("Account status has been updated", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar(
        error?.data?.error ||
          error?.data?.message ||
          "Something went wrong. Try again.",
        {
          variant: "error",
        },
      );
    } finally {
      setStatus("");
    }
  };

  return (
    <div className="w-full min-h-screen">
      <h2 className="text-[28px] font-bold text-gray-900 mb-6 tracking-tight">
        Service Provider Details
      </h2>

      {/* Profile Card */}
      <div className="bg-white rounded-[24px] p-6 lg:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] border border-gray-50 mb-6">
        <div className="flex items-center gap-6 mb-8 lg:mb-0">
          <div className="w-[100px] h-[100px] shrink-0 rounded-full border-2 border-[#016A87] p-1.5 flex items-center justify-center relative bg-white overflow-hidden">
            <img
              src={
                user?.profilePicture
                  ? user?.profilePicture
                  : "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80"
              }
              alt={`${user?.fullName} profile picture`}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <h3 className="text-[24px] font-bold text-gray-900 leading-tight">
              {user?.fullName}
            </h3>
            {user?.role === "PROVIDER" && (
              <p className="text-gray-500 font-medium text-sm">{user?.role}</p>
            )}
            {user?.role === "PROVIDER" && !user?.isProfileCompleted && (
              <p className="text-red-500 font-medium text-sm">
                Incomplete Profile
              </p>
            )}
          </div>
        </div>

        {user?.accountStatus === "PENDING" && (
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            <button
              type="button"
              disabled={isApprovingAccount}
              onClick={() => handleAcceptRejectAccount("REJECTED")}
              className="w-full sm:w-auto px-12 py-3.5 bg-[#EE5D5D] hover:bg-[#db5252] transition-colors text-white rounded-[14px] font-medium text-base shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === "REJECTED" && isApprovingAccount
                ? "Loading..."
                : "Reject"}
            </button>
            <button
              type="button"
              disabled={isApprovingAccount}
              onClick={() => handleAcceptRejectAccount("ACTIVE")}
              className="w-full sm:w-auto px-12 py-3.5 bg-[#016A87] hover:bg-[#01566d] transition-colors text-white rounded-[14px] font-medium text-base shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === "ACTIVE" && isApprovingAccount
                ? "Loading..."
                : "Accept"}
            </button>
          </div>
        )}
        {user?.accountStatus === "ACTIVE" && (
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            <button className="w-full sm:w-auto px-12 py-3.5 bg-[#EE5D5D] hover:bg-[#db5252] transition-colors text-white rounded-[14px] font-medium text-base shadow-sm">
              Disable
            </button>
          </div>
        )}
      </div>

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
