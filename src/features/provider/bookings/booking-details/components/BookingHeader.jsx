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
}) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    setMessage("");
  };

  return (
    <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center relative">
      <SectionTitle>
        <span className="whitespace-nowrap">Booking Details</span>
      </SectionTitle>

      <div className="w-full hidden lg:block">
        <BookingActions
          setShowAcceptBookingConfirmation={setShowAcceptBookingConfirmation}
          setOpenChat={setOpenChat}
          booking={booking}
          handleUpdateStatus={handleUpdateStatus}
          setAcceptBooking={setAcceptBooking}
          setCancellationModal={setCancellationModal}
        />
      </div>
      {openChat && <ChatWindow setOpenChat={setOpenChat} booking={booking} />}
    </div>
  );
};

export default BookingHeader;
