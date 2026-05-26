import { Pencil, User } from "lucide-react";
import BookingInfoItem from "./BookingInfoItem";
import NotesSection from "./NotesSection";
import { formatDate } from "../../../../../utils/formatDate";
import { useState } from "react";
import EditBookingModal from "./EditBookingModal";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { statusStyles } from "../../../../../utils/statusStyles";
// import { currentStatus } from "../../../../../utils/statusStyles";

export default function BookingCard({ booking }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleClose = () => setIsEditModalOpen((prev) => !prev);

  const user = useSelector((state) => state.user.user);
  const userId =
    user?.role === "CUSTOMER" ? booking?.provider?.id : booking?.customer?.id;
  const currentStatus = statusStyles[booking?.status] || {
    bg: "bg-gray-100",
    text: "text-gray-500",
  };

  return (
    <>
      <section className="mb-10 lg:mb-24 rounded-[2rem] bg-[var(--gray-bg)] p-6 lg:p-8">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 flex flex-col lg:flex-row gap-8 lg:gap-10">
          {/* Left Image */}
          <div className="flex h-64 lg:h-auto lg:w-72 shrink-0 items-center justify-center rounded-xl bg-[#18181b]">
            <img
              src={booking?.services?.images[0]}
              alt=""
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          {/* Right Content */}
          <div className="flex flex-1 flex-col justify-center">
            {/* Top */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
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
                {/* <div
                  className={`rounded-xl bg-orange-50 px-6 py-2.5 text-sm font-semibold text-orange-500`}
                >
                  {booking?.status}
                </div> */}
                <div
                  className={`rounded-xl px-6 py-2.5 text-sm font-semibold ${currentStatus.bg} ${currentStatus.text}`}
                >
                  {booking?.status?.replaceAll("_", " ")}
                </div>
              </div>
            </div>

            <hr className="mb-6 border-gray-100" />

            {/* Info */}
            <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
              <BookingInfoItem
                label="Service"
                value={booking?.service?.name || "N/A"}
              />

              <BookingInfoItem
                label="Date"
                value={
                  booking?.createdAt ? formatDate(booking?.createdAt) : "N/A"
                }
              />

              <BookingInfoItem
                label="Address"
                value={booking?.address || "N/A"}
              />
            </div>

            <hr className="mb-6 border-gray-100" />

            {/* Notes + Edit */}
            {booking?.additionalNotes && (
              <div className="w-full flex items-start justify-between gap-4 flex-wrap">
                <NotesSection booking={booking} />
                <div className="">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen((prev) => !prev)}
                    className="flex items-center gap-1.5 text-sm secondary-text font-medium"
                  >
                    <Pencil size={16} />
                    <span>Edit</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {isEditModalOpen && (
          <EditBookingModal service={booking} onClose={handleClose} />
        )}
      </section>
    </>
  );
}
