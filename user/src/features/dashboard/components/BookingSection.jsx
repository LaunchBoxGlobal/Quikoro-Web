import { Link, useNavigate, useSearchParams } from "react-router-dom";
import BookingCard from "../../../components/ui/BookingCard";
import SectionTitle from "../../../components/ui/SectionTitle";
import { useGetBookingsQuery } from "../../../services/bookingApi/bookingApi";
import Loader from "../../../components/ui/loader/Loader";
import { Calendar } from "lucide-react";
import BookingFilters from "../../provider/bookings/components/BookingFilters";
import { useState } from "react";
import { BiError } from "react-icons/bi";
import Error from "../../../components/ui/Error";

export default function BookingSection() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeFilter, setActiveFilter] = useState("ALL");
  const { data, isLoading, isError, isFetching } = useGetBookingsQuery(
    {
      page: 1,
      limit: 20,
      status: activeFilter,
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );
  const bookings = data?.data?.data;
  const pagination = data?.data?.pagination;

  return (
    <section className="mb-12 foreground rounded-[2rem] bg-[var(--gray-bg)] p-8 lg:p-10">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <SectionTitle>Current Bookings</SectionTitle>

        <div className="">
          <Link to={`/booking-history`} className="primary-button">
            View All Bookings
          </Link>
        </div>
      </div>

      <BookingFilters
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />

      {isLoading || isFetching ? (
        <div className="w-full min-h-[50vh] flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          {isError ? (
            <Error />
          ) : (
            <>
              {bookings?.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {bookings?.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))}
                </div>
              ) : (
                <div className="w-full text-center flex items-center justify-center gap-1.5 h-[40vh]">
                  <Calendar size={17} className="secondary-text" />
                  <p className="secondary-text text-base font-medium">
                    No bookings found!
                  </p>
                </div>
              )}
            </>
          )}
        </>
      )}
    </section>
  );
}
