import { ShieldX } from "lucide-react";

const UserBlocked = () => {
  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center">
      <div className="bg-white rounded-3xl p-8 md:p-10 max-w-lg w-full text-center shadow-sm border border-gray-100">
        <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-red-50 flex items-center justify-center">
          <ShieldX className="text-red-500" size={40} />
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mb-3">
          Profile Unavailable
        </h2>

        <p className="text-gray-500 leading-relaxed">
          This user's profile is no longer available to you. You cannot view
          their profile information, services, or bookings.
        </p>
      </div>
    </div>
  );
};

export default UserBlocked;
