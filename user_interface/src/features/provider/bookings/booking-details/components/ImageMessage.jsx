import React from "react";
import { formatMessageTime } from "../../../../../utils/formatMessageTime";
import { FaPlus } from "react-icons/fa";

const ImageMessage = ({ item, openPreview, isMe }) => {
  const hasMultipleImages = item.media.length > 1;
  const hasMoreImages = item.media.length > 4;

  const visibleImages = hasMoreImages ? item.media.slice(0, 4) : item.media;

  return (
    <div
      className={`px-4 py-3 max-w-[75%] ${
        isMe
          ? "gradient-bg text-white rounded-l-2xl rounded-tr-2xl"
          : "bg-white rounded-r-2xl rounded-tl-2xl"
      }`}
    >
      <div className={hasMultipleImages ? "grid grid-cols-2 gap-2" : "flex"}>
        {visibleImages.map((mediaUrl, index) => {
          const isLastVisibleImage = index === 3 && hasMoreImages;

          return (
            <div
              key={index}
              className="relative"
              onClick={() => {
                if (isLastVisibleImage) {
                  openPreview(item.media, index);
                } else {
                  openPreview(item.media, index);
                }
              }}
            >
              <img
                src={mediaUrl}
                alt=""
                className={`
                  cursor-pointer rounded-lg object-cover
                  ${
                    hasMultipleImages
                      ? "w-full aspect-square"
                      : "w-[180px] h-[180px]"
                  }
                `}
              />

              {isLastVisibleImage && (
                <div className="absolute inset-0 bg-black/50 cursor-pointer rounded-lg flex items-center justify-center text-white">
                  <div className="flex items-center gap-1 text-2xl font-semibold">
                    <FaPlus className="text-lg" />
                    {item.media.length - 4}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {item.message && <p className="mt-2 leading-[1.35]">{item.message}</p>}

      <p
        className={`text-[10px] font-medium ${
          isMe ? "text-end" : "text-start"
        } mt-2`}
      >
        {formatMessageTime(item.createdAt)}
      </p>
    </div>
  );
};

export default ImageMessage;
