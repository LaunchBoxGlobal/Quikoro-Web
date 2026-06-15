import React from "react";
import {
  CalendarIcon,
  LocationIcon,
  ProfilePicture,
} from "../../../../../assets/export";

const BookingModalDetails = ({ booking }) => {
  return (
    <div className="w-full p-4 rounded-[14px] bg-[#7474741A]">
      <div className="w-full flex items-center gap-3">
        <img
          src={ProfilePicture}
          alt="profile picture icon"
          width={47}
          height={47}
        />

        <div className="">
          <p className="text-lg font-semibold">Sarah Johnson</p>
          <p className="text-xs font-normal">Home Plumbing Repair</p>
        </div>
      </div>

      <div className="w-full flex items-center gap-2 mt-4">
        <img src={CalendarIcon} alt="calendar icon" width={15} height={16} />
        <p className="text-xs">May 8, 2026 at 10:00 AM</p>
      </div>

      <div className="w-full flex items-center gap-2 mt-2">
        <img src={LocationIcon} width={13} height={15} alt="calendar icon" />
        <p className="text-xs">123 Main Street, Apt 4BSan Francisco</p>
      </div>
    </div>
  );
};

export default BookingModalDetails;
