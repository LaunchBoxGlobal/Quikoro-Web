import React, { useEffect, useRef, useState } from "react";
import { Bell, Clock } from "lucide-react";
import { useGetNotificationsQuery } from "../../services/notificationApi/notificationApi";
import { formatDate } from "../../utils/formatDate";
import { formatMessageTime } from "../../utils/formatMessageTime";
import { formatNotificationTime } from "../../utils/formatNotificationTime";
import { Link } from "react-router-dom";

const notifications = [
  {
    id: 1,
    title: "New Order",
    message: "Order #1024 has been placed successfully.",
    time: "2 mins ago",
    unread: true,
  },
  {
    id: 2,
    title: "Payment Received",
    message: "Payment for Order #1023 received.",
    time: "10 mins ago",
    unread: true,
  },
  {
    id: 3,
    title: "Profile Updated",
    message: "Your profile information was updated.",
    time: "1 hour ago",
    unread: false,
  },
  {
    id: 4,
    title: "New User",
    message: "John Doe has registered.",
    time: "Yesterday",
    unread: false,
  },
  {
    id: 5,
    title: "Server Status",
    message: "Server maintenance completed successfully.",
    time: "2 days ago",
    unread: false,
  },
];

const NotificationsDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { data, isLoading, isError, isFetching } = useGetNotificationsQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    },
  );
  const notifications = data?.data?.data;
  const pagination = data?.data?.pagination;

  const unreadCount = notifications?.filter((n) => !n.isRead).length;

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="relative text-gray-500 hover:text-black"
      >
        <img
          src="/notification-icon.png"
          alt="notification icon"
          width={28}
          height={28}
          className="relative"
        />

        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
            {unreadCount}
          </span>
        )}
      </button>
      {open && (
        <div className=" fixed top-16 right-3 sm:right-5 lg:absolute lg:top-12 lg:right-0 w-[90vw] max-w-[360px] rounded-xl bg-white shadow-2xl border border-gray-200 z-[9999] overflow-hidden">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-white border-b px-4 py-3">
            <h2 className="text-lg font-extrabold">Notifications</h2>
          </div>

          {/* Scrollable List */}
          {isLoading || isFetching ? (
            <div className="max-h-[420px] flex items-center justify-center px-4">
              <span className="text-sm text-gray-600">Loading...</span>
            </div>
          ) : (
            <div className="max-h-[420px] overflow-y-auto notifications-scroll">
              {notifications?.length > 0 ? (
                notifications?.map((item) => (
                  <Link
                    to={
                      item?.bookingId
                        ? `/booking-history/${item?.bookingId}`
                        : "/booking-history"
                    }
                    onClick={() => setOpen((prev) => !prev)}
                    key={item.id}
                  >
                    <div className="flex gap-3 border-b px-4 py-3 hover:bg-gray-50 transition cursor-pointer">
                      <div className="mt-0.5 w-7 h-7 gradient-bg rounded-full flex items-center justify-center">
                        <img
                          src="/notification-icon.png"
                          alt="notification icon"
                          width={16}
                          height={16}
                          className="relative brightness-0 invert"
                        />
                      </div>

                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 leading-none text-sm">
                          {item?.title}
                        </h4>

                        <p className="my-1 text-[13px] text-gray-600 leading-[1.35]">
                          {item?.description}
                        </p>

                        <p className="text-xs text-gray-400 flex items-center gap-1">
                          <Clock size={13} />
                          {formatNotificationTime(item?.createdAt)}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="py-10 text-center text-gray-500">
                  No notifications
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationsDropdown;
