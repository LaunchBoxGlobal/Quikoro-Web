import React from "react";
import Pagination from "../../../components/ui/Pagination";
import { Link } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { formatDate } from "../../../utils/formatDate";
import { formatBookingStatus } from "../../../utils/formatBookingStatus";
import { getBookingStatusColor } from "../../../utils/getBookingStatusColor";

const BOOKING_STATUS = [
  {
    title: "All",
    key: "ALL",
  },
  {
    title: "Pending",
    key: "IN_PROGRESS",
  },
  {
    title: "Interested",
    key: "INTERESTED",
  },
  {
    title: "Rejected",
    key: "CANCELLED",
  },
];

const ProviderBookingsTable = ({ bookings, pagination, setStatus, status }) => {
  return (
    <>
      {/* STATUS */}
      <div className="w-full my-7 flex items-center justify-end gap-5">
        {BOOKING_STATUS.map((s) => {
          return (
            <button
              type="button"
              key={s.key}
              onClick={() => setStatus(s?.key)}
              className={`font-medium ${status === s.key ? "gradient-text underline" : ""}`}
            >
              {s?.title}
            </button>
          );
        })}
      </div>

      {bookings && bookings?.length > 0 ? (
        <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base custom-shadow bg-white rounded-[12px] lg:rounded-[24px] p-2 min-h-screen">
          <table className="w-full text-sm text-left rtl:text-right text-body">
            <thead className="text-sm text-body rounded-base bg-[#013B4C]/10 rounded-[12px] lg:rounded-[24px]">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-4 font-medium rounded-l-[16px]"
                >
                  Service Name
                </th>
                <th scope="col" className="px-6 py-4 font-medium">
                  User Name
                </th>

                <th scope="col" className="px-6 py-4 font-medium">
                  Booking Date
                </th>
                <th scope="col" className="px-6 py-4 font-medium">
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-medium rounded-r-[16px]"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings &&
                bookings?.map((booking, i) => {
                  return (
                    <tr
                      key={i}
                      className="bg-neutral-primary border-b border-default"
                    >
                      <th className="px-6 py-4 font-normal whitespace-nowrap">
                        {booking?.service?.name}
                      </th>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="inline-flex items-center gap-2">
                          <div className="w-[40px] h-[40px] rounded-full border border-[#0084AA]">
                            <img
                              src={booking?.customer?.profilePicture}
                              alt={`${booking?.customer?.fullName} profile picture`}
                              width={40}
                              height={40}
                              className="w-full h-full rounded-full object-cover"
                            />
                          </div>
                          {booking?.customer?.fullName}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {formatDate(booking?.scheduledAt)}
                      </td>
                      <td
                        className={`px-6 py-4 ${getBookingStatusColor(booking?.status)} font-medium`}
                      >
                        {formatBookingStatus(booking?.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link
                          to={`/`}
                          className="gradient-text font-medium underline decoration-[#0084AA]"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>

          <Pagination pagination={pagination} />
        </div>
      ) : (
        <div className="w-full min-h-[50vh] flex items-center justify-center px-5 gap-2">
          <p className="">No bookings found.</p>
        </div>
      )}
    </>
  );
};

export default ProviderBookingsTable;
