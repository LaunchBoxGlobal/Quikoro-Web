import React from "react";
import { formatMessageTime } from "../../../../../utils/formatMessageTime";

const TextMessage = ({ item, isMe }) => {
  return (
    <div
      className={`px-4 py-3 max-w-[75%] space-y-2 ${
        isMe
          ? "gradient-bg text-white rounded-l-2xl rounded-tr-2xl"
          : "bg-white rounded-r-2xl rounded-tl-2xl"
      }`}
    >
      <p>{item.message}</p>

      <p className={`text-[10px] ${isMe ? "text-end" : "text-start"}`}>
        {formatMessageTime(item.createdAt)}
      </p>
    </div>
  );
};

export default TextMessage;
