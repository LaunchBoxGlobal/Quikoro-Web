import { useSearchParams } from "react-router-dom";
import BookingCard from "../../../../components/ui/BookingCard";
import BookingFilters from "../components/BookingFilters";
import SectionTitle from "../../../../components/ui/SectionTitle";
import Search from "../../../../components/ui/Search";
import { useSelector } from "react-redux";
import { Calendar } from "lucide-react";
import { useGetBookingsQuery } from "../../../../services/bookingApi/bookingApi";
import Loader from "../../../../components/ui/loader/Loader";
import { useEffect, useState } from "react";
import Error from "../../../../components/ui/Error";
import Pagination from "../../../../components/ui/Pagination";

export default function BookingSection() {
  const user = useSelector((state) => state.user.user);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [page, setPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("q") || "";

  const { data, isLoading, isFetching, isError, refetch } = useGetBookingsQuery(
    {
      page,
      search,
      status: activeFilter === "ALL" ? "" : activeFilter.toUpperCase(),
    },
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    },
  );

  const bookings = data?.data?.data;
  const pagination = data?.data?.pagination;

  // Refetch the list whenever a booking status push notification arrives
  const lastBookingEvent = useSelector(
    (state) => state.bookingEvents.lastEvent,
  );

  useEffect(() => {
    if (!lastBookingEvent) return;
    refetch();
  }, [lastBookingEvent, refetch]);

  return (
    <section className="mb-16 rounded-[2rem] foreground p-8 lg:p-10">
      <div className="mb-8 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <SectionTitle>
          {user?.role === "CUSTOMER" ? "Bookings" : "Current Bookings"}
        </SectionTitle>
        <Search isLoading={isLoading} />
      </div>

      <hr className="mb-8 border-gray-200/80" />

      <BookingFilters
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      {isFetching ? (
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
                  {bookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))}
                </div>
              ) : (
                <div className="w-full min-h-[50vh] flex items-center justify-center gap-2">
                  <Calendar className="secondary-text" size={19} />
                  <p className="font-medium secondary-text text-sm">
                    No bookings found.
                  </p>
                </div>
              )}
            </>
          )}
        </>
      )}

      {pagination?.totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={pagination.totalPages}
          onPageChange={setPage}
        />
      )}
    </section>
  );
}
