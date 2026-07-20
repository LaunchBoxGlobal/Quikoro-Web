import React, { useEffect, useRef, useState } from "react";
import ImageModal from "./ImageModal";
import MessageItem from "./MessageItem";

const MessagesList = ({ messages, user, chatUser }) => {
  const [previewImages, setPreviewImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const messagesContainerRef = useRef(null);

  useEffect(() => {
    const scrollToBottom = () => {
      const container = messagesContainerRef.current;

      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    };

    // Initial scroll
    scrollToBottom();

    // Scroll again after images/audio/media have loaded
    const timer = setTimeout(scrollToBottom, 300);

    return () => clearTimeout(timer);
  }, [messages]);

  const openPreview = (images, index) => {
    setPreviewImages(images);
    setActiveIndex(index);
  };

  const closePreview = () => {
    setPreviewImages([]);
    setActiveIndex(0);
  };

  return (
    <>
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto overflow-x-hidden px-5 py-0 space-y-4 notifications-scroll bg-gray-100"
      >
        {Object.entries(messages).map(([date, dateMessages]) => (
          <div key={date}>
            <div className="flex justify-center my-5">
              <span className="gradient-bg text-white custom-shadow font-medium px-3 py-1.5 rounded-lg text-xs">
                {date.slice(0, 1).toUpperCase() + date.slice(1)}
              </span>
            </div>

            {dateMessages?.map((item) => {
              const isMe = item.senderId === user?.id;

              return (
                <MessageItem
                  key={item.id}
                  item={item}
                  isMe={isMe}
                  openPreview={openPreview}
                  user={user}
                  chatUser={chatUser}
                />
              );
            })}
          </div>
        ))}
      </div>

      {previewImages.length > 0 && (
        <ImageModal
          closePreview={closePreview}
          previewImages={previewImages}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      )}
    </>
  );
};

export default MessagesList;
