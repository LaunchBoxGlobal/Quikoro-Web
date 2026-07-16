import { useState } from "react";
import { enqueueSnackbar } from "notistack";

import { useUpdateNotificationPreferenceMutation } from "../../../services/settingsApi/settingsApi";

export default function NotificationSettings() {
  const [notificationEnabled, setNotificationEnabled] = useState(true);

  const [updateNotificationPreference, { isLoading }] =
    useUpdateNotificationPreferenceMutation();

  const toggleNotification = async () => {
    const newValue = !notificationEnabled;

    // optimistic update
    setNotificationEnabled(newValue);

    try {
      await updateNotificationPreference(newValue).unwrap();

      enqueueSnackbar(
        `Notifications ${newValue ? "enabled" : "disabled"} successfully`,
        {
          variant: "success",
          autoHideDuration: 3000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        },
      );
    } catch (error) {
      // rollback
      setNotificationEnabled(!newValue);

      enqueueSnackbar(
        error?.data?.message ||
          error?.data?.error ||
          "Failed to update notification settings",
        {
          variant: "error",
          autoHideDuration: 3000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        },
      );
    }
  };

  return (
    <div>
      <h2 className="text-[24px] md:text-[28px] lg:text-[32px] font-bold text-gray-900 tracking-tight mb-5">
        Notification
      </h2>

      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[17px] font-medium text-black">
              Push Notifications
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Enable or disable all notifications
            </p>
          </div>

          <button
            type="button"
            disabled={isLoading}
            onClick={toggleNotification}
            className={`relative w-[52px] h-[28px] rounded-full transition-colors flex items-center shrink-0 ${
              notificationEnabled ? "gradient-bg" : "bg-gray-300"
            } ${isLoading ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            <div
              className={`absolute left-[3px] bg-white w-[22px] h-[22px] rounded-full transition-transform duration-300 ease-in-out ${
                notificationEnabled ? "translate-x-[24px]" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* <hr className="border-gray-200" /> */}
      </div>
    </div>
  );
}
