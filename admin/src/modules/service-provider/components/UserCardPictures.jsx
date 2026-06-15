import React from "react";

const UserCardPictures = ({ user }) => {
  return (
    <div className="bg-white rounded-[24px] p-6 lg:p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] border border-gray-50 min-h-[50vh]">
      <h4 className="text-[22px] font-bold text-gray-900 mb-6">ID Card</h4>
      <div className="w-full border my-4" />
      {!user?.cardFrontUrl || !user?.cardBackUrl ? (
        <p className="text-gray-400 font-medium">No ID cards to display.</p>
      ) : (
        <div className="w-full flex gap-5 flex-wrap items-start mt-6">
          <div className="space-y-3">
            <p className="text-sm font-medium">Front ID Card</p>
            <img
              src={user?.cardFrontUrl}
              alt={`${user?.fullName} front card picture`}
              width={300}
              height={300}
              className="object-contain"
            />
          </div>
          <div className="space-y-3">
            <p className="text-sm font-medium">Back ID Card</p>
            <img
              src={user?.cardBackUrl}
              alt={`${user?.fullName} back card picture`}
              width={300}
              height={300}
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCardPictures;
