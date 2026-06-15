import { Bell } from "lucide-react";
import React from "react";

const NotificationCount = () => {
  return (
    <button type="button" className="text-gray-500 hover:text-black relative">
      <Bell className="text-[20px] lg:text-[24px]" />

      <span className="absolute top-0.5 right-0.5 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
    </button>
  );
};

export default NotificationCount;
