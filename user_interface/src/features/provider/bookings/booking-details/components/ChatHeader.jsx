import { User, X } from "lucide-react";
import React from "react";
import { socket } from "../../../../../socket";

const ChatHeader = ({ setOpenChat, chatUser, bookingId }) => {
  const handleCloseChat = () => {
    socket.emit("leave-conversation", {
      bookingId,
    });

    setOpenChat(false);
  };
  return (
    <div className="gradient-bg min-h-[86px] px-4 flex items-center justify-between">
      <div className="flex gap-2 items-center">
        {chatUser?.profilePicture ? (
          <img
            src={chatUser?.profilePicture}
            alt={`${chatUser?.fullName} profile picture`}
            className="w-12 h-12 rounded-full object-cover border-2 border-gray-300"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
            <User />
          </div>
        )}

        <h2 className="text-white">{chatUser?.fullName}</h2>
      </div>

      <button onClick={() => setOpenChat(false)}>
        <X color="white" />
      </button>
    </div>
  );
};

export default ChatHeader;
