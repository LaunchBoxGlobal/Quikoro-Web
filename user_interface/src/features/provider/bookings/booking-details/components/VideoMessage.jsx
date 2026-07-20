import React from "react";
import { formatMessageTime } from "../../../../../utils/formatMessageTime";

const VideoMessage = ({ item, isMe }) => {
  return (
    <div
      className={`px-4 py-3 max-w-[75%] space-y-2 ${
        isMe
          ? "gradient-bg text-white rounded-l-2xl rounded-tr-2xl"
          : "bg-gray-100 rounded-r-2xl rounded-tl-2xl"
      }`}
    >
      {item?.media.map((video, index) => (
        <video key={index} controls className="max-w-xs rounded-lg">
          <source src={video} />
        </video>
      ))}

      {item.message && <p>{item.message}</p>}

      <p className={`text-[10px] ${isMe ? "text-end" : "text-start"}`}>
        {formatMessageTime(item.createdAt)}
      </p>
    </div>
  );
};

export default VideoMessage;
