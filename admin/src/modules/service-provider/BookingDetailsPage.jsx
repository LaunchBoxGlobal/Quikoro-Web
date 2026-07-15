import React from "react";
import { useParams } from "react-router-dom";
import { useGetBookingByIdQuery } from "../../services/bookingApi/bookingApi";
import Loader from "../../components/ui/Loader";
import ErrorPage from "../../components/ui/PageError";
import { formatDate } from "../../utils/formatDate";
import { getStatusStyles } from "../../utils/getStatusStyles";

const BookingDetailsPage = () => {
  const { id, bookingId } = useParams();

  const { data, isLoading, isError, refetch } = useGetBookingByIdQuery({
    endpoint: `/admin/providers/${id}/bookings/${bookingId}`,
  });
  const booking = data?.data;

  if (isError) return <ErrorPage onRetry={refetch} />;

  if (isLoading) return <Loader />;

  const { text, bg } = getStatusStyles(booking.status);

  return (
    <div className="min-h-screen w-full text-gray-900">
      <div className="mx-auto">
        <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <h1 className="text-[32px] font-bold tracking-tight">
            Booking Details
          </h1>
        </div>

        {isLoading ? (
          <div className="w-full min-h-[50vh] rounded-3xl pt-20 flex items-center justify-center bg-white">
            <Loader />
          </div>
        ) : (
          <section className="">
            <div className="rounded-2xl foreground border border-gray-200 p-6 sm:p-8 lg:p-10 flex items-start gap-4">
              <div className="w-full max-w-[300px] rounded-[12px]">
                <img
                  src={booking?.service?.images[0]}
                  alt=""
                  className="w-full object-cover rounded-[12px]"
                />
              </div>
              <div className="w-full">
                <div className="w-full">
                  <div className="w-full flex items-center justify-between gap-4 flex-wrap">
                    <h3 className="text-[24px] font-bold leading-none">
                      {booking?.customer?.fullName}
                    </h3>
                    <span
                      className={`text-xs font-semibold px-3 py-1.5 rounded-md ${text} ${bg}`}
                    >
                      {booking?.status}
                    </span>
                  </div>

                  <hr className="w-full my-5" />

                  <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="">
                      <h4 className="text-sm font-medium text-[#787878]">
                        Service
                      </h4>
                      <p className="text-sm font-medium text-[#181818]">
                        {booking?.service?.name}
                      </p>
                    </div>
                    <div className="">
                      <h4 className="text-sm font-medium text-[#787878]">
                        Date
                      </h4>
                      <p className="text-sm font-medium text-[#181818]">
                        {formatDate(booking?.scheduledAt)}
                      </p>
                    </div>
                    <div className="">
                      <h4 className="text-sm font-medium text-[#787878]">
                        Address
                      </h4>
                      <p className="text-sm font-medium text-[#181818]">
                        {booking?.address}
                      </p>
                    </div>
                  </div>

                  <hr className="w-full my-5" />

                  <div className="w-full">
                    <h4 className="text-sm font-medium text-[#787878]">
                      Notes:
                    </h4>
                    <p className="text-sm font-medium text-[#181818]">
                      {booking?.additionalNotes}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default BookingDetailsPage;
