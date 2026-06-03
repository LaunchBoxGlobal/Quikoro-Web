import { User } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import { useSelector } from "react-redux";
import { formatBookingStatus } from "../../utils/formatBookingStatus";

export default function BookingCard({ booking }) {
  const user = useSelector((state) => state.user.user);

  return (
    <Link to={`/booking-history/${booking?.id}`}>
      <div className="rounded-2xl bg-[var(--gray-bg)] p-6 shadow-sm">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            {user?.role === "CUSTOMER" ? (
              <div className="flex h-12 min-w-12 max-w-12 items-center justify-center rounded-full bg-[#18181b] text-white">
                {booking?.customer?.profilePicture ? (
                  <img
                    src={booking?.customer?.profilePicture}
                    alt=""
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User size={24} />
                )}
              </div>
            ) : (
              <div className="flex h-12 min-w-12 max-w-12 items-center justify-center rounded-full bg-[#18181b] text-white">
                {booking?.provider?.profilePicture ? (
                  <img
                    src={booking?.provider?.profilePicture}
                    alt=""
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User size={24} />
                )}
              </div>
            )}

            <span className="font-semibold text-base leading-none">
              {user?.role === "CUSTOMER"
                ? booking?.provider?.fullName
                : booking?.customer?.fullName}
            </span>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${booking?.status === "INTERESTED" ? "bg-[#0089DE1A] text-[#0089DE]" : booking?.status === "CANCELLED" ? "bg-red-100 text-red-500" : booking?.status === "COMPLETED" ? "bg-green-100 text-green-500" : "bg-orange-100 text-orange-500"}`}
          >
            {formatBookingStatus(booking?.status)}
          </span>
        </div>

        <p className="text-gray-500 text-[15px]">{booking?.service?.name}</p>

        <div className="mt-2 flex items-center gap-2 text-[15px] text-gray-500">
          <span>{formatDate(booking?.createdAt)}</span>

          {/* <span className="text-gray-400">•</span>

          <span>{booking.time}</span> */}
        </div>
      </div>
    </Link>
  );
}
