import { useSelector } from "react-redux";
import { ChatIcon } from "../../../../../assets/export";

export default function BookingActions({
  setShowAcceptBookingConfirmation,
  setOpenChat,
  booking,
  handleUpdateStatus,
  setAcceptBooking,
  setCancellationModal,
  handleToggleMarkCompleteJobModal,
}) {
  const user = useSelector((state) => state.user.user);

  return (
    <div className="flex items-center justify-center lg:justify-end flex-wrap gap-4 w-full sm:w-auto mb-24 lg:mb-0">
      {user?.role === "CUSTOMER" && booking?.status === "IN_PROGRESS" && (
        <div className="w-full flex justify-end">
          <button
            type="button"
            onClick={() => setCancellationModal(true)}
            className="w-full sm:w-auto rounded-xl bg-[#EA5757] border-none px-8 py-3 font-medium text-white"
          >
            Cancel
          </button>
        </div>
      )}
      {user?.role === "CUSTOMER" && booking?.status === "INTERESTED" ? (
        <div className="w-full md:w-auto grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setCancellationModal(true)}
            className="w-full sm:w-auto rounded-xl bg-[#EA5757] border-none px-8 py-3 font-medium text-white"
          >
            Decline
          </button>

          <button
            type="button"
            onClick={() => {
              // handleUpdateStatus("IN_PROGRESS");
              setAcceptBooking(true);
            }}
            className="w-full sm:w-auto rounded-xl gradient-bg px-8 py-3 font-medium text-white transition-colors hover:bg-black"
          >
            Accept
          </button>
        </div>
      ) : (
        <>
          {user?.role === "PROVIDER" && booking?.status === "PENDING" && (
            <div className="w-full md:w-auto grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleUpdateStatus("NOT_INTERESTED")}
                className="w-full sm:w-auto rounded-xl bg-[#0084AA]/20 border border-[#E5E5E5] px-8 py-3 font-medium text-black"
              >
                Not Interested
              </button>

              <button
                type="button"
                onClick={() => setShowAcceptBookingConfirmation(true)}
                className="w-full sm:w-auto rounded-xl gradient-bg px-8 py-3 font-medium text-white transition-colors hover:bg-black"
              >
                Interested
              </button>
            </div>
          )}
          {user?.role === "PROVIDER" && booking?.status === "INTERESTED" && (
            <div className="w-full flex justify-end">
              <button
                type="button"
                onClick={() => setCancellationModal(true)}
                className="w-full sm:w-auto rounded-xl bg-[#EA5757] border border-[#EA5757] px-8 py-3 font-medium text-white"
              >
                Decline
              </button>

              {/* <button
                type="button"
                disabled={booking?.status === "INTERESTED"}
                onClick={() => handleUpdateStatus("INTERESTED")}
                className="w-full sm:w-auto rounded-xl bg-[#1c1c1e] px-8 py-3 font-medium text-white transition-colors hover:bg-black disabled:opacity-70 disabled:cursor-not-allowed"
              >
                Accepted
              </button> */}
            </div>
          )}

          {user?.role === "PROVIDER" && booking?.status === "IN_PROGRESS" && (
            <div className="w-full flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setCancellationModal(true)}
                className="w-full lg:max-w-[150px] rounded-xl bg-[#EA5757] border border-[#EA5757] px-8 py-3 font-medium text-white"
              >
                Cancel
              </button>

              <button
                type="button"
                // disabled={booking?.status === "INTERESTED"}
                onClick={() => handleToggleMarkCompleteJobModal()}
                className="w-full sm:w-auto rounded-xl gradient-bg px-8 py-3 font-medium text-white transition-colors hover:bg-black disabled:opacity-70 disabled:cursor-not-allowed"
              >
                Mark As Completed
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
