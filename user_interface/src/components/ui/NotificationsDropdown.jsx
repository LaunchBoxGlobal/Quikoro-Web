import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useLazyGetNotificationsQuery } from "../../services/notificationApi/notificationApi";
import { formatNotificationTime } from "../../utils/formatNotificationTime";

const NotificationsDropdown = () => {
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);
  const scrollRef = useRef(null);

  const [notifications, setNotifications] = useState([]);
  const [pagination, setPagination] = useState(null);

  const [getNotifications, { isLoading, isFetching }] =
    useLazyGetNotificationsQuery();

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.isRead).length,
    [notifications],
  );

  const fetchNotifications = useCallback(
    async (page = 1, append = false) => {
      try {
        const response = await getNotifications(
          { page },
          true, // prefer fresh data
        ).unwrap();

        const newNotifications = response?.data?.data || [];
        const newPagination = response?.data?.pagination;

        setPagination(newPagination);

        setNotifications((prev) => {
          if (!append) {
            return newNotifications;
          }

          // remove duplicates
          const ids = new Set(prev.map((item) => item.id));

          const merged = [...prev];

          newNotifications.forEach((item) => {
            if (!ids.has(item.id)) {
              merged.push(item);
            }
          });

          return merged;
        });
      } catch (err) {
        console.error(err);
      }
    },
    [getNotifications],
  );

  useEffect(() => {
    fetchNotifications(1, false);
  }, [fetchNotifications]);

  // Fetch fresh notifications every time dropdown opens
  useEffect(() => {
    if (open) {
      fetchNotifications(1, false);
    }
  }, [open, fetchNotifications]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleScroll = useCallback(() => {
    const container = scrollRef.current;

    if (!container) return;

    if (isFetching) return;

    if (!pagination?.hasNextPage) return;

    const { scrollTop, scrollHeight, clientHeight } = container;

    if (scrollHeight - scrollTop - clientHeight < 60) {
      fetchNotifications(pagination.page + 1, true);
    }
  }, [fetchNotifications, isFetching, pagination]);

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
          width={24}
          height={24}
        />

        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="fixed top-16 right-3 sm:right-5 lg:absolute lg:top-12 lg:right-0 w-[90vw] max-w-[360px] rounded-xl bg-white shadow-2xl border border-gray-200 z-[9999] overflow-hidden">
          <div className="sticky top-0 z-10 bg-white border-b px-4 py-3">
            <h2 className="text-lg font-extrabold">Notifications</h2>
          </div>

          {isLoading ? (
            <div className="h-52 flex items-center justify-center">
              Loading...
            </div>
          ) : (
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="max-h-[420px] overflow-y-auto notifications-scroll"
            >
              {notifications.length ? (
                <>
                  {notifications.map((item) => (
                    <Link
                      key={item.id}
                      to={
                        item.bookingId
                          ? `/booking-history/${item.bookingId}`
                          : "/booking-history"
                      }
                      onClick={() => setOpen(false)}
                    >
                      <div className="flex gap-3 border-b px-4 py-3 hover:bg-gray-50 transition">
                        <div className="mt-0.5 w-7 h-7 gradient-bg rounded-full flex items-center justify-center">
                          <img
                            src="/notification-icon.png"
                            alt="notification"
                            width={16}
                            height={16}
                            className="brightness-0 invert"
                          />
                        </div>

                        <div className="flex-1">
                          <h4 className="font-bold text-sm text-gray-900 leading-none">
                            {item.title}
                          </h4>

                          <p className="my-1 text-[13px] text-gray-600 leading-[1.35]">
                            {item.description}
                          </p>

                          <p className="text-xs text-gray-400 flex items-center gap-1">
                            <Clock size={13} />
                            {formatNotificationTime(item.createdAt)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}

                  {isFetching && pagination?.page > 1 && (
                    <div className="py-4 text-center text-sm text-gray-500">
                      Loading more...
                    </div>
                  )}

                  {!pagination?.hasNextPage && notifications.length > 0 && (
                    <div className="py-4 text-center text-xs text-gray-400">
                      No more notifications
                    </div>
                  )}
                </>
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
