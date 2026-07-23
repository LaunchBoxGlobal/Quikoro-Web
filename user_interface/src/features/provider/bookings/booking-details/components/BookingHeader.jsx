import React, { useState } from "react";
import SectionTitle from "../../../../../components/ui/SectionTitle";
import BookingActions from "./BookingActions";
import { Send, User, X } from "lucide-react";
import ChatWindow from "./ChatWindow";

const BookingHeader = ({
  setShowAcceptBookingConfirmation,
  isJobPending,
  openChat,
  setOpenChat,
  booking,
  handleUpdateStatus,
  setAcceptBooking,
  setCancellationModal,
  handleToggleMarkCompleteJobModal,
  setShowReviewModal,
  setDeclineModal,
}) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    setMessage("");
  };

  return (
    <>
      <div className="w-full flex items-center justify-between flex-wrap gap-6 relative mb-8">
        <SectionTitle>
          <span className="whitespace-nowrap">Booking Details</span>
        </SectionTitle>

        <BookingActions
          setShowAcceptBookingConfirmation={setShowAcceptBookingConfirmation}
          setOpenChat={setOpenChat}
          booking={booking}
          handleUpdateStatus={handleUpdateStatus}
          setAcceptBooking={setAcceptBooking}
          setCancellationModal={setCancellationModal}
          handleToggleMarkCompleteJobModal={handleToggleMarkCompleteJobModal}
          setShowReviewModal={setShowReviewModal}
          setDeclineModal={setDeclineModal}
        />
      </div>
      {openChat && <ChatWindow setOpenChat={setOpenChat} booking={booking} />}
    </>
  );
};

export default BookingHeader;
