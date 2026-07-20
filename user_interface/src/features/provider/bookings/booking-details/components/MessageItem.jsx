import React from "react";
import ImageMessage from "./ImageMessage";
import AudioMessageItem from "./AudioMessageItem";
import VideoMessage from "./VideoMessage";
import TextMessage from "./TextMessage";

const MessageItem = ({ item, isMe, user, chatUser, openPreview }) => {
  return (
    <div
      className={`w-full flex ${isMe ? "justify-end" : "justify-start"} my-4`}
    >
      {item.type === "IMAGE" && (
        <ImageMessage item={item} isMe={isMe} openPreview={openPreview} />
      )}

      {item.type === "AUDIO" && (
        <AudioMessageItem
          item={item}
          isMe={isMe}
          user={user}
          chatUser={chatUser}
        />
      )}

      {item.type === "VIDEO" && <VideoMessage item={item} isMe={isMe} />}

      {item.type === "TEXT" && <TextMessage item={item} isMe={isMe} />}
    </div>
    // </div>
  );
};

export default MessageItem;
