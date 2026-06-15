import React from "react";
import { getFullAddress } from "../../../utils/getAddress";

const UserDetails = ({ user }) => {
  const userAddress = getFullAddress(user);
  return (
    <div className="bg-white rounded-[24px] p-6 lg:p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] border border-gray-50">
      <h4 className="text-[22px] font-bold text-gray-900 mb-6">Details</h4>

      <div className="flex flex-col">
        <div className="py-5 border-t border-gray-100/80 flex flex-col gap-1.5">
          <span className="text-[13px] font-medium text-gray-500">
            Email Address
          </span>
          <span className="text-gray-900 font-medium whitespace-pre-wrap">
            {user?.email}
          </span>
        </div>

        {user?.gender && (
          <div className="py-5 border-t border-gray-100/80 flex flex-col gap-1.5">
            <span className="text-[13px] font-medium text-gray-500">
              Gender
            </span>
            <span className="text-gray-900 font-medium">
              {user?.gender || "N/A"}
            </span>
          </div>
        )}

        <div className="py-5 border-t border-gray-100/80 flex flex-col gap-1.5">
          <span className="text-[13px] font-medium text-gray-500">
            Location
          </span>
          <span className="text-gray-900 font-medium">
            {userAddress || "N/A"}
          </span>
        </div>

        {user?.description && (
          <div className="py-5 border-t border-gray-100/80 flex flex-col gap-2">
            <span className="text-[13px] font-medium text-gray-500">
              Description
            </span>
            <span className="text-gray-900 font-[450] leading-relaxed text-[15px]">
              {user?.description}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
