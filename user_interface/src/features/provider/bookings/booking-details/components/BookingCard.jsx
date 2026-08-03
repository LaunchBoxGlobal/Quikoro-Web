import { Pencil, User } from "lucide-react";
import BookingInfoItem from "./BookingInfoItem";
import NotesSection from "./NotesSection";
import { formatDate } from "../../../../../utils/formatDate";
import { useState } from "react";
import EditBookingModal from "./EditBookingModal";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { statusStyles } from "../../../../../utils/statusStyles";
import Reviews from "./Reviews";
import ReviewList from "../../../services/service-details/components/ReviewList";
import StarRating from "../../../services/service-details/components/StarRating";
import ImageGallery from "./ImageGallery";
// import { currentStatus } from "../../../../../utils/statusStyles";

export default function BookingCard({ booking, notificationCount }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleClose = () => setIsEditModalOpen((prev) => !prev);

  const user = useSelector((state) => state.user.user);
  const userId =
    user?.role === "CUSTOMER" ? booking?.provider?.id : booking?.customer?.id;
  const currentStatus = statusStyles[booking?.status] || {
    bg: "bg-gray-100",
    text: "text-gray-500",
  };

  const currentUser =
    user?.role === "CUSTOMER" ? booking?.customer : booking?.provider;

  const reviews = booking?.ratings;

  return (
    <>
      <section className="mb-10 lg:mb-24 rounded-[2rem] bg-[var(--gray-bg)] p-6 lg:p-8">
        <div className="w-full rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <div className="w-full flex flex-col gap-0">
            <div className=" flex flex-col lg:flex-row gap-8 lg:gap-10">
              {/* Left Image */}
              <div className="flex h-64 lg:h-auto lg:w-72 shrink-0 items-center justify-center rounded-xl bg-[#18181b]">
                <img
                  src={
                    booking?.service?.images?.length > 0
                      ? booking?.service?.images[0]
                      : "/user-profile-placeholder.png"
                  }
                  alt={`${booking?.service?.name} picture`}
                  className="w-full h-full object-cover rounded-xl lg:max-h-72"
                />
              </div>

              {/* Right Content */}
              <div className="flex flex-1 flex-col justify-center">
                {/* Top */}
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <Link to={`/user/profile/${userId}`}>
                      <h2 className="mb-1 text-[28px] font-bold tracking-tight text-gray-900">
                        {user?.role === "CUSTOMER"
                          ? booking?.provider?.fullName
                          : booking?.customer?.fullName}
                      </h2>
                    </Link>
                  </div>

                  <div className="flex flex-row-reverse sm:flex-row items-center sm:items-start justify-end gap-6 sm:gap-8">
                    <div
                      className={`rounded-xl px-3 md:px-6 py-2.5 text-xs md:text-sm font-semibold ${currentStatus.bg} ${currentStatus.text}`}
                    >
                      {booking?.status?.replaceAll("_", " ")}
                    </div>
                  </div>
                </div>

                <hr className="my-6 border-gray-100" />

                {/* Info */}
                <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
                  <BookingInfoItem
                    label="Service"
                    value={booking?.service?.name || "N/A"}
                  />

                  <BookingInfoItem
                    label="Date"
                    value={
                      booking?.scheduledAt
                        ? formatDate(booking?.scheduledAt)
                        : "N/A"
                    }
                  />

                  <BookingInfoItem
                    label="Address"
                    value={booking?.address || "N/A"}
                  />
                </div>

                <hr className="mb-6 border-gray-100" />

                {/* Notes + Edit */}
                <div
                  className={`w-full ${booking?.status === "CANCELLED" && "grid grid-cols-1 lg:grid-cols-2 gap-5"}`}
                >
                  {booking?.additionalNotes && (
                    <div className="w-full flex items-start justify-between gap-4 flex-wrap">
                      <NotesSection booking={booking} />
                      {user?.role === "CUSTOMER" &&
                        booking?.status === "PENDING" && (
                          <div className="">
                            <button
                              type="button"
                              onClick={() =>
                                setIsEditModalOpen((prev) => !prev)
                              }
                              className="flex items-center gap-1.5 text-sm secondary-text font-medium"
                            >
                              <Pencil size={16} />
                              <span>Edit</span>
                            </button>
                          </div>
                        )}
                    </div>
                  )}

                  {/* cancellation reason */}
                  {booking?.status === "CANCELLED" &&
                    booking?.additionalNotes && (
                      <div className="text-sm flex flex-col items-start justify-between">
                        <span className="mb-2 text-[14px] text-red-500">
                          Cancellation Reason
                        </span>
                        <p className="text-[15px] leading-relaxed text-gray-800">
                          {booking?.cancellationReason}
                        </p>
                      </div>
                    )}
                </div>

                {/* <hr className="my-6 border-gray-100" /> */}
              </div>
            </div>

            <ImageGallery images={booking?.images} />
            <Reviews booking={booking} />
          </div>
        </div>

        {isEditModalOpen && (
          <EditBookingModal service={booking} onClose={handleClose} />
        )}
      </section>
    </>
  );
}
