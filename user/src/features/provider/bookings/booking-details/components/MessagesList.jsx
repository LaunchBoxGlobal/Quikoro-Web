// import React from "react";
// import { formatMessageTime } from "../../../../../utils/formatMessageTime";

// const MessagesList = ({ messages, user }) => {
//   return (
//     <div className="flex-1 overflow-y-auto p-5 space-y-4">
//       {Object.entries(messages).map(([date, dateMessages]) => (
//         <div key={date}>
//           {/* Date Header */}
//           <div className="flex justify-center my-4">
//             <span className="bg-gray-200 px-3 py-1 rounded-full text-xs">
//               {date}
//             </span>
//           </div>

//           {/* Messages */}
//           {dateMessages?.map((item) => {
//             const isMe = item.senderId === user?.id;
//             const message = item?.message;
//             return (
//               <div
//                 key={item.id}
//                 className={`flex ${
//                   isMe ? "justify-end" : "justify-start"
//                 } mb-2`}
//               >
//                 <div
//                   className={`px-4 py-3 max-w-[75%] space-y-2 ${
//                     isMe
//                       ? "gradient-bg text-white rounded-l-2xl rounded-tr-2xl"
//                       : "bg-gray-100 rounded-r-2xl rounded-tl-2xl"
//                   }`}
//                 >
//                   {/* images */}
//                   {item?.media?.length > 0 &&
//                     item?.media?.map((mediaItem, i) => {
//                       return (
//                         <img
//                           key={i}
//                           src={mediaItem}
//                           alt=""
//                           className="mt-2 rounded-lg max-w-[150px]"
//                         />
//                       );
//                     })}
//                   {/* text */}
//                   {message && <p>{message}</p>}
//                   {item?.createdAt && (
//                     <p
//                       className={`text-[10px] ${
//                         isMe ? "text-end" : "text-start"
//                       }`}
//                     >
//                       {formatMessageTime(item?.createdAt)}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MessagesList;

import React, { useState } from "react";
import { formatMessageTime } from "../../../../../utils/formatMessageTime";

const MessagesList = ({ messages, user }) => {
  const [previewImages, setPreviewImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

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
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {Object.entries(messages).map(([date, dateMessages]) => (
          <div key={date}>
            <div className="flex justify-center my-4">
              <span className="bg-gray-200 px-3 py-1 rounded-full text-xs">
                {date}
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
                    className={`px-4 py-3 max-w-[75%] space-y-2 ${
                      isMe
                        ? "gradient-bg text-white rounded-l-2xl rounded-tr-2xl"
                        : "bg-gray-100 rounded-r-2xl rounded-tl-2xl"
                    }`}
                  >
                    {item?.media?.length > 0 &&
                      item.media.map((mediaItem, i) => (
                        <img
                          key={i}
                          src={mediaItem}
                          alt=""
                          onClick={() => openPreview(item.media, i)}
                          className="mt-2 rounded-lg max-w-[150px] cursor-pointer hover:opacity-90"
                        />
                      ))}

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
      </div>

      {/* Modal */}
      {previewImages.length > 0 && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={closePreview}
        >
          <div
            className="relative max-w-[90vw] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closePreview}
              className="absolute -top-10 -right-0 text-white text-3xl"
            >
              ×
            </button>

            <img
              src={previewImages[activeIndex]}
              alt=""
              className="max-h-[85vh] max-w-[90vw] rounded-lg"
            />

            {previewImages.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setActiveIndex((prev) =>
                      prev === 0 ? previewImages.length - 1 : prev - 1,
                    )
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded"
                >
                  ←
                </button>

                <button
                  onClick={() =>
                    setActiveIndex((prev) =>
                      prev === previewImages.length - 1 ? 0 : prev + 1,
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded"
                >
                  →
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MessagesList;
