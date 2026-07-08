import React, { useState } from "react";
import PageLoader from "../../components/ui/PageLoader";
import PageError from "../../components/ui/PageError";
import { useGetDashboardStatsQuery } from "../../services/dashboardApi/dashboardApi";
import StatsCard from "./components/StatsCard";
import RegistrationStats from "./components/RegistrationStats";
import BookingsChart from "./components/BookingsChart";

const DashboardPage = () => {
  const [filterDates, setFilterDates] = useState({
    registrationStartDate: "",
    registrationEndDate: "",
    bookingStartDate: "",
    bookingEndDate: "",
  });

  const { data, isLoading, isError, refetch, isFetching } =
    useGetDashboardStatsQuery({
      ...filterDates,
    });

  if (isLoading) return <PageLoader />;
  if (isError) return <PageError />;

  const bookingStats = data?.data?.bookingStats;
  const registrationStats = data?.data?.registrationStats;

  const resetRegistrationFilters = () => {
    setFilterDates((prev) => ({
      ...prev,
      registrationStartDate: "",
      registrationEndDate: "",
    }));
  };

  const resetBookingFilters = () => {
    setFilterDates((prev) => ({
      ...prev,
      bookingStartDate: "",
      bookingEndDate: "",
    }));
  };

  return (
    <div className="w-full min-h-screen">
      <p className="font-medium text-[#565656]">Hello John Doe,</p>
      <h2 className="text-[22px] md:text-[28px] lg:text-[32px] leading-none font-semibold mt-2 mb-5">
        Welcome to quikoro
      </h2>

      <div className="w-full my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatsCard title={"Total Users"} count={data?.data?.totalUsers || 0} />
        <StatsCard
          title={"Total Service Provider"}
          count={data?.data?.totalProviders || 0}
        />
        <StatsCard
          title={"Total Bookings"}
          count={data?.data?.totalbookings || 0}
        />
        <StatsCard
          title={"Total Reports"}
          count={data?.data?.totalReports || 0}
        />
      </div>

      <RegistrationStats
        data={registrationStats}
        startDate={filterDates.registrationStartDate}
        endDate={filterDates.registrationEndDate}
        onDateChange={(type, value) =>
          setFilterDates((prev) => ({
            ...prev,
            [type]: value,
          }))
        }
        onReset={resetRegistrationFilters}
      />
      <BookingsChart
        data={bookingStats}
        startDate={filterDates.bookingStartDate}
        endDate={filterDates.bookingEndDate}
        onDateChange={(type, value) =>
          setFilterDates((prev) => ({
            ...prev,
            [type]: value,
          }))
        }
        onReset={resetBookingFilters}
      />
    </div>
  );
};

export default DashboardPage;
