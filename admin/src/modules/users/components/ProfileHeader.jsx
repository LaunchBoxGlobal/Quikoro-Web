import React, { useState } from "react";
import BanUserModal from "./BanUserModal";

const ProfileHeader = ({ user, id, refetch }) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const toggleModal = () => {
    setShowConfirmationModal((prev) => !prev);
  };

  return (
    <>
      <div className="bg-white rounded-[24px] p-6 lg:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] border border-gray-50 mb-6">
        <div className="flex items-center gap-6 mb-8 lg:mb-0">
          <div className="w-[100px] h-[100px] rounded-full overflow-hidden border-2 border-[#016A87] p-1.5 bg-white">
            <img
              src={
                user?.profilePicture ||
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80"
              }
              alt={user?.fullName}
              className="w-full h-full rounded-full object-cover"
            />
          </div>

          <div>
            <h3 className="text-[24px] font-bold text-gray-900">
              {user?.fullName}
            </h3>
            <p className="text-gray-500 text-sm">{user?.email}</p>
          </div>
        </div>

        <button
          onClick={toggleModal}
          className={`w-full sm:w-auto px-12 py-3.5 text-white rounded-[14px] font-medium text-base transition-colors ${
            user?.isBanned
              ? "bg-green-600 hover:bg-green-700"
              : "bg-red-500 hover:bg-red-600"
          }`}
        >
          {user?.isBanned ? "Unban User" : "Ban User"}
        </button>
      </div>

      {showConfirmationModal && (
        <BanUserModal
          user={user}
          id={id}
          refetch={refetch}
          onClose={toggleModal}
        />
      )}
    </>
  );
};

export default ProfileHeader;
