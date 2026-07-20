import React from "react";
import { formatMessageTime } from "../../../../../utils/formatMessageTime";
import AudioMessage from "./AudioMessage";

const AudioMessageItem = ({ item, isMe, user, chatUser }) => {
  return (
    <div
      className={`max-w-[75%] space-y-2 ${
        isMe
          ? "bg-transparent text-black font-medium rounded-l-2xl rounded-tr-2xl"
          : "bg-transparent rounded-r-xl rounded-tl-xl"
      }`}
    >
      {item.media.map((audio, index) => (
        <AudioMessage
          key={index}
          audioUrl={audio}
          isMe={isMe}
          avatar={isMe ? user?.profilePicture : chatUser?.profilePicture}
        />
      ))}

      {item.message && <p>{item.message}</p>}

      <p className={`text-[10px] ${isMe ? "text-end" : "text-start"}`}>
        {formatMessageTime(item.createdAt)}
      </p>
    </div>
  );
};

export default AudioMessageItem;
