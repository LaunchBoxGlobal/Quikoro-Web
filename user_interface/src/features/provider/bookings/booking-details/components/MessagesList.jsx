import React, { useEffect, useRef, useState } from "react";
import { formatMessageTime } from "../../../../../utils/formatMessageTime";
import ImageModal from "./ImageModal";

const MessagesList = ({ messages, user }) => {
  const [previewImages, setPreviewImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
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
      <div className="flex-1 overflow-y-auto p-5 space-y-4 notifications-scroll">
        {Object.entries(messages).map(([date, dateMessages]) => (
          <div key={date}>
            <div className="flex justify-center my-4">
              <span className="bg-gray-200 px-3 py-1 rounded-full text-xs">
                {date.slice(0, 1).toUpperCase() + date.slice(1)}
              </span>
            </div>

            {dateMessages?.map((item) => {
              const isMe = item.senderId === user?.id;
              const message = item?.message;

              return (
                <div
                  key={item.id}
                  className={`flex ${
                    isMe ? "justify-end" : "justify-start"
                  } mb-2`}
                >
                  <div
                    className={`px-4 py-3 max-w-[75%] space-y-1 ${
                      isMe
                        ? "gradient-bg text-white rounded-l-2xl rounded-tr-2xl"
                        : "bg-gray-100 rounded-r-2xl rounded-tl-2xl"
                    }`}
                  >
                    {item?.media?.length > 0 &&
                      item.media.map((mediaUrl, i) => {
                        return (
                          <div key={i}>
                            {item.type === "IMAGE" && (
                              <img
                                src={mediaUrl}
                                alt=""
                                onClick={() => openPreview(item.media, i)}
                                className="max-w-[150px] cursor-pointer"
                              />
                            )}

                            {item.type === "AUDIO" && (
                              <audio controls>
                                <source src={mediaUrl} />
                              </audio>
                            )}

                            {item.type === "VIDEO" && (
                              <video controls width="250">
                                <source src={mediaUrl} />
                              </video>
                            )}
                          </div>
                        );
                      })}

                    {message && <p>{message}</p>}

                    {item?.createdAt && (
                      <p
                        className={`text-[10px] ${
                          isMe ? "text-end" : "text-start"
                        }`}
                      >
                        {formatMessageTime(item.createdAt)}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      {/* Modal */}
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
