import React from "react";

const MessagesList = ({ messages, user }) => {
  return (
    <div className="flex-1 overflow-y-auto p-5 space-y-4">
      {Object.entries(messages).map(([date, dateMessages]) => (
        <div key={date}>
          {/* Date Header */}
          <div className="flex justify-center my-4">
            <span className="bg-gray-200 px-3 py-1 rounded-full text-xs">
              {date}
            </span>
          </div>

          {/* Messages */}
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
                  {/* images */}
                  {item?.media?.map((mediaItem, i) => {
                    // if (!mediaItem?.key) return null;
                    return (
                      <img
                        key={i}
                        src={mediaItem}
                        alt=""
                        className="mt-2 rounded-lg max-w-[150px]"
                      />
                    );
                  })}
                  {/* text */}
                  {message && <p>{message}</p>}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default MessagesList;
