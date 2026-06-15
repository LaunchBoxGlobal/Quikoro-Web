import React, { useState } from "react";
import {
  useGetProviderBookingsQuery,
  useGetProviderServicesAndBookingsQuery,
} from "../../../services/userApi/userApi";
import PageLoader from "../../../components/ui/PageLoader";
import ErrorPage from "../../../components/ui/PageError";
import Loader from "../../../components/ui/Loader";
import ProviderBookingsTable from "./ProviderBookingsTable";

const ProviderBookings = ({ user }) => {
  const [status, setStatus] = useState("ALL");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data, isLoading, isError, refetch, isFetching } =
    useGetProviderBookingsQuery({
      providerId: user?.id,
      page,
      status,
      search,
    });
  const bookings = data?.data?.data;
  const pagination = data?.data?.pagination;

  if (isError) return <ErrorPage onRetry={refetch} />;

  return (
    <div className="bg-white rounded-[24px] p-6 lg:p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] border border-gray-50">
      <h3 className="text-[22px] font-bold text-gray-900 mb-6">
        Bookings {bookings && `(${bookings?.length})`}
      </h3>

      <div className="w-full border border-[#EAEAEA] my-5" />

      {isLoading || isFetching ? (
        <div className="w-full min-h-[50vh] flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <ProviderBookingsTable
          bookings={bookings}
          pagination={pagination}
          status={status}
          setStatus={setStatus}
          page={page}
          setPage={setPage}
        />
      )}
    </div>
  );
};

export default ProviderBookings;
