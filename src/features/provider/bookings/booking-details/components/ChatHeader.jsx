import { User, X } from "lucide-react";
import React from "react";

const ChatHeader = ({ setOpenChat }) => {
  return (
    <div className="gradient-bg min-h-[86px] px-4 flex items-center justify-between">
      <div className="flex gap-2 items-center">
        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
          <User />
        </div>

        <h2 className="text-white">Chat</h2>
      </div>

      <button onClick={() => setOpenChat(false)}>
        <X color="white" />
      </button>
    </div>
  );
};

export default ChatHeader;
